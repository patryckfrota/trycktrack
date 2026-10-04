import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

// Trabalha numa cópia: o writer lê o caminho de TRYCKTRACK_EXPLANATIONS_FILE.
function copiaTemporaria() {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'pend-'));
    const file = path.join(dir, 'question-explanations.js');
    fs.copyFileSync(path.join(ROOT, 'question-explanations.js'), file);
    process.env.TRYCKTRACK_EXPLANATIONS_FILE = file;
    return file;
}

function carregar(file, banco) {
    const ctx = { window: { TRYCKTRACK_QUESTION_BANK: banco } };
    vm.createContext(ctx);
    vm.runInContext(fs.readFileSync(file, 'utf8'), ctx);
    return ctx.window;
}

test('pendente mostra só o gabarito, preserva o rascunho; aprovar libera o texto', async () => {
    const file = copiaTemporaria();
    const w = await import('./staticPrincipalWriter.js');
    const id = w.listPendingExplanations()[0];
    const banco = () => [{ id, answer: 'C', annulled: false, options: {}, stem: 'x' }];

    let q = carregar(file, banco()).TRYCKTRACK_QUESTION_BANK[0];
    assert.equal(q.explanationPending, true);
    assert.match(q.explanation, /Gabarito oficial: alternativa C/);
    assert.match(q.explanation, /em revisão/);
    assert.ok(q.explanationDraft && q.explanationDraft.includes('NÚCLEO DA QUESTÃO'), 'o rascunho real continua acessível');

    w.approveExplanations([id]);
    q = carregar(file, banco()).TRYCKTRACK_QUESTION_BANK[0];
    assert.equal(q.explanationPending, undefined);
    assert.ok(q.explanation.includes('NÚCLEO DA QUESTÃO'), 'depois de aprovada o texto aparece');
});

test('anulada pendente não mostra letra; markExplanationsPending volta a esconder', async () => {
    const file = copiaTemporaria();
    const w = await import('./staticPrincipalWriter.js');
    const id = w.listPendingExplanations()[1];
    const q = carregar(file, [{ id, answer: null, annulled: true, options: {}, stem: 'x' }]).TRYCKTRACK_QUESTION_BANK[0];
    assert.match(q.explanation, /^Questão anulada pela banca/);
    assert.doesNotMatch(q.explanation, /alternativa [A-E]/);

    w.approveExplanations([id]);
    const antes = w.listPendingExplanations().length;
    w.markExplanationsPending([id]);
    assert.equal(w.listPendingExplanations().length, antes + 1);
});
