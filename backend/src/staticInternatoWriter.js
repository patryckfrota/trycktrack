/**
 * Escreve de volta nos arquivos estáticos do banco INTERNATO
 * (questions-internato.js / question-explanations-internato.js) — eles
 * são a fonte real que o app do aluno lê (ver import-questions.js);
 * gravar só no Postgres seria apagado no próximo import. Os dois
 * arquivos são um único array/objeto literal gerado por JSON.stringify
 * em algum momento anterior, então dá pra extrair a faixa de texto
 * entre marcadores fixos, fazer JSON.parse/mutate/stringify e regravar
 * sem tocar no resto do arquivo (comentários, wrapper de IIFE).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');

const QUESTIONS_FILE = path.join(ROOT, 'questions-internato.js');
const EXPLANATIONS_FILE = path.join(ROOT, 'question-explanations-internato.js');

const QUESTIONS_PREFIX = 'window.TRYCKTRACK_INTERNATO_BANK = (window.TRYCKTRACK_INTERNATO_BANK || []).concat(';
const EXPLANATIONS_PREFIX = 'const explanations = ';

// Acha o `]`/`}` que fecha o `[`/`{` logo após o prefixo, andando
// caractere a caractere e respeitando strings/escapes — um
// text.indexOf(');') ingênuo corta cedo demais sempre que alguma
// explicação/enunciado tem esse literal na prosa (ex.: uma sigla entre
// parênteses seguida de ponto e vírgula), como aconteceu na prática.
function extract(text, prefix) {
    const start = text.indexOf(prefix);
    if (start === -1) throw new Error(`Marcador de início não encontrado: ${prefix.slice(0, 40)}…`);
    let i = start + prefix.length;
    while (i < text.length && /\s/.test(text[i])) i++;
    const open = text[i];
    const close = open === '[' ? ']' : open === '{' ? '}' : null;
    if (!close) throw new Error(`Esperava '[' ou '{' logo após o prefixo, achei '${open}'`);

    const bodyStart = i;
    let depth = 0;
    let inString = false;
    for (; i < text.length; i++) {
        const ch = text[i];
        if (inString) {
            if (ch === '\\') { i++; continue; }
            if (ch === '"') inString = false;
            continue;
        }
        if (ch === '"') inString = true;
        else if (ch === open) depth++;
        else if (ch === close) {
            depth--;
            if (depth === 0) { i++; break; }
        }
    }
    if (depth !== 0) throw new Error('Não achei o fechamento correspondente — arquivo truncado ou malformado?');

    return { before: text.slice(0, bodyStart), json: text.slice(bodyStart, i), after: text.slice(i) };
}

export function updateInternatoQuestionFields(questionId, fields) {
    const text = fs.readFileSync(QUESTIONS_FILE, 'utf-8');
    const { before, json, after } = extract(text, QUESTIONS_PREFIX);
    const questions = JSON.parse(json);
    const q = questions.find(item => item.id === questionId);
    if (!q) throw new Error(`Questão ${questionId} não encontrada em questions-internato.js`);
    Object.assign(q, fields);
    fs.writeFileSync(QUESTIONS_FILE, before + JSON.stringify(questions) + after);
}

export function updateInternatoExplanation(questionId, body) {
    const text = fs.readFileSync(EXPLANATIONS_FILE, 'utf-8');
    const { before, json, after } = extract(text, EXPLANATIONS_PREFIX);
    const explanations = JSON.parse(json);
    explanations[questionId] = body;
    fs.writeFileSync(EXPLANATIONS_FILE, before + JSON.stringify(explanations) + after);
}
