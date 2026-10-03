---
trigger: always
---

# LEIA PRIMEIRO — o que deu errado e o que vale acima de tudo

Gemini: o conteúdo que você ingeriu foi auditado por inteiro em 2026-09-29.
O resultado foi ruim, e custou caro ao usuário (a correção estourou o limite
de uso dele 3 vezes). Fatos, sem rodeio:

- **USP-SP 2025:** 33 de 120 questões com alternativas que não existem na
  prova; nas Q1–15, 14 de 15 estavam adulteradas e as Q2–Q7 foram
  essencialmente inventadas. **USP-SP 2026:** Q25–30 com enunciado inventado;
  13 de 15 adulteradas nas Q31–45.
- Quando não conseguia ler uma figura, você **escreveu uma descrição
  inventada** no lugar — e deixou a letra do gabarito certa, o que escondeu o
  erro do portão.
- **ENARE 2024:** entrou 46 de 100 questões, 6 com letra diferente do
  gabarito oficial, e a fila chegou a "questão 135" de uma prova de 100.
- **Revalida 2024.2:** 6 questões que o INEP anulou foram tratadas como
  normais, 2 letras erradas, 16 nomes de prova corrompidos ("인EP").
- **Explicações:** em amostras, 10 de 15 (USP 2024) e 8 de 15 (Revalida)
  tinham erro clínico: achados que o enunciado não traz, números e portarias
  inventados, veredito de alternativa errado. Você ainda reescreveu 951
  explicações antigas sem que ninguém pedisse e sem revisão.
- Você gravou e publicou conteúdo contra a regra 7 e a lição L7, e o portão
  que você usava nunca comparava a questão com o PDF da prova.
- "Autonomia total" (regras 1–3 abaixo) **não** foi permissão para publicar
  sem conferir. Foi permissão para rodar comandos técnicos sem perguntar.

## Regras que têm precedência sobre as regras 1–3 quando o assunto é conteúdo
A. **Siga `pipeline/PROCESSO-INGESTAO.md`, etapa por etapa.** Ele é a única
   forma aceita de ingerir prova.
B. **Copie, não crie.** Enunciado, alternativas e gabarito vêm do PDF oficial.
   Se não conseguiu ler, pare e registre pendência; **nunca complete com texto
   plausível**. Figura: recorte a imagem; não a descreva.
C. **Autonomia vale para comandos técnicos.** Não vale para: publicar conteúdo,
   marcar prova como concluída, fazer `git push`, mudar gabarito, reescrever
   conteúdo já existente, ou pular um teste que não rodou. Nesses casos: pare e
   peça ao usuário.
D. **Teste que não pôde rodar = lote reprovado**, nunca "pulado".
E. **Só conclua uma prova com todas as N questões** (números 1..N do caderno).
F. **Explicação é rascunho** até a revisão clínica independente (E9). Não cite
   número, portaria, dose ou prazo de que não tenha certeza; use só dados que o
   enunciado traz.
G. **Custo importa:** teste as 10 primeiras questões antes do resto, no máximo
   3 processos em paralelo, cada um com pasta de saída própria, grave a cada
   3–5 questões, e não refaça o que já foi aprovado.
H. **Diga o que NÃO verificou.** Nunca escreva "pronto" ou "concluído" sem ter
   conferido a contagem e rodado os testes.

# Regras de Autonomia Total do Projeto Trycktrack
1. O usuário autorizou previamente a execução autônoma de comandos de terminal, instalação e rede sem interrupções.
2. Para qualquer operação com comandos como `npm run`, `node`, `tsx`, `git` e acesso ao banco de dados e sites oficiais (INEP, EBSERH, FUVEST), proceda diretamente sem solicitar confirmação manual ao usuário.
3. Priorize resolução rápida e encadeamento dos scripts do pipeline ETL em background.

# Contrato de conteúdo (trabalho conjunto com o Claude)

Você (Gemini) produz conteúdo em volume; o Claude valida, revisa e integra.
Os dois seguem as mesmas regras abaixo.

## Antes de qualquer tarefa de conteúdo, leia
- `pipeline/LICOES.md` — erros já encontrados e como evitar. Obrigatório.
- `taxonomia/ROTEIRO-IMPORTACAO.md` e `taxonomia/MODELO-ANALISE-QUESTAO.md` — padrão de classificação e de explicação.
- `pipeline/fontes.json` — ordem de prioridade das bancas (mais inscritos primeiro).

## Regras de gravação
4. **Nunca grave direto nos arquivos do app** (`questions-*.js`, `question-explanations*.js`, `app-reader.js`). O lote fica em `tmp/extracted-<prova>.json` até passar no portão.
5. **Portão obrigatório**: rode `node pipeline/validar.cjs tmp/extracted-<prova>.json`. Só chame o `writer.ts` se o código de saída for 0. Se reprovar, corrija os itens apontados no relatório (`pipeline/relatorios/`) e rode de novo.
6. Questão que já existe no banco com gabarito diferente não se sobrescreve: vai para `pipeline/pendencias/` com o link do gabarito oficial.
7. Nunca faça `git commit`/`git push` de conteúdo; o commit é feito depois da revisão.
8. A chave da API fica só no `.env`; nunca a escreva em script, log ou arquivo versionado.

## Laço de revisão Gemini ⇄ Claude
9. Toda correção que o Claude fizer no seu trabalho vira lição em `pipeline/LICOES.md`; siga as lições como regra.
10. Quando pedirem para você revisar um trabalho do Claude, registre cada problema no mesmo formato (regra geral · origem · ocorrências) na seção "Para o Claude" do mesmo arquivo.
