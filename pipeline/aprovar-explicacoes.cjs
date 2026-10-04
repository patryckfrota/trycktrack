// Gerencia a lista de explicações pendentes de revisão clínica
// (pendingReviewIds em question-explanations.js).
//
//   node pipeline/aprovar-explicacoes.cjs --listar           → quantas pendentes, por prova
//   node pipeline/aprovar-explicacoes.cjs <id|prefixo> ...   → APROVA (libera no app)
//   node pipeline/aprovar-explicacoes.cjs --pendente <id|prefixo> ... → volta para pendente
//
// Só aprove depois da revisão clínica independente (PROCESSO-INGESTAO.md, E9).
// Prefixo: "usp-sp-2024-" aprova todas as que começam assim.
const path = require('path');

(async () => {
    const w = await import(path.join(__dirname, '..', 'backend', 'src', 'staticPrincipalWriter.js'));
    const args = process.argv.slice(2);
    const pendentes = w.listPendingExplanations();
    if (!args.length || args[0] === '--listar') {
        const por = {};
        pendentes.forEach(id => { const k = id.replace(/-\d+$/, ''); por[k] = (por[k] || 0) + 1; });
        const aliases = w.listExplanationAliases();
        const atrasDeAlias = pendentes.filter(id => aliases[id]).length;
        console.log(`${pendentes.length} ids pendentes; ${pendentes.length - atrasDeAlias} aparecem de fato no app (${atrasDeAlias} estão atrás de alias: o app mostra a explicação do id canônico, que já foi revisada):`);
        Object.entries(por).sort((a, b) => b[1] - a[1]).forEach(([k, n]) => console.log(`  ${String(n).padStart(4)}  ${k}`));
        return;
    }
    const reverter = args[0] === '--pendente';
    const alvos = reverter ? args.slice(1) : args;
    const casa = id => alvos.some(a => id === a || (a.endsWith('-') && id.startsWith(a)));
    if (reverter) {
        console.error('Para marcar como pendente informe ids completos (use markExplanationsPending).');
        const ids = alvos.filter(a => !a.endsWith('-'));
        console.log(`pendentes agora: ${w.markExplanationsPending(ids)}`);
    } else {
        const ids = pendentes.filter(casa);
        console.log(`aprovando ${ids.length} explicações...`);
        console.log(`pendentes agora: ${w.approveExplanations(ids)}`);
    }
})();
