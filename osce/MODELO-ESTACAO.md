# Modelo de estação OSCE (v2)

Padrão **obrigatório** para toda estação do trycktrack, escrita à mão ou gerada por IA. Espelha a prova prática do Revalida (INEP) e acrescenta o que o app precisa para corrigir sozinho. Validar sempre com `node osce/validar.mjs` (precisa terminar com 0 problemas).

## 1. O que a banca cobra (conferido no PEP oficial 2022.2)

- 10 minutos e 10 pontos por estação.
- De 8 a 14 itens de avaliação, agrupados em seções (apresentação, anamnese, exame físico, investigação, hipóteses, conduta, orientação final).
- Cada item é **composto**: lista subelementos numerados e o nível sai da contagem ("Adequado: três ou mais; Parcialmente adequado: dois; Inadequado: um ou nenhum"). Parcial vale metade.
- Pesos de 0,25 a 2,0 por item, somando exatamente 10.
- Regras recorrentes: o exame só pontua se for pedido **antes** de receber o impresso; só os 6 primeiros exames citados contam; um item final avalia a sequência das tarefas.
- Resultados de exame chegam como **impressos**, só quando o candidato pede.

Uma estação com menos de 8 itens, itens de 1 ponto sem subelementos ou sem impressos está **fora do modelo**.

## 2. Estrutura do arquivo (`osce/estacoes/<id>.json`)

| Campo | Conteúdo |
|---|---|
| `schemaVersion` | `"2.0.0"` |
| `id`, `status` | `RASCUNHO` → `REVISADA` → `APROVADA` (o app só mostra as aprovadas) |
| `titulo` | Neutro: nunca entrega o diagnóstico ("Dor no peito em homem de 58 anos") |
| `classificacao` | `revalidaArea` (uma das 5 áreas da prova) **e** `internato` (rodízio, tópico A/B, tema da matriz do internato) |
| `tempoMinutos` | 10 |
| `cenario` | Nível de atenção, descrição, `recursos` e `indisponivel`. Conduta impossível naquela unidade é erro |
| `caso` | `descricao` (40 a 700 caracteres, sem diagnóstico) e 3 a 6 `tarefas` com os verbos da banca |
| `termosProibidosNoTitulo` | Termos que entregariam o diagnóstico; o validador procura no título, na descrição e nas tarefas |
| `paciente` | Identificação, perfil, `abertura`, `sinaisTriagem`, `respostas` (cada uma ligada a ações do catálogo), `perguntasAoCandidato` e `padrao` (resposta para o que não foi previsto) |
| `exameFisico` | Achados, cada um ligado a ações `ef.*` |
| `impressos` | Grupos de resultados (ECG, laboratório, imagem), cada item ligado a uma ação `ex.*` |
| `pep` | 8 a 14 itens, ver abaixo |
| `condutasDanosas` | Pelo menos 1. São erros críticos; nunca aparecem no PEP |
| `penalidadeDanosa` | Obrigatório: pontos descontados por conduta perigosa tomada (0,25 a 2,0, múltiplos de 0,25). A nota nunca fica negativa e o desconto exibido nunca passa da soma dos itens |
| `condutasDesnecessarias` | Aparecem no feedback, sem tirar nota |
| `gabarito` | Diagnóstico, conduta esperada, erros críticos, explicação e **referências com fonte e ano** |
| `revisao` | Quem rascunhou, revisão clínica e aprovação |

### Item do PEP

```json
{
  "id": "p02", "secao": "Anamnese", "peso": 0.75,
  "texto": "Caracteriza a dor torácica: (1) início…; (2) caráter…",
  "subelementos": [{ "id": "p02a", "texto": "Início e duração", "acoes": ["anam.dor-inicio"] }],
  "niveis": { "adequado": 4, "parcial": 2 },
  "regras": { "antesDoImpresso": "imp-lab", "primeirosN": 6, "ordemPrefixos": ["anam.", "ef."] },
  "ensino": "Por que isso importa e qual a referência."
}
```

- `acoes` de um subelemento: vale se o candidato fez **qualquer uma** (use mais de uma para equivalentes, como nitrato ou morfina).
- `niveis.parcial: null` torna o item tudo-ou-nada.
- `regras` é opcional. `ordemPrefixos` é para o item "realiza a sequência das tarefas" (com `acoes: []`).
- Todo item precisa de `ensino`: é o texto mostrado no resultado.

## 3. Catálogo de ações (`osce/catalogo.json`)

Lista **global**, a mesma para todas as estações: `com` (comunicação), `anam`, `ef`, `ex`, `int` (interpretação de resultado), `dx` (hipóteses), `cd` (conduta). Como o aluno vê o mesmo catálogo em qualquer caso, a presença de uma ação não indica que ela é relevante. Se uma estação precisar de uma ação que não existe, **acrescente ao catálogo** (id novo, rótulo com acentuação correta, sinônimos para a busca) em vez de criar texto livre.

## 4. Regras que o validador impõe

1. PEP com 8 a 14 itens, pesos em múltiplos de 0,25 somando exatamente 10, pelo menos 25 subelementos no total.
2. Toda ação referenciada existe no catálogo.
3. Anamnese cobrada tem resposta do paciente; exame físico cobrado tem achado; exame cobrado tem impresso; interpretação (`int.*`) exige o impresso do exame correspondente.
4. O PEP tem item de comunicação (`com.`), de hipótese (`dx.`) e de conduta (`cd.`); a hipótese do gabarito é cobrada.
5. Título, descrição e tarefas não contêm os `termosProibidosNoTitulo`.
6. Pelo menos 1 conduta danosa, 3 itens de conduta esperada, 1 erro crítico, explicação com 100+ caracteres e referência com fonte e ano.
7. `penalidadeDanosa` definida e dentro da faixa.
8. **A nota máxima é alcançável**: a sequência ideal simulada rende exatamente 10 sem acionar conduta danosa, e quem não faz nada tira 0.

## 5. Como escrever uma estação

1. **Tema pela incidência real** nos PEPs oficiais do INEP (2020 a 2025), por área. O PEP é referência de tema e formato; o caso é **original** (paciente, história e achados escritos do zero).
2. **Conteúdo clínico pela diretriz vigente** (Ministério da Saúde, sociedades brasileiras, ATLS, GINA, GOLD…). Conferir números e doses no texto da diretriz, não na memória, e registrar fonte, ano e o que foi conferido em `gabarito.referencias`.
3. **Cenário realista**: nível de atenção coerente com a conduta (o que a unidade tem e não tem). A decisão central do caso costuma depender disso.
4. **PEP primeiro, roteiro depois**: liste o que um candidato ideal faria, quebre em itens compostos com pesos, e só então escreva as falas do paciente e os impressos que sustentam cada item.
5. **Distratores de conduta**: inclua ao menos uma conduta danosa real (a que reprova na prova) e, se houver, as desnecessárias.
6. **Pontos de ensino** de cada item: uma ou duas frases com o porquê clínico e o limite da diretriz.
7. Rodar `node osce/validar.mjs`, depois fazer uma **segunda leitura clínica** procurando erro de conduta, dose e contraindicação, e só então entregar ao usuário para aprovação (`status` continua `RASCUNHO` até lá).

## 6. Imagens

Descrição textual do laudo por padrão. Imagem (ECG, raio X, foto de lesão) só se for própria ou de licença livre, com a fonte registrada.

## 7. Publicação, revisão e retroalimentação

Decisão do editor (2026-10-03): **não há aprovação individual de cada estação nem de cada ficha**. A qualidade é garantida por regras, não por fila:

1. **Só entra o que a ficha do tema sustenta.** Conduta, dose e limiar numérico vêm da ficha (`osce/fichas/`), que por sua vez é transcrita do texto da diretriz. O que a ficha lista em `naoCobrirAteComplementar` não pode ser cobrado.
2. **Validador sem erros** (`node osce/validar.mjs`) e **segunda leitura clínica** do autor antes de publicar (`status: APROVADA`, `node osce/build.mjs`).
3. **Originalidade e direitos autorais:** caso escrito do zero; tema e formato vêm da banca, texto não.
4. **Transparência:** enquanto `revisao.revisaoProfissional` for `false`, a porta, a preparação e o resultado mostram o selo "Elaborada com apoio de IA e conferida em diretriz. Ainda sem revisão por profissional".
5. **Retroalimentação:** ao fim do resultado o usuário dá nota de 1 a 5, aponta o que pode melhorar (conduta ou dose duvidosa, pontuação injusta, caso pouco realista, ação faltando, texto confuso, nível) e a parte afetada. O envio usa a coleção `feedback` do Firestore (`tipo: "osce-estacao"`); sem login, fica guardado no aparelho. Estações com notas baixas ou relatos de conduta/dose são corrigidas primeiro; ao corrigir, atualizar `revisao.dataRascunho`.
6. **Quando um profissional revisar**, registrar em `revisao` (`revisaoProfissional: true`, quem e quando) e o selo some.

## 8. Decisões ainda abertas

- Modo estudo (sem cronômetro, feedback por etapa) além do modo prova.
- Hipóteses e condutas por busca no catálogo (previsto) em vez de múltipla escolha.
