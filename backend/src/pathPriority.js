/**
 * Ordena somente temas ainda não concluídos. Incidência é o peso A; o
 * desempenho do diagnóstico/recalibragem é o peso B de urgência.
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
