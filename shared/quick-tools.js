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
        start: dpp - 280 * DAY, // "DUM equivalente": base dos marcos por semana
        daysToDpp: Math.round((dpp - ref) / DAY),
        trimester: weeks < 14 ? 1 : weeks < 28 ? 2 : 3,
        term: termLabel(weeks)
    };
}

// Marcos de referência para o pré-natal (semana completa → data).
const MILESTONES = [
    [14, 'Início do 2º trimestre'],
    [20, 'Ultrassom morfológico (20 a 24 sem) e dTpa a partir daqui'],
    [24, 'Início da janela do TOTG 75 g (24 a 28 sem)'],
    [28, 'Início do 3º trimestre'],
    [37, 'Termo: parto deixa de ser pré-termo'],
    [40, 'Data provável do parto'],
    [42, 'Pós-termo']
];

export function gestationalMilestones(start, ref) {
    const refDay = parseDay(ref);
    let nextMarked = false;
    return MILESTONES.map(([week, label]) => {
        const date = start + week * 7 * DAY;
        const past = date <= refDay;
        const next = !past && !nextMarked;
        if (next) nextMarked = true;
        return { week, label, date, status: past ? 'past' : next ? 'next' : 'later' };
    });
}
