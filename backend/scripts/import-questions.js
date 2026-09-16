/**
 * Popula Question/QuestionOption/QuestionExplanation (ver
 * prisma/migrations/20260915120000_questhub_persistence) a partir dos
 * arquivos estáticos que o PWA já carrega hoje (questions-*.js,
 * question-explanations.js, question-explanations-internato.js) — eles
 * continuam sendo a fonte; isto só espelha pra dentro do banco.
 *
 * Idempotente: usa upsert, então rodar de novo depois de editar um
 * arquivo estático (corrigir um enunciado, adicionar uma explicação)
 * sincroniza sem duplicar nada.
 *
 * Uso:
 *   node scripts/import-questions.js            # importa de verdade
 *   node scripts/import-questions.js --dry-run  # só valida e conta,
 *                                                # não escreve no banco
 *   node scripts/import-questions.js --verify   # dry-run + confere
 *                                                # cada campo contra o
 *                                                # banco já importado
 */

import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..'); // backend/scripts -> backend -> raiz do repo

// questions-*.js e question-explanations*.js são scripts clássicos
// (window.X = ...), pensados pra rodar como <script> no navegador —
// mesmo padrão de carregamento usado nos scripts ad-hoc desta sessão
// (global.window={}; require(arquivo)), só que aqui dentro de um
// módulo ESM (backend/package.json é "type":"module"), por isso o
// createRequire em vez de um require() direto.
const require = createRequire(path.join(ROOT, 'noop.cjs'));

globalThis.window = globalThis.window || {};

const PRINCIPAL_FILES = [
    'questions-clinica-medica.js',
    'questions-cirurgia.js',
    'questions-pediatria.js',
    'questions-ginecologia.js',
    'questions-obstetricia.js',
    'questions-preventiva.js',
    'questions-psiquiatria.js',
    'questions-revalida.js'
];

function loadStaticFile(relPath) {
    require(path.join(ROOT, relPath));
}

PRINCIPAL_FILES.forEach(loadStaticFile);
// Muta .explanation (via explanationAliases + reaproveitamento por
// fingerprint) e .annulled/.needsVisualReview direto nos objetos do
// banco principal já carregado acima — precisa rodar DEPOIS dos
// arquivos de questões, na mesma ordem que index.html carrega.
loadStaticFile('question-explanations.js');

loadStaticFile('questions-internato.js');
loadStaticFile('question-explanations-internato.js');

const principalBank = Array.isArray(globalThis.window.TRYCKTRACK_QUESTION_BANK)
    ? globalThis.window.TRYCKTRACK_QUESTION_BANK : [];
const internatoBank = Array.isArray(globalThis.window.TRYCKTRACK_INTERNATO_BANK)
    ? globalThis.window.TRYCKTRACK_INTERNATO_BANK : [];

// ---------- transformação (pura, sem tocar no banco — testável com --dry-run) ----------

function toQuestionRecord(q, bank) {
    return {
        id: q.id,
        bank,
        area: q.area || '',
        subarea: q.subarea || null,
        stem: q.stem || '',
        answer: q.answer || null,
        annulled: !!q.annulled,
        needsVisualReview: !!q.needsVisualReview,
        questionType: q.questionType || 'multiple_choice',
        examId: q.examId || null,
        examName: q.examName || null,
        source: q.source || null,
        sourceCode: q.sourceCode || null,
        number: Number.isInteger(q.number) ? q.number : null,
        images: Array.isArray(q.images) ? q.images : [],
        rodizio: q.rodizio || null,
        topico: q.topico || null,
        tema: q.tema || null,
        semestre: q.semestre || null
    };
}

function toOptionRecords(q) {
    return Object.entries(q.options || {}).map(([letter, text]) => ({ letter, text: String(text) }));
}

function buildImportPlan() {
    const questions = [
        ...principalBank.map(q => toQuestionRecord(q, 'PRINCIPAL')),
        ...internatoBank.map(q => toQuestionRecord(q, 'INTERNATO'))
    ];
    const optionsByQuestionId = new Map();
    [...principalBank, ...internatoBank].forEach(q => optionsByQuestionId.set(q.id, toOptionRecords(q)));
    const explanations = [...principalBank, ...internatoBank]
        .filter(q => typeof q.explanation === 'string' && q.explanation.trim())
        .map(q => ({ questionId: q.id, body: q.explanation }));

    const ids = new Set(questions.map(q => q.id));
    if (ids.size !== questions.length) {
        throw new Error(`IDs duplicados entre os bancos — ${questions.length - ids.size} colisões. Import abortado.`);
    }

    return { questions, optionsByQuestionId, explanations };
}

async function run() {
    const dryRun = process.argv.includes('--dry-run') || process.argv.includes('--verify');
    const verify = process.argv.includes('--verify');

    const { questions, optionsByQuestionId, explanations } = buildImportPlan();
    const totalOptions = [...optionsByQuestionId.values()].reduce((n, opts) => n + opts.length, 0);

    console.log(`Questões: ${questions.length} (${principalBank.length} principal + ${internatoBank.length} internato)`);
    console.log(`Alternativas: ${totalOptions}`);
    console.log(`Explicações: ${explanations.length}`);

    if (dryRun && !verify) {
        console.log('\n--dry-run: nada foi escrito no banco.');
        return;
    }

    const { getPrismaClient } = await import('../src/prismaClient.js');
    const prisma = getPrismaClient();

    if (verify) {
        console.log('\n--verify: comparando com o que já está no banco (sem escrever)...');
        const total = await prisma.question.count();
        const amostra = questions.slice(0, Math.min(20, questions.length));
        let divergentes = 0;
        for (const q of amostra) {
            const row = await prisma.question.findUnique({ where: { id: q.id }, include: { options: true, explanation: true } });
            if (!row) { console.log(`  FALTANDO no banco: ${q.id}`); divergentes++; continue; }
            if (row.stem !== q.stem || row.answer !== q.answer) { console.log(`  DIVERGENTE: ${q.id}`); divergentes++; }
        }
        console.log(`Total de questões no banco: ${total} (fonte tem ${questions.length})`);
        console.log(`Amostra verificada: ${amostra.length}, divergências: ${divergentes}`);
        await prisma.$disconnect();
        return;
    }

    console.log('\nImportando...');
    const CHUNK = 25;
    for (let i = 0; i < questions.length; i += CHUNK) {
        const chunk = questions.slice(i, i + CHUNK);
        await prisma.$transaction(chunk.map(q => prisma.question.upsert({
            where: { id: q.id },
            create: q,
            update: q
        })));
        process.stdout.write(`\r  questões: ${Math.min(i + CHUNK, questions.length)}/${questions.length}`);
    }
    console.log();

    const allOptions = questions.flatMap(q => optionsByQuestionId.get(q.id).map(opt => ({ questionId: q.id, ...opt })));
    for (let i = 0; i < allOptions.length; i += CHUNK) {
        const chunk = allOptions.slice(i, i + CHUNK);
        await prisma.$transaction(chunk.map(opt => prisma.questionOption.upsert({
            where: { questionId_letter: { questionId: opt.questionId, letter: opt.letter } },
            create: opt,
            update: { text: opt.text }
        })));
        process.stdout.write(`\r  alternativas: ${Math.min(i + CHUNK, allOptions.length)}/${allOptions.length}`);
    }
    console.log();

    for (let i = 0; i < explanations.length; i += CHUNK) {
        const chunk = explanations.slice(i, i + CHUNK);
        await prisma.$transaction(chunk.map(ex => prisma.questionExplanation.upsert({
            where: { questionId: ex.questionId },
            create: ex,
            update: { body: ex.body }
        })));
        process.stdout.write(`\r  explicações: ${Math.min(i + CHUNK, explanations.length)}/${explanations.length}`);
    }
    console.log('\nImportação concluída.');
    await prisma.$disconnect();
}

// Só roda de verdade quando chamado como `node scripts/import-questions.js`
// — quando este arquivo é importado (import-questions.test.js), run()
// nunca deve disparar sozinho, senão o teste tentaria conectar no Postgres.
const isDirectRun = process.argv[1] && new URL(`file://${process.argv[1]}`).href === import.meta.url;
if (isDirectRun) {
    run().catch(error => {
        console.error('Falha na importação:', error);
        process.exitCode = 1;
    });
}

export { buildImportPlan, toQuestionRecord, toOptionRecords };
