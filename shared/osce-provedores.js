/**
 * Ligação com a IA que escreve as estações: Gemini (preferido, camada
 * gratuita com limite folgado) ou Groq. O núcleo (osce-geracao.js) só
 * conhece `chamarIA(prompt) => texto`; aqui ficam os detalhes de cada API.
 *
 * Por que os dois: uma geração completa usa ~21 mil tokens (ficha, catálogo,
 * exemplo e a estação inteira na resposta), e o plano gratuito da Groq
 * limita a 8 mil tokens por minuto em todos os modelos. A Groq só serve
 * numa conta com limite maior.
 */
export class ErroProvedor extends Error {
    constructor(provedor, status, corpo) {
        super(`${provedor} respondeu ${status}`);
        this.provedor = provedor;
        this.status = status;
        this.corpo = String(corpo || '').slice(0, 500);
    }
}

export function escolherProvedor(env) {
    if (env.IA_PROVEDOR === 'groq' && env.GROQ_API_KEY) return 'groq';
    if (env.GEMINI_API_KEY) return 'gemini';
    if (env.GROQ_API_KEY) return 'groq';
    return null;
}

export function criarChamarIA(env, fetchImpl = fetch) {
    const provedor = escolherProvedor(env);
    if (!provedor) return null;

    if (provedor === 'gemini') {
        const preferido = env.GEMINI_MODEL || 'gemini-3.8-flash';
        const BASE = 'https://generativelanguage.googleapis.com/v1beta';
        let candidatos = [preferido];
        let descobriu = false;

        const tentar = async (modelo, prompt) => {
            const resposta = await fetchImpl(`${BASE}/models/${modelo}:generateContent`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY },
                body: JSON.stringify({
                    contents: [{ role: 'user', parts: [{ text: prompt }] }],
                    generationConfig: { temperature: 0.8, responseMimeType: 'application/json', maxOutputTokens: 16000 }
                })
            });
            const texto = await resposta.text();
            if (!resposta.ok) throw new ErroProvedor('gemini', resposta.status, texto);
            const dados = JSON.parse(texto);
            const saida = (dados.candidates?.[0]?.content?.parts || []).map(p => p.text || '').join('');
            if (!saida) throw new ErroProvedor('gemini', 502, 'resposta sem conteúdo');
            return saida;
        };

        // Modelo aposentado (404), sem cota para a conta (429) ou sobrecarregado
        // (503): em vez de falhar, descobre quais modelos a chave realmente
        // enxerga e tenta os Flash mais novos, um por um.
        const vale = erro => [404, 429, 503].includes(erro.status) || (erro.status === 400 && /not supported|not found/i.test(erro.corpo));

        const chamar = async prompt => {
            let ultimo;
            for (let i = 0; i < candidatos.length; i++) {
                try {
                    const saida = await tentar(candidatos[i], prompt);
                    chamar.modelo = candidatos[i];
                    if (i > 0) candidatos = [candidatos[i], ...candidatos.filter((_, j) => j !== i)];
                    return saida;
                } catch (erro) {
                    if (!(erro instanceof ErroProvedor) || !vale(erro)) throw erro;
                    ultimo = erro;
                    if (!descobriu) {
                        descobriu = true;
                        try {
                            const lista = await fetchImpl(`${BASE}/models?pageSize=200`, { headers: { 'x-goog-api-key': env.GEMINI_API_KEY } });
                            if (lista.ok) {
                                const nomes = (JSON.parse(await lista.text()).models || [])
                                    .filter(m => (m.supportedGenerationMethods || []).includes('generateContent'))
                                    .map(m => String(m.name).replace(/^models\//, ''));
                                candidatos = [...new Set([...candidatos, ...ordenarModelosGemini(nomes).slice(0, 8)])];
                            }
                        } catch (_) { /* sem lista: segue só com o preferido */ }
                    }
                }
            }
            ultimo.corpo = `[modelos tentados: ${candidatos.join(', ')}] ${ultimo.corpo}`;
            throw ultimo;
        };
        chamar.provedor = 'gemini';
        chamar.modelo = preferido;
        return chamar;
    }

    const modelo = env.GROQ_MODEL || 'openai/gpt-oss-120b';
    const chamar = async prompt => {
        const resposta = await fetchImpl('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${env.GROQ_API_KEY}` },
            body: JSON.stringify({ model: modelo, messages: [{ role: 'user', content: prompt }], temperature: 0.8, response_format: { type: 'json_object' } })
        });
        const texto = await resposta.text();
        if (!resposta.ok) throw new ErroProvedor('groq', resposta.status, texto);
        const saida = JSON.parse(texto).choices?.[0]?.message?.content;
        if (!saida) throw new ErroProvedor('groq', 502, 'resposta sem conteúdo');
        return saida;
    };
    chamar.provedor = 'groq';
    chamar.modelo = modelo;
    return chamar;
}

// Mensagem para o aluno a partir do erro do provedor (sem vazar corpo bruto).
// O Gemini responde 400 (e não 401) quando a chave é inválida, por isso o
// corpo também é lido.
export function mensagemDoErro(erro) {
    const corpo = String(erro.corpo || '').toLowerCase();
    if (erro.status === 413 && erro.provedor === 'groq') return 'A Groq não aceita um pedido deste tamanho no plano gratuito (limite de 8 mil tokens por minuto). Configure a chave do Gemini no servidor ou use uma conta Groq com limite maior.';
    if (erro.status === 429 || erro.status === 413 || /quota|rate limit|resource_exhausted/.test(corpo)) return 'A IA atingiu o limite de uso agora. Tente de novo em alguns minutos.';
    if (erro.status === 401 || erro.status === 403 || /api key not valid|api_key_invalid|invalid api key|permission_denied/.test(corpo)) return 'A chave da IA configurada no servidor não foi aceita. Gere uma chave nova e configure de novo.';
    if (erro.status === 404 || /models\/.*not found|is not found|no longer available/.test(corpo)) return 'O modelo de IA configurado no servidor não foi encontrado.';
    if (erro.status === 503 || /overloaded|unavailable/.test(corpo)) return 'A IA está sobrecarregada agora. Tente de novo em instantes.';
    return 'A IA não respondeu agora. Tente de novo em instantes.';
}

// Resumo técnico (para quem mantém o app): provedor, código e o começo da resposta.
export function diagnosticoDoErro(erro) {
    return `${erro.provedor || 'ia'} ${erro.status}: ${String(erro.corpo || '').replace(/\s+/g, ' ').slice(0, 700)}`;
}

// Dos nomes de modelo disponíveis, fica com os de texto da família Flash:
// primeiro os Flash "cheios" do mais novo para o mais antigo, depois os Lite.
export function ordenarModelosGemini(nomes) {
    const versao = nome => parseFloat((nome.match(/gemini-(\d+(?:\.\d+)?)/) || [])[1]) || 0;
    return nomes
        .filter(n => /flash/.test(n) && !/image|tts|live|audio|embedding|robotics|computer|thinking-exp|learnlm|vision|8b/.test(n))
        .sort((a, b) => (/lite/.test(a) - /lite/.test(b)) || (versao(b) - versao(a)) || a.localeCompare(b));
}
