import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
    daysUntilExam, remainingWeight, requiredPacePerDay, actualPacePerDay,
    paceStatus, isFinalStretch, isLowWeightForFinalStretch,
} from './trail-pace.js';

test('daysUntilExam conta dias corridos, arredondado', () => {
    assert.equal(daysUntilExam('2026-02-01', '2026-01-01'), 31);
    assert.equal(daysUntilExam(null, '2026-01-01'), null);
});

test('remainingWeight soma só assuntos com studied === 0', () => {
    const subjects = [
        { weight: 0.3, status: { studied: 0 } },
        { weight: 0.2, status: { studied: 5 } },
        { weight: 0.1, status: { studied: 0 } },
    ];
    assert.ok(Math.abs(remainingWeight(subjects) - 0.4) < 1e-9);
});

test('requiredPacePerDay: null sem prazo ou com prazo já vencido', () => {
    assert.equal(requiredPacePerDay(0.5, null), null);
    assert.equal(requiredPacePerDay(0.5, 0), null);
    assert.equal(requiredPacePerDay(0.5, -3), null);
});

test('requiredPacePerDay divide o peso restante pelos dias', () => {
    assert.ok(Math.abs(requiredPacePerDay(0.4, 20) - 0.02) < 1e-9);
});

test('actualPacePerDay é null com menos de 2 pontos de histórico', () => {
    assert.equal(actualPacePerDay([]), null);
    assert.equal(actualPacePerDay([{ date: '2026-01-01', coverage: 0.1 }]), null);
});

test('actualPacePerDay calcula a diferença de cobertura por dia', () => {
    const history = [
        { date: '2026-01-01', coverage: 0.10 },
        { date: '2026-01-08', coverage: 0.24 },
    ];
    const pace = actualPacePerDay(history);
    assert.ok(Math.abs(pace - 0.02) < 1e-9); // 0.14 de ganho em 7 dias
});

test('paceStatus: sem data de prova', () => {
    assert.equal(paceStatus(null, 0.02).status, 'sem-data');
});

test('paceStatus: cobertura já completa', () => {
    assert.equal(paceStatus(0, 0.02).status, 'concluido');
    assert.equal(paceStatus(-0.01, 0.02).status, 'concluido');
});

test('paceStatus: sem histórico suficiente pra medir o ritmo real', () => {
    assert.equal(paceStatus(0.02, null).status, 'sem-historico');
});

test('paceStatus: adiantado, no ritmo e atrasado pelas faixas de 5%/15%', () => {
    assert.equal(paceStatus(0.02, 0.021).status, 'adiantado'); // 105%
    assert.equal(paceStatus(0.02, 0.019).status, 'no-ritmo'); // 95%
    assert.equal(paceStatus(0.02, 0.010).status, 'atrasado'); // 50%
});

test('isFinalStretch: dentro do limiar de dias', () => {
    assert.equal(isFinalStretch(10, 14), true);
    assert.equal(isFinalStretch(14, 14), true);
    assert.equal(isFinalStretch(15, 14), false);
    assert.equal(isFinalStretch(null, 14), false);
    assert.equal(isFinalStretch(-1, 14), false);
});

test('isLowWeightForFinalStretch compara com a média dos pesos do recorte', () => {
    const subjects = [{ weight: 0.1 }, { weight: 0.2 }, { weight: 0.3 }]; // média 0.2
    assert.equal(isLowWeightForFinalStretch({ weight: 0.1 }, subjects), true);
    assert.equal(isLowWeightForFinalStretch({ weight: 0.3 }, subjects), false);
});
