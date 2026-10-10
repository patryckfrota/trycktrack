import test from 'node:test';
import assert from 'node:assert/strict';
import {
    emptyLog, initLogFromLegacy, normalizeLog, mergeEvents, pendingEvents, markSynced,
    toSyncPayload, fromServerResponse, deriveActivity, compactLog, localDate, eventKey, recentWindows, windowAccuracy
} from './activity-log.js';

const classify = id => (id.startsWith('cg') ? { track: 'residencia', key: 'cirurgia' } : { track: 'residencia', key: 'clinica' });
const ev = (q, c, t, extra = {}) => ({ q, c, t, ...extra });

test('initLogFromLegacy: aparelho com histórico congela os contadores e define o cutover', () => {
    const log = initLogFromLegacy({ answered: 10, correct: 7, byArea: { residencia: { cirurgia: { answered: 4, correct: 3 } } }, daily: [{ date: '2026-10-01', count: 10 }] }, '2026-10-10T00:00:00.000Z');
    assert.equal(log.cutover, '2026-10-10T00:00:00.000Z');
    assert.equal(log.baseline.answered, 10);
    assert.equal(log.baseline.byArea.residencia.cirurgia.correct, 3);
});

test('initLogFromLegacy: aparelho zerado não tem cutover (aceita o histórico todo do servidor)', () => {
    const log = initLogFromLegacy({}, '2026-10-10T00:00:00.000Z');
    assert.equal(log.cutover, null);
    assert.equal(log.baseline.answered, 0);
});

test('mergeEvents: não duplica, e o eco do servidor tira o pendente', () => {
    const log = emptyLog();
    assert.equal(mergeEvents(log, [ev('q1', 1, '2026-10-10T12:00:00.000Z', { p: 1 })]), 1);
    assert.equal(pendingEvents(log).length, 1);
    assert.equal(mergeEvents(log, [ev('q1', 1, '2026-10-10T12:00:00.000Z')]), 0); // mesmo q|t, vindo do servidor
    assert.equal(log.events.length, 1);
    assert.equal(pendingEvents(log).length, 0);
});

test('mergeEvents: ignora o que é anterior ao cutover (a baseline já cobre) e o já compactado', () => {
    const log = initLogFromLegacy({ answered: 5, correct: 5 }, '2026-10-10T00:00:00.000Z');
    assert.equal(mergeEvents(log, [ev('q1', 1, '2026-10-09T10:00:00.000Z'), ev('q2', 0, '2026-10-10T10:00:00.000Z')]), 1);
    log.rolledUpTo = '2026-10-10T11:00:00.000Z';
    assert.equal(mergeEvents(log, [ev('q3', 1, '2026-10-10T10:30:00.000Z')]), 0);
});

test('deriveActivity: baseline + eventos novos, sem contar duas vezes', () => {
    const log = initLogFromLegacy({ answered: 10, correct: 7, byArea: { residencia: { cirurgia: { answered: 10, correct: 7 } } }, daily: [{ date: '2026-10-01', count: 10 }] }, '2026-10-10T00:00:00.000Z');
    mergeEvents(log, [
        ev('cg-1', 1, '2026-10-09T12:00:00.000Z'), // antes do cutover: já está na baseline
        ev('cg-2', 1, '2026-10-10T12:00:00.000Z'),
        ev('cm-1', 0, '2026-10-10T13:00:00.000Z')
    ]);
    const a = deriveActivity(log, { classify });
    assert.equal(a.answered, 12);
    assert.equal(a.correct, 8);
    assert.deepEqual(a.byArea.residencia.cirurgia, { answered: 11, correct: 8 });
    assert.deepEqual(a.byArea.residencia.clinica, { answered: 1, correct: 0 });
    assert.deepEqual(a.days.get('2026-10-01'), { n: 10, ne: 0, c: 0 }); // dia legado: só contagem
    const day = a.days.get(localDate('2026-10-10T12:00:00.000Z'));
    assert.ok(day.n >= 1 && day.ne >= 1);
});

test('compactLog: não mexe abaixo do limite; acima, dobra o antigo confirmado na baseline sem mudar os totais', () => {
    const log = emptyLog();
    const now = new Date('2026-10-10T12:00:00.000Z');
    const events = [];
    for (let i = 0; i < 30; i++) events.push(ev(i % 2 ? 'cg-x' : 'cm-x', i % 3 ? 1 : 0, new Date(now.getTime() - (200 - i) * 86400000).toISOString()));
    events.push(ev('cg-novo', 1, '2026-10-09T12:00:00.000Z'));
    events.push(ev('cg-pend', 1, new Date(now.getTime() - 150 * 86400000).toISOString(), { p: 1 }));
    mergeEvents(log, events);
    const before = deriveActivity(log, { classify });
    assert.equal(compactLog(log, { classify, now, maxEvents: 100 }), 0);
    const folded = compactLog(log, { classify, now, maxEvents: 10 });
    assert.equal(folded, 30);
    assert.equal(log.events.length, 2); // o recente + o pendente antigo continuam
    const after = deriveActivity(log, { classify });
    assert.equal(after.answered, before.answered);
    assert.equal(after.correct, before.correct);
    assert.deepEqual(after.byArea, before.byArea);
    assert.equal([...after.days.values()].reduce((s, d) => s + d.n, 0), 32);
});

test('markSynced limpa só os confirmados', () => {
    const log = emptyLog();
    mergeEvents(log, [ev('a', 1, '2026-10-10T10:00:00.000Z', { p: 1 }), ev('b', 0, '2026-10-10T10:01:00.000Z', { p: 1 })]);
    markSynced(log, [eventKey(log.events[0])]);
    assert.deepEqual(pendingEvents(log).map(e => e.q), ['b']);
});

test('toSyncPayload e fromServerResponse fazem o caminho de ida e volta; sem gabarito vira null', () => {
    const e = ev('q1', 1, '2026-10-10T10:00:00.000Z', { ch: 'B', ms: 4200, p: 1 });
    const payload = toSyncPayload(e);
    assert.deepEqual(payload, { questionId: 'q1', chosen: 'B', correct: true, elapsedMs: 4200, answeredAt: '2026-10-10T10:00:00.000Z' });
    assert.deepEqual(fromServerResponse(payload), { q: 'q1', c: 1, t: '2026-10-10T10:00:00.000Z', ch: 'B', ms: 4200 });
    assert.equal(fromServerResponse({ ...payload, correct: null }), null);
});

test('normalizeLog rejeita versão desconhecida', () => {
    assert.equal(normalizeLog({ v: 99, events: [] }), null);
    assert.ok(normalizeLog({ v: 1, events: [] }));
});

test('recentWindows: soma a janela atual e a anterior, e ignora dias fora delas', () => {
    const days = new Map([
        ['2026-10-10', { n: 10, ne: 10, c: 8 }],   // hoje
        ['2026-10-04', { n: 5, ne: 5, c: 3 }],     // 6 dias atrás: ainda na atual
        ['2026-10-03', { n: 20, ne: 20, c: 10 }],  // 7 dias atrás: já na anterior
        ['2026-09-27', { n: 4, ne: 0, c: 0 }],     // 13 dias atrás: anterior, dia legado (sem acerto conhecido)
        ['2026-09-26', { n: 99, ne: 99, c: 99 }]   // 14 dias atrás: fora das duas
    ]);
    const { current, previous } = recentWindows(days, '2026-10-10', 7);
    assert.deepEqual(current, { n: 15, ne: 15, c: 11 });
    assert.deepEqual(previous, { n: 24, ne: 20, c: 10 });
});

test('windowAccuracy: razão entre acertos e respostas com acerto conhecido; sem amostra é null', () => {
    assert.equal(windowAccuracy({ n: 24, ne: 20, c: 10 }), 0.5);
    assert.equal(windowAccuracy({ n: 4, ne: 0, c: 0 }), null);
});
