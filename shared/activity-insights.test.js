import test from 'node:test';
import assert from 'node:assert/strict';
import { weekSummary, buildInsights, weeklySummaryText, monthlySeries } from './activity-insights.js';
import { localDate } from './activity-log.js';

const day = n => ({ n, ne: n, c: 0 });
const NOW = new Date(2026, 9, 7, 18, 0); // quarta-feira, 18h local
const TODAY = '2026-10-07';
const classify = q => (q.startsWith('curso') ? { track: 'curso', key: 'x' } : { track: 'residencia', key: q.split('-')[0] });
const areaName = (track, key) => key.toUpperCase();
const ev = (q, correct, date) => ({ q, c: correct ? 1 : 0, t: date.toISOString() });
const ago = (k, hour = 9) => new Date(2026, 9, 7 - k, hour, 5);
const base = { now: NOW, todayIso: TODAY, streakCurrent: 0, track: 'residencia', classify, areaName, days: new Map(), events: [] };

test('weekSummary: semana domingo-primeiro, estados dos dias e comparação no mesmo ponto da semana anterior', () => {
    const days = new Map([
        ['2026-10-04', day(25)], ['2026-10-05', day(10)], ['2026-10-07', day(22)], ['2026-10-08', day(99)], // dom, seg, hoje(qua), amanhã
        ['2026-09-27', day(10)], ['2026-09-29', day(7)], ['2026-10-01', day(50)]                            // semana anterior; 01/10 (qui) passa do ponto
    ]);
    const w = weekSummary(days, TODAY, 20);
    assert.deepEqual(w.dots.map(d => d.state), ['hit', 'some', 'none', 'hit', 'future', 'future', 'future']);
    assert.equal(w.dots[3].isToday, true);
    assert.equal(w.total, 57);
    assert.equal(w.hitDays, 2);
    assert.equal(w.studiedDays, 3);
    assert.equal(w.previous, 17);
    assert.equal(w.elapsedDays, 4);
});

test('streak-risk: só com ofensiva >= 3, sem resposta hoje e depois das 17h', () => {
    const ids = opts => buildInsights({ ...base, ...opts }).map(i => i.id);
    assert.deepEqual(ids({ streakCurrent: 5 }), ['streak-risk']);
    assert.deepEqual(ids({ streakCurrent: 2 }), []);
    assert.deepEqual(ids({ streakCurrent: 5, now: new Date(2026, 9, 7, 10, 0) }), []);
    assert.deepEqual(ids({ streakCurrent: 5, days: new Map([[TODAY, day(3)]]) }), []);
});

test('áreas: queda e alta de 10+ pontos com amostra nas duas janelas; ignora amostra pequena e outro recorte', () => {
    const mk = (area, count, rightCount, daysAgo) => Array.from({ length: count }, (_, i) => ev(`${area}-${i}`, i < rightCount, ago(daysAgo)));
    const events = [
        ...mk('a', 10, 4, 3), ...mk('a', 10, 8, 20),   // a: 40% vs 80% → caiu 40
        ...mk('b', 10, 9, 3), ...mk('b', 10, 5, 20),   // b: 90% vs 50% → subiu 40
        ...mk('c', 7, 0, 3), ...mk('c', 10, 10, 20),   // c: amostra atual < 8 → ignora
        ...Array.from({ length: 12 }, (_, i) => ev(`curso-${i}`, false, ago(3))), ...Array.from({ length: 12 }, (_, i) => ev(`curso-p${i}`, true, ago(20)))
    ];
    const texts = buildInsights({ ...base, events }).map(i => i.text);
    assert.deepEqual(texts, [
        'A caiu 40 pontos nas últimas 2 semanas (80% → 40%).',
        'B subiu 40 pontos nas últimas 2 semanas (50% → 90%).'
    ]);
});

test('horário: compara períodos com 30+ respostas e diferença de 10+ pontos', () => {
    const mk = (hour, count, rightCount) => Array.from({ length: count }, (_, i) => ev(`z-${hour}-${i}`, i < rightCount, ago(1 + (i % 12), hour)));
    const strong = buildInsights({ ...base, events: [...mk(9, 30, 24), ...mk(21, 30, 15)] });
    assert.equal(strong[0].text, 'Você acerta mais pela manhã (80%) do que à noite (50%).');
    assert.equal(buildInsights({ ...base, events: [...mk(9, 29, 24), ...mk(21, 30, 15)] }).length, 0, 'bucket com 29 não conta');
    assert.equal(buildInsights({ ...base, events: [...mk(9, 30, 24), ...mk(21, 30, 22)] }).length, 0, 'diferença de 7 pontos é ruído');
});

test('dia da semana: destaca um dia com média 1,5x a dos dias de estudo (mín. 14 dias de estudo)', () => {
    const days = new Map();
    for (let i = 0; i < 56; i++) {
        const date = new Date(2026, 9, 7 - i, 12);
        const n = date.getDay() === 2 ? 40 : (date.getDay() === 4 || date.getDay() === 6) ? 10 : 0;
        if (n) days.set(localDate(date), day(n));
    }
    const out = buildInsights({ ...base, days });
    assert.equal(out[0].text, 'Terça é o seu dia mais forte: média de 40 questões (nos dias de estudo: 20).');
    const fewDays = new Map([...days].slice(0, 10));
    assert.equal(buildInsights({ ...base, days: fewDays }).length, 0);
});

test('devolve no máximo 3, com o aviso de ofensiva primeiro', () => {
    const mk = (area, count, rightCount, daysAgo) => Array.from({ length: count }, (_, i) => ev(`${area}-${i}`, i < rightCount, ago(daysAgo)));
    const events = [...mk('a', 10, 4, 3), ...mk('a', 10, 8, 20), ...mk('b', 10, 9, 3), ...mk('b', 10, 5, 20)];
    const out = buildInsights({ ...base, events, streakCurrent: 6 });
    assert.equal(out.length, 3);
    assert.equal(out[0].id, 'streak-risk');
});

test('weeklySummaryText: monta o resumo e omite o que não tem dado', () => {
    const week = { total: 54, previous: 46, hitDays: 3 };
    assert.equal(weeklySummaryText({ week, accuracy: 79, streak: 5 }), [
        'Minha semana no trycktrack',
        '• 54 questões (8 a mais que no mesmo ponto da semana passada)',
        '• 3 de 7 dias com meta batida',
        '• Acerto de 79% nos últimos 7 dias',
        '• Ofensiva de 5 dias'
    ].join('\n'));
    assert.equal(weeklySummaryText({ week: { total: 1, previous: 0, hitDays: 0 }, accuracy: null, streak: 0 }), [
        'Minha semana no trycktrack', '• 1 questão', '• 0 de 7 dias com meta batida'
    ].join('\n'));
});

test('monthlySeries: agrega por mês, marca o corrente como parcial e deixa acerto em branco com amostra pequena', () => {
    const days = new Map([
        ['2026-08-30', { n: 12, ne: 12, c: 9 }], ['2026-09-02', { n: 8, ne: 8, c: 4 }], ['2026-09-20', { n: 30, ne: 30, c: 24 }],
        ['2026-10-01', { n: 5, ne: 5, c: 5 }], ['2026-10-07', { n: 20, ne: 20, c: 10 }],
        ['2026-05-10', { n: 99, ne: 0, c: 0 }],      // dia legado (só contagem)
        ['2025-12-31', { n: 77, ne: 77, c: 77 }]     // fora da janela de 6 meses
    ]);
    const s = monthlySeries(days, '2026-10-07', 6);
    assert.deepEqual(s.map(r => r.key), ['2026-05', '2026-06', '2026-07', '2026-08', '2026-09', '2026-10']);
    assert.deepEqual(s.map(r => r.partial), [false, false, false, false, false, true]);
    assert.equal(s[0].n, 99); assert.equal(s[0].accuracy, null, 'mês legado: volume sim, acerto não');
    assert.equal(s[3].accuracy, 0.75, 'agosto: 9 de 12');
    assert.equal(s[4].n, 38); assert.equal(Math.round(s[4].accuracy * 100), 74, 'setembro: 28 de 38');
    assert.equal(s[5].n, 25); assert.equal(s[5].accuracy, 0.6, 'outubro (parcial): 15 de 25');
    const few = monthlySeries(new Map([['2026-07-04', { n: 4, ne: 4, c: 4 }]]), '2026-10-07', 6);
    assert.equal(few[2].n, 4); assert.equal(few[2].accuracy, null, 'menos de 10 respostas: acerto em branco');
});

const ids = opts => buildInsights({ ...base, ...opts }).map(i => i.id);
const mkEv = (q, c, k, extra = {}, hour = 9) => ({ ...ev(q, c, ago(k, hour)), ...extra });

test('tempo × acerto: rápido acerta mais, e o inverso vira alerta; amostra pequena não gera nada', () => {
    const mk = (fastRight, slowRight) => [
        ...Array.from({ length: 40 }, (_, i) => mkEv(`a-${i}`, i < fastRight, 3, { ms: 10000, md: 'g' })),
        ...Array.from({ length: 40 }, (_, i) => mkEv(`b-${i}`, i < slowRight, 4, { ms: 90000, md: 'g' }))
    ];
    assert.ok(ids({ events: mk(34, 20) }).includes('speed-fast'));
    assert.ok(ids({ events: mk(20, 34) }).includes('speed-slow'));
    assert.ok(!ids({ events: mk(30, 30) }).some(id => id.startsWith('speed')));
    assert.ok(!ids({ events: mk(34, 20).map(e => ({ ...e, md: 'e' })) }).some(id => id.startsWith('speed')), 'ignora tempo que não é do Guiado');
    assert.ok(!ids({ events: mk(34, 20).slice(0, 20) }).some(id => id.startsWith('speed')));
});

test('áreas: mais fraca em 60 dias e área abandonada há 14+ dias', () => {
    const area = (name, n, right, k) => Array.from({ length: n }, (_, i) => mkEv(`${name}-${i}`, i < right, k + (i % 3)));
    const events = [...area('pedi', 30, 27, 1), ...area('gineco', 30, 12, 2), ...area('cirurgia', 25, 20, 30)];
    const got = ids({ events });
    assert.ok(got.includes('area-weakest-gineco'));
    assert.ok(got.includes('area-neglected-cirurgia'));
    assert.ok(!ids({ events: area('pedi', 30, 27, 1) }).some(id => id.startsWith('area-weakest')));
});

test('reincidência: acerto nas questões que já errou, só com 15+ refeitas', () => {
    const mk = n => Array.from({ length: n }).flatMap((_, i) => [mkEv(`q-${i}`, false, 20), mkEv(`q-${i}`, i % 4 !== 0, 5)]);
    const got = buildInsights({ ...base, events: mk(20) }).find(i => i.id === 'retry');
    assert.equal(got.kind, 'good');
    assert.match(got.text, /20 e acertou 75%/);
    assert.ok(!ids({ events: mk(10) }).includes('retry'));
});

test('tendência de acerto 30d × 30d e ritmo por quinzena', () => {
    const win = (from, n, right, tag) => Array.from({ length: n }, (_, i) => mkEv(`${tag}-${i}`, i < right, from + (i % 20)));
    const events = [...win(1, 50, 40, 'n'), ...win(31, 50, 30, 'o')];
    const t = buildInsights({ ...base, events }).find(i => i.id === 'trend');
    assert.equal(t.kind, 'good');
    assert.match(t.text, /subiu 20 pontos/);
    const days = new Map();
    for (let i = 0; i < 10; i++) days.set(localDate(ago(i)), day(5));
    for (let i = 14; i < 17; i++) days.set(localDate(ago(i)), day(5));
    const r = buildInsights({ ...base, days }).find(i => i.id === 'rhythm');
    assert.equal(r.kind, 'good');
});

test('fadiga: acerto despenca depois da 20ª questão do dia', () => {
    const events = [];
    for (let d = 1; d <= 6; d++) for (let i = 0; i < 30; i++) events.push({ ...ev(`f${d}-${i}`, i < 10 ? i < 9 : i < 20 ? true : i % 3 === 0, ago(d, 8)), t: new Date(2026, 9, 7 - d, 8, i).toISOString() });
    assert.ok(ids({ events }).includes('fatigue'));
});

test('alternativa viciada nos erros e fim de semana × dias úteis', () => {
    const events = Array.from({ length: 40 }, (_, i) => mkEv(`l-${i}`, false, 2 + (i % 20), { ch: i < 24 ? 'C' : 'A' }));
    assert.ok(ids({ events }).includes('letter-bias'));
    const days = new Map();
    for (let i = 0; i < 56; i++) { const dt = new Date(2026, 9, 7 - i, 12); days.set(localDate(dt), day(dt.getDay() === 0 || dt.getDay() === 6 ? 30 : 10)); }
    assert.ok(ids({ days }).includes('weekend-strong'));
});

test('ordem: alertas antes de melhorias antes de curiosidades, limitado a 6', () => {
    const days = new Map(); for (let i = 0; i < 56; i++) { const dt = new Date(2026, 9, 7 - i, 12); days.set(localDate(dt), day(dt.getDay() === 0 || dt.getDay() === 6 ? 30 : 10)); }
    days.delete(TODAY);
    const out = buildInsights({ ...base, days, streakCurrent: 6, events: Array.from({ length: 40 }, (_, i) => mkEv(`l-${i}`, false, 2 + (i % 20), { ch: 'C' })) });
    assert.equal(out[0].id, 'streak-risk');
    assert.ok(out.length <= 6);
    const rank = { warn: 0, good: 1, info: 2 };
    assert.deepEqual(out.map(i => rank[i.kind]), out.map(i => rank[i.kind]).sort());
});
