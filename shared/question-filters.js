/**
 * Filtragem de questões do QuestHub, extraída do app-app.js pra poder
 * ser testada com `node --test` sem DOM. Motivo: o contador "N questões
 * disponíveis" (getFilteredQuestionsForConfig) e a sessão de fato
 * (startQuestionSession) tinham cada um sua própria cópia dessa lógica
 * — as duas divergiram sem nenhum erro em tela (o Filtro Avançado
 * valia pro contador e pro PDF, mas não pra sessão que o aluno
 * respondia). As funções puras daqui são a única fonte de verdade;
 * app-app.js só lê o DOM/localStorage e repassa pra elas.
 */

import { normalizeSearchText } from './text-normalize.js';
import { matchingQuestionIds, rankQuestionsBySearch } from './question-search.js';
export { normalizeSearchText };

export const ADVANCED_FILTER_DEFAULT = {
    tipoCertoErrado: true,
    tipoMultiplaEscolha: true,
    tipoDiscursiva: false,
    situacaoResolvi: true,
    situacaoNaoResolvi: true,
    situacaoAcertei: false,
    situacaoErrei: false
};

export const ADVANCED_FILTER_GROUPS = {
    tipo: ['tipoCertoErrado', 'tipoMultiplaEscolha', 'tipoDiscursiva'],
    situacao: ['situacaoResolvi', 'situacaoNaoResolvi', 'situacaoAcertei', 'situacaoErrei']
};

// Certo/Errado x múltipla escolha não têm campo próprio no banco —
// distingue pela quantidade de alternativas (2 = Certo/Errado, 3+ =
// múltipla escolha). Discursiva já vem marcada em questionType.
export function getQuestionTypeCategory(question) {
    if (question?.questionType === 'discursive') return 'tipoDiscursiva';
    const optionCount = question?.options ? Object.keys(question.options).length : 0;
    return optionCount === 2 ? 'tipoCertoErrado' : 'tipoMultiplaEscolha';
}

export function getQuestionYears(question) {
    if (Array.isArray(question?.examYears) && question.examYears.length) return question.examYears;
    const match = String(question?.examName || question?.source || '').match(/20\d{2}/g);
    return match ? [...new Set(match)] : [];
}

// Substring simples (não é busca por relevância/ranking — 3 a 4 mil
// questões cabem numa varredura linear sem precisar de índice) sobre
// enunciado, alternativas, área/subárea e tema. Cada termo da busca
// precisa aparecer em algum lugar do texto (AND entre termos, OR entre
// os campos onde ele pode aparecer) — "dor toracica infarto" só bate em
// questões que tenham as duas partes, não só uma.
export function questionMatchesSearch(question, search) {
    const query = normalizeSearchText(search).trim();
    if (!query) return true;
    const terms = query.split(/\s+/);
    const haystack = normalizeSearchText([
        question?.stem,
        question?.area,
        question?.subarea,
        question?.tema,
        question?.subtema,
        ...Object.values(question?.options || {})
    ].filter(Boolean).join(' '));
    return terms.every(term => haystack.includes(term));
}

// reviewQueue: mesmo formato de trycktrack-review-queue-v1
// ({ [questionId]: { lastResult: 'correct'|'wrong', ... } }).
export function applyAdvancedFilter(questions, filterState, reviewQueue) {
    const state = { ...ADVANCED_FILTER_DEFAULT, ...filterState };
    const queue = reviewQueue || {};
    return questions.filter(question => {
        if (!state[getQuestionTypeCategory(question)]) return false;
        const entry = queue[question.id];
        const resolved = !!entry;
        return (state.situacaoResolvi && resolved)
            || (state.situacaoNaoResolvi && !resolved)
            || (state.situacaoAcertei && entry?.lastResult === 'correct')
            || (state.situacaoErrei && entry?.lastResult === 'wrong');
    });
}

// Filtro de conteúdo (tema/subtema/instituição/ano/banca/busca) + Filtro
// Avançado, na mesma ordem pro modo "full-exam" (prova completa,
// filtrada só por examId — Imersão sempre entrega a prova inteira,
// sem Filtro Avançado nem busca) e pro modo "internato" (rodízio/
// tópico/tema/semestre, ver filterInternatoBank) quanto pro genérico
// (Guiado/Simulado). Único ponto que decide "quais questões esse
// recorte devolve" — contador e sessão real chamam exatamente esta
// função.
// searchIndex (opcional, de shared/question-search.js/buildSearchIndex):
// quando fornecido, a busca usa o índice invertido (rápido, e o
// resultado sai ordenado por relevância — R-4) em vez de reescanear o
// enunciado inteiro de cada questão a cada chamada. Sem índice, cai no
// scan simples de questionMatchesSearch — mesmo resultado (conjunto
// idêntico), só sem ranking e mais lento num banco grande. app-app.js
// monta e cacheia esse índice (getSearchIndex) e só reconstrói quando o
// banco muda de tamanho, do mesmo jeito que getQuestionIndex faz pro
// C-2 — chamado a cada tecla digitada na busca, não pode recalcular
// tudo do zero toda vez.
export function filterQuestionBank(bank, { mode, filters = {}, advancedFilterState, reviewQueue, searchIndex } = {}) {
    if (mode === 'full-exam') {
        return bank.filter(question => question.examId === filters.examId);
    }
    const {
        theme = 'Todas',
        subtheme = 'Todas',
        tema = 'Todos',
        subtema = 'Todos',
        institution = 'Todas',
        year = 'Todos',
        search = ''
    } = filters;
    const matchedIds = searchIndex ? matchingQuestionIds(search, searchIndex) : null;
    const filtered = bank.filter(question => {
        const questionYears = getQuestionYears(question);
        const source = String(question.source || '');
        return (theme === 'Todas' || question.area === theme)
            && (subtheme === 'Todas' || question.subarea === subtheme)
            && (tema === 'Todos' || question.tema === tema)
            && (subtema === 'Todos' || question.subtema === subtema)
            && (institution === 'Todas' || source.includes(institution))
            && (year === 'Todos' || questionYears.includes(year))
            && (matchedIds ? matchedIds.has(question.id) : questionMatchesSearch(question, search));
    });
    const withAdvancedFilter = applyAdvancedFilter(filtered, advancedFilterState, reviewQueue);
    return searchIndex ? rankQuestionsBySearch(withAdvancedFilter, search, searchIndex) : withAdvancedFilter;
}

// Mesma coisa que filterQuestionBank, mas pro Internato (rodízio/
// tópico/tema/semestre em vez de tema/subtema/instituição/ano/banca —
// ver getInternatoFilteredQuestions em app-app.js).
export function filterInternatoBank(bank, { rodizio = 'Todos', topico = 'Todos', tema = 'Todos', semestre = 'Todos', search = '' } = {}, advancedFilterState, reviewQueue, searchIndex) {
    const matchedIds = searchIndex ? matchingQuestionIds(search, searchIndex) : null;
    const filtered = bank.filter(question =>
        (rodizio === 'Todos' || question.rodizio === rodizio)
        && (topico === 'Todos' || question.topico === topico)
        && (tema === 'Todos' || question.tema === tema)
        && (semestre === 'Todos' || question.semestre === semestre)
        && (matchedIds ? matchedIds.has(question.id) : questionMatchesSearch(question, search)));
    const withAdvancedFilter = applyAdvancedFilter(filtered, advancedFilterState, reviewQueue);
    return searchIndex ? rankQuestionsBySearch(withAdvancedFilter, search, searchIndex) : withAdvancedFilter;
}
