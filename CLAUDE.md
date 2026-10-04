# trycktrack — instruções para o Claude

PWA de estudo para residência médica (JS puro, GitHub Pages a partir de `main`).
Banco de questões nos arquivos `questions-*.js`; explicações em
`question-explanations.js`; o Postgres só espelha (`backend/`).

## Prova e questão: leia antes de tocar
Qualquer tarefa que importe, corrija ou audite prova/questão/explicação:
1. `pipeline/PROCESSO-INGESTAO.md` (etapas com critério de aprovação)
2. `pipeline/LICOES.md`, `taxonomia/ROTEIRO-IMPORTACAO.md`,
   `taxonomia/MODELO-ANALISE-QUESTAO.md`

## Escopo e custo — regras duras (o usuário já estourou o limite 3 vezes por isso)
1. **Antes de trabalho grande** (mais de ~30 questões ou mais de 3 agentes):
   meça com o teste automático e uma amostra pequena, diga o tamanho e o
   custo aproximado, e **pergunte**. Não dispare agentes sem essa resposta.
2. **No máximo 3 agentes em paralelo**, **Sonnet por padrão** (Opus só se o
   usuário pedir), **cada agente com pasta e arquivo de saída próprios**,
   gravando a cada 3–5 questões.
3. Se o usuário trocar de modelo/esforço no meio: pare os agentes, aproveite o
   que já está gravado e refaça **só o que falta**.
4. Limite de sessão não é falha: retome do ponto salvo, não recomece.
5. **Não diga "pronto" antes de verificar**: testes rodados, contagem
   conferida no banco. Cópia para o Postgres: `cd backend && npm run
   import:questions` (precisa do `.env`), esperar terminar e contar.
6. **`git push` só com ok explícito** do usuário naquele push.
7. Não faça em massa o que não foi pedido (ex.: reescrever explicações
   antigas).

## Validar antes de commitar
```bash
node taxonomia/validar.cjs          # 0 problemas
node --test shared/*.test.js pipeline/*.test.cjs
cd backend && npm run import:questions -- --dry-run
```
Suba `CACHE_NAME` em `sw.js` a cada mudança visível.
