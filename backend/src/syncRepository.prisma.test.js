import test from 'node:test';
import assert from 'node:assert/strict';
import { PrismaSyncRepository } from './syncRepository.js';

function fakeClient(knownIds) {
    const calls = { upserts: [], created: [] };
    return {
        calls,
        question: { findMany: async ({ where }) => where.id.in.filter(id => knownIds.includes(id)).map(id => ({ id })) },
        userQuestionReview: {
            findMany: async () => [],
            upsert: args => { calls.upserts.push(args.where.userId_questionId.questionId); return Promise.resolve(); }
        },
        questionResponse: { createMany: async ({ data }) => { calls.created.push(...data.map(d => d.questionId)); } },
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
