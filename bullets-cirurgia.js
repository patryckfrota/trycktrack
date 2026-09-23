/* Bullets — Cirurgia. Ver bullets-pediatria.js pro schema. Extraído de
   CIRURGIA - DECOREBAS.pdf (Sanar), conferido página a página (44
   páginas) contra o PDF original. */
(function () {
    const bullets = [
        {
            id: 'cir-colecistite-tokyo',
            area: 'Cirurgia',
            titulo: 'Colecistite Aguda - Diagnóstico - Critérios de Tokyo',
            html: `<p><strong>A. Sinais locais de inflamação da vesícula biliar</strong></p>
<ul class="reader-list"><li>Dor ou sensibilidade no hipocôndrio direito.</li><li>Sinal de Murphy positivo (clássico).</li><li>Massa palpável dolorosa no hipocôndrio direito.</li></ul>
<p><strong>B. Sinais sistêmicos de inflamação</strong></p>
<ul class="reader-list"><li>Febre.</li><li>Leucocitose.</li><li>PCR elevada (ou outros marcadores inflamatórios elevados).</li></ul>
<p><strong>C. Achados de imagem compatíveis</strong> (USG, TC ou RM que indiquem inflamação da vesícula):</p>
<ul class="reader-list"><li>Espessamento da parede (&gt;4 mm).</li><li>Líquido pericolecístico.</li><li>Aumento do volume vesicular.</li><li>Presença de cálculos impactados no colo ou cístico.</li><li>Sinal de Murphy ultrassonográfico.</li></ul>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Tipo de diagnóstico</th><th>Critérios necessários</th></tr></thead><tbody>
<tr><td>Suspeita de colecistite aguda</td><td>≥ 1 critério de A + ≥ 1 critério de B</td></tr>
<tr><td>Diagnóstico definitivo</td><td>Critérios de A + B + C</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-colecistite-gravidade',
            area: 'Cirurgia',
            titulo: 'Colecistite - Classificação de Gravidade',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Grau</th><th>Critérios</th></tr></thead><tbody>
<tr><td>Grau I (leve)</td><td>Colecistite sem disfunção orgânica, inflamação leve e segura para colecistectomia precoce.</td></tr>
<tr><td>Grau II (moderada)</td><td>Presença de pelo menos um dos seguintes: Leucócitos &gt; 18.000/mm³; massa ou inflamação marcada da vesícula; duração dos sintomas &gt; 72h; inflamação local intensa (aderências, abscesso, perfuração).</td></tr>
<tr><td>Grau III (grave)</td><td>Disfunção orgânica em pelo menos um sistema: Cardiovascular (hipotensão necessitando vasopressores); Neurológico (alteração do nível de consciência); Respiratório (PaO₂/FiO₂ &lt; 300); Renal (creatinina &gt; 2,0 mg/dL); Hepático (INR &gt; 1,5); Hematológico (plaquetas &lt; 100.000/mm³).</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-murphy-colecistite',
            area: 'Cirurgia',
            titulo: 'Sinal de Murphy - Colecistite',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Sinal</th><th>Positividade</th><th>Indica</th></tr></thead><tbody>
<tr><td>Murphy clínico</td><td>Dor e interrupção da inspiração à palpação do HCD</td><td>Colecistite aguda</td></tr>
<tr><td>Murphy ultrassonográfico</td><td>Interrupção da inspiração com dor à compressão pelo transdutor</td><td>Confirma achado clínico na imagem</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-triangulo-calot',
            area: 'Cirurgia',
            titulo: 'Triângulo de Calot - Colecistectomia',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Limite</th><th>Estrutura anatômica</th></tr></thead><tbody>
<tr><td>Superior</td><td>Borda inferior do fígado</td></tr>
<tr><td>Medial</td><td>Ducto hepático comum</td></tr>
<tr><td>Lateral</td><td>Ducto cístico</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-strasberg-vias-biliares',
            area: 'Cirurgia',
            titulo: 'Classificação de Strasberg – Lesões de Vias Biliares',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Classe</th><th>Descrição da Lesão</th></tr></thead><tbody>
<tr><td>Tipo A</td><td>Vazamento do ducto cístico ou de pequenos ductos acessórios hepáticos (ductos de Luschka).</td></tr>
<tr><td>Tipo B</td><td>Oclusão (geralmente por clipagem) de um ducto biliar aberrante sem continuidade com o ducto hepático comum, geralmente um ducto hepático direito acessório.</td></tr>
<tr><td>Tipo C</td><td>Secção de um ducto biliar aberrante sem continuidade com o ducto hepático comum, com vazamento de bile.</td></tr>
<tr><td>Tipo D</td><td>Lesão lateral ou perfuração da árvore biliar, geralmente uma lesão parcial da parede do ducto hepático comum.</td></tr>
<tr><td>Tipo E1</td><td>Lesão completa com separação &gt; 2 cm entre o coto do ducto hepático comum e a confluência dos ductos hepáticos direito e esquerdo.</td></tr>
<tr><td>Tipo E2</td><td>Lesão completa com separação &lt; 2 cm da confluência.</td></tr>
<tr><td>Tipo E3</td><td>Lesão na própria confluência, mas preservando-a (os ductos direito e esquerdo ainda se unem).</td></tr>
<tr><td>Tipo E4</td><td>Lesão com separação completa dos ductos hepáticos direito e esquerdo (perda da confluência).</td></tr>
<tr><td>Tipo E5</td><td>Lesão complexa envolvendo a confluência + lesão concomitante de ducto hepático direito aberrante.</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-colangite-charcot-reynolds',
            area: 'Cirurgia',
            titulo: 'Colangite Aguda - Tríade de Charcot e Pêntade de Reynolds',
            html: `<p><strong>Tríade de Charcot</strong> — três achados clínicos que sugerem colangite aguda:</p>
<ul class="reader-list"><li>Febre</li><li>Icterícia</li><li>Dor no hipocôndrio direito</li></ul>
<p><strong>Pêntade de Reynolds</strong> — é a Tríade de Charcot + dois sinais de gravidade, indicando colangite supurativa grave (séptica):</p>
<ul class="reader-list"><li>Febre</li><li>Icterícia</li><li>Dor no hipocôndrio direito</li><li>Hipotensão (choque séptico)</li><li>Alteração do nível de consciência</li></ul>`
        },
        {
            id: 'cir-colangite-tokyo',
            area: 'Cirurgia',
            titulo: 'Colangite Aguda - Diagnóstico - Critérios de Tokyo',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Etapa</th><th>Critérios</th></tr></thead><tbody>
<tr><td>A. Evidência de inflamação sistêmica</td><td>Febre e/ou calafrios; leucocitose ou leucopenia; PCR ou outros marcadores inflamatórios elevados</td></tr>
<tr><td>B. Colestase (obstrução biliar)</td><td>Icterícia; aumento de bilirrubina total (&gt; 2 mg/dL); aumento de FA, GGT, AST e/ou ALT (&gt; 1,5x o limite superior normal)</td></tr>
<tr><td>C. Evidência de obstrução biliar em imagem</td><td>Dilatação de vias biliares; presença de cálculo, estenose ou obstrução em USG, TC ou RM</td></tr>
</tbody></table></div>
<p><strong>Diagnóstico segundo as Tokyo Guidelines:</strong></p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Classificação diagnóstica</th><th>Critérios necessários</th></tr></thead><tbody>
<tr><td>Suspeita de colangite aguda</td><td>≥ 1 critério de A + ≥ 1 critério de B</td></tr>
<tr><td>Diagnóstico definitivo</td><td>Critérios de A + B + C</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-colangite-gravidade-tokyo',
            area: 'Cirurgia',
            titulo: 'Colangite Aguda - Classificação de Gravidade (Tokyo 2018)',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Grau</th><th>Critérios</th></tr></thead><tbody>
<tr><td>Grau I (leve)</td><td>Colangite sem disfunção orgânica e que responde bem à antibioticoterapia e suporte clínico.</td></tr>
<tr><td>Grau II (moderada)</td><td>Presença de qualquer 2 dos critérios abaixo: Leucócitos &gt; 12.000 ou &lt; 4.000; Febre ≥ 39°C; Idade ≥ 75 anos; Bilirrubina total ≥ 5 mg/dL; Albumina &lt; 0,7× limite inferior normal</td></tr>
<tr><td>Grau III (grave)</td><td>Disfunção em ≥1 sistema orgânico: Cardiovascular (hipotensão requerendo vasopressores); Neurológico (alteração do nível de consciência); Respiratório (PaO₂/FiO₂ &lt; 300); Renal (creatinina &gt; 2,0 mg/dL); Hepático (INR &gt; 1,5); Hematológico (plaquetas &lt; 100.000)</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-triade-rigler',
            area: 'Cirurgia',
            titulo: 'Tríade de Rigler - Íleo biliar',
            imagem: 'assets/bullets/img/cir-ct-ileo-biliar.png',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Elemento da tríade</th><th>Descrição</th></tr></thead><tbody>
<tr><td>1. Pneumobilia</td><td>Presença de ar nas vias biliares</td></tr>
<tr><td>2. Obstrução intestinal</td><td>Distensão de alças intestinais + níveis hidroaéreos</td></tr>
<tr><td>3. Cálculo biliar ectópico</td><td>Cálculo visível fora da vesícula biliar, geralmente no íleo terminal</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-polipo-vesicula',
            area: 'Cirurgia',
            titulo: 'Pólipo de Vesícula Biliar - Indicações de Cirurgia',
            html: `<p>Indicações de colecistectomia:</p>
<ul class="reader-list"><li>Idade &gt; 50 anos</li><li>Cálculos biliares associados</li><li>Tamanho ≥ 10 mm</li><li>Crescimento progressivo</li></ul>`
        },
        {
            id: 'cir-classificacao-todani',
            area: 'Cirurgia',
            titulo: 'Classificação de Todani - Cistos Biliares',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Tipo</th><th>Localização / Descrição</th></tr></thead><tbody>
<tr><td>Tipo I</td><td>Dilatação cística ou fusiforme da via biliar extra-hepática</td></tr>
<tr><td>Tipo II</td><td>Divertículo sacular isolado da via biliar extra-hepática</td></tr>
<tr><td>Tipo III (cisto do colédoco ou coledococele)</td><td>Dilatação intraduodenal do colédoco distal</td></tr>
<tr><td>Tipo IVa</td><td>Múltiplas dilatações intra e extra-hepáticas</td></tr>
<tr><td>Tipo IVb</td><td>Múltiplas dilatações extra-hepáticas</td></tr>
<tr><td>Tipo V (Doença de Caroli)</td><td>Dilatações intra-hepáticas segmentares ou difusas</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-escore-alvarado',
            area: 'Cirurgia',
            titulo: 'Escore de Alvarado - Apendicite',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Critério</th><th>Pontos</th></tr></thead><tbody>
<tr><td colspan="2"><strong>Sinais</strong></td></tr>
<tr><td>Dor que migra para a FID</td><td>1</td></tr>
<tr><td>Dor à palpação da FID</td><td>2</td></tr>
<tr><td>Descompressão + em FID</td><td>1</td></tr>
<tr><td>Febre ≥ 37,5°C</td><td>1</td></tr>
<tr><td colspan="2"><strong>Sintomas</strong></td></tr>
<tr><td>Anorexia</td><td>1</td></tr>
<tr><td>Náuseas ou vômitos</td><td>1</td></tr>
<tr><td colspan="2"><strong>Exames laboratoriais</strong></td></tr>
<tr><td>Leucocitose (&gt;10.000/mm³)</td><td>2</td></tr>
<tr><td>Desvio à esquerda (neutrofilia)</td><td>1</td></tr>
</tbody></table></div>
<ul class="reader-list">
<li><strong>0–3:</strong> improvável → avaliar outra causa</li>
<li><strong>4–6:</strong> provável → observação por 12h</li>
<li><strong>≥ 7:</strong> muito provável → apendicectomia</li>
</ul>`
        },
        {
            id: 'cir-sinais-apendicite',
            area: 'Cirurgia',
            titulo: 'Sinais de Apendicite Aguda',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Sinal</th><th>Como é realizado</th><th>Interpretação</th></tr></thead><tbody>
<tr><td>Blumberg (descompressão dolorosa)</td><td>Pressiona lentamente a FID e solta rapidamente (ponto de Mc Burney)</td><td>Dor intensa à liberação indica irritação peritoneal</td></tr>
<tr><td>Rovsing</td><td>Pressiona a fossa ilíaca esquerda</td><td>Dor referida na FID indica irritação peritoneal</td></tr>
<tr><td>Dunphy</td><td>Dor aumenta ao tossir</td><td>Irritação peritoneal na FID</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-hinchey-diverticulite',
            area: 'Cirurgia',
            titulo: 'Classificação de Hinchey - Diverticulite',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Grau</th><th>Descrição</th></tr></thead><tbody>
<tr><td>0</td><td>Ausência de complicações</td></tr>
<tr><td>I</td><td>A) Fleimão B) Abscesso pericólico</td></tr>
<tr><td>II</td><td>Abscesso pélvico</td></tr>
<tr><td>III</td><td>Peritonite purulenta</td></tr>
<tr><td>IV</td><td>Peritonite fecal</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-atlanta-pancreatite',
            area: 'Cirurgia',
            titulo: 'Critérios de Atlanta - Pancreatite',
            html: `<p><strong>1. Diagnóstico (precisa de 2 dos 3 critérios abaixo):</strong></p>
<ol class="reader-list">
<li><strong>Dor abdominal característica</strong> — epigástrica, irradiando para dorso, de forte intensidade.</li>
<li><strong>Amilase e/ou lipase ≥ 3x o valor de referência</strong> (obs: não tem relação com o prognóstico)</li>
<li><strong>Achados típicos em imagem</strong> (TC, RM ou USG) compatíveis com pancreatite.</li>
</ol>
<p><strong>2. Classificação da gravidade:</strong></p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Gravidade</th><th>Definição</th></tr></thead><tbody>
<tr><td>Leve</td><td>Sem falência orgânica, sem complicações locais ou sistêmicas</td></tr>
<tr><td>Moderadamente grave</td><td>Falência orgânica transitória (&lt; 48h) e/ou complicações locais ou sistêmicas sem falência persistente</td></tr>
<tr><td>Grave</td><td>Falência orgânica persistente (&gt; 48h), podendo ser de um ou mais órgãos</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-ranson-pancreatite',
            area: 'Cirurgia',
            titulo: 'Critérios de Ranson - Pancreatite',
            html: `<p>São usados para estratificar a gravidade da pancreatite aguda.</p>
<p><strong>Na admissão:</strong></p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Critério</th><th>Pontos</th></tr></thead><tbody>
<tr><td>Idade &gt; 55 anos</td><td>1</td></tr>
<tr><td>Leucócitos &gt; 16.000/mm³</td><td>1</td></tr>
<tr><td>Glicose &gt; 200 mg/dL</td><td>1</td></tr>
<tr><td>AST &gt; 250 U/L</td><td>1</td></tr>
<tr><td>LDH &gt; 350 U/L</td><td>1</td></tr>
</tbody></table></div>
<p><strong>Nas primeiras 48 horas:</strong></p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Critério</th><th>Pontos</th></tr></thead><tbody>
<tr><td>Queda de hematócrito &gt; 10%</td><td>1</td></tr>
<tr><td>Aumento de ureia &gt; 5 mg/dL</td><td>1</td></tr>
<tr><td>Cálcio &lt; 8 mg/dL</td><td>1</td></tr>
<tr><td>Déficit de base &gt; 4 mEq/L</td><td>1</td></tr>
<tr><td>PaO₂ &lt; 60 mmHg</td><td>1</td></tr>
<tr><td>Perda de fluidos &gt; 6 L</td><td>1</td></tr>
</tbody></table></div>
<p>Correlação entre a quantidade de critérios presentes e a taxa de mortalidade: 0 a 2 critérios: 2%; 3 a 4 critérios: 15%; 5 a 6 critérios: 40%; acima de 7 critérios: &gt; 90%.</p>`
        },
        {
            id: 'cir-balthazar-pancreatite',
            area: 'Cirurgia',
            titulo: 'Classificação de Balthazar - Pancreatite',
            html: `<p>Avaliam a gravidade da pancreatite com base em achados da tomografia computadorizada (TC).</p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Grau</th><th>Achado na TC</th><th>Pontuação</th></tr></thead><tbody>
<tr><td>A</td><td>Pâncreas normal</td><td>0</td></tr>
<tr><td>B</td><td>Aumento focal ou difuso do pâncreas</td><td>1</td></tr>
<tr><td>C</td><td>Inflamação peripancreática e/ou alterações da gordura peripancreática</td><td>2</td></tr>
<tr><td>D</td><td>Coleção líquida única peripancreática</td><td>3</td></tr>
<tr><td>E</td><td>Duas ou mais coleções líquidas ou presença de gás retroperitoneal</td><td>4</td></tr>
</tbody></table></div>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Necrose</th><th>Pontuação</th></tr></thead><tbody>
<tr><td>Nenhuma</td><td>0</td></tr>
<tr><td>&lt; 30% do parênquima</td><td>2</td></tr>
<tr><td>30–50%</td><td>4</td></tr>
<tr><td>&gt; 50%</td><td>6</td></tr>
</tbody></table></div>
<p><strong>Escore total de gravidade (0–10 pontos)</strong> — soma da pontuação de Balthazar + necrose:</p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Pontuação total</th><th>Gravidade</th><th>Mortalidade aproximada</th></tr></thead><tbody>
<tr><td>0–3</td><td>Leve</td><td>&lt; 3%</td></tr>
<tr><td>4–6</td><td>Moderada</td><td>~6%</td></tr>
<tr><td>7–10</td><td>Grave</td><td>~17%</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-bisap-pancreatite',
            area: 'Cirurgia',
            titulo: 'Escore de BISAP - Pancreatite',
            html: `<p>Escore simples e rápido, usado nas primeiras 24 horas de internação para predizer a gravidade e mortalidade da pancreatite aguda.</p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Critério (1 ponto cada)</th><th>Descrição</th></tr></thead><tbody>
<tr><td>B – BUN &gt; 25 mg/dL</td><td>Ureia elevada indica hipovolemia e mau prognóstico</td></tr>
<tr><td>I – Alteração do nível de consciência</td><td>Avaliada por Escala de Coma de Glasgow &lt; 15</td></tr>
<tr><td>S – SIRS presente</td><td>≥ 2 critérios de resposta inflamatória sistêmica</td></tr>
<tr><td>A – Idade &gt; 60 anos</td><td>Idosos têm maior risco de complicações</td></tr>
<tr><td>P – Derrame pleural na imagem</td><td>Detectado por RX ou TC de tórax</td></tr>
</tbody></table></div>
<p><strong>Pontuação total: 0–5 pontos</strong></p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Pontuação BISAP</th><th>Risco de mortalidade</th></tr></thead><tbody>
<tr><td>0–1</td><td>&lt; 1%</td></tr>
<tr><td>2</td><td>~2%</td></tr>
<tr><td>3</td><td>~5%</td></tr>
<tr><td>4</td><td>~12%</td></tr>
<tr><td>5</td><td>&gt; 20%</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-obstrucao-intestinal-radiografias',
            area: 'Cirurgia',
            titulo: 'Obstrução Intestinal - Radiografias',
            imagem: 'assets/bullets/img/cir-rx-empilhamento-moedas.png',
            html: `<ul class="reader-list">
<li><strong>Intestino delgado → empilhamento de moedas</strong></li>
<li><strong>Intestino grosso → haustrações</strong></li>
<li><strong>Atresia de duodenal → sinal da dupla bolha gástrica</strong>
<div class="reader-table-wrap"><table class="reader-table"><tbody><tr><td><img class="bullet-card-image" src="assets/bullets/img/cir-rx-dupla-bolha.png" alt="Sinal da dupla bolha na atresia duodenal"></td></tr></tbody></table></div>
</li>
<li><strong>Volve de cólon → sinal do grão de café / U invertido</strong>
<div class="reader-table-wrap"><table class="reader-table"><tbody><tr><td><img class="bullet-card-image" src="assets/bullets/img/cir-rx-grao-cafe-volvo.png" alt="Sinal do grão de café no volvo de cólon"></td></tr></tbody></table></div>
</li>
<li><strong>Intussuscepção → sinal do alvo / pseudo-rim</strong>
<div class="reader-table-wrap"><table class="reader-table"><tbody><tr><td><img class="bullet-card-image" src="assets/bullets/img/cir-usg-intussuscepcao.png" alt="Sinal do alvo na intussuscepção"></td></tr></tbody></table></div>
</li>
</ul>`
        },
        {
            id: 'cir-bismuth-corlette',
            area: 'Cirurgia',
            titulo: 'Classificação de Bismuth-Corlette - Tumor de Klatskin',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Tipo</th><th>Descrição anatômica do acometimento</th></tr></thead><tbody>
<tr><td>I</td><td>Tumor abaixo da confluência dos ductos hepáticos direito e esquerdo.</td></tr>
<tr><td>II</td><td>Tumor atinge a confluência, mas não se estende para os ductos direito ou esquerdo.</td></tr>
<tr><td>IIIa</td><td>Tumor atinge a confluência e se estende para o ducto hepático direito.</td></tr>
<tr><td>IIIb</td><td>Tumor atinge a confluência e se estende para o ducto hepático esquerdo.</td></tr>
<tr><td>IV</td><td>Tumor envolve ambos os ductos (direito e esquerdo) ou múltiplos ductos secundários, tornando a lesão bilateral e irressecável.</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-sindrome-mirizzi',
            area: 'Cirurgia',
            titulo: 'Síndrome de Mirizzi - Classificação de Csendes',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Tipo (Csendes)</th><th>Descrição anatômica</th></tr></thead><tbody>
<tr><td>Tipo I</td><td>Compressão extrínseca do ducto hepático comum ou colédoco por cálculo impactado no infundíbulo ou ducto cístico.</td></tr>
<tr><td>Tipo II</td><td>Fístula colecistobiliar envolvendo &lt; 1/3 da circunferência do colédoco.</td></tr>
<tr><td>Tipo III</td><td>Fístula colecistobiliar envolvendo até 2/3 da circunferência do colédoco.</td></tr>
<tr><td>Tipo IV</td><td>Fístula colecistobiliar completa, com destruição total da parede do colédoco.</td></tr>
<tr><td>Tipo V (Csendes revisada, 2007)</td><td>Associação com fístula colecistoentérica. Va: sem íleo biliar; Vb: com íleo biliar</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-courvoisier-celiaco-whipple-porta',
            area: 'Cirurgia',
            titulo: 'Sinal de Courvoisier, Tronco Celíaco, Whipple e Veia Porta',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Aspecto</th><th>Descrição</th></tr></thead><tbody>
<tr><td>Sinal de Courvoisier — Definição</td><td>Vesícula biliar palpável e indolor associada à icterícia progressiva.</td></tr>
<tr><td>Sinal de Courvoisier — Mecanismo</td><td>Obstrução biliar crônica, geralmente por tumor maligno da cabeça do pâncreas ou colangiocarcinoma distal, que causa dilatação da vesícula sem inflamação.</td></tr>
</tbody></table></div>
<p><strong>Tronco Celíaco</strong> — ramos: Artéria gástrica esquerda; Artéria esplênica; Artéria hepática comum.</p>
<p><strong>Cirurgia de Whipple</strong> = Duodenopancreatectomia.</p>
<p><strong>Veia Porta Hepática</strong> — Formação: veia mesentérica superior + veia esplênica. Local: essa confluência ocorre atrás do colo do pâncreas.</p>`
        },
        {
            id: 'cir-child-pugh',
            area: 'Cirurgia',
            titulo: 'Critérios da Classificação Child-Pugh - Cirrose Hepática',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Critérios / Pontos</th><th>1</th><th>2</th><th>3</th></tr></thead><tbody>
<tr><td>Encefalopatia</td><td>Ausente</td><td>Graus I e II</td><td>Graus III e IV</td></tr>
<tr><td>Ascite</td><td>Ausente</td><td>Pequena</td><td>Volumosa</td></tr>
<tr><td>INR</td><td>Menor que 1,7</td><td>1,7 – 2,3</td><td>Maior que 2,3</td></tr>
<tr><td>Bilirrubina total</td><td>Menor que 2</td><td>2 – 3</td><td>Maior que 3</td></tr>
<tr><td>Albumina</td><td>Maior que 3,5</td><td>2,8 – 3,5</td><td>Menor que 2,8</td></tr>
</tbody></table></div>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Classe</th><th>Pontuação total</th></tr></thead><tbody>
<tr><td>A (leve)</td><td>5–6</td></tr>
<tr><td>B (moderada)</td><td>7–9</td></tr>
<tr><td>C (grave)</td><td>10–15</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-meld-hipertensao-porta',
            area: 'Cirurgia',
            titulo: 'Escore de MELD e Hipertensão Porta',
            html: `<p><strong>Escore de MELD - Transplante Hepático</strong> (baseado em):</p>
<ul class="reader-list"><li>Bilirrubina</li><li>INR</li><li>Creatinina</li></ul>
<p><strong>Hipertensão Porta:</strong></p>
<ul class="reader-list">
<li><strong>Pré-hepática:</strong> Trombose de veia porta; Trombose de veia esplênica</li>
<li><strong>Intra-hepática:</strong> Pré-sinusoidal (esquistossomose); Sinusoidal (cirrose); Pós-sinusoidal (doença veno-oclusiva)</li>
<li><strong>Pós-hepática:</strong> Budd-Chiari</li>
</ul>`
        },
        {
            id: 'cir-gasa-hepatorrenal-pulmonar',
            area: 'Cirurgia',
            titulo: 'GASA, Profilaxia Síndrome Hepatorrenal e Síndrome Hepato-Pulmonar',
            html: `<p><strong>Gradiente de albumina soro-ascite (GASA):</strong></p>
<ul class="reader-list">
<li><strong>Maior ou igual a 1,1</strong> → cirrose, Budd-Chiari e insuficiência cardíaca</li>
<li><strong>Menor do que 1,1</strong> → tuberculose, carcinomatose e síndrome nefrótica</li>
</ul>
<p><strong>Profilaxia Síndrome Hepatorrenal (Albumina):</strong></p>
<ul class="reader-list"><li>1,5 g/kg no primeiro dia</li><li>1,0 g/kg no terceiro dia</li></ul>
<p><strong>Síndrome Hepato-Pulmonar — Tríade:</strong></p>
<ol class="reader-list"><li>Platipneia</li><li>Ortodeóxia</li><li>Cirrose hepática</li></ol>`
        },
        {
            id: 'cir-criterios-milao',
            area: 'Cirurgia',
            titulo: 'Critérios de Milão - Transplante Hepático',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Critério</th><th>Descrição</th></tr></thead><tbody>
<tr><td>Número de nódulos</td><td>1 nódulo ≤ 5 cm ou até 3 nódulos, cada um ≤ 3 cm</td></tr>
<tr><td>Invasão vascular</td><td>Ausência de invasão macrovascular (ex: veia porta, veias hepáticas)</td></tr>
<tr><td>Metástases</td><td>Ausência de metástases extra-hepáticas</td></tr>
<tr><td>Doença linfonodal</td><td>Ausência de comprometimento linfonodal</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-triangulo-killian-zenker',
            area: 'Cirurgia',
            titulo: 'Triângulo de Killian - Divertículo de Zenker',
            html: `<p>Ponto fraco da parede faríngea, onde pode ocorrer protrusão da mucosa e submucosa → divertículo de Zenker.</p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Estruturas envolvidas</th></tr></thead><tbody>
<tr><td>Músculo cricofaríngeo (inferior) e Constritor inferior da faringe (superior)</td></tr>
</tbody></table></div>
<p>Esofagografia baritada → imagem em adição (protrusão sacular na parede posterior da faringe).</p>`
        },
        {
            id: 'cir-mascarenhas-acalasia',
            area: 'Cirurgia',
            titulo: 'Classificação de Mascarenhas (Ferreira-Santos e Rezende) - Acalásia',
            html: `<p><strong>Ferreira-Santos (megaesôfago):</strong></p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Grau</th><th>Descrição</th></tr></thead><tbody>
<tr><td>Grau I</td><td>Diâmetro &lt; 4 cm, incoordenação, boa tonicidade</td></tr>
<tr><td>Grau II</td><td>Diâmetro entre 4 e 7 cm</td></tr>
<tr><td>Grau III</td><td>Diâmetro &gt; 7 cm</td></tr>
<tr><td>Grau IV</td><td>Diâmetro &gt; 7 cm, com tortuosidade (dolicomegaesôfago)</td></tr>
</tbody></table></div>
<p><strong>Rezende (megaesôfago):</strong></p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Grau</th><th>Descrição</th></tr></thead><tbody>
<tr><td>Grau I</td><td>Diâmetro normal com trânsito lento, coluna retida de nível plano</td></tr>
<tr><td>Grau II</td><td>Pequena/moderada dilatação, retenção evidente da coluna baritada e contrárias</td></tr>
<tr><td>Grau III</td><td>Grande dilatação, grande retenção, hipotonia ou nenhuma atividade contrátil</td></tr>
<tr><td>Grau IV</td><td>Grande dilatação, tortuoso ou dobrado, atônico (dolicomegaesôfago)</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-espasmo-esofagiano-difuso',
            area: 'Cirurgia',
            titulo: 'Espasmo Esofagiano Difuso',
            imagem: 'assets/bullets/img/cir-esofago-saca-rolhas.png',
            html: `<p>Esôfago em <strong>saca-rolhas</strong> na esofagografia baritada — contrações terciárias não peristálticas simultâneas.</p>`
        },
        {
            id: 'cir-esofagite-eosinofilica',
            area: 'Cirurgia',
            titulo: 'Esofagite Eosinofílica',
            imagem: 'assets/bullets/img/cir-esofagite-eosinofilica.png',
            html: `<ul class="reader-list">
<li><strong>Diagnóstico:</strong> Endoscopia + Biópsia esofágica → ≥ 15 eosinófilos/campo</li>
<li>Padrão na endoscopia: <strong>anéis circulares, traqueização, sulcos lineares, estenoses</strong></li>
</ul>`
        },
        {
            id: 'cir-classificacao-los-angeles',
            area: 'Cirurgia',
            titulo: 'Classificação de Los Angeles (LA) – Esofagite erosiva',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Grau</th><th>Descrição</th></tr></thead><tbody>
<tr><td>A</td><td>Uma ou mais erosões limitadas a uma mucosa ≤ 5 mm de comprimento.</td></tr>
<tr><td>B</td><td>Pelo menos uma erosão &gt; 5 mm, não contínua entre pregas mucosas.</td></tr>
<tr><td>C</td><td>Erosões que se estendem entre duas ou mais pregas mucosas, mas afetam menos de 75% da circunferência esofágica.</td></tr>
<tr><td>D</td><td>Erosões que afetam ≥ 75% da circunferência esofágica.</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-esofago-barrett',
            area: 'Cirurgia',
            titulo: 'Esôfago de Barrett',
            imagem: 'assets/bullets/img/cir-esofago-barrett.png',
            html: `<p>Endoscopia → cor vermelho-salmão (substituição do epitélio escamoso normal por epitélio colunar metaplásico).</p>`
        },
        {
            id: 'cir-siewert-junca-eg',
            area: 'Cirurgia',
            titulo: 'Classificação de Siewert - Adenocarcinoma da Junção Esôfago-Gástrica',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Tipo</th><th>Localização do centro tumoral</th><th>Origem provável</th><th>Conduta cirúrgica mais comum</th><th>Observações</th></tr></thead><tbody>
<tr><td>Tipo I</td><td>1 a 5 cm acima da junção esôfago-gástrica</td><td>Adenocarcinoma do esôfago distal (Barrett)</td><td>Esofagectomia com anastomose intratorácica</td><td>Considerado tumor esofágico; frequentemente associado ao refluxo e esôfago de Barrett</td></tr>
<tr><td>Tipo II</td><td>Entre 1 cm acima e 2 cm abaixo da junção</td><td>Adenocarcinoma do epitélio da junção (verdadeiro cárdico)</td><td>Cirurgia variável — esofagectomia ou gastrectomia total, dependendo da extensão</td><td>É o verdadeiro carcinoma da junção; zona de transição entre esôfago e estômago</td></tr>
<tr><td>Tipo III</td><td>2 a 5 cm abaixo da junção</td><td>Adenocarcinoma do estômago proximal (subcárdico)</td><td>Gastrectomia total com ressecção do esôfago distal</td><td>Considerado tumor gástrico; geralmente mais avançado ao diagnóstico</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-johnson-ulceras',
            area: 'Cirurgia',
            titulo: 'Classificação de Johnson - Úlceras Pépticas',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Tipo</th><th>Localização</th><th>Características clínicas / cirúrgicas</th></tr></thead><tbody>
<tr><td>Tipo I</td><td>Úlcera gástrica na curvatura menor, distal ao cárdia</td><td>Hipocloridria</td></tr>
<tr><td>Tipo II</td><td>Úlcera gástrica + úlcera duodenal</td><td>Hipercloridria</td></tr>
<tr><td>Tipo III</td><td>Úlcera prepilórica (próxima ao piloro)</td><td>Hipercloridria</td></tr>
<tr><td>Tipo IV</td><td>Úlcera gástrica próxima ao cárdia</td><td>Hipocloridria</td></tr>
<tr><td>Tipo V</td><td>Úlcera gástrica ou duodenal induzida por AINEs</td><td>Relacionada ao uso de anti-inflamatórios; pode ocorrer em qualquer local.</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-sakita-forrest-ulceras',
            area: 'Cirurgia',
            titulo: 'Classificação de Sakita e Forrest - Úlceras',
            imagem: 'assets/bullets/img/cir-forrest-classificacao.png',
            html: `<p><strong>Sakita (evolução endoscópica da úlcera):</strong></p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Fase / Classe</th><th>Descrição endoscópica</th></tr></thead><tbody>
<tr><td>A1 – Ativa 1</td><td>Úlcera com base limpa, bordas elevadas, hemorragia recente possível; tamanho pequeno a moderado.</td></tr>
<tr><td>A2 – Ativa 2</td><td>Úlcera com inflamação intensa, exsudato ou fibrina; bordas mais elevadas; risco de sangramento.</td></tr>
<tr><td>H1 – Healing 1 (em reparação 1)</td><td>Úlcera em cicatrização inicial, fibrina reduzida, bordas menos elevadas; início de granulação.</td></tr>
<tr><td>H2 – Healing 2 (em reparação 2)</td><td>Ulceração quase cicatrizada, base plana, cor rosa, bordas suavizadas.</td></tr>
<tr><td>S1 – Scar 1 (cicatrizada 1)</td><td>Úlcera completa e cicatrizada, leve depressão residual; mucosa normal próxima.</td></tr>
<tr><td>S2 – Scar 2 (cicatrizada 2)</td><td>Úlcera totalmente cicatrizada, mucosa íntegra; geralmente apenas marca endoscópica residual.</td></tr>
</tbody></table></div>
<p><strong>Forrest (úlceras sangrantes):</strong></p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Tipo</th><th>Descrição</th></tr></thead><tbody>
<tr><td>Ia</td><td>Sangramento ativo em jato</td></tr>
<tr><td>Ib</td><td>Sangramento em gotejamento ou escorrimento</td></tr>
<tr><td>IIa</td><td>Vaso visível</td></tr>
<tr><td>IIb</td><td>Coágulo aderente</td></tr>
<tr><td>IIc</td><td>Hematina pigmentada</td></tr>
<tr><td>III</td><td>Base limpa</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-hernias-hiato',
            area: 'Cirurgia',
            titulo: 'Classificação Hérnias de Hiato',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Tipo</th><th>Descrição</th></tr></thead><tbody>
<tr><td>Tipo I – Deslizante</td><td>Junção gastroesofágica (JGE) e pequena porção do fundo gástrico deslizam para cima através do hiato</td></tr>
<tr><td>Tipo II – Paraesofágica</td><td>JGE permanece na posição normal, mas fundo gástrico hernia lateralmente ao esôfago</td></tr>
<tr><td>Tipo III – Mista</td><td>Combinação de tipos I e II: JGE e fundo gástrico herniados</td></tr>
<tr><td>Tipo IV – Giant paraesofágica</td><td>Além do estômago, outros órgãos abdominais (intestino, baço, cólon) herniam pelo hiato</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-hemorroidas-goodsall',
            area: 'Cirurgia',
            titulo: 'Classificação Hemorroidas Internas e Regra de Goodsall Salmon',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Grau</th><th>Descrição</th><th>Conduta usual</th></tr></thead><tbody>
<tr><td>Grau I</td><td>Hemorroida interna sem prolapsos, apenas sangramento possível</td><td>Tratamento conservador: dieta rica em fibras, líquidos, pomadas ou supositórios</td></tr>
<tr><td>Grau II</td><td>Hemorroida prolapsa durante evacuação mas reduz sozinha</td><td>Conservador inicialmente; se sintomática, pode-se usar ligadura elástica</td></tr>
<tr><td>Grau III</td><td>Hemorroida prolapsa durante evacuação e precisa ser reduzida manualmente</td><td>Geralmente indicada hemorroidectomia</td></tr>
<tr><td>Grau IV</td><td>Hemorroida prolapsa e não pode ser reduzida</td><td>Geralmente indicada hemorroidectomia</td></tr>
</tbody></table></div>
<p><strong>Regra de Goodsall Salmon - Fístula Anorretal:</strong></p>
<ul class="reader-list">
<li><strong>Orifício externo anterior</strong> ao meio do esfíncter anal (linha imaginária transversa anterior): a fístula tende a seguir um trajeto reta até o canal anal.</li>
<li><strong>Orifício externo posterior</strong> ao meio do esfíncter anal: a fístula tende a seguir um trajeto curvo em arco posterior até o canal anal (em direção ao punho posterior do esfíncter).</li>
</ul>`
        },
        {
            id: 'cir-conceitos-hernias',
            area: 'Cirurgia',
            titulo: 'Conceitos - Hérnias',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Hérnia</th><th>Definição</th></tr></thead><tbody>
<tr><td>Littré</td><td>Hérnia que contém um divertículo de Meckel no saco herniário.</td></tr>
<tr><td>Amyand</td><td>Hérnia inguinal que contém o apêndice cecal</td></tr>
<tr><td>Ritcher</td><td>Pinçamento da borda anti-mesentérica</td></tr>
<tr><td>Garengeot</td><td>Hérnia femoral que contém o apêndice cecal</td></tr>
<tr><td>Deslizamento</td><td>Hérnia em que uma víscera (geralmente retroperitoneal) forma parte da parede do saco.</td></tr>
<tr><td>Pantalona</td><td>Hérnia inguinal direta e indireta coexistindo</td></tr>
<tr><td>Spiegel</td><td>Hérnia que ocorre na linha semilunar de Spiegel, lateral à musculatura reto abdominal.</td></tr>
<tr><td>Grynfelt</td><td>Hérnia dorsal ou lombar superior, surgindo no triângulo de Grynfelt (acima do oblíquo).</td></tr>
<tr><td>Petit</td><td>Hérnia lombar inferior, ocorrendo no triângulo de Petit (entre oblíquo externo e latíssimo do dorso).</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-nyhus-hernias',
            area: 'Cirurgia',
            titulo: 'Classificação de NYHUS - Hérnias',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Tipo</th><th>Descrição anatômica</th></tr></thead><tbody>
<tr><td>I</td><td>Hérnia indireta com o anel herniário preservado</td></tr>
<tr><td>II</td><td>Hérnia indireta com o anel herniário alargado</td></tr>
<tr><td>III</td><td>Defeito da parede posterior</td></tr>
<tr><td>→ IIIa</td><td>Direta</td></tr>
<tr><td>→ IIIb</td><td>Indireta</td></tr>
<tr><td>→ IIIc</td><td>Femoral</td></tr>
<tr><td>IV</td><td>Hérnia recidivada (após correção cirúrgica prévia)</td></tr>
<tr><td>→ IVa</td><td>Recidiva de hérnia direta</td></tr>
<tr><td>→ IVb</td><td>Recidiva de hérnia indireta</td></tr>
<tr><td>→ IVc</td><td>Recidiva de hérnia femoral</td></tr>
<tr><td>→ IVd</td><td>Recidiva de hérnia combinada (mista)</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-triangulos-hasselbech-canal-femoral-doom-dor',
            area: 'Cirurgia',
            titulo: 'Triângulo de Hasselbech, Canal Femoral e Triângulos de Doom e da Dor',
            html: `<p><strong>Triângulo de Hasselbech - Hérnias Diretas</strong></p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Limite</th><th>Estrutura anatômica</th></tr></thead><tbody>
<tr><td>Medial</td><td>Borda lateral do músculo reto abdominal</td></tr>
<tr><td>Lateral</td><td>Vasos epigástricos inferiores</td></tr>
<tr><td>Inferior (base)</td><td>Ligamento inguinal (de Poupart)</td></tr>
</tbody></table></div>
<p><strong>Canal Femoral - Limites Anatômicos</strong></p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Limite</th><th>Estrutura anatômica</th></tr></thead><tbody>
<tr><td>Anterior</td><td>Fáscia lata e ligamento inguinal (de Poupart)</td></tr>
<tr><td>Posterior</td><td>Ligamento pectíneo (de Cooper) e músculo pectíneo</td></tr>
<tr><td>Medial</td><td>Ligamento lacunar (de Gimbernat)</td></tr>
<tr><td>Lateral</td><td>Veia femoral</td></tr>
</tbody></table></div>
<p><strong>Triângulo da Morte (Triângulo de Doom)</strong></p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Limite</th><th>Estrutura anatômica</th></tr></thead><tbody>
<tr><td>Medial</td><td>Ducto deferente (homens) / ligamento redondo (mulheres)</td></tr>
<tr><td>Lateral</td><td>Vasos espermáticos (gonadais)</td></tr>
<tr><td>Base (inferior)</td><td>Vasos ilíacos externos e ligamento pectíneo (de Cooper)</td></tr>
</tbody></table></div>
<p><strong>Triângulo da Dor (Triangle of Pain)</strong></p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Limite</th><th>Estrutura anatômica</th></tr></thead><tbody>
<tr><td>Medial</td><td>Vasos espermáticos (gonadais)</td></tr>
<tr><td>Lateral</td><td>Nervo cutâneo femoral lateral e músculo iliopsoas</td></tr>
<tr><td>Base (superior)</td><td>Trato iliopúbico</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-borrmann-cancer-gastrico',
            area: 'Cirurgia',
            titulo: 'Classificação de Borrmann - Câncer Gástrico',
            html: `<p>Aspectos macroscópicos do carcinoma gástrico avançado:</p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Tipo</th><th>Descrição</th></tr></thead><tbody>
<tr><td>Tipo I - Protuso</td><td>Massa protrusa (polipoide) bem delimitada, projetando-se na luz gástrica.</td></tr>
<tr><td>Tipo II - Ulcerado</td><td>Lesão ulcerada com bordas elevadas e bem delimitadas.</td></tr>
<tr><td>Tipo III - Ulceroinfiltrativo</td><td>Lesão ulcerada com bordas mal definidas, infiltrando a parede adjacente.</td></tr>
<tr><td>Tipo IV – Infiltrativo difuso</td><td>Infiltração difusa da parede gástrica, sem ulceração ou massa evidente (linite plástica).</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-lauren-cancer-gastrico',
            area: 'Cirurgia',
            titulo: 'Classificação de Lauren - Câncer Gástrico',
            html: `<p>Tipos histológicos do adenocarcinoma gástrico:</p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Tipo (Lauren)</th><th>Características histológicas</th><th>Aspectos clínicos e epidemiológicos</th></tr></thead><tbody>
<tr><td>Tipo Intestinal</td><td>Formação de glândulas bem diferenciadas. Células coesas, com estrutura glandular semelhante ao intestino.</td><td>Mais comum em idosos e homens. Associado à gastrite atrófica, metaplasia intestinal e infecção por H. pylori. Geralmente ocorre na curvatura menor do estômago. Tem melhor prognóstico.</td></tr>
<tr><td>Tipo Difuso</td><td>Células pouco coesas, infiltrando difusamente a parede gástrica. Presença de células em anel de sinete (com mucina empurrando o núcleo para a periferia).</td><td>Mais comum em jovens e mulheres. Associado a tipo sanguíneo A. Pior prognóstico.</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-epônimos-metastase-gastrico',
            area: 'Cirurgia',
            titulo: 'Epônimos de Metástase - Câncer Gástrico',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Nome / Epônimo</th><th>Localização</th></tr></thead><tbody>
<tr><td>Virchow</td><td>Linfonodo supraclavicular esquerdo</td></tr>
<tr><td>Irish</td><td>Linfonodos axilares esquerdos</td></tr>
<tr><td>Irmão Maria José (Sister Mary Joseph)</td><td>Nódulo umbilical</td></tr>
<tr><td>Krukenberg</td><td>Ovários (metástase ovariana)</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-escala-glasgow',
            area: 'Cirurgia',
            titulo: 'Escala de Glasgow',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Componente</th><th>Pontuação</th><th>Critério</th></tr></thead><tbody>
<tr><td rowspan="4">Abertura ocular (O)</td><td>4</td><td>Espontânea</td></tr>
<tr><td>3</td><td>À fala</td></tr>
<tr><td>2</td><td>À dor</td></tr>
<tr><td>1</td><td>Nenhuma</td></tr>
<tr><td rowspan="5">Resposta verbal (V)</td><td>5</td><td>Orientada</td></tr>
<tr><td>4</td><td>Confusa</td></tr>
<tr><td>3</td><td>Palavras inapropriadas</td></tr>
<tr><td>2</td><td>Sons incompreensíveis</td></tr>
<tr><td>1</td><td>Nenhuma</td></tr>
<tr><td rowspan="6">Resposta motora (M)</td><td>6</td><td>Obedece comandos</td></tr>
<tr><td>5</td><td>Localiza dor</td></tr>
<tr><td>4</td><td>Flexão normal (retirada)</td></tr>
<tr><td>3</td><td>Flexão anormal (decorticação)</td></tr>
<tr><td>2</td><td>Extensão anormal (descerebração)</td></tr>
<tr><td>1</td><td>Nenhuma</td></tr>
</tbody></table></div>
<p><strong>Interpretação:</strong></p>
<ul class="reader-list">
<li><strong>GCS 13–15:</strong> Lesão leve</li>
<li><strong>GCS 9–12:</strong> Lesão moderada</li>
<li><strong>GCS ≤8:</strong> Lesão grave (indicação de intubação e monitorização intensiva)</li>
</ul>`
        },
        {
            id: 'cir-triade-cushing',
            area: 'Cirurgia',
            titulo: 'Tríade de Cushing - Hipertensão intracraniana grave',
            html: `<ul class="reader-list"><li>Hipertensão arterial</li><li>Bradicardia</li><li>Respiração irregular</li></ul>`
        },
        {
            id: 'cir-hematoma-retroperitoneal-zonas',
            area: 'Cirurgia',
            titulo: 'Hematoma Retroperitoneal - Zonas',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Zona</th><th>Localização</th><th>Conduta habitual</th></tr></thead><tbody>
<tr><td>Zona 1 (central / perirrenal e retroperitoneal central)</td><td>Ao redor da aorta, veia cava, pâncreas, duodeno, grandes vasos</td><td>Cirurgia tanto em trauma CONTUSO quanto em trauma PENETRANTE</td></tr>
<tr><td>Zona 2 (lateral / perirrenal / pararrenal)</td><td>Região perirrenal e lombar lateral, envolvendo ureteres e rins</td><td>Cirurgia se trauma PENETRANTE; trauma CONTUSO não explorar (exceto se expansão)</td></tr>
<tr><td>Zona 3 (pélvica / infra-ilíaca)</td><td>Região pélvica, próxima à bifurcação das artérias ilíacas</td><td>Cirurgia se trauma PENETRANTE; trauma CONTUSO não explorar (exceto se expansão)</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-trauma-hepatico',
            area: 'Cirurgia',
            titulo: 'Trauma Hepático - Classificação',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Grau</th><th>Descrição</th></tr></thead><tbody>
<tr><td>Grau I</td><td>Hematoma subcapsular &lt;10% da superfície do fígado ou laceração capsular &lt;1 cm de profundidade</td></tr>
<tr><td>Grau II</td><td>Hematoma subcapsular 10–50% ou intraparenquimatoso &lt;10 cm; laceração 1–3 cm de profundidade</td></tr>
<tr><td>Grau III</td><td>Hematoma subcapsular &gt;50% ou intraparenquimatoso &gt;10 cm; laceração &gt;3 cm de profundidade</td></tr>
<tr><td>Grau IV</td><td>Laceração que envolve 25–75% de um lobo hepático ou laceração envolvendo vasos segmentares principais</td></tr>
<tr><td>Grau V</td><td>Laceração que destrói &gt;75% de um lobo hepático ou lesão de veia hepática principal / veia cava inferior</td></tr>
<tr><td>Grau VI</td><td>Fígado avulsionado ou devastado, geralmente incompatível com a vida</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-trauma-esplenico',
            area: 'Cirurgia',
            titulo: 'Trauma Esplênico - Classificação',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Grau</th><th>Descrição</th></tr></thead><tbody>
<tr><td>Grau I</td><td>Hematoma subcapsular &lt;10% da superfície ou laceração &lt;1 cm de profundidade</td></tr>
<tr><td>Grau II</td><td>Hematoma subcapsular 10–50% ou intraparenquimatoso &lt;5 cm; laceração 1–3 cm de profundidade</td></tr>
<tr><td>Grau III</td><td>Hematoma subcapsular &gt;50% ou intraparenquimatoso &gt;5 cm; laceração &gt;3 cm de profundidade</td></tr>
<tr><td>Grau IV</td><td>Laceração envolvendo segmento ou lobo importante; dano vascular principal parcial</td></tr>
<tr><td>Grau V</td><td>Laceração que destrói quase todo o órgão ou lesão vascular hilar total; risco de hemorragia maciça</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-trauma-renal',
            area: 'Cirurgia',
            titulo: 'Trauma Renal - Classificação',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Grau</th><th>Descrição</th></tr></thead><tbody>
<tr><td>Grau I</td><td>Contusão ou hematoma subcapsular sem ruptura do parênquima; laceração &lt;1 cm de profundidade</td></tr>
<tr><td>Grau II</td><td>Laceração cortical 1–4 cm sem envolvimento do sistema coletor; hematoma não expansivo</td></tr>
<tr><td>Grau III</td><td>Laceração &gt;4 cm de profundidade, sem envolvimento do sistema coletor</td></tr>
<tr><td>Grau IV</td><td>Laceração envolvendo o sistema coletor ou artéria/veia segmentar principal; hematoma perirrenal ou expansivo</td></tr>
<tr><td>Grau V</td><td>Avulsão do pedículo renal ou rim fragmentado; perda funcional quase total</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-trauma-cervical',
            area: 'Cirurgia',
            titulo: 'Trauma Cervical - Zonas',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Zona</th><th>Localização</th><th>Estruturas importantes</th></tr></thead><tbody>
<tr><td>Zona 1</td><td>Base do pescoço, clavículas até cricoide</td><td>Grandes vasos (aorta, subclávia, carótida comum), traqueia, esôfago, pleura, ápices pulmonares</td></tr>
<tr><td>Zona 2</td><td>Entre cricoide e ângulo da mandíbula</td><td>Carótidas, jugular, traqueia, esôfago, laringe</td></tr>
<tr><td>Zona 3</td><td>Ângulo da mandíbula até base do crânio</td><td>Artérias carótidas internas, veias jugulares altas, nervos cranianos</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-le-fort',
            area: 'Cirurgia',
            titulo: 'Classificação de Le Fort - Fraturas Faciais',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Tipo</th><th>Descrição</th><th>Estruturas envolvidas</th></tr></thead><tbody>
<tr><td>Le Fort I</td><td>Fratura horizontal do maxilar superior</td><td>Alvéolos dentários, palato, processo piramidal do maxilar</td></tr>
<tr><td>Le Fort II</td><td>Fratura piramidal</td><td>Maxilar superior, nariz, rebordo infraorbital, osso zigomático, septo nasal; aspecto de "máscara"</td></tr>
<tr><td>Le Fort III</td><td>Fratura craniofacial</td><td>Separação completa da face do crânio; envolve órbita, zigomático, osso nasal, suturas fronto-maxilares; "deslocamento craniofacial"</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-queimaduras-atls',
            area: 'Cirurgia',
            titulo: 'Queimaduras - ATLS (Regra dos 9 e Reposição Volêmica)',
            html: `<p><strong>Regra dos 9 (Superfície corporal queimada):</strong></p>
<ul class="reader-list">
<li>Cabeça e pescoço: 9%</li>
<li>Cada braço inteiro (frente e costas): 9%</li>
<li>Tronco anterior (peito e abdômen): 18%</li>
<li>Tronco posterior (costas inteiras e nádegas): 18%</li>
<li>Cada perna inteira (frente e costas): 18%</li>
<li>Genitália: 1%</li>
</ul>
<p><strong>Reposição volêmica:</strong></p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Tipo de Queimadura</th><th>Idade</th><th>Infusão de Líquidos Ajustada</th></tr></thead><tbody>
<tr><td>Térmica</td><td>Adulto e criança (&gt;13 anos)</td><td>2 × peso × SCQ / 16</td></tr>
<tr><td>Térmica</td><td>&lt;13 anos</td><td>3 × peso × SCQ / 16</td></tr>
<tr><td>Elétrica</td><td>Todas as idades</td><td>4 × peso × SCQ / 16</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-perda-sangue-atls',
            area: 'Cirurgia',
            titulo: 'Perda estimada de sangue - ATLS',
            html: `<p><strong>Nova classificação:</strong></p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Parâmetros</th><th>MENOR</th><th>MODERADO</th><th>MAIOR</th></tr></thead><tbody>
<tr><td>FC</td><td>Inalterada</td><td>Inalterada - &gt; 100</td><td>&gt; 120</td></tr>
<tr><td>PAS</td><td>Inalterada</td><td>Inalterada - diminuída</td><td>&lt; 90</td></tr>
<tr><td>Sangue</td><td>Improvável</td><td>Provável</td><td>Transfusão maciça</td></tr>
<tr><td>Controle cirúrgico da hemorragia</td><td>Improvável</td><td>Provável</td><td>Extremamente provável</td></tr>
</tbody></table></div>
<p><strong>Antiga classificação:</strong></p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th></th><th>Classe I</th><th>Classe II</th><th>Classe III</th><th>Classe IV</th></tr></thead><tbody>
<tr><td>Perda sanguínea (mL)</td><td>Até 750</td><td>750–1500</td><td>1500–2000</td><td>&gt;2000</td></tr>
<tr><td>Perda sanguínea (% volume sanguíneo)</td><td>Até 15%</td><td>15%–30%</td><td>30%–40%</td><td>&gt;40%</td></tr>
<tr><td>Frequência de pulso (BPM)</td><td>&lt;100</td><td>100–120</td><td>120–140</td><td>&gt;140</td></tr>
<tr><td>Pressão arterial</td><td>Normal</td><td>Normal</td><td>Diminuída</td><td>Diminuída</td></tr>
<tr><td>Pressão de pulso (mmHg)</td><td>Normal ou aumentada</td><td>Diminuída</td><td>Diminuída</td><td>Diminuída</td></tr>
<tr><td>Frequência respiratória</td><td>14–20</td><td>20–30</td><td>30–40</td><td>&gt;35</td></tr>
<tr><td>Diurese (mL/h)</td><td>&gt;30</td><td>20–30</td><td>5–15</td><td>Desprezível</td></tr>
<tr><td>Estado mental/SNC</td><td>Levemente ansioso</td><td>Moderadamente ansioso</td><td>Ansioso, confuso</td><td>Confuso, letárgico</td></tr>
<tr><td>Reposição volêmica</td><td>Cristaloide</td><td>Cristaloide</td><td>Cristaloide e sangue</td><td>Cristaloide e sangue</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-trauma-abdominal',
            area: 'Cirurgia',
            titulo: 'Trauma abdominal',
            html: `<ul class="reader-list">
<li><strong>Penetrante:</strong>
<ul class="reader-list reader-sublist"><li>PAF: delgado</li><li>Arma branca: fígado</li></ul></li>
<li><strong>Contuso:</strong> baço; fígado</li>
</ul>`
        },
        {
            id: 'cir-lesoes-cerebrais-focais',
            area: 'Cirurgia',
            titulo: 'Lesões Cerebrais Focais',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Característica</th><th>Hematoma Epidural (HE)</th><th>Hematoma Subdural (HS)</th></tr></thead><tbody>
<tr><td>Localização</td><td>Entre o crânio e a dura-máter</td><td>Entre a dura-máter e a aracnoide</td></tr>
<tr><td>Origem do sangramento</td><td>Artéria meníngea (geralmente MMA)</td><td>Veia ponte</td></tr>
<tr><td>Formato no TC</td><td>Lente biconvexa</td><td>Crescent-shaped (meia-lua)</td></tr>
<tr><td>Pressão intracraniana</td><td>Aumenta rapidamente</td><td>Aumenta gradualmente</td></tr>
<tr><td>Idade mais comum</td><td>Jovens</td><td>Idosos, alcoólatras</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-traumas-toracicos',
            area: 'Cirurgia',
            titulo: 'Traumas torácicos',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Condição</th><th>Definição</th><th>Exame Físico</th><th>Tratamento Inicial</th></tr></thead><tbody>
<tr><td>Pneumotórax Hipertensivo</td><td>Acúmulo de ar na cavidade pleural sem comunicação com o ambiente</td><td>Hipertimpanismo à percussão, diminuição de MV no hemitórax afetado, dor torácica, dispneia, desvio de traqueia</td><td>Pode-se realizar uma toracocentese de alívio, mas o tratamento definitivo consiste na drenagem em selo d'água.</td></tr>
<tr><td>Pneumotórax aberto</td><td>Lesão &gt; 2/3 do diâmtro da traqueia</td><td>Sopro subcutâneo, diminuição de MV, instabilidade respiratória</td><td>Tamponar o ferimento com oclusão parcial (3 lados), oxigenoterapia</td></tr>
<tr><td>Hemotórax</td><td>Acúmulo de sangue na cavidade pleural</td><td>Dispneia, desconforto respiratório, hipotensão, veias do pescoço colabadas, desvio de traqueia, macicez à percussão torácica.</td><td>Drenagem torácica em selo d'água, reposição volêmica com cristaloides e se necessário, transfusão de concentrado de hemácias. Em muitos casos necessita-se de toracotomia.</td></tr>
<tr><td>Tamponamento cardíaco</td><td>Acúmulo de líquido no pericárdio causando compressão do coração</td><td>Tríade de Beck → hipofonese de bulhas, hipotensão e turgência jugular</td><td>Pericardiocentese urgente, suporte hemodinâmico, correção da causa. Pode ser necessário toracotomia.</td></tr>
<tr><td>Tórax instável</td><td>Fraturas de ≥2 costelas em ≥2 pontos, causando segmento flutuante</td><td>Movimento paradoxal do segmento torácico (inspiração segmento entra, expira sai)</td><td>Analgesia agressiva, oxigenoterapia, ventilação mecânica se necessário</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-embolia-gordurosa',
            area: 'Cirurgia',
            titulo: 'Embolia Gordurosa',
            html: `<p><strong>Tríade:</strong></p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Achado</th><th>Descrição</th></tr></thead><tbody>
<tr><td>Hipoxemia</td><td>Queda da saturação de O₂, podendo evoluir para insuficiência respiratória.</td></tr>
<tr><td>Petéquias</td><td>Pequenas manchas vermelhas na pele, principalmente no tórax, axilas e conjuntiva.</td></tr>
<tr><td>Alterações neurológicas</td><td>Confusão mental, agitação, sonolência ou até coma.</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-janelas-fast',
            area: 'Cirurgia',
            titulo: 'Janelas do FAST',
            html: `<ul class="reader-list">
<li>Pericárdica</li>
<li>Hepatorrenal / Morison</li>
<li>Esplenorrenal</li>
<li>Pelve / Recesso suprapúbico</li>
<li>Tórax (opcional: E-FAST)</li>
</ul>`
        },
        {
            id: 'cir-manobras-retroperitoneo',
            area: 'Cirurgia',
            titulo: 'Manobras Cirúrgicas - Retroperitôneo',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Manobra</th><th>O que é</th><th>Estruturas expostas</th></tr></thead><tbody>
<tr><td>Mattox</td><td>Mobilização visceral à esquerda, com medialização do cólon descendente e alça jejunal inicial</td><td>Aorta abdominal, rim esquerdo, ureter esquerdo, artéria/veia mesentérica inferior</td></tr>
<tr><td>Kocher</td><td>Dissecção das fixações peritoneais laterais do duodeno para permitir a inspeção do duodeno, pâncreas e outras estruturas retroperitoneais até os grandes vasos.</td><td>Duodeno, cabeça do pâncreas, VCI, veia renal direita, artéria mesentérica superior</td></tr>
<tr><td>Cattell–Braasch</td><td>Mobilização completa do cólon direito e delgado, com rotação visceral para a esquerda</td><td>Mesentério delgado, VCI, aorta infra-renal, vasos ilíacos</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-trauma-intestino-delgado',
            area: 'Cirurgia',
            titulo: 'Trauma Intestino Delgado - Sinal do cinto de segurança',
            imagem: 'assets/bullets/img/cir-sinal-cinto-seguranca.png',
            html: `<p>Está associado principalmente a lesões do intestino delgado.</p>`
        },
        {
            id: 'cir-classificacao-asa',
            area: 'Cirurgia',
            titulo: 'Classificação de ASA',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>ASA</th><th>Descrição</th><th>Exemplos</th></tr></thead><tbody>
<tr><td>ASA I</td><td>Paciente saudável, sem doença sistêmica</td><td>Jovem sem comorbidades, cirurgia eletiva simples</td></tr>
<tr><td>ASA II</td><td>Doença sistêmica leve, controlada, sem limitação funcional significativa</td><td>Hipertensão ou diabetes controlada, obesidade leve, gravidez saudável</td></tr>
<tr><td>ASA III</td><td>Doença sistêmica grave, com limitação funcional</td><td>Hipertensão ou diabetes com complicações, angina estável, insuficiência renal leve</td></tr>
<tr><td>ASA IV</td><td>Doença sistêmica grave que ameaça a vida</td><td>Infarto recente, insuficiência cardíaca grave, insuficiência respiratória grave</td></tr>
<tr><td>ASA V</td><td>Paciente moribundo, risco de morte iminente sem cirurgia</td><td>Trauma grave, ruptura de aneurisma, choque séptico grave</td></tr>
<tr><td>ASA VI</td><td>Paciente com morte cerebral, órgãos doados</td><td>Doação de órgãos após constatação de morte encefálica</td></tr>
<tr><td>"E"</td><td>Acrescenta-se a qualquer ASA se a cirurgia for de emergência</td><td>Ex.: ASA II-E → paciente hipertenso controlado, submetido a cirurgia urgente</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-eras-acerto-jejum',
            area: 'Cirurgia',
            titulo: 'Projeto ERAS e ACERTO e Tempo de Jejum',
            html: `<ul class="reader-list">
<li>Jejum pré-operatório abreviado (maltodextrina via oral 2 horas antes)</li>
<li>Realimentação precoce (máximo: 6 horas)</li>
<li>Prevenir náusea/vômito (procinético regular)</li>
<li>Reduzir fluidos endovenosos (&lt;30 ml/kg/dia)</li>
<li>Uso racional de sondas/drenos</li>
<li>Analgesia regular (evitar opioides)</li>
<li>Mobilização ultraprecoce</li>
<li>Tricotomia após indução</li>
</ul>
<p><strong>Tempo de Jejum:</strong></p>
<ul class="reader-list">
<li>Líquidos claros: 2 horas</li>
<li>Leite materno: 4 horas</li>
<li>Fórmula láctea: 6 h</li>
<li>Sólidos / líquidos não claros: 8 horas</li>
</ul>`
        },
        {
            id: 'cir-preditores-ventilacao-dificil',
            area: 'Cirurgia',
            titulo: 'Preditores de Ventilação Difícil',
            html: `<p><strong>Fatores de Risco – Dificuldade de Ventilação por Máscara:</strong></p>
<div class="reader-table-wrap"><table class="reader-table"><tbody>
<tr><td>Obesidade</td><td>Redução da extensão atlanto-occipital</td></tr>
<tr><td>Barba</td><td>Doenças orofaríngeas</td></tr>
<tr><td>Edêntulo (ausência de dentes)</td><td>Hipertrofia amigdaliana</td></tr>
<tr><td>História de roncos</td><td>Abscesso amigdaliano</td></tr>
<tr><td>História de apneia obstrutiva do sono</td><td>Tireoide lingual (ectópica)</td></tr>
<tr><td>Fragilidade cutânea (queimaduras, epidermólise bolhosa)</td><td>Cisto de tireoglosso</td></tr>
<tr><td>Mandíbula larga</td><td>Adornos faciais</td></tr>
<tr><td>Hipertrofia de masseter</td><td>Queimaduras faciais</td></tr>
<tr><td>Idade &gt; 55 anos</td><td>Deformidades faciais</td></tr>
<tr><td>Macroglossia</td><td></td></tr>
</tbody></table></div>
<p style="font-size:12px;color:var(--text-secondary)">Fonte: Benumof and Hagberg airway management, 2013.</p>`
        },
        {
            id: 'cir-preditores-intubacao-dificil',
            area: 'Cirurgia',
            titulo: 'Preditores de Intubação Difícil',
            html: `<p><strong>Preditores de Intubação Orotraqueal Difícil (por Laringoscopia Direta):</strong></p>
<ul class="reader-list">
<li>Intubação difícil prévia</li>
<li>Distância interincisivos &lt;4cm</li>
<li>Distância tireomentoniana &lt;6cm</li>
<li>Distância esternomentoniana &lt;12cm</li>
<li>Extensão de cabeça/pescoço reduzida &lt;30 graus</li>
<li>Classificação de Mallampati 3 ou 4</li>
<li>Protrusão mandibular reduzida</li>
<li>Circunferência do pescoço grande</li>
<li>Complacência do espaço submandibular pequena</li>
</ul>`
        },
        {
            id: 'cir-lee-rcri',
            area: 'Cirurgia',
            titulo: 'Índice de Risco Cardíaco de Lee (Revised Cardiac Risk Index – RCRI)',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Fator de risco</th></tr></thead><tbody>
<tr><td>História de doença cardíaca isquêmica</td></tr>
<tr><td>Insuficiência cardíaca congestiva</td></tr>
<tr><td>Doença cerebrovascular</td></tr>
<tr><td>Diabetes mellitus em uso de insulina</td></tr>
<tr><td>Insuficiência renal</td></tr>
<tr><td>Cirurgia de alto risco</td></tr>
</tbody></table></div>
<p><strong>&lt;2:</strong> Cirurgia liberada. <strong>≥ 2:</strong> Avaliar METS.</p>`
        },
        {
            id: 'cir-mallampati',
            area: 'Cirurgia',
            titulo: 'Classificação de Mallampati - Intubação',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Classe</th><th>Descrição</th><th>Visualização</th></tr></thead><tbody>
<tr><td>Classe I</td><td>Palato mole, úvula, pilares amigdalianos visíveis</td><td>Tudo visível</td></tr>
<tr><td>Classe II</td><td>Palato mole e úvula visíveis, pilares amigdalianos parcialmente visíveis</td><td>Parcial</td></tr>
<tr><td>Classe III</td><td>Apenas palato mole e base da úvula visíveis</td><td>Úvula parcialmente visível</td></tr>
<tr><td>Classe IV</td><td>Apenas o palato duro visível</td><td>Úvula não visível</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-cormack-lehane',
            area: 'Cirurgia',
            titulo: 'Classificação de Cormack Lehane - Intubação',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Grau</th><th>Visibilidade</th><th>Observações</th></tr></thead><tbody>
<tr><td>I</td><td>Cordas vocais completamente visíveis</td><td>Intubação geralmente fácil</td></tr>
<tr><td>II</td><td>Apenas as aritenoides visíveis</td><td>Intubação pode exigir mais cuidado</td></tr>
<tr><td>III</td><td>Apenas a epiglote visível</td><td>Intubação difícil, pode precisar de manobras ou dispositivos auxiliares</td></tr>
<tr><td>IV</td><td>Não vemos a epiglote</td><td>Intubação muito difícil ou impossível por via direta; considerar vias alternativas</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-exames-pre-operatorio',
            area: 'Cirurgia',
            titulo: 'Exames - Pré Operatório',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Critério</th><th>Diretriz / Situação</th><th>Exames indicados</th></tr></thead><tbody>
<tr><td rowspan="4">Idade – segundo SABISTON (20ª edição)</td><td>&lt; 45 anos</td><td>Nenhum exame obrigatório</td></tr>
<tr><td>45–50 anos</td><td>ECG</td></tr>
<tr><td>55–70 anos</td><td>ECG + Hemograma</td></tr>
<tr><td>&gt; 70 anos</td><td>ECG + Hemograma + Ureia/Creatinina + Eletrólitos + Glicose</td></tr>
<tr><td rowspan="4">Idade – segundo USP-SP</td><td>&lt; 40 anos</td><td>Nenhum exame obrigatório</td></tr>
<tr><td>40–49 anos</td><td>ECG (homem)</td></tr>
<tr><td>50–64 anos</td><td>ECG (mulher) + Hematócrito</td></tr>
<tr><td>≥ 65 anos</td><td>ECG + Hematócrito + Ureia/Creatinina + Glicemia + Eletrólitos (Na, K, Cl)</td></tr>
<tr><td rowspan="3">Comorbidades</td><td>Diabetes Mellitus</td><td>Glicemia</td></tr>
<tr><td>Insuficiência Renal Crônica (IRC)</td><td>Ureia/Creatinina</td></tr>
<tr><td>Cirrose Hepática</td><td>Hepatograma</td></tr>
<tr><td rowspan="2">Tipo de Cirurgia</td><td>Cirurgia pulmonar</td><td>Espirometria</td></tr>
<tr><td>Cirurgia de aorta</td><td>Coagulograma</td></tr>
<tr><td rowspan="3">Exames "polêmicos" – indicados em situações específicas</td><td>ECG</td><td>Se cardiopatia, diabetes mellitus ou cirurgia grande (&gt;1h de duração)</td></tr>
<tr><td>Coagulograma</td><td>Se anamnese suspeita ou risco de sangramento (&gt;1,5 L de perda estimada)</td></tr>
<tr><td>RX de Tórax</td><td>Se tabagismo &gt; 20 maços-ano, IMC &gt; 40, pneumopatia ou idade &gt; 65 anos</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-medicacoes-pre-operatorio',
            area: 'Cirurgia',
            titulo: 'Medicações - Pré Operatório',
            html: `<div class="med-section-title"><span class="dot" style="background:var(--success)"></span>Manter</div>
<div class="med-grid">
<div class="med-pill ok"><span class="med-pill-name">Metimazol e Propiltiouracil</span><span class="med-pill-note">Manter</span></div>
<div class="med-pill ok"><span class="med-pill-name">Estatinas</span><span class="med-pill-note">Manter</span></div>
<div class="med-pill ok"><span class="med-pill-name">Anti-hipertensivos</span><span class="med-pill-note">Manter</span></div>
<div class="med-pill ok"><span class="med-pill-name">Psicotrópicos (Rivotril, Zolpidem)</span><span class="med-pill-note">Manter</span></div>
<div class="med-pill ok"><span class="med-pill-name">Levotiroxina</span><span class="med-pill-note">Manter</span></div>
<div class="med-pill ok"><span class="med-pill-name">Inalatórios (broncodilatadores)</span><span class="med-pill-note">Manter</span></div>
<div class="med-pill ok"><span class="med-pill-name">Insulina</span><span class="med-pill-note">Manter com ajuste</span></div>
<div class="med-pill ok"><span class="med-pill-name">Corticoides</span><span class="med-pill-note">Manter e aumentar dose</span></div>
<div class="med-pill ok"><span class="med-pill-name">Inibidores de DPP-4 (Gliptinas)</span><span class="med-pill-note">Manter</span></div>
<div class="med-pill alerta"><span class="med-pill-name">AAS (ácido acetilsalicílico)</span><span class="med-pill-note">Depende da indicação</span></div>
</div>

<div class="med-section-title"><span class="dot" style="background:var(--danger)"></span>Suspender — Anticoagulantes / Antiagregantes</div>
<div class="med-grid">
<div class="med-pill grave"><span class="med-pill-name">Heparina não fracionada (HNF)</span><span class="med-pill-note">2–6 horas antes</span></div>
<div class="med-pill grave"><span class="med-pill-name">Heparina de baixo peso molecular (HBPM)</span><span class="med-pill-note">12–24 horas antes</span></div>
<div class="med-pill grave"><span class="med-pill-name">DOACs (Apixabana, Rivaroxabana, Dabigatrana)</span><span class="med-pill-note">24h antes (48h se DRC)</span></div>
<div class="med-pill grave"><span class="med-pill-name">Varfarina</span><span class="med-pill-note">5 dias antes; avaliar INR</span></div>
<div class="med-pill grave"><span class="med-pill-name">Clopidogrel</span><span class="med-pill-note">5 dias antes</span></div>
</div>

<div class="med-section-title"><span class="dot" style="background:var(--danger)"></span>Suspender — Antidiabéticos</div>
<div class="med-grid">
<div class="med-pill grave"><span class="med-pill-name">Metformina</span><span class="med-pill-note">Manhã da cirurgia (ou 24–48h conforme bula, Soc. Bras. de Diabetes)</span></div>
<div class="med-pill grave"><span class="med-pill-name">Sulfonilureias (ex: Glibenclamida)</span><span class="med-pill-note">24h antes</span></div>
<div class="med-pill grave"><span class="med-pill-name">Inibidores do SGLT-2 (Glifozinas)</span><span class="med-pill-note">3–4 dias antes</span></div>
<div class="med-pill alerta"><span class="med-pill-name">Análogos de GLP-1/GIP (Ozempic, Mounjaro, Saxenda)</span><span class="med-pill-note">Depende do caso</span></div>
</div>
<div class="reader-callout reader-callout-bloco"><p>💡 GLP-1/GIP: dieta líquida 24h antes + jejum 8h + POCUS gástrico. Manter se uso ≥ 12 semanas e baixo risco de broncoaspiração; suspender se instável ou alto risco. Longa duração (Ozempic, Mounjaro): 7 dias antes. Curta duração (Saxenda): 1 dia antes.</p></div>

<div class="med-section-title"><span class="dot" style="background:var(--danger)"></span>Suspender — Extras</div>
<div class="med-grid">
<div class="med-pill grave"><span class="med-pill-name">Fitoterápicos (geral)</span><span class="med-pill-note">5–7 dias antes</span></div>
<div class="med-pill grave"><span class="med-pill-name">Ginkgo biloba</span><span class="med-pill-note">36 horas antes</span></div>
<div class="med-pill grave"><span class="med-pill-name">Anticoncepcional oral (ACO)</span><span class="med-pill-note">4 semanas antes</span></div>
<div class="med-pill grave"><span class="med-pill-name">Cigarro</span><span class="med-pill-note">4–8 semanas antes</span></div>
</div>`
        },
        {
            id: 'cir-aaa-eletiva',
            area: 'Cirurgia',
            titulo: 'Aneurisma de Aorta Abdominal - Indicações Cirurgia Eletiva',
            html: `<ul class="reader-list">
<li>Diâmetro &gt; 5,5 cm</li>
<li>Crescimento &gt; 0,5 cm em 6 meses</li>
<li>Crescimento &gt; 1 cm em 1 ano</li>
<li>Sintomático</li>
<li>Sacular</li>
<li>Complicações → infecção e embolização</li>
</ul>`
        },
        {
            id: 'cir-endoleak',
            area: 'Cirurgia',
            titulo: 'Classificação - Endoleak',
            html: `<p>Usada no acompanhamento de aneurismas tratados com EVAR (Endovascular Aneurysm Repair).</p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Tipo</th><th>Descrição / Origem</th><th>Observações</th></tr></thead><tbody>
<tr><td>Tipo I</td><td>Fuga perigosa por inadequada vedação na borda proximal (Ia) ou distal (Ib) do stent</td><td>Alto risco de ruptura → necessidade de correção imediata</td></tr>
<tr><td>Tipo II</td><td>Fluxo retrógrado de ramificações arteriais (lumbar, mesentérica inferior) para o saco aneurismático</td><td>Mais comum; muitas vezes assintomático, pode regredir espontaneamente</td></tr>
<tr><td>Tipo III</td><td>Defeito no stent (descontinuidade, falha de junção entre módulos)</td><td>Risco alto de ruptura → intervenção indicada</td></tr>
<tr><td>Tipo IV</td><td>Porosidade da prótese → extravasamento difuso de contraste</td><td>Geralmente autolimitado, raro atualmente com stents modernos</td></tr>
<tr><td>Tipo V (Endotensão)</td><td>Aneurisma aumenta de volume sem endoleak detectável</td><td>Etiologia incerta; pode necessitar de intervenção</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-fontaine-rutherford-dap',
            area: 'Cirurgia',
            titulo: 'Classificação de Fontaine / Rutherford - Doença Arterial Periférica (DAP)',
            html: `<p><strong>Fontaine:</strong></p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Estágio</th><th>Descrição Clínica</th></tr></thead><tbody>
<tr><td>I</td><td>Assintomático</td></tr>
<tr><td>IIa</td><td>Claudicação intermitente limitante</td></tr>
<tr><td>IIb</td><td>Claudicação intermitente incapacitante</td></tr>
<tr><td>III</td><td>Dor em repouso</td></tr>
<tr><td>IV</td><td>Lesões tróficas</td></tr>
</tbody></table></div>
<p><strong>Rutherford:</strong></p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Categoria</th><th>Descrição</th></tr></thead><tbody>
<tr><td>0</td><td>Assintomático</td></tr>
<tr><td>1</td><td>Claudicação leve</td></tr>
<tr><td>2</td><td>Claudicação moderada</td></tr>
<tr><td>3</td><td>Claudicação severa</td></tr>
<tr><td>4</td><td>Dor em repouso</td></tr>
<tr><td>5</td><td>Lesão trófica pequena</td></tr>
<tr><td>6</td><td>Necrose extensa</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-rutherford-oclusao-arterial-aguda',
            area: 'Cirurgia',
            titulo: 'Classificação de Rutherford - Oclusão Arterial Aguda',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Categoria</th><th>Descrição / Achados Clínicos</th><th>Conduta sugerida</th></tr></thead><tbody>
<tr><td>I – Viável</td><td>Membro viável, sem ameaça imediata; sensibilidade, motricidade e pulsos preservados</td><td>Observação, anticoagulação</td></tr>
<tr><td>IIa – Ameaçado leve</td><td>Sensibilidade preservada ou mínima; motricidade normal; pulsos diminuídos ou ausentes</td><td>Intervenção urgente, mas sem risco iminente de perda</td></tr>
<tr><td>IIb – Ameaçado grave</td><td>Déficit sensitivo e motor significativo; dor intensa; pulsos ausentes</td><td>Revascularização urgente (cirúrgica ou endovascular)</td></tr>
<tr><td>III – Irreversível</td><td>Perda sensitiva e motora completa; rigidez; pele fria/cianótica</td><td>Amputação geralmente necessária; revascularização não indicada</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-ceap-venosa',
            area: 'Cirurgia',
            titulo: 'Classificação CEAP - Doença Venosa Crônica',
            html: `<p><strong>Classificação clínica [C]:</strong></p>
<div class="reader-table-wrap"><table class="reader-table"><tbody>
<tr><td>C0</td><td>Sem sinais visíveis ou palpáveis de doença venosa</td></tr>
<tr><td>C1</td><td>Telangiectasias e/ou veias reticulares</td></tr>
<tr><td>C2</td><td>Veias varicosas</td></tr>
<tr><td>C3</td><td>Veias varicosas mais Edema</td></tr>
<tr><td>C4a</td><td>Hiperpigmentação ou eczema</td></tr>
<tr><td>C4b</td><td>Lipodermatoesclerose ou atrofia branca</td></tr>
<tr><td>C5</td><td>Úlcera venosa cicatrizada</td></tr>
<tr><td>C6</td><td>Úlcera ativa</td></tr>
<tr><td>Classe s</td><td>Sintomático (dor, aperto, irritação da pele, peso, cãibras)</td></tr>
<tr><td>Classe a</td><td>Assintomático</td></tr>
</tbody></table></div>
<p><strong>Classificação etiológica [E]:</strong> Ec (Congênita); Ep (Primária); Es (Adquirida/secundária); En (Sem causa definida)</p>
<p><strong>Classificação anatômica [A]:</strong> As (Veias superficiais); Ad (Veias profundas); Ap (Perfurantes); An (Localização não definida)</p>
<p><strong>Classificação fisiopatológica [P]:</strong> Pr (Refluxo); Po (Obstrução); Pr,o (Refluxo e obstrução); Pn (Sem fisiopatologia identificada)</p>`
        },
        {
            id: 'cir-suporte-nutricional',
            area: 'Cirurgia',
            titulo: 'Suporte Nutricional - Indicações',
            html: `<ul class="reader-list">
<li>Perda &gt; 10% do peso em 6 meses</li>
<li>Perda &gt; 5% do peso em 3 meses</li>
<li>IMC &lt; 18,5</li>
<li>Albumina &lt; 3,0 ou transferrina &lt; 200</li>
<li>Alta demanda → queimaduras, politrauma, sepse grave</li>
</ul>`
        },
        {
            id: 'cir-bariatrica-indicacoes-tecnicas',
            area: 'Cirurgia',
            titulo: 'Cirurgia Bariátrica - Indicações e Técnicas',
            html: `<p><strong>Indicações:</strong></p>
<ul class="reader-list">
<li>IMC ≥ 40</li>
<li>IMC ≥ 35 + comorbidades</li>
<li>IMC ≥ 30 + DM2 ou: doença cardiovascular com LOA, DRC precoce em decorrência da diabetes, apneia do sono grave, DRGE com indicação cirúrgica, osteoartrose grave</li>
</ul>
<p><strong>Técnicas:</strong></p>
<ul class="reader-list">
<li><strong>Altamente recomendadas:</strong> Bypass gástrico em Y de Roux; Sleeve</li>
<li><strong>Não recomendadas:</strong> Banda gástrica ajustável; Scopinaro</li>
</ul>`
        },
        {
            id: 'cir-gustilo-anderson',
            area: 'Cirurgia',
            titulo: 'Classificação de Gustilo Anderson - Fraturas Expostas',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Tipo</th><th>Descrição</th><th>Exemplos / Observações</th></tr></thead><tbody>
<tr><td>Tipo I</td><td>Ferida &lt; 1 cm, limpa, mínima contaminação</td><td>Fratura de baixa energia; geralmente fixa sem complicações</td></tr>
<tr><td>Tipo II</td><td>Ferida &gt; 1 cm, sem grande dano de tecidos moles</td><td>Mais energia, lesão moderada; menor risco de infecção que tipo III</td></tr>
<tr><td>Tipo III</td><td>Ferida com lesão extensa de tecidos moles, alta contaminação, fratura segmentar ou com exposição óssea prolongada</td><td>Dividido em subtipos:</td></tr>
<tr><td>IIIa</td><td>Cobertura adequada dos ossos mesmo com trauma extensivo</td><td>Pode realizar osteossíntese interna</td></tr>
<tr><td>IIIb</td><td>Necessidade de retalhos locais ou livres para cobertura óssea</td><td>Maior risco de infecção e necrose</td></tr>
<tr><td>IIIc</td><td>Lesão associada a comprometimento vascular, necessidade de reparo</td><td>Urgência cirúrgica; alto risco de amputação</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-cicatrizacao-feridas',
            area: 'Cirurgia',
            titulo: 'Cicatrização de feridas',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Fase</th><th>Período</th><th>Principais eventos</th></tr></thead><tbody>
<tr><td>Inflamatória</td><td>0–4 dias (aprox.)</td><td>Hemostasia: vasoconstrição e formação do coágulo de fibrina; infiltração de neutrófilos e macrófagos; limpeza de detritos e prevenção de infecção; liberação de citocinas e fatores de crescimento</td></tr>
<tr><td>Proliferativa (ou regenerativa)</td><td>4–21 dias</td><td>Fibroblastos produzem colágeno tipo III; formação de tecido de granulação; angiogênese (novos vasos sanguíneos); epitelização (células epiteliais migram para cobrir a ferida)</td></tr>
<tr><td>Maturação (ou remodelamento)</td><td>21 dias a meses/anos</td><td>Substituição do colágeno tipo III por tipo I (mais resistente); redução da vascularização do tecido; contratura da ferida para reduzir seu tamanho; recuperação gradual da força da pele (até 80% da original)</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-pediatrica',
            area: 'Cirurgia',
            titulo: 'Cirurgia Pediátrica - Massas Cervicais e Torcicolo',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Afecção</th><th>Descrição / Fisiopatologia</th><th>Quadro clínico típico</th><th>Diagnóstico</th><th>Tratamento / Conduta</th></tr></thead><tbody>
<tr><td>Higroma cístico</td><td>Malformação linfática congênita (geralmente cervical, região posterior)</td><td>Massa cervical mole, indolor, translúcida, pode crescer após infecções</td><td>USG ou RM cervical</td><td>Excisão cirúrgica completa + ligadura de todos os linfáticos. Esclerose para lesões complexas → BLEOMICINA</td></tr>
<tr><td>Ducto tireoglosso (cisto do ducto tireoglosso)</td><td>Persistência do trajeto embrionário da migração da tireoide</td><td>Massa móvel na linha média do pescoço que sobe com a deglutição e protrusão da língua</td><td>USG cervical (avaliar tireoide normal)</td><td>Cirurgia de Sistrunk (retirada do cisto + trajeto até o forame cego + parte do osso hióide)</td></tr>
<tr><td>Cisto branquial (2º arco branquial)</td><td>Remanescente embrionário lateral do pescoço</td><td>Massa lateral cervical, indolor, flutua e pode infeccionar</td><td>USG ou TC de pescoço</td><td>Exérese cirúrgica completa após controle de infecção</td></tr>
<tr><td>Torcicolo congênito</td><td>Fibrose do ECOM (esternocleidomastoideo), geralmente por trauma de parto</td><td>Inclinação da cabeça para o lado afetado e rotação para o lado oposto</td><td>Exame clínico; USG muscular</td><td>Fisioterapia precoce; cirurgia se refratário (&gt;1 ano)</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-pediatrica-atresia-esofago-piloro',
            area: 'Cirurgia',
            titulo: 'Atresia de Esôfago e Estenose Hipertrófica do Piloro',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Afecção</th><th>Descrição / Fisiopatologia</th><th>Quadro clínico típico</th><th>Diagnóstico</th><th>Tratamento / Conduta</th></tr></thead><tbody>
<tr><td>Atresia de esôfago</td><td>Falha na recanalização do esôfago; frequentemente associada à fístula traqueoesofágica distal</td><td>Salivação excessiva, engasgos e cianose ao tentar mamar</td><td>Passagem de sonda nasogástrica não progride + RX com sonda enovelada no coto superior</td><td>Cirurgia de correção (anastomose esofágica; às vezes gastrostomia temporária)</td></tr>
<tr><td>Estenose hipertrófica do piloro</td><td>Hipertrofia do músculo pilórico → obstrução gástrica (em lactentes 2–8 semanas)</td><td>Vômitos não biliosos em jato, perda de peso, sinal da "oliva pilórica" palpável</td><td>USG abdominal (espessura &gt;3 mm e comprimento &gt;15 mm)</td><td>Piloromiotomia extramucosa de Ramstedt</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-pediatrica-atresia-duodenal-ecn-hirschsprung',
            area: 'Cirurgia',
            titulo: 'Atresia Duodenal, Enterocolite Necrosante e Doença de Hirschsprung',
            imagem: 'assets/bullets/img/cir-hirschsprung-enema.png',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Afecção</th><th>Descrição / Fisiopatologia</th><th>Quadro clínico típico</th><th>Diagnóstico</th><th>Tratamento / Conduta</th></tr></thead><tbody>
<tr><td>Atresia duodenal</td><td>Falha na recanalização do duodeno (geralmente associada à síndrome de Down)</td><td>Vômitos biliosos logo após o nascimento, abdome escavado</td><td>RX de abdome com sinal de dupla bolha</td><td>Cirurgia: duodenoduodenostomia</td></tr>
<tr><td>Enterocolite necrosante (ECN)</td><td>Isquemia intestinal + proliferação bacteriana em prematuros</td><td>Distensão abdominal, resíduo gástrico, sangue nas fezes, instabilidade</td><td>RX com pneumatose intestinal (gás na parede)</td><td>Suporte clínico (jejum, ATB, SNG); cirurgia se perfuração ou necrose</td></tr>
<tr><td>Doença de Hirschsprung</td><td>Ausência de células ganglionares no plexo mioentérico (megacólon agangliônico)</td><td>Ausência de eliminação de mecônio, distensão abdominal, vômitos biliosos, saída de fezes explosivas após toque retal</td><td>Enema opaco (zona de transição), biópsia retal sem gânglios</td><td>Ressecção da área agangliônica e anastomose do cólon normal ao ânus (Swenson, Duhamel ou Soave)</td></tr>
</tbody></table></div>`
        },
        {
            id: 'cir-classificacao-mayo',
            area: 'Cirurgia',
            titulo: 'Classificação de Mayo - DRPAD',
            html: `<p>A Classificação de Mayo é utilizada para estratificar a gravidade e prever a progressão da Doença Renal Policística Autossômica Dominante (DRPAD), com base no volume total renal ajustado pela altura (htTKV) obtido por ressonância magnética (RM). Divide os pacientes em cinco subclasses (1A a 1E), correspondendo à velocidade de crescimento dos rins e ao risco de progressão para insuficiência renal.</p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Classe de Mayo</th><th>Taxa anual de crescimento do volume renal total ajustado pela altura (htTKV)</th><th>Prognóstico / risco de progressão</th></tr></thead><tbody>
<tr><td>1A</td><td>&lt; 1,5% ao ano</td><td>Risco menor</td></tr>
<tr><td>1B</td><td>1,5 – 3% ao ano</td><td>Baixo risco</td></tr>
<tr><td>1C</td><td>3 – 4,5% ao ano</td><td>Risco moderado de progressão</td></tr>
<tr><td>1D</td><td>4,5 – 6% ao ano</td><td>Alto risco de progressão para DRC terminal</td></tr>
<tr><td>1E</td><td>&gt; 6% ao ano</td><td>Muito alto risco de progressão para DRC terminal</td></tr>
</tbody></table></div>
<p>Classes 1A–1E aplicam-se apenas a pacientes com doença típica (cistos distribuídos difusamente nos rins). Classe 2 é usada para doença atípica, como casos com assimetria renal, poucos cistos, ou outras anormalidades estruturais não típicas da DRPAD.</p>`
        },
        {
            id: 'cir-classificacao-bosniak',
            area: 'Cirurgia',
            titulo: 'Classificação de Bosniak',
            html: `<p>A Classificação de Bosniak é usada para avaliar cistos renais por tomografia computadorizada (TC) com contraste (ou ressonância, em alguns casos). Ela permite diferenciar cistos benignos de lesões suspeitas ou malignas, orientando a conduta clínica.</p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Classe Bosniak</th><th>Características de imagem</th><th>Risco de malignidade</th><th>Conduta recomendada</th></tr></thead><tbody>
<tr><td>I</td><td>Cisto simples, parede fina, sem septos, calcificações ou realce após contraste. Conteúdo homogêneo, densidade de água.</td><td>~0%</td><td>Benigno. Não requer seguimento.</td></tr>
<tr><td>II</td><td>Poucos septos finos; calcificações finas ou parede discretamente espessada; pequenos cistos (&lt;3 cm) com conteúdo hiperdenso, mas sem realce.</td><td>&lt;3%</td><td>Benigno. Não requer seguimento.</td></tr>
<tr><td>IIF ("Follow-up")</td><td>Múltiplos septos finos ou parede discretamente espessada, pode ter calcificações mais grosseiras; cistos &gt;3 cm com conteúdo hiperdenso, sem realce.</td><td>5–10%</td><td>Provável benigno. Repetir TC/RM em 6–12 meses e acompanhar por 5 anos.</td></tr>
<tr><td>III</td><td>Parede ou septos espessos e irregulares, realce após contraste; difícil diferenciar de neoplasia.</td><td>40–60%</td><td>Indeterminado. Avaliar para ressecção cirúrgica ou acompanhamento próximo.</td></tr>
<tr><td>IV</td><td>Componentes sólidos com realce + características de cisto (paredes/septos).</td><td>&gt;80–90%</td><td>Alta suspeita de malignidade. Nefrectomia parcial ou total.</td></tr>
</tbody></table></div>
<div class="reader-callout reader-callout-bloco">
<p>💡 Resumo rápido para decorar:</p>
<p>I e II → benignos. IIF → "F" de follow-up. III → indeterminado, pode ser câncer. IV → cisto maligno (carcinoma cístico)</p>
</div>`
        },
        {
            id: 'cir-fimose-kayaba',
            area: 'Cirurgia',
            titulo: 'Fimose - Classificação de Kayaba',
            html: `<p>Utilizada para graduar o grau de retração do prepúcio em relação à glande peniana, auxiliando na avaliação clínica e na decisão sobre tratamento.</p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Grau</th><th>Descrição</th><th>Características clínicas</th></tr></thead><tbody>
<tr><td>Grau 0</td><td>Prepúcio completamente retrátil</td><td>Toda a glande fica exposta sem dificuldade.</td></tr>
<tr><td>Grau 1</td><td>Pequena aderência prepucial</td><td>A retração expõe toda a glande, mas há discreta resistência ou aderência residual.</td></tr>
<tr><td>Grau 2</td><td>Parcialmente retrátil</td><td>Metade ou mais da glande pode ser exposta; há anel prepucial frouxo, mas ainda limita parcialmente a retração.</td></tr>
<tr><td>Grau 3</td><td>Apenas o meato uretral é visível</td><td>O prepúcio se retrai minimamente, expondo só o óstio uretral.</td></tr>
<tr><td>Grau 4</td><td>Orifício prepucial estreito, sem exposição da glande</td><td>O prepúcio não se retrai, mas o meato é visível ao afastar levemente a pele.</td></tr>
<tr><td>Grau 5</td><td>Fimose completa</td><td>O prepúcio não permite qualquer exposição da glande, nem visualização do meato uretral.</td></tr>
</tbody></table></div>`
        }
    ];

    window.TRYCKTRACK_BULLETS_CIRURGIA = bullets;
})();
