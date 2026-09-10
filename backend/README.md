# Trilhas dinâmicas — backend

Esta pasta é a camada de produção das Trilhas de Estudo. O PWA mantém uma
prévia local em `localStorage`; esta API permite sincronizar o plano por conta.

1. Crie um PostgreSQL e defina `DATABASE_URL`.
2. Rode `npm install` e `npx prisma migrate dev --name init`.
3. Rode `npm run dev`.

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
- `GET /api/osce/users/:userId/history`: histórico de tentativas.

A deduplicação usa SHA-256 do conteúdo normalizado. Um mesmo subtema pode ter
quantas estações e versões forem necessárias, desde que o conteúdo não seja
idêntico. O gabarito é armazenado em `evaluatorContentJson` e nunca integra as
respostas do modo avaliando antes do encerramento final.
