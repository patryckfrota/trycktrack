import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
// @ts-ignore
import { updatePrincipalExplanation, updatePrincipalAnnulled, markExplanationsPending } from '../../backend/src/staticPrincipalWriter.js';
import { ExtractedBatchSchema, formatFullExplanation, ExtractedItem } from './types.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');

function extractQuestionsArray(text: string, prefix: string) {
    const start = text.indexOf(prefix);
    if (start === -1) throw new Error(`Prefix not found: ${prefix}`);
    let i = start + prefix.length;
    while (i < text.length && /\s/.test(text[i])) i++;
    if (text[i] !== '[') throw new Error(`Expected '[' after prefix, found '${text[i]}'`);

    const bodyStart = i;
    let depth = 0;
    let inString = false;
    let stringChar = null;
    
    for (; i < text.length; i++) {
        const ch = text[i];
        if (inString) {
            if (ch === '\\') { i++; continue; }
            if (ch === stringChar) {
                inString = false;
                stringChar = null;
            }
            continue;
        }
        if (ch === '"' || ch === "'" || ch === '`') { 
            inString = true; 
            stringChar = ch; 
            continue; 
        }
        if (ch === '[') depth++;
        else if (ch === ']') {
            depth--;
            if (depth === 0) { i++; break; }
        }
    }
    if (depth !== 0) throw new Error('Could not find matching bracket for array');

    return { before: text.slice(0, bodyStart), json: text.slice(bodyStart, i), after: text.slice(i) };
}

export function writeExtractedData(dumpFilePath: string) {
    console.log(`Lendo dump JSON: ${dumpFilePath}`);
    const dumpContent = fs.readFileSync(dumpFilePath, 'utf-8');
    const rawBatch = JSON.parse(dumpContent);
    
    // Validate with Zod
    const batch = ExtractedBatchSchema.parse(rawBatch);
    
    const examId = batch.examId;
    const prefix = examId.split('-')[0]; // e.g., revalida
    
    const questionsFile = path.join(ROOT, `questions-${prefix}.js`);
    
    if (!fs.existsSync(questionsFile)) {
        console.log(`Criando novo banco de questões: ${questionsFile}`);
        fs.writeFileSync(questionsFile, `window.TRYCKTRACK_QUESTION_BANK = (window.TRYCKTRACK_QUESTION_BANK || []).concat([\n]);\n`, 'utf-8');
    }
    
    // Update questions array
    console.log(`Atualizando ${questionsFile}...`);
    const text = fs.readFileSync(questionsFile, 'utf-8');
    const QUESTIONS_PREFIX = 'window.TRYCKTRACK_QUESTION_BANK = (window.TRYCKTRACK_QUESTION_BANK || []).concat(';
    const { before, json, after } = extractQuestionsArray(text, QUESTIONS_PREFIX);
    
    const questions = JSON.parse(json);
    let added = 0;
    let updated = 0;
    
    for (const item of batch.items) {
        const existingIdx = questions.findIndex((q: any) => q.id === item.question.id);
        if (existingIdx !== -1) {
            questions[existingIdx] = item.question;
            updated++;
        } else {
            questions.push(item.question);
            added++;
        }
    }
    
    fs.writeFileSync(questionsFile, before + JSON.stringify(questions, null, 2) + after);
    console.log(`=> Banco de questões atualizado! Adicionadas: ${added}, Atualizadas: ${updated}`);
    
    // Update explanations
    console.log(`Atualizando explanations...`);
    let expAdded = 0;
    for (const item of batch.items) {
        const formatted = formatFullExplanation(item.explanation, item.question.answer);
        updatePrincipalExplanation(item.question.id, formatted);
        updatePrincipalAnnulled(item.question.id, item.question.annulled);
        expAdded++;
    }
    console.log(`=> ${expAdded} explicações atualizadas no question-explanations.js!`);
    // Explicação gerada por agente nunca vai direto ao aluno: entra como pendente
    // até a revisão clínica independente (PROCESSO-INGESTAO.md, E9).
    markExplanationsPending(batch.items.map(item => item.question.id));
    console.log(`=> ${expAdded} explicações marcadas como PENDENTES de revisão (o app mostra só o gabarito).`);

    console.log('\n========================================');
    console.log('Executando verificação taxonômica local...');
    try {
        const output = execSync('node taxonomia/validar.cjs', { cwd: ROOT, encoding: 'utf-8' });
        console.log(output);
        console.log('✅ Taxonomia validada!');
    } catch (e: any) {
        console.warn('⚠️ Nota: Validação taxonômica apontou pendências (o portão pipeline/validar.cjs avaliará o lote):');
        console.warn(e.stdout || e.message);
    }

    // Sincronização com o Postgres só ocorre se a flag --sync-db for explicitamente fornecida.
    // No fluxo do pipeline (rodar-dia.sh), o sync com Postgres é responsabilidade exclusiva
    // do portão de validação (apenas para lotes 100% aprovados).
    const syncDbRequested = process.argv.includes('--sync-db');
    if (syncDbRequested) {
        const targetIds = batch.items.map(item => item.question.id).join(',');
        console.log('\n========================================');
        console.log('⚡ Sincronizando lote com o Postgres (--sync-db explícito)...');
        console.log('========================================');
        try {
            const { execSync } = require('node:child_process');
            const syncOutput = execSync(`node backend/scripts/import-questions.js --ids "${targetIds}"`, {
                cwd: ROOT,
                encoding: 'utf-8'
            });
            console.log(syncOutput);
            console.log('🎉 Sincronismo concluído!');
        } catch (syncErr: any) {
            console.error('Falha no sincronismo com Postgres:', syncErr.message);
        }
    }
}

// Permitir rodar diretamente do terminal
if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const dumpPath = process.argv[2] || path.join(ROOT, 'tmp', 'extracted-revalida-2024-2.json');
    if (fs.existsSync(dumpPath)) {
        writeExtractedData(dumpPath);
    } else {
        console.error(`Arquivo não encontrado: ${dumpPath}`);
        process.exit(1);
    }
}
