---
trigger: always
---

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
