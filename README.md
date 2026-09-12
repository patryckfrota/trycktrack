# Trycktrack

PWA de preparação para provas de residência médica (Revalida/INEP, ENAMED) —
Rapid Review por capítulos, banco de questões com explicação comentada,
Trilhas de estudo adaptativas e um simulador de estações de OSCE com IA.

Front-end estático (HTML + CSS + JS embutidos em `index.html`, sem build,
sem framework) publicado no GitHub Pages. Login e sincronização de
progresso via Firebase (Auth + Firestore).

## Estrutura

- `index.html` — o app inteiro (HTML, CSS e JS).
- `questions-*.js` — banco de questões, um arquivo por área/prova; cada um
  concatena em `window.TRYCKTRACK_QUESTION_BANK` (a ordem de carregamento
  no `<head>` do `index.html` importa). **Gerados a partir dos PDFs
  originais — não editar manualmente.**
- `question-explanations.js` — explicações comentadas, casadas por `id` com
  o banco de questões acima. Carregado sob demanda (só quando alguém
  responde uma questão), não no carregamento inicial.
- `osce-stations.js` — estações de OSCE cadastradas localmente (fallback
  quando não há geração por IA nem estação salva na biblioteca
  compartilhada).
- `pdf-export.js` + `vendor/pdf-lib.min.js` + `vendor/fontkit.umd.min.js` —
  geração de PDF (listas de questões, Rapid Review). Carregados sob
  demanda no primeiro download, não no carregamento inicial.
- `manifest.json` + `sw.js` — PWA instalável com cache offline
  (stale-while-revalidate para a maioria dos recursos; HTML sempre busca
  versão nova quando há rede).
- `cloudflare-worker/` — proxy que fica entre o app e a API da Groq (geração
  de estações de OSCE com IA), pra chave da Groq não ficar exposta no
  código do site. Ver `cloudflare-worker/README.md` para o deploy.
- `backend/` — API em Express/Prisma para sessões de OSCE (áreas, temas,
  estações, avaliação). **Não está publicada em produção** — o app hoje
  roda inteiramente no modo local (`isLocal`) quando não encontra esse
  backend no ar; ver `backend/README.md`.
- `DESIGN_SYSTEM.md` — paleta, tipografia e a receita de "vidro líquido"
  usadas em todo o app; qualquer componente novo deve reaproveitar esses
  tokens.

## Rodar localmente

```bash
cd /caminho/para/trycktrack
python3 -m http.server 8000
```

Abra `http://localhost:8000`. Não use `file://` direto — o Service
Worker e os `fetch` de scripts carregados sob demanda precisam de um
servidor HTTP, mesmo que local.

## Publicar

O site é servido pelo GitHub Pages a partir da branch `main` (a raiz do
repositório). Um `git push` para `main` já atualiza o site publicado —
sem passo de build no meio.

## Instalar como app (PWA)

**iPhone (Safari):**
1. Abra a URL publicada no Safari (precisa ser Safari — Chrome no iOS
   não suporta este passo).
2. Toque em **Compartilhar** → **Adicionar à Tela de Início**.

**Android/Desktop (Chrome/Edge):** o navegador oferece "Instalar app"
automaticamente ao detectar o manifest — ou pelo menu do navegador.

Em ambos os casos a instalação usa o `manifest.json` e o `sw.js` deste
repositório; nenhum passo extra de configuração é necessário.
