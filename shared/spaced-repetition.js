/**
 * Revisão espaçada do QuestHub (R-1) — substitui a escada Leitner fixa
 * (1 → 3 → 7 → 21 dias, sempre os mesmos 4 degraus pra qualquer
 * questão) por um modelo de memória por questão: estabilidade (S, em
 * dias — quanto tempo até a retenção cair pra ~90%) e dificuldade (D,
 * 1–10), no mesmo espírito do FSRS (Free Spaced Repetition Scheduler,
 * open-source, usado pelo Anki).
 *
 * IMPORTANTE — isto NÃO é uma port fiel dos pesos treinados oficiais
 * do FSRS: aquele algoritmo usa ~19 constantes calibradas por
 * gradiente contra milhões de revisões reais do Anki, e eu não tenho
 * como conferir esses números de memória com confiança suficiente
 * pra apresentá-los como "os oficiais" sem risco de errar um dígito e
 * quebrar o agendamento de estudo de alguém em silêncio. O que segue é
 * o MESMO modelo conceitual (dificuldade + estabilidade + curva de
 * esquecimento em lei de potência, "recall surpreendente reforça mais
 * que recall esperado") com constantes derivadas e justificadas aqui,
 * não emprestadas de uma fonte que eu não consigo verificar agora.
 *
 * Avaliação por resposta (1–4, ver RATING abaixo) em vez de só certo/
 * errado — permite diferenciar "acertei mas não tinha certeza" de
 * "acertei na hora", que carregam informação bem diferente sobre o
 * quanto a pessoa já domina aquele conteúdo.
 */

export const RATING = { AGAIN: 1, HARD: 2, GOOD: 3, EASY: 4 };

const INITIAL_STABILITY_DAYS = { 1: 0.4, 2: 1.2, 3: 3.0, 4: 8.0 };
const INITIAL_DIFFICULTY = { 1: 8.5, 2: 6.5, 3: 5.0, 4: 3.0 };
// Base multiplicativa por avaliação (Difícil < Bom < Fácil, todas >1 —
// nenhuma resposta certa encolhe a estabilidade) × um fator de
// "surpresa" que só AUMENTA em cima dessa base (nunca inverte a ordem
// entre avaliações, seja qual for R ou D — ver nextReviewState).
const GROWTH_BASE = { 2: 1.05, 3: 1.15, 4: 1.35 };
const SURPRISE_BOOST = 1.5;

function clampRating(rating) {
    const r = Math.round(Number(rating));
    return Math.min(4, Math.max(1, Number.isFinite(r) ? r : RATING.GOOD));
}

function clampDifficulty(value) {
    return Math.min(10, Math.max(1, value));
}

// Curva de esquecimento em lei de potência (mesma família do FSRS) —
// FACTOR=1/9 é escolhido de propósito pra R(S,S)=0.9: no dia em que a
// questão está marcada pra revisar (elapsedDays === stability), a
// retenção estimada é exatamente 90%, o que torna "estabilidade" algo
// diretamente legível como "dias até 90% de retenção".
export function retrievability(elapsedDays, stability) {
    if (!(stability > 0)) return 0;
    const t = Math.max(0, elapsedDays);
    return Math.pow(1 + t / (9 * stability), -1);
}

export function initReviewState(rating) {
    const r = clampRating(rating);
    return { stability: INITIAL_STABILITY_DAYS[r], difficulty: INITIAL_DIFFICULTY[r] };
}

// elapsedDays: dias corridos desde a última revisão até agora (pode
// ser negativo/zero se respondida no mesmo dia — trata como 0).
export function nextReviewState({ stability, difficulty }, rating, elapsedDays) {
    const r = clampRating(rating);
    const R = retrievability(elapsedDays, stability);
    if (r === RATING.AGAIN) {
        // Esquecer uma questão que a curva ainda dava como bem
        // retida (R alto) é um sinal mais forte de que a dificuldade
        // estava subestimada do que esquecer uma que já estava quase
        // vencendo — por isso o encolhimento de estabilidade cresce
        // com R (1 - 0.3*R): esquecer cedo (R alto) encolhe mais.
        return {
            stability: Math.max(0.1, stability * 0.4 * (1 - 0.3 * R)),
            difficulty: clampDifficulty(difficulty + 1)
        };
    }
    // growth = base da avaliação (sempre >1, nenhuma resposta certa
    // encolhe a estabilidade) × reforço de surpresa (sempre ≥1 — some
    // por completo quando R≈1, ou seja, quando a pessoa acabou de ver
    // a questão e não houve surpresa nenhuma em lembrar). O reforço é
    // maior quanto mais baixo R estava (revisou tarde, quase tinha
    // esquecido, e ainda assim acertou) e some conforme a dificuldade
    // sobe ((11-D)/10) — sendo multiplicativo sobre uma base já
    // ordenada, a ordem Difícil < Bom < Fácil nunca se inverte,
    // qualquer que seja R ou D.
    const surprise = 1 + SURPRISE_BOOST * (1 - R) * ((11 - difficulty) / 10);
    const growth = GROWTH_BASE[r] * surprise;
    return {
        stability: stability * growth,
        difficulty: clampDifficulty(difficulty - (r - RATING.GOOD) * 0.6)
    };
}

// 9*S*(1/retention - 1) é a inversa de retrievability(t,S) resolvida
// pra t — o intervalo (em dias) até a retenção estimada cair pra
// `desiredRetention`. Em 0.9 (padrão) isso dá exatamente `stability`,
// por construção (ver comentário de retrievability).
export function intervalDaysForStability(stability, desiredRetention = 0.9) {
    const days = 9 * stability * (1 / desiredRetention - 1);
    return Math.max(1, Math.round(days));
}

// Migra uma entrada do formato antigo (escada Leitner: {step,
// dueDate, lastResult}) pra {stability,difficulty} — preserva o
// dueDate já agendado (não reagenda ninguém de surpresa só por causa
// da troca de algoritmo) e estima um estado de memória plausível a
// partir do degrau em que a questão estava.
const LEGACY_STEP_STABILITY_DAYS = [1, 3, 7, 21];
export function migrateLegacyReviewEntry(entry) {
    if (!entry || typeof entry.step !== 'number') return entry; // já é formato novo, ou vazio
    const step = Math.min(Math.max(entry.step, 0), LEGACY_STEP_STABILITY_DAYS.length - 1);
    return {
        stability: LEGACY_STEP_STABILITY_DAYS[step],
        difficulty: entry.lastResult === 'wrong' ? 7 : 5,
        dueDate: entry.dueDate,
        lastResult: entry.lastResult,
        migratedFromStep: step
    };
}
