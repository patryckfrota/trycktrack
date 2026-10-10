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
 *
 * Há uma família "core" (os 7 métodos da tabela-resumo) e as extensões de
 * contraception-extensions.js (barreira, emergência, percepção da
 * fertilidade), que reaproveitam as mesmas respostas.
 */
import { METHOD_IDS, METHODS, SECTIONS } from './contraception-data.js';
import { EXTENSIONS, LAM } from './contraception-extensions.js';
import { NO_RECOMMENDATION } from './contraception-content.js';
import { RATES, typicalRate, effectTier } from './contraception-rates.js';
import { normalizeSearchText } from './text-normalize.js';

/* ---------- escalas de resultado ---------- */

const MEC_SECTIONS = [
    { id: 'indicated', title: 'Indicados', hint: 'Categorias 1 e 2' },
    { id: 'depends', title: 'Depende do caso', hint: 'A categoria varia conforme a gravidade ou o risco individual' },
    { id: 'discouraged', title: 'Desaconselhados', hint: 'Categoria 3: os riscos costumam superar as vantagens' },
    { id: 'contraindicated', title: 'Contraindicados', hint: 'Categoria 4: risco inaceitável' },
    { id: 'na', title: 'Não se aplicam', hint: 'Não aplicável nesta situação' }
];

const ACD_SECTIONS = [
    { id: 'indicated', title: 'Pode usar', hint: 'A: não há razão médica para negar' },
    { id: 'caution', title: 'Com cautela', hint: 'C: precisa de aconselhamento especial para o uso correto' },
    { id: 'depends', title: 'Depende do caso', hint: 'Cautela ou adiamento, conforme a situação' },
    { id: 'delay', title: 'Adiar', hint: 'D: adie até avaliar ou corrigir e ofereça método temporário' },
    { id: 'na', title: 'Não se aplicam', hint: 'Não aplicável nesta situação' }
];

const ACDS_SECTIONS = [
    { id: 'indicated', title: 'Pode fazer', hint: 'A: não há razão médica para negar' },
    { id: 'caution', title: 'Com cautela', hint: 'C: rotina com preparo e precauções extras' },
    { id: 'special', title: 'Serviço especializado', hint: 'S: cirurgião e equipe experientes, anestesia geral e suporte clínico' },
    { id: 'depends', title: 'Depende do caso', hint: 'Cautela ou adiamento, conforme a situação' },
    { id: 'delay', title: 'Adiar', hint: 'D: adie até avaliar ou corrigir e ofereça método temporário' },
    { id: 'na', title: 'Não se aplicam', hint: 'Não aplicável nesta situação' }
];

const SCALES = {
    mec: {
        sections: MEC_SECTIONS,
        parse(v) {
            if (v === 'NA') return { na: true, min: 0, max: 0 };
            if (typeof v === 'number') return { min: v, max: v };
            const m = /^([1-4])\/([1-4])$/.exec(String(v));
            if (!m) throw new Error(`Célula inválida: ${JSON.stringify(v)}`);
            return { min: +m[1], max: +m[2] };
        },
        label: (n) => String(n),
        sectionFor: (c) => c.na ? 'na' : c.ranged ? 'depends' : c.max >= 4 ? 'contraindicated' : c.max === 3 ? 'discouraged' : 'indicated'
    },
    acd: {
        sections: ACD_SECTIONS,
        parse(v) {
            if (v === 'NA') return { na: true, min: 0, max: 0 };
            const rank = { A: 1, C: 2, D: 3 };
            const parts = String(v).split('/');
            if (!parts.length || parts.length > 2 || !parts.every(p => rank[p])) throw new Error(`Célula inválida: ${JSON.stringify(v)}`);
            const ranks = parts.map(p => rank[p]);
            return { min: Math.min(...ranks), max: Math.max(...ranks) };
        },
        label: (n) => ({ 1: 'A', 2: 'C', 3: 'D' }[n]),
        sectionFor: (c) => c.na ? 'na' : c.ranged ? 'depends' : ({ 1: 'indicated', 2: 'caution', 3: 'delay' })[c.max]
    },
    // Esterilização: a pior situação é "adiar" (D), depois "serviço especializado" (S).
    acds: {
        sections: ACDS_SECTIONS,
        parse(v) {
            if (v === 'NA') return { na: true, min: 0, max: 0 };
            const rank = { A: 1, C: 2, S: 3, D: 4 };
            const parts = String(v).split('/');
            if (!parts.length || parts.length > 2 || !parts.every(p => rank[p])) throw new Error(`Célula inválida: ${JSON.stringify(v)}`);
            const ranks = parts.map(p => rank[p]);
            return { min: Math.min(...ranks), max: Math.max(...ranks) };
        },
        label: (n) => ({ 1: 'A', 2: 'C', 3: 'S', 4: 'D' }[n]),
        sectionFor: (c) => c.na ? 'na' : c.ranged ? 'depends' : ({ 1: 'indicated', 2: 'caution', 3: 'special', 4: 'delay' })[c.max]
    }
};

export const RESULT_SECTIONS = MEC_SECTIONS;

/* ---------- perguntas (principais + próprias das extensões) ---------- */

const QUESTIONS = new Map();
SECTIONS.forEach(section => section.questions.forEach(q => QUESTIONS.set(q.id, { ...q, sectionId: section.id, family: null })));
EXTENSIONS.forEach(ext => ext.ownQuestions.forEach(q => QUESTIONS.set(q.id, { ...q, sectionId: 'outros', family: ext.id })));

export function getQuestion(id) { return QUESTIONS.get(id); }
export function allQuestions() { return [...QUESTIONS.values()]; }

/* ---------- células ---------- */

/** Resolve uma célula para a fase (início ou continuação). null = sem restrição. */
export function resolveCell(cell, phase = 'start', scale = 'mec') {
    if (cell == null) return null;
    const raw = typeof cell === 'object' ? (phase === 'continue' ? cell.c : cell.i) : cell;
    const sc = SCALES[scale];
    const { min, max, na } = sc.parse(raw);
    return {
        min, max, na: !!na, ranged: min !== max,
        display: na ? 'NA' : min === max ? sc.label(max) : `${sc.label(min)}/${sc.label(max)}`
    };
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

/* ---------- avaliação de um conjunto de métodos ---------- */

// Descreve de onde vêm as células de cada conjunto (principal ou extensão).
function coreSet() {
    return {
        id: 'core', scale: 'mec', methods: METHOD_IDS.map(id => METHODS[id]),
        cellsFor(item, col) {
            if (item.question.family) return [];
            return [{ cell: item.option.cats[col], note: null }];
        }
    };
}

function extensionSet(ext) {
    const links = new Map();
    ext.links.forEach(l => links.set(`${l.q}.${l.o}`, l));
    const inherit = ext.inherit || {};
    return {
        id: ext.id, scale: ext.scale, methods: ext.methods,
        cellsFor(item, col) {
            const { question, option } = item;
            if (question.family) return question.family === ext.id ? [{ cell: option.cats[col], note: option.note || null }] : [];
            const out = [];
            const link = links.get(`${question.id}.${option.id}`);
            if (link) out.push({ cell: link.cats[col], note: (Array.isArray(link.note) ? link.note[col] : link.note) || null });
            const from = inherit[ext.methods[col].id];
            if (from) out.push({ cell: option.cats[METHOD_IDS.indexOf(from)], note: null, phase: 'start' });
            return out;
        }
    };
}

function evaluateSet(set, selected, phase, prefs) {
    const sc = SCALES[set.scale];
    const sectionRank = Object.fromEntries(sc.sections.map((s, i) => [s.id, i]));
    const methods = set.methods.map((method, col) => {
        const drivers = [];
        let decisive = { min: 1, max: 1, ranged: false, na: false, display: sc.label(1) };
        for (const item of selected) {
            for (const { cell, note, phase: forced } of set.cellsFor(item, col)) {
                const r = resolveCell(cell, forced || phase, set.scale);
                if (!r) continue;
                if (r.na) { decisive = r; drivers.length = 0; drivers.push({ questionId: item.question.id, questionTitle: item.question.title, optionLabel: item.option.label, note, ...r }); break; }
                if (r.max > 1 || r.ranged || note) {
                    drivers.push({ questionId: item.question.id, questionTitle: item.question.title, optionLabel: item.option.label, note: note || item.option.note || null, ...r });
                }
                // Pior máximo vence; no empate, a categoria firme vale mais que a faixa.
                if (r.max > decisive.max || (r.max === decisive.max && decisive.ranged && !r.ranged)) decisive = r;
            }
            if (decisive.na) break;
        }
        drivers.sort((a, b) => b.max - a.max);
        const misses = !!((prefs.noHormone && method.hormonal) || (prefs.longActing && !method.larc));
        const rates = RATES[method.id] || null;
        const typical = typicalRate(method.id);
        return { ...method, rates, tier: effectTier(typical), efficacyRank: typical ?? method.efficacyRank ?? 99, scale: set.scale, category: decisive.max, display: decisive.display, ranged: decisive.ranged, section: sc.sectionFor(decisive), drivers, misses, order: col };
    }).sort((a, b) => sectionRank[a.section] - sectionRank[b.section]
        || a.misses - b.misses
        || a.category - b.category
        || a.efficacyRank - b.efficacyRank);
    const groups = sc.sections.map(s => ({ ...s, methods: methods.filter(m => m.section === s.id) })).filter(g => g.methods.length);
    return { methods, groups };
}

function noticesFor(selected) {
    return selected.filter(s => s.option.noRecommendation).map(s => NO_RECOMMENDATION[s.question.id]).filter(Boolean);
}

/** Família principal: os 7 métodos da tabela-resumo da OMS. */
export function evaluate(answers = {}, { phase = 'start', prefs = {} } = {}) {
    const selected = selectedOptions(answers);
    const { methods, groups } = evaluateSet(coreSet(), selected, phase, prefs);
    // "Maior eficácia entre os indicados": só desempate de eficácia, a OMS não define método "melhor".
    const firstOk = methods.find(m => m.section === 'indicated' && !m.misses);
    methods.forEach(m => { m.best = m === firstOk && selected.some(s => !s.question.family); });
    return {
        id: 'core', phase, selected, methods, groups,
        notices: noticesFor(selected),
        pregnancy: selected.some(s => s.question.id === 'pregnancy')
    };
}

/** Todas as famílias de uma vez: { core, barrier, emergency, fab }. */
export function evaluateAll(answers = {}, opts = {}) {
    const { phase = 'start', prefs = {} } = opts;
    const selected = selectedOptions(answers);
    const result = { core: evaluate(answers, opts) };
    for (const ext of EXTENSIONS) {
        const { methods, groups } = evaluateSet(extensionSet(ext), selected, phase, prefs);
        result[ext.id] = { id: ext.id, title: ext.title, scale: ext.scale, intro: ext.intro, page: ext.page, methods, groups, pregnancy: result.core.pregnancy };
    }
    return result;
}

/** LAM: os 3 critérios precisam estar presentes ao mesmo tempo. */
export function lamStatus(flags = {}) {
    const missing = LAM.criteria.filter(c => !flags[c.id]).map(c => c.label);
    return { met: missing.length === 0, missing };
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
