import test from 'node:test';
import assert from 'node:assert/strict';
import { toQuestionRecord, toOptionRecords, buildImportPlan } from './import-questions.js';

test('toQuestionRecord: campos ausentes viram null, não undefined (Prisma exige um ou outro)', () => {
    const record = toQuestionRecord({ id: 'q1', stem: 'x', options: { A: 'a' } }, 'PRINCIPAL');
    assert.equal(record.subarea, null);
    assert.equal(record.examId, null);
    assert.equal(record.rodizio, null);
    assert.equal(record.images.length, 0);
});

test('toQuestionRecord: preserva bank, annulled e needsVisualReview', () => {
    const record = toQuestionRecord({ id: 'q1', stem: 'x', annulled: true, needsVisualReview: true }, 'INTERNATO');
    assert.equal(record.bank, 'INTERNATO');
    assert.equal(record.annulled, true);
    assert.equal(record.needsVisualReview, true);
});

test('toQuestionRecord: number não numérico vira null em vez de NaN', () => {
    assert.equal(toQuestionRecord({ id: 'q1', stem: 'x' }, 'PRINCIPAL').number, null);
    assert.equal(toQuestionRecord({ id: 'q1', stem: 'x', number: 7 }, 'PRINCIPAL').number, 7);
});

test('toOptionRecords: converte o dict de alternativas em lista letra+texto', () => {
    const opts = toOptionRecords({ options: { A: 'primeira', B: 'segunda' } });
    assert.deepEqual(opts, [{ letter: 'A', text: 'primeira' }, { letter: 'B', text: 'segunda' }]);
});

test('toOptionRecords: questão sem options (ex.: discursiva) devolve lista vazia', () => {
    assert.deepEqual(toOptionRecords({ options: null }), []);
});

test('buildImportPlan: usa os bancos estáticos reais e não gera IDs duplicados entre principal e internato', () => {
    const { questions, optionsByQuestionId, explanations } = buildImportPlan();
    assert.ok(questions.length > 3000, 'esperava milhares de questões dos arquivos estáticos reais');
    const ids = new Set(questions.map(q => q.id));
    assert.equal(ids.size, questions.length);
    assert.ok(explanations.length > 0);
    assert.ok(optionsByQuestionId.size === questions.length);
});
