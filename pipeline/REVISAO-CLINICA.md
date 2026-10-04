# Revisão clínica independente das explicações (etapa E9)

Quem revisa **não** é quem escreveu o rascunho. Entrada: questões fiéis ao caderno + gabarito
oficial + rascunho da explicação. Saída: explicação correta, ou correções pontuais, e lista do
que precisa de olho humano. Só depois disso o id sai de `pendingReviewIds`
(`node pipeline/aprovar-explicacoes.cjs`).

## Leia antes
`taxonomia/MODELO-ANALISE-QUESTAO.md` (formato: 4 seções; última linha "Portanto, o gabarito é
a alternativa X."; seção opcional OBSERVAÇÃO — GABARITO EM DISCUSSÃO, item 4.5.1).

## Entrada do lote (JSON)
`questoes[]` com `id`, `number`, `gabarito_oficial` (letra, `ANULADA`, ou duas letras = a banca
aceitou ambas), `stem`, `options`, `images` (caminhos relativos à raiz do repositório),
`classificacao`, `explanation` (rascunho). `pdf`, `ocr_com_paginas` (texto OCR do caderno, páginas
separadas por `\f`).

## Para CADA questão
1. **Resolva sozinho** (com enunciado e alternativas, sem olhar o rascunho nem o gabarito).
   Se há imagem em `images`, abra-a com Read e use-a.
2. **Gabarito oficial manda.** Nunca o altere. Se você discorda dele com fonte, mantenha o oficial e
   acrescente `OBSERVAÇÃO — GABARITO EM DISCUSSÃO` (2–3 frases: motivo e qual seria a resposta).
   Duas letras: explique que a banca aceitou as duas. `ANULADA`: explicação de anulada (provável
   motivo + análise das alternativas; última linha "Questão anulada pela banca.").
3. **Confira o rascunho**: (a) o veredito de cada alternativa A–D está certo e coerente com o
   gabarito; (b) as afirmações factuais (doses, pontos de corte, critérios, esquemas,
   diretrizes, fisiopatologia) estão corretas; (c) **nada foi inventado**: achado clínico, valor,
   número, portaria, ano ou artigo que o enunciado não traz e que você não conhece com certeza
   deve ser **removido**, não "corrigido de memória"; (d) a explicação usa só dados do enunciado
   e das imagens; (e) o texto compartilhado entre questões não se perdeu.
4. **Fidelidade**: o enunciado e as alternativas do banco precisam bater com a prova. Já foram
   conferidos página a página para as questões suspeitas, mas se notar diferença clara
   (frase inventada, alternativa truncada, dado trocado), confira a página
   (`Read` no PDF com `pages`) e devolva `stem`/`options` corrigidos.
5. Se o rascunho está correto, **não o reescreva** (nada de mexer só em estilo). Se só um trecho
   está errado, corrija só o trecho. Se está errado em geral, reescreva no formato do modelo.
6. Sem crase (`) e sem a sequência `${`. Entre ~200 e ~420 palavras.

## Saída (JSON, uma lista, um objeto por questão)
```
{"id": "...", "medico": "ok" | "explicacao_corrigida" | "gabarito_em_discussao",
 "explanation": "texto final COMPLETO — só se mudou",
 "fidelidade": "ok" | "corrigida", "stem": "só se corrigida", "options": {...} só se corrigida,
 "problemas": ["o que estava errado no rascunho, frases curtas"],
 "revisao": ["dúvidas para o humano conferir"]}
```
Grave a saída **incrementalmente** (a cada ~4 questões, sobrescrevendo). Ao terminar: confira
que a quantidade de itens é a do lote, que toda explicação nova tem os 4 títulos e a última linha
com a letra certa, e que não há crase.

Não altere arquivos do repositório; scripts temporários só na pasta de trabalho indicada.

## Relatório final (curto)
No máximo 8 linhas: quantas ok, quantas corrigidas, quantas com observação, e ids com dúvida.
