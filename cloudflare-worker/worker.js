// ============================================================
// Trycktrack — geração de estações OSCE por IA (Gemini ou Groq)
// ------------------------------------------------------------
// Existe pra resolver o achado C-04 da auditoria: a chave da Groq
// não pode mais viver no index.html (qualquer visitante do site
// consegue lê-la e consumir a cota diária compartilhada de todo
// mundo). Este Worker guarda a chave como secret (nunca aparece
// no código nem no bundle) e só a usa depois de conferir que quem
// chamou tem uma sessão Firebase válida do próprio Trycktrack.
//
// Fluxo: index.html manda { prompt } com Authorization: Bearer
// <ID token do Firebase Auth> -> este Worker verifica a assinatura
// e as claims do token (sem SDK — só fetch + WebCrypto, que é tudo
// que o runtime do Worker tem) -> chama a Groq com a chave secreta
// -> devolve a resposta da Groq (JSON) como veio.
//
// Deploy: ver README.md nesta mesma pasta.
// ============================================================

import { gerarEstacao, ErroGeracao } from '../shared/osce-geracao.js';
import { criarChamarIA, ErroProvedor, mensagemDoErro, diagnosticoDoErro } from '../shared/osce-provedores.js';
import catalogo from '../osce/catalogo.json';
import exemploDeFormato from '../osce/estacoes/cm-dor-toracica-001.json';
import fichaSindromesCoronarianas from '../osce/fichas/urgencia-b-4-sindromes-coronarianas-agudas.json';

const FIREBASE_PROJECT_ID = 'trycktrack-eebae';
const GOOGLE_JWKS_URL = 'https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com';
const GENERATION_RATE_LIMIT_MAX = 20;
const GENERATION_RATE_LIMIT_WINDOW_SECONDS = 3600;

// Fichas de diretriz disponíveis: só gero estação para tema que tem ficha.
// Para liberar um tema novo, crie a ficha em osce/fichas/ e adicione aqui.
const FICHAS = Object.fromEntries([fichaSindromesCoronarianas].map(ficha => [ficha.id, ficha]));

// Origens que podem chamar este Worker. O GitHub Pages é a produção;
// localhost cobre o teste local do app (python3 -m http.server).
const ALLOWED_ORIGINS = [
    'https://patryckfrota.github.io',
];

function corsHeaders(origin) {
    const isLocalhost = origin && /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
    const allow = ALLOWED_ORIGINS.includes(origin) || isLocalhost ? origin : ALLOWED_ORIGINS[0];
    return {
        'Access-Control-Allow-Origin': allow,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Vary': 'Origin',
    };
}

function jsonResponse(body, status, headers) {
    return new Response(JSON.stringify(body), { status, headers: { ...headers, 'Content-Type': 'application/json' } });
}

function base64UrlToBytes(value) {
    const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4);
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
}

function base64UrlToString(value) {
    return new TextDecoder().decode(base64UrlToBytes(value));
}

// Cache simples em memória do processo do Worker — sobrevive entre
// requisições enquanto o isolate estiver quente, e respeita o
// Cache-Control que o Google manda (normalmente várias horas), então
// não bate no endpoint do Google a cada geração de estação.
let cachedJwks = null;
let cachedJwksExpiresAt = 0;

async function getGoogleJwks() {
    if (cachedJwks && Date.now() < cachedJwksExpiresAt) return cachedJwks;
    const res = await fetch(GOOGLE_JWKS_URL);
    if (!res.ok) throw new Error('Não foi possível buscar as chaves públicas do Google.');
    const data = await res.json();
    const maxAgeMatch = (res.headers.get('cache-control') || '').match(/max-age=(\d+)/);
    cachedJwks = data.keys || [];
    cachedJwksExpiresAt = Date.now() + (maxAgeMatch ? Number(maxAgeMatch[1]) * 1000 : 3600000);
    return cachedJwks;
}

// Verificação manual do ID token do Firebase Auth (RS256), sem SDK —
// o runtime do Worker não tem Node, só fetch + WebCrypto. Confere
// assinatura, emissor, audiência e validade, igual o Firebase Admin
// SDK faria no lado de um backend Node.
async function verifyFirebaseIdToken(idToken) {
    const parts = idToken.split('.');
    if (parts.length !== 3) throw new Error('token malformado');
    const [headerB64, payloadB64, signatureB64] = parts;

    const header = JSON.parse(base64UrlToString(headerB64));
    const payload = JSON.parse(base64UrlToString(payloadB64));

    if (header.alg !== 'RS256') throw new Error('algoritmo de assinatura inesperado');

    const now = Math.floor(Date.now() / 1000);
    if (typeof payload.exp !== 'number' || payload.exp <= now) throw new Error('token expirado');
    if (typeof payload.iat !== 'number' || payload.iat > now + 60) throw new Error('token emitido no futuro');
    if (payload.aud !== FIREBASE_PROJECT_ID) throw new Error('token de outro projeto Firebase');
    if (payload.iss !== `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`) throw new Error('emissor inesperado');
    if (!payload.sub || typeof payload.sub !== 'string') throw new Error('token sem uid (sub)');

    const jwks = await getGoogleJwks();
    const jwk = jwks.find(key => key.kid === header.kid);
    if (!jwk) throw new Error('chave pública não encontrada para este token (kid desconhecido)');

    const publicKey = await crypto.subtle.importKey(
        'jwk', jwk, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']
    );
    const signedData = new TextEncoder().encode(`${headerB64}.${payloadB64}`);
    const signatureBytes = base64UrlToBytes(signatureB64);
    const isValid = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', publicKey, signatureBytes, signedData);
    if (!isValid) throw new Error('assinatura inválida');

    return payload; // payload.sub é o uid do usuário autenticado
}

// Janela fixa (não deslizante) por hora corrente: chave
// "osce-gen:<uid>:<hora Unix>". KV não tem incremento atômico, mas o
// pior caso de corrida (duas gerações quase simultâneas lendo a mesma
// contagem antes de gravar) deixa passar 1 geração a mais na janela —
// aceitável pra frear abuso, não é um limite de faturamento exato.
// env.OSCE_RATE_LIMIT_KV ausente (binding ainda não provisionado, ver
// README.md desta pasta) => não bloqueia ninguém, só não limita ainda.
async function checkGenerationRateLimit(env, uid) {
    if (!env.OSCE_RATE_LIMIT_KV) return { limited: false, max: GENERATION_RATE_LIMIT_MAX };
    const bucket = Math.floor(Date.now() / (GENERATION_RATE_LIMIT_WINDOW_SECONDS * 1000));
    const key = `osce-gen:${uid}:${bucket}`;
    const current = Number(await env.OSCE_RATE_LIMIT_KV.get(key)) || 0;
    if (current >= GENERATION_RATE_LIMIT_MAX) return { limited: true, max: GENERATION_RATE_LIMIT_MAX };
    await env.OSCE_RATE_LIMIT_KV.put(key, String(current + 1), { expirationTtl: GENERATION_RATE_LIMIT_WINDOW_SECONDS });
    return { limited: false, max: GENERATION_RATE_LIMIT_MAX };
}

export default {
    async fetch(request, env) {
        const origin = request.headers.get('Origin');
        const headers = corsHeaders(origin);

        if (request.method === 'OPTIONS') {
            return new Response(null, { status: 204, headers });
        }
        if (request.method !== 'POST') {
            return jsonResponse({ error: 'Método não permitido.' }, 405, headers);
        }

        const authHeader = request.headers.get('Authorization') || '';
        const idToken = authHeader.replace(/^Bearer\s+/i, '').trim();
        if (!idToken) {
            return jsonResponse({ error: 'Faça login para gerar uma estação com IA.' }, 401, headers);
        }

        let uid;
        try {
            uid = (await verifyFirebaseIdToken(idToken)).sub;
        } catch (error) {
            return jsonResponse({ error: `Sessão inválida: ${error.message}` }, 401, headers);
        }

        // Cada geração é uma chamada PAGA à Groq — sem isto, um uid
        // autenticado (já passou pela verificação acima) podia disparar
        // gerações em laço e consumir a cota compartilhada sozinho. Limite
        // por pessoa, não por IP (mais justo e não afetado por rede
        // compartilhada/CGNAT). RATE_LIMIT_OSCE_GENERATION é um binding de
        // KV — se ainda não foi provisionado (ver README.md desta pasta),
        // a checagem é pulada (isRateLimited sempre false) em vez de
        // quebrar a geração pra quem já está usando o Worker hoje.
        const rateLimit = await checkGenerationRateLimit(env, uid);
        if (rateLimit.limited) {
            return jsonResponse({ error: `Limite de gerações por hora atingido (${rateLimit.max}). Tente novamente mais tarde.` }, 429, headers);
        }

        let body;
        try {
            body = await request.json();
        } catch (_) {
            return jsonResponse({ error: 'Corpo da requisição inválido.' }, 400, headers);
        }

        const { rodizio, topico, temaSlug, cenarioId } = body || {};
        if (typeof rodizio !== 'string' || typeof topico !== 'string' || typeof temaSlug !== 'string') {
            return jsonResponse({ error: 'Informe rodizio, topico e temaSlug do tema desejado.' }, 400, headers);
        }
        const ficha = FICHAS[`${rodizio}/${topico}/${temaSlug}`] || null;
        if (!ficha) {
            return jsonResponse({ error: 'Este tema ainda não tem ficha de diretriz, então não gero estação para ele.' }, 422, headers);
        }

        const chamarIA = criarChamarIA(env);
        if (!chamarIA) {
            return jsonResponse({ error: 'Servidor sem chave de IA (wrangler secret put GEMINI_API_KEY ou GROQ_API_KEY).' }, 500, headers);
        }

        try {
            const { estacao, auditoria } = await gerarEstacao({
                ficha, catalogo, exemplo: exemploDeFormato, chamarIA,
                cenarioId: typeof cenarioId === 'string' ? cenarioId : null,
                modelo: () => `${chamarIA.provedor}:${chamarIA.modelo}`
            });
            return jsonResponse({ estacao, auditoria }, 200, headers);
        } catch (erro) {
            if (erro instanceof ErroGeracao) {
                console.error('Geração reprovada', erro.tipo, JSON.stringify(erro.detalhes));
                return jsonResponse({ error: erro.message, tipo: erro.tipo, detalhes: erro.detalhes }, 422, headers);
            }
            if (erro instanceof ErroProvedor) {
                console.error('IA respondeu erro', erro.provedor, erro.status, erro.corpo);
                const limite = erro.status === 429 || erro.status === 413;
                return jsonResponse({ error: mensagemDoErro(erro), tipo: limite ? 'limite' : 'ia', detalhes: [diagnosticoDoErro(erro)] }, limite ? 429 : 502, headers);
            }
            console.error('Falha inesperada ao gerar estação', erro);
            return jsonResponse({ error: 'Falha inesperada ao gerar a estação.' }, 500, headers);
        }
    }
};
