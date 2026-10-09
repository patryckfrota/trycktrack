# Gerador de estações OSCE (Worker) — deploy

Este Worker escreve estações OSCE sob pedido do aluno. As chaves de IA ficam
aqui, como secret do Cloudflare (nunca no app nem no git), e o Worker só
trabalha para quem estiver logado: confere o token do Firebase antes de gastar
cota de IA.

## O que ele faz

1. Recebe `{ rodizio, topico, temaSlug }` do app (com o token do Firebase).
2. Procura a **ficha de diretriz** do tema (`osce/fichas/`). Sem ficha, recusa:
   só gera para tema que tem fonte conferida.
3. Pede à IA uma estação no formato v2 (`osce/MODELO-ESTACAO.md`), com a ficha
   como única fonte de conduta e dose.
4. Roda o **mesmo validador** das estações curadas (`shared/osce-validar.js`).
   Se reprovar, devolve os problemas à IA e tenta de novo (máx. 2 tentativas).
5. Faz uma **auditoria** (segunda chamada) comparando a estação com a ficha.
   Reprovou, tenta de novo com as divergências apontadas.
6. Só devolve ao app a estação que passou nas duas barreiras. O app valida de
   novo antes de jogar.

O código de verdade está em `shared/osce-geracao.js` (testado com
`node --test`); este Worker só liga isso à IA e ao login.

## Qual IA usar

| Chave (secret) | Provedor | Observação |
|---|---|---|
| `GEMINI_API_KEY` | Gemini (`gemini-3.8-flash`, mude com `GEMINI_MODEL` quando o Google aposentar o modelo) | **Preferido.** Chave gratuita em [aistudio.google.com/apikey](https://aistudio.google.com/apikey) |
| `GROQ_API_KEY` | Groq (`openai/gpt-oss-120b`, mude com `GROQ_MODEL`) | Usado se não houver chave do Gemini |

Se as duas existirem, o Gemini é usado.

**Atenção com a Groq:** uma geração completa usa cerca de 21 mil tokens (a
ficha, o catálogo e o exemplo no prompt, e a estação inteira na resposta). O
plano **gratuito** da Groq limita a **8 mil tokens por minuto** em todos os
modelos, então não comporta isso: as gerações falham com "limite de uso". A
Groq só funciona numa conta com limite maior. Confira os limites atuais em
[console.groq.com/docs/rate-limits](https://console.groq.com/docs/rate-limits).

## Pré-requisitos

- Conta na Cloudflare (gratuita) e Node.js (o `wrangler` roda via `npx`).

## Passo a passo

1. **Login na Cloudflare pelo terminal** (uma vez):

   ```bash
   cd cloudflare-worker
   npx wrangler login
   ```

2. **Configurar a chave de IA** (cole só no prompt, nunca em arquivo ou chat):

   ```bash
   npx wrangler secret put GEMINI_API_KEY
   # ou, se tiver limite maior na Groq:
   npx wrangler secret put GROQ_API_KEY
   ```

3. **Publicar o Worker** (empacota também o catálogo, o validador e as fichas
   da pasta `osce/`, então publique de novo sempre que mudar algum deles):

   ```bash
   npx wrangler deploy
   ```

   Para só conferir que empacota, sem publicar: `npx wrangler deploy --dry-run`.

## Liberar um tema novo

1. Crie a ficha em `osce/fichas/<tema>.json` (modelo:
   `urgencia-b-4-sindromes-coronarianas-agudas.json`), com status `PUBLICADA`.
2. Importe-a e adicione à lista `FICHAS` em `worker.js`.
3. Rode `node osce/build.mjs` (o app só mostra "Gerar estação" nos temas
   listados em `osce/indice.json`) e publique o Worker de novo.

## Limite de gerações por usuário

20 gerações/hora por pessoa, via o namespace de KV `OSCE_RATE_LIMIT_KV` (id em
`wrangler.toml`). Para mudar, edite `GENERATION_RATE_LIMIT_MAX` em `worker.js`
e publique de novo. Cada geração pode usar de 2 a 4 chamadas à IA (geração,
auditoria e repetições).

## Manutenção

- **Trocar uma chave:** `npx wrangler secret put ...` de novo sobrescreve a anterior.
- **Ver logs em tempo real:** `npx wrangler tail`.
- **Quem pode chamar o Worker:** a lista `ALLOWED_ORIGINS` no topo de
  `worker.js` — hoje só `https://patryckfrota.github.io` e localhost.
- **Custo:** o plano gratuito da Cloudflare cobre 100.000 requisições/dia, bem
  acima do uso previsto. O custo real é o da IA escolhida.
