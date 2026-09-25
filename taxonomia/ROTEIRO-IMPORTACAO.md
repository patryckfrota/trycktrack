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

## 3. Explicação — formato fixo

Quatro seções, nesta ordem, cada título sozinho numa linha (o app destaca
esses títulos automaticamente):

```
NÚCLEO DA QUESTÃO
<1–2 frases: o conceito que a questão cobra, escrito como regra geral.>

ARMADILHA — ONDE SE ERRA
<Qual pista do enunciado induz ao erro e por que ela não basta. Em
seguida, o raciocínio correto, citando diretriz/fonte quando houver.>

ALTERNATIVA POR ALTERNATIVA
A) Correta/Errada. <por quê, específico do caso>
B) Correta/Errada. <…>
C) …
D) …

FIXAÇÃO 80/20
<O que vale levar para qualquer questão parecida: a regra prática e as
pistas “tranquilizadoras” que a banca costuma usar.>
Portanto, o gabarito é a alternativa X.
```

Exemplo completo:

```
NÚCLEO DA QUESTÃO
Toda dor torácica aguda potencialmente isquêmica exige ECG precoce e troponina de alta sensibilidade, mesmo quando há um possível gatilho gastrointestinal.

ARMADILHA — ONDE SE ERRA
O erro é ancorar na refeição farta e na dor em queimação e assumir causa digestiva. Nenhuma das duas exclui síndrome coronariana aguda, e o paciente tem 71 anos, hipertensão e tabagismo.
Na dor torácica aguda, a prioridade é excluir causas fatais: ECG de 12 derivações em até 10 minutos e troponina, preferencialmente de alta sensibilidade (Diretriz Brasileira de Dor Torácica). A investigação digestiva vem depois.

ALTERNATIVA POR ALTERNATIVA
A) Errada. Ecocardiograma transesofágico não é exame inicial na suspeita de SCA.
B) Correta. Dor torácica aguda com múltiplos fatores de risco: ECG em até 10 minutos e troponina de alta sensibilidade.
C) Errada. D-dímero e angiotomografia miram TEP, que o enunciado não sugere.
D) Errada. Endoscopia antes de afastar SCA seria inadequado neste paciente.

FIXAÇÃO 80/20
Não tente decidir primeiro se a “queimação” é cardíaca ou digestiva: exclua o que mata. ECG em até 10 minutos + troponina. Refeição farta, queimação ou refluxo prévio não excluem isquemia.
Portanto, o gabarito é a alternativa B.
```

Questão discursiva: mesmas seções, trocando “ALTERNATIVA POR ALTERNATIVA”
pela resposta esperada item a item.

### 3.1 Como produzir cada seção com embasamento

**Antes de escrever: resolver a questão do zero.**
1. Ler o enunciado sem olhar o gabarito e listar os dados que decidem a
   questão (idade, sinais vitais, tempo de evolução, exame, contexto: UBS,
   PS, gestação etc.).
2. Chegar à própria resposta. Se ela não bater com o gabarito oficial,
   parar e investigar antes de escrever qualquer coisa (ver “Gabarito em
   conflito”).
3. Identificar **qual fonte a banca está cobrando** — é ela que ancora
   toda a explicação.

**Hierarquia de fontes (usar a mais alta disponível):**
1. Protocolo/diretriz nacional vigente: Ministério da Saúde (PCDT,
   Cadernos de Atenção Básica, Guia de Vigilância, Calendário Nacional de
   Vacinação), Febrasgo, SBP, SBC, SBD, SBPT, SBR, INCA, CFM (Código de
   Ética, resoluções), legislação (Lei 8.080, 8.142, ECA etc.).
2. Diretriz internacional de referência quando não houver nacional
   (AHA/ACC, ESC, GOLD, GINA, KDIGO, ADA, IDSA, WHO…).
3. Livro-texto de referência (Harrison, Cecil, Sabiston, Nelson,
   Williams, Zugaib, Kaplan…).
Nunca usar como fonte: resumo de cursinho, blog, fórum, memória vaga.

**Regras de embasamento (valem para todas as seções):**
- Todo número (dose, corte, prazo, idade, sensibilidade) vem de uma fonte
  identificável. Se não der para confirmar, **não escrever o número** —
  descrever a conduta sem ele e marcar a questão para revisão.
- Citar pelo nome e ano quando a conduta depender da fonte, no formato
  “<Diretriz> (<sociedade/órgão>, <ano>)” — ex.: “Diretriz Brasileira de
  Dor Torácica (SBC, <ano da versão consultada>)”. Só escrever o ano se
  ele foi conferido; sem inventar ano, capítulo ou página.
- Diretriz mudou depois da prova: responder conforme o gabarito, e dizer
  explicitamente na ARMADILHA ou na FIXAÇÃO o que mudou
  (“Na versão atual da diretriz, …”).
- Conduta brasileira vs. internacional divergente: prevalece a
  brasileira, que é a que a banca cobra; mencionar a outra só se ajudar.
- Nada de afirmação absoluta que a literatura não sustenta (“sempre”,
  “nunca”, “100%”) — usar a força real da recomendação.

**NÚCLEO DA QUESTÃO**
- Uma regra que vale fora deste caso, não um resumo do enunciado.
  ✗ “O paciente tem SCA.” ✓ “Toda dor torácica potencialmente isquêmica
  exige ECG em até 10 minutos e troponina.”
- Tem de ser verificável na fonte citada nas seções seguintes.

**ARMADILHA — ONDE SE ERRA**
- Apontar a pista concreta do enunciado que puxa para o distrator mais
  tentador e explicar por que ela não sustenta aquela escolha.
- Em seguida, o raciocínio correto passo a passo, com a fonte que o
  sustenta. Se houver dado que muda a probabilidade pré-teste (fatores de
  risco, idade, tempo), nomeá-lo.

**ALTERNATIVA POR ALTERNATIVA**
- Uma linha por alternativa, começando por “Correta.” ou “Errada.”
- A justificativa de cada errada precisa dizer **por que aquilo não serve
  neste caso** e, quando possível, **em que situação estaria certo**
  (“seria indicado se houvesse suspeita de dissecção de aorta”). Proibido
  justificar só com “não é a conduta” ou “não se aplica”.
- A correta repete o dado decisivo do caso + a recomendação da fonte.

**FIXAÇÃO 80/20**
- Só o que se transfere para outras questões do mesmo assunto: a regra
  prática, o número que a banca adora cobrar, e as pistas “distratoras”
  que costumam aparecer.
- Sem informação nova que não tenha sido sustentada antes.
- Fechar sempre com “Portanto, o gabarito é a alternativa X.”

**Gabarito em conflito**
Se, depois de checar a fonte, o gabarito oficial parecer errado ou
desatualizado: não reescrever o gabarito. Explicar conforme o gabarito,
registrar a divergência (com a fonte) e marcar a questão para revisão do
usuário. Questão anulada: explicar por que foi anulada.

**Checklist antes de gravar cada explicação**
- [ ] As 4 seções, na ordem, com os títulos exatos.
- [ ] Todo número tem fonte; nenhuma fonte inventada.
- [ ] Cada alternativa errada explica o porquê neste caso.
- [ ] Conduta coerente com o protocolo brasileiro vigente (ou divergência
      explicada).
- [ ] Termina com “Portanto, o gabarito é a alternativa X.” e X bate com
      `answer` da questão.

## 4. Gravação e checagem

1. Gravar em `questions-*.js` (dados + classificação) e
   `question-explanations.js` (explicação).
2. `node taxonomia/validar.cjs` → precisa terminar com **0 problema(s)**.
3. `node shared/question-filters.test.js` e
   `cd backend && node scripts/import-questions.js --dry-run`.
4. Revisão do usuário antes de publicar. Subir `CACHE_NAME` em `sw.js`.
