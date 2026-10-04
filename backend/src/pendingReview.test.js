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
    const id = w.listPendingExplanations().find(x => x.startsWith('usp-sp-2024-'));
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
    const id = w.listPendingExplanations().filter(x => x.startsWith('usp-sp-2024-'))[1];
    const q = carregar(file, [{ id, answer: null, annulled: true, options: {}, stem: 'x' }]).TRYCKTRACK_QUESTION_BANK[0];
    assert.match(q.explanation, /^Questão anulada pela banca/);
    assert.doesNotMatch(q.explanation, /alternativa [A-E]/);

    w.approveExplanations([id]);
    const antes = w.listPendingExplanations().length;
    w.markExplanationsPending([id]);
    assert.equal(w.listPendingExplanations().length, antes + 1);
});

// Regressão (2026-10-03): o mecanismo escondeu 263 explicações antigas já revisadas, porque o
// Revalida reaproveita explicações do banco antigo por alias e o texto era marcado pelo alias.
test('banco real: só rascunhos novos (Revalida/USP) ficam pendentes; explicações antigas continuam visíveis', () => {
    const ctx = { window: {} };
    vm.createContext(ctx);
    for (const f of fs.readdirSync(ROOT).filter(f => /^questions-.*\.js$/.test(f) && f !== 'questions-internato.js')) {
        vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx);
    }
    vm.runInContext(fs.readFileSync(path.join(ROOT, 'question-explanations.js'), 'utf8'), ctx);
    const banco = ctx.window.TRYCKTRACK_QUESTION_BANK;
    const pendentes = banco.filter(q => q.explanationPending);
    const antigas = pendentes.filter(q => /^(cg|cm|prev|psi|pediatria|ginecologia|obstetricia)-/.test(q.id));
    assert.equal(antigas.length, 0, `explicação do banco antigo não pode ficar escondida: ${antigas.slice(0, 5).map(q => q.id).join(', ')}`);
    assert.ok(pendentes.every(q => /^(revalida|usp-sp)-/.test(q.id)), 'só Revalida e USP-SP têm rascunhos pendentes');
    // toda questão pendente mostra o aviso e preserva o rascunho
    assert.ok(pendentes.every(q => q.explanationDraft && /em revisão/.test(q.explanation)));
});
