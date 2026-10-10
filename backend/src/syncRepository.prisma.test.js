import test from 'node:test';
import assert from 'node:assert/strict';
import { PrismaSyncRepository } from './syncRepository.js';

function fakeClient(knownIds, storedResponses = []) {
    const calls = { upserts: [], created: [] };
    return {
        calls,
        question: { findMany: async ({ where }) => where.id.in.filter(id => knownIds.includes(id)).map(id => ({ id })) },
        userQuestionReview: {
            findMany: async () => [],
            upsert: args => { calls.upserts.push(args.where.userId_questionId.questionId); return Promise.resolve(); }
        },
        questionResponse: {
            findMany: async () => storedResponses,
            createMany: async (args) => { calls.createManyArgs = args; calls.created.push(...args.data.map(d => d.questionId)); }
        },
        $transaction: async writes => Promise.all(writes)
    };
}

const entry = { stability: 1, difficulty: 5, dueDate: '2026-10-05T00:00:00.000Z', lastReviewedAt: '2026-10-01T00:00:00.000Z', lastRating: 3 };

test('pushReviewEntries ignora questão inexistente em vez de derrubar o envio inteiro', async () => {
    const client = fakeClient(['q-novo']);
    await new PrismaSyncRepository(client).pushReviewEntries('u1', { 'q-antigo': entry, 'q-novo': entry });
    assert.deepEqual(client.calls.upserts, ['q-novo']);
});

test('pushResponses grava só as respostas de questões que existem', async () => {
    const client = fakeClient(['q-novo']);
    await new PrismaSyncRepository(client).pushResponses('u1', [{ questionId: 'q-antigo', correct: true }, { questionId: 'q-novo', correct: false }]);
    assert.deepEqual(client.calls.created, ['q-novo']);
});

test('pushResponses não chama o banco quando nenhuma questão existe', async () => {
    const client = fakeClient([]);
    await new PrismaSyncRepository(client).pushResponses('u1', [{ questionId: 'q-antigo' }]);
    assert.deepEqual(client.calls.created, []);
});

test('pushResponses é idempotente: reenviar o que já está gravado não duplica', async () => {
    const stored = [{ questionId: 'q-novo', answeredAt: new Date('2026-10-10T12:00:00.000Z') }];
    const client = fakeClient(['q-novo'], stored);
    await new PrismaSyncRepository(client).pushResponses('u1', [
        { questionId: 'q-novo', correct: true, answeredAt: '2026-10-10T12:00:00.000Z' },
        { questionId: 'q-novo', correct: true, answeredAt: '2026-10-10T12:05:00.000Z' }
    ]);
    assert.deepEqual(client.calls.created, ['q-novo']);
});

test('pushResponses descarta repetição dentro do próprio lote', async () => {
    const client = fakeClient(['q-novo']);
    const same = { questionId: 'q-novo', correct: false, answeredAt: '2026-10-10T12:00:00.000Z' };
    await new PrismaSyncRepository(client).pushResponses('u1', [same, { ...same }]);
    assert.deepEqual(client.calls.created, ['q-novo']);
});

test('pushResponses descarta data inválida em vez de lançar', async () => {
    const client = fakeClient(['q-novo']);
    await new PrismaSyncRepository(client).pushResponses('u1', [
        { questionId: 'q-novo', correct: true, answeredAt: 'lixo' },
        { questionId: 'q-novo', correct: false, answeredAt: '2026-10-10T12:00:00.000Z' }
    ]);
    assert.deepEqual(client.calls.created, ['q-novo']);
});

test('pushResponses grava com skipDuplicates (o índice único é a garantia contra envios concorrentes)', async () => {
    const client = fakeClient(['q-novo']);
    await new PrismaSyncRepository(client).pushResponses('u1', [{ questionId: 'q-novo', correct: true, answeredAt: '2026-10-10T12:00:00.000Z' }]);
    assert.equal(client.calls.createManyArgs.skipDuplicates, true);
});
