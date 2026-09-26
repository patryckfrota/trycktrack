/**
 * Ordena os temas de uma Trilha por prioridade de estudo — usado tanto
 * pelo cliente (index.html, via ponte em window.calculatePathPriority)
 * quanto pelo backend (backend/src/pathPriority.js reexporta este
 * arquivo). Antes desta extração as duas cópias divergiam: o cliente não
 * filtrava temas concluídos e arredondava com Math.round(x*100)/100
 * onde o backend usava toFixed(2) — o mesmo cálculo, escrito duas vezes,
 * já tinha começado a se afastar.
 *
 * Score de prioridade = incidência prevista (peso A) × urgência por
 * desempenho no diagnóstico/recalibragem (peso B). Acerto > 80% posterga
 * o tema; desempenho baixo o traz para o início.
 */
// Extraída pra fora de calculatePathPriority pra shared/weighted-
// sampling.js (R-3, Simulado ponderado por incidência do QuestHub)
// poder reaproveitar exatamente o mesmo critério de urgência — em vez
// de reimplementar as mesmas faixas com o risco de uma das duas cópias
// divergir da outra, do jeito que já aconteceu antes nesta base de
// código (ver comentário no topo do arquivo).
// `goal`: meta de acerto ajustável pelo aluno (fração 0-1, padrão
// 0.80 — mesma meta-padrão da FluidMed, ver shared/subject-weights.js
// e a discussão do redesign de Trilhas). As faixas abaixo da meta
// escalam junto (goal-0.20, goal-0.40) em vez de ficarem fixas em
// 60%/40% — quem pede uma meta mais alta é puxado de volta ao tema
// mais cedo, não só quem cai abaixo de 80% fixo.
export function urgencyMultiplierForAccuracy(accuracy, goal = 0.80) {
    return accuracy === null || accuracy === undefined ? 1.10
        : accuracy > goal ? 0.62
        : accuracy >= goal - 0.20 ? 1.12
        : accuracy >= goal - 0.40 ? 1.48
        : 1.84;
}

export function calculatePathPriority({ topics, results = [], completedThemeIds = [], goal = 0.80 }) {
    const aggregate = results.reduce((acc, result) => {
        const key = result.themeId || result.area;
        // correct === null: discursiva ou anulada, sem pontuação.
        if (!key || result.correct === null) return acc;
        acc[key] ||= { correct: 0, total: 0 };
        acc[key].total += 1;
        acc[key].correct += result.correct ? 1 : 0;
        return acc;
    }, {});

    return topics
        .filter((topic) => !completedThemeIds.includes(topic.id))
        .map((topic) => {
            const performance = aggregate[topic.id] || aggregate[topic.area];
            const accuracy = performance ? performance.correct / performance.total : null;
            const urgency = urgencyMultiplierForAccuracy(accuracy, goal);
            const incidence = topic.incidence ?? topic.incidenceEnamed ?? 0;
            return {
                ...topic,
                accuracy,
                baseWeight: incidence,
                urgencyMultiplier: urgency,
                priorityScore: Number((incidence * urgency).toFixed(2))
            };
        })
        .sort((a, b) => b.priorityScore - a.priorityScore);
}
