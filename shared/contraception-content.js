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
