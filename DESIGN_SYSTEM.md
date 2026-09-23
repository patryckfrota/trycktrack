# Sistema visual — MedTrack (Trycktrack)

Este documento é a referência de cor, tipografia e material do aplicativo. Novos componentes devem reutilizar os tokens definidos no `:root` e em `[data-theme="light"]` de `app.css`, sem criar novos tons de roxo, cores literais ou receitas independentes de vidro. Proposta aprovada em 22/09/2026: "tinta violeta sobre papel".

## Papéis de cor

Cada cor tem um papel, e só um. Os valores abaixo são claro / escuro.

| Papel | Token | Claro | Escuro | Uso |
| --- | --- | --- | --- | --- |
| Tinta | `--lavender-active` | `#5B3CC4` | `#B9A6FF` | Ação: botões, seleção, progresso, links |
| Sobre a tinta | `--on-action` | `#FFFFFF` | `#141319` | Texto sobre botão primário (7,27:1 / 8,76:1) |
| Violeta profundo | `--brand-deep` | `#3E2A8C` | `#D4C8FF` | Logo e marca |
| Realce | `--lavender-dark` | `#EDE8FC` | `#2A2442` | Tag "JÁ CAIU", tema atual, card em destaque |
| Papel / Noite | `--bg-main` | `#F7F7FA` | `#141319` | Fundo de tela |
| Superfície | `--bg-secondary` | `#FFFFFF` | `#1C1B23` | Cards |
| Superfície 2 | `--bg-tertiary` | `#EEEDF3` | `#25242E` | Chips, campos, letra da alternativa |
| Borda | `--border-color` | `#E3E1EA` | `#2E2D38` | Bordas de card e divisórias |
| Grafite | `--text-main` | `#1B1A22` | `#EDECF3` | Texto principal |
| Grafite 2 | `--text-secondary` | `#55536A` | `#BDBACB` | Texto secundário |
| Grafite 3 | `--color-caption` | `#6E6C80` | `#928FA3` | Metadados e legendas |

A escala `--brand-50…950` continua disponível como referência, mas componentes usam os papéis acima.

## Estados de estudo

| Estado | Texto / borda | Fundo | Escuro |
| --- | --- | --- | --- |
| Acerto | `--success` `#1F7A4D` | `--success-soft` `#E4F3EA` | `#5FD39A` / `#16291F` |
| Erro | `--danger` `#C23B30` | `--danger-soft` `#FBE9E7` | `#FF8F85` / `#361B19` |
| Revisar | `--warning` `#93600A` | — | `#F2BD5B` |

Acerto e erro têm a mesma intensidade (≈5,3:1): nenhum dos dois grita mais que o outro. Cor de estado aparece só onde há estado, nunca como decoração.

## Regras de aplicação

- Roxo (Tinta) só onde se toca: ação, seleção, progresso. Se é roxo, é interativo.
- Lavanda (Realce) só como destaque pontual, nunca como fundo de tela ou gradiente decorativo.
- Sem gradientes em texto ou em cards. A logo é cor única (`--brand-deep`).
- Branco e preto puros não são usados em texto: o grafite tem o mesmo viés violeta da marca.
- Todo texto passa no WCAG AA (4,5:1); texto principal, ação e modo escuro passam no AAA (7:1).

## Tipografia

| Família | Token | Onde |
| --- | --- | --- |
| Literata | `--font-family-reading` | Enunciado, alternativas, comentário, texto do Rapid Review, título de tema, logo |
| Inter | `--font-family-base` | Botões, rótulos, chips, navegação, números e métricas |

- Texto de leitura em Literata usa `× 1.0625` sobre o tamanho escolhido no "Aa" (16 → 17px) e `line-height: 1.65`: a Literata tem olho menor que a Inter e pede mais entrelinha.
- Texto de leitura é alinhado à esquerda — nunca justificado.
- Tabelas, escores e números dentro do Rapid Review continuam em Inter.

## Superfícies

- Cards são sólidos: `--glass-card-bg` (= superfície), `--glass-card-border` e `--glass-card-shadow` (sombra mínima no claro, nenhuma no escuro).
- Cards em destaque usam as variantes `-strong` (fundo Realce).
- Vidro (`--glass-blur`) só na barra superior, no rodapé flutuante da questão e nos painéis que sobem da base.
- Sem círculos, reflexos ou bolhas decorativas sobre cards e ícones.
- A cápsula inferior possui composição própria (pendente de revisão).

## Instituições nas Trilhas

- As duas caixas permanecem roxas e usam logos brancas.
- A instituição ativa usa `--institution-glass-active`.
- A instituição inativa usa `--institution-glass` e maior transparência.
- A diferença visual deve preservar o mesmo matiz institucional.
