import { test } from 'node:test';
import assert from 'node:assert/strict';
import { computeSubjectWeights } from './subject-weights.js';
import { buildSubjectCatalog, subjectStatus, prioritizeNewSubjects, weightedCoverage } from './trail-subjects.js';

const questions = [
    { id: 'a1', area: 'Pediatria', assunto: 'Puericultura' },
    { id: 'a2', area: 'Pediatria', assunto: 'Puericultura' },
    { id: 'b1', area: 'Cirurgia Geral', assunto: 'Trauma' },
    { id: 'b2', area: 'Cirurgia Geral', assunto: 'Trauma' },
];

function catalog() {
    const weights = computeSubjectWeights(questions);
    return buildSubjectCatalog(questions, weights);
}

test('buildSubjectCatalog só inclui ids presentes no recorte de questões', () => {
    const subjects = catalog();
    assert.equal(subjects.length, 2);
    const pueri = subjects.find((s) => s.key === 'Pediatria > Puericultura');
    assert.deepEqual(pueri.questionIds.sort(), ['a1', 'a2']);
});

test('subjectStatus: sem nenhuma questão na fila é "novo"', () => {
    const [subject] = catalog();
    const status = subjectStatus(subject, {}, '2026-01-10');
    assert.equal(status.status, 'novo');
    assert.equal(status.studied, 0);
});

test('subjectStatus: questão vencida antes de hoje marca "atrasado"', () => {
    const subject = catalog().find((s) => s.key === 'Pediatria > Puericultura');
    const queue = { a1: { dueDate: '2026-01-05', lastResult: 'correct' } };
    const status = subjectStatus(subject, queue, '2026-01-10');
    assert.equal(status.status, 'atrasado');
    assert.equal(status.overdue, 1);
    assert.equal(status.studied, 1);
});

test('subjectStatus: vence hoje sem atraso é "faça agora"', () => {
    const subject = catalog().find((s) => s.key === 'Pediatria > Puericultura');
    const queue = { a1: { dueDate: '2026-01-10', lastResult: 'correct' } };
    const status = subjectStatus(subject, queue, '2026-01-10');
    assert.equal(status.status, 'faça agora');
});

test('subjectStatus: tudo no futuro é "em dia"', () => {
    const subject = catalog().find((s) => s.key === 'Pediatria > Puericultura');
    const queue = { a1: { dueDate: '2026-02-01', lastResult: 'correct' } };
    const status = subjectStatus(subject, queue, '2026-01-10');
    assert.equal(status.status, 'em dia');
});

test('prioritizeNewSubjects ordena só os não estudados, maior peso primeiro', () => {
    const subjects = catalog();
    const withStatus = subjects.map((s) => ({ ...s, status: subjectStatus(s, {}, '2026-01-10') }));
    const ranked = prioritizeNewSubjects(withStatus);
    assert.equal(ranked.length, 2);
    assert.equal(ranked[0].weight, 0.5); // ambos empatam em peso (2/2), mas devem vir ambos
});

test('prioritizeNewSubjects exclui quem já tem pelo menos 1 questão estudada', () => {
    const subjects = catalog();
    const withStatus = subjects.map((s) => ({
        ...s,
        status: subjectStatus(s, s.key.includes('Trauma') ? { b1: { dueDate: '2026-02-01', lastResult: 'correct' } } : {}, '2026-01-10'),
    }));
    const ranked = prioritizeNewSubjects(withStatus);
    assert.equal(ranked.length, 1);
    assert.equal(ranked[0].key, 'Pediatria > Puericultura');
});

test('weightedCoverage: nada estudado é 0, tudo estudado é 1', () => {
    const subjects = catalog();
    const nada = subjects.map((s) => ({ ...s, status: subjectStatus(s, {}, '2026-01-10') }));
    assert.equal(weightedCoverage(nada), 0);

    const queueTudo = { a1: { dueDate: '2026-02-01', lastResult: 'correct' }, b1: { dueDate: '2026-02-01', lastResult: 'correct' } };
    const tudo = subjects.map((s) => ({ ...s, status: subjectStatus(s, queueTudo, '2026-01-10') }));
    assert.equal(weightedCoverage(tudo), 1);
});

test('weightedCoverage pondera pelo peso real, não pela contagem de assuntos', () => {
    const bigQuestions = [
        { id: 'x1', area: 'A', assunto: 'Grande' }, { id: 'x2', area: 'A', assunto: 'Grande' },
        { id: 'x3', area: 'A', assunto: 'Grande' }, { id: 'x4', area: 'A', assunto: 'Grande' },
        { id: 'y1', area: 'A', assunto: 'Pequeno' },
    ];
    const weights = computeSubjectWeights(bigQuestions);
    const subjects = buildSubjectCatalog(bigQuestions, weights);
    // só o assunto Pequeno (peso 0.2) foi estudado
    const queue = { y1: { dueDate: '2026-02-01', lastResult: 'correct' } };
    const withStatus = subjects.map((s) => ({ ...s, status: subjectStatus(s, queue, '2026-01-10') }));
    assert.equal(weightedCoverage(withStatus), 0.2);
});
