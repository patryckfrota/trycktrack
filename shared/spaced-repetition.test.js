import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
    RATING, retrievability, initReviewState, nextReviewState,
    intervalDaysForStability, migrateLegacyReviewEntry
} from './spaced-repetition.js';

test('retrievability: sem tempo passado, retenção é 100%', () => {
    assert.equal(retrievability(0, 5), 1);
});

test('retrievability: no dia da estabilidade, retenção é ~90% (por construção)', () => {
    assert.ok(Math.abs(retrievability(5, 5) - 0.9) < 1e-9);
});

test('retrievability: cai conforme o tempo passa, nunca sobe', () => {
    const r1 = retrievability(1, 10);
    const r5 = retrievability(5, 10);
    const r20 = retrievability(20, 10);
    assert.ok(r1 > r5 && r5 > r20);
});

test('initReviewState: Fácil começa com estabilidade maior e dificuldade menor que Errei', () => {
    const errei = initReviewState(RATING.AGAIN);
    const facil = initReviewState(RATING.EASY);
    assert.ok(facil.stability > errei.stability);
    assert.ok(facil.difficulty < errei.difficulty);
});

test('nextReviewState: "Errei" sempre encolhe a estabilidade e nunca deixa chegar a zero', () => {
    const state = { stability: 10, difficulty: 5 };
    const depois = nextReviewState(state, RATING.AGAIN, 10);
    assert.ok(depois.stability < state.stability);
    assert.ok(depois.stability >= 0.1);
    assert.ok(depois.difficulty > state.difficulty);
});

test('nextReviewState: acertar de surpresa (revisou tarde, R baixo) reforça mais que acertar cedo (R alto)', () => {
    const state = { stability: 5, difficulty: 5 };
    const acertoTardio = nextReviewState(state, RATING.GOOD, 30);   // R baixo — quase tinha esquecido
    const acertoCedo = nextReviewState(state, RATING.GOOD, 1);      // R alto — respondeu recém-visto
    assert.ok(acertoTardio.stability > acertoCedo.stability, 'acerto surpreendente deveria reforçar mais a estabilidade');
});

test('nextReviewState: "Fácil" cresce mais que "Bom", que cresce mais que "Difícil", no mesmo contexto', () => {
    const state = { stability: 5, difficulty: 5 };
    const dificil = nextReviewState(state, RATING.HARD, 5);
    const bom = nextReviewState(state, RATING.GOOD, 5);
    const facil = nextReviewState(state, RATING.EASY, 5);
    assert.ok(facil.stability > bom.stability);
    assert.ok(bom.stability > dificil.stability);
});

test('nextReviewState: dificuldade nunca sai de [1,10] mesmo com muitos "Errei"/"Fácil" seguidos', () => {
    let state = { stability: 3, difficulty: 5 };
    for (let i = 0; i < 20; i++) state = nextReviewState(state, RATING.AGAIN, 1);
    assert.equal(state.difficulty, 10);
    state = { stability: 3, difficulty: 5 };
    for (let i = 0; i < 20; i++) state = nextReviewState(state, RATING.EASY, 5);
    assert.equal(state.difficulty, 1);
});

test('intervalDaysForStability: em 90% de retenção desejada, o intervalo é a própria estabilidade (arredondada)', () => {
    assert.equal(intervalDaysForStability(7, 0.9), 7);
    assert.equal(intervalDaysForStability(0.3, 0.9), 1); // nunca menos de 1 dia
});

test('intervalDaysForStability: pedir retenção mais alta encurta o intervalo', () => {
    const intervalo90 = intervalDaysForStability(20, 0.9);
    const intervalo95 = intervalDaysForStability(20, 0.95);
    assert.ok(intervalo95 < intervalo90);
});

test('migrateLegacyReviewEntry: converte {step,dueDate,lastResult} preservando o dueDate já agendado', () => {
    const legado = { step: 2, dueDate: '2026-10-01', lastResult: 'correct' };
    const migrado = migrateLegacyReviewEntry(legado);
    assert.equal(migrado.dueDate, '2026-10-01'); // não reagenda ninguém de surpresa
    assert.equal(migrado.stability, 7); // degrau 2 -> 7 dias (mesma escada antiga: 1,3,7,21)
    assert.ok(migrado.difficulty < 7); // ultimo resultado foi acerto -> dificuldade não penalizada
});

test('migrateLegacyReviewEntry: entrada já no formato novo passa direto, sem mexer', () => {
    const nova = { stability: 4.2, difficulty: 6, dueDate: '2026-10-01' };
    assert.deepEqual(migrateLegacyReviewEntry(nova), nova);
});
