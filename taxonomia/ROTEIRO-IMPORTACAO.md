# Roteiro de importação de prova (banco principal)

Vale para Guiado / Simulado / Imersão. O Internato segue o próprio fluxo
(rodízio / tópico / tema / semestre), mas passa pelo mesmo portão do
passo 5.

**Antes de tudo, leia nesta ordem:**
1. `pipeline/LICOES.md` — erros já cometidos por qualquer agente (Gemini ou
   Claude) nessa tarefa, virados em regra. Grande parte já é barrada pelo
   validador sozinha; ler mesmo assim, porque nem todo erro dá pra
   automatizar.
2. Este arquivo.
3. `MODELO-ANALISE-QUESTAO.md` (nesta pasta) — o único padrão de conteúdo
   e formato da explicação.
4. `pipeline/fontes.json` — se a tarefa é "próxima prova", é dali que sai
   qual banca/ano, na ordem de prioridade (mais inscritos primeiro).

Regra que vale para toda esta tarefa, sem exceção: **nunca grave direto em
`questions-*.js` / `question-explanations*.js`, e nunca dê `git commit`
nem `git push` de conteúdo.** Um agente autônomo fez isso em 2026-09-27 —
commitou 582 questões das quais 74% não tinham explicação e 85%
reprovariam na taxonomia — porque pulou o portão. O passo 5 existe
exatamente para isso nunca mais acontecer sem alguém perceber antes de ir
ao ar.

## 1. Fonte

PDF do caderno de questões **e** do gabarito **oficial e definitivo** da
banca (não o preliminar — ele muda com as anulações). Se só o preliminar
estiver disponível, marcar a prova como pendente de gabarito definitivo em
vez de importar com o preliminar.

## 2. Extração (sem API paga, dentro da própria conversa)

Enunciado, alternativas e gabarito de cada questão do PDF. Conferir se a
contagem bate com a prova e se nenhum trecho ficou cortado. Questões com
imagem: extrair a imagem (`doc.extract_image` via PyMuPDF, ou
`pdfimages -j` + render de página) e salvar em
`assets/<banca>/img/<id>-1.jpg`, preenchendo `images: [...]` na questão.

Armadilhas conhecidas (ver `pipeline/LICOES.md` para a lista completa e
atualizada; resumo abaixo):
- `pdftotext -raw` lê as duas colunas na ordem certa; `-layout` mistura.
- Prova que marca alternativa só com a letra ("a texto", sem parêntese):
  um "a" ou "e" solto no meio do texto é confundido com a alternativa A
  ou E. Enunciado terminando em ": a …" com uma alternativa contendo
  ". e …" no meio é sinal de alternativa partida.
- Textos de apoio ("Leia/Analise/Avalie/Observe … para responder à
  questão N") grudam na alternativa E da questão anterior — mover para o
  início do enunciado da(s) questão(ões) alvo.
- Letra de música ou texto protegido no enunciado: trocar por descrição
  curta entre colchetes (direito autoral).
- Prova reaplicada de ano anterior: comparar contra o que já está no
  banco antes de assumir que é questão nova (ver passo 3).

## 3. Duplicata — checar ANTES de classificar ou explicar

Um mesmo simulado nacional (Revalida, ENAMED) é reaproveitado em provas
de instituição com id diferente. Extrair de novo sem checar cria cópias
visíveis pro aluno — foi exatamente o que aconteceu em 2026-09-27 (326 de
354 questões "novas" já existiam no banco sob outro id).

`node pipeline/validar.cjs` já reprova duplicata (por enunciado
normalizado, ignorando acento/pontuação) contra o banco inteiro — não
pule esta etapa achando que a prova é claramente inédita.

Se achar duplicata:
- Gabarito e alternativas idênticos ao que já está no banco → é a mesma
  questão, não entra de novo. Se a explicação nova estiver no padrão
  (`MODELO-ANALISE-QUESTAO.md`) e a antiga não, é a explicação que pode
  substituir a do id já existente — nunca criar um id novo pra isso.
- Qualquer divergência (gabarito ou texto de alternativa diferente) →
  **não decide sozinho qual versão está certa.** Registra em
  `pipeline/pendencias/` com as duas versões e o link do gabarito oficial,
  para revisão humana.

## 4. Classificação — obrigatória, antes de gravar

Toda questão entra com os 4 níveis da taxonomia do Estratégia MED
(árvores em `taxonomia/*.json`):

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
- **`area` é sempre a especialidade, nunca a grande área.** "Clínica
  Médica" não é `area` válida — é Cardiologia, Nefrologia,
  Endocrinologia etc. "Ginecologia e Obstetrícia" também não existe como
  valor único — são duas áreas separadas, Ginecologia e Obstetrícia. Esse
  foi o erro mais comum do lote de 2026-09-27 (492 de 582 questões).
- Copiar os nomes **exatamente** como estão no JSON (acento, pontuação e
  espaço no final, quando houver). Nunca inventar ou combinar dois nomes.
- Nunca inventar um nó. Se nada encaixa perfeitamente, usar o mais
  próximo e anotar a questão para revisão.
- Conteúdo que é de outra área (ex.: queimadura ocular numa prova de
  cirurgia) muda de `area` antes de classificar.

## 5. Explicação

Seguir **`MODELO-ANALISE-QUESTAO.md`** (nesta pasta), questão por
questão: leitura estruturada, verificação do gabarito **contra a fonte
oficial** (não contra a própria extração — em 2026-09-27, 15 pares de
questão duplicada tinham gabarito divergente entre si, e nenhum dos dois
lados sozinho sabia qual estava certo), embasamento, redação nas 4
seções, adaptações por tipo de questão e controle de qualidade. É a única
referência para o formato e o conteúdo da explicação.

Toda questão precisa sair desta etapa com explicação — "extraí mas ainda
não expliquei" não é um estado intermediário aceitável pra gravar; é
trabalho incompleto, e o portão do passo 6 recusa exatamente por isso.

## 6. Portão — obrigatório antes de qualquer gravação real

1. Salvar o lote extraído em `pipeline/entrada/extracted-<id>.json`, no
   formato `{ examId, items: [{ question, explanation }, …] }` — nunca
   escrever direto em `questions-*.js` / `question-explanations*.js`.
2. `node pipeline/validar.cjs pipeline/entrada/extracted-<id>.json`.
   Precisa sair com código 0 (tudo aprovado). O relatório fica em
   `pipeline/relatorios/`; cada reprovação vem com o motivo.
3. Se reprovar: corrigir os itens apontados e rodar de novo. Nunca
   contornar o portão, nunca gravar o que reprovou "só pra não perder o
   trabalho" — isso vai para `pipeline/pendencias/`, não para o banco.
4. Item aprovado só então é escrito nos arquivos-fonte
   (`questions-*.js` via `PRINCIPAL_FILES`/`backend/scripts/import-questions.js`
   descobre o arquivo sozinho pelo nome; `question-explanations.js` via
   `backend/src/staticPrincipalWriter.js`, que resolve aliases — nunca
   editar esse arquivo por regex solto, ele não é JSON, usa template
   literal).
5. Registrar a revisão (o próprio `validar.cjs` já grava em
   `pipeline/revisoes/` — é o que alimenta `pipeline/placar.cjs` e a tela
   "Placar das IAs" no painel).

## 7. Revisão humana e publicação

1. `node taxonomia/validar.cjs` (checagem de taxonomia no banco inteiro,
   além do lote) → precisa terminar com **0 problema(s)**.
2. `node --test` (raiz) e `cd backend && node scripts/import-questions.js --dry-run`.
3. Entregar a lista de revisão (ver `MODELO-ANALISE-QUESTAO.md`, Etapa 7)
   e esperar a aprovação do usuário. Nenhum `git add`/`git commit` antes
   disso.
4. **Só depois da aprovação**: `git commit` (nunca no meio do lote, nunca
   sem o portão ter aprovado tudo que está sendo commitado) e
   `cd backend && node scripts/import-questions.js` (sem `--dry-run` —
   escreve de verdade). Idempotente/upsert, pode rodar de novo sem
   duplicar. **Este passo não é opcional** — sem ele o painel de gestão
   (`admin/`) continua mostrando os dados antigos, porque ele lê do
   Postgres, não dos arquivos estáticos.
5. Subir `CACHE_NAME` em `sw.js`, e se o arquivo é de uma banca nova
   (nunca importada antes), rodar `node pipeline/registrar-bancos.cjs`
   para incluir o `<script>` no `index.html` e no `APP_SHELL` do
   `sw.js` — sem isso a prova entra no banco mas o app nunca carrega o
   arquivo.
6. `git push` só com autorização explícita do usuário para aquele push
   específico — autorização de uma vez não vale pra sempre.

Resumo do fluxo de dados, agora com o portão:

```
PDF da prova + gabarito oficial definitivo
   │
   ▼
extração + duplicata + classificação + explicação (passos 2–5)
   │
   ▼
pipeline/entrada/extracted-<id>.json
   │
   │  node pipeline/validar.cjs   ← PORTÃO, reprova = não passa
   ▼
aprovado?  não → pipeline/pendencias/  (fica, não é descartado, espera revisão)
   │
   sim
   ▼
questions-*.js / question-explanations*.js   ← fonte real, o PWA lê direto daqui
   │
   │  revisão humana + aprovação
   │  node scripts/import-questions.js  (passo 7.4 — não opcional)
   ▼
Postgres
   │
   ▼
painel de gestão (admin/)   ← Placar das IAs mostra taxa de reprovação por agente
```
