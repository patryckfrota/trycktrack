/**
 * Camada de DADOS da eficácia contraceptiva.
 *
 * Fonte: OMS/JHU, "Family Planning: A Global Handbook for Providers"
 * (edição de 2022), Apêndice A, que reproduz Trussell J, Aiken ARA.
 * Contraceptive efficacy. In: Hatcher RA et al. Contraceptive Technology,
 * 21ª ed. Nova York: Ardent Media; 2018. Taxas em grande parte dos EUA.
 * https://fphandbook.org/appendix-contraceptive-effectiveness
 *
 * Valores = gravidezes por 100 mulheres no 1º ano de uso, com uso
 * consistente e correto ("perfect") e como é usado de fato ("typical").
 * Nota: é a taxa de falha do 1º ano, afim ao Índice de Pearl (gravidezes
 * por 100 mulheres-ano), mas não idêntica. O Índice de Pearl de cada
 * produto varia conforme o estudo e a bula.
 *
 * Valor pode ser número ou texto (quando há duas populações).
 * Métodos sem taxa na tabela da OMS (pílulas de emergência) ficam fora.
 */

export const RATES_SOURCE = {
    title: 'OMS/JHU. Family Planning: A Global Handbook for Providers, 2022, Apêndice A (Trussell e Aiken, Contraceptive Technology, 21ª ed., 2018).',
    url: 'https://fphandbook.org/appendix-contraceptive-effectiveness',
    unit: 'gravidezes por 100 mulheres no 1º ano de uso',
    noMethod: 85
};

export const RATES = {
    // métodos da tabela-resumo (MEC)
    imp: [{ perfect: 0.1, typical: 0.1 }],
    lng: [{ perfect: 0.5, typical: 0.7 }],
    cu: [{ perfect: 0.6, typical: 0.8 }],
    cic: [{ perfect: 0.05, typical: 3 }],
    dmpa: [{ perfect: 0.2, typical: 4 }],
    coc: [{ label: 'Pílula, adesivo ou anel', perfect: 0.3, typical: 7 }],
    pop: [{ perfect: 0.3, typical: 7 }],
    // barreira
    condom: [{ label: 'Masculino', perfect: 2, typical: 13 }, { label: 'Feminino', perfect: 5, typical: 21 }],
    diaphragm: [
        { label: 'Diafragma com espermicida', perfect: 16, typical: 17 },
        { label: 'Espermicida', perfect: 16, typical: 21 },
        { label: 'Capuz cervical (nulípara / parida)', perfect: '9 / 26', typical: '16 / 32' }
    ],
    // percepção da fertilidade
    fab_sym: [
        { label: 'Dois Dias', perfect: 4, typical: 14 },
        { label: 'Ovulação (muco cervical)', perfect: 3, typical: 23 },
        { label: 'Outros de percepção', perfect: null, typical: 15 }
    ],
    fab_cal: [{ label: 'Dias Fixos', perfect: 5, typical: 12 }],
    // esterilização
    tubal: [{ perfect: 0.5, typical: 0.5 }]
};

// Métodos tratados só em texto na interface (sem cartão próprio).
export const TEXT_RATES = {
    lam: { perfect: 0.9, typical: 2, note: 'por 6 meses' },
    withdrawal: { perfect: 4, typical: 20 }
};

// Faixas da OMS, pela taxa de uso habitual.
export function effectTier(typical) {
    if (typeof typical !== 'number') return null;
    if (typical < 1) return 'Muito eficaz';
    if (typical < 10) return 'Eficaz';
    if (typical < 20) return 'Moderadamente eficaz';
    return 'Menos eficaz';
}

// Uso habitual da primeira linha: serve de desempate de eficácia.
export function typicalRate(methodId) {
    const rows = RATES[methodId];
    const first = rows && rows.find(r => typeof r.typical === 'number');
    return first ? first.typical : null;
}
