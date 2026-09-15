import { test } from 'node:test';
import assert from 'node:assert/strict';
import { computeAreaWeights, allocateCountsByWeight, weightedSampleByIncidence } from './weighted-sampling.js';

test('computeAreaWeights: sem histórico, urgência neutra (1.10) — peso é só a incidência', () => {
    const topics = [{ area: 'Clínica Médica', topicKey: 'clinica-medica', incidence: 96 }];
    const [w] = computeAreaWeights(topics, {});
    assert.equal(w.accuracy, null);
    assert.equal(w.weight, 96 * 1.10);
});

test('computeAreaWeights: área com desempenho ruim pesa mais que a de mesma incidência com bom desempenho', () => {
    const topics = [
        { area: 'A', topicKey: 'a', incidence: 50 },
        { area: 'B', topicKey: 'b', incidence: 50 },
    ];
    const stats = { a: { answered: 10, correct: 9 }, b: { answered: 10, correct: 2 } }; // A: 90%, B: 20%
    const weights = computeAreaWeights(topics, stats);
    const wA = weights.find(w => w.area === 'A').weight;
    const wB = weights.find(w => w.area === 'B').weight;
    assert.ok(wB > wA, 'área mal desempenhada deve pesar mais mesmo com a mesma incidência');
});

test('allocateCountsByWeight: soma das vagas alocadas bate com o total pedido (quando há questão suficiente)', () => {
    const areaWeights = [
        { area: 'A', weight: 80 }, { area: 'B', weight: 20 }, { area: 'C', weight: 10 },
    ];
    const pool = { A: 100, B: 100, C: 100 };
    const allocated = allocateCountsByWeight(areaWeights, pool, 50);
    const total = Object.values(allocated).reduce((s, n) => s + n, 0);
    assert.equal(total, 50);
});

test('allocateCountsByWeight: área de maior peso recebe mais vagas que a de menor peso', () => {
    const areaWeights = [{ area: 'alta', weight: 90 }, { area: 'baixa', weight: 10 }];
    const pool = { alta: 100, baixa: 100 };
    const allocated = allocateCountsByWeight(areaWeights, pool, 20);
    assert.ok(allocated.alta > allocated.baixa);
});

test('allocateCountsByWeight: nunca aloca mais que o disponível numa área pequena — redistribui a sobra', () => {
    const areaWeights = [{ area: 'pequena', weight: 90 }, { area: 'grande', weight: 10 }];
    const pool = { pequena: 3, grande: 100 }; // "pequena" pesa muito mas só tem 3 questões
    const allocated = allocateCountsByWeight(areaWeights, pool, 50);
    assert.ok(allocated.pequena <= 3);
    const total = Object.values(allocated).reduce((s, n) => s + n, 0);
    assert.equal(total, 50, 'a sobra da área pequena precisa ir pra outra área, não sumir do total pedido');
});

test('allocateCountsByWeight: pede mais questões do que existem no total — devolve tudo que existe, sem erro', () => {
    const areaWeights = [{ area: 'A', weight: 50 }, { area: 'B', weight: 50 }];
    const pool = { A: 5, B: 5 };
    const allocated = allocateCountsByWeight(areaWeights, pool, 100);
    const total = Object.values(allocated).reduce((s, n) => s + n, 0);
    assert.equal(total, 10);
});

test('weightedSampleByIncidence: devolve exatamente o total pedido e nunca repete uma questão', () => {
    const makeArea = (area, n) => Array.from({ length: n }, (_, i) => ({ id: `${area}-${i}`, area }));
    const bankByArea = {
        'Clínica Médica': makeArea('cm', 50),
        'Pediatria': makeArea('ped', 30),
        'Psiquiatria': makeArea('psi', 5),
    };
    const topics = [
        { area: 'Clínica Médica', topicKey: 'clinica-medica', incidence: 96 },
        { area: 'Pediatria', topicKey: 'pediatria-completo', incidence: 84 },
        { area: 'Psiquiatria', topicKey: 'psiquiatria', incidence: 20 },
    ];
    let seed = 42;
    const detRandom = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
    const result = weightedSampleByIncidence(bankByArea, topics, {}, 40, detRandom);
    assert.equal(result.length, 40);
    assert.equal(new Set(result.map(q => q.id)).size, 40);
});

test('weightedSampleByIncidence: área ausente de statsByArea/topics não trava — só fica de fora da ponderação', () => {
    const bankByArea = { 'Sem Peso Nenhum': [{ id: 'x1', area: 'Sem Peso Nenhum' }] };
    const result = weightedSampleByIncidence(bankByArea, [], {}, 1);
    assert.equal(result.length, 0); // sem topics, nao ha peso pra nenhuma area -> nada alocado (comportamento esperado, nao um crash)
});

test('allocateCountsByWeight: fuzz determinístico — nunca aloca mais que o pedido nem mais que o disponível em nenhuma área', () => {
    // Achou um bug real: Math.round() por rodada podia fazer a soma da
    // rodada passar de `remaining` quando várias áreas arredondavam pra
    // cima ao mesmo tempo — o total final saía 1 a mais que o pedido em
    // ~6% dos casos (315/5000 numa varredura aleatória). A correção foi
    // trocar por Math.floor() na rodada, empurrando toda sobra pro
    // passe final (que só soma, nunca precisa subtrair). Este teste é
    // uma versão fixa/determinística daquela varredura, pra não perder
    // a cobertura de novo se alguém mexer aqui.
    let seed = 7;
    const detRandom = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
    let falhas = 0;
    for (let trial = 0; trial < 500; trial++) {
        const nAreas = 1 + Math.floor(detRandom() * 8);
        const areaWeights = Array.from({ length: nAreas }, (_, i) => ({ area: 'a' + i, weight: detRandom() * 100 }));
        const pool = {};
        areaWeights.forEach(a => { pool[a.area] = Math.floor(detRandom() * 20); });
        const totalCount = Math.floor(detRandom() * 60);
        const expectedMax = Math.min(totalCount, Object.values(pool).reduce((s, n) => s + n, 0));
        const allocated = allocateCountsByWeight(areaWeights, pool, totalCount);
        const total = Object.values(allocated).reduce((s, n) => s + n, 0);
        const estourouAlgumaArea = areaWeights.some(a => (allocated[a.area] || 0) > pool[a.area]);
        if (total !== expectedMax || estourouAlgumaArea) falhas++;
    }
    assert.equal(falhas, 0);
});
