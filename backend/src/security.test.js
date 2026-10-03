import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { app } from './server.js';

test('import de estações exige admin, não apenas login (qualquer um cria conta)', () => {
  // Os handlers são embrulhados por autoWrapAsyncRoutes, então a checagem
  // não aparece no handler; conferimos a declaração da rota no código.
  const codigo = readFileSync(new URL('./server.js', import.meta.url), 'utf8');
  for (const caminho of ['/api/osce/import', '/api/osce/import/preview']) {
    const linha = codigo.split('\n').find(l => l.includes(`app.post('${caminho}'`));
    assert.ok(linha, `rota ${caminho} não encontrada`);
    assert.ok(linha.includes('requireAdminAuth()'), `${caminho} sem checagem de admin`);
  }
});

test('import de estações rejeita requisição sem token com 401', async () => {
  const server = app.listen(0);
  try {
    const res = await fetch(`http://127.0.0.1:${server.address().port}/api/osce/import`, {
      method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}'
    });
    assert.equal(res.status, 401);
  } finally { server.close(); }
});

test('limitador de taxa separa usuários por IP real (X-Forwarded-For), não por IP do proxy', async () => {
  const server = app.listen(0);
  const url = `http://127.0.0.1:${server.address().port}/api/osce/formats`;
  const get = ip => fetch(url, { headers: { 'x-forwarded-for': ip } }).then(r => r.status);
  try {
    let ultimo;
    for (let i = 0; i < 121; i++) ultimo = await get('203.0.113.10');
    assert.equal(ultimo, 429, 'o IP que estourou o limite deve ser barrado');
    assert.equal(await get('203.0.113.77'), 200, 'outro usuário não pode ser afetado');
  } finally { server.close(); }
});
