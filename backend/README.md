# Trilhas dinâmicas — backend

Esta pasta é a camada de produção das Trilhas de Estudo. O PWA mantém uma
prévia local em `localStorage`; esta API permite sincronizar o plano por conta.

1. Crie um PostgreSQL e defina `DATABASE_URL`.
2. Rode `npm install` e `npx prisma migrate dev --name init`.
3. Rode `npm run dev`.

## Banco: Supabase (Postgres)

Desde 2026-09-29 o banco é o Postgres do Supabase (região São Paulo); antes
era o Neon, que fica só como backup por algumas semanas. Duas variáveis:

- `DATABASE_URL`: pooler em modo transação (porta 6543, com `?pgbouncer=true`).
  É a que o app usa (Render, GitHub Actions e `backend/.env`).
- `DIRECT_URL`: pooler em modo sessão (porta 5432). Só o `prisma migrate` usa;
  o Render e o CI não precisam dela.

Se a senha tiver caractere especial, ele precisa ir codificado na URL
(`*` vira `%2A`, `@` vira `%40`, `?` vira `%3F`).

`src/prismaClient.js` ainda usa `@prisma/adapter-neon`; ele fala com qualquer
Postgres e foi testado contra o Supabase, então foi mantido. Os repositórios
e scripts chamam `getPrismaClient()`, não crie `new PrismaClient()` direto.

Migrations: `npx prisma migrate deploy` (usa `DIRECT_URL`). Importar questões:
`npm run import:questions` (carrega o `.env`; `node scripts/...` direto não
carrega). O import faz upsert em lote e **mantém** questões órfãs que têm
progresso de usuário (remapeie o progresso antes de removê-las).

O plano Free do Supabase não faz backup automático: o workflow
`backup-banco.yml` gera um dump criptografado toda semana (ver o cabeçalho
dele para restaurar).

`POST /api/trails/:trailId/recalculate` recebe os temas, as respostas de um
diagnóstico ou simulado e os temas já concluídos. A resposta devolve apenas os
temas pendentes, ordenados por incidência do edital e urgência por desempenho.

## OSCE importável

Nesta versão, o aplicativo não chama APIs de IA. As estações são produzidas
externamente e importadas como JSON validado. O contrato oficial está em
`schemas/osce-station.schema.json`; a validação executável está em
`src/osceStation.schema.js`.

- `POST /api/osce/import/preview`: valida uma estação ou `{ "stations": [] }`
  e informa duplicatas sem gravar.
- `POST /api/osce/import`: valida, separa conteúdo público/protegido e grava.
- `GET /api/osce/stations`: biblioteca filtrável por `area`, `theme`,
  `subtheme` e `format`.
- `GET /api/osce/stations/random`: sorteia dentro dos mesmos filtros.
- `GET /api/osce/stations/:stationId/versions`: histórico de versões.
- `GET /api/osce/me/history`: histórico de tentativas de quem está autenticado
  (Firebase, `Authorization: Bearer <id token>`) — nunca de outro `userId` pela
  URL.

A deduplicação usa SHA-256 do conteúdo normalizado. Um mesmo subtema pode ter
quantas estações e versões forem necessárias, desde que o conteúdo não seja
idêntico. O gabarito é armazenado em `evaluatorContentJson` e nunca integra as
respostas do modo avaliando antes do encerramento final.

## QuestHub (persistência do banco de questões)

Até aqui o QuestHub não tinha tabela nenhuma — as questões só existiam como
arrays literais em `questions-*.js`, lidos direto pelo PWA. Isso resolve só a
metade "onde os dados moram": os modelos `Question`/`QuestionOption`/
`QuestionExplanation` (ver `prisma/migrations/20260915120000_questhub_persistence`)
dão uma cópia consultável do acervo no Postgres. O PWA **continua** carregando
via `<script>` normalmente — nada na arquitetura do app muda com isto; migrar
o carregamento em si (e construir sincronização de histórico por conta) é
funcionalidade futura, não este passo.

1. Com `DATABASE_URL` configurado e alcançável, aplique a migração:
   ```bash
   npx prisma migrate deploy
   ```
2. Importe o acervo atual dos arquivos estáticos:
   ```bash
   npm run import:questions          # importa de verdade
   npm run import:questions -- --dry-run   # só conta e valida, não escreve
   npm run import:questions -- --verify    # confere uma amostra contra o banco já importado
   ```
   É idempotente (usa upsert) — rode de novo depois de editar um enunciado ou
   escrever uma explicação nova em `questions-*.js` para sincronizar.

`QuestionResponse` (histórico de resposta por usuário e por questão) já existe
na migração, mas nenhuma rota escreve nela ainda — é a peça que falta pra
sincronizar progresso entre aparelhos, propositalmente fora do escopo deste
passo.
