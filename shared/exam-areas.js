/**
 * Grande área de uma questão da UEPA pela POSIÇÃO dela na prova, não
 * pelo texto do campo `area` (que é a subespecialidade — "Cardiologia",
 * "Psiquiatria" etc. — e não bate 1:1 com a grande área real: Psiquiatria,
 * Ortopedia e outras "menores" ficam dentro do bloco de Clínica Médica
 * na prova, por exemplo). A UEPA sempre aplica o mesmo layout fixo nas
 * 5 edições (2022-2026, confirmado question a question no raio-x usado
 * pra calcular os pesos de subject-weights.js): 100 questões, 20 por
 * grande área, sempre na mesma ordem.
 */
const UEPA_BLOCKS = [
    { max: 20, grandeArea: 'Medicina Preventiva' },
    { max: 40, grandeArea: 'Clínica Médica' },
    { max: 60, grandeArea: 'Cirurgia Geral' },
    { max: 80, grandeArea: 'Ginecologia e Obstetrícia' },
    { max: 100, grandeArea: 'Pediatria' },
];

// `number` é 1-100 dentro do caderno daquele ano (ver questions-uepa.js).
// Fora desse range (dado ausente/malformado), devolve null em vez de
// chutar uma grande área errada.
export function grandeAreaForUepaQuestion(question) {
    const n = Number(question?.number);
    if (!Number.isInteger(n) || n < 1 || n > 100) return null;
    return UEPA_BLOCKS.find((block) => n <= block.max).grandeArea;
}
