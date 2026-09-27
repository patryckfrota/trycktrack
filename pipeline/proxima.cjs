// Fila da ingestão automática: decide qual banca/ano o motor processa hoje
// e registra o progresso, pra a prova seguir de onde parou no dia seguinte
// (a camada gratuita do Gemini limita quantas questões cabem por dia).
//
//   node pipeline/proxima.cjs
//       → imprime o trabalho de hoje em JSON ({ banca, ano, url, prefixo,
//         inicio, limite }) ou "null" se não houver nada com fonte.
//   node pipeline/proxima.cjs avancar <questoes processadas>
//       → soma ao progresso; se vieram menos que o limite, a prova acabou
//         e vai pra concluídas.
//
// Ordem: bancas na ordem de pipeline/fontes.json (mais inscritos primeiro),
// e dentro de cada banca do ano mais recente pro mais antigo.
const fs = require('fs');
const path = require('path');

const FONTES = path.join(__dirname, 'fontes.json');
const ESTADO = path.join(__dirname, 'estado.json');
const LIMITE = Number(process.env.QUESTOES_POR_DIA || 250);

const ler = (f, padrao) => (fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : padrao);
const gravar = (f, dados) => fs.writeFileSync(f, JSON.stringify(dados, null, 2) + '\n');
const chave = (banca, ano) => `${banca}-${ano}`;

function estadoInicial() {
    return { emAndamento: null, concluidas: [], semFonte: [] };
}

function proximo() {
    const fontes = ler(FONTES, { bancas: [], anos_alvo: [] });
    const estado = ler(ESTADO, estadoInicial());

    if (estado.emAndamento) return { trabalho: { ...estado.emAndamento, limite: LIMITE }, estado };

    const feitas = new Set(estado.concluidas.map(c => chave(c.banca, c.ano)));
    const semFonte = new Set(estado.semFonte.map(c => chave(c.banca, c.ano)));
    const anos = [...fontes.anos_alvo].sort((a, b) => b - a);

    for (const b of fontes.bancas) {
        for (const ano of anos) {
            const k = chave(b.id, ano);
            if (feitas.has(k)) continue;
            const url = (b.paginas || {})[ano];
            if (!url) {
                if (!semFonte.has(k)) { estado.semFonte.push({ banca: b.id, ano, desde: new Date().toISOString().slice(0, 10) }); semFonte.add(k); }
                continue;
            }
            estado.semFonte = estado.semFonte.filter(c => chave(c.banca, c.ano) !== k);
            estado.emAndamento = { banca: b.id, ano, url, prefixo: k, inicio: 1 };
            return { trabalho: { ...estado.emAndamento, limite: LIMITE }, estado };
        }
    }
    return { trabalho: null, estado };
}

function avancar(processadas, concluida) {
    const estado = ler(ESTADO, estadoInicial());
    const atual = estado.emAndamento;
    if (!atual) return estado;

    // Só marca como concluída se o motor tiver confirmado que alcançou o fim real do caderno
    // E que nenhum sub-lote falhou. Nunca mais conclui apenas por processadas < LIMITE.
    const isConcluida = (concluida === true || concluida === 'true');

    if (isConcluida) {
        estado.concluidas.push({
            banca: atual.banca,
            ano: atual.ano,
            questoes: atual.inicio - 1 + processadas,
            data: new Date().toISOString().slice(0, 10)
        });
        estado.emAndamento = null;
    } else {
        atual.inicio += processadas;
    }
    return estado;
}

if (require.main === module) {
    const [cmd, n, concluida] = process.argv.slice(2);
    if (cmd === 'avancar') {
        gravar(ESTADO, avancar(Number(n) || 0, concluida));
    } else {
        const { trabalho, estado } = proximo();
        gravar(ESTADO, estado);
        process.stdout.write(JSON.stringify(trabalho));
    }
}

module.exports = { proximo, avancar };
