import test from 'node:test';
import assert from 'node:assert/strict';
import { app, setSyncRepositoryForTests } from './server.js';
import { MemorySyncRepository } from './syncRepository.js';

// Igual /api/osce/me/history (M-3 da auditoria): nunca aceita um
// userId vindo do corpo ou da URL sem prova — as duas rotas exigem
// Authorization: Bearer <id token> do Firebase. Não dá pra forjar um
// token assinado de verdade num teste automatizado (precisaria de uma
// chave privada real do Google), então a cobertura aqui é o que É
// testável sem rede: a rota rejeita quem não apresenta token nenhum.
// A lógica de merge em si (o que realmente importa acertar) está
// coberta sem precisar de HTTP nenhum em syncRepository.test.js.
test('POST /api/sync/push exige autenticação — sem token, 401', async () => {
  setSyncRepositoryForTests(new MemorySyncRepository());
  const server = app.listen(0);
  const { port } = server.address();
  try {
    const res = await fetch(`http://127.0.0.1:${port}/api/sync/push`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ reviewEntries: {}, responses: [] })
    });
    assert.equal(res.status, 401);
  } finally { server.close(); }
});

test('GET /api/sync/review-queue exige autenticação — sem token, 401', async () => {
  setSyncRepositoryForTests(new MemorySyncRepository());
  const server = app.listen(0);
  const { port } = server.address();
  try {
    const res = await fetch(`http://127.0.0.1:${port}/api/sync/review-queue`);
    assert.equal(res.status, 401);
  } finally { server.close(); }
});

test('POST /api/sync/push com token inválido — 401, não 500 (o parser do JWT não explode com lixo)', async () => {
  setSyncRepositoryForTests(new MemorySyncRepository());
  const server = app.listen(0);
  const { port } = server.address();
  try {
    const res = await fetch(`http://127.0.0.1:${port}/api/sync/push`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: 'Bearer isso-nao-e-um-jwt' },
      body: JSON.stringify({ reviewEntries: {}, responses: [] })
    });
    assert.equal(res.status, 401);
  } finally { server.close(); }
});
