import { test } from 'node:test';
import assert from 'node:assert/strict';
import { computeSubjectWeights } from './subject-weights.js';
import { buildSubjectCatalog, subjectStatus } from './trail-subjects.js';
import { priorAccuracy, projectedScore, weakSpots, reviewLoadByDay, subjectRetention } from './trail-metrics.js';

const questions = [
    { id: 'a1', area: 'Pediatria', assunto: 'Puericultura' },
    { id: 'a2', area: 'Pediatria', assunto: 'Puericultura' },
    { id: 'b1', area: 'Cirurgia Geral', assunto: 'Trauma' },
    { id: 'b2', area: 'Cirurgia Geral', assunto: 'Trauma' },
    { id: 'c1', area: 'Cirurgia Geral', assunto: 'Hérnias' },
    { id: 'c2', area: 'Cirurgia Geral', assunto: 'Hérnias' },
];

function withStatus(queue, today = '2026-01-10') {
    const weights = computeSubjectWeights(questions);
    const subjects = buildSubjectCatalog(questions, weights);
    return subjects.map((s) => ({ ...s, status: subjectStatus(s, queue, today) }));
}

test('priorAccuracy é 0 sem nenhum assunto estudado', () => {
    assert.equal(priorAccuracy(withStatus({})), 0);
});

test('priorAccuracy pondera por quantidade de questões estudadas, não por assunto', () => {
    // Puericultura: 1 questão, 100% acerto. Trauma: 2 questões, 0% acerto.
    const queue = {
        a1: { dueDate: '2026-02-01', lastResult: 'correct' },
        b1: { dueDate: '2026-02-01', lastResult: 'wrong' },
        b2: { dueDate: '2026-02-01', lastResult: 'wrong' },
    };
    // média ponderada por questão: (1*1 + 2*0) / 3 = 1/3
    assert.ok(Math.abs(priorAccuracy(withStatus(queue)) - 1 / 3) < 1e-9);
});

test('projectedScore usa acerto real onde estudado e prior onde não', () => {
    const queue = {
        a1: { dueDate: '2026-02-01', lastResult: 'correct' },
        a2: { dueDate: '2026-02-01', lastResult: 'correct' }, // Puericultura 100%
    };
    const subjects = withStatus(queue);
    const result = projectedScore(subjects);
    // Puericultura (peso 2/6) contribui 100%; Trauma e Hérnias (peso 2/6 cada,
    // não estudados) usam o prior = 100% (só há Puericultura estudada) => score = 100%
    assert.ok(Math.abs(result.score - 1) < 1e-9);
    assert.equal(result.prior, 1);
});

test('projectedScore agrega por área corretamente', () => {
    const queue = { a1: { dueDate: '2026-02-01', lastResult: 'correct' }, a2: { dueDate: '2026-02-01', lastResult: 'wrong' } };
    const subjects = withStatus(queue);
    const result = projectedScore(subjects);
    assert.ok(Math.abs(result.byArea['Pediatria'].score - 0.5) < 1e-9);
});

test('weakSpots só considera assuntos já estudados e ordena por peso × erro', () => {
    const queue = {
        a1: { dueDate: '2026-02-01', lastResult: 'wrong' }, // Puericultura: 0% acerto, peso 2/6
        b1: { dueDate: '2026-02-01', lastResult: 'correct' },
        b2: { dueDate: '2026-02-01', lastResult: 'wrong' }, // Trauma: 50% acerto, peso 2/6
    };
    const ranked = weakSpots(withStatus(queue), 5);
    assert.equal(ranked.length, 2); // Hérnias nunca estudado, fica de fora
    assert.equal(ranked[0].key, 'Pediatria > Puericultura'); // pior risco: peso igual, erro maior
});

test('reviewLoadByDay conta questão atrasada no balde de hoje', () => {
    const queue = { a1: { dueDate: '2026-01-05' }, b1: { dueDate: '2026-01-10' }, c1: { dueDate: '2026-01-12' } };
    const buckets = reviewLoadByDay(withStatus(queue), queue, '2026-01-10', 5);
    assert.equal(buckets[0].date, '2026-01-10');
    assert.equal(buckets[0].count, 2); // a1 (atrasada) + b1 (hoje)
    assert.equal(buckets[2].count, 1); // c1 em 2026-01-12
});

test('subjectRetention é null sem nenhuma questão estudada', () => {
    const subjects = withStatus({});
    assert.equal(subjectRetention(subjects[0], {}, '2026-01-10'), null);
});

test('subjectRetention cai com o tempo desde a última revisão', () => {
    const subjects = withStatus({});
    const subject = subjects[0];
    const queueRecente = { [subject.questionIds[0]]: { lastReviewedAt: '2026-01-09', stability: 10 } };
    const queueAntiga = { [subject.questionIds[0]]: { lastReviewedAt: '2025-01-09', stability: 10 } };
    const recente = subjectRetention(subject, queueRecente, '2026-01-10');
    const antiga = subjectRetention(subject, queueAntiga, '2026-01-10');
    assert.ok(recente > antiga);
});
