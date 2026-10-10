/**
 * Camada de CONTEÚDO da ferramenta de contracepção: textos explicativos
 * em português, separados da tabela de categorias (contraception-data.js)
 * para que a revisão clínica de um texto não mexa nos números.
 *
 * Tudo aqui é condensado das notas de esclarecimento, dos comentários
 * adicionais e da introdução da OMS, MEC 6ª edição (2025).
 */

// Como agir em cada categoria (OMS, tabela 3.2).
export const GUIDANCE = {
    1: 'Pode usar em qualquer circunstância.',
    2: 'Em geral, use o método. Pode exigir acompanhamento cuidadoso.',
    3: 'Uso não costuma ser recomendado, salvo se outros métodos mais adequados não estiverem disponíveis ou aceitáveis. Exige julgamento clínico e acesso a serviço de saúde: pese a gravidade da condição e as alternativas.',
    4: 'O método não deve ser usado.'
};

// Percepção da fertilidade: significado das letras A, C e D.
export const GUIDANCE_ACD = {
    A: 'Aceitar: não há razão médica para negar o método.',
    C: 'Cautela: oferecido na rotina, com preparo extra. Em geral exige aconselhamento especial para o uso correto.',
    D: 'Adiar: espere avaliar ou corrigir a condição e ofereça um método temporário.',
    S: 'Especial: faça em serviço com cirurgião e equipe experientes, equipamento para anestesia geral e suporte clínico. Ofereça método temporário se houver encaminhamento ou atraso.'
};

// Por que a condição importa: um texto curto por pergunta.
export const WHY = {
    age: 'Menores de 18 anos: o injetável trimestral é categoria 2 pela preocupação com a densidade mineral óssea e com a recuperação até o pico de massa óssea. Os DIUs são categoria 2 até os 20 anos: o risco de gravidez, infecção e perfuração é baixo em qualquer idade, mas usuárias jovens de DIU de cobre podem ter mais expulsão. A partir dos 40 anos, o risco cardiovascular aumenta com a idade e pode aumentar com os combinados; sem outras condições adversas, eles podem ser usados até a menopausa.',
    parity: 'Nos DIUs, os riscos de gravidez, infecção, perfuração e expulsão são baixos em todas as usuárias, e a diferença por paridade pode não ser clinicamente relevante. Os dados não sugerem atraso no retorno da fertilidade em nulíparas.',
    pregnancy: 'Nenhum método é indicado na gravidez. O DIU traz risco de infecção pélvica grave e de aborto séptico (categoria 4). Os hormonais não se aplicam, mas não há dano conhecido à mulher, à gestação ou ao feto se forem usados sem querer.',
    postpartum: 'O risco de TEV é maior na gestação e no pós-parto, principalmente nas 3 primeiras semanas, e volta perto do basal em 42 dias. Os combinados podem somar risco, por isso não se recomendam antes de 6 meses em quem amamenta. Os métodos só de progestagênio não mostraram efeito negativo consistente sobre a amamentação nem sobre o crescimento do bebê, e podem ser usados mesmo antes de 6 semanas (categoria 2).',
    ppiud: 'A inserção logo após a dequitação tem menos expulsão que a inserção tardia, e a inserção durante a cesariana tem menos expulsão que a vaginal. Entre 48 horas e 4 semanas, o DIU é desaconselhado. Em quem amamenta, o DIU-LNG imediato é categoria 2 (um estudo o associou a menor duração da amamentação). Na sepse puerperal, a inserção pode piorar muito o quadro.',
    abortion: 'O DIU pode ser inserido logo após aborto espontâneo ou induzido do 1º trimestre: não há diferença de complicações entre inserção imediata e tardia. A expulsão é mais frequente após aborto do 2º trimestre. Após aborto séptico, o DIU pode piorar muito a infecção.',
    ectopic: 'A gravidez ectópica prévia aumenta o risco de nova ectópica. Usuárias de minipílula têm taxa absoluta maior que as de outros progestagênios, mas ainda menor que sem método; a pílula de desogestrel inibe a ovulação na maioria dos ciclos. Os combinados protegem contra gravidez em geral, inclusive a ectópica.',
    smoking: 'O risco cardiovascular dos combinados aumenta com a idade e com o tabagismo. Métodos só de progestagênio e DIUs não têm restrição por tabagismo.',
    obesity: 'Mulheres obesas que usam COC têm mais TEV que obesas que não usam, embora o risco absoluto seja pequeno. A eficácia dos combinados em geral se mantém. A categoria 2 do injetável trimestral em adolescentes obesas decorre do NET-EN (massa óssea), e não do DMPA.',
    cvRisk: 'Com vários fatores de risco importantes (idade, tabagismo, diabetes, hipertensão, dislipidemia), qualquer um deles já aumenta o risco, e os combinados podem elevá-lo a um nível inaceitável. A OMS não pede soma simples de categorias: dois fatores categoria 2 não resultam, necessariamente, em categoria maior.',
    htn: 'A classificação pressupõe que não haja outros fatores de risco cardiovascular, e uma única medida de PA não basta para chamar a mulher de hipertensa. Com doença vascular, há preocupação com efeitos hipoestrogênicos e queda do HDL, sobretudo com DMPA e NET-EN (o efeito pode persistir após a suspensão); há pouca preocupação com minipílula e implante.',
    htnPreg: 'A história de PA alta na gestação, com PA atual normal e mensurável, só restringe os combinados (categoria 2).',
    vte: 'Mulheres anticoaguladas com histórico de cistos ovarianos hemorrágicos podem se beneficiar do DMPA, e o DIU-LNG pode ajudar no sangramento menstrual intenso nesse grupo.',
    vteFamily: 'Algumas condições que aumentam o risco de TVP/TEP são hereditárias.',
    surgery: 'Os combinados aumentam o risco de TEV. Após cirurgia de grande porte com imobilização prolongada, a OMS os considera categoria 4. Sem imobilização prolongada, categoria 2.',
    thrombogenic: 'O rastreamento de rotina não é apropriado, pela raridade das condições e pelo custo. Entre mulheres com mutações trombogênicas, usuárias de COC tiveram risco de trombose de 2 a 20 vezes maior que não usuárias.',
    ihd: 'Há preocupação com efeitos hipoestrogênicos e menor HDL, principalmente com DMPA e NET-EN; pouca preocupação com minipílula e implante. No DIU-LNG, a preocupação teórica é o efeito do levonorgestrel sobre os lipídios. Não há restrição para o DIU de cobre.',
    stroke: 'Há preocupação com efeitos hipoestrogênicos e menor HDL, principalmente com DMPA e NET-EN; pouca preocupação com minipílula e implante. No DIU-LNG, a preocupação teórica é o efeito do levonorgestrel sobre os lipídios. Não há restrição para o DIU de cobre.',
    dyslipidemia: 'O rastreamento de rotina não é apropriado, pela raridade das condições e pelo custo.',
    valvular: 'Os combinados podem aumentar o risco de trombose arterial, e a valvopatia complicada é a de maior risco. Para inserir DIU na valvopatia complicada, a OMS recomenda profilaxia antibiótica contra endocardite.',
    headache: 'Aura é um sintoma neurológico focal específico (use os critérios da Classificação Internacional das Cefaleias). Há preocupação de que cefaleias intensas aumentem com NET-EN, DMPA e implantes; o efeito do injetável pode persistir após a suspensão.',
    sle: 'A trombocitopenia grave aumenta o risco de sangramento. Os progestagênios podem ajudar na menorragia, mas o DMPA exige cautela ao iniciar, pelo sangramento irregular que pode surgir e porque seu efeito é irreversível por 11 a 13 semanas.',
    bleedingPattern: 'O sangramento irregular é comum em mulheres saudáveis, e os progestagênios costumam provocá-lo. O implante causa irregularidade principalmente nos primeiros 3 a 6 meses, e usuárias de etonogestrel têm mais amenorreia. Em sangramento intenso ou prolongado, aplica-se a categoria da condição de base.',
    unexplainedBleeding: 'Não há condição que piore a curto prazo com os combinados. Os progestagênios podem causar sangramento irregular e mascarar doença de base; o efeito do DMPA e do NET-EN pode persistir após a suspensão. Se houver suspeita de gravidez ou de condição patológica (como malignidade pélvica), avalie e reclassifique depois.',
    dysmenorrhea: 'A dismenorreia pode se intensificar com o DIU de cobre; o DIU-LNG está associado à sua redução.',
    gtd: 'A categoria é a mesma para os dois DIUs e depende da evolução do β-hCG.',
    ectropion: 'O ectrópio não é fator de risco para câncer de colo e não exige restrição aos combinados.',
    cin: 'Há preocupação teórica de que o DIU-LNG acelere a progressão da NIC.',
    cervicalCancer: 'Há preocupação teórica de que os hormonais afetem o prognóstico, mas podem ser usados enquanto a mulher aguarda tratamento (que em geral esteriliza). No DIU, há risco de infecção e sangramento na inserção, e o dispositivo provavelmente será retirado no tratamento; até lá, há risco de gravidez.',
    breast: 'O câncer de mama é um tumor sensível a hormônios, e o prognóstico pode piorar com os métodos hormonais. A preocupação com progressão pode ser menor com DIU-LNG que com COC ou progestagênios em dose maior. O DIU de cobre não tem restrição.',
    endometrialCancer: 'O COC reduz o risco de câncer de endométrio. Enquanto aguarda tratamento, a mulher pode usar hormonais. No DIU, há risco de infecção, perfuração e sangramento na inserção, e o dispositivo provavelmente será retirado no tratamento.',
    ovarianCancer: 'O COC reduz o risco de câncer de ovário. Enquanto aguarda tratamento, a mulher pode usar hormonais. O DIU provavelmente será retirado no tratamento; até lá, há risco de gravidez.',
    fibroids: 'Os hormonais não parecem causar crescimento de mioma. Com distorção da cavidade, o DIU pode ser incompatível com a inserção e o posicionamento corretos. Sem distorção, mulheres com sangramento intenso ou prolongado recebem a categoria dessa condição.',
    anatomy: 'Com distorção da cavidade uterina, o posicionamento correto do DIU pode não ser possível.',
    pid: 'DIUs não protegem contra DIP, HIV nem IST. Em mulheres de baixo risco de IST, a inserção traz pouco risco de DIP. Combinados e progestagênios não protegem contra HIV nem contra IST do trato genital inferior; o COC pode reduzir a DIP em mulheres com IST.',
    sti: 'A inserção do DIU pode aumentar ainda mais o risco de DIP em mulheres de risco aumentado de IST, embora a evidência indique risco baixo. Os algoritmos de risco têm baixo valor preditivo. Muitas mulheres de risco aumentado podem receber DIU; as de chance individual muito alta devem esperar teste e tratamento. Cervicite por clamídia ou gonorreia: evite a inserção até tratar.',
    hiv: 'Alto risco de HIV: sem restrição aos hormonais e aos DIUs (orientação da OMS de 2019). HIV leve (estágio 1 ou 2): DIU categoria 2. HIV grave ou avançado (estágio 3 ou 4): DIU categoria 3 na inserção e 2 na continuação. Os métodos hormonais e os DIUs não protegem contra HIV: recomende preservativo.',
    tb: 'Na tuberculose pélvica, a inserção do DIU pode piorar muito a doença.',
    diabetes: 'Com nefropatia, retinopatia, neuropatia, outra doença vascular ou diabetes há mais de 20 anos, há preocupação com efeitos hipoestrogênicos e menor HDL, sobretudo com DMPA e NET-EN. Alguns progestagênios podem aumentar o risco de trombose vascular, bem menos que os COCs. A categoria 3 ou 4 dos combinados acompanha a gravidade.',
    gallbladder: 'Os combinados podem causar pequeno aumento do risco de doença biliar e piorar a doença existente. O injetável combinado tem efeito mínimo sobre a função hepática e não passa pelo metabolismo hepático de primeira passagem.',
    cholestasis: 'A colestase da gestação pode predizer colestase pelo COC. A colestase prévia por COC prediz risco maior com novo uso.',
    liverTumor: 'O uso de COC em mulheres saudáveis associa-se ao surgimento e ao crescimento de adenoma hepatocelular. Não se sabe se outros hormonais têm o mesmo efeito, e não há evidência de uso em quem já tem adenoma.',
    anemia: 'Os combinados podem reduzir a perda menstrual (anemia ferropriva). Com o DIU de cobre, há preocupação de aumento da perda de sangue em talassemia, doença falciforme e anemia ferropriva. Os progestagênios têm pouco efeito sobre a hemoglobina.',
    art: 'Não há interação conhecida entre TARV e DIU. A faixa 2/3 do DIU acompanha o estágio clínico do HIV. Com efavirenz, combinados, minipílula, NET-EN e implante são categoria 2, e o DMPA, categoria 1. Os demais antirretrovirais não restringem os hormonais.',
    anticonvulsant: 'A interação não é prejudicial à mulher, mas provavelmente reduz a eficácia dos combinados, da minipílula, do NET-EN e do implante. Para uso prolongado, incentive outros métodos. O DMPA é categoria 1 porque sua eficácia não diminui. Se escolher COC, use preparação com pelo menos 30 µg de etinilestradiol. Lamotrigina: o combinado reduz de forma importante seus níveis e pode aumentar crises (não vale se ela já é usada com fármacos que inibem ou induzem muito seu metabolismo).',
    antimicrobial: 'A maioria dos antibióticos de amplo espectro, antifúngicos e antiparasitários não afeta a eficácia dos combinados. Rifampicina e rifabutina provavelmente reduzem a eficácia dos combinados, da minipílula, do NET-EN e do implante; incentive outros métodos em uso prolongado. O DMPA é categoria 1 porque sua eficácia não diminui.'
};

// Recomendações revisadas na 6ª edição (marcadas como novidade na interface).
export const REVISED = {
    postpartum: ['bf_lt6w', 'bf_6w_6m', 'bf_gt6m'],
    ppiud: ['lt48_nbf', 'lt48_bf', '48h_4w', 'gt4w'],
    hiv: ['highrisk'],
    art: ['nrti', 'efv', 'nnrti', 'pi', 'insti', 'prep']
};

// Tabela 1 da OMS: tópicos revisados na 6ª edição.
export const CHANGES_6TH = [
    { title: 'Progestagênios na amamentação', text: 'Com menos de 6 semanas de pós-parto, minipílula, injetáveis (DMPA, NET-EN) e implantes passam a ser categoria 2. De 6 semanas a 6 meses e depois de 6 meses, categoria 1.' },
    { title: 'DIU na amamentação', text: 'Menos de 48 horas: DIU de cobre categoria 1 e DIU-LNG categoria 2. De 48 horas a 4 semanas: categoria 3 para os dois. Com 4 semanas ou mais: categoria 1.' },
    { title: 'Anticoncepção de emergência', text: 'Pílulas de emergência usadas mais de uma vez no mesmo ciclo: categoria 1 para COC, levonorgestrel e ulipristal.' },
    { title: 'Antirretrovirais (TARV)', text: 'ITRN, ITRNN sem efavirenz, inibidores de protease e de integrase não restringem combinados, minipílula, injetáveis e implantes (categoria 1). Efavirenz: categoria 2 (DMPA, categoria 1). Nos DIUs, a categoria acompanha o estágio clínico do HIV.' },
    { title: 'Profilaxia pré-exposição (PrEP)', text: 'Tenofovir/entricitabina, anel de dapivirina e cabotegravir: todos os métodos categoria 1.' },
    { title: 'Doença inflamatória intestinal', text: 'A OMS julgou a evidência insuficiente e não fez recomendação.' }
];

// Condição sem recomendação da OMS: avisa em vez de classificar.
export const NO_RECOMMENDATION = {
    ibd: 'Doença inflamatória intestinal: a OMS julgou a evidência insuficiente e não fez recomendação nesta edição. Avalie caso a caso.'
};

/**
 * Ficha de cada método (tela que abre ao tocar no cartão): o que a OMS
 * descreve sobre o método, pontos de atenção e a seção de origem.
 * "protects: true" só no preservativo; nos demais a ficha avisa que o
 * método não protege contra IST e HIV.
 */
export const METHOD_INFO = {
    coc: {
        subtitle: 'Pílula combinada oral (estrogênio + progestagênio)',
        about: [
            'As recomendações da OMS valem para pílulas de baixa dose (até 35 µg de etinilestradiol) e são as mesmas para todas as formulações, qualquer que seja o progestagênio.',
            'O TEV é raro em mulheres em idade reprodutiva, mas todos os COCs o aumentam em relação a não usar. Levonorgestrel, noretisterona e norgestimato associam-se ao menor risco, com diferenças absolutas muito pequenas. O risco arterial pequeno não parece variar com o tipo de progestagênio.'
        ],
        points: [
            'Com anticonvulsivante indutor ou rifamicina, use preparação com pelo menos 30 µg de etinilestradiol (e prefira outro método em uso prolongado).',
            'Usuárias de pílula costumam ter regime de 21 a 24 dias de hormônio e 4 a 7 dias sem hormônio; esquemas com menos ou nenhum dia sem hormônio também existem.'
        ],
        source: 'OMS, MEC 2025, seção 5.1 (p. 21–46)'
    },
    patch: {
        subtitle: 'Adesivo transdérmico combinado',
        about: [
            'Libera 20 µg de etinilestradiol e 150 µg de norelgestromina por dia. Tem perfil de segurança e farmacocinética comparáveis aos COCs de formulação semelhante, por isso recebeu as mesmas categorias (julgamento preliminar da OMS, a ser reavaliado).',
            'Costuma ser usado por 3 semanas seguidas, com 1 semana sem adesivo.'
        ],
        points: [
            'Desconforto mamário e reação na pele no local do adesivo são transitórios e ocorrem em menos de 25% das usuárias.',
            'Evidência limitada sugere que a eficácia pode ser menor em mulheres com 90 kg ou mais.',
            'Há poucos dados sobre segurança em mulheres com condições médicas específicas e sobre efeitos a longo prazo.'
        ],
        source: 'OMS, MEC 2025, seção 5.1.3 (p. 22–23)'
    },
    cvr: {
        subtitle: 'Anel vaginal combinado',
        about: [
            'Libera 15 µg de etinilestradiol e 120 µg de etonogestrel por dia. Em mulheres saudáveis tem perfil de segurança e efeitos sobre a função ovariana comparáveis aos COCs de formulação semelhante, por isso recebeu as mesmas categorias (julgamento preliminar da OMS, a ser reavaliado).',
            'Costuma ser usado por 3 semanas, com 1 semana sem anel.'
        ],
        points: [
            'Em mulheres obesas (IMC ≥ 30), o ganho de peso não diferiu do observado com COC.',
            'Evidência limitada após aborto médico ou cirúrgico não mostrou eventos adversos graves nem infecção em 3 ciclos, e em mulheres com lesão intraepitelial escamosa de baixo grau o anel não piorou a condição.',
            'Há poucos dados sobre segurança em mulheres com condições médicas específicas e sobre efeitos a longo prazo.'
        ],
        source: 'OMS, MEC 2025, seção 5.1.3 (p. 22–23)'
    },
    cic: {
        subtitle: 'Injetável combinado, a cada 4 semanas',
        about: [
            'Libera estrogênio natural (estradiol) mais um progestagênio e age inibindo a ovulação. As duas formulações consideradas são o Cyclofem (acetato de medroxiprogesterona 25 mg + cipionato de estradiol 5 mg) e o Mesigyna (enantato de noretisterona 50 mg + valerato de estradiol 5 mg).',
            'O estradiol é menos potente, tem efeito mais curto e é metabolizado mais rápido que os estrogênios sintéticos. Em comparação com o COC, o injetável mostrou pouco efeito sobre a pressão, a coagulação, os lipídios e a função hepática, e não passa pelo metabolismo hepático de primeira passagem.'
        ],
        points: [
            'Método relativamente novo, com poucos dados epidemiológicos de efeitos a longo prazo.',
            'Ao contrário da pílula, o efeito hormonal continua por algum tempo depois da última injeção.',
            'As categorias ficam entre as do COC e as da minipílula, e são iguais às do COC nas condições graves (como doença isquêmica). A OMS as considera um julgamento preliminar.'
        ],
        source: 'OMS, MEC 2025, seção 5.1.2 e tabelas de CHC (p. 22–43)'
    },
    pop: {
        subtitle: 'Pílula só de progestagênio',
        about: [
            'Contém apenas progestagênio, sem estrogênio.',
            'O uso de progestagênios costuma provocar sangramento irregular.'
        ],
        points: [
            'Usuárias de minipílula têm taxa absoluta de gravidez ectópica maior que as de outros progestagênios, mas ainda menor que sem método. A pílula de desogestrel (75 µg) inibe a ovulação na maioria dos ciclos, o que sugere risco baixo de ectópica.',
            'Anticonvulsivantes indutores e rifamicinas provavelmente reduzem a eficácia; a OMS recomenda incentivar outros métodos em uso prolongado.',
            'Há pouca preocupação com efeitos hipoestrogênicos e queda de HDL com minipílula e implante, ao contrário do que ocorre com o DMPA e o NET-EN.'
        ],
        source: 'OMS, MEC 2025, seção 5.2 (p. 53–80)'
    },
    dmpa: {
        subtitle: 'Injetável de progestagênio',
        about: [
            'DMPA-IM (150 mg, via intramuscular) e DMPA-SC (104 mg, subcutâneo), ambos a cada 3 meses, e NET-EN (200 mg, intramuscular), a cada 2 meses. Agem inibindo o desenvolvimento folicular e a ovulação, e espessam o muco cervical.',
            'DMPA-SC e DMPA-IM parecem terapeuticamente equivalentes, com perfis de segurança semelhantes em mulheres saudáveis, e receberam as mesmas categorias (julgamento preliminar da OMS).'
        ],
        points: [
            'O efeito do DMPA e do NET-EN pode persistir por algum tempo após a suspensão. Por isso há preocupação com efeitos hipoestrogênicos e menor HDL em doença vascular, AVC, doença isquêmica e diabetes complicado.',
            'Menores de 18 anos e mulheres com mais de 45 anos: categoria 2, pela preocupação com a massa óssea. A relação entre as mudanças da densidade óssea e o risco futuro de fratura é desconhecida.',
            'Na trombocitopenia grave, inicie com cautela: pode haver sangramento irregular e o efeito é irreversível por 11 a 13 semanas.',
            'O DMPA não perde eficácia com anticonvulsivantes indutores nem com rifamicinas (categoria 1); o NET-EN, sim (categoria 2).',
            'Mulheres anticoaguladas com histórico de cistos ovarianos hemorrágicos podem se beneficiar do DMPA.'
        ],
        source: 'OMS, MEC 2025, seção 5.2 (p. 53–80)'
    },
    imp: {
        subtitle: 'Implante subdérmico de progestagênio',
        about: [
            'Método reversível de longa duração: libera o progestagênio em ritmo constante, inibe a ovulação e espessa o muco cervical.',
            'Levonorgestrel: Jadelle (duas hastes de 75 mg, aprovado por 5 anos) e Sino-implant (II) (duas hastes de 75 mg, aprovado por 4 anos). Etonogestrel: Implanon e Nexplanon (haste única de 68 mg, aprovado por 3 anos).',
            'O Sino-implant (II) recebeu as mesmas categorias dos outros implantes de levonorgestrel, pela similaridade de formulação e de liberação diária.'
        ],
        points: [
            'Pode causar padrão de sangramento irregular, sobretudo nos primeiros 3 a 6 meses, que pode persistir mais. Usuárias de etonogestrel têm mais amenorreia que as de levonorgestrel.',
            'No SUS desde 2025 (Portarias SECTICS/MS 47 e 48), para mulheres de 14 a 49 anos, com oferta prioritária na atenção primária. O Ministério da Saúde descreve a inserção e a retirada na aba “Como prescrever”.',
            'Há preocupação de que cefaleias intensas aumentem com implantes.',
            'Indutores enzimáticos e rifamicinas provavelmente reduzem a eficácia: incentive outros métodos em uso prolongado.',
            'Iniciar o implante antes de 6 semanas de pós-parto, em quem amamenta, não mostrou efeito nocivo sobre a amamentação nem sobre o crescimento do bebê.'
        ],
        source: 'OMS, MEC 2025, seção 5.2.3 (p. 53–80)'
    },
    cu: {
        subtitle: 'Dispositivo intrauterino de cobre',
        about: [
            'Método reversível de longa duração, sem hormônio.',
            'As recomendações valem para qualquer momento de inserção; os mesmos critérios se aplicam ao DIU de cobre usado como contracepção de emergência.'
        ],
        points: [
            'A dismenorreia pode se intensificar com o DIU de cobre.',
            'Há preocupação de aumento da perda de sangue em talassemia, doença falciforme e anemia ferropriva.',
            'Entre 48 horas e 4 semanas de pós-parto, a inserção não é recomendada. Logo após a dequitação, a expulsão é menor que na inserção tardia.',
            'Antes de 20 anos e em nulíparas: categoria 2. Os riscos de gravidez, infecção, perfuração e expulsão são baixos em todas as usuárias; usuárias jovens podem ter mais expulsão.',
            'Não protege contra DIP, HIV nem IST. Em mulheres de baixo risco de IST, a inserção traz pouco risco de DIP.'
        ],
        source: 'OMS, MEC 2025, seção 5.4 (p. 85–108)'
    },
    lng: {
        subtitle: 'Dispositivo intrauterino de levonorgestrel (20 µg/24 h)',
        about: [
            'Método reversível de longa duração que libera levonorgestrel no útero. As categorias da OMS se referem ao dispositivo de 20 µg/24 horas.'
        ],
        points: [
            'Está associado à redução da dismenorreia e pode ser útil no sangramento menstrual intenso, inclusive em mulheres anticoaguladas.',
            'Há preocupação teórica com o efeito do levonorgestrel sobre os lipídios na doença isquêmica e no AVC (sem restrição para o DIU de cobre), e de que possa acelerar a progressão da NIC.',
            'Em quem amamenta e recebe o dispositivo logo após a dequitação (menos de 48 horas), um estudo associou a inserção imediata a menor duração da amamentação. Iniciar com 4 semanas ou mais não mostrou efeito nocivo.',
            'Antes de 20 anos e em nulíparas: categoria 2. Entre 48 horas e 4 semanas de pós-parto, a inserção não é recomendada.',
            'Não protege contra DIP, HIV nem IST.'
        ],
        source: 'OMS, MEC 2025, seção 5.4 (p. 85–108)'
    },
    condom: {
        subtitle: 'Preservativo masculino (látex ou poliuretano) e feminino',
        protects: true,
        about: [
            'Quando usados de forma correta e consistente, os preservativos masculino e feminino estão entre os métodos mais eficazes de proteção contra IST, inclusive HIV.',
            'Mulheres para quem a gravidez é um risco inaceitável devem saber que os métodos de barreira têm falha relativamente maior no uso típico.'
        ],
        points: [
            'Alergia a látex: não use o preservativo de látex; a restrição não vale para os de plástico (poliuretano).',
            'Nenhuma outra condição da tabela restringe o preservativo.'
        ],
        source: 'OMS, MEC 2025, seção 5.7 (p. 112–128)'
    },
    diaphragm: {
        subtitle: 'Diafragma (com espermicida), capuz cervical e espermicida',
        about: [
            'Mulheres para quem a gravidez é um risco inaceitável devem saber que os métodos de barreira têm falha relativamente maior no uso típico.',
            'A tabela da OMS imprime diafragma e espermicida em colunas separadas, mas as notas de apoio não deixam claro qual valor é de qual. Por isso este aplicativo mostra a categoria mais restritiva entre as duas.'
        ],
        points: [
            'HIV: a categoria 4 do diafragma em quem tem alto risco de HIV vem do espermicida, não do diafragma. O uso repetido e em dose alta de nonoxinol-9 aumentou as lesões genitais e pode aumentar o risco de contrair HIV. No HIV leve, grave ou em uso de TARV, espermicida e diafragma podem lesar a mucosa do colo e aumentar a eliminação viral.',
            'Síndrome do choque tóxico: já foi relatada com o diafragma, e o uso por quem a teve pode aumentar a recorrência.',
            'Infecção urinária: há risco potencial maior com diafragma e espermicida.',
            'Diafragma e capuz não servem até a involução uterina se completar (6 semanas de pós-parto) nem até 6 semanas após aborto do 2º trimestre.',
            'Capuz cervical: maior falha em quem já teve filhos; não deve ser usado com NIC, câncer de colo em espera de tratamento ou anatomia cervical muito distorcida. O diafragma não serve em certos casos de prolapso.',
            'Obesidade grave pode dificultar a colocação do diafragma e do capuz.'
        ],
        source: 'OMS, MEC 2025, seção 5.7 (p. 112–128)'
    },
    ecp_upa: {
        subtitle: 'Pílula de emergência de ulipristal (30 mg)',
        about: [
            'As pílulas de emergência agem evitando ou atrasando a ovulação. Devem ser tomadas o mais cedo possível, em até 5 dias após a relação desprotegida. Não agem se a mulher já estiver grávida.'
        ],
        points: [
            'Amamentando: evite amamentar por 1 semana, porque o ulipristal passa para o leite. Extraia e descarte o leite nesse período.',
            'Indutores de CYP3A4 (rifampicina, fenitoína, fenobarbital, carbamazepina, efavirenz, oxcarbazepina, primidona, rifabutina, erva-de-São-João) podem reduzir a eficácia. A rifampicina reduziu os níveis de ulipristal em 90% ou mais.',
            'Pode ser menos eficaz com IMC ≥ 30 kg/m², sem preocupação de segurança.',
            'Uso mais de uma vez no mesmo ciclo: sem restrição (categoria 1).',
            'Violência sexual: sem restrição às pílulas.'
        ],
        source: 'OMS, MEC 2025, seção 5.3 (p. 81–84)'
    },
    ecp_lng: {
        subtitle: 'Pílula de emergência de levonorgestrel (1,5 mg ou 0,75 mg)',
        about: [
            'As pílulas de emergência agem evitando ou atrasando a ovulação. Devem ser tomadas o mais cedo possível, em até 5 dias após a relação desprotegida. Não agem se a mulher já estiver grávida.'
        ],
        points: [
            'Indutores de CYP3A4 podem reduzir a eficácia. O efavirenz reduziu os níveis de levonorgestrel em 56% em um estudo pequeno.',
            'Pode ser menos eficaz com IMC ≥ 30 kg/m², sem preocupação de segurança.',
            'Uso mais de uma vez no mesmo ciclo: sem restrição (categoria 1).',
            'História de doença cardiovascular grave, enxaqueca e doença hepática grave: categoria 2, porque o uso é curto e traz menos risco que o uso regular de COC ou minipílula.',
            'Violência sexual: sem restrição às pílulas.'
        ],
        source: 'OMS, MEC 2025, seção 5.3 (p. 81–84)'
    },
    ecp_coc: {
        subtitle: 'Pílula combinada de emergência (método de Yuzpe)',
        about: [
            'As pílulas de emergência agem evitando ou atrasando a ovulação. Devem ser tomadas o mais cedo possível, em até 5 dias após a relação desprotegida. Não agem se a mulher já estiver grávida.'
        ],
        points: [
            'Indutores de CYP3A4 podem reduzir a eficácia.',
            'História de doença cardiovascular grave, enxaqueca e doença hepática grave: categoria 2, porque o uso é curto e traz menos risco que o uso regular de COC.',
            'Uso mais de uma vez no mesmo ciclo: sem restrição (categoria 1).'
        ],
        source: 'OMS, MEC 2025, seção 5.3 (p. 81–84)'
    },
    eiud: {
        subtitle: 'DIU de cobre usado como contracepção de emergência',
        about: [
            'Pode ser inserido em até 5 dias após a relação desprotegida. Quando o momento da ovulação puder ser estimado, pode ser inserido além de 5 dias, desde que no máximo 5 dias após a ovulação.',
            'Valem os critérios de elegibilidade do DIU de cobre em geral.'
        ],
        points: [
            'Gravidez: não usar (risco de infecção pélvica grave e aborto séptico).',
            'Violência sexual: o DIU não protege contra IST, HIV nem DIP. Com alto risco de IST, categoria 3; com baixo risco, categoria 1. Com clamídia ou gonorreia, evite o aumento de risco de DIP; a preocupação é menor com outras IST.'
        ],
        source: 'OMS, MEC 2025, seção 5.5 (p. 109)'
    },
    fab_sym: {
        subtitle: 'Muco cervical (ovulação), Dois Dias e sintotérmico',
        about: [
            'Identificam os dias férteis observando sinais de fertilidade, como as secreções cervicais e a temperatura basal. Podem ser usados com abstinência ou com métodos de barreira nos dias férteis.',
            'Nenhuma condição piora pelo uso desses métodos; por isso a escala de 1 a 4 não se aplica. A OMS indica quando é preciso cautela (aconselhamento especial) ou adiar até corrigir a condição.'
        ],
        points: [
            'Amamentando, com menos de 6 semanas de pós-parto: é improvável haver função ovariana suficiente para sinais detectáveis. Com a menstruação de volta, a mulher pode usar o método quando notar as secreções.',
            'Sem amamentar, o método pode começar a partir de 4 semanas de pós-parto; antes disso, ofereça método adequado ao pós-parto.',
            'Pós-aborto: pode ter função ovariana suficiente; a probabilidade aumenta com o tempo.',
            'Corrimento vaginal e doenças agudas que elevam a temperatura pedem adiar o método de sintomas.'
        ],
        source: 'OMS, MEC 2025, seção 5.8 (p. 129–132)'
    },
    fab_cal: {
        subtitle: 'Calendário (Ritmo) e Dias Fixos',
        about: [
            'Monitoram os dias do ciclo. O método dos Dias Fixos evita relações nos dias 8 a 19 do ciclo. Podem ser usados com abstinência ou com métodos de barreira nos dias férteis.',
            'Nenhuma condição piora pelo uso desses métodos; por isso a escala de 1 a 4 não se aplica. A OMS indica quando é preciso cautela ou adiar.'
        ],
        points: [
            'Pós-parto: só use após pelo menos 3 menstruações pós-parto e ciclos regulares (Dias Fixos: pelo menos 4 menstruações e último ciclo de 26 a 32 dias). Até lá, ofereça método adequado ao pós-parto ou barreira.',
            'Pós-aborto: comece após ao menos uma menstruação pós-aborto (Dias Fixos: se a maioria dos ciclos anteriores era de 26 a 32 dias).',
            'Sangramento vaginal irregular e uso de medicamentos que alteram o ciclo pedem adiar ou ter cautela.'
        ],
        source: 'OMS, MEC 2025, seção 5.8 (p. 129–132)'
    },
    tubal: {
        subtitle: 'Esterilização cirúrgica feminina (laqueadura tubária)',
        about: [
            'Procedimento cirúrgico pensado para ser permanente. Toda mulher deve fazer uma escolha voluntária e informada, com orientação sobre a permanência e sobre os métodos de longa duração muito eficazes, que são alternativa preferível quando os riscos superam os benefícios.',
            'Atenção especial a jovens, nulíparas e mulheres com problemas de saúde mental, inclusive depressão. As leis e normas nacionais precisam ser consideradas.',
            'Os métodos transcervicais de esterilização feminina não são tratados nessas recomendações.'
        ],
        points: [
            'Nenhuma condição restringe de forma absoluta a esterilização, mas algumas pedem precauções: C (cautela), D (adiar) ou S (serviço especializado, com cirurgião e equipe experientes, anestesia geral e suporte clínico).',
            'Deve ser feita por equipe bem treinada, em serviço adequado, com equipamento e protocolos de prevenção de infecção.',
            'Se for preciso encaminhar ou houver atraso, ofereça método temporário.',
            'Pós-parto: pode ser feita com segurança nos primeiros 7 dias; de 7 a menos de 42 dias há mais risco porque o útero não involuiu totalmente. Junto com a cesariana, não há aumento de complicações em paciente estável.'
        ],
        source: 'OMS, MEC 2025, seção 5.11 (p. 136–152 e 155–156)'
    }
};

export const STI_NOTE = 'Este método não protege contra IST, inclusive HIV. Se houver risco, recomende o uso correto e consistente de preservativo.';
