# Sistema visual institucional — Trycktrack

Este documento é a referência de cor e material do aplicativo. Novos componentes devem reutilizar os tokens definidos no `:root` de `index.html`, sem criar novos tons de roxo ou receitas independentes de vidro.

## Marca

| Token | Cor | Uso |
| --- | --- | --- |
| `--brand-50` | `#F7F4FF` | Fundo lavanda muito claro |
| `--brand-100` | `#EEE8FF` | Superfície clara secundária |
| `--brand-200` | `#DED2FF` | Bordas e realces suaves |
| `--brand-300` | `#C4B5FD` | Lavanda principal no modo escuro |
| `--brand-400` | `#A78BFA` | Destaques intermediários |
| `--brand-500` | `#8B6BE0` | Roxo de marca |
| `--brand-600` | `#7250C7` | Ações e seleção |
| `--brand-700` | `#593AA4` | Profundidade de gradiente |
| `--brand-800` | `#432A7D` | Roxo institucional escuro |
| `--brand-900` | `#30205A` | Superfície roxa profunda |
| `--brand-950` | `#20143D` | Sombra cromática |

## Regras de aplicação

- Roxo identifica marca, seleção, progresso e ações principais.
- Branco puro é reservado a logos sobre roxo e elementos de contraste curto.
- Textos longos usam a escala Slate já definida no aplicativo.
- Verde e vermelho aparecem apenas como estados semânticos de sucesso e erro.
- Uma opção selecionada deve ser diferenciada por intensidade, transparência, borda e profundidade — nunca por uma cor sem relação com a marca.

## Vidro líquido

- Cards comuns usam `--glass-card-bg`, `--glass-card-border` e `--glass-card-shadow`.
- Cards selecionados ou em destaque usam as variantes `-strong`.
- O desfoque deve usar `--glass-blur` e a saturação `--glass-saturation`.
- O modo claro usa vidro branco/lavanda translúcido; o modo escuro usa vidro grafite com reflexo lavanda.
- A cápsula inferior possui composição própria e não deve herdar automaticamente o material dos cards.
- Evitar bolhas decorativas sobre ícones. A profundidade deve estar na caixa maior.

## Instituições nas Trilhas

- As duas caixas permanecem roxas e usam logos brancas.
- A instituição ativa usa `--institution-glass-active`.
- A instituição inativa usa `--institution-glass` e maior transparência.
- A diferença visual deve preservar o mesmo matiz institucional.
