// ============================================================
// Trycktrack — proxy da Groq para geração de estações OSCE
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

const FIREBASE_PROJECT_ID = 'trycktrack-eebae';
const GROQ_MODEL = 'openai/gpt-oss-120b';
const GOOGLE_JWKS_URL = 'https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com';

// Origens que podem chamar este Worker. O GitHub Pages é a produção;
// localhost cobre o teste local do app (python3 -m http.server).
const ALLOWED_ORIGINS = [
    'https://patryckfrota.github.io',
];

// Mesmo schema que existia em OSCE_CONTENT_JSON_SCHEMA no index.html —
// movido pra cá porque agora é o Worker (não mais o cliente) quem monta
// a chamada completa pra Groq. O cliente manda só o prompt.
const OSCE_CONTENT_JSON_SCHEMA = {
    type: 'object',
    properties: {
        title: { type: 'string' },
        difficulty: { type: 'string', enum: ['BÁSICA', 'INTERMEDIÁRIA', 'AVANÇADA'] },
        estimatedMinutes: { type: 'integer' },
        scenario: {
            type: 'object',
            properties: { environment: { type: 'string' }, materials: { type: 'array', items: { type: 'string' } } },
            required: ['environment', 'materials']
        },
        doorInstructions: {
            type: 'object',
            properties: { patientName: { type: 'string' }, age: { type: 'string' }, chiefComplaint: { type: 'string' }, triageSummary: { type: 'string' } },
            required: ['patientName', 'age', 'chiefComplaint', 'triageSummary']
        },
        patientScript: {
            type: 'object',
            properties: {
                profile: {
                    type: 'object',
                    properties: {
                        behavior: { type: 'string' }, tone: { type: 'string' }, emotionalState: { type: 'string' },
                        understanding: { type: 'string' }, concerns: { type: 'string' }, baseline: { type: 'string' }
                    },
                    required: ['behavior', 'tone', 'emotionalState', 'understanding', 'concerns', 'baseline']
                },
                openingStatement: { type: 'string' },
                responses: {
                    type: 'array',
                    items: { type: 'object', properties: { trigger: { type: 'string' }, response: { type: 'string' }, releaseRule: { type: 'string' } }, required: ['trigger', 'response', 'releaseRule'] }
                },
                hiddenInformation: { type: 'array', items: { type: 'string' } }
            },
            required: ['profile', 'openingStatement', 'responses', 'hiddenInformation']
        },
        physicalExam: {
            type: 'array',
            items: { type: 'object', properties: { system: { type: 'string' }, request: { type: 'string' }, findings: { type: 'array', items: { type: 'string' } } }, required: ['system', 'request', 'findings'] }
        },
        complementaryTests: {
            type: 'array',
            items: { type: 'object', properties: { id: { type: 'string' }, name: { type: 'string' }, releaseRule: { type: 'string' }, result: { type: 'string' } }, required: ['id', 'name', 'releaseRule', 'result'] }
        },
        evolution: {
            type: 'array',
            items: { type: 'object', properties: { trigger: { type: 'string' }, change: { type: 'string' } }, required: ['trigger', 'change'] }
        },
        tasks: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'string' }, title: { type: 'string' }, candidateInstructions: { type: 'string' },
                    checklist: {
                        type: 'array',
                        items: {
                            type: 'object',
                            properties: {
                                id: { type: 'string' },
                                axis: { type: 'string', enum: ['COMMUNICATION', 'HISTORY', 'PHYSICAL_EXAM', 'DIAGNOSTIC_REASONING', 'MANAGEMENT'] },
                                description: { type: 'string' }, points: { type: 'number' }, critical: { type: 'boolean' }
                            },
                            required: ['id', 'axis', 'description', 'points', 'critical']
                        }
                    },
                    answerKey: { type: 'string' }
                },
                required: ['id', 'title', 'candidateInstructions', 'checklist', 'answerKey']
            }
        },
        finalAnswer: {
            type: 'object',
            properties: {
                expectedDiagnosis: { type: 'string' }, expectedManagement: { type: 'array', items: { type: 'string' } },
                criticalErrors: { type: 'array', items: { type: 'string' } }, explanation: { type: 'string' }
            },
            required: ['expectedDiagnosis', 'expectedManagement', 'criticalErrors', 'explanation']
        }
    },
    required: ['title', 'difficulty', 'estimatedMinutes', 'scenario', 'doorInstructions', 'patientScript', 'physicalExam', 'complementaryTests', 'evolution', 'tasks', 'finalAnswer']
};

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

        try {
            await verifyFirebaseIdToken(idToken);
        } catch (error) {
            return jsonResponse({ error: `Sessão inválida: ${error.message}` }, 401, headers);
        }

        let body;
        try {
            body = await request.json();
        } catch (_) {
            return jsonResponse({ error: 'Corpo da requisição inválido.' }, 400, headers);
        }

        const prompt = typeof body?.prompt === 'string' ? body.prompt.slice(0, 8000) : '';
        if (!prompt) {
            return jsonResponse({ error: 'Prompt ausente.' }, 400, headers);
        }

        if (!env.GROQ_API_KEY) {
            return jsonResponse({ error: 'Worker sem GROQ_API_KEY configurada (wrangler secret put GROQ_API_KEY).' }, 500, headers);
        }

        let groqResponse;
        try {
            groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${env.GROQ_API_KEY}` },
                body: JSON.stringify({
                    model: GROQ_MODEL,
                    messages: [{ role: 'user', content: prompt }],
                    temperature: 0.9,
                    response_format: { type: 'json_schema', json_schema: { name: 'osce_station_content', strict: false, schema: OSCE_CONTENT_JSON_SCHEMA } }
                })
            });
        } catch (error) {
            return jsonResponse({ error: `Falha ao chamar a Groq: ${error.message}` }, 502, headers);
        }

        const text = await groqResponse.text();
        return new Response(text, { status: groqResponse.status, headers: { ...headers, 'Content-Type': 'application/json' } });
    }
};
