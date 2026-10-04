// Fidelidade ao caderno oficial: o texto do enunciado e de cada alternativa
// tem que existir no PDF da prova. Existe porque o motor (Gemini) já
// gravou questões INVENTADAS — enunciado e alternativas plausíveis, mas que
// não são os da prova — com a letra do gabarito certa, e o restante do
// portão (duplicata, gabarito, taxonomia) não tem como perceber isso.
//
// Precisa de tmp/pdfs/<examId>-caderno*.pdf legível (poppler-utils). Sem isso, REPROVA
// (falha fechada): nada de "não deu pra checar, então passou".
const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const ROOT = path.join(__dirname, '..');
const TAM = 30;          // tamanho do pedaço comparado (caracteres normalizados)
const MINIMO = 0.6;      // fração de pedaços que precisa existir no PDF (calibrado: pega ~98% das inventadas, ~5% de falso positivo)
const norm = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
const cache = new Map();

// Texto utilizável? PDFs com fonte Type 3 sem mapeamento Unicode (USP-SP 2024) saem do
// pdftotext como símbolos (✁✂✄☎...). Texto assim NÃO prova nada — antes o portão tratava
// isso como "sem PDF" e deixava passar em silêncio (falha aberta).
function legivel(bruto) {
    const sem = bruto.replace(/\s/g, '');
    if (sem.length < 3000) return false;
    const alfa = (sem.match(/[A-Za-zÀ-ÿ0-9]/g) || []).length;
    return alfa / sem.length >= 0.6;
}

// → { texto } | { erro }.  Fonte independente: o PDF da prova; se o PDF não tem camada de
// texto, aceita um OCR feito à parte em tmp/pdfs/<examId>-caderno*.ocr.txt (ver PROCESSO-INGESTAO.md).
function textoDoPdf(examId) {
    if (cache.has(examId)) return cache.get(examId);
    let r;
    try {
        const dir = path.join(ROOT, 'tmp', 'pdfs');
        const arqs = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
        const ocr = arqs.find(f => f.startsWith(`${examId}-caderno`) && f.endsWith('.ocr.txt'));
        const pdf = arqs.find(f => f.startsWith(`${examId}-caderno`) && f.endsWith('.pdf'));
        if (ocr) {
            const bruto = fs.readFileSync(path.join(dir, ocr), 'utf8');
            r = legivel(bruto) ? { texto: norm(bruto) } : { erro: `OCR ${ocr} ilegível ou curto demais` };
        } else if (pdf) {
            const bruto = ['-raw', '-layout'].map(m => cp.execFileSync('pdftotext', [m, path.join(dir, pdf), '-'], { maxBuffer: 1 << 28 }).toString()).join(' ');
            r = legivel(bruto) ? { texto: norm(bruto) } : { erro: `o PDF ${pdf} não tem camada de texto legível (fonte sem Unicode/escaneado): faça OCR e salve em tmp/pdfs/${examId}-caderno.ocr.txt, ou confira visualmente` };
        } else r = { erro: `PDF do caderno não encontrado em tmp/pdfs/${examId}-caderno*.pdf` };
    } catch (e) { r = { erro: `não foi possível ler o PDF (pdftotext instalado?): ${e.message.split('\n')[0]}` }; }
    cache.set(examId, r);
    return r;
}

function fracaoNoPdf(texto, pdf) {
    const n = norm(texto);
    if (!n) return 1;
    const pedacos = [];
    for (let i = 0; i < n.length; i += TAM) pedacos.push(n.slice(i, i + TAM));
    if (pedacos.length > 1 && pedacos.at(-1).length < 20) pedacos.pop();
    return pedacos.filter(p => pdf.includes(p)).length / pedacos.length;
}

// Devolve uma mensagem de erro, ou null SOMENTE se o texto bate com o caderno.
// Falha fechada: PDF ausente/ilegível também é erro (PROCESSO-INGESTAO.md, regra 3).
// deps.pdf: só para testes ({ texto } normalizado ou { erro }).
function problemaFidelidade(q, deps = {}) {
    const fonte = deps.pdf || textoDoPdf(q.examId);
    if (fonte.erro) return `fidelidade NÃO verificada: ${fonte.erro}`;
    const pdf = fonte.texto;
    const fe = fracaoNoPdf(q.stem, pdf);
    const ruins = Object.entries(q.options || {}).filter(([, t]) => fracaoNoPdf(t, pdf) < MINIMO).map(([l]) => l);
    const partes = [];
    if (fe < MINIMO) partes.push(`só ${Math.round(fe * 100)}% do enunciado existe no PDF`);
    if (ruins.length) partes.push(`alternativa(s) ${ruins.join(', ')} não existem no PDF`);
    return partes.length ? `texto não bate com o caderno oficial (${partes.join('; ')})` : null;
}

module.exports = { problemaFidelidade };
