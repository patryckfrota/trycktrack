# Roteiro de importação de prova (banco principal)

Vale para Guiado / Simulado / Imersão. O Internato segue o próprio fluxo
(rodízio / tópico / tema / semestre).

## 1. Extração (manual, sem API paga)

Enunciado, alternativas e gabarito de cada questão do PDF. Conferir se a
contagem bate com a prova e se nenhum trecho ficou cortado. Questões com
imagem: extrair a imagem e salvar junto das demais.

## 2. Classificação — obrigatória, antes de gravar

Toda questão entra com os 4 níveis da taxonomia do Estratégia MED
(árvores nesta pasta):

| Campo       | Nível                                      |
|-------------|--------------------------------------------|
| `area`      | Área (ex.: Cardiologia, Pediatria)          |
| `assunto`   | 1º nível abaixo da área — **nunca vazio**   |
| `topico`    | 2º nível — obrigatório se o assunto tiver filhos |
| `subtopico` | 3º nível — só existe em algumas áreas       |

De onde vem a árvore de cada área:

- `cirurgia.json` → Cirurgia Geral
- `medicina-preventiva.json`, `pediatria.json`, `ginecologia.json`, `obstetricia.json` → a própria área
- `clinica-medica.json` → as 11 subáreas (Cardiologia, Dermatologia, …): usar o filho com o nome da área
- `outros.json` → Oftalmologia, Otorrinolaringologia, Psiquiatria, Ortopedia: idem

Regras:
- Copiar os nomes **exatamente** como estão no JSON (acento, pontuação e
  espaço no final, quando houver).
- Nunca inventar um nó. Se nada encaixa perfeitamente, usar o mais próximo
  e anotar a questão para revisão.
- Conteúdo que é de outra área (ex.: queimadura ocular numa prova de
  cirurgia) muda de `area` antes de classificar.

## 3. Explicação

Seguir **`MODELO-ANALISE-QUESTAO.md`** (nesta pasta), questão por
questão: leitura estruturada, verificação do gabarito, embasamento,
redação nas 4 seções, adaptações por tipo de questão e controle de
qualidade. É a única referência para o formato e o conteúdo da
explicação.

## 4. Gravação e checagem

1. Gravar em `questions-*.js` (dados + classificação) e
   `question-explanations.js` (explicação). `questions-*.js` e
   `question-explanations*.js` são **a fonte** — o PWA lê direto deles;
   o Postgres só espelha (passo 5).
2. `node taxonomia/validar.cjs` → precisa terminar com **0 problema(s)**.
3. `node shared/question-filters.test.js` e
   `cd backend && node scripts/import-questions.js --dry-run`.
4. Entregar a lista de revisão (ver modelo, Etapa 7) e esperar a
   revisão do usuário antes de publicar.
5. **Só depois da aprovação**: `cd backend && node scripts/import-questions.js`
   (sem `--dry-run` — escreve de verdade). Idempotente/upsert, pode
   rodar de novo sem duplicar. **Este passo não é opcional nem um "se
   sobrar tempo"** — sem ele o painel de gestão (`admin/`) continua
   mostrando os dados antigos, porque ele lê do Postgres, não dos
   arquivos estáticos, e não tem nenhuma forma de perceber sozinho que
   os arquivos mudaram.
6. Subir `CACHE_NAME` em `sw.js`.

Resumo do fluxo de dados, pra não esquecer por que o passo 5 existe:

```
PDF da prova
   │
   ▼
questions-*.js / question-explanations*.js   ← fonte real, o PWA lê direto daqui
   │
   │  node scripts/import-questions.js  (passo 5 — manual, precisa ser lembrado)
   ▼
Postgres
   │
   ▼
painel de gestão (admin/)                    ← só enxerga o que passou pelo passo 5
```
