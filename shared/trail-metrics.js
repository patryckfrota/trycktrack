/**
 * Métricas da Trilha por assunto (fase 2 do redesign, ver
 * project_trilhas_redesign na memória) — nota projetada, pontos fracos,
 * carga de revisão dos próximos dias e retenção estimada. Tudo pura
 * função sobre o que já existe (peso real + status por assunto de
 * trail-subjects.js, retrievability de spaced-repetition.js) — nenhuma
 * métrica nova precisou de um dado novo pra existir, exceto o histórico
 * semanal (snapshot diário guardado pelo chamador, não por aqui).
 */
import { retrievability } from './spaced-repetition.js';

function daysBetweenIsoDates(fromIso, toIso) {
    const from = new Date(fromIso).setHours(0, 0, 0, 0);
    const to = new Date(toIso).setHours(0, 0, 0, 0);
    return (to - from) / 86400000;
}

// Chance de acerto usada pra um assunto NUNCA estudado: a média
// ponderada por questão dos assuntos que a pessoa já estudou, não um
// 50% arbitrário — reflete o nível real dela, não um chute genérico.
// Sem nenhum assunto estudado ainda, 0 (nunca inventar nota que não
// existe).
export function priorAccuracy(subjectsWithStatus) {
    const studied = subjectsWithStatus.filter((s) => s.status.studied > 0);
    if (!studied.length) return 0;
    const correctSum = studied.reduce((acc, s) => acc + s.status.accuracy * s.status.studied, 0);
    const totalStudied = studied.reduce((acc, s) => acc + s.status.studied, 0);
    return totalStudied > 0 ? correctSum / totalStudied : 0;
}

// "Se a prova fosse hoje": Σ peso do assunto × chance de acerto nele,
// dividido pelo peso total (soma 1 quando os pesos já vêm normalizados,
// mas divide de qualquer forma pra ficar correto mesmo com um
// subconjunto). byArea agrega a mesma conta por grande área.
export function projectedScore(subjectsWithStatus) {
    const prior = priorAccuracy(subjectsWithStatus);
    const totalWeight = subjectsWithStatus.reduce((sum, s) => sum + s.weight, 0);
    const byArea = {};
    let weighted = 0;
    for (const s of subjectsWithStatus) {
        const p = s.status.studied > 0 ? s.status.accuracy : prior;
        weighted += s.weight * p;
        byArea[s.area] ||= { weight: 0, weighted: 0 };
        byArea[s.area].weight += s.weight;
        byArea[s.area].weighted += s.weight * p;
    }
    const areas = Object.fromEntries(
        Object.entries(byArea).map(([area, v]) => [area, { weight: v.weight, score: v.weight > 0 ? v.weighted / v.weight : 0 }]),
    );
    return { score: totalWeight > 0 ? weighted / totalWeight : 0, prior, byArea: areas };
}

// Pontos fracos: só entre os JÁ ESTUDADOS (não faz sentido apontar
// "ponto fraco" num assunto que a pessoa nunca viu) — ordenado por
// peso × (1 - acerto), ou seja, "quanto ponto essa lacuna custa na
// prova", não só quem tem o pior acerto isolado.
export function weakSpots(subjectsWithStatus, limit = 5) {
    return subjectsWithStatus
        .filter((s) => s.status.studied > 0)
        .map((s) => ({ ...s, riskScore: Number((s.weight * (1 - s.status.accuracy)).toFixed(4)) }))
        .sort((a, b) => b.riskScore - a.riskScore)
        .slice(0, limit);
}

// Quantas questões (de todo o recorte de assuntos) vencem em cada um
// dos próximos `days` dias, a partir de hoje (dia 0 = hoje, inclui
// atrasadas nesse primeiro dia). reviewQueue já filtrado/relevante ao
// recorte é responsabilidade do chamador (aqui só soma por dueDate).
export function reviewLoadByDay(subjectsWithStatus, reviewQueue, todayIso, days = 7) {
    const buckets = Array.from({ length: days }, (_, i) => {
        const d = new Date(todayIso);
        d.setDate(d.getDate() + i);
        return { date: d.toISOString().slice(0, 10), count: 0 };
    });
    const byDate = new Map(buckets.map((b) => [b.date, b]));
    const allIds = subjectsWithStatus.flatMap((s) => s.questionIds);
    for (const id of allIds) {
        const entry = reviewQueue[id];
        if (!entry) continue;
        // atrasada (dueDate < hoje) conta no balde de hoje — é carga que
        // já existe agora, não "vence daqui a dias negativos".
        const bucketDate = entry.dueDate < todayIso ? todayIso : entry.dueDate;
        const bucket = byDate.get(bucketDate);
        if (bucket) bucket.count += 1;
    }
    return buckets;
}

// Retenção estimada de um assunto: média da curva de esquecimento
// (retrievability, shared/spaced-repetition.js) das questões já
// estudadas dele, na data de hoje. null quando o assunto ainda não foi
// estudado (não "0%" — são coisas diferentes: nunca visto vs. esquecido).
export function subjectRetention(subject, reviewQueue, todayIso) {
    const studiedIds = subject.questionIds.filter((id) => reviewQueue[id]);
    if (!studiedIds.length) return null;
    const sum = studiedIds.reduce((acc, id) => {
        const entry = reviewQueue[id];
        const elapsed = Math.max(0, daysBetweenIsoDates(entry.lastReviewedAt || todayIso, todayIso));
        return acc + retrievability(elapsed, entry.stability || 1);
    }, 0);
    return sum / studiedIds.length;
}
