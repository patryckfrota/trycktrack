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

test('getTrailSettings: usuário/trilha sem nada devolve null, não erro', async () => {
  const repo = new MemorySyncRepository();
  assert.equal(await repo.getTrailSettings('user-1', 'uepa'), null);
});

test('pushTrailSettings: primeira gravação é aceita direto', async () => {
  const repo = new MemorySyncRepository();
  const settings = await repo.pushTrailSettings('user-1', 'uepa', { goal: 0.8, examDate: '2026-12-01', history: [], updatedAt: '2026-09-01T00:00:00.000Z' });
  assert.equal(settings.goal, 0.8);
});

test('pushTrailSettings: blob mais antigo não sobrescreve o mais novo já salvo', async () => {
  const repo = new MemorySyncRepository();
  await repo.pushTrailSettings('user-1', 'uepa', { goal: 0.9, examDate: '2026-12-01', history: [], updatedAt: '2026-09-10T00:00:00.000Z' });
  const settings = await repo.pushTrailSettings('user-1', 'uepa', { goal: 0.5, examDate: null, history: [], updatedAt: '2026-09-01T00:00:00.000Z' });
  assert.equal(settings.goal, 0.9);
});

test('pushTrailSettings: trilhas diferentes do mesmo usuário não se misturam', async () => {
  const repo = new MemorySyncRepository();
  await repo.pushTrailSettings('user-1', 'uepa', { goal: 0.8, examDate: null, history: [], updatedAt: '2026-09-01T00:00:00.000Z' });
  await repo.pushTrailSettings('user-1', 'enamed', { goal: 0.7, examDate: null, history: [], updatedAt: '2026-09-01T00:00:00.000Z' });
  assert.equal((await repo.getTrailSettings('user-1', 'uepa')).goal, 0.8);
  assert.equal((await repo.getTrailSettings('user-1', 'enamed')).goal, 0.7);
});

test('pushResponses: reenviar a mesma resposta (mesma questão e instante) não duplica', async () => {
  const repo = new MemorySyncRepository();
  const response = { questionId: 'q1', correct: true, answeredAt: '2026-10-10T12:00:00.000Z' };
  await repo.pushResponses('user-1', [response]);
  await repo.pushResponses('user-1', [response, { ...response, answeredAt: '2026-10-10T12:01:00.000Z' }]);
  const { responses } = await repo.listResponses('user-1');
  assert.equal(responses.length, 2);
});

test('listResponses: devolve só as do usuário, em ordem, e pagina com next', async () => {
  const repo = new MemorySyncRepository();
  await repo.pushResponses('user-1', [
    { questionId: 'q2', correct: false, answeredAt: '2026-10-10T12:02:00.000Z' },
    { questionId: 'q1', correct: true, answeredAt: '2026-10-10T12:01:00.000Z' }
  ]);
  await repo.pushResponses('user-2', [{ questionId: 'q9', correct: true, answeredAt: '2026-10-10T12:00:00.000Z' }]);
  const page1 = await repo.listResponses('user-1', { limit: 1 });
  assert.deepEqual(page1.responses.map(r => r.questionId), ['q1']);
  assert.equal(page1.next, '2026-10-10T12:01:00.000Z');
  const page2 = await repo.listResponses('user-1', { after: page1.next, limit: 5 });
  assert.deepEqual(page2.responses.map(r => r.questionId), ['q1', 'q2']); // `after` é inclusivo; o cliente deduplica
  assert.equal(page2.next, null);
});

test('pushResponses: evento com data inválida é descartado e não derruba o resto do lote', async () => {
  const repo = new MemorySyncRepository();
  await repo.pushResponses('user-1', [
    { questionId: 'q1', correct: true, answeredAt: 'isso-nao-e-data' },
    { questionId: 'q2', correct: false, answeredAt: '2026-10-10T12:00:00.000Z' },
    { questionId: 'q3', correct: true } // sem data: vale "agora"
  ]);
  const { responses } = await repo.listResponses('user-1');
  assert.deepEqual(responses.map(r => r.questionId).sort(), ['q2', 'q3']);
});
