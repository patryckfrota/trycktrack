/**
 * Trilhas por assunto (eixo "inteligência contínua", ver
 * project_trilhas_redesign na memória do projeto) — junta o peso real
 * de cada assunto numa banca (shared/subject-weights.js) com o
 * agendamento por questão que já existe (shared/spaced-repetition.js,
 * consultado via a fila de revisão do dispositivo). Não inventa um
 * novo sistema de intervalo/tamanho de bateria: a data de vencimento
 * de cada questão já é calculada pelo motor FSRS-inspirado existente,
 * isto só agrega esse estado por assunto e ordena os assuntos ainda
 * não estudados pela mesma prioridade (peso × urgência) que
 * trail-priority.js já usa pra Trilhas por área.
 */
import { urgencyMultiplierForAccuracy } from './trail-priority.js';
import { subjectKey } from './subject-weights.js';

// questions: as questões PRATICÁVEIS da trilha — as provas reais da banca
// e, com o tempo, provas irmãs marcadas pra ela (R-10).
// weights: Map de computeSubjectWeights calculado SÓ com as provas reais
// (o peso é da banca; prova irmã só aumenta o que dá pra praticar).
// Assunto que só existe em prova irmã não entra: não tem peso na banca.
// Devolve [{ key, area, assunto, weight, questionIds }].
export function buildSubjectCatalog(questions, weights) {
    const idsByKey = new Map();
    for (const q of questions) {
        const key = subjectKey(q);
        if (!weights.has(key)) continue;
        if (!idsByKey.has(key)) idsByKey.set(key, []);
        idsByKey.get(key).push(q.id);
    }
    return [...weights.values()].map((entry) => ({
        key: entry.key,
        area: entry.area,
        assunto: entry.assunto,
        weight: entry.weight,
        questionIds: idsByKey.get(entry.key) || [],
    }));
}

// reviewQueue: { [questionId]: { dueDate, lastRating, lastReviewedAt, ... } }
// (mesmo formato de shared/spaced-repetition.js / getReviewQueue no app).
// todayIso: 'YYYY-MM-DD'. Um assunto "não iniciado" não tem nenhuma
// questão na fila ainda — status separado de "em dia" de propósito
// (não é a mesma coisa que já estar dominado).
export function subjectStatus(subject, reviewQueue, todayIso) {
    const studiedIds = subject.questionIds.filter((id) => reviewQueue[id]);
    if (studiedIds.length === 0) {
        return { status: 'novo', overdue: 0, dueToday: 0, studied: 0, total: subject.questionIds.length };
    }
    let overdue = 0;
    let dueToday = 0;
    let correct = 0;
    for (const id of studiedIds) {
        const entry = reviewQueue[id];
        if (entry.dueDate < todayIso) overdue += 1;
        else if (entry.dueDate === todayIso) dueToday += 1;
        if (entry.lastResult === 'correct') correct += 1;
    }
    const accuracy = correct / studiedIds.length;
    const status = overdue > 0 ? 'atrasado' : dueToday > 0 ? 'faça agora' : 'em dia';
    return { status, overdue, dueToday, studied: studiedIds.length, total: subject.questionIds.length, accuracy };
}

// Ordena assuntos AINDA NÃO ESTUDADOS (studied === 0) pela mesma lógica
// de prioridade das Trilhas por área: peso na banca × urgência. Sem
// resultado nenhum ainda, urgência é sempre a neutra (1.10) — o
// desempate fica só pelo peso.
export function prioritizeNewSubjects(subjectsWithStatus, goal = 0.80) {
    return subjectsWithStatus
        .filter((s) => s.status.studied === 0)
        .map((s) => ({ ...s, priorityScore: Number((s.weight * urgencyMultiplierForAccuracy(null, goal)).toFixed(4)) }))
        .sort((a, b) => b.priorityScore - a.priorityScore);
}

// Drill-down por tópico (fase 4, item 1) — dentro de um assunto (ex.
// "Cardiologia > HAS"), quebra por `topico` (o nível mais fino que o
// banco já classifica, ver taxonomia/ROTEIRO-IMPORTACAO.md) mostrando
// onde exatamente dentro do assunto a pessoa mais erra. questionsById:
// Map id -> questão completa (só usa `.topico` daqui). Questão sem
// `topico` classificado cai em "Outros" — nunca escondida.
export function subjectTopicBreakdown(subject, questionsById, reviewQueue, todayIso) {
    const byTopico = new Map();
    for (const id of subject.questionIds) {
        const topico = (questionsById.get(id)?.topico || 'Outros').trim() || 'Outros';
        if (!byTopico.has(topico)) byTopico.set(topico, { topico, questionIds: [] });
        byTopico.get(topico).questionIds.push(id);
    }
    return [...byTopico.values()]
        .map((entry) => ({
            topico: entry.topico,
            ...subjectStatus({ questionIds: entry.questionIds }, reviewQueue, todayIso),
        }))
        .sort((a, b) => b.total - a.total);
}

// Cobertura ponderada: soma do peso dos assuntos já iniciados (pelo
// menos 1 questão estudada) sobre o peso total — "quanto da prova,
// pelo peso real de cada assunto, você já começou a estudar", não uma
// contagem simples de assuntos (um assunto de 6% conta mais que um de
// 0.5%).
export function weightedCoverage(subjectsWithStatus) {
    const total = subjectsWithStatus.reduce((sum, s) => sum + s.weight, 0);
    if (total <= 0) return 0;
    const covered = subjectsWithStatus
        .filter((s) => s.status.studied > 0)
        .reduce((sum, s) => sum + s.weight, 0);
    return covered / total;
}
