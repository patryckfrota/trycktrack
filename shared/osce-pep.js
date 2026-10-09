/**
 * Pontuação de uma estação OSCE v2 no padrão do PEP do Revalida (INEP).
 *
 * Função pura: recebe a estação e o registro do que o candidato fez e
 * devolve a nota — sem DOM, sem rede, testável com `node --test`. O
 * player (fase 2), o validador (osce/validar.mjs) e os testes usam esta
 * mesma função, então a nota que o aluno vê é a que o validador provou.
 *
 * Eventos (em ordem de ocorrência, seq crescente):
 *   { seq, tipo: 'acao',     acao: 'anam.dor-inicio' }
 *   { seq, tipo: 'impresso', id:   'imp-lab' }   // impresso entregue
 *
 * Cada item do PEP tem N subelementos; o nível sai da CONTAGEM de
 * subelementos cumpridos (igual aos PEPs oficiais: "Adequado: três ou
 * mais; Parcialmente adequado: dois; ..."). Um subelemento vale se o
 * candidato fez QUALQUER uma das suas ações.
 */

const casa = (acao, prefixo) => typeof acao === 'string' && acao.startsWith(prefixo);

function acoesConsideradas(item, eventos) {
    const regras = item.regras || {};
    let limite = Infinity;
    if (regras.antesDoImpresso) {
        const entrega = eventos.find(e => e.tipo === 'impresso' && e.id === regras.antesDoImpresso);
        if (entrega) limite = entrega.seq;
    }
    let acoes = eventos.filter(e => e.tipo === 'acao' && e.seq < limite).map(e => e.acao);
    if (regras.primeirosN) {
        const prefixo = regras.primeirosPrefixo || 'ex.';
        const primeiros = [...new Set(acoes.filter(a => casa(a, prefixo)))].slice(0, regras.primeirosN);
        acoes = acoes.filter(a => !casa(a, prefixo) || primeiros.includes(a));
    }
    return new Set(acoes);
}

function ordemRespeitada(prefixos, eventos) {
    const posicoes = prefixos.map(prefixo => eventos.find(e => e.tipo === 'acao' && casa(e.acao, prefixo))?.seq);
    if (posicoes.some(p => p === undefined)) return false;
    return posicoes.every((p, i) => i === 0 || p >= posicoes[i - 1]);
}

function nivelDoItem(item, cumpridos) {
    const { adequado, parcial } = item.niveis;
    if (cumpridos >= adequado) return 'adequado';
    if (parcial != null && cumpridos >= parcial) return 'parcial';
    return 'inadequado';
}

function montarItem(item, cumpridos) {
    const nivel = nivelDoItem(item, cumpridos.length);
    const pontos = nivel === 'adequado' ? item.peso : nivel === 'parcial' ? item.peso / 2 : 0;
    return {
        id: item.id,
        secao: item.secao,
        nivel,
        pontos,
        peso: item.peso,
        cumpridos,
        faltantes: item.subelementos.map(s => s.id).filter(id => !cumpridos.includes(id)),
        ensino: item.ensino || ''
    };
}

function consolidar(estacao, itens, feitasTodas) {
    const danosas = feitasTodas.filter(a => (estacao.condutasDanosas || []).includes(a));
    const desnecessarias = feitasTodas.filter(a => (estacao.condutasDesnecessarias || []).includes(a));
    const penalidade = danosas.length * (estacao.penalidadeDanosa || 0);

    const bruto = itens.reduce((soma, item) => soma + item.pontos, 0);
    const porSecao = {};
    for (const item of itens) {
        porSecao[item.secao] ||= { pontos: 0, peso: 0 };
        porSecao[item.secao].pontos += item.pontos;
        porSecao[item.secao].peso += item.peso;
    }

    const arred = n => Math.round(n * 1000) / 1000;
    return {
        total: Math.max(0, arred(bruto - penalidade)),
        bruto: arred(bruto),
        // quanto da nota foi de fato descontado (nunca mais que o bruto)
        penalidade: arred(Math.min(bruto, penalidade)),
        maximo: Math.round(itens.reduce((soma, item) => soma + item.peso, 0) * 1000) / 1000,
        itens,
        porSecao,
        errosCriticos: danosas,
        desnecessarias
    };
}

export function pontuarEstacao(estacao, eventos) {
    const itens = (estacao.pep?.itens || []).map(item => {
        let cumpridos;
        if (item.regras?.ordemPrefixos) {
            const ok = ordemRespeitada(item.regras.ordemPrefixos, eventos);
            cumpridos = ok ? item.subelementos.map(s => s.id) : [];
        } else {
            const feitas = acoesConsideradas(item, eventos);
            cumpridos = item.subelementos.filter(s => (s.acoes || []).some(a => feitas.has(a))).map(s => s.id);
        }
        return montarItem(item, cumpridos);
    });
    return consolidar(estacao, itens, [...new Set(eventos.filter(e => e.tipo === 'acao').map(e => e.acao))]);
}

// Modo Avaliador (dupla): quem avalia marca os subelementos que viu o
// candidato cumprir e as condutas perigosas que ele tomou; as regras que
// dependem de momento ("antes do impresso", "6 primeiros", ordem) o
// avaliador aplica olhando — o app só soma pelo mesmo critério de níveis.
export function pontuarMarcacoes(estacao, subelementosMarcados, danosasMarcadas = []) {
    const marcados = new Set(subelementosMarcados);
    const itens = (estacao.pep?.itens || []).map(item =>
        montarItem(item, item.subelementos.filter(s => marcados.has(s.id)).map(s => s.id)));
    return consolidar(estacao, itens, [...new Set(danosasMarcadas)]);
}

const ORDEM_CATEGORIAS = ['com', 'anam', 'ef', 'ex', 'int', 'dx', 'cd'];

// Sequência de eventos que cumpre TODOS os itens: usada pelo validador
// pra provar que a estação é alcançável com nota máxima (e pelos testes).
// Respeita a ordem das categorias e entrega cada impresso depois dos
// exames que o compõem — igual a um candidato ideal.
export function simularRunPerfeito(estacao) {
    const escolhidas = [];
    for (const item of estacao.pep?.itens || []) {
        for (const sub of item.subelementos || []) {
            if (sub.acoes?.length && !escolhidas.includes(sub.acoes[0])) escolhidas.push(sub.acoes[0]);
        }
    }
    const categoria = acao => ORDEM_CATEGORIAS.indexOf(acao.split('.')[0]);
    escolhidas.sort((a, b) => categoria(a) - categoria(b));

    const eventos = [];
    let seq = 1;
    const exames = escolhidas.filter(a => casa(a, 'ex.'));
    for (const acao of escolhidas.filter(a => !casa(a, 'ex.') && categoria(a) < categoria('ex.x'))) eventos.push({ seq: seq++, tipo: 'acao', acao });
    for (const acao of exames) eventos.push({ seq: seq++, tipo: 'acao', acao });
    for (const impresso of estacao.impressos || []) {
        if (impresso.itens.some(i => exames.includes(i.acao))) eventos.push({ seq: seq++, tipo: 'impresso', id: impresso.id });
    }
    for (const acao of escolhidas.filter(a => categoria(a) > categoria('ex.x'))) eventos.push({ seq: seq++, tipo: 'acao', acao });
    return eventos;
}
