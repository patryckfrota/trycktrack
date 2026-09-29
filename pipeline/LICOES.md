# Lições do laço Gemini ⇄ Claude

Erros encontrados na revisão de um agente sobre o trabalho do outro, virados
em regra geral. **Os dois agentes leem este arquivo antes de qualquer tarefa
de conteúdo.** Quando uma lição puder ser checada por máquina, ela vira teste
no `pipeline/validar.cjs` e é marcada como `[automatizada]` aqui — a partir
daí o erro é barrado sozinho.

Formato de cada lição: regra · de onde veio · quantas vezes apareceu.

---

## Para o Gemini (encontradas na revisão do Claude)

### L1 — Nunca gravar direto nos arquivos do app `[automatizada]`
O `writer.ts` só pode rodar depois de `node pipeline/validar.cjs` aprovar o
lote. Gravar direto em `questions-*.js` / `question-explanations.js` pula a
checagem de duplicata, gabarito e taxonomia.
· origem: revisão de 2026-09-27 · ocorrências: 5 lotes do Revalida 2022–2024

### L2 — Checar duplicata contra o banco antes de importar `[automatizada]`
Boa parte das questões do Revalida já existe no banco dentro das pastas das
especialidades (ids `*-inep-*`, `cm-*`, `cg-*`...). Importar de novo cria
duplicata visível pro aluno.
· origem: revisão de 2026-09-27 · ocorrências: 326 de 354 questões novas

### L3 — Área é a especialidade da árvore, nunca a grande área `[automatizada]`
Clínica Médica não é área válida: use a especialidade (Cardiologia,
Nefrologia, Endocrinologia, Infectologia...). Ginecologia e Obstetrícia são
áreas **separadas** — nunca "Ginecologia e Obstetrícia". Áreas válidas:
Cirurgia Geral, Medicina Preventiva, Pediatria, Ginecologia, Obstetrícia,
Cardiologia, Dermatologia, Endocrinologia, Gastroenterologia, Hematologia,
Hepatologia, Infectologia, Nefrologia, Neurologia, Pneumologia,
Reumatologia, Oftalmologia, Otorrinolaringologia, Psiquiatria, Ortopedia.
· origem: revisão de 2026-09-27 · ocorrências: a maioria dos 17 itens de teste

### L4 — Assunto e tópico só com nomes que existem na árvore `[automatizada]`
Copie o nome exato de `taxonomia/*.json`. Não invente, não junte dois
(ex.: "Aleitamento Materno / Neonatologia" não existe).
· origem: revisão de 2026-09-27 · ocorrências: várias

### L5 — Gabarito divergente não se resolve sozinho
Se a questão já existe no banco com outro gabarito, não sobrescreva: vá à
fonte oficial (gabarito definitivo da banca) e registre a divergência em
`pipeline/pendencias/`.
· origem: revisão de 2026-09-27 · ocorrências: 30 pares Revalida × especialidades

### L6 — `annulled: true` exige fonte, nunca é saída para dúvida de gabarito
Anulação é um fato objetivo da banca (aparece como "Anulada" ou "-" no PDF do
gabarito definitivo oficial), não uma forma de resolver incerteza sobre qual
alternativa está certa. Toda questão marcada `annulled: true` precisa citar,
junto (registro em `pipeline/pendencias/` ou comentário no lote), o PDF, a
edição e o número da questão que confirmam a anulação oficial. Se o agente
não conseguir determinar o gabarito com confiança, isso vai para
`pipeline/pendencias/` pedindo revisão humana — nunca vira `annulled: true`
sem verificação.
· origem: revisão de 2026-09-27 · ocorrências: 3 de 4 questões marcadas como
  anuladas no saneamento do Revalida não estavam anuladas no gabarito oficial
  (revalida-2022-2-094→C, revalida-2023-1-008→A, revalida-2023-1-092→D;
  só a revalida-2023-1-049 era anulação real)

### L7 — `git push` de conteúdo sempre para no commit local, nunca sozinho
Mesmo com o lote 100% aprovado no portão (Zod + taxonomia + Postgres
sincronizado corretamente), o passo de `git push` exige autorização explícita
do usuário para aquele push específico — autorização de uma vez não vale
pra próxima, e "o conteúdo está correto" não substitui a autorização. O
commit local pode e deve acontecer assim que o portão aprova; o `push` é um
passo separado, sempre depois de o usuário revisar e liberar.
· origem: revisão de 2026-09-27 · ocorrências: 2 — commit `9ce1522` no início
  da sessão (582 questões do Revalida, 74% sem explicação) e o commit
  `bd32a0c` (46 questões do ENARE, conteúdo correto mas pushado sem esperar
  autorização, fora do fluxo supervisionado de `pipeline/rodar-dia.sh`)

### L8 — Enunciado e alternativas têm que ser os da prova `[automatizada]`
Copie o texto do caderno oficial; nunca reescreva, complete ou "reconstrua"
enunciado, exames ou alternativas. Na USP-SP 2025/2026 o motor gravou questões
inventadas (dados clínicos e alternativas que não existem na prova) com a
letra do gabarito certa — por isso o portão de duplicata/gabarito/taxonomia
não percebeu. O `pipeline/fidelidade.cjs` agora exige que o enunciado e cada
alternativa existam no PDF (`tmp/pdfs/<examId>-caderno*.pdf`, precisa do
`pdftotext`). Quando o texto está numa imagem, anexe a imagem em vez de
transcrever de memória.
· origem: auditoria de 2026-09-28 · ocorrências: ~50 das 240 questões da
  USP-SP 2025/2026 (alternativas diferentes das da prova)

### L9 — Gabarito oficial manda, inclusive para anulada e resposta dupla `[parcial]`
Conferir cada `answer` contra o PDF do gabarito definitivo: "—" ou "*" é
anulada (`annulled: true`, `answer: null`); duas letras (ex.: "AB") = a banca
aceitou as duas. A explicação tem que defender a letra oficial.
· origem: auditoria de 2026-09-28 · ocorrências: 6 questões do ENARE 2024
  com letra diferente da oficial e 6 do Revalida 2024.2 que o INEP anulou

---

## Para o Claude (encontradas na revisão do Gemini)

_Nenhuma ainda. Quando o Gemini revisar um trabalho do Claude, as lições
entram aqui no mesmo formato._
