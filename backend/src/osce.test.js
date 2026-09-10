import test from 'node:test';
import assert from 'node:assert/strict';
import { assertCandidateSafe, buildCandidateSessionView, buildCandidateStation, buildTaskSelfAssessment, summarizeOsceSession } from './osce.js';

const station = {
  id: 'asma-01', area: 'Clínica Médica', theme: 'Respiratório', subtheme: 'Asma',
  format: 'Estação completa', doorInstructions: 'Avalie a paciente com dispneia.',
  timeLimitSeconds: 480,
  scenario: {
    patientProfile: { name: 'Paciente simulada' }, triggers: [], timeline: [],
    checklist: [{ category: 'history', item: 'Investiga sintomas', points: 2 }]
  }
};

test('candidato recebe apenas os dados da porta, nunca o cenário', () => {
  const safe = buildCandidateStation(station);
  assert.equal(safe.doorInstructions, station.doorInstructions);
  assert.equal('scenario' in safe, false);
  assert.equal('patientProfile' in safe, false);
});

test('resumo agrupa pontuação por categoria', () => {
  const result = summarizeOsceSession([{ type: 'QUESTION' }], [
    { category: 'history', points: 2, awardedPoints: 1 },
    { category: 'communication', points: 1, awardedPoints: 1 }
  ]);
  assert.equal(result.eventCount, 1);
  assert.equal(result.totalPoints, 2);
  assert.equal(result.maxPoints, 3);
  assert.equal(result.categories.history.points, 1);
});

test('modo avaliando libera tarefas, mas nunca checklist, diagnóstico ou pontuação', () => {
  const structured = {
    id: 'station-structured', area: 'Clínica Médica', theme: 'Tema A', subtheme: 'Asma', format: 'ESTACAO_COMPLETA', title: 'Estação', timeLimitSeconds: 480,
    content: {
      metadata: { area: 'Clínica Médica', theme: 'Tema A', subtheme: 'Asma', format: 'ESTACAO_COMPLETA' },
      doorInstructions: { chiefComplaint: 'Falta de ar', candidateTasks: [{ id: 't1', title: 'Realize a anamnese' }, { id: 't2', title: 'Defina a conduta' }] },
      patientScript: { profile: { diagnosis: 'asma' }, hiddenInformation: ['segredo'] },
      evaluation: { tasks: [{ checklist: [{ id: 'c1', item: 'Investiga sintomas', points: 2 }] }], diagnosis: 'asma' }
    }
  };
  const view = buildCandidateSessionView(structured, { currentTaskIndex: 0 });
  assert.deepEqual(view.tasks.map(item => item.title), ['Realize a anamnese', 'Defina a conduta']);
  assert.doesNotThrow(() => assertCandidateSafe(view));
  assert.equal('evaluation' in view, false);
  assert.equal(JSON.stringify(view).toLowerCase().includes('diagnosis'), false);
  const task = buildTaskSelfAssessment(structured, 0, 'DONE');
  assert.equal(task.checklist[0].status, 'NOT_DONE');
  assert.equal('points' in task.checklist[0], false);
});
