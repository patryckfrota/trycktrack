// Imagens de questão: cada recorte tem de ser REGISTRADO (de que página do PDF
// saiu e para qual questão) e a página precisa bater com a página onde a
// questão está no caderno. Existe porque o extrator já anexou figura de outra
// questão, recorte cortado ao meio e recorte com texto de outra questão.
//
// Registro: pipeline/imagens.json  { "assets/x/img/a.png": { examId, numero, pagina } }
// O extrator (scripts/ingestion/visual-extractor.ts) chama registrarImagem().
//
// Limite honesto: duas questões na mesma página não são distinguidas por este
// teste (só pega figura atribuída a questão de OUTRA página); conferir o
// recorte olhando continua sendo parte do processo (PROCESSO-INGESTAO.md, E4b).
const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const ROOT = path.join(__dirname, '..');
const REGISTRO = path.join(__dirname, 'imagens.json');
const norm = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');

function lerRegistro(arq = REGISTRO) {
    try { return JSON.parse(fs.readFileSync(arq, 'utf8')); } catch { return {}; }
}

function registrarImagem(caminho, info, arq = REGISTRO) {
    const r = lerRegistro(arq);
    r[caminho] = { examId: info.examId, numero: info.numero, pagina: info.pagina };
    const ordenado = Object.fromEntries(Object.entries(r).sort(([a], [b]) => a.localeCompare(b)));
    fs.writeFileSync(arq, JSON.stringify(ordenado, null, 2) + '\n');
}

// Páginas (1-based) do caderno em que a questão aparece, procurando o texto do
// enunciado (que o portão de fidelidade já exigiu fiel ao PDF). null = sem PDF.
const cachePaginas = new Map();
function textosPorPagina(examId) {
    if (cachePaginas.has(examId)) return cachePaginas.get(examId);
    let paginas = null;
    try {
        const dir = path.join(ROOT, 'tmp', 'pdfs');
        const arq = fs.existsSync(dir) ? fs.readdirSync(dir).find(f => f.startsWith(`${examId}-caderno`) && f.endsWith('.pdf')) : null;
        if (arq) paginas = cp.execFileSync('pdftotext', ['-raw', path.join(dir, arq), '-'], { maxBuffer: 1 << 27 }).toString().split('\f').map(norm);
    } catch { paginas = null; }
    cachePaginas.set(examId, paginas);
    return paginas;
}

function paginasDaQuestao(examId, q, paginas = textosPorPagina(examId)) {
    if (!paginas) return null;
    const n = norm(q.stem);
    if (!n) return [];
    const fim = n.slice(-50), ini = n.slice(0, 40);
    let achadas = paginas.map((t, i) => (t.includes(fim) ? i + 1 : 0)).filter(Boolean);
    if (!achadas.length) achadas = paginas.map((t, i) => (t.includes(ini) ? i + 1 : 0)).filter(Boolean);
    return achadas;
}

// Largura/altura de um PNG lendo só o cabeçalho (sem dependências).
function dimensoesPng(arquivo) {
    const fd = fs.openSync(arquivo, 'r');
    try {
        const b = Buffer.alloc(24);
        fs.readSync(fd, b, 0, 24, 0);
        if (b.toString('latin1', 1, 4) !== 'PNG') return null;
        return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
    } finally { fs.closeSync(fd); }
}

// Lista de problemas (strings) das imagens de uma questão. `deps` permite testar sem PDF.
function problemasDeImagem(q, deps = {}) {
    const registro = deps.registro || lerRegistro();
    const paginas = deps.paginas !== undefined ? deps.paginas : paginaDaQuestaoPadrao(q);
    const raiz = deps.raiz || ROOT;
    const out = [];
    // Sem como localizar a questão no caderno não dá para provar que a figura é dela: reprova.
    if ((q.images || []).length && (!paginas || !paginas.length)) out.push('não foi possível localizar a questão no caderno para conferir a página da imagem (PDF ilegível ou enunciado diferente do PDF)');
    for (const img of q.images || []) {
        const arq = path.join(raiz, img);
        if (!fs.existsSync(arq)) { out.push(`imagem não encontrada: ${img}`); continue; }
        if (img.toLowerCase().endsWith('.png')) {
            const d = dimensoesPng(arq);
            if (!d || d.w < 40 || d.h < 40 || fs.statSync(arq).size < 1500) out.push(`imagem vazia ou pequena demais: ${img}`);
        }
        const reg = registro[img];
        if (!reg) { out.push(`imagem sem registro de página em pipeline/imagens.json: ${img} (o extrator tem de registrar de onde recortou)`); continue; }
        if (reg.numero !== q.number) out.push(`imagem ${img} foi recortada para a questão ${reg.numero}, mas está anexada à ${q.number}`);
        if (paginas && paginas.length && !paginas.some(p => Math.abs(reg.pagina - p) <= 1)) {
            out.push(`imagem ${img} vem da página ${reg.pagina}, mas a questão está na(s) página(s) ${paginas.join(',')} do caderno`);
        }
    }
    return out;
}
const paginaDaQuestaoPadrao = q => paginasDaQuestao(q.examId, q);

module.exports = { lerRegistro, registrarImagem, paginasDaQuestao, problemasDeImagem, dimensoesPng };
