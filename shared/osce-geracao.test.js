import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { gerarEstacao, ErroGeracao, extrairJson, montarPromptGeracao, montarPromptAuditoria, escolherCenario } from './osce-geracao.js';
import { validarEstacao } from './osce-validar.js';

const ler = caminho => JSON.parse(fs.readFileSync(new URL(caminho, import.meta.url), 'utf8'));
const catalogo = ler('../osce/catalogo.json');
const piloto = ler('../osce/estacoes/cm-dor-toracica-001.json');
const ficha = ler('../osce/fichas/urgencia-b-4-sindromes-coronarianas-agudas.json');
const AGORA = '2026-10-03T12:00:00.000Z';

// o que a IA devolveria: a estação sem os campos que o servidor preenche
const brutaOk = () => {
    const { schemaVersion, id, status, tempoMinutos, classificacao, revisao, ...resto } = structuredClone(piloto);
    return resto;
};

// IA simulada: responde conforme o tipo de prompt, com scripts por chamada
function iaSimulada({ geracoes, auditorias }) {
    const chamadas = { geracao: [], auditoria: [] };
    const fn = async prompt => {
        const tipo = prompt.startsWith('AUDITORIA') ? 'auditoria' : 'geracao';
        chamadas[tipo].push(prompt);
        const roteiro = tipo === 'auditoria' ? auditorias : geracoes;
        const item = roteiro[Math.min(chamadas[tipo].length - 1, roteiro.length - 1)];
        return typeof item === 'function' ? item() : item;
    };
    fn.chamadas = chamadas;
    return fn;
}
const aprovada = JSON.stringify({ aprovada: true, divergencias: [] });
const gerar = ia => gerarEstacao({ ficha, catalogo, exemplo: piloto, chamarIA: ia, agora: AGORA, modelo: 'teste', aleatorio: () => 0 });

test('caminho feliz: estação válida, marcada como gerada por IA e sem revisão profissional', async () => {
    const ia = iaSimulada({ geracoes: [JSON.stringify(brutaOk())], auditorias: [aprovada] });
    const { estacao, auditoria } = await gerar(ia);
    assert.equal(estacao.status, 'GERADA');
    assert.match(estacao.id, /^ia-b-4-/);
    assert.deepEqual(validarEstacao(estacao, catalogo), []);
    assert.deepEqual(estacao.classificacao, { revalidaArea: 'clinica-medica', internato: { rodizio: 'urgencia-e-emergencia-saude-mental', topico: 'B', temaSlug: 'b-4' } });
    assert.equal(estacao.revisao.geradaPorIA, true);
    assert.equal(estacao.revisao.revisaoProfissional, false);
    assert.equal(estacao.revisao.fichaId, ficha.id);
    assert.deepEqual(estacao.revisao.auditoriaIA, { aprovada: true, data: '2026-10-03' });
    assert.equal(auditoria.tentativas, 1);
    assert.equal(ia.chamadas.geracao.length, 1);
    assert.equal(ia.chamadas.auditoria.length, 1);
});

test('a IA não consegue sobrescrever o que é do servidor (status, id, classificação, revisão)', async () => {
    const suja = { ...brutaOk(), status: 'APROVADA', id: 'x', tempoMinutos: 99, classificacao: { revalidaArea: 'cirurgia' }, revisao: { revisaoProfissional: true } };
    const { estacao } = await gerar(iaSimulada({ geracoes: [JSON.stringify(suja)], auditorias: [aprovada] }));
    assert.equal(estacao.status, 'GERADA');
    assert.notEqual(estacao.id, 'x');
    assert.equal(estacao.tempoMinutos, 10);
    assert.equal(estacao.classificacao.revalidaArea, 'clinica-medica');
    assert.equal(estacao.revisao.revisaoProfissional, false);
});

test('tema sem ficha: recusa e não chama a IA', async () => {
    const ia = iaSimulada({ geracoes: ['{}'], auditorias: [aprovada] });
    await assert.rejects(() => gerarEstacao({ ficha: null, catalogo, exemplo: piloto, chamarIA: ia }), e => e instanceof ErroGeracao && e.tipo === 'sem-ficha');
    assert.equal(ia.chamadas.geracao.length, 0);
});

test('resposta que não é JSON: repete pedindo o JSON e depois passa', async () => {
    const ia = iaSimulada({ geracoes: ['Claro! Aqui está sua estação...', JSON.stringify(brutaOk())], auditorias: [aprovada] });
    const { estacao, auditoria } = await gerar(ia);
    assert.equal(estacao.status, 'GERADA');
    assert.equal(auditoria.tentativas, 2);
    assert.match(ia.chamadas.geracao[1], /não era um JSON válido/);
});

test('estação reprovada pelo validador: os problemas voltam para a IA na tentativa seguinte', async () => {
    const curta = brutaOk();
    curta.pep.itens = curta.pep.itens.slice(0, 4);
    delete curta.penalidadeDanosa;
    const ia = iaSimulada({ geracoes: [JSON.stringify(curta), JSON.stringify(brutaOk())], auditorias: [aprovada] });
    const { auditoria } = await gerar(ia);
    assert.equal(auditoria.tentativas, 2);
    assert.match(ia.chamadas.geracao[1], /PEP deve ter de 8 a 14 itens/);
    assert.match(ia.chamadas.geracao[1], /penalidadeDanosa/);
    assert.equal(ia.chamadas.auditoria.length, 1, 'só audita o que o validador já aprovou');
});

test('auditoria reprova: as divergências voltam para a IA e a segunda versão é aceita', async () => {
    const reprovada = JSON.stringify({ aprovada: false, divergencias: [{ onde: 'p10', problema: 'dose de enoxaparina diferente da ficha' }] });
    const ia = iaSimulada({ geracoes: [JSON.stringify(brutaOk())], auditorias: [reprovada, aprovada] });
    const { auditoria } = await gerar(ia);
    assert.equal(auditoria.tentativas, 2);
    assert.match(ia.chamadas.geracao[1], /p10: dose de enoxaparina diferente da ficha/);
});

test('auditoria reprova sempre: nenhuma estação sai, com os motivos', async () => {
    const reprovada = JSON.stringify({ aprovada: false, divergencias: [{ onde: 'gabarito', problema: 'cita ticagrelor, que a ficha não cobre' }] });
    const ia = iaSimulada({ geracoes: [JSON.stringify(brutaOk())], auditorias: [reprovada] });
    await assert.rejects(() => gerar(ia), e => e instanceof ErroGeracao && e.tipo === 'reprovada' && e.detalhes[0].includes('ticagrelor'));
});

test('erro final mostra o motivo de CADA tentativa, na ordem, e para em 3 tentativas', async () => {
    const curta = brutaOk(); curta.pep.itens = curta.pep.itens.slice(0, 3);
    const reprovada = JSON.stringify({ aprovada: false, divergencias: [{ onde: 'p11', problema: 'prazo diferente da ficha' }] });
    const ia = iaSimulada({ geracoes: ['texto solto', JSON.stringify(curta), JSON.stringify(brutaOk())], auditorias: [reprovada] });
    await assert.rejects(() => gerar(ia), e => {
        assert.equal(e.tipo, 'reprovada');
        assert.ok(e.detalhes[0].startsWith('tentativa 1 (formato)'));
        assert.ok(e.detalhes.some(d => d.startsWith('tentativa 2 (validador): PEP deve ter de 8 a 14 itens')));
        assert.ok(e.detalhes.some(d => d === 'tentativa 3 (auditoria): p11: prazo diferente da ficha'));
        return true;
    });
    assert.equal(ia.chamadas.geracao.length, 3);
});

test('auditoria que não devolve JSON conta como reprovada (não deixa passar por falha técnica)', async () => {
    const ia = iaSimulada({ geracoes: [JSON.stringify(brutaOk())], auditorias: ['não sei responder'] });
    await assert.rejects(() => gerar(ia), e => e.tipo === 'reprovada');
});

test('auditoria que aprova mas lista divergências não aprova', async () => {
    const ambigua = JSON.stringify({ aprovada: true, divergencias: [{ onde: 'x', problema: 'algo' }] });
    await assert.rejects(() => gerar(iaSimulada({ geracoes: [JSON.stringify(brutaOk())], auditorias: [ambigua] })), e => e.tipo === 'reprovada');
});

test('prompt de geração: ficha, proibições, catálogo e regras entram; tamanho razoável', () => {
    const cenario = escolherCenario(ficha, 'iamcsst-com-hemodinamica');
    const prompt = montarPromptGeracao({ ficha, catalogo, exemplo: piloto, cenario });
    assert.ok(prompt.includes('Ticagrelor e prasugrel: a diretriz-fonte não os cita.'), 'a lista de proibidos vai no prompt');
    assert.ok(prompt.includes('cd.fibrinolitico | Fibrinólise (tenecteplase)'), 'catálogo com ids');
    assert.ok(prompt.includes('SOMANDO EXATAMENTE 10'));
    assert.ok(prompt.includes(cenario.resumo));
    assert.ok(prompt.length < 90000, `prompt grande demais: ${prompt.length}`);
});

test('prompt de auditoria começa com a marca AUDITORIA e leva a ficha', () => {
    const prompt = montarPromptAuditoria({ ficha, estacao: piloto });
    assert.ok(prompt.startsWith('AUDITORIA'));
    assert.ok(prompt.includes('naoCobrirAteComplementar'));
});

test('escolher cenário: usa o pedido, senão sorteia da ficha', () => {
    assert.equal(escolherCenario(ficha, 'nitrato-contraindicado').id, 'nitrato-contraindicado');
    assert.equal(escolherCenario(ficha, null, () => 0).id, ficha.cenariosPermitidos[0].id);
    assert.equal(escolherCenario({ cenariosPermitidos: [] }, null), null);
});

test('extrairJson tolera cercas de código e texto ao redor', () => {
    assert.deepEqual(extrairJson('```json\n{"a":1}\n```'), { a: 1 });
    assert.deepEqual(extrairJson('Segue: {"a":{"b":2}} fim'), { a: { b: 2 } });
    assert.throws(() => extrairJson('sem json'));
});

test('erro do provedor (limite, chave, rede) sobe na hora, sem repetir nem fingir que é JSON inválido', async () => {
    const limite = Object.assign(new Error('groq respondeu 413'), { status: 413, provedor: 'groq' });
    let chamadas = 0;
    const ia = async () => { chamadas += 1; throw limite; };
    await assert.rejects(() => gerar(ia), e => e === limite);
    assert.equal(chamadas, 1);
    // também na auditoria: gerou, e a auditoria bateu no limite
    let n = 0;
    const iaAuditoriaFalha = async prompt => { n += 1; if (prompt.startsWith('AUDITORIA')) throw limite; return JSON.stringify(brutaOk()); };
    await assert.rejects(() => gerar(iaAuditoriaFalha), e => e === limite);
    assert.equal(n, 2);
});
