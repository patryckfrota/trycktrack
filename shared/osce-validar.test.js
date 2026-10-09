import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validarCatalogo, validarEstacao } from './osce-validar.js';
import { pontuarEstacao, simularRunPerfeito } from './osce-pep.js';

const raiz = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'osce');
const catalogo = JSON.parse(fs.readFileSync(path.join(raiz, 'catalogo.json'), 'utf8'));
const pasta = path.join(raiz, 'estacoes');
const arquivos = fs.readdirSync(pasta).filter(nome => nome.endsWith('.json'));
const piloto = () => JSON.parse(fs.readFileSync(path.join(pasta, 'cm-dor-toracica-001.json'), 'utf8'));
const problemas = e => validarEstacao(e, catalogo);
const tem = (lista, trecho) => lista.some(msg => msg.includes(trecho));

test('o catálogo é íntegro: ids únicos, prefixo certo, "requer" existente', () => {
    assert.deepEqual(validarCatalogo(catalogo), []);
});

test('toda estação publicada em osce/estacoes passa no validador', () => {
    assert.ok(arquivos.length >= 1);
    for (const nome of arquivos) {
        const estacao = JSON.parse(fs.readFileSync(path.join(pasta, nome), 'utf8'));
        assert.deepEqual(problemas(estacao), [], nome);
    }
});

test('piloto: sequência ideal rende 10, quem não faz nada tira 0, nada danoso na sequência ideal', () => {
    const e = piloto();
    const perfeito = pontuarEstacao(e, simularRunPerfeito(e));
    assert.equal(perfeito.total, 10);
    assert.deepEqual(perfeito.errosCriticos, []);
    assert.equal(pontuarEstacao(e, []).total, 0);
});

test('piloto: cometer os erros da prova derruba a nota e dispara o erro crítico', () => {
    const e = piloto();
    const eventos = [
        { seq: 1, tipo: 'acao', acao: 'com.apresentar' },
        { seq: 2, tipo: 'acao', acao: 'cd.aguardar-troponina' },
        { seq: 3, tipo: 'acao', acao: 'cd.aine' },
        { seq: 4, tipo: 'acao', acao: 'cd.alta' }
    ];
    const r = pontuarEstacao(e, eventos);
    assert.ok(r.total < 1);
    assert.deepEqual(r.errosCriticos.sort(), ['cd.aguardar-troponina', 'cd.aine', 'cd.alta']);
});

test('reprova PEP curto demais', () => {
    const e = piloto();
    e.pep.itens = e.pep.itens.slice(0, 5);
    assert.ok(tem(problemas(e), 'PEP deve ter de 8 a 14 itens'));
});

test('reprova pesos que não somam 10', () => {
    const e = piloto();
    e.pep.itens[0].peso = 0.5;
    assert.ok(tem(problemas(e), 'devem somar 10'));
});

test('reprova ação que não existe no catálogo', () => {
    const e = piloto();
    e.pep.itens[1].subelementos[0].acoes = ['anam.inventada'];
    assert.ok(tem(problemas(e), 'ação inexistente "anam.inventada"'));
});

test('reprova anamnese cobrada sem resposta do paciente', () => {
    const e = piloto();
    e.paciente.respostas = e.paciente.respostas.filter(r => !r.acoes.includes('anam.dor-carater'));
    assert.ok(tem(problemas(e), 'o paciente não tem resposta'));
});

test('reprova exame cobrado sem impresso', () => {
    const e = piloto();
    e.impressos = e.impressos.filter(i => i.id !== 'imp-ecg');
    assert.ok(tem(problemas(e), 'nenhum impresso o entrega'));
});

test('reprova título que entrega o diagnóstico', () => {
    const e = piloto();
    e.titulo = 'Homem com infarto agudo';
    assert.ok(tem(problemas(e), 'entregam o diagnóstico'));
});

test('reprova estação sem conduta danosa e sem referência', () => {
    const e = piloto();
    e.condutasDanosas = [];
    e.gabarito.referencias = [];
    const p = problemas(e);
    assert.ok(tem(p, 'condutasDanosas'));
    assert.ok(tem(p, 'gabarito.referencias'));
});

test('reprova item sem ponto de ensino e nível parcial maior que adequado', () => {
    const e = piloto();
    e.pep.itens[1].ensino = '';
    e.pep.itens[2].niveis = { adequado: 2, parcial: 3 };
    const p = problemas(e);
    assert.ok(tem(p, 'sem ponto de ensino'));
    assert.ok(tem(p, 'niveis.parcial'));
});

test('reprova nota máxima inalcançável (regra dos primeiros exames torna o item impossível)', () => {
    const e = piloto();
    const labs = e.pep.itens.find(item => item.id === 'p08');
    labs.regras.primeirosN = 1; // só 1 exame conta, mas o item exige 4
    const p = problemas(e);
    assert.ok(tem(p, 'nota máxima não é alcançável'));
    assert.ok(tem(p, 'p08'));
});

test('osce/indice.json está em dia: lista exatamente as estações APROVADAS', async () => {
    const { montarIndice } = await import('./osce-indice.js');
    const estacoes = arquivos.sort().map(nome => ({ nome, estacao: JSON.parse(fs.readFileSync(path.join(pasta, nome), 'utf8')) }));
    const pastaFichas = path.join(raiz, 'fichas');
    const fichas = fs.readdirSync(pastaFichas).filter(n => n.endsWith('.json')).sort().map(n => JSON.parse(fs.readFileSync(path.join(pastaFichas, n), 'utf8')));
    const esperado = montarIndice(estacoes, fichas);
    const atual = JSON.parse(fs.readFileSync(path.join(raiz, 'indice.json'), 'utf8'));
    assert.deepEqual(atual, esperado, 'rode: node osce/build.mjs');
    const rascunho = { nome: 'x.json', estacao: { ...estacoes[0].estacao, status: 'RASCUNHO' } };
    assert.equal(montarIndice([rascunho]).estacoes.length, 0, 'rascunho não entra no índice');
});

test('reprova estação sem penalidade por conduta perigosa ou com valor fora da faixa', () => {
    const sem = piloto(); delete sem.penalidadeDanosa;
    assert.ok(tem(problemas(sem), 'penalidadeDanosa'));
    for (const valor of [0, 3, 0.3, '1']) {
        const e = piloto(); e.penalidadeDanosa = valor;
        assert.ok(tem(problemas(e), 'penalidadeDanosa'), String(valor));
    }
});

test('piloto: cometer uma conduta perigosa desconta exatamente 1 ponto da sequência ideal', () => {
    const e = piloto();
    const eventos = simularRunPerfeito(e);
    eventos.push({ seq: eventos.length + 1, tipo: 'acao', acao: 'cd.aine' });
    const r = pontuarEstacao(e, eventos);
    assert.equal(r.bruto, 10);
    assert.equal(r.penalidade, 1);
    assert.equal(r.total, 9);
});
