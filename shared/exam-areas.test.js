import { test } from 'node:test';
import assert from 'node:assert/strict';
import { grandeAreaForUepaQuestion, displayAreaFor } from './exam-areas.js';

test('displayAreaFor junta especialidades nas grandes áreas pra exibição', () => {
    assert.equal(displayAreaFor('Cardiologia'), 'Clínica Médica');
    assert.equal(displayAreaFor('Obstetrícia'), 'Ginecologia e Obstetrícia');
    assert.equal(displayAreaFor('Cirurgia Geral'), 'Cirurgia Geral');
    assert.equal(displayAreaFor('Psiquiatria'), 'Outras especialidades');
    assert.equal(displayAreaFor(undefined), 'Outras especialidades');
});

test('classifica pelos limites de cada bloco de 20 questões', () => {
    assert.equal(grandeAreaForUepaQuestion({ number: 1 }), 'Medicina Preventiva');
    assert.equal(grandeAreaForUepaQuestion({ number: 20 }), 'Medicina Preventiva');
    assert.equal(grandeAreaForUepaQuestion({ number: 21 }), 'Clínica Médica');
    assert.equal(grandeAreaForUepaQuestion({ number: 40 }), 'Clínica Médica');
    assert.equal(grandeAreaForUepaQuestion({ number: 41 }), 'Cirurgia Geral');
    assert.equal(grandeAreaForUepaQuestion({ number: 60 }), 'Cirurgia Geral');
    assert.equal(grandeAreaForUepaQuestion({ number: 61 }), 'Ginecologia e Obstetrícia');
    assert.equal(grandeAreaForUepaQuestion({ number: 80 }), 'Ginecologia e Obstetrícia');
    assert.equal(grandeAreaForUepaQuestion({ number: 81 }), 'Pediatria');
    assert.equal(grandeAreaForUepaQuestion({ number: 100 }), 'Pediatria');
});

test('number fora de 1-100 ou ausente devolve null, nunca uma área chutada', () => {
    assert.equal(grandeAreaForUepaQuestion({ number: 0 }), null);
    assert.equal(grandeAreaForUepaQuestion({ number: 101 }), null);
    assert.equal(grandeAreaForUepaQuestion({ number: 1.5 }), null);
    assert.equal(grandeAreaForUepaQuestion({}), null);
    assert.equal(grandeAreaForUepaQuestion(null), null);
});
