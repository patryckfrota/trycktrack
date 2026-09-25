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

## 4. Gravação e checagem

1. Gravar em `questions-*.js` (dados + classificação) e
   `question-explanations.js` (explicação).
2. `node taxonomia/validar.cjs` → precisa terminar com **0 problema(s)**.
3. `node shared/question-filters.test.js` e
   `cd backend && node scripts/import-questions.js --dry-run`.
4. Revisão do usuário antes de publicar. Subir `CACHE_NAME` em `sw.js`.
