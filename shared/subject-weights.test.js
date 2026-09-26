import { test } from 'node:test';
import assert from 'node:assert/strict';
import { subjectKey, computeSubjectWeights } from './subject-weights.js';

test('subjectKey combina area e assunto', () => {
    assert.equal(subjectKey({ area: 'Pediatria', assunto: 'Puericultura' }), 'Pediatria > Puericultura');
});

test('subjectKey cai pra só area quando não tem assunto', () => {
    assert.equal(subjectKey({ area: 'Pediatria', assunto: '' }), 'Pediatria');
});

test('computeSubjectWeights ignora questões sem assunto e soma 1 no total', () => {
    const questions = [
        { id: '1', area: 'Pediatria', assunto: 'Puericultura' },
        { id: '2', area: 'Pediatria', assunto: 'Puericultura' },
        { id: '3', area: 'Cirurgia Geral', assunto: 'Trauma' },
        { id: '4', area: 'Cirurgia Geral', assunto: '' },
    ];
    const weights = computeSubjectWeights(questions);
    assert.equal(weights.size, 2);
    const pueri = weights.get('Pediatria > Puericultura');
    assert.equal(pueri.count, 2);
    assert.equal(pueri.weight, 2 / 3);
    const trauma = weights.get('Cirurgia Geral > Trauma');
    assert.equal(trauma.weight, 1 / 3);
    const total = [...weights.values()].reduce((sum, e) => sum + e.weight, 0);
    assert.ok(Math.abs(total - 1) < 1e-9);
});

test('computeSubjectWeights lida com lista vazia sem dividir por zero', () => {
    const weights = computeSubjectWeights([]);
    assert.equal(weights.size, 0);
});
