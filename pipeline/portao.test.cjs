// node --test pipeline/*.test.cjs
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { parseGabaritoTexto } = require('./gabarito-oficial.cjs');
const { avaliarCompletude } = require('./completude.cjs');
const { problemasDeImagem, paginasDaQuestao } = require('./imagens-pagina.cjs');
const { validarItem } = require('./validar.cjs');
const { problemaFidelidade } = require('./fidelidade.cjs');
const { avancar } = require('./proxima.cjs');

// ---- leitura do gabarito oficial (trechos reais dos PDFs) --------------------
test('gabarito USP: 1ª prova, anulada (*) e resposta dupla com espaço ("A B")', () => {
    const txt = ` 15      D          55     *          95     C     15   A    55   B    95   D
 16      B          56 A B        96      A   16    A    56   D     96     C
 17      C          57     C      97      B   17    C    57   A     97     B`;
    // só linhas completas contam: monta 3 linhas com n, n+40, n+80
    const g = parseGabaritoTexto('usp', txt.replace('15      D          55', ' 15      D          55'));
    assert.equal(g.respostas[56], 'AB');
    assert.equal(g.respostas[16], 'B');
    assert.equal(g.respostas[55], 'ANULADA');
    assert.equal(g.respostas[96], 'A');
    assert.equal(g.respostas[17], 'C');
});

test('gabarito FGV/ENARE: lê só o TIPO 1 e trata * como anulada', () => {
    const txt = `Acesso Direto - TIPO 1
  1    2    3    4    5
  C    E    C    C    B

 41    42   43   44   45
 E      *   E    C    C

Acesso Direto - TIPO 2
  1    2    3    4    5
  D    C    D    C    B`;
    const g = parseGabaritoTexto('fgv', txt);
    assert.deepEqual([g.respostas[1], g.respostas[2], g.respostas[3]], ['C', 'E', 'C']);
    assert.equal(g.respostas[42], 'ANULADA');
    assert.equal(g.respostas[45], 'C');
    assert.notEqual(g.respostas[1], 'D', 'não pode vazar o TIPO 2');
});

test('gabarito Revalida: "—" é anulada', () => {
    const txt = `Questão    1    2    3    4    5
Gabarito   C    B    —    D    D`;
    const g = parseGabaritoTexto('revalida', txt);
    assert.equal(g.respostas[3], 'ANULADA');
    assert.equal(g.respostas[5], 'D');
    assert.equal(g.total, 5);
});

test('gabarito Revalida: tachado (U+0336) e travessão também são anulada', () => {
    const txt = 'Questão    1    2    3    4    5\nGabarito   C    \u0336    \u2013    D    D';
    const g = parseGabaritoTexto('revalida', txt);
    assert.equal(g.respostas[2], 'ANULADA');
    assert.equal(g.respostas[3], 'ANULADA');
    assert.equal(g.respostas[5], 'D');
});

// ---- completude --------------------------------------------------------------
test('completude: faltantes, repetidas e número fora da prova ("questão 135" de 100)', () => {
    const c = avaliarCompletude(100, [...Array(46).keys()].map(i => i + 1).concat([135, 3]));
    assert.equal(c.completa, false);
    assert.equal(c.faltam.length, 54);
    assert.equal(c.primeiraFaltante, 47);
    assert.deepEqual(c.repetidas, [3]);
    assert.deepEqual(c.foraDoIntervalo, [135]);
    assert.equal(avaliarCompletude(3, [1, 2, 3]).completa, true);
});

test('fila: prova incompleta NÃO é concluída e recomeça da 1ª que falta', () => {
    const estado = { emAndamento: { prefixo: 'enare-2024', inicio: 40 }, concluidas: [], semFonte: [] };
    const r = avancar(7, true, { estado, completude: () => avaliarCompletude(100, [...Array(46).keys()].map(i => i + 1)) });
    assert.equal(r.concluidas.length, 0);
    assert.equal(r.emAndamento.inicio, 47);
    const r2 = avancar(0, true, { estado: { emAndamento: { prefixo: 'x', inicio: 1 }, concluidas: [], semFonte: [] }, completude: () => null });
    assert.equal(r2.concluidas.length, 0, 'gabarito ilegível: falha fechada');
    const ok = avancar(0, true, { estado: { emAndamento: { prefixo: 'x', inicio: 1 }, concluidas: [], semFonte: [] }, completude: () => avaliarCompletude(2, [1, 2]) });
    assert.equal(ok.concluidas.length, 1);
});

// ---- portão: gabarito oficial ------------------------------------------------
const oficial = { total: 5, respostas: { 1: 'C', 2: 'AB', 3: 'ANULADA' } };
const item = q => ({ question: { id: 'p-1', number: 1, examId: 'p', stem: 's', options: { A: 'a', B: 'b', C: 'c', D: 'd', E: 'e' }, answer: 'C', annulled: false, images: [], area: 'Cardiologia', assunto: 'x', ...q }, explanation: {} });
const erros = (it, cat, deps = {}) => validarItem(it, new Map(), new Map(), { gabarito: oficial, ...deps }).erros.filter(e => e.cat === cat).map(e => e.msg);
const casa = (it, cat, re, deps) => erros(it, cat, deps).some(m => re.test(m));

test('portão: letra diferente do oficial reprova; igual passa; dupla aceita as duas', () => {
    assert.equal(erros(item({ number: 1, answer: 'C' }), 'gabarito').length, 0);
    assert.ok(casa(item({ number: 1, answer: 'B' }), 'gabarito', /difere do oficial \(C\)/));
    assert.equal(erros(item({ number: 2, answer: 'A' }), 'gabarito').length, 0);
    assert.equal(erros(item({ number: 2, answer: 'B' }), 'gabarito').length, 0);
    assert.ok(casa(item({ number: 2, answer: 'C' }), 'gabarito', /difere/));
});

test('portão: anulada oficial exige annulled; annulled sem estar anulada reprova (L6)', () => {
    assert.ok(casa(item({ number: 3, answer: 'A', annulled: false }), 'gabarito', /anulada no gabarito oficial/));
    assert.equal(erros(item({ number: 3, answer: null, annulled: true }), 'gabarito').length, 0);
    assert.ok(casa(item({ number: 1, answer: null, annulled: true }), 'anulacao', /oficial traz C/));
});

test('portão: número fora da prova e gabarito ilegível reprovam (falha fechada)', () => {
    assert.ok(casa(item({ number: 135 }), 'gabarito', /não existe no gabarito oficial/));
    const sem = validarItem(item({}), new Map(), new Map(), { gabarito: null }).erros.filter(e => e.cat === 'gabarito');
    assert.ok(sem.some(e => /não pôde ser lido/.test(e.msg)));
});

// ---- portão: imagens por página ----------------------------------------------
function pngFalso(dir, nome, w = 300, h = 200) {
    const b = Buffer.alloc(2000);
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]).copy(b, 0);
    b.writeUInt32BE(13, 8); b.write('IHDR', 12, 'latin1'); b.writeUInt32BE(w, 16); b.writeUInt32BE(h, 20);
    fs.mkdirSync(path.join(dir, 'a'), { recursive: true });
    fs.writeFileSync(path.join(dir, 'a', nome), b);
    return `a/${nome}`;
}
test('imagem: sem registro, de outra questão ou de página distante reprovam; correta passa', () => {
    const raiz = fs.mkdtempSync(path.join(os.tmpdir(), 'img-'));
    const ok = pngFalso(raiz, 'ok.png');
    const q = { number: 7, images: [ok] };
    const reg = { [ok]: { examId: 'p', numero: 7, pagina: 4 } };
    assert.match(problemasDeImagem(q, { registro: {}, paginas: [4], raiz })[0], /sem registro/);
    assert.deepEqual(problemasDeImagem(q, { registro: reg, paginas: [4], raiz }), []);
    assert.deepEqual(problemasDeImagem(q, { registro: reg, paginas: [5], raiz }), [], 'página vizinha é tolerada');
    assert.match(problemasDeImagem(q, { registro: reg, paginas: [9], raiz })[0], /vem da página 4/);
    assert.match(problemasDeImagem({ number: 8, images: [ok] }, { registro: reg, paginas: [4], raiz })[0], /recortada para a questão 7/);
    const mini = pngFalso(raiz, 'mini.png', 10, 10);
    assert.match(problemasDeImagem({ number: 1, images: [mini] }, { registro: { [mini]: { numero: 1, pagina: 1 } }, paginas: [1], raiz })[0], /pequena demais/);
});

test('imagem: achar a página da questão pelo texto do enunciado', () => {
    const norm = s => s.toLowerCase().replace(/[^a-z0-9]/g, '');
    const paginas = ['intro da prova', 'questao um texto qualquer do caso clinico um', 'paciente de 30 anos apresenta dor toracica e dispneia ha dois dias qual a conduta'].map(norm);
    assert.deepEqual(paginasDaQuestao('p', { stem: 'Paciente de 30 anos apresenta dor torácica e dispneia há dois dias. Qual a conduta?' }, paginas), [3]);
    assert.equal(paginasDaQuestao('p', { stem: 'x' }, null), null);
});

// ---- fidelidade: falha fechada --------------------------------------------------
const norm = s => s.toLowerCase().replace(/[^a-z0-9]/g, '');
test('fidelidade: PDF ilegível ou ausente REPROVA (antes passava em silêncio)', () => {
    const q = { stem: 'Paciente com dor toracica', options: { A: 'um', B: 'dois' } };
    assert.match(problemaFidelidade(q, { pdf: { erro: 'o PDF x não tem camada de texto legível' } }), /NÃO verificada/);
    assert.match(problemaFidelidade({ ...q, examId: 'prova-que-nao-existe-9999' }), /NÃO verificada.*não encontrado/);
});
test('fidelidade: texto igual ao do PDF passa, texto inventado reprova', () => {
    const pdf = { texto: norm('Paciente de 30 anos com dor toracica ha dois dias. Qual a conduta? (A) ecg (B) alta') };
    assert.equal(problemaFidelidade({ stem: 'Paciente de 30 anos com dor torácica há dois dias. Qual a conduta?', options: { A: 'ecg', B: 'alta' } }, { pdf }), null);
    assert.match(problemaFidelidade({ stem: 'Homem de 70 anos com febre e tosse produtiva e sem relato de viagem recente nem de contato', options: { A: 'tomografia', B: 'ressonancia' } }, { pdf }), /não bate com o caderno/);
});
test('imagem: sem poder localizar a questão no caderno, reprova', () => {
    assert.ok(problemasDeImagem({ number: 1, images: ['x.png'] }, { registro: {}, paginas: null, raiz: '/tmp' }).some(m => /não foi possível localizar/.test(m)));
});
