import { test } from 'node:test';
import assert from 'node:assert/strict';
import { grandeAreaForUepaQuestion } from './exam-areas.js';

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
