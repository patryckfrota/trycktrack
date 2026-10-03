# Processo de ingestão de prova (versão obrigatória)

Vale para todo agente (Gemini, Claude ou humano) que colocar prova nova no
trycktrack. Nasceu de uma auditoria de 2026-09-29 que achou, nas provas já
ingeridas: enunciados e alternativas **inventados** (USP-SP 2025: 33 de 120
com alternativas que não existem na prova), letras de gabarito diferentes do
oficial (ENARE 6, Revalida 8), questões anuladas tratadas como normais,
prova incompleta dada como concluída (ENARE 46 de 100) e explicações com erro
clínico em cerca de 2 de cada 3 questões amostradas. Leia também
`pipeline/LICOES.md`, `taxonomia/ROTEIRO-IMPORTACAO.md` e
`taxonomia/MODELO-ANALISE-QUESTAO.md`.

## 0. Regras de ouro

1. **A prova em PDF é a única fonte do enunciado, das alternativas e do
   gabarito.** Copie; nunca reescreva, complete, resuma nem "melhore".
   Se não conseguiu ler um trecho, **pare e registre pendência**. Não
   preencha com texto plausível.
2. **Gabarito vem do PDF do gabarito definitivo, lido por código**, não por
   modelo de linguagem, e nunca é alterado por opinião sua.
3. **O portão falha fechado**: se um teste não pôde rodar (falta PDF,
   falta `pdftotext`, arquivo ilegível), o lote é **reprovado**, não
   pulado.
4. **Nada vai para `main` sem revisão humana.** Trabalhe em branch/worktree
   própria e pare no commit local (L7).
5. **Uma prova só é "concluída" quando tem todas as questões**, com os
   números do caderno de 1 a N.

## 1. Quem faz o quê

| Etapa | Quem |
|---|---|
| Extração, imagens, classificação, gabarito | Gemini (com portão automático) |
| Explicação | Gemini pode **rascunhar**, mas o rascunho **não é publicado** até uma revisão clínica independente (outro modelo ou humano) |
| Aprovação, push, cópia para o Postgres | Só o usuário libera |

Motivo: numa amostra, 10 de 15 explicações da USP 2024 (que passaram no
portão) e 8 de 15 do Revalida tinham erro clínico. Quem escreve não pode ser o
único a revisar.

## 2. Pré-requisitos (verifique antes de começar)

```bash
command -v pdftotext pdfimages pdftoppm   # poppler-utils; sem eles, PARE
ls tmp/pdfs/<examId>-caderno*.pdf tmp/pdfs/<examId>-gabarito*.pdf
git status --short -- 'questions-*.js' question-explanations.js   # tem que estar limpo
```

- Sem o PDF do **gabarito definitivo** oficial: **não ingira** (ou ingira sem
  gabarito e não publique). Gabarito preliminar de cursinho não vale como
  oficial (foi o caso do SUS-SP 2026).
- Trabalhe numa branch (`git switch -c ingestao/<examId>`) ou `git worktree`.
  **Nunca** duas pessoas/agentes editando `questions-*.js` ao mesmo tempo.

## 3. Etapas (cada uma tem critério de aprovação)

### E1 — Inventário da prova
Descubra pelo PDF do gabarito: **total N de questões**, quantas anuladas,
quais têm resposta dupla. Grave em `pipeline/inventario/<examId>.json`:
`{ total, anuladas: [...], duplas: {"109":"AB"}, caderno, tipoDoCaderno }`.
- Se o gabarito tem vários cadernos (A1/A2/A3, Tipo 1/Tipo 2), use **o mesmo
  caderno do PDF da prova** e registre qual (USP: primeira coluna; ENARE: bloco
  antes de "TIPO 2").
- Marcas: `*`, `—`, `ANULADA` = anulada. Duas letras (`AB`) = a banca aceitou
  ambas.
- **Aprova se**: N confere com o cabeçalho da prova ("100 questões") e todos os
  números 1..N aparecem no gabarito.

### E2 — Extração literal do texto
Ferramenta: `pdftotext -raw caderno.pdf` (respeita a ordem de leitura; `-layout`
mistura colunas). Separe por número de questão. Guarde **o texto exatamente
como está**, só normalizando espaços e hifenização de fim de linha.
- Guarde por questão: `number`, `stem`, `options`, `pagina`.
- **Aprova se**: números 1..N sem buracos nem repetição; nenhum número > N
  (o ENARE chegou a "questão 135" por erro de leitura); cada questão tem o
  mesmo número de alternativas que a prova.

### E3 — Armadilhas de extração (checar uma a uma)
- Linha só com "a" (artigo) ou "e" (conjunção) vira alternativa A/E falsa;
  alternativa contendo `. e ` no meio pode ser a D partida.
- Alternativa A colada no fim do enunciado ("...é: a Texto").
- **Texto de apoio** ("Leia o texto abaixo para responder à questão N",
  "TEXTO PARA AS QUESTÕES 33 E 34", caso clínico compartilhado): copie **no
  início do enunciado de cada questão citada**. Nunca deixe grudado na
  alternativa E da questão anterior.
- Rodapé/cabeçalho de página ("Pág. 5", nome da prova) no meio do texto.
- Letra de música, poema ou outro texto protegido: troque por uma descrição
  curta entre colchetes.
- Tabelas: mantenha os números **exatamente**; se a tabela é imagem, use imagem
  (E4), não transcrição de memória.
- **Aprova se** a checagem automática abaixo (E5) passar.

### E4 — Imagens
- Localize as figuras: `pdfimages -list` e renderize a página
  (`pdftoppm -r 110 -png -f P -l P`). Recorte só a figura da questão
  (`-x -y -W -H`).
- Salve em `assets/<banca>/img/<id>-<n>.png`. **Nunca sobrescreva** arquivo
  existente. Abra o recorte e **confira que é a figura daquela questão** (o
  pipeline anterior anexou figura de outra questão e recortes cortados ao meio).
- Alternativas que são figuras: use "Imagem A", "Imagem B"... como texto e anexe
  as imagens. Não descreva a figura no enunciado (isso inventa dados e pode
  entregar a resposta).
- Imagem removida no caderno público: registre entre colchetes no enunciado.
- **Aprova se**: toda questão que cita "imagem/figura/gráfico/tabela/ECG/
  radiografia" tem `images` preenchido e os arquivos existem.

### E4b — Questões que dependem de imagem (a maior fonte de erro até hoje)
Na USP 2025/2026 muitas alternativas eram **figuras** (ECG, radiografia, foto,
esquema). Onde não conseguiu ler a figura, o motor escreveu alternativas e
achados de imagem **inventados**. Regras:
1. **Detecte antes de extrair.** A questão é "de imagem" se: a página tem figura
   (`pdfimages -list`), o enunciado diz "a seguir/abaixo/na imagem/figura/
   gráfico/ECG/radiografia", ou o PDF **não traz texto** depois de "(A)" (as
   alternativas são figuras). Marque isso na extração (`temImagem`,
   `alternativasSaoImagem`).
2. **Nunca descreva a figura com palavras próprias** no enunciado, nas
   alternativas nem como "fato" na explicação. Descrever = inventar.
3. **Alternativas que são figuras**: `options` = `{"A":"Imagem A","B":"Imagem B",...}`
   e `images` com a figura das alternativas (uma imagem com A–D, ou uma por
   letra). O gabarito continua sendo a letra.
4. **Uma figura pertence a uma questão só.** Confira pelo **número da página**:
   a figura tem de sair da página onde está o número da questão (ou da
   seguinte, se a questão passa de página). Nomeie o arquivo com o id.
   Figura de outra questão, recorte cortado ao meio e recorte que contém
   texto de outra questão foram erros reais.
5. **Confira olhando**: abra cada recorte e compare com a página renderizada.
   Se o recorte mostra texto do enunciado, refaça só com a figura.
6. **Explicação de questão com imagem**: só afirme o que a figura mostra com
   certeza e diga que é leitura da imagem (`revisao: "achado lido da imagem"`).
   Se não conseguiu interpretar, escreva a explicação pelo raciocínio geral e
   registre a dúvida; não invente valor, medida ou achado.
7. **Portão**: questão com todas as alternativas do tipo "Imagem X" **precisa**
   de `images` (o `validar.cjs` reprova sem isso). Enunciado que cita figura e
   está sem `images` gera alerta e exige justificativa em `revisao` (ex.:
   imagem removida do caderno público).

### E5 — Portão de fidelidade (automático, obrigatório)
```bash
node pipeline/validar.cjs tmp/extracted-<examId>.json
```
Confere, por código: enunciado e cada alternativa existem no PDF
(`pipeline/fidelidade.cjs`), duplicata, taxonomia, nome da prova consistente.
- Além do que ele faz, **compare o gabarito**: monte `answer` a partir do
  inventário (E1), nunca a partir do modelo. Falha se `answer` ≠ gabarito
  oficial, se anulada sem `annulled: true`, ou se `annulled: true` sem estar
  anulada no PDF (L6).
- Falso positivo esperado: alternativas em imagem ("Imagem A–D"), que não existem como texto no PDF (ver E4b).
  Trate caso a caso; **não relaxe o limiar** para passar.
- **Aprova se**: 0 reprovados por `fidelidade`, `gabarito`, `duplicata`.

### E6 — Completude
Antes de marcar a prova como concluída:
`quantidade de questões == N`, números 1..N presentes, anuladas == inventário,
duplas == inventário.
**Nunca** marque `concluida` porque "acabou o limite do dia" ou "a
extração retornou menos". Registre o que falta em `pipeline/pendencias/`.

### E7 — Classificação
Área/assunto/tópico/subtópico copiados **exatamente** de `taxonomia/*.json`
(inclusive espaços no fim). A área segue o **conteúdo**, não o bloco da prova.
`node taxonomia/validar.cjs` → 0 problemas. Nó que não existe: use o mais
próximo e anote em `revisao`; não invente.

### E8 — Explicação (rascunho)
Formato: `taxonomia/MODELO-ANALISE-QUESTAO.md` (4 seções, última linha
"Portanto, o gabarito é a alternativa X." igual ao `answer`; anulada:
"Questão anulada pela banca.").
Regras que evitam os erros mais comuns:
- Use **somente** dados que estão no enunciado. Não acrescente achados clínicos,
  sinais, exames, idades ou valores que a questão não traz.
- **Não cite** número de portaria, lei, artigo, ano de diretriz, dose, prazo ou
  ponto de corte de que não tenha certeza. Na dúvida, omita e registre em
  `revisao`.
- Comente **cada** alternativa com o fundamento correto (não repita a
  justificativa genérica).
- Se você discordar do gabarito oficial: explique conforme o oficial e
  acrescente a seção `OBSERVAÇÃO — GABARITO EM DISCUSSÃO` (modelo, item 4.5.1).
  **Nunca** mude a letra.
- Guarde como **rascunho** em `pipeline/rascunhos/<examId>.json`, **não** em
  `question-explanations.js`.

### E9 — Revisão clínica independente (portão humano ou de outro modelo)
Quem revisa recebe: questão fiel, gabarito oficial e o rascunho. Resolve
sozinho **antes** de ler a explicação, e devolve por questão:
`ok | corrigida | gabarito_em_discussao`, com os erros encontrados.
- Amostre primeiro 15 questões e meça a taxa de erro do rascunho. Se passar de
  10%, revise **todas**; não publique.
- **Aprova se**: 100% das explicações revisadas.

### E10 — Gravação e validação final
Só agora grave em `questions-*.js` e `question-explanations.js`, pelo
`writer` (nunca à mão). Rode:
```bash
node taxonomia/validar.cjs && node --test shared/*.test.js
node pipeline/validar.cjs        # fidelidade + gabarito
cd backend && npm run import:questions -- --dry-run
```
- Suba `CACHE_NAME` em `sw.js`.
- **Commit local. Pare.** Entregue o relatório (seção 6) e espere o usuário
  liberar o `git push` e a cópia para o Postgres (`cd backend && npm run
  import:questions`, que precisa do `.env`; termine antes de dizer "pronto").

## 4. Dados: campos obrigatórios por questão
`id` (`<examId>-NNN`, NNN = número do caderno), `number`, `stem`, `options`,
`answer` (null se anulada), `annulled`, `images` (array, pode ser vazio),
`area`, `assunto`, `topico` (+ `subtopico` se o nó tiver filhos), `source`,
`examId`, `examName`. `examName` e `source` **iguais para toda a prova**,
escritos em alfabeto latino (o OCR já trocou "INEP" por "인EP").

## 5. Custo, concorrência e retomada
- **Fail fast**: rode E1–E5 nas **10 primeiras** questões e pare se reprovar
  mais de 1. Só depois processe o resto.
- Lotes de 10 a 15 questões; no máximo **3 processos em paralelo**.
- **Cada agente com sua própria pasta de trabalho**
  (`work/<lote>/`) e arquivo de saída próprio; nunca compartilhe.
- Grave o resultado **a cada 3–5 questões** (checkpoint) e no fim valide a
  contagem: um lote com menos itens do que a entrada é falha, não sucesso.
- Se estourar limite/cota: pare, registre o ponto em `estado.json` e retome
  dali; não refaça o que já foi aprovado.
- Não reescreva em massa conteúdo antigo ("modernizar explicações") sem
  pedido explícito e sem passar por E9.

## 6. Relatório do lote (curto)
`prova`, `N`, `extraídas`, `reprovadas por categoria`, `anuladas`, `duplas`,
`com imagem`, `pendências`, `taxa de erro da amostra de explicações`, lista de
`revisao` (dúvidas para o humano). Diga **o que não foi verificado**.

## 7. Proibido
- Gravar direto em `questions-*.js` / `question-explanations.js` sem passar
  pelo portão (L1).
- `git push` sem autorização do usuário naquele push (L7).
- Corrigir gabarito "porque eu acho que está errado" (L5); marcar `annulled`
  sem fonte (L6).
- Publicar explicação não revisada.
- Deixar o CI fazer push direto em `main` com conteúdo novo. O CI deve **abrir
  branch/PR** para revisão.
- Declarar "concluída", "pronto" ou "cópia para o Postgres feita" antes de
  conferir a contagem no banco.
