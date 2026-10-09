(window.TRYCKTRACK_ESSENTIALS_AULAS = window.TRYCKTRACK_ESSENTIALS_AULAS || []).push({
  area: 'cir-anestesiologia', order: 1, title: 'Preparo pré-operatório, risco cirúrgico e complicações em cirurgia',
  html: `
<section class="ess-sec">
<h2>Preparo pré-operatório</h2>
<ul><li>Objetivo: controlar os fatores com impacto na evolução cirúrgica.</li></ul>
<div class="ess-box ess-note">
<ol>
<li><b>Avaliação do risco cirúrgico</b></li>
<li><b>Exames pré-operatórios</b></li>
<li><b>Medicação de uso crônico</b></li>
<li><b>Profilaxia antibiótica</b></li>
</ol>
<!-- RESOLVIDO (mantido): no original a numeração da caixa é 1, 2, 2, 3 (Exames e Medicação de uso crônico aparecem ambos como "2."); aqui foi mantida a sequência de itens em 1 a 4 -->
</div>
</section>

<section class="ess-sec">
<h2 class="ess-h-green">Avaliação do risco cirúrgico</h2>
<div class="ess-box ess-alert">Perigo da cirurgia para cada sistema do organismo humano.</div>

<details class="ess-tg ess-red" open><summary>Cirurgia eletiva</summary>
<ul><li><b>NÃO</b> operar se houver <mark class="ess-hl"><b>cardiopatia ativa</b></mark>. Tratar a condição antes da operação:
<ul><li>Angina instável</li><li>ICC descompensada</li><li>Arritmia grave</li><li>Valvulopatia grave</li></ul></li></ul>
</details>

<details class="ess-tg ess-gray" open><summary>Hipertensão arterial</summary>
<ul>
<li>Valor ideal → &lt; 140 × 90 mmHg</li>
<li>Suspender a cirurgia → 180 × 110 mmHg</li>
<li>Tempo ideal para controle da PA → 30 dias</li>
</ul>
</details>

<h3>Avaliação cardiovascular</h3>
<details class="ess-tg ess-gray" open><summary>Índice de Risco Cardíaco Revisado (IRCR)</summary>
<ol>
<li>Coronariopatia</li>
<li>Insuficiência cardíaca</li>
<li>DRC (Cr &gt; 2)</li>
<li>DM com insulina</li>
<li>Doença cerebrovascular (AVC ou AIT)</li>
<li>Cirurgia: torácica, abdominal ou vascular supra-inguinal</li>
</ol>
<ul><li>Cada SIM = 1 ponto.</li></ul>
</details>

<h4>Pontuação</h4>
<div class="ess-cols">
<div class="ess-col ess-green"><strong>&lt; 2</strong>
<p><b>CIRURGIA</b> → <span class="ess-pos"><b>risco cardiovascular baixo, não necessitando adiar a cirurgia</b></span></p></div>
<div class="ess-col ess-red"><strong>≥ 2</strong>
<p><span class="ess-neg"><b>NÃO LIBERAR A CIRURGIA NAQUELE MOMENTO</b></span>, <b>avaliar a capacidade funcional (METs)</b></p>
<div class="ess-box ess-note"><div class="ess-box-tt">Capacidade funcional ≥ 4 METs?</div>
<ul>
<li>Gasto energético diário do coração
<ul>
<li><b>&lt; 4 METs:</b> comer, vestir, andar em volta da casa...</li>
<li><b>4–10 METs:</b> subir um lance de escadas, andar rápido, trabalhos domésticos...</li>
<li><b>&gt; 10 METs:</b> natação, tênis, futebol... (prática de esportes)</li>
</ul></li>
<li><b>Como anestesia/cirurgia demandam 4 METs...</b> <mark class="ess-hl"><b>&lt; 4 METs = ↑ risco CV</b></mark></li>
</ul></div>
<p>A. Capacidade funcional ≥ 4 METs? <span class="ess-pos"><b>SIM = CIRURGIA</b></span></p>
<p>B. Capacidade funcional ≥ 4 METs? <span class="ess-neg"><b>NÃO = TESTE CARDÍACO NÃO INVASIVO</b></span> (cintilografia de estresse, ecocardiograma de estresse...)</p>
<ul>
<li>Exame <span class="ess-pos">normal</span>: <span class="ess-pos"><b>CIRURGIA</b></span></li>
<li>Exame <span class="ess-neg">alterado</span>: <span class="ess-neg"><b>CONTRAINDICADO</b></span></li>
</ul></div>
</div>

<h3>Resumo do estado clínico</h3>
<details class="ess-tg ess-gray" open><summary>ASA</summary>
<ul>
<li><b>ASA I:</b> <b>ausência</b> de doenças sistêmicas conhecidas</li>
<li><b>ASA II:</b> doença sistêmica <i>SEM limitação</i>: HAS <b>controlada</b>, DM com glicemia <b>controlada</b>
<ul><li><mark class="ess-hl3"><b>CUIDADO: tabagismo, etilismo social, obesidade (IMC &gt; 30)</b></mark></li></ul></li>
<li><b>ASA III:</b> limita, mas <i>não incapacita</i>: HAS <b>não controlada</b>, DM <b>não controlada</b>, infarto prévio (no mínimo)
<ul><li><mark class="ess-hl"><b>CUIDADO: obesidade grau III (IMC &gt; 40); ALCOOLATRA</b></mark></li></ul></li>
<li><b>ASA IV:</b> <span class="ess-neg"><b>limita e incapacita →</b></span> insuficiência cardíaca grave (não compensada)</li>
<li><b>ASA V:</b> <b>moribundo</b> (expectativa de óbito): ruptura de aneurisma de aorta, AVE hemorrágico com hipertensão intracraniana</li>
<li><b>ASA VI:</b> <b>morte cerebral</b> → doar órgãos</li>
<li>EMERGÊNCIA → sufixo E</li>
</ul>
</details>
</section>

<section class="ess-sec">
<h2 class="ess-h-brown">Exames pré-operatórios</h2>
<div class="ess-box ess-note"><b>DUAS VARIÁVEIS = PACIENTE E TIPO DE CIRURGIA</b></div>

<h3>Com relação ao paciente</h3>
<h4>Idade</h4>
<div class="ess-cols">
<div class="ess-col ess-gray"><strong>Segundo o Sabiston</strong>
<div class="ess-tw"><table class="ess-table">
<thead><tr><th>Idade</th><th>Exames</th></tr></thead>
<tbody>
<tr><td>&lt; 45 anos</td><td>–</td></tr>
<tr><td>45–54 anos</td><td><b>ECG para homens</b></td></tr>
<tr><td>55–70 anos</td><td><b>ECG + hemograma</b></td></tr>
<tr><td>&gt; 70 anos</td><td><b>ECG + hemograma + eletrólitos + glicemia + função renal</b></td></tr>
</tbody></table></div>
<p class="ess-obs">Exames complementares a serem solicitados de acordo com a idade. Fonte: <i>Sabiston</i>.</p></div>
<div class="ess-col ess-gray"><strong>Segundo a USP</strong>
<div class="ess-tw"><table class="ess-table">
<tbody>
<tr><td>&lt; 40 anos</td><td>NADA</td></tr>
<tr><td>40–49</td><td>ECG (H) + hemograma</td></tr>
<tr><td>50–64</td><td>ECG (M) + hemograma</td></tr>
<tr><td>≥ 65 anos</td><td>Ureia/creatinina + sódio/potássio + glicose + RX de tórax + hemograma + ECG</td></tr>
</tbody></table></div>
<p class="ess-obs">Exames complementares a serem solicitados de acordo com a idade. Fonte: <i>USP</i>.</p></div>
</div>
<!-- RESOLVIDO (mantido): as duas tabelas de exames por idade (Sabiston e USP) têm faixas etárias e exames diferentes entre si; ambas foram mantidas como no original. A tabela do Sabiston estava em imagem e foi transcrita para HTML. -->
<div class="ess-box ess-tip"><b>ATENÇÃO!</b> RX de tórax → sempre pede no PSU-MG</div>

<h4>Comorbidades</h4>
<p>→ Outros exames na dependência de patologias de base... Exemplo:</p>
<ul>
<li>Hipotireoidismo + 30 anos = função tireoidiana</li>
<li>DM → glicemia</li>
<li>Insuficiência renal crônica → ureia e creatinina</li>
<li>Cirrose → hepatograma</li>
</ul>

<h3>Com relação à cirurgia</h3>
<ul>
<li><b>COAGULOGRAMA:</b> estimativa de perda sanguínea <b>&gt; 2 L</b>, neurocirurgia, cirurgias cardíaca e torácica</li>
<li><b>RX DE TÓRAX:</b> cirurgias cardíacas e torácicas</li>
<li>Pulmão → espirometria</li>
</ul>

<details class="ess-tg ess-gray" open><summary>Projeto ERAS / ACERTO</summary>
<ul>
<li>AINH + dipirona</li>
<li>Analgesia regular (<i>opioid free</i>)</li>
<li>Jejum pré-operatório abreviado (maltodextrina VO 2 h antes)</li>
<li>Realimentação precoce (máx. 6 h)</li>
<li>Prevenir náuseas/vômitos (procinético regular)</li>
<li>Reduzir fluidos endovenosos (&lt; 30 mL/kg/d)</li>
<li>Uso racional de sondas/drenos</li>
<li>Mobilização ultraprecoce</li>
<li>Tricotomia após a indução</li>
</ul>
</details>
</section>

<section class="ess-sec">
<h2>Medicação de uso crônico</h2>
<details class="ess-tg ess-green" open><summary>MANTER (inclusive no dia)</summary>
<ul>
<li><b>Corticoide</b> → hidrocortisona IV (resposta ao trauma); age inibindo a migração e a ativação de leucócitos</li>
<li><b>Anti-hipertensivo</b></li>
<li><b>Insulina</b> → NPH: 2/3 da dose e glargina: 1/2 da dose
<!-- RESOLVIDO: frase sobre leucócitos movida para o corticoide --></li>
<li><b>Psicotrópico e levotiroxina</b></li>
<li><b>AAS</b> → manter nos casos de uso crônico (risco cardiovascular)
<ul><li>Benefício maior do que a possibilidade de sangrar um pouco mais durante a operação (<b>exceção: neurocirurgia, RTU de próstata</b>)
<ul><li>Se necessário SUSPENDER ⇒ 7–10 DIAS</li></ul></li></ul></li>
<li><b>Betabloqueador</b></li>
</ul>
</details>

<details class="ess-tg ess-red" open><summary>SUSPENDER</summary>
<ul>
<li><b>Antidiabético oral</b> (no dia) → <b><i>metformina 24–48 h</i></b> e acarbose 24 h</li>
<li><b>Heparinas</b> → HNF 4–6 h / HBPM 12–24 h</li>
<li><b>AINEs</b> (1–3 dias) → interferem na função plaquetária → maior risco de sangramento</li>
<li><b>Antiagregante</b> (7–10 dias) → coronariopatia: manter AAS</li>
<li><b>Novos anticoagulantes</b> (24/48 h) → ex.: rivaroxabana</li>
<li><b>Warfarin</b> (4–5 dias) → operar: INR ≤ 1,5 + ponte com heparina</li>
<li><b>Clopidogrel</b> (5 dias)</li>
</ul>
</details>

<h3>Detalhes</h3>
<div class="ess-cols3">
<div class="ess-col ess-gray"><strong>Antidiabético oral</strong>
<ul>
<li>Metformina: suspensa 24–48 h antes da cirurgia</li>
<li>Acarbose: 24 h antes</li>
<li>iSGLT2: 3–4 dias</li>
<li>Demais antidiabéticos orais → não toma no dia, toma no dia anterior</li>
</ul></div>
<div class="ess-col ess-gray"><strong>Análogos de GLP-1 e análogos duplos</strong>
<ul><li>Antes: suspensão de análogos de GLP-1 e tirzepatida antes de cirurgias eletivas (ex.: suspender semaglutida 21 dias antes)</li></ul>
<div class="ess-box ess-tip"><div class="ess-box-tt">ATUALIZAÇÃO 2025 – Agora</div>
<ol>
<li>Uso <b>≥ 3 meses E</b> sem risco adicional de broncoaspiração?
<ul><li>Manter a medicação na dose e no período habituais</li>
<li>RECOMENDAÇÃO: ultrassom gástrico pré-cirúrgico para avaliar resíduos</li></ul></li>
<li>Uso por <b>≤ 3 meses OU</b> com fatores de risco para broncoaspiração?
<ol type="a">
<li>Medicação <i>semanal</i> (ex.: semaglutida, tirzepatida): suspender <b>1 semana antes</b></li>
<li>Medicação <i>diária</i> (ex.: liraglutida): suspender <b>1 dia antes</b></li>
</ol></li>
</ol></div></div>
<div class="ess-col ess-gray"><strong>Warfarin → 4–5 d (INR chega próximo do normal ≤ 1,5)</strong>
<ul>
<li>Se a pessoa realmente precisar → <u>suspender warfarin e prescrever heparina</u> → anticoagulação de ponte
<ul>
<li>Heparina <b>não fracionada</b> → suspender <b>6 h</b> da cirurgia</li>
<li>Heparina de <b>baixo peso molecular</b> → suspender <b>24 h</b> antes da cirurgia</li>
</ul></li>
</ul></div>
</div>

<div class="ess-box ess-alert"><div class="ess-box-tt">EXTRA</div>
<p>Ervas medicinais e fitoterápicos</p>
<ul><li><mark class="ess-hl2"><b>Suspender:</b></mark>
<ul><li><mark class="ess-hl2">Ginkgo: 48 h</mark></li><li><mark class="ess-hl2">Cápsula de alho: 7 d</mark></li><li><mark class="ess-hl2">Ginseng: 7 d</mark></li></ul></li></ul></div>
</section>

<section class="ess-sec">
<h2 class="ess-h-brown">Profilaxia antitrombótica</h2>
<div class="ess-cols">
<div class="ess-col ess-green"><strong>Baixo risco</strong>
<ul><li>Apendicectomia VL</li><li>Colecistectomia VL</li><li>Hernioplastia</li><li>Urológico endoscópico</li><li>Mastectomia e plástica</li><li>MEDIDA: <i>DEAMBULAÇÃO</i>!</li></ul></div>
<div class="ess-col ess-red"><strong>Moderado / alto risco</strong>
<ul><li>Ortopédicas</li><li>Oncológicas → liberação de fatores pró-trombóticos</li><li>Bariátrica</li><li>Imobilização</li><li>Trombofilia</li><li>MEDIDA: <i>HEPARINA</i> (2 h antes)</li></ul></div>
</div>
</section>

<section class="ess-sec">
<h2 class="ess-h-rose">Profilaxia antibiótica</h2>
<div class="ess-box ess-alert">Evitar infecção da própria ferida operatória (<i>S. aureus</i>).</div>

<h3>Como fazer</h3>
<div class="ess-tw"><table class="ess-table">
<thead><tr><th>Tipo</th><th>Definição</th><th>Esquema</th></tr></thead>
<tbody>
<tr><th scope="row">Limpa</th><td>Não penetra tratos biliar, respiratório, GI e urinário</td><td>Se: osso ou prótese</td></tr>
<tr><th scope="row">Limpa-contaminada</th><td>Penetra de forma controlada (sem extravasamento)</td><td rowspan="2">Direcionar<br>Em geral: cefazolina</td></tr>
<tr><th scope="row">Contaminada</th><td>Penetra sem controle; “ite” sem pus; trauma recente</td></tr>
<tr><th scope="row">Infectada</th><td>“ite” supurada, trauma antigo, contaminação fecal</td><td>ATBterapia</td></tr>
</tbody></table></div>
<!-- RESOLVIDO (mantido): esta tabela estava em imagem no original e foi transcrita; a coluna "Esquema" de Limpa-contaminada e Contaminada aparece como uma única célula ("Direcionar / Em geral: cefazolina") -->

<details class="ess-tg ess-green" open><summary>Limpa</summary>
<ul>
<li>Cirurgias cardíacas, tireoidectomia, neurocirurgia → <b>NÃO</b> invade tratos contaminados</li>
<li>Normalmente não faz, só em casos de <b>osso</b> (incisão óssea: osteomielite → grave) ou <b>prótese</b> (corpo estranho)</li>
</ul>
</details>
<details class="ess-tg ess-yellow" open><summary>Limpa-contaminada</summary>
<ul>
<li><b>De forma <u>controlada</u> = <u>sem</u> intercorrências → invade tratos contaminados, sem sinais de infecção e sem contaminação acidental</b></li>
<li>Obs.: limpa-contaminada = potencialmente contaminada</li>
<li><b>CEFAZOLINA → cocos gram + (<i>S. aureus</i>) = geralmente escolhida = CEFALOSPORINA DE 1ª GERAÇÃO</b>
<ul><li>Durante a cirurgia → acabou a cirurgia, não precisa manter mais</li></ul></li>
<li>Exceção: CVL e traqueostomia (opcional)</li>
</ul>
</details>
<details class="ess-tg ess-red" open><summary>Contaminada</summary>
<ul>
<li>Extravasamento de conteúdo → “ite” abdominal <i>sem pus</i> (ex.: colecistite), traumas &lt; 6 h</li>
<li>Quebra importante da técnica asséptica</li>
<li>Antibioticoprofilaxia com cefazolina</li>
</ul>
</details>
<details class="ess-tg ess-gray" open><summary>Infectada</summary>
<ul>
<li>“ite” <b>com pus</b> (colecistite supurada); presença de tecido desvitalizado ou corpo estranho; ferida traumática antiga</li>
<li><b>ANTIBIOTICOTERAPIA e não profilático = ↑ tempo</b></li>
</ul>
</details>

<details class="ess-tg ess-gray" open><summary>Quando fazer?</summary>
<p>30–60 minutos ANTES da incisão!</p>
<p>Quando fazer mais de uma dose: sangramento volumoso; cirurgia prolongada.</p>
<p>Interromper ao final da cirurgia.</p>
</details>
<details class="ess-tg ess-gray" open><summary>Qual antibiótico fazer?</summary>
<ul>
<li><b>CEFAZOLINA → gram + (<i>S. aureus</i> e <i>S.</i> coagulase negativo) = geralmente escolhida = CEFALOSPORINA DE 1ª GERAÇÃO</b></li>
<li><mark class="ess-hl3">Cólon ou reto</mark> → ATB profilático = gram − ou anaeróbicos ⇒ qualquer esquema que cubra gram − e anaeróbicos: quinolona, gentamicina, clindamicina</li>
</ul>
<div class="ess-box ess-alert"><b>Para pacientes alérgicos aos betalactâmicos e/ou colonizados por MRSA, <span class="ess-neg"><i>vancomicina</i></span> é uma opção para profilaxia.</b></div>
</details>
</section>

<section class="ess-sec">
<h2 class="ess-h-purple">Jejum</h2>
<ul>
<li>Líquidos claros: 2 h</li>
<li>Leite materno: 4 h</li>
<li>Leite não humano: 6 h</li>
<li>Sólidos e não claros: 6–8 h</li>
</ul>
</section>

<section class="ess-sec">
<h2>Complicações em cirurgia</h2>
<h3>Complicações da ferida operatória</h3>
<figure class="ess-fig"><img src="assets/essentials/cirurgia/preparo-pre-operatorio/complicacoes-ferida-operatoria.jpg" alt="Seroma, hematoma e deiscência aponeurótica com conceito e tratamento, ao lado das camadas pele, tecido subcutâneo, camada profunda (fáscia e músculos) e órgãos/cavidades"><figcaption>Tipos de complicações da ferida operatória.</figcaption></figure>
<div class="ess-tw"><table class="ess-table">
<thead><tr><th>Complicação</th><th>Conceito</th><th>Tratamento</th></tr></thead>
<tbody>
<tr><th scope="row">Seroma</th><td>Coleção de linfa no SC</td><td>Compressão ou aspiração</td></tr>
<tr><th scope="row">Hematoma</th><td>Coleção de sangue e coágulo</td><td>Reabrir se volumoso</td></tr>
<tr><th scope="row">Deiscência aponeurótica</th><td>Defeito músculo-aponeurótico; 4º–14º dia: líquido serohemático</td><td>Reoperar</td></tr>
</tbody></table></div>

<details class="ess-tg ess-gray" open><summary>Seroma</summary>
<ul>
<li>Complicação mais benigna da ferida operatória ⇒ coleção de linfa no subcutâneo</li>
<li>Líquido → amarelo citrino</li>
<li>Volume → pequena quantidade</li>
<li>Causa → grandes descolamentos de pele</li>
<li>Ferida → abaulada</li>
<li>Normal é ser reabsorvido</li>
</ul>
</details>
<details class="ess-tg ess-gray" open><summary>Hematoma</summary>
<ul>
<li>O normal é ser reabsorvido, mas, se não for, pode predispor a infecções, funcionando como meio de cultura</li>
<li>Se forem grandes coleções de líquidos, dificilmente a reabsorção será espontânea → intervenção no hematoma (reabrir)</li>
</ul>
</details>
<details class="ess-tg ess-gray" open><summary>Deiscência aponeurótica</summary>
<ul>
<li>Defeito da sutura na camada <b>músculo-aponeurótica</b></li>
<li>Líquido: serossanguinolento</li>
<li>Volume: grande quantidade</li>
<li>Fatores de risco: idade avançada, operação de emergência, técnica inadequada, desnutrição, câncer, infecção, corticoide, tabagismo, diabetes, ascite, IMC &gt; 30 kg/m²
<!-- RESOLVIDO: kg para kg/m² -->
<ul><li>ATENÇÃO! HAS <span class="ess-neg"><b><i>não</i></b></span> entra</li></ul></li>
<li>Complicações: evisceração, infecção da ferida, hérnia incisional (pele estava íntegra)</li>
</ul>
</details>

<h3>Infecção do sítio cirúrgico</h3>
<div class="ess-box ess-alert">Até 30 dias (ou 1 ano se prótese) após o procedimento.</div>
<details class="ess-tg ess-gray" open><summary>Superficial</summary>
<ul><li>Até 30 dias</li><li>Drenagem purulenta (pele e subcutâneo)</li><li>Dor, edema ou eritema local</li><li>TTO: drenagem</li></ul>
</details>
<details class="ess-tg ess-gray" open><summary>Profunda</summary>
<ul><li>Até 30 dias ou 1 ano (prótese)</li><li>Drenagem purulenta (fáscia e músculo)</li><li>Dor, febre (&gt; 38 °C) ou abscesso</li><li>TTO: drenagem + ATB</li></ul>
</details>
<details class="ess-tg ess-gray" open><summary>Cavidade</summary>
<ul><li>Até 30 dias ou 1 ano (prótese)</li><li>Drenagem purulenta por dreno cavitário</li><li>Febre, distensão, abscesso</li><li>TTO: drenagem + ATB</li></ul>
</details>
</section>

<section class="ess-sec">
<h2 class="ess-h-green">Febre no contexto operatório</h2>
<details class="ess-tg ess-gray" open><summary>Per-operatório</summary>
<ul>
<li>Infecção pré-existente</li>
<li>Reação febril a droga ou transfusão</li>
<li><b>Hipertermia maligna</b>
<ul>
<li><u><b>Síndrome muscular hereditária fármaco-induzida (autossômica dominante)</b></u></li>
<li>Exposição a: <b>anestésico inalatório ou <span class="ess-neg">succinilcolina</span></b> → abertura de canais de cálcio dentro da musculatura
<ul>
<li><b>Hipermetabolismo muscular</b> (contração muscular intensa e ininterrupta → espasmo do masseter) +</li>
<li><b>Hipertermia →</b> febre até 42 °C; taquiarritmias +</li>
<li><b>Hipercapnia</b> (consome O₂ e gera CO₂) → altera capnografia e gera <b>acidose</b> +</li>
<li><b>Rabdomiólise</b> (aumenta K → hipercalemia) → destruição muscular maciça</li>
</ul></li>
<li>Tto:
<ul>
<li>Suporte ⇒ cessar a exposição medicamentosa, resfriamento (compressa fria sobre o corpo, soro gelado), HCO₃, fornecimento de O₂.</li>
<li><mark class="ess-hl3"><b>DANTROLENE</b></mark> (fecha os canais de cálcio → evitar bloqueador de cálcio)</li>
</ul></li>
</ul></li>
</ul>
</details>
<details class="ess-tg ess-gray" open><summary>24–72 h de pós-operatório</summary>
<ul>
<li><mark class="ess-hl3"><b>Atelectasia</b></mark> (+ comum: cirurgia torácica e abdominal)</li>
<li>Infecção necrosante da ferida (<i>Streptococcus pyogenes</i> ou <i>Clostridium perfringens</i>) → achado de <i>crepitação</i> (gás no subcutâneo)</li>
</ul>
</details>
<details class="ess-tg ess-gray" open><summary>&gt; 72 h de pós-operatório</summary>
<ul>
<li><b>Infecção: ITU</b> (cateter vesical), <b>pneumonia, ferida operatória (<i>S. aureus</i>)</b></li>
<li>TVP → sintomas respiratórios, imobilização</li>
<li>Parotidite supurativa (<i>S. aureus</i>) → homem, DM</li>
</ul>
</details>
<details class="ess-tg ess-gray" open><summary>5 a 7 dias de pós-operatório</summary>
<ul><li>Infecção da ferida operatória</li><li>Deiscência da anastomose</li></ul>
</details>
<h4>Obs.</h4>
<ol>
<li>Diarreia → uso prévio de ATB</li>
<li>Drogas e transfusão → intraoperatório ou imediato</li>
</ol>
</section>

<section class="ess-sec">
<h2>Cicatrização de feridas</h2>
<details class="ess-tg ess-gray" open><summary>1ª fase: inflamação</summary>
<ul>
<li>Exsudato na ferida</li>
<li>Vasoconstrição e início da hemostasia</li>
<li>Aumento da permeabilidade vascular</li>
<li>Liberação de histamina</li>
<li>Chegam os <b><i>neutrófilos</i></b> → fazem a “limpeza” local por 24–48 h</li>
<li>Depois chega o “maestro”: <b><i>macrófago</i></b>, que libera fator de crescimento e transformação beta (TGF-β)</li>
<li>Depois chega o linfócito “T” → libera IFN-γ, para estimular o <b><i>fibroblasto</i></b></li>
</ul>
</details>
<details class="ess-tg ess-gray" open><summary>2ª fase</summary>
<ul>
<li>TECIDO DE GRANULAÇÃO</li>
<li>Neovascularização → tecido muito friável</li>
<li>O <b><i>fibroblasto</i></b> é a célula principal desta fase</li>
</ul>
<ol type="a">
<li><i>FIBROPLASTIA:</i> deposição de <b><i>colágeno tipo III</i></b></li>
<li>Angiogênese</li>
<li>EPITELIZAÇÃO: chegam os <b><i>queratinócitos</i></b></li>
</ol>
</details>
<details class="ess-tg ess-gray" open><summary>3ª fase</summary>
<ul>
<li>Bordas “contraindo”</li>
<li>O <b><i>miofibroblasto</i></b> é a célula principal dessa fase
<ul><li>Faz a contração da ferida</li><li>Aumenta a troca do colágeno tipo III pelo tipo 1</li></ul></li>
</ul>
</details>
<details class="ess-tg ess-red" open><summary>Fatores que prejudicam</summary>
<ul>
<li>MAIS COMUM: <b><i>INFECÇÃO</i></b></li>
<li>Idade avançada</li>
<li>Hipóxia → doença vascular, tabagismo, hematócrito &lt; 15%
<!-- RESOLVIDO (mantido): valor de hematócrito &lt; 15% conforme o original (suspeito, parece muito baixo) --></li>
<li>Diabetes → prejudica <b><i>TODAS</i></b> as fases</li>
<li>Hipoalbuminemia → &lt; 2 g/dL</li>
<li>Redução de vitaminas e minerais → vitaminas A, C e K e zinco</li>
<li>Drogas
<ul><li>Corticoides, AINE em dose alta, adriamicina, metotrexato, ciclofosfamida, tamoxifeno</li></ul></li>
</ul>
</details>
</section>
`
});
