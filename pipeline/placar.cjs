// Placar Gemini ⇄ Claude: soma os registros de pipeline/revisoes/ por
// agente (quem produziu o conteúdo) e por categoria de erro. Mostra onde
// cada um erra mais e se melhora com o tempo (evolução lote a lote).
//
//   node pipeline/placar.cjs
//
// Usado também pela rota /api/admin/placar do painel.
const fs = require('fs');
const path = require('path');
const { CATEGORIAS } = require('./validar.cjs');

const DIR = path.join(__dirname, 'revisoes');

function lerRevisoes() {
    if (!fs.existsSync(DIR)) return [];
    return fs.readdirSync(DIR).filter(f => f.endsWith('.json'))
        .map(f => JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8')))
        .sort((a, b) => a.data.localeCompare(b.data));
}

function calcularPlacar() {
    const agentes = {};
    for (const r of lerRevisoes()) {
        const a = agentes[r.autor] ||= { autor: r.autor, lotes: 0, itens: 0, reprovados: 0, porCategoria: {}, evolucao: [] };
        a.lotes++;
        a.itens += r.itens;
        a.reprovados += r.reprovados;
        for (const [cat, n] of Object.entries(r.porCategoria || {})) a.porCategoria[cat] = (a.porCategoria[cat] || 0) + n;
        a.evolucao.push({ data: r.data, lote: r.lote, revisor: r.revisor, itens: r.itens, taxaReprovacao: r.itens ? r.reprovados / r.itens : 0 });
    }
    for (const a of Object.values(agentes)) {
        a.taxaReprovacao = a.itens ? a.reprovados / a.itens : 0;
        // Fração dos itens com pelo menos um erro daquela categoria.
        a.categorias = Object.entries(a.porCategoria)
            .map(([cat, n]) => ({ cat, nome: CATEGORIAS[cat] || cat, itens: n, taxa: a.itens ? n / a.itens : 0 }))
            .sort((x, y) => y.itens - x.itens);
        delete a.porCategoria;
    }
    return { geradoEm: new Date().toISOString(), agentes: Object.values(agentes) };
}

module.exports = { calcularPlacar };

if (require.main === module) {
    const pct = x => `${Math.round(x * 100)}%`;
    const { agentes } = calcularPlacar();
    if (!agentes.length) { console.log('Nenhuma revisão registrada ainda.'); process.exit(0); }
    for (const a of agentes) {
        console.log(`\n${a.autor.toUpperCase()} — ${a.lotes} lote(s), ${a.itens} questões, ${pct(a.taxaReprovacao)} reprovadas`);
        a.categorias.forEach(c => console.log(`   ${c.nome.padEnd(14)} ${String(c.itens).padStart(4)} questões (${pct(c.taxa)})`));
        console.log(`   evolução: ${a.evolucao.map(e => pct(e.taxaReprovacao)).join(' → ')}`);
    }
}
