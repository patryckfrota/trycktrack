// Uso: node osce/validar.mjs   (valida o catálogo e todas as estações em osce/estacoes/)
// Sai com código 1 se houver qualquer problema.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validarCatalogo, validarEstacao } from '../shared/osce-validar.js';

const raiz = path.dirname(fileURLToPath(import.meta.url));
const catalogo = JSON.parse(fs.readFileSync(path.join(raiz, 'catalogo.json'), 'utf8'));

let total = 0;
const problemasCatalogo = validarCatalogo(catalogo);
problemasCatalogo.forEach(msg => console.log(`  catálogo: ${msg}`));
total += problemasCatalogo.length;

const pasta = path.join(raiz, 'estacoes');
const arquivos = fs.readdirSync(pasta).filter(nome => nome.endsWith('.json')).sort();
for (const nome of arquivos) {
    const problemas = validarEstacao(JSON.parse(fs.readFileSync(path.join(pasta, nome), 'utf8')), catalogo);
    console.log(`${problemas.length ? 'FALHA' : 'ok   '} ${nome}`);
    problemas.forEach(msg => console.log(`  - ${msg}`));
    total += problemas.length;
}
console.log(`\n${arquivos.length} estação(ões), ${total} problema(s).`);
process.exit(total ? 1 : 0);
