// Fidelidade ao caderno oficial: o texto do enunciado e de cada alternativa
// tem que existir no PDF da prova. Existe porque o motor (Gemini) já
// gravou questões INVENTADAS — enunciado e alternativas plausíveis, mas que
// não são os da prova — com a letra do gabarito certa, e o restante do
// portão (duplicata, gabarito, taxonomia) não tem como perceber isso.
//
// Só roda quando existe tmp/pdfs/<examId>-caderno*.pdf e o pdftotext
// (poppler-utils). Sem um dos dois, não checa (retorna null).
const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const ROOT = path.join(__dirname, '..');
const TAM = 30;          // tamanho do pedaço comparado (caracteres normalizados)
const MINIMO = 0.6;      // fração de pedaços que precisa existir no PDF (calibrado: pega ~98% das inventadas, ~5% de falso positivo)
const norm = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]/g, '');
const cache = new Map();

function textoDoPdf(examId) {
    if (cache.has(examId)) return cache.get(examId);
    let texto = null;
    try {
        const dir = path.join(ROOT, 'tmp', 'pdfs');
        const txtFile = path.join(dir, `${examId}-caderno.txt`);
        if (fs.existsSync(txtFile)) {
            texto = norm(fs.readFileSync(txtFile, 'utf-8'));
        } else {
            const arqs = fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => f.startsWith(`${examId}-caderno`) && f.endsWith('.pdf')) : [];
            if (arqs.length) {
                texto = norm(arqs.map(f => ['-raw', '-layout'].map(m => cp.execFileSync('pdftotext', [m, path.join(dir, f), '-'], { maxBuffer: 1 << 28 }).toString()).join(' ')).join(' '));
            }
        }
    } catch { texto = null; }
    cache.set(examId, texto);
    return texto;
}

function fracaoNoPdf(texto, pdf) {
    const n = norm(texto);
    if (!n) return 1;
    const pedacos = [];
    for (let i = 0; i < n.length; i += TAM) pedacos.push(n.slice(i, i + TAM));
    if (pedacos.length > 1 && pedacos.at(-1).length < 20) pedacos.pop();
    return pedacos.filter(p => pdf.includes(p)).length / pedacos.length;
}

// Devolve uma mensagem de erro, ou null se está fiel (ou não dá pra checar).
function problemaFidelidade(q) {
    const pdf = textoDoPdf(q.examId);
    if (!pdf) return null;
    const fe = fracaoNoPdf(q.stem, pdf);
    const ruins = Object.entries(q.options || {}).filter(([, t]) => fracaoNoPdf(t, pdf) < MINIMO).map(([l]) => l);
    const partes = [];
    if (fe < MINIMO) partes.push(`só ${Math.round(fe * 100)}% do enunciado existe no PDF`);
    if (ruins.length) partes.push(`alternativa(s) ${ruins.join(', ')} não existem no PDF`);
    return partes.length ? `texto não bate com o caderno oficial (${partes.join('; ')})` : null;
}

module.exports = { problemaFidelidade };
