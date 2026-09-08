# Trycktrack

App web (single-file) de preparação para residência médica. Sem backend, sem build, sem dependência nativa.

## Arquivos

- `index.html` — app completo (HTML + CSS + JS embutidos)
- `icon-180.png` — ícone usado na tela de início ao instalar

## Rodar localmente

```bash
cd /Users/patryckfrota/projects/trycktrack
python3 -m http.server 8000
```

Abra `http://localhost:8000` no navegador.

## Instalar como app (PWA via Safari)

1. Publique os 2 arquivos num host (Vercel, Netlify, GitHub Pages) ou sirva na mesma rede Wi-Fi do iPhone (`python3 -m http.server 8000`).
2. No **iPhone, abra a URL no Safari** (precisa ser Safari — Chrome não suporta este passo).
3. Toque em **Compartilhar** → **Adicionar à Tela de Início**.
4. O ícone aparece na tela de início e abre em tela cheia, sem a barra do Safari.

Não há manifest.json nem service worker — a instalação usa apenas as meta tags `apple-mobile-web-app-*` já embutidas no `index.html`.
