/**
 * Camada de DADOS da ferramenta de contracepção.
 *
 * Fonte única: OMS, "Medical eligibility criteria for contraceptive use",
 * 6ª edição (2025), tabela-resumo (seção 5.12, p. 159–175). Cada opção
 * abaixo é uma linha dessa tabela, traduzida para o português, com as
 * categorias MEC (1 a 4) das 7 colunas na ordem de METHOD_IDS.
 *
 * Gramática de uma célula (cats[i]):
 *   2            categoria fixa
 *   '3/4'        faixa: depende da gravidade/risco individual (nota da OMS)
 *   ic(4, 2)     inicia (I) = 4, continua (C) = 2; cada lado pode ser faixa
 *   'NA'         não se aplica (ex.: gestação)
 *   null         a linha não se pronuncia sobre este método (sem restrição)
 *
 * Opção com "byAge": a categoria depende da idade, lida da resposta à pergunta "Idade"
 * (variantes: from35 = 35 anos ou mais; under18 = menos de 18). Sem idade respondida,
 * vale a variante mais restritiva. "ageLabels" nomeia as faixas na ficha do método.
 *
 * Este arquivo não tem lógica: quem interpreta é contraception-engine.js.
 * Para atualizar para uma nova edição da OMS, só este arquivo muda.
 */

export const MEC_SOURCE = {
    title: 'OMS. Medical eligibility criteria for contraceptive use, 6ª ed. Genebra: OMS; 2025.',
    short: 'OMS MEC 2025 (6ª edição)',
    scope: 'Tabela-resumo, p. 159–175'
};

// Ordem = colunas da tabela da OMS (a coluna "coc" vale para pílula, adesivo e anel).
export const METHOD_IDS = ['coc', 'cic', 'pop', 'dmpa', 'imp', 'cu', 'lng'];

// Métodos que aparecem como cartões, cada um ligado a uma coluna (column).
export const METHOD_LIST = ['coc', 'patch', 'cvr', 'cic', 'pop', 'dmpa', 'imp', 'cu', 'lng'];

// efficacyRank: desempate por eficácia em uso típico (menor = mais eficaz).
export const METHODS = {
    coc: { id: 'coc', column: 'coc', name: 'Pílula combinada', short: 'Pílula combinada', hormonal: true, larc: false, efficacyRank: 5, note: 'Depende de uso diário regular. Contém estrogênio.' },
    patch: { id: 'patch', column: 'coc', name: 'Adesivo combinado', short: 'Adesivo', hormonal: true, larc: false, efficacyRank: 5, note: 'Troca semanal, em ciclos de 3 semanas com 1 semana sem adesivo. Contém estrogênio.' },
    cvr: { id: 'cvr', column: 'coc', name: 'Anel vaginal combinado', short: 'Anel vaginal', hormonal: true, larc: false, efficacyRank: 5, note: 'Fica 3 semanas na vagina, com 1 semana de intervalo. Contém estrogênio.' },
    cic: { id: 'cic', column: 'cic', name: 'Injetável combinado mensal', short: 'Injetável mensal', hormonal: true, larc: false, efficacyRank: 4, note: 'Aplicação a cada 4 semanas. Contém estrogênio.' },
    pop: { id: 'pop', column: 'pop', name: 'Pílula só de progestagênio', short: 'Minipílula', hormonal: true, larc: false, efficacyRank: 6, note: 'Janela de 3 horas para tomar (12 horas na de desogestrel 75 µg).' },
    dmpa: { id: 'dmpa', column: 'dmpa', name: 'Injetável trimestral (DMPA / NET-EN)', short: 'Injetável trimestral', hormonal: true, larc: false, efficacyRank: 3, note: 'A cada 3 meses (NET-EN, a cada 2). A ovulação pode demorar até 1 ano para voltar depois de parar.' },
    imp: { id: 'imp', column: 'imp', name: 'Implante subdérmico (levonorgestrel ou etonogestrel)', short: 'Implante', hormonal: true, larc: true, efficacyRank: 0, note: 'Dura de 3 a 5 anos conforme o implante. Pode causar sangramento irregular.' },
    cu: { id: 'cu', column: 'cu', name: 'DIU de cobre', short: 'DIU de cobre', hormonal: false, larc: true, efficacyRank: 2, note: 'Sem hormônio. Pode aumentar o fluxo e a cólica.' },
    lng: { id: 'lng', column: 'lng', name: 'DIU de levonorgestrel (SIU)', short: 'DIU-LNG', hormonal: true, larc: true, efficacyRank: 1, note: 'Amenorreia e sangramento irregular são comuns. Costuma reduzir a dismenorreia.' }
};

// Significado das categorias (Box 1 da OMS).
export const CATEGORY_TEXT = {
    1: { name: 'Sem restrição', text: 'Não há restrição ao uso do método.' },
    2: { name: 'Em geral pode usar', text: 'As vantagens geralmente superam os riscos teóricos ou comprovados.' },
    3: { name: 'Em geral desaconselhado', text: 'Os riscos teóricos ou comprovados geralmente superam as vantagens.' },
    4: { name: 'Contraindicado', text: 'Risco inaceitável para a saúde se o método for usado.' }
};

const ic = (i, c) => ({ i, c });
const N = null;
const ALL1 = [1, 1, 1, 1, 1, 1, 1];

/* Cada pergunta (question) agrupa opções que vêm do mesmo bloco da tabela.
   type 'single' = opções excludentes; 'multi' = marcáveis em conjunto. */
export const SECTIONS = [
    {
        id: 'perfil', title: 'Perfil e contexto', questions: [
            { id: 'age', type: 'single', title: 'Idade', page: 159, options: [
                { id: 'lt18', label: 'Menos de 18 anos (desde a menarca)', cats: [1, 1, 1, 2, 1, 2, 2] },
                { id: '18_19', label: '18 a 19 anos', cats: [1, 1, 1, 1, 1, 2, 2] },
                { id: '20_34', label: '20 a 34 anos', cats: ALL1 },
                { id: '35_39', label: '35 a 39 anos', cats: ALL1 },
                { id: '40_45', label: '40 a 45 anos', cats: [2, 2, 1, 1, 1, 1, 1] },
                { id: 'gt45', label: 'Mais de 45 anos', cats: [2, 2, 1, 2, 1, 1, 1] }
            ] },
            { id: 'parity', type: 'single', title: 'Paridade', page: 159, options: [
                { id: 'nullip', label: 'Nulípara', cats: [1, 1, 1, 1, 1, 2, 2] },
                { id: 'parous', label: 'Já teve filhos', cats: ALL1 }
            ] },
            { id: 'pregnancy', type: 'multi', title: 'Gravidez', page: 159,
              help: 'Descarte gravidez antes de iniciar qualquer método. Se houver suspeita ou confirmação, os métodos hormonais não se aplicam e os DIUs são categoria 4.',
              options: [{ id: 'yes', label: 'Gravidez confirmada ou suspeita', cats: ['NA', 'NA', 'NA', 'NA', 'NA', 4, 4] }] },
            { id: 'postpartum', type: 'single', title: 'Pós-parto e aleitamento (métodos hormonais)', page: 159,
              help: 'Outros fatores de risco para TEV no pós-parto: imobilidade, transfusão no parto, IMC > 30, hemorragia pós-parto, cesariana imediata, pré-eclâmpsia, tabagismo.',
              options: [
                { id: 'bf_lt6w', label: 'Amamentando, menos de 6 semanas de pós-parto', cats: [4, 4, 2, 2, 2, N, N] },
                { id: 'bf_6w_6m', label: 'Amamentando (principalmente), 6 semanas a menos de 6 meses', cats: [3, 3, 1, 1, 1, N, N] },
                { id: 'bf_gt6m', label: 'Amamentando, 6 meses ou mais', cats: [2, 2, 1, 1, 1, N, N] },
                { id: 'nbf_lt21_no', label: 'Sem amamentar, menos de 21 dias, sem outros fatores de risco para TEV', cats: [3, 3, 1, 1, 1, N, N] },
                { id: 'nbf_lt21_yes', label: 'Sem amamentar, menos de 21 dias, com outros fatores de risco para TEV', cats: [4, 4, 1, 1, 1, N, N] },
                { id: 'nbf_21_42_no', label: 'Sem amamentar, 21 a 42 dias, sem outros fatores de risco para TEV', cats: [2, 2, 1, 1, 1, N, N] },
                { id: 'nbf_21_42_yes', label: 'Sem amamentar, 21 a 42 dias, com outros fatores de risco para TEV', cats: [3, 3, 1, 1, 1, N, N] },
                { id: 'nbf_gt42', label: 'Sem amamentar, mais de 42 dias', cats: [1, 1, 1, 1, 1, N, N] }
            ] },
            { id: 'ppiud', type: 'single', title: 'Inserção de DIU no pós-parto (inclui pós-cesárea)', page: 160, options: [
                { id: 'lt48_nbf', label: 'Menos de 48 h, logo após a dequitação, sem amamentar', cats: [N, N, N, N, N, 1, 1] },
                { id: 'lt48_bf', label: 'Menos de 48 h, logo após a dequitação, amamentando', cats: [N, N, N, N, N, 1, 2] },
                { id: '48h_4w', label: '48 horas a menos de 4 semanas', cats: [N, N, N, N, N, 3, 3] },
                { id: 'gt4w', label: '4 semanas ou mais', cats: [N, N, N, N, N, 1, 1] },
                { id: 'sepsis', label: 'Sepse puerperal', cats: [N, N, N, N, N, 4, 4] }
            ] },
            { id: 'abortion', type: 'single', title: 'Pós-aborto', page: 161, options: [
                { id: 't1', label: 'Aborto no 1º trimestre', cats: ALL1 },
                { id: 't2', label: 'Aborto no 2º trimestre', cats: [1, 1, 1, 1, 1, 2, 2] },
                { id: 'septic', label: 'Imediatamente após aborto séptico', cats: [1, 1, 1, 1, 1, 4, 4] }
            ] },
            { id: 'ectopic', type: 'multi', title: 'Gravidez ectópica prévia', page: 161, options: [
                { id: 'yes', label: 'Já teve gravidez ectópica', cats: [1, 1, 2, 1, 1, 1, 1] }
            ] },
            { id: 'pelvicSurgery', type: 'multi', title: 'Cirurgia pélvica prévia', page: 161, options: [
                { id: 'yes', label: 'História de cirurgia pélvica', cats: ALL1 }
            ] },
            // byAge: a categoria depende da idade (resolvida pela resposta "Idade"); sem idade, vale a pior.
            { id: 'smoking', type: 'single', title: 'Tabagismo', page: 161, options: [
                { id: 'lt15', label: 'Fuma menos de 15 cigarros por dia', cats: [2, 2, 1, 1, 1, 1, 1], byAge: { from35: [3, 2, 1, 1, 1, 1, 1] }, ageLabels: { base: 'Menos de 35 anos', from35: '35 anos ou mais' } },
                { id: 'ge15', label: 'Fuma 15 ou mais cigarros por dia', cats: [2, 2, 1, 1, 1, 1, 1], byAge: { from35: [4, 3, 1, 1, 1, 1, 1] }, ageLabels: { base: 'Menos de 35 anos', from35: '35 anos ou mais' } }
            ] },
            { id: 'obesity', type: 'single', title: 'Obesidade', page: 161, options: [
                { id: 'bmi30', label: 'IMC ≥ 30 kg/m²', cats: [2, 2, 1, 1, 1, 1, 1], byAge: { under18: [2, 2, 1, 2, 1, 1, 1] }, ageLabels: { base: 'Demais idades', under18: 'Menos de 18 anos' }, note: 'Em menores de 18 anos, a categoria 2 do injetável trimestral decorre do possível efeito do NET-EN sobre a massa óssea.' }
            ] }
        ]
    },
    {
        id: 'cardio', title: 'Cardiovascular e tromboembolismo', questions: [
            { id: 'cvRisk', type: 'multi', title: 'Fatores de risco arterial', page: 162,
              help: 'Idade avançada, tabagismo, diabetes, hipertensão e dislipidemia. A OMS não pede soma automática de categorias: a gravidade de cada fator conta.',
              options: [{ id: 'multi', label: 'Vários fatores de risco para doença cardiovascular arterial', cats: ['3/4', '3/4', 2, 3, 2, 1, 2], note: 'Combinados: 3 ou 4 conforme número e gravidade dos fatores.' }] },
            { id: 'htn', type: 'single', title: 'Hipertensão', page: 162,
              help: 'Uma única medida de PA não basta para classificar. As categorias assumem que não há outros fatores de risco cardiovascular.',
              options: [
                { id: 'hx_nomeasure', label: 'História de hipertensão sem poder avaliar a PA (inclui hipertensão na gestação)', cats: [3, 3, 2, 2, 2, 1, 2] },
                { id: 'controlled', label: 'Hipertensão adequadamente controlada, PA mensurável', cats: [3, 3, 1, 2, 1, 1, 1] },
                { id: 'sbp140', label: 'PA elevada: sistólica 140–159 ou diastólica 90–99 mmHg', cats: [3, 3, 1, 2, 1, 1, 1] },
                { id: 'sbp160', label: 'PA elevada: sistólica ≥ 160 ou diastólica ≥ 100 mmHg', cats: [4, 4, 2, 3, 2, 1, 2] },
                { id: 'vascular', label: 'Doença vascular', cats: [4, 4, 2, 3, 2, 1, 2] }
            ] },
            { id: 'htnPreg', type: 'multi', title: 'Hipertensão na gestação (passada)', page: 163, options: [
                { id: 'yes', label: 'História de PA alta na gestação, com PA atual normal e mensurável', cats: [2, 2, 1, 1, 1, 1, 1] }
            ] },
            { id: 'vte', type: 'single', title: 'Trombose venosa profunda / embolia pulmonar', page: 163, options: [
                { id: 'hx', label: 'História de TVP/TEP', cats: [4, 4, 2, 2, 2, 1, 2] },
                { id: 'acute', label: 'TVP/TEP aguda', cats: [4, 4, 3, 3, 3, 1, 3] },
                { id: 'anticoag', label: 'TVP/TEP em anticoagulação estabelecida', cats: [4, 4, 2, 2, 2, 1, 2] }
            ] },
            { id: 'vteFamily', type: 'multi', title: 'História familiar de TVP/TEP', page: 163, options: [
                { id: 'yes', label: 'Parente de 1º grau com TVP/TEP', cats: [2, 2, 1, 1, 1, 1, 1] }
            ] },
            { id: 'surgery', type: 'single', title: 'Cirurgia', page: 163, options: [
                { id: 'major_immob', label: 'Cirurgia de grande porte com imobilização prolongada', cats: [4, 4, 2, 2, 2, 1, 2] },
                { id: 'major', label: 'Cirurgia de grande porte sem imobilização prolongada', cats: [2, 2, 1, 1, 1, 1, 1] },
                { id: 'minor', label: 'Cirurgia pequena sem imobilização', cats: ALL1 }
            ] },
            { id: 'thrombogenic', type: 'multi', title: 'Mutação trombogênica', page: 164, options: [
                { id: 'yes', label: 'Mutação trombogênica conhecida (fator V de Leiden, protrombina, deficiência de proteína S, C ou antitrombina)', cats: [4, 4, 2, 2, 2, 1, 2], note: 'A OMS não recomenda rastreamento de rotina.' }
            ] },
            { id: 'superficial', type: 'single', title: 'Doenças venosas superficiais', page: 164, options: [
                { id: 'varicose', label: 'Varizes', cats: ALL1 },
                { id: 'svt', label: 'Tromboflebite superficial', cats: [2, 2, 1, 1, 1, 1, 1] }
            ] },
            { id: 'ihd', type: 'multi', title: 'Doença isquêmica do coração', page: 164, options: [
                { id: 'yes', label: 'Doença isquêmica do coração, atual ou passada', cats: [4, 4, ic(2, 3), 3, ic(2, 3), 1, ic(2, 3)] }
            ] },
            { id: 'stroke', type: 'multi', title: 'AVC', page: 164, options: [
                { id: 'yes', label: 'História de acidente vascular cerebral', cats: [4, 4, ic(2, 3), 3, ic(2, 3), 1, 2] }
            ] },
            { id: 'dyslipidemia', type: 'multi', title: 'Dislipidemia', page: 164, options: [
                { id: 'yes', label: 'Dislipidemia conhecida, sem outros fatores de risco cardiovascular', cats: [2, 2, 2, 2, 2, 1, 2], note: 'A OMS não recomenda rastreamento de rotina.' }
            ] },
            { id: 'valvular', type: 'single', title: 'Valvopatia', page: 164, options: [
                { id: 'uncomplicated', label: 'Sem complicações', cats: [2, 2, 1, 1, 1, 1, 1] },
                { id: 'complicated', label: 'Complicada (hipertensão pulmonar, risco de fibrilação atrial, história de endocardite subaguda)', cats: [4, 4, 1, 1, 1, 2, 2], note: 'Para inserir DIU, a OMS recomenda profilaxia antibiótica contra endocardite.' }
            ] }
        ]
    },
    {
        id: 'neuro', title: 'Neurológico, reumático e saúde mental', questions: [
            { id: 'headache', type: 'single', title: 'Cefaleia', page: 166, options: [
                { id: 'nonmig', label: 'Cefaleia não migranosa (leve ou intensa)', cats: [ic(1, 2), ic(1, 2), 1, 1, 1, 1, 1] },
                { id: 'mig', label: 'Enxaqueca sem aura', cats: [ic(2, 3), ic(2, 3), ic(1, 2), 2, 2, 1, 2], byAge: { from35: [ic(3, 4), ic(3, 4), ic(1, 2), 2, 2, 1, 2] }, ageLabels: { base: 'Menos de 35 anos', from35: '35 anos ou mais' } },
                { id: 'aura', label: 'Enxaqueca com aura (qualquer idade)', cats: [4, 4, ic(2, 3), ic(2, 3), ic(2, 3), 1, 2] }
            ] },
            { id: 'epilepsy', type: 'multi', title: 'Epilepsia', page: 166, options: [
                { id: 'yes', label: 'Epilepsia', cats: ALL1, note: 'Se estiver em tratamento, marque também o anticonvulsivante na seção de medicamentos.' }
            ] },
            { id: 'depression', type: 'multi', title: 'Transtornos depressivos', page: 166, options: [
                { id: 'yes', label: 'Transtorno depressivo', cats: ALL1 }
            ] },
            { id: 'sle', type: 'single', title: 'Lúpus eritematoso sistêmico', page: 165, options: [
                { id: 'apl', label: 'Anticorpos antifosfolípides positivos (ou desconhecidos)', cats: [4, 4, 3, 3, 3, 1, 3] },
                { id: 'thrombocytopenia', label: 'Trombocitopenia grave', cats: [2, 2, 2, ic(3, 2), 2, ic(3, 2), 2] },
                { id: 'immunosuppressed', label: 'Em tratamento imunossupressor', cats: [2, 2, 2, 2, 2, ic(2, 1), 2] },
                { id: 'none', label: 'Lúpus sem nenhuma das condições acima', cats: [2, 2, 2, 2, 2, 1, 2] }
            ] }
        ]
    },
    {
        id: 'repro', title: 'Sangramento e trato reprodutivo', questions: [
            { id: 'bleedingPattern', type: 'single', title: 'Padrão de sangramento', page: 166, options: [
                { id: 'irregular', label: 'Padrão irregular, sem sangramento intenso', cats: [1, 1, 2, 2, 2, 1, 1] },
                { id: 'heavy', label: 'Sangramento intenso ou prolongado (regular ou irregular)', cats: [1, 1, 2, 2, 2, 2, ic(1, 2)] }
            ] },
            { id: 'unexplainedBleeding', type: 'multi', title: 'Sangramento vaginal inexplicado', page: 166, options: [
                { id: 'yes', label: 'Sangramento vaginal inexplicado (suspeita de condição grave), antes da avaliação', cats: [2, 2, 2, 3, 3, ic(4, 2), ic(4, 2)] }
            ] },
            { id: 'endometriosis', type: 'multi', title: 'Endometriose', page: 166, options: [{ id: 'yes', label: 'Endometriose', cats: [1, 1, 1, 1, 1, 2, 1] }] },
            { id: 'ovarianBenign', type: 'multi', title: 'Tumor ovariano benigno', page: 167, options: [{ id: 'yes', label: 'Tumor ovariano benigno (inclui cistos)', cats: ALL1 }] },
            { id: 'dysmenorrhea', type: 'multi', title: 'Dismenorreia', page: 167, options: [{ id: 'yes', label: 'Dismenorreia intensa', cats: [1, 1, 1, 1, 1, 2, 1] }] },
            { id: 'gtd', type: 'single', title: 'Doença trofoblástica gestacional', page: 167, options: [
                { id: 'falling', label: 'β-hCG em queda ou indetectável', cats: [1, 1, 1, 1, 1, 3, 3] },
                { id: 'persistent', label: 'β-hCG persistentemente elevado ou doença maligna', cats: [1, 1, 1, 1, 1, 4, 4] }
            ] },
            { id: 'ectropion', type: 'multi', title: 'Ectrópio cervical', page: 167, options: [{ id: 'yes', label: 'Ectrópio cervical', cats: ALL1 }] },
            { id: 'cin', type: 'multi', title: 'Neoplasia intraepitelial cervical', page: 167, options: [{ id: 'yes', label: 'NIC (neoplasia intraepitelial cervical)', cats: [2, 2, 1, 2, 2, 1, 2] }] },
            { id: 'cervicalCancer', type: 'multi', title: 'Câncer do colo do útero', page: 167, options: [{ id: 'yes', label: 'Câncer do colo do útero', cats: [2, 2, 1, 2, 2, ic(4, 2), ic(4, 2)] }] },
            { id: 'breast', type: 'single', title: 'Doença mamária', page: 167, options: [
                { id: 'mass', label: 'Nódulo mamário não diagnosticado', cats: [2, 2, 2, 2, 2, 1, 2], note: 'Investigar o quanto antes. Categoria 2 enquanto aguarda avaliação.' },
                { id: 'benign', label: 'Doença mamária benigna', cats: ALL1 },
                { id: 'family', label: 'História familiar de câncer de mama', cats: ALL1 },
                { id: 'current', label: 'Câncer de mama atual', cats: [4, 4, 4, 4, 4, 1, 4] },
                { id: 'past', label: 'Câncer de mama passado, sem doença há 5 anos', cats: [3, 3, 3, 3, 3, 1, 3] }
            ] },
            { id: 'endometrialCancer', type: 'multi', title: 'Câncer de endométrio', page: 168, options: [{ id: 'yes', label: 'Câncer de endométrio', cats: [1, 1, 1, 1, 1, ic(4, 2), ic(4, 2)] }] },
            { id: 'ovarianCancer', type: 'multi', title: 'Câncer de ovário', page: 168, options: [{ id: 'yes', label: 'Câncer de ovário', cats: [1, 1, 1, 1, 1, ic(3, 2), ic(3, 2)] }] },
            { id: 'fibroids', type: 'single', title: 'Miomas uterinos', page: 168, options: [
                { id: 'none', label: 'Sem distorção da cavidade uterina', cats: ALL1 },
                { id: 'distort', label: 'Com distorção da cavidade uterina', cats: [1, 1, 1, 1, 1, 4, 4] }
            ] },
            { id: 'anatomy', type: 'single', title: 'Anomalia anatômica do útero', page: 168, options: [
                { id: 'distort', label: 'Que distorce a cavidade uterina', cats: [N, N, N, N, N, 4, 4] },
                { id: 'nodistort', label: 'Que não distorce a cavidade uterina', cats: [N, N, N, N, N, 2, 2] }
            ] },
            { id: 'pid', type: 'single', title: 'Doença inflamatória pélvica (DIP)', page: 168, options: [
                { id: 'past_preg', label: 'DIP passada, com gravidez subsequente', cats: ALL1 },
                { id: 'past_nopreg', label: 'DIP passada, sem gravidez subsequente', cats: [1, 1, 1, 1, 1, 2, 2] },
                { id: 'current', label: 'DIP atual', cats: [1, 1, 1, 1, 1, ic(4, 2), ic(4, 2)] }
            ] },
            { id: 'sti', type: 'single', title: 'Infecções sexualmente transmissíveis', page: 169, options: [
                { id: 'cervicitis', label: 'Cervicite purulenta, infecção por clamídia ou gonorreia atual', cats: [1, 1, 1, 1, 1, ic(4, 2), ic(4, 2)] },
                { id: 'other', label: 'Outras IST (exceto HIV e hepatites)', cats: [1, 1, 1, 1, 1, 2, 2] },
                { id: 'vaginitis', label: 'Vaginite (inclui tricomoníase e vaginose bacteriana)', cats: [1, 1, 1, 1, 1, 2, 2] },
                { id: 'risk', label: 'Risco aumentado de IST', cats: [1, 1, 1, 1, 1, ic('2/3', 2), ic('2/3', 2)], note: 'Categoria 3 só se a chance individual de IST for muito alta: nesse caso, testar e tratar antes de inserir o DIU.' }
            ] }
        ]
    },
    {
        id: 'infec', title: 'HIV e outras infecções', questions: [
            { id: 'hiv', type: 'single', title: 'HIV/AIDS', page: 170,
              help: 'Se a pessoa usa antirretrovirais, marque também o esquema na seção de medicamentos.',
              options: [
                { id: 'highrisk', label: 'Alto risco para HIV', cats: ALL1 },
                { id: 'mild', label: 'HIV assintomático ou leve (estágio clínico OMS 1 ou 2)', cats: [1, 1, 1, 1, 1, 2, 2] },
                { id: 'severe', label: 'HIV grave ou avançado (estágio clínico OMS 3 ou 4)', cats: [1, 1, 1, 1, 1, ic(3, 2), ic(3, 2)] }
            ] },
            { id: 'schisto', type: 'single', title: 'Esquistossomose', page: 170, options: [
                { id: 'uncomplicated', label: 'Sem complicações', cats: ALL1 },
                { id: 'fibrosis', label: 'Com fibrose hepática', cats: ALL1 }
            ] },
            { id: 'tb', type: 'single', title: 'Tuberculose', page: 170, options: [
                { id: 'nonpelvic', label: 'Não pélvica', cats: ALL1, note: 'Se estiver em tratamento com rifampicina ou rifabutina, marque na seção de medicamentos.' },
                { id: 'pelvic', label: 'Pélvica', cats: [1, 1, 1, 1, 1, ic(4, 3), ic(4, 3)], note: 'Se estiver em tratamento com rifampicina ou rifabutina, marque na seção de medicamentos.' }
            ] },
            { id: 'malaria', type: 'multi', title: 'Malária', page: 170, options: [{ id: 'yes', label: 'Malária', cats: ALL1 }] }
        ]
    },
    {
        id: 'metab', title: 'Endócrino, digestivo e hematológico', questions: [
            { id: 'diabetes', type: 'single', title: 'Diabetes', page: 171, options: [
                { id: 'gestational', label: 'História de diabetes gestacional', cats: ALL1 },
                { id: 'nid', label: 'Sem doença vascular, não insulinodependente', cats: [2, 2, 2, 2, 2, 1, 2] },
                { id: 'id', label: 'Sem doença vascular, insulinodependente', cats: [2, 2, 2, 2, 2, 1, 2] },
                { id: 'micro', label: 'Nefropatia, retinopatia ou neuropatia', cats: ['3/4', '3/4', 2, 3, 2, 1, 2], note: 'Categoria 3 ou 4 conforme a gravidade.' },
                { id: 'vasc', label: 'Outra doença vascular ou diabetes há mais de 20 anos', cats: ['3/4', '3/4', 2, 3, 2, 1, 2], note: 'Categoria 3 ou 4 conforme a gravidade.' }
            ] },
            { id: 'thyroid', type: 'single', title: 'Tireoide', page: 171, options: [
                { id: 'goitre', label: 'Bócio simples', cats: ALL1 },
                { id: 'hyper', label: 'Hipertireoidismo', cats: ALL1 },
                { id: 'hypo', label: 'Hipotireoidismo', cats: ALL1 }
            ] },
            { id: 'gallbladder', type: 'single', title: 'Doença da vesícula biliar', page: 171, options: [
                { id: 'chole', label: 'Sintomática, tratada com colecistectomia', cats: [2, 2, 2, 2, 2, 1, 2] },
                { id: 'medical', label: 'Sintomática, tratada clinicamente', cats: [3, 2, 2, 2, 2, 1, 2] },
                { id: 'current', label: 'Sintomática atual', cats: [3, 2, 2, 2, 2, 1, 2] },
                { id: 'asymp', label: 'Assintomática', cats: [2, 2, 2, 2, 2, 1, 2] }
            ] },
            { id: 'cholestasis', type: 'single', title: 'História de colestase', page: 172, options: [
                { id: 'pregnancy', label: 'Relacionada à gestação', cats: [2, 2, 1, 1, 1, 1, 1] },
                { id: 'coc', label: 'Relacionada ao uso passado de contraceptivo combinado', cats: [3, 2, 2, 2, 2, 1, 2] }
            ] },
            { id: 'hepatitis', type: 'single', title: 'Hepatite viral', page: 172, options: [
                { id: 'acute', label: 'Aguda ou em surto', cats: [ic('3/4', 2), ic(3, 2), 1, 1, 1, 1, 1] },
                { id: 'carrier', label: 'Portadora', cats: ALL1 },
                { id: 'chronic', label: 'Crônica', cats: ALL1 }
            ] },
            { id: 'ibd', type: 'multi', title: 'Doença inflamatória intestinal', page: 12,
              options: [{ id: 'yes', label: 'Doença inflamatória intestinal (Crohn ou retocolite)', cats: [N, N, N, N, N, N, N], noRecommendation: true }] },
            { id: 'cirrhosis', type: 'single', title: 'Cirrose', page: 172, options: [
                { id: 'mild', label: 'Leve (compensada)', cats: ALL1 },
                { id: 'severe', label: 'Grave (descompensada)', cats: [4, 3, 3, 3, 3, 1, 3] }
            ] },
            { id: 'liverTumor', type: 'single', title: 'Tumores hepáticos', page: 172, options: [
                { id: 'fnh', label: 'Benigno: hiperplasia nodular focal', cats: [2, 2, 2, 2, 2, 1, 2] },
                { id: 'adenoma', label: 'Benigno: adenoma hepatocelular', cats: [4, 3, 3, 3, 3, 1, 3] },
                { id: 'malignant', label: 'Maligno (hepatoma)', cats: [4, '3/4', 3, 3, 3, 1, 3] }
            ] },
            { id: 'anemia', type: 'single', title: 'Anemias', page: 173, options: [
                { id: 'thal', label: 'Talassemia', cats: [1, 1, 1, 1, 1, 2, 1] },
                { id: 'sickle', label: 'Doença falciforme', cats: [2, 2, 1, 1, 1, 2, 1] },
                { id: 'iron', label: 'Anemia ferropriva', cats: [1, 1, 1, 1, 1, 2, 1] }
            ] }
        ]
    },
    {
        id: 'drugs', title: 'Medicamentos em uso', questions: [
            { id: 'art', type: 'multi', title: 'Antirretrovirais (TARV)', page: 173,
              help: 'Nos DIUs, a faixa 2/3 acompanha o estágio clínico do HIV: 2 nos estágios 1 e 2; 3 nos estágios 3 e 4 (só na inserção).',
              options: [
                { id: 'nrti', label: 'ITRN: abacavir, zidovudina, lamivudina, didanosina, entricitabina, estavudina, tenofovir', cats: [1, 1, 1, 1, 1, ic('2/3', 2), ic('2/3', 2)] },
                { id: 'efv', label: 'ITRNN: efavirenz', cats: [2, 2, 2, 1, 2, ic('2/3', 2), ic('2/3', 2)], note: 'Injetável trimestral: DMPA = 1; NET-EN = 2.' },
                { id: 'nnrti', label: 'ITRNN: etravirina, nevirapina, rilpivirina', cats: [1, 1, 1, 1, 1, ic('2/3', 2), ic('2/3', 2)] },
                { id: 'pi', label: 'Inibidores de protease: atazanavir/r, lopinavir/r, darunavir/r, ritonavir', cats: [1, 1, 1, 1, 1, ic('2/3', 2), ic('2/3', 2)] },
                { id: 'insti', label: 'Inibidores de integrase: raltegravir, dolutegravir', cats: [1, 1, 1, 1, 1, ic('2/3', 2), ic('2/3', 2)] },
                { id: 'prep', label: 'PrEP: tenofovir/entricitabina, anel de dapivirina, cabotegravir', cats: ALL1 }
            ] },
            { id: 'anticonvulsant', type: 'multi', title: 'Anticonvulsivantes', page: 175, options: [
                { id: 'inducer', label: 'Fenitoína, carbamazepina, barbitúricos, primidona, topiramato, oxcarbazepina', cats: [3, 2, 3, 1, 2, 1, 1], note: 'Injetável trimestral: DMPA = 1; NET-EN = 2.' },
                { id: 'lamotrigine', label: 'Lamotrigina', cats: [3, 3, 1, 1, 1, 1, 1] }
            ] },
            { id: 'antimicrobial', type: 'multi', title: 'Antimicrobianos', page: 175, options: [
                { id: 'broad', label: 'Antibióticos de amplo espectro', cats: ALL1 },
                { id: 'antifungal', label: 'Antifúngicos', cats: ALL1 },
                { id: 'antiparasitic', label: 'Antiparasitários', cats: ALL1 },
                { id: 'rifamycin', label: 'Rifampicina ou rifabutina', cats: [3, 2, 3, 1, 2, 1, 1], note: 'Injetável trimestral: DMPA = 1; NET-EN = 2.' }
            ] }
        ]
    }
];

// Métodos que a OMS trata em tabelas próprias (fora desta versão).
export const OUT_OF_SCOPE = [
    'Preservativos e outros métodos de barreira',
    'Métodos de percepção da fertilidade',
    'Amenorreia da lactação (LAM) e coito interrompido',
    'Anticoncepção de emergência (pílula e DIU de cobre)'
];
