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
