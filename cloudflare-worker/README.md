# Proxy da Groq (OSCE) — deploy

Este Worker resolve o achado **C-04** da auditoria: a chave da Groq deixa de
viver no `index.html` (visível a qualquer visitante) e passa a viver aqui,
como secret do Cloudflare, só acessível pelo próprio Worker. O `index.html`
passa a chamar este Worker em vez da Groq diretamente, mandando o token de
login do Firebase — o Worker confere esse token antes de gastar a cota da
Groq.

## Pré-requisitos

- Conta na Cloudflare (gratuita — [dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)).
- Node.js instalado (para rodar o `wrangler` via `npx`, sem precisar instalar nada global).

## Passo a passo

1. **Login na Cloudflare pelo terminal:**

   ```bash
   cd cloudflare-worker
   npx wrangler login
   ```

   Abre o navegador para você autorizar. Só precisa fazer isso uma vez.

2. **Publicar o Worker:**

   ```bash
   npx wrangler deploy
   ```

   Ao final, o terminal mostra a URL pública, algo como:
   `https://trycktrack-osce-proxy.SEU-SUBDOMINIO.workers.dev`

   Guarde essa URL — é ela que vai entrar no `index.html` no próximo passo.

3. **Configurar a chave da Groq como secret** (nunca em arquivo versionado):

   ```bash
   npx wrangler secret put GROQ_API_KEY
   ```

   Cole a chave quando pedido (pode ser a mesma que já está em uso, ou gerar
   uma nova em [console.groq.com](https://console.groq.com) — se gerar uma
   nova, revogue a antiga lá também, já que ela ficou exposta no código por
   um tempo).

4. **Atualizar o `index.html`:** troque o valor de `OSCE_PROXY_URL` (perto de
   onde ficava `GROQ_API_KEY`) pela URL do passo 2. Depois disso a geração de
   estações OSCE passa a usar o proxy.

## Testar

Com o Worker publicado e a URL trocada no `index.html`, gere uma estação
normalmente pelo app (logado). Se aparecer "Sessão inválida" ou "Faça login
para gerar uma estação com IA", confira se está logado no app — o Worker
exige um usuário autenticado do Firebase.

## Manutenção

- **Trocar a chave da Groq:** `npx wrangler secret put GROQ_API_KEY` de novo,
  sobrescreve a anterior.
- **Ver logs em tempo real:** `npx wrangler tail`.
- **Alterar quem pode chamar o Worker:** a lista `ALLOWED_ORIGINS` no topo de
  `worker.js` — hoje só libera `https://patryckfrota.github.io` e localhost.
- **Custo:** plano gratuito da Cloudflare cobre 100.000 requisições/dia, bem
  acima do que este app usa. Sem cartão de crédito exigido para o free tier
  de Workers.
