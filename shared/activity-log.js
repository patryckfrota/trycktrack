/**
 * Log de respostas — a fonte única das métricas do Dashboard.
 *
 * Antes, nota/áreas/dias eram contadores incrementados no aparelho
 * (trycktrack-question-stats): não somavam entre aparelhos e davam
 * defasagem. Agora cada resposta é um evento append-only; tudo que o
 * Dashboard mostra é DERIVADO dele, e o servidor guarda os mesmos
 * eventos (QuestionResponse), então qualquer aparelho reconstrói igual.
 *
 * Evento: { q: questionId, c: 1|0, t: ISO UTC, ch?: letra, ms?: tempo,
 *           md?: 'g' (Guiado; só local), p?: 1 }   (p = ainda não confirmado pelo servidor)
 *
 * Legado: os contadores antigos viram uma `baseline` congelada, e só
 * eventos a partir de `cutover` entram por cima — sem isso, as respostas
 * já contadas nos contadores (e já no servidor) contariam duas vezes.
 * Funções puras: quem chama (app-app.js) injeta `classify` (questão →
 * { track, key } do dashboard) e cuida do localStorage e da rede.
 */

export const ACTIVITY_LOG_VERSION = 1;

export function eventKey(event) {
    return `${event.q}|${event.t}`;
}

export function localDate(iso) {
    const d = new Date(iso);
    const pad = n => String(n).padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

const emptyBaseline = () => ({ answered: 0, correct: 0, byArea: {}, daily: [] });

export function emptyLog() {
    return { v: ACTIVITY_LOG_VERSION, baseline: emptyBaseline(), cutover: null, rolledUpTo: null, pullAfter: null, events: [] };
}

// legacyStats: o objeto antigo trycktrack-question-stats. Aparelho que já
// tinha histórico congela os contadores e só conta eventos novos
// (cutover = agora); aparelho zerado aceita todo o histórico do servidor.
export function initLogFromLegacy(legacyStats, nowIso) {
    const log = emptyLog();
    const answered = Number(legacyStats?.answered || 0);
    const daily = Array.isArray(legacyStats?.daily) ? legacyStats.daily : [];
    if (answered > 0 || daily.length) {
        log.baseline = {
            answered,
            correct: Number(legacyStats.correct || 0),
            byArea: JSON.parse(JSON.stringify(legacyStats.byArea || {})),
            daily: daily.map(item => ({ date: item.date, count: Number(item.count || 0) }))
        };
        log.cutover = nowIso;
    }
    return log;
}

export function normalizeLog(raw) {
    if (!raw || raw.v !== ACTIVITY_LOG_VERSION || !Array.isArray(raw.events)) return null;
    return { ...emptyLog(), ...raw, baseline: { ...emptyBaseline(), ...(raw.baseline || {}) } };
}

// Acrescenta eventos (locais ou vindos do servidor) sem duplicar. Ignora
// o que já foi compactado na baseline (<= rolledUpTo) e o que é anterior
// ao cutover (a baseline já cobre). Devolve quantos entraram.
export function mergeEvents(log, incoming) {
    const byKey = new Map(log.events.map(e => [eventKey(e), e]));
    let added = 0;
    for (const event of incoming) {
        if (!event?.q || !event.t) continue;
        if (log.cutover && event.t < log.cutover) continue;
        // ponytail: um evento de outro aparelho que chegue DEPOIS da
        // compactação com t <= rolledUpTo (aparelho offline por >90 dias)
        // é descartado aqui; se importar, dar uma baseline por aparelho.
        if (log.rolledUpTo && event.t <= log.rolledUpTo) continue;
        const key = eventKey(event);
        const existing = byKey.get(key);
        if (existing) {
            if (!event.p) delete existing.p; // o servidor já tem: não é mais pendente
            continue;
        }
        const copy = { ...event };
        log.events.push(copy);
        byKey.set(key, copy);
        added += 1;
    }
    return added;
}

export function pendingEvents(log) {
    return log.events.filter(e => e.p);
}

export function markSynced(log, keys) {
    const set = keys instanceof Set ? keys : new Set(keys);
    for (const e of log.events) if (e.p && set.has(eventKey(e))) delete e.p;
}

export function toSyncPayload(event) {
    return {
        questionId: event.q,
        chosen: event.ch ?? null,
        correct: event.c === 1,
        ...(Number.isFinite(event.ms) ? { elapsedMs: event.ms } : {}),
        answeredAt: event.t
    };
}

export function fromServerResponse(r) {
    if (typeof r?.correct !== 'boolean') return null; // sem gabarito (discursiva/anulada) não conta
    const event = { q: r.questionId, c: r.correct ? 1 : 0, t: r.answeredAt };
    if (r.chosen) event.ch = r.chosen;
    if (Number.isFinite(r.elapsedMs)) event.ms = r.elapsedMs;
    return event;
}

function bump(map, key, patch) {
    const row = map[key] || (map[key] = { answered: 0, correct: 0 });
    row.answered += patch.answered;
    row.correct += patch.correct;
}

// Totais, por área e por dia — baseline + eventos. `days` guarda
// n (respostas), ne (as que têm acerto conhecido) e c (acertos entre
// elas): dias da baseline só têm n.
export function deriveActivity(log, { classify } = {}) {
    const byArea = JSON.parse(JSON.stringify(log.baseline.byArea || {}));
    const days = new Map();
    let answered = Number(log.baseline.answered || 0);
    let correct = Number(log.baseline.correct || 0);

    for (const row of log.baseline.daily || []) {
        const day = days.get(row.date) || { n: 0, ne: 0, c: 0 };
        day.n += Number(row.count || 0);
        day.ne += Number(row.ne || 0);
        day.c += Number(row.c || 0);
        days.set(row.date, day);
    }
    for (const event of log.events) {
        answered += 1;
        correct += event.c;
        const date = localDate(event.t);
        const day = days.get(date) || { n: 0, ne: 0, c: 0 };
        day.n += 1; day.ne += 1; day.c += event.c;
        days.set(date, day);
        const where = classify?.(event.q);
        if (where?.track && where.key) {
            byArea[where.track] = byArea[where.track] || {};
            bump(byArea[where.track], where.key, { answered: 1, correct: event.c });
        }
    }
    return { answered, correct, byArea, days };
}

// Passa pra baseline os eventos antigos já confirmados pelo servidor,
// pra o log não crescer sem limite no localStorage (~75 B por evento).
// O servidor continua com os eventos brutos; `rolledUpTo` impede que um
// novo pull os traga de volta. Só compacta quando passa de maxEvents.
export function compactLog(log, { classify, now = new Date(), keepDays = 90, maxEvents = 8000 } = {}) {
    if (log.events.length <= maxEvents) return 0;
    const cutoff = new Date(now.getTime() - keepDays * 86400000).toISOString();
    const old = log.events.filter(e => !e.p && e.t < cutoff);
    if (!old.length) return 0;
    const dayRows = new Map((log.baseline.daily || []).map(row => [row.date, row]));
    for (const event of old) {
        log.baseline.answered += 1;
        log.baseline.correct += event.c;
        const date = localDate(event.t);
        const row = dayRows.get(date) || { date, count: 0 };
        row.count += 1; row.ne = (row.ne || 0) + 1; row.c = (row.c || 0) + event.c;
        dayRows.set(date, row);
        const where = classify?.(event.q);
        if (where?.track && where.key) {
            log.baseline.byArea[where.track] = log.baseline.byArea[where.track] || {};
            bump(log.baseline.byArea[where.track], where.key, { answered: 1, correct: event.c });
        }
        if (!log.rolledUpTo || event.t > log.rolledUpTo) log.rolledUpTo = event.t;
    }
    log.baseline.daily = [...dayRows.values()].sort((a, b) => a.date.localeCompare(b.date));
    const oldKeys = new Set(old.map(eventKey));
    log.events = log.events.filter(e => !oldKeys.has(eventKey(e)));
    return old.length;
}

// Soma {n, ne, c} dos `length` dias que terminam em `endIso` (inclusive,
// data local) e da janela imediatamente anterior, do mesmo tamanho —
// base das comparações "esta semana vs a anterior" do Dashboard.
export function recentWindows(days, endIso, length = 7) {
    const [y, m, d] = endIso.split('-').map(Number);
    const sum = startOffset => {
        const total = { n: 0, ne: 0, c: 0 };
        for (let i = 0; i < length; i++) {
            const day = days.get(localDate(new Date(y, m - 1, d - startOffset - i, 12)));
            if (day) { total.n += day.n; total.ne += day.ne; total.c += day.c; }
        }
        return total;
    };
    return { current: sum(0), previous: sum(length) };
}

// Acerto de uma janela (só conta respostas com acerto conhecido — dias
// vindos dos contadores antigos têm n mas não ne). null = sem amostra.
export function windowAccuracy(total) {
    return total.ne > 0 ? total.c / total.ne : null;
}
