import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mergeReviewEntry, mergeReviewQueues, reviewEntriesNewerThan } from './sync-merge.js';

function entry(lastReviewedAt, extra = {}) {
    return { stability: 3, difficulty: 5, dueDate: '2026-10-01', lastReviewedAt, lastRating: 3, ...extra };
}

test('mergeReviewEntry: mantém a mais recente por lastReviewedAt', () => {
    const antiga = entry('2026-09-01');
    const nova = entry('2026-09-10');
    assert.equal(mergeReviewEntry(antiga, nova), nova);
    assert.equal(mergeReviewEntry(nova, antiga), nova);
});

test('mergeReviewEntry: um dos lados ausente devolve o que existe, sem quebrar', () => {
    const a = entry('2026-09-01');
    assert.equal(mergeReviewEntry(a, null), a);
    assert.equal(mergeReviewEntry(null, a), a);
    assert.equal(mergeReviewEntry(null, null), null);
});

test('mergeReviewQueues: questão só respondida num dos dispositivos aparece no resultado (não é um "blob vence blob")', () => {
    const local = { 'q1': entry('2026-09-01'), 'so-local': entry('2026-09-05') };
    const remote = { 'q1': entry('2026-08-01'), 'so-remoto': entry('2026-09-02') };
    const merged = mergeReviewQueues(local, remote);
    assert.equal(merged['q1'].lastReviewedAt, '2026-09-01'); // local é mais recente pra q1
    assert.ok(merged['so-local']);   // não some só por existir num dispositivo só
    assert.ok(merged['so-remoto']);  // idem
    assert.equal(Object.keys(merged).length, 3);
});

test('mergeReviewQueues: sem nenhum dos dois lados, devolve vazio sem erro', () => {
    assert.deepEqual(mergeReviewQueues({}, {}), {});
    assert.deepEqual(mergeReviewQueues(undefined, undefined), {});
});

test('reviewEntriesNewerThan: só devolve o que é novo/mais recente que o remoto — não manda a fila inteira', () => {
    const local = { 'q1': entry('2026-09-10'), 'q2': entry('2026-09-01'), 'q3': entry('2026-09-15') };
    const remote = { 'q1': entry('2026-09-05'), 'q2': entry('2026-09-01') }; // q1 local é mais nova, q2 igual, q3 só existe local
    const paraEnviar = reviewEntriesNewerThan(local, remote);
    assert.deepEqual(Object.keys(paraEnviar).sort(), ['q1', 'q3']);
});
