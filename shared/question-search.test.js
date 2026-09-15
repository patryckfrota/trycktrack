import { test } from 'node:test';
import assert from 'node:assert/strict';
import { tokenize, buildSearchIndex, matchingQuestionIds, rankQuestionsBySearch } from './question-search.js';

function makeQuestion(overrides = {}) {
    return { id: 'q1', area: 'Clínica Médica', options: {}, ...overrides };
}

test('tokenize: remove stopwords, acentos e termos curtos', () => {
    assert.deepEqual(tokenize('Dor torácica e sudorese'), ['dor', 'toracica', 'sudorese']);
    assert.deepEqual(tokenize('a o e de da'), []);
});

test('matchingQuestionIds: sem termo devolve null (sinal de "sem filtro"), não vazio', () => {
    const index = buildSearchIndex([makeQuestion({ stem: 'Paciente com dor' })]);
    assert.equal(matchingQuestionIds('', index), null);
    assert.equal(matchingQuestionIds('   ', index), null);
});

test('matchingQuestionIds: AND entre termos — precisa achar todos, não só um', () => {
    const bank = [
        makeQuestion({ id: 'a', stem: 'Paciente com dor torácica e sudorese' }),
        makeQuestion({ id: 'b', stem: 'Paciente com dor abdominal' }),
    ];
    const index = buildSearchIndex(bank);
    assert.deepEqual([...matchingQuestionIds('dor toracica', index)].sort(), ['a']);
    assert.deepEqual([...matchingQuestionIds('dor', index)].sort(), ['a', 'b']);
    assert.deepEqual([...matchingQuestionIds('dor dengue', index)], []);
});

test('rankQuestionsBySearch: quem repete o termo (tf maior) ou tem termo mais raro (idf maior) vem primeiro', () => {
    const bank = [
        makeQuestion({ id: 'menciona', stem: 'Paciente com queixa vaga, sem relação com infarto nenhuma outra coisa aqui' }),
        makeQuestion({ id: 'e-sobre', stem: 'Infarto agudo do miocárdio: diagnóstico de infarto, tratamento do infarto, prevenção de infarto' }),
    ];
    const index = buildSearchIndex(bank);
    const ranked = rankQuestionsBySearch(bank, 'infarto', index);
    assert.equal(ranked[0].id, 'e-sobre');
});

test('rankQuestionsBySearch: termo raro (baixo df) pesa mais que termo comum (alto df) — idf', () => {
    const bank = [
        makeQuestion({ id: 'comum', stem: 'dor dor dor dor' }),          // "dor" aparece em quase tudo
        makeQuestion({ id: 'raro', stem: 'sudorese' }),
        makeQuestion({ id: 'ruido1', stem: 'dor generica um' }),
        makeQuestion({ id: 'ruido2', stem: 'dor generica dois' }),
        makeQuestion({ id: 'ruido3', stem: 'dor generica tres' }),
    ];
    const index = buildSearchIndex(bank);
    const rankedSudorese = rankQuestionsBySearch(bank, 'sudorese', index);
    assert.equal(rankedSudorese[0].id, 'raro');
});

test('rankQuestionsBySearch: sem termo de busca não reordena', () => {
    const bank = [makeQuestion({ id: 'z' }), makeQuestion({ id: 'a' })];
    const index = buildSearchIndex(bank);
    assert.deepEqual(rankQuestionsBySearch(bank, '', index).map(q => q.id), ['z', 'a']);
});

test('buildSearchIndex: busca também alcança alternativas e área, igual questionMatchesSearch (B-2)', () => {
    const bank = [makeQuestion({ id: 'q1', stem: 'Paciente com dor torácica', area: 'Cardiologia', options: { A: 'infarto agudo do miocárdio' } })];
    const index = buildSearchIndex(bank);
    assert.deepEqual([...matchingQuestionIds('infarto', index)], ['q1']);
    assert.deepEqual([...matchingQuestionIds('cardiologia', index)], ['q1']);
});
