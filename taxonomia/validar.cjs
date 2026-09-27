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

function ajudaTaxonomia(q) {
    const norm = s => (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
    const r = ROOTS[q.area];

    if (!r) {
        const areaNorm = norm(q.area);
        const areaMatch = Object.keys(ROOTS).find(k => norm(k) === areaNorm);
        if (areaMatch) {
            return `A área correta é "${areaMatch}". Use este nome exato.`;
        }
        return `Área "${q.area}" é inválida. As 20 especialidades válidas são: ${Object.keys(ROOTS).join(', ')}`;
    }

    const targetAssunto = norm(q.assunto);
    const targetTopico = norm(q.topico);

    // 1. Checa se o "assunto" fornecido é na verdade um tópico de algum assunto na área
    for (const a of r.children) {
        for (const t of a.children) {
            const tNorm = norm(t.name);
            if (tNorm === targetAssunto || (targetAssunto.length > 4 && (tNorm.includes(targetAssunto) || targetAssunto.includes(tNorm)))) {
                return `O termo "${q.assunto}" é um TÓPICO, não um assunto. Use o caminho exato:\n  area: "${q.area}"\n  assunto: "${a.name}"\n  topico: "${t.name}"`;
            }
        }
    }

    // 2. Se o assunto for válido, orienta sobre tópicos
    const assuntos = r.children.filter(c => c.name === q.assunto);
    if (assuntos.length > 0) {
        const topicos = assuntos.flatMap(a => a.children).map(c => c.name);
        if (topicos.length > 0) {
            return `O assunto "${q.assunto}" é válido. Escolha um destes tópicos exatos:\n  ${topicos.slice(0, 15).join(', ')}`;
        }
        return `O assunto "${q.assunto}" é válido e não possui tópicos filhos. Deixe 'topico' como null.`;
    }

    // 3. Checa se o assunto foi escrito com variação de caixa/espaço/acentuação
    const assuntoFlex = r.children.find(a => norm(a.name) === targetAssunto);
    if (assuntoFlex) {
        return `O assunto correto é "${assuntoFlex.name}". Use a grafia exata com maiúsculas/minúsculas.`;
    }

    // 4. Se não achou na área, busca se existe em outra especialidade
    for (const [outraArea, rootNode] of Object.entries(ROOTS)) {
        if (outraArea === q.area) continue;
        for (const a of rootNode.children) {
            if (norm(a.name) === targetAssunto) {
                return `O assunto "${a.name}" pertence à área "${outraArea}", não a "${q.area}". Use area: "${outraArea}", assunto: "${a.name}".`;
            }
            for (const t of a.children) {
                if (norm(t.name) === targetAssunto) {
                    return `O termo "${q.assunto}" é um tópico de "${outraArea}". Use area: "${outraArea}", assunto: "${a.name}", topico: "${t.name}".`;
                }
            }
        }
    }

    // 5. Lista assuntos válidos da área informada
    const listaAssuntos = r.children.map(c => c.name);
    return `Assunto "${q.assunto}" não existe na árvore de ${q.area}.\nAssuntos válidos em ${q.area}:\n  - ${listaAssuntos.join('\n  - ')}`;
}

module.exports = { problemaTaxonomia, ajudaTaxonomia, ROOTS };

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
