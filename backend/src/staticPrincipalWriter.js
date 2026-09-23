/**
 * Escreve de volta em question-explanations.js (banco PRINCIPAL) — a
 * mesma ideia do staticInternatoWriter.js, mas esse arquivo não é
 * JSON: o objeto `explanations` usa chaves com aspas simples e valores
 * em template literal (crase), não aspas duplas — dá pra confirmar que
 * nenhuma dessas strings usa interpolação `${...}` de verdade (só o
 * código de fingerprint mais abaixo no arquivo usa, fora do objeto),
 * então tratá-las como string literal opaca é seguro. JSON.parse não
 * dá conta disso, por isso o parse aqui usa `Function(...)` pra avaliar
 * o literal como JS de verdade (arquivo confiável do próprio repo,
 * nunca conteúdo vindo de fora) em vez de tentar reimplementar um
 * parser de literal JS do zero.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');
const EXPLANATIONS_FILE = path.join(ROOT, 'question-explanations.js');
const PREFIX = 'const explanations = ';
const ALIASES_PREFIX = 'const explanationAliases = ';

// Acha o `}` que fecha o `{` logo após o prefixo, andando caractere a
// caractere e respeitando os três tipos de string do JS (aspas
// simples/duplas e crase) — precisa dos três aqui porque esse arquivo,
// ao contrário dos do Internato, não é JSON.
function extractObjectLiteral(text, prefix) {
    const start = text.indexOf(prefix);
    if (start === -1) throw new Error(`Marcador de início não encontrado: ${prefix}`);
    let i = start + prefix.length;
    while (i < text.length && /\s/.test(text[i])) i++;
    if (text[i] !== '{') throw new Error(`Esperava '{' logo após o prefixo, achei '${text[i]}'`);

    const bodyStart = i;
    let depth = 0;
    let stringChar = null;
    for (; i < text.length; i++) {
        const ch = text[i];
        if (stringChar) {
            if (ch === '\\') { i++; continue; }
            if (ch === stringChar) stringChar = null;
            continue;
        }
        if (ch === '"' || ch === "'" || ch === '`') { stringChar = ch; continue; }
        if (ch === '{') depth++;
        else if (ch === '}') {
            depth--;
            if (depth === 0) { i++; break; }
        }
    }
    if (depth !== 0 || stringChar) throw new Error('Não achei o fechamento do objeto — arquivo truncado ou malformado?');

    return { before: text.slice(0, bodyStart), literal: text.slice(bodyStart, i), after: text.slice(i) };
}

function parseObjectLiteral(literal) {
    // eslint-disable-next-line no-new-func
    return new Function(`"use strict"; return (${literal});`)();
}

const ANNULLED_PREFIX = 'const annulledQuestionOverrides = new Set(';
const ANNULLED_SUFFIX_CHAR = ']'; // fecha o array; o `)` do Set vem logo depois

function extractArrayLiteral(text, prefix) {
    const start = text.indexOf(prefix);
    if (start === -1) throw new Error(`Marcador de início não encontrado: ${prefix}`);
    let i = start + prefix.length;
    while (i < text.length && /\s/.test(text[i])) i++;
    if (text[i] !== '[') throw new Error(`Esperava '[' logo após o prefixo, achei '${text[i]}'`);
    const bodyStart = i;
    let depth = 0;
    let stringChar = null;
    for (; i < text.length; i++) {
        const ch = text[i];
        if (stringChar) {
            if (ch === '\\') { i++; continue; }
            if (ch === stringChar) stringChar = null;
            continue;
        }
        if (ch === '"' || ch === "'" || ch === '`') { stringChar = ch; continue; }
        if (ch === '[') depth++;
        else if (ch === ANNULLED_SUFFIX_CHAR) {
            depth--;
            if (depth === 0) { i++; break; }
        }
    }
    if (depth !== 0) throw new Error('Não achei o fechamento do array — arquivo truncado ou malformado?');
    return { before: text.slice(0, bodyStart), literal: text.slice(bodyStart, i), after: text.slice(i) };
}

export function updatePrincipalAnnulled(questionId, annulled) {
    const text = fs.readFileSync(EXPLANATIONS_FILE, 'utf-8');
    const { before, literal, after } = extractArrayLiteral(text, ANNULLED_PREFIX);
    const ids = new Set(parseObjectLiteral(literal));
    if (annulled) ids.add(questionId); else ids.delete(questionId);
    fs.writeFileSync(EXPLANATIONS_FILE, before + JSON.stringify([...ids]) + after);
}

export function updatePrincipalExplanation(questionId, body) {
    const text = fs.readFileSync(EXPLANATIONS_FILE, 'utf-8');
    const { before, literal, after } = extractObjectLiteral(text, PREFIX);
    const explanations = parseObjectLiteral(literal);

    // questionId pode ser um alias (explanationAliases mapeia pro id
    // "canônico" que de fato guarda o texto) — editar o alias direto
    // criaria uma entrada nova e duplicada em vez de atualizar a
    // explicação que as duas questões já compartilham.
    let canonicalId = questionId;
    if (!(questionId in explanations)) {
        const aliasesLiteral = extractObjectLiteral(text, ALIASES_PREFIX).literal;
        const aliases = parseObjectLiteral(aliasesLiteral);
        if (aliases[questionId]) canonicalId = aliases[questionId];
    }
    if (!(canonicalId in explanations)) {
        throw new Error(`Questão ${questionId} não encontrada em question-explanations.js`);
    }

    explanations[canonicalId] = body;
    fs.writeFileSync(EXPLANATIONS_FILE, before + JSON.stringify(explanations) + after);
}
