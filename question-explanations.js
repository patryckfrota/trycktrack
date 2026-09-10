(function () {
    const explanations = {
        'psi-inep-001': `Resposta correta — A. O caso reúne sinais de alerta consistentes para transtorno do espectro autista: prejuízo de comunicação e interação social, pouco contato visual, atraso importante da linguagem, comportamento repetitivo e resistência a mudanças. A criança deve ser encaminhada para avaliação multiprofissional e receber intervenção precoce; não é necessário aguardar a confirmação diagnóstica para iniciar apoio ao desenvolvimento.

Distratores:
B — Incorreta. Tratar o quadro como simples variação do desenvolvimento e aguardar seis meses atrasaria uma avaliação necessária.
C — Incorreta. O M-CHAT-R/F é instrumento de rastreio, não de confirmação diagnóstica, e sua faixa usual de aplicação é de 16 a 30 meses; a criança já tem 3 anos e 3 meses e sinais clínicos claros.
D — Incorreta. A fonoaudiologia pode integrar o cuidado, mas isoladamente não contempla os prejuízos sociais, comportamentais e globais nem substitui a avaliação multidisciplinar.`,

        'psi-inep-002': `Resposta correta — C. Há tentativa de suicídio planejada, sintomas depressivos e risco relevante em um adolescente. O dever de proteção prevalece sobre o sigilo quando existe risco significativo à vida. Os responsáveis devem ser informados sobre a tentativa e sua gravidade, preservando-se apenas informações íntimas que não sejam necessárias à proteção. Em seguida, deve-se avaliar formalmente o risco e definir vigilância segura, seguimento intensivo ou hospitalização.

Distratores:
A — Incorreta. Manter sigilo total deixa o adolescente exposto a novo comportamento suicida; além disso, iniciar antidepressivo não substitui a avaliação imediata de segurança.
B — Incorreta. Comunicar apenas a intoxicação omite justamente a informação necessária para que a família participe da proteção e da vigilância.
D — Incorreta. O sigilo total continua inadequado e internação compulsória não é automática; a modalidade de cuidado depende da avaliação de risco, suporte e possibilidade de manejo seguro.`,

        'psi-inep-003': `Resposta correta — A. A amitriptilina é metabolizada no fígado, pode causar alterações de condução e arritmias e exige atenção a condições que aumentem sua toxicidade. Em uso crônico e dose elevada, a avaliação clínica pode incluir função renal e hepática, eletrólitos — especialmente potássio — e eletrocardiograma.

Distratores:
B — Incorreta. Lipidograma, TSH e ultrassonografia abdominal não compõem o conjunto mais relacionado aos principais riscos da amitriptilina.
C — Incorreta. Embora transaminases e potássio sejam pertinentes, ultrassonografia abdominal e radiografia de tórax não monitoram rotineiramente a toxicidade do fármaco.
D — Incorreta. Inclui exames sem indicação rotineira para esse objetivo e omite a avaliação hepática; radiografia de tórax não é exame de monitoramento da amitriptilina.`,

        'psi-inep-004': `Resposta correta — D. Tremor grosseiro, ataxia e alteração do discurso em paciente que usa lítio sugerem intoxicação por lítio. A desidratação e a introdução de hidroclorotiazida favorecem aumento da litemia, pois o tiazídico reduz a depuração renal do lítio. A medida imediata é suspender o carbonato de lítio, dosar litemia e função renal, corrigir o volume e avaliar necessidade de tratamento hospitalar ou hemodiálise conforme a gravidade.

Distratores:
A — Incorreta. O carvão ativado não adsorve adequadamente o lítio e não trata intoxicação crônica ou interação medicamentosa.
B — Incorreta. A metformina não explica o conjunto de sinais neurológicos apresentado.
C — Incorreta. Levodopa com carbidopa trata sintomas parkinsonianos selecionados, não intoxicação por lítio.`,

        'psi-inep-005': `Resposta correta — C. A abordagem verbal e a restrição ambiental já falharam, e a paciente mantém violência iminente contra terceiros. Nessa situação, a contenção mecânica pode ser empregada como último recurso, pelo menor tempo possível e com monitorização, seguida de tranquilização medicamentosa; entre as alternativas, o haloperidol intramuscular é a opção adequada.

Distratores:
A — Incorreta. Uma nova intervenção verbal após administrar o fármaco não resolve a necessidade imediata de controlar com segurança a agressão ativa antes da medicação.
B — Incorreta. Diazepam intramuscular tem absorção pouco previsível e simples observação em consultório não oferece manejo seguro para violência grave.
D — Incorreta. A contenção isolada, sem tratamento da agitação e da provável psicose, prolonga risco e sofrimento e exige intervenção terapêutica adicional.`,

        'psi-inep-006': `Resposta correta — C. A paciente apresenta dependência importante de nicotina, tentativas prévias malsucedidas e desejo de cessar. Entre as alternativas, a bupropiona é medicamento de primeira linha nos protocolos brasileiros e deve ser associada à abordagem cognitivo-comportamental, após avaliação de contraindicações, como epilepsia, transtorno alimentar e uso de inibidor da monoaminoxidase.

Distratores:
A — Incorreta. Fluoxetina não é medicamento de primeira linha para cessação do tabagismo na ausência de indicação psiquiátrica própria.
B — Incorreta. Dissulfiram é utilizado de forma selecionada no tratamento do transtorno por uso de álcool, não da dependência de nicotina.
D — Incorreta. Diazepam não auxilia a cessação e ainda traz risco de sedação, tolerância e dependência.`,

        'psi-inep-007': `Resposta correta — A. No décimo dia após o parto, tristeza, culpa, irritabilidade, insegurança quanto ao cuidado e privação de sono, sem psicose ou risco declarado, são compatíveis com sofrimento puerperal que requer acolhimento, apoio psicossocial, fortalecimento da rede de apoio e acompanhamento próximo. A evolução deve ser monitorada porque sintomas persistentes ou intensos podem indicar depressão pós-parto.

Distratores:
B — Incorreta. Não há elementos suficientes para iniciar automaticamente fluoxetina no primeiro acolhimento; é necessário avaliar duração, gravidade, funcionalidade, risco e amamentação.
C — Incorreta. CAPS é reservado a quadros que demandam cuidado especializado ou intensivo; o caso pode inicialmente ser acompanhado pela atenção primária com apoio matricial.
D — Incorreta. Clonazepam não trata o núcleo do sofrimento puerperal, pode causar dependência e exige cautela durante a amamentação.`,

        'psi-inep-008': `Resposta correta — D. Rebaixamento de consciência, miose puntiforme, bradipneia, hipoxemia e bradicardia após exposição à morfina formam a síndrome opioide. A prioridade é suporte ventilatório e administração de naloxona, antagonista dos receptores opioides, titulada para restaurar ventilação adequada.

Distratores:
A — Incorreta. Atropina pode elevar a frequência cardíaca em situações específicas, mas não reverte a depressão respiratória causada por opioide.
B — Incorreta. Dopamina é vasopressor/inotrópico e não antagoniza os receptores opioides.
C — Incorreta. Flumazenil antagoniza benzodiazepínicos, não morfina, e pode precipitar convulsões em intoxicações selecionadas.`,

        'psi-inep-009': `Resposta correta — C. A suspeita clínica de intoxicação por agrotóxicos relacionada ao trabalho deve receber atendimento e tratamento sintomático, investigação complementar sem atrasar a assistência, notificação no Sinan e articulação com a Vigilância em Saúde do Trabalhador. O afastamento pode ser formalizado por atestado quando clinicamente indicado.

Distratores:
A — Incorreta. O encaminhamento ao serviço de referência pode ser necessário, mas a alternativa substitui medidas assistenciais e de notificação imediatas por denúncia ao Ministério Público.
B — Incorreta. A notificação de intoxicação exógena é feita diante da suspeita; não se deve aguardar confirmação laboratorial ou nexo causal definitivo.
D — Incorreta. A emissão da Comunicação de Acidente de Trabalho não é atribuição exclusiva de médico do trabalho, e a alternativa omite assistência, notificação e vigilância.`,

        'psi-inep-010': `Resposta correta — B. O padrão persistente de irritabilidade diante de limites, discussões com adultos, desafio a regras, provocação e tendência a culpar terceiros é característico do transtorno de oposição desafiante. O diagnóstico exige avaliar duração, frequência, prejuízo e contexto, além de excluir outras causas.

Distratores:
A — Incorreta. Transtorno bipolar pressupõe episódios bem delimitados de alteração patológica do humor e energia; reatividade breve a frustrações não caracteriza mania ou hipomania.
C — Incorreta. O transtorno disruptivo da desregulação do humor exige irritabilidade crônica entre explosões graves e recorrentes, e não apenas oposição dirigida a figuras de autoridade com retorno rápido ao estado habitual.
D — Incorreta. TDAH envolve desatenção e/ou hiperatividade-impulsividade persistentes em mais de um contexto; esses critérios não são descritos no caso.`,

        'psi-inep-011': `Resposta correta — A. O quadro sugere anorexia nervosa com instabilidade clínica grave: IMC de 14,7 kg/m², perda ponderal importante, hipotensão, bradicardia, síncope, desidratação e alterações eletrocardiográficas. A prioridade é estabilização orgânica em enfermaria clínica, com monitorização cardiovascular, investigação de distúrbios metabólicos e prevenção da síndrome de realimentação, seguida de cuidado psiquiátrico e nutricional integrado.

Distratores:
B — Incorreta. A internação exclusivamente psiquiátrica não é o primeiro destino enquanto há risco cardiovascular e metabólico que exige estrutura clínica.
C — Incorreta. Prosseguir apenas a investigação ambulatorial da amenorreia ignora sinais de desnutrição e instabilidade potencialmente fatais.
D — Incorreta. Acompanhamento ambulatorial em CAPS é insuficiente diante da necessidade imediata de estabilização hospitalar.`,

        'psi-inep-012': `Resposta correta — B. Pela Lei nº 10.216/2001, a internação voluntária ou involuntária somente pode ser autorizada por médico devidamente registrado no Conselho Regional de Medicina do estado onde se situa o estabelecimento. A internação involuntária ocorre sem consentimento do usuário e a pedido de terceiro, mediante laudo médico circunstanciado.

Distratores:
A — Incorreta. A internação determinada judicialmente é a compulsória, não a involuntária.
C — Incorreta. A internação involuntária deve ser comunicada em até 72 horas ao Ministério Público Estadual, e não em 15 dias ao Ministério Público Federal.
D — Incorreta. O término ocorre por solicitação escrita do familiar ou responsável legal, ou por decisão do especialista responsável pelo tratamento; não depende do Ministério Público Municipal.`,

        'psi-inep-013': `Resposta correta — D. Três dias após morte traumática do filho, tristeza intensa, choro, redução de sono e apetite e lembranças intrusivas podem compor uma reação aguda de luto. Na ausência de risco suicida, psicose ou incapacidade grave descrita, a conduta é acolher, oferecer apoio, mobilizar a rede e acompanhar longitudinalmente, reavaliando risco e evolução.

Distratores:
A — Incorreta. Não se deve medicalizar automaticamente uma reação de luto tão recente; antidepressivos não produzem alívio imediato e dependem de diagnóstico e avaliação clínica.
B — Incorreta. Seguimento intensivo em CAPS não é obrigatório sem sinais de crise grave, risco ou necessidade de cuidado especializado intensivo.
C — Incorreta. Encaminhamento rígido para uma técnica psicoterápica específica na atenção secundária não substitui o acolhimento e o acompanhamento inicial pela UBS.`,

        'psi-inep-014': `Resposta correta — A. A ingestão provável de ácido acetilsalicílico, associada a vômitos, alteração neurológica e hiperventilação, indica intoxicação por salicilato. Entre as opções, o carvão ativado é o agente de descontaminação gastrointestinal eficaz quando administrado oportunamente e com via aérea protegida. O manejo completo ainda exige avaliação ácido-básica, eletrólitos, salicilemia, alcalinização e eventual hemodiálise conforme gravidade.

Distratores:
B — Incorreta. N-acetilcisteína é o antídoto da intoxicação por paracetamol, não por salicilato.
C — Incorreta. Xarope de ipeca não é recomendado para induzir vômitos, especialmente em criança com sonolência e convulsão, devido ao risco de aspiração.
D — Incorreta. Atropina é usada principalmente em síndrome colinérgica e não neutraliza salicilatos.`,

        'psi-inep-015': `Resposta correta — D. Confusão, alteração ocular e ataxia em pessoa com uso crônico intenso de álcool constituem a tríade clássica da encefalopatia de Wernicke por deficiência de tiamina. A piora após glicose reforça a hipótese. Deve-se administrar tiamina parenteral imediatamente; a alternativa D é a única que oferece reposição terapêutica adequada.

Distratores:
A — Incorreta. Biperideno trata principalmente manifestações extrapiramidais agudas e não corrige deficiência de tiamina.
B — Incorreta. Diazepam é utilizado na síndrome de abstinência alcoólica, mas não trata a encefalopatia de Wernicke e pode piorar o rebaixamento de consciência.
C — Incorreta. Haloperidol pode ser empregado em situações selecionadas de agitação ou psicose, mas não trata a causa metabólica e pode acrescentar efeitos adversos.`,

        'psi-inep-016': `Resposta correta — A. Após excluir causas orgânicas agudas, episódios súbitos de palpitação, dispneia e sensação de morte iminente são compatíveis com crise de pânico. Um benzodiazepínico pode ser usado por curto prazo na crise, enquanto um inibidor seletivo da recaptação de serotonina é opção de primeira linha para prevenção a longo prazo, associado à psicoterapia.

Distratores:
B — Incorreta. Anti-histamínicos não são tratamento padrão da crise de pânico, e inibidores da monoaminoxidase não são primeira escolha pelo perfil de interações e efeitos adversos.
C — Incorreta. Antipsicóticos não são tratamento habitual da crise, e tricíclicos, embora possam ter eficácia, não são a melhor opção inicial entre as alternativas.
D — Incorreta. Vasodilatadores e antipsicóticos típicos não tratam o mecanismo do transtorno de pânico.`,

        'psi-inep-017': `Resposta correta — B. O uso diário por 25 anos, a perda de eficácia e a piora de memória indicam tolerância, dependência e efeitos cognitivos do benzodiazepínico. A retirada deve ser gradual e individualizada para evitar abstinência, podendo-se introduzir alternativa não benzodiazepínica e medidas comportamentais para insônia.

Distratores:
A — Incorreta. Renovar sem um plano de desprescrição perpetua dependência e efeitos adversos; associar melatonina não neutraliza esses riscos.
C — Incorreta. Suspensão abrupta após uso prolongado pode causar ansiedade rebote, insônia intensa, sintomas autonômicos, delirium e convulsões.
D — Incorreta. Aumentar a dose diante de tolerância agrava dependência, sedação, quedas e prejuízo cognitivo.`,

        'psi-inep-018': `Resposta correta — C. Sintomas depressivos persistentes por seis semanas, com anedonia, insônia, baixa energia, perda de apetite e prejuízo no cuidado do bebê, ultrapassam o período típico de tristeza puerperal e indicam depressão pós-parto. Sem psicose ou risco imediato, cabe iniciar tratamento antidepressivo compatível com o contexto clínico e amamentação, oferecer psicoterapia e programar acompanhamento próximo.

Distratores:
A — Incorreta. Internação não é indicada automaticamente na ausência de risco de suicídio, risco ao bebê, psicose ou incapacidade de manejo ambulatorial seguro.
B — Incorreta. O baby blues costuma surgir nos primeiros dias e remitir espontaneamente em até cerca de duas semanas; seis semanas de sintomas incapacitantes não devem ser apenas tranquilizadas.
D — Incorreta. Encaminhamento à UPA não substitui tratamento longitudinal quando não há emergência clínica ou psiquiátrica descrita.`,

        'psi-inep-019': `Resposta correta — B. A paciente tem dependência de nicotina e sintomas de abstinência ao reduzir. O tratamento com melhor suporte combina intervenção comportamental estruturada com farmacoterapia quando indicada; a reposição de nicotina reduz fissura e abstinência e deve acompanhar aconselhamento para cessação.

Distratores:
A — Incorreta. Reposição de nicotina isolada perde o componente comportamental essencial e não constitui o plano mais completo entre as alternativas.
C — Incorreta. Terapia comportamental é apropriada, mas, neste caso de dependência e tentativas repetidas, omitir apoio farmacológico reduz a adequação da proposta.
D — Incorreta. Benzodiazepínicos não tratam dependência de nicotina e acrescentam risco de sedação e dependência.`,

        'psi-inep-020': `Resposta correta — B. Agitação, confusão, tremor, sudorese, taquicardia e hipertensão 48 horas após interromper álcool em usuário crônico caracterizam delirium tremens, forma grave da síndrome de abstinência alcoólica. Benzodiazepínicos são o tratamento inicial, titulados até controlar agitação e hiperatividade autonômica, com monitorização, tiamina e correção de distúrbios associados.

Distratores:
A — Incorreta. Haloperidol pode ser adjuvante em situações selecionadas, mas não substitui benzodiazepínicos e, isoladamente, não previne convulsões da abstinência.
C — Incorreta. O contexto temporal e o conjunto autonômico-neuropsiquiátrico apontam para abstinência grave, não encefalopatia hipertensiva; restrição hídrica não trata o quadro.
D — Incorreta. A pressão elevada pode decorrer da hiperatividade autonômica da abstinência; nitroprussiato não é a conduta inicial e pode produzir queda pressórica perigosa.`,

        'psi-inep-021': `Resposta correta — B. No estágio de contemplação do modelo transteórico, a pessoa reconhece que o comportamento causa prejuízos, considera a possibilidade de mudança, mas ainda apresenta ambivalência e não iniciou um plano concreto. O paciente admite perda de controle e consequências familiares e financeiras, porém não descreve ação organizada para mudar.

Distratores:
A — Incorreta. Ação pressupõe que mudanças concretas já estejam sendo executadas, o que não aparece no relato.
C — Incorreta. Na pré-contemplação, a pessoa não reconhece suficientemente o problema ou não considera mudar; aqui há reconhecimento explícito.
D — Incorreta. Preparação envolve intenção clara e planejamento próximo para agir, não percepção limitada ou ausência de possibilidade de mudança.`,

        'psi-inep-022': `Resposta correta — B. Ausência de sorriso social e de vocalizações aos 6 meses constitui sinal de alerta do desenvolvimento. A preocupação do cuidador deve ser valorizada, com história clínica e psicossocial completa, avaliação de fatores de risco, exame do desenvolvimento e seguimento oportuno, sem restringir precocemente a hipótese a um único diagnóstico.

Distratores:
A — Incorreta. O M-CHAT-R/F é recomendado entre 16 e 30 meses; aos 6 meses ele não é o instrumento apropriado.
C — Incorreta. Um protocolo observacional especializado não deve ser usado isoladamente para fechar diagnóstico nessa idade e antes de uma avaliação global.
D — Incorreta. Encaminhamento pode ser necessário conforme os achados, mas neuroimagem não é rotina para todo atraso do desenvolvimento e a conduta proposta pula a avaliação inicial abrangente.`,

        'psi-inep-023': `Resposta correta — B. AUDIT de 22 pontos representa rastreamento positivo em faixa de alto risco e exige avaliação diagnóstica e intervenção. Como motorista, deve receber orientação explícita sobre álcool e direção. Naltrexona ou acamprosato podem ser considerados para reduzir consumo ou prevenir recaída, conforme objetivo terapêutico e contraindicações.

Distratores:
A — Incorreta. O rastreamento não é negativo; escore de 22 está muito acima do limite de risco.
C — Incorreta. Dissulfiram pode ter indicação selecionada e supervisionada, mas benzodiazepínicos não são tratamento de manutenção do transtorno por uso de álcool e têm potencial de dependência.
D — Incorreta. Classificar o rastreamento como negativo contradiz o escore do AUDIT, embora a naltrexona possa ser uma opção terapêutica.`,

        'psi-inep-024': `Resposta correta — B. O conjunto de fadiga, hipersonia, ganho ponderal, constipação, irregularidade menstrual e bradicardia sugere hipotireoidismo, possível causa orgânica de sintomas depressivos. A ausência de resposta à fluoxetina reforça a necessidade de investigar transtorno depressivo secundário, inicialmente com TSH e T4 livre.

Distratores:
A — Incorreta. Transtorno depressivo persistente requer curso crônico de pelo menos dois anos em adultos e não explica os sinais somáticos típicos de disfunção tireoidiana.
C — Incorreta. Transtorno de somatização envolve múltiplas queixas persistentes e preocupação desproporcional, não um padrão coerente de sinais endócrinos objetivos.
D — Incorreta. Burnout se relaciona ao contexto ocupacional e não explica bradicardia, constipação, alteração menstrual e ganho de peso.`,

        'psi-inep-025': `Resposta correta — C. O tratamento em grupo é efetivo e viável na atenção primária. O protocolo brasileiro organiza encontros estruturados, geralmente semanais no primeiro mês, combinando abordagem cognitivo-comportamental, apoio mútuo e avaliação da necessidade de farmacoterapia.

Distratores:
A — Incorreta. Consultas individuais podem funcionar, mas concentrar atendimento semanal individual para alta prevalência comunitária reduz alcance e viabilidade.
B — Incorreta. Palestras educativas isoladas aumentam informação, porém são menos efetivas que tratamento estruturado para produzir cessação sustentada.
D — Incorreta. Visitas semanais a todos os fumantes são pouco viáveis e adesivo ou medicamentos devem ser indicados após avaliação, não incentivados indistintamente.`,

        'psi-inep-026': `Resposta correta — B. Desatenção, dificuldade de concluir tarefas, hiperatividade e impulsividade iniciadas na infância e observadas no ambiente escolar sugerem TDAH. A avaliação deve ser clínica e psicossocial, colher informações de mais de um contexto, investigar prejuízo e diagnósticos diferenciais e pode usar escalas validadas como apoio, sem que elas substituam o diagnóstico clínico.

Distratores:
A — Incorreta. Desatenção e hiperatividade são centrais para TDAH; irritação não define transtorno opositor-desafiador.
C — Incorreta. O caso não descreve padrão predominante e persistente de hostilidade, desafio e desobediência a figuras de autoridade, especialmente na escola.
D — Incorreta. Embora nomeie TDAH, usa critérios inadequados — dificuldade em aceitar regras e irritação — e restringe a avaliação ao psiquiatra, quando ela pode ser multiprofissional e iniciada na atenção primária.`,

        'psi-inep-027': `Resposta correta — B. A N-acetilcisteína é o antídoto da intoxicação por paracetamol. Ela repõe precursores de glutationa e favorece a neutralização do metabólito hepatotóxico NAPQI, sendo mais eficaz quando iniciada precocemente, embora também possa beneficiar apresentações tardias.

Distratores:
A — Incorreta. Intoxicação por ácido acetilsalicílico é tratada com suporte, carvão ativado quando indicado, alcalinização e hemodiálise em casos graves, não com N-acetilcisteína.
C — Incorreta. Ibuprofeno não possui a N-acetilcisteína como antídoto específico; o manejo é predominantemente de suporte.
D — Incorreta. Dipirona também não tem N-acetilcisteína como antídoto específico.`,

        'psi-inep-028': `Resposta correta — D. Grupos estruturados favorecem cessação por apoio mútuo, troca de estratégias e participação ativa do fumante e do profissional. Eles integram a abordagem cognitivo-comportamental recomendada e podem ser associados a farmacoterapia quando indicada.

Distratores:
A — Incorreta. Intervenções mais intensivas, em geral, aumentam a chance de cessação em comparação com aconselhamento muito breve, embora toda abordagem tenha utilidade.
B — Incorreta. A combinação de aconselhamento e medicamento costuma ser mais eficaz, mas ambos podem produzir benefício quando usados isoladamente; portanto, não são ineficazes por si sós.
C — Incorreta. Dependência elevada favorece considerar farmacoterapia, mas a associação de reposição de nicotina e bupropiona não é obrigatória para todo paciente e depende de avaliação individual.`,

        'psi-inep-029': `Resposta correta — B. Capacitar profissionais amplia a oferta qualificada de aconselhamento e tratamento aos adolescentes que desejam parar de fumar, fortalecendo a capacidade da atenção primária de identificar, abordar e acompanhar usuários de tabaco.

Distratores:
A — Incorreta. Medicamentos não devem ser prescritos automaticamente a quem ainda não manifestou desejo de cessação; nessa fase cabem abordagem motivacional e prevenção.
C — Incorreta. Comitês de bairro não possuem competência para regular venda e uso de tabaco, matéria submetida a normas sanitárias e legais, e ações pontuais não substituem assistência estruturada.
D — Incorreta. A cessação do tabagismo é atribuição importante da atenção primária; encaminhar todos a serviços de maior complexidade reduz acesso e contraria a organização do cuidado.`,

        'psi-inep-030': `Resposta correta — C. Restrição alimentar, exercício excessivo, perda de 7 kg em um mês, baixo peso — IMC aproximado de 15,6 kg/m² — e amenorreia sugerem anorexia nervosa. O tratamento requer abordagem multiprofissional; psicoterapia é componente central, junto à reabilitação nutricional, avaliação clínica e participação familiar em adolescentes.

Distratores:
A — Incorreta. Bulimia nervosa exige episódios recorrentes de compulsão alimentar com comportamentos compensatórios; eles não são descritos. Bupropiona é contraindicada em transtornos alimentares pelo risco de convulsões.
B — Incorreta. Hipertireoidismo pode causar perda de peso, mas o padrão de restrição voluntária, exercício e amenorreia favorece transtorno alimentar; não se inicia propiltiuracil sem confirmação diagnóstica.
D — Incorreta. Transtorno de purgação envolve comportamento purgativo recorrente sem compulsões, negado no caso, e metoclopramida não trata esse transtorno.`,

        'psi-inep-031': `Resposta correta — D. O paciente apresenta síndrome depressiva há dois meses, com anedonia, perda de apetite e peso, hipersonia, fadiga e prejuízo cognitivo, além de ataques de pânico inesperados. Não há história de mania ou hipomania, exames tireoidianos são normais e os ataques não constituem, por si só, o quadro predominante. O diagnóstico que melhor integra os achados é transtorno depressivo com ataques de pânico.

Distratores:
A — Incorreta. Não há descrição de medo ou evitação de locais dos quais seria difícil escapar, requisito para agorafobia, e a síndrome depressiva é central.
B — Incorreta. Ausência de episódio maníaco ou hipomaníaco não sustenta transtorno bipolar.
C — Incorreta. Ansiedade generalizada exige preocupação excessiva persistente em diversos domínios, geralmente por pelo menos seis meses; aqui predominam depressão e crises súbitas.
`,

        'psi-inep-032': `Resposta correta — A. Após excluir déficits sensoriais, doenças neurológicas evidentes, riscos perinatais e fatores ambientais relevantes, a dificuldade específica e persistente de aquisição acadêmica deve ser avaliada por profissional ou equipe psicopedagógica. Essa avaliação caracteriza habilidades preservadas e comprometidas e orienta apoio escolar e investigação complementar.

Distratores:
B — Incorreta. Aos 6 anos já é possível reconhecer dificuldade desproporcional de aprendizagem; simplesmente aguardar pode ampliar o prejuízo escolar.
C — Incorreta. Neuropediatria pode ser indicada se surgirem sinais neurológicos ou atraso global, mas não é o encaminhamento inicial mais específico neste caso.
D — Incorreta. Reforço pedagógico sem avaliação pode não identificar o tipo de transtorno nem as adaptações necessárias.`,

        'psi-inep-033': `Resposta correta — B. Pouco contato visual e ausência de gestos sociais aos 9 meses são sinais de alerta, especialmente com antecedente familiar. A intervenção e estimulação precoces podem começar diante da suspeita, acompanhadas de retorno breve para avaliação do desenvolvimento; não se deve esperar passivamente por um diagnóstico fechado.

Distratores:
A — Incorreta. Avaliação especializada pode integrar o cuidado, mas encaminhar imediatamente a genética e neuropediatria, sem iniciar apoio e seguimento, não é a melhor conduta descrita.
C — Incorreta. Tranquilização sem ação desconsidera sinais precoces e a preocupação materna.
D — Incorreta. Risperidona não é indicada para rastreio ou sinais iniciais de TEA em lactente; seu uso é reservado a sintomas comportamentais graves em contextos específicos e idade apropriada.`,

        'psi-inep-034': `Resposta correta — A. Episódios repetidos de consumo excessivo causam prejuízo ocupacional e sintomas posteriores, caracterizando uso nocivo de álcool. O relato não demonstra o conjunto de dependência, como perda persistente de controle, prioridade do álcool, tolerância ou abstinência, e o funcionamento entre episódios permanece preservado.

Distratores:
B — Incorreta. Há dano relacionado ao consumo, mas não foram descritos critérios suficientes para síndrome de dependência.
C — Incorreta. Os sintomas duram apenas dois dias após intoxicações e não cumprem duração nem independência etiológica de episódio depressivo moderado.
D — Incorreta. Abstinência requer redução ou interrupção após uso repetido com sintomas autonômicos e neuropsiquiátricos típicos; o quadro ocorre após intoxicação episódica.`,

        'psi-inep-035': `Resposta correta — D. A criança tem múltiplos sinais de alerta social e comunicativo aos 6 meses, com déficit auditivo já afastado. Deve ser referenciada para avaliação especializada e acompanhamento multiprofissional, mantendo cuidado compartilhado com a atenção primária e iniciando planejamento terapêutico precoce sem aguardar confirmação definitiva.

Distratores:
A — Incorreta. Estimulação é útil, mas limitar-se à puericultura até 24 meses posterga investigação especializada diante de vários sinais de alerta.
B — Incorreta. O rastreio padronizado M-CHAT-R/F não é validado para essa idade e não deve atrasar o encaminhamento.
C — Incorreta. Há sinais de alerta claros; esperar até 16 meses seria conduta passiva e potencialmente prejudicial.`,

        'psi-inep-036': `Resposta correta — C. Preocupação excessiva e difícil de controlar, tensão, inquietação, irritabilidade, dificuldade de concentração e perturbação do sono por sete meses são compatíveis com transtorno de ansiedade generalizada. O funcionamento profissional preservado não exclui o diagnóstico.

Distratores:
A — Incorreta. Não há humor deprimido ou anedonia persistentes nem outros elementos suficientes para episódio depressivo maior.
B — Incorreta. Não foram descritos episódios de mania, hipomania ou depressão que sustentem transtorno bipolar.
D — Incorreta. TDAH começa no período do desenvolvimento e exige padrão persistente de desatenção e/ou hiperatividade em múltiplos contextos; o início recente ligado à preocupação favorece ansiedade.`,

        'psi-inep-037': `Resposta correta — D. Miose, sialorreia, lacrimejamento, vômitos, diarreia/incontinência, fasciculações e bradicardia após possível exposição rural caracterizam síndrome colinérgica por organofosforado. A atropina antagoniza manifestações muscarínicas e deve ser administrada prontamente, junto à descontaminação, suporte e consideração de pralidoxima.

Distratores:
A — Incorreta. Diltiazem pode causar bradicardia e hipotensão, mas não explica hipersecreções, miose e fasciculações; fisiostigmina aumentaria atividade colinérgica.
B — Incorreta. Varfarina causa sangramento e alteração de coagulação, não síndrome colinérgica; plasma é reservado a reversão urgente selecionada.
C — Incorreta. Salbutamol provoca tipicamente taquicardia, tremor e hipocalemia, não bradicardia com secreções abundantes.`,

        'psi-inep-038': `Resposta correta — A. IMC de 14,8 kg/m², frequência cardíaca de 42 bpm, desidratação e hipotensão postural em paciente com restrição alimentar crônica indicam instabilidade médica e alto risco. Ela deve ser avaliada em hospital com capacidade de monitorização e possível internação para estabilização e realimentação segura.

Distratores:
B — Incorreta. Topiramato pode reduzir apetite e peso e não trata anorexia nervosa; seria especialmente inadequado neste estado nutricional.
C — Incorreta. Amitriptilina pode agravar risco cardíaco e hipotensão e não corrige a emergência nutricional.
D — Incorreta. Encaminhamento ambulatorial para decidir apenas sobre sonda é insuficiente; primeiro é necessária avaliação hospitalar ampla, e a via de realimentação depende do caso.`,

        'psi-inep-039': `Resposta correta — D. Alcoolismo crônico associado a desnutrição produz deficiência de tiamina. Confusão, ataxia e alterações oculomotoras caracterizam encefalopatia de Wernicke; amnésia e confabulação indicam componente de Korsakoff. O tratamento é tiamina parenteral em dose alta, antes de carboidratos, além de correção de magnésio e suporte nutricional.

Distratores:
A — Incorreta. Glicose antes de tiamina pode precipitar ou agravar a encefalopatia, e complexo B oral é inadequado para tratamento agudo grave.
B — Incorreta. Não há relato de traumatismo cranioencefálico, e a etiologia está demonstrada pelo alcoolismo, desnutrição e vitamina B1 baixa.
C — Incorreta. Repete etiologia errada e propõe glicose sem reposição parenteral imediata de tiamina.`,

        'psi-inep-040': `Resposta correta — D. Após ingestão de produto potencialmente cáustico, deve-se avaliar via aérea, sintomas e mucosa oral e observar a criança por algumas horas. A ausência de lesão oral não exclui totalmente lesão esofágica, portanto sintomas como sialorreia, disfagia, vômitos, dor ou dificuldade respiratória indicam avaliação especializada.

Distratores:
A — Incorreta. Neutralizantes podem gerar reação exotérmica e diluentes não devem ser administrados indiscriminadamente.
B — Incorreta. Lavagem gástrica e carvão ativado são contraindicados em ingestão cáustica por risco de nova exposição, perfuração e aspiração; carvão adsorve mal esses agentes.
C — Incorreta. Induzir vômito reexpõe esôfago e orofaringe ao produto e aumenta o risco de aspiração.`,

        'psi-inep-041': `Resposta correta — D. Depressão com resposta insuficiente ao tratamento, sintomas psicóticos recentes e ideação suicida exige avaliação especializada rápida, multiprofissional e intensificação do cuidado. O CAPS pode avaliar risco, organizar plano terapêutico, envolver a irmã com consentimento e segurança e decidir se há necessidade de hospitalização.

Distratores:
A — Incorreta. Manter apenas manejo rotineiro na UBS é insuficiente diante de psicose e ideação suicida, embora a atenção primária deva continuar compartilhando o cuidado.
B — Incorreta. Internação em hospital psiquiátrico não é automática; deve decorrer de avaliação de risco e ser usada quando recursos extra-hospitalares forem insuficientes.
C — Incorreta. Hospital geral pode ser indicado se houver risco iminente ou necessidade de internação, mas o caso não fornece elementos para solicitá-la diretamente sem avaliação especializada do risco.`,

        'psi-inep-042': `Resposta correta — C. Ataques de ansiedade associados a sair de casa, com evitação e prejuízo funcional crescente, sugerem transtorno de pânico com comportamento agorafóbico ou outra condição ansiosa que exige reavaliação diagnóstica. Psicoterapia estruturada, especialmente cognitivo-comportamental com exposição, é indicada, e a resposta discreta à sertralina após dez semanas justifica revisar adesão, dose e estratégia farmacológica.

Distratores:
A — Incorreta. Não há emergência psiquiátrica descrita; benzodiazepínico e encaminhamento emergencial não resolvem o tratamento longitudinal.
B — Incorreta. Manter a mesma dose sem reavaliar apesar do prejuízo progressivo e resposta limitada é insuficiente.
D — Incorreta. Polifarmácia imediata com benzodiazepínico e antipsicótico não é indicada, e trocar um ISRS por outro sem avaliar dose, adesão e psicoterapia não é a melhor conduta.`,

        'psi-inep-043': `Resposta correta — D. Agitação, midríase, boca seca e rubor formam síndrome anticolinérgica. Anti-histamínicos de primeira geração, como dexclorfeniramina, atravessam a barreira hematoencefálica e, em superdose, podem causar excitação, delirium, taquicardia, retenção urinária e hipertermia.

Distratores:
A — Incorreta. Dipirona não produz tipicamente síndrome anticolinérgica.
B — Incorreta. Salbutamol pode causar tremor, agitação e taquicardia, mas não explica boca seca e midríase como toxíndrome completa.
C — Incorreta. Clorpromazina possui efeitos anticolinérgicos, mas costuma associar sedação, hipotensão e outros efeitos; entre as opções e no contexto doméstico pediátrico, dexclorfeniramina é a correspondência mais direta.`,

        'psi-inep-044': `Resposta correta — C. Rigidez, espasmos musculares e hipertermia em duas crianças após permanência na casa de pessoa tratada por esquizofrenia sugerem ingestão acidental de antipsicótico, especialmente haloperidol, com reação extrapiramidal aguda e possível toxicidade grave. É necessário suporte, monitorização e tratamento das distonias conforme avaliação.

Distratores:
A — Incorreta. Cardiopatia congênita cianótica não surgiria simultaneamente em dois primos previamente bem após a mesma exposição ambiental.
B — Incorreta. Captopril causa principalmente hipotensão, tontura e alterações renais, não rigidez e espasmos extrapiramidais.
D — Incorreta. Benzodiazepínicos geralmente causam depressão do sistema nervoso central, sonolência e ataxia, e não rigidez distônica com hipertermia.`,

        'psi-inep-045': `Resposta correta — B. Educação Popular em Saúde parte da escuta, do saber das famílias e da construção compartilhada de respostas adequadas ao território. A equipe deve compreender como a pandemia afetou crianças e cuidadores e elaborar coletivamente estratégias de apoio, evitando medicalização automática.

Distratores:
A — Incorreta. Reunião centrada apenas em manejo medicamentoso reduz um problema psicossocial amplo a prescrição.
C — Incorreta. Técnicas de convencimento são verticais e incompatíveis com diálogo, autonomia e construção conjunta.
D — Incorreta. Palestras unidirecionais sobre doenças neurodegenerativas não correspondem às queixas apresentadas nem à metodologia da Educação Popular.`,

        'psi-inep-046': `Resposta correta — C. Crises súbitas recorrentes com sintomas autonômicos, medo de infarto, exames adequados normais e busca repetida por urgência sugerem ataques de pânico e ansiedade relacionada à saúde. A conduta inclui explicar os achados sem invalidar o sofrimento, evitar exames repetitivos sem indicação, estimular atividade física, oferecer apoio psicológico e acompanhar em cuidado escalonado.

Distratores:
A — Incorreta. Repetir investigação emergencial após avaliação clínica e exames normais reforça ansiedade e não trata o problema predominante.
B — Incorreta. Novos exames indiscriminados e combinação de betabloqueador com benzodiazepínico não constituem primeira abordagem longitudinal.
D — Incorreta. Antidepressivos tricíclicos não são primeira escolha pelo perfil de efeitos adversos, e benzodiazepínicos devem ser reservados e usados com cautela; a abordagem não farmacológica inicial é mais adequada neste caso.`,

        'psi-inep-047': `Resposta correta — A. O projeto terapêutico singular deve ser construído com o paciente, considerando motivos da não adesão, efeitos adversos percebidos, contexto de vida, prioridades e metas possíveis. Decisão compartilhada e pactuação aumentam autonomia e adesão, permitindo ajustar medicamentos e mudanças de estilo de vida.

Distratores:
B — Incorreta. Informar riscos é necessário, mas aconselhamento firme e unilateral, sem explorar barreiras e preferências, não caracteriza construção compartilhada.
C — Incorreta. Pressão e uso da negação como instrumento coercitivo prejudicam vínculo e autonomia.
D — Incorreta. Condicionar acesso à obediência é antiético e viola continuidade e universalidade do cuidado; não se pode ameaçar excluir o usuário da UBS.`,

        'prev-inep-001': `Resposta correta — D. Sedação paliativa pode ser indicada diante de sofrimento intolerável causado por sintoma refratário, após avaliação cuidadosa, consentimento e definição proporcional da sedação. O objetivo é aliviar sofrimento, e não abreviar a vida. Em doença terminal com plano exclusivo de conforto, a investigação deve ser orientada pelo benefício real para a paciente.

Distratores:
A — Incorreta. Tomografia para procurar nova metástase não mudaria a finalidade do cuidado e imporia ônus sem benefício provável.
B — Incorreta. Apenas aguardar e orientar sinais de alarme é insuficiente diante de dispneia e sofrimento que exigem controle ativo.
C — Incorreta. Encaminhamento hospitalar automático contraria o plano paliativo domiciliar; deve ocorrer somente se estiver alinhado às metas de cuidado e trouxer benefício.`,

        'prev-inep-002': `Resposta correta — B. Espessamento pleural, placas pleurais, derrame e possível neoplasia pleural são classicamente associados à exposição ocupacional ao amianto, frequente na construção civil, fabricação de fibrocimento, isolamento e demolição. A latência costuma ser longa.

Distratores:
A — Incorreta. Agrotóxicos produzem outros padrões de intoxicação e não são causa típica de placas pleurais.
C — Incorreta. Benzeno está ligado principalmente a toxicidade hematológica, como aplasia medular, síndrome mielodisplásica e leucemias.
D — Incorreta. Poeira de carvão causa pneumoconiose com alterações predominantemente parenquimatosas, não placas pleurais típicas do amianto.`,

        'prev-inep-003': `Resposta correta — B. A diretiva antecipada recusa procedimentos invasivos e deve ser respeitada enquanto expressão válida da autonomia do paciente. Na dispneia terminal por linfangite carcinomatosa, morfina parenteral reduz a percepção de falta de ar e integra o cuidado de conforto, titulada e monitorada.

Distratores:
A — Incorreta. Intubação viola a vontade previamente registrada e tem baixa perspectiva de benefício no contexto descrito.
C — Incorreta. O derrame é pequeno e não parece ser o principal mecanismo da dispneia; toracocentese invasiva contrariaria as metas sem benefício proporcional.
D — Incorreta. A proposta culmina em intubação e, portanto, também desrespeita a diretiva; ventilação não invasiva só seria considerada se trouxesse conforto e fosse aceita.`,

        'prev-inep-004': `Resposta correta — B. A participação comunitária e o controle social são princípios da organização do SUS, assegurados por conselhos e conferências de saúde e também aplicáveis ao planejamento local. Incluir moradores melhora diagnóstico do território, legitimidade, prioridades e avaliação da intervenção.

Distratores:
A — Incorreta. Excluir controle social contraria participação da comunidade prevista na legislação do SUS.
C — Incorreta. A legislação brasileira não proíbe; ao contrário, institucionaliza a participação social.
D — Incorreta. A participação não depende de autorização prévia do Legislativo municipal para cada projeto local.`,

        'prev-inep-005': `Resposta correta — B. Vigilância em saúde articula análise do território, identificação de riscos e intervenção proporcional às vulnerabilidades. Uma comunidade heterogênea sofre impactos diferentes conforme moradia, renda, trabalho, acesso a informação e possibilidade de isolamento, portanto os grupos mais vulneráveis precisam de prioridade.

Distratores:
A — Incorreta. Orientações uniformes ignoram desigualdades de exposição, adoecimento e capacidade de proteção.
C — Incorreta. A equipe deve combater desinformação, mas também dialogar respeitosamente com saberes e práticas locais, não rejeitá-los de forma indiscriminada.
D — Incorreta. Neutralidade diante de necessidades desiguais impede atuação responsável; a equipe deve apoiar-se em evidências e princípios do SUS.`,

        'prev-inep-006': `Resposta correta — B. O prolongamento da vazante aumenta a exposição de moradores a áreas rasas, margens e bancos de areia onde arraias podem permanecer parcialmente enterradas. Isso eleva o risco de ferroadas durante pesca, banho e deslocamento. A ação educativa deve abordar prevenção e primeiros cuidados.

Distratores:
A — Incorreta. Acidentes ofídicos se relacionam mais a alterações de habitat terrestre, desmatamento e atividades rurais; o cenário destaca águas baixas com desmatamento eliminado.
C — Incorreta. Escorpionismo se associa sobretudo a abrigo em entulho, urbanização e desequilíbrio ambiental terrestre, não especificamente à vazante prolongada.
D — Incorreta. Mercúrio está associado principalmente a garimpo e contaminação da cadeia alimentar, elementos não descritos.`,

        'prev-inep-007': `Resposta correta — B. A silicose compromete a função de macrófagos e aumenta fortemente o risco de tuberculose, inclusive após cessada a exposição. Pessoas com silicose devem ser rastreadas e avaliadas periodicamente para infecção e doença tuberculosa conforme protocolos e sintomas.

Distratores:
A — Incorreta. Leucemia se associa de modo clássico à exposição ao benzeno, não à sílica.
C — Incorreta. Câncer de bexiga está relacionado a exposições como aminas aromáticas, tabagismo e outros fatores, não é a principal vigilância secundária da silicose.
D — Incorreta. Câncer de cabeça e pescoço relaciona-se sobretudo a tabaco, álcool e HPV, sem associação específica que justifique rastreio por silicose.`,

        'prev-inep-008': `Resposta correta — A. Gritos, controle da possibilidade de trabalhar, críticas, humilhação e medo caracterizam violência psicológica contra a mulher, mesmo sem agressão física. O caso deve ser notificado compulsoriamente pelos serviços de saúde e acompanhado pela USF com escuta protegida, avaliação de risco e construção de plano de segurança e cuidado.

Distratores:
B — Incorreta. Encaminhamento psiquiátrico não é automático e pode patologizar a vítima; a prioridade é enfrentar a violência e oferecer cuidado integral.
C — Incorreta. O Ligue 180 é canal de orientação e denúncia que pode ser oferecido, mas o profissional não deve substituir automaticamente a decisão da mulher nem confundir denúncia policial com notificação sanitária.
D — Incorreta. Combina as duas inadequações: denúncia automática e encaminhamento psiquiátrico sem indicação clínica.`,

        'prev-inep-009': `Resposta correta — B. Embora adolescentes capazes tenham direito à confidencialidade, o sigilo pode ser rompido quando sua manutenção cria risco relevante à vida ou à saúde. Descartar insulina após duas internações recentes por cetoacidose configura risco grave; comunicar a responsável na medida necessária à proteção não constitui infração ética.

Distratores:
A — Incorreta. O sigilo não é absoluto diante de risco significativo, devendo-se explicar ao adolescente os motivos e preservar o máximo possível de confidencialidade.
C — Incorreta. A justificativa não é a mãe conhecer internações anteriores, mas o risco atual causado pela omissão deliberada do tratamento.
D — Incorreta. Autonomia deve ser respeitada conforme capacidade, mas não impede intervenção protetiva proporcional diante de risco grave e evitável.`,

        'prev-inep-010': `Resposta correta — A. A PNAISP organiza a atenção integral das pessoas privadas de liberdade no SUS por adesão e cooperação interfederativa entre União, estados, Distrito Federal e municípios. Busca inserir a população prisional na Rede de Atenção à Saúde, com atenção primária como ordenadora do cuidado.

Distratores:
B — Incorreta. A organização das ações depende da adesão e pactuação local, e equipes vinculadas ao território podem participar do cuidado prisional conforme o arranjo estabelecido.
C — Incorreta. Equipes de atenção primária prisional podem incluir profissionais de saúde mental e articular-se com a RAPS; o cuidado não é exclusivo do CAPS.
D — Incorreta. A adesão à política não é automaticamente obrigatória para todos os entes; ocorre mediante pactuação e habilitação conforme as normas.`,

        'prev-inep-011': `Resposta correta — A. Uma intervenção intercultural deve partir do diálogo com lideranças e comunidade, reconhecer saberes e significados locais e pactuar coletivamente prioridades e próximos passos. A roda de conversa favorece participação e construção compartilhada, em consonância com a atenção diferenciada à saúde indígena.

Distratores:
B — Incorreta. Palestra verticalizada não garante diálogo intercultural, e midazolam não é tratamento de manutenção para transtorno por uso de álcool.
C — Incorreta. O planejamento centrado apenas na equipe seguido de palestra coloca a população como receptora passiva, sem pactuação comunitária.
D — Incorreta. Embora a roda de conversa seja adequada, prescrever benzodiazepínicos indiscriminadamente para cessação é perigoso e pode gerar sedação e dependência.`,

        'prev-inep-012': `Resposta correta — D. Na situação proposta, a discussão eletrônica deve restringir-se a médicos envolvidos, em ambiente protegido, com aviso explícito de confidencialidade e sem elementos que identifiquem pacientes. Cada participante mantém responsabilidade pessoal pelo sigilo; o conteúdo não pode ser encaminhado para fora do grupo.

Distratores:
A — Incorreta. A comunicação entre médicos para finalidade assistencial não é, por si só, antiética, desde que necessária, segura e confidencial.
B — Incorreta. Mesmo com autorização, devem ser evitados elementos identificadores desnecessários em grupo de mensagens; consentimento não elimina deveres de segurança e minimização.
C — Incorreta. A responsabilidade ética não recai apenas sobre o administrador; todos os participantes respondem pelo conteúdo que produzem, recebem e compartilham.`,

        'prev-inep-013': `Resposta correta — B. Conforme os gráficos citados, a proporção de óbitos entre pessoas brancas hospitalizadas era menor do que a proporção observada quando agregadas as demais categorias raciais/étnicas, indicando melhor sobrevida relativa naquele recorte. A interpretação deve considerar dados faltantes e o caráter descritivo inicial do boletim.

Distratores:
A — Incorreta. Os dados apresentados não mostram mais óbitos indígenas do que entre pessoas de raça/cor amarela.
C — Incorreta. O número de internações de pessoas pardas superava o de pessoas pretas.
D — Incorreta. A soma de internações de pessoas amarelas e indígenas não ultrapassava as internações de pessoas pretas no gráfico.

Validação visual pendente — os gráficos originais não estão incorporados ao banco e devem ser conferidos no PDF-fonte antes da publicação definitiva deste comentário.`,

        'prev-inep-014': `Resposta correta — D. A abordagem centrada na pessoa e a competência cultural exigem escutar tanto percepções favoráveis quanto dúvidas, medos e experiências negativas. A equipe pode então responder às preocupações com respeito, construir argumentos compreensíveis e apresentar evidências, favorecendo decisão informada.

Distratores:
A — Incorreta. Palestra voltada apenas a convencer é comunicação unidirecional e não explora as razões da resistência.
B — Incorreta. Ouvir apenas percepções positivas exclui justamente dúvidas e barreiras que precisam ser compreendidas.
C — Incorreta. Pressionar usuários ameaça autonomia, vínculo e confiança e costuma aumentar resistência.`,

        'prev-inep-015': `Resposta correta — D. No modelo de Dahlgren e Whitehead, idade, sexo e fatores hereditários formam o núcleo individual. Ao redor estão estilos de vida, redes sociais e comunitárias, condições de vida e trabalho e, por fim, condições socioeconômicas, culturais e ambientais gerais. Os estilos de vida fazem a transição entre características individuais e determinantes sociais mais amplos.

Distratores:
A — Incorreta. O modelo inclui condições de vida e trabalho e o contexto macroeconômico, cultural e ambiental, não apenas as três camadas citadas.
B — Incorreta. Moradia, trabalho, educação, saneamento e acesso a serviços influenciam saúde e devem orientar ações territoriais.
C — Incorreta. Não há uma seleção fixa de fatores “mais importantes”; o modelo destaca camadas interdependentes e omite, nessa formulação, redes sociais e condições de vida e trabalho.`,

        'prev-inep-016': `Resposta correta — A. A quantidade de agentes comunitários deve ser definida conforme população, características demográficas, vulnerabilidades socioeconômicas, riscos epidemiológicos e organização territorial. O censo contribui, mas precisa ser combinado com dados locais e cadastro atualizado.

Distratores:
B — Incorreta. eMulti oferece apoio multiprofissional às equipes vinculadas, não assistência especializada focal substitutiva, e sua implantação depende do número de equipes e do arranjo normativo vigente.
C — Incorreta. O censo demográfico não consolida diagnóstico suficiente das condições de saúde bucal para definir sozinho modalidade de equipe.
D — Incorreta. Três ESF seriam insuficientes para cobrir aproximadamente 12 mil habitantes segundo parâmetros usuais; a definição também deve considerar vulnerabilidade e território, não apenas crescimento inferior a 10%.`,

        'prev-inep-017': `Resposta correta — D. Durante a viremia, uma pessoa infectada pode transmitir o vírus a mosquitos Aedes em área infestada, criando risco de ciclo urbano. Medidas de proteção contra picadas e isolamento vetorial do caso suspeito reduzem essa possibilidade enquanto ocorre investigação e notificação imediata.

Distratores:
A — Incorreta. Febre amarela é de notificação compulsória imediata, não apenas semanal.
B — Incorreta. A vacinação rotineira segue faixas etárias e situações epidemiológicas definidas; antecipar para 6 meses só ocorre sob recomendação excepcional das autoridades de saúde.
C — Incorreta. O esquema atual não prevê reforço universal a cada dez anos; segue recomendações por idade, histórico vacinal e risco.`,

        'prev-inep-018': `Resposta correta — C. A paciente relata melhora importante com higiene do sono, auriculoterapia e prática tradicional, tendo apenas um episódio isolado recente. Cabe acolher sua experiência, verificar dose, preparo, possíveis efeitos adversos e interações, manter acompanhamento e orientar retorno se houver piora ou sintomas novos.

Distratores:
A — Incorreta. Suspensão automática desconsidera resposta, autonomia e contexto cultural; a ausência de evidência robusta exige cautela e monitorização, não proibição sem avaliação de risco.
B — Incorreta. Um episódio isolado não justifica iniciar zolpidem nem encaminhar automaticamente à psiquiatria.
D — Incorreta. Auriculoterapia e acupuntura integram práticas reconhecidas e podem ser ofertadas na atenção primária por profissionais capacitados, não exclusivamente em centros especializados.`,

        'prev-inep-019': `Resposta correta — B. Conselhos de Saúde são permanentes e deliberativos. Sua composição assegura paridade dos usuários: 50% de representantes de usuários, 25% de trabalhadores da saúde e 25% de representantes do governo e prestadores de serviços.

Distratores:
A — Incorreta. A proporção está correta, mas o conselho não é meramente consultivo; suas decisões são deliberativas e sujeitas à homologação conforme a lei.
C — Incorreta. Divisão igual em três terços viola a paridade reservada aos usuários.
D — Incorreta. Erra tanto o caráter, que é deliberativo, quanto a composição proporcional.`,

        'prev-inep-020': `Resposta correta — D. O Subsistema de Atenção à Saúde Indígena integra o SUS e requer adequações organizacionais para concretizar universalidade, equidade, descentralização, participação comunitária e controle social, respeitando especificidades epidemiológicas, culturais e territoriais dos povos indígenas.

Distratores:
A — Incorreta. Os DSEI não constituem sistema concorrente; são unidades organizacionais do subsistema integrado ao SUS.
B — Incorreta. Distritos sanitários indígenas são definidos por critérios territoriais, populacionais, culturais e de acesso e não precisam coincidir com limites municipais ou estaduais.
C — Incorreta. A coordenação da saúde indígena está no Ministério da Saúde, atualmente por meio da Sesai, e não subordinada à Funai.`,

        'prev-inep-021': `Resposta correta — B. A Política Nacional de Saúde Integral LGBT prevê enfrentamento da discriminação e inclusão das necessidades dessa população nas redes do SUS, inclusive ações específicas de saúde mental, prevenção do uso prejudicial de álcool e outras drogas e cuidado pela Rede de Atenção Psicossocial.

Distratores:
A — Incorreta. O uso do nome social é direito do usuário e dever dos serviços, não escolha facultativa de cada UBS.
C — Incorreta. Mulheres lésbicas e bissexuais enfrentam barreiras e historicamente apresentam menor acesso ao rastreamento do câncer do colo uterino.
D — Incorreta. O processo transexualizador é regulamentado e ofertado no SUS; a afirmação de inexistência de legislação é falsa.`,

        'prev-inep-022': `Resposta correta — C. A atenção primária deve manter o cuidado clínico e a continuidade dos medicamentos, articular-se com o CAPS e abordar obesidade, provável diabetes e dislipidemia. O seguimento multiprofissional e o controle metabólico são essenciais, inclusive porque alguns antipsicóticos aumentam risco cardiometabólico.

Distratores:
A — Incorreta. Interromper renovação pode causar descompensação psiquiátrica e rompe a continuidade sem justificativa.
B — Incorreta. Sulfonilureia não deve ser iniciada automaticamente com uma única glicemia sem confirmação, avaliação clínica e escolha individualizada.
D — Incorreta. Transferir toda a responsabilidade ao CAPS fragmenta o cuidado; a UBS pode renovar, investigar e manejar risco metabólico de forma compartilhada.`,

        'prev-inep-023': `Resposta correta — D. Violência física e ameaça com arma exigem cuidado das lesões, escuta protegida, avaliação de risco, plano de segurança, abordagem multiprofissional e notificação compulsória no Sinan. A notificação sanitária não depende de autorização da vítima e não equivale automaticamente a boletim de ocorrência.

Distratores:
A — Incorreta. Atendimento psiquiátrico não é obrigatório e pode patologizar a vítima; Conselho Tutelar deve ser acionado conforme avaliação de risco das crianças, não como única resposta à violência contra a mulher.
B — Incorreta. A mulher deve receber orientação e apoio para acessar a rede policial se desejar ou se houver hipótese legal específica, mas o médico não emite boletim nem deve impor o deslocamento à delegacia.
C — Incorreta. Revelar o caso a vizinhos e familiares sem consentimento pode aumentar o risco e viola confidencialidade; a rede deve ser mobilizada de modo seguro e pactuado.`,

        'prev-inep-024': `Resposta correta — C. Dermatose desencadeada pelo uso ocupacional de máscara deve ser investigada como doença relacionada ao trabalho. É necessário avaliar adaptação ou troca segura do equipamento, tratamento, notificação quando aplicável e afastamento temporário ou permanente conforme gravidade, nexo e possibilidade de controle da exposição.

Distratores:
A — Incorreta. Corticoide tópico pode ser indicado conforme o quadro, mas antibiótico não é obrigatório sem infecção secundária, e evitar o agente é parte central.
B — Incorreta. Teste de contato auxilia dermatite alérgica, porém requer indicação, materiais e interpretação especializada e não está amplamente disponível na APS.
D — Incorreta. Dermatoses ocupacionais sofrem subdiagnóstico e subnotificação; afirmar baixa subnotificação é incorreto.`,

        'prev-inep-025': `Resposta correta — A. A perspectiva sindêmica mostra que doenças interagem biologicamente e socialmente e que seus efeitos são amplificados por pobreza, racismo, trabalho precário, moradia inadequada e acesso desigual ao cuidado. As diferenças de morbidade e mortalidade por Covid-19 refletem essas desigualdades estruturais.

Distratores:
B — Incorreta. Suspender cuidado de doenças crônicas amplia descompensações e compõe os efeitos indiretos da sindemia.
C — Incorreta. Epidemias interagentes tendem a aumentar vulnerabilidade, incidência, gravidade e dano social, não a reduzi-los.
D — Incorreta. Leitos são necessários, mas resposta exclusivamente curativa não enfrenta determinantes sociais nem mantém cuidado das demais condições.`,

        'prev-inep-026': `Resposta correta — D. O médico de família pode atuar em clínica de operadora ou consultório particular aplicando os atributos da APS: primeiro contato, longitudinalidade, integralidade e coordenação do cuidado, inclusive articulando especialistas e outros pontos da rede suplementar.

Distratores:
A — Incorreta. O modelo tradicional centrado em especialistas focais fragmenta cuidado e não garante longitudinalidade por si só.
B — Incorreta. Atenção domiciliar também pode ser organizada de forma autônoma ou em diferentes arranjos; não é exclusiva de operadoras.
C — Incorreta. Contrato com o proprietário do estabelecimento não assegura vínculo longitudinal nem coordenação; esses atributos dependem do modelo assistencial.`,

        'prev-inep-027': `Resposta correta — A. O Conselho Local aproxima usuários, trabalhadores e gestão da unidade e é espaço adequado para discutir problemas concretos do território e do processo de trabalho, como agenda, fluxo de exames e acesso a medicamentos, encaminhando demandas que ultrapassem a governabilidade local.

Distratores:
B — Incorreta. O Conselho Municipal é permanente e deliberativo, não consultivo, e não é o espaço mais próximo para organizar detalhes operacionais da agenda de uma única unidade.
C — Incorreta. Excluir usuários da composição impede participação comunitária, e a solução não deve ser apenas apresentada posteriormente.
D — Incorreta. “Núcleo de Saúde Coletiva” não corresponde ao mecanismo institucional de controle social indicado, e implantação de equipe depende de gestão e critérios de dimensionamento.`,

        'prev-inep-028': `Resposta correta — B. A charge, conforme o gabarito oficial, representa barreiras de acesso expressas por longas filas, relacionadas a capacidade instalada, financiamento e gestão insuficientes. Acessibilidade inclui conseguir chegar ao serviço e obter atendimento oportuno.

Distratores:
A — Incorreta. Descentralização trata da distribuição de responsabilidades e serviços, e hierarquização da organização por níveis; nenhuma explica diretamente a fila retratada.
C — Incorreta. Integralidade e resolubilidade dizem respeito à amplitude e capacidade de resolver necessidades, não principalmente ao tempo de espera.
D — Incorreta. Universalidade garante direito de todos e coordenação integra percursos assistenciais; posição em fila deve seguir acolhimento e risco, não grau genérico de doença.

Validação visual pendente — a charge original não está incorporada ao banco e deve ser conferida no PDF-fonte antes da publicação definitiva deste comentário.`,

        'prev-inep-029': `Resposta correta — A. Com cobertura de APS de apenas 70% e predomínio de doenças crônicas e causas externas, a prioridade é ampliar cobertura, fortalecer a Estratégia Saúde da Família e integrar atenção secundária, elevando prevenção, acompanhamento longitudinal e resolubilidade.

Distratores:
B — Incorreta. Manter cobertura insuficiente e priorizar urgência não enfrenta acompanhamento crônico nem lacunas de acesso territorial.
C — Incorreta. Expandir o modelo tradicional fragmentado em vez da ESF contraria a estratégia prioritária de reorganização da APS.
D — Incorreta. Ambulâncias podem ser necessárias, mas remoção para outros municípios não substitui expansão e qualificação da rede local.`,

        'prev-inep-030': `Resposta correta — C. Genograma e ecomapa servem para compreender vínculos, redes, conflitos, sobrecarga do cuidador e recursos disponíveis. A equipe deve reconhecer a dinâmica familiar, identificar disfuncionalidades e construir intervenções precoces e compartilhadas para restaurar equilíbrio e apoiar paciente e esposa.

Distratores:
A — Incorreta. Projeto terapêutico singular é dinâmico, revisável e construído com paciente, família e equipe, não um roteiro definitivo entregue à esposa.
B — Incorreta. Não há base para internação compulsória da filha, que exige critérios clínicos e legais próprios; isso não é instrumento para aliviar problemas familiares.
D — Incorreta. Cuidados paliativos podem ocorrer em casa e na rede; internação não é automática e deve considerar desejos, sintomas, suporte e necessidade clínica.

Validação visual pendente — o genograma e o ecomapa originais não estão incorporados ao banco e devem ser conferidos no PDF-fonte antes da publicação definitiva deste comentário.`,

        'prev-inep-031': `Resposta correta — B. A esposa relata sobrecarga concreta como cuidadora e deve ser avaliada em espaço próprio, preservando liberdade para falar sobre estresse, exaustão e necessidades. Instrumentos como a escala de Zarit podem complementar a entrevista e orientar apoio à cuidadora e reorganização do plano familiar.

Distratores:
A — Incorreta. Há perda de atividades instrumentais, mas preservação do autocuidado; isso não caracteriza demência avançada, e o MEEM deve ser interpretado conforme escolaridade e contexto.
C — Incorreta. A escala de Snellen avalia acuidade visual, não autonomia ou funcionalidade global.
D — Incorreta. O índice de Katz avalia atividades básicas, já descritas como preservadas; para pagamento, compras e celular seria mais apropriada uma escala de atividades instrumentais, como Lawton-Brody.`,

        'prev-inep-032': `Resposta correta — B. Territorialização deve formar microáreas coerentes segundo população, vulnerabilidade, ambiente, circulação e necessidades sanitárias, mesmo que tenham tamanhos geográficos diferentes. Homogeneidade social e epidemiológica facilita planejamento e atuação dos agentes comunitários.

Distratores:
A — Incorreta. Distribuir famílias vulneráveis igualmente pode fragmentar territórios e ignorar relações comunitárias e barreiras geográficas.
C — Incorreta. Mapas impressos são úteis, mas não permitem análise e atualização tão potente quanto geoprocessamento; a alternativa inverte essa relação.
D — Incorreta. DATASUS e IBGE são fontes secundárias, não dados primários, e podem não ter desagregação suficiente para microáreas em rápida transformação.`,

        'prev-inep-033': `Resposta correta — B. Universalidade amplia acesso das diferentes parcelas da população às ações materno-infantis; equidade direciona esforços adicionais aos grupos mais pobres e vulneráveis, reduzindo diferenças entre quintis de riqueza. Esses princípios explicam mais diretamente expansão de cobertura e convergência dos indicadores.

Distratores:
A — Incorreta. Integralidade é relevante, mas o gráfico estratificado por riqueza destaca sobretudo expansão universal e redução de desigualdades.
C — Incorreta. Regionalização organiza serviços territorialmente, mas não é o elemento central da comparação por quintis econômicos.
D — Incorreta. Participação e hierarquização são princípios organizativos importantes, porém não explicam diretamente a evolução distributiva mostrada.

Validação visual pendente — o gráfico original deve ser conferido no PDF-fonte antes da publicação definitiva deste comentário.`,

        'prev-inep-034': `Resposta correta — A. Definir prioridade de visitas segundo necessidade, risco e vulnerabilidade é aplicação de equidade: pessoas em situações diferentes recebem intensidade de cuidado proporcional às suas necessidades, em vez de distribuição idêntica de recursos.

Distratores:
B — Incorreta. Autonomia refere-se à capacidade de escolha e decisão da pessoa, não ao critério de priorização de visitas.
C — Incorreta. Integralidade orienta abordagem ampla das necessidades, mas o núcleo da questão é distribuir atenção de forma desigual conforme risco.
D — Incorreta. Universalidade garante direito de acesso a todos, sem definir quem necessita de maior prioridade.`,

        'prev-inep-035': `Resposta correta — A. Após alta por insuficiência cardíaca, a APS deve revisar rapidamente o plano terapêutico, reconciliar medicamentos, avaliar sintomas, função renal e adesão e coordenar os demais pontos da rede conforme evolução. A APS permanece responsável pela longitudinalidade e aciona especialidades quando a complexidade exigir.

Distratores:
B — Incorreta. Especialista pode ser necessário, mas colocar a APS apenas como executora fragmenta cuidado e reduz sua função coordenadora.
C — Incorreta. Aguardar estabilização pelo ambulatório de especialidades posterga seguimento precoce e transfere indevidamente a coordenação.
D — Incorreta. Visita domiciliar pode ser útil conforme necessidade, porém encaminhamento especializado não deve preceder revisão e organização do cuidado pela APS nem suspender seu acompanhamento.`,

        'prev-inep-036': `Resposta correta — D. O Conselho Municipal de Saúde pode deliberar sobre prioridades e propostas de política e financiamento. Uma vez aprovada e incorporada aos instrumentos de gestão, cabe à Secretaria Municipal viabilizar tecnicamente e executar o plano, com acompanhamento e fiscalização do conselho.

Distratores:
A — Incorreta. O conselho possui competência para discutir e propor ações; a prerrogativa não é exclusiva do Executivo.
B — Incorreta. Usuários e suas organizações ocupam metade da representação dos conselhos e podem participar do debate.
C — Incorreta. O conselho também aprecia aspectos orçamentários e fiscaliza recursos; não está limitado a aprovar capacitações sem gastos.`,

        'prev-inep-037': `Resposta correta — D. A Lei nº 8.142/1990 condiciona transferências regulares, entre outros requisitos, à existência de Fundo de Saúde e Conselho de Saúde com composição paritária, além de plano de saúde, relatórios de gestão, contrapartida orçamentária e comissão para plano de carreira.

Distratores:
A — Incorreta. Comissão de carreira é requisito, mas prontuário eletrônico não integra a lista legal.
B — Incorreta. Conselho é requisito, porém plano diretor de regionalização não substitui os instrumentos expressamente previstos nessa lei.
C — Incorreta. Plano de saúde é requisito, mas central de marcação de consultas e exames não é.`,

        'prev-inep-038': `Resposta correta — B. No modelo de APS da saúde suplementar, a médica atua como gestora e coordenadora clínica do cuidado. Deve acolher preferências, avaliar risco e necessidade e usar diretrizes baseadas em evidências para indicar exames e encaminhamentos, garantindo acesso oportuno quando necessário.

Distratores:
A — Incorreta. Coordenação não significa restringir por custo; decisões devem se basear em necessidade, benefício e segurança.
C — Incorreta. Autonomia não obriga a autorizar procedimentos sem indicação; requer decisão informada e compartilhada.
D — Incorreta. A regulação pode apoiar, mas responsabilidade clínica e coordenação não devem ser integralmente delegadas.

Revisão do sinalizador — o registro está marcado como dependente de imagem, mas o enunciado e as alternativas contêm informação suficiente e não fazem referência a elemento visual.`,

        'prev-inep-039': `Resposta correta — C. No Tratamento Fora do Domicílio, acompanhante pode ser custeado quando sua necessidade estiver justificada pelo médico no laudo próprio e autorizada conforme o processo administrativo. A idade adulta, isoladamente, não invalida indicação clínica de acompanhamento.

Distratores:
A — Incorreta. A indicação não se restringe a menoridade, idade avançada ou incapacidade comprovada por perícia; o laudo médico fundamentado pode justificar.
B — Incorreta. O custeio decorre da autorização do TFD e da necessidade indicada, não de teste econômico separado para alimentação e pernoite.
D — Incorreta. A distância inferior a 200 km não exclui TFD; o critério central é indisponibilidade do tratamento no município e referência assistencial adequada.`,

        'prev-inep-040': `Resposta correta — B. Mudança aguda ou subaguda de comportamento, confusão, autonegligência, falta de alimentos, medicamentos vencidos e doenças descompensadas exigem avaliação rápida no domicílio. Médico e ACS juntos integram exame clínico, cognição, segurança, contexto social e rede de apoio para construir plano interdisciplinar.

Distratores:
A — Incorreta. Consulta prioritária é melhor que aguardar, mas a paciente falta às consultas e o contexto domiciliar é determinante; a visita conjunta é mais resolutiva.
C — Incorreta. Delegar apenas orientações à ACS e esperar 30 dias é inseguro diante de possível delirium, demência, hipoglicemia, infecção ou outra causa clínica.
D — Incorreta. A visita médica é adequada, mas separar rigidamente tarefas reduz interdisciplinaridade e limita participação da ACS na avaliação e planejamento.`,

        'prev-inep-041': `Resposta correta — A. O modelo inicial é tradicional, com agenda inteira preenchida antecipadamente. Reservar uma proporção fixa de vagas para demanda aguda caracteriza carve-out. Seu risco é dimensionar mal a reserva: vagas agudas podem ficar ociosas em alguns dias e faltar em outros, mantendo encaixes e desperdício.

Distratores:
B — Incorreta. A mudança parte do modelo tradicional, não de carve-out, e não institui acesso aberto.
C — Incorreta. Acesso avançado busca atender a demanda do dia sem separar cotas fixas entre urgência e rotina; a proposta mantém essa divisão.
D — Incorreta. Também parte do modelo errado e atribui ao acesso avançado consequências que não definem necessariamente esse sistema.`,

        'prev-inep-042': `Resposta correta — A. DSEI é território sanitário definido por critérios demográficos, geográficos, culturais e de acesso dos povos indígenas, podendo atravessar limites estaduais e municipais. Já equipes ribeirinhas integram a organização municipal da APS e atuam dentro do território administrativo correspondente.

Distratores:
B — Incorreta. Demarcação não elimina conflitos fundiários, invasões ou vulnerabilidades vividas por povos indígenas.
C — Incorreta. Populações ribeirinhas também podem apresentar insegurança alimentar e desnutrição; disponibilidade aparente de recursos naturais não garante nutrição adequada.
D — Incorreta. Práticas tradicionais persistem em ambas as populações e devem dialogar com o cuidado biomédico; não houve substituição completa entre ribeirinhos.`,

        'prev-inep-043': `Resposta correta — C. O cuidado deve reconhecer e valorizar práticas tradicionais, promover uso seguro e racional de medicamentos e construir integração entre saber técnico e conhecimentos comunitários. Participação local e competência cultural são essenciais tanto para povos indígenas quanto ribeirinhos.

Distratores:
A — Incorreta. Profissionais locais agregam conhecimento cultural, mas também precisam de formação técnica e educação permanente; um saber não substitui o outro.
B — Incorreta. Separar rigidamente medicina ocidental para ribeirinhos e práticas tradicionais para indígenas cria desigualdade e impede cuidado integrado.
D — Incorreta. Padronizar ignora diferenças culturais, territoriais e de organização social, mesmo quando há desafios geográficos semelhantes.`,

        'prev-inep-044': `Resposta correta — B. Documentos de saúde da população cigana/Romani reconhecem sofrimento mental, depressão e suicídio relacionados a racismo, discriminação, violência e barreiras de acesso, com vulnerabilidades particulares entre mulheres. O planejamento deve evitar generalizações e ser construído com cada comunidade.

Distratores:
A — Incorreta. Não se pode universalizar papéis de gênero nem restringir autonomia das mulheres com base em estereótipos culturais.
C — Incorreta. Lideranças e formas de interlocução variam entre grupos; afirmar liderança feminina em toda comunidade é generalização.
D — Incorreta. Muitos povos e famílias são sedentários ou semissedentários; nomadismo não define a maioria de forma homogênea.`,

        'prev-inep-045': `Resposta correta — A. Taquipneia, febre alta, letargia e sinais de desidratação indicam doença grave e necessidade de internação. A equipe deve explicar e obter autorização por meio de intérprete, respeitando prática tradicional inofensiva — os emplastros — desde que não interfira no tratamento biomédico necessário.

Distratores:
B — Incorreta. Retirar obrigatoriamente uma prática sem evidência de dano desrespeita autonomia e competência intercultural.
C — Incorreta. Tratamento domiciliar isolado e retorno em sete dias são inseguros diante de sinais de gravidade.
D — Incorreta. Antibiótico domiciliar não oferece monitorização e suporte necessários para criança letárgica, febril e desidratada.`,

        'prev-inep-046': `Resposta correta — D. Educação Popular em Saúde começa pela problematização da realidade vivida. Perguntas abertas permitem compreender valores, experiências e significados atribuídos à violência e transformam adolescentes em participantes da construção das ações seguintes.

Distratores:
A — Incorreta. A dinâmica pode integrar, mas palestra pronta mantém transmissão vertical e não parte do saber do grupo.
B — Incorreta. Recursos audiovisuais são ferramentas, porém adaptar linguagem não basta se o conteúdo continuar definido unilateralmente.
C — Incorreta. Especialista respondendo perguntas concentra autoridade e não garante produção dialogada de conhecimento.`,

        'prev-inep-047': `Resposta correta — B. Uso racional exige compreender o perfil epidemiológico e as expectativas locais, revisar registros e discutir com conselheiros e lideranças as razões clínicas e socioculturais das condutas. O diálogo pode reconstruir confiança sem prescrever medicamentos desnecessários.

Distratores:
A — Incorreta. Atender toda solicitação não fortalece relação terapêutica e expõe a eventos adversos e resistência antimicrobiana.
C — Incorreta. Suspender atendimento como pressão viola continuidade, acesso e responsabilidade sanitária.
D — Incorreta. Prescrever nas próximas visitas apenas para responder à insatisfação abandona critérios clínicos e o uso racional.`,

        'prev-inep-048': `Resposta correta — C. Dados da sala de situação devem retornar ao território e orientar ação compartilhada. Apresentá-los ao conselho local e às lideranças permite interpretar causas, definir prioridades e mobilizar busca ativa, prevenção da sífilis, pré-natal e acompanhamento de hipertensão.

Distratores:
A — Incorreta. Restringir informação à equipe reduz transparência e participação social.
B — Incorreta. Boletim no mural é comunicação passiva e não transforma, por si só, dados em planejamento coletivo.
D — Incorreta. A UBS tem governabilidade para iniciar ações e não deve esperar orientação do conselho municipal para problemas locais urgentes.`,

        'prev-inep-049': `Resposta correta — C. O IVCF-20 rastreia vulnerabilidade clínico-funcional em domínios como idade, autopercepção, atividades de vida diária, cognição, humor, mobilidade, comunicação e comorbidades; inclui pergunta sobre quedas no último ano.

Distratores:
A — Incorreta. Renda familiar não compõe diretamente a pontuação do IVCF-20.
B — Incorreta. A Avaliação Geriátrica Ampla é priorizada conforme resultado e contexto; não é obrigatória após todo rastreio.
D — Incorreta. O IVCF-20 identifica risco e orienta necessidade de avaliação complementar, mas não substitui a AGA em idosos frágeis ou casos duvidosos.`,

        'prev-inep-050': `Resposta correta — A. A paciente pontua por polifarmácia — uso de cinco ou mais medicamentos —, queixa cognitiva recente e dependência em atividade instrumental de vida diária, pois não consegue realizar limpeza da casa. Esses itens integram os domínios do IVCF-20.

Distratores:
B — Incorreta. Aos 73 anos, a faixa etária isolada não pontua como nas idades mais avançadas; hipertensão mal controlada e uso de bengala não correspondem, nesses termos, aos itens escolhidos.
C — Incorreta. Fratura antiga, internação prévia e simples presença de doenças crônicas não são somadas dessa forma no instrumento.
D — Incorreta. Cirurgia ortopédica e IMC não são itens diretos, e o histórico de queda precisa obedecer ao período e critério específicos do IVCF-20.`,

        'prev-inep-051': `Resposta correta — D. Zolpidem e amitriptilina são potencialmente inapropriados em idosos com sonolência, tontura e instabilidade, pois aumentam sedação, comprometimento cognitivo, hipotensão, quedas e fraturas. A retirada deve ser progressiva e acompanhada, com priorização de medidas não farmacológicas para insônia.

Distratores:
A — Incorreta. Trocar zolpidem por outro sedativo mantém o risco; apenas reduzir amitriptilina pode ser insuficiente.
B — Incorreta. Ausência de descompensação laboratorial não elimina eventos adversos medicamentosos já manifestos.
C — Incorreta. Suspender ambos os anti-hipertensivos sem avaliação pode descontrolar a pressão; o problema mais evidente são os psicotrópicos sedativos.`,

        'prev-inep-052': `Resposta correta — C. Há queda ortostática importante da pressão, polifarmácia e uso de fármacos que favorecem hipotensão, bradicardia ou hipoglicemia. A primeira medida é revisar indicações, doses e horários, reduzir medicamentos de maior risco e avaliar hidratação, glicemia, ambiente e sarcopenia.

Distratores:
A — Incorreta. Avaliação visual pode integrar prevenção de quedas, mas não enfrenta a hipotensão postural documentada.
B — Incorreta. Disautonomia não é a hipótese inicial antes de revisar causas farmacológicas e clínicas frequentes.
D — Incorreta. Fludrocortisona não deve ser adicionada antes de remover fatores causais e pode agravar hipertensão, edema e distúrbios eletrolíticos.`,

        'prev-inep-053': `Resposta correta — C. Manter idoso restrito sem indicação e deixá-lo com fraldas sujas e dor por falta de pessoal caracteriza omissão de cuidados essenciais. Trata-se de negligência e violência institucional, que deve ser interrompida, documentada e comunicada aos órgãos competentes.

Distratores:
A — Incorreta. A escolha de uma ILPI não é violência por si só; o problema é a qualidade e segurança do cuidado prestado.
B — Incorreta. Demência ou agitação não justificam contenção indiscriminada nem abandono de higiene, conforto e dignidade.
D — Incorreta. Não há relato de apropriação ou desvio de bens, portanto violência patrimonial não é a classificação principal.`,

        'prev-inep-054': `Resposta correta — A. Com doença progressiva sem possibilidade de tratamento modificador, a prioridade é conforto, controle de dor com opioide e decisão compartilhada com a família sobre não realizar ressuscitação sem benefício. Limitação de suporte desproporcional não significa abandono: cuidados paliativos ativos devem continuar.

Distratores:
B — Incorreta. Sedação e intubação não proporcionam automaticamente conforto e são invasivas; sedação paliativa só se indica para sintomas refratários, sem exigir intubação.
C — Incorreta. Quimioterapia empírica sem perspectiva de benefício acrescenta toxicidade e sofrimento.
D — Incorreta. Nova cirurgia deve ter benefício proporcional; no cenário descrito, a equipe considera esgotadas as possibilidades terapêuticas e não há indicação de reoperação.`,

        'prev-inep-055': `Resposta correta — C. Prevenção secundária busca evitar recorrência ou progressão em pessoa que já apresentou a doença. Após AVC, aspirina reduz o risco de novo evento isquêmico quando indicada, juntamente com controle dos fatores de risco.

Distratores:
A — Incorreta. Prevenção primária ocorre antes do primeiro evento clínico.
B — Incorreta. Prevenção terciária reduz incapacidade, reabilita e limita sequelas de doença já estabelecida; não é a classificação principal da antiagregação para recorrência.
D — Incorreta. Prevenção quaternária evita intervenções excessivas e iatrogenias.`,

        'prev-inep-056': `Resposta correta — B. Cardiologia ambulatorial corresponde à atenção secundária especializada. Como o paciente já sofreu infarto, a conduta destinada a impedir novo evento é prevenção secundária.

Distratores:
A — Incorreta. O nível do especialista não é atenção primária, embora a prevenção seja secundária.
C — Incorreta. Atenção terciária envolve serviços de alta complexidade, e prevenção terciária se concentra em reduzir incapacidade e sequelas.
D — Incorreta. “Quaternário” não é nível assistencial usual nessa classificação; prevenção terciária também não descreve o objetivo principal do encaminhamento.`,

        'prev-inep-057': `Resposta correta — A. Poluição atmosférica aumenta risco cardiovascular, metabólico e respiratório e pode agravar condições cutâneas. Reduzir entrada de ar externo nos horários de tráfego ou poluição mais intensa é medida individual possível, embora políticas coletivas de mobilidade e qualidade do ar sejam fundamentais.

Distratores:
B — Incorreta. Expansão de monocultura para biocombustível pode causar concentração fundiária, exposição a agrotóxicos e insegurança alimentar; os benefícios não são automáticos.
C — Incorreta. Ondas de calor podem causar desidratação e hipotensão, especialmente em idosos; aumentar anti-hipertensivos sem avaliação é perigoso.
D — Incorreta. Educação climática adequada à idade é recomendável e pode fortalecer preparo e participação, com suporte para eventual ansiedade.`,

        'prev-inep-058': `Resposta correta — B. Letalidade é a proporção de óbitos entre os casos da própria doença: óbitos divididos por casos, multiplicados por 100. Segundo o gabarito, o câncer de estômago apresenta a maior razão entre óbitos e casos na tabela.

Distratores:
A — Incorreta. Embora câncer colorretal possa ter maior número absoluto, sua proporção de óbitos entre casos é menor na tabela.
C — Incorreta. Câncer de mama não possui a maior razão óbitos/casos apresentada.
D — Incorreta. Câncer de próstata também tem letalidade proporcional inferior à do câncer de estômago.

Validação visual pendente — os números da tabela não estão incorporados ao banco e devem ser conferidos no PDF-fonte antes da publicação definitiva deste comentário.`,

        'prev-inep-059': `Resposta correta — A. Sífilis congênita é evitável por pré-natal, diagnóstico e tratamento materno e do parceiro; desnutrição por ações de promoção, proteção e cuidado; e asfixia ao nascer por assistência adequada à gestação, parto e recém-nascido.

Distratores:
B — Incorreta. Sarampo e desnutrição são evitáveis, mas malformações congênitas do sistema nervoso nem sempre são evitáveis pelos serviços de saúde.
C — Incorreta. Tuberculose e anemias carenciais são evitáveis, porém síndrome da morte súbita do lactente não integra de modo geral o mesmo grupo de causas reduzíveis pelas ações listadas.
D — Incorreta. Rubéola congênita e traumatismo de parto são evitáveis, mas doenças desmielinizantes não compõem esse conjunto de causas infantis evitáveis.`,

        'prev-inep-060': `Resposta correta — B. Morte materna indireta decorre de doença preexistente ou surgida na gestação que não é causada diretamente por mecanismo obstétrico, mas é agravada pelos efeitos fisiológicos da gravidez. A Covid-19 causando insuficiência respiratória no puerpério enquadra-se nessa categoria.

Distratores:
A — Incorreta. Morte direta resulta de complicações obstétricas da gestação, parto ou puerpério, ou de intervenções e omissões relacionadas.
C — Incorreta. A causa e a relação temporal estão identificadas; não se trata apenas de morte materna suspeita.
D — Incorreta. O óbito ocorreu no primeiro dia puerperal e a doença foi agravada no contexto da gestação, portanto entra na definição de morte materna.`,

        'prev-inep-061': `Resposta correta — D. A mulher morreu durante a gestação por doença agravada nesse contexto, portanto integra a mortalidade materna. O recém-nascido apresentou sinais de vida — batimentos e movimentos respiratórios — independentemente do peso ou duração da sobrevida; é nascimento vivo, entra no denominador de natalidade e seu óbito antes de sete dias é neonatal precoce e infantil.

Distratores:
A — Incorreta. Acerta a classificação da criança, mas exclui indevidamente a morte materna.
B — Incorreta. Uma criança com qualquer sinal de vida após a expulsão é nascimento vivo e deve ser contabilizada na natalidade.
C — Incorreta. Erra a exclusão materna e também a exclusão do nascimento vivo da natalidade.`,

        'prev-inep-062': `Resposta correta — B. O diagrama de controle compara a incidência observada com o canal endêmico calculado a partir de anos anteriores. Segundo o gabarito, a curva de 2025 permaneceu dentro dos limites esperados no território, caracterizando nível endêmico, ainda que outros distritos do município tenham apresentado surtos.

Distratores:
A — Incorreta. Número absoluto de casos, sem população e limites do canal, não define epidemia.
C — Incorreta. As semanas 3 a 9 não ultrapassam o limite superior do diagrama segundo a interpretação oficial.
D — Incorreta. Surto em 13 distritos não prova que este território específico tenha ultrapassado seu nível esperado.

Validação visual pendente — o diagrama de controle não está incorporado ao banco e deve ser conferido no PDF-fonte antes da publicação definitiva deste comentário.`,

        'prev-inep-063': `Resposta correta — C. Poeira de cimento atingindo trabalhadores e moradores exige ação integrada de vigilância epidemiológica, sanitária, ambiental e em saúde do trabalhador. A equipe deve acionar esses setores, compartilhar o diagnóstico territorial e apoiar inspeção, controle da fonte, notificação e acompanhamento dos expostos.

Distratores:
A — Incorreta. A notificação de agravo relacionado ao trabalho pode partir da suspeita; não se deve aguardar nexo causal definitivo.
B — Incorreta. Máscaras para moradores não controlam adequadamente emissão ambiental, e evitar articulação externa impede enfrentar a fonte.
D — Incorreta. Mapear atividades é útil, mas exames ocupacionais são responsabilidade do empregador e não substituem vigilância ambiental e sanitária.`,

        'prev-inep-064': `Resposta correta — C. Trata-se de morte natural assistida, sem trauma recente ou suspeita externa, e o médico de família que conhecia o caso pode emitir a declaração. A broncopneumonia é apresentada como evento que iniciou a cadeia fatal no contexto da DPOC; hipertensão e sequelas do AVC entram como condições contribuintes relevantes.

Distratores:
A — Incorreta. Não há indicação de IML, e AVC antigo não é antecedente causal direto da exacerbação respiratória descrita.
B — Incorreta. Sepse não foi clinicamente estabelecida e o caso não exige legista por ser morte natural conhecida.
D — Incorreta. Parada cardiorrespiratória é mecanismo terminal inespecífico e não deve ser registrada como causa básica.`,

        'prev-inep-065': `Resposta correta — B. A queda é causa externa e iniciou a cadeia que culminou no óbito, mesmo após cirurgia e longa internação com sepse. Mortes decorrentes de causa externa devem ser encaminhadas ao Instituto Médico Legal para investigação e emissão da declaração.

Distratores:
A — Incorreta. Chefia ou coordenação da UTI não elimina a obrigação de encaminhar morte por causa externa ao IML.
C — Incorreta. SVO investiga mortes naturais sem diagnóstico esclarecido, não óbitos decorrentes de trauma.
D — Incorreta. O plantonista poderia declarar morte natural bem estabelecida, mas não deve emitir a declaração final de uma cadeia iniciada por acidente.`,

        'prev-inep-066': `Resposta correta — D. Queda de andaime é acidente de trabalho e causa externa: o corpo deve ir ao IML para declaração de óbito. O serviço de saúde deve notificar o acidente de trabalho grave/fatal no Sinan, e a empresa deve emitir a Comunicação de Acidente de Trabalho imediatamente.

Distratores:
A — Incorreta. O médico assistente não deve emitir a declaração final de morte por causa externa, e declaração de óbito não substitui notificação ao Sinan.
B — Incorreta. O IML emite a declaração, mas não assume automaticamente as obrigações do serviço de notificar nem da empresa de registrar CAT.
C — Incorreta. Sinan e CAT têm finalidades e responsáveis distintos; um documento não substitui o outro.`,

        'prev-inep-067': `Resposta correta — D. A paciente contempla mudança, mas sente dificuldade, demonstrando ambivalência. Entrevista motivacional explora discrepâncias entre comportamento atual e valores ou objetivos pessoais, evoca razões próprias para mudar e respeita autonomia, sem confronto.

Distratores:
A — Incorreta. Pressionar gera resistência e contraria o espírito colaborativo da entrevista motivacional.
B — Incorreta. Confrontar e debater tende a fortalecer argumentos pela manutenção do comportamento.
C — Incorreta. Informar riscos pode ser útil com permissão, mas foco unilateral nos malefícios não explora motivação intrínseca.`,

        'prev-inep-068': `Resposta correta — B. A Pesquisa Nacional de Saúde seleciona amostra da população e mede exposições, condições e desfechos em um determinado período, estimando prevalências. Esse desenho é transversal, ainda que pesquisas semelhantes sejam repetidas em anos diferentes.

Distratores:
A — Incorreta. Coorte acompanha os mesmos indivíduos ao longo do tempo para observar incidência.
C — Incorreta. Não há intervenção atribuída pelo pesquisador nem comparação experimental.
D — Incorreta. Caso-controle parte de pessoas com e sem um desfecho e investiga exposições anteriores.`,

        'prev-inep-069': `Resposta correta — A. Para estimar rapidamente a frequência de doenças crônicas e fatores associados em adultos do território, mede-se exposição e condição de saúde em um recorte temporal único. É um estudo transversal, adequado para prevalência e planejamento, embora não estabeleça temporalidade causal.

Distratores:
B — Incorreta. Estudo experimental exige intervenção e alocação de grupos, desnecessárias para levantamento situacional.
C — Incorreta. Caso-controle é eficiente para desfechos raros e compara exposições passadas, não estima diretamente prevalência populacional.
D — Incorreta. Coorte prospectiva demanda seguimento e mais tempo, contrariando a necessidade de diagnóstico rápido.`,

        'prev-inep-070': `Resposta correta — C. Uma coorte acompanha grupos definidos pela exposição ocupacional e compara a incidência de dor lombar ao longo do tempo. Isso estabelece temporalidade entre atividade laboral e desfecho e permite calcular riscos.

Distratores:
A — Incorreta. Estudo ecológico compara dados agregados de grupos e tem maior risco de falácia ecológica para inferências individuais.
B — Incorreta. Transversal mede exposição e dor simultaneamente, sendo limitado para demonstrar qual ocorreu primeiro.
D — Incorreta. Não seria ético nem viável randomizar trabalhadores a exposições potencialmente nocivas.`,

        'prev-inep-071': `Resposta correta — A. Em coorte, risco relativo compara incidência nos expostos com a dos não expostos. RR de 0,6 significa que o grupo classificado como sedentário apresentou 60% do risco do grupo não sedentário, associação aparentemente protetora. Esse resultado inesperado exige conferir classificação, confundimento, viés e intervalo de confiança antes de inferir causalidade.

Distratores:
B — Incorreta. Coorte mede incidência e permite avaliar associação, não apenas prevalência.
C — Incorreta. Maior risco exigiria RR acima de 1.
D — Incorreta. RR é uma medida apropriada em coortes porque a incidência pode ser calculada nos grupos.`,

        'prev-inep-072': `Resposta correta — D. Sensibilidade é a proporção de pessoas doentes corretamente identificadas: verdadeiros positivos divididos por todos os doentes. Como 98 de 100 pessoas com hanseníase tiveram resultado positivo, a sensibilidade é 98%.

Distratores:
A — Incorreta. 90% corresponde à especificidade informada: verdadeiros negativos entre não doentes.
B — Incorreta. Esse valor não resulta da fórmula de sensibilidade e mistura componentes da tabela.
C — Incorreta. A sensibilidade usa denominador de 100 doentes, portanto não requer ajuste para 97,8%.`,

        'prev-inep-073': `Resposta correta — B. Especificidade de 65% implica 35% de falsos-positivos entre não doentes. Em população de baixa prevalência, não doentes são maioria; assim, mesmo uma fração moderada de positivos falsos pode superar os verdadeiros positivos e reduzir o valor preditivo positivo.

Distratores:
A — Incorreta. Sensibilidade alta reduz falsos-negativos, mas não garante que um resultado positivo seja verdadeiro; isso depende também de especificidade e prevalência.
C — Incorreta. Sensibilidade de 92% implica proporção relativamente baixa de falsos-negativos.
D — Incorreta. Alta sensibilidade favorece triagem e exclusão quando o resultado é negativo; confirmação exige alta especificidade e contexto clínico.`,

        'prev-inep-074': `Resposta correta — A. Em 1.000 pessoas, 100 teriam hanseníase e 80 testariam positivo; entre 900 sem doença, 20% — 180 — seriam falsos-positivos. O valor preditivo positivo é 80 dividido por 260, aproximadamente 30,8%, arredondado para 31%.

Distratores:
B — Incorreta. 97% não decorre dos dados e seria incompatível com baixa especificidade e baixa prevalência.
C — Incorreta. 69% corresponde aproximadamente ao complemento do valor preditivo positivo, não à probabilidade solicitada.
D — Incorreta. 80% é a sensibilidade, isto é, positividade entre doentes, e não probabilidade de doença entre resultados positivos.`,

        'prev-inep-075': `Resposta correta — C. É permitido discutir casos clínicos em grupo eletrônico exclusivo de médicos, desde que haja finalidade profissional, segurança e manutenção estrita do sigilo, evitando identificação desnecessária e circulação externa do conteúdo.

Distratores:
A — Incorreta. Grupo recreativo não é ambiente apropriado para compartilhar dados clínicos, ainda que composto por médicos.
B — Incorreta. Autorização não é apresentada como requisito absoluto para discussão assistencial confidencial entre médicos envolvidos; permanecem deveres de necessidade e minimização.
D — Incorreta. A discussão não é proibida de modo absoluto quando confidencialidade e finalidade assistencial são preservadas.

Revisão do sinalizador — embora o registro esteja marcado como visual, a imagem tomográfica não é necessária para responder à questão ética.`,

        'prev-inep-076': `Resposta correta — B. A paciente lúcida e capaz mantém autonomia, privacidade e sigilo, independentemente da idade ou presença da filha. Sangramento pós-menopausa exige investigação de patologia endometrial, e ultrassonografia transvaginal é exame inicial apropriado para avaliar espessura endometrial.

Distratores:
A — Incorreta. Informar primeiro à filha viola autonomia e sigilo, e sangramento pós-menopausa não pode ser dispensado de investigação.
C — Incorreta. Idade não torna responsável obrigatório; CA 125 não é exame inicial de rastreio para esse quadro.
D — Incorreta. Comunicação familiar depende de consentimento, e conduta expectante é inadequada diante de possível câncer endometrial.`,

        'prev-inep-077': `Resposta correta — B. Adulto capaz pode recusar transfusão por convicção religiosa após receber informação clara sobre riscos, benefícios e alternativas. A equipe deve documentar a decisão e buscar estratégias aceitáveis, como eritropoietina quando indicada, ferro, controle de perdas e outras medidas de conservação sanguínea.

Distratores:
A — Incorreta. Adiar para tentar convencer em situação grave desrespeita decisão atual e piora planejamento seguro.
C — Incorreta. Esclarecer é dever, mas insistência coercitiva após decisão informada viola autonomia.
D — Incorreta. Comitê de ética pode apoiar conflitos complexos, mas não deve ser usado para pressionar paciente capaz.`,

        'prev-inep-078': `Resposta correta — A. Autonomia assegura à paciente capaz o direito de aceitar ou recusar intervenções após informação adequada. A preferência da filha não substitui a decisão da própria paciente, e o médico deve respeitar a recusa de tratamento experimental.

Distratores:
B — Incorreta. Beneficência orienta promover benefício, mas não autoriza impor tratamento contra vontade válida.
C — Incorreta. Não maleficência também apoia evitar dano, porém o elemento explicitamente testado é a decisão da paciente.
D — Incorreta. Justiça distributiva trata da distribuição equitativa de recursos, não da escolha individual.`,

        'prev-inep-079': `Resposta correta — A. Há urgência contraceptiva, vínculo prévio e impossibilidade de consulta presencial. O médico pode orientar e prescrever por meio remoto após colher informações suficientes, avaliar contraindicações e registrar o atendimento, indicando procura presencial se houver sinais de risco ou dúvidas diagnósticas.

Distratores:
B — Incorreta. Exame físico presencial não é requisito absoluto para contracepção de emergência e a demora reduziria eficácia.
C — Incorreta. Separar orientação de prescrição sem fundamento impediria acesso oportuno ao tratamento indicado.
D — Incorreta. A comunicação remota pode configurar atendimento documentado, e a prescrição eletrônica é possível quando atende às normas; exame presencial não é sempre obrigatório.`,

        'prev-inep-080': `Resposta correta — D. Diagnóstico de Alzheimer não equivale automaticamente a incapacidade civil. O médico deve avaliar capacidade decisória específica, conversar com a paciente de forma adaptada, registrar achados e orientar família sobre procuração, tomada de decisão apoiada ou curatela judicial conforme o caso. Não deve produzir declaração secreta de incapacidade sem avaliação.

Distratores:
A — Incorreta. A demanda administrativa possui dimensão clínica legítima e pode receber relatório baseado em avaliação, com finalidade e limites claros.
B — Incorreta. Relatório apenas diagnóstico pode ser insuficiente e ainda não responde eticamente à necessidade de avaliar capacidade funcional e decisória.
C — Incorreta. O médico não decreta interdição ou incapacidade civil e não deve ocultar o documento de paciente capaz de compreender; curatela é decisão judicial.`,

        'prev-inep-081': `Resposta correta — B. No Brasil, a retirada de órgãos de pessoa falecida depende de autorização familiar, mesmo quando o indivíduo manifestou em vida desejo de doar. Sendo o esposo familiar legitimado e estando contrário, a doação não pode prosseguir sem seu consentimento nos termos da legislação vigente.

Distratores:
A — Incorreta. Rim único com função preservada não contraindica automaticamente doação de outros órgãos e tecidos; cada órgão é avaliado individualmente.
C — Incorreta. O poder público não pode substituir coercitivamente a autorização familiar exigida pela lei.
D — Incorreta. Anti-HBs positivo com HBsAg negativo sugere imunidade sem infecção ativa e não impossibilita, por si só, a doação.`,

        'prev-inep-082': `Resposta correta — D. Adolescente com capacidade de compreender possui direito à confidencialidade em questões de saúde sexual e reprodutiva. Sem risco relevante, violência ou outra exceção legal, o médico deve manter sigilo e estimular diálogo seguro com familiares sem impor revelação.

Distratores:
A — Incorreta. A presença da paciente não autoriza divulgar informações contra sua vontade.
B — Incorreta. Menoridade não elimina automaticamente confidencialidade e autonomia progressiva.
C — Incorreta. A mãe não necessita de autorização judicial como regra, mas tampouco tem acesso automático a conteúdo confidencial de adolescente capaz.`,

        'prev-inep-083': `Resposta correta — B. A adolescente deve ter espaço de atendimento individual, receber informação adequada e participar ativamente das decisões segundo sua capacidade. Sem indicação obstétrica de cesárea, seu desejo de tentar parto vaginal deve ser respeitado e incorporado ao planejamento compartilhado.

Distratores:
A — Incorreta. Idade inferior a 16 anos não autoriza indicação cirúrgica sem necessidade nem elimina autonomia progressiva em saúde.
C — Incorreta. Apoio especializado pode ser solicitado, mas não se deve suspender pré-natal nem condicionar cuidado a consenso familiar.
D — Incorreta. Preferência da responsável não substitui indicação clínica e vontade informada da gestante.`,

        'prev-inep-085': `Resposta correta — C. Prontuário reúne documentos técnicos e administrativos relacionados à assistência. A instituição ou profissional tem dever de guarda, conservação, disponibilidade e sigilo, enquanto as informações pertencem ao paciente, que possui direito de acesso e cópia, ressalvadas hipóteses legais.

Distratores:
A — Incorreta. Documentos do prontuário não se limitam a procedimentos administrativos e as informações não são propriedade exclusiva do hospital.
B — Incorreta. Acerta a abrangência e guarda, mas erra ao atribuir propriedade integral ao hospital.
D — Incorreta. O prontuário não contém somente atos médicos; inclui registros de outros profissionais e documentos administrativos assistenciais.`,

        'prev-inep-086': `Resposta correta — C. Paciente instável no pós-operatório precisava ser reconhecida, estabilizada e transportada por serviço adequado, com suporte e comunicação entre equipes. Pedir à família que a levasse, chegando sem vida, configura omissão de cuidado necessário e, portanto, negligência.

Distratores:
A — Incorreta. Realizar cirurgia em clínica privada não é imprudência por si só se houver estrutura e indicação adequadas.
B — Incorreta. Não há evidência de falha técnica na execução que permita afirmar imperícia.
D — Incorreta. Transferência sem estabilização e sem transporte assistido não é conduta diligente.`,

        'prev-inep-087': `Resposta correta — C. Discussão síncrona entre profissionais, sem presença da paciente, para esclarecer dúvidas e apoiar conduta caracteriza teleconsultoria. A médica da APS permanece responsável pelo cuidado, usando a orientação especializada como suporte.

Distratores:
A — Incorreta. Telediagnóstico envolve emissão ou apoio diagnóstico a partir de dados ou exames, não apenas discussão clínica educacional-assistencial.
B — Incorreta. Teleconsulta é atendimento remoto entre profissional e paciente; a adolescente não participou.
D — Incorreta. Teleinterconsulta costuma envolver troca assistencial integrada e compartilhamento formal entre profissionais responsáveis; o especialista externo sem integração presta consultoria.`,

        'prev-inep-088': `Resposta correta — B. Infecção por Zika e malformações fetais, inclusive microcefalia, não constituem isoladamente hipótese legal geral de interrupção da gestação no Brasil. Sem risco de vida materna, gravidez resultante de violência sexual ou anencefalia nos termos reconhecidos, o procedimento não é autorizado pelo quadro descrito, independentemente da idade gestacional.

Distratores:
A — Incorreta. Solicitação escrita da gestante não cria hipótese legal autônoma.
C — Incorreta. O impedimento não decorre especificamente de ter ultrapassado 20 semanas, mas da ausência de hipótese legal no caso.
D — Incorreta. Confirmação por dois especialistas não transforma microcefalia por Zika em indicação legal equivalente à anencefalia.`,

        'prev-inep-089': `Resposta correta — A. Em emergência com risco de morte de criança, a recusa dos responsáveis não deve impedir tratamento indispensável. O dever de proteção e o melhor interesse do menor autorizam a transfusão indicada, documentando circunstâncias e comunicando autoridades quando isso puder ocorrer sem atraso prejudicial.

Distratores:
B — Incorreta. Autonomia dos responsáveis não abrange recusar intervenção salvadora em nome de menor quando há risco grave e imediato.
C — Incorreta. A equipe não pode abandonar ou condicionar atendimento emergencial à concordância familiar.
D — Incorreta. Autoridades podem ser acionadas, mas não se deve aguardar decisão externa se a demora ameaçar a vida.`,

        'prev-inep-091': `Resposta correta — A. Após informação clara sobre benefícios e riscos das vias de parto e ausência de indicação obstétrica, a gestante capaz pode manter o pedido de cesariana. Para reduzir morbidade neonatal associada à prematuridade iatrogênica, o procedimento eletivo por desejo materno deve ser programado a partir de 39 semanas, com registro da decisão compartilhada.

Distratores:
B — Incorreta. O profissional deve recomendar a via mais segura, mas não declarar a escolha impossível quando a paciente mantém decisão informada dentro das normas.
C — Incorreta. Não é necessário esperar 41 semanas; o marco recomendado para cesariana eletiva é 39 semanas.
D — Incorreta. Realizá-la imediatamente com 38 semanas, sem indicação, aumenta risco respiratório neonatal e não é exigência da autonomia.`,

        'prev-inep-092': `Resposta correta — C. O médico deve acolher sem julgamento, manter sigilo, esclarecer as hipóteses legais vigentes e fornecer informações de redução de danos, incluindo sinais de hemorragia, infecção, dor intensa ou instabilidade que exigem atendimento urgente. O cuidado não pode ser negado mesmo após aborto inseguro.

Distratores:
A — Incorreta. Pré-natal e entrega voluntária podem ser discutidos se a paciente desejar, mas impor esse caminho ignora sua demanda e direito à informação.
B — Incorreta. No caso descrito não há hipótese legal explicitada que assegure aborto, e comunicação baseada em medo e exagero de riscos não é aconselhamento neutro.
D — Incorreta. O médico não tem obrigação geral de registrar boletim de ocorrência por relato ou suspeita de aborto e deve preservar confidencialidade dentro dos limites legais.`,

        'prev-inep-093': `Resposta correta — C. O ACS pode verificar realização da triagem neonatal e vacinas ao nascer, identificar sinais de violência durante visitas e acompanhar condicionalidades e acesso a programas sociais. Esses dados orientam busca ativa e encaminhamento à equipe.

Distratores:
A — Incorreta. Avaliar coto e aleitamento é possível, mas “abaixo do percentil +3” não caracteriza indicação nutricional e orientação especializada deve ser compartilhada com a equipe.
B — Incorreta. ACS não deve orientar uso de medicamentos por conta própria após vacinação.
D — Incorreta. Aferição técnica de peso e comprimento com registro clínico exige equipamento, técnica e atribuição organizada pela equipe; ausência de cicatriz de BCG não indica revacinação ou encaminhamento automático.`,

        'prev-inep-094': `Resposta correta — B. Equimoses em diferentes estágios, distribuídas em face e membros, associadas a evasão ao falar, levantam suspeita de violência física. Suspeita ou confirmação de maus-tratos contra criança ou adolescente deve ser notificada e comunicada ao Conselho Tutelar, sem aguardar prova definitiva.

Distratores:
A — Incorreta. O quadro sugere doença meningocócica e exige emergência e notificação epidemiológica, sem sinal específico de violência no relato.
C — Incorreta. Febre, dor retro-orbitária, sangramento e petéquias sugerem dengue grave ou outra doença infecciosa, não necessariamente maus-tratos.
D — Incorreta. Equimoses acompanhadas de febre, sudorese, perda de peso e linfonodomegalias sugerem doença hematológica; deve-se investigar clinicamente antes de atribuir a violência sem outros indícios.`,

        'pediatria-inep-001': `Resposta correta — C. Telarca associada a pubarca aos 7 anos indica início puberal precoce, decorrente da ativação antecipada do eixo hipotálamo-hipófise-gonadal: a secreção pulsátil de GnRH estimula LH e FSH, que ativam os ovários e aumentam a produção de estrogênios. O estrogênio explica o desenvolvimento mamário, enquanto a pubarca pode acompanhar a adrenarca. A associação dos dois sinais exige avaliação de puberdade precoce central e acompanhamento da velocidade de crescimento.

Distratores:
A — Incorreta. O aumento isolado de andrógenos suprarrenais causa principalmente pubarca, odor axilar e acne, mas não explica adequadamente o tecido mamário estrogênio-dependente.
B — Incorreta. Aromatização periférica pode produzir estrogênios em situações específicas, porém não é o mecanismo fisiológico habitual da puberdade com telarca e pubarca.
D — Incorreta. Hipersensibilidade aos níveis basais poderia produzir manifestação periférica isolada, mas não representa o mecanismo fisiológico típico da progressão puberal descrita.`,

        'pediatria-inep-002': `Resposta correta — A. O uso regular de terapia antirretroviral e a manutenção de carga viral indetectável reduzem acentuadamente o risco de transmissão vertical. Com carga viral menor que 1.000 cópias/mL ou indetectável, a via de parto é definida por critérios obstétricos; cesariana eletiva não é obrigatória apenas pelo HIV. No Brasil, a amamentação permanece contraindicada para pessoas vivendo com HIV, mesmo com supressão viral, e deve ser garantida fórmula infantil ao recém-nascido exposto.

Distratores:
B — Incorreta. Carga viral indetectável não mantém risco elevado e, nessa situação, não impõe cesariana eletiva de rotina.
C — Incorreta. Embora o risco seja baixo, a via vaginal não precisa ser priorizada independentemente da situação obstétrica e a amamentação não é autorizada pelas diretrizes brasileiras.
D — Incorreta. A primeira parte é adequada, mas o desejo materno não torna a amamentação indicada; permanece a contraindicação no protocolo nacional.`,

        'pediatria-inep-003': `Resposta correta — A. Aos 4 anos, episódios noturnos de perda urinária ainda podem refletir maturação incompleta do controle esfincteriano. O diagnóstico formal de enurese costuma ser reservado para crianças com pelo menos 5 anos, idade em que se espera continência noturna. A ausência de sintomas diurnos, infecção, alterações neurológicas ou exame físico anormal reforça um processo de desenvolvimento normal.

Distratores:
B — Incorreta. Bexiga neurogênica costuma associar-se a doença neurológica, alterações do exame, retenção, incontinência diurna ou infecções urinárias recorrentes.
C — Incorreta. Enurese secundária pressupõe retorno da perda urinária após período de pelo menos seis meses de continência; além disso, a criança ainda não atingiu a idade diagnóstica habitual.
D — Incorreta. Bexiga hiperativa é marcada por urgência, aumento da frequência e frequentemente incontinência diurna, manifestações negadas no caso.`,

        'pediatria-inep-004': `Resposta correta — D. Febre alta persistente, exantema, conjuntivite não purulenta, sintomas gastrointestinais e choque com sinais de disfunção miocárdica, surgidos cerca de quatro semanas após covid-19, formam o quadro típico de síndrome inflamatória multissistêmica pediátrica temporalmente associada ao SARS-CoV-2. A hipotensão, o enchimento capilar prolongado e o ritmo de galope indicam apresentação grave com envolvimento cardiovascular.

Distratores:
A — Incorreta. Kawasaki pode causar febre e alterações mucocutâneas, mas a relação pós-covid, o acometimento gastrointestinal intenso, o choque e a disfunção cardíaca favorecem fortemente SIM-P.
B — Incorreta. Pneumonia bacteriana não explica de forma integrada exantema, conjuntivite, dor abdominal e choque cardiogênico pós-infeccioso; tampouco há descrição de achados pulmonares focais.
C — Incorreta. Apendicite pode causar febre, vômitos e dor abdominal, mas não justifica conjuntivite, exantema, hipoxemia e disfunção cardiovascular multissistêmica; a descompressão brusca também é negativa.`,

        'pediatria-inep-005': `Resposta correta — B. Lactente no primeiro episódio de sibilância, precedido por coriza e tosse, com febre baixa e esforço respiratório, apresenta bronquiolite viral aguda. O vírus sincicial respiratório é o principal agente etiológico, responsável pela maior parte dos casos em crianças menores de 2 anos.

Distratores:
A — Incorreta. Streptococcus pneumoniae é causa importante de pneumonia bacteriana, que tende a produzir febre mais alta e achados focais, não o padrão difuso de bronquiolite.
C — Incorreta. Mycoplasma pneumoniae é mais associado a pneumonia atípica em escolares e adolescentes, sendo improvável em um lactente de 8 meses com primeiro episódio de sibilância.
D — Incorreta. Haemophilus influenzae pode causar infecções bacterianas invasivas e pneumonia, mas não é o agente mais provável desse quadro viral típico de bronquiolite.`,

        'pediatria-inep-006': `Resposta correta — B. A adolescente deve ter espaço de atendimento individual e confidencial, receber informações compreensíveis e participar efetivamente das decisões sobre seu corpo e sua assistência obstétrica. Na ausência de indicação clínica de cesariana, seu desejo de tentar parto vaginal deve ser respeitado; a menoridade, isoladamente, não elimina sua autonomia progressiva nem autoriza a mãe a impor a via de parto.

Distratores:
A — Incorreta. Ter menos de 16 anos não torna automática a indicação de cesariana nem apaga a capacidade da adolescente de compreender e participar da decisão em saúde.
C — Incorreta. Apoio especializado pode ser solicitado quando necessário, mas o pré-natal não deve ser postergado até haver consenso familiar.
D — Incorreta. Preservar vínculo familiar não justifica realizar procedimento cirúrgico eletivo contra a vontade informada da paciente e sem indicação obstétrica.`,

        'pediatria-inep-007': `Resposta correta — D. Febre alta, tosse, coriza, conjuntivite e exantema iniciado na face, associados às manchas de Koplik na mucosa oral, caracterizam suspeita de sarampo. O tratamento é de suporte e, conforme o Ministério da Saúde, deve incluir vitamina A por via oral em crianças com suspeita da doença, para reduzir mortalidade e complicações. Para maiores de 12 meses, são indicadas duas doses de 200.000 UI, uma no dia da suspeita e outra no dia seguinte.

Distratores:
A — Incorreta. A conjuntivite do sarampo é viral e integra o pródromo; colírio antibiótico não trata a doença na ausência de infecção bacteriana ocular.
B — Incorreta. Antibiótico oral profilático não é indicado no sarampo sem evidência de complicação bacteriana secundária.
C — Incorreta. Oseltamivir atua contra influenza, enquanto o conjunto clínico e as manchas de Koplik apontam para sarampo.`,

        'pediatria-inep-008': `Resposta correta — D. A criança tem diarreia aguda sem sinais de desidratação ou gravidade e deve receber manejo domiciliar: solução de reidratação oral após as evacuações, maior oferta de líquidos, manutenção do aleitamento materno e da alimentação habitual, além de orientação sobre sinais de alarme. O afastamento temporário da creche reduz transmissão enquanto persistir a diarreia.

Distratores:
A — Incorreta. Antibiótico não é indicado rotineiramente em diarreia aquosa aguda sem sangue, febre ou suspeita etiológica específica, e dieta obstipante não é recomendada.
B — Incorreta. Restrição de lactose e dieta restritiva não são necessárias de rotina; manter a criança sintomática na creche favorece transmissão.
C — Incorreta. Criança ativa e hidratada não necessita internação nem hidratação venosa; a via oral é suficiente e preferível.`,

        'pediatria-inep-009': `Resposta correta — C. A criança apresenta pneumonia comunitária grave: hipoxemia importante, saturação de 88%, esforço respiratório e consolidação lobar. Precisa de oxigênio, monitorização, antibiótico parenteral e internação; entre as alternativas, ceftriaxona intravenosa com cuidado intensivo é a conduta inicial compatível com a gravidade.

Distratores:
A — Incorreta. Tratamento oral e alta são inadequados diante de hipoxemia e desconforto respiratório grave.
B — Incorreta. Azitromicina isolada não oferece cobertura inicial apropriada para a pneumonia bacteriana típica grave nessa faixa etária.
D — Incorreta. Além de a via oral ser inadequada neste momento, a saturação de 88% e os sinais de insuficiência respiratória demandam suporte e vigilância mais intensivos que uma conduta de enfermaria sem estabilização.`,

        'pediatria-inep-010': `Resposta correta — B. Crianças com síndrome de Down apresentam padrão próprio de crescimento desde o período fetal e devem ter peso, comprimento/estatura, perímetro cefálico e índice de massa corporal acompanhados em curvas específicas para a síndrome desde o nascimento. Isso permite distinguir o padrão esperado da condição de desvios que exigem investigação.

Distratores:
A — Incorreta. Curvas gerais da OMS, usadas isoladamente, não representam adequadamente o padrão pôndero-estatural característico da síndrome de Down.
C — Incorreta. Não existe simples fator de correção de peso e comprimento que transforme as curvas da OMS em curvas específicas para a síndrome.
D — Incorreta. O acompanhamento específico não deve começar apenas aos 2 anos; há curvas destinadas também ao período de 0 a 2 anos.`,

        'pediatria-inep-012': `Resposta correta — D. Artrite aguda migratória de grandes articulações iniciada algumas semanas após faringite, acompanhada de febre e novo sopro cardíaco, sugere febre reumática aguda com cardite. O agente desencadeante é o Streptococcus pyogenes, estreptococo beta-hemolítico do grupo A, e a erradicação do foco faríngeo é feita com penicilina G benzatina, além do tratamento das manifestações e início da profilaxia secundária conforme o caso.

Distratores:
A — Incorreta. Borrelia burgdorferi causa doença de Lyme, geralmente associada a exposição a carrapato e possível eritema migratório; não é a explicação mais provável para artrite migratória pós-faringite com cardite.
B — Incorreta. Staphylococcus aureus é causa relevante de artrite séptica, que costuma ser monoarticular, persistente e intensamente inflamatória, e não migratória entre várias articulações.
C — Incorreta. Treponema pallidum causa sífilis; apesar de também ser tratado com penicilina benzatina em determinados estágios, não produz este padrão clássico pós-estreptocócico.`,

        'pediatria-inep-013': `Resposta correta — D. O recém-nascido apresenta choque com má perfusão, taquicardia e pulsos débeis, associado a foco infeccioso evidente no coto umbilical. Onfalite pode evoluir rapidamente para sepse neonatal e choque distributivo. A abordagem exige suporte ventilatório, acesso vascular, expansão cautelosa com cristaloide isotônico e reavaliação frequente, antibióticos intravenosos precoces de amplo espectro e fármacos vasoativos se a perfusão não responder adequadamente.

Distratores:
A — Incorreta. Cardiopatia congênita crítica deve ser lembrada no neonato cianótico, mas o halo de hiperemia e edema umbilical aponta para infecção; prostaglandina E1 é indicada quando há suspeita de lesão ducto-dependente, não como tratamento rotineiro deste quadro séptico.
B — Incorreta. Choque neurogênico é excepcional neste contexto e costuma relacionar-se a lesão neurológica ou medular, sem explicar o foco infeccioso umbilical; corticoide não é a intervenção central.
C — Incorreta. Choque obstrutivo por pneumotórax hipertensivo exigiria achados como assimetria ventilatória e deterioração compatível com pressão intratorácica elevada; a diminuição bilateral do murmúrio não basta para indicar descompressão e não explica a onfalite.`,

        'pediatria-inep-014': `Resposta correta — C. Aos 12 anos, com esquema infantil completo até os 8 anos, a adolescente deve receber HPV, meningocócica ACWY e completar a febre amarela porque recebeu a primeira dose aos 9 meses, mas não o reforço previsto aos 4 anos no calendário considerado pela questão. HPV é recomendado nessa faixa etária e a MenACWY é indicada entre 11 e 14 anos.

Distratores:
A — Incorreta. Não há indicação de reforço rotineiro de hepatite B para quem completou adequadamente o esquema, e a dT depende do intervalo desde a última dose do componente tetânico, não sendo a combinação esperada no caso.
B — Incorreta. Hepatite B e tríplice viral não precisam ser repetidas se o esquema anterior está completo; além disso, a alternativa omite HPV e MenACWY.
D — Incorreta. A tríplice viral já está completa segundo o enunciado, enquanto a adolescente ainda tem indicação de HPV.`,

        'pediatria-inep-015': `Resposta correta — A. A adolescente apresenta progressão puberal normal: telarca aos 10 anos, Tanner M3/P3 aos 13 anos e leucorreia fisiológica transparente e sem odor, que costuma preceder a menarca. Ausência de menstruação aos 13 anos e poucos dias, com caracteres sexuais secundários em evolução, ainda não caracteriza amenorreia primária; deve-se orientar e acompanhar.

Distratores:
B — Incorreta. Hipogonadismo hipogonadotrófico costuma cursar com ausência ou interrupção do desenvolvimento puberal, o que não ocorre em Tanner M3/P3.
C — Incorreta. Investigação laboratorial, cariótipo e imagem são reservados para critérios de atraso puberal ou amenorreia primária, não presentes neste momento.
D — Incorreta. Terapia estrogênica não é indicada quando há produção estrogênica endógena e evolução puberal espontânea normal.

Revisão do sinalizador — o enunciado contém todos os dados clínicos necessários; não há imagem, gráfico ou tabela indispensável para resolver esta questão.`,

        'pediatria-inep-016': `Resposta correta — C. A criança está em bom estado geral, sem sinais de gravidade ou foco bacteriano ao exame. Um antecedente isolado de convulsão febril simples não indica antibioticoterapia, exames de rotina, internação ou observação hospitalar a cada novo episódio febril. A conduta é oferecer antitérmico para conforto, orientar hidratação, sinais de alarme e explicar aos responsáveis como proteger a criança e procurar atendimento se ocorrer nova convulsão.

Distratores:
A — Incorreta. Não há achados de doença febril muito grave nem evidência de infecção bacteriana que justifique antibiótico empírico.
B — Incorreta. Em criança sem sinais de alarme, exames laboratoriais não são necessários apenas para descobrir a etiologia de febre aguda com dois dias de evolução.
D — Incorreta. Convulsão febril simples prévia aumenta a possibilidade de recorrência, mas não obriga encaminhamento ou permanência hospitalar enquanto a febre cede.`,

        'pediatria-inep-017': `Resposta correta — D, conforme o gabarito oficial da prova. O vírus sincicial respiratório pode causar infecção de vias aéreas inferiores e pneumonia também em crianças maiores e adolescentes, com tosse e infiltrados radiológicos. Esta é, contudo, uma questão controversa: a evolução arrastada, a tosse seca, a idade de 16 anos e os estertores bilaterais são classicamente muito sugestivos de pneumonia atípica por Mycoplasma pneumoniae; por isso, o comentário deve deixar explícito que D corresponde à resposta adotada pela banca, não à única interpretação clínica possível.

Distratores:
A — Incorreta. Chlamydia trachomatis causa tipicamente pneumonia afebril em lactentes jovens, muitas vezes com história de conjuntivite, e não este quadro em adolescente.
B — Incorreta. Segundo o gabarito oficial, embora seja o principal diagnóstico diferencial e a alternativa clinicamente mais intuitiva para pneumonia atípica em adolescente.
C — Incorreta. Streptococcus pneumoniae costuma produzir pneumonia típica, com início mais abrupto, febre, toxemia e consolidação lobar, em vez da apresentação respiratória arrastada descrita.

Validação visual pendente — a radiografia mencionada não foi incorporada ao enunciado do aplicativo e deve ser conferida no PDF-fonte antes da publicação definitiva deste comentário, especialmente porque pode conter o elemento usado pela banca para favorecer o VSR.`,

        'pediatria-inep-018': `Resposta correta — A. Diarreia aquosa profusa com aspecto de “água de arroz”, desidratação grave, ausência de dor abdominal relevante, ocorrência de casos semelhantes e exposição a água sem tratamento é característica de cólera por Vibrio cholerae. A prioridade imediata é corrigir rapidamente a desidratação, além de coletar amostra e acionar a vigilância conforme o protocolo epidemiológico.

Distratores:
B — Incorreta. Rotavírus pode causar diarreia aquosa e desidratação em crianças, frequentemente com vômitos e febre, mas não é a associação epidemiológica e clínica clássica de fezes em água de arroz em surto ligado a saneamento precário.
C — Incorreta. Giardíase costuma causar diarreia mais prolongada, distensão, má absorção e fezes gordurosas e fétidas, não perda aquosa maciça e choque em dois dias.
D — Incorreta. Toxinfecção alimentar pode provocar surto agudo, porém o padrão de grande volume, água de arroz e exposição hídrica exige investigação prioritária de cólera.`,

        'pediatria-inep-019': `Resposta correta — D. Na desidratação moderada, a terapia de reidratação oral deve ser mantida sob observação. Quando vômitos repetidos impedem a ingestão eficaz, a solução pode ser administrada por sonda nasogástrica em gastróclise, preservando a reidratação enteral. A resposta clínica deve ser reavaliada continuamente e a via intravenosa reservada para falha da estratégia enteral ou evolução para gravidade.

Distratores:
A — Incorreta. Antiemético não é a medida principal para substituir uma TRO que está falhando por vômitos repetidos em lactente; é necessário garantir a oferta efetiva da solução e reavaliar.
B — Incorreta. A hidratação intravenosa não é automaticamente a próxima etapa enquanto a criança mantém desidratação moderada e ainda há possibilidade de TRO por sonda.
C — Incorreta. Oferecer volumes menores e mais frequentes ajuda em vômitos ocasionais, mas cinco episódios na primeira hora indicam que a via oral espontânea não está funcionando de maneira adequada.`,

        'pediatria-inep-020': `Resposta correta — B. Fissuras e sangramento mamilar geralmente decorrem de pega ou posicionamento inadequados e não exigem suspensão do aleitamento. Deve-se observar e corrigir a pega, manter aleitamento materno exclusivo em livre demanda, oferecer a mama aos primeiros sinais de fome e prevenir ingurgitamento; também se avaliam causas adicionais de dor e sinais de infecção.

Distratores:
A — Incorreta. Interromper a amamentação e substituir por fórmula não trata a causa da fissura, pode reduzir a produção de leite e prejudicar o estabelecimento do aleitamento.
C — Incorreta. Aumentar o intervalo entre mamadas favorece ingurgitamento e piora da pega; compressas mornas indiscriminadas também não substituem a correção técnica.
D — Incorreta. Repouso da mama com fórmula não é necessário na maioria das fissuras e pode dificultar a retomada do aleitamento exclusivo.`,

        'pediatria-inep-021': `Resposta correta — C. A cintilografia renal estática com DMSA avalia o parênquima renal e é o exame de escolha para identificar áreas de dano cortical e cicatrizes após pielonefrite. Em lactente com infecções urinárias febris recorrentes, mesmo com ultrassonografia sem malformações, sua indicação pode ser considerada na investigação especializada.

Distratores:
A — Incorreta. A cistografia radioisotópica direta é voltada principalmente à pesquisa e ao acompanhamento de refluxo vesicoureteral, não à caracterização de cicatrizes corticais.
B — Incorreta. A cintilografia renal dinâmica avalia perfusão, drenagem e função relativa, sendo mais útil em suspeita de obstrução; não tem a mesma sensibilidade do DMSA estático para cicatriz renal.
D — Incorreta. Urografia excretora envolve maior exposição e foi amplamente substituída por ultrassonografia e estudos nucleares específicos, além de não ser o melhor exame para cicatrizes.`,

        'pediatria-inep-022': `Resposta correta — C. Em escolar com quadro subagudo, tosse seca, mal-estar, febre baixa, infiltrado difuso peribrônquico e ausência de melhora após 72 horas de amoxicilina, o diagnóstico mais provável é pneumonia atípica, frequentemente causada por Mycoplasma pneumoniae. A amoxicilina não atua contra micoplasma porque esse agente não possui parede celular.

Distratores:
A — Incorreta. Sibilância pode acompanhar a infecção, mas febre, estertores e infiltrado radiológico persistente não são explicados apenas por asma não controlada.
B — Incorreta. Tuberculose deve ser considerada conforme epidemiologia e contato, porém costuma ter evolução mais prolongada e outros achados clínicos ou radiológicos, não apenas quatro dias de sintomas.
D — Incorreta. Pneumonia aspirativa exige fator predisponente a broncoaspiração e frequentemente apresenta distribuição dependente da posição, ausentes no caso.`,

        'pediatria-inep-023': `Resposta correta — A. O surgimento de telarca antes dos 8 anos já levanta suspeita de puberdade precoce. Neste caso, o avanço da idade óssea em dois anos e a estatura elevada para a idade mostram efeito sistêmico de esteroides sexuais e favorecem puberdade precoce central, em vez de uma telarca isolada e não progressiva.

Distratores:
B — Incorreta. Diferença de dois anos entre idade óssea e cronológica é significativa e não apoia uma variante isolada benigna.
C — Incorreta. Embora a telarca seja o único caráter sexual secundário descrito, o avanço ósseo e o possível aumento da velocidade de crescimento indicam ativação puberal que precisa ser investigada.
D — Incorreta. A conclusão de puberdade precoce central é adequada, mas a justificativa é falsa: o estadiamento P1 informa ausência de pubarca.`,

        'pediatria-inep-024': `Resposta correta — A. A perda foi de 175 g sobre 3.500 g: 175 ÷ 3.500 × 100 = 5%. Perdas de peso de até cerca de 10% nos primeiros dias são fisiológicas, principalmente pela eliminação de líquido extracelular. Como a recém-nascida está hidratada, corada, com eliminações presentes e em aleitamento, o achado exige acompanhamento habitual, não complementação automática.

Distratores:
B — Incorreta. O cálculo não corresponde a 15%, e fórmula não é indicada apenas por uma perda fisiológica de 5%.
C — Incorreta. A porcentagem está calculada incorretamente; observação rigorosa por perda excessiva não se aplica aos dados descritos.
D — Incorreta. A perda de peso já pode ocorrer nas primeiras 24 horas e faz parte da adaptação neonatal.`,

        'pediatria-inep-025': `Resposta correta — A. Mudança abrupta de comportamento, retraimento, dor abdominal sem causa definida e notícia de imagens íntimas indicam suspeita de violência sexual. O profissional deve acolher sem interrogação repetitiva, registrar fatos e achados objetivamente no prontuário, fazer notificação compulsória no SINAN e comunicar imediatamente o Conselho Tutelar, articulando a rede de proteção e o seguimento multiprofissional. Não é necessário confirmar a violência para proteger e notificar.

Distratores:
B — Incorreta. A confirmação pericial não é pré-requisito para notificação; condicionar a proteção à produção de prova pode atrasar cuidados e expor a criança a nova violência.
C — Incorreta. Confrontar diretamente os responsáveis pode aumentar o risco, intimidar a criança e comprometer a investigação, especialmente quando o possível autor está no núcleo familiar.
D — Incorreta. O registro e a proteção social são pertinentes, mas a alternativa omite a notificação sanitária e a comunicação ao Conselho Tutelar e transforma indevidamente o papel clínico em simples denúncia policial.`,

        'pediatria-inep-026': `Resposta correta — D. A coleta ideal da triagem neonatal biológica ocorre entre 48 horas e o 5º dia de vida, mas uma oportunidade perdida não justifica deixar a criança sem avaliação. Coleta após o período neonatal é excepcional e pode ocorrer em situações como dificuldade de acesso ou negligência; aos 40 dias, deve-se providenciar avaliação e investigação conforme o programa local, explicando que a sensibilidade e a interpretação de alguns testes podem ser afetadas pela idade tardia.

Distratores:
A — Incorreta. O 28º dia delimita o período neonatal e o intervalo habitual do programa, mas não autoriza simplesmente negar avaliação à criança que perdeu a coleta.
B — Incorreta. O 3º ao 5º dia é a janela preferencial, não um limite absoluto depois do qual nenhuma providência pode ser tomada.
C — Incorreta. A coleta nas primeiras 48 horas pode produzir resultados inadequados para algumas doenças; a recomendação nacional começa após 48 horas e vai preferencialmente até o 5º dia.`,

        'pediatria-inep-027': `Resposta correta — B. Prematuros nascidos até 28 semanas e 6 dias e com menos de 1 ano durante a sazonalidade do VSR integram o grupo de maior risco contemplado pelo protocolo de palivizumabe. O lactente nasceu com 28 semanas e tem 5 meses, portanto deve ser avaliado para receber o anticorpo nas doses sazonais, além de higiene das mãos, redução de exposição a pessoas sintomáticas, ambiente sem fumaça e vacinação dos conviventes.

Distratores:
A — Incorreta. A vacina influenza é recomendada a partir dos 6 meses; aos 5 meses ela ainda não pode ser aplicada, embora os contatos devam estar vacinados.
C — Incorreta. Manter o calendário é essencial, mas encaminhamento rotineiro à infectologia não substitui a profilaxia específica indicada pelo grau de prematuridade.
D — Incorreta. Omalizumabe é um biológico para asma alérgica grave em faixas etárias específicas e não previne infecções respiratórias em prematuro.`,

        'pediatria-inep-028': `Resposta correta — C. O leite humano ordenhado pode permanecer congelado por até 15 dias, contando-se a validade a partir da primeira coleta armazenada no recipiente. A orientação deve incluir frasco limpo e esterilizado, identificação da data e descongelamento em banho-maria com água morna ou sob refrigeração, sem fervura.

Distratores:
A — Incorreta. Fervura e micro-ondas podem superaquecer de forma desigual e degradar componentes protetores do leite; não são métodos recomendados.
B — Incorreta. Antes da ordenha, a higiene central é lavar bem as mãos; não se recomenda aplicar álcool 70% nas mamas, pois pode irritar a pele e contaminar o processo.
D — Incorreta. Mamadeira pode favorecer confusão de bicos e desmame; para preservar o aleitamento, o leite ordenhado deve ser oferecido preferencialmente em copo, xícara ou colher conforme orientação.`,

        'pediatria-inep-029': `Resposta correta — D. Aos 6 meses inicia-se a alimentação complementar mantendo o leite materno em livre demanda. O esquema inicial inclui uma refeição principal completa e oferta de fruta, com alimentos in natura ou minimamente processados, água e progressão de consistência. Entre as alternativas, a combinação de refeição principal e fruta é a adequada.

Distratores:
A — Incorreta. Composto lácteo não é necessário para criança em aleitamento materno e não substitui uma refeição complementar diversificada.
B — Incorreta. A refeição deve ser baseada em alimentos in natura ou minimamente processados, mas a alternativa é incompleta e não contempla a oferta de fruta prevista no início da introdução.
C — Incorreta. Sucos não são recomendados; deve-se oferecer a fruta em pedaços ou amassada e água como bebida. Duas refeições principais costumam ser introduzidas na progressão entre 7 e 8 meses.`,

        'pediatria-inep-030': `Resposta correta — A. O adolescente com fibrose cística apresenta exacerbação pulmonar grave, com secreção purulenta, piora funcional, desconforto respiratório e hipoxemia de 87%. Precisa de internação, oxigênio, coleta de escarro antes do antibiótico quando isso não atrasar o tratamento e antibioticoterapia intravenosa de amplo espectro orientada pelo histórico microbiológico, frequentemente cobrindo Pseudomonas aeruginosa e Staphylococcus aureus.

Distratores:
B — Incorreta. Fisioterapia respiratória faz parte do manejo, mas corticoide sistêmico não é tratamento rotineiro de exacerbação infecciosa de fibrose cística sem outra indicação, e a alternativa omite antibiótico e oxigênio.
C — Incorreta. Saturação de 87%, dispneia crescente e limitação das atividades tornam inseguro o tratamento oral domiciliar.
D — Incorreta. Exames complementares podem auxiliar, mas não se deve adiar oxigenoterapia e antibiótico em paciente hipoxêmico com exacerbação grave para aguardar tomografia ou resultados laboratoriais.`,

        'pediatria-inep-031': `Resposta correta — C. IMC entre +2 e +3 escores Z em criança de 5 a 10 anos caracteriza obesidade. As placas hiperpigmentadas, espessas e aveludadas em pescoço e axilas são acantose nigricans, marcador clínico de resistência à insulina; a relação cintura/estatura muito elevada reforça adiposidade central. A intervenção inicial é familiar e multiprofissional, com alimentação adequada, atividade física, sono e redução de sedentarismo, além de avaliação de comorbidades metabólicas.

Distratores:
A — Incorreta. O IMC já está na faixa de obesidade, não apenas risco de sobrepeso; hipoglicemiante não deve ser iniciado automaticamente sem diagnóstico metabólico e avaliação apropriada.
B — Incorreta. A criança não é eutrófica, e o aspecto descrito é de acantose nigricans, não acrodermatite.
D — Incorreta. A classificação como sobrepeso e o diagnóstico de acrodermatite estão errados; encaminhamento pode ser necessário em situações selecionadas, mas não substitui a intervenção inicial.`,

        'pediatria-inep-032': `Resposta correta — B. Dieta vegana sem suplementação de vitamina B12 coloca o lactente em alto risco de deficiência, que pode causar anemia megaloblástica, irritabilidade, hipotonia e atraso ou regressão do desenvolvimento. Após os 6 meses, crianças em alimentação vegana também precisam de atenção especial ao ferro. Assim, devem ser iniciadas suplementações de vitamina B12 e ferro, com avaliação nutricional e do desenvolvimento; a fisioterapia auxilia o atraso motor já identificado.

Distratores:
A — Incorreta. Avaliação nutricional é pertinente, mas vitaminas A e C não corrigem a provável deficiência de B12 nem o risco de deficiência de ferro sugeridos pelo contexto.
C — Incorreta. Avaliação neurológica pode ser necessária conforme evolução, porém ácido fólico isolado ou associado sem corrigir ferro e sem priorizar B12 não é a melhor resposta; folato ainda pode mascarar a anemia enquanto o dano neurológico por B12 progride.
D — Incorreta. A dose habitual de vitamina D já é informada e aumentá-la não trata o quadro neurológico-hematológico provável; acompanhamento apenas rotineiro é insuficiente.

Validação visual pendente — o enunciado afirma que o hemograma apresenta “os seguintes achados”, mas os valores não foram importados. A tabela ou imagem do hemograma deve ser conferida no PDF-fonte antes da publicação definitiva deste comentário.`,

        'pediatria-inep-033': `Resposta correta — C. Bovinos são animais de produção e podem adquirir e transmitir raiva, especialmente em áreas com circulação por morcegos hematófagos. O protocolo de observação por 10 dias aplica-se a cães e gatos, não permite aguardar em agressão por bovino. Após lavagem abundante da ferida, a pessoa sem vacinação prévia deve iniciar imediatamente a profilaxia vacinal indicada; o tipo de exposição define se também haverá imunobiológico passivo.

Distratores:
A — Incorreta. A observação clínica padronizada por 10 dias é válida para cães e gatos; manter o boi acessível pode ajudar à vigilância veterinária, mas não deve adiar a profilaxia humana.
B — Incorreta. Ausência aparente de sinais no animal não exclui risco e não autoriza alta sem avaliação e vacina em agressão por animal de produção.
D — Incorreta. Em ferida superficial, única e em antebraço, soro antirrábico isolado não é a conduta; quando indicado em exposições graves, deve acompanhar a vacinação e ser infiltrado na lesão.`,

        'pediatria-inep-034': `Resposta correta — B. Sintomas noturnos frequentes, limitação ao exercício, exacerbações com idas à urgência e VEF1 de 70% mostram asma persistente não controlada. A reversibilidade de 15% após broncodilatador sustenta o diagnóstico. Entre as alternativas, a melhor estratégia é tratamento controlador regular com corticoide inalatório associado a LABA e broncodilatador de resgate nas crises; LABA nunca deve ser usado isoladamente em asma.

Distratores:
A — Incorreta. Antileucotrieno é alternativa menos eficaz em muitos cenários e usar corticoide inalatório apenas durante exacerbações é insuficiente para este grau de sintomas e risco.
C — Incorreta. Corticoide oral contínuo não é terapia inicial de controle e seus efeitos adversos impedem uso rotineiro; SABA isolado não controla inflamação crônica.
D — Incorreta. LABA sem controlador inalatório explícito é inseguro, corticoide oral deve ser reservado a exacerbações selecionadas e ipratrópio é adjuvante em crises moderadas ou graves, não esquema de manutenção.`,

        'pediatria-inep-035': `Resposta correta — D. A massa em fossa ilíaca esquerda e a história de evacuações infrequentes com cíbalos e dor indicam impactação fecal por constipação funcional. A primeira etapa é desimpactar, preferencialmente com polietilenoglicol por via oral; enema retal é alternativa quando a via oral não é possível ou conforme avaliação. Depois vêm manutenção, educação, rotina de toalete e ajustes alimentares.

Distratores:
A — Incorreta. Constipação funcional típica é diagnóstico clínico; radiografia e coprológico não são exames iniciais de rotina na ausência de sinais de alarme.
B — Incorreta. Lactulose é mais utilizada na manutenção e não é a opção mais efetiva para desimpactação; óleo mineral por via retal também não corresponde à estratégia preferida descrita.
C — Incorreta. Alimentação, líquidos e treinamento são importantes, mas iniciar apenas essas medidas sem remover a impactação reduz a chance de sucesso e mantém dor e retenção.`,

        'pediatria-inep-036': `Resposta correta — C. Criança com tosse por mais de três semanas, febre vespertina, astenia, hiporexia e contato domiciliar com tuberculose deve ser investigada para doença ativa. Na infância, o diagnóstico combina quadro clínico e epidemiológico, radiografia de tórax e prova tuberculínica em sistema de pontuação; quando possível, também se busca confirmação bacteriológica. Portanto, radiografia e teste tuberculínico são etapas fundamentais, sem iniciar tratamento às cegas antes da avaliação.

Distratores:
A — Incorreta. Antibiótico inespecífico atrasa o diagnóstico de tuberculose e não trata o bacilo; a criança já reúne critérios para investigação imediata.
B — Incorreta. O contato aumenta muito a probabilidade, mas o tratamento de doença ativa deve seguir avaliação diagnóstica e classificação adequadas, salvo situações excepcionais definidas pela equipe.
D — Incorreta. Hemograma não integra os principais critérios diagnósticos e o afastamento não precisa durar seis meses: a infectividade do caso-fonte costuma cair após tratamento efetivo, devendo ser avaliada pela equipe de tuberculose.`,

        'pediatria-inep-037': `Resposta correta — D. Icterícia persistente após 14 dias acompanhada de colúria, acolia fecal e hepatomegalia firme caracteriza colestase obstrutiva, e atresia biliar deve ser presumida até exclusão. O encaminhamento é urgente para dosagem de bilirrubinas e investigação especializada, porque o prognóstico depende de diagnóstico e portoenterostomia de Kasai precoces.

Distratores:
A — Incorreta. Colúria e fezes acólicas demonstram hiperbilirrubinemia conjugada e obstrução biliar, não uma icterícia não obstrutiva; apenas enzimas hepáticas não bastam.
B — Incorreta. Doença metabólica faz parte do diferencial de colestase, mas suspensão do leite materno não é conduta inicial e a acolia exige exclusão urgente de atresia biliar.
C — Incorreta. Icterícia do leite materno é predominantemente não conjugada, sem colúria ou acolia, e não justifica conduta expectante neste quadro.`,

        'pediatria-inep-038': `Resposta correta — C. Febre alta por três a cinco dias que desaparece abruptamente antes do surgimento de exantema róseo maculopapular predominante em tronco e pescoço é a apresentação clássica do exantema súbito, geralmente por herpesvírus humano 6 ou 7. Em lactente com bom estado e padrão típico, o diagnóstico é clínico e não requer exames complementares.

Distratores:
A — Incorreta. Doença mão-pé-boca costuma produzir vesículas em mãos, pés e cavidade oral; a ausência dessas lesões e a sequência febre seguida de exantema não a favorecem.
B — Incorreta. Sarampo combina febre com tosse, coriza ou conjuntivite e exantema cefalocaudal, geralmente sem desaparecimento prévio da febre; idade menor de 1 ano, isoladamente, não obriga exclusão laboratorial diante de quadro clássico alternativo e sem vínculo epidemiológico.
D — Incorreta. Febre alta não torna automaticamente bacteriana a etiologia; escarlatina costuma acompanhar faringite estreptocócica e exantema áspero, não surgir após a defervescência.`,

        'pediatria-inep-039': `Resposta correta — D. A combinação de púrpura palpável simétrica em membros inferiores e nádegas, artralgia ou artrite, dor abdominal e acometimento renal com hematúria e proteinúria é clássica da vasculite por imunoglobulina A. Frequentemente surge após infecção de vias aéreas e resulta de deposição de imunocomplexos de IgA em pequenos vasos.

Distratores:
A — Incorreta. Kawasaki exige febre prolongada associada a critérios mucocutâneos, como conjuntivite, alterações orais e extremidades; não explica a púrpura palpável com nefrite.
B — Incorreta. Artrite idiopática juvenil requer artrite persistente por pelo menos seis semanas e não costuma produzir esta tríade cutânea, gastrointestinal e renal.
C — Incorreta. Lúpus pode causar artralgia, púrpura e nefrite, mas a idade, o início pós-infeccioso e a distribuição típica das lesões com dor abdominal favorecem vasculite por IgA.`,

        'pediatria-inep-040': `Resposta correta — A. Febre, área mamária dolorosa e hiperemiada, adenopatia e ponto de flutuação indicam abscesso mamário associado à mastite lactacional. A coleção precisa ser drenada — a alternativa propõe drenagem cirúrgica sobre o ponto flutuante — e a infecção deve receber antibioticoterapia apropriada. A amamentação ou retirada de leite deve continuar em ambas as mamas, inclusive na afetada quando tolerada e sem contato da boca com secreção purulenta, para manter o esvaziamento.

Distratores:
B — Incorreta. Aspiração guiada por ultrassonografia pode ser utilizada em abscessos selecionados, mas suspender a mamada apenas na mama afetada não é regra e favorece estase; entre as opções, A reúne drenagem e manutenção correta do aleitamento.
C — Incorreta. Abscesso com flutuação não deve receber apenas antibiótico, e leite materno não deve ser fervido para então ser oferecido.
D — Incorreta. A evolução clínica é típica de abscesso puerperal; mamografia e anatomopatológico não devem atrasar drenagem, e a supressão do aleitamento não é indicada de rotina.`,

        'pediatria-inep-041': `Resposta correta — D. No calendário adotado desde 2024, meninas e meninos não vacinados recebem uma dose de HPV entre 9 e 14 anos. A menina de 13 anos pode ser vacinada nesta visita; o menino de 8 anos ainda não atingiu a idade de rotina e deverá iniciar ao completar 9 anos, salvo indicação especial.

Distratores:
A — Incorreta. A menina está elegível, mas o menino ainda tem 8 anos e não integra a faixa etária rotineira.
B — Incorreta. Além de o menino não ter idade, o esquema de rotina para imunocompetentes de 9 a 14 anos é de dose única, não duas doses com intervalo de 60 dias.
C — Incorreta. A menina deve ser vacinada e o menino não precisa esperar até 11 anos; poderá receber a dose a partir dos 9.`,

        'pediatria-inep-042': `Resposta correta — D. Consumo diário de aproximadamente um litro de leite de vaca e pouca carne são fatores persistentes de deficiência de ferro. A dose prescrita de 2 mg/kg/dia é profilática ou inferior à dose terapêutica usual de cerca de 3 mg/kg/dia empregada pelo Ministério da Saúde para anemia ferropriva. Diante de resposta inadequada, deve-se corrigir a dose, conferir adesão e administração, reduzir o excesso de leite e orientar dieta rica em ferro antes de concluir resistência ao tratamento.

Distratores:
A — Incorreta. A alternativa afirma que a resposta foi adequada, mas o próprio enunciado e gabarito indicam falha após três meses; manter subdose e fatores alimentares perpetuaria a deficiência.
B — Incorreta. Ferro intravenoso e investigação de má absorção não são os próximos passos antes de corrigir dose, adesão e dieta.
C — Incorreta. Traço talassêmico entra no diferencial de microcitose que não responde a ferro corretamente administrado, mas o caso ainda contém causas claras e corrigíveis de falha terapêutica.

Validação visual pendente — as duas tabelas laboratoriais mencionadas não foram importadas. Hemoglobina, VCM, RDW, ferritina e resposta após o tratamento devem ser conferidos no PDF-fonte antes da publicação definitiva deste comentário.`,

        'pediatria-inep-043': `Resposta correta — B. O paciente recebeu dose padrão da vacina contra febre amarela aos 29 anos. Para quem foi vacinado a partir dos 5 anos, uma dose é considerada suficiente por toda a vida no calendário nacional; a morte de um primata funciona como alerta epidemiológico para investigação e intensificação de vacinação dos não imunizados, mas não cria indicação automática de reforço após nove anos.

Distratores:
A — Incorreta. Há risco e circulação de febre amarela silvestre no Brasil; epizootia em primata deve ser comunicada e investigada, nunca minimizada.
C — Incorreta. A vigilância deve investigar o animal, mas a conduta vacinal da pessoa é definida por seu histórico e risco, sem necessidade de aguardar anatomopatológico para decidir se está imunizada.
D — Incorreta. Reforço indiscriminado não é recomendado; a exceção relevante é quem recebeu a única dose antes dos 5 anos, o que não ocorreu.`,

        'pediatria-inep-044': `Resposta correta — A. A internet pode amplificar desinformação sobre eficácia e segurança das vacinas, e algoritmos de recomendação favorecem exposição repetida a conteúdos semelhantes e sua associação a identidades ou pautas morais. A hesitação vacinal é multifatorial — envolve confiança, complacência, conveniência e contexto — e deve ser enfrentada com escuta, transparência, comunicação baseada em evidências e facilitação do acesso.

Distratores:
B — Incorreta. Hesitação não se restringe a pessoas de baixa renda nem possui uma única justificativa; pode ocorrer em diferentes grupos sociais e contextos culturais.
C — Incorreta. A raridade alcançada por doenças pode diminuir a percepção de risco, mas não existe política de retirar vacinas temporariamente para gerar engajamento no ano seguinte.
D — Incorreta. Notícias falsas podem afetar qualquer estrato social; renda e acesso digital não permitem afirmar pouco impacto nem maior confiança automática.`,

        'pediatria-inep-045': `Resposta correta — A. Recém-nascido grande para a idade gestacional e filho de mãe com diabetes apresenta risco elevado de hiperinsulinismo e hipoglicemia nas primeiras horas. Mesmo assintomático, deve ser alimentado precocemente e ter glicemia capilar monitorada conforme protocolo, permitindo intervenção guiada pelo valor e pelo quadro clínico.

Distratores:
B — Incorreta. Fórmula profilática não deve substituir ou complementar automaticamente o aleitamento se o recém-nascido mama bem e mantém glicemias adequadas.
C — Incorreta. O limiar de 60 mg/dL isolado não indica necessariamente glicose intravenosa; valores, idade pós-natal, sintomas e resposta à alimentação orientam a conduta.
D — Incorreta. Letargia ou convulsão exigem verificação imediata e tratamento intravenoso se hipoglicemia for confirmada, mas esperar sintomas graves sem rastreamento é inadequado em recém-nascido de risco.`,

        'pediatria-inep-046': `Resposta correta — D. A penicilina G benzatina intramuscular em dose única é tratamento de primeira linha para erradicar Streptococcus pyogenes da orofaringe e prevenir febre reumática quando há diagnóstico de faringoamigdalite estreptocócica. Também favorece adesão por dispensar dez dias de tratamento oral. A indicação clínica deve seguir avaliação ou teste conforme disponibilidade e probabilidade pré-teste.

Distratores:
A — Incorreta. Cefalexina é alternativa para alergia não imediata à penicilina, não a primeira escolha em paciente sem alergia descrita.
B — Incorreta. Amoxicilina por curso completo também pode erradicar o estreptococo, mas a questão solicita a opção de primeira linha destacada para dose única e prevenção segura diante de adesão incerta.
C — Incorreta. Eritromicina é alternativa em alergia relevante a betalactâmicos e apresenta maior risco de intolerância e resistência.`,

        'pediatria-inep-047': `Resposta correta — B. Cólera suspeita ou confirmada é doença de notificação compulsória imediata: o serviço deve comunicar a vigilância epidemiológica municipal em até 24 horas, permitindo investigação da origem, busca de outros casos e medidas de controle de água e alimentos. A reidratação permanece o eixo do tratamento, com antibiótico nos casos graves conforme protocolo.

Distratores:
A — Incorreta. A transmissão é fecal-oral; aplicam-se precauções-padrão e de contato para pacientes incontinentes ou com diarreia não contida, não isolamento por gotículas.
C — Incorreta. Não se recomenda rastrear e tratar indiscriminadamente contatos assintomáticos com antibióticos, estratégia que não controla a fonte e favorece resistência.
D — Incorreta. Vacinação reativa de todos os contatos não é a medida imediata rotineira; saneamento, água segura, higiene, vigilância e cuidado dos sintomáticos são centrais.`,

        'pediatria-inep-048': `Resposta correta — B. Icterícia indireta intensa ou prolongada em recém-nascido masculino afrodescendente, com Coombs direto negativo e possível padrão familiar ligado ao X, sugere deficiência de glicose-6-fosfato desidrogenase. A deficiência aumenta vulnerabilidade oxidativa das hemácias e pode manifestar-se no período neonatal com hiperbilirrubinemia, mesmo sem incompatibilidade imune demonstrável.

Distratores:
A — Incorreta. Esferocitose hereditária pode causar hemólise Coombs-negativa, mas costuma associar-se a esferócitos, CHCM elevada e história autossômica dominante; os dados epidemiológicos favorecem G6PD.
C — Incorreta. Doença falciforme raramente causa hemólise clínica no primeiro mês porque a hemoglobina fetal predomina, e deve ser identificada pela triagem neonatal ou eletroforese.
D — Incorreta. Galactosemia costuma causar vômitos, baixo ganho ponderal, hepatopatia, hipoglicemia e sepse após exposição à lactose; o lactente está bem e usa fórmula com ganho adequado.

Validação visual pendente — os resultados laboratoriais anunciados no enunciado não foram importados. Bilirrubinas, hemoglobina, reticulócitos, esfregaço e atividade de G6PD devem ser conferidos no PDF-fonte antes da publicação definitiva deste comentário.`,

        'pediatria-inep-049': `Resposta correta — C, por ser a melhor alternativa disponível. Recém-nascido febril com recusa alimentar, vômitos, leucocitose, piúria, esterase e nitrito positivos e bacilos Gram-negativos na urina tem infecção urinária febril com risco de bacteremia. Deve ser internado e receber antibiótico parenteral imediatamente, seguido de ultrassonografia de rins e vias urinárias após estabilização ou tratamento.

Distratores:
A — Incorreta. Repetir toda a investigação antes de tratar atrasaria antibiótico em um neonato potencialmente séptico.
B — Incorreta. Acerta a necessidade de antibiótico imediato, mas solicita DMSA rotineiramente em 30 dias; a cintilografia é reservada a situações selecionadas, enquanto ultrassonografia é o exame inicial.
D — Incorreta. Tratamento oral ambulatorial é inseguro em recém-nascido febril, que necessita avaliação de sepse e terapia parenteral hospitalar.

Ressalva técnica — embora C diga que não há necessidade de “confirmação pela urocultura”, a urocultura obtida por método adequado é recomendada e deve ser coletada antes do antibiótico sempre que isso não atrasar o tratamento. O resultado não precisa ser aguardado para iniciar a terapia.`,

        'pediatria-inep-050': `Resposta correta — C. Xeroftalmia e manchas esbranquiçadas espumosas na conjuntiva correspondem às manchas de Bitot, manifestações clássicas de deficiência de vitamina A. Dieta pobre em frutas, verduras, legumes e produtos de origem animal aumenta o risco, e sarampo recente pode agravar a depleção e precipitar complicações oculares.

Distratores:
A — Incorreta. Deficiência de ferro causa principalmente anemia microcítica, palidez e alterações de desenvolvimento, não xeroftalmia e manchas de Bitot.
B — Incorreta. Carência de zinco pode produzir dermatite, alopecia, alteração do paladar e prejuízo imunológico, mas não é a causa típica dos achados oculares.
D — Incorreta. Deficiência de vitamina D provoca raquitismo e alterações ósseas e musculares, não xerose conjuntival.`,

        'pediatria-inep-051': `Resposta correta — C, conforme o gabarito importado. Prematuridade tardia, equimoses e incompatibilidade materno-fetal aumentam o risco de hiperbilirrubinemia grave. Se, apesar de fototerapia intensiva, a bilirrubina alcança o limiar de exsanguineotransfusão ou continua subindo rapidamente com risco de encefalopatia bilirrubínica, a EST deve ser preparada sem demora em unidade neonatal, com hemocomponente compatível selecionado em conjunto com a hemoterapia.

Distratores:
A — Incorreta. Imunoglobulina intravenosa pode ser considerada em doença hemolítica isoimune selecionada quando a bilirrubina se aproxima do limiar apesar de fototerapia, mas não substitui EST já indicada.
B — Incorreta. Apenas intensificar e aguardar nova dosagem é inadequado se os valores já ultrapassaram o limiar de troca ou há ascensão perigosa sob fototerapia intensiva.
D — Incorreta. Velocidade de elevação de 0,5 mg/dL por hora é sinal de hemólise importante e aumenta, não reduz, a preocupação e a necessidade de intervenção.

Validação visual pendente — os valores de bilirrubina antes e após fototerapia e a tabela de referência não foram importados. Também deve ser conferida no PDF-fonte a especificação “sangue B-”, pois a escolha do hemocomponente para EST depende da incompatibilidade materna, dos anticorpos e da prova de compatibilidade realizada pela hemoterapia.`,

        'pediatria-inep-052': `Resposta correta — A. Genitália de aparência masculina com gônadas não palpáveis bilateralmente exige investigação imediata de diferença do desenvolvimento sexual, sem atribuição precipitada e irreversível. Devem ser feitos cariótipo ou análise cromossômica rápida, eletrólitos e avaliação hormonal dirigida, ultrassonografia para estruturas internas e acompanhamento por equipe multidisciplinar com endocrinologia, genética, urologia ou cirurgia, psicologia e ética. Cirurgias não urgentes devem aguardar diagnóstico e decisão compartilhada.

Distratores:
B — Incorreta. Imagem ajuda a identificar estruturas internas, mas não define sozinha sexo cromossômico ou etiologia, e não há justificativa para cirurgia cosmética antes da alta.
C — Incorreta. Hiperplasia adrenal congênita permanece possível inicialmente; ausência de desidratação aos 24 horas não exclui forma perdedora de sal, cujas alterações podem aparecer depois.
D — Incorreta. Aparência externa não basta para uma designação definitiva; a família precisa de acolhimento e investigação célere, evitando recomendação baseada apenas no fenótipo.

Revisão do sinalizador — a descrição textual contém os elementos necessários para responder; nenhuma imagem é indispensável para a conclusão ética e diagnóstica geral.`,

        'pediatria-inep-053': `Resposta correta — A. A criança está ativa, aceita líquidos, não apresenta sinais de desidratação e a prega retorna rapidamente; portanto, deve seguir o Plano A domiciliar, com líquidos e solução de reidratação após evacuações, alimentação habitual, orientação de sinais de alarme e zinco oral por 10 a 14 dias. A alternativa A contém a intervenção específica correta entre as opções.

Distratores:
B — Incorreta. O retorno deve ocorrer antes se houver piora, sangue nas fezes, vômitos persistentes, sede intensa, redução da diurese ou incapacidade de beber; marcar apenas retorno em dois dias não descreve o tratamento necessário.
C — Incorreta. Soro administrado sob observação na unidade corresponde ao Plano B para alguma desidratação; esta criança está hidratada e consegue beber.
D — Incorreta. Diarreia aquosa aguda sem sangue ou suspeita bacteriana específica não exige antibiótico.`,

        'pediatria-inep-054': `Resposta correta — B. O diagnóstico clínico de síndrome de Down deve ser confirmado por cariótipo. O exame diferencia trissomia livre, mosaicismo e translocação envolvendo o cromossomo 21; uma translocação pode ser herdada de genitor com rearranjo balanceado, alterando o risco de recorrência e a necessidade de cariótipo parental e aconselhamento genético.

Distratores:
A — Incorreta. Fenótipo típico e idade materna não identificam o mecanismo citogenético nem permitem dispensar confirmação.
C — Incorreta. O resultado tem impacto direto no aconselhamento reprodutivo e na estimativa de recorrência, sobretudo nas translocações.
D — Incorreta. O cariótipo é indicado independentemente da idade dos pais, mas um recém-nascido clinicamente estável não precisa permanecer internado apenas aguardando o resultado.`,

        'pediatria-inep-055': `Resposta correta — C. Crise generalizada única, com duração de sete minutos, durante febre, em criança de 2 anos que recupera completamente o estado neurológico e não apresenta sinais meníngeos corresponde a convulsão febril simples. A prioridade é identificar e tratar a causa da febre e orientar a família; neuroimagem, eletroencefalograma e punção lombar não são exames rotineiros em apresentação simples e criança bem após o evento.

Distratores:
A — Incorreta. O diagnóstico está correto, mas tomografia e punção lombar não são indicadas automaticamente; punção é reservada à suspeita de infecção do sistema nervoso central.
B — Incorreta. Não houve característica complexa: a crise não foi focal, não durou 15 minutos ou mais e não se repetiu em 24 horas; EEG e internação não são necessários de rotina.
D — Incorreta. Também classifica incorretamente como complexa e propõe ressonância e internação sem indicação clínica.`,

        'pediatria-inep-056': `Resposta correta — D. O recém-nascido apresenta desconforto respiratório precoce com taquipneia intensa e retrações, mas mantém circulação estável e saturação de 95%. Suporte não invasivo, como CPAP nasal, ajuda a recrutar alvéolos e reduzir o trabalho respiratório; a fração inspirada de oxigênio deve ser titulada à meta de saturação, e a radiografia auxilia a distinguir taquipneia transitória, síndrome do desconforto respiratório, pneumonia e escape aéreo.

Distratores:
A — Incorreta. Capuz de oxigênio não fornece pressão distensora e 40% fixos podem ser desnecessários; fisioterapia e marcadores inflamatórios não são a prioridade em apresentação imediatamente pós-natal sem fatores infecciosos.
B — Incorreta. Cateter nasal convencional pode não vencer o trabalho respiratório importante, hidratação deve ser individualizada e fisioterapia não trata a causa neonatal aguda.
C — Incorreta. Intubação e surfactante são reservados a insuficiência respiratória mais grave ou síndrome de deficiência de surfactante com indicação; a boa saturação e estabilidade não justificam procedimento invasivo imediato.`,

        'pediatria-inep-057': `Resposta correta — D, conforme o gabarito importado. Os dados antropométricos referidos no material original classificam o IMC como sobrepeso, enquanto a estatura permanece adequada para a idade. A conduta inicial é orientar toda a família sobre alimentação, atividade física, sono, tempo de tela e acompanhamento longitudinal das curvas, sem estigmatizar a criança.

Distratores:
A — Incorreta. O peso relativo à estatura não está adequado segundo a classificação usada pela questão, portanto apenas tranquilizar perderia oportunidade de intervenção precoce.
B — Incorreta. A estatura foi classificada como adequada; radiografia de idade óssea não é exame de rotina para sobrepeso sem baixa estatura ou alteração de velocidade de crescimento.
C — Incorreta. A questão não caracteriza baixa estatura, e encaminhamento imediato à endocrinologia não é necessário para todo caso de sobrepeso.

Validação visual pendente — os “dados observados” de peso, altura, IMC e respectivos escores Z não foram importados. A tabela ou gráfico antropométrico deve ser conferido no PDF-fonte antes da publicação definitiva deste comentário.`,

        'pediatria-inep-058': `Resposta correta — C. Diarreia aquosa em pessoa proveniente de contexto epidemiológico de risco exige suspeita e notificação de cólera mesmo quando leve. Como a criança está ativa e apenas levemente desidratada, indica-se reidratação oral, manutenção da alimentação, acompanhamento e coleta conforme vigilância, além de investigação de comunicantes e ações integradas das vigilâncias epidemiológica, ambiental e sanitária.

Distratores:
A — Incorreta. Reidratação venosa não é necessária na desidratação leve quando a criança aceita via oral, e a notificação não depende de comprovar internação do contato.
B — Incorreta. Quimioprofilaxia indiscriminada de contatos, isolamento domiciliar e encaminhamento de toda criança ao pronto-socorro não são medidas rotineiras.
D — Incorreta. Antibiótico não é obrigatório em quadro leve, antidiarreicos que reduzem motilidade podem ser perigosos e a notificação deve ser imediata, não condicionada à falta de melhora.`,

        'pediatria-inep-059': `Resposta correta — B. Corticoide em dose superior a 2 mg/kg/dia é imunossupressor e contraindica, neste momento, vacinas vivas atenuadas. DTP e hepatite B são vacinas não vivas e podem ser administradas para reconstruir o esquema quando não há registro confiável, conforme avaliação do calendário e do CRIE. A ausência de cicatriz de BCG não indica revacinação e a BCG, além disso, é viva e contraindicada durante imunossupressão grave.

Distratores:
A — Incorreta. Não se podem aplicar todas as vacinas sem considerar a imunossupressão e as contraindicações às vacinas vivas.
C — Incorreta. A tetraviral contém vírus vivos atenuados e não deve ser administrada sob corticoterapia imunossupressora, embora influenza inativada possa ser indicada.
D — Incorreta. BCG não deve ser repetida por ausência de cicatriz e está contraindicada no imunodeprimido; hepatite B isoladamente não completa as vacinas possíveis nesta visita.`,

        'pediatria-inep-060': `Resposta correta — D. Queimadura extensa é ferimento de alto risco para tétano, mas o paciente tem esquema básico completo de três doses e recebeu a última há apenas três anos. Para ferimentos de alto risco, quando a última dose foi há menos de cinco anos, não se indica reforço nem soro ou imunoglobulina antitetânica; mantém-se apenas o cuidado adequado da ferida.

Distratores:
A — Incorreta. O reforço seria antecipado em ferimento de alto risco se a última dose tivesse ocorrido há cinco anos ou mais, não após apenas três.
B — Incorreta. Nem vacina nem soro são necessários com esquema completo recente; imunização passiva é reservada principalmente a esquema desconhecido ou incompleto e situações especiais.
C — Incorreta. Acerta ao dispensar reforço, mas indica incorretamente soro apesar da imunização ativa completa e recente.`,

        'pediatria-inep-061': `Resposta correta — B. Eritema tóxico neonatal é erupção benigna e autolimitada que surge tipicamente entre o segundo e o terceiro dias de vida, com pápulas ou pústulas sobre halo eritematoso, predominando em face, tronco e porções proximais. O bom estado geral, a alimentação adequada e o ganho ponderal apoiam o diagnóstico; basta tranquilizar e observar.

Distratores:
A — Incorreta. Miliária rubra forma pequenas pápulas eritematosas em áreas de calor e oclusão, relacionada à obstrução dos ductos sudoríparos, sem o padrão típico descrito.
C — Incorreta. Melanose pustulosa transitória costuma estar presente ao nascimento, com pústulas frágeis que deixam máculas hiperpigmentadas e colarete de descamação, geralmente sem halo eritematoso.
D — Incorreta. Candidíase neonatal produz placas orais removíveis com dificuldade ou dermatite intensa em área de fralda e dobras, não esta erupção transitória em bebê saudável.`,

        'pediatria-inep-062': `Resposta correta — B. Ausência de pré-natal, parto domiciliar, anemia, icterícia, hepatomegalia e pseudoparalisia dolorosa dos membros inferiores sugerem sífilis congênita precoce. Lesões ósseas, como osteocondrite e periostite, podem causar a pseudoparalisia de Parrot. É necessário colher sorologia materna e do lactente, realizar investigação completa e iniciar penicilina G cristalina intravenosa sem atrasar tratamento quando a suspeita é forte.

Distratores:
A — Incorreta. Hepatite neonatal pode explicar icterícia e hepatomegalia, mas não a dor e a incapacidade de mover as pernas associadas a alterações ósseas.
C — Incorreta. Violência deve ser investigada quando pertinente, porém a combinação sistêmica e o contexto sem assistência pré-natal favorecem infecção congênita; síndrome do bebê sacudido costuma envolver lesão neurológica, hemorragia retiniana e trauma intracraniano.
D — Incorreta. Hipotireoidismo pode causar hipotonia e atraso, mas não costuma produzir pseudoparalisia dolorosa, anemia, icterícia e alterações radiográficas metafisárias; além disso, vários marcos descritos ainda são compatíveis com 2 meses.

Validação visual pendente — a radiografia dos membros inferiores não foi importada. A presença e o padrão de osteocondrite, periostite ou lesões metafisárias devem ser conferidos no PDF-fonte antes da publicação definitiva deste comentário.`,

        'pediatria-inep-063': `Resposta correta — D. Febre por seis dias, conjuntivite bilateral não purulenta, alterações orais, adenomegalia cervical, exantema e edema endurecido de mãos e pés preenchem critérios de doença de Kawasaki clássica. A complicação característica é vasculite das artérias coronárias, com dilatação ou aneurismas, cujo risco é reduzido pelo tratamento precoce com imunoglobulina intravenosa e ácido acetilsalicílico.

Distratores:
A — Incorreta. Orquiepididimite não é manifestação típica da vasculite de Kawasaki.
B — Incorreta. Na fase aguda pode haver alterações plaquetárias e, depois, trombocitose; trombocitopenia não é o achado associado clássico solicitado.
C — Incorreta. A hiperemia orofaríngea da Kawasaki é difusa e sem exsudato; faringite exsudativa sugere outro diagnóstico.`,

        'pediatria-inep-064': `Resposta correta — C. Qualquer bacteriúria por Streptococcus agalactiae identificada durante a gestação indica colonização materna relevante e constitui indicação de profilaxia antibiótica intraparto, independentemente da contagem de colônias ou de nova cultura vaginal e retal. A primeira escolha é penicilina G intravenosa, iniciada no trabalho de parto e repetida conforme protocolo até o nascimento.

Distratores:
A — Incorreta. Não é necessário teste rápido para decidir, pois a urocultura positiva durante a gestação já documentou colonização e define a indicação.
B — Incorreta. A ausência do rastreio de 35–37 semanas não anula a bacteriúria previamente demonstrada.
D — Incorreta. A profilaxia deve começar no trabalho de parto e não aguardar ruptura de membranas; ampicilina é alternativa aceitável, mas a condição proposta atrasa indevidamente o início.`,

        'pediatria-inep-065': `Resposta correta — B. Na síndrome de Down há maior risco de instabilidade e displasia do quadril. Diante de instabilidade ao exame, deve-se realizar ultrassonografia — apropriada antes da ossificação suficiente para radiografia — e encaminhar para avaliação ortopédica. A hipotonia também requer intervenção precoce e acompanhamento do desenvolvimento.

Distratores:
A — Incorreta. Ecocardiograma normal ao nascimento não precisa ser repetido automaticamente aos 7 meses sem sintomas ou achados cardíacos novos.
C — Incorreta. Função tireoidiana deve ser monitorada periodicamente, mas exames normais e ausência de nódulo não indicam ultrassonografia da tireoide nem endocrinologia imediata.
D — Incorreta. Hemograma tem momentos recomendados e indicações clínicas específicas; coleta mensal e hematologista não são necessários com resultado normal e sem sinais hematológicos.`,

        'pediatria-inep-066': `Resposta correta — B. Coriza seguida de taquipneia, sibilância difusa e hiperinsuflação em lactente pequeno caracteriza bronquiolite viral aguda. O tratamento é de suporte: higiene e aspiração nasal suave, hidratação e oxigênio diante de saturação persistentemente baixa. Pela idade de 24 dias, recusa alimentar e saturação de 91%, há indicação de observação hospitalar cuidadosa pelo risco de apneia e piora rápida.

Distratores:
A — Incorreta. Antibiótico e corticoide não são recomendados de rotina na bronquiolite sem evidência de infecção bacteriana ou outra indicação.
C — Incorreta. Broncodilatador, corticoide e anti-histamínico não modificam rotineiramente a evolução da primeira bronquiolite viral em neonato.
D — Incorreta. Oxigênio é pertinente, mas antibiótico e broncodilatador não são tratamentos universais e faltam hidratação e higiene nasal.`,

        'pediatria-inep-067': `Resposta correta — D. Púrpura palpável não trombocitopênica em membros inferiores e nádegas, artralgia, dor abdominal e sangramento gastrointestinal após infecção de vias aéreas configuram vasculite por imunoglobulina A. A inflamação de pequenos vasos mediada por depósitos de IgA pode acometer pele, articulações, trato gastrointestinal e rins; urina e pressão arterial devem ser acompanhadas mesmo com função renal inicialmente normal.

Distratores:
A — Incorreta. Poliarterite nodosa afeta vasos de médio calibre, podendo causar hipertensão, dor abdominal, neuropatia e lesões cutâneas variadas, mas não esta tétrade típica de IgA.
B — Incorreta. Arterite de Takayasu acomete grandes artérias e produz redução de pulsos, diferenças de pressão e sopros vasculares, ausentes no caso.
C — Incorreta. Kawasaki ocorre sobretudo em menores de 5 anos com febre prolongada e alterações mucocutâneas; não explica púrpura palpável glútea com enterorragia.`,

        'pediatria-inep-068': `Resposta correta — D. Em meninas, início de desenvolvimento mamário e pubiano a partir dos 8 anos é compatível com puberdade normal. Aos 9 anos e 4 meses, Tanner M2/P2, crescimento normal e ausência de sinais de virilização ou progressão acelerada não exigem investigação imediata; deve-se orientar e acompanhar a evolução e a velocidade de crescimento.

Distratores:
A — Incorreta. Puberdade precoce central em menina é definida pelo aparecimento de caracteres sexuais secundários antes dos 8 anos.
B — Incorreta. Hiperplasia adrenal congênita tende a produzir sinais androgênicos, como pubarca precoce, acne, odor, aceleração de crescimento ou virilização, sem explicar isoladamente a telarca fisiológica nessa idade.
C — Incorreta. Não há puberdade precoce nem sinais neurológicos que sugiram tumor hipofisário e justifiquem neuropediatria.`,

        'pediatria-inep-069': `Resposta correta — B. Criança com 4 anos, queda da própria altura, Glasgow 15, exame neurológico normal, sem sinais de fratura e apenas um episódio de vômito apresenta risco muito baixo de lesão intracraniana clinicamente importante. Não há indicação imediata de tomografia; recomenda-se observação clínica, instruções de retorno e reavaliação se surgirem vômitos repetidos, sonolência, cefaleia progressiva, alteração comportamental ou déficit neurológico.

Distratores:
A — Incorreta. Um vômito isolado após trauma leve, sem outros fatores de risco, não basta para justificar radiação de TC.
C — Incorreta. A idade não determina tomografia automática; regras clínicas reduzem exames desnecessários e exposição à radiação.
D — Incorreta. Radiografia simples não exclui lesão intracraniana e raramente muda a conduta no trauma craniano leve sem suspeita de fratura.`,

        'pediatria-inep-070': `Resposta correta — B. A criança perdeu 1 kg sobre peso prévio de 11 kg e apresenta sinais de desidratação grave e choque, além de não conseguir beber. No Plano C para criança maior de 1 ano, inicia-se rapidamente 30 mL/kg de solução isotônica em 30 minutos. Com o peso atual de 10 kg, isso corresponde a 300 mL de cloreto de sódio 0,9% em 30 minutos, com reavaliação imediata da perfusão.

Distratores:
A — Incorreta. Duzentos mililitros correspondem a 20 mL/kg e não ao volume inicial de 30 mL/kg previsto no esquema da questão.
C — Incorreta. O volume de 300 mL é adequado, e Ringer lactato é solução possível, mas administrá-lo em uma hora é lento para a fase inicial em criança com sinais de choque.
D — Incorreta. A velocidade é rápida, porém o volume de 200 mL fica abaixo dos 300 mL calculados para 10 kg.`,

        'pediatria-inep-071': `Resposta correta — D. Púrpura palpável não trombocitopênica predominando em membros inferiores e nádegas, artralgia, dor abdominal e acometimento renal após infecção de vias aéreas formam o quadro clássico da vasculite por IgA. Hematúria e proteinúria indicam nefrite associada e exigem seguimento de pressão arterial, urina e função renal.

Distratores:
A — Incorreta. Glomerulonefrite pós-estreptocócica pode causar síndrome nefrítica após infecção, mas não explica a associação típica de púrpura glútea, artralgia e dor abdominal; o ASLO negativo também reduz o suporte a essa hipótese.
B — Incorreta. Síndrome hemolítico-urêmica cursa com anemia hemolítica microangiopática, trombocitopenia e lesão renal aguda, achados ausentes no hemograma e na função renal normais.
C — Incorreta. Lúpus pode produzir manifestações cutâneas, articulares e renais, porém é muito menos provável nessa idade e não apresenta, neste caso, elementos suficientes para superar a tétrade característica da vasculite por IgA.`,

        'pediatria-inep-072': `Resposta correta — D. Prematuridade tardia e cesariana sem trabalho de parto favorecem atraso na reabsorção do líquido pulmonar fetal. O início imediato de taquipneia e desconforto respiratório, seguido de melhora clínica e radiológica rápida nas primeiras 24 a 72 horas, é típico de taquipneia transitória do recém-nascido.

Distratores:
A — Incorreta. Pneumonia congênita costuma estar associada a fatores infecciosos, sinais sistêmicos e infiltrados que não regridem rapidamente na sequência radiográfica descrita.
B — Incorreta. Doença da membrana hialina é mais frequente em prematuros de menor idade gestacional e costuma mostrar baixos volumes pulmonares, padrão reticulogranular difuso e broncogramas aéreos, com evolução diferente.
C — Incorreta. Síndrome de aspiração meconial ocorre sobretudo em recém-nascidos a termo ou pós-termo expostos a líquido meconial e produz infiltrados grosseiros e heterogêneos, contexto não apresentado.

Validação visual pendente — as três radiografias seriadas mencionadas não foram importadas. O padrão de hiperinsuflação, reforço perihilar ou líquido nas fissuras e sua regressão rápida deve ser conferido no PDF-fonte antes da publicação definitiva deste comentário.`,

        'pediatria-inep-073': `Resposta correta — C. O Estatuto da Criança e do Adolescente determina que a vacinação é obrigatória quando recomendada pelas autoridades sanitárias. Diante da recusa persistente dos responsáveis, a equipe deve orientar e documentar o caso, acionar imediatamente a rede de proteção, incluindo o Conselho Tutelar, e adotar o fluxo necessário para assegurar a atualização vacinal.

Distratores:
A — Incorreta. O poder familiar não é absoluto e não autoriza responsáveis a afastarem uma medida sanitária obrigatória destinada à proteção da criança.
B — Incorreta. A sensibilização é importante, mas o acionamento do Conselho Tutelar não se restringe a risco iminente de adoecimento; a recusa de vacinação obrigatória já demanda atuação protetiva.
D — Incorreta. Reconhece o potencial prejuízo da recusa, mas omite o acionamento da rede de proteção e sugere vacinação direta contra a vontade dos responsáveis sem explicitar o procedimento legal adequado.

Ressalva técnica — “proceder à vacinação nessa mesma visita” deve ser entendido, para fins da alternativa, como assegurar imediatamente o fluxo protetivo e a atualização vacinal. Não autoriza contenção física ou aplicação coercitiva sem observância dos procedimentos clínicos e legais.`,

        'pediatria-inep-075': `Resposta correta — B. Icterícia nas primeiras 24 horas é sempre patológica. Bilirrubina total de 19,4 mg/dL às 18 horas, predominantemente indireta, representa hiperbilirrubinemia grave e risco de neurotoxicidade. Deve-se iniciar fototerapia intensiva imediatamente, preparar exsanguineotransfusão e repetir a bilirrubina em 2 a 3 horas enquanto se investiga hemólise e outros fatores de risco.

Distratores:
A — Incorreta. O quadro não é moderado: a instalação antes de 24 horas e o valor muito elevado exigem intervenção urgente; repetir o exame apenas após 12 horas seria inseguro.
C — Incorreta. A fototerapia intensiva continua indicada enquanto se prepara a exsanguineotransfusão, e expansão com soro fisiológico não substitui o tratamento da hiperbilirrubinemia.
D — Incorreta. A ausência de incompatibilidade Rh não torna o risco baixo; mãe O e recém-nascido A ainda permitem incompatibilidade ABO, e a magnitude precoce da bilirrubina exige conduta de emergência, não simples controle em seis horas.`,

        'pediatria-inep-076': `Resposta correta — A. Deficiência intelectual, face alongada, orelhas proeminentes, prognatismo, hiperextensibilidade articular e macrorquidia no adolescente formam o fenótipo clássico da síndrome do X frágil. A confirmação é molecular, demonstrando expansão de repetições CGG e metilação do gene FMR1; entre as opções, isso corresponde à investigação genética por sequenciamento ou teste molecular dirigido.

Distratores:
B — Incorreta. Ressonância da sela túrcica avalia sobretudo hipófise e região selar, não confirma uma síndrome genética com esse fenótipo.
C — Incorreta. Tomografia de crânio pode identificar alterações estruturais, mas não determina a etiologia molecular da deficiência intelectual nem confirma X frágil.
D — Incorreta. Eletroencefalograma pode auxiliar na avaliação das crises epilépticas, já controladas, porém não confirma a causa genética do quadro.

Ressalva técnica — o exame confirmatório mais específico é a análise molecular do FMR1, geralmente por PCR e técnicas capazes de medir a expansão CGG e a metilação. “Sequenciamento genético” é a melhor opção disponível, mas sua redação é menos precisa que a denominação do teste dirigido.`,

        'pediatria-inep-077': `Resposta correta — A. Hemoglobinopatias com hemólise aumentam a produção de bilirrubina indireta; formas relevantes de alfatalassemia podem ser detectadas na triagem neonatal por padrões de hemoglobina, e a fototerapia intensiva é medida imediata para reduzir a bilirrubina enquanto a etiologia é investigada.

Distratores:
B — Incorreta. Hipotireoidismo pode prolongar a icterícia por redução da conjugação e do trânsito intestinal, mas não tem policitemia como mecanismo típico; a indicação de exsanguineotransfusão depende da curva por idade e dos fatores de risco, não do diagnóstico isolado.
C — Incorreta. Síndrome de Crigler–Najjar decorre de deficiência de conjugação pela UGT1A1, e não de doença hemolítica; o teste do pezinho habitual também não é o exame confirmatório específico.
D — Incorreta. Estenose hipertrófica de piloro costuma manifestar-se mais tarde com vômitos não biliosos em jato e pode associar-se a icterícia por menor conjugação, não por coleção sanguínea extravascular.

Ressalva técnica — bilirrubina de 25,6 mg/dL com 72 horas é grave e exige fototerapia intensiva imediata, mas também demanda avaliação urgente da indicação de exsanguineotransfusão conforme idade em horas, idade gestacional, fatores de neurotoxicidade e resposta inicial. A alternativa A é a chave oficial mais coerente entre as opções, embora simplifique essa conduta.`,

        'pediatria-inep-078': `Resposta correta — B. Coriorretinite integra a tríade clássica da toxoplasmose congênita com hidrocefalia e calcificações intracranianas difusas. Pode estar presente ao nascimento ou surgir posteriormente, razão pela qual o acompanhamento oftalmológico é necessário mesmo em crianças inicialmente assintomáticas.

Distratores:
A — Incorreta. Hipoglicemia não é uma complicação característica da toxoplasmose congênita.
C — Incorreta. Pneumonia alba é manifestação clássica da sífilis congênita, não da toxoplasmose.
D — Incorreta. Hipogamaglobulinemia sugere imunodeficiência humoral e não constitui sequela típica dessa infecção congênita.`,

        'pediatria-inep-079': `Resposta correta — D. Após os passos iniciais realizados em até 30 segundos, o recém-nascido que permanece em apneia ou apresenta respiração irregular deve receber ventilação com pressão positiva por máscara. A ventilação pulmonar efetiva é a intervenção mais importante na reanimação neonatal, com reavaliação da frequência cardíaca e da expansão torácica.

Distratores:
A — Incorreta. Oxigênio inalatório isolado não ventila um recém-nascido em apneia e atrasa a intervenção decisiva.
B — Incorreta. Intubação pode ser necessária se a ventilação por máscara for ineficaz ou houver indicação específica, mas não é o primeiro passo obrigatório neste momento.
C — Incorreta. O estímulo tátil faz parte dos passos iniciais e deve ser breve; insistir nele após persistência da apneia atrasa a ventilação. Fricção circular do abdome também não é técnica recomendada.`,

        'pediatria-inep-080': `Resposta correta — B. O diagnóstico de infecção urinária exige crescimento bacteriano significativo em amostra coletada adequadamente, interpretado junto de sintomas e evidência de inflamação urinária. Entre as alternativas, crescimento superior a 1.000 UFC/mL em urina obtida por cateterismo é o achado com maior valor diagnóstico, por reduzir contaminação em comparação com coleta espontânea.

Distratores:
A — Incorreta. Qualquer contagem em clean catch não confirma infecção, pois essa técnica está mais sujeita à contaminação e exige crescimento significativo de um único uropatógeno.
C — Incorreta. Piúria apoia o diagnóstico, mas qualquer quantidade de piócitos isoladamente não o confirma e pode ocorrer em outras condições.
D — Incorreta. Em jato médio, 10.000 UFC/mL pode ser relevante em contextos selecionados, mas não constitui isoladamente o critério clássico mais seguro apresentado na questão.

Ressalva técnica — os pontos de corte variam conforme diretriz, idade, método de coleta e presença de piúria; protocolos pediátricos atuais frequentemente exigem limiares superiores ao indicado na alternativa B. A chave foi preservada, mas o critério deve ser interpretado conforme o protocolo adotado pela prova.`,

        'pediatria-inep-081': `Resposta correta — C. Aos 2 anos, puxar o cabo de uma panela é um risco previsível do desenvolvimento exploratório. Deixar o recipiente e o cabo ao alcance da criança representa falha evitável de supervisão e proteção ambiental, caracterizando negligência, ainda que não tenha havido intenção de causar a queimadura.

Distratores:
A — Incorreta. A lesão não deve ser tratada apenas como evento fortuito, porque havia fator de risco conhecido e prevenível no ambiente doméstico.
B — Incorreta. Queimaduras podem sugerir maus-tratos quando apresentam padrões incompatíveis com o relato, marcas de imersão ou repetição, mas o mecanismo descrito é compatível com escaldadura acidental por negligência de segurança.
D — Incorreta. Negligência integra o espectro da violência contra a criança, porém as características epidemiológicas isoladas não permitem classificar o caso como agressão doméstica intencional; a categoria específica solicitada é negligência.`,

        'pediatria-inep-082': `Resposta correta — A. Deve-se avaliar rapidamente a responsividade e, diante da ausência de resposta, chamar ajuda e acionar o sistema de emergência. Respiração e pulso central devem ser verificados simultaneamente por no máximo 10 segundos; em pré-escolar, o pulso carotídeo ou femoral é apropriado. Sem pulso, dois profissionais realizam reanimação na relação de 15 compressões para 2 ventilações.

Distratores:
B — Incorreta. Pulso radial não é o pulso central recomendado para decidir o início de compressões em uma criança inconsciente; além disso, no ambiente intra-hospitalar com dois socorristas, utiliza-se 15:2.
C — Incorreta. Além de inverter a sequência descrita, indica pulso radial, inadequado para essa avaliação, embora cite a relação de compressões correta para dois socorristas.
D — Incorreta. Omite explicitamente a avaliação inicial de responsividade e usa 30:2, relação reservada ao atendimento por um único socorrista em crianças.`,

        'pediatria-inep-083': `Resposta correta — C. Crianças com síndrome de Down apresentam padrão próprio de crescimento, com menor velocidade e estatura final em relação à população geral. O acompanhamento deve usar curvas antropométricas específicas para sexo e idade, sem deixar de avaliar tendência longitudinal, composição corporal e condições associadas que possam prejudicar o crescimento.

Distratores:
A — Incorreta. Necessidades nutricionais não devem ser estimadas automaticamente pelo “peso ideal”; a avaliação deve ser individualizada, especialmente na obesidade.
B — Incorreta. O peso corporal isolado reúne água, gordura, massa óssea e massa magra e, portanto, não é marcador direto específico da massa proteica ou das reservas energéticas.
D — Incorreta. Medidas segmentares podem auxiliar quando a estatura não pode ser obtida, mas extensão da perna esquerda não é regra geral validada para estimar altura em toda criança ou adulto com síndrome de Down.`,

        'pediatria-inep-084': `Resposta correta — B. Aos 6 meses, inicia-se alimentação complementar mantendo o aleitamento materno. Frutas podem ser oferecidas in natura, amassadas, raspadas ou em pedaços seguros conforme o desenvolvimento, preservando fibras e favorecendo contato com diferentes texturas. A alimentação deve evoluir progressivamente para a consistência da comida da família.

Distratores:
A — Incorreta. Carne deve ser bem cozida e desfiada, picada ou amassada em consistência segura, mas não liquidificada nem peneirada, práticas que reduzem textura e densidade da refeição.
C — Incorreta. Sucos não devem integrar a rotina do lactente; oferecem açúcar livre, menos fibras e menor saciedade que a fruta inteira.
D — Incorreta. Ovo inteiro bem cozido, incluindo clara e gema, pode ser introduzido a partir dos 6 meses. Retardar alimentos alergênicos sem indicação não previne alergia.`,

        'pediatria-inep-085': `Resposta correta — B. A estatura está abaixo de −2 escores-z, mas a projeção acompanha o canal familiar baixo, a velocidade de crescimento é de aproximadamente 5 cm por ano — adequada para a fase — e a idade óssea coincide com a cronológica. Esse conjunto favorece baixa estatura familiar, uma variante da normalidade.

Distratores:
A — Incorreta. Tanner G2 aos 11 anos indica início puberal dentro da faixa esperada para meninos, não puberdade atrasada.
C — Incorreta. Crescer 2,5 cm em seis meses corresponde a cerca de 5 cm por ano, velocidade aceitável antes do estirão puberal.
D — Incorreta. No atraso constitucional do crescimento e puberdade, a idade óssea costuma estar atrasada em relação à cronológica; aqui ambas são de 11 anos.`,

        'pediatria-inep-086': `Resposta correta — C. Pródromo viral seguido de primeiro episódio de sibilância, taquipneia, retrações, expiração prolongada e hiperinsuflação em lactente de 6 meses caracteriza bronquiolite viral aguda. Saturação de 88% e desconforto moderado exigem oxigênio, suporte de hidratação e monitorização, com avaliação para internação; o tratamento rotineiro é de suporte.

Distratores:
A — Incorreta. Resfriado comum não explica hipoxemia, retrações e sibilância difusa de vias aéreas inferiores, e broncodilatador não é tratamento rotineiro da bronquiolite.
B — Incorreta. Não há consolidação focal, estertores ou toxemia que sustentem pneumonia bacteriana e antibioticoterapia empírica.
D — Incorreta. História materna de asma aumenta risco futuro, mas um primeiro episódio viral aos 6 meses é mais compatível com bronquiolite; beta-agonista e corticoide não são indicados de rotina.`,

        'pediatria-inep-087': `Resposta correta — D. O quadro é compatível com taquipneia transitória do recém-nascido, causada por depuração lenta do líquido pulmonar e favorecida por prematuridade, cesariana sem trabalho de parto e diabetes materno. Asma materna também é fator de risco descrito para essa evolução respiratória neonatal.

Distratores:
A — Incorreta. Sexo masculino, e não cor da pele branca, é associado a maior risco de alguns quadros de desconforto respiratório neonatal; raça não é o fator solicitado.
B — Incorreta. Pequeno para a idade gestacional não é o fator adicional clássico que melhor explica a retenção de líquido pulmonar apresentada.
C — Incorreta. Sexo feminino não aumenta o risco; em várias doenças respiratórias neonatais, o sexo masculino é que se associa a maior vulnerabilidade.

Validação visual pendente — a radiografia sinalizada no material não foi importada. A descrição de hiperinsuflação, retificação de arcos costais e opacidades lineares é compatível com líquido pulmonar retido, mas a imagem deve ser conferida no PDF-fonte antes da publicação definitiva deste comentário.`,

        'pediatria-inep-088': `Resposta correta — B. Eritema tóxico neonatal costuma surgir entre o segundo e o terceiro dias de vida em recém-nascido saudável, com pápulas, vesículas ou pústulas pequenas sobre halo eritematoso, predominando no tronco e poupando palmas e plantas. É benigno, autolimitado e não requer tratamento.

Distratores:
A — Incorreta. Miliária rubra decorre de obstrução dos ductos sudoríparos e produz pápulas eritematosas em áreas de calor e oclusão, sem o padrão pustuloso com halo típico.
C — Incorreta. Pustulose cefálica neonatal predomina em face e couro cabeludo, não em tórax e abdome com a distribuição descrita.
D — Incorreta. Melanose pustulosa transitória geralmente está presente ao nascimento; suas pústulas frágeis deixam máculas hiperpigmentadas com colarete de descamação e não costumam ter halo eritematoso.`,

        'pediatria-inep-089': `Resposta correta — C. A criança apresentou crise febril simples: generalizada, breve, autolimitada, associada à febre, sem recorrência em 24 horas, déficit neurológico ou alteração metabólica. Deve-se tranquilizar a família, orientar primeiros cuidados e sinais de alarme e garantir acompanhamento longitudinal, observando eventuais novas crises e o contexto de vulnerabilidade.

Distratores:
A — Incorreta. Crise febril simples não exige seguimento exclusivo por especialista nem permite inferir trauma ou violência sem outros indícios; a atenção primária pode coordenar o cuidado.
B — Incorreta. Tomografia não é indicada rotineiramente em criança neurologicamente normal após crise febril simples, e a morte súbita do irmão não cria, isoladamente, indicação de neuroimagem emergencial.
D — Incorreta. Crises tônico-clônicas generalizadas são a apresentação típica das crises febris simples, e internação para investigação não é necessária após recuperação completa e observação adequada.`,

        'pediatria-inep-090': `Resposta correta — C. Por volta de 1 ano, maior mobilidade, exploração oral e pouca percepção de risco tornam frequentes quedas, sufocação e aspiração de corpos estranhos. A prevenção inclui supervisão contínua, barreiras em escadas e janelas, ambiente seguro para dormir e retirada de objetos pequenos e alimentos de alto risco.

Distratores:
A — Incorreta. Atropelamentos tornam-se mais relevantes quando a criança ganha autonomia fora de casa; queimadura solar não compõe o principal conjunto de acidentes dessa faixa.
B — Incorreta. Queda do carrinho é prevenível, mas atropelamento não é um dos mecanismos predominantes que melhor caracteriza lactentes de 1 ano.
D — Incorreta. Aspiração é pertinente, porém queimadura por água de banheira é mais específica e não substitui quedas e asfixias entre os acidentes predominantes.`,

        'pediatria-inep-091': `Resposta correta — D. A ausência de cicatriz não significa falha de imunização. Quando há registro confiável de aplicação da BCG, não se recomenda revacinar apenas porque a cicatriz não se formou. Deve-se tranquilizar a família, manter o acompanhamento habitual e conferir as demais vacinas.

Distratores:
A — Incorreta. Prova tuberculínica não é indicada para decidir revacinação de criança saudável com dose documentada de BCG.
B — Incorreta. Uma segunda dose aumenta a ocorrência de eventos locais sem benefício demonstrado nesse cenário.
C — Incorreta. Ausência isolada de cicatriz da BCG é uma variação de resposta local e não constitui sinal suficiente de imunodeficiência.`,

        'pediatria-inep-092': `Resposta correta — B. No teste do coraçãozinho, saturação menor que 95% em qualquer extremidade ou diferença superior a 3 pontos percentuais entre membro superior direito e membro inferior torna o resultado inconclusivo. Como foram medidos 99% e 95%, com diferença de 4 pontos, a oximetria deve ser repetida após uma hora, mantendo o recém-nascido em avaliação.

Distratores:
A — Incorreta. Não se deve dar alta antes de esclarecer um teste inconclusivo pela diferença pré e pós-ductal superior ao limite.
C — Incorreta. Ecocardiograma é indicado se o teste permanecer alterado após as repetições previstas ou se houver saturação imediatamente crítica, exame clínico sugestivo ou outra indicação.
D — Incorreta. Eletrocardiograma não é o exame confirmatório para rastreamento positivo de cardiopatia congênita crítica e não substitui ecocardiografia.`,

        'pediatria-inep-093': `Resposta correta — A. Icterícia antes de 24 horas é patológica. Este recém-nascido tem 36 semanas, possível incompatibilidade Rh, filho de mãe diabética e bilirrubina de 12 mg/dL já às 18 horas, combinação que aumenta o risco de progressão e encefalopatia bilirrubínica. A conduta imediata é iniciar fototerapia intensiva e investigar hemólise, acompanhando a bilirrubina de perto.

Distratores:
B — Incorreta. Observação isolada é insuficiente diante de hiperbilirrubinemia precoce e múltiplos fatores de risco.
C — Incorreta. Hidratação venosa pode ser necessária se houver ingestão inadequada ou desidratação, mas não é o tratamento específico principal da bilirrubina elevada.
D — Incorreta. Exsanguineotransfusão é reservada a valores nos limiares de troca, sinais de encefalopatia ou elevação apesar de fototerapia intensiva; o dado apresentado indica inicialmente fototerapia.`,

        'pediatria-inep-094': `Resposta correta — A. A síndrome mão-pé-boca é geralmente causada por enterovírus e tem tratamento de suporte, com hidratação, analgesia e antitérmico quando necessário. Por ser muito contagiosa, deve-se orientar higiene rigorosa e afastamento temporário da creche durante a fase aguda indicada pela alternativa, especialmente enquanto houver febre, lesões ativas e dificuldade de controlar secreções.

Distratores:
B — Incorreta. Casos isolados de síndrome mão-pé-boca não são, em regra, de notificação compulsória imediata; investigação pela vigilância pode ser necessária em surtos conforme norma local.
C — Incorreta. Pleconaril não é tratamento ambulatorial rotineiro aprovado para a síndrome, que costuma ser autolimitada.
D — Incorreta. Internação é reservada a complicações, como desidratação importante ou acometimento neurológico; imunoglobulina intravenosa não é indicada no caso não complicado.

Ressalva técnica — critérios de retorno à creche variam entre protocolos e devem considerar estado clínico e capacidade de higiene, pois a eliminação viral nas fezes pode persistir por semanas. A alternativa A é a melhor disponível, mas “até desaparecerem todas as lesões” não é uma regra universal.`,

        'pediatria-inep-095': `Resposta correta — A. Diarreia e vômitos, oligúria, ureia e creatinina elevadas e fração de excreção de sódio menor que 1% indicam lesão renal aguda pré-renal por hipovolemia. A prioridade, após avaliação clínica, é restaurar perfusão com solução isotônica, como cloreto de sódio 0,9%, em bolus cuidadosamente reavaliados.

Distratores:
B — Incorreta. Bicarbonato de 13 mEq/L reflete acidose metabólica associada à hipoperfusão e às perdas digestivas; bicarbonato hipertônico não é a primeira intervenção sem acidemia extrema ou indicação específica.
C — Incorreta. Não há indicação imediata de terapia renal substitutiva: não foram descritas hipercalemia refratária, sobrecarga volêmica, acidose intratável, uremia sintomática ou intoxicação dializável.
D — Incorreta. Furosemida não corrige hipovolemia e pode piorar a perfusão renal; diurético não trata lesão pré-renal em paciente sem edema ou congestão.`,

        'pediatria-inep-096': `Resposta correta — B. Na transposição das grandes artérias, as circulações pulmonar e sistêmica ficam em paralelo, e a sobrevivência depende da mistura por comunicação interatrial, interventricular ou canal arterial. Mesmo com comunicação interatrial ampla, a cianose grave exige infusão imediata de prostaglandina E1 para manter ou reabrir o canal arterial, enquanto se organiza tratamento definitivo.

Distratores:
A — Incorreta. Atriosseptostomia por balão é indicada quando a comunicação interatrial é restritiva ou a mistura permanece inadequada apesar da estabilização; o ecocardiograma informa comunicação ampla.
C — Incorreta. A cirurgia de Jatene é o tratamento corretivo, mas o recém-nascido precisa primeiro ser estabilizado e ter a mistura circulatória preservada.
D — Incorreta. Oxigênio pode integrar o suporte, porém altas frações isoladamente pouco corrigem a hipoxemia causada por circulações paralelas e não substituem prostaglandina.`,

        'pediatria-inep-097': `Resposta correta — A. O quadro cervical é parotidite epidêmica, e dor abdominal intensa com vômitos sugere pancreatite como complicação. Entre os exames de imagem oferecidos, a tomografia computadorizada avalia melhor inflamação, edema, necrose e complicações pancreáticas, sobretudo diante de apresentação intensa ou diagnóstico incerto; amilase e lipase também são fundamentais na avaliação laboratorial.

Distratores:
B — Incorreta. Endoscopia digestiva alta avalia mucosa esofagogastroduodenal e não é exame principal para diagnosticar pancreatite.
C — Incorreta. Ressonância e colangiorressonância podem detalhar vias biliares e pâncreas em situações selecionadas, mas não são a opção inicial mais disponível no cenário agudo descrito.
D — Incorreta. Ultrassonografia é útil para pesquisar etiologia biliar e líquido livre, mas tem sensibilidade limitada para visualizar o pâncreas, especialmente por interposição gasosa.

Ressalva técnica — pancreatite aguda é diagnosticada por pelo menos dois entre dor típica, elevação de amilase ou lipase e imagem compatível. Em muitos casos pediátricos, imagem avançada não é necessária de imediato quando os dois primeiros critérios estão presentes; a tomografia é a melhor alternativa entre as opções apresentadas para caracterizar a complicação.`,

        'pediatria-inep-098': `Resposta correta — C. Evacuações extremamente infrequentes desde o nascimento, distensão, baixo ganho ponderal e saída explosiva de fezes após toque retal sugerem doença de Hirschsprung, mais frequente na síndrome de Down. O enema contrastado pode mostrar zona de transição entre reto distal estreito e cólon proximal dilatado, que mantém inervação preservada.

Distratores:
A — Incorreta. Na doença de Hirschsprung falta o reflexo inibitório retoanal, portanto a manometria mostra ausência, e não relaxamento, do esfíncter anal interno.
B — Incorreta. A biópsia retal confirmatória demonstra ausência de células ganglionares e hipertrofia de fibras nervosas, não apenas presença ou redução inespecífica.
D — Incorreta. O reto agangliônico tende a ser estreito, com relação retossigmoide invertida; não se espera reto maior que o cólon proximal.`,

        'pediatria-inep-099': `Resposta correta — D. Febre por cinco dias associada a conjuntivite bilateral não purulenta, alterações orais, exantema polimorfo, edema de extremidades, adenopatia cervical e descamação preenche critérios de doença de Kawasaki clássica. O tratamento precoce com imunoglobulina intravenosa e ácido acetilsalicílico reduz o risco de aneurismas coronarianos.

Distratores:
A — Incorreta. Escarlatina pode causar febre, língua em framboesa e exantema áspero, mas não costuma produzir conjuntivite não purulenta e edema duro de mãos e pés com o conjunto descrito.
B — Incorreta. Mononucleose associa-se a faringite exsudativa, adenopatia generalizada e possível hepatoesplenomegalia, não às alterações mucocutâneas típicas da Kawasaki.
C — Incorreta. Eritema infeccioso causa eritema facial em “face esbofeteada” e exantema rendilhado, geralmente sem febre prolongada e comprometimento de mucosas e extremidades.`,

        'pediatria-inep-100': `Resposta correta — D. Aos 15 meses, a criança deve receber a segunda dose da tríplice viral e a dose de varicela prevista no calendário, frequentemente administradas como vacina tetraviral ou conforme a disponibilidade e orientação do programa. Como ela já recebeu as doses anteriores, é necessário atualizar esse esquema sem reiniciá-lo.

Distratores:
A — Incorreta. Administrar tríplice viral e tetraviral simultaneamente duplicaria componentes contra sarampo, caxumba e rubéola, sem corresponder ao esquema de atualização proposto.
B — Incorreta. O reforço da pneumocócica conjugada ocorre antes, aos 12 meses no calendário infantil, e o enunciado informa que as vacinas anteriores às de 15 meses foram recebidas.
C — Incorreta. O reforço da meningocócica C conjugada também pertence à etapa de 12 meses, já contemplada segundo o caso.

Ressalva temporal — calendários de vacinação podem ser atualizados. A explicação preserva o calendário e o gabarito vigentes na prova; na prática, deve-se consultar o Calendário Nacional de Vacinação atual e aplicar o esquema de resgate correspondente.`,

        'pediatria-inep-101': `Resposta correta — A. Eliminação recente de verme, massa abdominal cilíndrica e imagem em “feixe de charuto” sugerem obstrução intestinal por bolo de Ascaris lumbricoides. Sem sinais descritos de perfuração ou peritonite, inicia-se manejo conservador com jejum, hidratação, correção hidroeletrolítica e descompressão por sonda nasogástrica; o óleo mineral pode auxiliar a progressão do bolo conforme o protocolo da questão.

Distratores:
B — Incorreta. Enema hipertônico não alcança adequadamente uma obstrução de intestino delgado e pode causar distúrbios eletrolíticos; ivermectina não resolve a urgência mecânica.
C — Incorreta. A descompressão é adequada, mas administrar piperazina durante obstrução aguda pode paralisar vermes e compactar o bolo, agravando o bloqueio.
D — Incorreta. Cirurgia é necessária diante de obstrução completa persistente, isquemia, volvo, perfuração ou falha do tratamento conservador, não obrigatoriamente como primeira conduta na ausência desses sinais.

Ressalva técnica — não se devem administrar substâncias por via enteral em obstrução completa, vômitos persistentes ou risco de aspiração. A alternativa A reflete o manejo conservador clássico da questão, mas a segurança do óleo mineral depende da avaliação cirúrgica e do protocolo assistencial.`,

        'pediatria-inep-102': `Resposta correta — A. A triagem por oximetria deve ser realizada após 24 horas de vida, preferencialmente entre 24 e 48 horas, em membro superior direito e um membro inferior. Diferença maior que 3 pontos percentuais entre as medidas pré e pós-ductal torna o teste alterado ou inconclusivo e exige repetição conforme o algoritmo, independentemente de qual valor seja maior.

Distratores:
B — Incorreta. O sentido da diferença não a torna normal; o critério considera diferença absoluta superior a 3%.
C — Incorreta. A idade gestacional de 36 semanas não invalida o teste, que é aplicável a recém-nascidos clinicamente estáveis na população de rastreamento.
D — Incorreta. O exame foi feito com 26 horas, dentro do período preconizado após as primeiras 24 horas.`,

        'pediatria-inep-103': `Resposta correta — D. Febre, conjuntivite, exantema, adenomegalia, comprometimento sistêmico e exposição epidemiológica prévia a síndrome gripal são compatíveis com síndrome inflamatória multissistêmica pediátrica associada à infecção recente por SARS-CoV-2. O diagnóstico exige inflamação laboratorial, envolvimento de múltiplos órgãos, exclusão de outras causas e evidência de infecção ou exposição ao vírus.

Distratores:
A — Incorreta. Dengue grave pode causar choque, citopenias e extravasamento plasmático, mas o conjunto mucocutâneo e a relação com exposição prévia a síndrome gripal favorecem SIM-P; seria necessário correlacionar epidemiologia e exames específicos.
B — Incorreta. Choque tóxico estafilocócico costuma associar-se a hipotensão, falência multiorgânica e possível foco infeccioso, além de exantema difuso, mas não explica tão bem o intervalo pós-viral e o fenótipo inflamatório descrito.
C — Incorreta. Meningococcemia produz toxemia, púrpura ou petéquias e rápida instabilidade, podendo acompanhar meningite; não é o padrão exantemático e conjuntival relatado.

Validação visual pendente — o quadro de exames laboratoriais referido no enunciado não foi importado. Marcadores inflamatórios, alterações hematológicas, cardíacas e evidência de SARS-CoV-2 devem ser conferidos no PDF-fonte antes da publicação definitiva deste comentário.`,

        'pediatria-inep-104': `Resposta correta — A. A criança apresenta pneumonia adquirida na comunidade com taquipneia, tiragem e consolidação lobar, necessitando tratamento hospitalar. Em criança previamente saudável e imunizada, penicilina ou ampicilina intravenosa oferece cobertura de primeira linha para Streptococcus pneumoniae, o agente bacteriano típico mais provável.

Distratores:
B — Incorreta. Gentamicina isolada não oferece cobertura adequada para pneumococo e é mais utilizada em combinações específicas, como sepse neonatal.
C — Incorreta. Ceftazidima tem atividade antipseudomonas, espectro desnecessariamente amplo e cobertura menos apropriada para o cenário comunitário sem fatores de risco.
D — Incorreta. Vancomicina é reservada a suspeita de bactéria gram-positiva resistente, como pneumonia estafilocócica grave ou pneumococo resistente em contexto específico, ausentes no caso.`,

        'pediatria-inep-105': `Resposta correta — A. Escore-z de peso para idade entre −3 e −2 classifica-se como peso baixo para a idade. A criança necessita avaliação alimentar completa, investigação de fatores clínicos e sociais, orientação para alimentação complementar adequada e acompanhamento próximo do crescimento.

Distratores:
B — Incorreta. Peso elevado para a idade corresponde a escore-z acima dos limites superiores, e não a valores negativos entre −3 e −2.
C — Incorreta. Peso adequado para a idade situa-se, em geral, entre −2 e +2 escores-z.
D — Incorreta. Peso muito baixo para a idade é classificado quando o escore-z está abaixo de −3; o enunciado inclui valores iguais ou superiores a −3.`,

        'pediatria-inep-106': `Resposta correta — D. Aos 13 anos, com mamas e pelos pubianos em Tanner 3, crescimento normal e sem sinais de doença, a ausência de menarca ainda pode ser fisiológica. A menarca costuma ocorrer cerca de dois a três anos após o início da telarca, frequentemente em Tanner 4. A conduta é explicar a evolução puberal e acompanhar.

Distratores:
A — Incorreta. Investigação de amenorreia primária é indicada, em geral, se não houver menarca até 15 anos, mais de três anos após a telarca ou diante de sinais de anormalidade, ausentes no caso.
B — Incorreta. O desenvolvimento puberal normal torna desnecessária ultrassonografia imediata apenas pela idade de 13 anos.
C — Incorreta. Teste de progesterona não é usado para induzir menarca em adolescente com progressão puberal fisiológica sem critérios de amenorreia patológica.`,

        'pediatria-inep-107': `Resposta correta — B. Massa abdominal firme que não cruza a linha média, hematúria e hipertensão em lactente sugerem tumor de Wilms, neoplasia renal associada à produção de renina e sangramento urinário. A ultrassonografia abdominal é o exame inicial para confirmar origem renal, avaliar o rim contralateral e orientar investigação subsequente.

Distratores:
A — Incorreta. Linfoma pode formar massa abdominal, mas hematúria, hipertensão e massa localizada sem cruzar a linha média favorecem tumor renal.
C — Incorreta. Glomerulonefrite pode causar hematúria e hipertensão, porém costuma acompanhar edema, alterações urinárias difusas e não produz massa abdominal endurecida.
D — Incorreta. Neuroblastoma frequentemente cruza a linha média, pode calcificar e associar-se a sintomas sistêmicos ou catecolaminas; tomografia é útil no estadiamento, mas o padrão clínico aponta para Wilms e a ultrassonografia é o primeiro exame.`,

        'pediatria-inep-108': `Resposta correta — C. O VDRL do recém-nascido é 1:32, oito vezes o título materno de 1:4. Título neonatal pelo menos quatro vezes maior que o materno torna sífilis congênita altamente provável, mesmo em bebê assintomático. Deve-se notificar, realizar avaliação completa — incluindo líquor, hemograma e radiografia de ossos longos — e iniciar penicilina conforme o protocolo.

Distratores:
A — Incorreta. Seguimento ambulatorial isolado é inadequado diante de título neonatal marcadamente superior ao materno.
B — Incorreta. A investigação não deve ser parcial nem a notificação depender de exames alterados; o critério sorológico já exige abordagem imediata.
D — Incorreta. Penicilina cristalina por dez dias pode ser o tratamento indicado, mas a alternativa omite a avaliação diagnóstica completa necessária, especialmente o líquor, que orienta seguimento e confirma neurossífilis.`,

        'pediatria-inep-109': `Resposta correta — A. A dose de tríplice viral aplicada entre 6 e 11 meses em situação de risco é uma “dose zero” e não substitui as doses do calendário. A criança deve receber tríplice viral aos 12 meses e a dose prevista com componente varicela aos 15 meses, frequentemente como tetraviral conforme disponibilidade.

Distratores:
B — Incorreta. A segunda etapa rotineira ocorre aos 15 meses, não deve ser postergada para 18 meses sem motivo.
C — Incorreta. Não se utiliza vacina monovalente antissarampo no esquema rotineiro descrito; aplicam-se vacinas combinadas conforme o calendário.
D — Incorreta. A proposta atrasa indevidamente a vacinação e associa duas doses no mesmo momento sem corresponder ao esquema recomendado.

Ressalva temporal — a dose e a apresentação disponíveis podem mudar com atualizações do Programa Nacional de Imunizações. Deve-se aplicar o calendário vigente, preservando o princípio de que a dose realizada antes de 12 meses em estratégia excepcional não substitui o esquema de rotina.`,

        'pediatria-inep-110': `Resposta correta — C. Febre, recusa de apoio, dor intensa, calor, edema e limitação articular sugerem artrite séptica, possivelmente por Staphylococcus aureus a partir das lesões cutâneas. Ultrassonografia detecta derrame e orienta punção; o líquido sinovial deve ser analisado com celularidade, Gram e cultura, sem atrasar drenagem e antibiótico após as coletas.

Distratores:
A — Incorreta. Febre reumática pode causar artrite migratória após faringite estreptocócica, mas o quadro monoarticular intenso e o foco cutâneo purulento exigem excluir infecção articular.
B — Incorreta. Anticorpo antinuclear e fator reumatoide são exames selecionados na investigação de doença reumatológica crônica, não na urgência febril monoarticular.
D — Incorreta. Hemograma e marcadores inflamatórios são úteis, mas não confirmam nem identificam o agente; a punção articular é essencial.`,

        'pediatria-inep-111': `Resposta correta — C. Trombocitopenia isolada após infecção viral, com petéquias e equimoses, coagulograma normal e ausência de sangramento mucoso ou visceral importante, é compatível com trombocitopenia imune. Com 64.000 plaquetas/mm³ e manifestação apenas cutânea, a conduta inicial é observação ambulatorial, orientação para evitar trauma e fármacos que prejudiquem plaquetas e retorno diante de sangramento.

Distratores:
A — Incorreta. Corticoide é reservado a sangramento clinicamente relevante, comprometimento de qualidade de vida ou necessidade de elevação rápida das plaquetas, não apenas ao número apresentado.
B — Incorreta. Esplenectomia é opção excepcional para doença crônica refratária e não tem lugar no episódio inicial.
D — Incorreta. Imunoglobulina intravenosa eleva plaquetas rapidamente, mas é indicada sobretudo em sangramento significativo ou quando se precisa de resposta urgente.

Ressalva clínica — esplenomegalia não é típica da trombocitopenia imune. Se confirmada além de discreta palpação do rebordo, deve motivar reavaliação do diagnóstico e investigação de causas infecciosas, hematológicas ou infiltrativas.`,

        'ginecologia-inep-001': `Resposta correta — D. Lúpus com anticorpo antifosfolípide positivo e hipertensão grave elevam muito o risco trombótico e contraindicam contraceptivos combinados com estrogênio. O dispositivo intrauterino de cobre não contém hormônio, é altamente eficaz e não aumenta trombose nem pressão arterial, sendo a opção mais segura entre as apresentadas.

Distratores:
A — Incorreta. O anel vaginal contém estrogênio e progestagênio e é contraindicado tanto pela hipertensão grave quanto pelo alto risco trombótico associado ao anticorpo antifosfolípide.
B — Incorreta. O injetável combinado também contém estrogênio e apresenta o mesmo risco cardiovascular e trombótico inaceitável.
C — Incorreta. O implante apenas com progestagênio é mais seguro que métodos combinados, mas, diante de anticorpo antifosfolípide e da opção não hormonal disponível, o DIU de cobre tem melhor elegibilidade no caso.`,

        'ginecologia-inep-002': `Resposta correta — A. No rastreamento primário com teste molecular para HPV oncogênico, coleta-se material do colo ou vagina e, diante de resultado negativo, o risco de lesão precursora é baixo o suficiente para repetir o rastreamento em cinco anos. A paciente está na faixa etária de rastreamento e deve migrar para o novo protocolo conforme sua implementação local.

Distratores:
B — Incorreta. A citologia trienal era a estratégia convencional, mas o novo protocolo adota teste de DNA-HPV como método primário onde implantado, e não apenas para ASC-US recorrente.
C — Incorreta. Coteste de rotina não é necessário no rastreamento primário proposto; a condução posterior depende do resultado do HPV, genotipagem e testes de triagem previstos no algoritmo.
D — Incorreta. Autocoleta pode ampliar acesso em situações definidas, mas resultado negativo não dispensa definitivamente novos rastreamentos; o intervalo recomendado permanece periódico.`,

        'ginecologia-inep-003': `Resposta correta — B. O implante de etonogestrel é método reversível de longa duração, muito eficaz, compatível com amamentação e pode ser iniciado no puerpério. Além disso, não depende da anatomia da cavidade uterina, vantagem importante diante de útero didelfo.

Distratores:
A — Incorreta. Malformação uterina com cavidades separadas pode impedir posicionamento adequado do DIU e reduzir eficácia; aos 15 dias pós-parto também não corresponde à janela usual de inserção imediata ou tardia sem avaliação específica.
C — Incorreta. Anticoncepcional oral combinado contém estrogênio, inadequado no puerpério muito recente pelo risco tromboembólico e possível impacto inicial na lactação.
D — Incorreta. Injetável mensal é combinado com estrogênio e compartilha as contraindicações do período puerperal precoce.`,

        'ginecologia-inep-004': `Resposta correta — A. Corrimento amarelo-esverdeado abundante, prurido, dispareunia, pH maior que 4,5 e colo com aspecto de “morango” indicam tricomoníase. O tratamento é metronidazol por via oral durante sete dias; parcerias sexuais também devem ser tratadas, com abstinência até conclusão do esquema e resolução dos sintomas.

Distratores:
B — Incorreta. Clindamicina vaginal é alternativa para vaginose bacteriana, que costuma causar corrimento homogêneo, odor de aminas e pouca inflamação, sem colo em morango.
C — Incorreta. Fluconazol trata candidíase vulvovaginal, geralmente com corrimento branco grumoso, pH normal e intenso prurido, não o padrão apresentado.
D — Incorreta. Miconazol também é antifúngico para candidíase e não possui atividade adequada contra Trichomonas vaginalis.`,

        'ginecologia-inep-005': `Resposta correta — B. Imagem intracavitária ovalada com pedículo vascular e histologia mostrando projeção digitiforme de tecido glandular em torno de eixo vascular caracterizam pólipo endometrial. Pólipos podem causar sangramento uterino anormal e são diagnosticados e tratados por histeroscopia.

Distratores:
A — Incorreta. Leiomioma é tumor de músculo liso, com feixes entrelaçados de células musculares, e não proliferação glandular digitiforme.
C — Incorreta. Hiperplasia endometrial é alteração difusa da relação entre glândulas e estroma, sem formar tipicamente uma pequena lesão pediculada vascular.
D — Incorreta. Carcinoma apresenta atipia e invasão ou arquitetura maligna, achados não descritos no exame histopatológico.

Revisão do sinalizador — o texto fornece ultrassonografia e histopatologia suficientes para resolver a questão; nenhuma imagem adicional é necessária para validar a explicação.`,

        'ginecologia-inep-006': `Resposta correta — C. Células glandulares atípicas têm risco relevante de lesão glandular ou escamosa cervical e, conforme idade e fatores clínicos, patologia endometrial. A paciente deve ser encaminhada à colposcopia para avaliação diagnóstica; aos 42 anos, a investigação do endométrio também é necessária, e a ultrassonografia transvaginal integra essa avaliação inicial entre as opções.

Distratores:
A — Incorreta. AGC não deve ser conduzida apenas com teste de HPV e repetição citológica, porque um resultado negativo não exclui lesão glandular significativa.
B — Incorreta. Cauterização sem diagnóstico histológico pode tratar uma área inadequadamente e atrasar a detecção de neoplasia.
D — Incorreta. Biópsia cervical não deve ser realizada às cegas antes da avaliação colposcópica; as amostras devem ser dirigidas, incluindo canal endocervical e investigação endometrial quando indicada.

Ressalva técnica — protocolos atuais geralmente recomendam colposcopia com avaliação endocervical para toda AGC e amostragem endometrial a partir de 35 anos ou conforme risco. Ultrassonografia isolada não substitui amostra endometrial; C é a melhor alternativa disponível, mas resume de forma incompleta o fluxo diagnóstico.`,

        'ginecologia-inep-007': `Resposta correta — A. Testosterona prolongada pode produzir atrofia vaginal e cervical, aumentando dor, desconforto e chance de amostra citológica insatisfatória. Com consentimento e decisão compartilhada, curto curso de estrogênio tópico antes da coleta pode reduzir a atrofia e facilitar o exame, sem retirar a necessidade de rastrear quem mantém colo uterino.

Distratores:
B — Incorreta. A presença de colo determina elegibilidade para rastreamento conforme idade e histórico; testosterona não elimina o risco de HPV ou câncer cervical.
C — Incorreta. Dilatação com vela de Hegar é procedimento invasivo e não constitui preparo rotineiro para coleta citopatológica.
D — Incorreta. Vacinação contra HPV é preventiva e pode ser indicada conforme faixa etária e situação individual, mas não substitui o rastreamento cervical já recomendado.`,

        'ginecologia-inep-008': `Resposta correta — D. BI-RADS 4C indica achado suspeito com alta probabilidade de malignidade. Calcificações pleomórficas finas em distribuição segmentar sugerem processo ductal e exigem encaminhamento rápido à mastologia para confirmação histológica, geralmente por biópsia percutânea guiada por imagem.

Distratores:
A — Incorreta. Ressonância pode complementar avaliação em situações selecionadas, mas não substitui a biópsia de uma lesão BI-RADS 4C.
B — Incorreta. Rastreamento habitual é apropriado para achados benignos ou negativos, não para categoria suspeita.
C — Incorreta. Controle em seis meses é conduta típica de BI-RADS 3; adiar investigação de um achado 4C pode retardar diagnóstico de câncer.

Revisão do sinalizador — a descrição mamográfica e a classificação BI-RADS 4C são suficientes para definir a conduta. A imagem original pode ser conferida para controle de fidelidade, mas não é indispensável à resolução.`,

        'ginecologia-inep-009': `Resposta correta — A. Abscesso tubo-ovariano, toxemia, defesa abdominal, vômitos e falha de tratamento oral são critérios de internação na doença inflamatória pélvica. Deve-se iniciar antibiótico intravenoso de amplo espectro cobrindo gonococo, clamídia, anaeróbios e flora polimicrobiana, observando resposta; drenagem ou cirurgia é considerada se houver ruptura, instabilidade ou ausência de melhora.

Distratores:
B — Incorreta. Manter tratamento ambulatorial é inseguro diante de abscesso, sinais sistêmicos graves, intolerância oral e piora clínica.
C — Incorreta. Esquema oral falho não deve ser mantido enquanto se aguarda microbiologia, pois o tratamento da DIP é sindrômico e imediato.
D — Incorreta. Antifúngico não trata abscesso tubo-ovariano e não há sinais de candidíase que justifiquem adicioná-lo.`,

        'ginecologia-inep-010': `Resposta correta — A. Úlcera genital inicial transitória seguida de linfadenopatia inguinal dolorosa, supurativa e fistulizada por múltiplos orifícios caracteriza linfogranuloma venéreo, causado pelos sorovares L1, L2 e L3 de Chlamydia trachomatis.

Distratores:
B — Incorreta. Haemophilus ducreyi causa cancroide, com úlcera genital dolorosa, fundo sujo e bordas irregulares; pode haver bubão, mas o padrão de lesão inicial discreta seguida de múltiplas fístulas favorece linfogranuloma.
C — Incorreta. Klebsiella granulomatis causa donovanose, com úlceras crônicas, indolores, vermelho-vivas e friáveis, geralmente sem adenopatia verdadeira.
D — Incorreta. Treponema pallidum causa sífilis; o cancro primário costuma ser único e indolor, com linfonodos firmes e não supurativos.`,

        'ginecologia-inep-011': `Resposta correta — D. Aos 49 anos, irregularidade menstrual e sintomas vasomotores típicos permitem diagnóstico clínico de transição menopausal. Sem contraindicações aparentes e com sintomas que afetam sono e qualidade de vida, pode-se propor terapia hormonal individualizada, usando a menor dose eficaz, via adequada ao risco e progestagênio para proteção endometrial se o útero estiver presente.

Distratores:
A — Incorreta. Progestagênio isolado não é a opção sistêmica mais eficaz para sintomas vasomotores e terapia hormonal não deve ser prescrita com finalidade de prevenção cardiovascular.
B — Incorreta. Dosagem de FSH não é necessária rotineiramente em mulher acima de 45 anos com quadro clínico típico, pois oscila durante a transição.
C — Incorreta. Fitoterápicos têm evidência variável e não demonstram eficácia equivalente ao estrogênio para sintomas ou prevenção de fraturas.`,

        'ginecologia-inep-012': `Resposta correta — D. Dismenorreia progressiva e dispareunia profunda em mulher em idade reprodutiva, associadas a útero retrovertido e doloroso à mobilização, são manifestações clássicas de endometriose, especialmente quando há doença em fundo de saco ou ligamentos uterossacros.

Distratores:
A — Incorreta. Doença inflamatória pélvica costuma ter início mais agudo, corrimento, febre ou fatores de risco infecciosos, embora também possa causar dor à mobilização cervical.
B — Incorreta. Miomatose frequentemente aumenta ou torna irregular o volume uterino e causa sangramento aumentado ou sintomas compressivos, não sendo a melhor explicação para dispareunia profunda e dismenorreia progressiva com útero normal.
C — Incorreta. Cisto hemorrágico tende a causar dor pélvica aguda ou subaguda e massa anexial, não um padrão progressivo e cíclico sem achado anexial.`,

        'ginecologia-inep-013': `Resposta correta — D. Fenótipo feminino, cariótipo 46,XY, testosterona em faixa masculina, ausência de útero e escassez de pelos pubianos e axilares caracterizam síndrome de insensibilidade completa aos andrógenos. Os testículos produzem hormônio anti-Mülleriano, causando regressão uterina, mas os tecidos não respondem aos andrógenos.

Distratores:
A — Incorreta. Disgenesia gonadal 46,XY costuma produzir baixa testosterona, ausência de desenvolvimento mamário espontâneo e, sem produção adequada de hormônio anti-Mülleriano, pode haver estruturas Müllerianas.
B — Incorreta. Agenesia Mülleriana causa ausência de útero em pessoa 46,XX com ovários funcionantes, testosterona feminina e pelos pubianos normais.
C — Incorreta. Obstrução do trato genital preserva o útero e costuma causar dor cíclica e retenção menstrual, não ausência uterina.`,

        'ginecologia-inep-014': `Resposta correta — B. História recente de trombose contraindica métodos com estrogênio. O DIU liberador de levonorgestrel oferece contracepção altamente eficaz sem estrogênio e reduz volume menstrual e cólicas, vantagem importante diante de sangramento prolongado e intenso.

Distratores:
A — Incorreta. DIU de cobre não aumenta trombose, mas pode intensificar sangramento e dismenorreia, piorando as queixas atuais.
C — Incorreta. Injetável mensal é combinado e contém estrogênio, contraindicado após trombose venosa.
D — Incorreta. Pílula combinada contínua também contém estrogênio e eleva o risco de recorrência tromboembólica.`,

        'ginecologia-inep-015': `Resposta correta — A. Aos 13 anos, com telarca iniciada aos 10 anos, Tanner M3/P3, crescimento adequado e hímen pérvio, a adolescente apresenta progressão puberal normal. A secreção transparente e inodora é compatível com leucorreia fisiológica estrogênio-dependente, frequentemente antecedendo a menarca. Cabe orientar, tranquilizar e acompanhar.

Distratores:
B — Incorreta. Hipogonadismo hipogonadotrófico costuma cursar com ausência ou pouca progressão dos caracteres sexuais secundários, diferente do Tanner 3 apresentado.
C — Incorreta. Investigação de amenorreia primária é indicada, em geral, aos 15 anos, após mais de três anos da telarca ou quando há sinais anormais; neste momento não há critério.
D — Incorreta. Há produção estrogênica endógena demonstrada pelo desenvolvimento mamário e pela leucorreia, sem indicação de reposição hormonal.

Revisão do sinalizador — todos os dados necessários estão descritos em texto e não há figura ou tabela indispensável para resolver a questão.`,

        'ginecologia-inep-016': `Resposta correta — B. As alterações fetais associadas à síndrome congênita pelo Zika vírus, embora graves, não se enquadram automaticamente nas hipóteses de interrupção gestacional permitidas sem autorização judicial no ordenamento brasileiro. Microcefalia e outras malformações descritas não equivalem juridicamente à anencefalia; portanto, a solicitação isolada não autoriza o procedimento.

Distratores:
A — Incorreta. Consentimento escrito é indispensável a procedimentos autorizados, mas não cria por si só uma hipótese legal de interrupção da gestação.
C — Incorreta. O impedimento não decorre simplesmente de ter ultrapassado 20 semanas; as hipóteses jurídicas não são definidas apenas por esse marco gestacional.
D — Incorreta. Confirmação por dois especialistas pode fortalecer diagnóstico e aconselhamento, porém não converte a síndrome congênita do Zika em autorização legal automática.

Ressalva jurídica — casos concretos podem envolver risco materno, outra hipótese legal ou decisão judicial. A explicação preserva o enquadramento e o gabarito da prova e não substitui avaliação jurídica atualizada.`,

        'ginecologia-inep-017': `Resposta correta — D. Nos primeiros anos após a menarca, a imaturidade do eixo hipotálamo-hipófise-ovário causa ciclos anovulatórios e intervalos irregulares. Com apenas 18 meses de menarca, duração do sangramento de 3 a 7 dias, ausência de fluxo intenso, dor relevante ou repercussão funcional e exame normal, cabe orientar e acompanhar sem exames imediatos.

Distratores:
A — Incorreta. Histeroscopia é invasiva e não se justifica sem suspeita de lesão intracavitária, sangramento importante ou outro sinal de alarme.
B — Incorreta. Painel hormonal amplo não é necessário na irregularidade fisiológica inicial sem sinais de endocrinopatia, amenorreia prolongada ou persistência anormal.
C — Incorreta. Ultrassonografia pélvica não é exame de rotina para ciclos anovulatórios típicos em adolescente assintomática e sem atividade sexual.

Ressalva clínica — intervalo superior a 90 dias, sangramento excessivo, anemia, hiperandrogenismo ou irregularidade persistente além do período esperado exigem investigação. O limite informado chega a 90 dias, mas não o ultrapassa.`,

        'ginecologia-inep-018': `Resposta correta — C. Cisto na região posterolateral do vestíbulo vaginal, com episódio prévio de dor e inflamação e atualmente sintomático na relação sexual, é compatível com cisto da glândula de Bartholin. Lesões assintomáticas podem ser observadas; quando causam incômodo, indicam drenagem com técnica que reduza recorrência, marsupialização ou excisão conforme o caso.

Distratores:
A — Incorreta. Prolapso cervical projeta-se pelo canal vaginal e relaciona-se aos compartimentos do assoalho pélvico, não forma pequeno cisto vestibular lateral.
B — Incorreta. Divertículo uretral costuma localizar-se na parede vaginal anterior, podendo causar disúria, gotejamento pós-miccional ou massa periuretral.
D — Incorreta. Glândulas de Skene situam-se próximas ao meato uretral anterior, localização diferente da lesão descrita.

Ressalva clínica — massa nova de Bartholin em mulher com 40 anos ou mais requer avaliação histológica, por biópsia ou excisão conforme protocolo, para excluir neoplasia rara. A alternativa C identifica corretamente a lesão, mas omite esse cuidado importante aos 43 anos.`,

        'ginecologia-inep-019': `Resposta correta — D. O DIU de cobre pode ser inserido em qualquer fase do ciclo, desde que o profissional esteja razoavelmente seguro de que não há gestação. Não é necessário aguardar a próxima menstruação, e a inserção deve seguir avaliação de elegibilidade e prevenção de infecções.

Distratores:
A — Incorreta. A inserção pós-parto é recomendada imediatamente após a dequitação ou dentro da janela definida pelo protocolo, em geral até 48 horas; depois disso, costuma-se aguardar a inserção de intervalo. “Até 72 horas” não representa a janela padrão.
B — Incorreta. O DIU de cobre é o método mais eficaz de contracepção de emergência e pode ser inserido até cinco dias após a relação desprotegida, não apenas até 72 horas.
C — Incorreta. Após aborto sem complicação infecciosa, pode ser inserido imediatamente; aguardar 40 dias deixa a paciente desnecessariamente exposta a nova gestação.`,

        'ginecologia-inep-020': `Resposta correta — B. Em pessoa com menos de 25 anos, ASC-US tem alta probabilidade de regressão espontânea e baixo risco imediato de lesão invasiva. Conforme o protocolo cobrado, deve-se repetir a citologia em três anos, mantendo seguimento adequado à faixa etária; vacinação prévia contra HPV não elimina a necessidade de acompanhamento.

Distratores:
A — Incorreta. Repetição em seis meses é antecipada para essa idade e grau de alteração, sendo usada em contextos de maior risco conforme protocolos anteriores ou resultados diferentes.
C — Incorreta. Controle em 12 meses também é mais intensivo que o recomendado pelo algoritmo específico para menores de 25 anos apresentado na prova.
D — Incorreta. Colposcopia imediata não é indicada no primeiro ASC-US dessa paciente jovem sem outros fatores de alto risco.

Ressalva temporal — o Brasil está em transição para rastreamento primário por DNA-HPV. A conduta deve seguir o protocolo vigente e o método disponível no local; a explicação preserva a estratégia citológica e o gabarito da questão.`,

        'ginecologia-inep-021': `Resposta correta — D. A ooforectomia bilateral aos 49 anos causou menopausa cirúrgica sintomática. Apesar da histerectomia, o antecedente de endometriose residual favorece associação de progestagênio ao estrogênio para reduzir estímulo sobre focos remanescentes e possível recorrência ou transformação, com decisão individualizada de dose, via e duração.

Distratores:
A — Incorreta. Fitoterápicos não têm eficácia comparável à terapia hormonal para sintomas vasomotores intensos, e endometriose prévia não exige evitá-la em todos os casos.
B — Incorreta. Alguns antidepressivos podem aliviar fogachos quando hormônios são contraindicados, mas tricíclicos não são primeira escolha e não há contraindicação absoluta descrita.
C — Incorreta. Após histerectomia, estrogênio isolado costuma ser possível, porém a endometriose extensa é exceção relevante pelo risco de estimular implantes residuais.`,

        'ginecologia-inep-022': `Resposta correta — D. Corrimento homogêneo, odor de aminas positivo, pH acima de 4,5 e clue cells preenchem critérios de Amsel para vaginose bacteriana, causada por disbiose com redução de lactobacilos e proliferação de anaeróbios. Pode ser tratada com metronidazol oral ou vaginal, ou clindamicina vaginal, conforme protocolo.

Distratores:
A — Incorreta. Vaginose citolítica associa-se a excesso de lactobacilos, citólise, pH baixo e teste de aminas negativo.
B — Incorreta. Tricomoníase costuma causar inflamação, corrimento amarelo-esverdeado e colo em morango; metronidazol vaginal isolado não é esquema adequado para erradicação do protozoário.
C — Incorreta. Candidíase produz prurido intenso, eritema e corrimento branco grumoso, geralmente com pH vaginal normal e teste de aminas negativo.`,

        'ginecologia-inep-023': `Resposta correta — A. Todo sangramento pós-menopausa exige investigação de câncer endometrial. Como a paciente está estável, com pequeno sangramento e sem anemia clinicamente aparente, a avaliação inicial pode ser ultrassonografia transvaginal para medir o endométrio, seguida de amostragem endometrial quando a espessura estiver aumentada, o sangramento persistir ou houver outros critérios de risco.

Distratores:
B — Incorreta. Ressonância de pelve não é exame inicial para sangramento pós-menopausa; costuma ser usada após diagnóstico em situações de estadiamento ou dúvida selecionada.
C — Incorreta. Histeroscopia cirúrgica não é automaticamente o primeiro passo sem ultrassonografia ou avaliação da cavidade e sem definir necessidade de intervenção.
D — Incorreta. Curetagem urgente é desproporcional em paciente hemodinamicamente estável com pequeno sangramento; investigação ambulatorial célere é adequada.

Validação visual pendente — o hemograma anunciado no enunciado não foi importado. Os valores devem ser conferidos no PDF-fonte para confirmar ausência de anemia relevante, embora os sinais vitais e o exame descritos sustentem estabilidade clínica.`,

        'ginecologia-inep-024': `Resposta correta — D. História de câncer de mama em parente de primeiro grau antes dos 50 anos caracteriza risco familiar aumentado no protocolo cobrado. A recomendação apresentada é iniciar mamografia anual a partir dos 35 anos, associada a avaliação clínica e eventual encaminhamento para estratificação de risco hereditário.

Distratores:
A — Incorreta. Embora mencione início após os 40 anos, não define rastreamento adequado ao risco familiar e sugere apenas exame clínico até lá.
B — Incorreta. Aplicar a estratégia da população geral ignora o diagnóstico materno precoce e a necessidade de avaliação de alto risco.
C — Incorreta. Aguardar 50 anos posterga excessivamente a investigação em pessoa com familiar de primeiro grau acometido antes dessa idade.

Ressalva temporal — recomendações de rastreamento para alto risco variam entre diretrizes e dependem da idade atual, pedigree, cálculo de risco e presença de mutação. O gabarito reflete o protocolo da prova; na prática atual, deve-se realizar aconselhamento de risco e individualizar mamografia e ressonância.`,

        'ginecologia-inep-025': `Resposta correta — C. Aos 15 dias pós-parto, a paciente está fora da janela de inserção pós-placentária ou puerperal imediata e deve aguardar a inserção de intervalo, em geral entre 4 e 6 semanas. O cobre libera íons que desencadeiam reação inflamatória local estéril e efeito citotóxico para espermatozoides, impedindo principalmente a fecundação.

Distratores:
A — Incorreta. Não é necessário aguardar 12 semanas, e o principal mecanismo não é impedir nidação por afinamento endometrial.
B — Incorreta. Inserção aos 15 dias não é imediata pós-parto nem inserção de intervalo; espessamento do muco é mecanismo predominante de métodos com levonorgestrel.
D — Incorreta. A janela de 15 dias não permite inserção imediata rotineira, e o DIU de cobre não torna o muco mais fluido como mecanismo contraceptivo.

Ressalva técnica — a redação da alternativa C atribui a ação ao endométrio, mas o efeito contraceptivo principal ocorre no ambiente uterino antes da fecundação, por toxicidade a espermatozoides e óvulo; não é um método abortivo.`,

        'ginecologia-inep-026': `Resposta correta — D. Em mulher pré-menopáusica assintomática, cisto ovariano simples, unilocular, anecoico, de paredes finas e sem componente sólido ou vascularização tem baixíssimo risco de malignidade e costuma ser funcional. Com cerca de 6 cm, recomenda-se repetir a ultrassonografia em 6 a 12 semanas para documentar regressão ou estabilidade.

Distratores:
A — Incorreta. CA 125 não é exame de rastreamento e tem baixa especificidade em mulheres na pré-menopausa, podendo elevar-se em várias condições benignas.
B — Incorreta. Apenas seguimento ginecológico habitual não documentaria a evolução de um cisto simples desse tamanho em prazo apropriado.
C — Incorreta. Ressonância é reservada a lesões indeterminadas ou complexas; a ultrassonografia já descreve características benignas suficientes.

Revisão do sinalizador — a descrição ultrassonográfica contém todos os critérios necessários para a conduta; a imagem original não é indispensável à resolução.`,

        'ginecologia-inep-027': `Resposta correta — C. Nódulo mamário na gestação deve ser investigado sem aguardar o parto. Ultrassonografia é o exame inicial por não usar radiação e diferenciar lesões sólidas e císticas; se necessário, mamografia com proteção abdominal tem dose fetal muito baixa e pode complementar a avaliação. Achado suspeito deve seguir para biópsia percutânea.

Distratores:
A — Incorreta. Biópsia pode ser necessária, mas deve ser orientada pela caracterização por imagem; requisitá-la imediatamente antes da ultrassonografia pula a etapa inicial adequada.
B — Incorreta. Nódulo mamário e história familiar demandam investigação mamária especializada, não tornam por si só a gestação obstetricamente de alto risco.
D — Incorreta. Adiar até o fim da gestação pode retardar diagnóstico de câncer; exames de imagem e biópsia podem ser realizados com segurança quando indicados.`,

        'ginecologia-inep-028': `Resposta correta — A. Febre, hiperemia, dor, flutuação e adenopatia em lactante caracterizam abscesso mamário. É necessário drenar a coleção e oferecer antibiótico contra os agentes prováveis. A amamentação ou a retirada de leite deve ser mantida em ambas as mamas quando tolerada e não houver contraindicação específica, pois o esvaziamento favorece a recuperação.

Distratores:
B — Incorreta. Punção guiada por ultrassonografia pode ser uma técnica adequada e menos invasiva, mas suspender a amamentação na mama afetada não é necessário na maioria dos casos.
C — Incorreta. Abscesso com flutuação exige drenagem; o leite materno não deve ser fervido, pois isso não faz parte do manejo e compromete suas propriedades.
D — Incorreta. O quadro agudo lactacional é compatível com abscesso; mamografia e anatomopatológico podem ser considerados se a evolução for atípica, mas não justificam adiar drenagem nem suspender amamentação.

Ressalva técnica — atualmente, aspiração por agulha guiada por ultrassonografia, por vezes repetida ou associada a cateter, é frequentemente preferida à incisão ampla quando viável. A alternativa A é a melhor porque combina drenagem com manutenção da lactação.`,

        'ginecologia-inep-029': `Resposta correta — C. NIC III é lesão intraepitelial de alto grau. A conização remove a zona de transformação e fornece peça íntegra para avaliar margens e excluir microinvasão, informação indispensável antes de considerar cirurgia mais extensa. Histerectomia não é tratamento inicial automático apenas porque a prole está constituída.

Distratores:
A — Incorreta. NIC III ou carcinoma in situ não exige histerectomia de primeira linha; é preciso excluir invasão e evitar morbidade desnecessária.
B — Incorreta. Paridade não transforma histerectomia em tratamento preferencial e não substitui critérios oncológicos.
D — Incorreta. A conização pode ser suficiente se confirmar doença intraepitelial completamente excisada, mas antes é necessária para afastar microinvasão; afirmar suficiência antecipadamente ignora sua função diagnóstica.`,

        'ginecologia-inep-030': `Resposta correta — B. Sangramento pós-menopausa recorrente e endométrio heterogêneo de 12 mm levantam suspeita de hiperplasia ou câncer endometrial. O médico deve informar claramente riscos, benefícios e alternativas, reforçar a necessidade de amostragem por histeroscopia e verificar compreensão. Se a paciente capaz mantiver a recusa, sua autonomia deve ser respeitada e documentada.

Distratores:
A — Incorreta. Respeitar a decisão não significa omitir o diagnóstico provável; sem informação adequada, a recusa não é verdadeiramente esclarecida.
C — Incorreta. Uma paciente lúcida e autônoma é a destinatária principal das informações. Compartilhar com a família depende de sua autorização, salvo exceções legais.
D — Incorreta. Recusa informada não autoriza abandono do cuidado; o serviço deve manter acolhimento, oferecer alternativas e garantir seguimento.`,

        'ginecologia-inep-031': `Resposta correta — C. Sangramento uterino anormal, tamoxifeno e endométrio heterogêneo espessado elevam a suspeita de pólipo, hiperplasia ou câncer endometrial. A paciente precisa de amostragem histológica, preferencialmente por histeroscopia com biópsia dirigida quando disponível, antes de qualquer tratamento empírico.

Distratores:
A — Incorreta. DIU com levonorgestrel pode tratar algumas causas de sangramento e hiperplasia sem atipia, mas não deve ser inserido antes de excluir malignidade, além de exigir discussão oncológica pelo antecedente mamário.
B — Incorreta. Tamoxifeno não deve ser suspenso unilateralmente antes do diagnóstico e da decisão compartilhada com a oncologia, pois oferece benefício contra recorrência do câncer de mama.
D — Incorreta. Progestagênio em altas doses pode mascarar sintomas e alterar o endométrio sem estabelecer a causa do sangramento.`,

        'ginecologia-inep-032': `Resposta correta — B. Mulher de 55 anos, sintomática, dentro da janela de oportunidade e sem contraindicações descritas pode receber terapia hormonal. Como não possui útero, estrogênio isolado é suficiente; a via transdérmica evita primeira passagem hepática e apresenta perfil trombótico favorável, além de prevenir perda óssea enquanto utilizada.

Distratores:
A — Incorreta. Raloxifeno é modulador seletivo do receptor de estrogênio, não terapia estrogênica para fogachos, pode piorar sintomas vasomotores e não demonstrou benefício cognitivo preventivo.
C — Incorreta. Progesterona é usada principalmente para proteger o endométrio; após histerectomia, sua associação rotineira é desnecessária na ausência de outra indicação.
D — Incorreta. Histerectomia e uso de anti-inflamatório não contraindicam terapia hormonal; tratamentos não hormonais são alternativas quando há contraindicação ou preferência.`,

        'ginecologia-inep-033': `Resposta correta — C. A legislação permite esterilização voluntária a pessoa com capacidade civil plena e idade mínima legal ou número mínimo de filhos vivos, sem exigir consentimento do cônjuge. O serviço deve oferecer aconselhamento imparcial sobre métodos reversíveis e irreversíveis, riscos, benefícios e caráter definitivo, preservando a livre decisão da paciente.

Distratores:
A — Incorreta. A paciente não deve receber contraceptivo hormonal contra sua escolha e pode preencher o critério etário legal vigente para esterilização.
B — Incorreta. Autorização do cônjuge deixou de ser exigida; condicionar o procedimento a terceiro viola autonomia reprodutiva.
D — Incorreta. Embora o aconselhamento sobre métodos reversíveis seja necessário, a justificativa de inelegibilidade é incorreta e não se deve usar a orientação para criar barreira ao método escolhido.

Ressalva temporal — a Lei nº 14.443/2022 reduziu a idade mínima para 21 anos e eliminou o consentimento conjugal, mantendo aconselhamento e prazo legal entre manifestação da vontade e cirurgia. A aplicação prática deve seguir a legislação vigente.`,

        'ginecologia-inep-034': `Resposta correta — A. Em mulher de 30 anos com primeiro resultado ASC-US e sem outro fator de alto risco descrito, o protocolo citológico cobrado recomenda repetir a citologia em seis meses. A maioria dessas alterações é transitória; persistência ou progressão define necessidade de colposcopia.

Distratores:
B — Incorreta. Teste de Schiller integra a colposcopia, mas não se indica biópsia imediata sem avaliação colposcópica e critério de persistência ou maior gravidade.
C — Incorreta. ASC-US isolado pode ser acompanhado na atenção primária e não requer serviço terciário.
D — Incorreta. Conização é procedimento excisional para lesões de alto grau ou situações diagnósticas específicas, excessivo para ASC-US inicial.

Ressalva temporal — com rastreamento primário por DNA-HPV, a conduta passa a depender do teste molecular e da triagem subsequente. O intervalo de seis meses reflete o algoritmo citológico utilizado pela questão.`,

        'ginecologia-inep-035': `Resposta correta — A. Após violência sexual com exposição penetrativa e lesão, deve-se oferecer profilaxia para infecções bacterianas e por protozoário conforme protocolo: benzilpenicilina benzatina para sífilis, ceftriaxona para gonorreia, azitromicina para clamídia e metronidazol para tricomoníase. Também são necessários acolhimento, coleta adequada sem atrasar profilaxias, avaliação para HIV e hepatite B, notificação e proteção integral.

Distratores:
B — Incorreta. Amoxicilina-clavulanato, cefaclor e ciprofloxacino não compõem o esquema profilático recomendado e podem oferecer cobertura inadequada ou redundante.
C — Incorreta. Cefaclor e clindamicina não substituem ceftriaxona e azitromicina na profilaxia de gonococo e clamídia.
D — Incorreta. O esquema omite profilaxia específica adequada para sífilis e clamídia e inclui antibióticos não recomendados para esse protocolo.

Ressalva temporal — doses e componentes podem mudar com resistência antimicrobiana e atualizações nacionais. O atendimento deve seguir o protocolo vigente, especialmente para profilaxia pós-exposição ao HIV dentro da janela indicada.`,

        'ginecologia-inep-036': `Resposta correta — D. Dismenorreia progressiva, hematoquezia cíclica, constipação, útero pouco móvel e nódulos dolorosos no fórnice posterior sugerem endometriose profunda com possível acometimento intestinal. A ressonância magnética da pelve com protocolo específico permite mapear extensão e relação com reto, vagina, ligamentos e outros órgãos, auxiliando o planejamento terapêutico.

Distratores:
A — Incorreta. Tomografia tem menor resolução de contraste para implantes e fibrose pélvica e não é o método preferencial de mapeamento da endometriose profunda.
B — Incorreta. Laparoscopia pode diagnosticar e tratar, mas não deve ser a investigação inicial invasiva quando métodos de imagem conseguem mapear a doença.
C — Incorreta. Histerossalpingografia avalia principalmente cavidade uterina e permeabilidade tubária, não lesões profundas extragenitais.

Ressalva técnica — ultrassonografia transvaginal especializada com preparo intestinal também é excelente exame inicial e pode ser preferida conforme disponibilidade; não foi oferecida entre as alternativas.`,

        'ginecologia-inep-037': `Resposta correta — D. Em toda pessoa em idade reprodutiva com sangramento uterino anormal e atividade sexual, a primeira etapa é excluir gravidez, inclusive gestação ectópica ou perda gestacional. Somente depois se atribui o quadro à anovulação, síndrome dos ovários policísticos ou outra causa estrutural e não estrutural.

Distratores:
A — Incorreta. Não há diagnóstico de abortamento incompleto sem confirmar gestação e avaliar clinicamente e por imagem; curetagem imediata seria invasiva e potencialmente danosa.
B — Incorreta. Acne e oligomenorreia sugerem hiperandrogenismo, mas acetato de ciproterona não deve ser iniciado sem investigação, aconselhamento contraceptivo e exclusão de gravidez e contraindicações.
C — Incorreta. Síndrome dos ovários policísticos é possível, porém em adolescente exige critérios cuidadosos e exclusão de outras causas; o sangramento atual demanda primeiro teste de gravidez.`,

        'ginecologia-inep-038': `Resposta correta — A. Após violência sexual há quatro horas, deve-se oferecer levonorgestrel em dose única o mais cedo possível e iniciar profilaxias para ISTs conforme o tipo de exposição, sem depender do status conhecido do agressor. O cuidado inclui profilaxia pós-exposição ao HIV dentro de 72 horas, hepatite B conforme vacinação, antibióticos indicados, acolhimento e coleta de vestígios com consentimento.

Distratores:
B — Incorreta. Injetável mensal não é contracepção de emergência, e testes iniciais negativos da vítima não excluem transmissão na exposição recente nem devem atrasar profilaxia.
C — Incorreta. Teste de gravidez não precisa condicionar a oferta da contracepção de emergência, que não interrompe gestação estabelecida; além disso, omite profilaxia para ISTs não virais.
D — Incorreta. Atendimento e profilaxias não dependem de boletim de ocorrência, perícia ou passagem prévia pela delegacia, e injetável mensal não serve para emergência.`,

        'ginecologia-inep-039': `Resposta correta — D. Amenorreia primária aos 16 anos apesar de desenvolvimento mamário e pilificação normais sugere produção hormonal preservada com possível ausência ou obstrução do trato reprodutivo. Deve-se investigar anomalia Mülleriana por exame e ultrassonografia pélvica, avaliando presença de útero, colo e vagina.

Distratores:
A — Incorreta. Síndrome de Turner costuma cursar com baixa estatura, disgenesia gonadal e pouco desenvolvimento mamário espontâneo, fenótipo diferente.
B — Incorreta. Insensibilidade completa aos andrógenos pode causar mamas desenvolvidas e ausência de útero, porém tipicamente há escassez de pelos pubianos e axilares, ao contrário do caso.
C — Incorreta. Hormônio do crescimento não é investigação central em adolescente de estatura normal; a dosagem hormonal isolada não substitui avaliação anatômica.`,

        'ginecologia-inep-040': `Resposta correta — C. Secreção endocervical mucopurulenta, colo friável com sangramento ao toque, disúria e dor à mobilização cervical caracterizam cervicite, tendo Neisseria gonorrhoeae como agente provável entre as opções. Deve-se testar também Chlamydia trachomatis e avaliar tratamento sindrômico e de parcerias conforme protocolo.

Distratores:
A — Incorreta. Candidíase causa prurido, eritema e corrimento branco grumoso, geralmente sem cervicite mucopurulenta ou friabilidade cervical.
B — Incorreta. Gardnerella associa-se a vaginose bacteriana, com corrimento homogêneo, pH elevado e teste de aminas positivo, sem inflamação cervical intensa.
D — Incorreta. Tricomoníase costuma elevar o pH, produzir corrimento amarelo-esverdeado e pode causar colo em morango; o pH normal e o padrão endocervical favorecem gonococo.`,

        'ginecologia-inep-041': `Resposta correta — B. Lesão anecoica, circunscrita, sem septos ou vascularização e com reforço acústico posterior corresponde a cisto mamário simples, classificado como BI-RADS 2. É achado benigno que não requer biópsia ou imagem adicional; basta orientação, analgesia se sintomático e seguimento clínico apropriado.

Distratores:
A — Incorreta. Fibroadenoma é lesão sólida, geralmente hipoecoica, e não anecoica com reforço posterior; ressonância não é indicada para esclarecer BI-RADS 2.
C — Incorreta. Existe um cisto benigno documentado, portanto não se descrevem “mamas normais”; autoexame mensal não é método de rastreamento capaz de substituir mamografia indicada.
D — Incorreta. Adensamento mamário não corresponde à imagem cística e mamografia não é necessária para caracterizar esse achado benigno específico aos 33 anos.

Ressalva clínica — o histórico de mãe com câncer de mama aos 42 anos e tia com câncer de ovário exige estratificação de risco hereditário e possível aconselhamento genético, independentemente de o cisto atual ser benigno.`,

        'ginecologia-inep-042': `Resposta correta — A. Teste rápido treponêmico reagente deve ser complementado por teste não treponêmico quantitativo, como VDRL, para estabelecer título basal, auxiliar na avaliação de atividade e permitir monitoramento da resposta terapêutica. O antecedente de lesão endurecida indolor com adenopatia é compatível com sífilis primária recente.

Distratores:
B — Incorreta. FTA-ABS também é treponêmico e não acrescenta a quantificação necessária após um teste rápido treponêmico já positivo.
C — Incorreta. Dose única de penicilina benzatina é o esquema para sífilis recente, mas a alternativa pula o VDRL basal; pela chave da questão, a etapa solicitada é completar a avaliação laboratorial.
D — Incorreta. Três doses semanais são usadas em sífilis tardia ou de duração ignorada, não no quadro clínico recente descrito.

Ressalva técnica — protocolos brasileiros permitem e frequentemente recomendam iniciar tratamento imediatamente após o primeiro teste reagente quando há quadro clínico, risco de perda de seguimento ou ausência de tratamento prévio, colhendo o VDRL no mesmo atendimento. A alternativa A foi preservada como gabarito, mas “confirmar” é impreciso: o VDRL complementa e estabelece título, e não deve atrasar penicilina quando indicada.`,

        'ginecologia-inep-043': `Resposta correta — C. Sangramento após quatro anos de menopausa é anormal e exige investigação de causa estrutural, especialmente hiperplasia ou câncer endometrial. A ultrassonografia pélvica por via transvaginal é exame inicial para medir espessura e avaliar morfologia do endométrio, direcionando necessidade de biópsia.

Distratores:
A — Incorreta. Coagulopatia é causa não estrutural e não é a hipótese principal em sangramento pós-menopausa isolado sem outros sinais hemorrágicos.
B — Incorreta. Hiperprolactinemia causa amenorreia ou irregularidade durante vida reprodutiva, não sangramento estrutural após menopausa.
D — Incorreta. Distúrbios tireoidianos podem alterar ciclos antes da menopausa, mas não substituem investigação uterina nesse cenário.`,

        'ginecologia-inep-044': `Resposta correta — B. BI-RADS 4 indica achado suspeito que precisa de confirmação histológica. Microcalcificações agrupadas são geralmente biopsiadas por técnica percutânea guiada por mamografia, como biópsia estereotáxica ou a vácuo, permitindo diagnóstico antes de definir cirurgia.

Distratores:
A — Incorreta. Quadrantectomia não deve ser realizada sem diagnóstico histológico e planejamento oncológico, pois a lesão pode ser benigna ou exigir abordagem diferente.
C — Incorreta. Controle semestral é conduta para BI-RADS 3, não para categoria 4.
D — Incorreta. Ultrassonografia pode não visualizar microcalcificações e não substitui a biópsia indicada pela mamografia suspeita.`,

        'ginecologia-inep-045': `Resposta correta — A. Sangramento pós-menopausa recorrente, obesidade e endométrio irregular de 8 mm exigem amostragem para excluir hiperplasia e carcinoma. Histeroscopia diagnóstica permite inspecionar a cavidade e realizar biópsia dirigida de áreas focais, sendo apropriada para endométrio irregular.

Distratores:
B — Incorreta. Terapia hormonal antes de esclarecer o sangramento pode estimular ou mascarar patologia endometrial e é contraindicada até investigação.
C — Incorreta. Ácido tranexâmico não trata a causa e citologia cervical normal não avalia adequadamente o endométrio.
D — Incorreta. Histerectomia com anexectomia é tratamento definitivo de condições selecionadas, mas seria excessiva antes de obter diagnóstico histológico.`,

        'ginecologia-inep-046': `Resposta correta — B. Febre, dor pélvica, defesa abdominal, dor à mobilização do colo e anexos e cervicite mucopurulenta ou friável formam quadro típico de doença inflamatória pélvica. A paciente deve ser tratada imediatamente de forma sindrômica, após teste de gravidez e avaliação de gravidade, sem aguardar confirmação microbiológica.

Distratores:
A — Incorreta. Gravidez ectópica deve sempre ser excluída com beta-hCG, mas menstruação recente, febre e cervicite com dor difusa favorecem infecção; rotura costuma causar instabilidade ou hemoperitônio.
C — Incorreta. Torção anexial produz dor súbita intensa, geralmente unilateral, náuseas e massa ovariana, mas não explica febre alta e colo friável com secreção.
D — Incorreta. Rotura de cisto hemorrágico pode ocorrer após relação e causar dor aguda, porém não costuma causar cervicite, febre e dor à mobilização cervical e anexial difusa.`,

        'ginecologia-inep-047': `Resposta correta — D. Mulher de 54 anos, quatro anos após menopausa, com sintomas intensos e sem contraindicação absoluta está dentro da janela favorável para terapia hormonal. Tabagismo e hipertensão controlada favorecem estradiol transdérmico, que evita primeira passagem hepática e tem menor impacto trombótico; como há útero, associa-se progesterona micronizada para proteção endometrial.

Distratores:
A — Incorreta. Estriol vaginal trata principalmente síndrome geniturinária e não controla adequadamente fogachos, sudorese e insônia intensos; tabagismo isolado não contraindica toda terapia sistêmica.
B — Incorreta. Terapia oral apresenta maior efeito hepático e risco tromboembólico que a via transdérmica, menos favorável nesse perfil cardiovascular.
C — Incorreta. Mudanças de estilo de vida são importantes, especialmente cessar tabagismo, mas não substituem obrigatoriamente terapia eficaz quando sintomas são importantes e não há contraindicação.`,

        'ginecologia-inep-048': `Resposta correta — D. Amenorreia secundária, acne e hirsutismo, com gravidez excluída e TSH, prolactina e FSH normais, indicam anovulação crônica hiperandrogênica, sendo síndrome dos ovários policísticos a causa mais provável. O anticoncepcional provavelmente mascarava ciclos irregulares e manifestações androgênicas.

Distratores:
A — Incorreta. Insuficiência ovariana prematura costuma apresentar FSH elevado e sintomas de hipoestrogenismo.
B — Incorreta. Hipogonadismo hipogonadotrófico associa-se a gonadotrofinas baixas, baixa produção estrogênica e contexto como baixo peso, exercício intenso ou doença crônica, não hiperandrogenismo típico.
C — Incorreta. Anticoncepcional combinado não costuma causar amenorreia persistente por nove meses após suspensão; é necessário investigar causa subjacente.

Ressalva clínica — antes de confirmar síndrome dos ovários policísticos, devem ser excluídas outras causas de hiperandrogenismo e anovulação, como hiperplasia adrenal não clássica, tumor secretor e síndrome de Cushing conforme apresentação.`,

        'ginecologia-inep-049': `Resposta correta — D. O sistema intrauterino com levonorgestrel oferece contracepção altamente eficaz e reduz proliferação endometrial, volume do sangramento e dismenorreia. É opção terapêutica para sangramento uterino anormal em pacientes elegíveis, além de método contraceptivo de longa duração.

Distratores:
A — Incorreta. Enfermeiros capacitados podem inserir e retirar DIU conforme protocolos, regulamentação profissional e organização do serviço.
B — Incorreta. DIU pode ser inserido imediatamente após aborto quando não há infecção ou outra contraindicação, oferecendo proteção rápida contra nova gestação.
C — Incorreta. O DIU de cobre é usado como contracepção de emergência, em geral até cinco dias após a relação desprotegida ou conforme estimativa de ovulação; “até sete dias” não é o limite padrão universal.`,

        'ginecologia-inep-050': `Resposta correta — B. Dor localizada, hiperemia e calor mamário com sintomas sistêmicos leves em puérpera com fissuras sugerem mastite lactacional, ainda sem abscesso porque não há flutuação. O tratamento inclui analgesia, antibiótico oral com cobertura para estafilococo, correção da pega e manutenção do esvaziamento pela amamentação ou ordenha.

Distratores:
A — Incorreta. Galactocele é coleção de leite geralmente indolor e sem hiperemia, calor ou febre.
C — Incorreta. Abscesso forma coleção flutuante ou demonstrável à ultrassonografia e exige drenagem; não há esse achado no caso.
D — Incorreta. Ingurgitamento tende a ser bilateral e difuso, sem área eritematosa focal; interromper amamentação piora estase e não é recomendado.`,

        'ginecologia-inep-051': `Resposta correta — A. Lesão vulvar eritematosa e descamativa persistente em idosa, refratária a corticoide e antifúngico e associada a líquen escleroso, exige avaliação dirigida e biópsia para excluir neoplasia intraepitelial diferenciada, doença de Paget ou carcinoma espinocelular. HPV negativo não afasta essas doenças, muitas das quais não são relacionadas ao vírus.

Distratores:
B — Incorreta. Clobetasol é tratamento de primeira linha do líquen escleroso, mas uma área focal persistente e diferente deve ser biopsiada antes de atribuí-la apenas a inflamação ou alergia.
C — Incorreta. Falha ao fluconazol e aspecto persistente tornam micose improvável; cultura e cetoconazol não substituem histologia.
D — Incorreta. Azul de toluidina não estabelece diagnóstico, e vulvectomia sem biópsia prévia seria tratamento excessivo e sem planejamento oncológico.`,

        'ginecologia-inep-052': `Resposta correta — C. A avaliação inicial do sangramento uterino anormal inclui estabilidade hemodinâmica, teste de gravidez em pessoa com potencial reprodutivo e exame físico com inspeção de vulva, vagina e colo para localizar a origem e excluir lesões. Depois, investigam-se causas estruturais e não estruturais pelo sistema PALM-COEIN.

Distratores:
A — Incorreta. Sangramento uterino anormal é frequente e pode ocorrer em diferentes fases da vida, com maior irregularidade em transições reprodutivas; não é condição rara.
B — Incorreta. Embora possa afetar profundamente a qualidade de vida, histerectomia não é primeira linha universal; o tratamento deve considerar causa, gravidade, desejo reprodutivo e opções clínicas menos invasivas.
D — Incorreta. Ultrassonografia é importante para causas estruturais, mas a afirmação generaliza seu desempenho e não substitui história, exame, teste de gravidez e amostragem endometrial quando indicada.`,

        'ginecologia-inep-053': `Resposta correta — D. Aos 35 anos, sem alteração clínica e com apenas tia diagnosticada aos 62 anos, a paciente permanece no grupo de risco populacional no protocolo do Ministério da Saúde cobrado. Deve manter acompanhamento clínico e iniciar mamografia bienal dos 50 aos 69 anos, sem imagem imediata apenas por mastalgia recente.

Distratores:
A — Incorreta. Ressonância anual é reservada a grupos de alto risco bem definidos e não se justifica por uma tia com câncer em idade mais avançada.
B — Incorreta. Ultrassonografia não é método de rastreamento populacional bienal e não substitui mamografia.
C — Incorreta. Mamografia anual antes dos 50 anos não corresponde à recomendação populacional citada e aumentaria falsos positivos e intervenções sem indicação.

Ressalva temporal — faixas etárias de rastreamento podem variar entre Ministério da Saúde e sociedades médicas e sofrer atualizações. A mastalgia deve ser reavaliada se persistente, focal ou acompanhada de novo achado clínico.`,

        'ginecologia-inep-054': `Resposta correta — C. Projeção papilar é componente sólido intracístico e constitui característica morfológica suspeita para neoplasia ovariana, especialmente se vascularizada. Esse achado determina avaliação especializada e investigação cirúrgica, com estratificação de risco e planejamento para evitar ruptura inadequada.

Distratores:
A — Incorreta. Tamanho de 6 cm influencia seguimento e risco de complicações, mas um cisto simples desse tamanho poderia ser acompanhado; a projeção papilar é o sinal decisivo de suspeição.
B — Incorreta. Idade de 45 anos aumenta atenção, porém não indica cirurgia isoladamente sem considerar morfologia, sintomas e risco.
D — Incorreta. Irregularidade menstrual deve ser investigada, mas não define o potencial maligno da massa anexial.`,

        'ginecologia-inep-055': `Resposta correta — D. Para mulher hipertensa controlada que deseja menor risco sistêmico, estradiol transdérmico evita primeira passagem hepática e tem menor impacto sobre coagulação, triglicerídeos e pressão que estrogênio oral. Como o útero está presente, é preciso associar progestagênio; a progesterona micronizada tem perfil metabólico e mamário favorável em comparação com alguns progestágenos sintéticos.

Distratores:
A — Incorreta. Estradiol oral sofre primeira passagem hepática e noretisterona pode ter perfil menos favorável que progesterona micronizada para a paciente que solicita menor risco.
B — Incorreta. A via transdérmica é vantajosa, mas noretisterona não oferece o perfil global mais favorável entre as opções.
C — Incorreta. Estrogênios equinos conjugados em dose padrão associados a medroxiprogesterona por via oral apresentam maior impacto hepático e evidência de riscos menos favoráveis.

Ressalva técnica — a via e o esquema da progesterona devem garantir proteção endometrial adequada. O uso vaginal para terapia menopausal varia conforme formulação e protocolo; é necessário acompanhar sangramento e ajustar o regime individualmente.`,

        'ginecologia-inep-056': `Resposta correta — A. Trata-se de sangramento uterino agudo com instabilidade hemodinâmica. Após estabilização, acesso venoso e reposição, devem-se obter hemograma para avaliar anemia, ultrassonografia para causas estruturais e exames dirigidos como TSH conforme contexto; progestagênio em alta dose, como acetato de medroxiprogesterona, é opção para controle quando estrogênio não é escolhido.

Distratores:
B — Incorreta. TGO e TGP podem ser úteis antes de tratamentos específicos, mas não são o conjunto inicial mais informativo; desogestrel contínuo não é o esquema de ação rápida mais apropriado para hemorragia aguda instável.
C — Incorreta. Coagulograma e ultrassonografia ajudam, porém anti-inflamatório isolado tem efeito limitado e é inadequado como terapia principal diante de choque e sangramento volumoso.
D — Incorreta. FSH, LH e prolactina não são prioridades na emergência, e diclofenaco não controla adequadamente a hemorragia grave.

Ressalva técnica — o atendimento real também exige beta-hCG, tipagem e prova cruzada, coagulograma e avaliação para transfusão conforme perda e resposta. Se a hemorragia não responder ao tratamento clínico, medidas mecânicas ou cirúrgicas podem ser necessárias; a alternativa A é a melhor disponível, mas incompleta para uma paciente hipotensa.`,

        'ginecologia-inep-057': `Resposta correta — C. BI-RADS 0 significa avaliação incompleta e necessidade de imagem adicional. Diante de massa palpável, a primeira complementação é ultrassonografia dirigida, que diferencia componente sólido e cístico, avalia margens e linfonodos e orienta eventual biópsia.

Distratores:
A — Incorreta. Biópsia pode ser necessária se a imagem complementar mostrar suspeição, mas primeiro é preciso localizar e caracterizar adequadamente a lesão.
B — Incorreta. Repetir em seis meses é conduta de provável benignidade, não de exame incompleto associado a massa palpável.
D — Incorreta. Punção aspirativa tem limitações para diagnóstico histológico de massas sólidas e não deve anteceder a caracterização por imagem; quando indicada, biópsia por agulha grossa costuma fornecer melhor material.`,

        'ginecologia-inep-058': `Resposta correta — D. Tromboembolismo pulmonar e lúpus tornam métodos combinados com estrogênio inaceitáveis. O útero didelfo dificulta assegurar posicionamento e eficácia de dispositivo intrauterino em ambas as cavidades, e o fluxo intenso desfavorece cobre. Entre as opções, pílula apenas com progestagênio é a escolha sistêmica mais adequada.

Distratores:
A — Incorreta. O levonorgestrel reduziria sangramento e não contém estrogênio, mas a malformação com duas cavidades pode impedir cobertura contraceptiva confiável por um único sistema e exige avaliação anatômica especializada.
B — Incorreta. Além da dificuldade anatômica, o DIU de cobre pode aumentar fluxo e cólicas, piorando a queixa atual.
C — Incorreta. Etinilestradiol associado a gestodeno aumenta risco tromboembólico e é contraindicado após embolia pulmonar.

Ressalva clínica — implante subdérmico seria outra opção de longa duração sem depender da anatomia uterina, mas não foi oferecido. A elegibilidade do progestagênio também deve considerar atividade do lúpus e presença de anticorpos antifosfolípides.`,

        'ginecologia-inep-059': `Resposta correta — A. Prurido, hiperemia e corrimento branco grumoso aderente, sem odor forte, com pH menor que 4,5 e teste de aminas negativo, formam o quadro típico de candidíase vulvovaginal por Candida sp.

Distratores:
B — Incorreta. Gardnerella está associada a vaginose bacteriana, com corrimento fino homogêneo, pH elevado, odor de aminas e clue cells, geralmente sem inflamação intensa.
C — Incorreta. Trichomonas vaginalis costuma produzir corrimento amarelo-esverdeado, pH acima de 4,5 e colo com aspecto de morango.
D — Incorreta. Chlamydia trachomatis causa cervicite mucopurulenta e friabilidade cervical, frequentemente com pouco sintoma vaginal, não corrimento grumoso e prurido.`,

        'ginecologia-inep-060': `Resposta correta — B. Adolescente capaz de compreender riscos e benefícios pode receber aconselhamento e contracepção com confidencialidade. A procura espontânea demonstra cuidado com a saúde; o médico deve avaliar elegibilidade, discutir dupla proteção e ISTs, oferecer métodos disponíveis e incentivar diálogo familiar sem torná-lo condição para atendimento.

Distratores:
A — Incorreta. Desejar prevenção adicional não demonstra imaturidade nem risco iminente que autorize quebra automática do sigilo; contracepção não substitui preservativo, mas ambos podem ser usados.
C — Incorreta. Recusar por medo de responsabilização abandona prevenção efetiva e pode aumentar risco de gravidez; maturidade pode ser avaliada na consulta.
D — Incorreta. A prescrição pode ser apropriada, mas não se deve comunicar os pais contra a vontade sem risco relevante ou outra exceção; incapacidade civil não elimina direitos sexuais, reprodutivos e de confidencialidade em saúde.`,

        'ginecologia-inep-061': `Resposta correta — C. Dor aguda no meio do ciclo, teste de gravidez negativo, cisto ovariano heterogêneo de 4 cm com vascularização periférica e pequena quantidade de líquido livre sugerem corpo lúteo ou cisto hemorrágico, possivelmente roto. Como a paciente está estável e sem hemorragia volumosa, a conduta é analgesia, observação clínica e reavaliação.

Distratores:
A — Incorreta. Laparotomia é reservada a instabilidade, hemoperitônio importante ou impossibilidade de abordagem minimamente invasiva; não se justifica em paciente estável.
B — Incorreta. Laparoscopia com preservação ovariana pode ser necessária se houver torção, sangramento persistente ou dúvida diagnóstica, mas a imagem e estabilidade permitem manejo conservador inicial.
D — Incorreta. Ooforectomia seria excessiva em mulher jovem com lesão funcional provável e sem evidência de necrose ou malignidade.

Ressalva clínica — sinais de irritação peritoneal exigem observação rigorosa, hemograma seriado e pronta reavaliação cirúrgica se houver piora, queda de hemoglobina ou instabilidade.`,

        'ginecologia-inep-062': `Resposta correta — D. Perda contínua de líquido pela vagina após histerectomia, preservando micção uretral normal, sugere fístula ureterovaginal: a urina do ureter lesionado drena pela vagina enquanto o rim contralateral e a bexiga mantêm micção. A coleção perivesical reforça complicação urinária pós-operatória.

Distratores:
A — Incorreta. Incontinência por disfunção do assoalho ocorre em situações como esforço ou urgência e não costuma causar drenagem vaginal contínua iniciada após cirurgia.
B — Incorreta. Abscesso pélvico tende a causar febre, dor, secreção purulenta e sinais inflamatórios, ausentes no caso.
C — Incorreta. Seroma pode formar coleção pós-operatória, mas não produz perda progressiva contínua de urina pelo canal vaginal.`,

        'ginecologia-inep-063': `Resposta correta — D. Antecedente de trombose venosa torna a via oral particularmente arriscada por aumentar fatores hepáticos de coagulação. Entre as opções, suspender a formulação oral e usar estradiol transdérmico combinado a proteção endometrial oferece menor efeito trombogênico e é a alternativa de menor risco relativo para sintomas intensos.

Distratores:
A — Incorreta. Fitoterápicos não constituem “terapia hormonal” segura e têm eficácia e qualidade de evidência variáveis; trocar sem discutir opções efetivas pode manter grande prejuízo de qualidade de vida.
B — Incorreta. Estrogênio oral mantém o aumento de risco tromboembólico, mesmo com sistema intrauterino para proteção endometrial.
C — Incorreta. Estrogênio isolado é inadequado se o útero está presente e a via oral continua desfavorável; histeroscopia não corrige esse risco.

Validação visual pendente — a tabela de exames recentes não foi importada e deve ser conferida no PDF-fonte, especialmente mamografia, avaliação endometrial, perfil metabólico e possíveis contraindicações adicionais.

Ressalva clínica — trombose venosa prévia pode contraindicar terapia hormonal sistêmica, e nem a via transdérmica elimina todo risco. A alternativa D preserva o gabarito e representa menor risco relativo entre as opções, mas a decisão real exige avaliação especializada, causa da trombose, necessidade de anticoagulação e preferência informada.`,

        'ginecologia-inep-064': `Resposta correta — D. Aos 35 anos, sem sintomas ou achados clínicos e sem padrão familiar claramente compatível com síndrome hereditária específica, não há indicação automática de mamografia ou ultrassonografia de rastreamento pelo protocolo populacional cobrado. Deve-se realizar avaliação clínica, orientar redução de riscos modificáveis e manter controle periódico.

Distratores:
A — Incorreta. Mamografia e ultrassonografia combinadas não são indicadas de rotina nessa idade apenas pelos fatores apresentados.
B — Incorreta. O exame clínico é pertinente, mas a mamografia imediata não decorre automaticamente da história descrita no algoritmo da questão.
C — Incorreta. Pesquisa isolada de BRCA1 não é indicada sem aconselhamento e avaliação detalhada do heredograma; câncer de ovário materno tardio e câncer intestinal paterno não definem, sozinhos, mutação BRCA1.

Ressalva clínica — todo câncer de ovário em familiar próximo merece história familiar detalhada e avaliação de critérios para aconselhamento genético, inclusive síndromes BRCA e Lynch. A alternativa D reflete o gabarito de rastreamento, mas não dispensa estratificação individual de risco.`,

        'ginecologia-inep-065': `Resposta correta — A. Dor óssea progressiva e refratária em paciente com antecedente de câncer de mama, associada a lesões líticas vertebrais, deve ser considerada metástase óssea até prova em contrário. É necessária investigação oncológica urgente, avaliação de estabilidade vertebral e de compressão neural, além de controle da dor.

Distratores:
B — Incorreta. Tuberculose vertebral pode causar dor e destruição óssea, mas costuma apresentar comprometimento discal, colapso e abscesso paravertebral; o antecedente oncológico torna metástase mais provável.
C — Incorreta. Hérnia discal causa dor radicular ou mecânica e não produz múltiplas lesões líticas na radiografia.
D — Incorreta. Fratura vertebral pode causar dor intensa, mas o padrão lítico e o câncer prévio indicam que, se houver fratura, ela provavelmente é patológica por metástase, e não diagnóstico isolado.`,

        'ginecologia-inep-066': `Resposta correta — A. Oligoamenorreia crônica, obesidade, acne e hirsutismo sugerem síndrome dos ovários policísticos, mas ela é diagnóstico de exclusão. Após afastar gravidez, deve-se investigar causas comuns e tratáveis, incluindo disfunção tireoidiana, hiperprolactinemia e hiperplasia adrenal não clássica com 17-hidroxiprogesterona.

Distratores:
B — Incorreta. Perfil metabólico é importante, porém cortisol e DHEA não constituem o painel inicial universal e não confirmam sozinhos síndrome dos ovários policísticos.
C — Incorreta. Estrogênio isolado em dose descrita não é teste diagnóstico apropriado e pode expor endométrio e paciente a riscos sem esclarecer a causa.
D — Incorreta. Espironolactona exige contracepção eficaz devido ao risco fetal e não deve ser iniciada antes da investigação; ultrassonografia não é obrigatória para confirmar o diagnóstico quando outros critérios estão presentes.

Ressalva clínica — a avaliação também costuma incluir testosterona total ou livre e rastreio metabólico, com investigação de tumor secretor ou síndrome de Cushing se houver virilização ou progressão rápida.`,

        'ginecologia-inep-067': `Resposta correta — C. Candidíase vulvovaginal produz prurido, eritema e corrimento branco, espesso ou grumoso, frequentemente aderido às paredes vaginais e ao colo. O pH costuma permanecer abaixo de 4,5, e microscopia pode mostrar leveduras, brotamento ou pseudohifas.

Distratores:
A — Incorreta. Chlamydia trachomatis causa principalmente cervicite, muitas vezes assintomática, com secreção endocervical e friabilidade, não intensa vaginite das paredes.
B — Incorreta. Tricomoníase costuma gerar corrimento abundante amarelo-esverdeado e inflamação; diagnóstico pode ser feito por teste molecular, microscopia ou cultura, e não se caracteriza por corrimento escasso.
D — Incorreta. Vaginite citolítica associa-se a excesso de lactobacilos, citólise e pH baixo, não pH elevado nem predomínio de bacilos Gram negativos.`,

        'ginecologia-inep-068': `Resposta correta — A. Pequenos miomas intramurais e subserosos descobertos incidentalmente em mulher assintomática, com ciclos e fluxo normais, não exigem tratamento. A conduta é acompanhamento clínico, orientando retorno se surgirem sangramento, dor, sintomas compressivos ou crescimento relevante; imagem seriada pode ser individualizada.

Distratores:
B — Incorreta. Miomectomia é indicada por sintomas, infertilidade em contextos selecionados ou suspeita diagnóstica, não apenas pela coexistência de localizações.
C — Incorreta. Histerectomia é cirurgia definitiva com morbidade e não se justifica por volume uterino isolado em paciente sem queixas.
D — Incorreta. Antifibrinolítico trata sangramento menstrual aumentado, que a paciente nega; não se prescreve preventivamente.

Revisão do sinalizador — o laudo ultrassonográfico completo está transcrito e permite definir a conduta; não é necessário visualizar a imagem para resolver a questão.`,

        'ginecologia-inep-069': `Resposta correta — A. Na violência sexual infantil, o agressor frequentemente pertence à família ou ao círculo de confiança e tem acesso repetido à criança. Segredo imposto, brincadeira sexualizada e recusa em detalhar são sinais de alerta que exigem acolhimento protegido, notificação compulsória e acionamento da rede de proteção sem confrontar a criança ou o suspeito.

Distratores:
B — Incorreta. Meninas são mais frequentemente identificadas como vítimas em dados de violência sexual, embora casos em meninos possam ser subnotificados e também exijam atenção.
C — Incorreta. Abuso na infância pode produzir repercussões duradouras sobre saúde mental, vínculos, sexualidade e risco de revitimização; idade baixa não garante esquecimento ou ausência de dano.
D — Incorreta. A equipe deve cuidar das lesões e do sofrimento, mas também notificar e articular proteção com Conselho Tutelar e autoridades competentes conforme o fluxo legal.

Ressalva assistencial — deve-se evitar perguntas repetitivas ou sugestivas que provoquem revitimização. A escuta especializada e o depoimento especial seguem profissionais e procedimentos próprios.`,

        'ginecologia-inep-070': `Resposta correta — B. Insuficiência ovariana antes dos 40 anos causa hipogonadismo hipergonadotrófico: a queda da função folicular reduz estradiol e inibina, retirando o feedback negativo e elevando FSH. O diagnóstico requer alteração menstrual e confirmação hormonal em avaliações apropriadas, além de investigação etiológica.

Distratores:
A — Incorreta. Estradiol não se eleva quando a função ovariana falha; tende a ficar baixo.
C — Incorreta. FSH baixo com estradiol elevado sugere função ovariana preservada ou exposição hormonal, não insuficiência ovariana.
D — Incorreta. FSH baixo e inibina elevada refletem feedback negativo ativo, oposto ao mecanismo da falência folicular.`,

        'ginecologia-inep-071': `Resposta correta — B. Categoria 4 dos critérios de elegibilidade significa risco inaceitável: o método não deve ser utilizado. Trombofilia conhecida aumenta substancialmente o risco de tromboembolismo associado ao estrogênio e constitui contraindicação absoluta aos contraceptivos hormonais combinados.

Distratores:
A — Incorreta. Cefaleia tensional sem características de enxaqueca não é contraindicação absoluta a método combinado.
C — Incorreta. A frase define categoria 3, não categoria 4; câncer de mama atual contraindica contracepção hormonal, mas a classificação e justificativa apresentadas estão incorretamente combinadas.
D — Incorreta. Também descreve categoria 3 (“usar apenas se outras opções não forem aceitáveis”), enquanto trombose venosa ou embolia pulmonar em situações de alto risco pode tornar estrogênio categoria 4 e exigir método sem estrogênio.`,

        'ginecologia-inep-072': `Resposta correta — C. Lesão intraepitelial escamosa de alto grau na citologia tem risco relevante de NIC 2, NIC 3 ou câncer e exige encaminhamento oportuno ao atendimento secundário para colposcopia, com biópsia dirigida das áreas suspeitas. A conduta posterior depende dos achados histológicos e da avaliação da zona de transformação.

Distratores:
A — Incorreta. Repetir citologia em seis meses pode atrasar diagnóstico de lesão de alto grau e não é a conduta inicial adequada.
B — Incorreta. Nova citologia imediata não esclarece a lesão já detectada e não substitui avaliação colposcópica.
D — Incorreta. Conização pode ser necessária em situações definidas, mas não deve ser indicada automaticamente antes da colposcopia e confirmação ou avaliação adequada.`,

        'ginecologia-inep-073': `Resposta correta — D. Sangramento aumentado, endométrio muito espessado e heterogêneo e lesão intracavitária hiperecoica de contornos regulares sugerem pólipo endometrial. A histeroscopia permite visualizar diretamente a cavidade, confirmar a lesão e realizar biópsia ou ressecção dirigida.

Distratores:
A — Incorreta. A citologia mostra apenas alterações benignas e o colo está normal; a alteração está localizada na cavidade uterina, não no colo.
B — Incorreta. Não há dados de gravidez atual ou massa anexial; teste de gravidez deve ser considerado, mas a imagem endometrial focal não indica ectópica nem laparotomia.
C — Incorreta. Miomas submucosos podem causar sangramento, porém a descrição hiperecoica focal favorece pólipo; laparoscopia avalia a superfície pélvica, não é o método para uma lesão intracavitária.`,

        'ginecologia-inep-074': `Resposta correta — C. Lubrificação insuficiente é causa frequente de dor à penetração e pode relacionar-se a baixa excitação, hipoestrogenismo, medicamentos e, em algumas pessoas, contraceptivos hormonais. A avaliação deve integrar fatores físicos, hormonais, sexuais, relacionais e psicossociais.

Distratores:
A — Incorreta. Dispareunia é multifatorial e pode envolver ansiedade, trauma, medo, relacionamento, assoalho pélvico, inflamação e alterações anatômicas.
B — Incorreta. Endometriose é causa clássica de dispareunia profunda, e seus sintomas podem ocorrer também fora do período menstrual.
D — Incorreta. Dor à penetração não se restringe a infecções; pode decorrer de atrofia, vulvodínia, dermatoses, vaginismo, trauma ou lubrificação inadequada.`,

        'ginecologia-inep-075': `Resposta correta — A. AGC, mesmo classificada como possivelmente não neoplásica, tem risco de lesão glandular, escamosa de alto grau ou adenocarcinoma e não deve ser apenas observada. A paciente deve realizar colposcopia com avaliação do canal endocervical; amostragem endometrial é acrescentada conforme idade, sangramento e fatores de risco.

Distratores:
B — Incorreta. Citologia anual isolada é insuficiente após AGC e pode atrasar diagnóstico de lesão significativa.
C — Incorreta. Exérese imediata da zona de transformação não é indicada antes da investigação colposcópica e endocervical, salvo achados específicos posteriores.
D — Incorreta. Repetir citologia em seis meses não substitui investigação diagnóstica imediata de atipia glandular.`,

        'ginecologia-inep-076': `Resposta correta — A. Massa ovariana de 10 cm, dor unilateral que se torna intensa e contínua e ausência de fluxo ao Doppler sugerem torção anexial. O ovário gira sobre o pedículo, comprometendo primeiro retorno venoso e depois fluxo arterial; trata-se de emergência que requer laparoscopia rápida com destorção e preservação ovariana quando possível.

Distratores:
B — Incorreta. Abscesso tubo-ovariano costuma acompanhar febre, leucocitose, corrimento, dor à mobilização cervical e contexto de doença inflamatória pélvica, ausentes no caso.
C — Incorreta. Endometrioma apresenta conteúdo homogêneo de ecos de baixa intensidade, aspecto de “vidro fosco”, e sintomas mais crônicos ou cíclicos.
D — Incorreta. Cisto hemorrágico pode causar dor e ecos internos, mas costuma manter vascularização periférica e não explica tão bem massa grande com ausência de fluxo e piora progressiva típica de torção.

Revisão do sinalizador — o laudo ultrassonográfico está suficientemente descrito para sustentar a resposta; a imagem original não é indispensável, embora possa confirmar a ausência de fluxo e a morfologia.`,

        'ginecologia-inep-077': `Resposta correta — C. Prurido crônico, hipocromia e apagamento da arquitetura vulvar sugerem líquen escleroso, condição associada a maior risco de carcinoma espinocelular. Uma úlcera focal próxima ao clitóris em mulher idosa deve ser biopsiada para confirmar ou excluir câncer de vulva antes de definir tratamento.

Distratores:
A — Incorreta. Cancroide causa úlcera genital aguda e dolorosa, frequentemente com linfadenopatia supurativa; doxiciclina não é o tratamento de escolha.
B — Incorreta. Behçet produz úlceras orais e genitais recorrentes e dolorosas, além de manifestações sistêmicas, sem explicar a alteração arquitetural crônica típica de líquen.
D — Incorreta. A sigla correta para neoplasia intraepitelial vulvar é NIV; exérese ampla não deve ser realizada sem biópsia e confirmação histológica, e o quadro pode representar carcinoma invasivo.`,

        'ginecologia-inep-078': `Resposta correta — D. Comprometimento de linfonodos axilares é um dos fatores prognósticos mais importantes no câncer de mama localizado, pois indica disseminação regional e eleva risco de recorrência e metástase. Dois linfonodos sentinelas positivos pioram o prognóstico mais que os demais dados apresentados.

Distratores:
A — Incorreta. O tipo histológico influencia comportamento, mas carcinoma ductal invasivo é comum e, isoladamente, é menos discriminante que o estado linfonodal neste caso.
B — Incorreta. Tamanho tumoral de 1,5 cm é relativamente pequeno e favorável em comparação com doença nodal positiva.
C — Incorreta. Receptores de estrogênio e progesterona positivos costumam associar-se a melhor diferenciação e permitem terapia endócrina, sendo fator preditivo favorável.`,

        'ginecologia-inep-079': `Resposta correta — D. Na síndrome dos ovários policísticos, maior frequência dos pulsos de GnRH pode favorecer secreção de LH em relação ao FSH, e algumas pacientes apresentam LH elevado e relação LH/FSH aumentada. Esse é um achado possível, embora não seja obrigatório nem critério diagnóstico.

Distratores:
A — Incorreta. Resistência à insulina costuma causar hiperinsulinemia, que contribui para produção androgênica e acantose nigricans; não há insulinemia baixa.
B — Incorreta. O padrão neuroendócrino não é de dopamina aumentada com supressão de GnRH e LH; frequentemente há pulsos mais rápidos e estímulo relativo de LH.
C — Incorreta. DHEA-S marcadamente elevado sugere fonte adrenal, inclusive tumor em níveis muito altos, e não é padrão-ouro para SOP.

Ressalva técnica — relação LH/FSH acima de 2 ou 2,5 não confirma nem exclui síndrome dos ovários policísticos. O diagnóstico segue critérios clínicos e laboratoriais, com exclusão de outras causas.`,

        'ginecologia-inep-080': `Resposta correta — D. Exame citopatológico do colo e exame mamário não são pré-requisitos para prescrever anticoncepcional oral. A escolha exige história clínica, pressão arterial, avaliação de contraindicações e aconselhamento; criar exigências sem relação com elegibilidade restringe acesso injustificadamente.

Distratores:
A — Incorreta. Acolhimento e escuta qualificada são responsabilidades da equipe multiprofissional, respeitando competências de cada categoria, e não exclusivas de médicos e enfermeiros.
B — Incorreta. Orientação sobre preservativos e outros métodos pode ser realizada por diferentes profissionais capacitados da equipe.
C — Incorreta. A legislação atual permite esterilização voluntária com capacidade civil plena a partir de 21 anos ou com pelo menos dois filhos vivos, além dos demais requisitos; não exige simultaneamente idade acima de 25 anos e dois filhos.

Ressalva temporal — critérios legais de esterilização foram alterados pela Lei nº 14.443/2022. A orientação deve sempre seguir a legislação e os protocolos vigentes.`,

        'ginecologia-inep-081': `Resposta correta — C. Quatro episódios durante a gestação caracterizam candidíase vulvovaginal recorrente, favorecida pelo diabetes. Na gravidez, devem-se evitar azólicos orais e usar tratamento tópico prolongado; entre as opções, indução com miconazol por 10 a 14 dias e supressão tópica é o esquema mais seguro e abrangente.

Distratores:
A — Incorreta. Fluconazol oral repetido e por longo prazo deve ser evitado na gestação por potenciais riscos fetais, apesar de ser esquema usado fora da gravidez.
B — Incorreta. Itraconazol oral não é opção recomendada na gestação, e um único dia é inadequado para episódio complicado recorrente.
D — Incorreta. Sete dias de terapia tópica pode tratar candidíase na gestação, mas a manutenção por apenas três meses é menos adequada para recorrência frequente que o esquema prolongado oferecido em C.

Ressalva técnica — supressão tópica durante a gestação deve ser individualizada, e o controle glicêmico é essencial. Recomendações variam quanto à duração de manutenção porque há menos evidência para esquemas supressivos em gestantes.`,

        'ginecologia-inep-082': `Resposta correta — A. Citologia de alto grau, colposcopia satisfatória e lesão pequena completamente visível permitem abordagem excisional da zona de transformação com alça de alta frequência. O procedimento fornece tecido para histologia, avalia margens e trata a provável lesão intraepitelial de alto grau.

Distratores:
B — Incorreta. Conização a frio é mais invasiva e costuma ser reservada a suspeita glandular, invasão, lesão endocervical ou impossibilidade de obter peça adequada por alça.
C — Incorreta. Repetir citologia em seis meses atrasaria diagnóstico e tratamento de lesão de alto grau.
D — Incorreta. Amputação cervical não é tratamento padrão para esse achado localizado e causaria morbidade desnecessária.`,

        'ginecologia-inep-083': `Resposta correta — D. O sistema intrauterino com levonorgestrel promove forte atrofia endometrial e é o tratamento clínico de longo prazo que mais reduz o volume menstrual entre as opções, além de oferecer contracepção. Antes da inserção, devem-se excluir gravidez, causas estruturais e patologia endometrial conforme idade e risco.

Distratores:
A — Incorreta. Ácido tranexâmico reduz sangramento enquanto usado nos dias menstruais, mas em média é menos eficaz a longo prazo que o sistema com levonorgestrel.
B — Incorreta. Anti-inflamatórios diminuem prostaglandinas e podem reduzir fluxo e cólicas, porém têm efeito menor.
C — Incorreta. Anticoncepcional combinado pode regular e reduzir sangramento, mas oferece redução inferior e mais exposição sistêmica que o SIU.`,

        'ginecologia-inep-084': `Resposta correta — B. Febre alta, conteúdo cervical purulento, dor à mobilização do colo e anexos, vômitos e sinais de irritação peritoneal indicam doença inflamatória pélvica grave. A paciente deve ser internada para antibióticos parenterais de amplo espectro, avaliação de abscesso e exclusão de diagnósticos cirúrgicos.

Distratores:
A — Incorreta. Coletas microbiológicas são úteis, mas não se deve aguardar identificação do agente para iniciar tratamento sindrômico e prevenir sequelas.
C — Incorreta. Manejo ambulatorial é inadequado diante de febre alta, vômitos, dor intensa e irritação peritoneal.
D — Incorreta. Cirurgia não é primeira conduta universal; é indicada se houver abscesso roto, instabilidade, emergência alternativa ou falha do tratamento clínico.`,

        'ginecologia-inep-085': `Resposta correta — A. Nos primeiros anos após a menarca, a imaturidade do eixo hipotálamo-hipófise-ovário torna frequentes ciclos anovulatórios. Sem progesterona cíclica, o endométrio pode proliferar de modo irregular e descamar com sangramento intenso, sendo essa a causa mais comum nessa fase.

Distratores:
B — Incorreta. Doença de von Willebrand é causa importante e deve ser investigada se o sangramento for muito intenso desde a menarca, houver anemia ou história pessoal e familiar hemorrágica, mas não há esses dados específicos no enunciado.
C — Incorreta. Hipogonadismo hipogonadotrófico tende a causar atraso puberal ou amenorreia por baixos esteroides sexuais, não episódios de sangramento abundante após menarca.
D — Incorreta. Trombocitopenia imune costuma acompanhar petéquias, equimoses, sangramento mucoso e contagem baixa de plaquetas, achados não informados.

Ressalva clínica — sangramento abundante na adolescência sempre exige avaliação de estabilidade, hemograma, teste de gravidez quando pertinente e rastreio de coagulopatia conforme história, mesmo quando anovulação é a hipótese principal.`,

        'ginecologia-inep-086': `Resposta correta — D. Embora a laqueadura seja uma causa conhecida de infertilidade, a decisão entre recanalização e fertilização in vitro depende de avaliação completa do casal. Devem-se verificar ovulação, reserva ovariana, anatomia tubária remanescente, espermograma e outros fatores antes de indicar cirurgia ou reprodução assistida.

Distratores:
A — Incorreta. Adoção pode ser uma escolha familiar, mas não substitui investigação e aconselhamento reprodutivo quando o casal deseja gestação biológica.
B — Incorreta. A paciente tem ciclos regulares e não há evidência de anovulação; indução sem diagnóstico não corrige obstrução tubária.
C — Incorreta. Recanalização pode ser opção em mulher jovem, mas não deve ser indicada antes de avaliar comprimento tubário, técnica prévia, riscos e fertilidade do parceiro.`,

        'ginecologia-inep-087': `Resposta correta — B. Pessoas vivendo com HIV e carga viral indetectável podem utilizar métodos hormonais após avaliação de interações com antirretrovirais. Como o casal não deseja filhos, deve-se oferecer contracepção eficaz e decisão compartilhada, mantendo preservativo como proteção adicional contra outras ISTs e possível exposição a variantes virais.

Distratores:
A — Incorreta. Laqueadura não deve ser escolhida por causa do HIV e pode não atender aos critérios legais ou ao desejo informado após aconselhamento; esterilização é definitiva.
C — Incorreta. DIU de cobre é opção possível em pessoa clinicamente estável, mas a alternativa omite proteção de barreira e aconselhamento de dupla proteção destacados no caso.
D — Incorreta. Vasectomia também pode ser discutida se o parceiro desejar e cumprir requisitos, porém não deve ser imposta como única solução e não protege contra ISTs.

Ressalva técnica — contracepção deve ser escolhida pelo casal entre alternativas elegíveis, sem coerção relacionada ao HIV. A alternativa B é a melhor resposta proposta, mas preservativos e supressão viral devem ser discutidos com informação atualizada sobre transmissão e outras ISTs.`,

        'ginecologia-inep-088': `Resposta correta — C. Fenitoína induz enzimas hepáticas e reduz concentrações de estrogênio e progestagênio dos anticoncepcionais orais, favorecendo sangramento de escape e falha contraceptiva. Um DIU evita essa interação e oferece alta eficácia; a escolha entre cobre e levonorgestrel deve considerar preferências e padrão menstrual.

Distratores:
A — Incorreta. Anti-inflamatório ou antifibrinolítico pode reduzir sangramento, mas não corrige a interação nem o risco de falha contraceptiva.
B — Incorreta. Aumentar a dose hormonal não elimina de modo confiável a indução enzimática e a formulação com ciproterona não é escolha preferencial apenas para controlar escape.
D — Incorreta. Trocar gestodeno por ciproterona não resolve a interação da fenitoína com ambos os componentes hormonais.

Ressalva técnica — métodos combinados não são necessariamente “contraindicados” em sentido absoluto, mas sua eficácia cai com anticonvulsivantes indutores. DIU e acetato de medroxiprogesterona injetável são opções não afetadas de forma clinicamente relevante.`,

        'ginecologia-inep-089': `Resposta correta — C. Corrimento amarelo-esverdeado bolhoso, ardor, dispareunia, inflamação vaginal e colo em morango caracterizam tricomoníase. No exame a fresco, podem ser vistos protozoários flagelados móveis, embora testes moleculares tenham maior sensibilidade.

Distratores:
A — Incorreta. Clue cells indicam vaginose bacteriana, que costuma causar corrimento homogêneo e odor de aminas, sem inflamação exuberante.
B — Incorreta. Streptococcus agalactiae pode colonizar vagina, mas não é a causa típica desse quadro e a cultura descrita não confirmaria tricomoníase.
D — Incorreta. Pseudo-hifas e esporos indicam Candida, associada a corrimento branco grumoso, prurido e pH normal; KOH é usado para visualizar fungos, não o padrão apresentado.`,

        'ginecologia-inep-090': `Resposta correta — A. Em mulher pós-menopáusica, cisto anexial com septação espessa, ecogenicidade complexa e projeção papilar apresenta múltiplos critérios ultrassonográficos de alto risco para malignidade. A paciente precisa de avaliação especializada, marcadores e estadiamento conforme protocolo, com planejamento cirúrgico oncológico apropriado.

Distratores:
B — Incorreta. Cistos fisiológicos simples são anecoicos, uniloculares, de paredes finas e sem componente sólido; a lesão descrita é complexa e suspeita.
C — Incorreta. Septos espessos e projeções papilares são características específicas de suspeição e permitem estratificar risco.
D — Incorreta. Ultrassonografia transvaginal é o principal método inicial para caracterizar massa anexial; exames adicionais complementam, mas não invalidam seus achados.`,

        'obstetricia-inep-001': `Resposta correta — D. Dor abdominal súbita e contínua, choque, sangramento, perda do contorno uterino, partes fetais facilmente palpáveis, bradicardia fetal, elevação da apresentação e cicatriz de cesariana sugerem rotura uterina. É emergência materno-fetal que exige laparotomia e cesariana imediatas, simultaneamente à ressuscitação hemodinâmica e ativação de protocolo hemorrágico.

Distratores:
A — Incorreta. Aguardar parto vaginal prolonga hemorragia, hipóxia fetal e risco de morte materna; dilatação de 8 cm não torna a via vaginal segura.
B — Incorreta. O diagnóstico é clínico e a ultrassonografia atrasaria intervenção salvadora, sem necessidade de confirmação pré-operatória.
C — Incorreta. A apresentação está no plano −2 e não há condições para fórceps; tração instrumental não trata rotura uterina.`,

        'obstetricia-inep-003': `Resposta correta — C. A laceração envolve pele, mucosa vaginal e musculatura perineal sem esfíncter anal, configurando laceração de segundo grau. Sangramento persistente indica reparo com técnica adequada e anestesia local. A assistência humanizada exige comunicação acessível, idealmente com intérprete, explicação, consentimento e respeito à autonomia.

Distratores:
A — Incorreta. Laceração muscular com sangramento moderado não deve ser deixada sem sutura apenas para evitar ansiedade; comunicação e analgesia reduzem sofrimento.
B — Incorreta. Controlar sangramento é importante, mas não autoriza omitir explicação e consentimento em paciente estável e capaz.
D — Incorreta. Lesão de segundo grau geralmente pode ser reparada sob anestesia local; anestesia geral e centro cirúrgico são desnecessários sem extensão complexa ou impossibilidade técnica.`,

        'obstetricia-inep-004': `Resposta correta — A. Retração da cabeça contra o períneo após seu desprendimento é o sinal da tartaruga e indica distocia de ombros. A manobra inicial é McRoberts: hiperflexionar e abduzir as coxas sobre o abdome para retificar o sacro e ampliar a saída pélvica, geralmente associada a pressão suprapúbica.

Distratores:
B — Incorreta. Tração forte da cabeça e pressão no fundo uterino aumentam impactação e risco de lesão do plexo braquial, fratura e rotura uterina.
C — Incorreta. Manobras internas, como liberação do braço posterior ou rotação dos ombros, são etapas posteriores se McRoberts e pressão suprapúbica falharem.
D — Incorreta. Episiotomia não resolve a impactação óssea dos ombros; pode facilitar acesso para manobras internas, mas não é a intervenção inicial isolada.`,

        'obstetricia-inep-005': `Resposta correta — D. Com 93 kg e 1,60 m, o IMC é aproximadamente 36,3 kg/m². Obesidade com IMC acima de 35 é fator antenatal reconhecido de risco para hemorragia pós-parto, por associação com atonia, distensão, intervenções e maior dificuldade de manejo. A equipe deve antecipar medidas preventivas e disponibilidade de tratamento.

Distratores:
A — Incorreta. Idade materna avançada pode associar-se epidemiologicamente a maior risco, mas, na estratificação específica cobrada, o fator objetivo destacado é IMC acima de 35.
B — Incorreta. Dois partos vaginais prévios não configuram grande multiparidade, usualmente definida por número bem maior de partos.
C — Incorreta. Rotura de membranas isolada há pouco tempo não é fator principal; risco infeccioso e de atonia aumenta sobretudo com rotura prolongada e corioamnionite.

Ressalva técnica — idade acima de 35 anos também aparece como fator associado em algumas ferramentas de risco. A resposta D preserva o gabarito e corresponde ao limiar explícito de obesidade calculável no caso.`,

        'obstetricia-inep-006': `Resposta correta — B. Na gestação, teste rápido treponêmico reagente deve levar a tratamento imediato com penicilina benzatina conforme o estágio clínico, sem aguardar outro exame, porque atrasos aumentam o risco de transmissão vertical. Deve-se colher VDRL quantitativo para título basal e oferecer apoio confidencial à convocação, avaliação e tratamento das parcerias sexuais.

Distratores:
A — Incorreta. A gestante não deve receber simplesmente prescrições para entregar; as parcerias precisam ser acolhidas, avaliadas e tratadas pelo serviço, com estratégia de comunicação acordada e preservação de confidencialidade.
C — Incorreta. VDRL deve ser colhido, mas não se deve aguardar “confirmação” para iniciar penicilina em gestante com teste rápido reagente e sem tratamento prévio documentado.
D — Incorreta. FTA-Abs é outro teste treponêmico e não fornece título para seguimento; exigir confirmação de todas as parcerias antes da abordagem atrasa prevenção.`,

        'obstetricia-inep-007': `Resposta correta — D. Na ausência de evidência de sofrimento fetal, parada de progressão ou outra complicação, a evolução fisiológica do trabalho de parto deve ser respeitada. A melhor conduta é manter observação, suporte, mobilidade, analgesia e reavaliações, evitando intervenções apenas por expectativa de uma progressão mais rápida.

Distratores:
A — Incorreta. Amniotomia de rotina não melhora necessariamente desfechos e acrescenta riscos, como infecção e alterações da frequência fetal, quando não há indicação.
B — Incorreta. Ocitocina é reservada a hipocontratilidade ou atraso confirmado após avaliação adequada, não à simples preocupação do casal.
C — Incorreta. Cesárea não se justifica sem distocia, comprometimento fetal ou outra indicação obstétrica.

Validação visual pendente — o partograma citado não foi importado. A conclusão de evolução normal e a ausência de cruzamento de linhas de alerta ou ação devem ser conferidas no PDF-fonte antes da publicação definitiva deste comentário.`,

        'obstetricia-inep-008': `Resposta correta — D. O gabarito indica urocultura alterada, porém sem critérios quantitativos suficientes para bacteriúria assintomática que exijam antibiótico imediato. Na ausência de sintomas, a conduta é acompanhar e repetir ou confirmar a avaliação conforme o microrganismo, contagem de colônias e qualidade da coleta.

Distratores:
A — Incorreta. Bacteriúria assintomática na gestação deve ser tratada quando há crescimento significativo de um único uropatógeno, mas os dados transcritos não permitem confirmar esse limiar.
B — Incorreta. Contaminação depende de flora mista, baixa contagem e elementos da coleta; sem a tabela não se pode afirmar que essa seja a interpretação oficial.
C — Incorreta. Cistite exige sintomas urinários; “cistite aguda subclínica” não é a classificação adequada para gestante completamente assintomática.

Validação visual pendente — os resultados laboratoriais essenciais foram omitidos na importação. Urocultura, contagem de UFC/mL, microrganismo, urina tipo I e possíveis contaminantes devem ser conferidos no PDF-fonte; sem eles, não é possível validar clinicamente o gabarito D de modo definitivo.`,

        'obstetricia-inep-009': `Resposta correta — D. Atraso menstrual, dor pélvica intensa, sangramento, útero amolecido, dor em fundo de saco e uso de DIU levantam suspeita de gravidez ectópica. Os exames iniciais fundamentais são beta-hCG quantitativo e ultrassonografia transvaginal para localizar a gestação, avaliar massa anexial e pesquisar líquido livre.

Distratores:
A — Incorreta. Hemograma avalia perda sanguínea, mas radiografia não localiza gestação e expõe a radiação sem benefício diagnóstico.
B — Incorreta. Proteína C reativa não confirma ectópica e não substitui imagem; beta-hCG isolado também não determina localização.
C — Incorreta. Ultrassonografia abdominal tem menor sensibilidade no início da gestação, e a opção omite o beta-hCG.

Ressalva clínica — sinais de irritação peritoneal exigem avaliação imediata de estabilidade, hemograma, tipagem sanguínea e equipe cirúrgica; exames não devem atrasar tratamento se houver suspeita de rotura e choque.`,

        'obstetricia-inep-010': `Resposta correta — A. Na maioria das pacientes com diabetes mellitus gestacional, a resistência à insulina cai rapidamente após a dequitação placentária. A insulina usada exclusivamente durante a gestação deve ser suspensa no puerpério imediato, mantendo monitorização glicêmica para identificar hiperglicemia persistente.

Distratores:
B — Incorreta. Hipoglicemiante oral não deve ser iniciado automaticamente antes de verificar se o metabolismo glicêmico normalizou e se há diabetes prévio não reconhecido.
C — Incorreta. Redução para um terço é estratégia possível em diabetes pré-gestacional, cujas necessidades caem no puerpério, mas não em diabetes gestacional que costuma dispensar insulina.
D — Incorreta. Manter a dose gestacional aumenta risco de hipoglicemia após a queda abrupta dos hormônios placentários.

Ressalva de seguimento — deve-se realizar teste oral de tolerância à glicose no período pós-parto recomendado pelo protocolo e rastreamento periódico posterior, pois há alto risco futuro de diabetes tipo 2.`,

        'obstetricia-inep-011': `Resposta correta — D. Enalapril deve ser suspenso porque inibidores da ECA são fetotóxicos, especialmente para rins e líquido amniótico. Alfa-metildopa é anti-hipertensivo compatível com gestação; antecedente de pré-eclâmpsia indica ácido acetilsalicílico em baixa dose, e cálcio é recomendado quando a ingestão dietética é baixa ou conforme protocolo de prevenção.

Distratores:
A — Incorreta. Captopril pertence à mesma classe contraindicada do enalapril, e varfarina atravessa a placenta e não previne pré-eclâmpsia.
B — Incorreta. Furosemida não é primeira escolha para hipertensão crônica gestacional sem congestão; varfarina é inadequada e não há indicação anticoagulante descrita.
C — Incorreta. Losartana bloqueia o sistema renina-angiotensina e é contraindicada; enoxaparina não é indicada apenas por pré-eclâmpsia prévia.

Ressalva terapêutica — nifedipino de liberação prolongada e labetalol também são escolhas usuais conforme disponibilidade e protocolo. A dose e o período do AAS e do cálcio devem seguir a diretriz vigente.`,

        'obstetricia-inep-012': `Resposta correta — D. Com 41 semanas, mesmo com avaliação fetal normal, deve-se programar indução antes de completar 42 semanas, idealmente até 41 semanas e 6 dias conforme o protocolo cobrado. Enquanto aguarda, realiza-se vigilância fetal seriada, incluindo cardiotocografia e avaliação de líquido ou perfil biofísico a cada dois a três dias.

Distratores:
A — Incorreta. Aguardar além de 42 semanas aumenta risco de óbito fetal, aspiração de mecônio e complicações maternas, e repouso não reduz esses riscos.
B — Incorreta. Dopplervelocimetria não é exame rotineiro em gestação pós-data de baixo risco com crescimento e perfil biofísico normais; é mais útil em insuficiência placentária e restrição de crescimento.
C — Incorreta. Amnioscopia não é método recomendado para decidir manejo e não substitui indução e vigilância adequadas.

Ressalva temporal — várias diretrizes atuais oferecem ou recomendam indução já ao redor de 41 semanas completas. A data deve ser individualizada conforme protocolo local, condições cervicais e decisão compartilhada.`,

        'obstetricia-inep-013': `Resposta correta — B. A tração controlada do cordão, com contratração suprapúbica para estabilizar o útero e após sinais de separação placentária, integra o manejo ativo do terceiro período e facilita dequitação com menor risco de inversão uterina. Dez minutos sem placenta, em paciente estável, ainda não define retenção placentária.

Distratores:
A — Incorreta. A observação é possível enquanto se aguardam sinais de separação, mas o manejo ativo já permite tração controlada adequada e reduz hemorragia.
C — Incorreta. Curagem não é indicada após apenas dez minutos e pode causar trauma ou perfuração; retenção exige avaliação e remoção manual sob analgesia ou anestesia quando definida.
D — Incorreta. Uterotônico profilático faz parte do manejo ativo, mas massagem uterina não desprende placenta aderida e dose adicional não substitui tração controlada quando apropriada.

Ressalva de segurança — nunca se deve tracionar o cordão sem estabilizar o útero e confirmar condições adequadas, pelo risco de inversão ou avulsão.`,

        'obstetricia-inep-014': `Resposta correta — B. Sangramento após 12 semanas é evento potencialmente sensibilizante em gestante Rh negativo não sensibilizada. Deve-se administrar imunoglobulina anti-D o mais breve possível, idealmente dentro de 72 horas, e reavaliar clinicamente e por ultrassonografia em 7 a 14 dias conforme evolução do hematoma e sintomas.

Distratores:
A — Incorreta. A presença de embrião vivo não elimina risco de aloimunização pelo sangramento materno-fetal.
C — Incorreta. Repouso não mostrou benefício claro para evitar perda, e progesterona não substitui profilaxia anti-D; sua indicação depende de critérios específicos.
D — Incorreta. Não se deve aguardar deliberadamente 72 horas; esse é um limite desejável para administração, não um período de espera.

Ressalva temporal — dose e indicação de anti-D em sangramento inicial variam conforme idade gestacional, volume e protocolo nacional ou local. Aos 14 semanas, o gabarito indica profilaxia.`,

        'obstetricia-inep-016': `Resposta correta — C. Hemorragia pós-parto com útero amolecido e aumentado indica atonia uterina, a causa mais comum. Enquanto se mantém ressuscitação e busca das demais causas, deve-se iniciar imediatamente massagem uterina bimanual e uterotônicos, começando por ocitocina e acrescentando outros conforme contraindicações e resposta.

Distratores:
A — Incorreta. Histerectomia é medida de controle definitivo para hemorragia refratária e não deve anteceder intervenções clínicas menos invasivas.
B — Incorreta. Sutura de B-Lynch é opção cirúrgica após falha de uterotônicos e medidas de segunda linha, não primeira conduta.
D — Incorreta. Reposição volêmica deve ocorrer simultaneamente, e balão de tamponamento é útil se a atonia persistir; porém não substitui a abordagem inicial com massagem e uterotônicos.

Ressalva de segurança — deve-se ativar protocolo de hemorragia, quantificar perda, administrar ácido tranexâmico precocemente quando indicado e examinar trauma, tecido retido e coagulopatia, sem atrasar controle da atonia.`,

        'obstetricia-inep-017': `Resposta correta — B. IgM reagente com IgG não reagente pode representar infecção muito recente ou resultado falso-positivo. Na gestação, inicia-se espiramicina para reduzir transmissão enquanto se repete IgG e IgM em cerca de duas semanas, preferencialmente em laboratório de referência, procurando soroconversão ou mudança de títulos.

Distratores:
A — Incorreta. Manter espiramicina até o parto sem confirmar infecção materna exporia a tratamento prolongado um possível falso-positivo e impediria ajuste se houver infecção fetal.
C — Incorreta. Teste de avidez depende de IgG positiva; com IgG negativa não há anticorpos IgG cuja maturação possa ser avaliada.
D — Incorreta. Sulfadiazina, pirimetamina e ácido folínico são usados após confirmação ou forte suspeita de infecção fetal e conforme idade gestacional; não são primeira resposta a IgM isolada.`,

        'obstetricia-inep-018': `Resposta correta — B. Sangramento discreto com colo fechado e elevação apropriada do beta-hCG é compatível com ameaça de abortamento, desde que a ultrassonografia confirme gestação intrauterina viável. A paciente está estável e pode ser acompanhada, com orientação de retorno diante de dor intensa, aumento do sangramento, síncope ou febre.

Distratores:
A — Incorreta. Gravidez ectópica não pode ser excluída sem ultrassonografia, mas o caso não indica laparotomia imediata em paciente estável sem localização ou sinais de rotura.
C — Incorreta. Aborto incompleto apresenta eliminação parcial de produtos e colo geralmente aberto, com material ou conteúdo uterino residual.
D — Incorreta. Aborto em evolução costuma cursar com colo aberto, dor e progressão da eliminação, diferentemente do colo fechado.

Ressalva técnica — repouso relativo não demonstrou prevenir abortamento. O passo clínico essencial omitido é ultrassonografia transvaginal para confirmar localização e vitalidade; a alternativa B é a melhor disponível quanto ao diagnóstico, mas sua conduta é baseada em orientação e acompanhamento, não em repouso terapêutico.`,

        'obstetricia-inep-019': `Resposta correta — A. Losartana é bloqueadora do receptor de angiotensina e deve ser suspensa na gestação por risco de lesão renal fetal, oligodrâmnio e outras complicações. Deve-se substituir por anti-hipertensivo compatível, como metildopa conforme a opção, iniciar AAS em baixa dose para prevenção de pré-eclâmpsia e obter avaliação basal de órgãos-alvo e função renal.

Distratores:
B — Incorreta. Não se deve manter losartana; função hepática integra avaliação basal, mas não corrige a exposição fetotóxica nem contempla adequadamente lesão de órgãos-alvo.
C — Incorreta. Suspender losartana é correto, porém a alternativa não oferece substituição anti-hipertensiva nem profilaxia de pré-eclâmpsia e limita avaliação apenas ao coração.
D — Incorreta. Pesquisa de hipertensão secundária pode ser indicada em circunstâncias específicas, mas manter losartana é contraindicado.

Ressalva terapêutica — nifedipino de liberação prolongada e labetalol são alternativas frequentes à metildopa. Também se considera suplementação de cálcio quando a ingestão é insuficiente.`,

        'obstetricia-inep-021': `Resposta correta — D. Linha de base fetal de 102 bpm por dez minutos caracteriza bradicardia leve e exige medidas imediatas de correção de causas reversíveis e reavaliação contínua. Deve-se mudar a gestante para decúbito lateral, suspender uterotônicos se em uso, avaliar hipotensão e dinâmica uterina e verificar recuperação da frequência antes de decidir a via de parto.

Distratores:
A — Incorreta. Bradicardia isolada com demais parâmetros normais não determina cesariana automática sem reanimação intrauterina e avaliação da persistência.
B — Incorreta. Ocitocina pode causar taquissistolia e piorar oxigenação fetal; não deve ser iniciada diante de bradicardia.
C — Incorreta. Tocolítico só é indicado se houver taquissistolia ou hipertonia contribuindo para alteração fetal, situação não descrita.

Ressalva técnica — oxigênio materno de rotina não é recomendado quando a saturação materna é normal, por falta de benefício fetal demonstrado. A alternativa D é a melhor por incluir reposicionamento e reavaliação, mas o oxigênio deve ser reservado a hipóxia materna ou indicação específica.`,

        'obstetricia-inep-022': `Resposta correta — A. Dor súbita, hipertonia uterina, sangramento escuro, choque e bradicardia fetal grave em hipertensa indicam descolamento prematuro de placenta. A prioridade é ressuscitação materna com acesso venoso, cristaloides e hemocomponentes conforme necessidade, decúbito lateral e correção de coagulopatia; com feto vivo em sofrimento extremo e colo fechado, realiza-se cesariana emergencial.

Distratores:
B — Incorreta. Indução vaginal demoraria excessivamente diante de bradicardia fetal de 50 bpm e colo fechado, aumentando risco fetal e materno.
C — Incorreta. Placenta prévia costuma causar sangramento vermelho vivo e indolor com útero relaxado; uterolítico não trata descolamento grave.
D — Incorreta. Além de diagnosticar incorretamente placenta prévia, propõe parto vaginal induzido sem considerar sofrimento fetal crítico e hipertonia.`,

        'obstetricia-inep-023': `Resposta correta — A. O gabarito classifica o quadro como dengue na gestação, situação que exige atenção ampliada devido ao risco de extravasamento plasmático, hemorragia e comprometimento materno-fetal. Na presença dos achados clínicos e laboratoriais de alarme referidos pela questão, indica-se internação, hidratação venosa, antitérmico seguro e acompanhamento seriado de hematócrito e plaquetas.

Distratores:
B — Incorreta. Chikungunya costuma produzir artralgia muito intensa e persistente; liberar após hidratação única seria inadequado se houver sinais laboratoriais ou clínicos de gravidade.
C — Incorreta. Zika geralmente causa exantema pruriginoso, conjuntivite e febre baixa; controle diário de plaquetas não é sua conduta característica.
D — Incorreta. Transfusão profilática de plaquetas não é indicada apenas por trombocitopenia sem hemorragia significativa, e o esquema proposto não corresponde ao manejo da febre de Oropouche.

Validação visual pendente — os sinais clínicos adicionais e o hemograma mencionados duas vezes no enunciado não foram importados. Hematócrito, plaquetas, leucócitos, prova do laço, pressão, pulso e sinais de alarme devem ser conferidos no PDF-fonte antes de validar definitivamente o diagnóstico e a necessidade de internação.`,

        'obstetricia-inep-024': `Resposta correta — D. Coombs indireto positivo indica que a gestante Rh negativo já possui anticorpos eritrocitários detectáveis. A imunoglobulina anti-D não reverte sensibilização estabelecida; é necessário encaminhar ao pré-natal de alto risco, identificar e titular o anticorpo e monitorar anemia fetal, inclusive com Doppler da artéria cerebral média quando indicado.

Distratores:
A — Incorreta. Aloimunização não torna a gestação automaticamente inviável; vigilância e tratamento fetal podem permitir bom desfecho.
B — Incorreta. Imunoglobulina anti-D é profilática para gestante ainda não sensibilizada e é administrada por via intramuscular em esquemas usuais, não trata Coombs já positivo.
C — Incorreta. Repetir o exame e tipar o parceiro pode complementar avaliação, mas não deve atrasar encaminhamento e monitoramento especializado diante de anticorpo detectado.

Ressalva laboratorial — Coombs indireto positivo pode refletir anticorpo diferente do anti-D ou anti-D passivo após profilaxia recente. A especificidade, o título e a história de imunoglobulina devem ser confirmados antes de definir risco fetal.`,

        'obstetricia-inep-026': `Resposta correta — D. Antecedente de parto prematuro espontâneo aumenta fortemente o risco de recorrência. A progesterona natural micronizada vaginal pode reduzir esse risco em gestação única, especialmente quando há colo curto, e deve ser associada à vigilância seriada do comprimento cervical no segundo trimestre.

Distratores:
A — Incorreta. Indometacina é tocolítico de uso curto em ameaça de parto prematuro selecionada, não profilaxia diária, e traz riscos fetais com uso prolongado.
B — Incorreta. Pessário cervical não é prescrito rotineiramente apenas pela história e não se inicia de forma automática após 22 semanas.
C — Incorreta. Progesterona intramuscular semanal, especialmente 17-hidroxiprogesterona caproato, perdeu recomendação em várias diretrizes por falta de benefício consistente e não é a melhor opção apresentada.

Ressalva temporal — diretrizes atuais divergem sobre progesterona vaginal quando o colo não está encurtado. A conduta deve incluir medida transvaginal do colo; se houver colo curto, o benefício é mais estabelecido.`,

        'obstetricia-inep-027': `Resposta correta — B. Há gravidez ectópica tubária confirmada por embrião em massa anexial, mas a paciente está estável, tem dor leve, massa de 3 cm, beta-hCG abaixo de 5.000 mUI/mL e ausência de batimento embrionário. Se não houver contraindicação e houver possibilidade de seguimento rigoroso, metotrexato intramuscular é opção adequada.

Distratores:
A — Incorreta. Laparoscopia é indicada se houver instabilidade, suspeita de rotura, contraindicação ou falha do metotrexato, dor importante ou preferência; os dados não exigem cirurgia imediata.
C — Incorreta. Laparotomia é reservada sobretudo a choque, hemorragia importante ou impossibilidade de laparoscopia, e a presença de embrião sem batimentos não a impõe.
D — Incorreta. A massa contém embrião extrauterino, portanto o diagnóstico está estabelecido e apenas repetir exames sem tratamento é inseguro.

Revisão do sinalizador — todos os achados ultrassonográficos decisivos estão descritos no texto; a imagem original não é indispensável à escolha da conduta.`,

        'obstetricia-inep-028': `Resposta correta — D. No terceiro tempo de Leopold, palpa-se o polo fetal situado sobre a pelve. Estrutura dura, arredondada e regular compatível com crânio na região suprapúbica indica apresentação cefálica; com um polo fetal no estreito superior e o outro no fundo uterino, a situação é longitudinal.

Distratores:
A — Incorreta. Em situação transversal, não se palpa polo cefálico centralizado sobre a pelve; a apresentação seria córmica.
B — Incorreta. Apresentação pélvica teria nádegas, massa menos dura e menos regular, na região suprapúbica, com cabeça no fundo.
C — Incorreta. Situação transversal e apresentação córmica correspondem a ombro sobre a pelve, não calota craniana.`,

        'obstetricia-inep-029': `Resposta correta — A. Fórceps exige indicação clara e condições de segurança: feto vivo, dilatação completa, membranas rotas, cabeça encaixada, posição fetal conhecida, pelve adequada, bexiga vazia, analgesia e operador habilitado. Entre as alternativas, presença de concepto vivo é a única condição necessária corretamente apresentada.

Distratores:
B — Incorreta. A dilatação deve ser completa, e não apenas de 8 cm, para evitar laceração cervical e trauma.
C — Incorreta. As membranas precisam estar rotas antes da aplicação do fórceps; integridade é contraindicação até amniotomia apropriada.
D — Incorreta. Plano −1 indica cabeça não encaixada e alta, incompatível com fórceps de alívio; a apresentação deve estar baixa e a posição ser conhecida.`,

        'obstetricia-inep-030': `Resposta correta — B. Circunferência abdominal é a medida biométrica isolada mais sensível para restrição de crescimento, pois reflete tamanho hepático e reservas de glicogênio, precocemente reduzidos na insuficiência placentária. Doppler avalia circulação uterina materna, artéria umbilical feto-placentária e vasos fetais, como cerebral média e ducto venoso.

Distratores:
A — Incorreta. Diâmetro biparietal isolado é menos sensível e pode ser preservado pelo fenômeno de centralização; Doppler não se restringe a fetos abaixo do percentil 3.
C — Incorreta. Relações biométricas podem auxiliar, mas circunferência abdominal e peso fetal estimado são parâmetros centrais; a razão AC/fêmur não é o parâmetro isolado mais sensível.
D — Incorreta. As medidas não têm sensibilidade idêntica, e Doppler também avalia artérias uterinas e umbilical, não apenas vasos fetais listados.`,

        'obstetricia-inep-031': `Resposta correta — C. Hipertensão gestacional é indicação de resolução a partir de 37 semanas, após avaliação materno-fetal, porque prolongar a gestação aumenta risco de pré-eclâmpsia e complicações sem benefício relevante. Aos 40 semanas, com feto cefálico, cardiotocografia reativa e Bishop 8, deve-se induzir o trabalho de parto, com alta chance de parto vaginal.

Distratores:
A — Incorreta. Novo Doppler não muda a indicação de resolução já estabelecida pela idade gestacional e hipertensão; o exame anterior normal não justifica postergar.
B — Incorreta. Amnioscopia não é método recomendado para definir bem-estar ou manejo nesse cenário.
D — Incorreta. Retornar em três dias prolongaria uma gestação hipertensiva além do momento indicado para parto.

Revisão do traçado — aceleração de pelo menos 15 bpm por pelo menos 15 segundos, linha de base de 130 bpm e variabilidade de 20 bpm são parâmetros tranquilizadores, não sinais de sofrimento fetal.`,

        'obstetricia-inep-032': `Resposta correta — A. A dinâmica uterina é avaliada por palpação do fundo uterino com a mão espalmada durante dez minutos, registrando número, duração, intensidade clínica e intervalo das contrações. O fundo permite perceber melhor início, pico e relaxamento da atividade uterina.

Distratores:
B — Incorreta. A região suprapúbica não é o local padrão para mensurar contrações por palpação; ali predominam apresentação fetal e segmento inferior.
C — Incorreta. Cinco minutos podem dar impressão incompleta da frequência; o padrão é quantificar em janela de dez minutos.
D — Incorreta. Reúne os dois erros: local suprapúbico e período insuficiente de cinco minutos.`,

        'obstetricia-inep-033': `Resposta correta — D. Glicemia de jejum de 110 mg/dL na gestação situa-se entre 92 e 125 mg/dL e já estabelece diabetes mellitus gestacional. O tratamento inicial, se não houver hiperglicemia grave, inclui plano alimentar individualizado, atividade física segura e automonitorização; insulina é acrescentada se metas não forem atingidas.

Distratores:
A — Incorreta. Não se deve esperar até 30–34 semanas nem chamar de pré-diabetes; o diagnóstico gestacional já está estabelecido, e o TOTG costuma ser feito entre 24 e 28 semanas quando o jejum inicial não foi diagnóstico.
B — Incorreta. Repetir jejum mais tarde atrasaria tratamento de uma alteração já diagnóstica.
C — Incorreta. Insulina não precisa ser iniciada imediatamente com um único jejum de 110 mg/dL antes de tentativa de medidas não farmacológicas e monitorização, salvo contexto adicional.

Ressalva nutricional — a dieta não deve ser simplesmente “pobre em carboidrato”; deve garantir energia e nutrientes adequados, distribuindo carboidratos de qualidade sem restrição cetogênica.`,

        'obstetricia-inep-034': `Resposta correta — A. Hipertensão iniciada após 20 semanas associada a proteinúria de 350 mg/24 h define pré-eclâmpsia. A cefaleia pode sinalizar gravidade e exige internação para repetir avaliação neurológica e pressórica, solicitar hemograma, plaquetas, creatinina e enzimas hepáticas e avaliar bem-estar fetal antes de decidir tratamento e momento do parto.

Distratores:
B — Incorreta. Restrição de sal não trata pré-eclâmpsia e captopril é contraindicado na gestação por fetotoxicidade.
C — Incorreta. Hidralazina intravenosa e nifedipino de ação imediata são usados em hipertensão grave persistente, geralmente a partir de 160/110 mmHg; não se associa ambos automaticamente para 150/100.
D — Incorreta. Sulfato de magnésio previne e trata convulsões em pré-eclâmpsia com sinais de gravidade ou eclâmpsia, mas não é anti-hipertensivo e não deve ser mantido “até normalizar a pressão”.`,

        'obstetricia-inep-035': `Resposta correta — B. Exantema pruriginoso, febre baixa, artralgia leve e exposição epidemiológica sugerem Zika. Como está no início dos sintomas e é gestante, grupo prioritário para confirmação específica, deve-se coletar RT-PCR no período de viremia e registrar o exantema no cartão para organizar vigilância e seguimento fetal.

Distratores:
A — Incorreta. Sorologia IgM para flavivírus sofre reação cruzada e não confirma isoladamente infecção recente por Zika, especialmente em área com dengue.
C — Incorreta. Testes negativos para dengue e chikungunya não descartam Zika nem justificam omitir o registro do exantema; deve-se investigar diretamente o vírus suspeito.
D — Incorreta. IgM reagente não distingue de modo definitivo dengue de Zika por reação cruzada, e o registro clínico continua necessário.

Ressalva temporal — janela e tipo de amostra para RT-PCR dependem do número de dias de sintomas e do protocolo laboratorial vigente; resultados negativos não excluem totalmente a infecção.`,

        'obstetricia-inep-036': `Resposta correta — B. Sangramento e cólicas no primeiro trimestre associados à dilatação dos orifícios cervical interno e externo caracterizam abortamento inevitável, mesmo com embrião ainda vivo. A abertura cervical indica que o processo de expulsão está em curso e torna improvável a manutenção da gestação.

Distratores:
A — Incorreta. Aborto retido apresenta embrião sem atividade cardíaca ou gestação inviável retida, geralmente com colo fechado; aqui há batimentos presentes e colo dilatado.
C — Incorreta. Na ameaça de aborto, ocorre sangramento com colo fechado e gestação viável.
D — Incorreta. Aborto incompleto pressupõe expulsão parcial de produtos da concepção com material residual; não foi descrita eliminação de tecido.

Revisão do sinalizador — todos os achados ultrassonográficos e cervicais necessários estão transcritos; a imagem original não é indispensável para a classificação.`,

        'obstetricia-inep-037': `Resposta correta — D. Gestação única com antecedente de prematuridade espontânea e colo curto de 20 mm antes de 24 semanas tem alto risco de recorrência. Progesterona natural vaginal deve ser iniciada e mantida até aproximadamente 36 semanas, associada a acompanhamento especializado do colo e sinais de parto prematuro.

Distratores:
A — Incorreta. Cerclagem não é indicada automaticamente a toda paciente com colo curto; depende do tipo e da idade gestacional do parto prévio, comprimento cervical, história de perdas e protocolo adotado.
B — Incorreta. Nifedipina é usada por curto período na ameaça de parto prematuro com contrações, não como profilaxia contínua em gestante assintomática.
C — Incorreta. Corticoide antenatal é reservado a risco de parto dentro de poucos dias em faixa gestacional indicada; administrá-lo às 22 semanas e repetir rotineiramente às 30 não é apropriado.

Ressalva técnica — algumas diretrizes recomendam cerclagem para gestação única com parto prematuro espontâneo prévio e colo abaixo de 25 mm antes de 24 semanas, especialmente quando o parto anterior foi precoce. Como o enunciado não informa a idade do parto prévio, a alternativa D preserva o gabarito, mas a decisão real exige esse dado.`,

        'obstetricia-inep-038': `Resposta correta — D. Sangramento, dor intensa, colo pérvio e saída de restos ovulares indicam abortamento em evolução ou incompleto. Em paciente estável, deve-se explicar o diagnóstico e oferecer decisão compartilhada entre manejo expectante e esvaziamento uterino, preferindo aspiração manual intrauterina quando o procedimento é escolhido e está indicado.

Distratores:
A — Incorreta. Ameaça de aborto exige colo fechado e ausência de eliminação de produtos; repouso não demonstrou prevenir perda.
B — Incorreta. Alta apenas com analgésico ignora colo aberto e material ovular, além da necessidade de avaliar completude, hemoglobina, tipagem e preferência terapêutica.
C — Incorreta. Ultrassonografia pode avaliar conteúdo residual, mas “confirmar útero vazio” não é condição para internar nem define isoladamente a melhor conduta; existem opções expectante e intervencionista.

Ressalva de segurança — instabilidade, hemorragia importante, infecção ou anemia grave exigem intervenção imediata; deve-se verificar Rh e indicar anti-D conforme protocolo quando a paciente é Rh negativa.`,

        'obstetricia-inep-039': `Resposta correta — D. Segundo o gabarito, a ultrassonografia morfológica do segundo trimestre foi solicitada fora da janela recomendada, normalmente ao redor de 20 a 24 semanas conforme o protocolo. A data correta é essencial para avaliação anatômica e rastreamento de alterações fetais.

Distratores:
A — Incorreta. Se um exame essencial foi pedido em momento inadequado, não se pode afirmar que todo o pré-natal foi corretamente realizado.
B — Incorreta. Pré-eclâmpsia exige hipertensão após 20 semanas associada a proteinúria ou disfunção orgânica; os dados necessários não aparecem no texto importado.
C — Incorreta. Encaminhamento ao alto risco depende de achados maternos e fetais da carteirinha, ausentes na versão textual.

Validação visual pendente — todos os dados da carteirinha foram omitidos na importação. Datas, idade gestacional de cada consulta, pressão arterial, exames e momento exato da ultrassonografia devem ser conferidos no PDF-fonte; sem essa imagem, não é possível validar definitivamente o gabarito D nem excluir B ou C.`,

        'obstetricia-inep-040': `Resposta correta — D. A datação pela última menstruação confiável deve prevalecer sobre ultrassonografia tardia de 27 semanas, cuja margem de erro é maior. Assim, a gestação está com 40 semanas e 4 dias. Cardiotocografia reativa, linha de base de 150 bpm, variabilidade moderada, acelerações e líquido normal indicam bem-estar, permitindo retorno em três dias com orientação de sinais de alarme e planejamento de resolução.

Distratores:
A — Incorreta. Frequência basal de 150 bpm está dentro da faixa normal de 110 a 160 e não indica hipóxia.
B — Incorreta. Acelerações são sinal tranquilizador de reatividade fetal, não indicação de cesariana.
C — Incorreta. Não há taquicardia fetal, pois o basal não ultrapassa 160 bpm; indução pode ser programada pela idade gestacional, mas não pelo argumento apresentado.

Ressalva temporal — a vigilância e o momento de indução após 41 semanas variam conforme protocolo. A paciente deve ter plano definido para não ultrapassar o limite recomendado.`,

        'obstetricia-inep-041': `Resposta correta — B. A hipertensão surgiu após 20 semanas em gestante previamente normotensa. É necessário investigar proteinúria e sinais de disfunção de órgão-alvo — hemograma com plaquetas, creatinina, transaminases, sintomas neurológicos, dor epigástrica, entre outros — para confirmar pré-eclâmpsia e avaliar sua gravidade. Edema e ganho ponderal rápido aumentam a suspeita, mas não são critérios diagnósticos isolados.

Distratores:
A — Incorreta. Não se deve indicar interrupção apenas pela suposta maturidade fetal antes de confirmar o diagnóstico, classificar a gravidade e avaliar mãe e feto; além disso, maturidade pulmonar não é o único determinante da conduta.
C — Incorreta. Hipertensão crônica é diagnosticada antes da gestação, antes de 20 semanas ou quando persiste por mais de 12 semanas após o parto. Normalização no puerpério favorece hipertensão gestacional, não confirma hipertensão crônica.
D — Incorreta. Pressão de 140 × 95 mmHg sem sintomas ou lesão aguda de órgão-alvo não caracteriza emergência hipertensiva, que exige níveis graves e comprometimento clínico.

Ressalva técnica — antes da confirmação de proteinúria ou disfunção orgânica, a classificação definitiva pode ser hipertensão gestacional. A alternativa B é a melhor porque propõe justamente a investigação necessária para distinguir essas condições.`,

        'obstetricia-inep-042': `Resposta correta — C. TSH de 8,20 mUI/L no primeiro trimestre, associado a sintomas compatíveis, sugere hipotireoidismo materno. A disfunção tireoidiana, sobretudo quando acompanhada de autoimunidade anti-TPO, associa-se a maior risco de abortamento e outras complicações obstétricas, devendo ser prontamente avaliada e tratada com levotiroxina conforme T4 livre, anti-TPO e metas gestacionais.

Distratores:
A — Incorreta. Metimazol trata hipertireoidismo; neste caso o TSH elevado aponta para hipotireoidismo.
B — Incorreta. O aumento de TBG eleva principalmente os hormônios tireoidianos totais. No início da gestação, o hCG tende inclusive a reduzir discretamente o TSH, portanto esse valor não é explicado fisiologicamente pelo estrogênio.
D — Incorreta. A levotiroxina deve ser iniciada assim que indicada. O hormônio tireoidiano materno é essencial ao desenvolvimento fetal precoce, e adiar o tratamento aumenta riscos maternos e fetais.`,

        'obstetricia-inep-043': `Resposta correta — C. IgM positiva com IgG negativa pode representar infecção muito recente ou resultado falso-positivo. Deve-se iniciar espiramicina enquanto se esclarece o caso e repetir IgG e IgM em cerca de duas a três semanas; o aparecimento de IgG, isto é, soroconversão, confirma infecção recente.

Distratores:
A — Incorreta. O teste de avidez depende da presença de IgG e não é interpretável quando a IgG está negativa; além disso, alta avidez sugere infecção antiga, não recente.
B — Incorreta. Embora baixa avidez possa apoiar infecção recente quando há IgG, o exame não deve ser solicitado nesta sorologia IgG negativa.
D — Incorreta. Aguardar seis a oito semanas sem tratamento posterga a proteção fetal diante da possibilidade de infecção materna aguda.`,

        'obstetricia-inep-044': `Resposta correta — A. Sem comprovação de tratamento anterior e sem possibilidade de estabelecer infecção recente, a sífilis gestacional deve ser tratada como duração ignorada com penicilina benzatina 2,4 milhões UI semanal por três doses, além de VDRL mensal. A hemoglobina de 10,5 g/dL caracteriza anemia na gestação e requer ferro em dose terapêutica. Como a gestante é Rh negativo, deve-se pesquisar aloimunização com Coombs indireto e indicar imunoglobulina anti-D quando não sensibilizada, inclusive após parto de recém-nascido Rh positivo.

Distratores:
B — Incorreta. Dose única é reservada à sífilis recente; VDRL trimestral é insuficiente, e anti-D não é indicada quando o recém-nascido é Rh negativo.
C — Incorreta. Ferro profilático não trata anemia já estabelecida; avidez da toxoplasmose é desnecessária diante de IgG positiva e IgM negativa, e a vigilância da gestante Rh negativo não deve ficar restrita ao terceiro trimestre.
D — Incorreta. Duas doses não completam o esquema para sífilis de duração ignorada; Coombs positivo indica sensibilização e torna a profilaxia anti-D ineficaz, exigindo acompanhamento especializado.

Ressalva técnica — protocolos atuais geralmente incluem profilaxia anti-D antenatal por volta de 28 semanas para gestantes Rh negativo não sensibilizadas, além da dose pós-parto quando o recém-nascido é Rh positivo. A alternativa A é a mais adequada entre as disponíveis, mas sua redação enfatiza apenas a indicação pós-parto.`,

        'obstetricia-inep-045': `Resposta correta — C. A presença de Streptococcus agalactiae na urina em qualquer concentração durante a gestação evidencia colonização materna importante e é indicação de profilaxia antibiótica intraparto, independentemente de cultura vaginal/retal posterior. A penicilina G intravenosa é o esquema de primeira escolha.

Distratores:
A — Incorreta. Não é necessário teste rápido no trabalho de parto porque a bacteriúria por EGB já documentou uma indicação independente de profilaxia.
B — Incorreta. A conduta expectante expõe o recém-nascido ao risco de doença precoce por EGB apesar da colonização conhecida.
D — Incorreta. A profilaxia deve começar no trabalho de parto e não aguardar ruptura das membranas; ampicilina pode ser alternativa, mas a condição proposta atrasa indevidamente o tratamento.`,

        'obstetricia-inep-046': `Resposta correta — C. Segundo o gabarito, o traçado apresenta linha de base entre 110 e 160 bpm, variabilidade moderada e desacelerações precoces. Estas acompanham temporalmente as contrações e costumam decorrer da compressão cefálica durante o trabalho de parto, sem indicar hipóxia quando os demais parâmetros são tranquilizadores. A conduta é manter a vigilância e acompanhar a evolução do parto.

Distratores:
A — Incorreta. Variabilidade aumentada e faixa basal de 100 a 150 bpm não correspondem à classificação descrita pelo gabarito; desacelerações precoces isoladas não exigem reanimação intrauterina.
B — Incorreta. Desacelerações tardias começam após o pico da contração e sugerem insuficiência uteroplacentária, o que mudaria a interpretação e demandaria medidas corretivas.
D — Incorreta. Desacelerações variáveis têm queda abrupta e relação variável com as contrações; oxigênio materno rotineiro e estímulo sonoro não constituem a conduta indicada para o padrão informado.

Validação visual pendente — o traçado cardiotocográfico não foi preservado na importação. É necessário conferir no PDF-fonte a linha de base, a variabilidade e a relação temporal das desacelerações com as contrações antes da publicação definitiva deste comentário.`,

        'obstetricia-inep-047': `Resposta correta — B. Há dilatação completa, apresentação cefálica em occípito-púbica, cabeça baixa no plano +2, pelve adequada, bolsa rota e equipe experiente: são pré-requisitos para parto vaginal operatório. Diante de bradicardia fetal e período expulsivo sem progressão por contrações ineficazes, o fórceps de Simpson permite abreviar rapidamente o nascimento.

Distratores:
A — Incorreta. Cesárea não é a primeira opção quando a cabeça está baixa, a posição é conhecida, não há desproporção e o parto vaginal assistido pode ser realizado imediatamente por equipe habilitada.
C — Incorreta. Persistir apenas com ocitocina diante de bradicardia prolonga a exposição fetal e não resolve a necessidade de abreviar o período expulsivo.
D — Incorreta. Aguardar por um limite temporal rígido é inadequado quando há alteração aguda da frequência cardíaca fetal e condições para parto operatório vaginal.`,

        'obstetricia-inep-048': `Resposta correta — C. A paciente X está em trabalho de parto prematuro, com 35 semanas e 5 dias, cultura para EGB desconhecida e ruptura de membranas. Na ausência de resultado válido, idade gestacional inferior a 37 semanas é indicação de profilaxia intraparto. A paciente Y tem cultura negativa recente e realizará cesárea eletiva antes do trabalho de parto, com bolsa íntegra, não havendo indicação.

Distratores:
A — Incorreta. Multiparidade e hipertensão não são indicações de profilaxia para EGB, e a cultura negativa recente da paciente Y afasta a necessidade no cenário descrito.
B — Incorreta. Apenas a paciente X reúne indicação; a cesárea pré-laboral com membranas íntegras dispensa profilaxia específica para EGB.
D — Incorreta. Prematuridade com estado de colonização desconhecido é fator suficiente para profilaxia na paciente X.`,

        'obstetricia-inep-049': `Resposta correta — B. Hipertensão após 20 semanas associada a cefaleia intensa persistente apesar de analgésico exige investigação urgente de pré-eclâmpsia com sinais de gravidade. Deve-se internar, solicitar avaliação laboratorial materna e fetal, controlar complicações e, se confirmado sinal grave, estabilizar e interromper a gestação, pois ela já tem 35 semanas.

Distratores:
A — Incorreta. Alta sem investigação ignora um sintoma neurológico persistente potencialmente grave.
C — Incorreta. Metildopa tem ação lenta, não trata uma emergência, e o seguimento ambulatorial é inseguro antes de excluir disfunção orgânica.
D — Incorreta. Observação e exames são necessários, mas a alternativa omite a internação e a necessidade de resolução gestacional se a cefaleia refratária confirmar pré-eclâmpsia com sinal de gravidade.

Ressalva técnica — a indicação de interrupção depende da confirmação e classificação do quadro após avaliação urgente; o enunciado favorece sinal de gravidade pela cefaleia persistente, mas pressão de 140 × 90 mmHg isoladamente não é grave.`,

        'obstetricia-inep-050': `Resposta correta — B. O útero amolecido e aumentado com sangramento intenso indica hemorragia pós-parto por atonia uterina. O manejo deve ser simultâneo: massagem uterina, uterotônicos, reposição volêmica e hemoderivados conforme necessidade, busca da causa e ácido tranexâmico intravenoso o mais cedo possível, idealmente dentro de três horas do parto.

Distratores:
A — Incorreta. Histerectomia é medida de controle para hemorragia refratária, não a etapa imediata antes das medidas farmacológicas e conservadoras.
C — Incorreta. O ácido tranexâmico reduz mortalidade por sangramento na hemorragia pós-parto independentemente de haver laceração do canal de parto.
D — Incorreta. Não se deve aguardar uma hora nem a falha dos uterotônicos; o ácido tranexâmico deve ser administrado precocemente em paralelo ao tratamento da causa.`,

        'obstetricia-inep-051': `Resposta correta — C. Febre alta, lombalgia e comprometimento do estado geral em gestante com litíase sugerem pielonefrite, potencialmente complicada por obstrução. É necessário encaminhamento urgente ao pronto-socorro obstétrico para exames, culturas, antibioticoterapia parenteral e avaliação materno-fetal; o antitérmico é apenas suporte inicial.

Distratores:
A — Incorreta. Retorno em sete dias é inseguro diante do risco de sepse, insuficiência respiratória e parto prematuro.
B — Incorreta. Antiespasmódico e avaliação eletiva não tratam provável infecção urinária alta febril.
D — Incorreta. O encaminhamento urgente está correto, mas antiespasmódico não é o suporte prioritário para febre e suspeita infecciosa; entre as opções, o antitérmico é mais apropriado.`,

        'obstetricia-inep-052': `Resposta correta — D. Segundo o gabarito, as manobras de Leopold mostram situação longitudinal, apresentação cefálica e dorso fetal à esquerda. A altura uterina de 31 cm em 34 semanas permanece dentro da faixa esperada no gráfico apresentado, portanto é considerada adequada para a idade gestacional.

Distratores:
A — Incorreta. Embora reconheça apresentação cefálica e altura adequada, posiciona o dorso no lado oposto ao indicado pela figura.
B — Incorreta. Situação córmica corresponde a feto transverso e não combina com a estática mostrada; também classifica inadequadamente a altura uterina.
C — Incorreta. O lado do dorso coincide com o gabarito, mas a situação não é córmica e a medida não está abaixo da faixa gráfica esperada.

Validação visual pendente — as Figuras 1 e 2 não foram preservadas na importação. A orientação fetal e a posição de 31 cm na curva devem ser conferidas diretamente no PDF-fonte antes da publicação definitiva deste comentário.`,

        'obstetricia-inep-053': `Resposta correta — D. Com 24 semanas, a imaturidade autonômica fetal reduz a reatividade e aumenta a frequência de cardiotocografias não reativas sem hipóxia verdadeira. Por isso, o exame tem alto índice de falso-positivo nessa idade e não é a melhor ferramenta isolada para avaliar a redução de movimentos fetais.

Distratores:
A — Incorreta. Diabetes gestacional não contraindica cardiotocografia; ela pode integrar a vigilância fetal em idades gestacionais apropriadas.
B — Incorreta. A cardiotocografia não é o exame precoce de escolha aos 24 semanas, especialmente pelo baixo valor preditivo nessa fase.
C — Incorreta. A afirmação de alta sensibilidade e prioridade ignora a imaturidade fetal e a elevada taxa de resultados não reativos falsos.`,

        'obstetricia-inep-054': `Resposta correta — C. O comprimento crânio-nádegas medido no primeiro trimestre, especialmente até 12–13 semanas e 6 dias, é o parâmetro ultrassonográfico mais preciso para datar a gestação, pois apresenta menor variabilidade biológica entre fetos.

Distratores:
A — Incorreta. A data da última menstruação perde confiabilidade quando os ciclos são irregulares ou a data é incerta.
B — Incorreta. Biometria de 22 semanas tem margem de erro maior e pode ser afetada pelo início de alterações do crescimento.
D — Incorreta. O diâmetro biparietal no segundo trimestre é menos preciso para datação que o comprimento crânio-nádegas do primeiro trimestre.`,

        'obstetricia-inep-055': `Resposta correta — C. Infecção urinária pode desencadear inflamação e atividade uterina, enquanto anemia materna se associa a maior risco de prematuridade. Ambas estão presentes e constituem fatores reconhecidos para trabalho de parto pré-termo.

Distratores:
A — Incorreta. Tabagismo é fator de risco, mas Pilates e hidroginástica regulares, na ausência de contraindicação, não são causas de prematuridade.
B — Incorreta. Aos 33 anos, a idade materna isolada não configura o fator de risco mais evidente apresentado no caso.
D — Incorreta. A anemia é relevante, porém a idade de 33 anos não substitui a infecção urinária, um desencadeante direto e atual.`,

        'obstetricia-inep-056': `Resposta correta — A. A história de perda súbita e abundante de líquido, associada à visualização direta de líquido amniótico com grumos saindo pelo colo ao exame especular, confirma clinicamente a ruptura das membranas. Testes complementares são reservados aos casos em que a história e o exame não são conclusivos.

Distratores:
B — Incorreta. Ultrassonografia pode mostrar redução do líquido, mas volume normal não exclui ruptura e o exame não é necessário quando há exteriorização evidente.
C — Incorreta. pH vaginal ou teste imunocromatográfico pode ajudar em casos duvidosos, mas é dispensável diante de líquido observado saindo pelo colo.
D — Incorreta. Cristalização e teste imunocromatográfico são métodos auxiliares, não requisitos obrigatórios quando o diagnóstico já é clínico.`,

        'obstetricia-inep-057': `Resposta correta — B. Sífilis tardia ou de duração ignorada deve ser tratada com 2,4 milhões UI de penicilina benzatina por semana durante três semanas. Como cada ampola/dose descrita contém 1,2 milhão UI, administram-se duas aplicações intramusculares por semana, geralmente uma em cada glúteo. Na gestação, o VDRL deve ser acompanhado mensalmente, e resposta adequada corresponde à queda de duas diluições, isto é, redução de quatro vezes no título.

Distratores:
A — Incorreta. Uma aplicação de 1,2 milhão UI por semana fornece apenas metade da dose semanal necessária, e queda de uma diluição não corresponde ao critério clássico de resposta de quatro vezes.
C — Incorreta. Duas semanas não completam as três doses exigidas para sífilis tardia, e o controle da gestante não deve esperar apenas o 3º, 9º e 12º meses.
D — Incorreta. Tanto a dose semanal quanto a duração estão insuficientes, além de o calendário de seguimento ser inadequado para a gestação.`,

        'obstetricia-inep-058': `Resposta correta — B. Lesões papulosas disseminadas, inclusive em palmas e plantas, e condiloma plano genital são manifestações típicas de sífilis secundária. Trata-se de sífilis recente e o esquema indicado é penicilina benzatina 2,4 milhões UI intramuscular em dose única.

Distratores:
A — Incorreta. Sífilis primária é caracterizada principalmente pelo cancro duro no local de inoculação, não pelo exantema palmoplantar e condiloma plano.
C — Incorreta. Há manifestações clínicas ativas de fase secundária, portanto não se trata de infecção latente tardia.
D — Incorreta. Além de não ser latente, sífilis recente recebe uma dose de 2,4 milhões UI, e não três doses semanais.`,

        'obstetricia-inep-059': `Resposta correta — D. HBsAg negativo indica ausência de infecção atual; anti-HBc total negativo indica ausência de contato natural prévio; e anti-HBs positivo isolado caracteriza imunidade adquirida pela vacinação. A gestante pode ser tranquilizada e permanecer no pré-natal habitual.

Distratores:
A — Incorreta. Hepatite B aguda costuma apresentar HBsAg e anti-HBc IgM positivos.
B — Incorreta. Infecção crônica exige persistência do HBsAg, que está negativo.
C — Incorreta. Suscetibilidade seria caracterizada por HBsAg, anti-HBc e anti-HBs todos negativos; aqui há anticorpo protetor.`,

        'obstetricia-inep-060': `Resposta correta — A. Streptococcus do grupo B é causa clássica de sepse, pneumonia e meningite neonatal de início precoce, geralmente adquirida durante o parto. O rastreamento materno no fim da gestação e a penicilina intraparto quando indicada reduzem substancialmente a transmissão vertical.

Distratores:
B — Incorreta. Chlamydia trachomatis pode causar conjuntivite e pneumonia neonatal de início mais tardio, mas não é alvo da profilaxia intraparto descrita.
C — Incorreta. Staphylococcus aureus não integra o rastreamento vaginal/retal rotineiro nem a quimioprofilaxia obstétrica para sepse precoce.
D — Incorreta. Escherichia coli também pode causar sepse neonatal, sobretudo em prematuros, mas não há programa universal de rastreamento e profilaxia intraparto equivalente ao do EGB.`,

        'obstetricia-inep-061': `Resposta correta — C. Bacteriúria assintomática na gestação deve ser rastreada e tratada porque aumenta o risco de pielonefrite, baixo peso e parto prematuro. A antibioticoterapia deve ser guiada por cultura e segurança gestacional.

Distratores:
A — Incorreta. Progesterona não é indicada para toda gestante; seu benefício concentra-se em grupos selecionados, como antecedente de prematuridade espontânea e/ou colo uterino curto, conforme protocolo.
B — Incorreta. Estágios de risco elevado na classificação de Hobel demandam intensificação do cuidado e não simples manutenção ambulatorial habitual.
D — Incorreta. Bloqueadores de canais de cálcio, especialmente nifedipino, são usados como tocolíticos; hipotensão é efeito adverso a monitorar, não proibição absoluta.`,

        'obstetricia-inep-062': `Resposta correta — A. A paciente apresenta choque hemorrágico por hemorragia pós-parto, e o útero amolecido e elevado aponta para atonia. A resposta inicial deve ser imediata e simultânea: pedir ajuda, obter acesso venoso calibroso, iniciar cristaloide aquecido e protocolo de sangue conforme necessidade, massagear o útero e administrar uterotônicos, além de ácido tranexâmico precoce e investigação das causas.

Distratores:
B — Incorreta. Ultrassonografia e hemograma não devem atrasar a ressuscitação e o controle do sangramento; hemoglobina inicial pode inclusive subestimar a perda aguda.
C — Incorreta. Histerectomia é reservada à hemorragia refratária após medidas menos invasivas ou a situações específicas; sangue emergencial pode ser necessário, mas a cirurgia radical não é a primeira etapa.
D — Incorreta. Sangramento volumoso com hipotensão, taquicardia e confusão não é loquiação fisiológica, mas emergência potencialmente fatal.`,

        'obstetricia-inep-063': `Resposta correta — C. Segundo o gabarito, a imagem mostra apresentação cefálica defletida de terceiro grau, ou apresentação de face, na qual a extensão máxima da cabeça faz a face tornar-se o ponto de referência ao toque vaginal.

Distratores:
A — Incorreta. Na deflexão de primeiro grau, bregmática, o ponto de referência é a fontanela anterior, sem extensão máxima.
B — Incorreta. Na apresentação de fronte, deflexão de segundo grau, palpa-se a fronte e o maior diâmetro cefálico dificulta o parto vaginal.
D — Incorreta. Na apresentação fletida occipital, identifica-se a fontanela posterior e o occipício, não estruturas da face.

Validação visual pendente — a fotografia mencionada no enunciado não foi preservada na importação. É indispensável conferir os marcos anatômicos palpáveis na imagem original antes da publicação definitiva deste comentário.`,

        'obstetricia-inep-064': `Resposta correta — B. Glicemia de jejum de 91 mg/dL no início da gestação está abaixo do limiar diagnóstico de 92 mg/dL. Deve-se completar o rastreamento com TOTG de 75 g entre 24 e 28 semanas. Basta um valor igual ou superior a 92 mg/dL em jejum, 180 mg/dL em uma hora ou 153 mg/dL em duas horas para diagnosticar diabetes gestacional.

Distratores:
A — Incorreta. O protocolo de etapa única utiliza 75 g e ocorre entre 24 e 28 semanas, não 100 g entre 32 e 36.
C — Incorreta. A carga está correta, mas a janela começa em 24 semanas e apenas um valor alterado já estabelece o diagnóstico.
D — Incorreta. Carga, período e exigência de dois valores não correspondem ao método diagnóstico apresentado.`,

        'obstetricia-inep-065': `Resposta correta — C. A paciente está estável, deseja preservar fertilidade, pode aderir ao seguimento, tem massa anexial pequena sem embrião vivo, beta-hCG relativamente baixo e exames normais. Esse conjunto é compatível com tratamento medicamentoso da gestação ectópica por metotrexato, após excluir contraindicações e garantir monitorização seriada.

Distratores:
A — Incorreta. Cirurgia aberta é desproporcional em paciente estável e sem sinais de ruptura, sendo reservada a cenários de instabilidade ou impossibilidade de abordagem menos invasiva.
B — Incorreta. Conduta expectante é mais apropriada quando o beta-hCG está baixo e em queda; aqui ele aumentou de 1.500 para 2.500 mUI/mL.
D — Incorreta. Laparoscopia pode ser indicada se houver contraindicação ou falha do metotrexato, atividade cardíaca embrionária, níveis muito elevados ou instabilidade, mas não é a melhor primeira escolha no cenário descrito.`,

        'obstetricia-inep-066': `Resposta correta — C. No descolamento prematuro de placenta com parto vaginal viável, a amniotomia pode acelerar o trabalho de parto e reduzir a pressão intrauterina e a passagem de tromboplastina para a circulação materna, contribuindo para diminuir o risco de coagulação intravascular disseminada. A conduta global ainda depende da estabilidade materna e fetal.

Distratores:
A — Incorreta. Embolia por líquido amniótico é rara e não constitui a razão para evitar amniotomia nesse cenário.
B — Incorreta. O objetivo principal não é abreviar a dequitação placentária, mas favorecer o esvaziamento uterino e reduzir complicações do descolamento.
D — Incorreta. A amniotomia não é contraindicada por ampliar necessariamente a área descolada; quando o parto vaginal é apropriado, pode integrar o manejo.`,

        'obstetricia-inep-067': `Resposta correta — A. Atraso menstrual, dor pélvica unilateral, sangramento vaginal, massa/dor anexial e sinais de instabilidade sugerem fortemente gestação ectópica, possivelmente rota. Beta-hCG quantitativo e ultrassonografia transvaginal são os exames fundamentais para confirmar localização e orientar o tratamento.

Distratores:
B — Incorreta. Torção anexial causa dor súbita intensa, mas o atraso menstrual e o sangramento tornam gestação ectópica prioritária; ultrassonografia transvaginal com Doppler é mais útil que ultrassom abdominal total.
C — Incorreta. Doença inflamatória pélvica costuma associar-se a dor à mobilização cervical, corrimento e, por vezes, febre, sem explicar tão bem atraso menstrual e choque.
D — Incorreta. Cisto roto é diagnóstico diferencial, porém tomografia expõe possível gestação à radiação e não substitui beta-hCG e ultrassonografia transvaginal.

Ressalva de segurança — pressão de 90 × 50 mmHg, taquicardia e irritação peritoneal exigem acesso venoso, ressuscitação e avaliação cirúrgica imediata em paralelo aos exames; não se deve aguardar investigação prolongada se houver suspeita de ruptura.`,

        'obstetricia-inep-068': `Resposta correta — D. Hemorragia intensa com útero firmemente contraído e ausência de lacerações sugere retenção de tecido placentário. Deve-se examinar cuidadosamente a placenta; a presença de falhas ou escavações indica cotilédone retido e necessidade de exploração/esvaziamento uterino, frequentemente por curetagem ou aspiração, junto à reanimação.

Distratores:
A — Incorreta. Misoprostol trata atonia uterina, mas o útero está contraído, tornando essa causa menos provável.
B — Incorreta. Histerectomia não é a abordagem inicial de restos placentários em paciente jovem antes de medidas dirigidas e conservadoras.
C — Incorreta. Choque hemorrágico grave exige controle imediato da fonte; conduta expectante é perigosa.`,

        'obstetricia-inep-069': `Resposta correta — A. Recomenda-se adiar a concepção por cerca de 12 a 18 meses após cirurgia bariátrica, período de perda ponderal acelerada e maior risco de deficiências nutricionais. Concepção apenas dez meses após bypass associa-se a maior probabilidade de prematuridade e recém-nascido pequeno para a idade gestacional.

Distratores:
B — Incorreta. O TOTG pode precipitar dumping e hipoglicemia após bypass; o rastreamento costuma ser adaptado com glicemias capilares ou monitorização contínua conforme protocolo.
C — Incorreta. Ferro deve ser monitorado e suplementado, mas a via intravenosa não é obrigatória para todas; é reservada a intolerância, má absorção relevante ou falha da reposição oral.
D — Incorreta. Carboidratos de absorção rápida agravam dumping; orienta-se fracionamento alimentar, baixo teor de açúcares simples e separação entre líquidos e sólidos.`,

        'obstetricia-inep-070': `Resposta correta — D. Na ausência de diagnóstico e tratamento prévios documentados, a sífilis deve ser considerada de duração ignorada e tratada imediatamente com penicilina G benzatina 2,4 milhões UI intramuscular por semana durante três semanas. O título baixo não exclui infecção ativa nem risco de transmissão fetal.

Distratores:
A — Incorreta. Adiar tratamento para observar títulos expõe o feto e não é aceitável na gestação.
B — Incorreta. A penicilina é o único tratamento comprovadamente eficaz para prevenir sífilis congênita; gestantes alérgicas devem ser dessensibilizadas e tratadas com penicilina.
C — Incorreta. O VDRL deve ser acompanhado mensalmente, e positividade residual isolada não determina retratamento; avaliam-se queda de títulos, elevação sustentada e risco de reinfecção.`,

        'obstetricia-inep-071': `Resposta correta — D. Deficiência homozigótica de antitrombina com trombose venosa profunda prévia representa trombofilia de altíssimo risco e exige anticoagulação terapêutica durante a gestação, como enoxaparina 1 mg/kg a cada 12 horas. Pelo antecedente de pré-eclâmpsia grave e parto prematuro, também está indicada profilaxia com ácido acetilsalicílico em baixa dose.

Distratores:
A — Incorreta. Enoxaparina 40 mg/dia é dose profilática e insuficiente para o risco trombótico extremo e a história de evento prévio.
B — Incorreta. Ácido acetilsalicílico reduz risco de recorrência de pré-eclâmpsia, mas não substitui anticoagulação para trombofilia grave.
C — Incorreta. A combinação está conceitualmente correta, porém a dose profilática de enoxaparina é inadequada nesse caso.`,

        'obstetricia-inep-072': `Resposta correta — B. O antecedente de parto prematuro espontâneo torna a paciente candidata à prevenção de recorrência. Com colo longo de 43 mm e sem encurtamento atual, o gabarito indica progesterona vaginal micronizada, acompanhada por vigilância seriada do comprimento cervical.

Distratores:
A — Incorreta. Pelo entendimento adotado no gabarito, um único parto pré-termo sem demonstração clara de insuficiência cervical e com colo atual normal não basta para cerclagem eletiva imediata.
C — Incorreta. Ácido fólico é importante para prevenção de defeitos do tubo neural, mas sua associação com ômega 3 não substitui a estratégia específica de prevenção da recorrência.
D — Incorreta. Rastreio de EGB no fim da gestação previne doença neonatal, não recorrência de parto prematuro.

Ressalva técnica — uma perda espontânea indolor com 21 semanas pode preencher critério de cerclagem indicada pela história em alguns protocolos. Como o enunciado não informa dilatação indolor, ruptura de membranas ou mecanismo da perda anterior, a preferência entre cerclagem e progesterona depende dessa história obstétrica detalhada.`,

        'obstetricia-inep-073': `Resposta correta — C. IgG reagente e IgM não reagente indicam infecção pregressa e imunidade, sem evidência sorológica de toxoplasmose aguda. A gestante pode ser tranquilizada e continuar o pré-natal habitual.

Distratores:
A — Incorreta. Esse padrão é esperado após contato antigo e não sugere, por si só, falso-positivo nem necessidade de alto risco.
B — Incorreta. Infecção aguda seria sugerida por soroconversão ou IgM positiva interpretada com exames confirmatórios e contexto temporal.
D — Incorreta. Suscetibilidade corresponde a IgG e IgM negativas; a IgG positiva demonstra contato prévio.`,

        'obstetricia-inep-074': `Resposta correta — D. Conforme o gabarito, diante de colonização por EGB e alergia à penicilina, utiliza-se clindamicina intravenosa quando o isolado é comprovadamente sensível e não há resistência induzível. A profilaxia intraparto é iniciada quando houver trabalho de parto ou ruptura de membranas.

Distratores:
A — Incorreta. O gabarito considera necessária uma alternativa antibiótica pela colonização documentada, em vez de omitir profilaxia sem avaliar o contexto do parto.
B — Incorreta. Vancomicina é reservada a alergia de alto risco quando o isolado é resistente à clindamicina ou a sensibilidade é desconhecida.
C — Incorreta. Ampicilina é beta-lactâmico e não deve ser escolhida sem esclarecer a natureza da alergia; alergia grave exige agente não beta-lactâmico apropriado.

Ressalva técnica — cesárea eletiva realizada antes do trabalho de parto e com membranas íntegras não requer profilaxia intraparto específica para EGB, embora mantenha a antibioticoprofilaxia cirúrgica habitual. Além disso, clindamicina só é adequada com teste de sensibilidade; se a alergia for grave e a sensibilidade desconhecida, prefere-se vancomicina. Esses dados não foram fornecidos, tornando a alternativa D condicionada.`,

        'obstetricia-inep-075': `Resposta correta — A. Restrição de crescimento com fluxo diastólico ausente na artéria umbilical indica insuficiência placentária grave. Com 35 semanas, está indicada resolução da gestação; devido ao comprometimento placentário e à baixa tolerância fetal ao trabalho de parto, a cesariana é a via indicada pelo gabarito.

Distratores:
B — Incorreta. Sulfato de magnésio para neuroproteção é geralmente recomendado em partos prematuros mais precoces, em especial antes de 32 semanas, não como conduta principal aos 35 semanas.
C — Incorreta. Perfil biofísico a cada três dias posterga indevidamente o parto diante de diástole zero nessa idade gestacional.
D — Incorreta. Doppler semanal é vigilância insuficiente para uma alteração grave já estabelecida e não substitui a resolução indicada.`,

        'obstetricia-inep-076': `Resposta correta — A. O VDRL é teste não treponêmico quantitativo e seus títulos permitem acompanhar mensalmente a resposta terapêutica e detectar possível reinfecção na gestação. Espera-se redução adequada do título ao longo do seguimento, interpretada conforme estágio e tempo desde o tratamento.

Distratores:
B — Incorreta. TPHA é teste treponêmico e tende a permanecer reagente por toda a vida, não sendo útil para controle de cura.
C — Incorreta. FTA-ABS também é treponêmico e não acompanha resposta por variação de títulos.
D — Incorreta. Penicilina procaína é medicamento, não exame de seguimento, e não substitui a benzilpenicilina benzatina no esquema materno indicado.`,

        'obstetricia-inep-077': `Resposta correta — C. Situação descreve a relação entre os eixos fetal e uterino, sendo longitudinal. A parte que ocupa a pelve é a cabeça, portanto a apresentação é cefálica. Com dorso à direita e referência occipital posterior conforme a figura, a variedade é occípito-direita-posterior.

Distratores:
A — Incorreta. Inverte os conceitos: “cefálica” é apresentação e “longitudinal” é situação, além de indicar lado esquerdo.
B — Incorreta. Apesar de acertar a variedade de posição, também troca situação por apresentação.
D — Incorreta. Naso é referência de apresentação de face, não da apresentação cefálica fletida descrita.

Validação visual pendente — a figura das manobras de Leopold não foi preservada na importação. O lado do dorso e a variedade posterior devem ser confirmados no PDF-fonte antes da publicação definitiva deste comentário.`,

        'obstetricia-inep-078': `Resposta correta — C. A hipertensão já está presente com 12 semanas, caracterizando hipertensão crônica. Captopril é contraindicado na gestação por fetotoxicidade e deve ser suspenso; como a pressão permanece em 150 × 100 mmHg, é apropriado iniciar anti-hipertensivo compatível com a gestação, como metildopa segundo a alternativa, associado a orientação dietética e seguimento de alto risco.

Distratores:
A — Incorreta. Não há nível pressórico grave nem emergência que justifique hidralazina intravenosa e internação imediata.
B — Incorreta. Inibidores da ECA, como captopril, devem ser interrompidos na gestação.
D — Incorreta. Apenas observar a curva pressórica deixa hipertensão persistente sem tratamento e não aborda a retirada do medicamento contraindicado.`,

        'obstetricia-inep-079': `Resposta correta — A. A vacina contra influenza é recomendada em qualquer trimestre, em dose anual única. A dTpa deve ser administrada em cada gestação, independentemente de dose prévia, para maximizar a transferência placentária de anticorpos contra coqueluche ao recém-nascido.

Distratores:
B — Incorreta. A vacinação contra influenza precisa ser renovada a cada campanha/temporada, mesmo que tenha ocorrido em gestação anterior.
C — Incorreta. Adultos previamente vacinados recebem uma dose anual de influenza, não duas doses com intervalo de 30 dias.
D — Incorreta. A influenza está correta, mas omitir nova dTpa deixa de proteger adequadamente o bebê desta gestação.`,

        'obstetricia-inep-080': `Resposta correta — B. Carga viral de 2.000 cópias/mL após diagnóstico tardio é superior ao limiar de 1.000 cópias/mL usado para indicar cesárea programada com 38 semanas, reduzindo transmissão intraparto. Deve-se manter terapia antirretroviral e iniciar zidovudina intravenosa cerca de três horas antes do procedimento.

Distratores:
A — Incorreta. Indução e parto vaginal não são preferidos quando a carga viral próxima ao parto permanece acima de 1.000 cópias/mL.
C — Incorreta. Aguardar 40 semanas aumenta a chance de trabalho de parto ou ruptura de membranas, e uma hora de zidovudina é tempo insuficiente no protocolo descrito.
D — Incorreta. Aguardar parto espontâneo não é a estratégia indicada com carga viral acima do limiar para cesárea eletiva.`,

        'obstetricia-inep-081': `Resposta correta — C. No primeiro trimestre, o Caderno de Atenção Básica nº 32 recomenda hemograma, tipagem ABO/Rh, glicemia de jejum, rastreamento de sífilis, HIV, toxoplasmose e hepatite B, além de urina tipo I e urocultura, entre os exames de rotina citados.

Distratores:
A — Incorreta. Inclui citomegalovírus como rastreamento universal e omite toxoplasmose e hepatite B.
B — Incorreta. TOTG não substitui a glicemia inicial de rotina e, em geral, é realizado entre 24 e 28 semanas quando indicado pelo rastreamento.
D — Incorreta. Citomegalovírus e hepatite C não integravam a lista universal apresentada pelo caderno citado, enquanto toxoplasmose foi omitida.

Ressalva temporal — a questão cobra especificamente o Caderno nº 32. Protocolos nacionais podem ser atualizados, portanto a prática atual deve seguir a diretriz vigente do serviço.`,

        'obstetricia-inep-082': `Resposta correta — B. No pré-natal de risco habitual, recomenda-se consulta mensal até 28 semanas, quinzenal de 28 a 36 semanas e semanal a partir de 36 semanas até o parto, com adaptação conforme riscos e necessidades clínicas.

Distratores:
A — Incorreta. A periodicidade mensal não deve se estender até 34 semanas, quando o acompanhamento já precisa ser mais frequente.
C — Incorreta. Consultas quinzenais desde o fim do primeiro trimestre são mais frequentes que o calendário rotineiro sem indicação clínica.
D — Incorreta. Até 28 semanas, o intervalo habitual é mensal, e não quinzenal.`,

        'obstetricia-inep-083': `Resposta correta — D. Dor, ardor e pródromo pruriginoso seguidos de vesículas agrupadas e ulcerações são típicos de primeiro episódio de herpes genital. O tratamento com aciclovir é seguro na gestação; a supressão a partir de 36 semanas reduz recorrência e lesões ativas no parto.

Distratores:
A — Incorreta. Sífilis secundária costuma produzir manifestações sistêmicas, exantema e condiloma plano, não vesículas dolorosas agrupadas.
B — Incorreta. O cancro da sífilis primária é tipicamente úlcera única, limpa e indolor.
C — Incorreta. O diagnóstico pode ser confirmado por teste molecular da lesão, mas sorologia IgM não é recomendada e não se deve condicionar o início do tratamento de um quadro típico à cultura.`,

        'obstetricia-inep-084': `Resposta correta — B. Atraso menstrual, dor abdominal intensa, palidez, taquicardia, hipotensão relativa, irritação peritoneal e dor no fundo de saco compõem quadro de gestação ectópica rota com hemoperitônio. É emergência cirúrgica, com ressuscitação hemodinâmica simultânea.

Distratores:
A — Incorreta. Apendicite é diferencial da dor em fossa ilíaca direita, mas não explica tão bem atraso menstrual, sinais de hemorragia e dor pélvica profunda.
C — Incorreta. Doença inflamatória pélvica costuma cursar com febre, corrimento e dor à mobilização cervical, mas não explica choque hemorrágico; além disso, gestação deve ser excluída.
D — Incorreta. Aborto geralmente apresenta sangramento vaginal e alterações uterinas/cervicais, ausentes aqui, e observação é inadequada diante de instabilidade.`,

        'obstetricia-inep-085': `Resposta correta — C. No TOTG de 75 g, valores iguais ou superiores a 92 mg/dL em jejum, 180 mg/dL em uma hora ou 153 mg/dL em duas horas diagnosticam diabetes gestacional; basta um valor alterado. A paciente tem uma e duas horas acima dos limites. A Atenção Primária mantém o cuidado longitudinal compartilhado e a encaminha ao pré-natal de alto risco.

Distratores:
A — Incorreta. Dois valores estão claramente alterados, portanto diabetes gestacional foi detectado.
B — Incorreta. Insulina não é iniciada automaticamente nem nessa dose extrema; começa-se orientação nutricional, atividade segura e monitorização, indicando insulina se as metas não forem atingidas.
D — Incorreta. “Diabetes mellitus” prévio/manifesto exige critérios como jejum ≥126 mg/dL; o padrão apresentado aos 26 semanas é de diabetes gestacional, e a UBS não deve abandonar o acompanhamento.`,

        'obstetricia-inep-086': `Resposta correta — B. Glicemia de jejum de 132 mg/dL no início da gestação ultrapassa o critério de 126 mg/dL para diabetes manifesto diagnosticado na gestação, interpretado como provável diabetes prévio. A paciente deve ser encaminhada ao alto risco para avaliação e controle imediatos, mantendo cuidado compartilhado com a Atenção Primária.

Distratores:
A — Incorreta. O valor não se enquadra apenas como diabetes gestacional; ele atinge critério diagnóstico de diabetes franco.
C — Incorreta. Não é necessário TOTG para confirmar um jejum em faixa diagnóstica, devendo-se confirmar conforme protocolo sem atrasar a condução especializada.
D — Incorreta. Adiar o esclarecimento até 26 semanas prolongaria exposição à hiperglicemia e perderia a janela para avaliação precoce de complicações.`,

        'cg-inep-001': `Resposta correta — A. Uma ferida simples de 4 cm no antebraço, sem lesão profunda ou contaminação importante, pode ser reparada com infiltração local pelas bordas. Lidocaína a 2% oferece início rápido e duração suficiente; o vasoconstritor reduz sangramento e prolonga o efeito quando usado em tecido com circulação adequada e na dose segura.

Distratores:
B — Incorreta. Bloqueio do plexo braquial é excessivamente invasivo para uma laceração superficial localizada e expõe a riscos desnecessários.
C — Incorreta. Bupivacaína a 2% é concentração inadequadamente alta e potencialmente cardiotóxica; além disso, seu início lento não traz vantagem para esse reparo breve.
D — Incorreta. Bloqueio proximal com ropivacaína é desproporcional, e 1% é concentração alta para a necessidade apresentada.`,

        'cg-inep-002': `Resposta correta — C. A gestante traumatizada está em choque. A partir de aproximadamente 20 semanas, o útero pode comprimir a veia cava em decúbito dorsal e reduzir o retorno venoso. Deve-se deslocar o útero/lateralizar a prancha cerca de 15–30 graus para a esquerda, mantendo alinhamento da coluna, enquanto se continua o ABC, controle de hemorragia e ressuscitação.

Distratores:
A — Incorreta. Ultrassonografia obstétrica não deve preceder a correção imediata da compressão aortocava e a estabilização materna; a melhor ressuscitação fetal é estabilizar a mãe.
B — Incorreta. Coloides não são preferidos à ressuscitação balanceada com hemoderivados e cristaloide limitado no choque hemorrágico.
D — Incorreta. Tomografia exige estabilidade suficiente e não é o próximo passo em paciente com hipotensão profunda.`,

        'cg-inep-003': `Resposta correta — B. O paciente tem choque hemorrágico provável por fratura pélvica e está em unidade sem capacidade definitiva. Deve-se estabilizar o que for possível sem atrasar a transferência — incluindo cinta pélvica, acessos, ressuscitação e prevenção de hipotermia —, acionar regulação, comunicar o receptor, documentar e transportar com suporte avançado.

Distratores:
A — Incorreta. Grandes volumes de cristaloide podem agravar coagulopatia e diluição; consentimento formal não deve atrasar transferência urgente, e suporte básico é inadequado ao instável.
C — Incorreta. Transferir rapidamente é correto, mas comunicação prévia e documentação devem ser organizadas antes/na saída, não delegadas para depois.
D — Incorreta. Autorização familiar não é requisito para transferência emergencial salvadora, e transporte básico não oferece o suporte necessário.`,

        'cg-inep-004': `Resposta correta — C. Trauma de alta energia por desaceleração associado a mediastino alargado, apagamento do botão aórtico e desvio traqueal é altamente sugestivo de lesão traumática da aorta, geralmente no istmo. Em paciente estável, a confirmação é feita por angiotomografia de tórax e exige avaliação urgente da cirurgia vascular/trauma.

Distratores:
A — Incorreta. Tamponamento costuma causar hipotensão, turgência jugular e abafamento de bulhas, não os sinais radiográficos mediastinais descritos.
B — Incorreta. Pneumotórax hipertensivo cursa com instabilidade, redução unilateral do murmúrio e hipertimpanismo assimétrico.
D — Incorreta. Hemotórax maciço produziria macicez, redução do murmúrio e opacificação pleural, e não mediastino alargado típico de hematoma.`,

        'cg-inep-005': `Resposta correta — C. Ausência de eliminação de mecônio, distensão, vômito bilioso e eliminação explosiva de fezes após estímulo retal apontam para doença de Hirschsprung. A complicação grave é enterocolite associada ao megacólon congênito, capaz de causar sepse e choque, exigindo descompressão, antibióticos e avaliação cirúrgica urgente.

Distratores:
A — Incorreta. Íleo meconial associa-se a mecônio espesso e fibrose cística; não apresenta classicamente a descarga explosiva após toque.
B — Incorreta. Má rotação com volvo causa vômito bilioso e emergência isquêmica, mas não explica tão especificamente atraso do mecônio e ampola vazia com eliminação explosiva.
D — Incorreta. Síndrome do tampão meconial costuma melhorar após eliminação do tampão e é menos compatível com enterocolite tóxica progressiva.`,

        'cg-inep-006': `Resposta correta — B. Dor, febre, taquicardia, vômitos e piora no décimo dia após gastrectomia vertical sugerem vazamento da linha de grampeamento com coleção ou abscesso. Em paciente sem peritonite e hemodinamicamente estável, a tomografia de abdome com contraste é o exame mais útil para identificar extravasamento, coleção e orientar drenagem ou intervenção.

Distratores:
A — Incorreta. Endoscopia pode ampliar uma deiscência e não é o primeiro exame para pesquisar coleção extraluminal no pós-operatório.
C — Incorreta. Alta após hidratação e antibiótico ignora possível complicação séptica cirúrgica que requer diagnóstico e controle de foco.
D — Incorreta. Laparotomia imediata é reservada a instabilidade, peritonite difusa ou falha de abordagem menos invasiva; não é a primeira medida no quadro estável descrito.

Validação documental pendente — o enunciado anuncia exames laboratoriais, mas os respectivos valores não foram preservados na importação. Eles devem ser conferidos no PDF-fonte, embora os achados clínicos já sustentem a indicação de tomografia.`,

        'cg-inep-007': `Resposta correta — D. Choque persistente após trauma abdominal, FAST com grande quantidade de líquido livre e ausência de resposta à ressuscitação indicam hemorragia intraperitoneal ativa e necessidade de laparotomia imediata. Ácido tranexâmico é indicado precocemente, dentro de três horas do trauma, quando há sangramento significativo, em paralelo ao protocolo transfusional.

Distratores:
A — Incorreta. Tomografia não deve atrasar cirurgia em paciente hemodinamicamente instável com FAST positivo.
B — Incorreta. Cristaloide excessivo agrava hipotermia, acidose e coagulopatia; repetir FAST não acrescenta informação capaz de mudar a indicação operatória.
C — Incorreta. Lavado peritoneal é desnecessário porque o FAST já confirmou líquido livre no instável.`,

        'cg-inep-008': `Resposta correta — D. Dor, edema unilateral, calor e empastamento no pós-operatório conferem probabilidade clínica elevada de trombose venosa profunda. O próximo exame é ultrassonografia Doppler/compressiva venosa, que confirma o diagnóstico e orienta anticoagulação.

Distratores:
A — Incorreta. Trombólise sistêmica não é tratamento rotineiro de TVP estável e acarreta alto risco hemorrágico no terceiro dia pós-operatório.
B — Incorreta. D-dímero tem baixa especificidade após cirurgia e provavelmente estará elevado, não sendo útil para excluir TVP nesse contexto.
C — Incorreta. Enoxaparina uma vez ao dia é formulação ambígua e pode representar dose profilática; o tratamento deve ser terapêutico e idealmente iniciado conforme probabilidade e tempo para obtenção da imagem.

Ressalva de segurança — se o Doppler não puder ser obtido prontamente e o risco hemorrágico permitir, diretrizes podem recomendar anticoagulação terapêutica empírica enquanto se aguarda o exame.`,

        'cg-inep-009': `Resposta correta — C. Após enterectomia extensa com jejunostomia, em ventilação mecânica e dependência de drogas vasoativas, há risco de síndrome do intestino curto e hipoperfusão intestinal. A nutrição parenteral por acesso venoso central permite aporte completo enquanto a via enteral é inviável ou insegura, com reavaliação diária para iniciar estímulo enteral assim que houver estabilidade.

Distratores:
A — Incorreta. Alimentação pela jejunostomia pode ser útil após estabilização, mas grande ressecção e uso de vasopressores tornam a absorção limitada e elevam o risco inicial.
B — Incorreta. Tubo nasogástrico não supera a limitação absortiva e pode não ser seguro durante choque com hipoperfusão esplâncnica.
D — Incorreta. Sonda nasoentérica também depende de intestino funcionante e perfundido; não fornece necessariamente o aporte necessário nesse momento crítico.`,

        'cg-inep-010': `Resposta correta — B. Se a compressão do anel inguinal profundo impede o aparecimento da hérnia durante Valsalva, o saco atravessava esse anel, característica de hérnia inguinal indireta. Ela segue lateralmente aos vasos epigástricos inferiores pelo canal inguinal e pode alcançar o escroto.

Distratores:
A — Incorreta. Hérnia direta protrui medialmente aos vasos epigástricos pelo triângulo de Hesselbach e tende a surgir apesar da oclusão do anel profundo.
C — Incorreta. Hérnia femoral aparece abaixo do ligamento inguinal e não se projeta pelo anel inguinal externo.
D — Incorreta. Hérnia mista combina componentes direto e indireto; o teste descrito demonstra apenas o trajeto indireto.`,

        'cg-inep-011': `Resposta correta — B. Em anzol simples transfixado, após preparo e anestesia, pode-se avançar a ponta até exteriorizar a farpa, cortar a extremidade farpada com alicate e retirar o restante pelo orifício de entrada. Isso evita que a farpa volte a rasgar os tecidos.

Distratores:
A — Incorreta. Avaliação neurovascular deve ocorrer antes do bloqueio e do procedimento, não apenas depois do preparo já descrito.
C — Incorreta. Incisão ampla para exposição total é desnecessária em anzol superficial simples e aumenta trauma e risco de infecção.
D — Incorreta. Tracionar a farpa com pinça pelo orifício de saída pode ampliar a lesão; a técnica segura é cortar a farpa antes da retirada retrógrada.`,

        'cg-inep-012': `Resposta correta — B. Protocolos ACERTO/ERAS permitem líquidos claros, inclusive bebida com carboidratos em pacientes selecionados, até duas horas antes da indução anestésica. Isso reduz sede, desconforto e resistência insulínica sem aumentar aspiração quando respeitados os critérios de segurança.

Distratores:
A — Incorreta. Jejum desde meia-noite é excessivo para cirurgia às 16 horas e piora desconforto e resposta metabólica.
C — Incorreta. Alimentos sólidos leves exigem intervalo maior, em geral seis horas; três horas é insuficiente.
D — Incorreta. Bebidas com proteína podem não se enquadrar como líquidos claros, e quatro horas não corresponde à recomendação padrão de carboidrato claro até duas horas.`,

        'cg-inep-013': `Resposta correta — C. Eritema persistente em pele íntegra corresponde a lesão por pressão estágio 1. A prioridade é aliviar pressão com reposicionamento programado, individualizado e, no cenário proposto, em intervalos que não excedam duas horas, associado a superfície adequada, nutrição e controle de umidade.

Distratores:
A — Incorreta. Dispositivos em forma de argola concentram pressão nas bordas e podem agravar isquemia tecidual.
B — Incorreta. Decúbito dorsal permanente mantém pressão sobre o sacro; cabeceira elevada ainda aumenta cisalhamento.
D — Incorreta. Não se deve massagear área eritematosa sobre proeminência óssea, pois pode lesar tecido já comprometido.`,

        'cg-inep-014': `Resposta correta — D. Distensão difusa, timpanismo, náuseas, vômitos, ausência de flatos e ruídos diminuídos no pós-operatório, com tomografia mostrando dilatação de alças sem ar livre ou coleção, favorecem íleo paralítico pós-operatório prolongado. O manejo inclui correção hidroeletrolítica, revisão de opioides, mobilização e descompressão quando necessária.

Distratores:
A — Incorreta. Isquemia mesentérica costuma causar dor desproporcional, acidose e achados vasculares ou de sofrimento de alça, não descritos.
B — Incorreta. Obstrução mecânica geralmente apresenta ponto de transição e dilatação proximal com colapso distal, além de ruídos inicialmente aumentados.
C — Incorreta. Deiscência costuma associar-se a febre, toxicidade, peritonite, coleção ou pneumoperitônio, ausentes na tomografia.`,

        'cg-inep-015': `Resposta correta — B. Queimadura de segundo grau envolvendo 22% da superfície corporal em adulto exige ressuscitação com cristaloide isotônico, tipicamente Ringer lactato, ajustada pela resposta. O débito urinário horário é um dos principais parâmetros de adequação, com meta aproximada de 0,5 mL/kg/h no adulto.

Distratores:
A — Incorreta. Coloides não são a solução inicial de escolha nas primeiras horas da ressuscitação térmica.
C — Incorreta. Solução glicosada não é usada para reposição volêmica principal do adulto queimado; embora metade do volume calculado seja administrada nas primeiras oito horas, o fluido está errado.
D — Incorreta. Solução hipertônica não constitui o esquema padrão, e a monitorização deve ser contínua desde o início, não apenas por 16 horas.

Ressalva de segurança — queimadura facial exige vigilância repetida da via aérea e intubação precoce se surgirem sinais de lesão inalatória ou edema progressivo, mesmo que inicialmente não haja estridor.`,

        'cg-inep-016': `Resposta correta — A. Houve perda de consciência de duração desconhecida, amnésia pós-traumática e trauma craniofacial e cervical. É necessário manter proteção cervical, realizar tomografia de crânio, face e coluna cervical, radiografar membros conforme os achados e observar por período suficiente para detectar deterioração neurológica.

Distratores:
B — Incorreta. Radiografia simples de crânio não exclui hemorragia intracraniana e é inferior à tomografia nesse contexto.
C — Incorreta. Liberar para casa após episódio prolongado/indeterminado de inconsciência e recuperação incompleta é inseguro; a coluna cervical também precisa ser avaliada.
D — Incorreta. Radiografias de crânio e face são inadequadas para excluir lesões intracranianas e complexas, apesar de a internação ser prudente.`,

        'cg-inep-017': `Resposta correta — D. Hipoxemia grave, hipotensão, turgência jugular, desvio traqueal contralateral e murmúrio muito reduzido à esquerda caracterizam pneumotórax hipertensivo. O diagnóstico é clínico e requer descompressão torácica imediata no pré-hospitalar, seguida de drenagem torácica definitiva.

Distratores:
A — Incorreta. Reposição volêmica pode ser necessária, mas não corrige o choque obstrutivo causado pela pressão pleural.
B — Incorreta. A via aérea está comprometida secundariamente pela mecânica torácica; cricotireoidostomia não trata o pneumotórax.
C — Incorreta. Turgência jugular e bulhas hipofonéticas lembram tamponamento, mas o desvio traqueal e a hipofonese unilateral do murmúrio apontam para pneumotórax hipertensivo.`,

        'cg-inep-018': `Resposta correta — D. Dor migratória do epigástrio para fossa ilíaca direita, anorexia, náusea, febre e descompressão dolorosa sugerem apendicite aguda. Em mulher jovem, ultrassonografia é exame inicial sem radiação e a avaliação cirúrgica deve ser solicitada prontamente.

Distratores:
A — Incorreta. O quadro não é típico de infecção urinária, e urocultura não deve atrasar investigação de abdome agudo.
B — Incorreta. Metotrexato trata gestação ectópica selecionada, mas a história menstrual não estabelece esse diagnóstico e o medicamento jamais deve ser iniciado sem confirmação.
C — Incorreta. Acompanhamento ambulatorial é inadequado diante de sinais de irritação peritoneal e febre.`,

        'cg-inep-019': `Resposta correta — C. Aos seis anos, anel prepucial fibrótico associado a balanopostites recorrentes caracteriza fimose patológica e é indicação de avaliação urológica para tratamento cirúrgico, geralmente postectomia, após controle de inflamação ativa.

Distratores:
A — Incorreta. Fimose fisiológica não apresenta cicatriz fibrótica nem infecções recorrentes; exercícios forçados podem causar fissuras e piorar a fibrose.
B — Incorreta. Não há razão para aguardar a adolescência quando já existem complicações recorrentes e fibrose.
D — Incorreta. Corticoide tópico pode ser tentado em casos selecionados sem cicatriz importante, mas hialuronidase não é padrão e a recorrência com anel fibrótico favorece indicação cirúrgica.`,

        'cg-inep-020': `Resposta correta — A. Imobilização, uso de opioides e internação favorecem constipação grave e fecaloma. Fezes endurecidas causam trauma do anodermo, produzindo fissura anal, dor evacuatória e pequena quantidade de sangue vivo.

Distratores:
B — Incorreta. Não há vômitos, distensão, parada completa de eliminação ou sinais sistêmicos que sustentem obstrução e sepse.
C — Incorreta. Os exames iniciais não mostraram fratura pélvica, e lesão colônica tardia não explica tão bem fezes endurecidas com pequeno sangramento anal.
D — Incorreta. Intussuscepção é rara nessa faixa etária e costuma provocar obstrução, dor em cólicas e outros sinais ausentes.

Revisão do sinalizador — embora a questão esteja marcada para revisão visual no banco, o enunciado textual contém todos os elementos necessários para justificar o gabarito; nenhuma imagem é mencionada ou necessária.`,

        'cg-inep-021': `Resposta correta — A. Uretrorragia, hematoma perineal, globo vesical e fratura pélvica sugerem lesão uretral. A sondagem uretral às cegas é contraindicada; diante da retenção, deve-se realizar derivação suprapúbica por cistostomia, após avaliação apropriada da uretra.

Distratores:
B — Incorreta. Uretrocistoscopia não é a medida imediata para aliviar retenção em trauma pélvico com forte suspeita de ruptura uretral.
C — Incorreta. Não há indicação de laparotomia apenas pelos achados apresentados em paciente estável.
D — Incorreta. A passagem de sonda vesical pode agravar uma lesão uretral e criar falsa via.

Ressalva técnica — quando disponível e sem necessidade imediata de drenagem, a uretrografia retrógrada deve preceder qualquer tentativa de cateterização para definir a lesão.`,

        'cg-inep-022': `Resposta correta — D. Idoso com perda de consciência, Glasgow 13, cefaleia e grande ferimento no couro cabeludo necessita controle do sangramento e sutura, mas também transferência a serviço de trauma para tomografia, avaliação neurológica e observação, devido ao risco elevado de hemorragia intracraniana.

Distratores:
A — Incorreta. Observação domiciliar é insegura após alteração de consciência e Glasgow abaixo de 15.
B — Incorreta. Curativo compressivo isolado pode não controlar definitivamente a ferida e também não resolve a necessidade de investigação intracraniana.
C — Incorreta. Radiografia de crânio não exclui sangramento intracraniano; o exame indicado é tomografia.`,

        'cg-inep-023': `Resposta correta — C. A paciente tem colangite grave com choque séptico: hipotensão persiste após reposição inicial e a pressão arterial média permanece abaixo de 65 mmHg. Deve-se iniciar noradrenalina imediatamente para restaurar perfusão, enquanto se mantém antibiótico e se organiza drenagem biliar urgente por CPRE.

Distratores:
A — Incorreta. A CPRE é essencial para controle do foco, mas transporte/procedimento sem suporte hemodinâmico inicial aumenta o risco; vasopressor deve ser iniciado já.
B — Incorreta. Coloides não são preferidos aos cristaloides e não substituem vasopressor no choque persistente.
D — Incorreta. Hidrocortisona é considerada em choque refratário apesar de fluidos e vasopressores adequados, não antes da noradrenalina.`,

        'cg-inep-024': `Resposta correta — B. Dor intensa desencadeada pela evacuação e persistente por minutos, pequeno sangramento vivo, laceração visível na linha média posterior e plicoma sentinela são achados clássicos de fissura anal, possivelmente já com sinais de cronicidade.

Distratores:
A — Incorreta. Fístula anal costuma apresentar orifício externo e drenagem crônica purulenta, não laceração dolorosa linear.
C — Incorreta. Úlceras secundárias podem ter localização atípica e etiologias infecciosas, inflamatórias ou neoplásicas; o padrão mediano com plicoma é típico de fissura.
D — Incorreta. Hemorroida externa trombosada produz nódulo azulado, muito doloroso e palpável, ausente no exame.`,

        'cg-inep-025': `Resposta correta — D. O paciente apresenta pneumotórax hipertensivo à direita, com choque, hipoxemia, hipertimpanismo, murmúrio reduzido e desvio traqueal contralateral. Deve-se realizar descompressão imediata no quinto espaço intercostal entre as linhas axilares anterior e média, seguida de drenagem torácica no hospital, sem retirar o objeto empalado.

Distratores:
A — Incorreta. A faca deve permanecer estabilizada no local até retirada controlada em ambiente cirúrgico; removê-la pode desencadear hemorragia maciça.
B — Incorreta. Cricotireoidostomia não trata o choque obstrutivo pleural e não há evidência de obstrução alta da via aérea.
C — Incorreta. Acesso e volume são medidas auxiliares, mas não podem atrasar a descompressão que corrige a causa imediata da instabilidade.`,

        'cg-inep-026': `Resposta correta — C. O dermátomo da cicatriz umbilical corresponde a T10. A perda completa de sensibilidade a partir desse nível, associada a paraplegia, localiza neurologicamente a lesão medular em T10, devendo ser confirmada por exame segmentar e imagem da coluna.

Distratores:
A — Incorreta. T12 corresponde aproximadamente à região suprapúbica/ligamento inguinal, abaixo do nível sensitivo descrito.
B — Incorreta. T11 situa-se entre o umbigo e a região inguinal e não coincide com a referência clássica.
D — Incorreta. L1 é ainda mais inferior, próximo à região inguinal, e não explicaria nível no umbigo.`,

        'cg-inep-027': `Resposta correta — A. Uso crônico de anti-inflamatório, dor epigástrica súbita, abdome em tábua com irritação peritoneal e pneumoperitônio no recesso hepatofrênico indicam perfuração de úlcera péptica, descrita na alternativa como úlcera gástrica perfurada.

Distratores:
B — Incorreta. Pancreatite provoca dor epigástrica irradiada para dorso e elevação de lipase, mas não costuma produzir ar livre intraperitoneal.
C — Incorreta. Colecistite causa dor em hipocôndrio direito, Murphy positivo e alterações da vesícula, não peritonite difusa com pneumoperitônio.
D — Incorreta. Diverticulite geralmente causa dor em fossa ilíaca esquerda; embora possa perfurar, o contexto de AINE e dor epigástrica favorece úlcera péptica.

Validação documental pendente — o enunciado anuncia sinais vitais, mas seus valores não foram preservados. Isso não impede a identificação da perfuração, porém deve ser corrigido no PDF/importação.`,

        'cg-inep-028': `Resposta correta — B. Descompressão brusca dolorosa é sinal de irritação peritoneal e possível abdome cirúrgico, exigindo avaliação imediata por equipe de cirurgia. No contexto de dor migratória para fossa ilíaca direita, sugere apendicite complicada ou em progressão.

Distratores:
A — Incorreta. Dor difusa isolada é inespecífica e não constitui, por si só, sinal peritoneal.
C — Incorreta. Vômitos associados à dor aparecem em várias condições clínicas e precisam ser interpretados com o exame físico.
D — Incorreta. Massa em fossa ilíaca direita pode representar plastrão e requer avaliação, mas não está presente no caso; o sinal efetivamente descrito e decisivo é a descompressão dolorosa.`,

        'cg-inep-029': `Resposta correta — A. Polidrâmnio pré-natal, salivação excessiva, regurgitação, tosse, cianose e desconforto ao alimentar são típicos de atresia esofágica, frequentemente associada a fístula traqueoesofágica distal. A impossibilidade de avançar sonda orogástrica e radiografia confirmam a suspeita.

Distratores:
B — Incorreta. Atresia gástrica causa obstrução alta com vômitos e distensão, mas não salivação e tosse imediata por comunicação respiratória.
C — Incorreta. Atresia intestinal costuma manifestar-se com vômito bilioso e distensão após o nascimento, sem engasgo e cianose durante mamada.
D — Incorreta. “Atresia pancreática” não é diagnóstico que explique esse conjunto clínico.`,

        'cg-inep-030': `Resposta correta — B. Para cirurgia eletiva em adulto saudável, recomenda-se jejum de refeição leve/alimentos sólidos por cerca de seis horas — podendo chegar a oito horas para refeições mais pesadas — e ingestão de líquidos claros até duas horas antes da anestesia.

Distratores:
A — Incorreta. Doze horas para sólidos e oito para líquidos prolongam o jejum sem benefício e aumentam sede, desconforto e resistência metabólica.
C — Incorreta. Bebida proteica não é necessariamente líquido claro e uma hora é intervalo insuficiente.
D — Incorreta. Dez horas para sólidos e quatro horas até para água são mais restritivos que as recomendações atuais.`,

        'cg-inep-031': `Resposta correta — D. Dor que migra para o quadrante inferior direito, leucocitose neutrofílica e irritação peritoneal sugerem apendicite. Dor à descompressão no ponto entre a espinha ilíaca anterossuperior direita e o umbigo corresponde ao sinal de Blumberg no ponto de McBurney e reforça o diagnóstico.

Distratores:
A — Incorreta. Punho-percussão lombar dolorosa sugere pielonefrite ou cálculo urinário, diagnósticos menos compatíveis com a migração da dor e a defesa localizada.
B — Incorreta. Crepitação com gás na parede sugere infecção necrosante, achado ausente e não típico de apendicite não complicada.
C — Incorreta. Dor inspiratória no hipocôndrio direito é sinal de Murphy, associado a colecistite.`,

        'cg-inep-032': `Resposta correta — B. Após colecistectomia laparoscópica sem complicações, paciente estável, desperta, sem náusea e com dor controlada pode iniciar alimentação oral precocemente conforme tolerância e vontade, sem esperar retorno de ruídos ou horário fixo.

Distratores:
A — Incorreta. Esperar seis horas prolonga jejum sem benefício em paciente apta à ingestão.
C — Incorreta. Jejum de 24 horas contraria recuperação acelerada e favorece catabolismo e desconforto.
D — Incorreta. Não é obrigatório avançar por etapas rígidas de líquidos para sólidos; a dieta pode ser retomada de acordo com tolerância.`,

        'cg-inep-033': `Resposta correta — D. O “X” do XABCDE prioriza controle imediato de hemorragia externa exsanguinante antes da via aérea. Em amputação traumática com sangramento abundante, deve-se aplicar torniquete proximal à lesão, registrar o horário e prosseguir rapidamente com a avaliação e ressuscitação.

Distratores:
A — Incorreta. Cânula orofaríngea pode integrar manejo de via aérea se indicada, mas o paciente tem hemorragia maciça que deve ser controlada primeiro.
B — Incorreta. Fluido não substitui hemostasia; repor volume sem conter a fonte perpetua a perda e agrava coagulopatia.
C — Incorreta. Proteção cervical continua importante, porém vem após o controle da hemorragia externa catastrófica na sequência XABCDE.`,

        'cg-inep-034': `Resposta correta — D. A colangiorressonância já demonstrou coledocolitíase obstrutiva, com padrão laboratorial colestático e dilatação das vias biliares. A CPRE terapêutica permite esfinterotomia e retirada do cálculo; depois, deve-se programar colecistectomia para prevenir recorrência.

Distratores:
A — Incorreta. Antibiótico isolado não remove a obstrução e nem é necessário sem sinais de colangite; a causa mecânica precisa ser tratada.
B — Incorreta. Tomografia acrescenta pouco porque a colangiorressonância já confirmou cálculo no colédoco.
C — Incorreta. Colecistectomia isolada não trata adequadamente o cálculo já presente na via biliar principal, salvo estratégia intraoperatória específica não mencionada.`,

        'cg-inep-035': `Resposta correta — C. Trauma penetrante com murmúrio reduzido, macicez e frêmito ausente no hemitórax indica hemotórax. O tratamento inicial é drenagem torácica no quinto espaço intercostal, entre as linhas axilares anterior e média, permitindo evacuação e quantificação do sangue.

Distratores:
A — Incorreta. Toracotomia depende de critérios como débito inicial maciço ou sangramento persistente, não simplesmente da presença de projétil.
B — Incorreta. Toracocentese no segundo espaço é manobra para pneumotórax hipertensivo; aqui há macicez, não hipertimpanismo.
D — Incorreta. O dreno não deve ser inserido pelo ferimento, que pode estar contaminado e fora do triângulo de segurança.`,

        'cg-inep-036': `Resposta correta — D. Massa congênita na linha média cervical que se move com a protrusão da língua é característica de cisto do ducto tireoglosso, devido à ligação embrionária com o forame cego. O tratamento definitivo é o procedimento de Sistrunk após confirmar tireoide tópica.

Distratores:
A — Incorreta. Cisto dermoide pode ser mediano, mas geralmente não se move com a língua.
B — Incorreta. Tireoide ectópica lingual costuma localizar-se na base da língua; é essencial excluí-la antes da cirurgia, mas o quadro cervical cístico favorece ducto tireoglosso.
C — Incorreta. Higroma cístico é geralmente lateral, multiloculado, macio e transiluminável, sem mobilidade com protrusão lingual.`,

        'cg-inep-037': `Resposta correta — C. Ao chegar à sala de trauma, mesmo já intubado, o primeiro passo do ABCDE é reavaliar a via aérea: confirmar posição e permeabilidade do tubo, capnografia, oxigenação e proteção contra deslocamento. Intervenções pré-hospitalares nunca dispensam nova avaliação primária.

Distratores:
A — Incorreta. Tomografia só ocorre após avaliação primária, ressuscitação e estabilidade suficiente.
B — Incorreta. Ácido tranexâmico é indicado quando há hemorragia significativa; não há sangramento identificado e ele não precede o ABC.
D — Incorreta. Proteção cervical deve ser mantida simultaneamente ao manejo da via aérea, mas a alternativa não substitui a verificação imediata do tubo e da ventilação.`,

        'cg-inep-038': `Resposta correta — B. Equimose perineal em asa de borboleta, uretrorragia, retenção e globo vesical após trauma são sinais de lesão uretral. Deve-se evitar sonda transuretral e aliviar a bexiga por cistostomia suprapúbica, com investigação uretral subsequente.

Distratores:
A — Incorreta. Sondagem às cegas pode agravar a ruptura e criar falsa via.
C — Incorreta. Diurético aumenta produção urinária sem resolver a obstrução e piora a distensão.
D — Incorreta. Hidratação não restaura a continuidade uretral nem drena a bexiga.

Ressalva técnica — se houver disponibilidade e o paciente estiver estável, uretrografia retrógrada define a lesão antes de qualquer tentativa uretral; a retenção importante justifica drenagem suprapúbica.`,

        'cg-inep-039': `Resposta correta — A. Aspiração nasogástrica de dois litros provoca perda gastrointestinal de potássio e cloro. A hipocalemia reduz excitabilidade e motilidade da musculatura lisa intestinal, contribuindo para distensão, ruídos hipoativos e íleo no pós-operatório.

Distratores:
B — Incorreta. Hipercalemia causa principalmente alterações cardíacas e neuromusculares; não é a consequência típica de grande perda gástrica.
C — Incorreta. Hipermagnesemia pode reduzir reflexos e motilidade, mas não decorre habitualmente da drenagem nasogástrica.
D — Incorreta. Hipomagnesemia pode acompanhar perdas, porém a relação clássica e direta com íleo após aspiração volumosa é a hipocalemia.`,

        'cg-inep-040': `Resposta correta — D. O paciente tem sintomas obstrutivos persistentes por hiperplasia prostática apesar de terapia combinada com bloqueador alfa e inibidor da 5-alfa-redutase. Diante de falha do tratamento clínico e próstata de 40 g, deve ser encaminhado para tratamento cirúrgico, como ressecção transuretral.

Distratores:
A — Incorreta. Não há nódulo suspeito, e o PSA deve ser interpretado considerando idade e uso de finasterida; biópsia não é indicada apenas pela obstrução refratária.
B — Incorreta. Ausência de disúria, febre ou sinais infecciosos não sustenta antibioticoterapia empírica.
C — Incorreta. Repetir ultrassonografia não resolveria os sintomas nem acrescentaria informação diante da falha terapêutica já demonstrada.`,

        'cg-inep-041': `Resposta correta — B. Edema vespertino crônico, dermatite ocre e úlcera superficial na região maleolar medial caracterizam insuficiência venosa crônica com úlcera venosa. Na ausência de doença arterial significativa, compressão de intensidade adequada e elevação dos membros reduzem hipertensão venosa e favorecem cicatrização.

Distratores:
A — Incorreta. Deambulação ajuda a bomba da panturrilha, mas meia de baixa compressão costuma ser insuficiente para úlcera venosa ativa.
C — Incorreta. Bota de Unna pode ser opção compressiva, porém atividade física intensa não é recomendação imediata e pode traumatizar a lesão; o exercício deve ser orientado.
D — Incorreta. Desbridamento depende do leito e não é indicado sobre tecido de granulação saudável; Trendelenburg prolongado não substitui elevação simples e compressão.`,

        'cg-inep-042': `Resposta correta — D. Massa renal sólida, hipervascular, parcialmente exofítica e sem metástases é apresentação típica de carcinoma de células renais, especialmente subtipo de células claras. Pelo tamanho de 3,8 cm, trata-se de tumor clínico T1a e pode ser candidato a nefrectomia parcial conforme anatomia e condições clínicas.

Distratores:
A — Incorreta. Sarcomas renais são raros e em geral formam massas maiores, heterogêneas e menos típicas.
B — Incorreta. Linfoma renal costuma ser múltiplo, bilateral ou infiltrativo e associado a linfonodomegalias.
C — Incorreta. Metástases renais frequentemente são múltiplas e ocorrem em paciente com neoplasia primária conhecida, ausente no caso.`,

        'cg-inep-043': `Resposta correta — B. Herniorrafia umbilical aberta sem tela, sem entrada em víscera e sem infecção é cirurgia limpa. Em paciente de baixo risco e procedimento curto, não há indicação rotineira de antibioticoprofilaxia.

Distratores:
A — Incorreta. Hipertensão controlada não é fator que, isoladamente, indique antibiótico profilático.
C — Incorreta. O tipo de anestesia não define a necessidade de profilaxia; o que importa é classificação da ferida, uso de prótese e risco do paciente/procedimento.
D — Incorreta. Regime ambulatorial também não é indicação de antibiótico.`,

        'cg-inep-044': `Resposta correta — B. No primeiro dia após cirurgia abdominal longa, especialmente em paciente ventilado, a investigação inicial deve priorizar causas pulmonares, como hipoventilação, secreção retida, aspiração ou pneumonia. Entre as alternativas, radiografia de tórax é o exame mais útil para avaliar essas complicações.

Distratores:
A — Incorreta. Coleções ou complicações abdominais infecciosas são menos prováveis tão precocemente sem sinais focais.
C — Incorreta. Hemoculturas são indicadas quando há suspeita de bacteremia ou sepse, não automaticamente por pico isolado de 38 °C no primeiro pós-operatório.
D — Incorreta. Urocultura deve ser guiada por sintomas, alterações urinárias ou suspeita relacionada a cateter, e não é a causa mais provável neste contexto.

Ressalva técnica — febre nas primeiras 48 horas frequentemente decorre da resposta inflamatória ao trauma cirúrgico; atelectasia isolada não deve ser presumida como causa. A investigação deve ser orientada por exame clínico, e a radiografia se justifica aqui pelo procedimento prolongado e ventilação mecânica.`,

        'cg-inep-045': `Resposta correta — A. Dor escrotal aguda, testículo elevado, reflexo cremastérico abolido e piora à elevação são altamente sugestivos de torção testicular. A janela de salvamento é curta, portanto a criança deve ser encaminhada imediatamente para exploração cirúrgica, sem atrasar por exames quando a suspeita clínica é alta.

Distratores:
B — Incorreta. Antibiótico seria apropriado para epididimite bacteriana, que costuma manter reflexo cremastérico e pode aliviar com elevação.
C — Incorreta. Analgesia e repouso não destorcem o cordão nem evitam isquemia e perda testicular.
D — Incorreta. Ultrassonografia Doppler pode ser usada em dúvida diagnóstica sem retardar o tratamento, mas retorno ambulatorial é absolutamente inadequado.`,

        'cg-inep-046': `Resposta correta — C. Após gastroduodenopancreatectomia, débito elevado de líquido claro pelo dreno levanta suspeita de fístula pancreática. A dosagem de amilase no líquido, comparada à sérica e avaliada a partir do terceiro pós-operatório, é central para o diagnóstico; lipase pode complementar a análise.

Distratores:
A — Incorreta. Ultrassonografia endoscópica não caracteriza inicialmente o conteúdo do dreno e é desnecessariamente invasiva.
B — Incorreta. Cultura é indicada se houver suspeita de infecção, mas paciente está afebril e a secreção é límpida; ela não diagnostica fístula pancreática.
D — Incorreta. CPRE não é o primeiro exame após ressecção pancreatoduodenal e pode nem acessar adequadamente a anatomia reconstruída.`,

        'cg-inep-047': `Resposta correta — A. Perda urinária vaginal após vesicorrafia sugere fístula vesicovaginal, enquanto hidronefrose unilateral indica lesão ou obstrução ureteral associada. A reabordagem deve corrigir a bexiga/fístula e restaurar a continuidade ureteral por reimplante, conforme extensão e momento da lesão.

Distratores:
B — Incorreta. Reimplantar apenas o ureter não corrige a comunicação vesicovaginal responsável pela perda urinária.
C — Incorreta. Nefrostomia pode descomprimir temporariamente o rim, mas não é tratamento definitivo das duas lesões em paciente que necessita reparo.
D — Incorreta. Correção vaginal isolada não resolve a hidronefrose por lesão ureteral e pode ser inadequada no período agudo pós-trauma.`,

        'cg-inep-048': `Resposta correta — C. Ausência unilateral de murmúrio, hipertimpanismo, desvio traqueal e hipoxemia grave caracterizam pneumotórax hipertensivo. Deve-se descomprimir imediatamente no quinto espaço intercostal na linha axilar anterior/média, sem aguardar exames, e depois instalar dreno torácico.

Distratores:
A — Incorreta. Tomografia atrasaria uma intervenção salvadora em diagnóstico clínico evidente.
B — Incorreta. Glasgow 13 não indica por si só cânula e intubação; mesmo que suporte de via aérea fosse necessário, o pneumotórax deve ser descomprimido antes ou simultaneamente à ventilação positiva.
D — Incorreta. Radiografia não é necessária para confirmar pneumotórax hipertensivo e atrasaria o tratamento.`,

        'cg-inep-049': `Resposta correta — C. Dor intensa súbita em paciente com doença cardiovascular, relativamente desproporcional aos achados iniciais, associada a pneumatose intestinal e gás portal, indica isquemia mesentérica aguda com necrose provável. Deve-se realizar angiotomografia com urgência se não atrasar o tratamento e encaminhar para laparotomia/revascularização e avaliação da viabilidade intestinal.

Distratores:
A — Incorreta. Obstrução pode dilatar alças, mas gás portal e pneumatose no contexto vascular sugerem isquemia avançada.
B — Incorreta. Abdome inflamatório não explica a associação com insuficiência coronariana e sinais radiológicos de comprometimento vascular intestinal.
D — Incorreta. Não há quadro hemorrágico, e cirurgia eletiva é incompatível com risco iminente de necrose e sepse.

Revisão do sinalizador — embora marcada para revisão visual, a descrição textual reproduz os achados de radiografia e ultrassonografia necessários para justificar o gabarito. As imagens podem ser conferidas, mas não são indispensáveis à interpretação.`,

        'cg-inep-050': `Resposta correta — A. Perda ponderal rápida após cirurgia bariátrica aumenta supersaturação da bile e favorece formação de cálculos. Dor epigástrica, náuseas e vômitos dois meses após o procedimento justificam investigar colelitíase inicialmente com ultrassonografia abdominal.

Distratores:
B — Incorreta. Hérnia incisional é improvável tão cedo após abordagem laparoscópica e costuma produzir abaulamento; radiografia tem baixa utilidade para esse diagnóstico.
C — Incorreta. Dumping ocorre após refeições, com sintomas vasomotores e gastrointestinais, e não é diagnosticado por gordura e pH fecal.
D — Incorreta. Esofagite pode causar pirose/disfagia, mas rápida perda de peso e risco litogênico tornam doença biliar mais provável; dilatação esofágica não é complicação típica da gastrectomia vertical nesse quadro.`,

        'cg-inep-051': `Resposta correta — A. Instabilidade pélvica e hematoma perineal levantam forte suspeita de lesão uretral e/ou vesical. A uretrografia retrógrada avalia a uretra antes de qualquer sondagem; a fase cistográfica, quando necessária, pesquisa ruptura da bexiga.

Distratores:
B — Incorreta. Cistostomia é forma de drenagem e pode ser necessária na retenção, mas não é método diagnóstico.
C — Incorreta. Tomografia sem contraste não delineia extravasamento urinário e é inadequada para avaliar uretra e bexiga.
D — Incorreta. Ultrassonografia pode detectar líquido e distensão, mas não define adequadamente a localização e extensão da lesão do trato urinário inferior.`,

        'cg-inep-052': `Resposta correta — A. Massa intratesticular endurecida, não redutível, sem transiluminação e sem sinais infecciosos deve ser considerada tumor testicular até prova em contrário. Após ultrassonografia e marcadores séricos, a abordagem diagnóstica-terapêutica é orquiectomia radical por via inguinal, evitando biópsia transescrotal.

Distratores:
B — Incorreta. Hidrocele é coleção líquida, geralmente flutuante e transiluminável.
C — Incorreta. Hérnia inguinoescrotal tende a variar com Valsalva, pode ser redutível e não é massa intratesticular sólida.
D — Incorreta. Orquiepididimite costuma causar dor, febre e sinais inflamatórios; exploração escrotal não é o tratamento habitual.`,

        'cg-inep-053': `Resposta correta — A. O quadro é enterocolite associada à doença de Hirschsprung. Após ressuscitação, antibióticos e irrigações/descompressão retal até resolução clínica, pacientes adequadamente estabilizados podem receber procedimento definitivo de abaixamento endoanal em um tempo, removendo o segmento agangliônico sem colostomia.

Distratores:
B — Incorreta. A abordagem abdominoperineal com colostomia não é obrigatória após boa resposta à estabilização e aumenta morbidade.
C — Incorreta. Se derivação for necessária em doença grave refratária, deve ser confeccionada em intestino ganglionado, não simplesmente na zona dilatada; além disso, não é o tratamento definitivo.
D — Incorreta. Colostomia definitiva não é indicada para aganglionose de sigmoide tratável por pull-through.

Validação visual pendente — a radiografia mencionada não foi preservada. Deve-se conferir dilatação colônica, ausência de pneumoperitônio e eventuais sinais de gravidade no PDF-fonte; a indicação de abordagem em um tempo depende também da resposta clínica completa à descompressão.`,

        'cg-inep-054': `Resposta correta — A. Vômitos não biliosos em jato entre três e seis semanas, perda ponderal, desidratação, “oliva” epigástrica e alcalose metabólica hipoclorêmica e hipocalêmica caracterizam estenose hipertrófica do piloro. Primeiro corrigem-se volume e eletrólitos; depois realiza-se piloromiotomia.

Distratores:
B — Incorreta. Fundoplicatura trata refluxo gastroesofágico grave selecionado, que não produz oliva pilórica nem esse distúrbio metabólico típico.
C — Incorreta. Erro inato não é a principal hipótese diante do padrão anatômico e clínico clássico.
D — Incorreta. Alergia à proteína do leite pode causar sintomas digestivos e sangue nas fezes, mas não explica vômito em jato, massa epigástrica e alcalose hipoclorêmica.`,

        'cg-inep-055': `Resposta correta — A. Ferimento penetrante torácico com choque profundo, macicez e ausência de murmúrio indica hemotórax maciço e provável lesão vascular. Diante da instabilidade extrema refratária e contexto de hemorragia intratorácica, é necessária intervenção cirúrgica de emergência para controle da fonte, associada a protocolo transfusional.

Distratores:
B — Incorreta. Drenagem torácica é parte imediata do manejo do hemotórax, mas não se deve aguardar “estabilização” prévia em choque exsanguinante; o paciente necessita controle definitivo urgente.
C — Incorreta. Punção diagnóstica é desnecessária diante de sinais clínicos inequívocos e atrasaria drenagem/cirurgia.
D — Incorreta. Radiografia não deve retardar tratamento em paciente moribundo com diagnóstico clínico de hemotórax maciço.

Ressalva técnica — habitualmente instala-se imediatamente dreno torácico calibroso e indica-se toracotomia se houver cerca de 1.500 mL de débito inicial, sangramento persistente ou choque contínuo. Como nenhuma alternativa oferece drenagem imediata seguida de critérios objetivos, o gabarito A privilegia o controle operatório diante da instabilidade extrema.`,

        'cg-inep-056': `Resposta correta — D. O paciente completou esquema primário de três doses e a última foi há apenas três anos. Mesmo considerando queimadura como ferida de maior risco, reforço só é indicado quando a última dose ocorreu há cinco anos ou mais; imunoglobulina/soro não é indicada em pessoa adequadamente vacinada.

Distratores:
A — Incorreta. Não há necessidade de reforço antes de cinco anos nesse tipo de ferida quando o esquema está completo.
B — Incorreta. Nem reforço nem imunização passiva são necessários com três doses documentadas e dose recente.
C — Incorreta. Soro/imunoglobulina é reservado principalmente a esquema desconhecido ou incompleto e situações especiais de imunodeficiência, não ao caso descrito.`,

        'cg-inep-057': `Resposta correta — C. No choque pediátrico, devem-se obter rapidamente dois acessos venosos periféricos calibrosos; se não forem obtidos, utiliza-se acesso intraósseo. A reposição inicial emprega solução isotônica aquecida em bolus menores e reavaliados, com hemoderivados precoces se houver hemorragia.

Distratores:
A — Incorreta. Dissecção venosa é mais lenta e invasiva que punção periférica ou intraóssea, e solução glicofisiológica não é fluido inicial de ressuscitação.
B — Incorreta. Acesso subclávio pode atrasar o atendimento e causar pneumotórax, além de usar fluido inadequado.
D — Incorreta. Punção jugular central é mais demorada e arriscada no choque; acesso periférico/intraósseo é prioritário.`,

        'cg-inep-058': `Resposta correta — A. Homem idoso, tabagista, com higiene prepucial prejudicada e úlcera persistente na glande deve ser investigado para carcinoma espinocelular de pênis. A confirmação histológica exige biópsia incisional representativa antes do estadiamento e planejamento terapêutico.

Distratores:
B — Incorreta. Ciprofloxacino empírico não trata neoplasia e o quadro não é de infecção urinária.
C — Incorreta. Higiene pode melhorar balanopostite associada, mas não deve atrasar biópsia de lesão ulcerada crônica suspeita.
D — Incorreta. Cancro sifilítico é tipicamente indolor e requer confirmação clínica/laboratorial; penicilina empírica não substitui avaliação histológica desta lesão suspeita.`,

        'cg-inep-059': `Resposta correta — D. O quadro e a tomografia confirmam apendicite aguda sem descrição de abscesso ou perfuração. Apendicectomia laparoscópica é apropriada, com antibiótico pré-operatório cobrindo gram-negativos e anaeróbios; cefazolina associada a metronidazol atende a esse objetivo.

Distratores:
A — Incorreta. Metronidazol isolado não oferece cobertura adequada para bacilos gram-negativos entéricos.
B — Incorreta. Cefazolina e gentamicina deixam cobertura anaeróbia inadequada e a via aberta não traz vantagem no caso não complicado.
C — Incorreta. Laparotomia ampla e sete dias de antibiótico são excessivos sem perfuração, peritonite difusa ou abscesso.

Ressalva técnica — em apendicite não complicada, a dose perioperatória é profilática e antibióticos pós-operatórios prolongados geralmente não são necessários.`,

        'cg-inep-060': `Resposta correta — B. Hematúria persistente em idoso tabagista e com exposição ocupacional a produtos químicos/tintas sugere carcinoma urotelial de bexiga. A cistoscopia permite visualizar a lesão e obter tecido por biópsia ou ressecção transuretral, etapa essencial ao diagnóstico.

Distratores:
A — Incorreta. Nefrolitíase costuma causar cólica renal e pode ser avaliada por tomografia sem contraste; ressonância com contraste não é o exame inicial típico.
C — Incorreta. Próstata sem nódulos e hematúria predominante não apontam para adenocarcinoma prostático; ultrassom transretal isolado não confirma câncer.
D — Incorreta. Cistite pode causar disúria e hematúria, mas recorrência em paciente de alto risco exige excluir neoplasia; ultrassom e urografia não substituem cistoscopia com histologia.`,

        'cg-inep-061': `Resposta correta — C. Icterícia colestática, dor no quadrante superior direito e Murphy negativo sugerem coledocolitíase. A colangiorressonância tem alta sensibilidade e especificidade para cálculos da via biliar, inclusive pequenos, e mapeia a árvore biliar sem invasão.

Distratores:
A — Incorreta. Ultrassonografia é o exame inicial e detecta dilatação e cálculos vesiculares, mas tem menor sensibilidade para cálculo no colédoco distal.
B — Incorreta. Radiografia simples identifica apenas minoria dos cálculos e não avalia adequadamente a via biliar.
D — Incorreta. Tomografia pode mostrar dilatação e complicações, mas é menos acurada que colangiorressonância para coledocolitíase.`,

        'cg-inep-062': `Resposta correta — A. Correção de hérnia incisional com provável uso de tela requer profilaxia contra flora cutânea com cefazolina 2 g intravenosa até 60 minutos antes da incisão. Em cirurgia prolongada, repete-se conforme a meia-vida — aproximadamente a cada quatro horas — e interrompe-se ao fechamento, sem benefício em manter no pós-operatório.

Distratores:
B — Incorreta. Metronidazol é desnecessário em cirurgia limpa sem abertura intestinal, e 1 g de cefazolina é dose insuficiente para adulto de 72 kg segundo protocolos usuais.
C — Incorreta. Além da dose inicial insuficiente, prolongar por 72 horas não reduz infecção e aumenta resistência e eventos adversos.
D — Incorreta. Metronidazol não é indicado e “imediatamente antes” pode comprometer a janela de infusão; redose deve respeitar intervalo e perda sanguínea, não ser automaticamente combinada.`,

        'cg-inep-063': `Resposta correta — D. Dor em fossa ilíaca esquerda, febre baixa e plastrão palpável sem peritonite difusa sugerem diverticulite complicada por abscesso pélvico. Tomografia de abdome e pelve com contraste confirma inflamação, tamanho e localização da coleção e orienta antibiótico, drenagem ou cirurgia.

Distratores:
A — Incorreta. Colonoscopia é evitada na fase aguda pelo risco de perfuração e deve ser programada após resolução quando indicada.
B — Incorreta. Peritonite fecal produziria toxicidade e sinais peritoneais difusos, ausentes; radiografia tem baixa capacidade de estadiar abscesso.
C — Incorreta. O exame está correto, mas o diagnóstico de peritonite fecal não combina com abdome flácido e ausência de descompressão dolorosa.`,

        'cg-inep-064': `Resposta correta — C. A cicatriz umbilical corresponde ao dermátomo T10. Perda sensitiva a partir desse nível, com paralisia dos membros inferiores e preservação dos superiores, localiza a lesão medular em T10.

Distratores:
A — Incorreta. L2 corresponde à região anterior da coxa e está muito abaixo do nível sensitivo descrito.
B — Incorreta. T4 está aproximadamente na linha mamilar e causaria déficit sensitivo torácico mais alto.
D — Incorreta. T12 se relaciona à região suprapúbica e não à cicatriz umbilical.`,

        'cg-inep-065': `Resposta correta — D. Na etapa de identificação (“Sign In”) antes da indução, confirma-se identidade, procedimento, sítio/lateralidade demarcado, consentimento, alergias, risco de via aérea e sangramento, além da segurança do equipamento anestésico.

Distratores:
A — Incorreta. Apresentação da equipe ocorre na pausa antes da incisão (“Time Out”); vaga de UTI não é item universal do Sign In.
B — Incorreta. O consentimento deve ser confirmado com o paciente e documentado; acolhimento hospitalar não integra a lista cirúrgica padronizada.
C — Incorreta. Contagem de instrumentos e compressas é verificada antes de o paciente sair da sala (“Sign Out”), não antes da indução.`,

        'cg-inep-066': `Resposta correta — A. Sangue no meato e hematoma perineal após fratura pélvica são sinais clássicos de lesão uretral. A uretrografia retrógrada delineia extravasamento e confirma se a ruptura é parcial ou completa antes de qualquer cateterização uretral.

Distratores:
B — Incorreta. Cateter suprapúbico drena a bexiga, mas não confirma nem classifica a lesão uretral.
C — Incorreta. Cateterização uretral às cegas pode ampliar a lesão e deve ser evitada antes da uretrografia.
D — Incorreta. Tomografia pélvica avalia fraturas e órgãos, mas não substitui estudo contrastado específico da uretra.`,

        'cg-inep-067': `Resposta correta — B. Sintomas vasomotores e gastrointestinais duas a três horas após carboidratos simples, com exames estruturais normais, caracterizam dumping tardio. A rápida chegada de glicose ao intestino causa hiperinsulinemia e hipoglicemia reativa.

Distratores:
A — Incorreta. Fístula gastrogástrica costuma causar reganho de peso, úlcera ou dor e pode ser vista em exame contrastado/endoscopia.
C — Incorreta. Peritonite causaria dor persistente, febre, irritação peritoneal e alterações sistêmicas, não episódios pós-prandiais autolimitados.
D — Incorreta. Deficiências de ferro e vitaminas produzem anemia e manifestações crônicas, não crises desencadeadas por açúcar.

Revisão do sinalizador — a questão está marcada para revisão visual, mas não menciona nem depende de imagem; o texto contém todos os elementos para o diagnóstico.`,

        'cg-inep-068': `Resposta correta — C. Idoso com fibrilação atrial sem anticoagulação e dor abdominal intensa desproporcional ao exame deve ser considerado portador de embolia mesentérica até prova em contrário. A angiotomografia abdominal com contraste é o exame mais sensível e específico disponível rapidamente para localizar oclusão e avaliar isquemia intestinal.

Distratores:
A — Incorreta. Radiografia pode ser normal no início e mostra apenas sinais tardios inespecíficos.
B — Incorreta. Lactato elevado sugere hipoperfusão avançada, mas pode estar normal precocemente e não localiza a oclusão.
D — Incorreta. Doppler é operador-dependente, limitado por gás e distensão e menos acurado para avaliação emergencial completa.`,

        'cg-inep-069': `Resposta correta — B. Em criança com quatro anos, Glasgow 15, exame neurológico normal, trauma de baixa energia, sem sinais de fratura e apenas um vômito, o risco de lesão intracraniana clinicamente importante é muito baixo. Não há indicação imediata de tomografia; orienta-se observação e sinais de alarme.

Distratores:
A — Incorreta. Vômito isolado único, sem outros fatores de risco, não obriga tomografia segundo regras pediátricas de decisão.
C — Incorreta. A idade não justifica imagem indiscriminada, que expõe a criança à radiação.
D — Incorreta. Radiografia de crânio não rastreia adequadamente lesão intracraniana e não substitui observação ou tomografia quando esta é realmente indicada.`,

        'cg-inep-070': `Resposta correta — B. Anel cicatricial aos sete anos, retração incompleta e episódios recorrentes de balanopostite caracterizam fimose patológica. Deve ser encaminhado à cirurgia pediátrica/urologia para postectomia eletiva, após tratar eventual inflamação ativa.

Distratores:
A — Incorreta. Fimose fisiológica não apresenta cicatriz e pode regredir espontaneamente; os achados mostram doença adquirida/persistente complicada.
C — Incorreta. Parafimose ocorre quando o prepúcio retraído fica preso atrás da glande, com edema e urgência, o que não foi descrito.
D — Incorreta. Manobras forçadas causam fissuras e mais fibrose; não são recomendadas, sobretudo diante de anel cicatricial.`,

        'cg-inep-071': `Resposta correta — A. Febre, dor em hipocôndrio direito e icterícia formam a tríade de Charcot, indicando colangite aguda por obstrução biliar provável. A conduta imediata inclui coleta de culturas, ressuscitação e antibioticoterapia intravenosa; a drenagem urgente da via biliar por CPRE deve ser organizada conforme gravidade e resposta.

Distratores:
B — Incorreta. Colecistite costuma apresentar Murphy positivo e espessamento da parede vesicular, enquanto icterícia e dilatação de vias apontam para obstrução do colédoco.
C — Incorreta. Colecistostomia drena a vesícula e é opção em colecistite de alto risco, mas não descomprime adequadamente a via biliar principal na colangite.
D — Incorreta. O diagnóstico está errado e colecistectomia com exploração não é a primeira medida imediata antes de estabilização e drenagem biliar apropriada.`,

        'cg-inep-072': `Resposta correta — C. Hérnia incisional volumosa em paciente com IMC 37 kg/m² apresenta maior risco de infecção, recorrência e complicações da parede após correção. Como está assintomática e sem urgência, deve realizar otimização multidisciplinar com perda ponderal antes do planejamento reconstrutivo.

Distratores:
A — Incorreta. Cinta pode aliviar sintomas temporariamente, mas não corrige o defeito e não substitui preparo para tratamento definitivo.
B — Incorreta. O grande colo herniário e ausência de sintomas não sugerem risco iminente que justifique operar sem otimizar obesidade.
D — Incorreta. O diagnóstico é clínico e, para defeito grande, tomografia é mais útil ao planejamento que ultrassonografia; o passo prioritário é redução de risco.`,

        'cg-inep-073': `Resposta correta — C. Glasgow 6 exige via aérea definitiva, mas o trauma maxilofacial destrutivo com instabilidade mandibular, sangramento profuso e perda de tecidos torna intubação orotraqueal difícil e perigosa. A cricotireoidostomia cirúrgica fornece acesso rápido abaixo da obstrução e protege contra aspiração.

Distratores:
A — Incorreta. Aspiração, cânula e oxigênio são temporários e não protegem a via aérea em paciente com Glasgow grave e hemorragia facial.
B — Incorreta. Intubação oral pode falhar pela anatomia distorcida e pelo sangue, além de agravar lesões; o caso demanda via cirúrgica imediata.
D — Incorreta. Traqueostomia é mais demorada e tecnicamente complexa no trauma agudo; cricotireoidostomia é o acesso cirúrgico emergencial preferido em adulto.`,

        'cg-inep-074': `Resposta correta — A. Dor cortante durante e após evacuação de fezes ressecadas, acompanhada de pequeno sangramento vivo, é típica de fissura anal aguda. A maioria ocorre na linha média posterior e aparece como laceração rasa do anodermo.

Distratores:
B — Incorreta. Hemorroidas internas geralmente sangram sem dor intensa; trombose externa produz nódulo doloroso.
C — Incorreta. Fístula apresenta orifício cutâneo com drenagem crônica, frequentemente após abscesso, não dor ligada à passagem das fezes.
D — Incorreta. Abscesso causa dor contínua, tumoração, calor e possível febre ou secreção purulenta.`,

        'cg-inep-075': `Resposta correta — C. Claudicação, piora da dor com elevação, tabagismo e úlcera profunda, pálida, necrótica e bem delimitada indicam insuficiência arterial crônica. A localização pode variar; o conjunto de isquemia e ausência de granulação prevalece sobre o maléolo medial.

Distratores:
A — Incorreta. Linfedema provoca edema crônico e espessamento cutâneo, mas não claudicação e úlcera isquêmica dolorosa típica.
B — Incorreta. Úlcera neuropática costuma ser indolor, em pontos de pressão plantar, com calosidade e perda sensitiva.
D — Incorreta. Úlcera venosa é geralmente superficial, exsudativa, de bordas irregulares, com granulação e melhora com elevação, o oposto do caso.`,

        'cg-inep-076': `Resposta correta — D. Atraso na eliminação do mecônio, distensão, vômitos e descarga explosiva ao toque sugerem doença de Hirschsprung. Enema contrastado pode mostrar zona de transição e retenção do contraste após 24–36 horas; a confirmação definitiva é por biópsia retal demonstrando ausência de células ganglionares.

Distratores:
A — Incorreta. Colonoscopia não é exame confirmatório de urgência e, sem biópsia, não demonstra aganglionose.
B — Incorreta. Sinal da dupla bolha sugere obstrução duodenal, não doença de Hirschsprung.
C — Incorreta. Ultrassonografia não confirma aganglionose; o diagnóstico requer estudo contrastado/manometria conforme idade e biópsia.

Validação visual pendente — a radiografia abdominal foi omitida. É necessário conferir o padrão de distensão, níveis e ausência de perfuração no PDF-fonte, embora a propedêutica correta decorra do quadro clínico.`,

        'cg-inep-077': `Resposta correta — B. Hidrocele de aparecimento recente e progressivo em adulto jovem pode ser secundária a tumor testicular e dificultar a palpação. Ultrassonografia escrotal é o exame apropriado para avaliar o parênquima, distinguir líquido de massa sólida e detectar neoplasia subjacente.

Distratores:
A — Incorreta. Orquiepididimite costuma causar dor, febre e sinais inflamatórios; urina/cultura não avaliam a causa estrutural desta hidrocele indolor.
C — Incorreta. Torção apresenta dor súbita intensa e é emergência, incompatível com dois meses de evolução indolor.
D — Incorreta. Ciclismo não comprova trauma, e tomografia não é o exame de escolha para conteúdo escrotal.`,

        'cg-inep-078': `Resposta correta — D. Para homem assintomático, o Ministério da Saúde não recomenda rastreamento populacional sistemático do câncer de próstata. Deve-se discutir individualmente benefícios incertos e danos possíveis — falsos positivos, biópsias, sobrediagnóstico e sequelas do tratamento — respeitando valores e decisão informada do paciente.

Distratores:
A — Incorreta. PSA não tem grande especificidade para câncer e não confirma doença precoce isoladamente.
B — Incorreta. Não há recomendação ministerial de rastreio universal por toque e ultrassom; ultrassonografia não é teste de rastreamento padrão.
C — Incorreta. Repete a ideia de rastreio etário rotineiro e inclui ultrassonografia sem indicação; a decisão deve ser compartilhada, não protocolar.

Ressalva técnica — entidades profissionais diferem quanto à faixa etária e ao rastreamento oportunístico. A resposta reflete a política pública brasileira citada no contexto da questão.`,

        'cg-inep-079': `Resposta correta — D. Aumento testicular pétreo, unilateral e indolor em adulto jovem deve ser considerado neoplasia até prova em contrário. Ultrassonografia de bolsa escrotal confirma se a lesão é intratesticular e sólida; depois, solicitam-se marcadores e encaminhamento urológico urgente.

Distratores:
A — Incorreta. Não há dor, febre, disúria ou inflamação que justifique antibiótico.
B — Incorreta. Compressas mornas não investigam nem tratam massa suspeita.
C — Incorreta. Anti-inflamatório pode mascarar sintomas e atrasar diagnóstico oncológico.`,

        'cg-inep-080': `Resposta correta — D. Paciente alerta, sóbrio, sem dor, déficit neurológico, lesão externa ou distração pode ter a coluna clinicamente liberada. Realiza-se rolamento em bloco mantendo alinhamento, palpa-se toda a coluna e repete-se exame neurológico; se normais, removem-se prancha e colar para evitar complicações da imobilização.

Distratores:
A — Incorreta. Radiografias simples têm sensibilidade limitada e não são necessárias quando critérios clínicos de baixo risco permitem liberação; se imagem fosse indicada, tomografia seria preferível.
B — Incorreta. Não se deve manter paciente horas na prancha rígida, que aumenta dor e lesão por pressão, enquanto se retira o colar sem exame completo.
C — Incorreta. Doze horas de imobilização sem indicação expõem a danos e não acrescentam segurança ao exame clínico normal.`,

        'cg-inep-081': `Resposta correta — B. Choque progressivo com turgência jugular e murmúrio vesicular bilateral preservado sugere tamponamento cardíaco, e não pneumotórax hipertensivo. Deve-se assegurar via aérea e oxigenação e realizar descompressão pericárdica emergencial como ponte para tratamento cirúrgico definitivo.

Distratores:
A — Incorreta. Toracocentese e dreno tratam pneumotórax/hemotórax, mas a ventilação bilateral preservada torna essas causas menos prováveis.
C — Incorreta. Ultrassom pode confirmar rapidamente tamponamento, porém não deve atrasar a intervenção em paciente em colapso com quadro clínico compatível.
D — Incorreta. Cricotireoidostomia não é necessária sem obstrução da via aérea; toracotomia de ressuscitação tem indicações mais restritas, sobretudo parada iminente após trauma penetrante.`,

        'cg-inep-082': `Resposta correta — D. Febre alta, icterícia, dor e choque logo após colecistectomia difícil levantam suspeita de lesão da via biliar com vazamento, obstrução e sepse. A paciente deve ser ressuscitada, receber antibiótico e ser transferida precocemente para centro com UTI, equipe hepatobiliopancreática e métodos como colangiorressonância para definir anatomia e tratamento.

Distratores:
A — Incorreta. A incidência de lesão biliar é maior na abordagem laparoscópica do que na aberta, e os sinais apontam para foco biliar, não pulmonar.
B — Incorreta. Obesidade não torna cirurgia aberta obrigatória, e drenagem isolada sem definir a anatomia pode ser insuficiente.
C — Incorreta. Transferência e suporte estão corretos, mas aguardar “esfriamento” sem diagnóstico e controle oportuno do foco pode piorar sepse e dificultar reparo; a referência especializada deve ser imediata.`,

        'cg-inep-083': `Resposta correta — C. Dor perianal profunda, febre e abaulamento palpável ao toque sem sinais cutâneos sugerem abscesso anorretal profundo. O tratamento é drenagem cirúrgica; em diabético com febre, antibiótico sistêmico deve ser associado, mas nunca substituir o controle do foco.

Distratores:
A — Incorreta. Anti-inflamatório e anuscopia não drenam coleção infecciosa e podem atrasar tratamento.
B — Incorreta. Antibiótico isolado tem baixa penetração no abscesso e retorno em sete dias é inseguro.
D — Incorreta. Banho de assento pode aliviar sintomas superficiais, mas não trata abscesso profundo febril.`,

        'cg-inep-084': `Resposta correta — A. Dor contínua no hipocôndrio direito por 24 horas, Murphy positivo, vômitos e calafrios sugerem colecistite aguda. Com obesidade, diabetes e sofrimento clínico, necessita avaliação urgente, exames, ultrassonografia, analgesia, hidratação, antibiótico quando indicado e planejamento de colecistectomia precoce.

Distratores:
B — Incorreta. Ultrassonografia eletiva e retorno em 48 horas atrasam o manejo de provável inflamação aguda.
C — Incorreta. Antiespasmódico domiciliar não trata colecistite nem monitora complicações.
D — Incorreta. Antibiótico oral sem avaliação hospitalar e controle da fonte é insuficiente, especialmente em diabética.`,

        'cg-inep-085': `Resposta correta — C. Na suspeita de embolia aérea venosa por cateter central, deve-se interromper a entrada de ar, oferecer oxigênio a 100%, posicionar em decúbito lateral esquerdo com Trendelenburg (posição de Durant) e tentar aspirar o ar pelo próprio cateter, cuja ponta está próxima ao átrio direito.

Distratores:
A — Incorreta. Procedimento endovascular sob radioscopia atrasaria medidas imediatas e raramente é necessário.
B — Incorreta. Toracotomia e punção cardíaca são extremamente invasivas e não constituem manejo inicial.
D — Incorreta. Inserir outro cateter contralateral adiciona risco e não é mais eficaz que aspirar pelo acesso já posicionado.`,

        'cg-inep-086': `Resposta correta — A. Dor abdominal em crises com intervalos de acalmia, fezes com sangue e muco (“geleia de groselha”) e faixa etária de nove meses são clássicos de invaginação intestinal. Frequentemente ocorre após infecção viral de vias aéreas, pela hiperplasia de placas de Peyer que atua como ponto de invaginação.

Distratores:
B — Incorreta. Volvo causa obstrução aguda e vômito bilioso; aganglionose manifesta-se desde o período neonatal, não com cólicas episódicas e fezes sanguinolentas típicas.
C — Incorreta. Estenose pilórica ocorre em lactentes menores, com vômitos não biliosos em jato, sem sangue nas fezes.
D — Incorreta. Apendicite é menos comum nessa idade e não tem associação típica com dieta pobre em resíduos/coprólitos no lactente.`,

        'cg-inep-087': `Resposta correta — A. Dispneia aguda após punção subclávia, associada a radiografia compatível segundo o gabarito, indica pneumotórax iatrogênico. Como há instabilidade e sintomas, deve-se descomprimir/drenar imediatamente o hemitórax afetado e reavaliar o acesso.

Distratores:
B — Incorreta. Hemotórax produziria opacidade pleural e macicez, não o padrão radiográfico atribuído ao gabarito.
C — Incorreta. Hidrotórax não é a complicação aguda mais frequente da punção e uma nova punção não trata comprometimento respiratório.
D — Incorreta. Lesão frênica pode elevar o diafragma, mas não é a complicação mais provável com dispneia súbita pós-subclávia.

Validação visual pendente — a radiografia não foi preservada na importação. É necessário confirmar linha pleural, ausência de trama periférica, lado e extensão do pneumotórax no PDF-fonte antes da publicação definitiva.`,

        'cg-inep-088': `Resposta correta — C. Toda queimadura elétrica significativa com trajeto de entrada e saída, especialmente envolvendo extremidade e lesão profunda, deve ser avaliada em centro especializado. O dano muscular e vascular pode ser muito maior que a aparência cutânea, com risco de arritmia, rabdomiólise e síndrome compartimental.

Distratores:
A — Incorreta. O critério de área corporal depende também da profundidade; queimadura superficial de primeiro grau não entra no cálculo da mesma forma.
B — Incorreta. Cinco por cento de segundo grau, isoladamente e fora de áreas especiais, não é critério universal de transferência.
D — Incorreta. Arco voltaico é mecanismo diferente de passagem de corrente pelo corpo; o caso descreve contato elétrico com possível trajeto.`,

        'cg-inep-089': `Resposta correta — B. Hipoxemia e murmúrio unilateralmente reduzido logo após intubação obrigam verificar primeiro a posição do tubo, que pode ter avançado para o brônquio principal direito e excluído o pulmão esquerdo. Deve-se checar profundidade, capnografia, expansão e ausculta e reposicionar se necessário.

Distratores:
A — Incorreta. Radiografia confirma posição e lesões, mas não deve preceder correção imediata de possível intubação seletiva em paciente hipóxica.
C — Incorreta. Não há desvio traqueal nem turgência jugular para pneumotórax hipertensivo; punção desnecessária pode causar dano.
D — Incorreta. Dreno torácico sem confirmar pneumotórax expõe a complicações e não corrige tubo seletivo.`,

        'cg-inep-090': `Resposta correta — B. Lesão neurológica grave com Glasgow abaixo de 8, hematoma subdural e ventilação já prolongada torna provável suporte ventilatório duradouro. Diretrizes citadas admitem traqueostomia precoce, até cerca de sete dias, para facilitar desmame, higiene brônquica, conforto e redução de sedação quando a necessidade prolongada é prevista.

Distratores:
A — Incorreta. Esperar obrigatoriamente 14 dias pode prolongar complicações do tubo orotraqueal em paciente com indicação previsível.
C — Incorreta. Cricotireoidostomia é acesso emergencial temporário, não via de demora.
D — Incorreta. Glasgow persistentemente baixo compromete proteção da via aérea, e SARA/contusão pulmonar não favorece extubação para ventilação não invasiva por prazo fixo.

Ressalva técnica — o momento ideal da traqueostomia deve ser individualizado; estudos não demonstram benefício uniforme de uma data rígida para todos, mas o cenário neurológico sustenta a estratégia precoce do gabarito.`,

        'cg-inep-091': `Resposta correta — B. Dor abdominal aguda com náuseas e vômitos, associada a elevação de amilase/lipase e resposta inflamatória, favorece pancreatite aguda, classificada como abdome agudo inflamatório. O diagnóstico requer dois de três critérios: dor típica, enzimas acima de três vezes o limite superior e imagem compatível.

Distratores:
A — Incorreta. Perfuração de úlcera costuma produzir dor súbita intensa, peritonite e pneumoperitônio, não descritos.
C — Incorreta. Obstrução cursa com distensão, cólicas, parada de flatos/fezes e níveis hidroaéreos, ausentes no relato.
D — Incorreta. Doença vascular e lactato elevado levantam isquemia mesentérica como diferencial importante, mas o gabarito valoriza o padrão inflamatório e as enzimas pancreáticas.

Ressalva técnica — os valores de referência da amilase e lipase não foram informados e a dor é descrita como difusa, não tipicamente epigástrica irradiada para o dorso. Como o lactato está elevado e há doença aterosclerótica, isquemia mesentérica deve ser ativamente excluída se a elevação enzimática não atingir três vezes o limite ou se a clínica for desproporcional.`,

        'cg-inep-092': `Resposta correta — A. Hematúria macroscópica com hemácias isomórficas aponta para origem não glomerular. Em idoso com tabagismo intenso, o principal diagnóstico é carcinoma urotelial de bexiga; a uretrocistoscopia permite inspeção direta e obtenção de tecido por ressecção/biópsia.

Distratores:
B — Incorreta. Carcinoma renal pode causar hematúria, mas urografia excretora não é o melhor exame atual e os fatores/sintomas favorecem bexiga.
C — Incorreta. Cálculo coraliforme associa-se a infecção e achado radiológico renal; ressonância não é exame inicial para litíase.
D — Incorreta. Próstata regular e melhora da obstrução após RTU não explicam hematúria maciça; ultrassom com biópsia não é indicado sem suspeita prostática específica.

Ressalva técnica — a cistoscopia confirma tumor de bexiga, mas invasão só pode ser determinada pelo exame histopatológico e estadiamento; o enunciado não permite afirmar previamente que seja invasor.`,

        'cg-inep-093': `Resposta correta — B. Abscesso pericolônico de 6 cm caracteriza diverticulite complicada. Coleções maiores que cerca de 3–4 cm geralmente exigem antibiótico intravenoso e drenagem percutânea guiada por imagem, quando tecnicamente acessível.

Distratores:
A — Incorreta. Antibiótico isolado tem maior risco de falha em abscesso de 6 cm.
C — Incorreta. Alta ambulatorial é inadequada diante de coleção volumosa que necessita controle de foco.
D — Incorreta. Procedimento de Hartmann é reservado a peritonite difusa, instabilidade ou falha/impossibilidade de tratamento menos invasivo; o paciente está estável e sem pneumoperitônio.`,

        'cg-inep-094': `Resposta correta — B. Abaulamento perianal doloroso, eritema, calor e sintomas sistêmicos indicam abscesso perianal. O tratamento é incisão e drenagem imediata; não se deve esperar flutuação, pois isso atrasa o controle do foco.

Distratores:
A — Incorreta. Antibiótico isolado não penetra adequadamente na coleção e não substitui drenagem.
C — Incorreta. Calor local e observação não tratam abscesso e permitem progressão.
D — Incorreta. Tomografia é reservada a abscesso profundo, recorrente, imunossupressão ou exame inconclusivo; a coleção superficial está clinicamente evidente.`,

        'cg-inep-095': `Resposta correta — C. Cirurgia abdominal prévia, vômitos biliosos, cólica e parada de flatos/fezes sugerem obstrução de delgado por aderências. Sem peritonite, instabilidade ou sinais de estrangulamento, inicia-se tratamento conservador com jejum, sonda nasogástrica, reposição hidroeletrolítica e observação clínica seriada.

Distratores:
A — Incorreta. Videolaparoscopia imediata não é necessária sem sinais de isquemia ou falha do manejo conservador.
B — Incorreta. Laparotomia de emergência é indicada em peritonite, alça fechada, isquemia, perfuração ou deterioração, ausentes no texto.
D — Incorreta. Descompressão endoscópica é utilizada principalmente em volvo de sigmoide, não em obstrução adesiva de delgado.

Validação visual pendente — a radiografia foi omitida. Devem ser conferidos níveis hidroaéreos, distribuição da distensão e ausência de sinais de volvo ou pneumoperitônio antes da publicação definitiva.`,

        'cg-inep-096': `Resposta correta — B. Massa abdominal que cruza a linha média, hipertensão, equimoses periorbitárias, proptose, síndrome cerebelar e ácido vanilmandélico muito elevado são clássicos de neuroblastoma, tumor da crista neural que frequentemente surge na adrenal e metastatiza para órbita e osso.

Distratores:
A — Incorreta. Linfoma pode gerar massa abdominal, mas não costuma produzir catecolaminas elevadas nem o padrão orbital e neurológico típico.
C — Incorreta. Tumor de Wilms geralmente é massa renal lisa que respeita a linha média e não eleva VMA; equimose periorbitária favorece neuroblastoma.
D — Incorreta. Feocromocitoma pode elevar metabólitos e pressão, mas é raro em lactente e não explica massa invasiva com metástases orbitárias.`,

        'cg-inep-097': `Resposta correta — A. Conteúdo escrotal redutível, piora com choro, espessamento do cordão e transiluminação negativa caracterizam hérnia inguinoescrotal. Em lactente prematuro, há risco relevante de encarceramento, portanto deve-se programar correção eletiva logo após o diagnóstico, sem necessidade de imagem quando o exame é típico.

Distratores:
B — Incorreta. Ultrassonografia é desnecessária em hérnia clinicamente evidente e pode atrasar encaminhamento.
C — Incorreta. Resolução espontânea é esperada em algumas hidroceles comunicantes, não em hérnia inguinal; aguardar um ano aumenta risco de encarceramento.
D — Incorreta. Esperar dois anos é ainda mais arriscado e não reduz de forma justificável o risco operatório.`,

        'cg-inep-098': `Resposta correta — C. Câncer ativo, edema unilateral, dor e sensibilidade de panturrilha sugerem trombose venosa profunda. Ultrassonografia venosa com compressão e Doppler é o exame inicial de escolha por ser não invasivo, disponível e altamente acurado para trombose proximal.

Distratores:
A — Incorreta. Flebografia é invasiva e hoje fica reservada a casos selecionados ou resultados discordantes.
B — Incorreta. Arteriografia avalia doença arterial, mas os pulsos estão presentes e o quadro é venoso.
D — Incorreta. Ultrassom genérico de partes moles não avalia adequadamente compressibilidade e fluxo venoso.`,

        'cg-inep-099': `Resposta correta — D. Em queimadura elétrica, pequenas lesões de entrada e saída podem ocultar necrose muscular profunda, lesão vascular, arritmia e rabdomiólise ao longo do trajeto. Portanto, a extensão cutânea inicial se correlaciona mal com a gravidade real.

Distratores:
A — Incorreta. Perda de consciência pode decorrer de arritmia, mas também de queda, trauma craniano ou hipóxia e não a comprova isoladamente.
B — Incorreta. As marcas de entrada e saída ajudam a inferir o trajeto da corrente, que atravessa os tecidos entre os pontos de contato.
C — Incorreta. A aparência imediata pode subestimar profundidade, pois a necrose elétrica evolui e predomina em planos profundos.`,

        'cg-inep-100': `Resposta correta — C. História de emagrecimento, constipação progressiva e massa hipogástrica sugere neoplasia colorretal causando obstrução intestinal baixa. Segundo o gabarito, a radiografia mostra distensão colônica com válvula ileocecal competente, impedindo descompressão retrógrada para o delgado e criando obstrução em alça fechada do cólon.

Distratores:
A — Incorreta. Distensão simultânea de delgado e cólon sugere válvula ileocecal incompetente ou obstrução distal diferente do padrão indicado.
B — Incorreta. Pneumoperitônio indicaria perfuração e não é achado esperado em obstrução não perfurada.
D — Incorreta. Parada completa de flatos/fezes, massa, emagrecimento e distensão importante ultrapassam constipação simples; ar retal também enfraqueceria obstrução completa.

Validação visual pendente — a radiografia não foi preservada. É necessário confirmar padrão de haustrações, distribuição gasosa, ausência de ar retal e se há ou não dilatação do delgado no PDF-fonte.`,

        'cg-inep-101': `Resposta correta — A. Vômitos não biliosos em jato, baixo ganho ponderal, peristalse visível e oliva epigástrica em lactente de 40 dias caracterizam estenose hipertrófica do piloro. A ultrassonografia é o exame de primeira escolha, medindo espessura e comprimento do canal pilórico sem radiação.

Distratores:
B — Incorreta. Ressonância é demorada, exige maior logística e não traz vantagem para uma estrutura bem avaliada por ultrassom.
C — Incorreta. Radiografia pode mostrar distensão gástrica, mas não confirma hipertrofia pilórica.
D — Incorreta. Tomografia expõe o lactente à radiação e contraste sem necessidade.`,

        'cg-inep-102': `Resposta correta — C. Massa testicular sólida, indolor, heterogênea, irregular e com calcificações em adulto jovem é altamente suspeita de tumor testicular. O próximo passo inclui marcadores tumorais e avaliação urológica para orquiectomia radical inguinal.

Distratores:
A — Incorreta. Torção causa dor aguda intensa e alterações vasculares, não massa indolor por seis meses.
B — Incorreta. Hérnia varia com esforço, pode ser redutível e é extratesticular.
D — Incorreta. Orquiepididimite costuma cursar com dor, febre e hiperemia, além de padrão ultrassonográfico inflamatório.`,

        'cg-inep-103': `Resposta correta — D. Aos 83 anos, com cardiopatia grave e expectativa de vida reduzida por comorbidades, o rastreamento de câncer de próstata tem baixa chance de benefício e alto risco de sobrediagnóstico, biópsias e tratamento sem ganho de sobrevida. O Ministério da Saúde não recomenda rastreamento populacional e, neste caso, não deve ser indicado.

Distratores:
A — Incorreta. Ultrassonografia transretal não é teste de rastreamento e só seria usada em contexto diagnóstico selecionado.
B — Incorreta. PSA e toque não trazem benefício provável nessa idade/condição e podem iniciar cascata de danos.
C — Incorreta. PSA isolado é inespecífico e não supera a limitação de expectativa de vida.`,

        'cg-inep-104': `Resposta correta — A. Abaulamento abaixo do ligamento inguinal é topografia de hérnia femoral. Irredutibilidade por dois dias associada a vômitos, distensão e parada de gases caracteriza encarceramento com obstrução intestinal e requer tratamento cirúrgico urgente.

Distratores:
B — Incorreta. Hérnia incisional ocorreria em cicatriz operatória; a cicatriz subcostal não corresponde ao abaulamento inguinal inferior.
C — Incorreta. Hérnia inguinal direta aparece acima do ligamento inguinal, medial aos vasos epigástricos.
D — Incorreta. Hérnia inguinal indireta também emerge acima do ligamento e segue pelo canal inguinal, diferentemente da massa femoral.`,

        'cg-inep-105': `Resposta correta — B. Ascensão espontânea da coluna de sangue no equipo após punção jugular sugere posicionamento arterial, especialmente se houver fluxo pulsátil ou pressão elevada. O cateter/punção deve ser retirado e o local comprimido, sem infundir solução, com monitorização de complicações.

Distratores:
A — Incorreta. Ultrassom pode auxiliar se houver dúvida ou complicação, mas não se deve manter um acesso suspeito de arterial enquanto se aguarda exame.
C — Incorreta. Infundir glicose em acesso arterial pode causar lesão vascular e isquemia.
D — Incorreta. Radiografia avalia posição torácica e pneumotórax, mas não resolve a suspeita imediata de punção arterial indicada pelo comportamento da coluna.`,

        'cg-inep-106': `Resposta correta — A. Ferida profunda envolvendo músculo, subcutâneo e pele deve ser fechada por planos para eliminar espaço morto e restabelecer anatomia. Utilizam-se fios absorvíveis de calibre adequado, como 3-0, nos planos profundos e fio não absorvível 3-0 na pele da coxa.

Distratores:
B — Incorreta. Fios 5-0 são finos demais para suportar tensão muscular e subcutânea, e absorvível na pele pode não ser a melhor escolha no cenário descrito.
C — Incorreta. Fios não absorvíveis deixados em músculo e subcutâneo aumentam reação crônica e não são preferidos.
D — Incorreta. Além de não absorvíveis nos planos profundos, calibres 5-0 não oferecem resistência suficiente para a coxa.`,

        'cg-inep-107': `Resposta correta — A. Adenocarcinoma Gleason 8/grupo de grau 4 e PSA 17 configuram doença de alto risco, exigindo estadiamento para linfonodos e metástases antes de definir tratamento. Tomografia de abdome e pelve integra essa avaliação, associada a imagem óssea apropriada conforme protocolo.

Distratores:
B — Incorreta. A biópsia já confirmou câncer de alto grau e não precisa ser repetida imediatamente.
C — Incorreta. Repetir PSA em seis meses atrasaria estadiamento e tratamento de doença agressiva.
D — Incorreta. Vigilância anual não é apropriada para paciente robusto com Gleason 8.`,

        'cg-inep-108': `Resposta correta — C. Ferimento causado por queda no asfalto tem contato com superfície suja e provável inoculação de detritos, sendo classificado como contaminado mesmo com apenas 90 minutos de evolução. Requer irrigação abundante, exploração, retirada de corpos estranhos e avaliação de profilaxias.

Distratores:
A — Incorreta. Ferida limpa é produzida em condições controladas, sem contaminação significativa.
B — Incorreta. Não há tempo prolongado, pus, necrose ou sinais clínicos que indiquem infecção já estabelecida.
D — Incorreta. “Potencialmente contaminada” não expressa adequadamente a contaminação concreta pelo asfalto e detritos.`,

        'cg-inep-109': `Resposta correta — C. Constipação desde o nascimento, evacuações raras, distensão e descarga explosiva ao toque em criança com síndrome de Down sugerem doença de Hirschsprung. O enema contrastado mostra segmento distal estreito agangliônico e dilatação do cólon proximal com inervação preservada; a biópsia retal confirma ausência de células ganglionares no segmento afetado.

Distratores:
A — Incorreta. Na doença de Hirschsprung há ausência do reflexo inibitório retoanal, não relaxamento normal do esfíncter interno.
B — Incorreta. A biópsia esperada mostra ausência de células ganglionares e hipertrofia nervosa, não apenas presença ou diminuição inespecífica.
D — Incorreta. O reto costuma ser estreito, com razão reto-sigmoide invertida; não maior que o cólon proximal.`,

        'cg-inep-110': `Resposta correta — A. Abaulamento inguinal intermitente que surge e desaparece, associado a espessamento do cordão, caracteriza hérnia inguinal indireta por persistência do processo vaginal. Em criança, não há fechamento espontâneo confiável e indica-se correção cirúrgica eletiva após o diagnóstico.

Distratores:
B — Incorreta. Hérnia direta é excepcional na infância e o quadro não é urgente porque está reduzida e sem sintomas.
C — Incorreta. Hidrocele comunicante costuma apresentar aumento escrotal líquido e transiluminação, não tumoração inguinal redutível típica.
D — Incorreta. Hidrocele septada não aparece e desaparece repetidamente nem exige urgência sem complicação.`,

        'cg-inep-111': `Resposta correta — D. Em homem assintomático, a decisão sobre rastreamento do câncer de próstata deve ser individualizada após conversa sobre benefícios incertos e riscos de falso-positivo, biópsia, sobrediagnóstico e sequelas do tratamento. A preferência informada do paciente deve orientar a conduta.

Distratores:
A — Incorreta. PSA não deve ser solicitado automaticamente antes de decisão compartilhada, e toque não serve apenas como confirmação de PSA alterado.
B — Incorreta. Solicitar ambos de rotina transforma uma decisão sensível a preferências em rastreamento automático.
C — Incorreta. O encaminhamento não corrige a ausência de discussão prévia e um PSA alterado requer interpretação contextual, não sequência rígida.

Ressalva técnica — o Ministério da Saúde brasileiro não recomenda rastreamento populacional sistemático; sociedades médicas podem oferecer rastreamento oportunístico após decisão compartilhada em faixas etárias selecionadas.`,

        'cg-inep-112': `Resposta correta — D. Histerectomia abdominal abre o trato genital, que possui flora própria, sendo cirurgia limpa-contaminada. A profilaxia deve cobrir flora cutânea e vaginal e ser administrada antes da incisão; entre as opções, cefazolina 2 g intravenosa cerca de uma hora antes é a mais adequada.

Distratores:
A — Incorreta. Não é cirurgia contaminada, e administrar apenas durante o ato pode ocorrer após a janela protetora.
B — Incorreta. A dose e o tempo estão adequados, mas a classificação como contaminada está errada.
C — Incorreta. A classificação está correta, porém 1 g é dose insuficiente para muitos adultos e o momento durante a cirurgia é tardio.`,

        'cg-inep-113': `Resposta correta — D. Choque elétrico de rede com trajeto transcorporal, contraturas, trombose vascular e urina escura sugere lesão muscular profunda e mioglobinúria. Deve-se iniciar fluidos intravenosos, monitorização cardíaca e laboratorial, tratar complicações e transferir, após estabilização, para centro de queimados.

Distratores:
A — Incorreta. Fasciotomia depende de síndrome compartimental comprovada/suspeita, hidratação oral é insuficiente e observação simples é insegura.
B — Incorreta. Sonda, mioglobina, analgesia e ECG são úteis, mas a alternativa omite ressuscitação venosa e transferência especializada diante de lesão elétrica grave.
C — Incorreta. A superfície cutânea não estima o dano elétrico profundo, e reposição oral não é adequada à possível rabdomiólise.`,

        'cg-inep-114': `Resposta correta — B. Lidocaína oferece início relativamente rápido e bupivacaína longa duração; a associação permite anestesia precoce e analgesia prolongada, respeitando-se rigorosamente as doses máximas combinadas por peso.

Distratores:
A — Incorreta. Mepivacaína e lidocaína têm duração intermediária/curta e não fornecem o maior tempo de ação disponível.
C — Incorreta. Cloroprocaína tem latência curta, mas lidocaína não é o agente de maior duração.
D — Incorreta. Cloroprocaína inicia rapidamente, porém mepivacaína dura menos que bupivacaína.

Ressalva técnica — isoladamente, cloroprocaína costuma ter latência ainda menor que lidocaína. Como nenhuma opção associa cloroprocaína à bupivacaína, o gabarito B representa a combinação prática de início rápido e maior duração entre os pares apresentados.`,

        'cg-inep-115': `Resposta correta — B. Massa abdominal renal que não cruza a linha média, hematúria, palidez e hipertensão em lactente sugerem tumor de Wilms. A ultrassonografia abdominal é o primeiro exame para confirmar origem renal, avaliar rim contralateral e pesquisar trombo venoso, seguida de estadiamento especializado.

Distratores:
A — Incorreta. Linfoma pode produzir massa, mas hematúria e massa renal unilateral favorecem Wilms; ausência de linfonodos também reduz a hipótese.
C — Incorreta. Glomerulonefrite causa hematúria, edema e hipertensão, mas não massa sólida persistente.
D — Incorreta. Neuroblastoma frequentemente cruza a linha média, pode calcificar e associa-se a catecolaminas; ultrassom ainda seria exame inicial, mas o padrão é mais compatível com Wilms.`,

        'cg-inep-116': `Resposta correta — B. Febre, dor em hipocôndrio direito e icterícia compõem tríade de Charcot, enquanto colúria, acolia e colédoco dilatado reforçam obstrução infectada: colangite aguda. O tratamento inicial inclui ressuscitação e antibioticoterapia intravenosa, seguido de drenagem biliar endoscópica urgente conforme gravidade.

Distratores:
A — Incorreta. Colecistite pode coexistir, mas icterícia e dilatação de colédoco apontam para infecção da via biliar principal.
C — Incorreta. Colecistectomia emergencial não é o primeiro controle de foco da colangite obstrutiva.
D — Incorreta. O diagnóstico está correto, mas drenagem cirúrgica aberta não é a abordagem inicial usual; prefere-se CPRE após estabilização e antibiótico.`,

        'cg-inep-117': `Resposta correta — C. A paciente está hemodinamicamente estável e a lesão hepática não apresenta extravasamento ativo descrito. O manejo não operatório em UTI/unidade monitorizada, com exames abdominais e hematócrito seriados, é apropriado, com disponibilidade imediata de cirurgia e radiologia intervencionista se houver deterioração.

Distratores:
A — Incorreta. Laparotomia e drenagem do hematoma não são indicadas em trauma hepático fechado estável e podem desfazer tamponamento.
B — Incorreta. Packing e reabordagem são estratégias de controle de danos para paciente instável ou hemorragia grave, não para este cenário.
D — Incorreta. Tomografia seriada a cada 48 horas não é rotina; repete-se imagem por mudança clínica, queda inexplicada da hemoglobina ou suspeita de complicação.`,

        'cm-cardiologia-001': `Resposta correta — C. Em paciente com diabetes, hipertensão e múltiplos fatores de alto risco cardiovascular, dapagliflozina acrescenta proteção cardiorrenal à metformina, a losartana pode ser titulada para melhorar controle pressórico e atorvastatina 40 mg oferece redução lipídica de alta intensidade adequada ao risco.

Distratores:
A — Incorreta. Gliclazida não oferece o mesmo benefício cardiorrenal, hidroclorotiazida 50 mg aumenta efeitos metabólicos e atorvastatina 10 mg é intensidade baixa/moderada para esse perfil.
B — Incorreta. Insulina depende de hiperglicemia acentuada ou falha terapêutica demonstrada, e fibrato não substitui estatina para redução do risco aterosclerótico.
D — Incorreta. Glibenclamida aumenta risco de hipoglicemia, especialmente com envelhecimento/lesão renal, e sinvastatina 20 mg é insuficiente para alto risco.

Validação documental pendente — o enunciado anuncia exames, mas os valores não foram preservados na importação. Hemoglobina glicada, função renal, potássio, pressão confirmada e perfil lipídico devem ser conferidos no PDF-fonte para validar doses e elegibilidade à dapagliflozina.`,

        'cm-cardiologia-002': `Resposta correta — B. Pressões persistentemente em torno de 150/95 mmHg, confirmadas em consultas com técnica adequada, estabelecem hipertensão e justificam combinar mudanças de estilo de vida com tratamento farmacológico, mesmo com risco global baixo, conforme o estágio pressórico.

Distratores:
A — Incorreta. MAPA pode esclarecer efeito do avental branco, mas não deve ser a única ação nem atrasar indefinidamente tratamento de medidas repetidamente elevadas.
C — Incorreta. MRPA é útil para confirmação e acompanhamento, porém simples reavaliação em duas semanas não constitui plano terapêutico completo.
D — Incorreta. Medidas não farmacológicas são essenciais, mas valores persistentes nessa faixa justificam medicamento associado segundo o protocolo citado.`,

        'cm-cardiologia-003': `Resposta correta — A. Em idosa com fração de ejeção preservada/levemente reduzida, doença renal e sintomas ortostáticos, deve-se revisar volemia, pressão em ortostatismo, frequência, potássio e função renal e ajustar individualmente doses, preservando fármacos prognósticos tolerados.

Distratores:
B — Incorreta. Digoxina não trata tontura ortostática e aumenta risco de toxicidade em idosa com função renal reduzida.
C — Incorreta. Sacubitril-valsartana tem benefício mais estabelecido na fração de ejeção reduzida e pode piorar hipotensão; não é troca automática com FE 53%.
D — Incorreta. Suspender abruptamente betabloqueador pode precipitar isquemia e descompensação; primeiro se avaliam dose, frequência e causa dos sintomas.`,

        'cm-cardiologia-004': `Resposta correta — B. Dor típica em repouso com inversões simétricas de T anteriores caracteriza síndrome coronariana aguda sem supradesnivelamento e possível padrão de alto risco. Na ausência de contraindicações, deve-se administrar imediatamente AAS mastigável e um inibidor P2Y12 conforme estratégia definida, além de anticoagulação, estatina e avaliação invasiva.

Distratores:
A — Incorreta. Morfina não deve ser intramuscular e é reservada a dor refratária; propranolol oral não é a intervenção inicial apropriada.
C — Incorreta. Troponina é essencial, mas antiagregação com AAS não deve aguardar o resultado quando a suspeita é alta.
D — Incorreta. Saturação de 93% não exige oxigênio rotineiro, e nitroglicerina alivia dor mas não substitui terapia antitrombótica.

Ressalva técnica — o pré-tratamento rotineiro com clopidogrel antes de conhecer a anatomia coronária varia conforme risco e estratégia invasiva; AAS imediato permanece consensual, e a escolha do segundo antiagregante deve seguir o protocolo local.`,

        'cm-cardiologia-005': `Resposta correta — A. A paciente apresenta insuficiência cardíaca com fração de ejeção reduzida (38%) sintomática. Espironolactona, antagonista do receptor mineralocorticoide, reduz mortalidade e hospitalizações em pacientes selecionados com sintomas persistentes, desde que potássio e função renal permitam.

Distratores:
B — Incorreta. Clortalidona ajuda no controle pressórico, mas não possui o mesmo benefício de sobrevida específico na insuficiência cardíaca sistólica.
C — Incorreta. Hidralazina isolada não substitui terapia padrão; benefício prognóstico ocorre em associação com nitrato em situações selecionadas.
D — Incorreta. Clonidina não melhora prognóstico da insuficiência cardíaca e pode causar sedação e rebote hipertensivo.

Ressalva técnica — terapia contemporânea da fração reduzida também inclui betabloqueador comprovado, inibidor de SGLT2 e substituição do IECA por sacubitril-valsartana quando indicado; a questão pergunta especificamente qual opção listada agrega sobrevida.`,

        'cm-cardiologia-006': `Resposta correta — D. Em pessoa com 82 anos, assintomática e com pressão sistólica discretamente abaixo de 150 mmHg, o gabarito favorece confirmar persistência, acompanhar na unidade e reforçar estilo de vida antes de iniciar medicamento, evitando hipotensão e quedas por tratamento precipitado.

Distratores:
A — Incorreta. O manejo inicial pode ser realizado na Atenção Primária, sem indicação automática de cardiologista.
B — Incorreta. Holter avalia ritmo cardíaco e ecocardiograma não é necessário apenas por elevação pressórica discreta.
C — Incorreta. Prescrever losartana imediatamente sem confirmar diagnóstico fora do consultório e avaliar risco/fragilidade pode causar dano.

Ressalva técnica — diretrizes mais recentes podem usar limiares e metas individualizadas diferentes em idosos robustos. Três medidas elevadas sugerem hipertensão e idealmente devem ser confirmadas com MRPA/MAPA; se a média permanecer elevada, risco global, fragilidade e tolerância orientam eventual tratamento.`,

        'cm-cardiologia-007': `Resposta correta — A. Taquicardia irregular de início após álcool e energéticos em paciente estável é compatível com fibrilação atrial de alta resposta ventricular, o chamado “holiday heart”. O controle inicial da frequência pode ser feito com betabloqueador intravenoso, monitorando pressão e contraindicações.

Distratores:
B — Incorreta. Taquicardia ventricular costuma ser regular e de complexos largos; cardioversão imediata fica reservada à instabilidade.
C — Incorreta. Taquicardia paroxística supraventricular é tipicamente regular, e adenosina não encerra fibrilação atrial.
D — Incorreta. Taquicardia sinusal é regular e com ondas P organizadas, incompatível com ritmo irregular descrito.

Validação visual pendente — o traçado em D2 não foi preservado. É necessário confirmar ausência de ondas P organizadas, irregularidade dos intervalos RR e largura dos QRS no PDF-fonte.`,

        'cm-cardiologia-008': `Resposta correta — B. Bradicardia sintomática com tontura, mas sem hipotensão, choque, isquemia ou insuficiência cardíaca aguda, deve ser monitorizada e avaliada rapidamente. Segundo o gabarito, o ECG mostra distúrbio de condução com indicação de preparar marca-passo transcutâneo e aguardar cardiologia, sem administrar fármacos desnecessariamente.

Distratores:
A — Incorreta. Alta é insegura diante de sintomas e frequência de 45 bpm possivelmente causada por bloqueio avançado.
C — Incorreta. Atropina e estimulação imediata são reservadas a bradicardia com sinais de má perfusão; além disso, atropina pode ser ineficaz em bloqueio infranodal.
D — Incorreta. Dopamina é opção quando há bradicardia instável refratária ou enquanto se aguarda estimulação, não em paciente normotenso e perfundido.

Validação visual pendente — o ECG mencionado foi omitido. É indispensável verificar o tipo de bloqueio e a relação entre ondas P e QRS, pois isso determina se basta deixar o marca-passo preparado ou se estimulação imediata é necessária.`,

        'cm-cardiologia-009': `Resposta correta — C. Diabetes com hipertensão persistente e albuminúria requer bloqueio do sistema renina-angiotensina. Um inibidor da ECA reduz pressão e pressão intraglomerular, diminui albuminúria e retarda progressão da doença renal, com monitorização de creatinina e potássio.

Distratores:
A — Incorreta. Betabloqueador não é primeira escolha apenas por diabetes e albuminúria, salvo indicação específica como coronariopatia ou arritmia.
B — Incorreta. Diurético pode ser associado para atingir meta, mas não oferece a mesma nefroproteção antiproteinúrica inicial.
D — Incorreta. Bloqueador de canal de cálcio reduz pressão, porém não substitui IECA/BRA como base na albuminúria.`,

        'cm-cardiologia-010': `Resposta correta — A. Ritmo irregularmente irregular a 170 bpm sugere fibrilação atrial de alta resposta. Pressão sistólica de 70 mmHg e sinais clínicos de má perfusão caracterizam instabilidade hemodinâmica, indicando cardioversão elétrica sincronizada imediata, com sedação se isso não atrasar o procedimento.

Distratores:
B — Incorreta. Desidratação pode contribuir, mas volume isolado não corrige a taquiarritmia responsável pelo choque.
C — Incorreta. Metoprolol intravenoso pode agravar hipotensão e não deve atrasar cardioversão no instável.
D — Incorreta. Amiodarona pode ser usada em cenários selecionados, mas tem início mais lento e não substitui choque sincronizado diante de instabilidade.`,

        'cm-cardiologia-011': `Resposta correta — B. Parada sem pulso apesar de atividade elétrica, associada a turgência jugular, hipertimpanismo e ausência de expansão à direita durante ventilação, indica pneumotórax hipertensivo como causa reversível. Deve-se realizar descompressão imediata no quinto espaço intercostal direito e seguir com drenagem torácica, sem interromper a RCP.

Distratores:
A — Incorreta. Fibrilação atrial não é ritmo chocável e, sem pulso, não se realiza cardioversão sincronizada.
C — Incorreta. Amiodarona é usada em fibrilação ventricular/taquicardia ventricular sem pulso refratária, não substitui epinefrina na atividade elétrica sem pulso nem corrige pneumotórax.
D — Incorreta. Esternotomia não é tratamento inicial de pneumotórax hipertensivo e seria desproporcional.`,

        'cm-cardiologia-012': `Resposta correta — B. Pressão de 230 × 150 mmHg com confusão e papiledema caracteriza emergência hipertensiva com encefalopatia. É necessário monitorização contínua, acesso venoso, oxigênio pela hipoxemia e anti-hipertensivo intravenoso titulável, como nitroprussiato no contexto da alternativa, reduzindo a pressão de forma controlada.

Distratores:
A — Incorreta. UTI é apropriada, mas intubação não é automática em paciente agitada que ainda protege a via aérea, e enzimas cardíacas não são a intervenção prioritária.
C — Incorreta. Medicamentos orais e enfermaria não oferecem controle rápido e titulável diante de lesão aguda de órgão-alvo.
D — Incorreta. Aguardar espontaneamente expõe a edema cerebral, AVC, insuficiência cardíaca e morte.

Ressalva técnica — a retirada abrupta de clonidina pode causar hipertensão rebote. Nitroprussiato exige monitorização rigorosa; outros agentes intravenosos, como nicardipino ou clevidipino, podem ser preferidos conforme disponibilidade e perfil clínico.`,

        'cm-cardiologia-013': `Resposta correta — D. Dor torácica, dispneia, alteração de consciência e pressão de 190 × 120 mmHg sugerem emergência cardiovascular, possivelmente síndrome coronariana aguda com lesão de órgão-alvo. A unidade deve monitorizar sinais vitais, administrar AAS se não houver contraindicação e transferir imediatamente para serviço de urgência capaz de realizar ECG, troponina e tratamento definitivo.

Distratores:
A — Incorreta. Redução lenta ambulatorial é conduta para hipertensão sem lesão aguda de órgão-alvo, não para sintomas graves.
B — Incorreta. Anti-hipertensivo oral e observação local atrasam avaliação de infarto, dissecção ou AVC.
C — Incorreta. Investigar adesão é importante depois da estabilização, mas não responde à emergência atual.

Ressalva de segurança — se houver suspeita de dissecção aguda de aorta, AAS pode ser prejudicial; o exame clínico deve buscar dor transfixante, assimetria de pulsos e déficit antes da administração.`,

        'cm-cardiologia-014': `Resposta correta — D. Em adulto inconsciente, sem respiração e sem pulso, inicia-se RCP pelo C-A-B: compressões de pelo menos 5 cm e no máximo 6 cm, frequência de 100–120 por minuto, retorno completo do tórax e mínimas interrupções, seguidas de abertura da via aérea e ventilações na relação 30:2 até via avançada.

Distratores:
A — Incorreta. Ventilações a cada 2–3 segundos são excessivas; com via aérea avançada, administra-se uma ventilação a cada seis segundos sem pausar compressões.
B — Incorreta. A sequência está invertida e a relação correta é 30 compressões para duas ventilações.
C — Incorreta. O pulso/ritmo é checado aproximadamente a cada dois minutos, não cinco, e compressões contínuas dependem de via aérea avançada.`,

        'cm-cardiologia-015': `Resposta correta — A. Linha de base serrilhada com ondas F e condução ventricular irregular corresponde a flutter atrial com bloqueio variável. Como o paciente está estável, deve-se controlar a frequência com betabloqueador, considerando também duração, risco tromboembólico e possibilidade de cardioversão.

Distratores:
B — Incorreta. Desfibrilação não sincronizada é reservada a fibrilação ventricular ou taquicardia ventricular sem pulso; arritmia supraventricular com pulso e estabilidade não requer choque imediato.
C — Incorreta. Massagem carotídea pode interromper algumas taquicardias por reentrada e revelar ondas de flutter, mas não é tratamento definitivo do flutter.
D — Incorreta. Lidocaína atua principalmente em arritmias ventriculares e não controla flutter atrial.`,

        'cm-cardiologia-016': `Resposta correta — C. Desdobramento fixo de B2 é achado clássico de comunicação interatrial, decorrente de sobrecarga de volume do ventrículo direito e atraso constante do fechamento pulmonar. A comunicação permite embolia paradoxal quando há inversão transitória do shunt, causando embolia sistêmica.

Distratores:
A — Incorreta. Estenose pulmonar pode produzir desdobramento amplo e sopro sistólico, mas não o padrão fixo isolado nem embolia pulmonar como risco típico.
B — Incorreta. Estenose mitral associa-se a estalido de abertura, ruflar diastólico e embolia sistêmica por fibrilação atrial, não desdobramento fixo.
D — Incorreta. Prolapso mitral causa clique mesosistólico e sopro tardio, sem relação com embolia pulmonar.`,

        'cm-cardiologia-017': `Resposta correta — B. Pressão de 190 × 130 mmHg associada a desorientação sem déficit focal descrito caracteriza encefalopatia hipertensiva. O papiledema é achado de hipertensão grave com aumento da pressão intracraniana e lesão de órgão-alvo, indicando tratamento intravenoso monitorizado.

Distratores:
A — Incorreta. Coriorretinite é inflamação infecciosa/autoimune e não achado de hipertensão maligna.
C — Incorreta. AIT produz déficit neurológico focal transitório, não confusão global persistente; fibras nervosas meduladas são variante benigna.
D — Incorreta. AVC hemorrágico exige imagem e costuma causar déficit focal, cefaleia ou rebaixamento; pulso venoso espontâneo é achado normal e não o confirma.`,

        'cm-cardiologia-018': `Resposta correta — A. Hipotensão, turgência jugular, bulhas hipofonéticas, baixa voltagem e queda inspiratória da pressão sistólica maior que 10 mmHg formam quadro de tamponamento cardíaco. Ecocardiografia à beira do leito confirma derrame e repercussão; com choque, a pericardiocentese deve ser imediata.

Distratores:
B — Incorreta. Não há padrão isquêmico, e trombólise pode piorar derrame hemorrágico e tamponamento.
C — Incorreta. Vasopressor pode servir de ponte, mas antibiótico não trata compressão pericárdica e nenhuma medida substitui drenagem.
D — Incorreta. Embolia pulmonar é diferencial de choque obstrutivo, mas bulhas abafadas, baixa voltagem e pulso paradoxal favorecem tamponamento; angiotomografia atrasaria o tratamento.

Validação documental pendente — o enunciado anuncia outros exames, mas os resultados não foram preservados. Eles devem ser conferidos, embora os achados clínicos já sustentem o diagnóstico.`,

        'cm-cardiologia-019': `Resposta correta — A. Rebaixamento súbito com pulso central e traçado considerado pelo gabarito uma taquiarritmia instável indica cardioversão elétrica sincronizada imediata. O choque sincronizado evita descarga sobre a onda T e é prioritário diante de alteração aguda de consciência.

Distratores:
B — Incorreta. Novo cateterismo pode ser necessário se houver reinfarto, mas não corrige imediatamente a arritmia instável.
C — Incorreta. Metoprolol pode piorar instabilidade e tem início mais lento que cardioversão.
D — Incorreta. Lidocaína pode ser opção em arritmia ventricular estável ou recorrente, mas não deve atrasar choque sincronizado no instável.

Validação visual pendente — o traçado do monitor não foi preservado. É indispensável confirmar se há taquicardia ventricular monomórfica, fibrilação atrial ou outro ritmo com pulso; se fosse fibrilação ventricular/TV sem pulso, a conduta correta seria desfibrilação não sincronizada, e não cardioversão.`,

        'cm-cardiologia-020': `Resposta correta — D. Fibrilação atrial com hipotensão, edema pulmonar e sudorese caracteriza instabilidade hemodinâmica. Deve-se realizar cardioversão elétrica sincronizada imediatamente, com sedação e analgesia quando possível sem atrasar o choque.

Distratores:
A — Incorreta. Não há dor nem alterações agudas de ST-T que indiquem angioplastia como intervenção imediata.
B — Incorreta. Estudo eletrofisiológico é eletivo e não trata a descompensação atual.
C — Incorreta. Marca-passo provisório trata bradiarritmias, não fibrilação atrial rápida.`,

        'cm-cardiologia-021': `Resposta correta — C. Bradicardia regular importante, síncopes recorrentes e ondas “a em canhão” sugerem dissociação atrioventricular por bloqueio AV total. Como há sintomas, o tratamento definitivo é implante de marca-passo, após estabilização e exclusão de causas reversíveis.

Distratores:
A — Incorreta. Cardioversão trata taquiarritmias instáveis e não corrige bloqueio de condução bradicárdico.
B — Incorreta. Ablação de via anômala é usada em síndromes de pré-excitação/taquicardia por reentrada, não em bloqueio AV.
D — Incorreta. Isolamento das veias pulmonares é estratégia para fibrilação atrial, incompatível com o quadro.

Validação visual pendente — o ECG não foi preservado. Deve-se confirmar dissociação entre ondas P e QRS, frequência de escape e largura dos complexos para validar o tipo e nível do bloqueio.`,

        'cm-cardiologia-022': `Resposta correta — A. Doença renal crônica estágio G3a com albuminúria e pressão não controlada tem indicação de IECA ou BRA. Esses fármacos reduzem pressão intraglomerular e albuminúria e retardam progressão renal, com controle de creatinina e potássio após introdução/titulação.

Distratores:
B — Incorreta. TFG de 54 ainda permite eficácia de tiazídico, e anlodipino 20 mg/dia já excede a dose usual máxima de 10 mg; aumentá-lo é inadequado.
C — Incorreta. Espironolactona e carvedilol são opções em indicações específicas ou hipertensão resistente, não substituem bloqueio renina-angiotensina na albuminúria.
D — Incorreta. Trabalhar adesão é sempre necessário, mas o esquema não contempla a nefroproteção indicada e a pressão permanece elevada.`,

        'cm-cardiologia-023': `Resposta correta — B. A nova medicação mais associada a mialgia após alteração laboratorial é uma estatina, prescrita para dislipidemia. Deve-se avaliar temporalidade, creatinoquinase quando sintomas forem intensos e causas predisponentes antes de ajustar, suspender temporariamente ou trocar o agente.

Distratores:
A — Incorreta. Obesidade é tratada principalmente com mudanças de estilo de vida e medicamentos específicos, mas não sugere tão diretamente mialgia após duas semanas.
C — Incorreta. Hipotireoidismo pode causar dor muscular e aumentar risco de miopatia por estatina, porém seu tratamento com levotiroxina não costuma provocar esse efeito.
D — Incorreta. Antidiabéticos usuais não têm mialgia como apresentação típica imediata comparável à estatina.`,

        'cm-cardiologia-024': `Resposta correta — A. Episódios documentados de hipotensão em paciente usando três vasodilatadores/anti-hipertensivos aumentam risco de lipotimia e queda. A medida etiológica prioritária é revisar indicação, interação, horários e doses, além de aferir pressão ortostática e corrigir fatores contribuintes.

Distratores:
B — Incorreta. Contenção física/química aumenta risco de trauma, delirium e perda funcional e não trata a hipotensão.
C — Incorreta. Acompanhante pode auxiliar na segurança, mas não substitui correção do esquema medicamentoso.
D — Incorreta. Substituição pode ser necessária após revisão, porém contenção química é inadequada e pode piorar hipotensão e confusão.`,

        'cm-cardiologia-025': `Resposta correta — C. O ECG indica infarto inferior com extensão posterior e provável comprometimento do ventrículo direito. O ventrículo direito infartado depende de pré-carga; nitrato venodilata e reduz retorno venoso, podendo causar a queda abrupta da pressão com pulmões limpos.

Distratores:
A — Incorreta. AAS não causa hipercalemia aguda nem explica hipotensão imediatamente após a dose.
B — Incorreta. Ruptura septal geralmente ocorre dias após o infarto e produz novo sopro intenso e insuficiência cardíaca, não piora logo após nitrato.
D — Incorreta. Disfunção ventricular esquerda grave costuma causar congestão pulmonar, ausente na ausculta.

Ressalva de segurança — deve-se suspender nitrato, avaliar derivações direitas, oferecer volume com cautela e reperfundir urgentemente. Hipotensão é contraindicação à continuidade do nitrato e pode também limitar trombólise até estabilização.`,

        'cm-dermatologia-001': `Resposta correta — B. Exantema maculopapular pruriginoso, simétrico, sem acometimento mucoso ou sistêmico, iniciado após sete dias de ibuprofeno sugere erupção medicamentosa simples. Deve-se suspender o fármaco suspeito e tratar sintomas com anti-histamínico oral, orientando sinais de alarme.

Distratores:
A — Incorreta. Corticoide sistêmico não é necessário em exantema leve sem lesão de órgão, mucosa ou repercussão sistêmica.
C — Incorreta. Corticoide tópico pode aliviar áreas localizadas, mas teste de contato não é investigação rotineira de exantema sistêmico por AINE na fase aguda.
D — Incorreta. Não há vesículas ou padrão herpético, e permanganato não trata reação medicamentosa.

Validação documental pendente — o enunciado anuncia exames laboratoriais, mas seus resultados não foram importados. É necessário conferir hemograma, eosinófilos e função hepatorrenal para excluir reação medicamentosa grave antes da publicação definitiva.`,

        'cm-dermatologia-002': `Resposta correta — B. Pápulas amareladas com ponto negro central nos pés, em criança exposta a solo próximo a chiqueiro, são típicas de tungíase por Tunga penetrans. O tratamento inclui retirada estéril dos parasitas, cuidado local e terapia tópica/sistêmica conforme extensão, além de calçados e controle ambiental.

Distratores:
A — Incorreta. Dermatite de contato produz placas eczematosas relacionadas ao alérgeno, não ponto negro central parasitário.
C — Incorreta. Escabiose causa prurido noturno, túneis e lesões em distribuição característica, sem nódulo com pulga incrustada.
D — Incorreta. Esporotricose forma nódulos que podem ascender por vasos linfáticos e não tem a morfologia nem exposição típica descrita.`,

        'cm-dermatologia-003': `Resposta correta — D. Lesão acral de 12 mm, assimétrica, de bordas irregulares, policromática e com sangramento reúne critérios ABCDE de suspeição para melanoma, incluindo diâmetro maior que 6 mm e evolução recente. Requer avaliação urgente e biópsia excisional quando tecnicamente possível.

Distratores:
A — Incorreta. Carcinoma espinocelular costuma ser queratósico, ulcerado ou infiltrado, com menor policromia melanocítica.
B — Incorreta. Carcinoma basocelular é mais comum em áreas fotoexpostas e aparece como pápula perolada com telangiectasias, raramente plantar.
C — Incorreta. Queratose actínica é placa áspera em pele cronicamente fotoexposta e não costuma ser negra/policromática plantar.`,

        'cm-dermatologia-004': `Resposta correta — D. Prurido noturno e pápulas em pregas em ambiente superlotado sugerem escabiose. Deve-se tratar simultaneamente o paciente e contatos da cela com ivermectina por peso, repetir a dose em 7–15 dias conforme protocolo e higienizar roupas, cama e toalhas, além de melhorar limpeza e reduzir transmissão.

Distratores:
A — Incorreta. Uma única tableta de 6 mg é subdose para 98 kg; a dose usual é aproximadamente 200 microgramas/kg, e medidas excessivamente restritivas não substituem controle coordenado.
B — Incorreta. Inseticidas e fumigação ambiental não são recomendados, e lavar a apenas 30 °C pode ser insuficiente; casos/contatos precisam de tratamento.
C — Incorreta. Fluconazol trata fungos e não elimina Sarcoptes scabiei.`,

        'cm-dermatologia-005': `Resposta correta — A. Assimetria, bordas irregulares, pigmentação escura, crescimento recente, prurido e sangramento são sinais de alerta para melanoma. A lesão deve ser avaliada rapidamente e, em geral, submetida a biópsia excisional com margem estreita para diagnóstico e Breslow.

Distratores:
B — Incorreta. Queratoacantoma costuma crescer rapidamente como nódulo crateriforme com tampão de queratina, não mácula pigmentada assimétrica.
C — Incorreta. Carcinoma basocelular frequentemente é pápula perolada ou lesão ulcerada com telangiectasias em área fotoexposta.
D — Incorreta. Carcinoma espinocelular tende a ser placa/nódulo queratósico ou ulcerado, menos compatível com critérios melanocíticos ABCDE.`,

        'cm-dermatologia-006': `Resposta correta — D. Pápulas amareladas dolorosas e pruriginosas com ponto negro central nos pés, associadas a contato com chiqueiro, são tungíase por Tunga penetrans. Deve-se remover esterilmente os parasitas, tratar casos múltiplos conforme protocolo, cuidar de infecção secundária, atualizar tétano e controlar solo e animais.

Distratores:
A — Incorreta. Calçados e controle ambiental previnem novas infestações, mas não removem pulgas já incrustadas e sintomáticas.
B — Incorreta. Amoxicilina e antialérgico não eliminam o parasita e antibiótico só é indicado se houver infecção bacteriana secundária.
C — Incorreta. A pulga penetra ativamente a pele a partir do solo; tratar animais e atualizar tétano são úteis, mas a alternativa omite tratamento das lesões.

Ressalva terminológica — a estrutura retirada é a pulga adulta penetrada, e não uma larva. A alternativa D é a mais completa apesar dessa imprecisão.`,

        'cm-dermatologia-007': `Resposta correta — D. Trajeto eritematoso serpiginoso intensamente pruriginoso em mãos e pés após contato ambiental caracteriza larva migrans cutânea por larvas de ancilostomídeos de cães e gatos. Lesões limitadas podem ser tratadas com tiabendazol tópico; casos extensos respondem a ivermectina ou albendazol oral.

Distratores:
A — Incorreta. Escabiose causa túneis curtos em pregas e prurido domiciliar noturno, não trajetos migratórios longos após passeio.
B — Incorreta. Pediculose do corpo predomina em áreas cobertas e costuras das roupas e não produz linhas serpiginosas.
C — Incorreta. Dermatite atópica é eczema recorrente em distribuição característica; corticoide não eliminaria a larva.`,

        'cm-dermatologia-008': `Resposta correta — C. Pápulas ceratóticas com ponto negro central em áreas de contato de criança que anda descalça são tungíase. A retirada cuidadosa e estéril do parasita na UBS é indicada, seguida de antissepsia, avaliação de infecção secundária e situação vacinal antitetânica.

Distratores:
A — Incorreta. Larva migrans produz trajeto serpiginoso migratório, não pápula fixa com ponto central.
B — Incorreta. Eczema disidrótico causa vesículas profundas e pruriginosas, sem ponto negro parasitário.
D — Incorreta. Verruga viral é hiperqueratósica, interrompe linhas da pele e pode ter pontos trombosados, mas a exposição e morfologia favorecem tungíase; ácido tricloroacético 80% não é manejo inicial seguro nesse local.`,

        'cm-dermatologia-009': `Resposta correta — A. Nódulos eritematosos dolorosos disseminados, febre, artralgia/artrite e rarefação de supercílios em paciente com hanseníase multibacilar sugerem reação hansênica tipo 2, ou eritema nodoso hansênico. A vasculite leucocitoclástica pode acompanhar a reação imunológica sistêmica.

Distratores:
B — Incorreta. Granulomatose com poliangiite costuma envolver vias aéreas e rins, e não explica estigmas de hanseníase como madarose.
C — Incorreta. Leishmaniose tegumentar causa úlcera localizada com bordas elevadas, não nódulos sistêmicos febris e artrite.
D — Incorreta. Eritema nodoso pode acompanhar doença inflamatória intestinal, mas faltam sintomas digestivos e há sinais específicos de hanseníase.`,

        'cm-dermatologia-010': `Resposta correta — A. Prurido intenso, eczema em face poupando o centro, pescoço e flexuras, liquenificação e história familiar de atopia caracterizam dermatite atópica. O tratamento baseia-se em hidratação, redução de irritantes e anti-inflamatório tópico conforme gravidade.

Distratores:
B — Incorreta. Tinea corporis forma placas anulares com borda ativa descamativa e clareamento central.
C — Incorreta. Escabiose costuma acometer contatos, piora à noite e produz túneis em mãos, punhos e outras áreas típicas.
D — Incorreta. Psoríase apresenta placas bem delimitadas com escama prateada, frequentemente em superfícies extensoras e couro cabeludo.`,

        'cm-dermatologia-011': `Resposta correta — C. Exantema papuloeritematoso pruriginoso após naproxeno, sem instabilidade, broncoespasmo ou comprometimento sistêmico, é farmacodermia simples. Deve-se suspender o agente suspeito e oferecer anti-histamínico oral, documentando a reação e orientando sinais de gravidade.

Distratores:
A — Incorreta. Doença do soro costuma incluir febre, artralgia e outros sinais sistêmicos após período maior; manter o causador é inadequado.
B — Incorreta. Anafilaxia exige início agudo com comprometimento respiratório/circulatório ou múltiplos sistemas, ausentes.
D — Incorreta. Dermatite atópica é doença crônica e recorrente, não exantema temporalmente ligado a novo medicamento; via intravenosa é desnecessária.`,

        'cm-dermatologia-012': `Resposta correta — D. Segundo o gabarito, a lesão única progressiva e indolor em militar exposto à floresta amazônica tem aspecto compatível com leishmaniose cutânea. Após confirmação parasitológica, uma opção terapêutica é antimoniato de N-metilglucamina, com escolha local ou sistêmica conforme localização, número, espécie e risco de mucosa.

Distratores:
A — Incorreta. Blastomicose/paracoccidioidomicose cutânea costuma ocorrer com doença sistêmica ou lesões ulcerovegetantes distintas; itraconazol depende de confirmação.
B — Incorreta. Carcinoma espinocelular é possível em lesão crônica, mas idade, exposição endêmica e evolução favorecem leishmaniose no contexto da imagem atribuída.
C — Incorreta. Hanseníase costuma produzir placas com alteração sensitiva e nervosa; poliquimioterapia tríplice só é indicada após classificação confirmada.

Validação visual pendente — a imagem da lesão foi omitida. Devem ser conferidos bordas, fundo, ulceração, distribuição e eventual comprometimento linfático no PDF-fonte antes de validar definitivamente o diagnóstico.`,

        'cm-dermatologia-013': `Resposta correta — A. Segundo o gabarito, a lesão facial de longa duração com mudança recente apresenta características visuais suspeitas para melanoma. Evolução de tamanho, forma, cor ou sintomas é sinal de alerta e indica avaliação dermatoscópica e biópsia excisional quando possível.

Distratores:
B — Incorreta. Nevo comum tende a permanecer simétrico, uniforme e estável; mudança recente reduz a tranquilidade diagnóstica.
C — Incorreta. Ceratose seborreica costuma ter aspecto verrucoso “colado” à pele e estabilidade benigna, a ser distinguida pela imagem.
D — Incorreta. Carcinoma espinocelular costuma ser lesão queratósica, infiltrada ou ulcerada, e a diferenciação depende do aspecto ausente.

Validação visual pendente — a figura citada não foi preservada e o texto não descreve cor, simetria, bordas ou superfície. Não é possível validar o gabarito A frente aos demais diagnósticos sem conferir a imagem original.`,

        'cm-dermatologia-014': `Resposta correta — C. Abscessos recorrentes dolorosos em vulva e axilas, secreção fétida, nódulos persistentes e cicatrizes profundas caracterizam hidradenite supurativa, inflamação folicular crônica em áreas intertriginosas que pode formar túneis e cicatrizes.

Distratores:
A — Incorreta. Sífilis primária causa cancro geralmente único e indolor, sem abscessos recorrentes.
B — Incorreta. Herpes produz vesículas e úlceras dolorosas em surtos curtos, não nódulos profundos por meses com cicatrização em túneis.
D — Incorreta. Linfogranuloma venéreo começa com pequena úlcera e evolui com linfonodos inguinais dolorosos, não padrão axilar e vulvar crônico.`,

        'cm-dermatologia-015': `Resposta correta — C. Eczema facial temporalmente relacionado ao uso ocupacional de N95 pode representar dermatite irritativa ou alérgica relacionada ao trabalho. Deve-se avaliar nexo, ajustar equipamento/barreiras e tratamento e considerar afastamento temporário ou permanente conforme gravidade e impossibilidade de controle da exposição.

Distratores:
A — Incorreta. Corticoide e antibiótico combinados não são obrigatórios; antibiótico só é indicado se houver infecção secundária.
B — Incorreta. Teste epicutâneo ajuda a confirmar dermatite alérgica, mas exige padronização e interpretação especializada e não está amplamente disponível na Atenção Primária.
D — Incorreta. Dermatoses ocupacionais são frequentemente subnotificadas, portanto não se pode afirmar baixa prevalência de sub-registros.`,

        'cm-dermatologia-016': `Resposta correta — C. Placa eczematosa pruriginosa adjacente ao piercing sugere dermatite de contato, frequentemente por níquel. Ausência de desenvolvimento puberal, amenorreia primária, baixa estatura, pescoço alado e orelhas baixas são características de síndrome de Turner.

Distratores:
A — Incorreta. Tinea corporis forma placa anular com borda ativa e clareamento central; síndrome de Kabuki associa-se a fácies típica e atraso, não ao conjunto clássico descrito.
B — Incorreta. Dermatite atópica costuma ser difusa/recorrente e ligada a história atópica; síndrome de Noonan pode ter pescoço alado, mas geralmente não causa disgenesia gonadal com fenótipo feminino típico de Turner.
D — Incorreta. Dermatite seborreica predomina em áreas seborreicas e síndrome de Carpenter envolve craniossinostose e anomalias digitais.`,

        'cm-dermatologia-017': `Resposta correta — D. Crosta láctea com escamas gordurosas aderentes em couro cabeludo, retroauricular e sobrancelhas é dermatite seborreica infantil. Em geral é pouco ou nada pruriginosa e não se associa à eosinofilia típica de doenças atópicas.

Distratores:
A — Incorreta. Vesículas e exsudação são mais compatíveis com eczema agudo, infecção ou dermatite atópica intensa.
B — Incorreta. Liquenificação decorre de prurido e coçadura crônicos e não é característica da crosta láctea do lactente.
C — Incorreta. Há descamação, mas aumento de IgE não é característica necessária da dermatite seborreica.`,

        'cm-dermatologia-018': `Resposta correta — D. Introdução recente de hidantoína seguida de febre, mal-estar, lesões em alvo, bolhas, desprendimento menor que 10% e erosão mucosa caracteriza síndrome de Stevens-Johnson por anticonvulsivante. O diagnóstico é predominantemente clínico e exige suspensão imediata do fármaco e suporte hospitalar especializado.

Distratores:
A — Incorreta. Pênfigo foliáceo raramente acomete mucosa e tem curso mais crônico; imunofluorescência não deve atrasar retirada do medicamento suspeito.
B — Incorreta. Lúpus cutâneo subagudo causa placas anulares ou papuloescamosas fotoexpostas, não necrólise epidérmica aguda com mucosite.
C — Incorreta. Síndrome da pele escaldada estafilocócica é mais comum em crianças, poupa mucosas e decorre de toxina, não da hidantoína.

Ressalva de segurança — biópsia pode apoiar casos duvidosos, mas não é necessária para reconhecer e tratar imediatamente uma apresentação clínica típica.`,

        'cm-dermatologia-019': `Resposta correta — C. Vesículas, eritema, fissuras e prurido nas mãos, com melhora nas férias, indicam dermatite de contato ocupacional. Em profissional de saúde, causas incluem irritantes por lavagem repetida e desinfetantes ou alergia a látex e componentes de luvas.

Distratores:
A — Incorreta. Localização descoberta não comprova fotodermatite, e a relação com trabalho é mais forte que exposição solar.
B — Incorreta. Ceratose actínica é lesão áspera por dano solar crônico, não eczema vesicular flutuante.
D — Incorreta. Melhorar longe do trabalho reforça, em vez de afastar, etiologia ocupacional alérgica ou irritativa.`,

        'cm-dermatologia-020': `Resposta correta — A. Placas anulares descamativas com clareamento central e contato com cão alopécico sugerem tinea corporis zoonótica. Como houve falha ao clotrimazol e há múltiplos locais, deve-se confirmar com raspado para KOH/cultura e, se positivo, usar antifúngico sistêmico como terbinafina, além de tratar o animal.

Distratores:
B — Incorreta. Fluconazol em dose única de 200 mg não é esquema adequado para tinea corporis extensa.
C — Incorreta. Repetir o mesmo tópico que falhou sem confirmar diagnóstico pode atrasar tratamento e não aborda extensão/animal reservatório.
D — Incorreta. Combinação com corticoide pode mascarar e piorar dermatofitose, causando tinea incognito.`,

        'cm-dermatologia-021': `Resposta correta — C. Na cantoplastia, a tentacânula é introduzida longitudinalmente sob a lâmina ungueal, cerca de 3 mm da margem comprometida, avançando até a matriz para guiar a ressecção do segmento responsável pela onicocriptose.

Distratores:
A — Incorreta. A margem comprometida é medial neste caso, não lateral; além disso, recorrências podem exigir tratamento da matriz, não preservação obrigatória.
B — Incorreta. O bloqueio digital tradicionalmente utiliza lidocaína sem vasoconstritor no procedimento descrito pelo caderno.
D — Incorreta. Tecido de granulação exuberante deve ser removido/cauterizado conforme técnica, mesmo sem pus, para permitir cicatrização adequada.`,

        'cm-endocrinologia-001': `Resposta correta — A. Febre, agitação/confusão, taquicardia intensa, tremor, sudorese, perda de peso e aumento cervical sugerem tempestade tireotóxica. Entre as opções, a prioridade é betabloqueio para controlar hiperatividade adrenérgica, desde que não haja insuficiência cardíaca descompensada, associado imediatamente ao tratamento completo.

Distratores:
B — Incorreta. Abstinência alcoólica é diferencial, mas bócio, perda ponderal e sintomas tireotóxicos prévios favorecem crise tireoidiana; benzodiazepínico isolado não bloqueia seus mecanismos.
C — Incorreta. Adenosina trata algumas taquicardias supraventriculares regulares e não a taquicardia sinusal da tireotoxicose.
D — Incorreta. Infecção pode ser gatilho e deve ser investigada, mas antibiótico isolado não trata tempestade tireotóxica.

Ressalva de segurança — o tratamento completo inclui tionamida, depois iodo, corticosteroide, suporte e correção do fator precipitante; esmolol de ação curta pode ser preferido quando há risco cardiovascular.`,

        'cm-endocrinologia-004': `Resposta correta — B. Depressão refratária acompanhada de ganho de peso, pele seca, constipação, irregularidade menstrual e frequência baixa-normal sugere hipotireoidismo. TSH e T4 livre confirmam e classificam disfunção primária ou central.

Distratores:
A — Incorreta. FAN, anti-P ribossomal e anti-Sm investigam lúpus, mas não há manifestações sistêmicas que o tornem principal diferencial.
C — Incorreta. Cortisol salivar e ACTH investigam hipercortisolismo, que costuma causar obesidade central, fraqueza proximal, estrias e hipertensão.
D — Incorreta. Anti-TPO identifica autoimunidade e pode definir etiologia, mas não substitui TSH e T4 livre para diagnosticar função tireoidiana.`,

        'cm-endocrinologia-005': `Resposta correta — B. Poliúria, polidipsia, perda de peso, respiração de Kussmaul, desidratação e alteração de consciência indicam cetoacidose diabética inaugural. Em criança, inicia-se cristaloide isotônico 10–20 mL/kg em uma hora; após expansão inicial, começa-se insulina intravenosa contínua sem bolus e repõe-se potássio conforme nível sérico, diurese e função renal.

Distratores:
A — Incorreta. Bolus de insulina aumenta risco de queda osmótica rápida e edema cerebral; bicarbonato é reservado a acidose extrema com comprometimento específico.
C — Incorreta. Iniciar insulina simultaneamente antes da reposição inicial e oferecer 40–60 mL/kg sem reavaliação pode causar mudanças osmóticas e sobrecarga.
D — Incorreta. Coloide não é fluido inicial de escolha e omitir potássio durante insulinoterapia pode causar hipocalemia grave.

Ressalva de segurança — protocolos pediátricos exigem correção gradual, monitorização neurológica e eletrolítica e ajuste do potássio ao valor inicial; não se administra potássio se houver anúria ou hipercalemia importante.`,

        'cm-endocrinologia-006': `Resposta correta — D. Para compatibilizar o atestado com a identificação trabalhista sem desrespeitar a identidade da paciente, deve-se emitir novo documento com o nome civil necessário à identificação formal e manter o nome social em campo próprio, com tratamento respeitoso e sigilo.

Distratores:
A — Incorreta. Substituir integralmente o nome social pelo civil apaga a identificação escolhida e não observa o direito ao uso do nome social.
B — Incorreta. CID não deve ser incluído sem autorização expressa da paciente e não resolve a divergência cadastral alegada pela empresa.
C — Incorreta. Revelar à empresa que se trata de pessoa trans viola confidencialidade e expõe dado sensível sem necessidade ou consentimento.

Ressalva jurídica — a forma documental deve observar a norma vigente do conselho profissional e a finalidade do documento. O princípio central é permitir identificação inequívoca, preservar o nome social e não revelar identidade de gênero ou diagnóstico sem consentimento.`,

        'cm-endocrinologia-007': `Resposta correta — B. Nódulos endurecidos em locais de aplicação sugerem lipohipertrofia, que torna a absorção da insulina errática e contribui para hiperglicemia apesar de doses muito altas. Antes de aumentar a dose, deve-se manter temporariamente o esquema e encaminhar à enfermagem para revisar técnica, rodízio, agulhas e armazenamento, com monitorização ao mudar os locais.

Distratores:
A — Incorreta. Aumentar insulina sem corrigir a aplicação pode ampliar variabilidade e causar hipoglicemia quando o paciente passar a injetar em tecido normal.
C — Incorreta. Insulina regular não substitui a necessidade basal da NPH e psicologia não corrige a alteração física observada.
D — Incorreta. Sulfonilureia acrescenta pouco em provável insulinopenia avançada e aumenta hipoglicemia; atividade física não é o único pilar ausente.`,

        'cm-endocrinologia-008': `Resposta correta — C. Hemoglobina glicada de 9,5% apesar de metformina e gliclazida em uso regular indica necessidade de intensificação. Pode-se manter os orais e iniciar NPH basal com 10 UI à noite, titulando 2–3 UI a cada 2–3 dias conforme glicemia de jejum até a meta.

Distratores:
A — Incorreta. Suspender todos os orais e começar duas doses em valores fixos aumenta complexidade e risco de hipoglicemia sem tentativa de titulação basal simples.
B — Incorreta. Metformina 3 g/dia excede doses usuais recomendadas e adiar insulinização mantém hiperglicemia importante.
D — Incorreta. Glibenclamida traz maior risco de hipoglicemia que gliclazida e o aumento excessivo da metformina permanece inadequado.`,

        'cm-endocrinologia-009': `Resposta correta — C. Diabetes tipo 1 sem insulina, hálito cetótico, desidratação, dor abdominal, vômitos, taquipneia e torpor caracterizam cetoacidose diabética. A primeira medida terapêutica é reposição com solução fisiológica a 0,9%, seguida de potássio e insulina intravenosa conforme exames e protocolo.

Distratores:
A — Incorreta. Pancreatite é diferencial, mas não explica de forma tão completa suspensão de insulina, cetose e respiração profunda; jejum isolado não trata choque metabólico.
B — Incorreta. Estado hiperosmolar predomina em diabetes tipo 2, com osmolaridade muito alta e pouca cetose; insulina não precede ressuscitação volêmica.
D — Incorreta. Insuficiência renal não é a hipótese principal, e bicarbonato só é considerado em acidemia extrema, não de rotina.

Validação documental pendente — os exames laboratoriais anunciados foram omitidos. Glicemia, pH, bicarbonato, ânion gap, cetonemia, sódio corrigido, potássio e função renal devem ser conferidos no PDF-fonte para classificar gravidade e ajustar o tratamento.`,

        'cm-endocrinologia-010': `Resposta correta — D. T-score de −2,5 confirma osteoporose, e uso crônico de corticoide aumenta ainda mais o risco de fratura. Está indicado bisfosfonato oral se não houver contraindicação, associado a cálcio e vitamina D adequados e exercícios regulares com carga, força e equilíbrio.

Distratores:
A — Incorreta. Estrogênio oral não é primeira escolha aos 65 anos pelo risco tromboembólico e cardiovascular, e restrição indiscriminada de atividade reduz benefício ósseo.
B — Incorreta. Calcitonina tem efeito antifratura limitado e não é terapia de primeira linha para prevenção crônica.
C — Incorreta. Vitamina D isolada não trata osteoporose estabelecida nem neutraliza o risco dos corticoides.`,

        'cm-endocrinologia-011': `Resposta correta — D. TSH elevado e T4 livre baixo confirmam hipotireoidismo manifesto na gestação. Após iniciar levotiroxina, o TSH deve ser dosado aproximadamente a cada quatro semanas até atingir a meta e após mudanças de dose; controle adequado reduz complicações, incluindo parto prematuro.

Distratores:
A — Incorreta. T4 livre pode complementar, mas a monitorização de rotina do hipotireoidismo primário se guia principalmente por TSH; macrossomia não é a complicação central.
B — Incorreta. T3 livre não é parâmetro para ajuste da levotiroxina e não orienta prevenção de abortamento.
C — Incorreta. T4 livre isolado é menos confiável na gestação e não substitui TSH para seguimento do hipotireoidismo primário.`,

        'cm-endocrinologia-012': `Resposta correta — D. Diabetes tipo 2 com infarto prévio configura doença cardiovascular aterosclerótica estabelecida. Deve-se associar inibidor de SGLT2 com benefício cardiovascular, independentemente de a glicemia parecer estável, mantendo metformina se tolerada e função renal permitir.

Distratores:
A — Incorreta. A relação albumina/creatinina em amostra isolada é preferida ao volume urinário de 24 horas para rastrear doença renal; manter apenas metformina perde proteção cardiovascular adicional.
B — Incorreta. Acompanhamento habitual sem intensificação não aborda o risco cardiovascular residual.
C — Incorreta. Insulina não é indicada apenas por antecedente de infarto e não oferece a mesma proteção cardiorrenal específica.`,

        'cm-endocrinologia-013': `Resposta correta — B. Cefaleia episódica, sudorese, taquicardia e hipertensão paroxística formam a tríade clássica de feocromocitoma. A confirmação bioquímica é feita com metanefrinas plasmáticas livres ou urinárias fracionadas, seguida de localização por imagem.

Distratores:
A — Incorreta. Hipertireoidismo causa taquicardia e sudorese geralmente persistentes, com TSH suprimido, não crises hipertensivas paroxísticas típicas.
C — Incorreta. Síndrome carcinoide cursa com rubor, diarreia e broncoespasmo e é investigada com 5-HIAA.
D — Incorreta. Hiperaldosteronismo causa hipertensão sustentada, hipocalemia e renina suprimida, sem a tríade episódica.

Validação documental pendente — os resultados dos exames citados não foram preservados. Metanefrinas/catecolaminas e eventual imagem adrenal devem ser conferidas no PDF-fonte antes da publicação definitiva.`,

        'cm-endocrinologia-014': `Resposta correta — D. Na doença de Graves, anticorpos estimuladores do receptor de TSH causam produção difusa de hormônios. A cintilografia mostra captação elevada e homogênea em toda a glândula, com TSH suprimido e T4 livre/T3 elevados.

Distratores:
A — Incorreta. TRAb costuma estar elevado, e anti-TPO pode também ser positivo; níveis reduzidos não apoiam Graves.
B — Incorreta. Ultrassom geralmente mostra glândula difusamente hipoecoica e hipervascular, não múltiplos cistos como característica diagnóstica.
C — Incorreta. O padrão laboratorial está invertido: no hipertireoidismo primário, TSH cai e hormônios livres sobem.`,

        'cm-endocrinologia-015': `Resposta correta — D. Úlcera plantar sobre ponto de pressão, cercada por hiperqueratose, com pulsos preservados e sem sinais inflamatórios é úlcera neuropática do pé diabético. O tratamento inclui curativo adequado, avaliação de profundidade e infecção e, sobretudo, descarga de pressão com adaptação de calçado/palmilha.

Distratores:
A — Incorreta. Simpatectomia seria medida excepcional para isquemia selecionada; a perfusão está preservada.
B — Incorreta. Enxerto não é primeira abordagem enquanto persistirem pressão repetitiva e possível neuropatia; o leito granulado pode cicatrizar com descarga.
C — Incorreta. Compressão trata edema/úlcera venosa e pode ser inadequada sem indicação vascular.`,

        'cm-endocrinologia-017': `Resposta correta — A. O quadro é cetoacidose diabética por deficiência absoluta de insulina. O potássio sérico pode estar normal ou alto pela acidose e falta de insulina, mas o estoque corporal total está reduzido por diurese osmótica, vômitos e hiperaldosteronismo secundário.

Distratores:
B — Incorreta. Cortisol tende a aumentar como hormônio contrarregulador durante o estresse metabólico.
C — Incorreta. Insulina está reduzida, mas sódio sérico pode estar baixo, normal ou alto conforme hiperglicemia e perdas; não é a associação fisiopatológica constante.
D — Incorreta. Glucagon tende a estar elevado e contribui para cetogênese; sódio também é variável.`,

        'cm-endocrinologia-018': `Resposta correta — B. Mulher recém-menopausada, sem fratura ou fatores maiores além de sedentarismo, deve receber prevenção primária com alimentação rica em cálcio e vitamina D, exposição solar segura, exercícios com carga e fortalecimento, prevenção de quedas e redução de fatores de risco.

Distratores:
A — Incorreta. Suplementação não é automática se a dieta é suficiente, e densitometria aos 55 anos não é indicada rotineiramente sem risco elevado.
C — Incorreta. Densitometria e antiosteoporótico não são necessários neste momento apenas pelo início da menopausa.
D — Incorreta. A história menstrual já define menopausa; dosagens hormonais são desnecessárias e terapia estrogênica não é usada apenas para prevenção óssea em assintomática.`,

        'cm-endocrinologia-019': `Resposta correta — C. Espasmo carpopedal induzido pelo manguito é sinal de Trousseau, e contração facial à percussão é sinal de Chvostek. Parestesias e QT prolongado completam o quadro de hipocalcemia, possível na pancreatite por saponificação de gordura.

Distratores:
A — Incorreta. Hipocalemia pode causar fraqueza e alterações de onda U, mas não tetania e QT prolongado típicos.
B — Incorreta. Hiperglicemia não produz sinais de Trousseau e Chvostek.
D — Incorreta. Hipercalcemia encurta o QT e tende a causar constipação, poliúria e alteração mental, não hiperexcitabilidade neuromuscular.`,

        'cm-endocrinologia-020': `Resposta correta — D. Clínica típica de Graves com bócio difuso e oftalmopatia pode ser confirmada pela presença de anticorpos contra o receptor de TSH (TRAb), teste específico que também ajuda quando se deseja evitar cintilografia.

Distratores:
A — Incorreta. Captação de iodo pode diferenciar etiologias, mas é menos necessária quando há oftalmopatia típica e TRAb disponível; é contraindicada na gestação.
B — Incorreta. Ultrassom avalia anatomia e vascularização, mas não confirma sozinho a etiologia autoimune.
C — Incorreta. PAAF é indicada para nódulos suspeitos, não para bócio difuso não nodular.`,

        'cm-endocrinologia-021': `Resposta correta — C. Na abordagem imediata da cetoacidose diabética, a primeira intervenção terapêutica é restaurar perfusão com cerca de 1 litro de solução fisiológica a 0,9% na primeira hora no adulto, ajustando volume e velocidade à idade, coração e rins. Depois, potássio e insulina são guiados pelos exames.

Distratores:
A — Incorreta. Os exames estão indicados, mas a questão pede abordagem imediata; sua coleta não deve atrasar hidratação.
B — Incorreta. NPH subcutânea não trata a fase aguda, e insulina intravenosa só começa após avaliar potássio e iniciar volume.
D — Incorreta. Cetoacidose exige remoção precoce para hospital capaz de monitorizar e tratar; não se aguarda 24 horas nem convulsão/anúria.`,

        'cm-endocrinologia-022': `Resposta correta — A. Bethesda V significa suspeito para malignidade, com risco suficientemente alto para indicar encaminhamento cirúrgico. A extensão da operação depende do tamanho, ultrassom, linfonodos, fatores de risco e preferência, mas simples observação não é adequada.

Distratores:
B — Incorreta. Repetir PAAF pode atrasar tratamento e não elimina o alto risco já demonstrado.
C — Incorreta. Cintilografia é útil quando TSH está suprimido para identificar nódulo hiperfuncionante; função tireoidiana é normal e citologia já é suspeita.
D — Incorreta. Vigilância semestral é reservada a nódulos de baixo risco/benignos, não Bethesda V.`,

        'cm-endocrinologia-023': `Resposta correta — A. Poliúria/enurese, polidipsia implícita, polifagia, perda ponderal, desidratação e respiração de Kussmaul indicam diabetes tipo 1 com cetoacidose. Após estabilização, trata-se de doença crônica que exige insulina contínua, educação e forte apoio familiar para prevenir descompensações e complicações.

Distratores:
B — Incorreta. Desmopressina e alarme tratam enurese primária, mas a enurese aqui é consequência de diurese osmótica.
C — Incorreta. A “lua de mel” do diabetes tipo 1 é transitória, não dura décadas, e não permite suspender definitivamente a insulina.
D — Incorreta. Estilo de vida é importante, porém não substitui reposição de insulina no diabetes tipo 1.`,

        'cm-endocrinologia-024': `Resposta correta — B. Hipertireoidismo grave com bócio difuso, frêmito e oftalmopatia caracteriza Graves. Metimazol reduz síntese hormonal e propranolol controla taquicardia, tremor e sintomas adrenérgicos enquanto o antitireoidiano faz efeito.

Distratores:
A — Incorreta. Levotiroxina agravaria tireotoxicose.
C — Incorreta. Radioiodo pode piorar oftalmopatia ativa e não oferece controle imediato; atenolol isolado não bloqueia produção hormonal.
D — Incorreta. Propranolol é útil, mas radioiodo não é a melhor escolha inicial na presença de oftalmopatia evidente.

Ressalva técnica — antes de metimazol, avaliam-se hemograma e função hepática e orientam-se sinais de agranulocitose. Situação gestacional deve ser excluída; no primeiro trimestre, propiltiouracil costuma ser preferido.`,

        'cm-endocrinologia-025': `Resposta correta — D. Hipercalcemia com PTH elevado indica hiperparatireoidismo primário. Mesmo assintomática, T-score menor ou igual a −2,5 é critério de paratireoidectomia por comprometimento esquelético; cálculos, nefrocalcinose e hipercalciúria também reforçam a indicação.

Distratores:
A — Incorreta. Colelitíase não é critério cirúrgico do hiperparatireoidismo.
B — Incorreta. Idade inferior a 50 anos favorece cirurgia; ter mais de 50 não é indicação isolada.
C — Incorreta. Tamanho/localização no sestamibi orienta a abordagem, mas não define por si só necessidade de operar.

Ressalva técnica — o SPECT é exame de localização pré-operatória, não diagnóstico. A indicação já está estabelecida pelas complicações ósseas e renais.`

        ,'cm-endocrinologia-026': `Resposta correta — C. O nódulo mede 1 cm e apresenta padrão espongiforme, limites regulares, orientação mais larga que alta e ausência de calcificações, conjunto de baixíssimo risco ultrassonográfico. Com função tireoidiana normal e sem sinais clínicos de alarme, a conduta é acompanhamento clínico e ultrassonográfico, sem intervenção imediata.

Distratores:
A — Incorreta. Supressão de TSH com levotiroxina não é recomendada para nódulo benigno/eutireoidiano, pois oferece pouco benefício e pode causar tireotoxicose iatrogênica.
B — Incorreta. Cirurgia fica reservada a suspeita de malignidade, sintomas compressivos, crescimento relevante ou outras indicações específicas.
D — Incorreta. Um nódulo espongiforme de 1 cm não atinge, em regra, o limiar de tamanho para PAAF nesse padrão de risco.

Revisão do sinalizador — embora a questão tenha sido marcada como dependente de imagem, o enunciado descreve integralmente os achados ultrassonográficos necessários para a decisão.`

        ,'cm-endocrinologia-027': `Resposta correta — D. Nódulo tireoidiano endurecido e aderido, associado a linfonodos cervicais ipsilaterais, é suspeito para câncer de tireoide. A avaliação inicial deve incluir ultrassonografia cervical, abrangendo tireoide e cadeias linfonodais, seguida de PAAF do nódulo e/ou linfonodo suspeito conforme os achados.

Distratores:
A — Incorreta. Bócio simples costuma ser difuso ou multinodular e não explica bem fixação do nódulo e linfonodomegalias; tomografia contrastada não é o primeiro exame de caracterização.
B — Incorreta. Hashimoto geralmente produz alteração difusa da glândula e confirmação clínica/laboratorial; ressonância não é exame inicial de rotina.
C — Incorreta. Cisto do ducto tireoglosso costuma ser mediano e mover-se com deglutição ou protrusão da língua, não se localizar como nódulo suspeito em lobo tireoidiano.`

        ,'cm-endocrinologia-028': `Resposta correta — C. A criança apresenta cetoacidose diabética e, durante o tratamento, evolui com rebaixamento da consciência e bradicardia, sinais de hipertensão intracraniana por edema cerebral. A terapia deve ser imediata, com manitol intravenoso na dose de 0,5 a 1 g/kg, sem aguardar confirmação por imagem.

Distratores:
A — Incorreta. Bicarbonato não trata edema cerebral e, na cetoacidose, é reservado a acidemia extrema em situações selecionadas; seu uso indiscriminado pode aumentar riscos.
B — Incorreta. Glicose é acrescentada quando a glicemia cai durante a correção para permitir continuidade da insulina, mas um bolus não trata hipertensão intracraniana.
D — Incorreta. Reposição de potássio integra o manejo conforme a concentração sérica e a diurese, porém não corrige a complicação neurológica aguda.`

        ,'cm-endocrinologia-029': `Resposta correta — B. Todo nódulo tireoidiano deve ser inicialmente estratificado com ultrassonografia da tireoide e do pescoço, que define composição, características de risco, dimensões e linfonodos e orienta a necessidade e o alvo da PAAF. TSH também faz parte da avaliação laboratorial inicial.

Distratores:
A — Incorreta. Cintilografia é indicada sobretudo quando o TSH está baixo, para avaliar autonomia funcional; não é o primeiro exame anatômico universal.
C — Incorreta. História familiar aumenta a atenção, mas não autoriza cirurgia sem estratificação ultrassonográfica e citológica apropriada.
D — Incorreta. Pelo tamanho, a PAAF provavelmente será indicada, mas deve ser orientada pela ultrassonografia e por sua classificação de risco, não solicitada às cegas como primeiro passo isolado.`

        ,'cm-endocrinologia-030': `Resposta correta — B. Entre as alternativas, o metimazol é o tratamento indicado para bloquear a síntese de novos hormônios na doença de Graves e integra o controle medicamentoso da crise tireotóxica, associado a medidas de suporte, betabloqueio, corticosteroide e iodo administrado após a tionamida.

Distratores:
A — Incorreta. Iodo radioativo tem ação tardia e não deve ser utilizado para controle agudo de tempestade tireoidiana.
C — Incorreta. Tireoidectomia subtotal não é abordagem inicial durante a descompensação grave e deixou de ser a técnica definitiva preferencial na maioria dos casos.
D — Incorreta. Tireoidectomia total pode ser tratamento definitivo em casos selecionados, mas exige estabilização clínica prévia e não constitui o controle inicial da crise.

Ressalva técnica — em tempestade tireoidiana, muitos protocolos preferem propiltiouracil inicialmente por também reduzir a conversão periférica de T4 em T3. Como ele não aparece nas alternativas, preserva-se o gabarito oficial B; metimazol continua sendo uma tionamida eficaz e pode ser usado conforme o protocolo e o contexto clínico.`

        ,'cm-gastroenterologia-001': `Resposta correta — D. Após ingestão de cáustico, a paciente deve permanecer em jejum, receber estabilização e avaliação de via aérea e realizar endoscopia digestiva alta, em geral entre 6 e 24 horas, para graduar a lesão e orientar prognóstico e tratamento. Evita-se endoscopia muito tardia na fase de maior friabilidade.

Distratores:
A — Incorreta. Lavagem gástrica e passagem cega de sonda podem provocar nova exposição e perfuração.
B — Incorreta. Neutralização química é contraindicada por poder gerar reação exotérmica e agravar a queimadura.
C — Incorreta. Corticoide e antibiótico profiláticos não são indicados rotineiramente; dependem do grau da lesão e de complicações específicas.`

        ,'cm-gastroenterologia-002': `Resposta correta — B. Icterícia obstrutiva progressiva, prurido, emagrecimento, dor irradiada para dorso e vesícula palpável e indolor (sinal de Courvoisier) sugerem neoplasia periampular, especialmente de cabeça de pâncreas. Tomografia de abdome com protocolo pancreático avalia massa, vias biliares, extensão e ressecabilidade.

Distratores:
A — Incorreta. Colecistite calculosa costuma causar dor e sinais inflamatórios e não explica bem vesícula indolor com emagrecimento e icterícia progressiva.
C — Incorreta. Colangiorressonância detalha a árvore biliar, mas o conjunto aponta primeiro para neoplasia pancreática, cuja avaliação inicial e estadiamento exigem tomografia.
D — Incorreta. Biópsia percutânea da vesícula/massa palpada não é a abordagem inicial e pode ser desnecessária ou prejudicial em tumor potencialmente ressecável.`

        ,'cm-gastroenterologia-003': `Resposta correta — D. Dor epigástrica recorrente irradiada para dorso em alcoolista de longa data sugere pancreatite crônica, que pode apresentar exacerbações dolorosas e evoluir com calcificações, insuficiência exócrina e diabetes. Enzimas pancreáticas podem estar normais fora de agudização importante.

Distratores:
A — Incorreta. Colangite exige tipicamente obstrução biliar com febre, icterícia e dor em hipocôndrio direito, ausentes no caso.
B — Incorreta. Colecistite costuma causar dor contínua em hipocôndrio direito, febre e sinal de Murphy.
C — Incorreta. Úlcera péptica pode causar epigastralgia, mas a irradiação dorsal recorrente e a exposição alcoólica intensa favorecem doença pancreática.

Validação documental pendente — os resultados laboratoriais mencionados no enunciado não foram preservados na importação e devem ser conferidos no PDF-fonte.`

        ,'cm-gastroenterologia-004': `Resposta correta — C. Perda involuntária de cerca de 20% do peso é sinal de alarme em paciente com dispepsia persistente e resposta incompleta ao inibidor de bomba de prótons. É necessário excluir câncer gástrico com endoscopia digestiva alta e biópsias das lesões suspeitas.

Distratores:
A — Incorreta. Dispepsia funcional é diagnóstico após avaliação apropriada e não deve ser presumida diante de perda ponderal expressiva.
B — Incorreta. Colelitíase causa mais frequentemente dor biliar em hipocôndrio direito/epigástrio, não justifica o conjunto e não afasta a necessidade de endoscopia.
D — Incorreta. pHmetria é usada em situações selecionadas de refluxo, mas não é o primeiro exame diante de sinal de alarme para neoplasia.`

        ,'cm-gastroenterologia-005': `Resposta correta — D. Dor epigástrica, esteatorreia, emagrecimento, alcoolismo prolongado e calcificações pancreáticas extensas confirmam pancreatite crônica com insuficiência exócrina. O manejo inclui abstinência alcoólica, analgesia, suporte nutricional e reposição de enzimas pancreáticas com as refeições.

Distratores:
A — Incorreta. Não há evidência tomográfica ou laboratorial de pancreatite aguda que imponha jejum e hidratação venosa como tratamento principal.
B — Incorreta. Não foi descrita massa pancreática ou outra evidência de câncer que justifique estadiamento e cirurgia.
C — Incorreta. CPRE é invasiva e fica reservada a indicações terapêuticas específicas, como obstrução ductal selecionada, não ao manejo inicial sem dilatação/complicação descrita.

Ressalva técnica — a hematêmese requer avaliação e tratamento próprios da hemorragia digestiva alta. O enantema antral deve ser correlacionado à endoscopia, mas não modifica o diagnóstico pancreático crônico responsável pela esteatorreia.`

        ,'cm-gastroenterologia-006': `Resposta correta — C. Após falha de esquema com claritromicina e exposição prévia a macrolídeos e fluoroquinolonas, deve-se evitar essas classes e usar terapia quádrupla com bismuto por 14 dias: inibidor de bomba de prótons, bismuto, tetraciclina (ou alternativa prevista no esquema) e metronidazol.

Distratores:
A — Incorreta. Levofloxacino deve ser evitado diante do uso recorrente de fluoroquinolonas e provável resistência; sete dias também é duração insuficiente para esse resgate.
B — Incorreta. O esquema reutiliza claritromicina e acrescenta levofloxacino, justamente duas classes com alto risco de resistência no caso.
D — Incorreta. Apesar do bismuto, inclui levofloxacino e duração de apenas dez dias, escolhas inadequadas para o perfil informado.

Ressalva técnica — a formulação clássica usa tetraciclina; a alternativa apresenta doxiciclina. Preserva-se o gabarito C por ser a única opção que evita macrolídeo e fluoroquinolona e reproduz a lógica da terapia quádrupla com bismuto.`

        ,'cm-gastroenterologia-007': `Resposta correta — C. Para pessoa assintomática de risco habitual, o rastreamento populacional pode começar por pesquisa de sangue oculto nas fezes; resultado positivo indica colonoscopia para investigação. A estratégia respeita organização e disponibilidade do sistema público.

Distratores:
A — Incorreta. Judicialização não é via clínica de solicitação de exame, e colonoscopia não precisa ser o teste inicial em todo indivíduo assintomático.
B — Incorreta. Colonoscopia pode integrar estratégias de rastreamento em determinados protocolos, mas a questão pede a conduta inicial alinhada à política pública descrita.
D — Incorreta. É errado negar rastreamento e encaminhar simplesmente ao setor privado; o SUS dispõe de estratégia baseada em avaliação de risco e pesquisa de sangue oculto.

Ressalva técnica — programas e faixas etárias de rastreamento colorretal variam conforme diretriz e capacidade local. A justificativa acima preserva o gabarito oficial e o cenário explicitado pela questão.`

        ,'cm-gastroenterologia-008': `Resposta correta — A. Dor epigástrica recorrente irradiada para dorso e etilismo prolongado levantam suspeita de pancreatite crônica. A tomografia pesquisa calcificações e alterações estruturais; para dor neuropática persistente, antidepressivo tricíclico como amitriptilina pode ser usado como adjuvante analgésico.

Distratores:
B — Incorreta. CPRE não é exame diagnóstico inicial por ser invasiva e ter risco de pancreatite; é reservada sobretudo a tratamento de alterações ductais selecionadas.
C — Incorreta. Ácido ursodesoxicólico é utilizado em doenças biliares específicas e não trata a dor da pancreatite crônica alcoólica.
D — Incorreta. Além de a CPRE não ser o exame inicial, enzimas pancreáticas são indicadas principalmente para insuficiência exócrina/esteatorreia e não são analgésico de primeira escolha.`

        ,'cm-gastroenterologia-009': `Resposta correta — D. Estenose péptica distal com biópsias sem malignidade é tratada inicialmente com dilatação endoscópica para aliviar a disfagia e supressão ácida potente e prolongada com inibidor de bomba de prótons para cicatrizar esofagite e reduzir recorrência.

Distratores:
A — Incorreta. Esofagectomia é cirurgia de grande porte reservada a câncer ou doença excepcionalmente refratária, não à estenose péptica benigna inicial.
B — Incorreta. Toxina botulínica é opção para acalasia em pacientes selecionados, não para estenose estrutural por refluxo.
C — Incorreta. Fundoplicatura pode ser considerada depois em refluxo selecionado, mas não substitui a dilatação inicial da estenose sintomática nem o tratamento ácido.`

        ,'cm-gastroenterologia-010': `Resposta correta — D. Homem oriundo de zona rural da Bahia com disfagia progressiva, regurgitação de alimento retido e perda ponderal pode ter megaesôfago por doença de Chagas. A investigação etiológica deve incluir sorologia para Trypanosoma cruzi, associada à avaliação anatômica e funcional do esôfago.

Distratores:
A — Incorreta. Radiografia de tórax pode mostrar dilatação ou nível hidroaéreo, mas não define a etiologia e tem menor rendimento que exames dirigidos.
B — Incorreta. CA 19-9 é marcador associado sobretudo a neoplasias pancreatobiliares e não investiga disfagia por provável megaesôfago.
C — Incorreta. Ressonância de tórax não é exame inicial para essa hipótese; endoscopia, esofagograma e manometria são avaliações mais pertinentes.

Ressalva técnica — disfagia progressiva com perda ponderal também exige endoscopia para excluir neoplasia/pseudoacalasia. A sorologia responde especificamente à etiologia mais provável solicitada no enunciado.`

        ,'cm-gastroenterologia-011': `Resposta correta — B. Diarreia crônica com sangue e muco, urgência fecal, emagrecimento e dor predominante em abdome inferior sugerem retocolite ulcerativa, doença inflamatória que começa no reto e se estende continuamente pelo cólon. A idade jovem e a ausência de síndrome infecciosa aguda reforçam a hipótese.

Distratores:
A — Incorreta. Tumor de retossigmoide pode causar sangramento e perda ponderal, mas é menos provável aos 29 anos e não explica tão bem o padrão inflamatório crônico com urgência e muco.
C — Incorreta. Diverticulite causa dor aguda em fossa ilíaca esquerda, geralmente com febre e alteração inflamatória, mas não episódios crônicos de diarreia sanguinolenta e emagrecimento.
D — Incorreta. Colite isquêmica é mais comum em idosos ou pessoas com fatores vasculares e costuma ter início súbito de dor seguido de hematoquezia.`

        ,'cm-gastroenterologia-012': `Resposta correta — D. Sangramento visível nas fezes por dois meses associado a palidez não é situação de rastreamento, mas de investigação diagnóstica. A colonoscopia permite examinar todo o cólon, identificar a fonte do sangramento e realizar biópsia ou intervenção quando necessário.

Distratores:
A — Incorreta. Pesquisa de sangue oculto é teste de rastreamento em assintomáticos e não agrega quando já há sangramento macroscópico.
B — Incorreta. Ultrassonografia abdominal não avalia adequadamente a mucosa colorretal nem substitui colonoscopia nesse cenário.
C — Incorreta. Tomografia pode complementar estadiamento ou avaliar determinadas complicações, mas não é o exame inicial preferencial para sangramento crônico baixo e não permite biópsia.`

        ,'cm-gastroenterologia-013': `Resposta correta — D. Ressangramento após hemostasia endoscópica inicial, com o paciente hemodinamicamente estável, deve ser tratado primeiro por nova endoscopia com tentativa de controle local. Cirurgia ou embolização são reservadas para falha endoscópica ou instabilidade em contexto apropriado.

Distratores:
A — Incorreta. Gastrectomia total é excessivamente agressiva e não é indicada antes de nova tentativa endoscópica.
B — Incorreta. Antrectomia e vagotomia não constituem o passo seguinte de rotina na era da hemostasia endoscópica e terapia antissecretora.
C — Incorreta. Inibidor de bomba de prótons intravenoso é obrigatório após hemostasia, mas ressangramento manifesto requer reavaliação e nova intervenção endoscópica, não apenas tratamento clínico.`

        ,'cm-gastroenterologia-014': `Resposta correta — D. Dor abdominal recorrente relacionada à evacuação, alternância entre constipação e fezes amolecidas, ausência de sinais de alarme e extensa investigação negativa caracterizam síndrome do intestino irritável. Ansiedade pode modular e agravar os sintomas sem torná-los imaginários.

Distratores:
A — Incorreta. Doença celíaca pode causar diarreia e perda ponderal, mas a sorologia negativa e o padrão de alternância com alívio após evacuação tornam-na menos provável.
B — Incorreta. Câncer colorretal é improvável pela longa estabilidade, idade, ausência de sangramento/perda ponderal/anemia e exames negativos.
C — Incorreta. Retocolite ulcerativa costuma produzir diarreia inflamatória com sangue, muco, urgência e alterações endoscópicas ou laboratoriais.`

        ,'cm-gastroenterologia-015': `Resposta correta — B. Dor crônica pós-prandial, emagrecimento e esteatorreia em tabagista e etilista de longa data apontam para pancreatite crônica com insuficiência exócrina. O tratamento inclui cessar álcool e tabaco, dieta adequada, analgesia e reposição enzimática quando há má absorção.

Distratores:
A — Incorreta. Pancreatite aguda tem início súbito e manejo inicial hospitalar; três meses de sintomas com esteatorreia indicam doença crônica.
C — Incorreta. Hepatite alcoólica costuma causar icterícia, febre, hepatomegalia e alterações de provas hepáticas, não esteatorreia pancreática típica.
D — Incorreta. Cirrose se manifesta por estigmas de hepatopatia/hipertensão portal e não é diagnosticada por biópsia de rotina nesse quadro; também não explica melhor a dor pós-prandial com gordura nas fezes.`

        ,'cm-gastroenterologia-016': `Resposta correta — C. Diarreia crônica com sangue e muco, urgência, tenesmo, dor abdominal e perda ponderal em adulta jovem é apresentação clássica de retocolite ulcerativa, cuja inflamação envolve reto e cólon de modo contínuo.

Distratores:
A — Incorreta. Câncer colorretal deve ser investigado, especialmente com história familiar, mas aos 25 anos é menos provável e o padrão de urgência, tenesmo e diarreia inflamatória crônica favorece DII.
B — Incorreta. Crohn pode causar diarreia e perda ponderal, porém costuma ter acometimento segmentar, dor, doença perianal e sangue menos constante; o quadro retal contínuo é mais compatível com retocolite.
D — Incorreta. Hemorroidas explicam sangue vivo, mas não diarreia crônica, muco, dor, tenesmo, cansaço e perda de peso.`

        ,'cm-gastroenterologia-017': `Resposta correta — A. Diarreia sanguinolenta crônica, tenesmo, cólicas, artrite periférica e eritema nodoso indicam doença inflamatória intestinal. Colonoscopia com biópsias permite avaliar padrão e extensão da mucosa e confirmar histologicamente a hipótese, após investigação infecciosa apropriada.

Distratores:
B — Incorreta. Isospora e Cryptosporidium causam sobretudo diarreia aquosa em imunossuprimidos e não explicam bem sangue, tenesmo e manifestações extraintestinais típicas.
C — Incorreta. Antibióticos aumentam risco de C. difficile, mas o curso de três meses com artrite e eritema nodoso favorece DII; a pesquisa pode integrar o descarte infeccioso, não confirma a principal hipótese.
D — Incorreta. Amebíase pode causar colite sanguinolenta após exposição sanitária, porém não explica tão bem o conjunto de manifestações extraintestinais inflamatórias e precisa ser diferenciada antes de imunossupressão.`

        ,'cm-gastroenterologia-018': `Resposta correta — A. Pápulas eritematosas pruriginosas após nimesulida, sem comprometimento respiratório, cardiovascular ou gastrointestinal, sugerem urticária aguda medicamentosa sem anafilaxia. Deve-se suspender o agente e usar anti-histamínico de segunda geração, com cuidados simples para conforto cutâneo.

Distratores:
B — Incorreta. Epinefrina é indicada em anafilaxia e deve ser intramuscular na face anterolateral da coxa, não subcutânea; não há critérios sistêmicos no caso.
C — Incorreta. Sem angioedema de via aérea, dispneia, hipotensão ou progressão sistêmica, observação em pronto-socorro não é obrigatória apenas pelo risco teórico.
D — Incorreta. Corticoides tópicos têm pouca utilidade na urticária e corticoide sistêmico não é primeira linha em quadro leve; escalonamento intravenoso por persistência de 24 horas é inadequado.`

        ,'cm-gastroenterologia-019': `Resposta correta — C. Dor abdominal recorrente que melhora após evacuação, alternância de diarreia e constipação, ausência de sintomas noturnos, sangramento, emagrecimento ou esteatorreia e colonoscopia normal caracterizam síndrome do intestino irritável.

Distratores:
A — Incorreta. História familiar eleva vigilância, mas Crohn costuma apresentar sinais inflamatórios, perda ponderal, diarreia noturna, lesões endoscópicas ou doença perianal.
B — Incorreta. Síndrome disabsortiva costuma causar perda ponderal, carências nutricionais e fezes volumosas/gordurosas que podem flutuar.
D — Incorreta. Retocolite ulcerativa provoca diarreia sanguinolenta, urgência e inflamação contínua visível na colonoscopia.`

        ,'cm-gastroenterologia-020': `Resposta correta — B. O quadro é compatível com doença do refluxo gastroesofágico, com sintomas típicos frequentes, manifestações laríngeas e resposta apenas parcial a tratamento empírico. A endoscopia avalia esofagite, Barrett, estenose e diagnósticos alternativos e é a melhor opção oferecida para a investigação inicial desse paciente.

Distratores:
A — Incorreta. pHmetria prolongada documenta refluxo quando o diagnóstico permanece incerto ou antes de determinadas intervenções, sobretudo se a endoscopia for normal, mas não é o primeiro exame escolhido pelo gabarito neste contexto.
C — Incorreta. Esofagografia baritada avalia anatomia e trânsito, mas tem baixa sensibilidade para confirmar refluxo e não permite biópsia.
D — Incorreta. Manometria pesquisa distúrbios motores e localiza o esfíncter antes da pHmetria; não confirma isoladamente DRGE.

Ressalva técnica — sintomas típicos sem alarme frequentemente permitem teste terapêutico otimizado com IBP antes de exames. A endoscopia não confirma todos os casos de DRGE, mas é a alternativa diagnóstica inicial mais adequada entre as apresentadas diante de sintomas persistentes.`

        ,'cm-gastroenterologia-021': `Resposta correta — D. Idosa em choque, com peritonite e pneumoperitônio, após meses de hematoquezia e perda ponderal, provavelmente apresenta câncer colorretal perfurado com contaminação abdominal. Na emergência, resseca-se o segmento acometido e realiza-se colostomia terminal com fechamento do coto distal — procedimento de Hartmann — evitando anastomose em campo séptico e paciente instável.

Distratores:
A — Incorreta. Enterectomia e ileostomia tratariam lesão do intestino delgado, incompatível com a história sugestiva de neoplasia colônica.
B — Incorreta. Anastomose primária tem risco elevado de deiscência diante de choque, peritonite difusa e contaminação.
C — Incorreta. Apenas lavar e drenar não controla a fonte perfurada nem trata o segmento tumoral.`

        ,'cm-gastroenterologia-022': `Resposta correta — C. O paciente tem hemorragia digestiva alta por erosões gastroduodenais associadas a anti-inflamatório, mas está hemodinamicamente estável, com hemoglobina, plaquetas e INR sem indicação transfusional. A conduta inicial inclui jejum, acesso venoso, cristaloide conforme necessidade e inibidor de bomba de prótons, além de suspender o AINE.

Distratores:
A — Incorreta. Plaquetas e plasma são indicados para trombocitopenia/coagulopatia relevantes, ausentes no caso.
B — Incorreta. Hemoglobina de 13 g/dL e estabilidade não justificam transfusão de concentrado de hemácias.
D — Incorreta. Nem hemácias nem plaquetas estão indicadas pelos dados apresentados; transfusão desnecessária expõe a riscos.`

        ,'cm-gastroenterologia-023': `Resposta correta — D. Neoplasia cervical de esôfago avançada, com invasão traqueobrônquica e paralisia de cordas vocais, é irressecável. A gastrostomia oferece via de alimentação enteral paliativa sem manipular a área tumoral obstrutiva e ajuda a manter suporte nutricional.

Distratores:
A — Incorreta. Esofagectomia trans-hiatal não é apropriada para tumor cervical com invasão da via aérea e doença local avançada.
B — Incorreta. Tunelização cirúrgica é mais invasiva e não oferece vantagem diante de alternativa enteral paliativa simples.
C — Incorreta. Esofagostomia cervical não resolve adequadamente a nutrição e opera justamente em território comprometido pelo tumor.`

        ,'cm-gastroenterologia-024': `Resposta correta — D. Em câncer de esôfago metastático com disfagia importante, a prótese endoscópica autoexpansível restaura rapidamente a luz esofágica, permitindo ingestão oral e melhorando qualidade de vida no contexto paliativo.

Distratores:
A — Incorreta. Jejunostomia fornece nutrição, mas é invasiva e não alivia a disfagia nem permite alimentação oral quando a prótese é tecnicamente possível.
B — Incorreta. Sonda nasoenteral é desconfortável, desloca-se e não é a melhor solução paliativa duradoura para obstrução esofágica.
C — Incorreta. Gastrostomia também mantém nutrição sem restaurar a deglutição e pode ser menos adequada que prótese para a meta sintomática descrita.`

        ,'cm-gastroenterologia-025': `Resposta correta — C. Inflamação contínua do reto ao cólon esquerdo, associada a abscessos de cripta, distorção arquitetural e plasmocitose basal, confirma retocolite ulcerativa. Diante de atividade clínica relevante com sangue, urgência e repercussão sistêmica, corticosteroide como prednisona é opção de indução, seguido de estratégia de manutenção apropriada.

Distratores:
A — Incorreta. Crohn tende a apresentar lesões descontínuas, acometimento transmural, granulomas e possível doença perianal; o padrão contínuo e mucoso favorece retocolite.
B — Incorreta. Colite microscópica causa diarreia aquosa com colonoscopia macroscopicamente normal e diagnóstico por biópsia, não colite sanguinolenta difusa.
D — Incorreta. Colite por C. difficile está ligada a antibióticos e pseudomembranas, e não ao padrão histológico crônico descrito.

Ressalva técnica — a escolha entre mesalazina, corticosteroide tópico/oral, biológico ou internação depende da gravidade formal da atividade. A alternativa C é a única que combina o diagnóstico correto com terapia de indução plausível para o quadro apresentado.`

        ,'cm-gastroenterologia-026': `Resposta correta — A. A paciente tem adenoma avançado por componente tubuloviloso e também pólipo com cerca de 20 mm, além de múltiplos adenomas. Após ressecção completa e exame de boa qualidade, esses achados indicam vigilância colonoscópica em 3 anos.

Distratores:
B — Incorreta. Intervalo de 7 a 10 anos é reservado a exame normal ou achados de muito baixo risco, não a adenoma avançado e múltiplas lesões.
C — Incorreta. Adenoma removido endoscopicamente por completo não exige transversectomia; cirurgia depende de invasão, ressecção incompleta ou impossibilidade endoscópica.
D — Incorreta. Sete adenomas não caracterizam, isoladamente, polipose que indique colectomia total; não há câncer ou síndrome hereditária demonstrada.`

        ,'cm-gastroenterologia-027': `Resposta correta — C. Disfagia é sinal de alarme em paciente com sintomas de refluxo e resposta inadequada a oito semanas de IBP. A próxima etapa é endoscopia digestiva alta com biópsias para pesquisar esofagite, estenose, neoplasia e esofagite eosinofílica.

Distratores:
A — Incorreta. Manometria avalia motilidade após exclusão de obstrução estrutural e não permite inspeção ou biópsia da mucosa.
B — Incorreta. pHmetria documenta refluxo quando necessário, mas a disfagia exige primeiro endoscopia para excluir lesão orgânica.
D — Incorreta. Estudo contrastado pode complementar avaliação de anatomia e trânsito, porém não substitui endoscopia com biópsia diante de sinal de alarme.`

        ,'cm-gastroenterologia-028': `Resposta correta — A. Anemia importante, perda ponderal, hematoquezia intermitente e dor em flanco/fossa ilíaca direitos em homem de 58 anos sugerem câncer de cólon direito. Tumores proximais frequentemente sangram de forma oculta ou intermitente e causam anemia antes de obstrução.

Distratores:
B — Incorreta. Tuberculose ileocecal pode causar dor e emagrecimento, mas requer contexto infeccioso e não é a hipótese principal diante de sangramento e anemia sugestivos de neoplasia.
C — Incorreta. Doença diverticular predomina no cólon esquerdo e sangramento diverticular costuma ser indolor e agudo.
D — Incorreta. DII pode causar sangue, diarreia e dor, mas o início nessa idade, anemia e perda ponderal sem diarreia favorecem tumor.`

        ,'cm-gastroenterologia-029': `Resposta correta — A. Dor epigástrica irradiada para dorso, perda ponderal, diabetes de início recente e icterícia colestática com prurido são altamente sugestivos de adenocarcinoma de cabeça de pâncreas. A ultrassonografia abdominal é exame inicial acessível para confirmar dilatação biliar e procurar massa, seguindo-se tomografia com protocolo pancreático para estadiamento.

Distratores:
B — Incorreta. Colangiocarcinoma pode causar icterícia obstrutiva, mas a dor dorsal e o diabetes recente apontam mais para pâncreas; ressonância não é necessariamente o primeiro exame.
C — Incorreta. Hepatocarcinoma costuma ocorrer em fígado cronicamente doente e não produz tipicamente o conjunto de obstrução distal e diabetes novo.
D — Incorreta. Coledocolitíase pode causar icterícia, mas perda ponderal, dor dorsal e diabetes recente são sinais de neoplasia; CPRE deve ser predominantemente terapêutica, não exame diagnóstico inicial rotineiro.

Revisão do sinalizador — o enunciado textual contém os achados clínicos necessários para responder; nenhuma imagem omitida é indispensável para justificar o gabarito.`

        ,'cm-gastroenterologia-030': `Resposta correta — A. No primeiro ressangramento após hemostasia endoscópica, deve-se ressuscitar imediatamente com acesso venoso, cristaloide e hemocomponentes conforme necessidade e realizar nova endoscopia terapêutica. A combinação de adrenalina isolada é inferior a métodos mecânicos ou térmicos e a repetição deve empregar terapia combinada.

Distratores:
B — Incorreta. UTI e IBP são apropriados, mas cirurgia só deve seguir falha de nova tentativa endoscópica ou impossibilidade de controle, conforme recursos e estabilidade.
C — Incorreta. Embolização angiográfica é alternativa após falha endoscópica ou em paciente de alto risco cirúrgico, não antes de repetir a endoscopia no primeiro ressangramento.
D — Incorreta. Apenas intensificar IBP não controla sangramento ativo com choque e grande hematêmese.

Ressalva técnica — hipotensão e taquicardia exigem ressuscitação paralela e avaliação urgente. Se a endoscopia não controlar o sangramento, embolização ou cirurgia tornam-se necessárias.`

        ,'cm-gastroenterologia-031': `Resposta correta — C. Icterícia obstrutiva progressiva, colúria, acolia, prurido e vesícula palpável, distendida e indolor configuram sinal de Courvoisier. Em idoso tabagista, a causa clássica é adenocarcinoma da cabeça do pâncreas obstruindo o colédoco distal.

Distratores:
A — Incorreta. Coledocolitíase costuma provocar dor biliar e não distende tipicamente a vesícula de maneira indolor e progressiva, especialmente pela fibrose associada à litíase crônica.
B — Incorreta. Câncer de vesícula pode causar massa e icterícia avançada, mas o sinal de Courvoisier aponta mais para obstrução distal por tumor pancreático/periampular.
D — Incorreta. Tumor de Klatskin obstrui a confluência hilar; por ser proximal à inserção do ducto cístico, geralmente não causa vesícula palpável distendida.`

        ,'cm-hematologia-001': `Resposta correta — A. Petéquias e púrpura não palpável de início agudo após episódio febril, em criança com bom estado geral e sem hepatoesplenomegalia ou linfonodomegalia, sugerem púrpura trombocitopênica imune. O diagnóstico é apoiado por trombocitopenia isolada no hemograma e exclusão de causas secundárias.

Distratores:
B — Incorreta. Dengue com sinais de alarme/grupo C costuma vir com contexto epidemiológico, síndrome febril mais consistente, hemoconcentração, plaquetopenia e sinais como dor abdominal, vômitos ou extravasamento plasmático.
C — Incorreta. Leucemia pode causar dor óssea e petéquias, mas frequentemente associa palidez, febre persistente, adenomegalia, hepatoesplenomegalia e alterações de outras séries no hemograma.
D — Incorreta. Vasculite por IgA produz púrpura palpável predominante em membros inferiores e nádegas, frequentemente com artrite, dor abdominal ou acometimento renal; as lesões descritas não são palpáveis.`

        ,'cm-hematologia-002': `Resposta correta — A. Crises dolorosas recorrentes, anemia, icterícia e úlcera maleolar em mulher negra sugerem doença falciforme. A confirmação é feita pela eletroforese ou método equivalente de análise de hemoglobinas, demonstrando hemoglobina S e seu padrão quantitativo.

Distratores:
B — Incorreta. Gota espessa é exame para hemoparasitas, especialmente malária; identificação morfológica ocasional de falcização não define o genótipo.
C — Incorreta. Eletroforese de proteínas plasmáticas avalia gamopatias e inflamação, não hemoglobinopatias.
D — Incorreta. Esfregaço pode mostrar drepanócitos e sinais de hemólise, mas não confirma sozinho o tipo de hemoglobinopatia.

Validação documental pendente — os resultados laboratoriais citados no enunciado não foram preservados na importação; a eletroforese do PDF-fonte deve ser conferida antes da publicação definitiva.`

        ,'cm-hematologia-003': `Resposta correta — A. Em criança com anemia falciforme, febre, dor torácica, hipoxemia e alteração respiratória nova devem ser tratados como síndrome torácica aguda. É necessária internação, oxigênio conforme saturação, analgesia, espirometria de incentivo, hidratação cautelosa e antibióticos parenterais, com transfusão conforme gravidade.

Distratores:
B — Incorreta. Embolia pulmonar é possível, mas o conjunto em criança falcêmica com febre favorece síndrome torácica aguda e anticoagulação plena sem confirmação seria inadequada.
C — Incorreta. Hipoxemia de 89% e dor torácica exigem internação e tratamento ativo; mera observação e hidratação podem permitir rápida deterioração.
D — Incorreta. Não há indicação de anticoagulação profilática como tratamento do quadro, nem segurança para observação simples.`

        ,'cm-hematologia-004': `Resposta correta — B. Lactente de família vegana, sem suplementação específica, apresenta risco de deficiência de vitamina B12 e ferro, capazes de causar anemia e atraso do desenvolvimento. Deve receber reposição dos nutrientes, correção alimentar orientada e acompanhamento do atraso motor com fisioterapia/estimulação.

Distratores:
A — Incorreta. Vitaminas A e C não corrigem as deficiências hematológicas e neurológicas mais prováveis no veganismo estrito.
C — Incorreta. B12 é necessária, mas ácido fólico isolado pode mascarar a anemia enquanto a lesão neurológica por B12 progride; a alternativa também omite ferro e prioriza encaminhamento sem corrigir integralmente a causa.
D — Incorreta. A dose preventiva de vitamina D já é adequada e sua deficiência não explica o padrão hematológico esperado; aumentar a dose sem evidência é inadequado.

Validação documental pendente — os índices do hemograma foram omitidos na importação. É necessário conferir no PDF se há padrão combinado de deficiência de ferro e B12 compatível com o gabarito.`

        ,'cm-hematologia-005': `Resposta correta — B. Falha da indução na leucemia linfoblástica aguda caracteriza doença de alto risco/refratária e deve motivar inscrição precoce em centro transplantador, para avaliação, busca de doador e planejamento do transplante sem atraso.

Distratores:
A — Incorreta. A frase é genérica; o marco objetivo solicitado pelo item é a detecção da falha de indução, que define a necessidade de encaminhamento especializado.
C — Incorreta. A busca de compatibilidade não deve atrasar a inscrição; o centro coordena tipagem familiar e busca em registros conforme indicação.
D — Incorreta. Esperar alta e fluxo ambulatorial pode atrasar um tratamento tempo-dependente em doença refratária.`

        ,'cm-hematologia-006': `Resposta correta — B. Icterícia indireta prolongada, Coombs direto negativo, sexo masculino, ancestralidade africana e consanguinidade sugerem hemólise não imune por deficiência de G6PD. A deficiência é ligada ao X e pode ser precipitada por infecção, fármacos ou alimentos oxidantes.

Distratores:
A — Incorreta. Esferocitose hereditária também causa hemólise Coombs-negativa, mas o contexto epidemiológico e provável padrão dos exames favorecem G6PD; espera-se esferócitos, CHCM elevada e história autossômica dominante em muitos casos.
C — Incorreta. Doença falciforme raramente causa manifestação hemolítica relevante no primeiro mês devido à predominância de hemoglobina fetal.
D — Incorreta. Galactosemia costuma cursar após exposição à lactose com vômitos, falha de crescimento, hepatopatia, hipoglicemia e risco de sepse, ausentes no caso.

Validação documental pendente — os exames complementares anunciados não foram preservados no texto importado e devem ser conferidos no PDF para confirmar o padrão enzimático/hemolítico.`

        ,'cm-hematologia-007': `Resposta correta — C. Febre e calafrios durante a transfusão, sem hipoxemia, edema pulmonar, hipotensão, icterícia ou outra evidência clara de hemólise, são mais compatíveis com reação febril não hemolítica. Deve-se interromper a transfusão, manter acesso com solução salina, identificar a bolsa, avaliar o paciente e excluir hemólise e contaminação bacteriana antes de atribuir o diagnóstico.

Distratores:
A — Incorreta. Sobrecarga circulatória provoca dispneia, hipertensão, estertores e edema pulmonar, não descritos.
B — Incorreta. TRALI causa hipoxemia aguda e infiltrado pulmonar bilateral não cardiogênico; radiografia e exame respiratório estão normais.
D — Incorreta. Hemólise aguda pode causar febre, dor lombar, hipotensão, hemoglobinúria e coagulação intravascular; a ausência de instabilidade, icterícia e outros achados torna-a menos provável, embora precise ser ativamente excluída.

Ressalva técnica — dor em flancos e sangramento são sinais de alerta que impedem assumir reação febril benigna sem investigação. O gabarito C é preservado pela estabilidade e ausência dos achados objetivos de hemólise apresentados no item.`

        ,'cm-hematologia-008': `Resposta correta — D. Se o pai tem traço falciforme (HbAS) e a mãe é HbAA, cada gestação tem 50% de probabilidade de herdar o alelo S e apresentar traço falciforme, e 50% de herdar o alelo A paterno. Não há possibilidade de doença HbSS nesse cruzamento.

Distratores:
A — Incorreta. A probabilidade de traço é 50%, não 25%.
B — Incorreta. Para anemia falciforme HbSS, seria necessário receber alelo S de ambos os pais; a mãe é HbAA.
C — Incorreta. A herança da beta-globina é autossômica, não ligada ao sexo, portanto o pai pode transmitir HbS a filhos e filhas.`

        ,'cm-hematologia-009': `Resposta correta — C. Trabalhador de reciclagem de baterias tem exposição ocupacional clássica ao chumbo. A intoxicação causa anemia microcítica/hipocrômica refratária ao ferro, por inibição da síntese do heme, e manifestações neurológicas; a dosagem de chumbo no sangue confirma a exposição.

Distratores:
A — Incorreta. Mielograma não é o primeiro exame diante de exposição tóxica fortemente sugerida e só seria considerado se investigação periférica permanecesse inconclusiva.
B — Incorreta. Haptoglobina avalia hemólise intravascular, que não explica primariamente microcitose refratária e neurotoxicidade ocupacional.
D — Incorreta. Coombs pesquisa hemólise imune, geralmente normocítica e sem relação com reciclagem de baterias.`

        ,'cm-hematologia-010': `Resposta correta — D. Traço falciforme representa heterozigose HbAS, não anemia falciforme. Em geral é condição assintomática, sem necessidade de tratamento; a conduta inicial é tranquilizar e orientar os pais, além de aconselhamento genético no momento apropriado.

Distratores:
A — Incorreta. A triagem neonatal por método de separação de hemoglobinas já identifica o padrão compatível; confirmação pode seguir protocolo local, mas não é a principal resposta frente à ansiedade e ao achado de traço.
B — Incorreta. Testes de falcização/solubilidade não distinguem traço de doença e são inadequados em recém-nascidos pela alta hemoglobina fetal.
C — Incorreta. Repetir imediatamente a triagem sem suspeita de erro não acrescenta informação e não muda a orientação inicial.

Ressalva técnica — o serviço deve seguir o fluxo local de confirmação e registrar orientação familiar; “tranquilizar” não significa omitir aconselhamento reprodutivo futuro.`

        ,'cm-hematologia-011': `Resposta correta — D. Dor óssea axial progressiva, fraturas patológicas e lesões osteolíticas em idoso, associadas a sonolência possivelmente por hipercalcemia, compõem o quadro clássico de mieloma múltiplo. A confirmação inclui demonstração de plasmócitos clonais na medula, além de eletroforese/imunofixação e avaliação de órgão-alvo.

Distratores:
A — Incorreta. Anemia falciforme manifesta-se desde idades mais precoces e não causa tipicamente múltiplas lesões osteolíticas vertebrais em idoso.
B — Incorreta. Linfoma pode infiltrar osso, mas o padrão de lesões líticas, fraturas e provável hipercalcemia favorece neoplasia de plasmócitos; não foram descritos linfonodos para biópsia.
C — Incorreta. Hiperparatireoidismo pode causar hipercalcemia e alterações ósseas, porém múltiplas lesões líticas vertebrais com o contexto laboratorial esperado sugerem mieloma.

Validação documental pendente — os resultados laboratoriais anunciados foram omitidos na importação e devem ser conferidos no PDF, especialmente cálcio, função renal, hemoglobina e componente monoclonal.`

        ,'cm-hematologia-012': `Resposta correta — B. Leite de cabra não modificado é pobre em folato e pode também resultar em ingestão inadequada de vitamina B12. Anemia macrocítica, neutrófilos hipersegmentados, neutropenia e plaquetopenia caracterizam megaloblastose; a reposição de B12 e folato, junto à correção dietética, reverte a deficiência.

Distratores:
A — Incorreta. Deficiências de vitamina E e iodo não explicam o padrão megaloblástico com hipersegmentação.
C — Incorreta. Zinco e vitamina C não corrigem síntese defeituosa de DNA por deficiência de folato/B12.
D — Incorreta. Ferro trata anemia microcítica ferropriva, e vitamina A não é a causa do quadro hematológico descrito.`

        ,'cm-hematologia-013': `Resposta correta — D. Sangramento mucoso, petéquias e hemorragia bolhosa oral, sem exposição medicamentosa ou síndrome sistêmica relatada, sugerem trombocitopenia imune grave. A gravidade clínica é definida principalmente pelo sangramento e pela contagem plaquetária, orientando corticoide e/ou imunoglobulina conforme urgência.

Distratores:
A — Incorreta. Síndrome hemolítico-urêmica associa anemia hemolítica microangiopática, trombocitopenia e lesão renal, frequentemente após diarreia.
B — Incorreta. Púrpura trombocitopênica trombótica costuma cursar com hemólise microangiopática, esquizócitos e alterações neurológicas, renais ou febris, não apenas sangramento cutaneomucoso.
C — Incorreta. Trombocitopenia medicamentosa exige exposição temporal compatível; a paciente nega medicamentos e quinino.

Validação documental pendente — o hemograma e demais exames mencionados foram omitidos. É necessário confirmar plaquetas isoladamente reduzidas e ausência de hemólise/esquizócitos no PDF-fonte.`

        ,'cm-hematologia-014': `Resposta correta — D. Em paciente usando rivaroxabana, ensaios funcionais de coagulação podem sofrer interferência. A pesquisa molecular por PCR da mutação fator V Leiden não é alterada pelo anticoagulante e é apropriada para investigar trombofilia hereditária diante de TVP recorrente e história familiar.

Distratores:
A — Incorreta. Anti-beta-2-glicoproteína I integra investigação de síndrome antifosfolípide, mas um único aborto precoce não cumpre critério obstétrico e o quadro familiar sugere trombofilia hereditária.
B — Incorreta. Anticardiolipina também pesquisa SAF, devendo ser solicitada segundo probabilidade clínica e confirmada em persistência; não é a melhor resposta isolada aqui.
C — Incorreta. Dosagens de proteína C e S podem ser influenciadas por anticoagulação, evento trombótico agudo e outras condições, devendo ser programadas no momento apropriado.

Ressalva técnica — anticoncepcional combinado é importante fator provocador e deve ser suspenso. A necessidade e amplitude de testes de trombofilia devem ser individualizadas, pois nem todo resultado muda a duração da anticoagulação.`

        ,'cm-hematologia-015': `Resposta correta — A. Mutação de MTHFR, mesmo em homozigose, não é considerada trombofilia que indique anticoagulação, e um único aborto espontâneo precoce é comum e não define síndrome antifosfolípide. Sem história pessoal ou familiar de trombose, segue-se pré-natal habitual.

Distratores:
B — Incorreta. Painel indiscriminado de trombofilia não é indicado com um aborto precoce isolado e pode gerar achados sem utilidade clínica.
C — Incorreta. AAS e enoxaparina expõem a sangramento e não têm indicação baseada apenas em MTHFR e perda gestacional única.
D — Incorreta. Investigação de SAF é indicada em critérios clínicos específicos, como perdas recorrentes precoces, óbito fetal tardio ou morbidade placentária; uma perda na oitava semana não basta.`

        ,'cm-hematologia-016': `Resposta correta — B. Comunidade ribeirinha exposta a garimpo, consumo frequente de peixe e sintomas neurológicos progressivos sugerem intoxicação por metilmercúrio, que bioacumula na cadeia alimentar e causa parestesias, ataxia, tremor, disartria e déficits cognitivos.

Distratores:
A — Incorreta. Poliomielite causa paralisia flácida aguda assimétrica, não síndrome sensorial, cerebelar e cognitiva crônica ligada à exposição ambiental.
C — Incorreta. Guillain-Barré provoca fraqueza ascendente e arreflexia agudas, geralmente pós-infecciosas, sem explicar tremor, irritabilidade e exposição ao garimpo.
D — Incorreta. Organofosforados produzem síndrome colinérgica aguda com miose, secreções, broncorreia, vômitos e fasciculações, ausentes.`

        ,'cm-hematologia-017': `Resposta correta — D. Febre persistente, sudorese noturna, linfonodos cervicais e supraclaviculares endurecidos, fixos e indolores e comprometimento torácico sugerem linfoma de Hodgkin. A confirmação requer biópsia excisional, preservando arquitetura ganglionar; PET-CT é usado para estadiamento metabólico.

Distratores:
A — Incorreta. Mononucleose costuma produzir linfonodos dolorosos/móveis, faringite e hepatoesplenomegalia; punção aspirativa não é ideal para diagnosticar linfoma.
B — Incorreta. Tuberculose pode causar sintomas constitucionais e adenopatia, mas a investigação proposta não inclui teste microbiológico nem biópsia apropriada e o conjunto favorece linfoma.
C — Incorreta. Pneumonia comunitária de 20 dias não explica múltiplos linfonodos duros e fixos, e PET-CT não é exame confirmatório de pneumonia.`

        ,'cm-hematologia-018': `Resposta correta — B. Adenomegalias progressivas em múltiplas cadeias, duras e fixas, sintomas B e massa mediastinal tornam linfoma a principal hipótese. A biópsia excisional de linfonodo cervical é preferida para definir subtipo pela arquitetura, imunofenótipo e estudos complementares.

Distratores:
A — Incorreta. Citomegalovírus em imunocompetente tende a síndrome mononucleose-like e não causa tipicamente massa mediastinal e gânglios fixos progressivos.
C — Incorreta. Mononucleose infecciosa é mais comum em jovens e costuma associar faringite, linfonodos móveis e hepatoesplenomegalia; sorologia não substitui biópsia neste quadro de alarme.
D — Incorreta. Metástase tireoidiana não explica bem adenopatia generalizada, sintomas B e massa mediastinal sem lesão cervical primária descrita.`

        ,'cm-hematologia-019': `Resposta correta — C. Reticulocitose indica resposta medular preservada a perda ou destruição periférica de hemácias. A deficiência de G6PD provoca episódios de hemólise e, após o início da resposta medular, elevação dos reticulócitos.

Distratores:
A — Incorreta. Deficiência de B12 reduz produção eficaz e causa reticulócitos baixos ou inadequadamente normais antes do tratamento.
B — Incorreta. Aplasia medular compromete precursores e causa reticulocitopenia, frequentemente com pancitopenia.
D — Incorreta. Hipotireoidismo pode causar anemia hipoproliferativa, com resposta reticulocitária baixa.`

        ,'cm-hematologia-020': `Resposta correta — B. Crises álgicas recorrentes, anemia e vértebras em “H” — depressão central dos platôs vertebrais por infartos ósseos — são características de doença falciforme. A eletroforese de hemoglobina confirma e define o padrão da hemoglobinopatia.

Distratores:
A — Incorreta. Hiperparatireoidismo pode alterar o esqueleto, mas não causa vértebras em H associadas a crises vaso-oclusivas desde a infância.
C — Incorreta. Tomografia pode detalhar fratura, mas não explica a causa sistêmica nem é o exame confirmatório prioritário.
D — Incorreta. Espondilite anquilosante produz sacroileíte e alterações inflamatórias axiais, não anemia com vértebras em H e crises dolorosas agudas.`

        ,'cm-hematologia-021': `Resposta correta — C. Trombocitopenia isolada moderada após infecção viral, com petéquias/equimoses e sem sangramento mucoso ou visceral, sugere púrpura trombocitopênica imune infantil. Com 64 mil plaquetas e quadro clinicamente leve, a conduta inicial é observação ambulatorial, orientação de sinais de alarme e evitar trauma e fármacos antiplaquetários.

Distratores:
A — Incorreta. Corticoide é reservado a sangramento mucoso relevante, impacto importante ou contagem muito baixa conforme avaliação clínica, não apenas ao número de plaquetas.
B — Incorreta. Esplenectomia é opção excepcional em PTI crônica/refratária e nunca tratamento inicial desse quadro recente.
D — Incorreta. Imunoglobulina eleva plaquetas rapidamente e é usada em sangramento significativo ou necessidade urgente, ausentes no caso.

Ressalva técnica — esplenomegalia não é típica de PTI e exige confirmar que não há hepatosplenomegalia relevante, infecção, doença hematológica ou diagnóstico alternativo. Preserva-se o gabarito C pelos demais achados e ausência de sangramento importante.`

        ,'cm-hepatologia-001': `Resposta correta — A. Todo paciente cirrótico internado com ascite, especialmente com encefalopatia ou descompensação, deve realizar paracentese diagnóstica prontamente para excluir peritonite bacteriana espontânea. O procedimento tem baixo risco hemorrágico e não exige correção rotineira prévia de INR prolongado ou plaquetopenia da cirrose.

Distratores:
B — Incorreta. Espironolactona pode integrar o controle crônico da ascite, mas não substitui paracentese diagnóstica; ceftriaxona só deve ser iniciada empiricamente quando houver suspeita forte ou após coleta, conforme o contexto.
C — Incorreta. Plasma e plaquetas profiláticos não reduzem de forma comprovada o pequeno risco da paracentese e podem causar sobrecarga de volume.
D — Incorreta. Tomografia não é necessária antes de paracentese em ascite evidente e atrasaria a investigação de infecção.

Validação documental pendente — os exames de admissão foram omitidos, mas a recomendação de paracentese sem correção rotineira permanece válida salvo situação excepcional, como coagulação intravascular disseminada.`

        ,'cm-hepatologia-002': `Resposta correta — B. Quatro casos confirmados de hepatite A ligados à mesma escola e exposição comum a esgoto configuram surto. Deve-se notificar imediatamente à vigilância, investigar fonte e extensão e fazer busca ativa de sintomáticos na escola e nos domicílios, além de medidas sanitárias e avaliação de profilaxia dos contatos.

Distratores:
A — Incorreta. Hepatite A não requer isolamento hospitalar de casos estáveis; higiene, saneamento e precauções apropriadas interrompem transmissão fecal-oral.
C — Incorreta. Profilaxia pós-exposição depende de idade, vacinação prévia, risco e tempo desde a exposição; imunoglobulina não é prescrita indiscriminadamente a todos os contatos.
D — Incorreta. Fechar a escola por 45 dias não é medida rotineira efetiva e não substitui investigação epidemiológica e controle sanitário.`

        ,'cm-hepatologia-003': `Resposta correta — C. Episódios leves e autolimitados de hiperbilirrubinemia indireta precipitados por jejum, estresse e privação de sono, sem colúria, hepatopatia ou hemólise, caracterizam síndrome de Gilbert. É condição benigna por atividade reduzida da UGT1A1 e requer apenas orientação e tranquilização.

Distratores:
A — Incorreta. Teste genético raramente é necessário quando clínica e exames são típicos, devendo ser reservado a dúvida diagnóstica.
B — Incorreta. Fenobarbital reduz bilirrubina por indução enzimática, mas seus riscos não justificam tratar uma condição benigna.
D — Incorreta. Ultrassonografia não é necessária quando há hiperbilirrubinemia indireta isolada, enzimas normais e ausência de sinais de obstrução.

Validação documental pendente — os valores laboratoriais foram omitidos e devem demonstrar bilirrubina indireta isoladamente elevada, hemograma e enzimas hepáticas normais para sustentar o diagnóstico.`

        ,'cm-hepatologia-004': `Resposta correta — A. Ascite com gradiente soro-ascite de albumina de 1,3 indica hipertensão portal, e 320 neutrófilos/mm³ supera o limiar de 250 para peritonite bacteriana espontânea. O tratamento empírico indicado é cefalosporina de terceira geração, como ceftriaxona, com avaliação de albumina intravenosa conforme função renal e bilirrubina.

Distratores:
B — Incorreta. Gentamicina tem nefrotoxicidade relevante em cirrótico e não é terapia de primeira linha para PBE.
C — Incorreta. Fluoroquinolonas têm papel em profilaxia selecionada e resistência crescente; não são a melhor escolha empírica entre as opções para este episódio.
D — Incorreta. Penicilina cristalina não cobre adequadamente os principais bacilos gram-negativos entéricos envolvidos.`

        ,'cm-hepatologia-005': `Resposta correta — A. Síndrome prodrômica com febre, artralgia e exantema seguida de icterícia, colúria e melhora do pródromo é típica de hepatite viral aguda. Em usuário de drogas injetáveis, a sorologia descrita na tabela provavelmente demonstra hepatite B aguda; na maioria dos casos sem insuficiência hepática, o tratamento é suporte, hidratação, evitar álcool e hepatotóxicos e acompanhar função hepática e INR.

Distratores:
B — Incorreta. Hepatite alcoólica exige consumo alcoólico intenso e costuma apresentar padrão clínico-laboratorial distinto; o paciente relata apenas uso social de fermentados.
C — Incorreta. A hepatite C aguda frequentemente é assintomática e o diagnóstico depende de RNA; o esquema citado não deve ser escolhido sem confirmar os marcadores e seguir protocolo atualizado.
D — Incorreta. Hepatite B crônica agudizada exige evidência de infecção persistente, como HBsAg por mais de seis meses, não fornecida no texto.

Validação visual pendente — a tabela sorológica/laboratorial necessária para distinguir hepatite B aguda de outras hepatites não foi preservada. É obrigatório conferir HBsAg, anti-HBc IgM, transaminases e INR no PDF antes da validação definitiva.`

        ,'cm-hepatologia-006': `Resposta correta — D. Pródromo com febre, artralgia, sintomas inespecíficos, anorexia, náuseas e vômitos, seguido de icterícia e melhora dos sintomas sistêmicos, é evolução clássica de hepatite viral aguda. Hepatomegalia dolorosa leve também é compatível.

Distratores:
A — Incorreta. Leptospirose costuma envolver febre alta persistente, mialgia intensa em panturrilhas, sufusão conjuntival e, nas formas graves, insuficiência renal e hemorragia.
B — Incorreta. Mononucleose pode alterar transaminases, mas geralmente apresenta faringite, linfadenopatia e esplenomegalia.
C — Incorreta. Colecistite causa dor contínua em hipocôndrio direito, febre e sinal de Murphy; não costuma apresentar pródromo viral com melhora quando surge icterícia.`

        ,'cm-infectologia-001': `Resposta correta — A. Pelo gabarito, cão domiciliado, saudável, vacinado e disponível deve ser observado por dez dias; permanecendo vivo e sem sinais compatíveis, não se indica vacina nem soro. O atendimento antirrábico humano deve ser registrado/notificado oportunamente para vigilância e acompanhamento do animal e da pessoa exposta.

Distratores:
B — Incorreta. Dose única isolada não corresponde a um esquema pós-exposição reconhecido e não substitui a observação adequada.
C — Incorreta. Soro antirrábico não é usado isoladamente; quando indicado em exposição grave a animal suspeito/não observável, acompanha vacinação e infiltração na lesão.
D — Incorreta. Esquema completo com imunoglobulina seria excessivo para animal saudável e observável, salvo mudança do estado do animal ou circunstância epidemiológica específica.

Ressalva técnica — mordedura em mão é classificada como exposição grave em protocolos brasileiros, e a necessidade de iniciar vacina durante a observação variou entre normas e fluxos locais. Profundidade, número de feridas, condição epidemiológica e protocolo vigente precisam ser confirmados; não se deve aplicar automaticamente a alternativa A fora do cenário e da edição normativa da prova.`

        ,'cm-infectologia-002': `Resposta correta — B. Síndrome febril com faringite e linfonodomegalia após exposição sexual recente pode representar infecção aguda pelo HIV. Durante a janela imunológica, teste rápido de anticorpos pode ser negativo; teste molecular para RNA/carga viral detecta infecção mais precocemente.

Distratores:
A — Incorreta. Repetir apenas teste rápido em sete dias ainda pode cair na janela e não é a melhor investigação diante de alta suspeita de fase aguda.
C — Incorreta. ELISA de quarta geração pode ser útil e detecta mais cedo que testes só de anticorpos, mas a alternativa não especifica geração; o RNA é mais direto no contexto de síndrome retroviral aguda.
D — Incorreta. Um teste negativo não exclui exposição muito recente, portanto encerrar investigação é inseguro.

Ressalva técnica — deve-se também avaliar outras ISTs, orientar prevenção e repetir a testagem conforme janela do método; resultado molecular positivo requer confirmação pelo fluxo diagnóstico vigente.`

        ,'cm-infectologia-003': `Resposta correta — A. Febre alta, dor lombar, Giordano positivo, piúria/nitrito e hipotensão indicam pielonefrite complicada com sepse e hipoperfusão. É necessário acesso venoso, coleta de culturas quando não atrasar tratamento, cristaloide, antibiótico parenteral precoce como ceftriaxona e transferência urgente ao hospital.

Distratores:
B — Incorreta. Nitrofurantoína não alcança concentração adequada no parênquima renal e não trata pielonefrite ou sepse; ressuscitação não pode esperar o hospital.
C — Incorreta. Hipotensão e sinais sistêmicos tornam acompanhamento ambulatorial inseguro, e cinco dias de doses na UBS não substituem internação.
D — Incorreta. Terapia oral é inadequada em paciente com vômitos, hipotensão e sepse, além de depender de sensibilidade local/cultura.`

        ,'cm-infectologia-004': `Resposta correta — C. Poliartralgia/artrite bilateral intensa e persistente após febre curta em área com Aedes é característica de Chikungunya. Com 18 dias de evolução, a viremia já caiu e a sorologia IgM é o método confirmatório mais apropriado.

Distratores:
A — Incorreta. NS1 para dengue tem melhor rendimento nos primeiros dias da doença e o padrão articular persistente é muito mais típico de Chikungunya.
B — Incorreta. RT-PCR para Zika é mais útil na fase aguda breve; Zika costuma causar exantema pruriginoso, conjuntivite e artralgia menos incapacitante.
D — Incorreta. Febre amarela geralmente causa síndrome febril sistêmica e, em formas graves, hepatite, icterícia e hemorragia, não artrite persistente isolada.`

        ,'cm-infectologia-005': `Resposta correta — B. Lesão intensamente pruriginosa iniciada no pé e avançando ao dorso por trajeto serpiginoso é larva migrans cutânea, causada no Brasil principalmente por larvas de Ancylostoma braziliense de cães e gatos.

Distratores:
A — Incorreta. Tunga penetrans causa tungíase com pápula/nódulo, frequentemente com ponto negro central, sobretudo periungueal, e não trilha migratória.
C — Incorreta. Sarcoptes scabiei causa escabiose com prurido noturno, túneis curtos e distribuição típica em espaços interdigitais, punhos e outras áreas, geralmente com múltiplas lesões/contatos.
D — Incorreta. Trichophyton rubrum causa dermatofitose descamativa, anular ou interdigital, sem trajeto serpiginoso progressivo.

Validação visual pendente — a imagem da lesão não foi preservada no banco. É necessário confirmar que ela mostra trajeto eritematoso serpiginoso compatível com larva migrans antes da validação definitiva.`

        ,'cm-infectologia-006': `Resposta correta — B. Monoartrite aguda quente, dolorosa, com derrame volumoso e febre baixa deve ser considerada artrite séptica até prova em contrário, sem esquecer doença por cristais. A prioridade é artrocentese com contagem celular, Gram, cultura e pesquisa de cristais, idealmente antes do antibiótico se a paciente estiver estável.

Distratores:
A — Incorreta. Hemoculturas são úteis, mas iniciar antibiótico sem obter líquido sinovial perde o exame diagnóstico central; em sepse/instabilidade, porém, tratamento não deve ser atrasado.
C — Incorreta. Ressonância não substitui artrocentese e atrasaria diagnóstico e drenagem de uma possível infecção articular.
D — Incorreta. AINE isolado antes de excluir artrite séptica pode mascarar sintomas e permitir destruição articular rápida.`

        ,'cm-infectologia-007': `Resposta correta — A. Vômitos persistentes, dor abdominal, lipotímia, oligúria, enchimento capilar lento, extremidades frias, taquicardia e hematócrito em elevação com plaquetas em queda são sinais de alarme e extravasamento plasmático na dengue. Exigem acesso calibroso, hidratação venosa protocolada, reavaliações frequentes e internação.

Distratores:
B — Incorreta. Hidratação oral e retorno programado são insuficientes diante de sinais de alarme e perfusão comprometida.
C — Incorreta. Confirmação laboratorial não deve atrasar manejo clínico, e alta após poucas horas é inadequada sem resposta sustentada e estratificação hospitalar.
D — Incorreta. Ultrassom pode identificar líquido, mas não é prioridade e hidratação oral não basta neste estágio.`

        ,'cm-infectologia-008': `Resposta correta — C. Nódulos profundos, muito dolorosos, centrados em folículos, que evoluem com flutuação e drenagem purulenta, repetem-se em áreas de atrito e deixam cicatrizes são compatíveis com furunculose de repetição, geralmente por Staphylococcus aureus.

Distratores:
A — Incorreta. Celulite é infecção difusa da derme/subcutâneo, sem ponto central de flutuação bem delimitado em cada episódio.
B — Incorreta. Impetigo é infecção superficial com vesículas/pústulas e crostas melicéricas, não abscesso nodular profundo.
D — Incorreta. Foliculite fica restrita à porção superficial do folículo e forma pequenas pústulas, sem nódulo de 3 cm e abscesso.

Ressalva técnica — recorrência em coxas/nádegas com cicatrizes também exige avaliar hidradenite supurativa, sobretudo se houver túneis, comedões e lesões em áreas intertriginosas; esses achados não foram descritos.`

        ,'cm-infectologia-009': `Resposta correta — A. Temperaturas mais altas, dentro da faixa biologicamente favorável, aceleram a replicação viral no mosquito e encurtam o período de incubação extrínseco. Assim, o Aedes torna-se infectante mais cedo e tem mais oportunidades de transmitir durante sua vida.

Distratores:
B — Incorreta. A expansão não depende de mutação induzida pelo calor nem de troca obrigatória da espécie vetora.
C — Incorreta. O ciclo do mosquito pode acelerar, mas a alternativa não expressa o mecanismo central de aumento da competência/transmissão viral solicitado: redução do tempo até o vetor se tornar infectante.
D — Incorreta. Redução da densidade vetorial diminuiria transmissão, e mudança de chuvas não explica diretamente competência intrínseca do mosquito.`

        ,'cm-infectologia-010': `Resposta correta — A. O problema nasce de armazenamento precário de água, recipientes e resíduos que viram criadouros. A ação de maior impacto sustentável é manejo ambiental com participação dos moradores e atuação intersetorial para água, saneamento, resíduos, educação e eliminação regular de focos.

Distratores:
B — Incorreta. Encaminhar casos melhora assistência, mas não reduz de modo relevante a população vetorial nem previne novas infecções.
C — Incorreta. Inseticidas podem ser usados de forma focal em situações indicadas, porém têm efeito transitório, risco de resistência e não resolvem os criadouros estruturais.
D — Incorreta. Visitar apenas domicílios de casos é insuficiente porque há transmissão e criadouros em toda a área, inclusive em pessoas assintomáticas e espaços comunitários.`

        ,'cm-infectologia-011': `Resposta correta — B. Pessoa com HIV avançado, CD4 de 40 células/µL e primeira convulsão tem alto risco de lesão expansiva cerebral oportunista ou neoplásica. Deve-se priorizar neuroimagem, idealmente tomografia com contraste quando disponível, antes de punção lombar, para procurar efeito de massa, edema e múltiplas lesões.

Distratores:
A — Incorreta. Punção lombar antes da imagem pode causar herniação se houver hipertensão intracraniana/lesão expansiva, risco elevado nesse cenário.
C — Incorreta. A massa pulmonar precisa ser investigada, mas a emergência neurológica atual exige imagem cerebral primeiro.
D — Incorreta. Biópsia pulmonar não esclarece imediatamente a convulsão nem precede estabilização e avaliação intracraniana.`

        ,'cm-infectologia-012': `Resposta correta — A. Febre alta, prostração, fontanela abaulada e púrpura/petéquias sugerem meningite meningocócica com meningococcemia. O líquor bacteriano apresenta pleocitose, geralmente neutrofílica, proteína elevada e glicose reduzida; Neisseria meningitidis aparece como diplococo Gram-negativo.

Distratores:
B — Incorreta. Pneumococo é diplococo Gram-positivo, mas meningite bacteriana não apresenta celularidade normal e glicose normal.
C — Incorreta. Meningite tuberculosa costuma ter evolução subaguda, proteína alta, glicose baixa e predomínio linfocitário; proteína diminuída está errada.
D — Incorreta. Líquor completamente normal é incompatível com meningite bacteriana sintomática.

Ressalva técnica — diante de púrpura fulminante, antibiótico parenteral e estabilização devem começar imediatamente e não aguardar punção lombar se houver instabilidade ou contraindicação.`

        ,'cm-infectologia-013': `Resposta correta — C. A PEP para HIV deve ser iniciada o mais rápido possível, preferencialmente nas primeiras duas horas, e não é recomendada após 72 horas por perda de eficácia. Como a profissional procurou atendimento quatro dias depois, realiza-se testagem basal, acompanhamento sorológico e avaliação de hepatites e outras exposições, sem PEP para este acidente.

Distratores:
A — Incorreta. Testar a profissional é necessário, mas PEP não deve ser iniciada após quatro dias; a pessoa-fonte também deve ser testada quando possível.
B — Incorreta. Mesmo que a fonte seja positiva, o prazo máximo recomendado para iniciar PEP já foi ultrapassado.
D — Incorreta. PEP não é indicada pelo simples tempo decorrido e nunca dispensa testagem basal e avaliação do acidente.`

        ,'cm-infectologia-014': `Resposta correta — C. Em retratamento após abandono, baciloscopia positiva com TRM-TB negativo ainda mantém forte suspeita de tuberculose e pode refletir limitação/amostra discrepante. Deve-se colher cultura com teste de sensibilidade e, após avaliação clínica, reiniciar esquema básico enquanto se aguarda o resultado, ajustando-o se surgir resistência.

Distratores:
A — Incorreta. Em pessoa já tratada, TRM positivo pode detectar DNA de bacilos mortos e precisa ser interpretado com baciloscopia, cultura e história; a alternativa simplifica indevidamente o reinício.
B — Incorreta. A frase exige “resistência à rifampicina positiva” apesar de TRM negativo e propõe condição contraditória para esquema básico.
D — Incorreta. Resistência à rifampicina detectada exige encaminhamento e esquema específico para TB resistente; não se reinicia simplesmente o esquema básico enquanto aguarda.

Ressalva técnica — fluxos de retratamento e interpretação do TRM em previamente tratados dependem do manual vigente. Cultura e teste de sensibilidade são essenciais diante de abandono e discordância bacteriológica.`

        ,'cm-infectologia-015': `Resposta correta — C. A exposição sexual anal receptiva sem preservativo ocorreu há dois dias, dentro da janela de 72 horas para PEP. Deve-se testar imediatamente HIV e sífilis e, com teste de HIV não reagente e ausência de contraindicação, iniciar PEP por 28 dias; pela exposição contínua, programa-se transição direta para PrEP ao término, após reavaliação.

Distratores:
A — Incorreta. PrEP não trata a exposição já ocorrida e PEP não deve ser adiada para depois de um “tratamento inicial” indefinido.
B — Incorreta. Iniciar apenas PrEP ignora a exposição recente de alto risco que ainda está na janela de PEP.
D — Incorreta. PEP e PrEP não são prescritas como dois esquemas concomitantes; faz-se PEP e depois transição para PrEP.

Ressalva técnica — também são indicados rastreamento de outras ISTs, avaliação de hepatites, vacinação e seguimento laboratorial conforme protocolo, sem estigmatização da identidade de gênero ou ocupação.`

        ,'cm-infectologia-016': `Resposta correta — C. Dor abdominal e vômitos persistentes são sinais de alarme em paciente com suspeita de dengue, classificando-o no grupo C mesmo com pressão ainda normal. Deve receber hidratação parenteral, exames e observação com reavaliação clínica e hematócrito; no terceiro dia, NS1 ainda pode auxiliar a confirmação.

Distratores:
A — Incorreta. Grupo B não contempla sinais de alarme, e acompanhamento domiciliar é inseguro com vômitos incontroláveis e dor abdominal.
B — Incorreta. Classifica corretamente como grupo C, mas hidratação apenas oral e seguimento ambulatorial não são suficientes; IgM também tem melhor rendimento após os primeiros dias.
D — Incorreta. Hidratação venosa está correta, porém a classificação como grupo B está errada e solicitar simultaneamente testes fora da janela ideal não corrige isso.`

        ,'cm-infectologia-017': `Resposta correta — B. Para profissional não imune que permanecerá em área amazônica de alto risco e acesso difícil a diagnóstico, a doxiciclina é uma opção de quimioprofilaxia, iniciada antes da exposição, mantida diariamente durante a permanência e por período após a saída, além de repelente, mosquiteiro e roupa protetora.

Distratores:
A — Incorreta. Artesunato é componente de tratamento da malária, não opção habitual isolada de profilaxia.
C — Incorreta. Primaquina é usada em esquemas de cura radical e circunstâncias específicas, exige avaliação de G6PD e não é a escolha rotineira diária apresentada.
D — Incorreta. Cloroquina não protege adequadamente em áreas com Plasmodium falciparum resistente.

Ressalva técnica — no Brasil, quimioprofilaxia é excepcional e deve considerar duração, risco local, acesso a diagnóstico e contraindicações; nenhuma estratégia substitui medidas contra picadas e busca imediata diante de febre.`

        ,'cm-infectologia-018': `Resposta correta — B. Pessoas privadas de liberdade são população de alto risco para tuberculose e podem ser consideradas sintomáticas respiratórias com tosse de menor duração conforme estratégia ativa. Deve-se solicitar radiografia e teste bacteriológico/molecular de escarro e garantir início e continuidade do tratamento se confirmado.

Distratores:
A — Incorreta. Investigação pode ser realizada no sistema prisional/ambulatorial com medidas de controle; internação clínica não é necessária apenas para acelerar diagnóstico ou por segurança.
C — Incorreta. “Internação social” não é indicada para assegurar tratamento; cuidado diretamente observado pode ser organizado no próprio serviço penitenciário.
D — Incorreta. Esperar três semanas atrasa diagnóstico e favorece transmissão em ambiente de alta densidade e vulnerabilidade.`

        ,'cm-infectologia-019': `Resposta correta — C. Inoculação por arranhadura de gato, úlcera crostosa com nódulos em trajeto e histologia granulomatosa com corpos asteroides sugerem esporotricose cutâneo-linfática. Itraconazol é primeira linha e costuma ser mantido por meses e por algumas semanas após resolução clínica.

Distratores:
A — Incorreta. Furunculose forma abscessos bacterianos dolorosos e não causa padrão linfocutâneo granulomatoso com corpos asteroides.
B — Incorreta. Herpes-zóster produz vesículas agrupadas em dermátomo e dor neurítica, não nódulos ascendentes após arranhadura de gato.
D — Incorreta. Paracoccidioidomicose está ligada à inalação e doença pulmonar/mucosa sistêmica; anfotericina é reservada a formas graves, não ao quadro típico descrito.`

        ,'cm-infectologia-020': `Resposta correta — A. Bolhas flácidas com conteúdo amarelado que se rompem e deixam lesões eritematoacastanhadas sugerem impetigo bolhoso por toxina de Staphylococcus aureus. Em poucas lesões localizadas e lactente estável, mupirocina tópica é a opção indicada entre as alternativas.

Distratores:
B — Incorreta. Herpes neonatal costuma produzir vesículas agrupadas e pode disseminar-se ou acometer sistema nervoso central, exigindo aciclovir intravenoso, padrão não descrito.
C — Incorreta. Sulfadiazina de prata é usada em queimaduras selecionadas e não trata adequadamente impetigo.
D — Incorreta. Imunoglobulina varicela-zóster é profilaxia pós-exposição para pessoas suscetíveis de alto risco, não tratamento dessas lesões.

Ressalva técnica — por se tratar de recém-nascida, deve-se ter baixo limiar para avaliação pediátrica, cultura e antibiótico sistêmico se houver disseminação, febre, toxemia ou progressão; mupirocina isolada só é aceitável no quadro realmente limitado e estável.`

        ,'cm-infectologia-021': `Resposta correta — A. Lesão verrucosa persistente na glande, linfonodos inguinais duros/fixos, idade e antecedente de HPV levantam forte suspeita de carcinoma peniano. Antes de definir tratamento, deve-se realizar biópsia da lesão para confirmação histopatológica e planejamento do estadiamento.

Distratores:
B — Incorreta. Sorologias de IST são pertinentes, mas tratamento empírico não deve substituir biópsia de uma lesão suspeita de neoplasia.
C — Incorreta. Higiene é importante e pode tratar balanopostite associada, porém antibiótico e corticoide podem atrasar diagnóstico do câncer.
D — Incorreta. Tratamento tópico e da parceira seria voltado a determinadas infecções/condilomas e é inadequado sem definir a natureza da lesão e dos linfonodos.`

        ,'cm-infectologia-022': `Resposta correta — C. A paciente tem colangite grave com choque séptico. Após cristaloide inicial, pressão arterial média persistente abaixo de 65 mmHg indica iniciar vasopressor; noradrenalina é a droga de primeira escolha, enquanto se organiza drenagem biliar urgente por CPRE.

Distratores:
A — Incorreta. Controle de foco é essencial e urgente, mas primeiro deve haver suporte hemodinâmico suficiente para reduzir risco durante o procedimento.
B — Incorreta. Coloides não substituem vasopressor no choque refratário a cristaloide e alguns aumentam risco renal/coagulopatia.
D — Incorreta. Hidrocortisona é considerada em choque que permanece dependente de vasopressor apesar de ressuscitação adequada, não antes de iniciar noradrenalina.`

        ,'cm-infectologia-023': `Resposta correta — B. Disúria, polaciúria, febre, lombalgia e Giordano positivo indicam pielonefrite, agora complicada por hipotensão, taquicardia e taquipneia compatíveis com sepse/choque. É preciso expandir com cristaloide, colher sangue e urina sem atrasar terapia e iniciar antibiótico intravenoso precoce.

Distratores:
A — Incorreta. Encaminhamento ambulatorial é inseguro em choque e não controla infecção sistêmica.
C — Incorreta. Não há corrimento ou síndrome clínica de gonorreia; a fonte é urinária alta e requer tratamento de sepse.
D — Incorreta. Antibiótico oral e alta são contraindicados diante de vômitos, PA de 70 × 40 mmHg e disfunção circulatória.

Revisão do sinalizador — a imagem apenas teria descartado cálculo, informação já expressa no texto; a conduta é definida pelos sinais clínicos de pielonefrite com choque.`

        ,'cm-infectologia-024': `Resposta correta — A. Gestante com síndrome febril e exantema em área de arboviroses, associada aos achados clínicos e hematológicos referidos, foi classificada pelo gabarito como dengue. Gestação aumenta risco e exige vigilância estreita; sinais de alarme ou incapacidade de hidratação justificam internação, hidratação venosa, analgesia segura e controle seriado de hematócrito e plaquetas.

Distratores:
B — Incorreta. Chikungunya costuma produzir artralgia intensa e incapacitante, frequentemente persistente, não apenas dores articulares leves.
C — Incorreta. Zika geralmente causa exantema pruriginoso, conjuntivite e febre baixa; controle diário de plaquetas não caracteriza seu manejo habitual.
D — Incorreta. Transfusão profilática de plaquetas não é indicada sem sangramento grave/limiar específico, e liberar logo após transfusão seria inadequado.

Validação documental pendente — os dados do exame físico e do hemograma foram omitidos na importação. Eles são indispensáveis para distinguir dengue de outras arboviroses e confirmar a necessidade de internação e hidratação intravenosa.`

        ,'cm-infectologia-025': `Resposta correta — C. TRM-TB positivo com resistência à rifampicina exige manter encaminhamento ao serviço de referência e investigar resistência com novo teste em amostra apropriada, cultura e teste de sensibilidade. Não se deve iniciar esquema básico como se fosse tuberculose sensível.

Distratores:
A — Incorreta. Baciloscopia não determina resistência e não invalida o resultado molecular nem justifica cancelar referência.
B — Incorreta. O encaminhamento é necessário justamente pela resistência detectada; esquema básico isolado pode ampliar resistência e falhar.
D — Incorreta. A conduta de encaminhar foi adequada, e a baciloscopia não é pré-requisito para reconhecer o diagnóstico molecular e a suspeita de resistência.`

        ,'cm-infectologia-026': `Resposta correta — A. Início abrupto de febre, mialgia, cefaleia, tosse e vários casos simultâneos na comunidade sugerem influenza; estertores e dispneia indicam pneumonia viral/complicação respiratória. Por pertencer a população indígena e apresentar doença respiratória com possível gravidade, está indicado oseltamivir precoce, sem aguardar confirmação.

Distratores:
B — Incorreta. Tuberculose tem evolução subaguda ou crônica e não causa surto de síndrome gripal em 36 horas.
C — Incorreta. Pneumonia bacteriana é possível como coinfecção, mas a apresentação em cluster e síndrome gripal favorecem influenza; a combinação antibiótica proposta também é redundante/inadequada sem avaliação de gravidade.
D — Incorreta. Febre alta, dispneia e estertores focais excedem um resfriado comum e exigem tratamento e investigação mais atentos.`

        ,'cm-infectologia-027': `Resposta correta — A. Úlcera genital única, indolor, de base limpa e bordas endurecidas, com adenopatia bilateral indolor e não supurativa, caracteriza cancro duro da sífilis primária. VDRL sérico é o teste indicado entre as opções, associado idealmente a teste treponêmico no fluxo diagnóstico.

Distratores:
B — Incorreta. Cultura em Thayer-Martin pesquisa Neisseria gonorrhoeae, que causa uretrite e secreção, não cancro indolor.
C — Incorreta. Haemophilus ducreyi causa cancro mole doloroso, com bordas irregulares e bubão frequentemente doloroso/supurativo.
D — Incorreta. Corpúsculos de Donovan sugerem donovanose, que causa úlcera granulomatosa friável e geralmente sem adenopatia verdadeira.

Ressalva técnica — testes não treponêmicos podem ser negativos muito precocemente; diante de forte suspeita, combina-se teste treponêmico e não treponêmico ou repete-se a sorologia, sem atrasar tratamento quando indicado.`

        ,'cm-infectologia-028': `Resposta correta — C. Contato com água doce em área endêmica, dermatite cercariana, sintomas intestinais, eosinofilia e hepatoesplenomegalia sugerem esquistossomose por Schistosoma mansoni. O Kato-Katz detecta e quantifica ovos; resultado positivo indica praziquantel e registro/notificação no sistema do programa conforme regras locais.

Distratores:
A — Incorreta. Metronidazol trata protozoários e anaeróbios, não esquistossomose.
B — Incorreta. Com ovos identificados nas fezes, sorologia IgG não é necessária para confirmar atividade e pode permanecer positiva após infecção passada.
D — Incorreta. Sedimentação espontânea pode aumentar investigação parasitológica, mas um único exame negativo não “descarta” nem define sozinho a hipótese; podem ser necessárias amostras repetidas ou métodos mais sensíveis.`

        ,'cm-infectologia-029': `Resposta correta — C. O gabarito indica arbovirose com sinais clínicos ou laboratoriais de alarme. Nesse contexto, hidratação intravenosa e internação em enfermaria permitem acompanhar perfusão, hematócrito, plaquetas, função hepática e evolução para extravasamento plasmático.

Distratores:
A — Incorreta. Alta com acompanhamento diário é reservada a pacientes sem sinais de alarme e capazes de hidratação oral.
B — Incorreta. Esperar a defervescência em casa pode ser perigoso, pois a fase crítica da dengue frequentemente começa quando a febre cede.
D — Incorreta. UTI é indicada em choque, sangramento grave ou disfunção orgânica importante; os sinais vitais descritos ainda não demonstram essa gravidade.

Validação documental pendente — os exames laboratoriais essenciais foram omitidos. É preciso conferir hematócrito, plaquetas, transaminases e demais dados para confirmar grupo C e afastar indicação de UTI.`

        ,'cm-infectologia-030': `Resposta correta — C. Bovinos são mamíferos suscetíveis, mas o protocolo de observação por dez dias é validado para cães e gatos, não para herbívoros. Em pessoa não previamente vacinada mordida por bovino, deve-se limpar vigorosamente a ferida e iniciar vacinação pós-exposição, avaliando o animal com vigilância/veterinário.

Distratores:
A — Incorreta. Não se deve adiar profilaxia apenas para observar bovino por dez dias, regra aplicável a cão e gato clinicamente sadios.
B — Incorreta. Dispensar vacina e observação expõe a risco de doença quase invariavelmente fatal.
D — Incorreta. Soro isolado nunca constitui esquema adequado; em ferida superficial, a vacina é indicada e a necessidade de imunoglobulina depende da classificação da exposição e condição do animal.

Ressalva técnica — se houver suspeita de raiva no bovino, a vigilância deve orientar coleta/diagnóstico animal e eventual complementação com imunoglobulina conforme gravidade e protocolo vigente.`

        ,'cm-infectologia-031': `Resposta correta — A. Febre persistente, lesão retiniana compatível com mancha de Roth, hemorragias subungueais e sopro cardíaco formam conjunto clássico de endocardite infecciosa. A investigação deve incluir múltiplas hemoculturas antes do antibiótico, quando possível, e ecocardiografia.

Distratores:
B — Incorreta. Leucemia pode causar febre, palidez e sangramento, mas não explica bem sopro novo associado a estigmas vasculares específicos.
C — Incorreta. Vasculite pode produzir púrpura, porém hemorragias em estilhaço, mancha de Roth e sopro favorecem embolização/inflamação por endocardite.
D — Incorreta. Lúpus pode causar endocardite estéril, mas faltam manifestações autoimunes e o cenário aponta primeiro para infecção.`

        ,'cm-infectologia-032': `Resposta correta — B. Para pessoa que recebeu dose válida de vacina contra febre amarela aos 29 anos, uma dose é considerada suficiente na rotina; encontrar primata morto exige comunicação à vigilância, mas não determina reforço automático nove anos depois.

Distratores:
A — Incorreta. O Brasil possui áreas com transmissão de febre amarela, e morte de primata é evento sentinela que deve ser investigado.
C — Incorreta. O usuário não deve aguardar anatomopatológico do animal para receber orientação; a investigação da epizootia é responsabilidade da vigilância.
D — Incorreta. Reforço indiscriminado não é indicado independentemente do histórico; situações especiais devem seguir recomendação sanitária vigente.

Ressalva técnica — recomendações podem ser intensificadas em resposta a epizootias e conforme área de risco. Deve-se verificar situação vacinal documentada e orientação atual da vigilância local.`

        ,'cm-infectologia-033': `Resposta correta — A. Na prova do laço pediátrica, calcula-se a pressão arterial média entre sistólica e diastólica, mantém-se o manguito insuflado nesse valor por três minutos e contam-se petéquias em área padronizada do antebraço. Mais de dez petéquias em criança torna o teste positivo.

Distratores:
B — Incorreta. Não se usa a pressão sistólica, e o ponto de corte de vinte petéquias é o adotado para adultos.
C — Incorreta. “Valor máximo” não corresponde à técnica e dez minutos excedem o tempo pediátrico.
D — Incorreta. Pressão diastólica isolada, dez minutos e corte adulto estão incorretos.`

        ,'cm-infectologia-034': `Resposta correta — C. Pessoa em situação de rua é população de alta vulnerabilidade para tuberculose. Tosse, mesmo com duração curta, deve motivar investigação precoce com escarro, preferencialmente teste rápido molecular quando disponível e baciloscopia conforme fluxo local.

Distratores:
A — Incorreta. Tomografia não é exame inicial de rastreamento e não substitui confirmação bacteriológica.
B — Incorreta. Etilismo pode causar deficiência de tiamina, mas cefaleia isolada sem síndrome neurológica não justifica priorizar essa dosagem sobre tuberculose transmissível.
D — Incorreta. Sífilis deve ser rastreada conforme risco, mas não explica a tosse e não é a prioridade epidemiológica do caso.

Ressalva técnica — o teste rápido molecular para tuberculose é geralmente preferível à baciloscopia isolada quando disponível; “BAAR” é mantido por ser a opção bacteriológica oferecida.`

        ,'cm-infectologia-035': `Resposta correta — B. Febre, dor intensa profunda, eritema e limitação dolorosa do quadril após trauma, imobilização e escoriações sugerem infecção osteoarticular profunda, como artrite séptica/osteomielite ou abscesso. Ressonância é o exame mais sensível para medula óssea, partes moles, derrame e extensão precoce.

Distratores:
A — Incorreta. Radiografia pode ser inicial, mas frequentemente é normal nas fases precoces e não delimita adequadamente partes moles.
C — Incorreta. Tomografia mostra melhor cortical e gás, porém é menos sensível que ressonância para alterações medulares e tecidos periarticulares iniciais.
D — Incorreta. Cintilografia é sensível, mas pouco específica e oferece menor definição anatômica quando ressonância está disponível.

Validação visual pendente — a imagem associada não foi preservada. O diagnóstico anatômico exato e a adequação da ressonância devem ser confirmados no PDF-fonte.`

        ,'cm-infectologia-036': `Resposta correta — A. Retorno recente da Amazônia, febre paroxística a cada 48 horas com calafrios, calor e sudorese, anemia e hepatoesplenomegalia indicam malária. Deve-se realizar imediatamente gota espessa e/ou esfregaço para espécie e parasitemia e iniciar antimalárico específico com suporte.

Distratores:
B — Incorreta. Chikungunya produz poliartralgia marcante e não febre periódica com esplenomegalia.
C — Incorreta. Febre amarela costuma ter curso agudo bifásico, icterícia e possível hemorragia/lesão renal, não um mês de paroxismos a cada 48 horas.
D — Incorreta. Chagas aguda pode causar febre prolongada, mas não o padrão paroxístico clássico; pesquisa a fresco não deve aguardar arbitrariamente 30 dias.`

        ,'cm-infectologia-037': `Resposta correta — B. Febre alta abrupta, cefaleia, mialgia, dor retro-orbitária, astenia e exantema em área urbana sem viagem são mais compatíveis epidemiologicamente com dengue, transmitida amplamente por Aedes.

Distratores:
A — Incorreta. Zika costuma provocar febre baixa ou ausente, exantema pruriginoso e conjuntivite.
C — Incorreta. Chikungunya é marcada por poliartralgia intensa, edema e rigidez, frequentemente persistentes; a dor foi leve e sem rigidez.
D — Incorreta. Febre amarela urbana não é o cenário provável e a doença costuma evoluir com maior repercussão hepática/hemorrágica em formas graves.`

        ,'cm-infectologia-038': `Resposta correta — D. Aos 64 anos, há indicação de vacinação contra herpes-zóster conforme disponibilidade e recomendação clínica, mesmo com história de varicela, pois o zóster resulta da reativação do vírus latente e o risco cresce com a idade.

Distratores:
A — Incorreta. Não existe vacina isolada de caxumba indicada nessa idade, e a paciente relata doença prévia.
B — Incorreta. Hepatite A prévia geralmente confere imunidade duradoura; vacinação não é a prioridade apresentada.
C — Incorreta. Tríplice viral tem recomendações por faixa etária e situação epidemiológica; aos 64 anos, com história de todas as três infecções, não é a opção indicada.

Ressalva técnica — a vacina recombinante contra zóster pode depender de disponibilidade fora do calendário público de rotina e de critérios vigentes; a indicação individual deve considerar imunossupressão e histórico vacinal.`

        ,'cm-infectologia-039': `Resposta correta — B. Exposição a água com caramujos, hematêmese/melena e sinais de hepatopatia sugerem esquistossomose hepatoesplênica com hipertensão portal e varizes. Ultrassonografia avalia fibrose periportal e esplenomegalia, endoscopia pesquisa/trata varizes e exame de fezes procura ovos de S. mansoni.

Distratores:
A — Incorreta. Reação intradérmica não diferencia infecção ativa e foi substituída por métodos mais úteis; falta avaliação ultrassonográfica da forma hepatoesplênica.
C — Incorreta. Ressonância, biópsia retal e IFI são excessivas como conjunto inicial e não priorizam a hemorragia digestiva.
D — Incorreta. Radiografia de tórax e PCR sanguínea não são exames iniciais para a forma intestinal/hepatoesplênica crônica.`

        ,'cm-infectologia-040': `Resposta correta — D. Exposição provável a água de enchente, febre, mialgia intensa em membros inferiores, sufusão conjuntival, icterícia e colúria constituem apresentação clássica de leptospirose, possivelmente forma grave de Weil com disfunção hepatorrenal.

Distratores:
A — Incorreta. Dengue causa febre, mialgia e sangramento, mas icterícia acentuada, sufusão conjuntival e dor em panturrilhas após enchente favorecem leptospirose.
B — Incorreta. Malária exige exposição em área de transmissão e costuma causar paroxismos febris, anemia e esplenomegalia.
C — Incorreta. Hepatite A pode causar icterícia e colúria, mas não explica bem sufusão conjuntival e mialgia intensa de membros inferiores ligada a inundação.

Validação documental pendente — os exames laboratoriais citados foram omitidos e devem ser conferidos, especialmente creatinina, bilirrubinas, plaquetas e potássio, para graduar a gravidade.`

        ,'cm-infectologia-041': `Resposta correta — D. Idoso estável, sem critérios de gravidade, com pneumonia adquirida na comunidade e comorbidades, pode ser tratado ambulatorialmente com combinação de beta-lactâmico/inibidor de beta-lactamase e macrolídeo. Amoxicilina-clavulanato mais azitromicina cobre pneumococo, H. influenzae e agentes atípicos.

Distratores:
A — Incorreta. Azitromicina isolada tem cobertura insuficiente para pneumococo em paciente com comorbidades e resistência local relevante.
B — Incorreta. Não há instabilidade, hipoxemia ou escore clínico que exija internação e ceftriaxona intravenosa.
C — Incorreta. Ampicilina-sulbactam intravenosa também seria hospitalar e desnecessária em paciente com boa perfusão, saturação normal e estado geral preservado.`

        ,'cm-infectologia-042': `Resposta correta — C. Tosse fétida, hemoptise, emagrecimento, imagem cavitária persistente e resposta insuficiente a antibiótico sugerem lesão pulmonar estrutural supurada, como abscesso crônico ou bronquiectasia localizada, que pode exigir ressecção do foco após avaliação especializada. A abordagem cirúrgica é considerada quando há falha clínica e radiológica prolongada ou complicação.

Distratores:
A — Incorreta. Trocar empiricamente para cobertura de multirresistentes sem cultura, exposição ou instabilidade não é a melhor conduta e não trata necessariamente uma cavidade estrutural.
B — Incorreta. Tuberculose deve ser reavaliada com cultura/broncoscopia conforme risco, mas TRM não detectável e o padrão clínico-imaginológico descrito não autorizam iniciar tratamento empírico automaticamente.
D — Incorreta. Persistência de febre e alterações após 20 dias não representa resposta lenta satisfatória; exige investigação de falha, complicação ou foco ressecável.

Validação visual pendente — as radiografias decisivas foram omitidas. É necessário confirmar cavidade, localização, extensão e evolução antes de validar a indicação de ressecção pulmonar.`

        ,'cm-infectologia-043': `Resposta correta — A. Dor profunda, febre, edema e hiperemia sobre região previamente operada sugerem osteomielite crônica agudizada ou infecção profunda do osso. Ressonância de pelve e membro inferior é mais sensível para medula, abscesso, tecidos moles e extensão da doença.

Distratores:
B — Incorreta. Radiografia pode mostrar alterações tardias, mas não é suficiente para localizar osteomielite precoce; o quadro não é primariamente uma artrite coxofemoral documentada.
C — Incorreta. Ultrassom com punção articular avalia derrame superficial, mas não caracteriza adequadamente infecção óssea profunda.
D — Incorreta. Cintilografia é menos específica e osteoartrose não explica febre, hiperemia e dor inflamatória intensa.`

        ,'cm-infectologia-044': `Resposta correta — A. Tosse, emagrecimento, sudorese noturna e febre em pessoa em situação de rua são altamente sugestivos de tuberculose e exigem investigação bacteriológica com escarro, cultura e teste de sensibilidade, além de rastreio de HIV, hepatites e sífilis. O cuidado deve incluir busca ativa de contatos e plano de adesão.

Distratores:
B — Incorreta. Radiografia não deve ser o único filtro e não se inicia tratamento apenas por alteração radiológica sem investigação bacteriológica quando possível.
C — Incorreta. Encaminhar para pneumologia apenas por qualquer positividade atrasa o cuidado; serviço de referência específico é necessário se houver resistência, não automaticamente.
D — Incorreta. Embora o tratamento diretamente observado seja importante, a alternativa não inclui cultura/teste de sensibilidade e a investigação deve ser completa desde o início.`

        ,'cm-infectologia-045': `Resposta correta — C. Em área de dengue, febre, exantema, mialgia e desidratação exigem prova do laço e avaliação clínica/otoscópica para não tratar erroneamente um quadro viral como otite bacteriana. Sem sinais de alarme descritos, hidratação oral e retorno no início da melhora da febre ou no quinto dia são adequados, com orientações de alerta.

Distratores:
A — Incorreta. Antibiótico não trata dengue e não há diagnóstico de otite bacteriana estabelecido.
B — Incorreta. Otoscopia é útil, mas amoxicilina sem confirmação de otite e sem investigar dengue é inadequada.
D — Incorreta. Não há indicação de hidratação venosa/observação por 24 horas apenas pelos dados descritos; é preciso reservar isso para sinais de alarme ou incapacidade de hidratação oral.`

        ,'cm-infectologia-046': `Resposta correta — B. Febre, sonolência, desidratação, abaulamento timpânico e alteração retroauricular sugerem otite média aguda complicada por mastoidite, que exige internação e antibiótico parenteral como ceftriaxona. Prova do laço negativa não exclui dengue, mas o foco bacteriano e os sinais locais dominam a conduta.

Distratores:
A — Incorreta. Um quadro otológico com possível mastoidite não deve ser manejado apenas como dengue nem esperar sorologia para iniciar antibiótico e internação.
C — Incorreta. Mastoidite não é tratada ambulatorialmente com amoxicilina-clavulanato oral isolada; a criança tem sinais de gravidade.
D — Incorreta. Não é seguro descartar dengue por prova do laço negativa, e a suspeita de mastoidite impede alta e tratamento oral simples.`

        ,'cm-infectologia-047': `Resposta correta — D. Úlcera cutânea indolor em pessoa exposta na Amazônia, de evolução progressiva e aspecto compatível com lesão de transmissão vetorial, sugere leishmaniose tegumentar. Antimoniato de meglumina é uma opção terapêutica sistêmica conforme forma clínica, espécie, extensão e protocolo local.

Distratores:
A — Incorreta. Blastomicose/paracoccidioidomicose podem produzir lesões cutâneas, mas o perfil epidemiológico e aspecto da lesão favorecem leishmaniose.
B — Incorreta. Carcinoma espinocelular é possível em lesão crônica, mas idade, exposição amazônica e evolução relativamente curta tornam leishmaniose mais provável; confirmação parasitológica é necessária.
C — Incorreta. Hanseníase geralmente produz máculas/placas com alteração de sensibilidade e nervos espessados, não úlcera única típica de inoculação.

Validação visual pendente — a imagem da lesão não foi preservada. O diagnóstico e a necessidade de antimoniato devem ser confirmados visualmente e, idealmente, com exame parasitológico/biopsia.`

        ,'cm-infectologia-048': `Resposta correta — D. Febre persistente, distensão, íleo, dor e leucocitose no sétimo dia após cirurgia por diverticulite perfurada sugerem coleção ou complicação intra-abdominal, mesmo sem sinais na ferida ou colostomia. A tomografia contrastada de abdome e pelve é o exame de escolha para localizar abscesso, vazamento ou obstrução e orientar drenagem/cirurgia.

Distratores:
A — Incorreta. Pneumonia pode ocorrer no pós-operatório, mas o quadro abdominal dominante e íleo tornam foco intra-abdominal prioritário.
B — Incorreta. Não há achados urinários; urina pode ser coletada na investigação de sepse, mas não é o exame principal.
C — Incorreta. O paciente tem provável foco, porém a alternativa propõe culturas inespecíficas sem a imagem essencial para diagnosticar e controlar a coleção.`

        ,'cm-infectologia-049': `Resposta correta — C. Febre única de 38,5 °C em criança em quimioterapia e com cateter central deve ser tratada como possível neutropenia febril até prova em contrário. É necessário hemograma, hemocultura periférica e de cada lúmen do cateter e marcadores/avaliação inflamatória, iniciando antibiótico empírico rapidamente conforme neutropenia e risco.

Distratores:
A — Incorreta. Antibiótico precoce pode ser necessário, mas troca imediata do cateter não é rotina sem suspeita específica de infecção relacionada e avaliação de culturas.
B — Incorreta. Ausência de foco físico não exclui bacteremia em neutropenia; investigação é obrigatória.
D — Incorreta. Não se deve esperar o resultado do hemograma para colher culturas e iniciar avaliação de febre em paciente oncológica; a abordagem é imediata.

Ressalva técnica — a classificação formal de neutropenia e a escolha antibiótica dependem do hemograma e do protocolo institucional, mas a propedêutica não deve ser adiada.`

        ,'cm-infectologia-050': `Resposta correta — C. Suspeita de Chikungunya deve ser notificada conforme vigilância, sem esperar confirmação laboratorial, e manejada inicialmente com analgesia segura, repouso e hidratação. A equipe deve investigar casos, orientar a comunidade e eliminar criadouros do Aedes em ação integrada.

Distratores:
A — Incorreta. Não se aguarda sorologia para notificar suspeita e não há indicação de internação automática em paciente sem sinais de gravidade.
B — Incorreta. Corticosteroide não é tratamento inicial rotineiro da fase aguda e notificação não deve depender de confirmação.
D — Incorreta. A assistência e vigilância não devem ser transferidas automaticamente a centro de referência; a atenção primária pode conduzir a maioria dos casos e articular encaminhamento quando necessário.`
    };

    const explanationAliases = {
        'prev-inep-084': 'psi-inep-002',
        'prev-inep-090': 'psi-inep-009',
        'pediatria-inep-011': 'prev-inep-094',
        'pediatria-inep-074': 'prev-inep-093',
        'obstetricia-inep-002': 'pediatria-inep-002',
        'obstetricia-inep-015': 'ginecologia-inep-016',
        'obstetricia-inep-020': 'prev-inep-092',
        'obstetricia-inep-025': 'prev-inep-091'
    };

    const bank = window.TRYCKTRACK_QUESTION_BANK || [];
    bank.forEach(question => {
        const canonicalId = explanationAliases[question.id] || question.id;
        if (explanations[canonicalId]) question.explanation = explanations[canonicalId];
    });

    // Reutiliza o comentário nas cópias da mesma questão presentes em
    // coleções diferentes (por exemplo, grande área e prova na íntegra).
    // A chave normaliza apenas ruídos de OCR; gabarito e alternativas
    // também precisam coincidir para evitar associação indevida.
    const normalizeQuestionText = value => String(value || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, ' ')
        .trim();
    const questionFingerprint = question => {
        const optionText = Object.entries(question.options || {})
            .sort(([left], [right]) => left.localeCompare(right))
            .map(([letter, text]) => `${letter}:${normalizeQuestionText(text)}`)
            .join('|');
        return `${normalizeQuestionText(question.stem)}||${question.answer || ''}||${optionText}`;
    };
    const explanationByFingerprint = new Map();
    bank.forEach(question => {
        if (question.explanation) explanationByFingerprint.set(questionFingerprint(question), question.explanation);
    });
    bank.forEach(question => {
        if (!question.explanation) {
            const reused = explanationByFingerprint.get(questionFingerprint(question));
            if (reused) question.explanation = reused;
        }
    });

    // As provas completas carregam o ano no nome do exame (ex.: 2025.1),
    // enquanto as coleções por área normalmente não carregam essa informação.
    // Propaga apenas o ano inteiro para cópias com a mesma questão, sem levar
    // o semestre para o filtro (2025.1 -> 2025).
    const yearsByFingerprint = new Map();
    bank.forEach(question => {
        const examLabel = String(question.examName || question.source || '');
        const years = [...examLabel.matchAll(/20\d{2}/g)].map(match => match[0]);
        if (!years.length || !question.examId) return;
        const fingerprint = questionFingerprint(question);
        const existing = yearsByFingerprint.get(fingerprint) || new Set();
        years.forEach(year => existing.add(year));
        yearsByFingerprint.set(fingerprint, existing);
    });
    bank.forEach(question => {
        const years = yearsByFingerprint.get(questionFingerprint(question));
        if (!years?.size) return;
        question.examYears = [...new Set([...(question.examYears || []), ...years])].sort().reverse();
        if (!question.examYear) question.examYear = question.examYears[0];
    });

    // Algumas provas completas acrescentam títulos/blocos ao início do
    // enunciado, por isso a fingerprint completa não coincide. Como segunda
    // etapa conservadora, relaciona apenas uma questão com uma única prova
    // cujo enunciado contenha o mesmo texto longo e cujo gabarito coincida.
    const examQuestions = bank.filter(question => question.examId);
    const stemMatches = question => {
        const stem = normalizeQuestionText(question.stem);
        if (stem.length < 100) return [];
        return examQuestions.filter(candidate => candidate.answer === question.answer && (() => {
            const other = normalizeQuestionText(candidate.stem);
            return other.includes(stem) || stem.includes(other);
        })());
    };
    bank.forEach(question => {
        if (question.examId || question.examYears?.length) return;
        const matches = stemMatches(question);
        if (matches.length !== 1) return;
        const years = matches[0].examYears || [...String(matches[0].examName || '').matchAll(/20\d{2}/g)].map(match => match[0]);
        if (!years.length) return;
        question.examYears = [...new Set(years)].sort().reverse();
        question.examYear = question.examYears[0];
    });

    // Quando a questão da prova e a questão por área já compartilham a mesma
    // explicação canônica, essa explicação funciona como uma terceira chave de
    // segurança para propagar o ano automaticamente nas próximas análises.
    const yearsByExplanation = new Map();
    bank.forEach(question => {
        if (!question.examId || !question.explanation || !question.examYears?.length) return;
        const existing = yearsByExplanation.get(question.explanation) || new Set();
        question.examYears.forEach(year => existing.add(year));
        yearsByExplanation.set(question.explanation, existing);
    });
    bank.forEach(question => {
        if (question.examId || !question.explanation || question.examYears?.length) return;
        const years = yearsByExplanation.get(question.explanation);
        if (!years?.size) return;
        question.examYears = [...years].sort().reverse();
        question.examYear = question.examYears[0];
    });
    window.TRYCKTRACK_QUESTION_EXPLANATIONS = explanations;
    window.TRYCKTRACK_QUESTION_EXPLANATION_ALIASES = explanationAliases;
})();
