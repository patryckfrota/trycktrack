// Completude de uma prova: o banco tem TODAS as questões 1..N do caderno?
// N vem do gabarito oficial (pipeline/gabarito-oficial.cjs). Existe porque o
// motor já deu o ENARE 2024 por "concluído" com 46 de 100 questões, e a fila
// chegou a "questão 135" de uma prova de 100.
//
//   node pipeline/completude.cjs <examId>
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { lerGabarito } = require('./gabarito-oficial.cjs');

const ROOT = path.join(__dirname, '..');
const INVENTARIO = path.join(__dirname, 'inventario');

// Função pura: compara os números presentes com 1..total.
function avaliarCompletude(total, numeros) {
    const vistos = new Map();
    for (const n of numeros) vistos.set(n, (vistos.get(n) || 0) + 1);
    const faltam = [];
    for (let n = 1; n <= total; n++) if (!vistos.has(n)) faltam.push(n);
    return {
        total,
        presentes: [...vistos.keys()].filter(n => n >= 1 && n <= total).length,
        faltam,
        repetidas: [...vistos].filter(([, c]) => c > 1).map(([n]) => n),
        foraDoIntervalo: [...vistos.keys()].filter(n => n < 1 || n > total),
        completa: !faltam.length && ![...vistos.keys()].some(n => n < 1 || n > total) && ![...vistos.values()].some(c => c > 1),
        primeiraFaltante: faltam[0] ?? null,
    };
}

// Números das questões da prova que já estão nos arquivos questions-*.js
// (contexto isolado: não polui global.window de quem chamou).
function numerosNoBanco(examId, dir = ROOT) {
    const ctx = { window: {} };
    vm.createContext(ctx);
    for (const f of fs.readdirSync(dir).filter(f => /^questions-.*\.js$/.test(f) && f !== 'questions-internato.js')) {
        vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), ctx);
    }
    return (ctx.window.TRYCKTRACK_QUESTION_BANK || []).filter(q => q.examId === examId).map(q => q.number);
}

// Inventário: números da prova que NÃO entraram porque a questão já existe no
// banco com outro id (dedup contra os bancos por especialidade — L2). Sem isso o
// Revalida nunca fecharia a conta. Gravado pelo portão (validar.cjs).
function lerInventario(examId) {
    try { return JSON.parse(fs.readFileSync(path.join(INVENTARIO, `${examId}.json`), 'utf8')); } catch { return { duplicatas: {} }; }
}
function registrarDuplicata(examId, numero, idExistente) {
    const inv = lerInventario(examId);
    inv.duplicatas = { ...(inv.duplicatas || {}), [numero]: idExistente };
    fs.mkdirSync(INVENTARIO, { recursive: true });
    fs.writeFileSync(path.join(INVENTARIO, `${examId}.json`), JSON.stringify(inv, null, 2) + '\n');
}

// null = não dá para saber (sem gabarito oficial legível): quem chama trata como NÃO concluída.
function completude(examId, dir = ROOT) {
    const g = lerGabarito(examId);
    if (!g) return null;
    const cobertos = [...numerosNoBanco(examId, dir), ...Object.keys(lerInventario(examId).duplicatas || {}).map(Number)];
    return avaliarCompletude(g.total, cobertos);
}

module.exports = { avaliarCompletude, numerosNoBanco, completude, lerInventario, registrarDuplicata };

if (require.main === module) {
    const c = completude(process.argv[2]);
    if (!c) { console.error('sem gabarito oficial legível: não dá para afirmar que a prova está completa'); process.exit(2); }
    console.log(`${process.argv[2]}: ${c.presentes}/${c.total} questões${c.completa ? ' — COMPLETA' : ''}`);
    if (c.faltam.length) console.log(`  faltam: ${c.faltam.join(',')}`);
    if (c.repetidas.length) console.log(`  repetidas: ${c.repetidas.join(',')}`);
    if (c.foraDoIntervalo.length) console.log(`  fora de 1..${c.total}: ${c.foraDoIntervalo.join(',')}`);
    process.exit(c.completa ? 0 : 1);
}
