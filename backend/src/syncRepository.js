import { PrismaClient } from '@prisma/client';
import { mergeReviewEntry } from '../../shared/sync-merge.js';

// Formato de entrada em memória/na API: { stability, difficulty,
// dueDate, lastReviewedAt, lastRating } — dueDate/lastReviewedAt como
// string 'YYYY-MM-DD' (mesmo formato do localStorage no cliente).
// O Prisma guarda como DateTime; hydrate/dehydrate convertem nas bordas.
function hydrate(row) {
    if (!row) return null;
    return {
        stability: row.stability,
        difficulty: row.difficulty,
        dueDate: row.dueDate instanceof Date ? row.dueDate.toISOString().slice(0, 10) : row.dueDate,
        lastReviewedAt: row.lastReviewedAt instanceof Date ? row.lastReviewedAt.toISOString().slice(0, 10) : row.lastReviewedAt,
        lastRating: row.lastRating
    };
}

export class MemorySyncRepository {
    constructor() { this.rows = new Map(); this.responses = []; } // rows key: `${userId}:${questionId}`

    async getReviewQueue(userId) {
        const queue = {};
        this.rows.forEach((entry, key) => {
            const [rowUserId, questionId] = key.split(':');
            if (rowUserId === userId) queue[questionId] = hydrate(entry);
        });
        return queue;
    }

    // Recebe { [questionId]: entrada }, faz merge "mantém a mais
    // recente" por questão contra o que já está salvo (mesmo critério
    // do cliente, via mergeReviewEntry — não uma cópia da regra) e
    // devolve a fila inteira já mesclada.
    async pushReviewEntries(userId, entries) {
        Object.entries(entries || {}).forEach(([questionId, incoming]) => {
            const key = `${userId}:${questionId}`;
            const existing = this.rows.get(key);
            const winner = mergeReviewEntry(existing, incoming);
            if (winner) this.rows.set(key, winner);
        });
        return this.getReviewQueue(userId);
    }

    async pushResponses(userId, responses) {
        (responses || []).forEach(response => this.responses.push({ userId, ...response }));
    }
}

export class PrismaSyncRepository {
    constructor(client = new PrismaClient()) { this.client = client; }

    async getReviewQueue(userId) {
        const rows = await this.client.userQuestionReview.findMany({ where: { userId } });
        const queue = {};
        rows.forEach(row => { queue[row.questionId] = hydrate(row); });
        return queue;
    }

    async pushReviewEntries(userId, entries) {
        const ids = Object.keys(entries || {});
        if (!ids.length) return this.getReviewQueue(userId);
        const existingRows = await this.client.userQuestionReview.findMany({
            where: { userId, questionId: { in: ids } }
        });
        const existingByQuestionId = new Map(existingRows.map(row => [row.questionId, hydrate(row)]));

        const writes = ids.map(questionId => {
            const incoming = entries[questionId];
            const winner = mergeReviewEntry(existingByQuestionId.get(questionId), incoming);
            if (!winner) return null;
            const data = {
                stability: winner.stability,
                difficulty: winner.difficulty,
                dueDate: new Date(winner.dueDate),
                lastReviewedAt: new Date(winner.lastReviewedAt),
                lastRating: winner.lastRating
            };
            return this.client.userQuestionReview.upsert({
                where: { userId_questionId: { userId, questionId } },
                create: { userId, questionId, ...data },
                update: data
            });
        }).filter(Boolean);

        if (writes.length) await this.client.$transaction(writes);
        return this.getReviewQueue(userId);
    }

    async pushResponses(userId, responses) {
        if (!responses?.length) return;
        await this.client.questionResponse.createMany({
            data: responses.map(response => ({
                userId,
                questionId: response.questionId,
                chosen: response.chosen ?? null,
                correct: typeof response.correct === 'boolean' ? response.correct : null,
                elapsedMs: Number.isFinite(response.elapsedMs) ? response.elapsedMs : null,
                answeredAt: response.answeredAt ? new Date(response.answeredAt) : new Date()
            }))
        });
    }
}

let sharedMemoryRepository = null;
export function createSyncRepository() {
    if (process.env.DATABASE_URL) return new PrismaSyncRepository();
    // Uma instância compartilhada em memória (não uma nova a cada
    // chamada) — sem isso, cada requisição começaria do zero e nenhum
    // teste que fizer duas chamadas em sequência (push depois pull)
    // veria o efeito da primeira.
    if (!sharedMemoryRepository) sharedMemoryRepository = new MemorySyncRepository();
    return sharedMemoryRepository;
}

// Só pra testes: força uma instância nova e isolada, do jeito que
// setOsceStationsForTests já faz pra OSCE.
export function resetSyncRepositoryForTests() {
    sharedMemoryRepository = new MemorySyncRepository();
    return sharedMemoryRepository;
}
