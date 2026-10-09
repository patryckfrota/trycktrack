import { test } from 'node:test';
import assert from 'node:assert/strict';
import { criarChamarIA, escolherProvedor, ErroProvedor, mensagemDoErro, diagnosticoDoErro, ordenarModelosGemini } from './osce-provedores.js';

const resposta = (corpo, status = 200) => ({ ok: status < 400, status, text: async () => (typeof corpo === 'string' ? corpo : JSON.stringify(corpo)) });

test('escolhe Gemini quando há chave dele, senão Groq, senão nada', () => {
    assert.equal(escolherProvedor({ GEMINI_API_KEY: 'g', GROQ_API_KEY: 'q' }), 'gemini');
    assert.equal(escolherProvedor({ GROQ_API_KEY: 'q' }), 'groq');
    assert.equal(escolherProvedor({}), null);
    assert.equal(criarChamarIA({}), null);
});

test('Gemini: monta a requisição, manda a chave no cabeçalho e lê o texto', async () => {
    let visto;
    const chamar = criarChamarIA({ GEMINI_API_KEY: 'chave-g' }, async (url, init) => { visto = { url, init }; return resposta({ candidates: [{ content: { parts: [{ text: '{"a":' }, { text: '1}' }] } }] }); });
    assert.equal(await chamar('oi'), '{"a":1}');
    assert.match(visto.url, /models\/gemini-3\.8-flash:generateContent$/);
    assert.equal(visto.init.headers['x-goog-api-key'], 'chave-g');
    assert.ok(!visto.url.includes('chave-g'), 'a chave nunca vai na URL');
    const corpo = JSON.parse(visto.init.body);
    assert.equal(corpo.contents[0].parts[0].text, 'oi');
    assert.equal(corpo.generationConfig.responseMimeType, 'application/json');
    assert.equal(chamar.provedor, 'gemini');
});

test('Groq: monta a requisição e lê a mensagem', async () => {
    let visto;
    const chamar = criarChamarIA({ GROQ_API_KEY: 'chave-q', GROQ_MODEL: 'outro' }, async (url, init) => { visto = { url, init }; return resposta({ choices: [{ message: { content: '{"ok":true}' } }] }); });
    assert.equal(await chamar('oi'), '{"ok":true}');
    assert.equal(visto.url, 'https://api.groq.com/openai/v1/chat/completions');
    assert.equal(visto.init.headers.Authorization, 'Bearer chave-q');
    assert.equal(JSON.parse(visto.init.body).model, 'outro');
});

test('erro do provedor vira ErroProvedor com status e mensagem amigável', async () => {
    const chamar = criarChamarIA({ GROQ_API_KEY: 'q' }, async () => resposta('{"error":"rate"}', 429));
    await assert.rejects(() => chamar('x'), e => e instanceof ErroProvedor && e.status === 429 && e.provedor === 'groq');
    assert.match(mensagemDoErro({ status: 429 }), /limite de uso/);
    assert.match(mensagemDoErro({ status: 413 }), /limite de uso/);
    assert.match(mensagemDoErro({ status: 413, provedor: 'groq' }), /Gemini/);
    assert.match(mensagemDoErro({ status: 401 }), /chave/);
    assert.match(mensagemDoErro({ status: 500 }), /não respondeu/);
});

test('resposta vazia do provedor é erro, não estação em branco', async () => {
    const chamar = criarChamarIA({ GEMINI_API_KEY: 'g' }, async () => resposta({ candidates: [] }));
    await assert.rejects(() => chamar('x'), e => e.status === 502);
});

test('o Gemini devolve 400 para chave inválida: a mensagem reconhece pelo corpo', () => {
    const corpo = '{"error":{"code":400,"message":"API key not valid. Please pass a valid API key.","status":"INVALID_ARGUMENT"}}';
    assert.match(mensagemDoErro({ provedor: 'gemini', status: 400, corpo }), /chave da IA/);
    assert.match(mensagemDoErro({ provedor: 'gemini', status: 404, corpo: 'models/x is not found' }), /modelo/);
    assert.match(mensagemDoErro({ provedor: 'gemini', status: 404, corpo: 'This model is no longer available to new users' }), /modelo/);
    assert.match(mensagemDoErro({ provedor: 'gemini', status: 503, corpo: 'The model is overloaded' }), /sobrecarregada/);
    assert.match(mensagemDoErro({ provedor: 'gemini', status: 400, corpo: 'RESOURCE_EXHAUSTED quota' }), /limite de uso/);
    assert.match(mensagemDoErro({ provedor: 'gemini', status: 400, corpo: 'outra coisa' }), /não respondeu/);
});

test('diagnóstico técnico traz provedor, código e começo da resposta, em uma linha', () => {
    const e = new ErroProvedor('gemini', 400, '{\n  "error": "algo"\n}');
    assert.equal(diagnosticoDoErro(e), 'gemini 400: { "error": "algo" }');
});

test('ordena modelos: Flash cheios do mais novo ao mais antigo, depois os Lite; ignora imagem, áudio, etc.', () => {
    const nomes = ['gemini-2.5-pro', 'gemini-2.5-flash', 'gemini-3.8-flash-lite', 'gemini-3.8-flash', 'gemini-3.8-flash-image', 'gemini-2.5-flash-preview-tts', 'gemini-2.0-flash', 'embedding-001', 'gemini-2.5-flash-live'];
    assert.deepEqual(ordenarModelosGemini(nomes), ['gemini-3.8-flash', 'gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-3.8-flash-lite']);
});

test('Gemini sem cota no preferido: descobre os modelos da chave e usa o próximo que funciona', async () => {
    const chamadas = [];
    const chamar = criarChamarIA({ GEMINI_API_KEY: 'g' }, async (url, init) => {
        chamadas.push(url);
        if (url.endsWith('models?pageSize=200')) return resposta({ models: [
            { name: 'models/gemini-3.8-flash', supportedGenerationMethods: ['generateContent'] },
            { name: 'models/gemini-3.8-flash-lite', supportedGenerationMethods: ['generateContent'] },
            { name: 'models/text-embedding', supportedGenerationMethods: ['embedContent'] }
        ] });
        if (url.includes('gemini-3.8-flash:generateContent')) return resposta('{"error":{"message":"quota, limit: 0"}}', 429);
        return resposta({ candidates: [{ content: { parts: [{ text: '{"ok":1}' }] } }] });
    });
    assert.equal(await chamar('x'), '{"ok":1}');
    assert.equal(chamar.modelo, 'gemini-3.8-flash-lite', 'o modelo que de fato respondeu');
    assert.equal(chamadas.filter(u => u.endsWith('models?pageSize=200')).length, 1);
    // a segunda chamada já começa pelo modelo que funcionou e não lista de novo
    await chamar('y');
    assert.equal(chamadas.filter(u => u.endsWith('models?pageSize=200')).length, 1);
    assert.match(chamadas.at(-1), /gemini-3\.8-flash-lite:generateContent$/);
});

test('Gemini: todos os modelos sem cota => erro final lista os modelos tentados', async () => {
    const chamar = criarChamarIA({ GEMINI_API_KEY: 'g' }, async url => url.endsWith('models?pageSize=200')
        ? resposta({ models: [{ name: 'models/gemini-3.8-flash-lite', supportedGenerationMethods: ['generateContent'] }] })
        : resposta('{"error":"quota"}', 429));
    await assert.rejects(() => chamar('x'), e => e.status === 429 && /modelos tentados: gemini-3\.8-flash, gemini-3\.8-flash-lite/.test(e.corpo));
});

test('Gemini: chave inválida (401/403) NÃO tenta outros modelos', async () => {
    let n = 0;
    const chamar = criarChamarIA({ GEMINI_API_KEY: 'g' }, async () => { n += 1; return resposta('{"error":"nope"}', 403); });
    await assert.rejects(() => chamar('x'), e => e.status === 403);
    assert.equal(n, 1);
});

test('IA_PROVEDOR=groq força a Groq mesmo com chave do Gemini', () => {
    assert.equal(escolherProvedor({ GEMINI_API_KEY: 'g', GROQ_API_KEY: 'q', IA_PROVEDOR: 'groq' }), 'groq');
    assert.equal(escolherProvedor({ GEMINI_API_KEY: 'g', GROQ_API_KEY: 'q' }), 'gemini');
});
