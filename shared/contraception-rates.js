/**
 * Camada de DADOS da eficácia contraceptiva (Índice de Pearl).
 *
 * Fonte: OMS, Selected practice recommendations for contraceptive use
 * (SPR), 4ª ed., 2025, tabela 1.1 (p. 8–9), que reproduz Bradley SEK, Polis
 * CB, Micks EA, Steiner MJ. Effectiveness, safety and comparative side
 * effects. In: Contraceptive Technology, 22ª ed. Burlington: Jones-Bartlett
 * Learning; 2023. É a tabela mais recente da OMS.
 *
 * Valores = % de usuárias com gravidez não planejada no 1º ano de uso:
 *   perfect  uso perfeito (consistente e correto)
 *   typical  uso típico, população dos EUA
 *   intl     uso típico, inquéritos populacionais internacionais (quando há)
 * null = a tabela não traz o valor. Número com ponto = decimal.
 *
 * Observação: o Índice de Pearl clássico mede gravidezes por 100 mulheres-
 * ano em ensaios de cada produto. Esta tabela mede a taxa de gravidez no
 * 1º ano, a medida de eficácia mais próxima e a que a OMS adota; valores
 * de bula de cada marca podem diferir.
 */

export const RATES_SOURCE = {
    title: 'OMS. SPR para uso de contraceptivos, 4ª ed., 2025, tabela 1.1 (Bradley et al., Contraceptive Technology, 22ª ed., 2023).',
    short: 'OMS SPR 2025, tabela 1.1',
    noMethod: 85,
    caveat: 'A OMS usa a % de mulheres com gravidez não planejada no 1º ano de uso. É a medida mais próxima do Índice de Pearl (gravidezes por 100 mulheres-ano); o Índice de Pearl da bula de cada marca pode diferir.',
    footnotes: [
        'Uso perfeito: o método é usado de forma consistente e correta durante o 1º ano.',
        'Uso típico: considera esquecimentos e erros de uso, como na vida real.',
        'Os dados dos EUA vêm de pesquisas populacionais (NSFG); os internacionais, de inquéritos de saúde (DHS) em 15 países, sem correção para subnotificação de aborto.'
    ]
};

// Faixas de eficácia da OMS (pelo uso típico).
export const EFFECT_CATEGORIES = {
    1: { title: 'Categoria 1', text: 'Menos de 1 gravidez por 100 mulheres em 1 ano, com uso perfeito ou típico.' },
    2: { title: 'Categoria 2', text: '1 a 7 gravidezes por 100 mulheres em 1 ano, com uso típico.' },
    3: { title: 'Categoria 3', text: 'Mais de 8 gravidezes por 100 mulheres em 1 ano, com uso típico.' }
};

export const RATES = {
    // tabela-resumo (MEC)
    imp: [{ perfect: 0.1, typical: 0.1, intl: 0.3 }],
    lng: [{ perfect: 0.3, typical: 0.4, intl: null }],
    cu: [{ perfect: 0.6, typical: 0.8, intl: 1 }],
    dmpa: [{ perfect: 0.2, typical: 4, intl: 2 }],
    coc: [{ perfect: 0.3, typical: 7, intl: 6 }],
    patch: [{ perfect: 0.3, typical: 7, intl: null }],
    cvr: [{ perfect: 0.3, typical: 7, intl: null }],
    pop: [{ perfect: 0.3, typical: 7, intl: 6 }],
    // barreira
    condom: [
        { label: 'Preservativo masculino', perfect: 2, typical: 13, intl: 9 },
        { label: 'Preservativo feminino', perfect: 5, typical: 21, intl: null }
    ],
    diaphragm: [
        { label: 'Diafragma (com espermicida)', perfect: 16, typical: 17, intl: null },
        { label: 'Espermicidas', perfect: 16, typical: 21, intl: null },
        { label: 'Capuz cervical (FemCap)', perfect: 22, typical: 22, intl: null }
    ],
    // percepção da fertilidade
    fab_sym: [
        { label: 'Sensiplan (sintotérmico)', perfect: 0.4, typical: 2, intl: null },
        { label: 'Billings (muco cervical)', perfect: 3, typical: 23, intl: null }
    ],
    fab_cal: [
        { label: 'Dias Fixos (Standard Days)', perfect: 5, typical: 13, intl: null },
        { label: 'Calendário (ritmo)', perfect: null, typical: 15, intl: 19 }
    ],
    // esterilização
    tubal: [{ perfect: 0.5, typical: 0.5, intl: null }]
};

// Fora dos cartões: coito interrompido e vasectomia, mostrados em texto.
export const TEXT_RATES = {
    withdrawal: { perfect: 4, typical: 20, intl: 17 },
    vasectomy: { perfect: 0.1, typical: 0.15, intl: null }
};

export function effectCategory(typical) {
    if (typeof typical !== 'number') return null;
    return typical < 1 ? 1 : typical <= 7 ? 2 : 3;
}

// Uso típico (EUA) da primeira linha: base do desempate de eficácia e da "maior eficácia".
export function typicalRate(methodId) {
    const rows = RATES[methodId];
    const row = rows && rows.find(r => typeof r.typical === 'number');
    return row ? row.typical : null;
}
