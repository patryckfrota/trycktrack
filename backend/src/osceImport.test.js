import test from 'node:test';
import assert from 'node:assert/strict';
import { MemoryOsceRepository } from './osceRepository.js';
import { importStations, previewStationImport } from './services/osce-import.service.js';

function fixture(externalId = 'fixture-1', title = 'Fixture estrutural') {
  return {
    schemaVersion: '1.0.0', externalId,
    metadata: { areaSlug: 'clinica-medica', themeCode: 'A', subthemeSlug: 'asma-e-dpoc', format: 'ESTACAO_COMPLETA', title, version: 1, estimatedMinutes: 8 },
    scenario: { environment: 'Ambiente de teste', materials: [] },
    doorInstructions: { chiefComplaint: 'Queixa de teste', triageData: {} },
    patientScript: { profile: {}, openingStatement: 'Resposta inicial de teste', responses: [], hiddenInformation: [] },
    physicalExam: [], complementaryTests: [], evolution: [],
    tasks: [{ id: 't1', title: 'Tarefa de teste', candidateInstructions: 'Execute a tarefa.', checklist: [{ id: 'c1', axis: 'COMMUNICATION', description: 'Item de teste', points: 1, critical: false }], answerKey: 'Conteúdo protegido de teste' }],
    finalAnswer: { expectedDiagnosis: 'Diagnóstico protegido de teste', expectedManagement: ['Conduta de teste'], criticalErrors: [], explanation: 'Explicação de teste' }
  };
}

test('pré-visualização valida lote e detecta duplicata interna', () => {
  const station = fixture();
  const preview = previewStationImport({ stations: [station, station] });
  assert.equal(preview.total, 2);
  assert.equal(preview.newCount, 1);
  assert.equal(preview.duplicateCount, 1);
});

test('importador aceita múltiplas estações diferentes no mesmo subtema', async () => {
  const repository = new MemoryOsceRepository({ subthemes: [{ id: 'sub-1', areaSlug: 'clinica-medica', themeCode: 'A', slug: 'asma-e-dpoc', name: 'Asma e DPOC' }] });
  const result = await importStations({ stations: [fixture('v1', 'Variação 1'), fixture('v2', 'Variação 2')] }, repository);
  assert.equal(result.importedCount, 2);
  assert.equal((await repository.listStations()).length, 2);
});

test('conteúdo protegido fica separado do conteúdo do candidato na importação', async () => {
  const repository = new MemoryOsceRepository({ subthemes: [{ id: 'sub-1', areaSlug: 'clinica-medica', themeCode: 'A', slug: 'asma-e-dpoc', name: 'Asma e DPOC' }] });
  await importStations(fixture(), repository);
  const station = (await repository.listStations())[0];
  assert.equal(JSON.stringify(station.clinicalContentJson).includes('Diagnóstico protegido'), false);
  assert.equal(JSON.stringify(station.evaluatorContentJson).includes('Diagnóstico protegido'), true);
});
