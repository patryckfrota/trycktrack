import { test } from 'node:test';
import assert from 'node:assert/strict';
import { pontuarEstacao, simularRunPerfeito } from './osce-pep.js';

// Estação mínima só para testar as regras de pontuação, uma por vez.
const item = (id, peso, subs, niveis, regras) => ({
    id, secao: 'S', texto: id, peso, ensino: 'x', niveis, regras,
    subelementos: subs.map((acoes, i) => ({ id: `${id}${i}`, texto: 't', acoes: [].concat(acoes) }))
});
const acao = (seq, a) => ({ seq, tipo: 'acao', acao: a });
const impresso = (seq, id) => ({ seq, tipo: 'impresso', id });
const estacao = (...itens) => ({ pep: { itens }, condutasDanosas: ['cd.aine'], condutasDesnecessarias: ['cd.oxigenio'] });

test('nível sai da contagem de subelementos: adequado, parcial e inadequado', () => {
    const e = estacao(item('a', 1, ['anam.x', 'anam.y', 'anam.z'], { adequado: 3, parcial: 2 }));
    assert.equal(pontuarEstacao(e, [acao(1, 'anam.x'), acao(2, 'anam.y'), acao(3, 'anam.z')]).total, 1);
    assert.equal(pontuarEstacao(e, [acao(1, 'anam.x'), acao(2, 'anam.y')]).total, 0.5);
    assert.equal(pontuarEstacao(e, [acao(1, 'anam.x')]).total, 0);
    assert.equal(pontuarEstacao(e, []).itens[0].nivel, 'inadequado');
});

test('repetir a mesma ação não conta duas vezes', () => {
    const e = estacao(item('a', 1, ['anam.x', 'anam.y'], { adequado: 2, parcial: 1 }));
    assert.equal(pontuarEstacao(e, [acao(1, 'anam.x'), acao(2, 'anam.x')]).itens[0].nivel, 'parcial');
});

test('subelemento com várias ações vale se QUALQUER uma foi feita', () => {
    const e = estacao(item('a', 1, [['cd.nitrato', 'cd.morfina']], { adequado: 1, parcial: null }));
    assert.equal(pontuarEstacao(e, [acao(1, 'cd.morfina')]).total, 1);
});

test('item sem nível parcial: ou pontua tudo ou nada', () => {
    const e = estacao(item('a', 2, ['dx.a', 'dx.b'], { adequado: 2, parcial: null }));
    assert.equal(pontuarEstacao(e, [acao(1, 'dx.a')]).total, 0);
});

test('regra "antes do impresso": exame pedido depois da entrega não conta', () => {
    const e = estacao(item('lab', 1, ['ex.a', 'ex.b'], { adequado: 2, parcial: 1 }, { antesDoImpresso: 'imp' }));
    const depois = [acao(1, 'ex.a'), impresso(2, 'imp'), acao(3, 'ex.b')];
    assert.equal(pontuarEstacao(e, depois).itens[0].nivel, 'parcial');
    const antes = [acao(1, 'ex.a'), acao(2, 'ex.b'), impresso(3, 'imp')];
    assert.equal(pontuarEstacao(e, antes).itens[0].nivel, 'adequado');
});

test('regra "primeiros N": só os N primeiros exames citados contam', () => {
    const e = estacao(item('lab', 1, ['ex.e', 'ex.f'], { adequado: 2, parcial: 1 }, { primeirosN: 2 }));
    const eventos = [acao(1, 'ex.a'), acao(2, 'ex.b'), acao(3, 'ex.e'), acao(4, 'ex.f')];
    assert.equal(pontuarEstacao(e, eventos).itens[0].nivel, 'inadequado');
});

test('regra de sequência: ordem das categorias', () => {
    const e = estacao(item('seq', 1, [[]], { adequado: 1, parcial: null }, { ordemPrefixos: ['anam.', 'ef.', 'dx.'] }));
    assert.equal(pontuarEstacao(e, [acao(1, 'anam.x'), acao(2, 'ef.y'), acao(3, 'dx.z')]).total, 1);
    assert.equal(pontuarEstacao(e, [acao(1, 'ef.y'), acao(2, 'anam.x'), acao(3, 'dx.z')]).total, 0);
    assert.equal(pontuarEstacao(e, [acao(1, 'anam.x'), acao(2, 'ef.y')]).total, 0);
});

test('condutas danosas e desnecessárias aparecem no resultado; penalidade só se a estação definir', () => {
    const e = estacao(item('a', 1, ['anam.x'], { adequado: 1, parcial: null }));
    const eventos = [acao(1, 'anam.x'), acao(2, 'cd.aine'), acao(3, 'cd.oxigenio')];
    const sem = pontuarEstacao(e, eventos);
    assert.deepEqual(sem.errosCriticos, ['cd.aine']);
    assert.deepEqual(sem.desnecessarias, ['cd.oxigenio']);
    assert.equal(sem.total, 1);
    const com = pontuarEstacao({ ...e, penalidadeDanosa: 0.5 }, eventos);
    assert.equal(com.total, 0.5);
    assert.equal(com.bruto, 1);
    assert.equal(com.penalidade, 0.5);
    const muito = pontuarEstacao({ ...e, penalidadeDanosa: 5 }, eventos);
    assert.equal(muito.total, 0, 'nunca negativa');
    assert.equal(muito.penalidade, 1, 'o desconto exibido nunca passa do que havia');
    const duas = pontuarEstacao({ ...e, condutasDanosas: ['cd.aine', 'cd.alta'], penalidadeDanosa: 0.25 }, [...eventos, acao(4, 'cd.alta')]);
    assert.equal(duas.penalidade, 0.5, 'cada conduta perigosa desconta uma vez');
});

test('a nota é somada por seção e o máximo é a soma dos pesos', () => {
    const a = { ...item('a', 1.5, ['anam.x'], { adequado: 1, parcial: null }), secao: 'Anamnese' };
    const b = { ...item('b', 0.25, ['ef.y'], { adequado: 1, parcial: null }), secao: 'Exame' };
    const r = pontuarEstacao(estacao(a, b), [acao(1, 'anam.x')]);
    assert.equal(r.maximo, 1.75);
    assert.deepEqual(r.porSecao, { Anamnese: { pontos: 1.5, peso: 1.5 }, Exame: { pontos: 0, peso: 0.25 } });
});

test('simularRunPerfeito entrega o impresso depois dos exames e antes da interpretação', () => {
    const e = {
        impressos: [{ id: 'imp', itens: [{ acao: 'ex.ecg', resultado: 'r' }] }],
        pep: { itens: [item('a', 1, ['cd.x', 'int.ecg', 'ex.ecg', 'anam.q'], { adequado: 4, parcial: null })] }
    };
    const eventos = simularRunPerfeito(e);
    assert.deepEqual(eventos.map(ev => ev.acao || ev.id), ['anam.q', 'ex.ecg', 'imp', 'int.ecg', 'cd.x']);
    assert.deepEqual(eventos.map(ev => ev.seq), [1, 2, 3, 4, 5]);
});

test('pontuarMarcacoes: o avaliador marca subelementos e a nota segue os mesmos níveis do PEP', async () => {
    const { pontuarMarcacoes } = await import('./osce-pep.js');
    const e = estacao(
        item('a', 1, ['anam.x', 'anam.y', 'anam.z'], { adequado: 3, parcial: 2 }),
        item('b', 2, ['dx.a'], { adequado: 1, parcial: null })
    );
    assert.equal(pontuarMarcacoes(e, ['a0', 'a1', 'a2', 'b0']).total, 3);
    assert.equal(pontuarMarcacoes(e, ['a0', 'a1']).total, 0.5);
    assert.equal(pontuarMarcacoes(e, ['b0']).total, 2);
    assert.equal(pontuarMarcacoes(e, []).total, 0);
    assert.deepEqual(pontuarMarcacoes(e, ['a0'], ['cd.aine', 'cd.aine', 'cd.outra']).errosCriticos, ['cd.aine']);
    assert.deepEqual(pontuarMarcacoes(e, ['a0', 'a1']).itens[0].faltantes, ['a2']);
});

test('pontuarMarcacoes dá a mesma nota que a simulação ideal na estação piloto', async () => {
    const fs = await import('node:fs');
    const piloto = JSON.parse(fs.readFileSync(new URL('../osce/estacoes/cm-dor-toracica-001.json', import.meta.url), 'utf8'));
    const { pontuarMarcacoes, pontuarEstacao, simularRunPerfeito } = await import('./osce-pep.js');
    const todos = piloto.pep.itens.flatMap(i => i.subelementos.map(s => s.id));
    assert.equal(pontuarMarcacoes(piloto, todos).total, pontuarEstacao(piloto, simularRunPerfeito(piloto)).total);
    assert.equal(pontuarMarcacoes(piloto, []).total, 0);
});

test('parcial de itens com peso ímpar mantém 3 casas (0,375 e 0,125, como nos PEPs oficiais)', () => {
    const e = estacao(item('a', 0.75, ['anam.x', 'anam.y'], { adequado: 2, parcial: 1 }), item('b', 0.25, ['dx.a', 'dx.b'], { adequado: 2, parcial: 1 }));
    const r = pontuarEstacao(e, [acao(1, 'anam.x'), acao(2, 'dx.a')]);
    assert.deepEqual(r.itens.map(i => i.pontos), [0.375, 0.125]);
    assert.equal(r.total, 0.5);
});
