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
import { METHOD_IDS, METHOD_LIST, METHODS, SECTIONS } from './contraception-data.js';
import { EXTENSIONS, LAM } from './contraception-extensions.js';
import { NO_RECOMMENDATION, METHOD_INFO } from './contraception-content.js';
import { RATES, typicalRate, effectCategory } from './contraception-rates.js';
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
    { id: 'pending', title: 'Falta o critério legal', hint: 'Informe idade e filhos vivos (Lei 9.263/1996) para confirmar' },
    { id: 'indicated', title: 'Pode fazer', hint: 'A: não há razão médica para negar' },
    { id: 'caution', title: 'Com cautela', hint: 'C: rotina com preparo e precauções extras' },
    { id: 'special', title: 'Serviço especializado', hint: 'S: cirurgião e equipe experientes, anestesia geral e suporte clínico' },
    { id: 'depends', title: 'Depende do caso', hint: 'Cautela ou adiamento, conforme a situação' },
    { id: 'delay', title: 'Adiar', hint: 'D: adie até avaliar ou corrigir e ofereça método temporário' },
    { id: 'legal', title: 'Não permitido pela lei', hint: 'L: não atende ao art. 10 da Lei 9.263/1996' },
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
            const rank = { A: 1, C: 2, S: 3, D: 4, L: 5 };
            const parts = String(v).split('/');
            if (!parts.length || parts.length > 2 || !parts.every(p => rank[p])) throw new Error(`Célula inválida: ${JSON.stringify(v)}`);
            const ranks = parts.map(p => rank[p]);
            return { min: Math.min(...ranks), max: Math.max(...ranks) };
        },
        label: (n) => ({ 1: 'A', 2: 'C', 3: 'S', 4: 'D', 5: 'L' }[n]),
        sectionFor: (c) => c.na ? 'na' : c.ranged ? 'depends' : ({ 1: 'indicated', 2: 'caution', 3: 'special', 4: 'delay', 5: 'legal' })[c.max]
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

/* ---------- idade: opções cuja categoria depende dela ---------- */

const FROM35 = ['35_39', '40_45', 'gt45'];

export function ageContext(selected) {
    const a = selected.find(s => s.question.id === 'age');
    if (!a) return { known: false };
    return { known: true, under18: a.option.id === 'lt18', from35: FROM35.includes(a.option.id) };
}

function severity(cell) {
    const r1 = resolveCell(cell, 'start');
    const r2 = resolveCell(cell, 'continue');
    if (!r1) return 0;
    return Math.max(r1.na ? 5 : r1.max, r2.na ? 5 : r2.max) + (r1.ranged || r2.ranged ? 0.5 : 0);
}

/** Categorias da opção para a idade informada (sem idade: a pior de cada coluna). */
export function catsOf(option, ctx = { known: false }) {
    const by = option.byAge;
    if (!by) return option.cats;
    if (ctx.known) {
        if (ctx.under18 && by.under18) return by.under18;
        if (ctx.from35 && by.from35) return by.from35;
        return option.cats;
    }
    return option.cats.map((cell, i) => [cell, ...Object.values(by).map(v => v[i])].reduce((w, c) => (severity(c) > severity(w) ? c : w)));
}

/* ---------- avaliação de um conjunto de métodos ---------- */

// Descreve de onde vêm as células de cada conjunto (principal ou extensão).
function coreSet() {
    return {
        id: 'core', scale: 'mec', methods: METHOD_LIST.map(id => METHODS[id]),
        // pílula, adesivo e anel compartilham a coluna "coc" da tabela da OMS
        cellsFor(item, idx, ctx) {
            if (item.question.family) return [];
            return [{ cell: catsOf(item.option, ctx)[METHOD_IDS.indexOf(METHOD_LIST.map(id => METHODS[id])[idx].column)], note: null }];
        }
    };
}

function extensionSet(ext) {
    const links = new Map();
    ext.links.forEach(l => links.set(`${l.q}.${l.o}`, l));
    const inherit = ext.inherit || {};
    return {
        id: ext.id, scale: ext.scale, methods: ext.methods,
        cellsFor(item, col, ctx) {
            const { question, option } = item;
            if (question.family) return question.family === ext.id ? [{ cell: option.cats[col], note: option.note || null }] : [];
            const out = [];
            const link = links.get(`${question.id}.${option.id}`);
            if (link) out.push({ cell: link.cats[col], note: (Array.isArray(link.note) ? link.note[col] : link.note) || null });
            const from = inherit[ext.methods[col].id];
            if (from) out.push({ cell: catsOf(option, ctx)[METHOD_IDS.indexOf(from)], note: null, phase: 'start' });
            return out;
        }
    };
}

function evaluateSet(set, selected, phase, prefs) {
    const sc = SCALES[set.scale];
    const ctx = ageContext(selected);
    const sectionRank = Object.fromEntries(sc.sections.map((s, i) => [s.id, i]));
    const methods = set.methods.map((method, col) => {
        const drivers = [];
        let decisive = { min: 1, max: 1, ranged: false, na: false, display: sc.label(1) };
        for (const item of selected) {
            for (const { cell, note, phase: forced } of set.cellsFor(item, col, ctx)) {
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
        return { ...method, rates, typical, effectCategory: effectCategory(typical), efficacyRank: typical ?? 50 + (method.efficacyRank ?? 49), scale: set.scale, category: decisive.max, display: decisive.display, ranged: decisive.ranged, section: sc.sectionFor(decisive), drivers, misses, order: col };
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
export function evaluate(answers = {}, { phase = 'start', prefs = {}, confirmed = null } = {}) {
    const selected = selectedOptions(answers);
    const { methods, groups } = evaluateSet(coreSet(), selected, phase, prefs);
    // "Maior eficácia entre os indicados": menor taxa de gravidez no uso típico (OMS, SPR 2025,
    // tabela 1.1). Métodos sem taxa na tabela (injetável mensal) não concorrem. A OMS não define
    // um método "melhor": é só um desempate de eficácia entre os que a paciente pode usar.
    const ranked = methods.filter(m => m.section === 'indicated' && !m.misses && typeof m.typical === 'number')
        .sort((a, b) => a.typical - b.typical || (a.rates[0].perfect ?? 99) - (b.rates[0].perfect ?? 99));
    const top = ranked[0];
    // O selo só aparece se o método de maior eficácia entre TODOS os indicados já estiver confirmado pela triagem.
    methods.forEach(m => { m.best = m === top && (confirmed ? confirmed.includes(m.id) : selected.some(s => !s.question.family)); });
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
        // Pergunta obrigatória da família (ex.: critério legal da esterilização): sem resposta, o resultado é provisório.
        let shown = groups;
        if (ext.requires) {
            methods.forEach(m => { m.legalPending = !selected.some(s => s.question.id === ext.requires); if (m.legalPending && m.section === 'indicated') m.section = 'pending'; });
            shown = SCALES[ext.scale].sections.map(s => ({ ...s, methods: methods.filter(m => m.section === s.id) })).filter(g => g.methods.length);
        }
        result[ext.id] = { id: ext.id, title: ext.title, scale: ext.scale, intro: ext.intro, page: ext.page, methods, groups: shown, pregnancy: result.core.pregnancy };
    }
    return result;
}

/* ---------- ficha do método ---------- */

function setOf(methodId) {
    if (METHOD_LIST.includes(methodId)) return coreSet();
    const ext = EXTENSIONS.find(x => x.methods.some(m => m.id === methodId));
    return ext ? extensionSet(ext) : null;
}

/**
 * Tudo o que a tabela da OMS diz sobre UM método, sem depender do perfil:
 * todas as condições com categoria acima da mínima, agrupadas pela seção do
 * resultado. Início e continuação diferentes viram "início X · continuação Y".
 */
export function methodConditions(methodId, { includeMinimum = false } = {}) {
    const set = setOf(methodId);
    if (!set) return null;
    const sc = SCALES[set.scale];
    const col = set.methods.findIndex(m => m.id === methodId);
    const sectionRank = Object.fromEntries(sc.sections.map((s, i) => [s.id, i]));
    const buckets = new Map();
    const unknownAge = { known: false };
    // Resolve uma opção (ou uma variante de idade dela) para a coluna do método.
    const resolveOption = (q, option, ctx) => set.cellsFor({ question: q, option }, col, ctx).map(({ cell, note, phase: forced }) => {
        const start = resolveCell(cell, forced || 'start', set.scale);
        const cont = resolveCell(cell, forced || 'continue', set.scale);
        return start && cont ? { start, cont, note } : null;
    }).filter(Boolean);
    const showDisplay = (start, cont) => start.display === cont.display ? start.display : `início ${start.display} · continuação ${cont.display}`;
    for (const q of QUESTIONS.values()) {
        for (const option of q.options) {
            // opções que dependem da idade: classifica pela pior faixa e explica cada uma
            const variants = option.byAge
                ? [['base', option.cats], ...Object.entries(option.byAge)].map(([key, cats]) => [key, { ...option, cats, byAge: undefined }])
                : [[null, option]];
            const perVariant = variants.map(([key, opt]) => ({ key, cells: resolveOption(q, opt, unknownAge) }));
            const cells = perVariant.flatMap(v => v.cells.map(c => ({ ...c, key: v.key })));
            let main = null;
            for (const c of cells) {
                const worst = (c.cont.max > c.start.max || (c.cont.max === c.start.max && c.cont.ranged && !c.start.ranged)) ? c.cont : c.start;
                if (!main || worst.max > main.worst.max) main = { ...c, worst };
            }
            if (!main) continue;
            const { start, cont, worst } = main;
            if (start.na && cont.na && !main.note) continue;
            if (!worst.na && worst.max <= 1 && !worst.ranged && !includeMinimum) continue;
            // categoria 2 da escala MEC não é "indicado": vira grupo próprio de cautela
            const id = worst.na ? 'na' : (set.scale === 'mec' && worst.max === 2 && !worst.ranged) ? 'care' : sc.sectionFor(worst);
            let display = showDisplay(start, cont);
            let note = main.note || option.note || null;
            if (option.byAge) {
                const parts = perVariant.map(v => {
                    const c = v.cells[0];
                    return c ? `${option.ageLabels?.[v.key] || v.key}: ${showDisplay(c.start, c.cont)}` : null;
                }).filter(Boolean);
                display = showDisplay(start, cont);
                note = [parts.join(' · '), note].filter(Boolean).join('. ');
            }
            if (!buckets.has(id)) buckets.set(id, []);
            buckets.get(id).push({ sectionId: q.sectionId, questionId: q.id, optionId: option.id, question: q.title, option: option.label, display, note, rank: worst.max });
        }
    }
    const careMeta = { id: 'care', title: 'Cautela', hint: 'Categoria 2: em geral pode usar, com acompanhamento cuidadoso' };
    const order = [...sc.sections.filter(s => s.id !== 'indicated' && s.id !== 'na'), careMeta, ...(includeMinimum ? sc.sections.filter(s => s.id === 'indicated') : []), ...sc.sections.filter(s => s.id === 'na')];
    // do mais grave ao menos grave: contraindicado, desaconselhado, depende, cautela
    const sev = (id) => ({ contraindicated: 0, delay: 0, special: 1, discouraged: 1, depends: 2, caution: 3, care: 3, indicated: 4, na: 5, legal: -1 }[id] ?? 6);
    const groups = order
        .map(g => ({ ...g, items: (buckets.get(g.id) || []).sort((a, b) => b.rank - a.rank) }))
        .filter(g => g.items.length)
        .sort((a, b) => sev(a.id) - sev(b.id));
    return { method: set.methods[col], scale: set.scale, groups, info: METHOD_INFO[methodId] || null };
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
