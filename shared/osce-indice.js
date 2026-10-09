/**
 * Monta o índice leve de estações (o que o app carrega pra listar) a
 * partir das estações completas. Só entram as APROVADAS: rascunho e
 * revisada nunca chegam ao aluno. Função pura, usada por osce/build.mjs
 * e coberta por teste.
 */
export function montarIndice(estacoes, fichas = []) {
    return {
        versao: 1,
        // temas para os quais o app oferece "gerar estação com IA" (só fichas publicadas)
        fichas: fichas.filter(f => f.status === 'PUBLICADA').map(f => f.id),
        estacoes: estacoes
            .filter(({ estacao }) => estacao.status === 'APROVADA')
            .map(({ nome, estacao }) => ({
                id: estacao.id,
                arquivo: `osce/estacoes/${nome}`,
                titulo: estacao.titulo,
                area: estacao.classificacao.revalidaArea,
                rodizio: estacao.classificacao.internato.rodizio,
                topico: estacao.classificacao.internato.topico,
                temaSlug: estacao.classificacao.internato.temaSlug,
                nivelAtencao: estacao.cenario.nivelAtencao,
                tempoMinutos: estacao.tempoMinutos,
                dificuldade: estacao.dificuldade || null
            }))
    };
}

const normalizar = texto => String(texto || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const campoDaVisao = visao => (visao === 'internato' ? 'rodizio' : 'area');

// Grupos (chips) disponíveis na visão escolhida, com a quantidade de
// estações de cada um. Só aparecem grupos que têm estação: o aluno nunca
// cai numa combinação vazia.
export function gruposDoIndice(estacoes, visao) {
    const campo = campoDaVisao(visao);
    const contagem = new Map();
    for (const e of estacoes) contagem.set(e[campo], (contagem.get(e[campo]) || 0) + 1);
    return [...contagem].map(([slug, quantidade]) => ({ slug, quantidade }));
}

export function filtrarIndice(estacoes, { visao = 'revalida', grupo = null, topico = null, tema = null, busca = '', soNaoFeitas = false, jaFeitas = new Set() } = {}) {
    const campo = campoDaVisao(visao);
    const termos = normalizar(busca).split(/\s+/).filter(Boolean);
    return estacoes.filter(e => {
        if (grupo && e[campo] !== grupo) return false;
        if (visao === 'internato') {
            if (topico && e.topico !== topico) return false;
            if (tema && e.temaSlug !== tema) return false;
        }
        if (soNaoFeitas && jaFeitas.has(e.id)) return false;
        const alvo = normalizar(`${e.titulo} ${e.nivelAtencao}`);
        return termos.every(t => alvo.includes(t));
    });
}

// Prefere estação que o aluno ainda não fez; se já fez todas, sorteia entre todas.
export function sortearEstacao(estacoes, jaFeitas = new Set(), aleatorio = Math.random) {
    if (!estacoes.length) return null;
    const novas = estacoes.filter(e => !jaFeitas.has(e.id));
    const pool = novas.length ? novas : estacoes;
    return pool[Math.min(pool.length - 1, Math.floor(aleatorio() * pool.length))];
}

// Temas da matriz do Internato para uma rotação (e, opcionalmente, um tópico),
// com quantas estações cada um já tem. Os temas sem estação continuam na
// lista: são o mapa do que ainda falta produzir.
export function temasDoRodizio(estacoes, matriz, rodizio, topico = null) {
    const area = (matriz || []).find(a => a.slug === rodizio);
    if (!area) return [];
    const lista = [];
    for (const t of area.themes) {
        if (topico && t.code !== topico) continue;
        for (const sub of t.subthemes) {
            const quantidade = estacoes.filter(e => e.rodizio === rodizio && e.topico === t.code && e.temaSlug === sub.slug).length;
            lista.push({ slug: sub.slug, nome: sub.name, topico: t.code, quantidade });
        }
    }
    return lista;
}

// Rotações do Internato (mesmos slugs e nomes da matriz do app) e áreas do
// Revalida, na ordem e com as siglas que o catálogo mostra. Todas aparecem
// sempre, mesmo sem estação, pra o aluno ver o mapa completo.
export const ROTACOES_INTERNATO = [
    { slug: 'urgencia-e-emergencia-saude-mental', sigla: 'UE', nome: 'Urgência e Emergência / Saúde Mental' },
    { slug: 'atencao-primaria-a-saude', sigla: 'PREV', nome: 'Atenção Primária à Saúde' },
    { slug: 'pediatria', sigla: 'PED', nome: 'Pediatria' },
    { slug: 'ginecologia-e-obstetricia', sigla: 'GO', nome: 'Ginecologia e Obstetrícia' },
    { slug: 'cirurgia', sigla: 'CG', nome: 'Cirurgia' },
    { slug: 'clinica-medica', sigla: 'CM', nome: 'Clínica Médica' }
];
export const AREAS_REVALIDA = [
    { slug: 'clinica-medica', sigla: 'CM', nome: 'Clínica Médica' },
    { slug: 'cirurgia', sigla: 'CG', nome: 'Cirurgia' },
    { slug: 'ginecologia-obstetricia', sigla: 'GO', nome: 'Ginecologia e Obstetrícia' },
    { slug: 'pediatria', sigla: 'PED', nome: 'Pediatria' },
    { slug: 'medicina-familia-comunidade', sigla: 'MFC', nome: 'Medicina de Família e Comunidade' }
];

export function gruposVisiveis(estacoes, visao) {
    const base = visao === 'internato' ? ROTACOES_INTERNATO : AREAS_REVALIDA;
    const campo = campoDaVisao(visao);
    return base.map(g => ({ ...g, quantidade: estacoes.filter(e => e[campo] === g.slug).length }));
}
