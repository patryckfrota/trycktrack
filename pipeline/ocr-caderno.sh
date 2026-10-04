#!/usr/bin/env bash
# OCR de um caderno cujo PDF não tem camada de texto legível (ex.: USP-SP 2024, fonte
# Type 3 sem Unicode). Gera tmp/pdfs/<examId>-caderno.ocr.txt, que o portão
# (fidelidade.cjs / imagens-pagina.cjs) passa a usar como fonte do texto da prova.
#
#   bash pipeline/ocr-caderno.sh usp-sp-2024
#
# Precisa de: pdftoppm (poppler), tesseract (brew install tesseract) e o idioma português
# em tmp/tessdata/por.traineddata (tessdata_fast, ~2 MB):
#   mkdir -p tmp/tessdata && curl -L -o tmp/tessdata/por.traineddata \
#     https://github.com/tesseract-ocr/tessdata_fast/raw/main/por.traineddata
set -euo pipefail
EXAM="${1:?uso: ocr-caderno.sh <examId>}"
cd "$(dirname "$0")/.."
PDF=$(ls tmp/pdfs/"$EXAM"-caderno*.pdf 2>/dev/null | head -1 || true)
[ -n "$PDF" ] || { echo "PDF não encontrado: tmp/pdfs/$EXAM-caderno*.pdf" >&2; exit 1; }
command -v tesseract >/dev/null || { echo "tesseract não instalado (brew install tesseract)" >&2; exit 1; }
[ -f tmp/tessdata/por.traineddata ] || { echo "falta tmp/tessdata/por.traineddata (veja o cabeçalho deste script)" >&2; exit 1; }
export TESSDATA_PREFIX="$PWD/tmp/tessdata" OMP_THREAD_LIMIT=1
OUT="tmp/ocr_$EXAM"; rm -rf "$OUT"; mkdir -p "$OUT"
N=$(pdfinfo "$PDF" | awk '/Pages/{print $2}')
seq 1 "$N" | xargs -P 4 -I{} bash -c 'p=$(printf "%03d" {}); pdftoppm -r 200 -gray -png -f {} -l {} "'"$PDF"'" "'"$OUT"'/p$p" && tesseract "'"$OUT"'"/p$p-*.png "'"$OUT"'/p$p" -l por --psm 3 >/dev/null 2>&1'
for i in $(seq 1 "$N"); do cat "$OUT/p$(printf '%03d' "$i").txt"; printf '\f'; done > "tmp/pdfs/$EXAM-caderno.ocr.txt"
echo "OCR de $EXAM: $N páginas, $(wc -c < "tmp/pdfs/$EXAM-caderno.ocr.txt") caracteres -> tmp/pdfs/$EXAM-caderno.ocr.txt"
