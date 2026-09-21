/**
 * Lê OSCE_CURRICULUM_MATRIX direto de app-app.js (é uma const local
 * dentro do script do app, não window.*, então não dá pra `require()`
 * como os bancos de questão) — usado só pra auditoria (adminRoutes.js
 * /quality), nunca escreve nada aqui.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', '..');
const APP_FILE = path.join(ROOT, 'app-app.js');

const PREFIX = 'const OSCE_CURRICULUM_MATRIX = ';

export function getOsceCurriculumMatrix() {
    const text = fs.readFileSync(APP_FILE, 'utf-8');
    const start = text.indexOf(PREFIX);
    if (start === -1) throw new Error('OSCE_CURRICULUM_MATRIX não encontrada em app-app.js');
    let i = start + PREFIX.length;
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
        else if (ch === '[') depth++;
        else if (ch === ']') {
            depth--;
            if (depth === 0) { i++; break; }
        }
    }
    if (depth !== 0) throw new Error('Não achei o fechamento de OSCE_CURRICULUM_MATRIX');
    return JSON.parse(text.slice(bodyStart, i));
}
