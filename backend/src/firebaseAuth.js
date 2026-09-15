/**
 * Verificação do ID token do Firebase Auth (RS256), sem SDK — mesma
 * lógica de cloudflare-worker/worker.js (verifyFirebaseIdToken), só
 * portada pra rodar em Node em vez do runtime do Worker. As duas
 * implementações usam a mesma API (Web Crypto — Node 19+ expõe
 * globalThis.crypto.subtle igual ao Worker), então mantém as duas
 * como cópias sincronizadas em vez de compartilhar um módulo é uma
 * escolha deliberada: Worker e API não compartilham build/deploy.
 *
 * Usado só nas rotas que expõem dado por usuário (histórico) ou que
 * escrevem na biblioteca compartilhada de estações (import) — o
 * resto do app (sessão OSCE local/anônima, navegação da matriz)
 * continua funcionando sem login, como já era.
 */

const FIREBASE_PROJECT_ID = 'trycktrack-eebae';
const GOOGLE_JWKS_URL = 'https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com';

function base64UrlToBytes(value) {
    const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized + '='.repeat((4 - (normalized.length % 4)) % 4);
    return Uint8Array.from(Buffer.from(padded, 'base64'));
}

function base64UrlToString(value) {
    return new TextDecoder().decode(base64UrlToBytes(value));
}

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

export async function verifyFirebaseIdToken(idToken) {
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

// Middleware Express: exige Authorization: Bearer <id token>, expõe o
// uid verificado em req.uid. Nunca aceita um uid vindo do corpo ou da
// URL sem essa verificação — é o que faltava nas rotas que hoje
// confiam em req.params.userId sem provar quem está perguntando.
export function requireFirebaseAuth() {
    return async (req, res, next) => {
        const authHeader = req.headers.authorization || '';
        const idToken = authHeader.replace(/^Bearer\s+/i, '').trim();
        if (!idToken) return res.status(401).json({ error: 'Autenticação obrigatória.' });
        try {
            const payload = await verifyFirebaseIdToken(idToken);
            req.uid = payload.sub;
            next();
        } catch (error) {
            res.status(401).json({ error: `Sessão inválida: ${error.message}` });
        }
    };
}
