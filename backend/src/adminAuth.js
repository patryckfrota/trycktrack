/**
 * Autenticação do painel de gestão. Reaproveita o mesmo Firebase ID
 * token já verificado por requireFirebaseAuth (firebaseAuth.js) — a
 * única coisa nova aqui é conferir se o e-mail do token está na
 * allowlist de admins (ADMIN_EMAILS no .env, separado por vírgula).
 * Nenhuma tabela de "roles" nova: a lista de quem é admin é pequena e
 * muda raramente, então uma env var já resolve sem precisar de schema.
 */
import { verifyFirebaseIdToken } from './firebaseAuth.js';

function getAdminEmails() {
    return (process.env.ADMIN_EMAILS || '')
        .split(',')
        .map(email => email.trim().toLowerCase())
        .filter(Boolean);
}

export function requireAdminAuth() {
    return async (req, res, next) => {
        const authHeader = req.headers.authorization || '';
        const idToken = authHeader.replace(/^Bearer\s+/i, '').trim();
        if (!idToken) return res.status(401).json({ error: 'Autenticação obrigatória.' });
        try {
            const payload = await verifyFirebaseIdToken(idToken);
            const email = (payload.email || '').toLowerCase();
            const adminEmails = getAdminEmails();
            if (!email || !adminEmails.includes(email)) {
                return res.status(403).json({ error: 'Esta conta não tem acesso ao painel de gestão.' });
            }
            req.uid = payload.sub;
            req.adminEmail = email;
            next();
        } catch (error) {
            res.status(401).json({ error: `Sessão inválida: ${error.message}` });
        }
    };
}
