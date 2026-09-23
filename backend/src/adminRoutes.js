/**
 * Rotas do painel de gestão.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router } from 'express';
import { requireAdminAuth } from './adminAuth.js';
import { getPrismaClient } from './prismaClient.js';
import { buildImportPlan } from '../scripts/import-questions.js';
import { updateInternatoExplanation, updateInternatoQuestionFields } from './staticInternatoWriter.js';
import { updatePrincipalAnnulled, updatePrincipalExplanation } from './staticPrincipalWriter.js';
import { getQuestionYears } from '../../shared/question-filters.js';
import { getOsceCurriculumMatrix } from './osceMatrixReader.js';
import { autoWrapAsyncRoutes } from './asyncHandler.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..', '..');

export const adminRouter = autoWrapAsyncRoutes(Router());
adminRouter.use(requireAdminAuth());

adminRouter.get('/stats', async (req, res) => {
    const prisma = getPrismaClient();

    const [totalQuestions, byBank, semExplicacao, semTema, totalUsuarios] = await Promise.all([
        prisma.question.count(),
        prisma.question.groupBy({ by: ['bank'], _count: true }),
        prisma.question.count({ where: { explanation: null } }),
        prisma.question.count({ where: { bank: 'INTERNATO', tema: null } }),
        prisma.user.count(),
    ]);

    res.json({
        totalQuestions,
        totalUsuarios,
        semExplicacao,
        semTema,
        porBanco: Object.fromEntries(byBank.map(row => [row.bank, row._count])),
    });
});

// Compara os arquivos estáticos (fonte que o app lê) com o que está
// no Postgres (fonte que o backend/painel lê) — as duas podem divergir
// sempre que alguém edita um .js e esquece de rodar o import. Esse
// desalinhamento é silencioso (nada quebra visivelmente), por isso é
// checado aqui em vez de só confiar que a importação sempre roda.
adminRouter.get('/integrity', async (req, res) => {
    const prisma = getPrismaClient();
    const { questions, optionsByQuestionId, explanations } = buildImportPlan();
    const totalOptionsFonte = [...optionsByQuestionId.values()].reduce((n, opts) => n + opts.length, 0);

    const [questoesBanco, opcoesBanco, explicacoesBanco] = await Promise.all([
        prisma.question.count(),
        prisma.questionOption.count(),
        prisma.questionExplanation.count(),
    ]);

    const imagensFaltando = [];
    for (const q of questions) {
        for (const rel of q.images) {
            if (!fs.existsSync(path.join(REPO_ROOT, rel))) imagensFaltando.push({ questionId: q.id, path: rel });
        }
    }

    // discursivas não têm alternativas por natureza — só sinaliza de
    // múltipla escolha vazia, que aí sim é dado faltando de verdade.
    const semAlternativas = questions
        .filter(q => q.questionType !== 'discursive' && (optionsByQuestionId.get(q.id) || []).length === 0)
        .map(q => q.id);

    // "Ano" no filtro do app não é campo do schema — vem de regex sobre
    // examName/source (getQuestionYears, shared/question-filters.js).
    // Uma questão cujo texto não bate no padrão /20\d{2}/ nunca aparece
    // filtrando por ano nenhum, sem erro nenhum pra avisar — daí checar
    // aqui em vez de deixar isso só uma limitação silenciosa da regex.
    const semAno = questions.filter(q => getQuestionYears(q).length === 0).map(q => q.id);

    const validIds = new Set(questions.map(q => q.id));
    const idsNoBanco = (await prisma.question.findMany({ select: { id: true } })).map(r => r.id);
    const orfaos = idsNoBanco.filter(id => !validIds.has(id));

    res.json({
        sincronizado: questions.length === questoesBanco && totalOptionsFonte === opcoesBanco
            && explanations.length === explicacoesBanco && orfaos.length === 0,
        questoes: { fonte: questions.length, banco: questoesBanco },
        alternativas: { fonte: totalOptionsFonte, banco: opcoesBanco },
        explicacoes: { fonte: explanations.length, banco: explicacoesBanco },
        imagensFaltando,
        semAlternativas,
        semAno,
        orfaos,
    });
});

// Painel de qualidade: os mesmos furos que hoje só apareciam em
// auditorias HTML avulsas feitas à mão (uma por rodada) — aqui ficam
// sempre atualizados, quebrados por rodízio/área em vez de só o total
// agregado que /stats mostra, pra dar pra ver ONDE cavar, não só
// quanto falta.
adminRouter.get('/quality', async (req, res) => {
    const prisma = getPrismaClient();

    const [totalPorRodizio, semExpPorRodizio, semTemaPorRodizio, anuladasPorRodizio] = await Promise.all([
        prisma.question.groupBy({ by: ['rodizio'], where: { bank: 'INTERNATO' }, _count: true }),
        prisma.question.groupBy({ by: ['rodizio'], where: { bank: 'INTERNATO', explanation: null }, _count: true }),
        prisma.question.groupBy({ by: ['rodizio'], where: { bank: 'INTERNATO', tema: null }, _count: true }),
        prisma.question.groupBy({ by: ['rodizio'], where: { bank: 'INTERNATO', annulled: true }, _count: true }),
    ]);
    const toMap = rows => Object.fromEntries(rows.map(r => [r.rodizio, r._count]));
    const semExpMap = toMap(semExpPorRodizio);
    const semTemaMap = toMap(semTemaPorRodizio);
    const anuladasMap = toMap(anuladasPorRodizio);
    const internato = totalPorRodizio
        .map(r => ({
            rodizio: r.rodizio,
            total: r._count,
            semExplicacao: semExpMap[r.rodizio] || 0,
            semTema: semTemaMap[r.rodizio] || 0,
            anuladas: anuladasMap[r.rodizio] || 0,
        }))
        .sort((a, b) => (b.semExplicacao + b.semTema) - (a.semExplicacao + a.semTema));

    const [totalPorArea, semExpPorArea, anuladasPorArea] = await Promise.all([
        prisma.question.groupBy({ by: ['area'], where: { bank: 'PRINCIPAL' }, _count: true }),
        prisma.question.groupBy({ by: ['area'], where: { bank: 'PRINCIPAL', explanation: null }, _count: true }),
        prisma.question.groupBy({ by: ['area'], where: { bank: 'PRINCIPAL', annulled: true }, _count: true }),
    ]);
    const semExpAreaMap = toMap(semExpPorArea.map(r => ({ rodizio: r.area, _count: r._count })));
    const anuladasAreaMap = toMap(anuladasPorArea.map(r => ({ rodizio: r.area, _count: r._count })));
    const principal = totalPorArea
        .map(r => ({
            area: r.area,
            total: r._count,
            semExplicacao: semExpAreaMap[r.area] || 0,
            anuladas: anuladasAreaMap[r.area] || 0,
        }))
        .sort((a, b) => b.semExplicacao - a.semExplicacao);

    // O filtro Rotação/Tópico/Tema do modo Internato no app não lê as
    // questões — lê a matriz curricular do OSCE (OSCE_CURRICULUM_MATRIX
    // em app-app.js), uma taxonomia paralela. Se o rodízio/tópico/tema
    // de uma questão não bate EXATAMENTE (string idêntica) com nenhum
    // item da matriz, essa questão nunca aparece filtrando por tema
    // nenhum — some do filtro sem nenhum erro. E o oposto também é
    // problema: um item da matriz sem nenhuma questão real é uma opção
    // de filtro que sempre zera o contador.
    const matrix = getOsceCurriculumMatrix();
    const matrixCombos = new Set();
    matrix.forEach(area => area.themes.forEach(theme => (theme.subthemes || []).forEach(sub => {
        matrixCombos.add(`${area.name}|${theme.code}|${sub.name}`);
    })));

    const internatoQuestoes = await prisma.question.findMany({
        where: { bank: 'INTERNATO' },
        select: { id: true, rodizio: true, topico: true, tema: true },
    });
    const realCombos = new Set();
    const questoesForaDaMatriz = [];
    internatoQuestoes.forEach(q => {
        const combo = `${q.rodizio}|${q.topico}|${q.tema}`;
        realCombos.add(combo);
        if (!matrixCombos.has(combo)) questoesForaDaMatriz.push(q.id);
    });
    const temasSemQuestao = [...matrixCombos].filter(combo => !realCombos.has(combo))
        .map(combo => { const [rodizio, topico, tema] = combo.split('|'); return { rodizio, topico, tema }; });

    res.json({ internato, principal, osce: { questoesForaDaMatriz, temasSemQuestao } });
});

adminRouter.get('/errors', async (req, res) => {
    const prisma = getPrismaClient();
    const { cursor } = req.query;
    const take = 30;

    const errors = await prisma.clientError.findMany({
        take: take + 1,
        ...(cursor ? { skip: 1, cursor: { id: String(cursor) } } : {}),
        orderBy: { createdAt: 'desc' },
    });

    const hasMore = errors.length > take;
    const page = hasMore ? errors.slice(0, take) : errors;

    res.json({ errors: page, nextCursor: hasMore ? page[page.length - 1].id : null });
});

adminRouter.get('/users', async (req, res) => {
    const prisma = getPrismaClient();
    const { search, cursor } = req.query;
    const take = 30;

    const users = await prisma.user.findMany({
        where: search ? { email: { contains: String(search), mode: 'insensitive' } } : {},
        take: take + 1,
        ...(cursor ? { skip: 1, cursor: { id: String(cursor) } } : {}),
        orderBy: { createdAt: 'desc' },
        select: {
            id: true, email: true, displayName: true, createdAt: true,
            _count: { select: { questionAnswers: true, questionReviews: true } },
        },
    });

    const hasMore = users.length > take;
    const page = hasMore ? users.slice(0, take) : users;

    res.json({
        users: page.map(u => ({
            id: u.id, email: u.email, displayName: u.displayName, createdAt: u.createdAt,
            respostas: u._count.questionAnswers, revisoes: u._count.questionReviews,
        })),
        nextCursor: hasMore ? page[page.length - 1].id : null,
    });
});

adminRouter.get('/questions', async (req, res) => {
    const prisma = getPrismaClient();
    const { bank, rodizio, search, cursor } = req.query;
    const take = 30;

    const where = {
        ...(bank ? { bank } : {}),
        ...(rodizio ? { rodizio } : {}),
        ...(search ? { stem: { contains: String(search), mode: 'insensitive' } } : {}),
    };

    const questions = await prisma.question.findMany({
        where,
        take: take + 1,
        ...(cursor ? { skip: 1, cursor: { id: String(cursor) } } : {}),
        orderBy: { id: 'asc' },
        select: {
            id: true, bank: true, area: true, rodizio: true, topico: true, tema: true,
            semestre: true, stem: true, annulled: true,
            explanation: { select: { body: true } },
        },
    });

    const hasMore = questions.length > take;
    const page = hasMore ? questions.slice(0, take) : questions;

    res.json({
        questions: page.map(q => ({ ...q, temExplicacao: !!q.explanation, explanation: undefined })),
        nextCursor: hasMore ? page[page.length - 1].id : null,
    });
});

adminRouter.get('/questions/:id', async (req, res) => {
    const prisma = getPrismaClient();
    const question = await prisma.question.findUnique({
        where: { id: req.params.id },
        include: { options: { orderBy: { letter: 'asc' } }, explanation: true },
    });
    if (!question) return res.status(404).json({ error: 'Questão não encontrada.' });
    res.json({ ...question, explanation: question.explanation?.body || null });
});

// Edição de curadoria: tema, anulada e corpo da explicação. O app do
// aluno lê os arquivos estáticos (não o Postgres), então gravar só no
// banco seria apagado no próximo import — a edição vai pros dois
// lugares nos dois bancos (staticInternatoWriter / staticPrincipalWriter).
// "tema" só existe no schema do INTERNATO, por isso ignorado no PRINCIPAL.
adminRouter.patch('/questions/:id', async (req, res) => {
    const prisma = getPrismaClient();
    const { tema, annulled, explanationBody } = req.body || {};
    if (tema === undefined && annulled === undefined && explanationBody === undefined) {
        return res.status(400).json({ error: 'Nada para atualizar.' });
    }

    const question = await prisma.question.findUnique({ where: { id: req.params.id }, select: { bank: true } });
    if (!question) return res.status(404).json({ error: 'Questão não encontrada.' });

    const fileWriteback = question.bank === 'INTERNATO' || question.bank === 'PRINCIPAL';
    if (fileWriteback) {
        try {
            if (question.bank === 'INTERNATO') {
                const fields = {};
                if (tema !== undefined) fields.tema = tema;
                if (annulled !== undefined) fields.annulled = !!annulled;
                if (Object.keys(fields).length) updateInternatoQuestionFields(req.params.id, fields);
                if (explanationBody !== undefined) updateInternatoExplanation(req.params.id, explanationBody);
            } else {
                // Banco PRINCIPAL não tem campo "tema" (só o Internato
                // usa essa taxonomia) — ignora silenciosamente se vier,
                // em vez de dar erro por um campo que não se aplica.
                if (annulled !== undefined) updatePrincipalAnnulled(req.params.id, !!annulled);
                if (explanationBody !== undefined) updatePrincipalExplanation(req.params.id, explanationBody);
            }
        } catch (error) {
            return res.status(500).json({ error: `Falha ao gravar no arquivo-fonte: ${error.message}` });
        }
    }

    await prisma.$transaction([
        prisma.question.update({
            where: { id: req.params.id },
            data: {
                ...(tema !== undefined ? { tema } : {}),
                ...(annulled !== undefined ? { annulled: !!annulled } : {}),
            },
        }),
        ...(explanationBody !== undefined
            ? [prisma.questionExplanation.upsert({
                where: { questionId: req.params.id },
                create: { questionId: req.params.id, body: explanationBody },
                update: { body: explanationBody },
            })]
            : []),
    ]);

    res.json({ ok: true, fileWriteback });
});
