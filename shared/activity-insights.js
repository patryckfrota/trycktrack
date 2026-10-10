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
    streakWarnHour: 17,      // antes disso o aviso de ofensiva só incomoda
    maxInsights: 6,
    speedFastMs: 30000,
    speedSlowMs: 60000,
    speedMinPerBucket: 30,
    speedMinDeltaPts: 10,
    areaRankMinAnswers: 20,  // janela de 60 dias
    areaRankMinGapPts: 15,
    neglectedMinAnswers: 20, // na janela de 60 dias, e nenhuma nos últimos 14
    fatigueMinDays: 5,       // dias com 25+ respostas
    fatigueDayAnswers: 25,
    fatigueMinPerBucket: 40,
    fatigueMinDeltaPts: 8,
    retryMinSamples: 15,
    trendMinPerWindow: 40,   // janelas de 30 dias
    trendMinDeltaPts: 5,
    paceMinPrevious: 50,
    paceMinDeltaRatio: 0.25,
    rhythmMinDaysDelta: 3,
    weekendMinStudyDays: 14,
    weekendRatio: 1.4,
    letterMinWrong: 30,
    letterMinShare: 0.4
};

// events: log.events; days: Map de deriveActivity; `track` restringe as
// áreas ao recorte que o Dashboard está mostrando (curso ou residência).
// Devolve até 3 insights, do mais urgente ao menos.
export function buildInsights({ events, days, now, todayIso, streakCurrent, track, classify, areaName, areaKeys, limit }) {
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

    out.push(...crossInsights({ events, days, now, todayIso, track, classify, areaName }));
    out.push(...deepInsights({ events, days, now, todayIso, track, classify, areaName, areaKeys }));

    // Alertas primeiro, depois o que melhorou, depois curiosidades.
    const rank = { warn: 0, good: 1, info: 2 };
    return out.map((item, i) => ({ item, i })).sort((a, b) => rank[a.item.kind] - rank[b.item.kind] || a.i - b.i)
        .map(x => ({ ...x.item, category: categoryOf(x.item.id) })).slice(0, limit ?? T.maxInsights);
}

export const INSIGHT_CATEGORIES = [['ritmo', 'Ritmo e constância'], ['desempenho', 'Desempenho'], ['areas', 'Áreas'], ['erros', 'Erros']];
const CATEGORY_BY_PREFIX = [
    ['areas', ['area-', 'improved-area', 'concentration', 'coverage']],
    ['erros', ['retry', 'letter-bias', 'chronic-wrong']],
    ['ritmo', ['streak', 'rhythm', 'month-pace', 'consistency', 'record-day', 'milestone', 'weekend', 'weekday', 'weeks-streak']]
];
function categoryOf(id) {
    for (const [cat, prefixes] of CATEGORY_BY_PREFIX) if (prefixes.some(p => id.startsWith(p))) return cat;
    return 'desempenho';
}

const isoDay = e => localDate(new Date(e.t));
const within = (e, nowMs, from, to) => { const age = (nowMs - Date.parse(e.t)) / DAY_MS; return age >= from && age < to; };

// Cruzamentos entre os dados do log: tempo × acerto, área × período,
// reincidência, fadiga, ritmo, tendência. Cada regra tem piso de amostra.
function crossInsights({ events, days, now, todayIso, track, classify, areaName }) {
    const T = INSIGHT_THRESHOLDS;
    const nowMs = now.getTime();
    const out = [];
    const mine = events.filter(e => { const w = classify?.(e.q); return w && w.track === track; });
    const recent60 = mine.filter(e => within(e, nowMs, 0, 60));

    // Tempo por questão × acerto. Só Guiado (md = 'g'): no Simulado o tempo
    // soma navegação e revisitas, então não é comparável com o do Guiado.
    const timed = events.filter(e => e.md === 'g' && Number.isFinite(e.ms) && e.ms > 0 && within(e, nowMs, 0, 90));
    const fast = timed.filter(e => e.ms < T.speedFastMs), slow = timed.filter(e => e.ms >= T.speedSlowMs);
    if (fast.length >= T.speedMinPerBucket && slow.length >= T.speedMinPerBucket) {
        const f = pct(accuracy(fast)), sl = pct(accuracy(slow));
        if (f - sl >= T.speedMinDeltaPts) out.push({ id: 'speed-fast', kind: 'info', text: `Você acerta mais quando responde rápido: ${f}% abaixo de 30 s contra ${sl}% acima de 1 min. Dúvida longa costuma indicar lacuna, não falta de cuidado.` });
        else if (sl - f >= T.speedMinDeltaPts) out.push({ id: 'speed-slow', kind: 'warn', text: `Respostas em menos de 30 s têm ${f}% de acerto, contra ${sl}% quando você pensa mais de 1 min. Vale desacelerar.` });
    }

    // Melhor e pior área (60 dias) e área abandonada.
    const perArea = new Map();
    for (const e of recent60) {
        const key = classify(e.q).key;
        const row = perArea.get(key) || { all: [], last14: 0 };
        row.all.push(e);
        if (within(e, nowMs, 0, 14)) row.last14 += 1;
        perArea.set(key, row);
    }
    const ranked = [...perArea].filter(([, r]) => r.all.length >= T.areaRankMinAnswers)
        .map(([key, r]) => ({ key, acc: pct(accuracy(r.all)), n: r.all.length, last14: r.last14 })).sort((a, b) => a.acc - b.acc);
    if (ranked.length >= 2 && ranked[ranked.length - 1].acc - ranked[0].acc >= T.areaRankMinGapPts) {
        const lo = ranked[0], hi = ranked[ranked.length - 1];
        out.push({ id: `area-weakest-${lo.key}`, kind: 'warn', text: `${areaName(track, lo.key)} é sua área mais fraca em 60 dias (${lo.acc}% em ${lo.n} questões), ${hi.acc - lo.acc} pontos abaixo de ${areaName(track, hi.key)} (${hi.acc}%).` });
    }
    const neglected = ranked.filter(r => r.last14 === 0 && r.n >= T.neglectedMinAnswers).sort((a, b) => b.n - a.n)[0];
    if (neglected) out.push({ id: `area-neglected-${neglected.key}`, kind: 'warn', text: `Você não toca em ${areaName(track, neglected.key)} há mais de 2 semanas, e ela vinha com ${neglected.acc}% de acerto. Retome antes de esquecer.` });

    // Fadiga: início do dia × depois da 20ª resposta, em dias longos.
    const byDay = new Map();
    for (const e of events.filter(x => within(x, nowMs, 0, 60)).sort((a, b) => Date.parse(a.t) - Date.parse(b.t))) {
        const k = isoDay(e); (byDay.get(k) || byDay.set(k, []).get(k)).push(e);
    }
    const longDays = [...byDay.values()].filter(list => list.length >= T.fatigueDayAnswers);
    if (longDays.length >= T.fatigueMinDays) {
        const early = longDays.flatMap(l => l.slice(0, 10)), late = longDays.flatMap(l => l.slice(20));
        if (early.length >= T.fatigueMinPerBucket && late.length >= T.fatigueMinPerBucket) {
            const a = pct(accuracy(early)), b = pct(accuracy(late));
            if (a - b >= T.fatigueMinDeltaPts) out.push({ id: 'fatigue', kind: 'warn', text: `Seu acerto cai de ${a}% nas primeiras 10 questões do dia para ${b}% depois da 20ª. Sessões mais curtas podem render mais.` });
        }
    }

    // Reincidência: questões que já errou, quando volta a responder.
    const seen = new Map(); let retried = 0, retriedRight = 0;
    for (const e of [...events].sort((a, b) => Date.parse(a.t) - Date.parse(b.t))) {
        const before = seen.get(e.q);
        if (before === 0) { retried += 1; retriedRight += e.c; }
        seen.set(e.q, e.c);
    }
    if (retried >= T.retryMinSamples) {
        const r = pct(retriedRight / retried);
        out.push({ id: 'retry', kind: r >= 60 ? 'good' : 'warn', text: r >= 60
            ? `Das questões que você já errou, refez ${retried} e acertou ${r}%: seu caderno de erros está funcionando.`
            : `Das ${retried} questões que você refez depois de errar, só acertou ${r}%. Revise o comentário antes de tentar de novo.` });
    }

    // Tendência de acerto (30 dias × 30 anteriores) e de ritmo (quinzenas).
    const cur30 = events.filter(e => within(e, nowMs, 0, 30)), prev30 = events.filter(e => within(e, nowMs, 30, 60));
    if (cur30.length >= T.trendMinPerWindow && prev30.length >= T.trendMinPerWindow) {
        const d = pct(accuracy(cur30)) - pct(accuracy(prev30));
        if (Math.abs(d) >= T.trendMinDeltaPts) out.push({ id: 'trend', kind: d > 0 ? 'good' : 'warn', text: `Seu acerto geral ${d > 0 ? 'subiu' : 'caiu'} ${Math.abs(d)} pontos nos últimos 30 dias (${pct(accuracy(prev30))}% → ${pct(accuracy(cur30))}%).` });
    }
    const studyDaysIn = (from, to) => { let n = 0; for (let i = from; i < to; i++) if ((days.get(localDate(new Date(nowMs - i * DAY_MS)))?.n || 0) > 0) n += 1; return n; };
    const d14 = studyDaysIn(0, 14), p14 = studyDaysIn(14, 28);
    if (Math.abs(d14 - p14) >= T.rhythmMinDaysDelta && Math.max(d14, p14) >= 5) {
        out.push({ id: 'rhythm', kind: d14 > p14 ? 'good' : 'warn', text: d14 > p14
            ? `Você estudou ${d14} dos últimos 14 dias, contra ${p14} nos 14 anteriores. O ritmo está subindo.`
            : `Você estudou ${d14} dos últimos 14 dias, contra ${p14} nos 14 anteriores. O ritmo caiu.` });
    }

    // Volume do mês até hoje × mês passado até o mesmo dia.
    const [y, m, d] = todayIso.split('-').map(Number);
    let thisMonth = 0, lastMonth = 0;
    for (let k = 1; k <= d; k++) {
        thisMonth += days.get(localDate(new Date(y, m - 1, k, 12)))?.n || 0;
        lastMonth += days.get(localDate(new Date(y, m - 2, k, 12)))?.n || 0;
    }
    if (lastMonth >= T.paceMinPrevious && Math.abs(thisMonth - lastMonth) / lastMonth >= T.paceMinDeltaRatio) {
        const up = thisMonth > lastMonth, ratio = Math.round(Math.abs(thisMonth - lastMonth) / lastMonth * 100);
        out.push({ id: 'month-pace', kind: up ? 'good' : 'info', text: `Neste mês você já fez ${thisMonth.toLocaleString('pt-BR')} questões, ${ratio}% ${up ? 'a mais' : 'a menos'} que no mesmo ponto do mês passado (${lastMonth.toLocaleString('pt-BR')}).` });
    }

    // Fim de semana × dias úteis (volume por dia de estudo, 8 semanas).
    const wk = { end: [], mid: [] };
    for (let i = 0; i < 56; i++) {
        const date = new Date(nowMs - i * DAY_MS);
        const n = days.get(localDate(date))?.n || 0;
        if (n > 0) wk[date.getDay() === 0 || date.getDay() === 6 ? 'end' : 'mid'].push(n);
    }
    if (wk.end.length + wk.mid.length >= T.weekendMinStudyDays && wk.end.length >= 3 && wk.mid.length >= 3) {
        const avg = l => l.reduce((a, b) => a + b, 0) / l.length;
        const e = avg(wk.end), w = avg(wk.mid);
        if (e >= w * T.weekendRatio) out.push({ id: 'weekend-strong', kind: 'info', text: `Nos fins de semana você faz em média ${Math.round(e)} questões por dia de estudo, contra ${Math.round(w)} nos dias úteis.` });
        else if (w >= e * T.weekendRatio) out.push({ id: 'weekend-weak', kind: 'info', text: `Nos dias úteis você faz ${Math.round(w)} questões por dia de estudo; no fim de semana, só ${Math.round(e)}. Há espaço para render mais sábado e domingo.` });
    }

    // Viés de alternativa nos erros.
    const wrongLetters = events.filter(e => e.c === 0 && e.ch && within(e, nowMs, 0, 90));
    if (wrongLetters.length >= T.letterMinWrong) {
        const count = {};
        for (const e of wrongLetters) count[e.ch] = (count[e.ch] || 0) + 1;
        const [letter, n] = Object.entries(count).sort((a, b) => b[1] - a[1])[0];
        if (n / wrongLetters.length >= T.letterMinShare) out.push({ id: 'letter-bias', kind: 'info', text: `${pct(n / wrongLetters.length)}% dos seus erros recentes foram na alternativa ${letter}. Desconfie dela quando estiver em dúvida.` });
    }

    return out;
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

const fmtDate = iso => { const [y, m, d] = iso.split('-').map(Number); return new Date(y, m - 1, d).toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' }).replace('.', ''); };
const nfmt = n => n.toLocaleString('pt-BR');

// Segunda camada de cruzamentos: sequência de acertos/erros, dia da semana,
// madrugada, chute, erros crônicos, evolução e cobertura por área, recorde,
// meta de marco. Mesmos pisos de amostra das outras regras.
function deepInsights({ events, days, now, todayIso, track, classify, areaName, areaKeys }) {
    const T = INSIGHT_THRESHOLDS;
    const nowMs = now.getTime();
    const out = [];
    const sorted = [...events].sort((a, b) => Date.parse(a.t) - Date.parse(b.t));
    const recent90 = sorted.filter(e => within(e, nowMs, 0, 90));

    // Depois de errar: acerto da resposta seguinte (mesmo dia, até 10 min).
    const afterWrong = [], afterRight = [];
    for (let i = 1; i < recent90.length; i++) {
        const a = recent90[i - 1], b = recent90[i];
        if (Date.parse(b.t) - Date.parse(a.t) > 10 * 60000) continue;
        (a.c ? afterRight : afterWrong).push(b);
    }
    if (afterWrong.length >= 40 && afterRight.length >= 40) {
        const w = pct(accuracy(afterWrong)), r = pct(accuracy(afterRight));
        if (r - w >= 8) out.push({ id: 'tilt', kind: 'warn', text: `Depois de errar, seu acerto na questão seguinte cai para ${w}% (contra ${r}% depois de um acerto). Respire e leia o comentário antes de seguir.` });
        else if (w - r >= 8) out.push({ id: 'resilience', kind: 'good', text: `Você reage bem ao erro: acerta ${w}% da questão seguinte depois de errar, contra ${r}% depois de um acerto.` });
    }

    // Acerto por dia da semana (90 dias).
    const byWd = Array.from({ length: 7 }, () => []);
    for (const e of recent90) byWd[new Date(e.t).getDay()].push(e);
    const wd = byWd.map((list, i) => ({ i, n: list.length, acc: list.length ? pct(accuracy(list)) : 0 })).filter(x => x.n >= 30).sort((a, b) => b.acc - a.acc);
    if (wd.length >= 3 && wd[0].acc - wd[wd.length - 1].acc >= 12) {
        const hi = wd[0], lo = wd[wd.length - 1];
        out.push({ id: 'weekday-acc', kind: 'info', text: `Seu melhor dia de acerto é ${WEEKDAY_NAMES[hi.i]} (${hi.acc}%) e o pior é ${WEEKDAY_NAMES[lo.i]} (${lo.acc}%). Deixe os assuntos difíceis para o dia forte.` });
    }

    // Madrugada (23h–5h).
    const night = recent90.filter(e => { const h = new Date(e.t).getHours(); return h >= 23 || h < 5; });
    const day_ = recent90.filter(e => { const h = new Date(e.t).getHours(); return h >= 5 && h < 23; });
    if (night.length >= 30 && day_.length >= 30 && night.length / recent90.length >= 0.15 && pct(accuracy(day_)) - pct(accuracy(night)) >= 8) {
        out.push({ id: 'late-night', kind: 'warn', text: `${pct(night.length / recent90.length)}% das suas questões saem entre 23h e 5h, com ${pct(accuracy(night))}% de acerto (${pct(accuracy(day_))}% no resto do dia). Dormir cedo rende mais.` });
    }

    // Chute: respostas muito rápidas (Guiado) com acerto perto do acaso.
    const quick = recent90.filter(e => e.md === 'g' && Number.isFinite(e.ms) && e.ms > 0 && e.ms < 8000);
    if (quick.length >= 25 && pct(accuracy(quick)) <= 35) {
        out.push({ id: 'guess', kind: 'warn', text: `${quick.length} respostas em menos de 8 s tiveram só ${pct(accuracy(quick))}% de acerto, perto do acaso. Isso parece chute: leia o enunciado inteiro.` });
    }

    // Erros crônicos: questões erradas 3+ vezes.
    const wrongCount = new Map();
    for (const e of sorted) if (!e.c && within(e, nowMs, 0, 120)) wrongCount.set(e.q, (wrongCount.get(e.q) || 0) + 1);
    const chronic = [...wrongCount.values()].filter(n => n >= 3).length;
    if (chronic >= 3) out.push({ id: 'chronic-wrong', kind: 'warn', text: `${chronic} questões você errou 3 vezes ou mais. São os pontos cegos: vale estudar o assunto, não só refazer.` });

    // Evolução por área: primeiros 30 dias da janela × últimos 30.
    const perArea = new Map();
    for (const e of sorted) {
        const w = classify?.(e.q);
        if (!w || w.track !== track) continue;
        const age = (nowMs - Date.parse(e.t)) / DAY_MS;
        if (age < 0 || age >= 60) continue;
        const row = perArea.get(w.key) || { cur: [], prev: [], all: 0 };
        (age < 30 ? row.cur : row.prev).push(e); row.all += 1; perArea.set(w.key, row);
    }
    const climbers = [...perArea].filter(([, r]) => r.cur.length >= 15 && r.prev.length >= 15)
        .map(([key, r]) => ({ key, d: pct(accuracy(r.cur)) - pct(accuracy(r.prev)), now: pct(accuracy(r.cur)) })).filter(x => x.d >= 10).sort((a, b) => b.d - a.d);
    if (climbers[0]) out.push({ id: `improved-area-${climbers[0].key}`, kind: 'good', text: `${areaName(track, climbers[0].key)} é sua área que mais evoluiu em 60 dias: +${climbers[0].d} pontos, agora em ${climbers[0].now}%.` });

    // Concentração e cobertura.
    const totalArea = [...perArea.values()].reduce((a, r) => a + r.all, 0);
    if (totalArea >= 100) {
        const [topKey, top] = [...perArea].sort((a, b) => b[1].all - a[1].all)[0];
        if (top.all / totalArea >= 0.4) out.push({ id: 'concentration', kind: 'info', text: `${pct(top.all / totalArea)}% das suas questões dos últimos 60 dias são de ${areaName(track, topKey)}. Distribua mais entre as áreas.` });
        const missing = (areaKeys || []).filter(k => !perArea.has(k));
        if (missing.length) out.push({ id: 'coverage', kind: 'warn', text: `Sem nenhuma questão em 60 dias: ${missing.slice(0, 4).map(k => areaName(track, k)).join(', ')}${missing.length > 4 ? ` e mais ${missing.length - 4}` : ''}.` });
    }

    // Recorde de volume e constância no mês.
    const entries = [...days].filter(([date]) => date <= todayIso).sort((a, b) => (a[0] < b[0] ? -1 : 1));
    const last90 = entries.filter(([date]) => (nowMs - new Date(`${date}T12:00:00`).getTime()) / DAY_MS < 90);
    if (last90.length >= 10) {
        const [recDate, recDay] = last90.reduce((m, x) => (x[1].n > m[1].n ? x : m));
        const ageDays = (nowMs - new Date(`${recDate}T12:00:00`).getTime()) / DAY_MS;
        if (recDay.n >= 20 && ageDays < 7 && recDate === todayIso) out.push({ id: 'record-day', kind: 'good', text: `Hoje é seu recorde dos últimos 90 dias: ${nfmt(recDay.n)} questões.` });
        else if (recDay.n >= 30 && ageDays < 7) out.push({ id: 'record-day', kind: 'good', text: `Seu recorde dos últimos 90 dias foi em ${fmtDate(recDate)}: ${nfmt(recDay.n)} questões.` });
    }
    let studied28 = 0;
    for (let i = 0; i < 28; i++) if ((days.get(localDate(new Date(nowMs - i * DAY_MS)))?.n || 0) > 0) studied28 += 1;
    if (studied28 >= 20) out.push({ id: 'consistency', kind: 'good', text: `Você estudou ${studied28} dos últimos 28 dias. Constância assim vale mais que maratonas.` });

    // Próximo marco no ritmo atual.
    const total = [...days.values()].reduce((a, d) => a + d.n, 0);
    const per28 = [...Array(28).keys()].reduce((a, i) => a + (days.get(localDate(new Date(nowMs - i * DAY_MS)))?.n || 0), 0) / 28;
    const milestone = [100, 250, 500, 1000, 2000, 3000, 5000, 10000].find(m => m > total);
    if (milestone && per28 >= 3 && total >= milestone * 0.5) {
        const eta = Math.ceil((milestone - total) / per28);
        if (eta <= 60) out.push({ id: 'milestone', kind: 'good', text: `No ritmo atual (${Math.round(per28)} questões por dia), você chega a ${nfmt(milestone)} questões em cerca de ${eta} ${eta === 1 ? 'dia' : 'dias'} (faltam ${nfmt(milestone - total)}).` });
    }

    // Semanas seguidas de acerto subindo ou caindo (4 semanas, 50+ por semana).
    const weeks = [3, 2, 1, 0].map(w => events.filter(e => within(e, nowMs, w * 7, w * 7 + 7)));
    if (weeks.every(w => w.length >= 50)) {
        const a = weeks.map(w => pct(accuracy(w)));
        if (a[0] < a[1] && a[1] < a[2] && a[2] < a[3]) out.push({ id: 'weeks-streak-up', kind: 'good', text: `4 semanas seguidas com acerto subindo: ${a.join('% → ')}%.` });
        else if (a[0] > a[1] && a[1] > a[2] && a[2] > a[3]) out.push({ id: 'weeks-streak-down', kind: 'warn', text: `4 semanas seguidas com acerto caindo: ${a.join('% → ')}%. Vale revisar o método.` });
    }
    return out;
}
