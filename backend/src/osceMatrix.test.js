import test from 'node:test';
import assert from 'node:assert/strict';
import { OSCE_MATRIX, OSCE_FORMATS } from './osceMatrix.js';
import { app, setOsceStationsForTests } from './server.js';

test('matriz OSCE contém seis áreas e dois temas por área', () => {
  assert.equal(OSCE_MATRIX.length, 6);
  for (const area of OSCE_MATRIX) assert.deepEqual(area.themes.map(theme => theme.code), ['A', 'B']);
});

test('matriz preserva subtemas sem inventar estações', () => {
  const total = OSCE_MATRIX.flatMap(area => area.themes).flatMap(theme => theme.subthemes).length;
  assert.ok(total >= 130);
  assert.ok(OSCE_FORMATS.includes('ESTACAO_COMPLETA'));
});

test('API navega a hierarquia área, tema e subtema', async () => {
  const server = app.listen(0);
  const { port } = server.address();
  try {
    const base = `http://127.0.0.1:${port}`;
    const areasResponse = await fetch(`${base}/api/osce/areas`);
    const areas = await areasResponse.json();
    assert.equal(areas.areas.length, 6);
    const areaId = areas.areas[0].id;
    const themes = await (await fetch(`${base}/api/osce/areas/${areaId}/themes`)).json();
    assert.deepEqual(themes.themes.map(theme => theme.code), ['A', 'B']);
    const subthemes = await (await fetch(`${base}/api/osce/themes/${themes.themes[0].id}/subthemes`)).json();
    assert.ok(subthemes.subthemes.length > 0);
    const detail = await (await fetch(`${base}/api/osce/subthemes/${subthemes.subthemes[0].id}`)).json();
    assert.equal(detail.subtheme.id, subthemes.subthemes[0].id);
  } finally {
    server.close();
  }
});

test('endpoint de sessão do avaliando não vaza conteúdo protegido', async () => {
  setOsceStationsForTests([{ id: 'secure-station', area: 'Clínica Médica', theme: 'Tema A', subtheme: 'Asma', format: 'ESTACAO_COMPLETA', title: 'Estação segura', timeLimitSeconds: 300, content: { metadata: { area: 'Clínica Médica', theme: 'Tema A', subtheme: 'Asma', format: 'ESTACAO_COMPLETA' }, doorInstructions: { chiefComplaint: 'Dispneia', candidateTasks: ['Anamnese'] }, patientScript: { profile: { diagnosis: 'oculto' }, hiddenInformation: ['não mostrar'] }, evaluation: { diagnosis: 'oculto', tasks: [{ checklist: [{ id: 'x', item: 'avaliar', points: 3 }] }] } } }]);
  const server = app.listen(0);
  const { port } = server.address();
  try {
    const response = await fetch(`http://127.0.0.1:${port}/api/osce/sessions`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ stationId: 'secure-station', userId: 'user-1', mode: 'CANDIDATE' }) });
    const body = await response.json();
    const serialized = JSON.stringify(body).toLowerCase();
    assert.equal(serialized.includes('diagnosis'), false);
    assert.equal(serialized.includes('checklist'), false);
    assert.equal(serialized.includes('points'), false);
  } finally {
    server.close();
    setOsceStationsForTests([]);
  }
});

test('checklist só aparece após encerrar tarefa e gabarito somente no resultado final', async () => {
  setOsceStationsForTests([{ id: 'task-station', area: 'Clínica Médica', theme: 'Tema A', subtheme: 'Asma', format: 'ESTACAO_COMPLETA', title: 'Estação segura', timeLimitSeconds: 300, content: { metadata: { area: 'Clínica Médica', theme: 'Tema A', subtheme: 'Asma', format: 'ESTACAO_COMPLETA' }, doorInstructions: { chiefComplaint: 'Dispneia', candidateTasks: [{ id: 't1', title: 'Anamnese', instructions: 'Realize a anamnese.' }] } }, evaluatorContentJson: { tasks: [{ id: 't1', title: 'Anamnese', answerKey: 'Gabarito protegido', checklist: [{ id: 'c1', axis: 'HISTORY', item: 'Investiga início', points: 2 }] }], finalAnswer: { expectedDiagnosis: 'Diagnóstico protegido' } } }]);
  const server = app.listen(0); const { port } = server.address(); const base = `http://127.0.0.1:${port}`;
  try {
    const started = await (await fetch(`${base}/api/osce/sessions`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ stationId: 'task-station', userId: 'u1', mode: 'CANDIDATE' }) })).json();
    assert.equal(JSON.stringify(started).includes('Gabarito protegido'), false);
    const closed = await (await fetch(`${base}/api/osce/sessions/${started.sessionId}/tasks/0/complete`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}' })).json();
    assert.equal(closed.task.checklist[0].item, 'Investiga início');
    assert.equal('points' in closed.task.checklist[0], false);
    const earlyReveal = await fetch(`${base}/api/osce/sessions/${started.sessionId}/reveal-result`, { method: 'POST' });
    assert.equal(earlyReveal.status, 409);
    await fetch(`${base}/api/osce/sessions/${started.sessionId}/tasks/0/self-assessment`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ checklist: [{ id: 'c1', status: 'DONE' }] }) });
    await fetch(`${base}/api/osce/sessions/${started.sessionId}/finish`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}' });
    const final = await (await fetch(`${base}/api/osce/sessions/${started.sessionId}/reveal-result`, { method: 'POST' })).json();
    assert.equal(final.locked, true);
    assert.equal(JSON.stringify(final).includes('Gabarito protegido'), true);
    const afterReveal = await fetch(`${base}/api/osce/sessions/${started.sessionId}/tasks/0/self-assessment`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ checklist: [{ id: 'c1', status: 'NOT_DONE' }] }) });
    assert.equal(afterReveal.status, 409);
  } finally { server.close(); setOsceStationsForTests([]); }
});
