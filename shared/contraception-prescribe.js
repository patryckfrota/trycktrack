/**
 * Camada de CONTEÚDO "como prescrever": apresentações comerciais, modelo de
 * receita, posologia e protocolos, por método. Tudo vem de documentos
 * oficiais, indicados em SOURCES:
 *  - Ministério da Saúde: Protocolos da Atenção Básica, Saúde das Mulheres (2016)
 *    e Nota Técnica 34/2023 (Lei 14.443/2022);
 *  - bulas profissionais do fabricante (Organon, Pfizer);
 *  - bulas aprovadas pela ANVISA, conforme reproduzidas em bula.com.br
 *    (Mesigyna, Ciclo 21, Evra, Postinor Uno, Yasmin, Mirena, Kyleena);
 *  - OMS, SPR 2025, quando a bula é omissa.
 * Os modelos de receita são exemplos de redação: o prescritor ajusta à
 * paciente e confere a bula vigente (ANVISA). Hormonais, DIUs e implante não
 * têm "dose": a seção traz o esquema de uso.
 */

export const SOURCES = {
    ms2016: { label: 'Ministério da Saúde. Protocolos da Atenção Básica: Saúde das Mulheres, 2016', url: 'https://bvsms.saude.gov.br/bvs/publicacoes/protocolos_atencao_basica_saude_mulheres.pdf' },
    nt34: { label: 'Ministério da Saúde. Nota Técnica 34/2023 (Lei 14.443/2022)', url: 'https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/notas-tecnicas/2023/sei_ms-0033574409-nota-tecnica-laqueadura-vasectomia.pdf/@@download/file' },
    implanon: { label: 'Bula profissional Implanon NXT (Organon)', url: 'https://organonpro.com/pt-br/wp-content/uploads/sites/4/2022/07/implanonNTX_bula_profissional.pdf' },
    nuvaring: { label: 'Bula profissional NuvaRing (Organon)', url: 'https://www.organon.com/brazil/wp-content/uploads/sites/33/2023/06/nuvaring_bula_profissional.pdf' },
    cerazette: { label: 'Bula profissional Cerazette (Organon)', url: 'https://www.organon.com/brazil/wp-content/uploads/sites/33/2023/06/cerazette_bula_profissional.pdf' },
    depo: { label: 'Bula profissional Depo-Provera 150 mg (Pfizer)', url: 'https://www.pfizer.com.br/files/Depo_Provera_150mg_Profissional_de_Saude_CDS28_v3.pdf' },
    mesigyna: { label: 'Bula Mesigyna (ANVISA), em bula.com.br', url: 'https://bula.com.br/mesigyna' },
    ciclo21: { label: 'Bula Ciclo 21 (ANVISA), em bula.com.br', url: 'https://bula.com.br/ciclo-21' },
    evra: { label: 'Bula Evra (ANVISA), em bula.com.br', url: 'https://bula.com.br/evra' },
    postinor: { label: 'Bula Postinor Uno (ANVISA), em bula.com.br', url: 'https://bula.com.br/postinor-uno' },
    yasmin: { label: 'Bula Yasmin (ANVISA), em bula.com.br', url: 'https://bula.com.br/yasmin' },
    mirena: { label: 'Bula Mirena (ANVISA), em bula.com.br', url: 'https://bula.com.br/mirena' },
    kyleena: { label: 'Bula Kyleena (ANVISA), em bula.com.br', url: 'https://bula.com.br/kyleena' },
    spr: { label: 'OMS. Selected practice recommendations for contraceptive use, 4ª ed., 2025', url: 'https://www.who.int/publications/i/item/9789240115606' }
};

export const PRESCRIBE_NOTICE = 'Exemplos de redação a partir de protocolos e bulas oficiais. Ajuste à paciente e confira a bula vigente na ANVISA antes de prescrever. Os modelos não substituem o julgamento clínico.';

const MS_AOC_MISSED = [
    { k: 'Esqueceu 1 ou 2 comprimidos (ou atrasou a cartela 1 ou 2 dias)', t: 'Tomar um comprimido de imediato e o seguinte no horário regular. O risco de gravidez é muito baixo (MS 2016).' },
    { k: 'Esqueceu 3 ou mais', t: 'Tomar um comprimido de imediato e usar método de apoio por 7 dias. Se teve relação nos últimos 5 dias, avaliar a anticoncepção de emergência. Se foi na 3ª semana da cartela, iniciar nova cartela após 7 dias (MS 2016).' },
    { k: 'Vômito ou diarreia', t: 'Vomitou nas primeiras 2 horas: tomar outro comprimido assim que possível e continuar. Vômito ou diarreia por mais de 2 dias: seguir a conduta de 3 ou mais esquecidos (MS 2016).' }
];

export const PRESCRIBE = {
    coc: {
        sources: ['ms2016', 'ciclo21', 'yasmin'],
        products: [
            { brand: 'Ciclo 21', substance: 'levonorgestrel 0,15 mg + etinilestradiol 0,03 mg', form: 'Comprimido; cartelas com 21 comprimidos', lab: 'União Química', sus: true },
            { brand: 'Yasmin 21 e Yasmin 21+7', substance: 'drospirenona 3 mg + etinilestradiol 0,03 mg', form: 'Comprimido revestido; 21 ativos, ou 21 ativos + 7 inativos (28)', lab: 'Bayer', sus: false }
        ],
        rx: [
            { title: 'Modelo com Ciclo 21 (21 comprimidos)', lines: ['USO ORAL', '1) Ciclo 21 (levonorgestrel 0,15 mg + etinilestradiol 0,03 mg) ........ ___ cartelas de 21 comprimidos', 'Tomar 1 comprimido por dia, sempre no mesmo horário, na ordem da cartela, por 21 dias seguidos.', 'Fazer pausa de 7 dias e iniciar a nova cartela no 8º dia, mesmo que ainda esteja menstruada.'] },
            { title: 'Modelo com Yasmin 21+7 (28 comprimidos)', lines: ['USO ORAL', '1) Yasmin 21+7 (drospirenona 3 mg + etinilestradiol 0,03 mg) ........ ___ cartelas de 28 comprimidos', 'Tomar 1 comprimido por dia, aproximadamente à mesma hora, na ordem indicada pelas setas, sem pausa entre as cartelas.', 'Iniciar a nova cartela depois do último comprimido branco (inativo).'] }
        ],
        dosing: [
            { k: 'Dose e via', t: 'Um comprimido por dia, por via oral, sempre no mesmo horário. Nos monofásicos de 21 comprimidos, a pausa entre as cartelas é de 7 dias.' },
            { k: 'Quando começar', t: 'MS 2016: preferencialmente entre o 1º e o 5º dia do ciclo; pode ser iniciado a qualquer momento se houver certeza razoável de que não está grávida, com método de apoio por 7 dias. Bula do Ciclo 21: no 1º dia da menstruação; se começar entre o 2º e o 7º dia, usar preservativo nos primeiros 7 dias.' },
            { k: 'Troca de outro método', t: 'Ciclo 21 (bula): começar no dia seguinte ao último comprimido ativo da cartela anterior. Se vinha de injetável, MS 2016: começar na data da próxima injeção. Se vinha de método não hormonal, a qualquer momento do mês; se usava DIU, iniciar logo após a retirada, com método de apoio por 7 dias.' },
            ...MS_AOC_MISSED,
            { k: 'Antes de uma cirurgia', t: 'Bula do Ciclo 21: parar a pílula 4 semanas antes e 2 semanas depois de cirurgias com risco de trombose.' },
            { k: 'Exames para iniciar', t: 'O MS 2016 não exige colpocitologia, exame das mamas nem exame pélvico para iniciar. Aferir a pressão arterial é desejável (OMS). Mulheres vivendo com HIV, com aids ou em uso de antirretrovirais podem usar a pílula combinada com segurança, com incentivo a usar também preservativo.' },
            { k: 'O que orientar', t: 'A eficácia depende da usuária. Não protege contra IST. Tomar no mesmo horário e iniciar a nova cartela no dia certo. Efeitos comuns: alteração da menstruação, náusea, mudança de peso, humor, acne e cefaleia. Enxaqueca nova, com ou sem aura, pede suspender o método (MS 2016).' },
            { k: 'Fornecimento', t: 'O MS 2016 orienta fornecer a pílula em qualquer momento, para início posterior. A OMS admite entregar até 1 ano de comprimidos.' }
        ]
    },
    patch: {
        sources: ['evra', 'spr'],
        products: [
            { brand: 'Evra', substance: 'norelgestromina 6 mg + etinilestradiol 0,6 mg por adesivo (libera em média 203 mcg e 33,9 mcg em 24 h)', form: 'Adesivo transdérmico; caixa com 3 adesivos (1 ciclo)', lab: 'Gedeon Richter do Brasil (conforme a bula consultada)', sus: false }
        ],
        rx: [
            { title: 'Modelo com Evra', lines: ['USO TÓPICO (TRANSDÉRMICO)', '1) Evra (norelgestromina 6 mg + etinilestradiol 0,6 mg) ........ ___ caixas com 3 adesivos', 'Aplicar 1 adesivo por semana, por 3 semanas seguidas (dias 1, 8 e 15), sempre no mesmo dia da semana.', 'Na 4ª semana, não usar adesivo. Iniciar novo ciclo no dia seguinte ao dia 28, mesmo sem menstruação.'] }
        ],
        dosing: [
            { k: 'Esquema', t: 'Um adesivo por semana, por 3 semanas (21 dias), com a 4ª semana sem adesivo, quando ocorre a menstruação. O novo ciclo começa no dia seguinte ao dia 28, não importando quando a menstruação comece ou termine. Nunca ficar mais de 7 dias seguidos sem adesivo.' },
            { k: 'Onde aplicar', t: 'Pele íntegra, limpa, seca e sem pelos, em nádegas, abdome, face externa superior do braço ou parte superior das costas, onde não haja fricção de roupa justa. Nunca nas mamas nem em pele avermelhada, irritada ou com cortes. Alternar o local a cada adesivo, sem cremes, loções ou pós na área. Pressionar com a palma por cerca de 10 segundos.' },
            { k: 'Quando começar', t: 'Primeira vez: esperar a próxima menstruação e aplicar o primeiro adesivo nas primeiras 24 horas dela (dia 1). Vindo de pílula combinada: no 1º dia do sangramento de privação; se não houver sangramento em 5 dias após o último comprimido ativo, excluir gravidez antes. Pós-parto sem amamentar: não antes de 4 semanas.' },
            { k: 'Troca de adesivo atrasada ou descolado', t: 'Solto por menos de 1 dia: reaplicar ou aplicar um novo, sem método adicional. Solto por mais de 1 dia ou sem certeza: iniciar um novo ciclo de 4 semanas com adesivo novo (novo dia 1 e novo dia de troca) e usar método adicional na 1ª semana (bula). A OMS dá as condutas por tempo de atraso (48 horas) na aba “Como usar”.' },
            { k: 'Atenção', t: 'Em mulheres com mais de 90 kg o adesivo pode ser menos eficaz. Vômito e diarreia não alteram a absorção. Não protege contra IST. Descartar o adesivo usado dobrado ao meio, sem jogar no vaso sanitário.' }
        ]
    },
    cvr: {
        sources: ['nuvaring'],
        products: [
            { brand: 'NuvaRing', substance: 'etonogestrel 11,7 mg + etinilestradiol 2,7 mg por anel (libera 0,120 mg + 0,015 mg por dia)', form: 'Anel vaginal; 1 anel e 1 aplicador opcional', lab: 'Organon', sus: false }
        ],
        rx: [
            { title: 'Modelo com NuvaRing', lines: ['USO VAGINAL', '1) NuvaRing (etonogestrel 11,7 mg + etinilestradiol 2,7 mg) ........ ___ anéis vaginais', 'Inserir 1 anel na vagina e mantê-lo por 3 semanas seguidas.', 'Remover no mesmo dia da semana em que foi inserido, fazer 1 semana sem anel e inserir um novo anel.'] }
        ],
        dosing: [
            { k: 'Esquema', t: 'O anel fica na vagina continuamente por 3 semanas. É removido no mesmo dia da semana e na mesma hora aproximada em que foi inserido. Após 1 semana sem anel, insere-se um novo. O sangramento de privação costuma começar 2 a 3 dias após a retirada e pode não ter terminado quando o novo anel for colocado.' },
            { k: 'Como inserir', t: 'A própria mulher insere: escolher posição confortável, comprimir o anel e empurrá-lo até sentir conforto (a posição exata não é crítica). Pode usar o aplicador opcional. Para retirar, enganchar o dedo indicador sob o anel ou segurá-lo entre indicador e médio. Descartar no lixo comum, nunca no vaso sanitário. Orientar a conferir a presença do anel, por exemplo antes e depois das relações.' },
            { k: 'Quando começar', t: 'Sem hormonal no ciclo anterior: no 1º dia da menstruação; entre o 2º e o 5º dia, usar barreira por 7 dias. Vindo de combinado: no mais tardar no dia seguinte ao intervalo sem hormônio. Vindo de progestagênio isolado: no dia da retirada do implante ou SIU, ou na data da próxima injeção, com barreira por 7 dias. Após aborto do 1º trimestre: imediatamente. Pós-parto: na 4ª semana.' },
            { k: 'Anel fora da vagina', t: 'Menos de 3 horas: reinserir; a eficácia não se reduz. Mais de 3 horas na 1ª ou 2ª semana: reinserir e usar barreira até completar 7 dias contínuos. Mais de 3 horas na 3ª semana: descartar e inserir um novo anel imediatamente, ou esperar o sangramento e inserir um novo em no máximo 7 dias (só se o anel foi usado nos 7 dias anteriores). Tempo desconhecido: considerar gravidez e fazer teste antes do novo anel.' },
            { k: 'Intervalo sem anel prolongado ou uso estendido', t: 'Inserir um novo anel assim que lembrar e usar barreira nos 7 dias seguintes; se houve relação no intervalo, considerar gravidez. Anel usado por até 4 semanas mantém a eficácia; além disso, excluir gravidez antes do novo anel.' },
            { k: 'Atrasar a menstruação', t: 'Inserir o novo anel sem o intervalo de 1 semana; ele pode ser usado por até 3 semanas, com possível sangramento ou gotejamento.' },
            { k: 'Atenção', t: 'O anel pode atrapalhar diafragma, capuz cervical e preservativo feminino, que não devem ser usados como método adicional. Não cortar o anel. Não protege contra IST.' }
        ]
    },
    cic: {
        sources: ['ms2016', 'mesigyna'],
        products: [
            { brand: 'Mesigyna', substance: 'enantato de noretisterona 50 mg + valerato de estradiol 5 mg por mL', form: 'Solução injetável; ampola ou seringa de 1 mL', lab: 'Bayer', sus: true }
        ],
        rx: [
            { title: 'Modelo com Mesigyna', lines: ['USO INTRAMUSCULAR', '1) Mesigyna (enantato de noretisterona 50 mg + valerato de estradiol 5 mg/mL) ........ ___ ampolas de 1 mL', 'Aplicar 1 mL por via intramuscular profunda, de preferência no glúteo (ou no braço), de forma extremamente lenta, a cada 30 dias.', 'Primeira aplicação no 1º dia da menstruação.'] }
        ],
        dosing: [
            { k: 'Dose e via', t: '1 mL (50 mg de enantato de noretisterona + 5 mg de valerato de estradiol), por via intramuscular profunda, de preferência no glúteo, com o braço como alternativa. A injeção deve ser extremamente lenta e feita logo depois do preparo da solução.' },
            { k: 'Intervalo', t: 'Bula: a cada 30 ± 3 dias, isto é, entre 27 e 33 dias após a última. MS 2016: a cada 4 semanas (30 dias); pode ser adiantada ou atrasada em até 7 dias.' },
            { k: 'Quando começar', t: 'Bula: 1ª injeção no 1º dia do ciclo menstrual (1º dia de sangramento), se não houve outro hormonal no mês anterior. Vindo de pílula, anel ou adesivo: de preferência logo após 7 dias de comprimidos ativos, ou no dia da retirada do anel ou adesivo (no máximo na data da próxima aplicação). Vindo de minipílula, implante, injeção ou SIU: em qualquer dia, com barreira por 7 dias.' },
            { k: 'Atraso', t: 'Bula: mais de 33 dias sem aplicar, não há segurança contraceptiva e deve-se usar método adicional. MS 2016: se atrasou mais de 7 dias, aplicar se houver certeza de que não está grávida e usar método de apoio por 7 dias.' },
            { k: 'Atenção', t: 'Só após a menarca; não usar em insuficiência hepática. Se não houver sangramento em 30 dias, excluir gravidez antes da próxima injeção. Não protege contra IST. Efeitos comuns: alteração do sangramento, ganho de peso e sensibilidade nas mamas.' }
        ]
    },
    pop: {
        sources: ['ms2016', 'cerazette'],
        products: [
            { brand: 'Cerazette', substance: 'desogestrel 75 mcg', form: 'Comprimido revestido; cartelas com 28 ou 84', lab: 'Organon', sus: false },
            { brand: 'Noretisterona 0,35 mg (minipílula)', substance: 'noretisterona 0,35 mg', form: 'Comprimido', lab: 'Genérico, ofertado pelo SUS', sus: true }
        ],
        rx: [
            { title: 'Modelo com Cerazette', lines: ['USO ORAL', '1) Cerazette (desogestrel 75 mcg) ........ ___ cartelas de 28 comprimidos', 'Tomar 1 comprimido por dia, sempre no mesmo horário, na ordem das setas, por 28 dias consecutivos.', 'Iniciar a cartela seguinte logo após o término da anterior, sem pausa.'] },
            { title: 'Modelo com noretisterona 0,35 mg (SUS)', lines: ['USO ORAL', '1) Noretisterona 0,35 mg ........ ___ cartelas', 'Tomar 1 comprimido por dia, sempre no mesmo horário, sem intervalo entre as cartelas.'] }
        ],
        dosing: [
            { k: 'Dose e via', t: 'Um comprimido ao dia, por via oral, sem pausa, de preferência no mesmo horário. Para o desogestrel, 28 dias consecutivos por cartela, e a cartela seguinte começa logo depois da anterior.' },
            { k: 'Quando começar', t: 'Cerazette (bula): no 1º dia da menstruação; é permitido entre o 2º e o 5º dia, com barreira nos primeiros 7 dias do 1º ciclo. Vindo de combinado: de preferência no dia seguinte ao último comprimido ativo (ou no dia da retirada do anel ou adesivo), sem método adicional. Vindo de minipílula: em qualquer dia. Vindo de implante ou SIU: no dia da retirada; de injetável: no dia da próxima injeção. Após aborto do 1º trimestre: imediatamente. Pós-parto ou aborto do 2º trimestre: nos dias 21 a 28.' },
            { k: 'Atraso', t: 'Cerazette (bula): a proteção pode ficar reduzida com mais de 36 horas entre dois comprimidos. Menos de 12 horas de atraso: tomar o esquecido assim que lembrar e o próximo no horário. Mais de 12 horas: mesma conduta e método adicional por 7 dias. Para as minipílulas em geral (noretisterona), a OMS considera atraso acima de 3 horas.' },
            { k: 'Vômito e diarreia', t: 'Cerazette (bula): vômito 3 a 4 horas após o comprimido ou distúrbio gastrintestinal grave pode reduzir a absorção; seguir a conduta de comprimidos esquecidos.' },
            { k: 'Amamentação', t: 'MS 2016: com mais de 6 semanas de pós-parto, amamentando ou não, iniciar a minipílula a qualquer momento se houver certeza razoável de que não está grávida, com método de apoio por 7 dias. Com menos de 4 semanas de parto e sem amamentar, pode começar a qualquer momento sem método de apoio, mas é um método pouco eficaz fora da lactação.' },
            { k: 'Atenção', t: 'Não protege contra IST. Efeitos comuns: sangramento irregular, acne, humor alterado, dor nas mamas, náusea e ganho de peso. Enxaqueca nova, com ou sem aura, pede suspender o método (MS 2016).' }
        ]
    },
    dmpa: {
        sources: ['depo', 'ms2016'],
        products: [
            { brand: 'Depo-Provera 150 mg', substance: 'acetato de medroxiprogesterona 150 mg/mL', form: 'Suspensão injetável; frasco-ampola ou seringa preenchida de 1 mL', lab: 'Pfizer', sus: true }
        ],
        rx: [
            { title: 'Modelo com Depo-Provera', lines: ['USO INTRAMUSCULAR', '1) Depo-Provera 150 mg/mL (acetato de medroxiprogesterona) ........ ___ frascos-ampola ou seringas de 1 mL', 'Agitar vigorosamente e aplicar 1 mL (150 mg) por via intramuscular profunda, no glúteo ou no deltoide, a cada 12 a 13 semanas (no máximo a cada 13 semanas, ou 91 dias).', 'Primeira aplicação nos 5 primeiros dias da menstruação.'] }
        ],
        dosing: [
            { k: 'Dose e via', t: '150 mg (1 mL), por injeção intramuscular profunda no glúteo ou no deltoide, a cada 12 a 13 semanas, no máximo a cada 13 semanas (91 dias). A suspensão intramuscular não foi formulada para a via subcutânea. A dose não precisa ser ajustada ao peso. Agitar o frasco ou a seringa com vigor antes do uso e nunca misturar com outro medicamento.' },
            { k: 'Primeira injeção', t: 'Nos 5 primeiros dias após o início de um ciclo menstrual normal; ou nos 5 primeiros dias pós-parto, se não amamenta. Em aleitamento exclusivo, apenas a partir da 6ª semana pós-parto (bula). MS 2016: pode começar a qualquer momento, se houver certeza razoável de que não está grávida, com método de apoio por 7 dias.' },
            { k: 'Injeções seguintes', t: 'Se passaram mais de 13 semanas (91 dias), a bula manda excluir gravidez (teste de sangue) antes de aplicar. MS 2016: pode adiantar ou atrasar em até 2 semanas; com atraso maior que 2 semanas, abstinência ou método de apoio até a injeção, e considerar a anticoncepção de emergência se houve relação desprotegida nos últimos 5 dias.' },
            { k: 'Troca de outro método', t: 'A troca deve garantir a proteção contínua. Vindo de pílula, a 1ª injeção deve ser dada em até 7 dias após o último comprimido (bula).' },
            { k: 'Atenção', t: 'Segurança e eficácia não estabelecidas em menores de 18 anos (bula). Pode reduzir a densidade mineral óssea. Retorno gradual da fertilidade, que pode demorar. Não protege contra IST. Efeitos comuns: alteração do sangramento, amenorreia, alteração de peso, cefaleia e mudança de humor ou da libido.' }
        ]
    },
    imp: {
        sources: ['implanon', 'spr'],
        products: [
            { brand: 'Implanon NXT', substance: 'etonogestrel 68 mg por implante', form: 'Implante subdérmico de haste única, com aplicador pré-carregado descartável', lab: 'Organon', sus: false }
        ],
        rx: [
            { title: 'Modelo com Implanon NXT', lines: ['USO SUBDÉRMICO', '1) Implanon NXT (etonogestrel 68 mg) ........ 1 implante com aplicador', 'Inserir 1 implante, por via subdérmica, na face medial do braço não dominante, por profissional de saúde habilitado, entre o 1º e o 5º dia do ciclo.', 'Permanência máxima de 3 anos; registrar no Cartão da Usuária a data de inserção e a data prevista de retirada.'] }
        ],
        dosing: [
            { k: 'Esquema', t: 'Um implante, inserido por via subdérmica, que pode permanecer por até 3 anos. A usuária pode pedir a retirada a qualquer momento, mas o implante não deve ficar inserido por mais de 3 anos. Após a retirada, inserir outro de imediato mantém a proteção. A bula sugere que o médico considere a substituição antecipada em mulheres com sobrepeso.' },
            { k: 'Antes de inserir', t: 'Descartar gravidez. A inserção e a retirada devem ser feitas apenas por profissional de saúde habilitado e treinado, com técnica asséptica e o aplicador pré-carregado. Quem não tiver certeza das etapas não deve tentar o procedimento.' },
            { k: 'Quando inserir', t: 'Sem hormonal no último mês: entre o dia 1 (início do sangramento) e o dia 5 do ciclo, mesmo com sangramento. Se for em outro momento, barreira por 7 dias e descartar gravidez se houve relação. Vindo de combinado: de preferência no dia seguinte ao último comprimido ativo; no máximo no dia seguinte ao intervalo habitual (anel ou adesivo: no dia da retirada, no máximo na data da próxima colocação). Vindo de injetável: na data da próxima injeção. Vindo de minipílula: em até 24 horas após o último comprimido. Vindo de implante ou SIU: no dia da retirada.' },
            { k: 'Após aborto ou parto', t: 'Aborto do 1º trimestre: até 5 dias. Aborto do 2º trimestre: entre 21 e 28 dias. Parto sem amamentar: entre os dias 21 e 28. Lactantes: após a 4ª semana, com barreira por 7 dias.' },
            { k: 'Técnica de inserção', t: 'Paciente deitada, braço não dominante flexionado e voltado para fora, com a mão sob a cabeça. Local: face medial do braço, sobre o tríceps, cerca de 8 a 10 cm do epicôndilo medial do úmero e 3 a 5 cm abaixo do sulco entre bíceps e tríceps, para evitar vasos e nervos. Marcar o ponto e uma marca-guia a 5 cm em direção ao ombro. Antissepsia e anestesia local (por exemplo, 2 mL de lidocaína a 1% sob a pele ao longo do canal de inserção). Verificar a presença do implante por palpação logo depois, com a paciente.' },
            { k: 'Registro', t: 'A embalagem traz um Cartão da Usuária com o número do lote: registrar a data de inserção, o braço usado e a data prevista de retirada. Há também etiquetas adesivas para o prontuário.' },
            { k: 'Atenção', t: 'Inserção profunda pode dificultar a localização e a retirada e causar dano nervoso ou vascular. Alterações do sangramento são comuns: aconselhar antes de inserir. Não protege contra IST. Disponibilidade no SUS depende da incorporação vigente: confira a Rename e a Remume do seu município.' }
        ]
    },
    cu: {
        sources: ['ms2016', 'spr'],
        products: [
            { brand: 'DIU T de cobre TCu 380A', substance: 'cobre (sem hormônio)', form: 'Dispositivo intrauterino', lab: 'Ofertado pelo SUS (MS 2016)', sus: true }
        ],
        rx: [
            { title: 'Modelo de solicitação', lines: ['USO INTRAUTERINO', '1) DIU de cobre TCu 380A ........ 1 unidade', 'Inserção intrauterina por médico(a) ou enfermeiro(a) treinado(a), após consulta de elegibilidade e exclusão de gravidez.', 'Retorno para revisão 3 a 6 semanas após a inserção, ou depois da primeira menstruação.'] }
        ],
        dosing: [
            { k: 'Quem insere', t: 'MS 2016: a inserção pode ser feita por médico(a) e enfermeiro(a); o enfermeiro, após treinamento e cumprindo a Resolução COFEN 358/2009, pode fazer a consulta clínica, prescrever e inserir o DIU. A inserção pós-parto exige profissional com treinamento específico.' },
            { k: 'Quando inserir', t: 'Com ciclos: a qualquer momento do mês, se houver certeza de que não está grávida; sem método de apoio. Logo após o parto: até 48 horas (profissional treinado); se passaram mais de 48 horas, esperar 4 semanas ou mais. Após 4 semanas do parto: a qualquer momento, com certeza razoável de que não está grávida. Após aborto: imediatamente, se houver certeza razoável de que não está grávida e não houver infecção. Após anticoncepção de emergência: pode inserir imediatamente. Vindo de outro método: a qualquer momento, se usava o método de forma correta ou há certeza razoável de que não está grávida.' },
            { k: 'Exames', t: 'OMS 2025: em mulheres saudáveis são essenciais o exame pélvico/genital e a avaliação do risco de IST. Quando disponíveis, hemoglobina e rastreamento de HIV e outras IST contribuem bastante.' },
            { k: 'Conforto na inserção', t: 'OMS 2025: orientar sobre a possibilidade de dor e oferecer, onde houver recursos, bloqueio paracervical com lidocaína, anestésico tópico e AINE. Não negar o DIU por falta desses recursos. Misoprostol não é recomendado de rotina.' },
            { k: 'O que orientar', t: 'Alta eficácia, proteção de longa duração e retorno rápido da fertilidade ao retirar. Não protege contra IST. Efeitos comuns: alteração da menstruação, cólica, dor no baixo ventre, risco de anemia e, raramente, perfuração uterina. Mulheres com HIV, em TARV e clinicamente bem, podem receber o DIU; reavaliar em caso de dor pélvica ou corrimento.' },
            { k: 'Duração e retorno', t: 'A duração segue a bula do dispositivo adotado pelo serviço. Revisão 3 a 6 semanas após a inserção (ou após a primeira menstruação), e depois conforme a rotina local. Voltar a qualquer momento se houver dor, sangramento intenso, corrimento ou febre.' }
        ]
    },
    lng: {
        sources: ['mirena', 'kyleena', 'spr'],
        products: [
            { brand: 'Mirena', substance: 'levonorgestrel 52 mg (libera inicialmente 20 mcg/24 h)', form: 'Endoceptivo (DIU) com aplicador', lab: 'Bayer', sus: false },
            { brand: 'Kyleena', substance: 'levonorgestrel 19,5 mg', form: 'DIU com aplicador', lab: 'Bayer', sus: false }
        ],
        rx: [
            { title: 'Modelo com Mirena ou Kyleena', lines: ['USO INTRAUTERINO', '1) Mirena (levonorgestrel 52 mg) OU Kyleena (levonorgestrel 19,5 mg) ........ 1 unidade', 'Inserção intrauterina por profissional habilitado, nos 7 primeiros dias da menstruação (ou em qualquer momento do ciclo, se houver certeza de que não está grávida).', 'Revisão 4 a 12 semanas após a inserção e, depois, pelo menos 1 vez ao ano.'] }
        ],
        dosing: [
            { k: 'Quando inserir', t: 'Bula: nos 7 dias seguintes ao início da menstruação, sem método de barreira adicional; ou em qualquer momento do ciclo, se houver certeza de que não está grávida. Depois de 7 dias do início do sangramento, usar barreira ou abstinência por 7 dias. Não é contracepção de emergência. Pode ser inserido logo após aborto do 1º trimestre sem infecção. Pós-parto: não antes de 6 semanas (bula). Pode ser substituído por outro a qualquer momento do ciclo.' },
            { k: 'Quem insere', t: 'Profissional com experiência em inserção de DIU, com especulo, solução asséptica e aplicador; anestesia do colo se apropriado. Dor ou tontura que não passem em meia hora de repouso podem indicar posição inadequada.' },
            { k: 'Duração', t: 'Kyleena: até 5 anos (bula). Mirena: a bula consultada indica 5 anos; a Secretaria Municipal da Saúde de São Paulo informou, em nota técnica de 2025, que a ANVISA atualizou a bula em 2024 para até 8 anos de contracepção em mulheres com útero íntegro, usando o DIU exclusivamente para contracepção (o uso para tratar condições específicas não se enquadra). Confira a bula vigente.' },
            { k: 'Revisão', t: 'Bula: verificar 4 a 12 semanas após a inserção e depois pelo menos uma vez ao ano. OMS 2025: consulta 3 a 6 semanas após a inserção ou após a primeira menstruação.' },
            { k: 'Retirada e troca', t: 'Para quem não quer engravidar, não retirar depois do 7º dia do ciclo sem outro método por pelo menos 7 dias antes. Um novo DIU pode ser inserido logo após a retirada, sem proteção adicional.' },
            { k: 'Atenção', t: 'Kyleena: eficácia e segurança não avaliadas em menores de 18 anos (bula). Amenorreia e sangramento irregular são comuns. Não protege contra IST.' }
        ]
    },
    ecp_lng: {
        sources: ['ms2016', 'postinor', 'spr'],
        products: [
            { brand: 'Postinor Uno', substance: 'levonorgestrel 1,5 mg', form: 'Comprimido; embalagem com 1', lab: 'Gedeon Richter do Brasil', sus: false },
            { brand: 'Levonorgestrel 0,75 mg', substance: 'levonorgestrel 0,75 mg', form: 'Comprimido', lab: 'Ofertado pelo SUS (MS 2016)', sus: true }
        ],
        rx: [
            { title: 'Modelo com Postinor Uno', lines: ['USO ORAL', '1) Postinor Uno (levonorgestrel 1,5 mg) ........ 1 comprimido', 'Tomar 1 comprimido em dose única, o mais rápido possível após a relação desprotegida (de preferência em até 72 horas; limite de 5 dias).'] },
            { title: 'Modelo com levonorgestrel 0,75 mg (SUS)', lines: ['USO ORAL', '1) Levonorgestrel 0,75 mg ........ 2 comprimidos', 'Tomar 2 comprimidos juntos, em dose única (1,5 mg), o mais rápido possível, ou 1 comprimido agora e outro 12 horas depois.'] }
        ],
        dosing: [
            { k: 'Dose', t: 'MS 2016: 1,5 mg de levonorgestrel em dose única, preferencialmente; ou 1 comprimido de 0,75 mg de 12 em 12 horas (total de 2). Bula do Postinor Uno: 1 comprimido de 1,5 mg em dose única, no máximo 1 comprimido ao dia, por via oral.' },
            { k: 'Prazo', t: 'Quanto antes, melhor. Bula: não ultrapassar 72 horas, pois a eficácia cai de forma importante com a demora. MS 2016: iniciar de preferência nas primeiras 72 horas, com limite de 5 dias. OMS 2025: em até 120 horas, com redução da eficácia depois de 72 horas, sobretudo após 96 horas.' },
            { k: 'Vômito', t: 'Bula: se vomitar em até 4 horas, repetir a dose. MS 2016: se vomitar em até 1 hora, repetir após antiemético e alimentação. OMS 2025: se vomitar em até 2 horas, tomar outra dose.' },
            { k: 'Depois da emergência', t: 'Usar preservativo até a próxima menstruação (bula). Menstruação atrasada mais de 7 dias, ou dor no baixo ventre: procurar o médico e excluir gravidez, inclusive ectópica. Reiniciar ou começar o método regular conforme a aba “Como usar”.' },
            { k: 'Atenção', t: 'Não é método de rotina e não interrompe uma gravidez já estabelecida. Não usar se há gravidez confirmada ou suspeita. Não protege contra IST. MS 2016: pode ser usada por via vaginal se a mulher estiver desacordada, como em casos de violência.' }
        ]
    },
    ecp_upa: {
        sources: ['spr'],
        products: [
            { brand: 'Ulipristal 30 mg (por exemplo, ellaOne)', substance: 'acetato de ulipristal 30 mg', form: 'Comprimido', lab: 'Registro e disponibilidade no Brasil não verificados nas fontes consultadas: confira na ANVISA', sus: false }
        ],
        rx: [
            { title: 'Modelo (conforme a OMS)', lines: ['USO ORAL', '1) Ulipristal 30 mg ........ 1 comprimido', 'Tomar 1 comprimido em dose única, o mais cedo possível após a relação desprotegida, em até 120 horas (5 dias).'] }
        ],
        dosing: [
            { k: 'Dose', t: 'OMS 2025: 1 comprimido de 30 mg, em dose única.' },
            { k: 'Prazo', t: 'O mais cedo possível, em até 120 horas. Pode ser mais eficaz que as outras pílulas entre 72 e 120 horas.' },
            { k: 'Vômito', t: 'Vomitou em até 3 horas: tomar outra dose o mais rápido possível.' },
            { k: 'Amamentação', t: 'Evitar amamentar por 1 semana e descartar o leite nesse período.' },
            { k: 'Depois', t: 'Iniciar método hormonal só a partir do 6º dia depois do ulipristal. O DIU de cobre pode ser inserido imediatamente.' }
        ]
    },
    ecp_coc: {
        sources: ['spr'],
        products: [
            { brand: 'Pílula combinada com levonorgestrel e etinilestradiol (método de Yuzpe)', substance: 'levonorgestrel + etinilestradiol', form: 'Comprimidos, conforme a apresentação disponível', lab: 'Ajuste o número de comprimidos à apresentação, conforme o protocolo local', sus: false }
        ],
        rx: [
            { title: 'Esquema da OMS', lines: ['USO ORAL', 'Dose: 100 mcg de etinilestradiol + 0,50 mg de levonorgestrel, repetida 12 horas depois.', 'Tomar a 1ª dose o mais cedo possível, em até 120 horas (5 dias) da relação desprotegida.'] }
        ],
        dosing: [
            { k: 'Esquema', t: 'OMS 2025: 100 mcg de etinilestradiol + 0,50 mg de levonorgestrel, seguidos de uma segunda dose igual 12 horas depois.' },
            { k: 'Preferência', t: 'Levonorgestrel e ulipristal causam menos náusea e vômito e são preferíveis. Antiemético antes da dose pode ser oferecido com a pílula combinada.' },
            { k: 'Vômito', t: 'Vomitou em até 2 horas: tomar outra dose o mais rápido possível, com antiemético antes, se quiser; se continuar, pode usar a via vaginal.' }
        ]
    },
    eiud: {
        sources: ['ms2016', 'spr'],
        products: [
            { brand: 'DIU T de cobre TCu 380A', substance: 'cobre (sem hormônio)', form: 'Dispositivo intrauterino', lab: 'Ofertado pelo SUS (MS 2016)', sus: true }
        ],
        rx: [
            { title: 'Modelo de solicitação', lines: ['USO INTRAUTERINO (EMERGÊNCIA)', '1) DIU de cobre TCu 380A ........ 1 unidade', 'Inserir em até 120 horas (5 dias) da relação desprotegida, por profissional habilitado, após excluir gravidez.'] }
        ],
        dosing: [
            { k: 'Quando', t: 'Em até 120 horas da relação desprotegida. Se a ovulação puder ser estimada, também depois de 5 dias, desde que no máximo 5 dias após a ovulação.' },
            { k: 'Quem pode', t: 'Mulheres elegíveis ao DIU (veja Restrições). MS 2016: o DIU pode ser inserido imediatamente após o uso de anticoncepção hormonal de emergência.' },
            { k: 'Depois', t: 'Não precisa de proteção adicional. Valem a revisão e os cuidados do DIU de cobre.' }
        ]
    },
    condom: {
        sources: ['ms2016', 'spr'],
        products: [
            { brand: 'Preservativo masculino (látex)', substance: 'sem substância ativa', form: 'Dispositivo de barreira', lab: 'Ofertado pelo SUS', sus: true },
            { brand: 'Preservativo feminino', substance: 'sem substância ativa', form: 'Dispositivo de barreira', lab: 'Ofertado pelo SUS', sus: true }
        ],
        rx: [],
        dosing: [
            { k: 'Prescrição', t: 'Não exige receita nem dose. O SUS oferece o preservativo masculino e o feminino (MS 2016).' },
            { k: 'Uso', t: 'Usar de forma correta e consistente em todas as relações: é o único método desta lista que também protege contra IST e HIV. Recomende-o como proteção dupla, junto de outro método.' },
            { k: 'Alergia a látex', t: 'Usar preservativo de poliuretano ou o feminino.' }
        ]
    },
    diaphragm: {
        sources: ['ms2016'],
        products: [
            { brand: 'Diafragma', substance: 'sem substância ativa (usado com espermicida)', form: 'Dispositivo de barreira', lab: 'Ofertado pelo SUS', sus: true }
        ],
        rx: [],
        dosing: [
            { k: 'Prescrição', t: 'O diafragma é ofertado pelo SUS (MS 2016). O protocolo consultado não detalha a técnica de escolha do tamanho e de colocação: siga a rotina do serviço.' },
            { k: 'Atenção', t: 'Não protege contra IST. Use preservativo junto quando houver risco. Veja as restrições na aba correspondente.' }
        ]
    },
    tubal: {
        sources: ['nt34', 'ms2016'],
        products: [
            { brand: 'Laqueadura tubária', substance: 'procedimento cirúrgico', form: 'Obstrução das tubas uterinas, com ou sem ressecção segmentar', lab: 'SUS: códigos 04.09.06.018-6 (laqueadura tubária) e 04.11.01.004-2 (parto cesariano com laqueadura tubária)', sus: true }
        ],
        rx: [],
        dosing: [
            { k: 'Quem pode (Lei 9.263/1996, art. 10, com a Lei 14.443/2022)', t: 'Mulheres e homens com capacidade civil plena e maiores de 21 anos ou, pelo menos, com 2 filhos vivos, respeitado o prazo mínimo de 60 dias entre a manifestação da vontade e o ato cirúrgico. Nesse período a pessoa recebe acesso a serviço de regulação da fecundidade, inclusive aconselhamento por equipe multidisciplinar, para desencorajar a esterilização precoce. Também é permitida em caso de risco à vida ou à saúde da mulher ou do futuro concepto, atestado em relatório escrito e assinado por 2 médicos.' },
            { k: 'O que mudou em 2022', t: 'A idade mínima passou de 25 para 21 anos. Há prazo mínimo de 60 dias. Não é mais necessário o consentimento do cônjuge. Não se exige mais o histórico de cesarianas sucessivas para a laqueadura durante a cesárea.' },
            { k: 'No parto', t: 'A esterilização cirúrgica durante o parto é garantida à solicitante se for observado o prazo mínimo de 60 dias entre a manifestação da vontade e o parto e houver condições médicas adequadas. O parto, vaginal ou cesariano, é momento propício, e também permite inserir DIU sem prolongar a internação.' },
            { k: 'Passo a passo no serviço', t: 'Registrar a manifestação expressa de vontade (modelo no Anexo I da Nota Técnica 34/2023), o que inicia os 60 dias. Acompanhar por equipe multiprofissional, com avaliação de riscos e benefícios de cada método e oferta dos reversíveis de longa duração. Se a decisão se mantiver, registrar o Termo de Consentimento Livre e Esclarecido (TCLE), com uma via para a pessoa e outra no prontuário. O TCLE deve dizer que a esterilização não previne IST e destacar o uso do preservativo.' },
            { k: 'Restrições legais', t: 'Antes dos 18 anos, só com emancipação, mesmo com 2 filhos vivos. Não vale a manifestação de vontade expressa sob álcool, drogas, estados emocionais alterados ou incapacidade mental temporária ou permanente. Em pessoas absolutamente incapazes, só com autorização judicial.' },
            { k: 'Prazo para métodos', t: 'O SUS deve disponibilizar qualquer método ou técnica de contracepção em no máximo 30 dias (art. 9º, § 2º). Lembre que a escolha deve ser compartilhada, nunca imposta.' },
            { k: 'Critérios clínicos', t: 'Veja a aba Restrições (A, C, D e S da OMS) e os cuidados de cada condição.' }
        ]
    }
};

// Lei 14.443/2022 na vasectomia (mesmas regras da laqueadura).
export const VASECTOMY_LAW = [
    { k: 'Quem pode', t: 'Homens com capacidade civil plena e maiores de 21 anos ou, pelo menos, com 2 filhos vivos, com prazo mínimo de 60 dias entre a manifestação da vontade e a cirurgia e aconselhamento por equipe multidisciplinar (Lei 9.263/1996, art. 10, com a Lei 14.443/2022).' },
    { k: 'Consentimento', t: 'Não é mais necessário o consentimento do cônjuge. Registrar a manifestação de vontade e o TCLE (modelos na Nota Técnica 34/2023 do Ministério da Saúde).' },
    { k: 'SUS', t: 'Procedimento 04.09.04.024-0 (vasectomia). Costuma ser feita com anestesia local, em ambulatório, sem internação na maioria dos casos.' }
];
