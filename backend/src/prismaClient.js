/**
 * Ponto único de criação do PrismaClient — usa o driver HTTP do Neon
 * (@prisma/adapter-neon) em vez da conexão Postgres crua (porta 5432)
 * que o Prisma tenta por padrão. Motivo: a porta 5432 fica bloqueada
 * em bastante rede doméstica/corporativa (confirmado neste projeto —
 * `nc` na 5432 dava timeout nas três IPs do Neon, enquanto a 443
 * conectava na hora), e não tem como consertar isso do lado do app —
 * só trocando o transporte. O adapter fala com o Neon por HTTPS/
 * WebSocket (porta 443), então funciona em qualquer rede que já deixa
 * passar tráfego HTTPS normal.
 *
 * Não muda nada do schema nem das queries — é só o "como conectar",
 * escondido atrás desta única função. Os repositórios (osceRepository.js,
 * syncRepository.js) e os scripts (import-questions.js, prisma/seed.js)
 * chamam getPrismaClient() em vez de `new PrismaClient()` direto.
 */
import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

// O driver do Neon usa WebSocket pra suportar transação/pool completos
// (o modo só-HTTP do Neon não cobre tudo que o Prisma precisa) — fora
// do navegador precisa de um construtor de WebSocket injetado.
neonConfig.webSocketConstructor = ws;

let sharedClient = null;

export function getPrismaClient() {
    if (sharedClient) return sharedClient;
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) throw new Error('DATABASE_URL não configurada.');
    const adapter = new PrismaNeon({ connectionString });
    sharedClient = new PrismaClient({ adapter });
    return sharedClient;
}
