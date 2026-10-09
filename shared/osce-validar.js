/**
 * Validador de estações OSCE v2. Devolve a lista de problemas (vazia =
 * estação válida). É o que impede estação curta ou fora do modelo do
 * Revalida de chegar ao aluno: tamanho do PEP, soma de pontos, ações
 * inexistentes, exame cobrado sem impresso, título que entrega o
 * diagnóstico — e prova que a nota máxima é alcançável.
 *
 * Regras e motivos: osce/MODELO-ESTACAO.md.
 */
import { pontuarEstacao, simularRunPerfeito } from './osce-pep.js';

const AREAS_REVALIDA = ['clinica-medica', 'cirurgia', 'ginecologia-obstetricia', 'pediatria', 'medicina-familia-comunidade'];
const STATUS = ['RASCUNHO', 'GERADA', 'REVISADA', 'APROVADA'];
const norm = texto => String(texto || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

export function indexarCatalogo(catalogo) {
    const porId = new Map();
    for (const [prefixo, categoria] of Object.entries(catalogo.categorias)) {
        for (const item of categoria.itens) porId.set(item.id, { ...item, prefixo });
    }
    return porId;
}

export function validarCatalogo(catalogo) {
    const problemas = [];
    const vistos = new Set();
    for (const [prefixo, categoria] of Object.entries(catalogo.categorias)) {
        for (const item of categoria.itens) {
            if (!item.id.startsWith(`${prefixo}.`)) problemas.push(`catálogo: "${item.id}" não começa com "${prefixo}."`);
            if (vistos.has(item.id)) problemas.push(`catálogo: id duplicado "${item.id}"`);
            vistos.add(item.id);
            if (!item.rotulo) problemas.push(`catálogo: "${item.id}" sem rótulo`);
        }
    }
    for (const [prefixo, categoria] of Object.entries(catalogo.categorias)) {
        for (const item of categoria.itens) {
            if (item.requer && !vistos.has(item.requer)) problemas.push(`catálogo: "${item.id}" requer "${item.requer}" que não existe`);
        }
    }
    return problemas;
}

export function validarEstacao(estacao, catalogo) {
    const p = [];
    const erro = msg => p.push(msg);
    const cat = indexarCatalogo(catalogo);
    const existe = (id, prefixo) => cat.has(id) && (!prefixo || cat.get(id).prefixo === prefixo);

    if (estacao.schemaVersion !== '2.0.0') erro('schemaVersion deve ser "2.0.0"');
    if (!estacao.id) erro('falta "id"');
    if (!STATUS.includes(estacao.status)) erro(`status deve ser um de ${STATUS.join(', ')}`);
    if (!estacao.titulo) erro('falta "titulo"');
    if (estacao.tempoMinutos !== 10) erro('tempoMinutos deve ser 10 (padrão do Revalida)');

    const c = estacao.classificacao || {};
    if (!AREAS_REVALIDA.includes(c.revalidaArea)) erro(`classificacao.revalidaArea deve ser um de ${AREAS_REVALIDA.join(', ')}`);
    if (!c.internato?.rodizio || !c.internato?.topico || !c.internato?.temaSlug) erro('classificacao.internato precisa de rodizio, topico e temaSlug');

    if (!estacao.cenario?.nivelAtencao || !estacao.cenario?.descricao) erro('cenario precisa de nivelAtencao e descricao');
    const descricao = estacao.caso?.descricao || '';
    if (descricao.length < 40 || descricao.length > 700) erro('caso.descricao deve ter entre 40 e 700 caracteres');
    const tarefas = estacao.caso?.tarefas || [];
    if (tarefas.length < 3 || tarefas.length > 6) erro('caso.tarefas deve ter de 3 a 6 tarefas');

    const termos = estacao.termosProibidosNoTitulo || [];
    if (!termos.length) erro('termosProibidosNoTitulo deve listar os termos que entregariam o diagnóstico');
    for (const termo of termos) {
        const alvo = norm(`${estacao.titulo} ${descricao} ${tarefas.join(' ')}`);
        if (alvo.includes(norm(termo))) erro(`título/descrição/tarefas entregam o diagnóstico (contém "${termo}")`);
    }

    // paciente
    const pac = estacao.paciente || {};
    if (!pac.nome || !pac.abertura) erro('paciente precisa de nome e abertura');
    if (!pac.padrao?.anamnese || !pac.padrao?.exameFisico) erro('paciente.padrao precisa de anamnese e exameFisico');
    const acoesAnamnese = new Set();
    for (const r of pac.respostas || []) {
        if (!r.fala) erro(`resposta "${r.id}" sem fala`);
        for (const a of r.acoes || []) {
            if (!existe(a)) erro(`resposta "${r.id}": ação inexistente "${a}"`);
            acoesAnamnese.add(a);
        }
    }
    const acoesExame = new Set();
    for (const e of estacao.exameFisico || []) {
        if (!e.achado) erro(`exameFisico "${e.id}" sem achado`);
        for (const a of e.acoes || []) {
            if (!existe(a, 'ef')) erro(`exameFisico "${e.id}": ação inexistente ou fora de "ef" "${a}"`);
            acoesExame.add(a);
        }
    }
    const impressoIds = new Set();
    const acoesImpresso = new Set();
    for (const imp of estacao.impressos || []) {
        if (impressoIds.has(imp.id)) erro(`impresso duplicado "${imp.id}"`);
        impressoIds.add(imp.id);
        for (const item of imp.itens || []) {
            if (!existe(item.acao, 'ex')) erro(`impresso "${imp.id}": ação inexistente ou fora de "ex" "${item.acao}"`);
            if (!item.resultado) erro(`impresso "${imp.id}": "${item.acao}" sem resultado`);
            acoesImpresso.add(item.acao);
        }
    }

    // PEP
    const itens = estacao.pep?.itens || [];
    if (itens.length < 8 || itens.length > 14) erro(`PEP deve ter de 8 a 14 itens (tem ${itens.length})`);
    const idsItem = new Set();
    const idsSub = new Set();
    let totalSubs = 0;
    let soma = 0;
    const acoesPep = new Set();
    for (const item of itens) {
        if (idsItem.has(item.id)) erro(`item duplicado "${item.id}"`);
        idsItem.add(item.id);
        if (!item.secao || !item.texto) erro(`item "${item.id}" precisa de secao e texto`);
        if (!(item.peso >= 0.25 && item.peso <= 2) || (item.peso * 4) % 1 !== 0) erro(`item "${item.id}": peso deve estar entre 0,25 e 2,0 em múltiplos de 0,25`);
        soma += item.peso || 0;
        if (!item.ensino) erro(`item "${item.id}" sem ponto de ensino`);
        const subs = item.subelementos || [];
        if (!subs.length) erro(`item "${item.id}" sem subelementos`);
        totalSubs += subs.length;
        const { adequado, parcial } = item.niveis || {};
        if (!Number.isInteger(adequado) || adequado < 1 || adequado > subs.length) erro(`item "${item.id}": niveis.adequado fora de 1..${subs.length}`);
        if (parcial != null && (!Number.isInteger(parcial) || parcial < 1 || parcial >= adequado)) erro(`item "${item.id}": niveis.parcial deve ser nulo ou menor que adequado`);
        if (item.regras?.antesDoImpresso && !impressoIds.has(item.regras.antesDoImpresso)) erro(`item "${item.id}": regras.antesDoImpresso aponta para impresso inexistente`);
        for (const sub of subs) {
            if (idsSub.has(sub.id)) erro(`subelemento duplicado "${sub.id}"`);
            idsSub.add(sub.id);
            if (!sub.texto) erro(`subelemento "${sub.id}" sem texto`);
            if (!item.regras?.ordemPrefixos && !(sub.acoes || []).length) erro(`subelemento "${sub.id}" sem ações`);
            for (const a of sub.acoes || []) {
                if (!existe(a)) { erro(`subelemento "${sub.id}": ação inexistente "${a}"`); continue; }
                acoesPep.add(a);
                const prefixo = cat.get(a).prefixo;
                if (prefixo === 'anam' && !acoesAnamnese.has(a)) erro(`subelemento "${sub.id}": "${a}" é cobrado mas o paciente não tem resposta para ela`);
                if (prefixo === 'ef' && !acoesExame.has(a)) erro(`subelemento "${sub.id}": "${a}" é cobrado mas não há achado de exame físico`);
                if (prefixo === 'ex' && !acoesImpresso.has(a)) erro(`subelemento "${sub.id}": "${a}" é cobrado mas nenhum impresso o entrega`);
                if (prefixo === 'int' && !acoesImpresso.has(cat.get(a).requer)) erro(`subelemento "${sub.id}": "${a}" exige o impresso de "${cat.get(a).requer}"`);
            }
        }
    }
    if (Math.abs(soma - 10) > 1e-9) erro(`os pesos do PEP devem somar 10 (somam ${soma})`);
    if (totalSubs < 25) erro(`o PEP deve ter pelo menos 25 subelementos no total (tem ${totalSubs})`);
    const temPrefixo = prefixo => [...acoesPep].some(a => a.startsWith(prefixo));
    if (!temPrefixo('com.')) erro('o PEP precisa de um item de comunicação (ação "com.")');
    if (!temPrefixo('dx.')) erro('o PEP precisa de um item de hipótese diagnóstica (ação "dx.")');
    if (!temPrefixo('cd.')) erro('o PEP precisa de um item de conduta (ação "cd.")');

    // condutas
    const danosas = estacao.condutasDanosas || [];
    if (!danosas.length) erro('condutasDanosas deve ter pelo menos 1 conduta');
    const pen = estacao.penalidadeDanosa;
    if (typeof pen !== 'number' || pen < 0.25 || pen > 2 || (pen * 4) % 1 !== 0) erro('penalidadeDanosa deve estar entre 0,25 e 2,0 em múltiplos de 0,25 (pontos descontados por conduta perigosa)');
    for (const a of [...danosas, ...(estacao.condutasDesnecessarias || [])]) {
        if (!existe(a, 'cd')) erro(`conduta danosa/desnecessária inexistente "${a}"`);
        if (acoesPep.has(a)) erro(`"${a}" é danosa/desnecessária mas é cobrada no PEP`);
    }

    // gabarito
    const g = estacao.gabarito || {};
    if (!existe(g.diagnosticoId, 'dx')) erro('gabarito.diagnosticoId deve ser um "dx." do catálogo');
    else if (!acoesPep.has(g.diagnosticoId)) erro('gabarito.diagnosticoId não é cobrado em nenhum item do PEP');
    if ((g.condutaEsperada || []).length < 3) erro('gabarito.condutaEsperada precisa de pelo menos 3 itens');
    if ((g.errosCriticos || []).length < 1) erro('gabarito.errosCriticos precisa de pelo menos 1 item');
    if ((g.explicacao || '').length < 100) erro('gabarito.explicacao precisa de pelo menos 100 caracteres');
    if (!(g.referencias || []).length || g.referencias.some(r => !r.fonte || !r.ano)) erro('gabarito.referencias precisa de ao menos 1 referência com fonte e ano');

    // alcançabilidade da nota máxima (só roda se a estrutura acima está sã)
    if (!p.length) {
        const perfeito = pontuarEstacao(estacao, simularRunPerfeito(estacao));
        if (perfeito.total !== 10) erro(`a nota máxima não é alcançável: sequência ideal rende ${perfeito.total} de 10 (${perfeito.itens.filter(i => i.nivel !== 'adequado').map(i => i.id).join(', ')})`);
        if (perfeito.errosCriticos.length) erro('a sequência ideal aciona uma conduta danosa');
        const vazio = pontuarEstacao(estacao, []);
        if (vazio.total !== 0) erro(`quem não faz nada deveria tirar 0 e tira ${vazio.total}`);
    }
    return p;
}
