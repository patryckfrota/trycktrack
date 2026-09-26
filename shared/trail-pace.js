/**
 * Ritmo até a prova (fase 3 do redesign de Trilhas, ver
 * project_trilhas_redesign na memória) — quantos assuntos ainda faltam,
 * quanto tempo resta e se o ritmo real bate com o necessário. Tudo pura
 * função sobre o que já existe: peso por assunto (subject-weights.js),
 * status por assunto (trail-subjects.js) e o histórico diário de
 * cobertura que a trilha já grava (recordTrailHistory em app-app.js).
 */

function daysBetweenIsoDates(fromIso, toIso) {
    const from = new Date(fromIso).setHours(0, 0, 0, 0);
    const to = new Date(toIso).setHours(0, 0, 0, 0);
    return Math.round((to - from) / 86400000);
}

export function daysUntilExam(examDateIso, todayIso) {
    if (!examDateIso) return null;
    return daysBetweenIsoDates(todayIso, examDateIso);
}

// Peso que ainda não foi nem começado (status "novo") — o que falta
// abrir, não o que falta dominar (um assunto "atrasado" já foi aberto,
// só precisa de revisão, não conta como pendência de cobertura aqui).
export function remainingWeight(subjectsWithStatus) {
    return subjectsWithStatus
        .filter((s) => s.status.studied === 0)
        .reduce((sum, s) => sum + s.weight, 0);
}

// Ritmo necessário: quanto de peso (0-1) precisa abrir por dia pra
// zerar o `remainingWeight` até a prova. null sem data de prova ou com
// a prova já passada/hoje (não faz sentido "ritmo pros próximos 0 dias").
export function requiredPacePerDay(remaining, daysLeft) {
    if (daysLeft === null || daysLeft <= 0) return null;
    return remaining / daysLeft;
}

// Ritmo real: quanto de peso a cobertura avançou por dia, na média dos
// últimos `windowDays` dias de histórico (track.history, um ponto por
// dia). Precisa de pelo menos 2 pontos pra medir uma diferença — com
// menos que isso, null (ainda não dá pra saber o ritmo real).
export function actualPacePerDay(history, windowDays = 7) {
    if (!Array.isArray(history) || history.length < 2) return null;
    const window = history.slice(-Math.min(windowDays + 1, history.length));
    const first = window[0];
    const last = window[window.length - 1];
    const elapsedDays = daysBetweenIsoDates(first.date, last.date);
    if (elapsedDays <= 0) return null;
    return (last.coverage - first.coverage) / elapsedDays;
}

// Compara ritmo real com o necessário. Sem `required` (sem data de
// prova) ou sem `actual` (histórico curto demais) devolve status
// 'sem-dado' — nunca finge uma comparação que não pode fazer.
export function paceStatus(required, actual) {
    if (required === null) return { status: 'sem-data' };
    if (required <= 0) return { status: 'concluido' };
    if (actual === null) return { status: 'sem-historico', required };
    const ratio = actual / required;
    const status = ratio >= 1.05 ? 'adiantado' : ratio >= 0.85 ? 'no-ritmo' : 'atrasado';
    return { status, required, actual, ratio };
}

// Reta final: dentro de `thresholdDays` da prova. Nesse modo a trilha
// para de puxar assunto novo de peso baixo (ver isLowWeightForFinalStretch)
// e foca em revisão do que já foi visto, principalmente do que pesa mais.
export function isFinalStretch(daysLeft, thresholdDays = 14) {
    return daysLeft !== null && daysLeft >= 0 && daysLeft <= thresholdDays;
}

// Limiar de peso abaixo do qual um assunto NOVO deixa de valer a pena
// abrir na reta final — a média dos pesos, então "abaixo da média" pra
// aquela banca especificamente, não um número fixo que não se adapta a
// quantos assuntos ela tem.
export function isLowWeightForFinalStretch(subject, subjectsWithStatus) {
    const total = subjectsWithStatus.reduce((sum, s) => sum + s.weight, 0);
    const mean = subjectsWithStatus.length > 0 ? total / subjectsWithStatus.length : 0;
    return subject.weight < mean;
}
