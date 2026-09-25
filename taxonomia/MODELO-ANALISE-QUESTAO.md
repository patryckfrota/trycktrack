# Modelo de análise de questão — trycktrack

Referência única para analisar e explicar **qualquer** questão do banco
principal. Vale para importação de prova nova, revisão de explicação
existente e correção apontada pelo usuário.

---

## 0. Princípios

1. **A explicação ensina a decisão, não só justifica o gabarito.** Quem
   leu precisa acertar a próxima questão parecida, não só entender esta.
2. **Embasamento verificável vem antes de fluência.** Frase bonita sem
   fonte não entra. Na dúvida, menos afirmação e mais marcação para
   revisão.
3. **O gabarito oficial é o eixo.** Divergência com a literatura é
   registrada e explicada — nunca escondida e nunca "corrigida" por conta
   própria.
4. **Cada frase precisa ganhar o seu lugar.** Nada de repetir o
   enunciado, encher com obviedade ou abrir parágrafo sem conteúdo.

---

## 1. Etapa 1 — Leitura estruturada (antes de escrever)

Montar mentalmente (ou em rascunho) a **ficha de análise**. Ela não vai
para o app, mas tudo o que for escrito depois sai dela.

| Item | O que responder |
|------|-----------------|
| **Comando** | O que a questão pede: conduta imediata · conduta definitiva · diagnóstico mais provável · exame inicial · padrão-ouro · tratamento de escolha · fisiopatologia · cálculo · ética/legislação · "EXCETO/INCORRETA" · associação · certo/errado |
| **Palavra-gatilho** | "imediata", "inicial", "primeira linha", "mais provável", "padrão-ouro", "de escolha", "EXCETO". Muda completamente a resposta — sublinhar |
| **Cenário** | Onde está o paciente (UBS, UPA, PS, enfermaria, UTI, domicílio), que recursos existem, população especial (gestante, criança, idoso, imunossuprimido) |
| **Dados decisivos** | Os 2–5 dados que, se mudassem, mudariam a resposta (idade, tempo de evolução, sinal vital alterado, exame) |
| **Dados de distração** | Informações que puxam para outro diagnóstico ou conduta (ex.: "após refeição farta") |
| **Hipóteses** | Diagnóstico principal + diferenciais que as alternativas exploram |
| **Resposta própria** | Resolver **sem olhar o gabarito** |
| **Fonte cobrada** | Qual diretriz/protocolo/lei a banca está cobrando (ver Etapa 3) |

---

## 2. Etapa 2 — Verificação do gabarito

Comparar a resposta própria com o gabarito oficial (`answer`):

| Situação | O que fazer |
|----------|-------------|
| **Concordam** | Seguir |
| **Discordam — diretriz mudou depois da prova** | Explicar conforme o gabarito e dizer na ARMADILHA ou na FIXAÇÃO o que mudou ("Pela versão mais recente da diretriz, …"). Marcar para revisão |
| **Discordam — gabarito parece errado** | Reler o enunciado buscando a palavra-gatilho perdida. Persistindo: explicar conforme o gabarito, apresentar o argumento contrário com fonte e marcar para revisão. **Nunca alterar `answer`** |
| **Questão anulada** (`annulled`) | Explicar o provável motivo da anulação (duas corretas, nenhuma correta, enunciado ambíguo, desatualização) |
| **Sem gabarito** (`answer` nulo) | Resolver, deixar claro na explicação que o gabarito não é oficial e marcar para revisão |

Toda questão marcada entra na **lista de revisão** entregue ao usuário
junto com o lote (ver Etapa 7).

---

## 3. Etapa 3 — Embasamento

### 3.1 Hierarquia de fontes

Usar sempre a mais alta disponível:

1. **Norma/diretriz nacional vigente** — Ministério da Saúde (PCDT,
   Cadernos de Atenção Básica, Guia de Vigilância em Saúde, Calendário
   Nacional de Vacinação), sociedades brasileiras de especialidade,
   CFM (Código de Ética, resoluções), legislação.
2. **Diretriz internacional de referência** — quando não houver nacional
   ou quando a nacional remete a ela.
3. **Livro-texto de referência** da especialidade.

**Nunca** são fonte: resumo de cursinho, apostila, blog, fórum, vídeo, ou
"é o que costuma cair".

### 3.2 Onde procurar, por área

| Área | Nacional | Internacional de apoio |
|------|----------|------------------------|
| Cardiologia | Diretrizes da SBC | ESC, AHA/ACC |
| Endocrinologia | SBD (diabetes), SBEM | ADA |
| Pneumologia | SBPT | GOLD (DPOC), GINA (asma) |
| Nefrologia | SBN | KDIGO |
| Reumatologia | SBR | ACR/EULAR |
| Infectologia | PCDTs do MS (HIV, hepatites, IST), Manual de Controle da Tuberculose, Guia de Vigilância em Saúde, SBI | IDSA |
| Gastroenterologia / Hepatologia | FBG, SBH | AGA, AASLD, EASL |
| Hematologia | ABHH | ASH |
| Neurologia | ABN | AHA/ASA (AVC) |
| Dermatologia | Sociedade Brasileira de Dermatologia | AAD |
| Cirurgia / Trauma | CBC, sociedades de especialidade cirúrgica | ATLS |
| Pediatria | SBP, Calendário Nacional de Vacinação, Programa de Reanimação Neonatal | PALS, AAP |
| Ginecologia / Obstetrícia | Febrasgo, MS (pré-natal, parto), INCA (rastreamento de colo e mama) | ACOG, FIGO |
| Medicina Preventiva | Constituição Federal, Leis 8.080/90 e 8.142/90, PNAB, Guia de Vigilância em Saúde, Código de Ética Médica | OMS |
| Psiquiatria | ABP | DSM-5-TR, CID-11 |
| Oftalmologia | CBO | AAO |
| Otorrinolaringologia | ABORL-CCF | AAO-HNS |
| Ortopedia | SBOT | AAOS |

Divergência nacional × internacional: **prevalece a nacional**, que é a
que a banca brasileira cobra.

### 3.3 Regras de embasamento

- **Todo número tem fonte** (dose, ponto de corte, prazo, idade, escore,
  meta). Se não der para confirmar, **não escrever o número**: descrever a
  conduta sem ele e marcar para revisão.
- **Citação**: "<Diretriz> (<sociedade/órgão>, <ano>)". Escrever o ano
  só se ele foi conferido. Nunca inventar ano, capítulo, página ou artigo
  de lei.
- **Atualidade**: conferir se a fonte usada é a versão vigente. Havendo
  acesso à internet na sessão, consultar; não havendo, usar o
  conhecimento disponível e marcar para revisão quando houver chance
  real de ter mudado.
- **Força da recomendação**: usar a força real ("recomenda-se",
  "pode ser considerado", "é contraindicado"). Proibido "sempre",
  "nunca", "100%" quando a literatura não sustenta.
- **Sem extrapolar o caso**: não acrescentar dados que o enunciado não
  deu. Se a resposta depender de algo não informado, dizer isso.

---

## 4. Etapa 4 — Redação

### 4.1 Estrutura fixa

Texto puro. Cada título sozinho numa linha, exatamente como abaixo, com
uma linha em branco entre seções. O app destaca esses títulos
automaticamente.

```
NÚCLEO DA QUESTÃO
…

ARMADILHA — ONDE SE ERRA
…

ALTERNATIVA POR ALTERNATIVA
A) …
B) …
C) …
D) …

FIXAÇÃO 80/20
…
Portanto, o gabarito é a alternativa X.
```

Extensão total: **200 a 400 palavras**. Acima de 450 só quando a questão
exigir (cálculo com várias etapas, discursiva com vários itens).

### 4.2 NÚCLEO DA QUESTÃO

- **Função**: dizer em uma regra o que a banca quer que a pessoa saiba.
- **Forma**: 1–2 frases, até ~40 palavras, formulada como regra geral
  ("Em <situação>, <conduta/conceito>"). Tem de valer fora deste caso.
- **Não pode**: resumir o enunciado, dar o gabarito por letra, usar
  "neste caso".

✗ "O paciente está com síndrome coronariana aguda e precisa de ECG."
✓ "Toda dor torácica aguda potencialmente isquêmica exige ECG precoce e
troponina de alta sensibilidade, mesmo quando há um possível gatilho
gastrointestinal."

### 4.3 ARMADILHA — ONDE SE ERRA

Dois parágrafos:

**Parágrafo 1 — o erro.** Nomear a pista concreta do enunciado que puxa
para o distrator mais tentador e mostrar por que ela não basta. Quando
ajudar, dizer o tipo de erro de raciocínio:

| Erro | Como aparece |
|------|--------------|
| Ancoragem | Fixar num detalhe inicial ("refeição farta") e ignorar o resto |
| Fechamento prematuro | Parar no primeiro diagnóstico plausível sem afastar o grave |
| Pista falsamente tranquilizadora | Dado benigno (sinais vitais normais, idade jovem) usado para excluir o grave |
| Troca de comando | Responder conduta definitiva quando se pede a inicial, ou tratamento quando se pede diagnóstico |
| Troca de conceito | Sensibilidade × valor preditivo, incidência × prevalência, eficácia × efetividade |
| Representatividade | Esperar a apresentação "de livro" e descartar a atípica (idoso, diabético, mulher) |

Incluir, quando existir, o dado que muda a probabilidade pré-teste
(fatores de risco, idade, tempo de evolução).

**Parágrafo 2 — o raciocínio correto.** Passo a passo, na ordem em que o
médico pensaria, com a fonte que sustenta a conduta.

Tamanho: 60–150 palavras.

### 4.4 ALTERNATIVA POR ALTERNATIVA

- Uma entrada por alternativa, na ordem, começando com
  **"X) Correta."** ou **"X) Errada."**
- **Errada**: dizer por que não serve **neste caso** e, sempre que
  possível, **em que situação estaria certa** ("seria indicado se houvesse
  suspeita de dissecção de aorta"). Proibido justificar só com "não é a
  conduta", "não se aplica" ou "está incorreta".
- **Correta**: dado decisivo do caso + recomendação da fonte.
- 1 a 3 frases por alternativa.

### 4.5 FIXAÇÃO 80/20

- **Função**: o que se transfere para qualquer questão do mesmo assunto.
- Conteúdo: a regra prática, o número-chave que a banca cobra e as pistas
  distratoras que costumam aparecer nesse tema.
- **Não pode** trazer informação nova que não foi sustentada antes.
- 2–4 frases.
- **Última linha, sempre**: `Portanto, o gabarito é a alternativa X.` — e
  X tem de ser igual ao `answer` da questão.

### 4.6 Estilo

- Português do Brasil, técnico e direto. Frases curtas.
- Impessoal nas seções de conteúdo; imperativo permitido na FIXAÇÃO
  ("não escolha…", "exclua primeiro…").
- Siglas: por extenso na primeira vez, exceto as consagradas (ECG, PA,
  FC, FR, HIV, TC, RM, UTI, SUS, UBS).
- Fármacos pelo nome genérico. Unidades como na prática brasileira
  (mg/dL, mmHg, mEq/L).
- Sem negrito, itálico, emoji, marcadores ou links — o campo é texto puro.
- Sem "claro", "obviamente", "é importante lembrar que", "vale ressaltar".
- Sem repetir o enunciado; citar só o dado necessário.

---

## 5. Etapa 5 — Adaptações por tipo de questão

**"EXCETO / INCORRETA"**
- NÚCLEO sobre o conceito cobrado, não sobre a alternativa falsa.
- Na ALTERNATIVA POR ALTERNATIVA, usar "Verdadeira." / "Falsa." em vez
  de Correta/Errada, e dizer qual é a falsa.
- Última linha: `Portanto, o gabarito é a alternativa X (a única incorreta).`

**Cálculo** (epidemiologia, bioestatística, dose, hidratação,
queimados, escores)
- Na ARMADILHA, parágrafo 2: fórmula escrita por extenso, números do
  enunciado substituídos e o resultado.
- Na ALTERNATIVA POR ALTERNATIVA, mostrar **qual erro de conta produz
  cada distrator** (ex.: "usou o total de positivos no denominador").
- Conferir a conta duas vezes.

**Questão com imagem** (ECG, radiografia, TC, lesão de pele, fundo de
olho)
- Começar a ARMADILHA descrevendo em texto os achados da imagem. A
  explicação precisa fazer sentido para quem não vê a imagem.

**Certo / Errado** (duas alternativas)
- Analisar a afirmação trecho por trecho e apontar exatamente qual
  trecho a torna certa ou errada.

**Ética e legislação**
- Citar o artigo/lei só quando conferido. Diferenciar dever ético (CFM)
  de obrigação legal (lei) quando a questão misturar os dois.

**Anulada**
- NÚCLEO normal. ARMADILHA explica o provável motivo da anulação.
  Alternativas analisadas normalmente. Última linha:
  `Questão anulada pela banca.`

**Discursiva**
- Trocar ALTERNATIVA POR ALTERNATIVA por **RESPOSTA ESPERADA**, com um
  parágrafo por item pedido, na ordem do enunciado, dizendo o que
  pontuaria.
- Última linha: `Resposta esperada conforme descrito acima.`

---

## 6. Etapa 6 — Gravação

- Explicação em `question-explanations.js`, na chave do `id` da questão.
- O texto fica dentro de uma template string JavaScript: **escapar** crase
  (`` \` ``) e `${`. Depois de gravar, rodar `node --check` no arquivo.
- Classificação (área, assunto, tópico, subtópico) no `questions-*.js`,
  conforme `ROTEIRO-IMPORTACAO.md`.

---

## 7. Etapa 7 — Controle de qualidade

**Checklist por questão**
- [ ] Resolvida sem olhar o gabarito antes de escrever.
- [ ] 4 seções, na ordem, títulos exatos.
- [ ] NÚCLEO é regra geral, não resumo do caso.
- [ ] ARMADILHA nomeia a pista do enunciado e traz o raciocínio correto
      com fonte.
- [ ] Toda alternativa errada diz por que não serve aqui (e quando
      serviria).
- [ ] Todo número tem fonte; nenhuma fonte, ano ou artigo inventado.
- [ ] Conduta coerente com a norma brasileira vigente, ou divergência
      explicada.
- [ ] Última linha no formato certo, e a letra bate com `answer`.
- [ ] 200–400 palavras.

**Por lote (prova inteira)**
- Reler de ponta a ponta pelo menos 1 em cada 10 explicações, sorteadas.
- Entregar ao usuário a **lista de revisão**:
  - gabarito em conflito com a literatura (com a fonte);
  - número ou recomendação que não deu para confirmar;
  - classificação forçada no nó mais próximo da taxonomia;
  - questão sem gabarito oficial.
- Nada é publicado antes da revisão do usuário.

---

## 8. Exemplos

### 8.1 Conduta (múltipla escolha)

Homem de 71 anos, tabagista, hipertenso, em uso de bloqueador de canal de
cálcio, dá entrada em emergência com dor retroesternal em queimação há 1
hora, após refeição farta. Hemodinamicamente estável; PA 160 x 90 mmHg;
FC 72 bpm. Qual a conduta imediata?
A) Ecocardiograma transesofágico. B) ECG e marcadores de necrose
miocárdica. C) D-dímero e angiotomografia de tórax. D) Endoscopia
digestiva alta. — Gabarito: B.

```
NÚCLEO DA QUESTÃO
Toda dor torácica aguda potencialmente isquêmica exige ECG precoce e troponina de alta sensibilidade, mesmo quando há um possível gatilho gastrointestinal.

ARMADILHA — ONDE SE ERRA
O erro é ancorar na refeição farta e na dor em queimação e assumir causa digestiva. Nenhuma das duas exclui síndrome coronariana aguda (SCA), e o paciente tem 71 anos, hipertensão e tabagismo, o que aumenta a probabilidade pré-teste de doença coronariana.
Na dor torácica aguda, a prioridade é excluir as causas fatais. A diretriz brasileira de dor torácica recomenda ECG de 12 derivações em até 10 minutos da chegada e dosagem de troponina, preferencialmente de alta sensibilidade. A investigação digestiva só ganha prioridade depois de afastadas as emergências cardiovasculares.

ALTERNATIVA POR ALTERNATIVA
A) Errada. O ecocardiograma transesofágico não é exame inicial na suspeita de SCA; tem papel em situações específicas, como suspeita de síndrome aórtica aguda quando outros métodos não são adequados.
B) Correta. Dor torácica aguda com múltiplos fatores de risco cardiovascular: ECG em até 10 minutos e troponina de alta sensibilidade para investigar SCA.
C) Errada. D-dímero e angiotomografia são direcionados a hipóteses como tromboembolismo pulmonar, conforme probabilidade clínica; o enunciado não traz elementos que tornem essa a hipótese principal.
D) Errada. A relação com a refeição não permite assumir etiologia digestiva; endoscopia antes de investigar SCA seria inadequada em idoso com dor torácica e fatores de risco.

FIXAÇÃO 80/20
Na dor torácica, não tente decidir primeiro se a queimação é cardíaca ou digestiva: exclua o que mata. ECG em até 10 minutos e troponina de alta sensibilidade. Refeição farta, queimação ou refluxo prévio são pistas tranquilizadoras que a banca usa e que não excluem isquemia.
Portanto, o gabarito é a alternativa B.
```

### 8.2 Cálculo (exemplo ilustrativo)

Um teste foi aplicado a 200 pessoas: 100 com a doença (80 com teste
positivo) e 100 sem a doença (90 com teste negativo). Qual a
sensibilidade do teste? A) 80% B) 90% C) 88,9% D) 85% — Gabarito: A.

```
NÚCLEO DA QUESTÃO
Sensibilidade é a proporção de doentes que o teste identifica como positivos: o denominador são sempre os doentes, nunca os testes positivos.

ARMADILHA — ONDE SE ERRA
O erro é trocar de denominador: dividir pelos testes positivos (valor preditivo positivo) ou pelos não doentes (especificidade). Os quatro números da questão existem justamente para permitir cada uma dessas trocas.
Montando a tabela 2x2: verdadeiros positivos (VP) = 80; falsos negativos (FN) = 100 − 80 = 20; verdadeiros negativos (VN) = 90; falsos positivos (FP) = 100 − 90 = 10. Sensibilidade = VP / (VP + FN) = 80 / 100 = 80%.

ALTERNATIVA POR ALTERNATIVA
A) Correta. 80 / (80 + 20) = 80%.
B) Errada. 90% é a especificidade: VN / (VN + FP) = 90 / 100. Seria a resposta se a pergunta fosse sobre quem não tem a doença.
C) Errada. 88,9% é o valor preditivo positivo: VP / (VP + FP) = 80 / 90. Usa os testes positivos no denominador.
D) Errada. 85% é a acurácia: (VP + VN) / total = 170 / 200. Mistura doentes e não doentes.

FIXAÇÃO 80/20
Sensibilidade e especificidade olham para a doença (denominador = doentes ou não doentes); valores preditivos olham para o resultado do teste (denominador = positivos ou negativos). Monte sempre a tabela 2x2 antes de calcular: a banca coloca um distrator para cada troca de denominador.
Portanto, o gabarito é a alternativa A.
```
