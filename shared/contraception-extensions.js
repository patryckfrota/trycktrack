/**
 * Camada de DADOS dos outros métodos da OMS (MEC 2025), que têm tabelas
 * próprias fora da tabela-resumo: barreira (5.7), anticoncepção de
 * emergência (5.3 e 5.5) e percepção da fertilidade (5.8). Também traz o
 * LAM (5.9) e o coito interrompido (5.10), que não têm categorias.
 *
 * Cada extensão reaproveita as perguntas do perfil: "links" liga uma opção
 * já existente (pergunta.opção) às categorias dos métodos da extensão, e
 * "ownQuestions" cria as condições que só existem naquela tabela.
 * A gramática das células é a de contraception-data.js. "note" de um link pode ser
 * uma string (vale para todos os métodos) ou uma lista com uma nota por método. Escala 'mec' usa
 * 1 a 4; escala 'acd' (percepção da fertilidade) usa A, C e D; 'acds' (esterilização)
 * acrescenta S (serviço especializado).
 */

const N = null;

export const EXTENSIONS = [
    {
        id: 'barrier',
        title: 'Barreira',
        scale: 'mec',
        page: '112–128',
        intro: 'Preservativos masculino e feminino são os únicos métodos desta lista que também protegem contra IST e HIV. Mulheres para quem a gravidez é um risco inaceitável devem saber que os métodos de barreira têm falha maior no uso típico.',
        // A tabela da OMS imprime Diafragma e Espermicida em colunas separadas, mas os
        // textos de apoio não deixam claro qual valor é de qual. Por isso o 2º método
        // usa a categoria mais restritiva entre as duas colunas.
        methods: [
            { id: 'condom', name: 'Preservativo masculino (látex ou poliuretano) ou feminino', short: 'Preservativo', hormonal: false, larc: false, efficacyRank: 0, note: 'Protege também contra IST e HIV.' },
            { id: 'diaphragm', name: 'Diafragma, capuz cervical ou espermicida', short: 'Diafragma/espermicida', hormonal: false, larc: false, efficacyRank: 1, note: 'A categoria mostrada é a mais restritiva entre diafragma e espermicida.' }
        ],
        links: [
            { q: 'pregnancy', o: 'yes', cats: ['NA', 'NA'], note: 'Nenhum método de barreira é relevante para contracepção na gravidez. Para quem segue em risco de IST/HIV, o preservativo continua recomendado.' },
            { q: 'parity', o: 'parous', cats: [1, 2], note: 'Maior risco de falha do capuz cervical em quem já teve filhos.' },
            ...['bf_lt6w', 'nbf_lt21_no', 'nbf_lt21_yes', 'nbf_21_42_no', 'nbf_21_42_yes'].map(o => ({ q: 'postpartum', o, cats: [1, 'NA'], note: 'Diafragma e capuz não servem até a involução uterina se completar (6 semanas).' })),
            { q: 'abortion', o: 't2', cats: [1, 1], note: 'Diafragma e capuz só a partir de 6 semanas após aborto do 2º trimestre.' },
            { q: 'obesity', o: 'bmi30', cats: [1, 1], note: 'A obesidade grave pode dificultar a colocação do diafragma e do capuz.' },
            { q: 'valvular', o: 'complicated', cats: [1, 2], note: 'Na endocardite bacteriana subaguda, o diafragma pode aumentar o risco de infecção urinária.' },
            { q: 'cin', o: 'yes', cats: [1, 1], note: 'Não use capuz cervical. O diafragma não tem restrição.' },
            { q: 'cervicalCancer', o: 'yes', cats: [1, 2], note: 'Enquanto aguarda tratamento, não use capuz cervical. O uso repetido e em dose alta de nonoxinol-9 pode irritar e causar abrasões no colo.' },
            ...['distort', 'nodistort'].map(o => ({ q: 'anatomy', o, cats: [1, 'NA'], note: 'O diafragma não serve em certos casos de prolapso, e o capuz não serve com anatomia cervical muito distorcida.' })),
            { q: 'hiv', o: 'highrisk', cats: [1, 4], note: 'A categoria 4 vem do espermicida, não do diafragma. O uso repetido e em dose alta de nonoxinol-9 aumenta as lesões genitais e pode aumentar o risco de contrair HIV.' },
            { q: 'hiv', o: 'mild', cats: [1, 3], note: 'Espermicida e diafragma podem lesar a mucosa do colo, aumentando a eliminação viral e a transmissão do HIV aos parceiros.' },
            { q: 'hiv', o: 'severe', cats: [1, 3], note: 'Espermicida e diafragma podem lesar a mucosa do colo, aumentando a eliminação viral e a transmissão do HIV aos parceiros.' },
            ...['nrti', 'efv', 'nnrti', 'pi', 'insti'].map(o => ({ q: 'art', o, cats: [1, 3], note: 'Não há interação medicamentosa: a categoria 3 vem do estágio clínico do HIV.' }))
        ],
        ownQuestions: [
            { id: 'latex', type: 'multi', title: 'Alergia a látex', page: 127, options: [
                { id: 'yes', label: 'Alergia a látex', cats: [3, 3], note: 'Não vale para preservativos e diafragmas de plástico (poliuretano ou silicone): use esses.' }
            ] },
            { id: 'tss', type: 'multi', title: 'Síndrome do choque tóxico', page: 121, options: [
                { id: 'yes', label: 'História de síndrome do choque tóxico', cats: [1, 3], note: 'A síndrome já foi relatada com o diafragma, e o uso por quem a teve pode aumentar a chance de recorrência.' }
            ] },
            { id: 'uti', type: 'multi', title: 'Infecção urinária', page: 121, options: [
                { id: 'yes', label: 'Infecção do trato urinário de repetição ou atual', cats: [1, 2], note: 'Há risco potencial maior de infecção urinária com diafragma e espermicida.' }
            ] }
        ]
    },
    {
        id: 'emergency',
        title: 'Emergência',
        scale: 'mec',
        page: '81–83 e 109',
        intro: 'Use o mais cedo possível, em até 5 dias após a relação desprotegida. Não protege contra IST e HIV. A pílula de emergência não age se a mulher já estiver grávida.',
        methods: [
            { id: 'ecp_upa', name: 'Pílula de ulipristal (30 mg)', short: 'Ulipristal', hormonal: true, larc: false, efficacyRank: 1, note: 'Evite amamentar por 1 semana: extraia e descarte o leite nesse período.' },
            { id: 'ecp_lng', name: 'Pílula de levonorgestrel (1,5 mg ou 0,75 mg)', short: 'Levonorgestrel', hormonal: true, larc: false, efficacyRank: 2, note: 'Pode ser menos eficaz com IMC ≥ 30 kg/m².' },
            { id: 'ecp_coc', name: 'Pílula combinada (método de Yuzpe)', short: 'Combinada (Yuzpe)', hormonal: true, larc: false, efficacyRank: 3, note: 'Uso curto, com menos risco que o uso contínuo de combinados.' },
            { id: 'eiud', name: 'DIU de cobre de emergência', short: 'DIU de cobre (EC)', hormonal: false, larc: true, efficacyRank: 0, note: 'Vale também como contraceptivo de longa duração. Os critérios do DIU de cobre se aplicam.' }
        ],
        inherit: { eiud: 'cu' },
        links: [
            { q: 'pregnancy', o: 'yes', cats: ['NA', 'NA', 'NA', 4], note: 'A pílula não é indicada na gravidez, mas não há dano conhecido se for tomada sem querer. O DIU não deve ser usado (infecção pélvica grave e aborto séptico).' },
            ...['bf_lt6w', 'bf_6w_6m', 'bf_gt6m'].map(o => ({ q: 'postpartum', o, cats: [2, 1, 1, N], note: ['Evite amamentar por 1 semana após o ulipristal: extraia e descarte o leite nesse período.', null, null, null] })),
            { q: 'ectopic', o: 'yes', cats: [1, 1, 1, N] },
            ...['bmi30'].map(o => ({ q: 'obesity', o, cats: [1, 1, 1, N], note: 'A pílula de emergência pode ser menos eficaz com IMC ≥ 30 kg/m², sem preocupação de segurança.' })),
            ...[['ihd', 'yes'], ['stroke', 'yes'], ['vte', 'hx'], ['vte', 'acute'], ['vte', 'anticoag']].map(([q, o]) => ({ q, o, cats: [2, 2, 2, N], note: 'O uso é curto, com menos risco que o uso regular de COC ou minipílula.' })),
            ...['mig', 'aura'].map(o => ({ q: 'headache', o, cats: [2, 2, 2, N], note: 'O uso é curto, com menos risco que o uso regular de COC ou minipílula.' })),
            { q: 'cirrhosis', o: 'severe', cats: [2, 2, 2, N] },
            { q: 'anticonvulsant', o: 'inducer', cats: [1, 1, 1, N], note: 'Indutores de CYP3A4 podem reduzir a eficácia das pílulas de emergência. Isso não afeta o DIU de cobre.' },
            { q: 'antimicrobial', o: 'rifamycin', cats: [1, 1, 1, N], note: 'Indutores de CYP3A4 podem reduzir a eficácia das pílulas de emergência. Isso não afeta o DIU de cobre.' },
            { q: 'art', o: 'efv', cats: [1, 1, 1, N], note: 'O efavirenz reduziu os níveis de levonorgestrel em 56% num estudo pequeno. Isso não afeta o DIU de cobre.' }
        ],
        ownQuestions: [
            { id: 'ecRepeat', type: 'multi', title: 'Uso repetido da pílula de emergência', page: 83, options: [
                { id: 'yes', label: 'Já usou pílula de emergência mais de uma vez neste ciclo', cats: [1, 1, 1, N], revised: true, note: 'Revisado na 6ª edição: sem restrição, mas a pílula de emergência não deve substituir um método regular.' }
            ] },
            { id: 'ecLiver', type: 'multi', title: 'Doença hepática grave', page: 82, options: [
                { id: 'yes', label: 'Doença hepática grave (inclui icterícia)', cats: [2, 2, 2, N], note: 'O uso é curto, com menos risco que o uso regular de COC ou minipílula.' }
            ] },
            { id: 'ecInducer', type: 'multi', title: 'Erva-de-São-João', page: 82, options: [
                { id: 'yes', label: 'Uso de erva-de-São-João (Hypericum perforatum)', cats: [1, 1, 1, N], revised: true, note: 'Indutores de CYP3A4 podem reduzir a eficácia das pílulas de emergência. Isso não afeta o DIU de cobre.' }
            ] },
            { id: 'ecRape', type: 'single', title: 'Violência sexual', page: 83, options: [
                { id: 'low', label: 'Violência sexual, baixo risco de IST', cats: [1, 1, 1, 1], note: 'Não há restrição ao uso das pílulas em caso de violência sexual.' },
                { id: 'high', label: 'Violência sexual, alto risco de IST', cats: [1, 1, 1, 3], note: 'O DIU não protege contra IST nem DIP. Com clamídia ou gonorreia, evite o aumento de risco de DIP que a inserção traz.' }
            ] }
        ]
    },
    {
        id: 'fab',
        title: 'Percepção da fertilidade',
        scale: 'acd',
        page: '129–132',
        intro: 'Nenhuma condição piora pelo uso desses métodos, por isso a escala de 1 a 4 não se aplica. A OMS usa A (aceitar), C (cautela: aconselhamento especial para o uso correto) e D (adiar até avaliar ou corrigir, oferecendo método temporário). Não protegem contra IST nem HIV, e têm falha maior no uso típico.',
        methods: [
            { id: 'fab_sym', name: 'Métodos baseados em sintomas (muco cervical, Dois Dias, sintotérmico)', short: 'Sintomas', hormonal: false, larc: false, efficacyRank: 0, note: 'Exige treinamento do casal e observação diária.' },
            { id: 'fab_cal', name: 'Métodos baseados em calendário (Ritmo, Dias Fixos)', short: 'Calendário', hormonal: false, larc: false, efficacyRank: 1, note: 'O método dos Dias Fixos evita relações nos dias 8 a 19 do ciclo e pede ciclos de 26 a 32 dias.' }
        ],
        links: [
            { q: 'pregnancy', o: 'yes', cats: ['NA', 'NA'], note: 'Os métodos de percepção da fertilidade não se aplicam na gravidez.' },
            { q: 'postpartum', o: 'bf_lt6w', cats: ['D', 'D'], note: 'Amamentando, com menos de 6 semanas: é improvável haver função ovariana para sinais detectáveis.' },
            ...['bf_6w_6m', 'bf_gt6m'].map(o => ({ q: 'postpartum', o, cats: ['C', 'D'], note: 'Amamentar reduz a eficácia. Com a menstruação de volta, usa-se sintomas; o calendário exige ao menos 3 menstruações pós-parto e ciclos regulares (Dias Fixos: 4 menstruações e último ciclo de 26 a 32 dias). Até lá, ofereça barreira.' })),
            ...['nbf_lt21_no', 'nbf_lt21_yes'].map(o => ({ q: 'postpartum', o, cats: ['D', 'D'], note: 'Sem amamentar, com menos de 4 semanas: oferecer método adequado ao pós-parto.' })),
            ...['nbf_21_42_no', 'nbf_21_42_yes'].map(o => ({ q: 'postpartum', o, cats: ['A/D', 'D'], note: 'Sem amamentar: o método de sintomas pode começar a partir de 4 semanas (28 dias); antes disso, adie. O calendário espera as menstruações pós-parto.' })),
            { q: 'postpartum', o: 'nbf_gt42', cats: ['A', 'D'], note: 'O calendário só pode começar depois de ao menos 3 menstruações pós-parto com ciclos regulares.' },
            ...['t1', 't2', 'septic'].map(o => ({ q: 'abortion', o, cats: ['C', 'D'], note: 'O calendário só começa depois da 1ª menstruação pós-aborto (Dias Fixos: se os ciclos anteriores eram de 26 a 32 dias).' })),
            { q: 'bleedingPattern', o: 'irregular', cats: ['D', 'D'], note: 'Sangramento vaginal irregular: adie até avaliar. Ofereça método temporário.' }
        ],
        ownQuestions: [
            { id: 'fabLife', type: 'single', title: 'Fase da vida', page: 130, options: [
                { id: 'menarche', label: 'Logo após a menarca', cats: ['C', 'C'], note: 'Irregularidade menstrual é comum e complica o uso.' },
                { id: 'perimenopause', label: 'Perimenopausa', cats: ['C', 'C'], note: 'Irregularidade menstrual é comum e complica o uso.' }
            ] },
            { id: 'fabBf', type: 'multi', title: 'Amamentação com menstruação', page: 130, options: [
                { id: 'menses', label: 'Amamentando e a menstruação já voltou', cats: ['C', 'C'], note: 'Os primeiros ciclos variam muito; leva alguns ciclos para a regularidade voltar.' }
            ] },
            { id: 'fabDischarge', type: 'multi', title: 'Corrimento vaginal', page: 131, options: [
                { id: 'yes', label: 'Corrimento vaginal', cats: ['D', 'A'], note: 'Atrapalha a observação do muco cervical: adie o método de sintomas.' }
            ] },
            { id: 'fabDrugs', type: 'multi', title: 'Medicamentos que alteram o ciclo', page: 131, options: [
                { id: 'yes', label: 'Uso de medicamentos que alteram a regularidade do ciclo, hormônios ou sinais de fertilidade', cats: ['C/D', 'C/D'], note: 'Cautela ou adiamento conforme o medicamento.' }
            ] },
            { id: 'fabFever', type: 'single', title: 'Doenças que elevam a temperatura', page: 131, options: [
                { id: 'chronic', label: 'Doença crônica que eleva a temperatura corporal', cats: ['C', 'A'], note: 'Afeta a temperatura basal (sintotérmico).' },
                { id: 'acute', label: 'Doença aguda que eleva a temperatura corporal', cats: ['D', 'A'], note: 'Afeta a temperatura basal (sintotérmico).' }
            ] }
        ]
    }
,
    {
        id: 'ster',
        title: 'Esterilização',
        scale: 'acds',
        requires: 'sterLegal',
        page: '136–152',
        intro: 'Procedimento cirúrgico pensado para ser permanente: toda mulher deve escolher de forma voluntária e informada, com orientação sobre a permanência e sobre métodos de longa duração muito eficazes. Atenção especial a jovens, nulíparas e mulheres com problemas de saúde mental, inclusive depressão. Considere as leis e normas nacionais. A OMS não restringe de forma absoluta nenhuma condição: usa A (aceitar), C (cautela), D (adiar) e S (serviço especializado). Não protege contra IST nem HIV.',
        methods: [
            { id: 'tubal', name: 'Esterilização cirúrgica feminina (laqueadura tubária)', short: 'Laqueadura', hormonal: false, larc: true, efficacyRank: 0, note: 'Deve ser feita por equipe treinada, em serviço adequado, com protocolos de prevenção de infecção.' }
        ],
        links: [
            { q: 'pregnancy', o: 'yes', cats: ['D'], note: 'Gravidez: adie o procedimento.' },
            { q: 'parity', o: 'nullip', cats: ['A'], note: 'Como toda mulher, deve ser aconselhada sobre a permanência da esterilização e sobre métodos de longa duração muito eficazes.' },
            ...['bmi30'].map(o => ({ q: 'obesity', o, cats: ['C'], note: 'O procedimento pode ser mais difícil: maior risco de infecção e abertura da ferida, função respiratória limitada e mais chance de precisar de anestesia geral.' })),
            { q: 'cvRisk', o: 'multi', cats: ['S'], note: 'Vários fatores de risco: risco alto de complicações da anestesia e da cirurgia.' },
            { q: 'htn', o: 'controlled', cats: ['C'], note: 'Controle a PA antes da cirurgia: há mais risco anestésico e de arritmia. Monitore a PA no intraoperatório.' },
            { q: 'htn', o: 'sbp140', cats: ['C'], note: 'Controle a PA antes da cirurgia: há mais risco anestésico e de arritmia. Monitore a PA no intraoperatório.' },
            { q: 'htn', o: 'sbp160', cats: ['S'], note: 'Controle a PA antes da cirurgia: há mais risco anestésico e de arritmia. Monitore a PA no intraoperatório.' },
            { q: 'htn', o: 'vascular', cats: ['S'], note: 'Controle a PA antes da cirurgia: há mais risco anestésico e de arritmia.' },
            { q: 'vte', o: 'hx', cats: ['A'], note: 'Para reduzir o risco de TVP/TEP, recomenda-se deambulação precoce.' },
            { q: 'vte', o: 'acute', cats: ['D'], note: 'Para reduzir o risco de TVP/TEP, recomenda-se deambulação precoce.' },
            { q: 'vte', o: 'anticoag', cats: ['S'], note: 'Para reduzir o risco de TVP/TEP, recomenda-se deambulação precoce.' },
            { q: 'surgery', o: 'major_immob', cats: ['D'], note: 'Para reduzir o risco de TVP/TEP, recomenda-se deambulação precoce.' },
            { q: 'ihd', o: 'yes', cats: ['C/D'], note: 'Doença isquêmica atual: adiar (D). Passada: cautela (C). Risco alto de complicações da anestesia e da cirurgia.' },
            { q: 'stroke', o: 'yes', cats: ['C'] },
            { q: 'valvular', o: 'uncomplicated', cats: ['C'], note: 'Exige antibiótico profilático.' },
            { q: 'valvular', o: 'complicated', cats: ['S'], note: 'Risco alto de complicações da anestesia e da cirurgia. Com fibrilação atrial não controlada ou endocardite subaguda atual, adie.' },
            { q: 'sle', o: 'apl', cats: ['S'], note: 'Mulheres com LES têm mais risco de doença isquêmica, AVC e TEV; a classificação supõe ausência de outros fatores de risco cardiovascular.' },
            { q: 'sle', o: 'thrombocytopenia', cats: ['S'] },
            { q: 'sle', o: 'immunosuppressed', cats: ['S'] },
            { q: 'sle', o: 'none', cats: ['C'] },
            { q: 'epilepsy', o: 'yes', cats: ['C'] },
            { q: 'depression', o: 'yes', cats: ['C'], note: 'Atenção especial a quem tem problema de saúde mental, inclusive depressão.' },
            { q: 'unexplainedBleeding', o: 'yes', cats: ['D'], note: 'A condição precisa ser avaliada antes do procedimento.' },
            { q: 'endometriosis', o: 'yes', cats: ['S'] },
            { q: 'gtd', o: 'persistent', cats: ['D'] },
            { q: 'cervicalCancer', o: 'yes', cats: ['D'], note: 'Em geral, o tratamento esteriliza a mulher.' },
            { q: 'breast', o: 'current', cats: ['C'] },
            { q: 'endometrialCancer', o: 'yes', cats: ['D'], note: 'Em geral, o tratamento esteriliza a mulher.' },
            { q: 'ovarianCancer', o: 'yes', cats: ['D'], note: 'Em geral, o tratamento esteriliza a mulher.' },
            { q: 'fibroids', o: 'none', cats: ['C'], note: 'Conforme o tamanho e a localização, pode ser difícil localizar as tubas e mobilizar o útero.' },
            { q: 'fibroids', o: 'distort', cats: ['C'], note: 'Conforme o tamanho e a localização, pode ser difícil localizar as tubas e mobilizar o útero.' },
            { q: 'pid', o: 'past_preg', cats: ['A'], note: 'Faça exame pélvico cuidadoso para descartar infecção recorrente ou persistente e avaliar a mobilidade do útero.' },
            { q: 'pid', o: 'past_nopreg', cats: ['C'], note: 'Faça exame pélvico cuidadoso para descartar infecção recorrente ou persistente e avaliar a mobilidade do útero. A DIP pode levar a infecção pós-esterilização ou aderências.' },
            { q: 'pid', o: 'current', cats: ['D'], note: 'Faça exame pélvico cuidadoso para descartar infecção recorrente ou persistente e avaliar a mobilidade do útero.' },
            { q: 'sti', o: 'cervicitis', cats: ['D'], note: 'Se não houver sintomas após o tratamento, a esterilização pode ser feita. Há risco maior de infecção pós-operatória.' },
            { q: 'hiv', o: 'highrisk', cats: ['A'], note: 'Não precisa de rastreamento de rotina. Siga as precauções universais e recomende preservativo após o procedimento.' },
            { q: 'hiv', o: 'mild', cats: ['A'], note: 'Não precisa de rastreamento de rotina. Siga as precauções universais e recomende preservativo após o procedimento.' },
            { q: 'hiv', o: 'severe', cats: ['S'], note: 'Uma doença relacionada à AIDS pode exigir adiar o procedimento.' },
            { q: 'schisto', o: 'fibrosis', cats: ['C'], note: 'Pode ser preciso avaliar a função hepática. Se for grave, veja cirrose.' },
            { q: 'tb', o: 'pelvic', cats: ['S'] },
            { q: 'diabetes', o: 'nid', cats: ['C'], note: 'Pode haver pior cicatrização e mais risco de infecção da ferida: antibiótico profilático é recomendado. Se a glicemia não estiver bem controlada, encaminhe a serviço de maior nível.' },
            { q: 'diabetes', o: 'id', cats: ['C'], note: 'Pode haver pior cicatrização e mais risco de infecção da ferida: antibiótico profilático é recomendado. Há risco de hipoglicemia ou cetoacidose, sobretudo com glicemia mal controlada.' },
            { q: 'diabetes', o: 'micro', cats: ['S'], note: 'Se a glicemia não estiver bem controlada, encaminhe a serviço de maior nível.' },
            { q: 'diabetes', o: 'vasc', cats: ['S'], note: 'Se a glicemia não estiver bem controlada, encaminhe a serviço de maior nível.' },
            { q: 'thyroid', o: 'hyper', cats: ['S'], note: 'Há risco maior de complicações da anestesia e da cirurgia.' },
            { q: 'thyroid', o: 'hypo', cats: ['C'], note: 'Há risco maior de complicações da anestesia e da cirurgia.' },
            { q: 'gallbladder', o: 'current', cats: ['D'] },
            { q: 'hepatitis', o: 'acute', cats: ['D'], note: 'Há risco alto de complicações da anestesia e da cirurgia. Siga as precauções universais.' },
            { q: 'cirrhosis', o: 'severe', cats: ['S'], note: 'A função hepática e a coagulação podem estar alteradas: avalie a função hepática.' },
            { q: 'liverTumor', o: 'adenoma', cats: ['C'], note: 'A função hepática e a coagulação podem estar alteradas: avalie a função hepática.' },
            { q: 'liverTumor', o: 'malignant', cats: ['C'], note: 'A função hepática e a coagulação podem estar alteradas: avalie a função hepática.' },
            { q: 'anemia', o: 'thal', cats: ['C'] },
            { q: 'anemia', o: 'sickle', cats: ['C'], note: 'Há risco maior de complicações pulmonares, cardíacas ou neurológicas e possível aumento do risco de infecção da ferida.' },
            { q: 'anemia', o: 'iron', cats: ['A'], note: 'Informe também a hemoglobina, em “Esterilização” no perfil: Hb < 7 g/dL pede adiar; de 7 a < 10 g/dL, cautela.' }
        ],
        ownQuestions: [
            { id: 'sterLegal', type: 'single', inline: true, title: 'Idade e filhos vivos (Lei 9.263/1996, art. 10)', page: 'Lei 14.443/2022', options: [
                { id: 'ge21', label: '21 anos ou mais', cats: ['A'], note: 'Atende ao critério de idade. Falta cumprir o prazo de 60 dias e o aconselhamento.' },
                { id: 'u21_2kids', label: '18 a 20 anos, 2 ou mais filhos vivos', cats: ['A'], note: 'Atende à lei: menor de 21 anos com pelo menos 2 filhos vivos e capacidade civil plena. Falta cumprir o prazo de 60 dias e o aconselhamento.' },
                { id: 'em_2kids', label: 'Menor de 18 anos, emancipado(a), 2 ou mais filhos vivos', cats: ['A'], note: 'Atende à lei somente com a emancipação comprovada (capacidade civil plena). Falta cumprir o prazo de 60 dias e o aconselhamento.' },
                { id: 'u21_lt2', label: '18 a 20 anos, menos de 2 filhos vivos', cats: ['L'], note: 'A lei não permite: é preciso ter 21 anos ou pelo menos 2 filhos vivos. A única exceção é o risco à vida ou à saúde, com relatório escrito e assinado por 2 médicos. Ofereça métodos reversíveis de longa duração.' },
                { id: 'lt18', label: 'Menor de 18 anos, sem emancipação ou com menos de 2 filhos', cats: ['L'], note: 'A lei não permite: antes dos 18 anos só com emancipação, e mesmo assim é preciso ter 2 filhos vivos. A única exceção é o risco à vida ou à saúde, com relatório de 2 médicos. Ofereça métodos reversíveis de longa duração.' }
            ] },
            { id: 'sterYoung', type: 'multi', title: 'Idade jovem', page: 137, options: [
                { id: 'yes', label: 'Idade jovem', cats: ['C'], note: 'Como toda mulher, deve ser aconselhada sobre a permanência. Até 20% das mulheres esterilizadas jovens se arrependem depois, e a idade jovem é um dos preditores mais fortes de arrependimento.' }
            ] },
            { id: 'sterTime', type: 'single', title: 'Tempo de pós-parto', page: 137, options: [
                { id: 'lt7', label: 'Menos de 7 dias de pós-parto', cats: ['A'], note: 'A esterilização pode ser feita com segurança logo após o parto.' },
                { id: '7_42', label: '7 a menos de 42 dias de pós-parto', cats: ['D'], note: 'Há mais risco de complicações enquanto o útero não involuiu totalmente.' },
                { id: 'ge42', label: '42 dias ou mais de pós-parto', cats: ['A'] }
            ] },
            { id: 'sterObstetric', type: 'multi', title: 'Complicações do parto', page: 138, options: [
                { id: 'preMild', label: 'Pré-eclâmpsia leve', cats: ['A'] },
                { id: 'preSevere', label: 'Pré-eclâmpsia grave ou eclâmpsia', cats: ['D'], note: 'Há mais risco anestésico.' },
                { id: 'prom', label: 'Rotura de membranas há 24 horas ou mais', cats: ['D'], note: 'Há mais risco de infecção pós-operatória.' },
                { id: 'sepsis', label: 'Sepse puerperal, febre intraparto ou puerperal', cats: ['D'], note: 'Há mais risco de infecção pós-operatória.' },
                { id: 'hemorrhage', label: 'Hemorragia grave antes ou depois do parto', cats: ['D'], note: 'A mulher pode estar anêmica e não tolerar mais perda de sangue.' },
                { id: 'trauma', label: 'Trauma grave do trato genital (lacerações de colo ou vagina no parto)', cats: ['D'], note: 'Pode ter havido perda importante de sangue e anemia.' },
                { id: 'rupture', label: 'Rotura ou perfuração uterina', cats: ['S'], note: 'Se houver cirurgia exploradora ou laparoscopia e a paciente estiver estável, o reparo do útero e a esterilização podem ser feitos juntos, sem risco adicional.' }
            ] },
            { id: 'sterAbortion', type: 'multi', title: 'Complicações do aborto', page: 139, options: [
                { id: 'ok', label: 'Aborto sem complicações', cats: ['A'] },
                { id: 'sepsis', label: 'Sepse ou febre pós-aborto', cats: ['D'], note: 'Há mais risco de infecção pós-operatória.' },
                { id: 'hemorrhage', label: 'Hemorragia pós-aborto grave', cats: ['D'], note: 'A mulher pode estar anêmica e não tolerar mais perda de sangue.' },
                { id: 'trauma', label: 'Trauma grave do trato genital no aborto', cats: ['D'], note: 'Pode ter havido perda importante de sangue e anemia; o procedimento pode ser mais doloroso.' },
                { id: 'perforation', label: 'Perfuração uterina', cats: ['S'], note: 'Pode ter havido perda importante de sangue ou lesão de conteúdo abdominal. Com cirurgia exploradora e paciente estável, o reparo e a esterilização podem ser feitos juntos.' },
                { id: 'hematometra', label: 'Hematométrio agudo', cats: ['D'], note: 'A mulher pode estar anêmica e não tolerar mais perda de sangue.' }
            ] },
            { id: 'sterHb', type: 'single', title: 'Hemoglobina', page: 150, options: [
                { id: 'lt7', label: 'Anemia com Hb < 7 g/dL', cats: ['D'], note: 'A Hb pré-operatória e a perda de sangue na cirurgia são fatores importantes. Se a perfusão periférica for inadequada, a cicatrização piora.' },
                { id: '7_10', label: 'Anemia com Hb de 7 a < 10 g/dL', cats: ['C'], note: 'A Hb pré-operatória e a perda de sangue na cirurgia são fatores importantes.' }
            ] },
            { id: 'sterOther', type: 'multi', title: 'Outras condições relevantes só para a laqueadura', page: 150, options: [
                { id: 'localInfection', label: 'Infecção local', cats: ['D'], note: 'Há risco maior de infecção pós-operatória.' },
                { id: 'coagulation', label: 'Distúrbio de coagulação', cats: ['S'], note: 'Há risco maior de complicações hematológicas da cirurgia.' },
                { id: 'respAcute', label: 'Doença respiratória aguda (bronquite, pneumonia)', cats: ['D'], note: 'Adie até corrigir a condição: há mais riscos anestésicos e perioperatórios.' },
                { id: 'respChronic', label: 'Doença respiratória crônica (asma, bronquite, enfisema, infecção pulmonar)', cats: ['S'] },
                { id: 'systemic', label: 'Infecção sistêmica ou gastroenterite', cats: ['D'], note: 'Há mais risco de infecção pós-operatória, de complicações da desidratação e da anestesia.' },
                { id: 'fixedUterus', label: 'Útero fixo por cirurgia ou infecção anteriores', cats: ['S'], note: 'A mobilidade menor do útero, das tubas e do intestino pode dificultar a laparoscopia e a minilaparotomia.' },
                { id: 'abdominalHernia', label: 'Hérnia de parede abdominal ou umbilical', cats: ['S'], note: 'Se possível, repare a hérnia e faça a esterilização no mesmo tempo.' },
                { id: 'diaphragmHernia', label: 'Hérnia diafragmática', cats: ['C'], note: 'Na laparoscopia, o pneumoperitônio ou a posição de Trendelenburg podem causar complicações cardiorrespiratórias agudas.' },
                { id: 'kidney', label: 'Doença renal', cats: ['C'], note: 'A coagulação pode estar prejudicada, com mais risco de infecção e choque hipovolêmico; pode haver anemia, distúrbio eletrolítico e alteração do metabolismo de fármacos.' },
                { id: 'nutrition', label: 'Deficiência nutricional grave', cats: ['C'], note: 'Pode haver mais risco de infecção da ferida e cicatrização prejudicada.' },
                { id: 'priorSurgery', label: 'Cirurgia abdominal ou pélvica anterior', cats: ['C'], note: 'Mulheres com cirurgia anterior tiveram mais complicações na esterilização.' }
            ] },
            { id: 'sterConcurrent', type: 'single', title: 'Esterilização junto com outra cirurgia', page: 152, options: [
                { id: 'elective', label: 'Junto com cirurgia abdominal eletiva', cats: ['C'] },
                { id: 'emergency', label: 'Junto com cirurgia de emergência, sem aconselhamento prévio', cats: ['D'] },
                { id: 'infectious', label: 'Junto com cirurgia, em condição infecciosa', cats: ['D'] },
                { id: 'cesarean', label: 'Junto com cesariana', cats: ['A'], note: 'Não há aumento de complicações em paciente cirurgicamente estável.' }
            ] }
        ]
    }
];

// Métodos sem categorias da OMS: informação e, no LAM, checagem de critérios.
export const LAM = {
    id: 'lam',
    title: 'LAM',
    page: '133–134',
    intro: 'O método da amenorreia da lactação só protege contra gravidez enquanto as 3 condições abaixo forem mantidas ao mesmo tempo. Não há condição médica que o restrinja, mas ele tem falha maior no uso típico e pode não servir para mulheres para quem a gravidez é um risco inaceitável. Não protege contra IST nem HIV.',
    criteria: [
        { id: 'amenorrhea', label: 'Amenorreia: a menstruação não voltou' },
        { id: 'fullBf', label: 'Amamentação exclusiva ou quase exclusiva' },
        { id: 'lt6m', label: 'Menos de 6 meses de pós-parto' }
    ],
    notes: [
        'HIV: a amamentação deve ser promovida para mulheres HIV-negativas ou de status desconhecido. A mulher com HIV pode transmitir o vírus pelo leite, mas antirretrovirais na mãe ou no bebê reduzem muito o risco, e a OMS orienta apoiar a escolha dela.',
        'Medicamentos: não se recomenda amamentar com antimetabólitos, bromocriptina, certos anticoagulantes, corticoides em dose alta, ciclosporina, ergotamina, lítio, psicotrópicos, radiofármacos e reserpina.',
        'Condições do recém-nascido: malformações de boca, mandíbula ou palato, prematuridade ou baixo peso com cuidado intensivo e certos distúrbios metabólicos dificultam a amamentação e podem encurtar a amenorreia.'
    ]
};

export const COITUS_INTERRUPTUS = {
    id: 'ci',
    title: 'Coito interrompido',
    page: '135',
    intro: 'O homem retira o pênis da vagina e da genitália externa antes de ejacular. Não protege contra IST nem HIV, e tem falha maior no uso típico: não serve para mulheres para quem a gravidez é um risco inaceitável.',
    points: [
        'Pode servir a casais muito motivados e capazes de usá-lo bem, com motivo religioso ou filosófico para evitar outros métodos, que precisam de proteção imediata sem alternativa, de método temporário até iniciar outro, ou que têm relações pouco frequentes.',
        'Não interfere na amamentação, não custa nada, não usa substâncias químicas e está sempre disponível, inclusive como método de reserva. Não há riscos à saúde associados diretamente ao método.',
        'Não perdoa o uso incorreto: a eficácia depende de os dois usarem a retirada em toda relação.',
        'Quem tem alto risco de IST ou HIV deve usar preservativo em toda relação.'
    ]
};

// Métodos que seguem fora do aplicativo.
export const OUT_OF_SCOPE_2 = [
    'Anel vaginal de progesterona para quem amamenta'
];
