/**
 * Camada de CONTEÚDO "como usar" dos métodos, a partir de:
 * OMS. Selected practice recommendations for contraceptive use (SPR),
 * 4ª ed. Genebra: OMS; 2025. Complementa a elegibilidade (MEC): o MEC diz
 * se a mulher PODE usar o método; o SPR diz COMO começar e usar.
 *
 * Texto em português condensado do inglês. Cada método tem seções
 * ({ title, items: [{ k, t }] }); "k" é o rótulo em negrito e "t" o texto.
 * A interface mostra as seções na ficha do método, em "Como usar".
 */

export const SPR_SOURCE = {
    title: 'OMS. Selected practice recommendations for contraceptive use, 4ª ed. Genebra: OMS; 2025.',
    short: 'OMS SPR 2025 (4ª edição)'
};

export const EXAM_CLASSES = {
    A: 'Essencial e obrigatório',
    B: 'Contribui bastante (avaliar conforme o serviço)',
    C: 'Não contribui de forma relevante'
};

// Seção 5.1: como ter certeza razoável de que a mulher não está grávida.
export const PREGNANCY_CHECK = {
    title: 'Como ter certeza razoável de que ela não está grávida',
    intro: 'Sem sintomas ou sinais de gravidez, o profissional pode ter certeza razoável se ela cumprir qualquer um destes critérios. O teste de gravidez bioquímico é muito útil quando disponível, e o exame pélvico é confiável com cerca de 8 a 10 semanas da última menstruação.',
    criteria: [
        'Não teve relação desde a última menstruação normal.',
        'Está usando de forma correta e consistente um método contraceptivo confiável.',
        'Está nos primeiros 7 dias do início da menstruação normal.',
        'Está com até 4 semanas de pós-parto (se não amamenta).',
        'Está nos primeiros 7 dias pós-aborto ou pós-perda gestacional.',
        'Amamenta de forma exclusiva ou quase exclusiva, está em amenorreia e tem menos de 6 meses de pós-parto.'
    ],
    note: 'Para a mulher no pós-parto que não amamenta ou em amenorreia fora do pós-parto, esses seis critérios não valem: use outros meios para saber se ela está grávida.'
};

// Seção 1.6: o que informar para o consentimento informado, em todo método.
export const COUNSELLING = {
    title: 'O que informar para o consentimento informado',
    items: [
        'Como usar o método corretamente.',
        'Como o método age e os efeitos colaterais comuns.',
        'Riscos e benefícios para a saúde.',
        'Sinais e sintomas que exigem voltar ao serviço.',
        'Como fica a fertilidade depois de parar.',
        'Proteção contra IST.'
    ],
    note: 'A decisão é da mulher: ela pode consultar o parceiro, mas ninguém decide por ela. Use linguagem que ela entenda e responda todas as perguntas. Quem recomenda proteção dupla (preservativo com outro método, ou só o preservativo) deve fazê-lo a todas as pessoas com risco significativo de IST.'
};

const NO_EXAM = 'Em mulheres saudáveis, nenhum exame ou teste é essencial antes de começar. A medida da pressão arterial é desejável, mas, onde não houver como medi-la, a mulher não deve ser impedida de usar o método.';
const EXAMS_HORMONAL = [
    { k: 'Exame das mamas pelo profissional', t: 'Classe C' },
    { k: 'Exame pélvico/genital', t: 'Classe C' },
    { k: 'Rastreamento de câncer de colo do útero', t: 'Classe C' },
    { k: 'Exames laboratoriais de rotina', t: 'Classe C' },
    { k: 'Hemoglobina', t: 'Classe C' },
    { k: 'Avaliação do risco de IST (história e exame físico)', t: 'Classe C' },
    { k: 'Testes laboratoriais de IST/HIV', t: 'Classe C' },
    { k: 'Medida da pressão arterial', t: 'Desejável, mas não condiciona o uso' }
];
const examsSection = { title: 'Exames antes de começar', intro: NO_EXAM, items: EXAMS_HORMONAL };

const IUD_SWITCH_NOTE = 'Até 5 dias do início da menstruação: pode começar, sem proteção adicional, e retirar o DIU nesse momento. Depois: se houver certeza razoável de que não está grávida. Se teve relação neste ciclo, recomenda-se retirar o DIU na próxima menstruação; se não teve, abstinência ou proteção adicional por 7 dias (se a proteção for o próprio DIU, retire-o na próxima menstruação). Em amenorreia ou sangramento irregular, siga a conduta da amenorreia.';

const CHC_START = { title: 'Quando começar', items: [
                { k: 'Com ciclos menstruais', t: 'Até 5 dias do início da menstruação: pode começar, sem proteção adicional. Depois de 5 dias: se houver certeza razoável de que não está grávida; abstinência ou proteção adicional por 7 dias.' },
                { k: 'Amenorreia (fora do pós-parto)', t: 'A qualquer momento, se houver certeza razoável de que não está grávida; abstinência ou proteção adicional por 7 dias.' },
                { k: 'Pós-parto, amamentando', t: 'Menos de 6 semanas: não usar (categoria 4). De 6 semanas a 6 meses, amamentando principalmente: em geral não recomendado, salvo se não houver método mais adequado (categoria 3). Mais de 6 meses: em geral pode iniciar (categoria 2).' },
                { k: 'Pós-parto, sem amamentar', t: 'Menos de 21 dias: sem outros fatores de risco para TEV, em geral não recomendado (categoria 3); com outros fatores de risco, não usar (categoria 4). De 21 a 42 dias: sem fatores de risco, em geral pode iniciar (categoria 2); com fatores de risco, em geral não recomendado (categoria 3). Mais de 42 dias: categoria 1. Sem menstruação ainda: pode começar se houver certeza razoável de que não está grávida, com proteção adicional por 7 dias. Se a menstruação voltou: como as demais.' },
                { k: 'Pós-aborto', t: 'Pode começar imediatamente, sem proteção adicional.' },
                { k: 'Troca de outro método hormonal', t: 'Imediatamente, se usava o método de forma consistente e correta ou há certeza razoável de que não está grávida, sem esperar a menstruação. Se era injetável: começar na data em que viria a próxima injeção, sem proteção adicional.' },
                { k: 'Troca de método não hormonal (exceto DIU)', t: 'Até 5 dias do início da menstruação: sem proteção adicional. Depois: se houver certeza razoável de que não está grávida, com proteção adicional por 7 dias.' },
                { k: 'Troca de DIU', t: IUD_SWITCH_NOTE }
            ] };
const CHC_FOLLOWUP = { title: 'Acompanhamento', items: [
                { k: 'Acompanhamento', t: 'Consulta anual recomendada, com benefício extra de um contato por volta de 3 meses após o início. Ela deve voltar a qualquer momento para falar de efeitos colaterais, problemas ou mudança de método. Nas visitas: aconselhamento sobre efeitos colaterais, uso correto e consistente e proteção contra IST.' }
            ] };
const CHC_SUPPLY = { title: 'Fornecimento', items: [
    { k: 'Cartelas', t: 'Até 1 ano de comprimidos, conforme a preferência e o uso previsto. Restringir o número de ciclos pode causar abandono e aumentar o risco de gravidez. O reabastecimento deve ser flexível.' }
] };
const CHC_VOMIT = { title: 'Vômito e diarreia', items: [
                { k: 'Vômito até 2 horas depois de um comprimido ativo', t: 'Tomar outro comprimido ativo.' },
                { k: 'Vômito ou diarreia intensos por mais de 24 horas', t: 'Continuar tomando os comprimidos, se conseguir. Se durarem 2 dias ou mais, siga a conduta de comprimidos esquecidos.' }
            ] };

export const METHOD_USE = {
    coc: {
        source: 'OMS, SPR 2025, seção 5.4.1 (p. 45–50)',
        sections: [
            CHC_START,
            examsSection,
            { title: 'Comprimidos esquecidos e atrasos', items: [
                { k: 'Pílula de 30 a 35 µg: 1 ou 2 comprimidos ativos esquecidos (ou cartela começada 1 ou 2 dias atrasada)', t: 'Tomar um comprimido ativo o mais rápido possível e seguir 1 por dia. Se esqueceu 2 em sequência, pode tomar o primeiro esquecido e continuar os demais (1 por dia) ou descartá-los para manter o calendário. Sem proteção adicional.' },
                { k: 'Pílula de 30 a 35 µg: 3 ou mais comprimidos ativos esquecidos (ou cartela começada 3 ou mais dias atrasada)', t: 'Mesma conduta, e ainda usar preservativo ou abster-se até tomar 7 comprimidos ativos seguidos. Se esqueceu na 3ª semana, termine os ativos da cartela e comece outra no dia seguinte, sem tomar os 7 inativos. Se esqueceu na 1ª semana e teve relação desprotegida, considere a contracepção de emergência.' },
                { k: 'Pílula de até 20 µg', t: 'Com 1 comprimido ativo esquecido (ou cartela 1 dia atrasada), siga a conduta de 1 ou 2 esquecidos. Com 2 ou mais esquecidos (ou cartela 2 ou mais dias atrasada), siga a conduta de 3 ou mais esquecidos da pílula de 30 a 35 µg.' },
                { k: 'Comprimidos inativos esquecidos', t: 'Descarte-os e continue 1 por dia.' },
                { k: 'Se erra com frequência', t: 'Considere um método menos dependente da usuária, como DIU, implante ou injetável.' }
            ] },
            CHC_VOMIT,
            CHC_SUPPLY,
            CHC_FOLLOWUP
        ]
    },
    patch: {
        source: 'OMS, SPR 2025, seção 5.4.1 (p. 45–50)',
        sections: [
            CHC_START,
            examsSection,
            { title: 'Erros de uso do adesivo', items: [
                { k: 'Adesivo: intervalo sem adesivo prolongado', t: 'Até 48 horas além dos 7 dias (total de 7 a 9 dias sem adesivo): aplicar um novo o mais rápido possível, mantendo o mesmo dia de troca, sem proteção adicional. Mais de 48 horas (mais de 9 dias): aplicar um novo e usar preservativo ou abster-se até usar o adesivo por 7 dias seguidos; se houve relação desprotegida nos 5 dias anteriores, considere a emergência.' },
                { k: 'Adesivo: descolou', t: 'Até 48 horas: colocar um novo (se descolou há menos de 24 horas, pode tentar reaplicar o mesmo), mantendo o dia de troca, sem proteção adicional. Mais de 48 horas: novo adesivo e preservativo ou abstinência por 7 dias seguidos. Se foi na 3ª semana, pule a semana sem adesivo e comece um novo logo em seguida.' },
                { k: 'Adesivo: troca atrasada', t: 'Até 48 horas de atraso nas semanas 1 a 3: aplicar um novo, mantendo o dia de troca, sem proteção adicional. Mais de 48 horas nas semanas 2 e 3: remover/trocar o quanto antes e usar preservativo ou abstinência por 7 dias seguidos. Na semana 4 (sem hormônio), apenas remova o adesivo e comece o novo no dia habitual.' },
                { k: 'Se erra com frequência', t: 'Considere um método menos dependente da usuária, como DIU, implante ou injetável.' }
            ] },
            CHC_FOLLOWUP
        ]
    },
    cvr: {
        source: 'OMS, SPR 2025, seção 5.4.1 (p. 45–50)',
        sections: [
            CHC_START,
            examsSection,
            { title: 'Erros de uso do anel', items: [
                { k: 'Anel: intervalo sem anel prolongado', t: 'Até 48 horas além dos 7 dias: inserir um novo o mais rápido possível, mantendo o dia de retirada, sem proteção adicional. Mais de 48 horas: inserir um novo, manter o dia de retirada, e usar preservativo ou abstinência por 7 dias seguidos; se houve relação desprotegida nos 5 dias anteriores, considere a emergência.' },
                { k: 'Anel: saiu antes do tempo', t: 'Fora por até 48 horas: reinserir o quanto antes e manter o dia de retirada, sem proteção adicional. Mais de 48 horas: reinserir, manter o dia de retirada e usar preservativo ou abstinência por 7 dias seguidos. Se foi na 3ª semana, pule o intervalo sem anel e comece um novo logo em seguida.' },
                { k: 'Anel: uso estendido', t: 'O mesmo anel por até 4 semanas (28 dias): sem proteção adicional, e pode fazer um intervalo sem hormônio de até 7 dias. Entre 28 e 35 dias (mais de 4 e até 5 semanas): inserir um novo e pular o intervalo, sem proteção adicional.' },
                { k: 'Se erra com frequência', t: 'Considere um método menos dependente da usuária, como DIU, implante ou injetável.' }
            ] },
            CHC_FOLLOWUP
        ]
    },
    cic: {
        source: 'OMS, SPR 2025, seção 5.4.2 (p. 51–53)',
        sections: [
            { title: 'Quando começar', items: [
                { k: 'Com ciclos menstruais', t: 'Até 7 dias do início da menstruação: primeira injeção, sem proteção adicional. Depois de 7 dias: se houver certeza razoável de que não está grávida; abstinência ou proteção adicional por 7 dias.' },
                { k: 'Amenorreia', t: 'A qualquer momento, se houver certeza razoável de que não está grávida; proteção adicional por 7 dias.' },
                { k: 'Pós-parto, amamentando', t: 'Menos de 6 semanas, amamentando principalmente: não usar (categoria 4). De 6 semanas a 6 meses: em geral não recomendado (categoria 3), salvo sem alternativa. Mais de 6 meses: como as demais.' },
                { k: 'Pós-parto, sem amamentar', t: 'Menos de 21 dias: em geral não recomendado, salvo sem alternativa. Com 21 dias ou mais e sem menstruação: se houver certeza razoável de que não está grávida, com proteção adicional por 7 dias. Se a menstruação voltou: como as demais.' },
                { k: 'Pós-aborto', t: 'Imediatamente, sem proteção adicional.' },
                { k: 'Troca de outro hormonal', t: 'Imediatamente, se usava o método de forma consistente e correta ou há certeza razoável de que não está grávida. Se era outro injetável: na data em que viria a próxima injeção, sem proteção adicional.' },
                { k: 'Troca de método não hormonal ou DIU', t: 'Até 7 dias do início da menstruação: sem proteção adicional (o DIU pode ser retirado nesse momento). Depois: se houver certeza razoável de que não está grávida; se teve relação neste ciclo, retirar o DIU na próxima menstruação.' }
            ] },
            { title: 'Exames antes de começar', intro: NO_EXAM, items: EXAMS_HORMONAL },
            { title: 'Atrasos', items: [
                { k: 'Intervalo entre as injeções', t: 'A cada 4 semanas.' },
                { k: 'Antes do tempo', t: 'Pode ser aplicada até 7 dias antes, mas isso pode alterar o padrão de sangramento.' },
                { k: 'Atrasada até 7 dias', t: 'Pode aplicar sem proteção adicional.' },
                { k: 'Atrasada mais de 7 dias', t: 'Pode aplicar se houver certeza razoável de que não está grávida; abstinência ou proteção adicional por 7 dias. Considere a contracepção de emergência.' }
            ] },
            { title: 'Acompanhamento', items: [
                { k: 'Consultas', t: 'Consulta anual recomendada e contato extra por volta de 3 meses após o início. Voltar a qualquer momento para falar de efeitos colaterais ou mudar de método.' }
            ] }
        ]
    },
    pop: {
        source: 'OMS, SPR 2025, seção 5.3.3 (p. 40–43)',
        sections: [
            { title: 'Quando começar', items: [
                { k: 'Antecipação', t: 'A pílula pode ser entregue com antecedência, com instruções de início, se a mulher for elegível.' },
                { k: 'Com ciclos menstruais', t: 'Até 5 dias do início da menstruação: pode começar, sem proteção adicional. Depois de 5 dias: se houver certeza razoável de que não está grávida; abstinência ou proteção adicional por 2 dias.' },
                { k: 'Amenorreia', t: 'A qualquer momento, se houver certeza razoável de que não está grávida; proteção adicional por 2 dias.' },
                { k: 'Pós-parto, amamentando', t: 'Menos de 6 semanas: em geral pode iniciar (categoria 2); se amamenta de forma exclusiva ou quase exclusiva, sem proteção adicional. De 6 semanas a 6 meses em amenorreia: pode iniciar. Com a menstruação de volta: como as demais.' },
                { k: 'Pós-parto, sem amamentar', t: 'Menos de 21 dias: pode iniciar, sem proteção adicional. Com 21 dias ou mais e sem menstruação: se houver certeza razoável de que não está grávida, com proteção adicional por 2 dias.' },
                { k: 'Pós-aborto', t: 'Imediatamente, sem proteção adicional.' },
                { k: 'Troca de outro hormonal', t: 'Imediatamente, se usava o método de forma consistente e correta ou há certeza razoável de que não está grávida. Se era injetável: na data em que viria a próxima injeção, sem proteção adicional.' },
                { k: 'Troca de método não hormonal ou DIU', t: 'Até 5 dias do início da menstruação: sem proteção adicional (o DIU pode ser retirado nesse momento). Depois: se houver certeza razoável de que não está grávida; se teve relação neste ciclo, retirar o DIU na próxima menstruação; senão, proteção adicional por 2 dias.' }
            ] },
            { title: 'Exames antes de começar', intro: NO_EXAM, items: EXAMS_HORMONAL },
            { title: 'Comprimidos esquecidos', items: [
                { k: 'Atraso de mais de 3 horas (12 horas para a de desogestrel 75 µg)', t: 'Com ciclos menstruais (inclusive amamentando): tomar um comprimido o mais rápido possível e seguir 1 por dia, com abstinência ou proteção adicional por 2 dias; considere a contracepção de emergência.' },
                { k: 'Amamentando, em amenorreia', t: 'Mesma conduta de tomar um comprimido e seguir 1 por dia. Com menos de 6 meses de pós-parto, não precisa de proteção adicional.' },
                { k: 'Vômito até 2 horas depois de um comprimido ativo', t: 'Tomar outro comprimido ativo.' },
                { k: 'Vômito ou diarreia intensos por mais de 24 horas', t: 'Continuar tomando os comprimidos, se conseguir. Se durarem 2 dias ou mais, siga a conduta de comprimidos esquecidos.' },
                { k: 'Horário', t: 'Tomar sempre mais ou menos no mesmo horário: o uso inconsistente ou incorreto é uma das principais causas de gravidez não planejada. Cerca de 48 horas de uso são necessárias para agir sobre o muco cervical.' }
            ] },
            { title: 'Fornecimento e acompanhamento', items: [
                { k: 'Cartelas', t: 'Até 1 ano de comprimidos, conforme a preferência e o uso previsto, com reabastecimento flexível.' },
                { k: 'Sem amamentar', t: 'Consulta anual não é necessária, mas um contato por volta de 3 meses após o início é recomendado.' },
                { k: 'Amamentando', t: 'Nenhuma consulta de rotina. Ela deve voltar quando parar de amamentar ou reduzir muito a frequência, para novo aconselhamento contraceptivo.' },
                { k: 'Em qualquer caso', t: 'Voltar a qualquer momento para falar de efeitos colaterais ou mudar de método.' }
            ] }
        ]
    },
    dmpa: {
        source: 'OMS, SPR 2025, seção 5.3.2 (p. 36–39)',
        sections: [
            { title: 'Quando começar', items: [
                { k: 'Se não puder tomar na consulta', t: 'Combine a aplicação em outra data, em um serviço adequado.' },
                { k: 'Com ciclos menstruais', t: 'Até 7 dias do início da menstruação: primeira injeção, sem proteção adicional. Depois de 7 dias: se houver certeza razoável de que não está grávida; abstinência ou proteção adicional por 7 dias.' },
                { k: 'Amenorreia', t: 'A qualquer momento, se houver certeza razoável de que não está grávida; proteção adicional por 7 dias.' },
                { k: 'Pós-parto, amamentando', t: 'Menos de 6 semanas, amamentando principalmente: em geral pode ser aplicada (categoria 2; nas edições anteriores era 3). De 6 semanas a 6 meses em amenorreia: pode aplicar; se amamenta de forma exclusiva ou quase exclusiva, sem proteção adicional. Com a menstruação de volta: como as demais.' },
                { k: 'Pós-parto, sem amamentar', t: 'Menos de 21 dias: pode aplicar, sem proteção adicional. Com 21 dias ou mais e sem menstruação: se houver certeza razoável de que não está grávida, com proteção adicional por 7 dias.' },
                { k: 'Pós-aborto', t: 'Imediatamente, sem proteção adicional.' },
                { k: 'Troca de outro hormonal', t: 'Imediatamente, se usava o método de forma consistente e correta ou há certeza razoável de que não está grávida. Se era outro injetável: na data em que viria a próxima injeção, sem proteção adicional.' },
                { k: 'Troca de método não hormonal ou DIU', t: 'Até 7 dias do início da menstruação: sem proteção adicional (o DIU pode ser retirado nesse momento). Depois: se houver certeza razoável de que não está grávida; se teve relação neste ciclo, retirar o DIU na próxima menstruação; senão, proteção adicional por 7 dias.' }
            ] },
            { title: 'Exames antes de começar', intro: NO_EXAM, items: EXAMS_HORMONAL },
            { title: 'Intervalo e atrasos', items: [
                { k: 'Intervalo', t: 'DMPA: a cada 3 meses. NET-EN: a cada 2 meses.' },
                { k: 'Antes do tempo', t: 'DMPA e NET-EN podem ser aplicados até 2 semanas antes.' },
                { k: 'Atrasada', t: 'DMPA: até 4 semanas de atraso, sem proteção adicional. NET-EN: até 2 semanas de atraso, sem proteção adicional. Isso não significa que o intervalo regular do DMPA possa ser estendido em 4 semanas.' },
                { k: 'Atraso maior', t: 'Mais de 4 semanas (DMPA) ou mais de 2 semanas (NET-EN): aplicar se houver certeza razoável de que não está grávida; abstinência ou proteção adicional por 7 dias; considere a contracepção de emergência.' },
                { k: 'Trocar entre DMPA e NET-EN', t: 'Usar os dois de forma intercambiável não é recomendado. Se for preciso trocar, faça-o na data em que viria a próxima injeção.' },
                { k: 'Tipo ou data da injeção anterior desconhecidos', t: 'Pode aplicar se houver certeza razoável de que não está grávida; proteção adicional por 7 dias; considere a emergência.' },
                { k: 'DMPA-SC', t: 'A aplicação no braço (parte superior) pode ser aceitável, além do abdome e da coxa, sem perder eficácia.' }
            ] },
            { title: 'Alterações do sangramento', items: [
                { k: 'Amenorreia', t: 'Não precisa de tratamento: o aconselhamento basta. Se ela não aceitar, suspenda e ajude a escolher outro método.' },
                { k: 'Gotejamento ou sangramento leve', t: 'É comum, sobretudo no primeiro ciclo de injeção, e não é prejudicial. Se persistir ou aparecer após amenorreia, exclua problema ginecológico quando indicado. Com IST ou DIP diagnosticada, pode continuar as injeções durante o tratamento e receber orientação sobre preservativo. Sem causa e se for inaceitável, um AINE por curto prazo (5 a 7 dias) pode ajudar.' },
                { k: 'Sangramento intenso ou prolongado (mais de 8 dias ou o dobro do habitual)', t: 'Explique que é comum no primeiro ciclo. Se persistir, exclua problema ginecológico quando indicado. Se ameaçar a saúde ou for inaceitável, suspenda e ajude a escolher outro método; nesse intervalo, etinilestradiol ou AINE por curto prazo pode ajudar. Para prevenir anemia, ferro e/ou alimentos ricos em ferro.' }
            ] },
            { title: 'Retorno da fertilidade', items: [
                { k: 'Depois de parar', t: 'Pode haver atraso de até 1 ano no retorno da ovulação depois de parar o DMPA (intramuscular ou subcutâneo) ou o NET-EN. Informe a mulher disso antes de começar.' }
            ] }
        ]
    },
    imp: {
        source: 'OMS, SPR 2025, seção 5.3.1 (p. 32–35)',
        sections: [
            { title: 'Quando começar', items: [
                { k: 'Com ciclos menstruais', t: 'Até 7 dias do início da menstruação: pode inserir, sem proteção adicional. Depois de 7 dias: se houver certeza razoável de que não está grávida; abstinência ou proteção adicional por 7 dias.' },
                { k: 'Amenorreia', t: 'A qualquer momento, se houver certeza razoável de que não está grávida; proteção adicional por 7 dias.' },
                { k: 'Pós-parto, amamentando', t: 'Menos de 6 semanas: em geral pode inserir (categoria 2). De 6 semanas a 6 meses em amenorreia: pode inserir; se amamenta de forma exclusiva ou quase exclusiva, sem proteção adicional. Com a menstruação de volta: como as demais.' },
                { k: 'Pós-parto, sem amamentar', t: 'Menos de 21 dias: pode inserir (categoria 1), sem proteção adicional. Com 21 dias ou mais e sem menstruação: se houver certeza razoável de que não está grávida, com proteção adicional por 7 dias.' },
                { k: 'Pós-aborto', t: 'Pode inserir imediatamente, sem proteção adicional.' },
                { k: 'Troca de outro hormonal', t: 'Imediatamente, se usava o método de forma consistente e correta ou há certeza razoável de que não está grávida. Se era injetável: inserir na data em que viria a próxima injeção, sem proteção adicional.' },
                { k: 'Troca de método não hormonal (exceto DIU)', t: 'Imediatamente, se houver certeza razoável de que não está grávida. Até 7 dias do início da menstruação: sem proteção adicional. Depois: abstinência ou proteção adicional por 7 dias.' },
                { k: 'Troca de DIU (inclusive DIU-LNG)', t: 'Até 7 dias do início da menstruação: inserir e retirar o DIU nesse momento, sem proteção adicional. Depois: se houver certeza razoável de que não está grávida. Se teve relação neste ciclo, recomenda-se retirar o DIU na próxima menstruação; se não teve, proteção adicional por 7 dias.' }
            ] },
            { title: 'Exames antes de começar', intro: NO_EXAM, items: EXAMS_HORMONAL },
            { title: 'Duração de uso', items: [
                { k: 'Jadelle', t: 'Mulher com menos de 80 kg: pode ficar até 5 anos completos. Com 80 kg ou mais: considere seriamente retirar após 4 anos completos, pela eficácia reduzida.' },
                { k: 'Sino-implant (II)', t: 'Até 4 anos, conforme a bula.' },
                { k: 'Implanon e Nexplanon (etonogestrel)', t: 'Até 3 anos, conforme a bula.' },
                { k: 'Se engravidar com o implante', t: 'É mais provável que a gravidez seja ectópica do que sem método, embora a ectópica seja incomum (1 a 2% de todas as gravidezes).' }
            ] },
            { title: 'Alterações do sangramento', items: [
                { k: 'Aconselhamento prévio', t: 'Alterações do sangramento são comuns; explicar isso antes da inserção ajuda a aliviar preocupações e a manter o método.' },
                { k: 'Amenorreia', t: 'Não precisa de tratamento: o aconselhamento basta. Se ela não aceitar, retire o implante e ajude a escolher outro método.' },
                { k: 'Gotejamento ou sangramento leve', t: 'É comum, sobretudo no primeiro ano, e não é prejudicial. Se persistir ou aparecer após amenorreia, exclua problema ginecológico quando indicado. Com DIP ou IST, ela pode continuar o implante durante o tratamento. Se ela quiser tratar: AINE (ibuprofeno, ácido mefenâmico) ou, se elegível, COC de baixa dose ou etinilestradiol. Se não quiser ou não adiantar e for inaceitável, retire o implante.' },
                { k: 'Sangramento intenso ou prolongado (mais de 8 dias ou o dobro do habitual)', t: 'Exclua problema ginecológico quando indicado. Opções: AINE ou, se elegível, COC ou etinilestradiol. Se ameaçar a saúde ou for inaceitável, retire o implante e ajude a escolher outro método.' }
            ] },
            { title: 'Acompanhamento', items: [
                { k: 'Consultas', t: 'Nenhuma consulta de rotina é necessária. Ela deve voltar a qualquer momento para falar de efeitos colaterais ou mudar de método, e na época de retirar o implante.' }
            ] }
        ]
    },
    cu: {
        source: 'OMS, SPR 2025, seção 5.2 (p. 23–30)',
        sections: [
            { title: 'Quando inserir', items: [
                { k: 'Com ciclos menstruais', t: 'Até 12 dias do início da menstruação: pode inserir quando for conveniente para a mulher (não só durante a menstruação), sem proteção adicional. Depois de 12 dias: se houver certeza razoável de que não está grávida, sem proteção adicional.' },
                { k: 'Amenorreia (fora do pós-parto)', t: 'A qualquer momento, se for possível determinar que não está grávida, sem proteção adicional.' },
                { k: 'Pós-parto (com ou sem amamentação, inclusive pós-cesárea)', t: 'Até 48 horas: pode inserir, inclusive logo após a dequitação (na cesariana, depois da dequitação e antes de fechar o útero). De 48 horas a menos de 4 semanas: não costuma ser recomendado, salvo sem método mais adequado (categoria 3). Com 4 semanas ou mais e em amenorreia: se amamenta, com certeza razoável de que não está grávida; se não amamenta, se for possível determinar que não está grávida. Com a menstruação de volta: como as demais. Sepse puerperal: não inserir (categoria 4).' },
                { k: 'Pós-aborto', t: 'Imediatamente após aborto do 1º trimestre. Em geral, também após o do 2º trimestre. Não inserir após aborto séptico (categoria 4).' },
                { k: 'Troca de outro método', t: 'Pode inserir imediatamente se houver certeza razoável de que não está grávida, sem esperar a próxima menstruação e sem proteção adicional.' },
                { k: 'Como contracepção de emergência', t: 'Até 5 dias da relação desprotegida. Se a ovulação puder ser estimada, também depois de 5 dias, desde que no máximo 5 dias após a ovulação. Só para mulheres elegíveis ao DIU.' }
            ] },
            { title: 'Exames antes de inserir', intro: 'Em mulheres saudáveis, só são essenciais o exame pélvico/genital e a avaliação do risco de IST. Quando disponíveis, hemoglobina e rastreamento de HIV e outras IST contribuem bastante.', items: [
                { k: 'Exame pélvico/genital', t: 'Classe A' },
                { k: 'Avaliação do risco de IST (história e exame físico)', t: 'Classe A' },
                { k: 'Hemoglobina', t: 'Classe B' },
                { k: 'Testes laboratoriais de IST/HIV', t: 'Classe B' },
                { k: 'Exame das mamas pelo profissional', t: 'Classe C' },
                { k: 'Rastreamento de câncer de colo do útero', t: 'Classe C' },
                { k: 'Exames laboratoriais de rotina', t: 'Classe C' },
                { k: 'Medida da pressão arterial', t: 'Classe C' }
            ] },
            { title: 'Na inserção', items: [
                { k: 'Antibiótico profilático', t: 'Em geral não se recomenda. Pode ser considerado onde há alta prevalência de gonococo e clamídia no colo e pouco rastreamento de IST. Mulheres com condições que pedem profilaxia para procedimentos invasivos (como valvopatia) também podem precisar.' },
                { k: 'Dor e conforto (novas recomendações da 4ª edição)', t: 'Antes da inserção, aconselhe sobre a possibilidade de dor, riscos, benefícios, alternativas e opções de controle da dor, e faça um plano centrado na preferência da mulher. Onde houver anestésico e profissional treinado, o bloqueio paracervical (lidocaína) pode ser oferecido de rotina. Anestésicos tópicos (gel, spray ou creme de lidocaína) e AINEs podem ser oferecidos de rotina. O DIU não deve ser negado se esses recursos não estiverem disponíveis.' },
                { k: 'Misoprostol', t: 'Não é recomendado de rotina antes da inserção: não reduz a dor, e pode aumentar a dor e a cólica. Pode ajudar em situações selecionadas, como após inserção que falhou há pouco tempo.' }
            ] },
            { title: 'Alterações do sangramento', items: [
                { k: 'Gotejamento ou sangramento leve', t: 'É comum nos primeiros 3 a 6 meses e não é prejudicial; costuma diminuir. Se ela quiser tratar, um ciclo curto de AINE nos dias de sangramento. Se persistir, exclua problema ginecológico quando indicado. Sem causa e se for inaceitável, retire o DIU e ajude a escolher outro método.' },
                { k: 'Menstruação mais intensa ou longa que o habitual', t: 'É comum nos primeiros 3 a 6 meses e costuma melhorar. Nos dias de sangramento, pode usar AINE ou ácido tranexâmico. Não usar aspirina (pode piorar). Se continuar muito intenso ou prolongado, sobretudo com sinais de anemia, ou se for inaceitável, retire o DIU. Para prevenir anemia, ferro e/ou alimentos ricos em ferro.' }
            ] },
            { title: 'Intercorrências', items: [
                { k: 'DIP em usuária de DIU', t: 'Tratar com antibióticos adequados. Não precisa retirar o DIU se ela quiser continuar. Se não quiser, retire depois de iniciado o antibiótico e considere contracepção de emergência ou outro método. Se a infecção não melhorar, considere retirar o DIU e manter o antibiótico. Ofereça manejo completo de IST, com aconselhamento sobre preservativo.' },
                { k: 'Gravidez com DIU', t: 'Exclua gravidez ectópica. Explique o risco maior de aborto no 1º e no 2º trimestre (inclusive aborto séptico, que pode ser fatal) e de parto prematuro se o DIU ficar, e que retirá-lo reduz esses riscos, embora o procedimento tenha pequeno risco de aborto. Se os fios estiverem visíveis ou o DIU puder ser retirado com segurança, é melhor retirar. Se não, e houver ultrassom, localize o DIU; se não for localizado, pode ter havido expulsão ou perfuração. Em qualquer caso, procure o serviço logo se houver sangramento intenso, cólica, dor, corrimento anormal ou febre.' }
            ] },
            { title: 'Acompanhamento', items: [
                { k: 'Consultas', t: 'Uma consulta após a primeira menstruação ou 3 a 6 semanas depois da inserção. Voltar a qualquer momento para falar de efeitos colaterais ou mudar de método, e na época da retirada. Nas visitas: aconselhamento sobre efeitos colaterais, uso correto e proteção contra IST; exame pélvico para ver deslocamento do DIU, se indicado.' }
            ] }
        ]
    },
    lng: {
        source: 'OMS, SPR 2025, seção 5.2 (p. 23–30)',
        sections: [
            { title: 'Quando inserir', items: [
                { k: 'Com ciclos menstruais', t: 'Até 7 dias do início da menstruação: pode inserir quando for conveniente (não só durante a menstruação), sem proteção adicional. Depois de 7 dias: se houver certeza razoável de que não está grávida; abstinência ou proteção adicional por 7 dias.' },
                { k: 'Amenorreia (fora do pós-parto)', t: 'A qualquer momento, se for possível determinar que não está grávida; proteção adicional por 7 dias.' },
                { k: 'Pós-parto (com ou sem amamentação, inclusive pós-cesárea)', t: 'Até 48 horas: em geral pode inserir, inclusive logo após a dequitação (categoria 2); na cesariana, depois da dequitação e antes de fechar o útero. De 48 horas a 4 semanas: não costuma ser recomendado, salvo sem método mais adequado (categoria 3). Com 4 semanas ou mais e em amenorreia: se amamenta, com certeza razoável de que não está grávida; se não amamenta, se for possível determinar que não está grávida. Com a menstruação de volta: como as demais. Sepse puerperal: não inserir (categoria 4).' },
                { k: 'Pós-aborto', t: 'Imediatamente após aborto do 1º trimestre. Em geral, também após o do 2º trimestre. Não inserir após aborto séptico (categoria 4).' },
                { k: 'Troca de outro método', t: 'Com ciclos, imediatamente se houver certeza razoável de que não está grávida, sem esperar a próxima menstruação (até 7 dias do início da menstruação: sem proteção adicional; depois: proteção por 7 dias). Se estava em amenorreia, imediatamente se for possível determinar que não está grávida. Se era injetável: na data em que viria a próxima injeção ou antes dela, sem proteção adicional.' },
                { k: 'Contracepção de emergência', t: 'O DIU-LNG não é recomendado como contracepção de emergência: não há dados robustos de segurança e eficácia para esse uso.' }
            ] },
            { title: 'Exames antes de inserir', intro: 'Em mulheres saudáveis, só são essenciais o exame pélvico/genital e a avaliação do risco de IST. Quando disponíveis, hemoglobina e rastreamento de HIV e outras IST contribuem bastante.', items: [
                { k: 'Exame pélvico/genital', t: 'Classe A' },
                { k: 'Avaliação do risco de IST (história e exame físico)', t: 'Classe A' },
                { k: 'Hemoglobina', t: 'Classe B' },
                { k: 'Testes laboratoriais de IST/HIV', t: 'Classe B' },
                { k: 'Exame das mamas pelo profissional', t: 'Classe C' },
                { k: 'Rastreamento de câncer de colo do útero', t: 'Classe C' },
                { k: 'Exames laboratoriais de rotina', t: 'Classe C' },
                { k: 'Medida da pressão arterial', t: 'Classe C' }
            ] },
            { title: 'Na inserção', items: [
                { k: 'Antibiótico profilático', t: 'Em geral não se recomenda (a orientação se baseia em evidência do DIU de cobre). Pode ser considerado onde há alta prevalência de gonococo e clamídia e pouco rastreamento de IST.' },
                { k: 'Dor e conforto (novas recomendações da 4ª edição)', t: 'Antes da inserção, aconselhe sobre a possibilidade de dor, riscos, benefícios, alternativas e opções de controle da dor, e faça um plano centrado na preferência da mulher. Bloqueio paracervical (lidocaína), anestésico tópico e AINEs podem ser oferecidos de rotina onde houver recursos. O DIU não deve ser negado se não estiverem disponíveis.' },
                { k: 'Misoprostol', t: 'Não é recomendado de rotina antes da inserção. Pode ajudar em situações selecionadas, como após inserção que falhou há pouco tempo.' }
            ] },
            { title: 'Alterações do sangramento', items: [
                { k: 'Amenorreia', t: 'Não precisa de tratamento: o aconselhamento basta. Se ela não aceitar, retire o DIU e ajude a escolher outro método.' },
                { k: 'Gotejamento ou sangramento leve', t: 'É comum e não é prejudicial; costuma diminuir. Se persistir, exclua problema ginecológico quando indicado. Sem causa e se for inaceitável, retire o DIU e ajude a escolher outro método.' },
                { k: 'Menstruação mais intensa ou longa que o habitual', t: 'Pode ocorrer nos primeiros 3 a 6 meses e costuma melhorar. Exclua problema ginecológico quando indicado. Se continuar muito intenso ou prolongado, sobretudo com sinais de anemia, ou se for inaceitável, retire o DIU. Para prevenir anemia, ferro e/ou alimentos ricos em ferro.' }
            ] },
            { title: 'Intercorrências', items: [
                { k: 'DIP em usuária de DIU', t: 'Tratar com antibióticos adequados. Não precisa retirar o DIU se ela quiser continuar. Se não quiser, retire depois de iniciado o antibiótico e considere contracepção de emergência ou outro método. Se a infecção não melhorar, considere retirar o DIU e manter o antibiótico. Ofereça manejo completo de IST, com aconselhamento sobre preservativo.' },
                { k: 'Gravidez com DIU', t: 'Exclua gravidez ectópica. Explique o risco maior de aborto (inclusive séptico) e de parto prematuro se o DIU ficar, e que retirá-lo reduz esses riscos. Há ainda preocupação teórica com a exposição fetal ao hormônio, cujo efeito sobre malformações é desconhecido. Se os fios estiverem visíveis ou o DIU puder ser retirado com segurança, é melhor retirar. Procure o serviço logo se houver sangramento intenso, cólica, dor, corrimento anormal ou febre.' }
            ] },
            { title: 'Acompanhamento', items: [
                { k: 'Consultas', t: 'Uma consulta após a primeira menstruação ou 3 a 6 semanas depois da inserção. Voltar a qualquer momento para falar de efeitos colaterais ou mudar de método, e na época da retirada.' }
            ] }
        ]
    },
    ecp_upa: {
        source: 'OMS, SPR 2025, seção 5.5 (p. 55–58)',
        sections: [
            { title: 'Como usar', items: [
                { k: 'Dose', t: 'Um comprimido de 30 mg, dose única.' },
                { k: 'Quando tomar', t: 'O mais cedo possível, em até 120 horas (5 dias) da relação desprotegida. Quanto maior o intervalo, menor a eficácia. O ulipristal pode ser mais eficaz que as outras pílulas entre 72 e 120 horas.' },
                { k: 'Quando considerar', t: 'Relação desprotegida, falha do método (esquecimento de pílulas, camisinha rompida) ou violência sexual.' },
                { k: 'Suprimento antecipado', t: 'Pode ser entregue com antecedência (ou receita antecipada, onde não for possível entregar): a mulher que recebe usa mais a pílula quando precisa, sem aumentar o uso nem as relações desprotegidas.' },
                { k: 'Vômito', t: 'Vomitou até 3 horas depois de tomar: tomar outra dose o mais rápido possível.' }
            ] },
            { title: 'Quando usar a emergência em quem já usa outro método', items: [
                { k: 'Injetável trimestral ou de 2 meses', t: 'Mais de 2 semanas de atraso do DMPA/NET-EN: considerar a emergência.' },
                { k: 'Minipílula', t: 'Atraso de mais de 3 horas (12 horas para a de desogestrel) em quem tem ciclos, inclusive amamentando.' },
                { k: 'Pílula combinada (30 a 35 µg)', t: '3 ou mais comprimidos ativos esquecidos na 1ª semana (ou cartela começada 3 ou mais dias atrasada) e relação desprotegida.' },
                { k: 'Injetável mensal', t: 'Mais de 7 dias de atraso.' },
                { k: 'Método dos Dias Fixos', t: 'Relação desprotegida entre os dias 8 e 19 do ciclo.' }
            ] },
            { title: 'Depois do ulipristal: retomar ou começar método regular', items: [
                { k: 'Hormonais (combinados ou só de progestagênio)', t: 'Começar no 6º dia depois de tomar o ulipristal, pois o ulipristal e os progestagênios podem interagir e reduzir a eficácia de um deles. Se ela não voltar nesse dia, pode começar a qualquer momento se houver certeza razoável de que não está grávida.' },
                { k: 'DIU-LNG', t: 'Pode inserir imediatamente se for possível determinar que não está grávida.' },
                { k: 'DIU de cobre', t: 'Pode inserir imediatamente, sem proteção adicional.' },
                { k: 'Proteção adicional', t: 'Abstinência ou barreira desde o ulipristal até estar protegida pelo novo método (se começar no 6º dia, mantenha também o período de proteção do método: 2 dias para minipílula, 7 dias para os demais hormonais). Teste de gravidez no momento adequado, se necessário (por exemplo, sem sangramento de retirada em 3 semanas).' },
                { k: 'Se não quiser esperar 6 dias', t: 'Pode começar qualquer método imediatamente, mas precisará de teste de gravidez precoce no momento adequado.' }
            ] }
        ]
    },
    ecp_lng: {
        source: 'OMS, SPR 2025, seção 5.5 (p. 55–58)',
        sections: [
            { title: 'Como usar', items: [
                { k: 'Dose preferida', t: '1,5 mg em dose única (dois comprimidos de 0,75 mg). Alternativa: 0,75 mg, seguidos de outros 0,75 mg 12 horas depois. A dose única é preferível, pela adesão.' },
                { k: 'Quando tomar', t: 'O mais cedo possível, em até 120 horas (5 dias) da relação desprotegida; o ideal é em até 72 horas. Quanto maior o intervalo, menor a eficácia, sobretudo depois de 96 horas.' },
                { k: 'Náusea e vômito', t: 'Levonorgestrel e ulipristal causam menos náusea e vômito que a pílula combinada. Não se recomenda antiemético de rotina antes de tomar, mas pode ser considerado conforme a disponibilidade e o julgamento clínico.' },
                { k: 'Vômito', t: 'Vomitou até 2 horas depois de tomar: tomar outra dose o mais rápido possível. Se o vômito continuar, uma dose pode ser dada por via vaginal.' },
                { k: 'Suprimento antecipado', t: 'Pode ser entregue com antecedência (ou receita antecipada, onde não for possível entregar): a mulher que recebe usa mais a pílula quando precisa, sem aumentar o uso nem as relações desprotegidas.' },
                { k: 'Situações em que fatores reduzem a eficácia', t: 'Outras relações desprotegidas no mesmo ciclo, indutores de CYP3A4 e IMC alto.' }
            ] },
            { title: 'Quando usar a emergência em quem já usa outro método', items: [
                { k: 'Injetável trimestral ou de 2 meses', t: 'Mais de 2 semanas de atraso do DMPA/NET-EN.' },
                { k: 'Minipílula', t: 'Atraso de mais de 3 horas (12 horas para a de desogestrel) em quem tem ciclos, inclusive amamentando.' },
                { k: 'Pílula combinada (30 a 35 µg)', t: '3 ou mais comprimidos ativos esquecidos na 1ª semana (ou cartela começada 3 ou mais dias atrasada) e relação desprotegida.' },
                { k: 'Injetável mensal', t: 'Mais de 7 dias de atraso.' },
                { k: 'Método dos Dias Fixos', t: 'Relação desprotegida entre os dias 8 e 19 do ciclo.' }
            ] },
            { title: 'Depois do levonorgestrel: retomar ou começar método regular', items: [
                { k: 'Quando', t: 'Pode retomar ou começar qualquer método imediatamente, inclusive o DIU de cobre. O DIU-LNG pode ser inserido a qualquer momento se for possível determinar que não está grávida. Se ela voltar depois, pode começar hormonal a qualquer momento se houver certeza razoável de que não está grávida.' },
                { k: 'Proteção adicional', t: 'Abstinência ou barreira por 2 dias depois de começar a minipílula, ou 7 dias depois de começar combinados, DMPA/NET-EN, implante ou DIU-LNG. Teste de gravidez precoce no momento adequado, se necessário (por exemplo, sem sangramento de retirada em 3 semanas).' }
            ] }
        ]
    },
    ecp_coc: {
        source: 'OMS, SPR 2025, seção 5.5 (p. 55–58)',
        sections: [
            { title: 'Como usar', items: [
                { k: 'Regime', t: 'Em duas doses: 100 µg de etinilestradiol com 0,50 mg de levonorgestrel, seguidas de uma segunda dose igual 12 horas depois.' },
                { k: 'Quando tomar', t: 'O mais cedo possível, em até 120 horas (5 dias) da relação desprotegida.' },
                { k: 'Náusea e vômito', t: 'A pílula combinada causa mais náusea e vômito que o levonorgestrel ou o ulipristal, por isso estes são preferíveis. Antieméticos reduzem a ocorrência com a pílula combinada, e podem ser oferecidos antes da dose.' },
                { k: 'Vômito', t: 'Vomitou até 2 horas depois de tomar: tomar outra dose o mais rápido possível, com antiemético antes, se quiser. Se continuar, a dose pode ser dada por via vaginal.' }
            ] },
            { title: 'Depois da pílula combinada: retomar ou começar método regular', items: [
                { k: 'Quando', t: 'Pode retomar ou começar qualquer método imediatamente, inclusive o DIU de cobre. O DIU-LNG pode ser inserido a qualquer momento se for possível determinar que não está grávida.' },
                { k: 'Proteção adicional', t: 'Abstinência ou barreira por 2 dias depois de começar a minipílula, ou 7 dias depois de começar combinados, DMPA/NET-EN, implante ou DIU-LNG.' }
            ] }
        ]
    },
    eiud: {
        source: 'OMS, SPR 2025, seção 5.5 (p. 55–58) e 5.2.1 (p. 24)',
        sections: [
            { title: 'Como usar', items: [
                { k: 'Quando inserir', t: 'Em até 120 horas (5 dias) da relação desprotegida. Se a ovulação puder ser estimada, também depois de 5 dias, desde que no máximo 5 dias após a ovulação.' },
                { k: 'Quem pode', t: 'Só mulheres elegíveis ao DIU (veja os critérios do DIU de cobre).' },
                { k: 'Depois', t: 'Não precisa de proteção adicional. O DIU-LNG não é recomendado como contracepção de emergência.' },
                { k: 'Dor e conforto', t: 'Valem as mesmas orientações da inserção do DIU de cobre: aconselhamento prévio, bloqueio paracervical, anestésico tópico e AINEs conforme a disponibilidade.' }
            ] }
        ]
    },
    fab_cal: {
        source: 'OMS, SPR 2025, seção 5.6 (p. 61)',
        sections: [
            { title: 'Método dos Dias Fixos (SDM)', items: [
                { k: 'Quem pode usar', t: 'Mulher com ciclos regulares de 26 a 32 dias: deve evitar relação desprotegida nos dias 8 a 19 do ciclo.' },
                { k: 'Início', t: 'Ofereça outro método de contracepção para os dias 8 a 19, se ela quiser, com o suprimento entregue com antecedência.' },
                { k: 'Relação desprotegida entre os dias 8 e 19', t: 'Considere a contracepção de emergência.' },
                { k: 'Dois ou mais ciclos fora de 26 a 32 dias em um ano de uso', t: 'O método pode não servir para ela, pelo maior risco de gravidez: ajude-a a considerar outro método. A probabilidade de gravidez aumenta com ciclos fora dessa faixa, mesmo evitando relações nos dias 8 a 19.' },
                { k: 'Quando evitar', t: 'Mulheres para quem a gravidez é um risco inaceitável devem saber que o método tem falha relativamente alta no uso típico.' },
                { k: 'Outros métodos de percepção da fertilidade', t: 'Para os detalhes de todos eles (ovulação, Dois Dias, sintotérmico), a OMS remete ao Family Planning: A Global Handbook for Providers.' }
            ] }
        ]
    }
};

// SPR 5.7: vasectomia (critérios de saúde do homem estão no MEC, seção 5.11.2).
export const VASECTOMY = {
    title: 'Vasectomia',
    source: 'OMS, SPR 2025, seção 5.7 (p. 63–66); MEC 2025, seção 5.11.2 (p. 153–154)',
    intro: 'Procedimento de baixo risco que oclui o ducto deferente, feito em ambulatório, com ou sem bisturi. É permanente: quem o considera deve ser aconselhado sobre isso, em especial homens jovens, que ainda não foram pais ou com problemas de saúde mental (inclusive depressão), e sobre as alternativas de longa duração para a mulher. Considere as leis e normas nacionais. Não protege contra IST nem HIV.',
    when: [
        { k: 'Quando confiar na vasectomia', t: 'Esperar 3 meses. Nesse período ele pode retomar a vida sexual, mas ele ou a parceira precisam usar proteção adicional.' },
        { k: 'Espermograma', t: 'Quando disponível, confirma a eficácia após os 3 meses. Ter tido 20 ejaculações sem esperar os 3 meses não é um indicador confiável.' },
        { k: 'Exames antes', t: 'Em homens saudáveis, só o exame genital é essencial (classe A). A medida da pressão arterial é desejável quando o procedimento é feito com anestesia local.' }
    ],
    conditions: [
        { cat: 'D', label: 'Adiar', meaning: 'A condição precisa ser avaliada ou tratada antes da cirurgia.', action: 'Adie a vasectomia e ofereça um método temporário, como o preservativo, até resolver.', items: ['Infecção local: infecção da pele do escroto, IST ativa, balanite, epididimite ou orquite', 'Infecção sistêmica ou gastroenterite', 'Filariose (elefantíase)', 'Massa intraescrotal'] },
        { cat: 'S', label: 'Serviço especializado', meaning: 'A vasectomia pode ser feita, mas exige uma estrutura própria.', action: 'Encaminhe para serviço com cirurgião e equipe experientes, anestesia geral disponível e suporte clínico. A equipe decide o procedimento e a anestesia mais adequados. Ofereça um método temporário enquanto aguarda.', items: ['HIV grave ou avançado (estágio 3 ou 4)', 'Distúrbio de coagulação', 'Criptorquidia', 'Hérnia inguinal (a vasectomia pode ser feita junto com o reparo da hérnia)'] },
        { cat: 'C', label: 'Cautela', meaning: 'A vasectomia pode ser feita no serviço de rotina, com preparo e cuidados extras.', action: 'Redobre o aconselhamento e as precauções. Em algumas condições, o encaminhamento a um serviço de maior nível é a melhor opção.', items: ['Idade jovem', 'Transtorno depressivo', 'Diabetes (se a glicemia estiver mal controlada, encaminhe a serviço de maior nível)', 'Trauma escrotal anterior', 'Varicocele grande (o ducto pode ser difícil de localizar; um único procedimento pode reparar a varicocele e fazer a vasectomia)', 'Hidrocele grande (idem)'] },
        { cat: 'A', label: 'Aceitar', meaning: 'Não há razão médica para negar a vasectomia.', action: 'Siga o fluxo normal: critério legal, aconselhamento, prazo de 60 dias e consentimento.', items: ['Alto risco de HIV', 'HIV assintomático ou leve (estágio 1 ou 2)', 'Doença falciforme (há risco maior de complicações pulmonares, cardíacas ou neurológicas e de infecção da ferida)'] }
    ]
};
