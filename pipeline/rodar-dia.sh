#!/usr/bin/env bash
# Uma rodada da ingestão automática (chamada todo dia pelo GitHub Actions,
# .github/workflows/ingestao-diaria.yml). Fluxo:
#   fila (proxima.cjs) → motor do Gemini → portão (validar.cjs)
#   → aprovado: registra no app, commita, publica e sincroniza o Postgres
#   → reprovado: descarta o que o motor gravou, guarda o lote em
#     pipeline/pendencias/ e segue pra frente no dia seguinte.
set -euo pipefail
cd "$(dirname "$0")/.."

CONTEUDO=(question-explanations.js index.html sw.js)

# Esta rodada descarta gravações do motor quando o lote é reprovado; fora do
# CI isso apagaria trabalho local não commitado, então só roda em árvore limpa.
if [ "${CI:-}" != "true" ] && [ -n "$(git status --porcelain -- 'questions-*.js' "${CONTEUDO[@]}")" ]; then
  echo "Há mudanças não commitadas em arquivos de conteúdo — rode só com a árvore limpa (ou no CI)." >&2
  exit 1
fi

publicar() { git push; gh api -X POST "repos/${GITHUB_REPOSITORY}/pages/builds" >/dev/null 2>&1 || true; }

# Escreve o resultado do dia no resumo do próprio run do Actions — é o que
# aparece na aba Actions e no corpo do e-mail de notificação do GitHub
# (Settings → Notifications → Actions, "All workflow runs"), sem depender
# de ninguém rodar isso ou ficar de olho manualmente.
resumo() { echo "$1" | tee -a "${GITHUB_STEP_SUMMARY:-/dev/null}" >/dev/null; echo "$1"; }

trabalho=$(node pipeline/proxima.cjs)
if [ "$trabalho" = "null" ]; then
  semFonte=$(node -p 'require("./pipeline/estado.json").semFonte.length')
  resumo "## Ingestão diária — $(date -u +%F)
Nenhuma banca/ano com página cadastrada na fila. Aguardando fonte: $semFonte (ver \`pipeline/estado.json\`)."
  git add pipeline/estado.json
  git diff --cached --quiet || { git commit -m "fila: atualiza bancas sem fonte cadastrada"; publicar; }
  exit 0
fi

campo() { node -p "JSON.parse(process.argv[1]).$1" "$trabalho"; }
url=$(campo url); prefixo=$(campo prefixo); inicio=$(campo inicio); limite=$(campo limite)
echo "Hoje: $prefixo — questões a partir da $inicio (até $limite)"

descartar_gravacoes() {
  git checkout -- $(git ls-files 'questions-*.js') "${CONTEUDO[@]}"
  git clean -fq -- 'questions-*.js'
}

rm -f tmp/extracted-*.json
if ! npx tsx scripts/ingestion/index.ts --url "$url" --prefix "$prefixo" --start "$inicio" --limit "$limite"; then
  resumo "## Ingestão diária — $(date -u +%F)
❌ **$prefixo, questões $inicio–$((inicio + limite - 1))**: motor falhou (erro técnico ou API do Gemini fora do ar). Sem alteração no banco. Tenta de novo amanhã do mesmo ponto."
  descartar_gravacoes
  git add pipeline/estado.json
  git diff --cached --quiet || { git commit -m "fila: começa $prefixo"; publicar; }
  exit 0
fi

dump=$(ls -t tmp/extracted-*.json | head -1)
n=$(node -p "require('./$dump').items.length")
fim=$((inicio + n - 1))
mkdir -p pipeline/entrada
entrada="pipeline/entrada/extracted-${prefixo}-q${inicio}.json"
cp "$dump" "$entrada"

if node pipeline/validar.cjs "$entrada"; then
  node pipeline/registrar-bancos.cjs
  node pipeline/proxima.cjs avancar "$n"
  git add -- 'questions-*.js' "${CONTEUDO[@]}" pipeline/entrada pipeline/estado.json pipeline/revisoes
  git commit -m "conteúdo: $prefixo, questões $inicio–$fim (aprovadas no portão)"
  publicar
  dbMsg="⚠️ \`DATABASE_URL\` não configurada — o Postgres não foi sincronizado."
  if [ -n "${DATABASE_URL:-}" ]; then
    (cd backend && npm ci --no-audit --no-fund && npx prisma generate && node scripts/import-questions.js)
    dbMsg="Postgres sincronizado."
  fi
  resumo "## Ingestão diária — $(date -u +%F)
✅ **$prefixo, questões $inicio–$fim** ($n questões): aprovadas no portão e publicadas. $dbMsg"
else
  descartar_gravacoes
  mkdir -p pipeline/pendencias
  git mv -f "$entrada" "pipeline/pendencias/" 2>/dev/null || mv "$entrada" pipeline/pendencias/
  node pipeline/proxima.cjs avancar "$n"
  git add pipeline/pendencias pipeline/estado.json pipeline/revisoes
  git commit -m "pendência: $prefixo, questões $inicio–$fim reprovadas no portão"
  publicar
  resumo "## Ingestão diária — $(date -u +%F)
🚫 **$prefixo, questões $inicio–$fim** ($n questões): reprovadas no portão, nada publicado. Lote guardado em \`pipeline/pendencias/\` para revisão. Detalhe por categoria: ver o relatório em \`pipeline/relatorios/\` deste run."
fi
