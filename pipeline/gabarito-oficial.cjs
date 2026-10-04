// Lê o GABARITO OFICIAL definitivo do PDF, por código (nunca por modelo de
// linguagem). É o que o portão (validar.cjs) usa para conferir `answer` e
// `annulled` de cada questão — o gabarito do motor de ingestão não é fonte.
//
//   lerGabarito(examId) → { total, respostas: { "1": "B", "56": "AB", "3": "ANULADA" }, arquivo }
//                         ou null se o PDF não existe / não pôde ser lido (o portão
//                         trata null como REPROVADO: falha fechada)
//
// Convenções do resultado: letra = gabarito; "AB" = a banca aceitou as duas;
// "ANULADA" = questão anulada (`*`, `—`, "ANULADA" no PDF).
// Provas com vários cadernos: USP lê o 1º (A1/AD1, 1ª coluna); FGV/ENARE lê o
// "TIPO 1" — o mesmo caderno que o pipeline baixa.
const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const ROOT = path.join(__dirname, '..');
const ANULADA = new Set(['*', '—', '-', 'ANULADA', 'ANULADO', 'NULA', 'NULO']);

const norm = v => {
    const x = String(v).replace(/\s+/g, '').toUpperCase();
    // marca sem letra nem número (—, –, -, *, e o tachado U+0336 do Revalida 2024.1) = anulada
    return ANULADA.has(x) || (x && /^[^A-Z0-9]+$/.test(x)) ? 'ANULADA' : x;
};

function familia(examId) {
    if (/^usp-sp-/.test(examId)) return 'usp';
    if (/^(enare|amrigs|psu-ce)-/.test(examId)) return 'fgv';   // linha de números + linha de letras
    if (/^revalida-/.test(examId)) return 'revalida';
    return 'generico';                                           // pares "número letra" (UEPA, CEREM, SES-PE...)
}

// USP: cada linha traz 9 pares número/letra (3 provas × 3 colunas). A 1ª prova
// são os 3 primeiros pares, com números n, n+40, n+80.
function parseUsp(texto) {
    const res = {};
    for (const linha of texto.split('\n')) {
        const pares = [...linha.matchAll(/(\d{1,3})\s+([A-E]\s?[A-E]?|\*)(?=\s|$)/g)].map(m => [Number(m[1]), norm(m[2])]);
        if (pares.length < 3) continue;
        const [a, b, c] = pares;
        if (a[0] >= 1 && a[0] <= 40 && b[0] === a[0] + 40 && c[0] === a[0] + 80) for (const [n, l] of [a, b, c]) res[n] = l;
    }
    if (Object.keys(res).length) return res;
    // formato antigo (USP 2023): tabela de uma prova só, em colunas "número letra"; para antes da PROVA B
    return parseGenerico(texto.split(/PROVA\s+B\b/i)[0]);
}

// FGV (ENARE): bloco de uma linha de números (1..20, 21..40...) seguida da
// linha de letras. Só o "TIPO 1" (corta no "TIPO 2").
function parseFgv(texto) {
    const t = texto.split(/TIPO\s*2/i)[0];
    const res = {};
    const linhas = t.split('\n').filter(l => l.trim());
    for (let i = 0; i < linhas.length - 1; i++) {
        if (!/^\s*(\d{1,3}\s+)+\d{1,3}\s*$/.test(linhas[i]) && !/^\s*\d{1,3}\s*$/.test(linhas[i])) continue;
        const nums = linhas[i].trim().split(/\s+/).map(Number);
        const letras = linhas[i + 1].trim().split(/\s+/);
        if (nums.length >= 5 && letras.length === nums.length && letras.every(x => /^([A-E]|\*)$/.test(x))) nums.forEach((n, k) => { res[n] = norm(letras[k]); });
    }
    return res;
}

// Revalida/INEP: "Questão 1 2 3..." e, logo abaixo, "Gabarito C B — D ..."
function parseRevalida(texto) {
    const res = {};
    const linhas = texto.split('\n');
    for (let i = 0; i < linhas.length; i++) {
        if (!/^\s*Quest[ãa]o\s/i.test(linhas[i])) continue;
        const nums = (linhas[i].match(/\b\d+\b/g) || []).map(Number);
        const g = linhas.slice(i + 1, i + 4).find(l => /^\s*Gabarito\s/i.test(l));
        if (!g) continue;
        const letras = g.replace(/Gabarito/i, '').trim().split(/\s+/);
        if (letras.length === nums.length) nums.forEach((n, k) => { res[n] = norm(letras[k]); });
    }
    return res;
}

// Genérico (UEPA e demais): pares "número letra" em qualquer disposição.
function parseGenerico(texto) {
    const res = {};
    // letras só MAIÚSCULAS (senão "1 a 45" do cabeçalho vira "1 A"); primeira ocorrência vale
    for (const m of texto.matchAll(/(?:^|\s)(\d{1,3})\s+(ANULAD[AO]|Anulad[ao]|NUL[AO]|[A-E]{1,2}|\*|—)(?=\s|$)/g)) if (!(Number(m[1]) in res)) res[Number(m[1])] = norm(m[2]);
    return res;
}

function parseGabaritoTexto(fam, texto) {
    const fn = { usp: parseUsp, fgv: parseFgv, revalida: parseRevalida, generico: parseGenerico }[fam] || parseGenerico;
    let respostas = fn(texto);
    // formato desconhecido para a família: tenta o genérico antes de desistir
    if (Object.keys(respostas).length < 5 && fn !== parseGenerico) respostas = parseGenerico(texto);
    const numeros = Object.keys(respostas).map(Number).sort((a, b) => a - b);
    if (!numeros.length) return null;
    const total = numeros.at(-1);
    return { total, respostas, lacunas: Array.from({ length: total }, (_, i) => i + 1).filter(n => !(n in respostas)) };
}

const cache = new Map();
function lerGabarito(examId) {
    if (cache.has(examId)) return cache.get(examId);
    let r = null;
    try {
        const dir = path.join(ROOT, 'tmp', 'pdfs');
        const arq = fs.existsSync(dir) ? fs.readdirSync(dir).find(f => f.startsWith(`${examId}-gabarito`) && f.endsWith('.pdf')) : null;
        if (arq) {
            const texto = cp.execFileSync('pdftotext', ['-layout', path.join(dir, arq), '-'], { maxBuffer: 1 << 26 }).toString();
            const p = parseGabaritoTexto(familia(examId), texto);
            // gabarito com buraco (número sem letra) não é confiável: falha fechada
            if (p && !p.lacunas.length) r = { total: p.total, respostas: p.respostas, arquivo: arq };
        }
    } catch { r = null; }
    cache.set(examId, r);
    return r;
}

module.exports = { lerGabarito, parseGabaritoTexto, familia };

if (require.main === module) {
    const g = lerGabarito(process.argv[2]);
    if (!g) { console.error('gabarito oficial não encontrado/legível'); process.exit(1); }
    const anul = Object.entries(g.respostas).filter(([, v]) => v === 'ANULADA').map(([n]) => n);
    const dup = Object.entries(g.respostas).filter(([, v]) => v.length === 2).map(([n, v]) => `${n}=${v}`);
    console.log(`${g.arquivo}: ${g.total} questões | anuladas: ${anul.join(',') || '-'} | respostas duplas: ${dup.join(',') || '-'}`);
}
