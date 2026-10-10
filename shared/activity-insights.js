/**
 * Semana e insights do Dashboard — regras fixas sobre o log de respostas
 * (shared/activity-log.js), sem IA e sem custo. Funções puras: quem chama
 * injeta `classify` (questão → { track, key }) e `areaName`.
 *
 * Todo insight tem um piso de amostra: com poucas respostas a diferença
 * é ruído, e um alerta falso custa mais do que nenhum alerta.
 */
import { localDate } from './activity-log.js';

const DAY_MS = 86400000;
const WEEKDAY_LETTERS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const WEEKDAY_NAMES = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];

// Domingo-primeiro, igual às colunas do heatmap. `todayIso` é a data local
// (YYYY-MM-DD). Compara com a semana anterior no MESMO ponto (mesmo nº de
// dias decorridos), senão uma terça sempre perderia pra uma semana inteira.
export function weekSummary(days, todayIso, goal) {
    const [y, m, d] = todayIso.split('-').map(Number);
    const today = new Date(y, m - 1, d, 12);
    const elapsed = today.getDay(); // 0 = domingo → só hoje decorrido
    const at = offset => localDate(new Date(y, m - 1, d - elapsed + offset, 12));
    const dots = [];
    let total = 0, hitDays = 0, studiedDays = 0;
    for (let i = 0; i < 7; i++) {
        const date = at(i);
        const n = days.get(date)?.n || 0;
        const future = i > elapsed;
        const state = future ? 'future' : n >= goal ? 'hit' : n > 0 ? 'some' : 'none';
        if (!future) { total += n; if (n >= goal) hitDays += 1; if (n > 0) studiedDays += 1; }
        dots.push({ date, label: WEEKDAY_LETTERS[i], weekday: WEEKDAY_NAMES[i], n, state, isToday: i === elapsed });
    }
    let previous = 0;
    for (let i = 0; i <= elapsed; i++) previous += days.get(at(i - 7))?.n || 0;
    return { dots, total, previous, hitDays, studiedDays, elapsedDays: elapsed + 1 };
}

const pct = ratio => Math.round(ratio * 100);

function accuracy(list) {
    return list.length ? list.reduce((sum, e) => sum + e.c, 0) / list.length : null;
}

const PERIODS = [
    { id: 'manha', label: 'pela manhã', test: h => h >= 5 && h < 12 },
    { id: 'tarde', label: 'à tarde', test: h => h >= 12 && h < 18 },
    { id: 'noite', label: 'à noite', test: h => h >= 18 || h < 5 }
];

export const INSIGHT_THRESHOLDS = {
    areaMinPerWindow: 8,     // respostas por janela de 14 dias, por área
    areaMinDeltaPts: 10,
    periodWindowDays: 60,
    periodMinPerBucket: 30,
    periodMinDeltaPts: 10,
    weekdayMinStudyDays: 14,
    weekdayMinSamples: 2,
    weekdayRatio: 1.5,
    streakMin: 3,
    streakWarnHour: 17       // antes disso o aviso de ofensiva só incomoda
};

// events: log.events; days: Map de deriveActivity; `track` restringe as
// áreas ao recorte que o Dashboard está mostrando (curso ou residência).
// Devolve até 3 insights, do mais urgente ao menos.
export function buildInsights({ events, days, now, todayIso, streakCurrent, track, classify, areaName }) {
    const T = INSIGHT_THRESHOLDS;
    const out = [];

    if (streakCurrent >= T.streakMin && (days.get(todayIso)?.n || 0) === 0 && now.getHours() >= T.streakWarnHour) {
        out.push({ id: 'streak-risk', kind: 'warn', text: `Sua ofensiva de ${streakCurrent} dias termina hoje se você não responder nenhuma questão.` });
    }

    // Áreas em queda ou alta: últimas 2 semanas contra as 2 anteriores.
    const nowMs = now.getTime();
    const bucket = new Map();
    for (const e of events) {
        const where = classify?.(e.q);
        if (!where || where.track !== track) continue;
        const age = (nowMs - Date.parse(e.t)) / DAY_MS;
        if (age < 0 || age >= 28) continue;
        const entry = bucket.get(where.key) || { cur: [], prev: [] };
        (age < 14 ? entry.cur : entry.prev).push(e);
        bucket.set(where.key, entry);
    }
    const moves = [];
    for (const [key, { cur, prev }] of bucket) {
        if (cur.length < T.areaMinPerWindow || prev.length < T.areaMinPerWindow) continue;
        const now_ = accuracy(cur), before = accuracy(prev);
        moves.push({ key, delta: pct(now_) - pct(before), now: pct(now_), before: pct(before) });
    }
    const drop = moves.filter(x => x.delta <= -T.areaMinDeltaPts).sort((a, b) => a.delta - b.delta)[0];
    const rise = moves.filter(x => x.delta >= T.areaMinDeltaPts).sort((a, b) => b.delta - a.delta)[0];
    if (drop) out.push({ id: `area-down-${drop.key}`, kind: 'warn', text: `${areaName(track, drop.key)} caiu ${Math.abs(drop.delta)} pontos nas últimas 2 semanas (${drop.before}% → ${drop.now}%).` });
    if (rise) out.push({ id: `area-up-${rise.key}`, kind: 'good', text: `${areaName(track, rise.key)} subiu ${rise.delta} pontos nas últimas 2 semanas (${rise.before}% → ${rise.now}%).` });

    // Horário em que mais acerta (hora local do aparelho).
    const recent = events.filter(e => (nowMs - Date.parse(e.t)) / DAY_MS < T.periodWindowDays);
    const periods = PERIODS
        .map(p => ({ ...p, list: recent.filter(e => p.test(new Date(e.t).getHours())) }))
        .filter(p => p.list.length >= T.periodMinPerBucket)
        .map(p => ({ label: p.label, acc: pct(accuracy(p.list)) }))
        .sort((a, b) => b.acc - a.acc);
    if (periods.length >= 2) {
        const best = periods[0], worst = periods[periods.length - 1];
        if (best.acc - worst.acc >= T.periodMinDeltaPts) {
            out.push({ id: 'period', kind: 'info', text: `Você acerta mais ${best.label} (${best.acc}%) do que ${worst.label} (${worst.acc}%).` });
        }
    }

    // Dia da semana mais forte, nas últimas 8 semanas.
    const perWeekday = Array.from({ length: 7 }, () => []);
    let studyDays = 0, studyTotal = 0;
    for (let i = 0; i < 56; i++) {
        const date = new Date(nowMs - i * DAY_MS);
        const n = days.get(localDate(date))?.n || 0;
        if (n > 0) { perWeekday[date.getDay()].push(n); studyDays += 1; studyTotal += n; }
    }
    if (studyDays >= T.weekdayMinStudyDays) {
        const overall = studyTotal / studyDays;
        const avgs = perWeekday.map((list, weekday) => ({ weekday, n: list.length, avg: list.length ? list.reduce((s, v) => s + v, 0) / list.length : 0 }))
            .filter(x => x.n >= T.weekdayMinSamples).sort((a, b) => b.avg - a.avg);
        if (avgs[0] && avgs[0].avg >= overall * T.weekdayRatio) {
            out.push({ id: 'weekday', kind: 'info', text: `${WEEKDAY_NAMES[avgs[0].weekday][0].toUpperCase()}${WEEKDAY_NAMES[avgs[0].weekday].slice(1)} é o seu dia mais forte: média de ${Math.round(avgs[0].avg)} questões (nos dias de estudo: ${Math.round(overall)}).` });
        }
    }

    return out.slice(0, 3);
}

// Texto do resumo compartilhável da semana — só agregados, sem nada que
// identifique questões. `accuracy` é o acerto de 7 dias em % (ou null
// quando a semana ainda não tem amostra para falar em acerto).
export function weeklySummaryText({ week, accuracy, streak }) {
    const nf = n => n.toLocaleString('pt-BR');
    const diff = week.total - week.previous;
    const lines = ['Minha semana no trycktrack'];
    lines.push(`• ${nf(week.total)} ${week.total === 1 ? 'questão' : 'questões'}${week.previous && diff !== 0 ? ` (${nf(Math.abs(diff))} ${diff > 0 ? 'a mais' : 'a menos'} que no mesmo ponto da semana passada)` : ''}`);
    lines.push(`• ${week.hitDays} de 7 dias com meta batida`);
    if (accuracy != null) lines.push(`• Acerto de ${accuracy}% nos últimos 7 dias`);
    if (streak > 0) lines.push(`• Ofensiva de ${streak} ${streak === 1 ? 'dia' : 'dias'}`);
    return lines.join('\n');
}

// Série mensal para o gráfico de evolução: os últimos `months` meses
// (o corrente por último, marcado como parcial). `accuracy` é null no mês
// com menos de `minSample` respostas de acerto conhecido — dias vindos dos
// contadores antigos têm volume (n) mas não acerto (ne = 0), então esses
// meses aparecem no gráfico de volume e ficam em branco no de acerto.
export function monthlySeries(days, todayIso, months = 6, minSample = 10) {
    const [y, m] = todayIso.split('-').map(Number);
    const rows = [];
    for (let i = months - 1; i >= 0; i--) {
        const d = new Date(y, m - 1 - i, 1, 12);
        rows.push({ key: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`, year: d.getFullYear(), month: d.getMonth(), n: 0, ne: 0, c: 0, partial: i === 0 });
    }
    const byKey = new Map(rows.map(r => [r.key, r]));
    for (const [date, day] of days) {
        const row = byKey.get(date.slice(0, 7));
        if (row) { row.n += day.n; row.ne += day.ne; row.c += day.c; }
    }
    for (const r of rows) r.accuracy = r.ne >= minSample ? r.c / r.ne : null;
    return rows;
}
