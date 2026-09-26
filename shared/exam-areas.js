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

// As 5 grandes áreas, na ordem em que aparecem no caderno — reaproveitada
// pra montar simulados de uma área só (ver shared/trail-exam.js).
export const UEPA_GRANDE_AREAS = UEPA_BLOCKS.map((b) => b.grandeArea);

// Agrupamento de EXIBIÇÃO (painel da trilha): o campo `area` das questões
// ora é a grande área ("Cirurgia Geral"), ora a especialidade de Clínica
// Médica ("Cardiologia") — mesma divisão de taxonomia/*.json. Isto junta
// tudo nas grandes áreas pra um gráfico legível. NÃO serve pra montar
// simulado da UEPA (lá vale a posição da questão, ver acima): um mesmo
// assunto pode cair em blocos diferentes conforme o ano.
const CLINICA_MEDICA = ['Cardiologia', 'Dermatologia', 'Endocrinologia', 'Gastroenterologia', 'Hepatologia', 'Hematologia', 'Infectologia', 'Nefrologia', 'Neurologia', 'Pneumologia', 'Reumatologia', 'Clínica Médica'];
export function displayAreaFor(area) {
    const a = (area || '').trim();
    if (CLINICA_MEDICA.includes(a)) return 'Clínica Médica';
    if (a === 'Ginecologia' || a === 'Obstetrícia') return 'Ginecologia e Obstetrícia';
    if (['Cirurgia Geral', 'Pediatria', 'Medicina Preventiva'].includes(a)) return a;
    return 'Outras especialidades';
}

// `number` é 1-100 dentro do caderno daquele ano (ver questions-uepa.js).
// Fora desse range (dado ausente/malformado), devolve null em vez de
// chutar uma grande área errada.
export function grandeAreaForUepaQuestion(question) {
    const n = Number(question?.number);
    if (!Number.isInteger(n) || n < 1 || n > 100) return null;
    return UEPA_BLOCKS.find((block) => n <= block.max).grandeArea;
}
