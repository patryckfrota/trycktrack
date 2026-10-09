// Uso: node osce/build.mjs
// Valida o catálogo e todas as estações e gera osce/indice.json com as
// estações APROVADAS (é o que o app lê pra montar a lista). Falha, sem
// escrever nada, se houver qualquer problema de validação.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validarCatalogo, validarEstacao } from '../shared/osce-validar.js';
import { montarIndice } from '../shared/osce-indice.js';

const raiz = path.dirname(fileURLToPath(import.meta.url));
const catalogo = JSON.parse(fs.readFileSync(path.join(raiz, 'catalogo.json'), 'utf8'));
const pasta = path.join(raiz, 'estacoes');

const problemas = validarCatalogo(catalogo).map(msg => `catálogo: ${msg}`);
const estacoes = fs.readdirSync(pasta).filter(n => n.endsWith('.json')).sort().map(nome => {
    const estacao = JSON.parse(fs.readFileSync(path.join(pasta, nome), 'utf8'));
    validarEstacao(estacao, catalogo).forEach(msg => problemas.push(`${nome}: ${msg}`));
    return { nome, estacao };
});

if (problemas.length) {
    problemas.forEach(msg => console.error(`  - ${msg}`));
    console.error(`\nBuild abortado: ${problemas.length} problema(s).`);
    process.exit(1);
}

const pastaFichas = path.join(raiz, 'fichas');
const fichas = fs.existsSync(pastaFichas)
    ? fs.readdirSync(pastaFichas).filter(n => n.endsWith('.json')).sort().map(n => JSON.parse(fs.readFileSync(path.join(pastaFichas, n), 'utf8')))
    : [];
const indice = montarIndice(estacoes, fichas);
fs.writeFileSync(path.join(raiz, 'indice.json'), `${JSON.stringify(indice, null, 2)}\n`);
console.log(`indice.json: ${indice.estacoes.length} estação(ões) aprovada(s) de ${estacoes.length}; ${indice.fichas.length} ficha(s) publicada(s).`);
