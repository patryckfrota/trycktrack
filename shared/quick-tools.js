/**
 * Lógica pura dos atalhos da tela inicial (calculadora de idade
 * gestacional e escolha de método contraceptivo). Sem DOM: a interface
 * fica em app-quicktools.js e os testes em quick-tools.test.js.
 */

const DAY = 86400000;
const GA_MAX_DAYS = 44 * 7;

// 'YYYY-MM-DD' lido em UTC: diferença entre datas em dias inteiros, sem o
// deslocamento de 1h do horário de verão.
export function parseDay(iso) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(iso || ''));
    if (!m) return null;
    const t = Date.UTC(+m[1], +m[2] - 1, +m[3]);
    const d = new Date(t);
    return d.getUTCMonth() === +m[2] - 1 ? t : null; // rejeita 31/02
}

export function formatDay(t) {
    const d = new Date(t);
    return `${String(d.getUTCDate()).padStart(2, '0')}/${String(d.getUTCMonth() + 1).padStart(2, '0')}/${d.getUTCFullYear()}`;
}

export function todayIso(now = new Date()) {
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function termLabel(weeks) {
    if (weeks < 37) return 'Pré-termo';
    if (weeks < 39) return 'Termo precoce';
    if (weeks < 41) return 'Termo completo';
    if (weeks < 42) return 'Termo tardio';
    return 'Pós-termo';
}

/**
 * method 'dum': { dum, ref }
 * method 'us':  { usDate, usWeeks, usDays, ref }  (IG medida no exame)
 * Retorna { error } ou { totalDays, weeks, days, dpp, daysToDpp, trimester, term }.
 */
export function gestationalAge(input) {
    const ref = parseDay(input.ref);
    if (ref == null) return { error: 'Informe a data de referência.' };
    let totalDays;
    let dpp;
    if (input.method === 'us') {
        const usDate = parseDay(input.usDate);
        const w = Number(input.usWeeks);
        const d = Number(input.usDays || 0);
        if (usDate == null) return { error: 'Informe a data do ultrassom.' };
        if (!Number.isInteger(w) || w < 0 || !Number.isInteger(d) || d < 0 || d > 6) {
            return { error: 'IG do exame: semanas inteiras e dias de 0 a 6.' };
        }
        totalDays = w * 7 + d + Math.round((ref - usDate) / DAY);
        dpp = ref + (280 - totalDays) * DAY;
    } else {
        const dum = parseDay(input.dum);
        if (dum == null) return { error: 'Informe a data da última menstruação.' };
        totalDays = Math.round((ref - dum) / DAY);
        dpp = dum + 280 * DAY; // regra de Naegele (ciclo de 28 dias)
    }
    if (totalDays < 0) return { error: 'A data de referência é anterior ao início da gestação.' };
    if (totalDays > GA_MAX_DAYS) return { error: 'IG acima de 44 semanas: confira as datas.' };
    const weeks = Math.floor(totalDays / 7);
    return {
        totalDays,
        weeks,
        days: totalDays % 7,
        dpp,
        daysToDpp: Math.round((dpp - ref) / DAY),
        trimester: weeks < 14 ? 1 : weeks < 28 ? 2 : 3,
        term: termLabel(weeks)
    };
}

/* ---------- Contracepção: critérios de elegibilidade (MEC, OMS) ---------- */

// Ordem = eficácia (LARC primeiro), usada como desempate.
export const CONTRACEPTIVE_METHODS = [
    { id: 'imp', name: 'Implante subdérmico (etonogestrel)', short: 'Implante', hormonal: true, larc: true, efficacy: 'Muito alta (<1 gravidez/100 mulheres no 1º ano)', note: 'Dura 3 anos. Pode causar sangramento irregular.' },
    { id: 'lng', name: 'DIU de levonorgestrel', short: 'DIU-LNG', hormonal: true, larc: true, efficacy: 'Muito alta (<1/100 no 1º ano)', note: 'Dura 5 anos ou mais. Reduz o fluxo menstrual.' },
    { id: 'cu', name: 'DIU de cobre', short: 'DIU de cobre', hormonal: false, larc: true, efficacy: 'Muito alta (<1/100 no 1º ano)', note: 'Sem hormônio. Pode aumentar o fluxo e a cólica.' },
    { id: 'dmpa', name: 'Injetável trimestral (acetato de medroxiprogesterona)', short: 'Injetável trimestral', hormonal: true, larc: false, efficacy: 'Moderada (≈4/100 no 1º ano, uso típico)', note: 'Aplicação a cada 3 meses. Retorno da fertilidade pode demorar.' },
    { id: 'chc', name: 'Contraceptivo hormonal combinado (pílula, anel ou adesivo)', short: 'Combinado', hormonal: true, larc: false, efficacy: 'Moderada (≈7/100 no 1º ano, uso típico)', note: 'Depende de uso regular. Estrogênio: atenção ao risco vascular.' },
    { id: 'pop', name: 'Pílula só de progestagênio', short: 'Minipílula', hormonal: true, larc: false, efficacy: 'Moderada (≈7/100 no 1º ano, uso típico)', note: 'Horário rígido (a de desogestrel tem janela de 12 h).' }
];

const METHOD_ORDER = ['chc', 'pop', 'dmpa', 'imp', 'lng', 'cu'];

// cats na ordem METHOD_ORDER. Quando a OMS distingue início/continuação,
// foi usada a categoria mais restritiva.
export const CONTRACEPTIVE_CONDITIONS = [
    { id: 'age18', group: 'Idade e hábitos', label: 'Menor de 18 anos', cats: [1, 1, 2, 1, 2, 2] },
    { id: 'smoke35a', group: 'Idade e hábitos', label: '≥35 anos, fuma <15 cigarros/dia', cats: [3, 1, 1, 1, 1, 1] },
    { id: 'smoke35b', group: 'Idade e hábitos', label: '≥35 anos, fuma ≥15 cigarros/dia', cats: [4, 1, 1, 1, 1, 1] },
    { id: 'obesity', group: 'Idade e hábitos', label: 'Obesidade (IMC ≥30)', cats: [2, 1, 1, 1, 1, 1] },
    { id: 'bf6m', group: 'Pós-parto', label: 'Amamentando, 6 semanas a 6 meses de pós-parto', cats: [3, 1, 1, 1, 1, 1] },
    { id: 'bf6p', group: 'Pós-parto', label: 'Amamentando, mais de 6 meses de pós-parto', cats: [2, 1, 1, 1, 1, 1] },
    { id: 'htn', group: 'Cardiovascular', label: 'Hipertensão controlada ou PA 140–159/90–99', cats: [3, 1, 2, 1, 1, 1] },
    { id: 'htn160', group: 'Cardiovascular', label: 'PA ≥160/100 ou doença vascular', cats: [4, 2, 3, 2, 2, 1] },
    { id: 'cvrisk', group: 'Cardiovascular', label: 'Vários fatores de risco cardiovascular', cats: [4, 2, 3, 2, 2, 1] },
    { id: 'ihd', group: 'Cardiovascular', label: 'Cardiopatia isquêmica ou AVC (atual ou prévio)', cats: [4, 3, 3, 3, 3, 1] },
    { id: 'migA', group: 'Cardiovascular', label: 'Enxaqueca com aura', cats: [4, 1, 1, 1, 1, 1] },
    { id: 'mig', group: 'Cardiovascular', label: 'Enxaqueca sem aura', cats: [2, 1, 1, 1, 1, 1] },
    { id: 'dvt', group: 'Tromboembolismo', label: 'TVP/TEP prévia', cats: [4, 2, 2, 2, 2, 1] },
    { id: 'thrombo', group: 'Tromboembolismo', label: 'Trombofilia conhecida', cats: [4, 2, 2, 2, 2, 1] },
    { id: 'surgery', group: 'Tromboembolismo', label: 'Cirurgia de grande porte com imobilização prolongada', cats: [4, 2, 2, 2, 2, 1] },
    { id: 'dm', group: 'Metabólico e imunológico', label: 'Diabetes sem lesão de órgão-alvo', cats: [2, 2, 2, 2, 2, 1] },
    { id: 'dmc', group: 'Metabólico e imunológico', label: 'Diabetes com nefropatia, retinopatia, neuropatia ou doença vascular', cats: [4, 2, 3, 2, 2, 1] },
    { id: 'sle', group: 'Metabólico e imunológico', label: 'Lúpus com antifosfolípide positivo (ou desconhecido)', cats: [4, 3, 3, 3, 3, 1] },
    { id: 'liver', group: 'Outras', label: 'Cirrose descompensada ou tumor hepático', cats: [4, 3, 3, 3, 3, 1] },
    { id: 'breast', group: 'Outras', label: 'Câncer de mama atual', cats: [4, 4, 4, 4, 4, 1] },
    { id: 'inducer', group: 'Outras', label: 'Indutor enzimático (rifampicina, fenitoína, carbamazepina, fenobarbital)', cats: [3, 3, 1, 2, 1, 1] },
    { id: 'bleed', group: 'Outras', label: 'Sangramento vaginal inexplicado (antes da investigação)', cats: [2, 2, 3, 3, 4, 4] },
    { id: 'pid', group: 'Outras', label: 'DIP atual ou cervicite por clamídia/gonorreia', cats: [1, 1, 1, 1, 4, 4] }
];

export const MEC_CATEGORY_LABEL = {
    1: 'Sem restrição',
    2: 'Em geral pode usar',
    3: 'Em geral desaconselhado',
    4: 'Contraindicado'
};

/**
 * selected: ids de CONTRACEPTIVE_CONDITIONS
 * prefs: { noHormone, longActing }
 * Retorna métodos ordenados: categoria, depois preferência, depois eficácia.
 */
export function recommendContraception(selected = [], prefs = {}) {
    const conds = CONTRACEPTIVE_CONDITIONS.filter(c => selected.includes(c.id));
    const ranked = CONTRACEPTIVE_METHODS.map((method, order) => {
        const col = METHOD_ORDER.indexOf(method.id);
        let category = 1;
        let drivers = [];
        for (const c of conds) {
            const cat = c.cats[col];
            if (cat > category) { category = cat; drivers = [c.label]; }
            else if (cat === category && cat > 1) drivers.push(c.label);
        }
        const misses = (prefs.noHormone && method.hormonal) || (prefs.longActing && !method.larc);
        return { ...method, category, label: MEC_CATEGORY_LABEL[category], drivers, misses: !!misses, order };
    });
    return ranked.sort((a, b) => a.category - b.category || a.misses - b.misses || a.order - b.order);
}
