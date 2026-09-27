/**
 * Blocos de estudo (R-10). Em vez de abrir assuntos soltos com 2–3
 * questões cada (o que acontecia porque muitos assuntos têm poucas
 * questões no banco), o conteúdo novo é agrupado em BLOCOS coerentes: o
 * candidato de maior prioridade + outros da MESMA área até formar uma
 * bateria de tamanho útil.
 *
 * Base: primeira exposição a um tema em bloco coerente, e depois revisão
 * espaçada e intercalada (Dunlosky et al., 2013; Rohrer & Taylor, 2007).
 * Juntar assuntos da mesma área também é onde intercalar mais ajuda —
 * temas parecidos, que a prova obriga a diferenciar.
 *
 * Continuação: um assunto contribui com no máximo `targetSize` questões
 * por bloco; o que sobra volta pra fila com prioridade proporcional ao
 * que ainda falta ver. Com banco grande (provas irmãs), temas de peso
 * alto recebem vários blocos ao longo do plano, em vez de só o primeiro.
 */
import { urgencyMultiplierForAccuracy } from './trail-priority.js';

// Todo assunto com questão ainda não vista na trilha é candidato. Taxa =
// peso na banca × urgência pelo acerto (nunca estudado = urgência neutra);
// score = taxa × fração ainda não vista. Um tema pesado em que se erra
// continua recebendo questões novas antes de abrir um tema raro.
export function studyCandidates(subjectsWithStatus, reviewQueue, goal = 0.8) {
    return subjectsWithStatus
        .map((s) => {
            const unseen = s.questionIds.filter((id) => !reviewQueue[id]);
            if (!unseen.length) return null;
            const started = s.status.studied > 0;
            const rate = s.weight * urgencyMultiplierForAccuracy(started ? s.status.accuracy : null, goal);
            return {
                key: s.key, area: s.area, assunto: s.assunto, weight: s.weight, started,
                total: s.questionIds.length, questionIds: unseen, rate,
                score: rate * (unseen.length / s.questionIds.length),
            };
        })
        .filter(Boolean)
        .sort((a, b) => b.score - a.score);
}

// candidates: saída de studyCandidates (ou objetos com key, area,
// assunto, weight, questionIds; `rate`/`total`/`score` opcionais). Devolve
// blocos em ordem de prioridade; cada assunto do bloco diz quantas
// questões novas entram e se é continuação de um já iniciado.
export function buildStudyBlocks(candidates, { targetSize = 12, maxSize = 20 } = {}) {
    const queue = candidates
        .filter((c) => c.questionIds.length > 0)
        .map((c) => {
            const total = c.total ?? c.questionIds.length;
            const rate = c.rate ?? c.weight;
            return { ...c, total, rate, left: c.questionIds.length, score: c.score ?? rate * (c.questionIds.length / total) };
        });
    const byScore = (a, b) => b.score - a.score;
    queue.sort(byScore);
    const blocks = [];
    while (queue.length) {
        const head = queue.shift();
        const members = [head];
        let size = Math.min(head.left, targetSize);
        for (let i = 0; i < queue.length && size < targetSize;) {
            const c = queue[i];
            const add = Math.min(c.left, targetSize);
            if (c.area === head.area && size + add <= maxSize) {
                members.push(c);
                size += add;
                queue.splice(i, 1);
            } else {
                i += 1;
            }
        }
        const subjects = members.map((m) => {
            const questions = Math.min(m.left, targetSize);
            const continuation = m.started || m.left < m.total;
            m.left -= questions;
            return { key: m.key, assunto: m.assunto, weight: m.weight, questions, continuation };
        });
        blocks.push({
            area: head.area,
            subjects,
            questions: size,
            weight: subjects.reduce((sum, s) => sum + s.weight, 0),
            id: subjects.map((s) => s.key).join('|'),
        });
        // Quem ainda tem questão não vista volta pra fila, com prioridade
        // proporcional ao que falta.
        for (const m of members) {
            if (m.left > 0) {
                m.score = m.rate * (m.left / m.total);
                queue.push(m);
            }
        }
        queue.sort(byScore);
    }
    return blocks;
}
