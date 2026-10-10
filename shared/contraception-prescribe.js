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
    msImplante: { label: 'Ministério da Saúde. Manual para inserção do implante subdérmico liberador de etonogestrel 68 mg (versão preliminar, 2025)', url: null },
    spr: { label: 'OMS. Selected practice recommendations for contraceptive use, 4ª ed., 2025', url: 'https://www.who.int/publications/i/item/9789240115606' }
};

export const PRESCRIBE_NOTICE = 'Exemplos de redação a partir de protocolos e bulas oficiais. Ajuste à paciente e confira a bula vigente na ANVISA antes de prescrever. Os modelos não substituem o julgamento clínico.';

const MS_AOC_MISSED = [
    { k: 'Esqueceu 1 ou 2 comprimidos (ou atrasou a cartela 1 ou 2 dias)', t: 'Tomar um comprimido de imediato e o seguinte no horário regular. O risco de gravidez é muito baixo (MS 2016).' },
    { k: 'Esqueceu 3 ou mais', t: 'Tomar um comprimido de imediato e usar método de apoio por 7 dias. Se teve relação nos últimos 5 dias, avaliar a anticoncepção de emergência. Se foi na 3ª semana da cartela, iniciar nova cartela após 7 dias (MS 2016). A OMS 2025 orienta terminar os comprimidos ativos e começar a cartela seguinte sem pausa (veja Como usar): na dúvida, prefira a conduta da OMS, que evita a semana sem proteção.' },
    { k: 'Vômito ou diarreia', t: 'Vomitou nas primeiras 2 horas: tomar outro comprimido assim que possível e continuar. Vômito ou diarreia por 2 dias ou mais: seguir a conduta de 3 ou mais esquecidos (MS 2016).' }
];

export const PRESCRIBE = {
    coc: {
        sources: ['ms2016', 'ciclo21', 'yasmin'],
        substances: [
            { name: 'Levonorgestrel 0,15 mg + etinilestradiol 0,03 mg', form: 'Comprimido; cartela de 21 comprimidos', sus: true, brands: ['Ciclo 21', 'Microvlar', 'Nordette'] },
            { name: 'Drospirenona 3 mg + etinilestradiol 0,03 mg', form: 'Comprimido revestido; cartela de 21 (Yasmin) ou 21 ativos + 7 inativos (Elani 28)', sus: false, brands: ['Yasmin', 'Elani 28'] },
            { name: 'Drospirenona 3 mg + etinilestradiol 0,02 mg', form: 'Comprimido revestido; 24 ativos + 4 inativos', sus: false, brands: ['Yaz'] },
            { name: 'Gestodeno 0,075 mg + etinilestradiol 0,02 mg', form: 'Comprimido revestido; cartela de 21 ou 24 + 4', sus: false, brands: ['Femiane', 'Tamisa 20'] },
            { name: 'Gestodeno 0,075 mg + etinilestradiol 0,03 mg', form: 'Comprimido revestido; cartela de 21', sus: false, brands: ['Gynera'] },
            { name: 'Gestodeno 0,06 mg + etinilestradiol 0,015 mg', form: 'Comprimido revestido; 24 ativos + 4 inativos', sus: false, brands: ['Minesse', 'Tamisa 15'] },
            { name: 'Levonorgestrel 0,10 mg + etinilestradiol 0,02 mg', form: 'Comprimido; cartela de 21', sus: false, brands: ['Level'] },
            { name: 'Desogestrel 0,15 mg + etinilestradiol 0,02 ou 0,03 mg', form: 'Comprimido; cartela de 21', sus: false, brands: ['Mercilon (0,02 mg)', 'Microdiol (0,03 mg)'] },
            { name: 'Clormadinona 2 mg + etinilestradiol 0,03 mg', form: 'Comprimido revestido; cartela de 21', sus: false, brands: ['Belara'] },
            { name: 'Valerato de estradiol + dienogeste (esquema dinâmico)', form: 'Comprimidos de 4 composições diferentes; cartela de 28', sus: false, brands: ['Qlaira'] },
            { name: 'Ciproterona 2 mg + etinilestradiol 0,035 mg', form: 'Comprimido; cartela de 21', sus: false, brands: ['Diane 35', 'Selene'], note: 'Indicada sobretudo para acne e hirsutismo; a ação contraceptiva é secundária e o risco de tromboembolismo é maior que o das pílulas com levonorgestrel.' }
        ],
        rx: [
            { title: 'Modelo com Ciclo 21 (21 comprimidos)', lines: ['USO ORAL', '1) Ciclo 21 (levonorgestrel 0,15 mg + etinilestradiol 0,03 mg) — ___ cartelas de 21 comprimidos', 'Tomar 1 comprimido por dia, sempre no mesmo horário, na ordem da cartela, por 21 dias seguidos.', 'Fazer pausa de 7 dias e iniciar a nova cartela no 8º dia, mesmo que ainda esteja menstruada.'] },
            { title: 'Modelo com Yasmin (21 comprimidos)', lines: ['USO ORAL', '1) Yasmin (drospirenona 3 mg + etinilestradiol 0,03 mg) — ___ cartelas de 21 comprimidos', 'Tomar 1 comprimido por dia, aproximadamente à mesma hora, na ordem indicada pelas setas, por 21 dias.', 'Fazer pausa de 7 dias e iniciar a nova cartela no 8º dia (com Elani 28, sem pausa: o 22º ao 28º comprimido é inativo).'] }
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
        substances: [
            { name: 'Norelgestromina 6 mg + etinilestradiol 0,6 mg por adesivo', form: 'Adesivo transdérmico; caixa com 3 adesivos (1 ciclo)', sus: false, brands: ['Evra'] }
        ],
        rx: [
            { title: 'Modelo com Evra', lines: ['USO TÓPICO (TRANSDÉRMICO)', '1) Evra (norelgestromina 6 mg + etinilestradiol 0,6 mg) — ___ caixas com 3 adesivos', 'Aplicar 1 adesivo por semana, por 3 semanas seguidas (dias 1, 8 e 15), sempre no mesmo dia da semana.', 'Na 4ª semana, não usar adesivo. Iniciar novo ciclo no dia seguinte ao dia 28, mesmo sem menstruação.'] }
        ],
        dosing: [
            { k: 'Esquema', t: 'Um adesivo por semana, por 3 semanas (21 dias), com a 4ª semana sem adesivo, quando ocorre a menstruação. O novo ciclo começa no dia seguinte ao dia 28, não importando quando a menstruação comece ou termine. Nunca ficar mais de 7 dias seguidos sem adesivo.' },
            { k: 'Onde aplicar', t: 'Pele íntegra, limpa, seca e sem pelos, em nádegas, abdome, face externa superior do braço ou parte superior das costas, onde não haja fricção de roupa justa. Nunca nas mamas nem em pele avermelhada, irritada ou com cortes. Alternar o local a cada adesivo, sem cremes, loções ou pós na área. Pressionar com a palma por cerca de 10 segundos.' },
            { k: 'Quando começar', t: 'Primeira vez: esperar a próxima menstruação e aplicar o primeiro adesivo nas primeiras 24 horas dela (dia 1). Vindo de pílula combinada: no 1º dia do sangramento de privação; se não houver sangramento em 5 dias após o último comprimido ativo, excluir gravidez antes. Pós-parto sem amamentar: não antes de 4 semanas (bula; a OMS 2025 admite o combinado a partir de 21 dias se não houver outros fatores de risco para TEV: veja Restrições).' },
            { k: 'Troca de adesivo atrasada ou descolado', t: 'Solto por menos de 1 dia: reaplicar ou aplicar um novo, sem método adicional. Solto por mais de 1 dia ou sem certeza: iniciar um novo ciclo de 4 semanas com adesivo novo (novo dia 1 e novo dia de troca) e usar método adicional na 1ª semana (bula). A OMS dá as condutas por tempo de atraso (48 horas) na aba “Como usar”.' },
            { k: 'Atenção', t: 'Em mulheres com 90 kg ou mais o adesivo pode ser menos eficaz. Vômito e diarreia não alteram a absorção. Não protege contra IST. Descartar o adesivo usado dobrado ao meio, sem jogar no vaso sanitário.' }
        ]
    },
    cvr: {
        sources: ['nuvaring'],
        substances: [
            { name: 'Etonogestrel 11,7 mg + etinilestradiol 2,7 mg por anel', form: 'Anel vaginal; libera 120 mcg + 15 mcg por dia', sus: false, brands: [], note: 'Apresentação brasileira não localizada nas fontes consultadas: confira a disponibilidade na ANVISA.' }
        ],
        rx: [
            { title: 'Modelo com NuvaRing', lines: ['USO VAGINAL', '1) NuvaRing (etonogestrel 11,7 mg + etinilestradiol 2,7 mg) — ___ anéis vaginais', 'Inserir 1 anel na vagina e mantê-lo por 3 semanas seguidas.', 'Remover no mesmo dia da semana em que foi inserido, fazer 1 semana sem anel e inserir um novo anel.'] }
        ],
        dosing: [
            { k: 'Esquema', t: 'O anel fica na vagina continuamente por 3 semanas. É removido no mesmo dia da semana e na mesma hora aproximada em que foi inserido. Após 1 semana sem anel, insere-se um novo. O sangramento de privação costuma começar 2 a 3 dias após a retirada e pode não ter terminado quando o novo anel for colocado.' },
            { k: 'Como inserir', t: 'A própria mulher insere: escolher posição confortável, comprimir o anel e empurrá-lo até sentir conforto (a posição exata não é crítica). Pode usar o aplicador opcional. Para retirar, enganchar o dedo indicador sob o anel ou segurá-lo entre indicador e médio. Descartar no lixo comum, nunca no vaso sanitário. Orientar a conferir a presença do anel, por exemplo antes e depois das relações.' },
            { k: 'Quando começar', t: 'Sem hormonal no ciclo anterior: no 1º dia da menstruação; entre o 2º e o 5º dia, usar barreira por 7 dias. Vindo de combinado: no mais tardar no dia seguinte ao intervalo sem hormônio. Vindo de progestagênio isolado: no dia da retirada do implante ou SIU, ou na data da próxima injeção, com barreira por 7 dias (bula; a OMS 2025 permite iniciar de imediato se o método anterior era usado de forma consistente e correta: veja Como usar). Após aborto do 1º trimestre: imediatamente. Pós-parto: na 4ª semana (bula; a OMS 2025 admite combinados a partir de 21 dias, sem outros fatores de risco para TEV).' },
            { k: 'Anel fora da vagina', t: 'Menos de 3 horas: reinserir; a eficácia não se reduz. Mais de 3 horas na 1ª ou 2ª semana: reinserir e usar barreira até completar 7 dias contínuos. Mais de 3 horas na 3ª semana: descartar e inserir um novo anel imediatamente, ou esperar o sangramento e inserir um novo em no máximo 7 dias (só se o anel foi usado nos 7 dias anteriores). Tempo desconhecido: considerar gravidez e fazer teste antes do novo anel.' },
            { k: 'Intervalo sem anel prolongado ou uso estendido', t: 'Inserir um novo anel assim que lembrar e usar barreira nos 7 dias seguintes; se houve relação no intervalo, considerar gravidez. Anel usado por até 4 semanas mantém a eficácia; além disso, excluir gravidez antes do novo anel.' },
            { k: 'Atrasar a menstruação', t: 'Inserir o novo anel sem o intervalo de 1 semana; ele pode ser usado por até 3 semanas, com possível sangramento ou gotejamento.' },
            { k: 'Atenção', t: 'O anel pode atrapalhar diafragma, capuz cervical e preservativo feminino, que não devem ser usados como método adicional. Não cortar o anel. Não protege contra IST.' }
        ]
    },
    cic: {
        sources: ['ms2016', 'mesigyna'],
        substances: [
            { name: 'Enantato de noretisterona 50 mg + valerato de estradiol 5 mg/mL', form: 'Solução injetável; ampola de 1 mL', sus: true, brands: ['Mesigyna'] },
            { name: 'Acetato de medroxiprogesterona 25 mg + cipionato de estradiol 5 mg/0,5 mL', form: 'Suspensão injetável; ampola', sus: true, brands: ['Cyclofemina'] },
            { name: 'Algestona acetofenida 150 mg + enantato de estradiol 10 mg/mL', form: 'Solução injetável; ampola de 1 mL', sus: true, brands: ['Perlutan'] }
        ],
        rx: [
            { title: 'Modelo com Mesigyna', lines: ['USO INTRAMUSCULAR', '1) Mesigyna (enantato de noretisterona 50 mg + valerato de estradiol 5 mg/mL) — ___ ampolas de 1 mL', 'Aplicar 1 mL por via intramuscular profunda, de preferência no glúteo (ou no braço), de forma extremamente lenta, a cada 30 dias.', 'Primeira aplicação no 1º dia da menstruação.'] }
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
        substances: [
            { name: 'Noretisterona 0,35 mg', form: 'Comprimido; cartela de 35, sem pausa', sus: true, brands: [] },
            { name: 'Desogestrel 75 mcg', form: 'Comprimido revestido; cartela de 28 ou 84, sem pausa', sus: false, brands: ['Cerazette'] },
            { name: 'Drospirenona 4 mg', form: 'Comprimido; cartela de 24 ativos + 4 inativos', sus: false, brands: ['Slinda'], note: 'Janela de esquecimento de 24 horas.' }
        ],
        rx: [
            { title: 'Modelo com Cerazette', lines: ['USO ORAL', '1) Cerazette (desogestrel 75 mcg) — ___ cartelas de 28 comprimidos', 'Tomar 1 comprimido por dia, sempre no mesmo horário, na ordem das setas, por 28 dias consecutivos.', 'Iniciar a cartela seguinte logo após o término da anterior, sem pausa.'] },
            { title: 'Modelo com noretisterona 0,35 mg (SUS)', lines: ['USO ORAL', '1) Noretisterona 0,35 mg — ___ cartelas', 'Tomar 1 comprimido por dia, sempre no mesmo horário, sem intervalo entre as cartelas.'] }
        ],
        dosing: [
            { k: 'Dose e via', t: 'Um comprimido ao dia, por via oral, sem pausa, de preferência no mesmo horário. Para o desogestrel, 28 dias consecutivos por cartela, e a cartela seguinte começa logo depois da anterior.' },
            { k: 'Quando começar', t: 'Cerazette (bula): no 1º dia da menstruação; é permitido entre o 2º e o 5º dia, com barreira nos primeiros 7 dias do 1º ciclo. Vindo de combinado: de preferência no dia seguinte ao último comprimido ativo (ou no dia da retirada do anel ou adesivo), sem método adicional. Vindo de minipílula: em qualquer dia. Vindo de implante ou SIU: no dia da retirada; de injetável: no dia da próxima injeção. Após aborto do 1º trimestre: imediatamente. Pós-parto ou aborto do 2º trimestre: nos dias 21 a 28.' },
            { k: 'Atraso', t: 'Cerazette (bula): a proteção pode ficar reduzida com mais de 36 horas entre dois comprimidos. Menos de 12 horas de atraso: tomar o esquecido assim que lembrar e o próximo no horário. Mais de 12 horas: mesma conduta e método adicional por 7 dias (bula; a OMS 2025 recomenda 2 dias de proteção adicional, veja Como usar). Para as minipílulas em geral (noretisterona), a OMS considera atraso acima de 3 horas.' },
            { k: 'Vômito e diarreia', t: 'Cerazette (bula): vômito 3 a 4 horas após o comprimido ou distúrbio gastrintestinal grave pode reduzir a absorção; seguir a conduta de comprimidos esquecidos.' },
            { k: 'Amamentação', t: 'MS 2016: com mais de 6 semanas de pós-parto, amamentando ou não, iniciar a minipílula a qualquer momento se houver certeza razoável de que não está grávida, com método de apoio por 7 dias (a OMS 2025 recomenda 2 dias de proteção adicional: veja Como usar). Com menos de 4 semanas de parto e sem amamentar, pode começar a qualquer momento sem método de apoio, mas é um método pouco eficaz fora da lactação.' },
            { k: 'Atenção', t: 'Não protege contra IST. Efeitos comuns: sangramento irregular, acne, humor alterado, dor nas mamas, náusea e ganho de peso. Enxaqueca nova, com ou sem aura, pede suspender o método (MS 2016).' }
        ]
    },
    dmpa: {
        sources: ['depo', 'ms2016'],
        substances: [
            { name: 'Acetato de medroxiprogesterona 150 mg/mL', form: 'Suspensão injetável IM; frasco-ampola ou seringa de 1 mL', sus: true, brands: ['Depo-Provera', 'Contracep'] }
        ],
        rx: [
            { title: 'Modelo com Depo-Provera', lines: ['USO INTRAMUSCULAR', '1) Depo-Provera 150 mg/mL (acetato de medroxiprogesterona) — ___ frascos-ampola ou seringas de 1 mL', 'Agitar vigorosamente e aplicar 1 mL (150 mg) por via intramuscular profunda, no glúteo ou no deltoide, a cada 12 a 13 semanas (no máximo a cada 13 semanas, ou 91 dias).', 'Primeira aplicação nos 5 primeiros dias da menstruação.'] }
        ],
        dosing: [
            { k: 'Dose e via', t: '150 mg (1 mL), por injeção intramuscular profunda no glúteo ou no deltoide, a cada 12 a 13 semanas, no máximo a cada 13 semanas (91 dias). A suspensão intramuscular não foi formulada para a via subcutânea. A dose não precisa ser ajustada ao peso. Agitar o frasco ou a seringa com vigor antes do uso e nunca misturar com outro medicamento.' },
            { k: 'Primeira injeção', t: 'Nos 5 primeiros dias após o início de um ciclo menstrual normal; ou nos 5 primeiros dias pós-parto, se não amamenta. Em aleitamento exclusivo, apenas a partir da 6ª semana pós-parto (bula; a OMS 2025 admite antes de 6 semanas, categoria 2: veja Restrições). MS 2016: pode começar a qualquer momento, se houver certeza razoável de que não está grávida, com método de apoio por 7 dias.' },
            { k: 'Injeções seguintes', t: 'Se passaram mais de 13 semanas (91 dias), a bula manda excluir gravidez (teste de sangue) antes de aplicar. MS 2016: pode adiantar ou atrasar em até 2 semanas; com atraso maior que 2 semanas, abstinência ou método de apoio até a injeção, e considerar a anticoncepção de emergência se houve relação desprotegida nos últimos 5 dias.' },
            { k: 'Troca de outro método', t: 'A troca deve garantir a proteção contínua. Vindo de pílula, a 1ª injeção deve ser dada em até 7 dias após o último comprimido (bula).' },
            { k: 'Atenção', t: 'Segurança e eficácia não estabelecidas em menores de 18 anos (bula). Pode reduzir a densidade mineral óssea. Retorno gradual da fertilidade, que pode demorar. Não protege contra IST. Efeitos comuns: alteração do sangramento, amenorreia, alteração de peso, cefaleia e mudança de humor ou da libido.' }
        ]
    },
    imp: {
        sources: ['msImplante', 'implanon', 'spr'],
        substances: [
            { name: 'Etonogestrel 68 mg', form: 'Implante subdérmico de haste única, com aplicador pré-carregado', sus: true, brands: ['Implanon NXT'], note: 'Incorporado ao SUS em 2025 para mulheres de 14 a 49 anos.' }
        ],
        rx: [
            { title: 'Modelo com Implanon NXT', lines: ['USO SUBDÉRMICO', '1) Implanon NXT (etonogestrel 68 mg) — 1 implante com aplicador', 'Inserir 1 implante, por via subdérmica, na face medial do braço não dominante, por médico(a) ou enfermeiro(a) treinado(a), com anestesia local (lidocaína 1% ou 2% sem vasoconstritor, 2 mL).', 'Permanência máxima de 3 anos; entregar o cartão com data da inserção, data limite de retirada, lote e braço.'] }
        ],
        blocks: [
            { title: 'Como o SUS organiza o implante (Ministério da Saúde)', items: [
                { k: 'Incorporação', t: 'Incorporado ao SUS pelas Portarias SECTICS/MS 47 e 48, de 8 de julho de 2025, para mulheres de 14 a 49 anos. A oferta ocorre prioritariamente na atenção primária, pelas equipes de Saúde da Família e outras equipes desse nível.' },
                { k: 'Quem insere', t: 'Médico(a) ou enfermeiro(a) devidamente treinado(a), em qualquer nível de atenção (Parecer COFEN 277/2017), em local próprio. Inserção e retirada são procedimentos simples, de poucos minutos.' },
                { k: 'Por que importa o aconselhamento', t: 'A principal causa de retirada precoce é o sangramento desfavorável (frequente ou prolongado), sobretudo quando a orientação prévia foi inadequada. A continuidade no 1º ano varia de 57% a 97%, conforme a orientação antes da inserção.' },
                { k: 'Exames', t: 'Não são necessários exames complementares para inserir ou retirar. Ultrassonografia transvaginal, citologia do colo e qualquer outro exame não devem condicionar nem atrasar o acesso ao método. Só se pede imagem para localizar implantes não palpáveis (inserções profundas, incomuns: menos de 3 em 1.000).' },
                { k: 'Oportunidade', t: 'A consulta de inserção e as de seguimento servem para testes rápidos de IST, adequação do rastreamento de colo do útero e de mama e acompanhamento de comorbidades.' }
            ] },
            { title: 'Quando iniciar (Ministério da Saúde)', items: [
                { k: 'Regra geral', t: 'A qualquer momento, desde que haja certeza razoável de que não há gravidez. Sem essa certeza, fazer o teste rápido de gravidez (imunológico urinário).' },
                { k: 'Situações aceitas', t: 'Até o 7º dia do ciclo menstrual. Sem relação desprotegida no mês anterior, com menstruação regular. Uso prévio, consistente e correto, de método confiável. Imediatamente após parto ou aborto, e nos 7 primeiros dias pós-aborto. Até 4 semanas após o parto, amamentando ou não. De 4 semanas a 6 meses após o parto, com amamentação exclusiva e amenorreia. O implante pode ser usado como anticoncepção imediata pós-evento obstétrico, inclusive no parto: não interfere na amamentação nem no crescimento do recém-nascido.' },
                { k: 'Proteção adicional', t: 'Quando a inserção ocorre depois do 7º dia do ciclo, orientar prática sexual protegida por 7 dias. (A bula do Implanon NXT usa os dias 1 a 5 do ciclo como regra, e barreira por 7 dias fora disso.)' }
            ] },
            { title: 'Contraindicações (manual do Ministério da Saúde)', items: [
                { k: 'Categoria 4', t: 'Câncer de mama atual e demais neoplasias sensíveis a esteroides sexuais (história familiar não contraindica). Gravidez.' },
                { k: 'Categoria 3', t: 'Sangramento genital irregular não investigado, quando não dá para afastar gestação. TEV agudo sem anticoagulação. IAM ou AVC em vigência do método (o histórico é categoria 2). Enxaqueca com aura durante o uso (se for prévia, não contraindica). Adenoma ou carcinoma hepatocelular e cirrose severa. Câncer de mama tratado há mais de 5 anos. Lúpus com antifosfolípide positivo. Hipersensibilidade ao etonogestrel ou a componente do implante.' },
                { k: 'Outras categorias', t: '48 horas a 4 semanas pós-parto: categoria 2. Imediato pós-aborto, neoplasia trofoblástica, hepatite viral aguda, mioma com distorção, anormalidades anatômicas, DIP atual, TB pélvica e câncer de endométrio: categoria 1. Câncer de colo: categoria 2.' },
                { k: 'Observação', t: 'Esta versão preliminar do manual usa as categorias do MEC da OMS de 2015. O aplicativo segue o MEC de 2025, mais recente: use a aba Restrições. Se não houver elegibilidade, orientar método alternativo disponível.' }
            ] },
            { title: 'Termo de consentimento e adolescentes', items: [
                { k: 'Termo (Anexo I do manual)', t: 'Obrigatório no serviço. Sempre que houver interesse, fazer a avaliação clínica das contraindicações e ler e assinar o termo junto com a pessoa, em linguagem adaptada ao contexto cultural. Esclarecer todas as dúvidas sobre efeitos adversos e secundários esperados, e assegurar a retirada a qualquer momento. Em duas vias (uma no prontuário, outra com a paciente); colar no termo a etiqueta do implante com o número do lote.' },
                { k: 'Adolescentes', t: 'O atendimento é garantido mesmo sem os responsáveis legais, ou com acompanhante de escolha da adolescente. Não é obrigatória autorização verbal ou escrita dos responsáveis para inserir o implante ou prescrever qualquer método. Sigilo e confidencialidade continuam obrigatórios, exceto em risco à vida ou à integridade física ou psicológica da adolescente ou de terceiros.' },
                { k: 'Orientação antes de inserir', t: 'Retomar a orientação com metodologia ativa, confirmando que a pessoa entendeu riscos, benefícios, reações, duração do método e garantia de remoção. Reforçar que o sangramento desfavorável é mais comum nos 3 primeiros meses e diminui entre 6 e 12 meses, o que é esperado e não indica ineficácia.' }
            ] },
            { title: 'Material e técnica de inserção (passo a passo do Ministério da Saúde)', items: [
                { k: 'Material', t: 'Luvas de procedimento. Antisséptico (clorexidina alcoólica 0,5%, álcool 70% ou iodopovidona tópico 10%). Gaze estéril. Seringa de 3 mL. Agulha de aspiração 40x12 mm. Agulha de injeção 13x4,5 mm. Lidocaína 1% ou 2% sem vasoconstritor. Esparadrapo e/ou atadura. O implante.' },
                { k: 'Preparo', t: 'Identificar a pessoa de forma ativa, com ao menos 2 identificadores (nome completo e data de nascimento). Posicionar o braço flexionado no cotovelo, com a mão sob a cabeça, de preferência o não dominante, e inspecionar o local (lesões, infecção, alterações anatômicas). Explicar de novo o procedimento, verificar a validade do implante, conferir a integridade do invólucro interno, separar a bula e o cartão da paciente, lavar as mãos e calçar as luvas.' },
                { k: 'Local e marcação', t: 'Face medial do braço não dominante, 8 a 10 cm do epicôndilo medial do úmero e 3 a 5 cm abaixo do sulco entre bíceps e tríceps. Se não der a distância de 3 a 5 cm (braços finos), o mais longe possível do sulco, evitando vasos e nervos. Fazer a 1ª marcação no local de inserção e uma 2ª (marca-guia) a cerca de 5 cm da primeira. Posicionar-se de modo a ver a agulha avançar logo abaixo da pele, olhando de lado e não por cima do aplicador, para prevenir inserção profunda.' },
                { k: 'Anestesia', t: 'Limpar com antisséptico e anestesiar toda a região (cerca de 4 cm) com lidocaína 1% ou 2% sem vasoconstritor. Dose recomendada: 2 mL. Dose máxima de lidocaína 2% sem vasoconstritor para infiltração local em adultos: 4,5 mg/kg por aplicação, sem passar de 300 mg no total.' },
                { k: 'Inserção', t: 'Retirar o aplicador do blíster mantendo a agulha e o implante estéreis (se contaminar, usar outro implante). Retirar a proteção da agulha segurando pela lateral do aplicador. Esticar a pele em direção ao cotovelo. Perfurar a pele com a ponta da agulha em ângulo ligeiramente inferior a 30°, inserindo apenas o bisel (se passou do bisel, puxar para trás). Baixar o aplicador até ficar paralelo à pele e empurrar a agulha com cuidado até ficar totalmente subdérmica, sem força excessiva (se a ponta perfurar a pele, recuar e reposicionar). Só depois da inserção total da agulha, puxar a alavanca roxa, sem mover agulha nem aplicador.' },
                { k: 'Conferir', t: 'Palpar o implante logo depois e pedir que a pessoa também o palpe, protegendo o orifício. Ao palpar as duas extremidades, deve ser possível confirmar o bastão de 4 cm. Se a agulha não foi totalmente inserida ou o aplicador se moveu ao acionar a alavanca, parte do implante pode ficar exteriorizada: não empurre; remova e descarte esse implante.' },
                { k: 'Curativo', t: 'Gaze estéril com curativo compressivo para minimizar hematoma. Pode trocar por um curativo menor após 24 horas e manter por 3 a 5 dias.' }
            ] },
            { title: 'Depois da inserção', items: [
                { k: 'Cuidados', t: 'Evitar atividade traumática ou com peso no braço por 24 horas. Pode haver equimose local. Manter o curativo seco e proteger com filme PVC no banho. Hematomas costumam se resolver em 7 a 14 dias, e compressa fria alivia.' },
                { k: 'Proteção', t: 'Orientar preservativo para todas as pessoas: o implante não protege contra IST. Se a inserção foi depois do 7º dia do ciclo, prática sexual protegida por 7 dias.' },
                { k: 'Cartão da usuária', t: 'Entregar o cartão com a data da inserção, a data limite prevista para a remoção, o número do lote e o braço usado, assinado e carimbado. Colar a etiqueta do dispositivo, com o lote, no termo assinado e arquivar na unidade.' }
            ] },
            { title: 'Registro no prontuário (e-SUS APS)', items: [
                { k: 'Onde', t: 'No Prontuário Eletrônico do Cidadão (PEC) ou em prontuário institucional padronizado: braço da inserção ou retirada, lote e validade.' },
                { k: 'Códigos', t: 'CID Z300 (aconselhamento geral sobre contracepção), Z308 (outro procedimento anticoncepcional) e/ou Z309 (procedimento anticoncepcional não especificado). CIAP W14 (contracepção/outros). SIGTAP 03.01.04.017-6 (inserção do implante subdérmico contraceptivo liberador de etonogestrel) e 03.01.04.018-4 (retirada).' }
            ] },
            { title: 'Retornos e manejo de intercorrências', items: [
                { k: 'Seguimento', t: 'Avaliar a adaptação ao método e os efeitos indesejados. Os sintomas negativos mais comuns são cefaleia, acne, mastalgia e sangramento desfavorável. Cefaleia e mastalgia costumam ser autolimitadas: analgésico simples e expectativa de melhora com o tempo.' },
                { k: 'Padrão de sangramento', t: 'Aos 12 meses, 78% têm padrão favorável (amenorreia, sangramento infrequente ou 1 vez por mês) e 22% desfavorável (frequente, mais de 1 vez por mês; ou prolongado, 14 dias ou mais por mês). O desfavorável é mais comum nos 3 primeiros meses (40 a 50%). Quem tem padrão favorável nos 3 primeiros meses tende a mantê-lo; cerca de 50% dos que têm padrão desfavorável melhoram, sobretudo no 1º ano.' },
                { k: 'Quando tratar o sangramento', t: 'Mais de 1 mês depois do início: com menos de 7 dias, conduta expectante; com mais de 7 dias, orientar e tratar se a usuária pedir. Menos de 1 mês do início: conduta expectante, com orientação.' },
                { k: 'Tratamento do sangramento desfavorável', t: 'Usar uma terapêutica de cada vez e reavaliar após cada prescrição; usar todas de uma vez é desencorajado. Os fármacos interrompem o sangramento do momento, mas não evitam a recidiva: servem para dar conforto na adaptação ou interromper episódios prolongados. Se voltar, usar de 1ª linha o que já funcionou. Ácido tranexâmico 500 mg, 1 comprimido a cada 8 horas por 5 dias, ou ibuprofeno 600 mg, 1 comprimido a cada 8 horas por 5 dias (qualquer anti-inflamatório por 5 dias serve). Pílula combinada com etinilestradiol 30 mcg + levonorgestrel 150 mcg, 1 comprimido ao dia por 2 a 4 semanas. Doxiciclina 100 mg, 1 comprimido a cada 12 horas por 5 dias. Injetável mensal com 25 mg de acetato de medroxiprogesterona + 5 mg de cipionato de estradiol, 1 ampola IM em dose única.' },
                { k: 'Alternativas da Febrasgo (2022), fora da Rename', t: 'Noretisterona 10 mg, 1 comprimido ao dia por 7, 14 ou 30 dias. Ácido mefenâmico 500 mg, 1 comprimido a cada 8 horas por 5 dias. Tamoxifeno 10 mg, 1 comprimido a cada 12 horas por 7 dias. Desogestrel 75 mcg, 1 comprimido ao dia por 30 a 90 dias.' },
                { k: 'Acne', t: 'Pode chegar a 11% das usuárias (efeito androgênico leve do etonogestrel). Opções: terapia tópica (peróxido de benzoíla, ácido azelaico), antibiótico sistêmico, pílula combinada, espironolactona e isotretinoína (esta reservada a casos graves ou de difícil controle). Pela segurança e pela disponibilidade no Componente Básico da Assistência Farmacêutica, a espironolactona é a droga oral de 1ª escolha: iniciar com 50 a 100 mg ao dia por 3 a 6 meses e reavaliar. Mais de 60% melhoram nesse intervalo.' },
                { k: 'Cistos foliculares', t: 'Cistos ovarianos benignos em 20 a 25% das usuárias, quase sempre sem sintomas nem necessidade de cirurgia, com regressão espontânea em 8 a 12 semanas. Pedir ultrassonografia só com sintomas (como dor pélvica persistente) ou com sangramento irregular que não respondeu ao tratamento.' },
                { k: 'Gravidez com o implante', t: 'Retirar o quanto antes, por profissional habilitado. Informar que o etonogestrel não é abortivo nem teratogênico: não há evidência de aumento de malformações se houver gravidez inadvertida.' },
                { k: 'Implante fraturado', t: 'Fissuras ou quebras (por esporte de contato ou acidente) podem mudar a liberação do etonogestrel e o padrão de sangramento. Discutir com a usuária manter ou trocar.' },
                { k: 'Infecção local', t: 'Suspeitar com eritema, calor, dor e secreção purulenta no local. Orientar higiene local e avaliar antibiótico para infecção de pele; seguimento próximo, atento a necessidade de drenagem. Se houver sintomas sistêmicos, falta de resposta ou recidiva: retirar e inserir no braço contralateral.' }
            ] },
            { title: 'Retirada e troca', items: [
                { k: 'Quando retirar', t: 'Após 3 anos de uso ou a qualquer momento em que a usuária quiser, mesmo antes. Diante de sintomas passíveis de manejo, informar as possibilidades de tratamento e deixar que ela decida, de forma consciente, se continua.' },
                { k: 'Implante não palpável', t: 'Fazer exame de imagem para localizá-lo. Como é radiopaco, a radiografia simples é a 1ª escolha. Implantes profundos devem ser abordados na atenção especializada (cirurgia geral e/ou vascular). Em implantes quebrados, atentar para as partes palpáveis e, se preciso, fazer mais de uma incisão.' },
                { k: 'Material da retirada', t: 'Luvas, antisséptico, gaze estéril, seringa de 3 mL, agulhas 40x12 mm e 13x4,5 mm, lidocaína 1% ou 2% sem vasoconstritor, pinça Halstead (mosquito) ou Kelly, lâmina de bisturi nº 15 ou 11, esparadrapo ou atadura. Fio de nylon 4.0 e porta-agulha só se precisar suturar.' },
                { k: 'Técnica', t: 'Localizar por palpação e comprimir a extremidade proximal (em direção ao ombro) até a extremidade distal fazer saliência na pele. Lavar as mãos, fazer antissepsia e anestesiar com 0,5 a 1 mL de lidocaína sem vasoconstritor, injetada abaixo do implante para mantê-lo perto da superfície. Empurrar a extremidade proximal para estabilizar e fazer uma incisão longitudinal de 2 mm em direção ao cotovelo a partir da ponta distal, sem seccionar o implante. Empurrar suavemente o implante até a extremidade aparecer na incisão, segurar com pinça Halstead curva ou reta e removê-lo. Com fibrose, remover o tecido por dissecção romba; se a extremidade não aparecer, incisar a cápsula com bisturi e retirar com a pinça.' },
                { k: 'Curativo e pontos', t: 'Se a incisão for maior, suturar de forma simples e orientar a retirada dos pontos em 7 a 10 dias. Curativo estéril com gaze e faixa compressiva para reduzir equimose. A usuária pode remover a faixa em 4 a 6 horas e o curativo de fechamento após 3 a 5 dias.' },
                { k: 'Troca', t: 'O novo implante pode ser inserido no mesmo braço e, muitas vezes, pela mesma incisão da retirada. Anestesiar com 2 mL de lidocaína 1% logo abaixo da pele, do local da incisão ao longo do trajeto de inserção; inserir a agulha completamente (senão o implante fica parcialmente visível na incisão); fechar a incisão com curativo que aproxime as bordas; manter o curativo com gaze por pelo menos 24 horas. Se o local anterior não for apropriado, usar o braço contralateral, com a mesma técnica e as mesmas orientações pós-inserção.' }
            ] },
            { title: 'Pela bula do Implanon NXT (Organon)', items: [
                { k: 'Esquema', t: 'Um implante, por via subdérmica, por até 3 anos. A usuária pode pedir a retirada a qualquer momento, mas o implante não deve ficar mais de 3 anos. Após a retirada, inserir outro de imediato mantém a proteção. A bula sugere que o médico considere a substituição antecipada em mulheres com sobrepeso.' },
                { k: 'Quando inserir', t: 'Sem hormonal no último mês: entre o dia 1 e o dia 5 do ciclo, mesmo com sangramento. Em outro momento, barreira por 7 dias e descartar gravidez se houve relação. Vindo de combinado: de preferência no dia seguinte ao último comprimido ativo (anel ou adesivo: no dia da retirada, no máximo na data da próxima colocação). Vindo de injetável: na data da próxima injeção. Vindo de minipílula: em até 24 horas após o último comprimido. Vindo de implante ou SIU: no dia da retirada.' },
                { k: 'Após aborto ou parto (bula)', t: 'Aborto do 1º trimestre: até 5 dias. Aborto do 2º trimestre: entre 21 e 28 dias. Parto sem amamentar: entre os dias 21 e 28. Lactantes: após a 4ª semana, com barreira por 7 dias. O manual do Ministério da Saúde é mais amplo, como acima.' },
                { k: 'Atenção', t: 'Inserção profunda pode dificultar a localização e a retirada e causar dano nervoso ou vascular. Aconselhar antes de inserir sobre as alterações do sangramento.' }
            ] }
        ]
    },
    cu: {
        sources: ['ms2016', 'spr'],
        substances: [
            { name: 'Cobre (T de cobre TCu 380A)', form: 'DIU sem hormônio; vida útil de até 10 anos', sus: true, brands: ['Injeflex TCu 380A', 'Optima TCu 380A'] }
        ],
        rx: [
            { title: 'Modelo de solicitação', lines: ['USO INTRAUTERINO', '1) DIU de cobre TCu 380A — 1 unidade', 'Inserção intrauterina por médico(a) ou enfermeiro(a) treinado(a), após consulta de elegibilidade e exclusão de gravidez.', 'Retorno para revisão 3 a 6 semanas após a inserção, ou depois da primeira menstruação.'] }
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
        substances: [
            { name: 'Levonorgestrel 52 mg (libera 20 mcg/dia)', form: 'SIU com aplicador; uso de até 5 anos (bula) ou 8 anos (atualização ANVISA 2024)', sus: false, brands: ['Mirena'], note: 'Fora da Rename para contracepção (Conitec decidiu não incorporar em 2016). Desde dez/2025 há inserção na SIGTAP só para endometriose.' },
            { name: 'Levonorgestrel 19,5 mg', form: 'SIU com aplicador; uso de até 5 anos', sus: false, brands: ['Kyleena'] }
        ],
        rx: [
            { title: 'Modelo com Mirena ou Kyleena', lines: ['USO INTRAUTERINO', '1) Mirena (levonorgestrel 52 mg) OU Kyleena (levonorgestrel 19,5 mg) — 1 unidade', 'Inserção intrauterina por profissional habilitado, nos 7 primeiros dias da menstruação (ou em qualquer momento do ciclo, se houver certeza de que não está grávida).', 'Revisão 4 a 12 semanas após a inserção e, depois, pelo menos 1 vez ao ano.'] }
        ],
        dosing: [
            { k: 'Quando inserir', t: 'Bula: nos 7 dias seguintes ao início da menstruação, sem método de barreira adicional; ou em qualquer momento do ciclo, se houver certeza de que não está grávida. Depois de 7 dias do início do sangramento, usar barreira ou abstinência por 7 dias. Não é contracepção de emergência. Pode ser inserido logo após aborto do 1º trimestre sem infecção. Pós-parto: não antes de 6 semanas (bula; a OMS 2025 admite a inserção em até 48 horas após o parto e a partir de 4 semanas: veja Como usar e Restrições). Pode ser substituído por outro a qualquer momento do ciclo.' },
            { k: 'Quem insere', t: 'Profissional com experiência em inserção de DIU, com especulo, solução asséptica e aplicador; anestesia do colo se apropriado. Dor ou tontura que não passem em meia hora de repouso podem indicar posição inadequada.' },
            { k: 'Duração', t: 'Kyleena: até 5 anos (bula). Mirena: a bula consultada indica 5 anos; a Secretaria Municipal da Saúde de São Paulo informou, em nota técnica de 2025, que a ANVISA atualizou a bula em 2024 para até 8 anos de contracepção em mulheres com útero íntegro, usando o DIU exclusivamente para contracepção (o uso para tratar condições específicas não se enquadra). Confira a bula vigente.' },
            { k: 'Revisão', t: 'Bula: verificar 4 a 12 semanas após a inserção e depois pelo menos uma vez ao ano. OMS 2025: consulta 3 a 6 semanas após a inserção ou após a primeira menstruação.' },
            { k: 'Retirada e troca', t: 'Para quem não quer engravidar, não retirar depois do 7º dia do ciclo sem outro método por pelo menos 7 dias antes. Um novo DIU pode ser inserido logo após a retirada, sem proteção adicional.' },
            { k: 'Atenção', t: 'Kyleena: eficácia e segurança não avaliadas em menores de 18 anos (bula). Amenorreia e sangramento irregular são comuns. Não protege contra IST.' }
        ]
    },
    ecp_lng: {
        sources: ['ms2016', 'postinor', 'spr'],
        substances: [
            { name: 'Levonorgestrel 1,5 mg', form: 'Comprimido único', sus: false, brands: ['Postinor Uno', 'Pozato Uni', 'Diad'] },
            { name: 'Levonorgestrel 0,75 mg', form: 'Comprimido; 2 comprimidos juntos ou 1 e outro 12 horas depois', sus: true, brands: [] }
        ],
        rx: [
            { title: 'Modelo com Postinor Uno', lines: ['USO ORAL', '1) Postinor Uno (levonorgestrel 1,5 mg) — 1 comprimido', 'Tomar 1 comprimido em dose única, o mais rápido possível após a relação desprotegida (de preferência em até 72 horas; limite de 5 dias).'] },
            { title: 'Modelo com levonorgestrel 0,75 mg (SUS)', lines: ['USO ORAL', '1) Levonorgestrel 0,75 mg — 2 comprimidos', 'Tomar 2 comprimidos juntos, em dose única (1,5 mg), o mais rápido possível, ou 1 comprimido agora e outro 12 horas depois.'] }
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
        substances: [
            { name: 'Acetato de ulipristal 30 mg', form: 'Comprimido único', sus: false, brands: [], note: 'Não localizei registro nem bula brasileira (ellaOne é a marca europeia): confira na ANVISA antes de prescrever.' }
        ],
        rx: [
            { title: 'Modelo (conforme a OMS)', lines: ['USO ORAL', '1) Ulipristal 30 mg — 1 comprimido', 'Tomar 1 comprimido em dose única, o mais cedo possível após a relação desprotegida, em até 120 horas (5 dias).'] }
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
        substances: [
            { name: 'Levonorgestrel + etinilestradiol (método de Yuzpe)', form: 'Pílula combinada; com comprimidos de 0,15 mg + 0,03 mg, cerca de 4 comprimidos por dose (aproximação do esquema da OMS)', sus: true, brands: ['Ciclo 21', 'Microvlar', 'Nordette'], note: 'Use só se não houver levonorgestrel isolado nem ulipristal.' }
        ],
        rx: [
            { title: 'Esquema da OMS', lines: ['USO ORAL', 'Dose: 100 mcg de etinilestradiol + 0,50 mg de levonorgestrel, repetida 12 horas depois (com comprimidos de levonorgestrel 0,15 mg + etinilestradiol 0,03 mg, aproximadamente 4 comprimidos por dose).', 'Tomar a 1ª dose o mais cedo possível, em até 120 horas (5 dias) da relação desprotegida.'] }
        ],
        dosing: [
            { k: 'Esquema', t: 'OMS 2025: 100 mcg de etinilestradiol + 0,50 mg de levonorgestrel, seguidos de uma segunda dose igual 12 horas depois.' },
            { k: 'Preferência', t: 'Levonorgestrel e ulipristal causam menos náusea e vômito e são preferíveis. Antiemético antes da dose pode ser oferecido com a pílula combinada.' },
            { k: 'Vômito', t: 'Vomitou em até 2 horas: tomar outra dose o mais rápido possível, com antiemético antes, se quiser; se continuar, pode usar a via vaginal.' }
        ]
    },
    eiud: {
        sources: ['ms2016', 'spr'],
        substances: [
            { name: 'Cobre (T de cobre TCu 380A)', form: 'DIU inserido até 120 horas após a relação', sus: true, brands: ['Injeflex TCu 380A', 'Optima TCu 380A'] }
        ],
        rx: [
            { title: 'Modelo de solicitação', lines: ['USO INTRAUTERINO (EMERGÊNCIA)', '1) DIU de cobre TCu 380A — 1 unidade', 'Inserir em até 120 horas (5 dias) da relação desprotegida, por profissional habilitado, após excluir gravidez.'] }
        ],
        dosing: [
            { k: 'Quando', t: 'Em até 120 horas da relação desprotegida. Se a ovulação puder ser estimada, também depois de 5 dias, desde que no máximo 5 dias após a ovulação.' },
            { k: 'Quem pode', t: 'Mulheres elegíveis ao DIU (veja Restrições). MS 2016: o DIU pode ser inserido imediatamente após o uso de anticoncepção hormonal de emergência.' },
            { k: 'Depois', t: 'Não precisa de proteção adicional. Valem a revisão e os cuidados do DIU de cobre.' }
        ]
    },
    condom: {
        sources: ['ms2016', 'spr'],
        substances: [
            { name: 'Preservativo masculino (látex)', form: 'Barreira; sem substância ativa', sus: true, brands: ['Jontex', 'Blowtex'] },
            { name: 'Preservativo feminino (nitrílico)', form: 'Barreira; sem substância ativa', sus: true, brands: [] }
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
        substances: [
            { name: 'Diafragma (com espermicida)', form: 'Barreira; sem substância ativa', sus: true, brands: [] }
        ],
        rx: [],
        dosing: [
            { k: 'Prescrição', t: 'O diafragma é ofertado pelo SUS (MS 2016). O protocolo consultado não detalha a técnica de escolha do tamanho e de colocação: siga a rotina do serviço.' },
            { k: 'Atenção', t: 'Não protege contra IST. Use preservativo junto quando houver risco. Veja as restrições na aba correspondente.' }
        ]
    },
    tubal: {
        sources: ['nt34', 'ms2016'],
        substances: [
            { name: 'Laqueadura tubária', form: 'Procedimento cirúrgico; códigos SIGTAP 04.09.06.018-6 e 04.11.01.004-2', sus: true, brands: [] }
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
