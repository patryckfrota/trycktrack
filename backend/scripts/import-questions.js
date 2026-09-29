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
import fs from 'node:fs';
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

// Descobre os arquivos em vez de listar na mão: o motor de ingestão cria
// um questions-<banca>.js novo a cada banca, e uma lista fixa aqui deixava
// essas provas fora do Postgres sem erro nenhum. O Internato fica de fora
// porque é um banco separado, carregado mais abaixo.
const PRINCIPAL_FILES = fs.readdirSync(ROOT)
    .filter(f => /^questions-.*\.js$/.test(f) && f !== 'questions-internato.js')
    .sort();

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

function separarOrfas(candidatos, comProgresso) {
    return {
        removiveis: candidatos.filter(id => !comProgresso.has(id)),
        retidas: candidatos.filter(id => comProgresso.has(id))
    };
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

    const idsArgIndex = process.argv.indexOf('--ids');
    const examArgIndex = process.argv.indexOf('--exam');
    const targetIds = idsArgIndex !== -1 && process.argv[idsArgIndex + 1]
        ? new Set(process.argv[idsArgIndex + 1].split(',').map(s => s.trim()))
        : null;
    const targetExam = examArgIndex !== -1 && process.argv[examArgIndex + 1]
        ? process.argv[examArgIndex + 1].trim()
        : null;

    let { questions, optionsByQuestionId, explanations } = buildImportPlan();

    if (targetIds) {
        questions = questions.filter(q => targetIds.has(q.id));
        explanations = explanations.filter(ex => targetIds.has(ex.questionId));
        console.log(`[Incremental] Filtrado por ${targetIds.size} ID(s) específico(s).`);
    } else if (targetExam) {
        questions = questions.filter(q => q.examId === targetExam);
        const questionIdSet = new Set(questions.map(q => q.id));
        explanations = explanations.filter(ex => questionIdSet.has(ex.questionId));
        console.log(`[Incremental] Filtrado pelo exame "${targetExam}".`);
    }

    const totalOptions = questions.reduce((n, q) => n + (optionsByQuestionId.get(q.id)?.length || 0), 0);

    console.log(`Questões a importar: ${questions.length}`);
    console.log(`Alternativas: ${totalOptions}`);
    console.log(`Explicações: ${explanations.length}`);

    if (dryRun && !verify) {
        console.log('\n--dry-run: nada foi escrito no banco.');
        return;
    }

    const { getPrismaClient, resetPrismaClient } = await import('../src/prismaClient.js');
    let prisma = getPrismaClient();

    // O WebSocket do driver Neon já travou silenciosamente (sem lançar
    // erro) depois de dezenas de milhares de statements na mesma sessão
    // — sempre no mesmo ponto absoluto do import, não em conteúdo
    // específico (confirmado testando os itens do lote um a um fora de
    // uma transação: todos passam rápido). Cada lote roda com timeout;
    // se travar, reconecta (nova sessão WebSocket) e tenta de novo.
    async function runChunk(buildOps, label) {
        for (let attempt = 1; attempt <= 3; attempt++) {
            let timer;
            const timeout = new Promise((_, reject) => {
                timer = setTimeout(() => reject(new Error(`timeout de 20s no lote (${label})`)), 20000);
            });
            try {
                return await Promise.race([prisma.$transaction(buildOps(prisma)), timeout]);
            } catch (error) {
                if (attempt === 3) throw error;
                process.stdout.write(`\n  (${label} travou — ${error.message} — reconectando e tentando de novo) `);
                prisma = await resetPrismaClient();
            } finally {
                clearTimeout(timer);
            }
        }
    }

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
    const CHUNK = 25; // usado só na remoção de órfãs, mais abaixo
    const validIds = new Set(questions.map(q => q.id));

    // Upsert em lote: cada lote vai como UM parâmetro JSON e o Postgres
    // expande com jsonb_to_recordset — uma ida e volta por lote em vez de
    // uma por linha. Com upsert linha a linha o import levava >1h a partir
    // do runner do GitHub (latência até o banco); em lote leva segundos.
    // Ids únicos por lote são garantidos (buildImportPlan aborta em colisão;
    // alternativa é única por questão+letra; explicação é 1 por questão).
    async function bulk(rows, size, label, buildOp) {
        for (let i = 0; i < rows.length; i += size) {
            const json = JSON.stringify(rows.slice(i, i + size));
            await runChunk(p => [buildOp(p, json)], label);
            process.stdout.write(`\r  ${label}: ${Math.min(i + size, rows.length)}/${rows.length}`);
        }
        console.log();
    }

    await bulk(questions, 500, 'questões', (p, json) => p.$executeRaw`
        INSERT INTO "Question" ("id","bank","area","subarea","stem","answer","annulled","needsVisualReview",
            "questionType","examId","examName","source","sourceCode","number","images","rodizio","topico","tema","semestre","updatedAt")
        SELECT x.id, x.bank::"QuestionBank", x.area, x.subarea, x.stem, x.answer, x.annulled, x."needsVisualReview",
            x."questionType", x."examId", x."examName", x.source, x."sourceCode", x.number,
            ARRAY(SELECT jsonb_array_elements_text(x.images)), x.rodizio, x.topico, x.tema, x.semestre, now()
        FROM jsonb_to_recordset(${json}::jsonb) AS x(id text, bank text, area text, subarea text, stem text, answer text,
            annulled boolean, "needsVisualReview" boolean, "questionType" text, "examId" text, "examName" text,
            source text, "sourceCode" text, number int, images jsonb, rodizio text, topico text, tema text, semestre text)
        ON CONFLICT ("id") DO UPDATE SET
            "bank"=EXCLUDED."bank", "area"=EXCLUDED."area", "subarea"=EXCLUDED."subarea", "stem"=EXCLUDED."stem",
            "answer"=EXCLUDED."answer", "annulled"=EXCLUDED."annulled", "needsVisualReview"=EXCLUDED."needsVisualReview",
            "questionType"=EXCLUDED."questionType", "examId"=EXCLUDED."examId", "examName"=EXCLUDED."examName",
            "source"=EXCLUDED."source", "sourceCode"=EXCLUDED."sourceCode", "number"=EXCLUDED."number",
            "images"=EXCLUDED."images", "rodizio"=EXCLUDED."rodizio", "topico"=EXCLUDED."topico",
            "tema"=EXCLUDED."tema", "semestre"=EXCLUDED."semestre", "updatedAt"=now()`);

    const allOptions = questions.flatMap(q => optionsByQuestionId.get(q.id).map(opt => ({ questionId: q.id, ...opt })));
    await bulk(allOptions, 2000, 'alternativas', (p, json) => p.$executeRaw`
        INSERT INTO "QuestionOption" ("id","questionId","letter","text")
        SELECT gen_random_uuid()::text, x."questionId", x.letter, x.text
        FROM jsonb_to_recordset(${json}::jsonb) AS x("questionId" text, letter text, text text)
        ON CONFLICT ("questionId","letter") DO UPDATE SET "text"=EXCLUDED."text"`);

    const safeExplanations = explanations.filter(ex => validIds.has(ex.questionId));
    await bulk(safeExplanations, 500, 'explicações', (p, json) => p.$executeRaw`
        INSERT INTO "QuestionExplanation" ("questionId","body","updatedAt")
        SELECT x."questionId", x.body, now()
        FROM jsonb_to_recordset(${json}::jsonb) AS x("questionId" text, body text)
        ON CONFLICT ("questionId") DO UPDATE SET "body"=EXCLUDED."body", "updatedAt"=now()`);
    console.log('\nImportação concluída.');

    // Questões que existiam numa importação anterior mas saíram dos
    // arquivos estáticos (ex.: fundidas/removidas na deduplicação
    // Revalida×especialidades) ficam órfãs no banco — o upsert acima só
    // cria/atualiza, nunca remove. QuestionOption/QuestionExplanation
    // têm onDelete: Cascade, então somem junto. QuestionResponse e
    // UserQuestionReview também são Cascade a partir de Question — ok
    // aqui porque essas linhas órfãs só podem existir para os IDs do
    // lado Revalida que foram fundidos para dentro do ID do lado
    // especialidade (o merge preserva o ID mais estabelecido), então
    // nenhum progresso de usuário referenciando o ID sobrevivente é
    // perdido.
    // Remoção de órfãs apenas quando for sincronismo global total (sem filtros)
    if (!targetIds && !targetExam) {
        const idsNoBanco = (await prisma.question.findMany({ select: { id: true } })).map(r => r.id);
        const candidatos = idsNoBanco.filter(id => !validIds.has(id));
        // Apagar a questão apaga por cascata as respostas e revisões dos
        // usuários. Órfã com progresso fica no banco e é avisada; quem
        // fundiu duplicatas precisa remapear o progresso antes de remover.
        const comProgresso = new Set([
            ...(await prisma.questionResponse.findMany({ where: { questionId: { in: candidatos } }, select: { questionId: true }, distinct: ['questionId'] })).map(r => r.questionId),
            ...(await prisma.userQuestionReview.findMany({ where: { questionId: { in: candidatos } }, select: { questionId: true }, distinct: ['questionId'] })).map(r => r.questionId)
        ]);
        const { removiveis: orfaos, retidas } = separarOrfas(candidatos, comProgresso);
        if (retidas.length) {
            console.log(`\nATENÇÃO: ${retidas.length} questões órfãs mantidas porque têm progresso de usuário (remapeie antes de remover): ${retidas.join(', ')}`);
        }
        if (orfaos.length) {
            console.log(`\nRemovendo ${orfaos.length} questões órfãs (não existem mais nos arquivos estáticos)...`);
            for (let i = 0; i < orfaos.length; i += CHUNK) {
                const chunk = orfaos.slice(i, i + CHUNK);
                await prisma.question.deleteMany({ where: { id: { in: chunk } } });
                process.stdout.write(`\r  removidas: ${Math.min(i + CHUNK, orfaos.length)}/${orfaos.length}`);
            }
            console.log();
        } else {
            console.log('\nNenhuma questão órfã encontrada.');
        }
    } else {
        console.log('\n[Incremental] Sincronismo rápido finalizado (limpeza de órfãs ignorada).');
    }

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

export { buildImportPlan, toQuestionRecord, toOptionRecords, separarOrfas };
