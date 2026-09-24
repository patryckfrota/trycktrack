import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
    getQuestionTypeCategory, getQuestionYears, applyAdvancedFilter,
    filterQuestionBank, filterInternatoBank, ADVANCED_FILTER_DEFAULT,
    normalizeSearchText, questionMatchesSearch
} from './question-filters.js';
import { buildSearchIndex } from './question-search.js';

function makeQuestion(overrides = {}) {
    return { id: 'q1', area: 'Clínica Médica', options: { A: 'x', B: 'y', C: 'z' }, ...overrides };
}

test('getQuestionTypeCategory: 2 alternativas é Certo/Errado, 3+ é múltipla escolha, discursiva é campo próprio', () => {
    assert.equal(getQuestionTypeCategory(makeQuestion({ options: { A: 'x', B: 'y' } })), 'tipoCertoErrado');
    assert.equal(getQuestionTypeCategory(makeQuestion({ options: { A: 'x', B: 'y', C: 'z' } })), 'tipoMultiplaEscolha');
    assert.equal(getQuestionTypeCategory(makeQuestion({ questionType: 'discursive', options: null })), 'tipoDiscursiva');
});

test('getQuestionYears: usa examYears, cai pra regex em examName/source', () => {
    assert.deepEqual(getQuestionYears({ examYears: ['2024'] }), ['2024']);
    assert.deepEqual(getQuestionYears({ examName: 'Revalida 2023.1' }), ['2023']);
    assert.deepEqual(getQuestionYears({ source: 'INEP 2022' }), ['2022']);
    assert.deepEqual(getQuestionYears({}), []);
});

test('applyAdvancedFilter: "situação" obrigatória cobre resolvida/não resolvida/acertei/errei', () => {
    const questions = [makeQuestion({ id: 'a' }), makeQuestion({ id: 'b' }), makeQuestion({ id: 'c' })];
    const reviewQueue = { a: { lastResult: 'correct' }, b: { lastResult: 'wrong' } };
    const onlyNaoResolvi = applyAdvancedFilter(questions, { ...ADVANCED_FILTER_DEFAULT, situacaoResolvi: false, situacaoNaoResolvi: true }, reviewQueue);
    assert.deepEqual(onlyNaoResolvi.map(q => q.id), ['c']);

    const onlyErrei = applyAdvancedFilter(questions, { ...ADVANCED_FILTER_DEFAULT, situacaoResolvi: false, situacaoNaoResolvi: false, situacaoErrei: true }, reviewQueue);
    assert.deepEqual(onlyErrei.map(q => q.id), ['b']);
});

test('applyAdvancedFilter: "tipo" desligado exclui a categoria inteira, mesmo se a situação bateria', () => {
    const discursiva = makeQuestion({ id: 'd', questionType: 'discursive', options: null });
    const state = { ...ADVANCED_FILTER_DEFAULT, tipoDiscursiva: false };
    assert.deepEqual(applyAdvancedFilter([discursiva], state, {}), []);
});

test('filterQuestionBank: filtro de conteúdo e Filtro Avançado se combinam (AND), não um substitui o outro', () => {
    const bank = [
        makeQuestion({ id: 'q1', area: 'Clínica Médica' }),
        makeQuestion({ id: 'q2', area: 'Clínica Médica', questionType: 'discursive', options: null }),
        makeQuestion({ id: 'q3', area: 'Pediatria' }),
    ];
    const result = filterQuestionBank(bank, {
        mode: 'practice',
        filters: { theme: 'Clínica Médica' },
        advancedFilterState: { ...ADVANCED_FILTER_DEFAULT, tipoDiscursiva: false },
        reviewQueue: {}
    });
    // q3 cai pelo tema, q2 cai pelo tipo (discursiva desligada) — só q1 sobra.
    assert.deepEqual(result.map(q => q.id), ['q1']);
});

test('filterQuestionBank: full-exam ignora tema/situação, filtra só por examId, sem Filtro Avançado', () => {
    const bank = [
        makeQuestion({ id: 'q1', examId: 'exam-A' }),
        makeQuestion({ id: 'q2', examId: 'exam-B' }),
    ];
    const result = filterQuestionBank(bank, {
        mode: 'full-exam',
        filters: { examId: 'exam-A' },
        advancedFilterState: { ...ADVANCED_FILTER_DEFAULT, tipoMultiplaEscolha: false },
        reviewQueue: {}
    });
    // Mesmo com múltipla escolha desligada no Filtro Avançado, a prova
    // completa (Imersão) sempre entrega a edição inteira.
    assert.deepEqual(result.map(q => q.id), ['q1']);
});

test('filterQuestionBank: é a mesma função pro contador "N questões disponíveis" e pra sessão real — equivalência que faltava (C-1)', () => {
    const bank = [
        makeQuestion({ id: 'q1', area: 'Pediatria', options: { A: 'x', B: 'y' } }),          // certo/errado
        makeQuestion({ id: 'q2', area: 'Pediatria', options: { A: 'x', B: 'y', C: 'z' } }),  // múltipla
        makeQuestion({ id: 'q3', area: 'Pediatria', options: { A: 'x', B: 'y', C: 'z' } }),  // múltipla
    ];
    const config = {
        mode: 'practice',
        filters: { theme: 'Pediatria' },
        advancedFilterState: { ...ADVANCED_FILTER_DEFAULT, tipoMultiplaEscolha: false },
        reviewQueue: {}
    };
    const anunciadoPeloContador = filterQuestionBank(bank, config);
    const entregueNaSessao = filterQuestionBank(bank, config);
    assert.deepEqual(anunciadoPeloContador.map(q => q.id), entregueNaSessao.map(q => q.id));
    assert.deepEqual(anunciadoPeloContador.map(q => q.id), ['q1']);
});

test('filterInternatoBank: filtra por rodízio/tópico/tema/semestre e ainda aplica o Filtro Avançado', () => {
    const bank = [
        { id: 'i1', rodizio: 'Clínica Médica', topico: 'A', tema: 'Febre', semestre: '2025.2', options: { A: 'x', B: 'y', C: 'z' } },
        { id: 'i2', rodizio: 'Pediatria', topico: 'A', tema: 'Febre', semestre: '2025.2', options: { A: 'x', B: 'y', C: 'z' } },
    ];
    const result = filterInternatoBank(bank, { rodizio: 'Clínica Médica' }, ADVANCED_FILTER_DEFAULT, {});
    assert.deepEqual(result.map(q => q.id), ['i1']);
});

test('filterQuestionBank: assunto/tópico/subtópico (taxonomia Estratégia MED) filtram junto com área, sem substituí-la', () => {
    const bank = [
        makeQuestion({ id: 'c1', area: 'Cirurgia Geral', assunto: 'Trauma', topico: 'Trauma torácico', subtopico: 'Pneumotórax' }),
        makeQuestion({ id: 'c2', area: 'Cirurgia Geral', assunto: 'Trauma', topico: 'Trauma abdominal', subtopico: 'Lesão esplênica' }),
        makeQuestion({ id: 'c3', area: 'Cirurgia Geral', assunto: 'Abdome Agudo', topico: 'Apendicite aguda', subtopico: 'Diagnóstico' }),
        makeQuestion({ id: 'c4', area: 'Clínica Médica' }), // ainda não classificada — sem assunto/tópico/subtópico
    ];
    const porAssunto = filterQuestionBank(bank, { mode: 'practice', filters: { assunto: 'Trauma' } });
    assert.deepEqual(porAssunto.map(q => q.id).sort(), ['c1', 'c2']);

    const porTopico = filterQuestionBank(bank, { mode: 'practice', filters: { assunto: 'Trauma', topico: 'Trauma torácico' } });
    assert.deepEqual(porTopico.map(q => q.id), ['c1']);

    const porSubtopico = filterQuestionBank(bank, { mode: 'practice', filters: { assunto: 'Trauma', topico: 'Trauma torácico', subtopico: 'Pneumotórax' } });
    assert.deepEqual(porSubtopico.map(q => q.id), ['c1']);

    // sem filtro de assunto, questão não classificada continua aparecendo — assunto/tópico/subtópico é um refinamento, não obrigatório
    const semFiltroAssunto = filterQuestionBank(bank, { mode: 'practice', filters: { theme: 'Clínica Médica' } });
    assert.deepEqual(semFiltroAssunto.map(q => q.id), ['c4']);
});

test('normalizeSearchText: minúsculas e sem acento (B-2)', () => {
    assert.equal(normalizeSearchText('Síndrome de Guillain-Barré'), 'sindrome de guillain-barre');
    assert.equal(normalizeSearchText(''), '');
    assert.equal(normalizeSearchText(null), '');
});

test('questionMatchesSearch: string vazia não filtra nada', () => {
    assert.equal(questionMatchesSearch(makeQuestion({ stem: 'qualquer coisa' }), ''), true);
    assert.equal(questionMatchesSearch(makeQuestion({ stem: 'qualquer coisa' }), '   '), true);
});

test('questionMatchesSearch: acha no enunciado, ignorando acento e caixa', () => {
    const q = makeQuestion({ stem: 'Paciente com síndrome de Guillain-Barré e fraqueza ascendente' });
    assert.equal(questionMatchesSearch(q, 'sindrome guillain barre'), true);
    assert.equal(questionMatchesSearch(q, 'SINDROME'), true);
    assert.equal(questionMatchesSearch(q, 'dengue'), false);
});

test('questionMatchesSearch: também busca nas alternativas e na área', () => {
    const q = makeQuestion({ stem: 'Paciente com dor torácica', area: 'Cardiologia', options: { A: 'infarto agudo do miocárdio', B: 'refluxo' } });
    assert.equal(questionMatchesSearch(q, 'infarto'), true);
    assert.equal(questionMatchesSearch(q, 'cardiologia'), true);
});

test('questionMatchesSearch: múltiplos termos exigem todos (AND), não qualquer um', () => {
    const q = makeQuestion({ stem: 'Homem com dor torácica típica e sudorese', options: { A: 'infarto' } });
    assert.equal(questionMatchesSearch(q, 'dor toracica'), true);
    assert.equal(questionMatchesSearch(q, 'dor toracica dengue'), false);
});

test('filterQuestionBank: busca textual entra no mesmo AND dos outros filtros', () => {
    const bank = [
        makeQuestion({ id: 'q1', area: 'Clínica Médica', stem: 'Paciente com síndrome de Guillain-Barré' }),
        makeQuestion({ id: 'q2', area: 'Pediatria', stem: 'Criança com síndrome de Guillain-Barré' }),
        makeQuestion({ id: 'q3', area: 'Clínica Médica', stem: 'Paciente com dor abdominal' }),
    ];
    const result = filterQuestionBank(bank, {
        mode: 'practice',
        filters: { theme: 'Clínica Médica', search: 'guillain barre' },
        reviewQueue: {}
    });
    // q2 cai pelo tema, q3 cai pela busca — só q1 bate nos dois.
    assert.deepEqual(result.map(q => q.id), ['q1']);
});

test('filterQuestionBank: com searchIndex (R-4), devolve o MESMO conjunto do scan simples, só ordenado por relevância', () => {
    const bank = [
        makeQuestion({ id: 'sobre', stem: 'Infarto agudo do miocárdio: diagnóstico de infarto, tratamento do infarto' }),
        makeQuestion({ id: 'menciona', stem: 'Paciente com queixa vaga, sem relação com infarto, nada a ver' }),
        makeQuestion({ id: 'fora', stem: 'Questão sobre outra coisa qualquer, sem relação nenhuma' }),
    ];
    const config = { mode: 'practice', filters: { search: 'infarto' }, reviewQueue: {} };
    const semIndice = filterQuestionBank(bank, config);
    const comIndice = filterQuestionBank(bank, { ...config, searchIndex: buildSearchIndex(bank) });
    assert.deepEqual([...semIndice.map(q => q.id)].sort(), [...comIndice.map(q => q.id)].sort());
    assert.equal(comIndice[0].id, 'sobre'); // a que É sobre infarto vem primeiro, não a que só menciona
});
