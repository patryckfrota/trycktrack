import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildSchedule, minimumDailyCapacity, addDaysIso } from './trail-schedule.js';

// n assuntos novos, cada um com `size` questões e peso decrescente.
function subjects(n, size = 10) {
    return Array.from({ length: n }, (_, i) => ({
        key: `A > s${i}`, area: 'A', assunto: `s${i}`, weight: (n - i) / 100,
        questionIds: Array.from({ length: size }, (_, j) => `s${i}-q${j}`),
        status: { studied: 0, status: 'novo' },
    }));
}

test('addDaysIso atravessa virada de mês', () => {
    assert.equal(addDaysIso('2026-01-30', 3), '2026-02-02');
});

test('sem data de prova planeja o horizonte pedido', () => {
    const { days, summary } = buildSchedule({ subjectsWithStatus: subjects(2), reviewQueue: {}, todayIso: '2026-01-01', horizonDays: 7 });
    assert.equal(days.length, 7);
    assert.equal(summary.hasExam, false);
});

test('com data de prova vai até o dia da prova, e não abre assunto novo nele', () => {
    const { days } = buildSchedule({ subjectsWithStatus: subjects(50), reviewQueue: {}, todayIso: '2026-01-01', examDateIso: '2026-01-05', dailyCapacity: 10 });
    assert.equal(days.length, 5);
    assert.equal(days[4].examDay, true);
    assert.equal(days[4].newSubjects.length, 0);
});

test('assuntos entram na ordem de prioridade, respeitando a capacidade', () => {
    const { days } = buildSchedule({ subjectsWithStatus: subjects(4), reviewQueue: {}, todayIso: '2026-01-01', dailyCapacity: 20, horizonDays: 5 });
    assert.deepEqual(days[0].newSubjects.map((s) => s.assunto), ['s0', 's1']);
    assert.deepEqual(days[1].newSubjects.map((s) => s.assunto), ['s2', 's3']);
});

test('revisão atrasada conta no dia de hoje e tira espaço de assunto novo', () => {
    const queue = { x: { dueDate: '2025-12-20' } };
    const list = [...subjects(3), { key: 'A > rev', area: 'A', assunto: 'rev', weight: 0.001, questionIds: ['x'], status: { studied: 1, status: 'atrasado' } }];
    const { days } = buildSchedule({ subjectsWithStatus: list, reviewQueue: queue, todayIso: '2026-01-01', dailyCapacity: 20, horizonDays: 3 });
    assert.equal(days[0].reviews, 1);
    // 1 revisão + s0 (10) deixa 9 livres; s1 (10) não cabe inteiro e fica
    // pro dia seguinte — o plano nunca cria um dia acima da meta.
    assert.equal(days[0].newSubjects.length, 1);
    assert.equal(days[0].load, 11);
    assert.equal(days[0].overload, false);
});

test('meta menor que a bateria ainda abre um assunto por dia vazio', () => {
    const { days } = buildSchedule({ subjectsWithStatus: subjects(3), reviewQueue: {}, todayIso: '2026-01-01', dailyCapacity: 5, horizonDays: 3 });
    assert.equal(days[0].newSubjects.length, 1);
});

test('reta final: peso baixo pulado é contado à parte e não deixa o resumo dizer "tudo coberto"', () => {
    const { summary } = buildSchedule({ subjectsWithStatus: subjects(6), reviewQueue: {}, todayIso: '2026-01-01', examDateIso: '2026-01-04', dailyCapacity: 50 });
    assert.equal(summary.subjectsLeft, 0);
    assert.equal(summary.skippedLowWeight, 3);
    assert.equal(summary.allCovered, false);
    assert.ok(summary.weightCovered > 0.5 && summary.weightCovered < 1); // os 3 de maior peso entraram
});

test('assunto aberto gera revisões previstas em +3, +10 e +30', () => {
    const { days } = buildSchedule({ subjectsWithStatus: subjects(1), reviewQueue: {}, todayIso: '2026-01-01', dailyCapacity: 20, horizonDays: 40 });
    assert.equal(days[3].projectedReviews, 10);
    assert.equal(days[10].projectedReviews, 10);
    assert.equal(days[30].projectedReviews, 10);
    assert.equal(days[1].projectedReviews, 0);
});

test('reta final não abre assunto de peso baixo', () => {
    // 1 dia até a prova -> hoje já é reta final; pesos: s0 alto, s1 baixo
    const list = [
        { key: 'A > alto', area: 'A', assunto: 'alto', weight: 0.9, questionIds: ['a1'], status: { studied: 0 } },
        { key: 'A > baixo', area: 'A', assunto: 'baixo', weight: 0.1, questionIds: ['b1'], status: { studied: 0 } },
    ];
    const { days } = buildSchedule({ subjectsWithStatus: list, reviewQueue: {}, todayIso: '2026-01-01', examDateIso: '2026-01-02', dailyCapacity: 50 });
    assert.deepEqual(days[0].newSubjects.map((s) => s.assunto), ['alto']);
});

test('summary diz quando não cabe tudo antes da prova', () => {
    const { summary } = buildSchedule({ subjectsWithStatus: subjects(30), reviewQueue: {}, todayIso: '2026-01-01', examDateIso: '2026-01-03', dailyCapacity: 10 });
    assert.equal(summary.allCovered, false);
    assert.ok(summary.subjectsLeft > 0);
});

test('minimumDailyCapacity acha a menor meta que cobre tudo', () => {
    // prova em 40 dias: sobra tempo antes da reta final pra abrir tudo
    const options = { subjectsWithStatus: subjects(12), reviewQueue: {}, todayIso: '2026-01-01', examDateIso: '2026-02-10' };
    const capacity = minimumDailyCapacity(options);
    assert.ok(capacity !== null);
    assert.equal(buildSchedule({ ...options, dailyCapacity: capacity }).summary.allCovered, true);
    assert.equal(buildSchedule({ ...options, dailyCapacity: capacity - 5 }).summary.allCovered, false);
});

test('nivelamento: revisões previstas nunca estouram a meta diária', () => {
    const { days } = buildSchedule({ subjectsWithStatus: subjects(80), reviewQueue: {}, todayIso: '2026-01-01', dailyCapacity: 20, horizonDays: 90 });
    const maxLoad = Math.max(...days.map((d) => d.load));
    assert.ok(maxLoad <= 20, `carga máxima ${maxLoad} passou da meta 20`);
});

test('minimumDailyCapacity é null sem data de prova', () => {
    assert.equal(minimumDailyCapacity({ subjectsWithStatus: subjects(2), reviewQueue: {}, todayIso: '2026-01-01' }), null);
});
