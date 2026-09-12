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
export function calculatePathPriority({ topics, results = [], completedThemeIds = [] }) {
    const aggregate = results.reduce((acc, result) => {
        const key = result.themeId || result.area;
        if (!key) return acc;
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
            const urgency = accuracy === null ? 1.10
                : accuracy > 0.80 ? 0.62
                : accuracy >= 0.60 ? 1.12
                : accuracy >= 0.40 ? 1.48
                : 1.84;
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
