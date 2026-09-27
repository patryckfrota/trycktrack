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
    const areaTrimmed = (q.area || '').trim();
    const r = ROOTS[areaTrimmed];
    if (!r) return `área "${q.area}" sem árvore`;
    if (!q.assunto) return 'sem assunto';
    const assuntoTrimmed = q.assunto.trim();
    // some() e não find(): a árvore tem irmãos com nome repetido.
    const assuntos = r.children.filter(c => c.name.trim() === assuntoTrimmed);
    if (!assuntos.length) return `assunto inválido "${q.assunto}"`;
    const temFilhos = assuntos.some(a => a.children.length);
    if (!q.topico) return temFilhos ? 'falta tópico' : null;
    const topicoTrimmed = q.topico.trim();
    const topicos = assuntos.flatMap(a => a.children).filter(c => c.name.trim() === topicoTrimmed);
    if (!topicos.length) return `tópico inválido "${q.topico}"`;
    if (q.subtopico) {
        const subtopicoTrimmed = q.subtopico.trim();
        if (!topicos.some(t => t.children.some(s => s.name.trim() === subtopicoTrimmed))) return `subtópico inválido "${q.subtopico}"`;
    }
    return null;
}

function ajudaTaxonomia(q) {
    const norm = s => (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
    const targetAssunto = norm(q.assunto);
    const targetTopico = norm(q.topico);

    // Dicionário de atalhos determinísticos para termos e síndromes frequentes
    const ATALHOS = [
        { terms: ['poems'], area: 'Hematologia', assunto: 'Gamopatias monoclonais', topico: 'Classificação das gamopatias monoclonais' },
        { terms: ['lupus', 'les'], area: 'Reumatologia', assunto: 'Doenças autoimunes do tecido conjuntivo', topico: 'Lúpus Eritematoso Sistêmico (LES)' },
        { terms: ['evans'], area: 'Hematologia', assunto: 'Anemias hemolíticas', topico: 'Anemias hemolíticas autoimunes (AHAI)' },
        { terms: ['anemia megaloblastica', 'megaloblastica'], area: 'Hematologia', assunto: 'Anemias macrocíticas', topico: 'Anemia megaloblástica' },
        { terms: ['litiase', 'nefrolitiase', 'calculo renal', 'colica nefretica'], area: 'Nefrologia', assunto: 'Nefrolitíase', topico: 'Apresentação clínica' },
        { terms: ['lombalgia', 'coluna vertebral', 'dor lombar'], area: 'Ortopedia', assunto: 'Ortopedia Geral', topico: 'Doenças da coluna vertebral' },
        { terms: ['intersticial', 'intersticiais', 'fibrose pulmonar', 'poc'], area: 'Pneumologia', assunto: 'Pneumopatias Intersticiais, Hipertensão Pulmonar, Bronquiectasias e Pneumotórax Espontâneo', topico: 'Pneumopatias Intersticiais' },
        { terms: ['esofagite', 'esofago'], area: 'Gastroenterologia', assunto: 'Esôfago', topico: 'Esofagites Não Pépticas' },
    ];

    for (const atalho of ATALHOS) {
        if (atalho.terms.some(t => targetAssunto.includes(t) || targetTopico.includes(t))) {
            return `Use o caminho exato oficial:\n  area: "${atalho.area}"\n  assunto: "${atalho.assunto}"\n  topico: "${atalho.topico}"`;
        }
    }

    const areaTrimmed = (q.area || '').trim();
    const r = ROOTS[areaTrimmed];
    const PALAVRAS_GENERICAS = new Set(['manejo', 'tratamento', 'diagnostico', 'introducao', 'classificacao', 'quadro clinico', 'fisiopatologia', 'prevencao', 'rastreamento', 'conduta', 'exames', 'prognostico', 'geral', 'outros', 'definicao']);

    if (!r) {
        // Se a área for genérica ("Clínica Médica") ou inválida, busca em TODAS as 20 especialidades
        for (const [outraArea, rootNode] of Object.entries(ROOTS)) {
            for (const a of rootNode.children) {
                const aNorm = norm(a.name);
                if (aNorm === targetAssunto || (targetAssunto.length > 4 && (aNorm.includes(targetAssunto) || targetAssunto.includes(aNorm)))) {
                    const topicos = a.children.map(c => c.name.trim());
                    return `A área correta é "${outraArea}". Use o caminho exato:\n  area: "${outraArea}"\n  assunto: "${a.name.trim()}"\n  topico: ${topicos[0] ? `"${topicos[0]}"` : 'null'}`;
                }
                for (const t of a.children) {
                    const tNorm = norm(t.name);
                    if (PALAVRAS_GENERICAS.has(tNorm) || PALAVRAS_GENERICAS.has(targetTopico)) continue;
                    if (tNorm === targetAssunto || tNorm === targetTopico || (targetTopico.length > 4 && (tNorm.includes(targetTopico) || targetTopico.includes(tNorm)))) {
                        return `A área correta é "${outraArea}". Use o caminho exato:\n  area: "${outraArea}"\n  assunto: "${a.name.trim()}"\n  topico: "${t.name.trim()}"`;
                    }
                }
            }
        }

        const areaNorm = norm(q.area);
        const areaMatch = Object.keys(ROOTS).find(k => norm(k) === areaNorm);
        if (areaMatch) {
            return `A área correta é "${areaMatch}". Use este nome exato.`;
        }
        return `Área "${q.area}" é inválida. As 20 especialidades válidas são: ${Object.keys(ROOTS).join(', ')}`;
    }

    // 1. Checa se o "assunto" fornecido é na verdade um tópico de algum assunto na área
    for (const a of r.children) {
        for (const t of a.children) {
            const tNorm = norm(t.name);
            if (tNorm === targetAssunto || (targetAssunto.length > 4 && (tNorm.includes(targetAssunto) || targetAssunto.includes(tNorm)))) {
                return `O termo "${q.assunto}" é um TÓPICO, não um assunto. Use o caminho exato:\n  area: "${areaTrimmed}"\n  assunto: "${a.name.trim()}"\n  topico: "${t.name.trim()}"`;
            }
        }
    }

    // 2. Se o assunto for válido (com trim), orienta sobre tópicos
    const assuntos = r.children.filter(c => c.name.trim() === (q.assunto || '').trim());
    if (assuntos.length > 0) {
        const topicos = assuntos.flatMap(a => a.children).map(c => c.name.trim());
        if (topicos.length > 0) {
            return `O assunto "${q.assunto.trim()}" é válido. Escolha um destes tópicos exatos:\n  ${topicos.slice(0, 15).join(', ')}`;
        }
        return `O assunto "${q.assunto.trim()}" é válido e não possui tópicos filhos. Deixe 'topico' como null.`;
    }

    // 3. Checa se o assunto foi escrito com variação ou substring na mesma área
    for (const a of r.children) {
        const aNorm = norm(a.name);
        if (aNorm === targetAssunto || (targetAssunto.length >= 4 && (targetAssunto.includes(aNorm) || aNorm.includes(targetAssunto)))) {
            const topicoMatch = a.children.find(c => norm(c.name) === targetTopico || (targetTopico.length >= 4 && (norm(c.name).includes(targetTopico) || targetTopico.includes(norm(c.name)))));
            const topicoNome = topicoMatch ? topicoMatch.name.trim() : (a.children[0] ? a.children[0].name.trim() : null);
            return `Use o caminho exato oficial:\n  area: "${areaTrimmed}"\n  assunto: "${a.name.trim()}"\n  topico: ${topicoNome ? `"${topicoNome}"` : 'null'}`;
        }
    }

    // 4. Se não achou na área, busca se existe em outra especialidade
    for (const [outraArea, rootNode] of Object.entries(ROOTS)) {
        if (outraArea === areaTrimmed) continue;
        for (const a of rootNode.children) {
            if (norm(a.name) === targetAssunto) {
                return `O assunto "${a.name.trim()}" pertence à área "${outraArea}", não a "${q.area}". Use area: "${outraArea}", assunto: "${a.name.trim()}".`;
            }
            for (const t of a.children) {
                const tNorm = norm(t.name);
                if (PALAVRAS_GENERICAS.has(tNorm) || PALAVRAS_GENERICAS.has(targetTopico)) continue;
                if (tNorm === targetAssunto || tNorm === targetTopico) {
                    return `O termo "${q.assunto || q.topico}" é um tópico de "${outraArea}". Use area: "${outraArea}", assunto: "${a.name.trim()}", topico: "${t.name.trim()}".`;
                }
            }
        }
    }

    // 5. Lista assuntos válidos da área informada
    const listaAssuntos = r.children.map(c => c.name.trim());
    return `Assunto "${q.assunto}" não existe na árvore de ${areaTrimmed}.\nAssuntos válidos em ${areaTrimmed}:\n  - ${listaAssuntos.join('\n  - ')}`;
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
