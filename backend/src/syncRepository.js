import { getPrismaClient } from './prismaClient.js';
import { mergeReviewEntry, mergeTrailSettings } from '../../shared/sync-merge.js';

// Mesmo formato do blob no cliente ({ goal, examDate, history,
// updatedAt }, ver UserTrailSettings no schema) — dueDate/examDate como
// string 'YYYY-MM-DD', updatedAt como ISO completo (é o que decide o
// merge, precisa da resolução de milissegundo).
function hydrateTrailSettings(row) {
    if (!row) return null;
    return {
        goal: row.goal ?? null,
        examDate: row.examDate instanceof Date ? row.examDate.toISOString().slice(0, 10) : row.examDate,
        dailyGoal: row.dailyGoal ?? null,
        startDate: row.startDate instanceof Date ? row.startDate.toISOString().slice(0, 10) : (row.startDate ?? null),
        history: row.history ?? null,
        updatedAt: row.updatedAt instanceof Date ? row.updatedAt.toISOString() : row.updatedAt,
    };
}

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
    constructor() { this.rows = new Map(); this.responses = []; this.trailSettings = new Map(); } // rows/trailSettings key: `${userId}:${questionId ou trailId}`

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

    async getTrailSettings(userId, trailId) {
        return this.trailSettings.get(`${userId}:${trailId}`) || null;
    }

    async pushTrailSettings(userId, trailId, incoming) {
        const key = `${userId}:${trailId}`;
        const winner = mergeTrailSettings(this.trailSettings.get(key), incoming);
        if (winner) this.trailSettings.set(key, winner);
        return this.getTrailSettings(userId, trailId);
    }
}

export class PrismaSyncRepository {
    constructor(client = getPrismaClient()) { this.client = client; }

    async getReviewQueue(userId) {
        const rows = await this.client.userQuestionReview.findMany({ where: { userId } });
        const queue = {};
        rows.forEach(row => { queue[row.questionId] = hydrate(row); });
        return queue;
    }

    // Questão fundida/removida ainda aparece na fila local de quem a tinha
    // no navegador. A FK rejeitaria a transação inteira e o app descarta
    // o que estava pendente, então só gravamos ids que existem no banco.
    async existingQuestionIds(ids) {
        if (!ids.length) return new Set();
        const rows = await this.client.question.findMany({ where: { id: { in: ids } }, select: { id: true } });
        return new Set(rows.map(row => row.id));
    }

    async pushReviewEntries(userId, entries) {
        const known = await this.existingQuestionIds(Object.keys(entries || {}));
        const ids = Object.keys(entries || {}).filter(id => known.has(id));
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
        const known = await this.existingQuestionIds([...new Set(responses.map(response => response.questionId))]);
        const valid = responses.filter(response => known.has(response.questionId));
        if (!valid.length) return;
        await this.client.questionResponse.createMany({
            data: valid.map(response => ({
                userId,
                questionId: response.questionId,
                chosen: response.chosen ?? null,
                correct: typeof response.correct === 'boolean' ? response.correct : null,
                elapsedMs: Number.isFinite(response.elapsedMs) ? response.elapsedMs : null,
                answeredAt: response.answeredAt ? new Date(response.answeredAt) : new Date()
            }))
        });
    }

    async getTrailSettings(userId, trailId) {
        const row = await this.client.userTrailSettings.findUnique({ where: { userId_trailId: { userId, trailId } } });
        return hydrateTrailSettings(row);
    }

    async pushTrailSettings(userId, trailId, incoming) {
        const existing = await this.getTrailSettings(userId, trailId);
        const winner = mergeTrailSettings(existing, incoming);
        if (!winner) return null;
        const data = {
            goal: winner.goal ?? null,
            examDate: winner.examDate ? new Date(winner.examDate) : null,
            dailyGoal: Number.isInteger(winner.dailyGoal) ? winner.dailyGoal : null,
            startDate: winner.startDate ? new Date(winner.startDate) : null,
            history: winner.history ?? null,
        };
        await this.client.userTrailSettings.upsert({
            where: { userId_trailId: { userId, trailId } },
            create: { userId, trailId, ...data },
            update: data,
        });
        return this.getTrailSettings(userId, trailId);
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
