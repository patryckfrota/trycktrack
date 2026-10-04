// Portão de validação dos lotes produzidos pelo motor de ingestão
// (scripts/ingestion/, arquivos tmp/extracted-<prova>.json). A estrutura
// (as 4 seções, a frase final do gabarito) já é checada pelo Zod do
// próprio motor — aqui fica só o que o Zod não pega: duplicata contra o
// banco, coerência do gabarito, taxonomia, integridade do texto e imagens.
//
//   node pipeline/validar.cjs                  → todos os tmp/extracted-*.json
//   node pipeline/validar.cjs tmp/arquivo.json → só esse lote
//
// Sai com código 1 se algum item for reprovado (dá pra usar como trava em
// script/CI). Relatório completo em pipeline/relatorios/.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { problemaTaxonomia } = require('../taxonomia/validar.cjs');
const { problemaFidelidade } = require('./fidelidade.cjs');
const { lerGabarito } = require('./gabarito-oficial.cjs');
const { problemasDeImagem } = require('./imagens-pagina.cjs');
const { completude, registrarDuplicata } = require('./completude.cjs');

const ROOT = path.join(__dirname, '..');

const norm = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
// 300 primeiros caracteres normalizados: pega a mesma questão mesmo com
// diferença de pontuação/acentuação no fim do enunciado.
const impressao = q => norm(q.stem).slice(0, 300);

const CONTROLE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/;
const OCR_SUJO = /\b\w*([a-z])\1{4,}\w*\b|\b[bcdfghjklmnpqrstvwxz]{7,}\b/i;
const QUEBRA_HIFEN = /[a-zà-ú]- [a-zà-ú]/;
const CITA_IMAGEM = /(imagem|figura|foto|fotografia|eletrocardiograma|\bECG\b|radiografia|tomografia|ultrassonografia|gr[aá]fico|tabela)[^.]{0,60}(a seguir|abaixo|apresentad|mostrad|seguinte)/i;

function carregarBanco() {
    global.window = {};
    for (const f of fs.readdirSync(ROOT).filter(f => /^questions-.*\.js$/.test(f) && f !== 'questions-internato.js')) {
        require(path.join(ROOT, f));
    }
    const porImpressao = new Map();
    for (const q of window.TRYCKTRACK_QUESTION_BANK || []) {
        const k = impressao(q);
        if (k && !porImpressao.has(k)) porImpressao.set(k, q.id);
    }
    return porImpressao;
}

function textos(item) {
    const q = item.question, e = item.explanation || {};
    return [q.stem, ...Object.values(q.options || {}), e.nucleo, e.armadilha, e.alternativas, e.fixacao].filter(Boolean);
}

// Categorias fixas: é por elas que pipeline/placar.cjs soma os erros de
// cada agente. Mudar o nome de uma quebra a série histórica do placar.
const CATEGORIAS = {
    duplicata: 'duplicata',
    alternativas: 'alternativas',
    gabarito: 'gabarito',
    explicacao: 'explicação',
    taxonomia: 'taxonomia',
    texto: 'texto',
    imagem: 'imagem',
    anulacao: 'anulação sem fonte',
    fidelidade: 'texto diferente do caderno oficial',
};

// deps: só para testes (gabarito/registro de imagens/páginas injetados, sem PDF).
function validarItem(item, banco, vistosNoLote, deps = {}) {
    const q = item.question, e = item.explanation || {};
    const erros = [], alertas = [];
    const erro = (cat, msg) => erros.push({ cat, msg });
    const alerta = (cat, msg) => alertas.push({ cat, msg });

    const k = impressao(q);
    const existente = banco.get(k);
    // Mesmo id = a própria questão já gravada antes; só é duplicata se o id for outro.
    const duplicataDe = existente && existente !== q.id ? existente : null;
    if (duplicataDe) erro('duplicata', `duplicata de ${existente} já no banco`);
    if (vistosNoLote.has(k) && vistosNoLote.get(k) !== q.id) erro('duplicata', `duplicata de ${vistosNoLote.get(k)} no mesmo lote`);
    vistosNoLote.set(k, q.id);

    const letras = Object.keys(q.options || {});
    if (letras.length < 2) erro('alternativas', 'menos de 2 alternativas');
    if (!q.answer && !q.annulled) erro('gabarito', 'sem gabarito e não marcada como anulada');
    if (q.answer && !letras.includes(q.answer)) erro('gabarito', `gabarito "${q.answer}" não existe nas alternativas`);
    // L6 (pipeline/LICOES.md): anulação é fato objetivo da banca, não saída
    // pra dúvida sobre gabarito — exige a fonte que confirma (PDF oficial,
    // edição e questão), nunca aceita sem verificação.
    if (q.annulled && !String(q.annulledSource || '').trim()) erro('anulacao', 'marcada como anulada sem annulledSource (PDF/edição/questão que confirma)');

    // Gabarito OFICIAL lido do PDF por código (gabarito-oficial.cjs). Se não puder
    // ser lido, o lote é reprovado: falha fechada (PROCESSO-INGESTAO.md, regra 3).
    const oficial = deps.gabarito !== undefined ? deps.gabarito : lerGabarito(q.examId);
    if (!oficial) erro('gabarito', 'gabarito oficial não pôde ser lido do PDF (tmp/pdfs/<examId>-gabarito*.pdf + pdftotext): lote reprovado');
    else {
        const off = oficial.respostas[q.number];
        if (off === undefined) erro('gabarito', `questão ${q.number} não existe no gabarito oficial (a prova tem ${oficial.total} questões)`);
        else if (off === 'ANULADA') { if (!q.annulled) erro('gabarito', 'anulada no gabarito oficial, mas não marcada como annulled'); }
        else if (q.annulled) erro('anulacao', `marcada como anulada, mas o gabarito oficial traz ${off} (L6)`);
        else if (q.answer && !off.includes(q.answer)) erro('gabarito', `gabarito ${q.answer} difere do oficial (${off})`);
    }

    const fecho = /Portanto, o gabarito é a alternativa ([A-E])/.exec(e.fixacao || '');
    if (fecho && q.answer && fecho[1] !== q.answer) erro('gabarito', `explicação conclui ${fecho[1]}, mas o gabarito é ${q.answer}`);

    const semComentario = letras.filter(l => !new RegExp(`(^|[\\s(])(alternativa\\s+)?${l}\\s*[)\\.\\-—–:]`, 'i').test(e.alternativas || ''));
    if (semComentario.length) erro('explicacao', `alternativa(s) não comentada(s): ${semComentario.join(', ')}`);

    const tax = problemaTaxonomia(q);
    if (tax) erro('taxonomia', tax);

    // Enunciado/alternativas precisam existir no PDF da prova (ver fidelidade.cjs).
    const fid = problemaFidelidade(q);
    if (fid) erro('fidelidade', fid);

    if (textos(item).some(t => CONTROLE.test(t))) erro('texto', 'caractere de controle invisível no texto (quebra o import)');

    // Alternativas que são figuras ("Imagem A"...) sem nenhuma imagem anexada: a
    // questão fica impossível de responder (ver PROCESSO-INGESTAO.md, E4b).
    if (letras.length && letras.every(l => /^imagem\s+[a-e]\.?$/i.test(String(q.options[l]).trim())) && !(q.images || []).length) erro('imagem', 'alternativas são "Imagem A–D", mas a questão não tem imagem anexada');

    // Imagem: existe, não é vazia, está registrada (de que página saiu) e a página bate
    // com a da questão no caderno (imagens-pagina.cjs).
    for (const msg of problemasDeImagem(q, deps.imagens || {})) erro('imagem', msg);
    if (!(q.images || []).length && CITA_IMAGEM.test(q.stem)) alerta('imagem', 'enunciado parece citar imagem, mas nenhuma foi anexada');

    const sujo = [q.stem, ...Object.values(q.options || {})].find(t => OCR_SUJO.test(t));
    if (sujo) alerta('texto', `possível lixo de OCR: "${OCR_SUJO.exec(sujo)[0]}"`);
    if ([q.stem, ...Object.values(q.options || {})].some(t => QUEBRA_HIFEN.test(t))) alerta('texto', 'possível palavra quebrada por hífen de fim de linha');

    return { id: q.id, erros, alertas, duplicataDe, numero: q.number };
}

// Um registro por versão de lote (o nome leva o hash do conteúdo): validar o
// mesmo lote de novo sobrescreve em vez de contar em dobro, e a versão
// corrigida vira um registro novo — é o que mostra no placar se o agente
// melhorou depois da correção.
function registrarRevisao(lote, arq, itens) {
    const hash = crypto.createHash('sha256').update(JSON.stringify(lote.items || [])).digest('hex').slice(0, 10);
    const porCategoria = {};
    itens.forEach(i => new Set(i.erros.map(e => e.cat)).forEach(c => { porCategoria[c] = (porCategoria[c] || 0) + 1; }));
    const registro = {
        data: new Date().toISOString(),
        autor: lote.autor || 'gemini',
        revisor: 'validador',
        lote: path.basename(arq),
        examId: lote.examId,
        itens: itens.length,
        reprovados: itens.filter(i => i.erros.length).length,
        porCategoria,
    };
    const dir = path.join(__dirname, 'revisoes');
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, `${lote.examId || 'lote'}-${hash}.json`), JSON.stringify(registro, null, 2) + '\n');
}

// Argumentos podem ser arquivos ou pastas; sem argumento, olha as duas
// entradas conhecidas (tmp/ do motor local e pipeline/entrada/ do agendamento).
function listarLotes(args) {
    const alvos = args.length ? args : ['tmp', 'pipeline/entrada'];
    return alvos.flatMap(a => {
        const abs = path.resolve(ROOT, a);
        if (!fs.existsSync(abs)) return [];
        if (fs.statSync(abs).isFile()) return [a];
        return fs.readdirSync(abs).filter(f => /^extracted-.*\.json$/.test(f)).map(f => path.join(a, f));
    });
}

function main() {
    const lotes = listarLotes(process.argv.slice(2));
    if (!lotes.length) { console.log('Nenhum lote encontrado.'); return 0; }

    const banco = carregarBanco();
    const vistosNoLote = new Map();
    const relatorio = { gerado_em: new Date().toISOString(), lotes: [] };
    let reprovados = 0, total = 0;

    for (const arq of lotes) {
        const lote = JSON.parse(fs.readFileSync(path.resolve(ROOT, arq), 'utf8'));
        const itens = (lote.items || []).map(it => validarItem(it, banco, vistosNoLote));
        // questão que já existe no banco com outro id conta como COBERTA na completude da prova
        itens.filter(i => i.duplicataDe && lote.examId).forEach(i => registrarDuplicata(lote.examId, i.numero, i.duplicataDe));
        const rep = itens.filter(i => i.erros.length);
        reprovados += rep.length; total += itens.length;

        const motivos = {};
        rep.forEach(i => new Set(i.erros.map(e => e.cat)).forEach(c => { motivos[c] = (motivos[c] || 0) + 1; }));
        console.log(`\n${arq} — ${itens.length} questões: ${itens.length - rep.length} aprovadas, ${rep.length} reprovadas`);
        Object.entries(motivos).sort((a, b) => b[1] - a[1]).forEach(([c, n]) => console.log(`   ${n}× ${CATEGORIAS[c] || c}`));
        const comp = lote.examId ? completude(lote.examId) : null;
        if (comp) console.log(`   prova ${lote.examId}: ${comp.presentes}/${comp.total} questões cobertas${comp.completa ? ' — COMPLETA' : ` (faltam ${comp.faltam.length})`}`);
        else if (lote.examId) console.log(`   prova ${lote.examId}: completude não verificável (sem gabarito oficial legível)`);
        relatorio.lotes.push({ arquivo: arq, examId: lote.examId, itens });
        registrarRevisao(lote, arq, itens);
    }

    const dir = path.join(__dirname, 'relatorios');
    fs.mkdirSync(dir, { recursive: true });
    const saida = path.join(dir, `validacao-${relatorio.gerado_em.replace(/[:.]/g, '-')}.json`);
    fs.writeFileSync(saida, JSON.stringify(relatorio, null, 2));

    console.log(`\nTOTAL: ${total} questões, ${total - reprovados} aprovadas, ${reprovados} reprovadas`);
    console.log(`Relatório: ${path.relative(ROOT, saida)}`);
    return reprovados ? 1 : 0;
}

if (require.main === module) process.exit(main());
module.exports = { validarItem, impressao, CATEGORIAS };
