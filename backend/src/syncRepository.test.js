import test from 'node:test';
import assert from 'node:assert/strict';
import { MemorySyncRepository } from './syncRepository.js';

test('pushReviewEntries: primeira entrada de uma questão é gravada direto (nada pra mesclar)', async () => {
  const repo = new MemorySyncRepository();
  const queue = await repo.pushReviewEntries('user-1', {
    'q1': { stability: 3, difficulty: 5, dueDate: '2026-10-01', lastReviewedAt: '2026-09-15', lastRating: 3 }
  });
  assert.equal(queue['q1'].stability, 3);
});

test('pushReviewEntries: entrada mais antiga que a já salva NÃO sobrescreve (mesmo critério do cliente)', async () => {
  const repo = new MemorySyncRepository();
  await repo.pushReviewEntries('user-1', {
    'q1': { stability: 8, difficulty: 3, dueDate: '2026-10-08', lastReviewedAt: '2026-09-15', lastRating: 4 }
  });
  const queue = await repo.pushReviewEntries('user-1', {
    'q1': { stability: 0.4, difficulty: 8, dueDate: '2026-09-16', lastReviewedAt: '2026-09-01', lastRating: 1 } // mais antiga
  });
  assert.equal(queue['q1'].stability, 8); // a mais recente (15/09) venceu, não a do push mais recente
});

test('pushReviewEntries: entrada mais nova SOBRESCREVE a salva', async () => {
  const repo = new MemorySyncRepository();
  await repo.pushReviewEntries('user-1', {
    'q1': { stability: 0.4, difficulty: 8, dueDate: '2026-09-16', lastReviewedAt: '2026-09-01', lastRating: 1 }
  });
  const queue = await repo.pushReviewEntries('user-1', {
    'q1': { stability: 8, difficulty: 3, dueDate: '2026-10-08', lastReviewedAt: '2026-09-15', lastRating: 4 }
  });
  assert.equal(queue['q1'].stability, 8);
});

test('pushReviewEntries: dois usuários diferentes não se misturam', async () => {
  const repo = new MemorySyncRepository();
  await repo.pushReviewEntries('user-1', { 'q1': { stability: 3, difficulty: 5, dueDate: '2026-10-01', lastReviewedAt: '2026-09-15', lastRating: 3 } });
  await repo.pushReviewEntries('user-2', { 'q1': { stability: 9, difficulty: 2, dueDate: '2026-10-20', lastReviewedAt: '2026-09-15', lastRating: 4 } });
  const queue1 = await repo.getReviewQueue('user-1');
  const queue2 = await repo.getReviewQueue('user-2');
  assert.equal(queue1['q1'].stability, 3);
  assert.equal(queue2['q1'].stability, 9);
});

test('pushReviewEntries: questões diferentes do mesmo usuário coexistem (não é substituição de blob inteiro)', async () => {
  const repo = new MemorySyncRepository();
  await repo.pushReviewEntries('user-1', { 'q1': { stability: 3, difficulty: 5, dueDate: '2026-10-01', lastReviewedAt: '2026-09-15', lastRating: 3 } });
  const queue = await repo.pushReviewEntries('user-1', { 'q2': { stability: 5, difficulty: 4, dueDate: '2026-10-05', lastReviewedAt: '2026-09-15', lastRating: 3 } });
  assert.ok(queue['q1']);
  assert.ok(queue['q2']);
});

test('pushResponses: grava cada resposta associada ao userId', async () => {
  const repo = new MemorySyncRepository();
  await repo.pushResponses('user-1', [
    { questionId: 'q1', chosen: 'A', correct: true, answeredAt: '2026-09-15T10:00:00Z' },
    { questionId: 'q2', chosen: 'B', correct: false, answeredAt: '2026-09-15T10:01:00Z' }
  ]);
  assert.equal(repo.responses.length, 2);
  assert.equal(repo.responses[0].userId, 'user-1');
  assert.equal(repo.responses[1].correct, false);
});

test('getReviewQueue: usuário sem nenhuma entrada devolve objeto vazio, não erro', async () => {
  const repo = new MemorySyncRepository();
  assert.deepEqual(await repo.getReviewQueue('ninguem'), {});
});
