/* Bullets — Clínica Médica. Ver bullets-pediatria.js pro schema e a
   nota de como isso é usado. Extraído de DECOREBA - CM.pdf (Sanar),
   conferido página a página (22 páginas) contra o PDF original. */
(function () {
    const bullets = [
        {
            id: 'cm-2026-tep-aha-acc',
            area: 'Clínica Médica',
            titulo: 'Nova Diretriz AHA/ACC para TEP - Categorias A a E',
            atualizacao2026: true,
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Categoria</th><th>Perfil Clínico</th><th>Hemodinâmica</th><th>Biomarcadores/VD</th><th>Conduta</th></tr></thead><tbody>
<tr><td>A</td><td>Assintomático</td><td>Estável</td><td>Normais</td><td>Alta da emergência sem internação</td></tr>
<tr><td>B</td><td>Sintomático, baixo escore de gravidade</td><td>Estável</td><td>Normais</td><td>Alta precoce com anticoagulação oral</td></tr>
<tr><td>C</td><td>Sintomático, escore elevado (PESI III-V ou sPESI ≥1)</td><td>Estável</td><td>Elevados e/ou disfunção de VD</td><td>Internação obrigatória; considerar PERT</td></tr>
<tr><td>D</td><td>Falência cardiopulmonar iminente</td><td>Comprometida</td><td>Alterados</td><td>Internação em UTI; considerar terapia avançada</td></tr>
<tr><td>E</td><td>Choque/parada cardiorrespiratória</td><td>Instável (hipotensão persistente)</td><td>Gravemente alterados</td><td>UTI urgente; trombolítico ou trombectomia</td></tr>
</tbody></table></div>
<ul class="reader-sublist">
  <li><strong>Categorias A e B:</strong> pacientes assintomáticos (A) podem receber alta direto da emergência sem necessidade de internação. Sintomáticos com baixo escore de gravidade (B) são candidatos à alta precoce com anticoagulação oral.</li>
  <li><strong>Categorias C, D e E:</strong> internação obrigatória. Quanto mais grave a categoria, maior a necessidade de monitorização intensiva e intervenção terapêutica avançada.</li>
</ul>`
        },
        {
            id: 'cm-2026-erradicacao-h-pylori',
            area: 'Clínica Médica',
            titulo: 'Erradicação H. Pylori',
            atualizacao2026: true,
            html: `<p><strong>1ª linha de tratamento:</strong></p>
<ul class="reader-sublist">
  <li><strong>Esquema quádruplo</strong> com bismuto, metronidazol e tetraciclina com IBP ou PCAB (quando disponível) por <strong>10 a 14 dias</strong></li>
  <li><strong>Terapia tríplice</strong> de claritromicina e amoxicilina por 14 dias, otimizada com associação ao bismuto e/ou substituição do IBP pelo PCAB (quando disponível) duas vezes ao dia</li>
  <li>Na indisponibilidade do bismuto: <strong>terapia dupla</strong> com amoxicilina 3–4 g/dia (3–4 tomadas/dia) + IBP em dose alta (3–4x/dia), ou preferencialmente PCAB (Vonoprazan 20 mg 2x/dia), por 14 dias</li>
  <li><strong>Terapia concomitante</strong> com IBP ou PCAB por 14 dias pode ser uma opção</li>
</ul>
<p><strong>2ª linha de tratamento</strong> (regra de ouro: não repetir o esquema usado em 1ª linha):</p>
<ul class="reader-sublist">
  <li>Esquema quádruplo com bismuto, metronidazol e tetraciclina com IBP ou PCAB por 10 a 14 dias</li>
  <li>Esquema <strong>amoxicilina-levofloxacino-bismuto</strong> associado a IBP ou PCAB por 14 dias</li>
  <li>Na indisponibilidade do bismuto: terapia dupla com amoxicilina 3–4 g/dia + IBP em dose alta, ou preferencialmente PCAB (Vonoprazan 20 mg 2x/dia), por 14 dias</li>
</ul>`
        },
        {
            id: 'cm-2026-e-dgbi-roma-v',
            area: 'Clínica Médica',
            titulo: 'Desordens Esofágicas da Interação Cérebro-Intestino (E-DGBI) - ROMA V',
            atualizacao2026: true,
            html: `<ul class="reader-sublist">
  <li>Roma V renomeou as antigas "desordens esofágicas funcionais" como <strong>desordens esofágicas da interação cérebro-intestino (E-DGBI)</strong></li>
</ul>
<p><strong>Diagnóstico só deve ser feito após excluir:</strong></p>
<ul class="reader-sublist">
  <li>Doença estrutural (endoscopia)</li>
  <li>DRGE significativa (pHmetria/impedância)</li>
  <li>Distúrbios motores maiores (manometria esofágica) — atenção: motilidade esofágica ineficaz (MEI) <strong>não exclui</strong> E-DGBI</li>
  <li>Esofagite eosinofílica (com biópsia esofágica, quando indicado) → deve ser <strong>ativamente excluída</strong>, especialmente em disfagia e dor torácica relacionada à alimentação</li>
</ul>`
        },
        {
            id: 'cm-2026-sii-roma-v',
            area: 'Clínica Médica',
            titulo: 'Síndrome do Intestino Irritável (adulto) - ROMA V',
            atualizacao2026: true,
            html: `<ul class="reader-sublist">
  <li><strong>Roma IV:</strong> aceitava apenas <em>dor abdominal</em> como sintoma central. <strong>Roma V:</strong> reincorpora <strong>dor e/ou desconforto abdominal</strong> ao critério diagnóstico.</li>
  <li><strong>Roma IV</strong> exigia sintomas ≥1 dia/semana; <strong>Roma V</strong> reduz para <strong>≥3 dias/mês</strong>, em média, nos últimos 3 meses.</li>
  <li>Adicionada exigência de que a dor/desconforto seja <strong>recorrente, mas NÃO contínuo</strong> → objetivo é diferenciar SII da síndrome de dor abdominal de mediação central (antiga dor abdominal funcional), que se caracteriza por dor abdominal constante, sem relação com a defecação.</li>
</ul>`
        },
        {
            id: 'cm-2026-dispepsia-funcional-roma-v',
            area: 'Clínica Médica',
            titulo: 'Dispepsia Funcional - ROMA V',
            atualizacao2026: true,
            imagem: 'assets/bullets/img/upd2026-dispepsia-fluxograma.png',
            html: `<ul class="reader-sublist">
  <li><strong>Roma IV:</strong> a dor epigástrica podia ocorrer pós-prandialmente ou independentemente das refeições, gerando grande sobreposição entre EPS (síndrome da dor epigástrica) e PDS (síndrome do desconforto pós-prandial).</li>
  <li><strong>Roma V:</strong> a dor/queimação epigástrica pós-prandial, quando ocorre <em>junto com sintomas de PDS</em> (plenitude pós-prandial ou saciedade precoce), passa a ser classificada como PDS — e não como EPS.</li>
  <li>Sintomas desencadeados ou piorados pela refeição devem surgir em <strong>até 2 horas</strong> após a ingestão. Foi introduzida subdivisão provisória do EPS (na ausência de PDS), em "relacionadas" e "não-relacionadas" a refeições, para pesquisa.</li>
</ul>`
        },
        {
            id: 'cm-diagnostico-diabetes',
            area: 'Clínica Médica',
            titulo: 'Diagnóstico de Diabetes',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Critério</th><th>Valor de referência</th></tr></thead><tbody>
<tr><td>Glicemia de jejum</td><td>≥ 126 mg/dL</td></tr>
<tr><td>Glicemia 1h após TOTG 75g</td><td>≥ 209 mg/dL</td></tr>
<tr><td>Glicemia 2h após TOTG 50–75g</td><td>≥ 200 mg/dL</td></tr>
<tr><td>Glicemia aleatória + sintomas</td><td>≥ 200 mg/L</td></tr>
<tr><td>HbA1c</td><td>≥ 6,5%</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cm-gradacao-hipoglicemia',
            area: 'Clínica Médica',
            titulo: 'Gradação - Hipoglicemia',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Grau</th><th>Glicemia (mg/dL)</th><th>Características clínicas</th></tr></thead><tbody>
<tr><td>Hipoglicemia leve / Nível 1</td><td>54–69 mg/dL</td><td>Sintomas adrenérgicos: tremor, sudorese, palpitações, fome; paciente consegue se autotratar</td></tr>
<tr><td>Hipoglicemia significativa / Nível 2</td><td>&lt; 54 mg/dL</td><td>Maior risco de complicações, sintomas neuroglicopênicos: confusão, dificuldade de concentração, visão turva</td></tr>
<tr><td>Hipoglicemia grave / Nível 3</td><td>Qualquer valor que cause <strong>alteração mental significativa ou necessidade de assistência</strong></td><td>Estado de inconsciência, convulsões ou incapacidade de se autotratar; risco de morte se não tratada</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cm-triade-whipple',
            area: 'Clínica Médica',
            titulo: 'Tríade de Whipple - Insulinoma',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Componente</th><th>Descrição</th></tr></thead><tbody>
<tr><td>1. Sintomas de hipoglicemia</td><td>Manifestações neuroglicopênicas (confusão, irritabilidade, visão turva, convulsões, coma) e/ou adrenérgicas (tremores, palpitações, sudorese, fome).</td></tr>
<tr><td>2. Glicemia baixa durante os sintomas</td><td>Glicose plasmática &lt; 55 mg/dL (ou &lt; 50 mg/dL, dependendo da fonte) durante o episódio.</td></tr>
<tr><td>3. Alívio dos sintomas após administração de glicose</td><td>Os sintomas desaparecem quando a glicemia é corrigida.</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cm-classificacao-neuropatia-periferica',
            area: 'Clínica Médica',
            titulo: 'Classificação Neuropatia Periférica',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Risco</th><th>Características</th><th>Rastreamento de fatores de risco</th><th>Recomendação</th></tr></thead><tbody>
<tr><td>0 – Muito baixo</td><td>Sem PSP e sem DAP</td><td>Uma vez por ano</td><td>Exame anual dos pés; autocuidado dos pés; exercícios de mobilidade</td></tr>
<tr><td>1 – Baixo</td><td>PSP ou DAP</td><td>A cada 6 meses a 12 meses</td><td>Educação estruturada; exercícios de mobilidade; órteses SN**; tratamento de lesões pré-ulcerativas</td></tr>
<tr><td>2 – Moderado</td><td>PSP + DAP ou PSP + DEF ou DAP + DEF</td><td>A cada 3 meses a 6 meses</td><td>Educação estruturada; exercícios de mobilidade; calçados terapêuticos; órteses SN**; tratamento de lesões pré-ulcerativas</td></tr>
<tr><td>3 – Alto</td><td>PSP e/ou DAP + UP ou + AMP ou + IRC grau V</td><td>A cada 1 mês a 3 meses</td><td>Educação estruturada; calçado terapêutico; órteses SN**; tratamento de lesões pré-ulcerativas; cuidados integrados</td></tr>
</tbody></table></div>
<p><strong>Legenda:</strong></p>
<ul class="reader-list">
<li><strong>PSP:</strong> Perda de Sensibilidade Protetora</li>
<li><strong>DAP:</strong> Doença Arterial Periférica</li>
<li><strong>DEF:</strong> Deformidade</li>
<li><strong>UP:</strong> Úlcera de Pé</li>
<li><strong>AMP:</strong> Amputação</li>
<li><strong>IRC:</strong> Insuficiência Renal Crônica</li>
</ul>`
        },
        {
            id: 'cm-hipertensao-arterial-classificacao',
            area: 'Clínica Médica',
            titulo: 'Hipertensão Arterial - Classificação',
            html: `<div class="reader-table-wrap"><table class="reader-table pa-table"><thead><tr><th>Classificação da PA</th><th>PAS (mmHg)</th><th></th><th>PAD (mmHg)</th></tr></thead><tbody>
<tr class="sev-ok"><td>PA normal</td><td>&lt; 120</td><td>e</td><td>&lt; 80</td></tr>
<tr class="sev-alerta"><td>Pré-hipertensão</td><td>120–139</td><td>e/ou</td><td>80–89</td></tr>
<tr class="sev-grave"><td>HA Estágio 1</td><td>140–159</td><td>e/ou</td><td>90–99</td></tr>
<tr class="sev-grave"><td>HA Estágio 2</td><td>160–179</td><td>e/ou</td><td>100–109</td></tr>
<tr class="sev-grave"><td>HA Estágio 3</td><td>≥ 180</td><td>e/ou</td><td>110</td></tr>
</tbody></table></div>
<ul class="reader-list">
<li><strong>Pressão normal</strong>: &lt; 120/80 mmHg</li>
<li>Meta terapêutica: <strong>PA alvo: &lt;130/80 mmHg para todos os grupos com hipertensão</strong>
<ul class="reader-list reader-sublist">
<li>Quando não for factível essa meta → reduzir PA até o menor valor tolerado</li>
<li>Não há limite pressórico inferior (mesmo que, por exemplo, valores PAS &lt; 120, a recomendação é manter o tto caso o paciente esteja assintomático)</li>
</ul></li>
</ul>`
        },
        {
            id: 'cm-crises-hipertensivas',
            area: 'Clínica Médica',
            titulo: 'Crises hipertensivas',
            html: `<p><em>PA ≥ 180×110 mmHg</em></p>
<ul class="reader-list">
<li><strong>Mudança da nomenclatura da urgência hipertensiva para "elevação da PA sem lesão de órgão-alvo",</strong> deve ser abordada com observação por 30 minutos, drogas orais (clonidina, captopril) e ajuste anti-hipertensivo crônico com reavaliação ambulatorial entre 1 e 7 dias e alvo de PA &lt; 160×100 mmHg.</li>
<li><strong>Emergência hipertensiva</strong> depende do status clínico (lesão de órgão alvo), <strong>independentemente dos níveis pressóricos</strong>.</li>
<li><strong>Meta na emergência hipertensiva:</strong>
<ul class="reader-list reader-sublist">
<li>Crises catecolaminérgicas ou edema agudo de pulmão → ↓ PAS &lt; 140 na 1ª hora</li>
<li>Dissecção aguda de aorta → ↓ PAS &lt; 120 na 1ª hora</li>
<li>Outros:
<ul class="reader-list reader-sublist">
<li>↓ PAS 25% na 1ª hora</li>
<li>↓ 160×100-110 em 2-6 horas</li>
<li>↓ valores normais em 24-48h</li>
</ul></li>
</ul></li>
</ul>`
        },
        {
            id: 'cm-retinopatia-hipertensiva',
            area: 'Clínica Médica',
            titulo: 'Classificação Retinopatia Hipertensiva',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Grau</th><th>Achados</th></tr></thead><tbody>
<tr><td>I</td><td><u>Estreitamento</u> arteriolar difuso ou <strong>tortuosidade leve</strong></td></tr>
<tr><td>II</td><td>Estreitamento arteriolar <strong>mais acentuado</strong>, <u>cruzamentos</u> arteriovenosos (<strong>sinal de Salus / Gunn / Bonnet</strong>)</td></tr>
<tr><td>III</td><td>Alterações grau II + <strong>exsudatos algodonosos</strong>, <u>hemorragias</u> em chama ou puntiformes</td></tr>
<tr><td>IV</td><td>Alterações grau III + <u>edema de papila</u> (papiledema)</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cm-dislipidemia',
            area: 'Clínica Médica',
            titulo: 'Dislipidemia - Metas Terapêuticas',
            html: `<ul class="reader-list">
<li><strong>Abordagem inicial:</strong> lipidograma + ApoB + lipoproteína (a)</li>
</ul>
<div class="reader-callout reader-callout-bloco">
<p><strong>ApoB</strong> → deve ser encarada como meta complementar (secundária) sobretudo quando LDL e colesterol não-HDL estão controlados. Também possui importância em indivíduos com TG elevados.</p>
<p><strong>Lipoproteína (a)</strong> → recomenda-se a dosagem de Lp(a) uma vez na vida em todos os adultos, para identificação de risco residual elevado.</p>
</div>
<ul class="reader-list">
<li><strong>Novo risco:</strong> RISCO EXTREMO</li>
<li><strong>Quem é de RISCO EXTREMO?</strong>
<ul class="reader-list reader-sublist">
<li>Múltiplos eventos cardiovasculares ateroscleróticos maiores</li>
<li>OU</li>
<li>1 evento cardiovascular aterosclerótico maior + 2 ou mais condições de alto risco</li>
</ul></li>
</ul>
<p><strong>Valores referenciais do perfil lipídico e alvos terapêuticos:</strong></p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Parâmetro</th><th>Em jejum (12h)</th><th>Sem jejum</th><th>Categoria de risco</th></tr></thead><tbody>
<tr><td rowspan="1">Triglicérides</td><td>&lt; 150 mg/dL</td><td>&lt; 175 mg/dL</td><td>—</td></tr>
<tr><td>HDL-c</td><td>&lt; 40 mg/dL</td><td>&lt; 40 mg/dL</td><td>—</td></tr>
<tr><td rowspan="5">LDL-c</td><td>&lt; 115 mg/dL</td><td>&lt; 115 mg/dL</td><td>Baixo</td></tr>
<tr><td>&lt; 100 mg/dL</td><td>&lt; 100 mg/dL</td><td>Intermediário</td></tr>
<tr><td>&lt; 70 mg/dL</td><td>&lt; 70 mg/dL</td><td>Alto</td></tr>
<tr><td>&lt; 50 mg/dL</td><td>&lt; 50 mg/dL</td><td>Muito alto</td></tr>
<tr><td>&lt; 40 mg/dL</td><td>&lt; 40 mg/dL</td><td>Extremo</td></tr>
<tr><td rowspan="5">Não-HDL-c</td><td>&lt; 145 mg/dL</td><td>&lt; 145 mg/dL</td><td>Baixo</td></tr>
<tr><td>&lt; 130 mg/dL</td><td>&lt; 130 mg/dL</td><td>Intermediário</td></tr>
<tr><td>&lt; 100 mg/dL</td><td>&lt; 100 mg/dL</td><td>Alto</td></tr>
<tr><td>&lt; 80 mg/dL</td><td>&lt; 80 mg/dL</td><td>Muito alto</td></tr>
<tr><td>&lt; 70 mg/dL</td><td>&lt; 70 mg/dL</td><td>Extremo</td></tr>
<tr><td rowspan="5">Apolipoproteína B</td><td>&lt; 100 mg/dL</td><td>&lt; 100 mg/dL</td><td>Baixo</td></tr>
<tr><td>&lt; 90 mg/dL</td><td>&lt; 90 mg/dL</td><td>Intermediário</td></tr>
<tr><td>&lt; 70 mg/dL</td><td>&lt; 70 mg/dL</td><td>Alto</td></tr>
<tr><td>&lt; 55 mg/dL</td><td>&lt; 55 mg/dL</td><td>Muito alto</td></tr>
<tr><td>&lt; 45 mg/dL</td><td>&lt; 45 mg/dL</td><td>Extremo</td></tr>
<tr><td>Lipoproteína(a)</td><td>&lt; 75 nmol/L (&lt; 30 mg/dL)</td><td>&lt; 75 nmol/L (&lt; 30 mg/dL)</td><td>Valor usado para <strong>estratificação de risco cardiovascular</strong>. Sem meta terapêutica definida.</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cm-neoplasias-aids',
            area: 'Clínica Médica',
            titulo: 'Neoplasias definidoras de AIDS',
            html: `<p>As neoplasias definidoras de AIDS (imunodeficiência adquirida) são:</p>
<ul class="reader-list">
<li><strong>Sarcoma de Kaposi</strong></li>
<li><strong>Linfoma não-Hodgkin</strong></li>
<li><strong>Câncer cervical invasivo.</strong></li>
</ul>`
        },
        {
            id: 'cm-sindromes-febris',
            area: 'Clínica Médica',
            titulo: 'Síndromes Febris',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Doença</th><th>Agente</th><th>Transmissão</th><th>Sintomas principais</th><th>Manifestações graves</th><th>Tratamento / Profilaxia</th></tr></thead><tbody>
<tr><td>Dengue</td><td>Vírus da dengue (Flavivírus, sorotipos 1-4)</td><td>Picada do mosquito Aedes aegypti</td><td>Febre alta, cefaleia, dor retro-orbital, mialgia, artralgia, exantema</td><td>Hemorragias, choque por dengue grave</td><td>Suporte clínico (hidratação, analgésicos sem AAS)</td></tr>
<tr><td>Chikungunya</td><td>Vírus chikungunya (Togavirus)</td><td>Picada do mosquito Aedes aegypti / albopictus</td><td>Febre, poliartralgia intensa, mialgia, exantema</td><td>Artrite crônica em alguns casos</td><td>Suporte clínico, analgésicos e anti-inflamatórios</td></tr>
<tr><td>Zika</td><td>Vírus Zika (Flavivírus)</td><td>Picada do mosquito Aedes, transmissão sexual</td><td>Febre baixa, exantema maculopapular, conjuntivite, artralgia leve</td><td>Síndrome de Guillain-Barré, microcefalia fetal</td><td>Suporte clínico, prevenção da gestação durante epidemia</td></tr>
<tr><td>Febre Amarela</td><td>Vírus da febre amarela (Flavivírus)</td><td>Mosquito Aedes e Haemagogus</td><td>Febre, calafrios, cefaleia, mialgia, <strong>icterícia</strong></td><td>Hemorragias, insuficiência hepática e renal, choque</td><td>Vacina, suporte clínico em casos graves</td></tr>
<tr><td>Leptospirose</td><td>Leptospira spp. (bactéria espiroqueta)</td><td>Contato com água ou solo contaminado por urina de roedores</td><td>Febre, cefaleia, mialgia (panturrilhas), calafrios, sufusão conjuntival</td><td><strong>Icterícia</strong>, insuficiência renal HIPOCALÊMICA, hemorragias, meningite</td><td>Antibióticos (doxiciclina, penicilina), suporte clínico</td></tr>
<tr><td>Leishmaniose Visceral</td><td>Leishmania chagasi</td><td>Picada de mosquito flebotomíneo (Lutzomyia)</td><td>Febre prolongada, perda de peso, hepatoesplenomegalia, pancitopenia</td><td>Insuficiência hepática/renal, morte se não tratada</td><td>Antimoniais, anfotericina B lipossomal</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cm-intoxicacoes-medicamentosas',
            area: 'Clínica Médica',
            titulo: 'Intoxicações Medicamentosas',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Fármaco / Substância</th><th>Principais Sinais/Sintomas</th><th>Achados laboratoriais / ECG</th><th>Tratamento Inicial / Antídoto</th></tr></thead><tbody>
<tr><td>Paracetamol</td><td>Inicialmente assintomático ou náuseas, vômitos, mal-estar</td><td>ALT/AST elevadas após 24–48h, bilirrubinas aumentadas</td><td><strong>N-acetilcisteína (NAC)</strong>, suporte hepático, monitorar função hepática</td></tr>
<tr><td>Digitálicos (digoxina)</td><td>Náuseas, vômitos, fadiga, confusão, arritmias (PVCs, bloqueios AV)</td><td>Hipocalemia aumenta toxicidade</td><td><strong>Digoxina-specific antibody (Fab fragments)</strong> se grave, correção eletrólitos, monitorização cardíaca</td></tr>
<tr><td>Colinérgicos (organofosforados, pilocarpina)</td><td>Salivação, lacrimejamento, diarreia, urinação, broncoconstrição, miose</td><td>Hiperatividade colinérgica; avaliação enzima colinesterase plasmática</td><td><strong>Atropina</strong> (antagonista muscarínico), <strong>pralidoxima</strong> se organofosforado, suporte respiratório</td></tr>
<tr><td>Opioides</td><td>Sedação profunda, miose, depressão respiratória, hipotensão</td><td>Glicemia normal, respiratória deprimida</td><td><strong>Naloxona</strong>, suporte ventilatório, monitorização</td></tr>
<tr><td>Betabloqueadores</td><td>Bradicardia, hipotensão, fadiga, broncoespasmo</td><td>ECG: bradicardia, bloqueios AV, QRS normal ou prolongado</td><td><strong>Glucagon IV</strong>, suporte hemodinâmico, monitorização cardíaca</td></tr>
<tr><td>Benzodiazepínicos</td><td>Sonolência, confusão, ataxia, depressão respiratória rara isolada</td><td>Geralmente normal</td><td><strong>Flumazenil</strong> (cautela se uso crônico ou polifármacos), suporte respiratório</td></tr>
<tr><td>Tricíclicos (antidepressivos TCA)</td><td>Confusão, sedação, arritmias ventriculares, convulsões, hipotensão, taquicardia, pele seca</td><td>ECG: QRS prolongado, taquicardia, desvio eixo</td><td><strong>Bicarbonato de sódio IV</strong>, suporte cardíaco e respiratório, monitorização</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cm-acidentes-ofidicos',
            area: 'Clínica Médica',
            titulo: 'Acidentes Ofídicos',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Tipo de Cobra</th><th>Nome do Acidente</th><th>Principais Sintomas</th></tr></thead><tbody>
<tr><td>Jararaca</td><td>Acidente botrópico</td><td>Dor intensa local, edema, equimoses, bolhas, sangramentos, necrose tecidual; sinais sistêmicos: hemorragias, hipotensão, coagulopatia</td></tr>
<tr><td>Surucucu</td><td>Acidente laquético</td><td>Semelhante ao Bothrops, porém com quadro mais rápido e intenso: dor abdominal, vômitos, hipotensão, choque; sangramentos e necrose podem ocorrer</td></tr>
<tr><td>Cascavel</td><td>Acidente crotálico</td><td>Dor discreta, edema local leve, <u>fraqueza muscular</u>, ptose, disfagia, insuficiência respiratória, <u>rabdomiólise</u>, alterações neurológicas</td></tr>
<tr><td>Coral</td><td>Acidente elapídico</td><td>Pouca dor local, parestesias, fraqueza muscular progressiva, ptose, dificuldade para falar e respirar; risco de insuficiência respiratória aguda</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cm-criterios-framingham-ic',
            area: 'Clínica Médica',
            titulo: 'Critérios de Framingham para Insuficiência Cardíaca',
            html: `<p><strong>Critérios maiores</strong></p>
<ul class="reader-list">
<li>Estertores pulmonares</li><li>Dispneia paroxística noturna</li><li>Edema agudo de pulmão</li>
<li>Turgência jugular patológica</li><li>Refluxo hepatojugular</li><li>Pressão venosa central &gt; 16 cmH₂O</li>
<li>Cardiomegalia (na radiografia de tórax)</li><li>Terceira bulha (galope)</li>
<li>Perda de peso &gt; 4,5 kg em 5 dias em resposta ao tratamento</li>
</ul>
<p><strong>Critérios menores</strong></p>
<ul class="reader-list">
<li>Dispneia aos esforços</li><li>Tosse noturna</li><li>Derrame pleural</li>
<li>Edema maleolar</li><li>Hepatomegalia</li><li>Taquicardia (FC &gt; 120 bpm)</li>
<li>Capacidade funcional 1/3 da máxima registrada anteriormente</li>
</ul>
<p><strong>Diagnóstico:</strong></p>
<ul class="reader-list">
<li><strong>Definitivo:</strong> ≥2 critérios maiores <strong>ou</strong> 1 maior + ≥2 menores</li>
<li>Critérios menores isolados <strong>não são suficientes</strong>.</li>
</ul>`
        },
        {
            id: 'cm-classificacao-drc',
            area: 'Clínica Médica',
            titulo: 'Classificação - DRC',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Estágio</th><th>TFG (mL/min/1,73 m²)</th></tr></thead><tbody>
<tr><td>G1</td><td>≥90</td></tr><tr><td>G2</td><td>60–89</td></tr><tr><td>G3a</td><td>45–59</td></tr>
<tr><td>G3b</td><td>30–44</td></tr><tr><td>G4</td><td>15–29</td></tr><tr><td>G5</td><td>&lt;15 ou diálise</td></tr>
</tbody></table></div>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Categoria</th><th>Albumina urinária</th></tr></thead><tbody>
<tr><td>A1</td><td>&lt;30 mg/g (normal a levemente aumentada)</td></tr>
<tr><td>A2</td><td>30–300 mg/g (moderadamente aumentada)</td></tr>
<tr><td>A3</td><td>&gt;300 mg/g (gravemente aumentada)</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cm-classificacao-ira',
            area: 'Clínica Médica',
            titulo: 'Classificação - IRA',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Estágio</th><th>Creatinina sérica (Cr)</th><th>Débito urinário (mL/kg/h)</th></tr></thead><tbody>
<tr><td>Estágio 1</td><td>↑ Cr ≥ 0,3 mg/dL em 48h <strong>ou</strong> 1,5–1,9 × Cr basal</td><td>&lt;0,5 por 6–12h</td></tr>
<tr><td>Estágio 2</td><td>2,0–2,9 × Cr basal</td><td>&lt;0,5 por ≥12h</td></tr>
<tr><td>Estágio 3</td><td>≥3 × Cr basal <strong>ou</strong> Cr ≥ 4,0 mg/dL <strong>ou</strong> início de terapia renal substitutiva (diálise)</td><td>&lt;0,3 por ≥24h <strong>ou</strong> anúria ≥12h</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cm-nta-x-ira-pre-renal',
            area: 'Clínica Médica',
            titulo: 'NTA x IRA Pré-Renal',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Característica</th><th>IRA Pré-Renal</th><th>NTA (Necrose Tubular Aguda)</th></tr></thead><tbody>
<tr><td>Causa principal</td><td>Hipoperfusão renal (desidratação, choque, insuficiência cardíaca, uso de diuréticos)</td><td>Lesão direta ao túbulo renal (isquemia prolongada, nefrotóxicos: aminoglicosídeos, contraste, cisplatina)</td></tr>
<tr><td>Ureia/Creatinina</td><td>&gt; 40</td><td>&lt; 20</td></tr>
<tr><td>Sódio urinário (Na⁺ urinário)</td><td>&lt;20 mEq/L (retenção de sódio)</td><td>&gt;20 mEq/L (perda tubular de sódio)</td></tr>
<tr><td>Fração de excreção de sódio (FENa)</td><td>&lt;1%</td><td>&gt;1%</td></tr>
<tr><td>Fração de escreção de Ureia (FeU)</td><td>&lt;35</td><td>&gt;35</td></tr>
<tr><td>Osmolaridade urinária</td><td>Alta (&gt;500 mOsm/kg)</td><td>Baixa (~300 mOsm/kg)</td></tr>
<tr><td>Sedimento urinário</td><td>Normal ou cilindros hialinos</td><td>Cilindros granulosos, hemáticos, epiteliais</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cm-iam-paredes-derivacoes',
            area: 'Clínica Médica',
            titulo: 'IAM – Paredes e Derivações ECG',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Parede</th><th>Derivações correspondentes</th></tr></thead><tbody>
<tr><td>Parede anterior</td><td>V1, V2 e V3 – anterosseptal; V1–V4 – anterior; V3 e V4 ou V3, V4 e V5 – anterior localizada; V4 a V6, DI e aVL – anterolateral; V1 a V6, DI e aVL – anterior extenso.</td></tr>
<tr><td>Parede lateral</td><td>V5 e V6 – lateral baixa DI e aVL – lateral alta</td></tr>
<tr><td>Parede inferior</td><td>DII, DIII, aVF</td></tr>
<tr><td>Parede dorsal*</td><td>V7, V8 e V9</td></tr>
<tr><td>Parede livre do ventrículo direito</td><td>V3R, V4R (derivações direitas)</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cm-iam-tempo-tratamento',
            area: 'Clínica Médica',
            titulo: 'IAM - Tempo de tratamento',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Tempo</th><th>Situação</th><th>Meta recomendada</th><th>Descrição / Observação</th></tr></thead><tbody>
<tr><td>Tempo porta-agulha</td><td><strong>Terapia trombolítica</strong> (quando não há possibilidade de angioplastia primária imediata)</td><td>≤ 30 minutos após a chegada ao hospital</td><td>Tempo entre a <strong>entrada do paciente no serviço de emergência</strong> e a <strong>administração do trombolítico</strong>.</td></tr>
<tr><td>Tempo porta-balão</td><td><strong>Angioplastia primária (ICP primária)</strong></td><td>≤ 90 minutos após a chegada ao hospital</td><td>Tempo entre a <strong>entrada do paciente</strong> e o <strong>balonamento da artéria culpada</strong> (restauração do fluxo coronariano).</td></tr>
<tr><td>Tempo primeiro contato médico–balão</td><td>Quando o paciente chega por SAMU / UPA e é transferido para hemodinâmica</td><td>≤ 120 minutos desde o <strong>primeiro contato médico</strong> até a <strong>reperfusão mecânica</strong></td><td>Caso o tempo estimado seja maior, deve-se optar por <strong>trombólise pré-hospitalar</strong> (se não houver contraindicação)</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cm-sindrome-takotsubo',
            area: 'Clínica Médica',
            titulo: 'Síndrome Takotsubo - Coração partido',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Aspecto</th><th>Descrição</th></tr></thead><tbody>
<tr><td>Quadro clínico</td><td>Dor torácica e dispneia semelhantes ao IAM.</td></tr>
<tr><td>Epidemiologia</td><td>Predomina em mulheres pós-menopausa.</td></tr>
<tr><td>Desencadeante</td><td>Estresse emocional ou físico importante.</td></tr>
<tr><td>ECG</td><td>Alterações do segmento ST e da onda T (elevação de ST, inversão de T, QT prolongado).</td></tr>
<tr><td>Ecocardiograma</td><td>Hipocinesia ou acinesia apical, com hipercinesia basal (formato de "takotsubo").</td></tr>
<tr><td>Ressonância cardíaca</td><td>Ausência de realce tardio (diferencia do infarto).</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cm-angina-prinzmetal',
            area: 'Clínica Médica',
            titulo: 'Angina de Prinzmetal',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Aspecto</th><th>Descrição</th></tr></thead><tbody>
<tr><td>Definição</td><td>Dor torácica isquêmica causada por <strong>vasoespasmo coronariano transitório</strong>, sem obstrução aterosclerótica significativa.</td></tr>
<tr><td>Fisiopatologia</td><td>Espasmo súbito e reversível da artéria coronária → redução temporária do fluxo sanguíneo.</td></tr>
<tr><td>Quadro clínico</td><td>Dor em <strong>repouso</strong>, frequentemente <strong>noturna</strong> ou nas <strong>primeiras horas da manhã</strong>.</td></tr>
<tr><td>Desencadeantes</td><td>Frio, estresse, tabagismo, cocaína, betabloqueadores não seletivos, triptanos, ergotamina.</td></tr>
<tr><td>ECG durante a dor</td><td><strong>Elevação transitória do segmento ST</strong>, que normaliza após o episódio.</td></tr>
<tr><td>Troponina</td><td>Normal ou discretamente elevada.</td></tr>
<tr><td>Coronariografia</td><td>Artérias coronárias <strong>normais</strong> ou com estenose leve.</td></tr>
<tr><td>Teste diagnóstico</td><td>Espasmo induzido por <strong>ergonovina</strong> ou <strong>acetilcolina</strong> durante o exame.</td></tr>
<tr><td>Tratamento</td><td>- <strong>Crise aguda:</strong> nitrato sublingual - <strong>Prevenção:</strong> bloqueadores de canais de cálcio (diltiazem, verapamil, anlodipino) - <strong>Evitar:</strong> betabloqueadores não seletivos e vasoconstritores.</td></tr>
<tr><td>Prognóstico</td><td>Geralmente <strong>bom</strong>, mas pode haver <strong>arritmias ventriculares</strong> durante o espasmo.</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cm-sindrome-coracao-pos-feriado',
            area: 'Clínica Médica',
            titulo: 'Síndrome do Coração Pós-Feriado',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Aspecto</th><th>Descrição</th></tr></thead><tbody>
<tr><td>Definição</td><td>Arritmia cardíaca (geralmente <strong>fibrilação atrial</strong>) que ocorre <strong>após ingestão aguda e excessiva de álcool</strong>, em pessoas sem doença cardíaca estrutural prévia.</td></tr>
<tr><td>Nome popular</td><td>"Síndrome do coração pós-feriado" (<em>Holiday Heart Syndrome</em>).</td></tr>
<tr><td>Causa principal</td><td><strong>Ingestão excessiva de álcool</strong> — especialmente em festas, feriados ou finais de semana ("binge drinking").</td></tr>
<tr><td>Outros fatores desencadeantes</td><td>Desidratação, privação de sono, cafeína, estresse, grandes refeições.</td></tr>
<tr><td>Mecanismo fisiopatológico</td><td>O álcool causa <strong>toxicidade direta no miocárdio</strong>, <strong>aumenta a atividade adrenérgica</strong>, altera eletrólitos (↓Mg²⁺, ↓K⁺) e <strong>prolonga a condução elétrica</strong>, predispondo à arritmia.</td></tr>
<tr><td>Arritmia mais comum</td><td><strong>Fibrilação atrial (FA)</strong> paroxística. Outras possíveis: extrassístoles supraventriculares ou ventriculares, flutter atrial.</td></tr>
<tr><td>Quadro clínico</td><td>Palpitações, dispneia, tontura, dor torácica ou mal-estar, surgindo horas após o consumo de álcool.</td></tr>
<tr><td>ECG</td><td>Mostra <strong>fibrilação atrial</strong> (ritmo irregularmente irregular, ausência de ondas P definidas).</td></tr>
<tr><td>Diagnóstico</td><td>Clínico + ECG + história recente de <strong>ingestão alcoólica excessiva</strong>.</td></tr>
<tr><td>Tratamento</td><td>- <strong>Suspender álcool</strong> - <strong>Controle da frequência cardíaca</strong> (beta-bloqueador ou bloqueador de canal de cálcio) - <strong>Hidratação e correção eletrolítica</strong> - Reversão espontânea comum em 24–48 h.</td></tr>
<tr><td>Prognóstico</td><td><strong>Excelente</strong> se o álcool for evitado; recorrente se o hábito persistir.</td></tr>
<tr><td>Prevenção</td><td>Evitar episódios de <strong>consumo excessivo de álcool</strong>, manter hidratação e sono adequados.</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cm-classificacao-disseccao-aorta',
            area: 'Clínica Médica',
            titulo: 'Classificação - Dissecção de Aorta',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Sistema</th><th>Tipo / Classe</th><th>Localização</th></tr></thead><tbody>
<tr><td rowspan="2"><u>Stanford</u></td><td>Tipo A</td><td>Envolve a <strong>aorta ascendente</strong>, independentemente de extensão para a descendente</td></tr>
<tr><td>Tipo B</td><td>Envolve apenas a <strong>aorta descendente</strong>, distal à artéria subclávia esquerda</td></tr>
<tr><td rowspan="3"><u>DeBakey</u></td><td>Tipo I</td><td>Origina na <strong>aorta ascendente</strong> e se estende para descendente</td></tr>
<tr><td>Tipo II</td><td>Limitada à <strong>aorta ascendente</strong></td></tr>
<tr><td>Tipo III</td><td>Origina na <strong>aorta descendente</strong>, distal à subclávia esquerda</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cm-hsa-fisher-hunt-hess',
            area: 'Clínica Médica',
            titulo: 'Hemorragia Subaracnoide - Classificação de Fisher e Hunt-Hess',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Classificação</th><th>Critérios</th><th>Grau</th></tr></thead><tbody>
<tr><td><u>Fisher</u></td><td>Baseada em <em>TC de sangue subaracnóideo</em></td><td>1 – Sem sangue aparente; 2 – Sangue difuso &lt;1 mm ou sem coágulo; 3 – Sangue com coágulo ou &gt;1 mm; 4 – Sangue intraventricular ou hematoma intracerebral associado</td></tr>
<tr><td><u>Hunt-Hess</u></td><td>Baseada no <em>estado clínico do paciente</em></td><td>I – Assintomático ou cefaleia leve, rigidez de nuca leve; II – Cefaleia moderada, rigidez de nuca, sem déficit neurológico significativo; III – Sonolento, confuso, déficit neurológico leve; IV – Estupor, déficit neurológico moderado a grave, hemiparesia; V – Coma profundo, postura em descerebração, moribundo</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cm-erradicacao-h-pylori',
            area: 'Clínica Médica',
            titulo: 'Erradicação H. Pylori',
            html: `<p><strong>1ª linha de tratamento:</strong></p>
<ol class="reader-list">
<li><strong>Esquema quádruplo com bismuto, metronidazol e tetraciclina</strong> com IBP ou PCAB (quando disponível) por 10 a 14 dias</li>
<li><strong>Terapia tríplice de claritromicina e amoxicilina por 14 dias</strong>, otimizada com <strong>associação ao bismuto e/ou substituição do IBP pelo PCAB</strong> (quando disponível) duas vezes por dia</li>
<li>Na indisponibilidade do bismuto, pode ser empregada a <strong>terapia dupla com amoxicilina 3-4 g/dia</strong>, em 3 ou 4 tomadas ao dia associada ao IBP (em dose alta, 3 a 4 vezes ao dia), ou <strong>preferencialmente ao PCAB</strong> (Vonoprazan 20 mg duas vezes ao dia) quando disponível, por 14 dias</li>
<li>A <strong>terapia concomitante</strong> com IBP ou PCAB (quando disponível) por 14 dias pode ser uma <strong>opção</strong>.</li>
</ol>
<p><strong>2ª linha de tratamento:</strong></p>
<p><strong>Regra de ouro: não repetir o esquema usado em 1ª linha.</strong> Estão indicados:</p>
<ol class="reader-list">
<li><strong>Esquema quádruplo</strong> com bismuto, metronidazol e tetraciclina com IBP ou PCAB (quando disponível) por 10 a 14 dias</li>
<li>Esquema <strong>amoxicilina-levofloxacino-bismuto associado a IBP ou PCAB</strong> (quando disponível) por 14 dias</li>
<li>Na indisponibilidade do bismuto, pode ser empregada a <strong>terapia dupla com amoxicilina 3-4 g/dia</strong>, em 3 ou 4 tomadas ao dia associada ao IBP (em dose alta, 3 a 4 vezes ao dia), ou <strong>preferencialmente ao PCAB</strong> (Vonoprazan 20 mg duas vezes ao dia) quando disponível, por 14 dias</li>
</ol>`
        },
        {
            id: 'cm-criterios-roma-iv-sii',
            area: 'Clínica Médica',
            titulo: 'Critérios de Roma IV - Síndrome do Intestino Irritável',
            html: `<p><strong>Diagnóstico requer:</strong></p>
<ul class="reader-list">
<li><strong>Dor abdominal recorrente</strong> pelo menos <strong>1 dia por semana nos últimos 3 meses</strong></li>
<li>Associada a <strong>pelo menos 2 dos seguintes critérios</strong>:
<ol class="reader-list">
<li><strong>Relacionada à evacuação</strong> (melhora ou piora da dor após evacuação)</li>
<li><strong>Alteração na frequência das evacuações</strong> (diarreia, constipação ou alternância)</li>
<li><strong>Alteração na forma ou aparência das fezes</strong> (fezes duras, moles, fragmentadas ou em cordão)</li>
</ol></li>
</ul>`
        },
        {
            id: 'cm-curb65-pneumonia',
            area: 'Clínica Médica',
            titulo: 'CURB-65 e CRB-65 - Pneumonia',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Critério</th><th>CURB-65</th><th>CRB-65</th><th>Pontuação</th></tr></thead><tbody>
<tr><td>C – Confusão mental (nova)</td><td>✅</td><td>✅</td><td>1 ponto</td></tr>
<tr><td>U – Ureia &gt; 50 mg/dL (ou &gt; 7 mmol/L)</td><td>✅</td><td>❌</td><td>1 ponto</td></tr>
<tr><td>R – Frequência respiratória ≥ 30 irpm</td><td>✅</td><td>✅</td><td>1 ponto</td></tr>
<tr><td>B – PA sistólica &lt; 90 mmHg <strong>ou</strong> diastólica ≤ 60 mmHg</td><td>✅</td><td>✅</td><td>1 ponto</td></tr>
<tr><td>65 – Idade ≥ 65 anos</td><td>✅</td><td>✅</td><td>1 ponto</td></tr>
</tbody></table></div>
<ul class="reader-list">
<li><strong>CURB-65:</strong> 0-1 → ambulatorial ; ≥ 2 → internação</li>
<li><strong>CRB-65:</strong> ≥1 → internação</li>
</ul>`
        },
        {
            id: 'cm-criterios-light-derrame-pleural',
            area: 'Clínica Médica',
            titulo: 'Critérios de Light - Derrame Pleural',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Critério</th><th>Exsudato</th><th>Transudato</th></tr></thead><tbody>
<tr><td>1. Relação proteína pleural / proteína sérica</td><td>&gt; 0,5</td><td>≤ 0,5</td></tr>
<tr><td>2. Relação DHL pleural / DHL sérica</td><td>&gt; 0,6</td><td>≤ 0,6</td></tr>
<tr><td>3. DHL do líquido pleural</td><td>&gt; 2/3 do limite superior da normalidade do soro</td><td>≤ 2/3 do limite superior da normalidade</td></tr>
</tbody></table></div>
<p><strong>Interpretação:</strong></p>
<ul class="reader-list">
<li>Basta <strong>1 critério positivo</strong> → o derrame é <strong>exsudativo</strong>.</li>
<li>Se <strong>nenhum</strong> critério for atendido → <strong>transudativo</strong>.</li>
</ul>`
        },
        {
            id: 'cm-endocardite-criterios-duke',
            area: 'Clínica Médica',
            titulo: 'Endocardite - Critérios de Duke',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Categoria</th><th>Critérios</th><th>Descrição</th></tr></thead><tbody>
<tr><td rowspan="4">Maiores</td><td>1. Hemoculturas positivas típicas</td><td>Duas amostras positivas para microrganismos típicos de endocardite <strong>ou</strong> uma amostra c. burnetii <strong>ou</strong> 3 amostras para os demais agentes</td></tr>
<tr><td>2. Evidência de envolvimento endocárdico (ECO)</td><td>Ecocardiograma positivo mostrando: ✅ Vegetação ✅ Abscesso ✅ Nova deiscência de prótese valvar ✅ Nova regurgitação valvar (nova insuficiência valvar).</td></tr>
<tr><td>3. PET-TC</td><td>Atividade metabólica anormal</td></tr>
<tr><td>4. Cirúrgico</td><td>Inspeção direta</td></tr>
<tr><td rowspan="6">Menores</td><td>1. Predisposição</td><td>Cardiopatia predisponente <strong>ou</strong> uso de drogas endovenosas.</td></tr>
<tr><td>2. Febre</td><td>Temperatura ≥ 38°C.</td></tr>
<tr><td>3. Fenômenos vasculares</td><td>Embolia arterial, infarto séptico pulmonar, aneurisma micótico, hemorragia conjuntival, lesões de Janeway.</td></tr>
<tr><td>4. Fenômenos imunológicos</td><td>Glomerulonefrite, nódulos de Osler, manchas de Roth, fator reumatoide positivo.</td></tr>
<tr><td>5. Evidência microbiológica</td><td>Hemocultura positiva que <strong>não</strong> preenche critério maior <strong>ou</strong> evidência sorológica de infecção compatível.</td></tr>
<tr><td>6. Exame físico</td><td>Novo sopro de regurgitação valvar na ausculta</td></tr>
</tbody></table></div>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Classificação</th><th>Requisitos</th></tr></thead><tbody>
<tr><td>Endocardite Definitiva</td><td>✅ 2 maiores <strong>ou</strong> ✅ 1 maior + 3 menores <strong>ou</strong> ✅ 5 menores</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cm-classificacao-bethesda',
            area: 'Clínica Médica',
            titulo: 'Classificação de Bethesda - Nódulos Tireoidianos',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Categoria (Bethesda)</th><th>Descrição citológica</th><th>Conduta recomendada</th></tr></thead><tbody>
<tr><td>I. Não diagnóstica / Insatisfatória</td><td>Material escasso, mal preservado ou sem células foliculares suficientes.</td><td>Repetir a PAAF guiada por USG.</td></tr>
<tr><td>II. Benigna</td><td>Bócio coloide, tireoidite linfocítica (Hashimoto) ou tireoidite subaguda.</td><td>Acompanhamento clínico e ultrassonográfico.</td></tr>
<tr><td>III. Atipia de significado indeterminado / Lesão folicular de significado indeterminado (AUS/FLUS)</td><td>Alterações celulares discretas, mas não diagnósticas de neoplasia.</td><td>Repetir PAAF em 3–6 meses ou avaliação molecular.</td></tr>
<tr><td>IV. Neoplasia folicular ou suspeita de neoplasia folicular</td><td>Padrão microfolicular com pouca coloide; não é possível diferenciar adenoma de carcinoma pela citologia.</td><td>Lobectomia diagnóstica (cirurgia parcial).</td></tr>
<tr><td>V. Suspeita de malignidade</td><td>Achados fortemente sugestivos de carcinoma (ex: papilífero), mas não conclusivos.</td><td>Tireoidectomia total ou lobectomia, conforme caso.</td></tr>
<tr><td>VI. Maligno</td><td>Características citológicas definitivas de carcinoma (ex: papilífero, medular, anaplásico, metastático).</td><td>Cirurgia (tireoidectomia total).</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cm-escore-wells-tep',
            area: 'Clínica Médica',
            titulo: 'Escore de Wells - Tromboembolismo Pulmonar (TEP)',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Variáveis</th><th>Pontos</th></tr></thead><tbody>
<tr><td>TVP ou EP prévios</td><td>+1,5</td></tr>
<tr><td>Taquicardia</td><td>+1,5</td></tr>
<tr><td>Cirurgia recente ou imobilização</td><td>+1,5</td></tr>
<tr><td>Sinais clínicos de TVP</td><td>+3</td></tr>
<tr><td>Diagnóstico alternativo menos provável que EP</td><td>+3</td></tr>
<tr><td>Hemoptise</td><td>+1</td></tr>
<tr><td>Câncer</td><td>+1</td></tr>
</tbody></table></div>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Probabilidade clínica</th><th>Soma dos pontos</th></tr></thead><tbody>
<tr><td>Baixa probabilidade</td><td>0 a 1</td></tr>
<tr><td>Intermediária probabilidade</td><td>2 a 6</td></tr>
<tr><td>Alta probabilidade</td><td>≥ 7</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cm-estadiamento-dpoc',
            area: 'Clínica Médica',
            titulo: 'Estadiamento - DPOC (GOLD)',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Estágio GOLD</th><th>VEF₁ (% do previsto)</th><th>Classificação da gravidade</th></tr></thead><tbody>
<tr><td>GOLD 1</td><td>≥ 80%</td><td>Leve</td></tr>
<tr><td>GOLD 2</td><td>50–79%</td><td>Moderado</td></tr>
<tr><td>GOLD 3</td><td>30–49%</td><td>Grave</td></tr>
<tr><td>GOLD 4</td><td>&lt; 30%</td><td>Muito grave</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cm-classificacao-dpoc-grupos',
            area: 'Clínica Médica',
            titulo: 'Classificação - DPOC (Grupos A/B/E)',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Grupo</th><th>Sintomas (mMRC ≥ 2 ou CAT ≥ 10)</th><th>Exacerbações / Internações no último ano</th><th>Conduta inicial sugerida</th></tr></thead><tbody>
<tr><td>A</td><td>mMRC 0-1 ; CAT &lt; 10</td><td>0 ou 1 exacerbação (sem internação)</td><td>LABA ou LAMA</td></tr>
<tr><td>B</td><td>mMRC 2-4 ; CAT &gt; 10</td><td>0 ou 1 exacerbação (sem internação)</td><td>LABA + LAMA</td></tr>
<tr><td>E</td><td>-</td><td>≥ 2 exacerbações <strong>ou</strong> ≥ 1 com internação</td><td>LABA + LAMA + CI (se eosinófilos ≥ 300)</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cm-asma-gina-adultos',
            area: 'Clínica Médica',
            titulo: 'Asma - Manejo GINA (Adultos e Adolescentes 12+)',
            html: `<p>Ciclo de manejo: Avaliar → Ajustar → Revisar (sintomas, exacerbações, efeitos colaterais, função pulmonar, satisfação do paciente).</p>
<p><strong>Track 1 (preferencial)</strong> — controlador e aliviador com <strong>ICS-formoterol</strong> (reduz risco de exacerbação em relação ao uso de SABA como aliviador):</p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Passo</th><th>Conduta</th></tr></thead><tbody>
<tr><td>Passos 1–2</td><td>ICS-formoterol em dose baixa, sob demanda</td></tr>
<tr><td>Passo 3</td><td>ICS-formoterol em dose baixa, manutenção</td></tr>
<tr><td>Passo 4</td><td>ICS-formoterol em dose média, manutenção</td></tr>
<tr><td>Passo 5</td><td>Add-on LAMA; encaminhar para avaliação de fenótipo; considerar ICS-formoterol em dose alta ± anti-IgE, anti-IL5/5R, anti-IL4R, anti-TSLP</td></tr>
</tbody></table></div>
<p>Aliviador (track 1): ICS-formoterol em dose baixa, sob demanda, em todos os passos.</p>
<p><strong>Track 2 (alternativo)</strong> — antes de considerar, checar aderência ao controlador diário se o paciente usa SABA como aliviador:</p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Passo</th><th>Conduta</th></tr></thead><tbody>
<tr><td>Passo 1</td><td>ICS sempre que usar SABA</td></tr>
<tr><td>Passo 2</td><td>ICS em dose baixa, manutenção</td></tr>
<tr><td>Passo 3</td><td>ICS-LABA em dose baixa, manutenção</td></tr>
<tr><td>Passo 4</td><td>ICS-LABA em dose média/alta, manutenção</td></tr>
<tr><td>Passo 5</td><td>Add-on LAMA; encaminhar para avaliação de fenótipo; considerar ICS-LABA em dose alta ± anti-IgE, anti-IL5/5R, anti-IL4R, anti-TSLP</td></tr>
</tbody></table></div>
<p>Aliviador (track 2): SABA de curta duração sob demanda, em todos os passos.</p>`
        },
        {
            id: 'cm-delirium-cam',
            area: 'Clínica Médica',
            titulo: 'Delirium - Critérios diagnósticos CAM',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Critério</th><th>Descrição</th><th>Presente para diagnóstico?</th></tr></thead><tbody>
<tr><td>1. Início agudo e flutuação do curso mental</td><td>Mudança súbita no estado mental com tendência a piorar ou melhorar ao longo do dia</td><td>Obrigatório</td></tr>
<tr><td>2. Desatenção</td><td>Dificuldade de focar, manter ou desviar a atenção</td><td>Obrigatório</td></tr>
<tr><td>3. Pensamento desorganizado</td><td>Discurso incoerente, ilógico ou desorganizado</td><td>Um dos dois adicionais</td></tr>
<tr><td>4. Alteração do nível de consciência</td><td>Estado de alerta alterado: hiperalerta, letárgico ou estuporoso</td><td>Um dos dois adicionais</td></tr>
</tbody></table></div>
<p><strong>Diagnóstico de delirium pelo CAM:</strong></p>
<ul class="reader-list"><li>Presença de <strong>1 + 2</strong>, mais <strong>3 ou 4</strong>.</li></ul>`
        },
        {
            id: 'cm-doencas-inflamatorias-intestinais',
            area: 'Clínica Médica',
            titulo: 'Doenças Inflamatórias Intestinais',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Tópico</th><th>Doença de Crohn</th><th>Retocolite Ulcerativa</th></tr></thead><tbody>
<tr><td>Epidemiologia</td><td>Tabagismo ↑ risco</td><td>Tabagismo não é FR</td></tr>
<tr><td>Comprometimento</td><td>Boca → ânus. Transmural. Reto poupado. Doença perianal</td><td>Reto sempre. Mucosa/submucosa. Extensão contínua proximal. Ileíte de refluxo</td></tr>
<tr><td>Clínica</td><td>Esteatorreia, anemia, perda ponderal, fístula/abscesso perianal, aftas orais</td><td>Diarreia sanguinolenta, anemia, colangite esclerosante primária</td></tr>
<tr><td>Diagnóstico</td><td>Colonoscopia: perda em "calçamento". Histologia: granuloma não caseoso. Anticorpo: <strong>ASCA</strong></td><td>Colonoscopia: erosões/pseudopólipos. Histologia: abscesso de cripta. Anticorpo: <strong>p-ANCA</strong></td></tr>
<tr><td>Tratamento (leve a moderada)</td><td>Remissão: corticoide oral. Manutenção: azatioprina ou metotrexato</td><td>Remissão e manutenção: 5-ASA. Refratários: corticoide oral</td></tr>
<tr><td>Tratamento (grave)</td><td>Corticoide IV (hidrocortisona/metilprednisolona). Refratários após 72h: infliximabe IV (anti-TNF). Sem melhora: cirurgia</td><td>Corticoide IV (hidrocortisona/metilprednisolona). Refratários após 72h: infliximabe IV (anti-TNF). Sem melhora: cirurgia</td></tr>
<tr><td>Cirurgia</td><td>→ Estenoses: curtas (&lt; 5 cm): dilatação endoscópica ou ressecção segmentar. Longas (&gt; 5 cm) / múltiplas estenoses: anastomose (Heineke-Mikulicz, Finney) → Fístula perianal: drenagem + seton + biológico</td><td>→ Eletivo: proctocolectomia total + IPAA → Agudo grave / urgência: colectomia total + ileostomia. Ex: megacólon tóxico</td></tr>
</tbody></table></div>
<p><strong>DII → são fatores de risco para CA colorretal!</strong></p>`
        },
        {
            id: 'cm-dengue-planos',
            area: 'Clínica Médica',
            titulo: 'Dengue - Planos A / B / C',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Grupo</th><th>Critérios / Indicação</th><th>Acompanhamento</th><th>Exames Complementares</th><th>Conduta / Tratamento</th><th>Reavaliação / Retorno</th></tr></thead><tbody>
<tr><td>Grupo A</td><td>Sem sangramento espontâneo ou induzido (prova do laço negativa), sem sinais de alarme, sem condição especial, sem risco social ou comorbidades</td><td>Ambulatorial</td><td>-</td><td>Hidratação oral: Adultos: 60 ml/kg/dia (1/3 via solução salina, 2/3 via líquidos orais). Crianças: reidratação oral precoce + líquidos conforme idade; repouso, antitérmicos e antieméticos se necessário</td><td>Retorno: diário ou imediato se surgirem sinais de alarme; acompanhamento até 48h após queda da febre</td></tr>
<tr><td>Grupo B</td><td>Com sangramento de pele espontâneo ou induzido (prova do laço +), ou condição clínica especial ou risco social/comorbidades e sem sinal de alarme</td><td>Observação até resultado dos exames</td><td>Hemograma completo obrigatório</td><td>Hidratação oral conforme Grupo A</td><td>Se aumento de hematócrito ou surgimento de sinais de alarme → passar para Grupo C; caso contrário → seguir conduta Grupo A</td></tr>
<tr><td>Grupo C</td><td>Presença de algum sinal de alarme; manifestação hemorrágica ausente</td><td>Internação</td><td>Hemograma completo obrigatório</td><td>Hidratação EV - Adultos e crianças: 20 ml/kg/h em 2 horas de solução isotônica. Reavaliação clínica e laboratorial a cada 2h; sinais de choque → ajustar manejo</td><td>Se melhora clínica e laboratorial → manter manejo Grupo C; caso sinais persistam → Grupo D</td></tr>
<tr><td>Grupo D</td><td>Sinais de choque: desconforto respiratório grave, hemorragia grave, disfunção grave de órgãos; manifestação hemorrágica presente ou ausente</td><td>Terapia intensiva</td><td>Hemograma, eletrólitos, albumina, gasometria, exames para hemorragias</td><td>Hidratação IV imediata: Adultos e crianças: solução salina isotônica 20 ml/kg em 20 min, repetir até 3x se necessário. Expansores plasmáticos e transfusão conforme hematócrito e coagulação</td><td>Reavaliação clínica a cada 15–30 min e hematócrito a cada 2h; se resposta adequada → manejo Grupo C; caso resposta inadequada → ajustar reposição, investigar hemorragias e coagulopatias</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cm-nivel-medular-sensibilidade',
            area: 'Clínica Médica',
            titulo: 'Nível Medular e Sensibilidade Comprometida',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Nível medular</th><th>Região / Dermátomo afetado</th><th>Sensibilidade comprometida</th></tr></thead><tbody>
<tr><td>T2</td><td>Segunda costela / parte superior do tórax</td><td>Sensibilidade torácica superior, região do peitoral próximo à axila</td></tr>
<tr><td>T4</td><td>Linha dos mamilos</td><td>Sensibilidade torácica média, região dos mamilos</td></tr>
<tr><td>T10</td><td>Umbigo</td><td>Sensibilidade abdominal média, ao redor do umbigo</td></tr>
<tr><td>T12</td><td>Região inguinal / púbis</td><td>Sensibilidade na região inguinal e púbica</td></tr>
<tr><td>L3</td><td>Face anterior da coxa / joelho</td><td>Sensibilidade na face anterior da coxa, joelho e região medial da perna</td></tr>
<tr><td>S4</td><td>Região perianal</td><td>Sensibilidade na região do períneo, ânus; teste do "anocutâneo"</td></tr>
<tr><td>S5</td><td>Região perianal posterior</td><td>Sensibilidade na linha média do períneo e borda do ânus</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cm-sindrome-cockett',
            area: 'Clínica Médica',
            titulo: 'Síndrome de Cockett - May Thurner',
            html: `<ul class="reader-list">
<li>Compressão da veia ilíaca comum esquerda pela artéria ilíaca comum direita</li>
<li>Sintomas como dor, inchaço, varizes e, em casos mais graves, trombose venosa profunda (TVP)</li>
</ul>`
        },
        {
            id: 'cm-sindrome-wilkie',
            area: 'Clínica Médica',
            titulo: 'Síndrome de Wilkie',
            html: `<ul class="reader-list">
<li>Compressão da terceira porção do duodeno entre a aorta abdominal e a artéria mesentérica superior, causando obstrução intestinal alta.</li>
<li><strong>Causa principal:</strong>
<ul class="reader-list reader-sublist"><li>Ângulo aorto-mesentérico &lt; 25°</li></ul></li>
<li><strong>Sintomas:</strong>
<ul class="reader-list reader-sublist">
<li>Dor abdominal pós-refeição</li><li>Náuseas e vômitos</li><li>Saciedade precoce</li>
<li>Distensão abdominal</li><li>Perda de peso inexplicada</li><li>Dificuldade para tolerar alimentos sólidos</li>
</ul></li>
<li><strong>Tratamento conservador:</strong>
<ul class="reader-list reader-sublist">
<li>Nutrição enteral/parenteral para ganho de peso</li><li>Reposição de líquidos e eletrólitos</li>
<li>Medicamentos pró-cinéticos (ex: metoclopramida)</li><li>Mudanças posturais (deitar de lado esquerdo, posição prona)</li>
</ul></li>
<li><strong>Tratamento cirúrgico:</strong> Duodenojejunostomia (desvio do duodeno)</li>
</ul>`
        },
        {
            id: 'cm-sindrome-quebra-nozes',
            area: 'Clínica Médica',
            titulo: 'Síndrome do Quebra-Nozes',
            html: `<ul class="reader-list">
<li>Compressão da veia renal esquerda entre a artéria mesentérica superior e a aorta (ou entre a aorta e coluna), causando hipertensão venosa renal e sintomas relacionados.</li>
<li><strong>Causas:</strong>
<ul class="reader-list reader-sublist">
<li>Ângulo aorto-mesentérico reduzido</li><li>Perda de gordura retroperitoneal</li>
<li>Anomalias anatômicas congênitas</li><li>Pode ocorrer secundariamente após cirurgia ou trauma abdominal</li>
</ul></li>
<li><strong>Sintomas:</strong>
<ul class="reader-list reader-sublist">
<li>Hematúria</li><li>Dor lombar ou abdominal esquerda</li><li>Varicocele em homens</li>
<li>Dor pélvica crônica em mulheres</li><li>Proteinúria (em alguns casos)</li>
</ul></li>
</ul>`
        },
        {
            id: 'cm-hipocalcemia-sinais',
            area: 'Clínica Médica',
            titulo: 'Hipocalcemia - Sinais',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Categoria</th><th>Exemplos</th></tr></thead><tbody>
<tr><td>Neuromusculares</td><td>Parestesias (formigamento em mãos, pés e face); espasmos musculares e cãibras; tetania (contrações musculares involuntárias); convulsões</td></tr>
<tr><td>Sinais Clássicos</td><td><strong>Sinal de Trousseau:</strong> espasmo carpal ao inflar manguito de pressão arterial por 3 min. <strong>Sinal de Chvostek:</strong> contração involuntária do músculo facial ao percutir o nervo facial</td></tr>
<tr><td>Cardíacos</td><td>Prolongamento do intervalo QT no eletrocardiograma; arritmias</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cm-sepse-sofa-qsofa',
            area: 'Clínica Médica',
            titulo: 'Sepse - SOFA e Q-SOFA',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Escala</th><th>Parâmetros</th></tr></thead><tbody>
<tr><td>SOFA (Sequential Organ Failure Assessment)</td><td>1. Respiração (PaO₂/FiO₂) 2. Coagulação (plaquetas) 3. Fígado (bilirrubina) 4. Sistema cardiovascular (uso de vasopressores / PA) 5. Sistema nervoso (Glasgow) 6. Rim (creatinina / diurese)</td></tr>
<tr><td>qSOFA (Quick SOFA)</td><td>1. Frequência respiratória ≥22/min 2. Alteração do estado mental (Glasgow &lt;15) 3. Pressão arterial sistólica ≤100 mmHg</td></tr>
</tbody></table></div>
<p><strong>SOFA:</strong></p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Sistema</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th></tr></thead><tbody>
<tr><td>Respiratório PaO₂/FiO₂ mmHg</td><td>≥ 400</td><td>&lt; 400</td><td>&lt; 300</td><td>&lt; 200</td><td>&lt; 100</td></tr>
<tr><td>Hematológico Plaquetas/uL</td><td>≥ 150.000</td><td>&lt; 150.000</td><td>&lt; 100.000</td><td>&lt; 50.000</td><td>&lt; 20.000</td></tr>
<tr><td>Hepático Bilirrubinas mg/dL</td><td>&lt; 1,2</td><td>1,2-1,9</td><td>2,0-5,9</td><td>6,0-11,9</td><td>&gt; 12</td></tr>
<tr><td>Cardiovascular µg/kg/min</td><td>PAM ≥ 70</td><td>PAM &lt; 70</td><td>Dopamina &lt; 5 ou dobutamina</td><td>Dopamina 5,1-15 ou noradrenalina ou adrenalina ≤ 0,1</td><td>Dopamina &gt; 15 ou noradrenalina ou adrenalina &gt; 0,1</td></tr>
<tr><td>Renal Creatinina mg/dL / Débito urinário mL/dia</td><td>&lt; 1,2</td><td>1,2-1,9</td><td>2,0-3,4</td><td>3,5-4,9 / &lt;500</td><td>&gt; 5,0 / &lt;200</td></tr>
</tbody></table></div>
<p style="font-size:12px;color:var(--text-secondary)">FiO₂: fração inspiratória de oxigênio; PAM: pressão arterial média; PaO₂: pressão arterial de oxigênio.</p>`
        },
        {
            id: 'cm-iodo-tireoide',
            area: 'Clínica Médica',
            titulo: 'Iodo x Tireoide',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Efeito / Fenômeno</th><th>Mecanismo</th><th>Consequência</th></tr></thead><tbody>
<tr><td>Efeito Wolff-Chaikoff</td><td>Exposição súbita a grandes quantidades de iodo → inibe temporariamente a organificação do iodo na tireoide</td><td>Hipotireoidismo transitório</td></tr>
<tr><td>Efeito Jod-Basedow</td><td>Exposição a grandes quantidades de iodo em tireoide previamente doente (bócio nodular, hipertireoidismo subclínico)</td><td>Hipertireoidismo induzido por iodo</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cm-bacteriuria-assintomatica',
            area: 'Clínica Médica',
            titulo: 'Bacteriúria Assintomática - Indicações de tratamento',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>População / Situação</th><th>Indicação de Tratamento</th><th>Observações</th></tr></thead><tbody>
<tr><td>Gestantes</td><td>✅ Tratar sempre</td><td>Evita pielonefrite, parto prematuro e baixo peso ao nascer. Antibióticos seguros na gestação são usados, como amoxicilina, cefalosporinas, nitrofurantoína (exceto no final da gestação).</td></tr>
<tr><td>Pré-operatório de urologia</td><td>✅ Tratar se haverá manipulação do trato urinário</td><td>Evita infecção pós-operatória e sepse.</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cm-trombolise-avei-contraindicacoes',
            area: 'Clínica Médica',
            titulo: 'Trombólise (AVEi) - Contraindicações',
            html: `<p><strong>Contraindicações absolutas:</strong></p>
<ul class="reader-list">
<li>Hemorragia intracraniana prévia</li>
<li>Tumor intracraniano ou malformação vascular conhecida</li>
<li>AVC isquêmico com hemorragia suspeita ou comprovada</li>
<li>Sangramento ativo significativo</li>
<li>Cirurgia intracraniana, intraespinhal ou grande cirurgia recente (&lt;3 meses)</li>
<li>Trauma craniano grave recente (&lt;3 meses)</li>
<li>Pressão arterial não controlada (&gt;185/110 mmHg)</li>
<li>Coagulopatia grave (TP &gt; 15 s, INR &gt; 1,7, plaquetas &lt; 100.000/mm³)</li>
<li>Uso de anticoagulante com INR elevado ou tempo de tromboplastina parcial prolongado</li>
</ul>`
        },
        {
            id: 'cm-anticoagulantes',
            area: 'Clínica Médica',
            titulo: 'Anticoagulantes - Reversão',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Classe / Fármaco</th><th>Exemplos</th><th>Antídoto / Reversão</th></tr></thead><tbody>
<tr><td>Antagonistas da vitamina K</td><td>Varfarina</td><td>Vitamina K, complexo protrombínico</td></tr>
<tr><td>Heparinas</td><td>Heparina não fracionada (HNF); heparina de baixo peso molecular (HBPM, ex: enoxaparina, dalteparina)</td><td>Protamina (completa para HNF, parcial para HBPM)</td></tr>
<tr><td>Inibidores diretos da trombina</td><td>Dabigatrana</td><td>Idarucizumabe</td></tr>
<tr><td>Inibidores diretos do fator Xa</td><td>Rivaroxabana, Apixabana, Edoxabana</td><td>Andexanet alfa</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cm-wernicke-korsakoff',
            area: 'Clínica Médica',
            titulo: 'Síndrome de Wernicke e Korsakoff - Álcool',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Aspecto</th><th>Encefalopatia de Wernicke</th><th>Síndrome de Korsakoff</th></tr></thead><tbody>
<tr><td>Definição</td><td>Neuropatia aguda causada por deficiência de tiamina (vitamina B1)</td><td>Complicação crônica da deficiência de tiamina, geralmente após Wernicke</td></tr>
<tr><td>Causa principal</td><td>Déficit de tiamina, frequentemente em alcoolismo crônico, desnutrição, vômitos prolongados</td><td>Déficit de tiamina persistente ou não tratado após Wernicke</td></tr>
<tr><td>Manifestações clínicas</td><td>Tríade clássica: confusão mental, ataxia, oftalmoplegia/nistagmo</td><td>Amnésia anterógrada (principal), confabulação, desorientação temporal, déficit executivo leve</td></tr>
<tr><td>Início</td><td>Agudo</td><td>Crônico, sequela da Wernicke</td></tr>
<tr><td>Tratamento</td><td>Suplementação imediata de tiamina IV/IM, hidratação, correção eletrolítica</td><td>Principalmente suporte e reposição de tiamina; recuperação limitada</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cm-ssj-net',
            area: 'Clínica Médica',
            titulo: 'Síndrome de Stevens Johnson (SSJ) e Necrólise Epidérmica Tóxica (NET)',
            html: `<p>Lesões cutâneomucosas com bolhas e descolamento da pele.</p>
<ul class="reader-list">
<li><strong>SSJ</strong> = &lt; 10% da área corpórea</li>
<li><strong>NET</strong> = &gt; 30% da área corpórea</li>
</ul>`
        },
        {
            id: 'cm-psoriase',
            area: 'Clínica Médica',
            titulo: 'Psoríase',
            html: `<ul class="reader-list">
<li><em>Fenômeno de Koebner</em> → lesão em áreas de trauma</li>
<li><strong>Diagnóstico</strong> → Curetagem de Brocq → sinal da vela, auspitz, orvalho sanguíneo</li>
</ul>`
        },
        {
            id: 'cm-buloses',
            area: 'Clínica Médica',
            titulo: 'Buloses',
            html: `<ul class="reader-list">
<li><strong>Pênfigo foliáceo</strong> → desmogleína 1, poupa mucosa.</li>
<li><strong>Pênfigo vulgar</strong> → desmogleína 1 e 3, acomete mucosa</li>
</ul>`
        },
        {
            id: 'cm-osteossarcoma-ewing',
            area: 'Clínica Médica',
            titulo: 'Osteossarcoma x Sarcoma de Ewing',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Característica</th><th>Osteossarcoma</th><th>Sarcoma de Ewing</th></tr></thead><tbody>
<tr><td>Idade mais comum</td><td>Adolescência (10–20 anos)</td><td>Crianças e adolescentes (10–20 anos)</td></tr>
<tr><td>Sexo</td><td>Masculino &gt; Feminino</td><td>Masculino &gt; Feminino</td></tr>
<tr><td>Localização típica</td><td>Metáfise de ossos longos (fêmur distal, tíbia proximal, úmero proximal)</td><td>Diáfise de ossos longos e pelve</td></tr>
<tr><td>Origem celular</td><td>Osteoblastos malignos (produz matriz óssea)</td><td>Células neuroectodérmicas primitivas (PNET)</td></tr>
<tr><td>Radiografia</td><td>Lesão <strong>lítica + blástica</strong>, bordas mal definidas, <strong>periósteo em "sunburst"</strong>, <strong>codman triangle</strong></td><td>Lesão lítica, <strong>periosteal reaction "onion skin"</strong>, mais difusa</td></tr>
<tr><td>Sintomas clínicos</td><td>Dor óssea progressiva, massa local, fratura patológica</td><td>Dor óssea, febre, emagrecimento, massa local</td></tr>
<tr><td>Tratamento</td><td>Quimioterapia neoadjuvante + ressecção cirúrgica</td><td>Quimioterapia + cirurgia ou radioterapia</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cm-coriorretinite-cmv',
            area: 'Clínica Médica',
            titulo: 'Coriorretinite por Citomegalovírus',
            imagem: 'assets/bullets/img/cm-cmv-retinite.png',
            html: `<ul class="reader-list">
<li>Achado de hemorragia e exsudação retinianos (aspecto de "queijo com catchup")</li>
</ul>`
        },
        {
            id: 'cm-disturbios-potassio',
            area: 'Clínica Médica',
            titulo: 'Distúrbios do Potássio (K+)',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Característica</th><th>Hipocalemia</th><th>Hipercalemia</th></tr></thead><tbody>
<tr><td>Definição</td><td>Potássio sérico &lt; 3,5 mEq/L</td><td>Potássio sérico &gt; 5,0 mEq/L</td></tr>
<tr><td>Causas principais</td><td>Perdas gastrointestinais (vômitos, diarreia); uso de diuréticos (tiazídicos, de alça); hiperaldosteronismo; alcalose metabólica; insulina ou β-agonistas (entrada celular de K⁺)</td><td>Insuficiência renal; uso de IECA, BRA ou espironolactona; acidose metabólica; rabdomiólise, lise tumoral; suplementação excessiva de K⁺</td></tr>
<tr><td>Manifestações clínicas</td><td>Fraqueza muscular; câimbras; paralisia flácida; constipação; arritmias cardíacas</td><td>Fraqueza muscular; parestesias; paralisia flácida; arritmias cardíacas (podem ser fatais)</td></tr>
<tr><td>Eletrocardiograma (ECG)</td><td>Onda U proeminente; achatamento da onda T; depressão do segmento ST; prolongamento do QT</td><td>Onda T apiculada; alargamento do QRS; desaparecimento da onda P; bradicardia, assistolia</td></tr>
<tr><td>Tratamento</td><td>Reposição de K⁺ (VO ou EV, conforme gravidade); corrigir causa de base; monitorização cardíaca se grave</td><td>Gluconato de cálcio (protege o coração); insulina + glicose (promove entrada de K⁺ nas células); beta-agonistas (salbutamol); bicarbonato de sódio (em acidose); diuréticos, resinas trocadoras, hemodiálise (remoção de K⁺)</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cm-calazio-hordeolo',
            area: 'Clínica Médica',
            titulo: 'Calázio x Hordéolo',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Característica</th><th>Calázio</th><th>Hordéolo (terçol)</th></tr></thead><tbody>
<tr><td>Definição</td><td>Inflamação <strong>crônica granulomatosa</strong> das glândulas de <strong>Meibômio</strong> (sebáceas da tarsal)</td><td>Infecção <strong>aguda supurativa</strong> das glândulas palpebrais (Zeiss, Moll ou Meibômio)</td></tr>
<tr><td>Etiologia</td><td>Obstrução do ducto da glândula de Meibômio, com reação granulomatosa a corpo estranho (lipogranuloma)</td><td>Infecção bacteriana, geralmente por <strong>Staphylococcus aureus</strong></td></tr>
<tr><td>Instalação</td><td>Lenta, progressiva, indolor</td><td>Súbita, dolorosa</td></tr>
<tr><td>Dor</td><td><strong>Ausente</strong> (após fase inicial)</td><td><strong>Presente</strong>, característica</td></tr>
<tr><td>Aspecto clínico</td><td>Nódulo firme, não eritematoso, <strong>indolor</strong>, na tarsal (pode ser palpável na face interna da pálpebra)</td><td>Pápula ou pústula <strong>eritematosa e dolorosa</strong>, na borda palpebral</td></tr>
<tr><td>Localização</td><td>Glândulas de <strong>Meibômio</strong> (interno)</td><td><strong>Hordéolo externo</strong>: glândulas de Zeiss ou Moll; <strong>interno</strong>: glândulas de Meibômio</td></tr>
<tr><td>Secreção purulenta</td><td>Ausente</td><td>Presente (pode drenar espontaneamente)</td></tr>
<tr><td>Evolução</td><td>Pode regredir espontaneamente ou formar granuloma persistente</td><td>Duração curta, com drenagem espontânea em poucos dias</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cm-anemias',
            area: 'Clínica Médica',
            titulo: 'Anemias',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Tipo de Anemia</th><th>Mecanismo / Causa</th><th>VCM</th><th>RDW</th><th>Ferro sérico</th><th>Ferritina</th><th>TIBC/CTLF</th><th>Reticulócitos</th></tr></thead><tbody>
<tr><td>Anemia Ferropriva</td><td>Diminuição do ferro corporal total (dieta pobre, perdas crônicas, sangramento menstrual ou GI)</td><td>↓</td><td>↑</td><td>↓</td><td>↓</td><td>↑</td><td>↓</td></tr>
<tr><td>Anemia da Doença Crônica (Inflamatória)</td><td>Aumento da hepcidina → sequestro de ferro nos macrófagos e inibição da liberação de ferro para a eritropoiese</td><td>N ou ↓</td><td>N</td><td>↓</td><td>N ou ↑</td><td>↓</td><td>↓ ou N</td></tr>
<tr><td>Anemia Sideroblástica</td><td>Defeito na síntese do heme (acúmulo de ferro mitocondrial); causas: álcool, isoniazida, chumbo, congênita</td><td>↓ ou N</td><td>↑</td><td>↑</td><td>↑</td><td>N ou ↓</td><td>↓</td></tr>
<tr><td>Anemia Megaloblástica</td><td>Déficit de vitamina B12 e/ou ácido fólico → erro na síntese de DNA e maturação nuclear</td><td>↑</td><td>↑</td><td>N</td><td>N</td><td>N</td><td>↓ (inapropriadamente baixo p/ o grau de anemia)</td></tr>
<tr><td>Anemia Falciforme</td><td>Mutação na cadeia β da Hb (HbS) → polimerização da Hb sob hipóxia → hemólise e vaso-oclusão</td><td>N</td><td>↑</td><td>↑</td><td>↑</td><td>N</td><td>↑ (hemólise crônica)</td></tr>
<tr><td>Anemia por Deficiência de G6PD</td><td>Deficiência enzimática → incapacidade de neutralizar radicais livres → hemólise oxidativa</td><td>N</td><td>↑</td><td>↑</td><td>↑</td><td>N</td><td>↑ (em crise hemolítica)</td></tr>
</tbody></table></div>
<p><strong>Multimídia:</strong></p>
<p><strong>Bite cells (Deficiência de G6PD):</strong></p>
<img class="bullet-card-image" src="assets/bullets/img/cm-anemia-bite-cells.png" alt="Bite cells na deficiência de G6PD">
<p><strong>Corpúsculos de Heinz (Deficiência de G6PD):</strong></p>
<img class="bullet-card-image" src="assets/bullets/img/cm-anemia-heinz.png" alt="Corpúsculos de Heinz">
<p><strong>Neutrófilos hipersegmentados (Anemia megaloblástica):</strong></p>
<img class="bullet-card-image" src="assets/bullets/img/cm-anemia-neutrofilo-hipersegmentado.png" alt="Neutrófilo hipersegmentado">
<p><strong>Sideroblastos em anel (Anemia sideroblástica):</strong></p>
<img class="bullet-card-image" src="assets/bullets/img/cm-anemia-sideroblastos.png" alt="Sideroblastos em anel">`
        },
        {
            id: 'cm-erisipela-celulite-fasceite',
            area: 'Clínica Médica',
            titulo: 'Erisipela x Celulite x Fasceíte Necrosante',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Característica</th><th>Erisipela</th><th>Celulite</th><th>Fasceíte Necrosante</th></tr></thead><tbody>
<tr><td>Camada acometida</td><td>Derme superficial e linfáticos</td><td>Derme profunda e tecido subcutâneo</td><td>Fáscia superficial e tecido subcutâneo profundo</td></tr>
<tr><td>Agente principal</td><td><em>Streptococcus pyogenes</em> (grupo A)</td><td><em>S. pyogenes</em> e <em>Staphylococcus aureus</em></td><td>Polimicrobiana (anaeróbios + aeróbios) ou <em>S. pyogenes</em> monomicrobiana</td></tr>
<tr><td>Início / Evolução</td><td>Súbito, rápido, febre alta</td><td>Mais insidioso</td><td>Rápido e destrutivo, com necrose</td></tr>
<tr><td>Aspecto clínico</td><td>Placa <strong>bem delimitada</strong>, vermelha, quente e dolorosa</td><td>Eritema <strong>mal delimitado</strong>, edema difuso e dor</td><td>Dor <strong>intensa e desproporcional</strong> ao achado; pele violácea, bolhas, crepitação e necrose</td></tr>
<tr><td>Local mais comum</td><td>Membros inferiores (face em crianças)</td><td>Membros inferiores</td><td>Membros inferiores, períneo (Fournier)</td></tr>
<tr><td>Sinais sistêmicos</td><td>Febre, mal-estar</td><td>Pode ter febre</td><td>Toxemia grave, sepse, choque</td></tr>
<tr><td>Diagnóstico</td><td>Clínico</td><td>Clínico</td><td>Clínico + achados cirúrgicos (tecido necrótico, ausência de sangramento, odor fétido)</td></tr>
<tr><td>Tratamento</td><td>Penicilina cristalina IV (grave) ou Benzatina / Amoxicilina VO</td><td>Cefalexina ou oxacilina IV; se MRSA → clindamicina ou vancomicina</td><td><strong>Cirurgia imediata + antibiótico de amplo espectro</strong> (carbapenêmico + clindamicina ± vancomicina)</td></tr>
<tr><td>Complicações</td><td>Linfedema crônico, recidiva</td><td>Abscesso, sepse</td><td>Sepse, síndrome compartimental, morte</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cm-gota-pseudogota',
            area: 'Clínica Médica',
            titulo: 'Gota x Pseudogota',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Gota</th><th>Pseudogota</th></tr></thead><tbody>
<tr><td>Cristais de urato monossódico</td><td>Cristais de pirofosfato de cálcio</td></tr>
<tr><td>Formato de agulha</td><td>Formato romboide</td></tr>
<tr><td>Birrefringência negativa</td><td>Birrefringência positiva</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cm-antibioticos-efeitos-colaterais',
            area: 'Clínica Médica',
            titulo: 'Antibióticos x Efeitos Colaterais',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Antibiótico</th><th>Efeito colateral</th></tr></thead><tbody>
<tr><td>Vancomicina</td><td>Síndrome do Homem Vermelho</td></tr>
<tr><td>Teicoplamina / Gentamicina</td><td>Ototoxicidade</td></tr>
<tr><td>Ceftriaxone</td><td>Pseudolitíase biliar</td></tr>
<tr><td>Clindamicina</td><td>Colite pseudomembranosa</td></tr>
<tr><td>Clorafenicol</td><td>Síndrome do Bebê Cinzento</td></tr>
<tr><td>Fluoroquinolona</td><td>Ruptura do tendão de Aquiles</td></tr>
<tr><td>Doxiciclina</td><td>Úlcera esofágica</td></tr>
</tbody></table></div>`
        }
    ];

    window.TRYCKTRACK_BULLETS_CM = bullets;
})();
