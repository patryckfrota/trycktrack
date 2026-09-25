// Confere se toda questão do banco principal tem assunto (obrigatório) e
// se área → assunto → tópico → subtópico é um caminho real da árvore do
// Estratégia MED salva nesta pasta. Rodar antes de qualquer importação:
//   node taxonomia/validar.cjs
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const tree = name => JSON.parse(fs.readFileSync(path.join(__dirname, name + '.json'), 'utf-8'));
const child = (node, name) => node.children.find(c => c.name.trim() === name);

const cm = tree('clinica-medica');
const outros = tree('outros');
const ROOTS = {
    'Cirurgia Geral': tree('cirurgia'),
    'Medicina Preventiva': tree('medicina-preventiva'),
    'Pediatria': tree('pediatria'),
    'Ginecologia': tree('ginecologia'),
    'Obstetrícia': tree('obstetricia'),
};
for (const a of ['Cardiologia', 'Dermatologia', 'Endocrinologia', 'Gastroenterologia', 'Hematologia', 'Hepatologia', 'Infectologia', 'Nefrologia', 'Neurologia', 'Pneumologia', 'Reumatologia']) ROOTS[a] = child(cm, a);
for (const a of ['Oftalmologia', 'Otorrinolaringologia', 'Psiquiatria', 'Ortopedia']) ROOTS[a] = child(outros, a);

global.window = {};
for (const f of fs.readdirSync(root).filter(f => /^questions-.*\.js$/.test(f) && f !== 'questions-internato.js')) require(path.join(root, f));

const erros = [];
for (const q of window.TRYCKTRACK_QUESTION_BANK || []) {
    const r = ROOTS[q.area];
    if (!r) { erros.push(`${q.id}: área "${q.area}" sem árvore`); continue; }
    if (!q.assunto) { erros.push(`${q.id}: sem assunto`); continue; }
    // some() e não find(): a árvore tem irmãos com nome repetido.
    const assuntos = r.children.filter(c => c.name === q.assunto);
    if (!assuntos.length) { erros.push(`${q.id}: assunto inválido "${q.assunto}"`); continue; }
    const temFilhos = assuntos.some(a => a.children.length);
    if (!q.topico) { if (temFilhos) erros.push(`${q.id}: falta tópico`); continue; }
    const topicos = assuntos.flatMap(a => a.children).filter(c => c.name === q.topico);
    if (!topicos.length) { erros.push(`${q.id}: tópico inválido "${q.topico}"`); continue; }
    if (q.subtopico && !topicos.some(t => t.children.some(s => s.name === q.subtopico))) erros.push(`${q.id}: subtópico inválido "${q.subtopico}"`);
}

const total = (window.TRYCKTRACK_QUESTION_BANK || []).length;
console.log(`${total} questões, ${erros.length} problema(s)`);
erros.forEach(e => console.log('  - ' + e));
process.exit(erros.length ? 1 : 0);
