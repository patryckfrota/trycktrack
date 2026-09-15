/**
 * Simulado ponderado por incidência (R-3): em vez de sortear as
 * questões do Simulado com a mesma chance pra qualquer área — o que
 * getConfiguredQuestionSet faz hoje via Fisher-Yates uniforme —, pesa
 * a amostra pela incidência prevista de cada grande área no edital
 * (mesmo dado já usado pra ordenar as Trilhas, ver TRAIL_CATALOG em
 * app-app.js) × a urgência por desempenho de quem está estudando
 * (urgencyMultiplierForAccuracy, de trail-priority.js — mesmo critério
 * das Trilhas, não uma cópia). Área que cai muito no edital E que a
 * pessoa anda errando puxa mais questões; área rara e já dominada puxa
 * menos — sem nunca zerar nenhuma área por completo.
 */

import { urgencyMultiplierForAccuracy } from './trail-priority.js';

// topics: [{ area, topicKey, incidence }] — normalmente TRAIL_CATALOG[track].phases.
// statsByArea: mesmo formato de trycktrack-question-stats.byArea
// ({ [topicKey]: { answered, correct } }).
export function computeAreaWeights(topics, statsByArea = {}) {
    return topics.map(topic => {
        const stats = statsByArea[topic.topicKey];
        const accuracy = stats && stats.answered ? stats.correct / stats.answered : null;
        const urgency = urgencyMultiplierForAccuracy(accuracy);
        const incidence = topic.incidence ?? 0;
        return { area: topic.area, topicKey: topic.topicKey, incidence, accuracy, urgency, weight: incidence * urgency };
    });
}

// Distribui `totalCount` vagas entre as áreas proporcionalmente ao
// peso — sem nunca pedir mais vagas de uma área do que ela realmente
// tem disponível (poolSizeByArea). O que sobra de uma área pequena
// demais é redistribuído entre as áreas que ainda têm questão sobrando,
// de novo proporcionalmente ao peso delas — repete até não sobrar nada
// pra redistribuir ou não ter mais onde colocar.
export function allocateCountsByWeight(areaWeights, poolSizeByArea, totalCount) {
    const areas = areaWeights.filter(a => (poolSizeByArea[a.area] || 0) > 0);
    if (!areas.length || totalCount <= 0) return {};

    const allocated = Object.fromEntries(areas.map(a => [a.area, 0]));
    let remaining = Math.min(totalCount, areas.reduce((sum, a) => sum + (poolSizeByArea[a.area] || 0), 0));
    let pool = areas.map(a => ({ ...a, available: poolSizeByArea[a.area] || 0 }));

    while (remaining > 0 && pool.length) {
        const totalWeight = pool.reduce((sum, a) => sum + a.weight, 0);
        let distributedThisRound = 0;
        const stillOpen = [];
        pool.forEach(a => {
            // Math.floor (nunca Math.round) é o que garante que a soma
            // desta rodada nunca ultrapassa `remaining` — floor(share)
            // somado nunca passa da soma das frações reais; quem
            // arredondaria pra cima fica pro passe de sobra abaixo, que
            // só ADICIONA (nunca precisa tirar de ninguém depois).
            const share = totalWeight > 0 ? (a.weight / totalWeight) * remaining : remaining / pool.length;
            const take = Math.min(a.available, Math.max(0, Math.floor(share)));
            allocated[a.area] += take;
            a.available -= take;
            distributedThisRound += take;
            if (a.available > 0) stillOpen.push(a);
        });
        remaining -= distributedThisRound;
        pool = stillOpen;
        if (distributedThisRound === 0) break; // arredondamento zerou tudo (remaining pequeno) — sai pra não travar
    }

    // Sobra de arredondamento (1 ou 2 vagas) vai pra área de maior peso
    // com espaço ainda disponível, em vez de devolver menos questões
    // que o pedido.
    let leftover = Math.min(totalCount, areas.reduce((sum, a) => sum + (poolSizeByArea[a.area] || 0), 0))
        - Object.values(allocated).reduce((sum, n) => sum + n, 0);
    const byWeightDesc = [...areas].sort((a, b) => b.weight - a.weight);
    for (const a of byWeightDesc) {
        while (leftover > 0 && allocated[a.area] < (poolSizeByArea[a.area] || 0)) {
            allocated[a.area] += 1;
            leftover -= 1;
        }
        if (leftover <= 0) break;
    }

    return allocated;
}

// bankByArea: Map ou objeto { area: Question[] } — já filtrado por
// quaisquer outros critérios (Filtro Avançado, busca etc.) antes de
// chegar aqui. randomFn injetável só pra teste determinístico.
export function weightedSampleByIncidence(bankByArea, topics, statsByArea, totalCount, randomFn = Math.random) {
    const poolSizeByArea = {};
    Object.keys(bankByArea).forEach(area => { poolSizeByArea[area] = bankByArea[area].length; });
    const areaWeights = computeAreaWeights(topics, statsByArea);
    const allocated = allocateCountsByWeight(areaWeights, poolSizeByArea, totalCount);

    const selected = [];
    Object.entries(allocated).forEach(([area, take]) => {
        const pool = [...(bankByArea[area] || [])];
        for (let i = pool.length - 1; i > 0 && take > 0; i--) {
            const j = Math.floor(randomFn() * (i + 1));
            [pool[i], pool[j]] = [pool[j], pool[i]];
        }
        selected.push(...pool.slice(0, take));
    });

    // Embaralha o resultado final — sem isso as questões viriam
    // agrupadas por área (todas de Clínica Médica primeiro, depois
    // Pediatria...), o que entregaria um simulado com "blocos" por
    // assunto em vez de intercalado como uma prova real.
    for (let i = selected.length - 1; i > 0; i--) {
        const j = Math.floor(randomFn() * (i + 1));
        [selected[i], selected[j]] = [selected[j], selected[i]];
    }
    return selected;
}
