/**
 * Camada de REGRAS da ferramenta de contracepção. Funções puras, sem
 * DOM e sem estado: recebem as respostas e devolvem o resultado.
 *
 *   answers  = { [questionId]: [optionId, ...] }   (imutável)
 *   options  = { phase: 'start' | 'continue', prefs: { noHormone, longActing } }
 *
 * Regra central (OMS): para cada método vale a PIOR categoria entre todas
 * as condições marcadas. Faixas como "3/4" ficam na seção "Depende do
 * caso", porque a categoria final depende da gravidade individual.
 */
import { METHOD_IDS, METHODS, SECTIONS } from './contraception-data.js';
import { normalizeSearchText } from './text-normalize.js';

export const RESULT_SECTIONS = [
    { id: 'indicated', title: 'Indicados', hint: 'Categorias 1 e 2' },
    { id: 'depends', title: 'Depende do caso', hint: 'A categoria varia conforme a gravidade ou o risco individual' },
    { id: 'discouraged', title: 'Desaconselhados', hint: 'Categoria 3: os riscos costumam superar as vantagens' },
    { id: 'contraindicated', title: 'Contraindicados', hint: 'Categoria 4: risco inaceitável' },
    { id: 'na', title: 'Não se aplicam', hint: 'Gravidez: contracepção não é necessária' }
];

const QUESTIONS = new Map();
SECTIONS.forEach(section => section.questions.forEach(q => QUESTIONS.set(q.id, { ...q, sectionId: section.id })));

export function getQuestion(id) { return QUESTIONS.get(id); }
export function allQuestions() { return [...QUESTIONS.values()]; }

/* ---------- células ---------- */

function parseValue(v) {
    if (v === 'NA') return { na: true, min: 0, max: 0 };
    if (typeof v === 'number') return { min: v, max: v };
    const m = /^([1-4])\/([1-4])$/.exec(String(v));
    if (!m) throw new Error(`Célula inválida: ${JSON.stringify(v)}`);
    return { min: +m[1], max: +m[2] };
}

/** Resolve uma célula para a fase (início ou continuação). null = sem restrição. */
export function resolveCell(cell, phase = 'start') {
    if (cell == null) return null;
    const raw = typeof cell === 'object' ? (phase === 'continue' ? cell.c : cell.i) : cell;
    const { min, max, na } = parseValue(raw);
    return { min, max, na: !!na, ranged: min !== max, display: na ? 'NA' : min === max ? String(max) : `${min}/${max}` };
}

/* ---------- respostas ---------- */

export function toggleAnswer(answers, questionId, optionId) {
    const q = QUESTIONS.get(questionId);
    if (!q || !q.options.some(o => o.id === optionId)) return answers;
    const current = answers[questionId] || [];
    const has = current.includes(optionId);
    const next = q.type === 'single'
        ? (has ? [] : [optionId])
        : (has ? current.filter(id => id !== optionId) : [...current, optionId]);
    const out = { ...answers };
    if (next.length) out[questionId] = next; else delete out[questionId];
    return out;
}

export function selectedOptions(answers) {
    const out = [];
    for (const q of QUESTIONS.values()) {
        for (const id of answers[q.id] || []) {
            const option = q.options.find(o => o.id === id);
            if (option) out.push({ question: q, option });
        }
    }
    return out;
}

export function countAnswered(answers, sectionId) {
    return selectedOptions(answers).filter(s => !sectionId || s.question.sectionId === sectionId).length;
}

/* ---------- avaliação ---------- */

function sectionFor(decisive) {
    if (decisive.na) return 'na';
    if (decisive.ranged) return 'depends';
    if (decisive.max >= 4) return 'contraindicated';
    if (decisive.max === 3) return 'discouraged';
    return 'indicated';
}

function evaluateMethod(methodId, col, selected, phase, prefs) {
    const method = METHODS[methodId];
    const drivers = [];
    let decisive = { min: 1, max: 1, ranged: false, na: false, display: '1' };
    for (const { question, option } of selected) {
        const cell = resolveCell(option.cats[col], phase);
        if (!cell) continue;
        if (cell.na) { decisive = cell; drivers.length = 0; break; }
        if (cell.max > 1 || cell.ranged) {
            drivers.push({ questionId: question.id, questionTitle: question.title, optionLabel: option.label, note: option.note, ...cell });
        }
        // Pior máximo vence; no empate, a categoria firme vale mais que a faixa.
        if (cell.max > decisive.max || (cell.max === decisive.max && decisive.ranged && !cell.ranged)) decisive = cell;
    }
    drivers.sort((a, b) => b.max - a.max);
    const misses = !!((prefs.noHormone && method.hormonal) || (prefs.longActing && !method.larc));
    return { ...method, category: decisive.max, display: decisive.display, ranged: decisive.ranged, section: sectionFor(decisive), drivers, misses };
}

export function evaluate(answers = {}, { phase = 'start', prefs = {} } = {}) {
    const selected = selectedOptions(answers);
    const sectionRank = Object.fromEntries(RESULT_SECTIONS.map((s, i) => [s.id, i]));
    const methods = METHOD_IDS
        .map((id, col) => evaluateMethod(id, col, selected, phase, prefs))
        .sort((a, b) => sectionRank[a.section] - sectionRank[b.section]
            || a.misses - b.misses
            || a.category - b.category
            || a.efficacyRank - b.efficacyRank);
    const firstOk = methods.find(m => m.section === 'indicated' && !m.misses);
    methods.forEach(m => { m.best = m === firstOk && selected.length > 0; });
    const groups = RESULT_SECTIONS.map(s => ({ ...s, methods: methods.filter(m => m.section === s.id) })).filter(g => g.methods.length);
    return {
        phase,
        selected,
        methods,
        groups,
        pregnancy: selected.some(s => s.question.id === 'pregnancy')
    };
}

/* ---------- busca ---------- */

/** Ids de perguntas cujo título ou alguma opção contém todos os termos. */
export function searchQuestions(query) {
    const terms = normalizeSearchText(query).split(/\s+/).filter(Boolean);
    if (!terms.length) return null;
    const hits = new Map();
    for (const q of QUESTIONS.values()) {
        const optionHits = q.options.filter(o => terms.every(t => normalizeSearchText(`${q.title} ${o.label}`).includes(t)));
        if (optionHits.length) hits.set(q.id, new Set(optionHits.map(o => o.id)));
    }
    return hits;
}
