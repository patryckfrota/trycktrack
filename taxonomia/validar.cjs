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

// Devolve a mensagem do problema, ou null se área → assunto → tópico →
// subtópico for um caminho real. Exportada pro pipeline/validar.cjs usar
// a mesma regra nos lotes novos antes de entrarem no banco.
function problemaTaxonomia(q) {
    const r = ROOTS[q.area];
    if (!r) return `área "${q.area}" sem árvore`;
    if (!q.assunto) return 'sem assunto';
    // some() e não find(): a árvore tem irmãos com nome repetido.
    const assuntos = r.children.filter(c => c.name === q.assunto);
    if (!assuntos.length) return `assunto inválido "${q.assunto}"`;
    const temFilhos = assuntos.some(a => a.children.length);
    if (!q.topico) return temFilhos ? 'falta tópico' : null;
    const topicos = assuntos.flatMap(a => a.children).filter(c => c.name === q.topico);
    if (!topicos.length) return `tópico inválido "${q.topico}"`;
    if (q.subtopico && !topicos.some(t => t.children.some(s => s.name === q.subtopico))) return `subtópico inválido "${q.subtopico}"`;
    return null;
}
module.exports = { problemaTaxonomia };

if (require.main === module) {
    global.window = {};
    for (const f of fs.readdirSync(root).filter(f => /^questions-.*\.js$/.test(f) && f !== 'questions-internato.js')) require(path.join(root, f));
    const erros = [];
    for (const q of window.TRYCKTRACK_QUESTION_BANK || []) {
        const p = problemaTaxonomia(q);
        if (p) erros.push(`${q.id}: ${p}`);
    }
    const total = (window.TRYCKTRACK_QUESTION_BANK || []).length;
    console.log(`${total} questões, ${erros.length} problema(s)`);
    erros.forEach(e => console.log('  - ' + e));
    process.exit(erros.length ? 1 : 0);
}
