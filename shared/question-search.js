/**
 * Índice invertido + TF-IDF para a busca do QuestHub (R-4). A busca por
 * substring (B-2, em question-filters.js) continua existindo como o
 * filtro "bate ou não bate" — o que este módulo acrescenta é (1) não
 * escanear o enunciado inteiro de cada questão a cada tecla digitada
 * (o índice é montado uma vez e reaproveitado) e (2) ordenar por
 * relevância em vez de pela ordem em que a questão está no arquivo —
 * "dor torácica infarto" deve trazer primeiro a questão que É sobre
 * infarto, não a que só cita a palavra de passagem num distrator.
 */

import { normalizeSearchText } from './text-normalize.js';

const STOPWORDS = new Set([
    'a', 'o', 'as', 'os', 'de', 'da', 'do', 'das', 'dos', 'em', 'com', 'para', 'por',
    'sobre', 'que', 'e', 'ou', 'se', 'um', 'uma', 'uns', 'umas', 'no', 'na', 'nos', 'nas',
    'ao', 'aos', 'à', 'às', 'é', 'foi', 'ser', 'tem', 'há', 'esta', 'está', 'isso', 'isto',
    'qual', 'quais', 'como', 'mais', 'menos', 'muito', 'pouco', 'ele', 'ela', 'seu', 'sua',
    'não', 'sim', 'já', 'ainda', 'também', 'apresenta', 'refere', 'relata'
]);

export function tokenize(text) {
    return normalizeSearchText(text)
        .split(/[^a-z0-9]+/)
        .filter(term => term.length >= 2 && !STOPWORDS.has(term));
}

function questionSearchText(question) {
    return [
        question?.stem,
        question?.area,
        question?.subarea,
        question?.tema,
        question?.assunto,
        question?.topico,
        question?.subtopico,
        ...Object.values(question?.options || {})
    ].filter(Boolean).join(' ');
}

// postings: term -> Map(questionId -> term frequency no documento).
// Construído uma vez por banco (ver getSearchIndex em app-app.js, que
// cacheia e só reconstrói se o total de questões mudar — mesma ideia
// de getQuestionIndex do C-2) e reaproveitado em toda busca seguinte,
// em vez de tokenizar tudo de novo a cada tecla.
export function buildSearchIndex(bank) {
    const postings = new Map();
    bank.forEach(question => {
        const tokens = tokenize(questionSearchText(question));
        const tf = new Map();
        tokens.forEach(term => tf.set(term, (tf.get(term) || 0) + 1));
        tf.forEach((count, term) => {
            if (!postings.has(term)) postings.set(term, new Map());
            postings.get(term).set(question.id, count);
        });
    });
    return { postings, totalDocs: bank.length };
}

// IDs das questões que casam com TODOS os termos da busca (AND) —
// mesma semântica de questionMatchesSearch, só que consultando o
// índice em vez de re-normalizar o enunciado inteiro a cada chamada.
export function matchingQuestionIds(query, index) {
    const terms = tokenize(query);
    if (!terms.length) return null; // null = "sem filtro de busca" (não é "nenhum resultado")
    let candidateIds = null;
    for (const term of terms) {
        const idsForTerm = new Set((index.postings.get(term) || new Map()).keys());
        candidateIds = candidateIds === null ? idsForTerm : new Set([...candidateIds].filter(id => idsForTerm.has(id)));
        if (!candidateIds.size) break;
    }
    return candidateIds || new Set();
}

// Reordena `questions` (já filtradas por matchingQuestionIds ou por
// qualquer outro critério) da mais pra menos relevante pro termo de
// busca, por TF-IDF clássico (tf do termo no documento × idf suavizado
// — log((N+1)/(df+1))+1, nunca fica ≤0 nem explode com termo raro
// demais). Sem termo de busca, devolve a lista na mesma ordem recebida
// (não reordena à toa).
export function rankQuestionsBySearch(questions, query, index) {
    const terms = tokenize(query);
    if (!terms.length) return questions;
    const scoreOf = question => terms.reduce((score, term) => {
        const postingsForTerm = index.postings.get(term);
        const tf = postingsForTerm?.get(question.id) || 0;
        if (!tf) return score;
        const df = postingsForTerm.size;
        const idf = Math.log((index.totalDocs + 1) / (df + 1)) + 1;
        return score + tf * idf;
    }, 0);
    return [...questions].sort((a, b) => scoreOf(b) - scoreOf(a));
}
