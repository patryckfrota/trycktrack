(window.TRYCKTRACK_ESSENTIALS_AULAS = window.TRYCKTRACK_ESSENTIALS_AULAS || []).push({
  area: 'clinica-intensiva', order: 1, title: 'Terapia intensiva',
  html: `
<section class="ess-sec">
<h2>Choque</h2>

<h3>Definição</h3>
<div class="ess-box ess-note"><p>Estado de má perfusão generalizada.</p>
<ul><li><b>PA = DC × RVS</b>
<ul>
<li>DC = determinado pela <b>FC</b> e pelo <b>volume sistólico</b> (é possível fazer resgate volêmico).</li>
<li>RVS = dificuldade que os órgãos impõem ao fluxo.
<ul><li>Vasodilatação: redução da resistência → uso de vasoconstritores (noradrenalina).</li></ul></li>
</ul></li></ul></div>

<h3>Monitorização hemodinâmica</h3>
<ul>
<li><b>PVC</b> (pressão venosa central): átrio direito (comunica com o leito venoso).</li>
<li><b>PCP</b> (pressão capilar pulmonar): átrio esquerdo (comunica com a circulação pulmonar).</li>
<li>Perfusão: lactato.</li>
</ul>
<figure class="ess-fig"><img src="assets/essentials/clinica-medica/terapia-intensiva/choque-pressoes-dc-rvs.jpg" alt="Esquema do coração e dos pulmões com as pressões: PVC 10 mmHg, PAP 50 mmHg, PAD 10 mmHg, PAE 20 mmHg, PDf VD 10 mmHg, PDf VE 20 mmHg, 20 mmHg nos pulmões"><figcaption>DC e RVS: pressões nas câmaras cardíacas e na circulação pulmonar.</figcaption></figure>
<ul>
<li>TEP: reduz a PCP.</li>
<li>Tamponamento: aumenta a PCP.</li>
</ul>
<details class="ess-tg ess-gray" open><summary>ATENÇÃO</summary>
<ul>
<li>Redução do DC → promove aumento compensatório da RVP.
<ul>
<li><b>Hipovolêmico:</b> pouco volume de sangue.</li>
<li><b>Cardiogênico:</b> falência da bomba.
<ul><li>Ex.: tamponamento cardíaco → o coração não consegue realizar a diástole para receber o sangue → aumento da PVC e da PCP.</li></ul></li>
<li><b>Obstrutivo:</b> impede a saída do sangue do coração.
<ul><li>TEP → a pressão capilar pulmonar CAI → não há sangue chegando aos capilares pulmonares / às câmaras esquerdas por causa do trombo. <!-- RESOLVIDO: "artérias capilares" reescrito --></li></ul></li>
</ul></li>
<li><b>Distributivo</b> → o primeiro parâmetro a se alterar é a RVP (diminuição), e o DC aumenta de forma compensatória.</li>
</ul></details>
<!-- RESOLVIDO (mantido): a imagem original traz anotações manuscritas (“= TAMPO…” e outra truncada) e um ponteiro/seta azul sobre a RVP do choque distributivo; as colunas DC/RVP aparecem mescladas nas linhas hipovolêmico–obstrutivo e PVC/PCP mescladas em hipovolêmico, cardiogênico e distributivo, conforme a imagem. -->
<div class="ess-tw"><table class="ess-table">
<thead><tr><th>Choque</th><th>DC</th><th>RVP</th><th>PVC</th><th>PCP</th></tr></thead>
<tbody>
<tr><th scope="row">Hipovolêmico<br><small>(trauma, queimadura...)</small></th><td rowspan="3">↓</td><td rowspan="3">↑</td><td colspan="2">↓</td></tr>
<tr><th scope="row">Cardiogênico<br><small>(infarto...)</small></th><td colspan="2">↑</td></tr>
<tr><th scope="row">Obstrutivo<br><small>(tamponamento, TEP...)</small></th><td>↑</td><td>varia</td></tr>
<tr><th scope="row">Distributivo<br><small>(sepse, AVC...)</small></th><td>↑</td><td>↓</td><td colspan="2">↓</td></tr>
</tbody></table></div>

<h3>Tratamento</h3>
<div class="ess-cols3 ess-cols">
<div class="ess-col ess-rose"><strong>Hipovolêmico</strong>
<ul>
<li>Cristaloide (salina normal → NaCl 0,9% / ringer lactato → RL) <!-- RESOLVIDO: removido "5%" de RL --></li>
<li>Secundário: coloides (albumina) / hemoconcentrado
<ul>
<li>Por ex.: na dengue, por causa do efeito coloide nos vasos.</li>
<li>Hemoconcentrado: choque III e IV.</li>
</ul></li>
</ul></div>
<div class="ess-col ess-gray"><strong>Cardiogênico / obstrutivo</strong>
<ul>
<li>Inotrópico de escolha: <b>dobutamina</b> (beta-adrenérgico).</li>
<li>Opções: dopamina, milrinona, levosimendana.
<ul>
<li>Cardiogênico = dose beta da dopamina.</li>
<li>Obstrutivo = dose alfa.</li>
</ul></li>
<li>Pode-se realizar pericardiocentese, se necessário (tamponamento cardíaco).</li>
<li>Balão intra-aórtico.</li>
</ul></div>
<div class="ess-col ess-green"><strong>Distributivo</strong>
<p>→ Vasoconstrição:</p>
<ul>
<li>Vasopressor de escolha: <b>noradrenalina</b>.</li>
<li>Opções: vasopressina, adrenalina.</li>
</ul></div>
</div>
</section>

<section class="ess-sec">
<h2>Choque séptico</h2>

<h3>Caso clínico</h3>
<p>Homem, etilista, confuso, desidratado, PA 90×60 mmHg, FC 120, FR 30, Tax 39. Exame físico: MVUA com crepitações no 1/3 superior do pulmão direito. Na unidade, iniciou-se monitorização hemodinâmica e, mesmo após iniciados ATB e reposição volêmica, o paciente se mantinha hipotenso e com lactato sérico elevado. Os parâmetros oxi-hemodinâmicos revelaram: <b>DC aumentado, IRVS reduzida, PoAP e PVC normais, SvcO₂ reduzida.</b></p>

<h3>Sepse</h3>
<div class="ess-box ess-note"><p>Disfunção orgânica causada pela resposta <b><u>DESREGULADA</u></b> a uma infecção.</p>
<figure class="ess-fig ess-wide"><img src="assets/essentials/clinica-medica/terapia-intensiva/sepse-infeccao-inflamacao-disfuncao.jpg" alt="Infecção, inflamação (vasodilatação e trombose) e disfunção orgânica (quente: DC aumentado; fria: DC reduzido)"><figcaption>Infecção → inflamação → disfunção orgânica.</figcaption></figure>
<figure class="ess-fig ess-wide"><img src="assets/essentials/clinica-medica/terapia-intensiva/sepse-fisiopatologia-citocinas.jpg" alt="Fluxograma: infecção + predisposição, TNF-alfa/IL-1/IL-6, inflamação/vasodilatação/trombose/disfunção celular, disfunção de órgão"><figcaption>Fisiopatologia da sepse.</figcaption></figure></div>

<h3>Diagnóstico</h3>
<ul>
<li><b>SEPSE ≥ 2 SOFA</b> ⇒ variáveis de disfunção orgânica → SNC, SCV, SR, hepatobiliar e renal (creatinina ou diurese/débito urinário) <!-- RESOLVIDO: "DC" trocado por diurese (débito urinário) -->
<ul><li>Critério preditor.</li></ul></li>
</ul>
<div class="ess-tw"><table class="ess-table">
<caption>Escore SOFA (<i>Sequential Organ Failure Assessment</i>)</caption>
<thead><tr><th rowspan="2">Sistema (parâmetro)</th><th colspan="5">Pontuação</th></tr>
<tr><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th></tr></thead>
<tbody>
<tr><th scope="row">Respiratório<br><small>PaO₂/FiO₂</small></th><td>&gt;400 mmHg</td><td>&lt;400 mmHg</td><td>&lt;300 mmHg</td><td>&lt;200 mmHg com suporte ventilatório</td><td>&lt;100 mmHg com suporte ventilatório</td></tr>
<tr><th scope="row">Coagulação<br><small>(plaquetas)</small></th><td>≥ 150 × 10³</td><td>&lt;150×10³</td><td>&lt;100×10³</td><td>&lt;50×10³</td><td>&lt;20×10³</td></tr>
<tr><th scope="row">Hepático<br><small>(bilirrubina)</small></th><td>&lt;1,2 mg/dL</td><td>1,2-1,9 mg/dL</td><td>2-5,9 mg/dL</td><td>6-11,9 mg/dL</td><td>&gt;12 mg/dL</td></tr>
<tr><th scope="row">Cardiovascular<br><small>(PAM)</small></th><td>≥ 70 mmHg</td><td>&lt;70 mmHg</td><td>dopamina &lt; 5 µg/kg/min<br>ou<br>qualquer dose de dobutamina</td><td>dopamina 5,1-15 µg/kg/min<br>ou<br>epinefrina ≤ 0,1 µg/kg/min</td><td>dopamina &gt;15 µg/kg/min<br>ou<br>epinefrina &gt; 0,1 µg/kg/min<br>ou<br>norepinefrina &gt;0,1 µg/kg/min</td></tr>
<tr><th scope="row">SNC<br><small>(Glasgow)</small></th><td>15</td><td>14-13</td><td>12-10</td><td>9-6</td><td>&lt; 6</td></tr>
<tr><th scope="row" rowspan="2">Renal<br><small>(creatinina/fluxo urinário)</small></th><td rowspan="2">Cr sérica &lt;1,2 mg/dL</td><td rowspan="2">Cr sérica 1,2-1,9 mg/dL</td><td rowspan="2">Cr sérica 2-3,4 mg/dL</td><td>Cr sérica 3,5-4,9 mg/dL</td><td>Cr sérica &gt;5 mg/dL</td></tr>
<tr><td>Fluxo urinário &lt; 500 mL/24h</td><td>Fluxo urinário &lt; 200 mL/24h</td></tr>
</tbody></table></div>
<p class="ess-obs">PAM: pressão arterial média. SNC: sistema nervoso central. Cr: creatinina. Fonte: Coelho BFL, Murad LS, Bragança RD. <i>Manual de Urgências e Emergências</i>. Rede de Ensino Terzi, 2020.</p>

<div class="ess-box ess-note"><div class="ess-box-tt">Escore SOFA ≥ 2</div>
<ul>
<li><b><u>S</u>ANGUE</b> (plaquetas)</li>
<li><b><u>S</u>NC</b> (Glasgow)</li>
<li><b><u>O</u>XIGENAÇÃO</b> (PaO₂/FiO₂)</li>
<li><b><u>F</u>ÍGADO</b> (bilirrubina)</li>
<li><b><u>A</u>RTERIAL PRESSURE</b> (PAM)</li>
<li><b><u>A</u>NÚRIA</b> (creat. ou diurese)</li>
</ul></div>

<div class="ess-box ess-note"><p>Maior chance de <b>SEPSE = q-SOFA ≥ 2</b> ⇒ Glasgow &lt; 15; PAS &lt; 100 mmHg, FR ≥ 22 irpm.</p></div>
</section>

<section class="ess-sec">
<h2 class="ess-h-brown">Atualizações SOFA-2</h2>

<h3>Neurológico (complementos)</h3>
<ul>
<li><b>Base:</b> a Glasgow Coma Scale (GCS) permanece como núcleo.</li>
<li><b>Delirium:</b> uso de fármacos específicos (ex.: haloperidol, quetiapina, dexmedetomidina) → +1 ponto mesmo com GCS 15.</li>
<li><b>Sedação:</b> utilizar o último GCS pré-sedação; se desconhecido, o escore é “0 pontos (não estimado)”.</li>
<li><b>Comunicação alternativa:</b> gestos consistentes (polegar para cima, sinal de paz, punho fechado) equivalem a GCS 15 em pacientes sem fala.</li>
<li>O módulo neurológico agora reconhece disfunções cognitivas sutis e o efeito da sedação iatrogênica — lacunas ignoradas no SOFA-1.</li>
</ul>
<div class="ess-tw"><table class="ess-table">
<thead><tr><th>SOFA-1</th><th>SOFA-2 (2025)</th><th>O que mudou</th></tr></thead>
<tbody>
<tr><td>Avaliação exclusiva pelo <b>Glasgow (GCS)</b></td><td>Mantém o GCS como base, mas inclui <b>delirium</b>, <b>sedação</b> e <b>comunicação alternativa</b></td><td>Reconhece disfunções cognitivas sutis e efeitos iatrogênicos da sedação</td></tr>
<tr><td>Sem pontuação adicional para delirium</td><td><b>+1 ponto</b> se uso de haloperidol, quetiapina ou dexmedetomidina, mesmo com GCS 15</td><td>Novo marcador prognóstico de disfunção encefálica</td></tr>
<tr><td>Paciente sedado = “não avaliável”</td><td>Usa o <b>último GCS pré-sedação</b>; se desconhecido, escore = 0</td><td>Reduz falsos negativos em pacientes sedados</td></tr>
<tr><td>Comunicação verbal exigida</td><td>Gestos consistentes (👍✌️✊) = GCS 15</td><td>Inclusivo para pacientes traqueostomizados ou afônicos</td></tr>
</tbody></table></div>

<h3>Respiratório</h3>
<ul>
<li><b><i><u>Novos</u></i></b> cortes de PaO₂/FiO₂:
<ul>
<li>0 pontos = &gt; 300 mmHg</li>
<li>1 ponto = ≤ 300</li>
<li>2 pontos = ≤ 225</li>
<li>3 pontos = ≤ 150</li>
<li>4 pontos = ≤ 75 mmHg</li>
</ul></li>
<li>Uso de SpO₂/FiO₂ quando a gasometria arterial não está disponível.</li>
<li>Ventilação não invasiva, CPAP/BiPAP e oxigênio de alto fluxo, além da ventilação mecânica, são considerados (<b>≥ 3 pontos</b>).</li>
<li>ECMO por insuficiência respiratória → <b>4 pontos</b>, independentemente do índice de oxigenação.</li>
<li>A atualização corrige a limitação do SOFA-1, que considerava apenas a ventilação invasiva como marcador de gravidade respiratória.</li>
</ul>
<div class="ess-tw"><table class="ess-table">
<thead><tr><th>SOFA-1</th><th>SOFA-2 (2025)</th><th>Principais mudanças</th></tr></thead>
<tbody>
<tr><td>Somente <b>PaO₂/FiO₂</b> com VM invasiva</td><td><b>Novos cortes de PaO₂/FiO₂</b>: &gt;300 (0), ≤300 (1), ≤225 (2), ≤150 (3), ≤75 (4)</td><td>Refinamento da estratificação</td></tr>
<tr><td>Não aceitava SpO₂</td><td>Permite <b>SpO₂/FiO₂</b> quando não há gasometria</td><td>Mais aplicável em UTIs gerais</td></tr>
<tr><td>Considerava apenas <b>ventilação invasiva</b></td><td>Inclui <b>VNI (CPAP/BIPAP)</b> e <b>CNAF (alto fluxo)</b> ≥3 pontos</td><td>Atualização para a realidade moderna</td></tr>
<tr><td>ECMO não especificado</td><td><b>ECMO por insuficiência respiratória = 4 pontos</b>, independente do índice de oxigenação</td><td>Alinha-se à gravidade real</td></tr>
</tbody></table></div>

<h3>Cardiovascular</h3>
<ul>
<li>Critérios baseados em dose titulável (µg/kg/min) de vasopressores. <!-- RESOLVIDO: unidade padronizada em µg/kg/min (texto e tabela comparativa) --></li>
<li>Uso de noradrenalina ou adrenalina explícito, podendo ter adição de outro vasopressor ou inotrópico.
<ul><li>Dopamina foi excluída (uso obsoleto).</li></ul></li>
<li>Permite combinação de vasopressores.</li>
<li>Suporte mecânico circulatório (ECMO VA, balão intra-aórtico, dispositivos de assistência ventricular) = <b>4 pontos</b>, mesmo com pressões adequadas.</li>
<li>Essa modificação torna o componente cardiovascular quantitativamente comparável entre UTIs e alinhado às práticas atuais de choque refratário.</li>
</ul>
<div class="ess-tw"><table class="ess-table">
<thead><tr><th>SOFA-1</th><th>SOFA-2 (2025)</th><th>Principais mudanças</th></tr></thead>
<tbody>
<tr><td>Baseado em <b>dose fixa de vasopressor (dopamina, noradrenalina, adrenalina)</b></td><td>Critérios <b>por dose titulável (µg/kg/min)</b> de noradrenalina/adrenalina</td><td>Quantificação padronizada e comparável</td></tr>
<tr><td>Dopamina usada como referência</td><td><b>Dopamina removida</b> (obsoleta)</td><td>Atualização da prática clínica</td></tr>
<tr><td>Considerava apenas 1 droga</td><td>Permite <b>combinação de vasopressores/inotrópicos</b></td><td>Representa melhor o choque refratário</td></tr>
<tr><td>Não incluía suporte mecânico</td><td><b>ECMO VA, BIA, DAV</b> = 4 pontos, mesmo com pressão adequada</td><td>Reconhece suporte circulatório avançado</td></tr>
</tbody></table></div>

<h3>Renal</h3>
<ul>
<li>Avaliação dupla: creatinina sérica + débito urinário em 24h.</li>
<li>Pontos de corte revisados: mesma estrutura 0-4, com limites ajustados segundo o tempo de oligúria e a variação de creatinina.</li>
<li>TRS (terapia renal substitutiva): paciente em TRS ou com indicação clínica formal → <b>4 pontos</b>, mesmo se ainda não iniciada.</li>
<li>Evita a subestimação da lesão renal aguda e reflete a prática mais precoce de TRS em alguns pacientes críticos.</li>
</ul>
<div class="ess-tw"><table class="ess-table">
<thead><tr><th>SOFA-1</th><th>SOFA-2 (2025)</th><th>Principais mudanças</th></tr></thead>
<tbody>
<tr><td>Avaliação isolada por <b>creatinina ou débito urinário</b></td><td><b>Avaliação dupla (creatinina + diurese 24h)</b></td><td>Integra função e tempo de oligúria</td></tr>
<tr><td>TRS só se paciente em diálise</td><td><b>TRS iniciada ou com indicação clínica formal = 4 pontos</b></td><td>Evita subestimação da IRA precoce</td></tr>
<tr><td>Mesmos cortes 0-4</td><td>Limiares ajustados ao tempo e à variação de creatinina</td><td>Mais sensível à disfunção subaguda</td></tr>
</tbody></table></div>

<h3>Hepático</h3>
<ul>
<li><b>Bilirrubina:</b> novos limiares (mg/dL)
<ul>
<li>0 pontos = ≤ 1,2</li>
<li>1 = ≤ 3</li>
<li>2 = ≤ 6</li>
<li>3 = ≤ 12</li>
<li>4 = &gt; 12</li>
</ul></li>
</ul>
<div class="ess-tw"><table class="ess-table">
<thead><tr><th>SOFA-1</th><th>SOFA-2 (2025)</th><th>Principais mudanças</th></tr></thead>
<tbody>
<tr><td>≤1,2 (0), ≤2 (1), ≤6 (2), ≤12 (3), &gt;12 (4) mg/dL</td><td>≤1,2 (0), ≤3 (1), ≤6 (2), ≤12 (3), &gt;12 (4)</td><td>Pequeno ajuste do ponto 1 (≤3 mg/dL) para melhor correlação prognóstica</td></tr>
</tbody></table></div>

<h3>Hematológico</h3>
<ul>
<li><b>Plaquetopenia</b> com maior poder discriminatório – limiares ajustados:
<ul>
<li>0 pontos = &gt;150×10³/µL</li>
<li>1 = ≤ 150</li>
<li>2 = ≤ 100</li>
<li>3 = ≤ 80</li>
<li>4 = ≤ 50×10³/µL</li>
</ul></li>
</ul>
<div class="ess-tw"><table class="ess-table">
<thead><tr><th>SOFA-1</th><th>SOFA-2 (2025)</th><th>Principais mudanças</th></tr></thead>
<tbody>
<tr><td>&gt;150 (0), ≤100 (2), ≤50 (4) ×10³/µL</td><td>&gt;150 (0), ≤150 (1), ≤100 (2), ≤80 (3), ≤50 (4)</td><td>Maior poder discriminatório; novo ponto de corte ≤80</td></tr>
</tbody></table></div>

<!-- RESOLVIDO: tabela SOFA-2 transcrita de imagem; faixa de Cardiovascular confirmada como "> 0,2 a ≤ 0,4 µg/kg/min" -->
<div class="ess-tw"><table class="ess-table">
<caption>Escore SOFA-2</caption>
<thead><tr><th>Sistema</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th></tr></thead>
<tbody>
<tr><th scope="row">Cérebro</th><td>GCS 15 (ou polegar para cima, punho ou sinal de paz)</td><td>GCS 13-14 (ou localiza a dor) ou necessidade de fármacos para tratar delirium</td><td>GCS 9-12 (ou retirada à dor)</td><td>GCS 6-8 (ou flexão à dor)</td><td>GCS 3-5 (ou extensão à dor, sem resposta à dor, mioclonia generalizada)</td></tr>
<tr><th scope="row">Respiratório</th><td>Relação PaO₂:FiO₂ &gt;300 mmHg (&gt;40 kPa)</td><td>Relação PaO₂:FiO₂ ≤300 mmHg (≤40 kPa)</td><td>Relação PaO₂:FiO₂ ≤225 mmHg (≤30 kPa)</td><td>Relação PaO₂:FiO₂ ≤150 mmHg (≤20 kPa) e suporte ventilatório avançado</td><td>Relação PaO₂:FiO₂ ≤75 mmHg (≤10 kPa) e suporte ventilatório avançado ou ECMO</td></tr>
<tr><th scope="row">Cardiovascular</th><td>PAM ≥70 mmHg, sem uso de vasopressor ou inotrópico</td><td>PAM &lt;70 mmHg, sem vasopressor ou inotrópico</td><td>Vasopressor em dose baixa: (soma de noradrenalina e adrenalina ≤0,2 µg/kg/min) ou qualquer dose de outro vasopressor ou inotrópico</td><td>Vasopressor em dose média (soma de noradrenalina e adrenalina &gt;0,2 a ≤0,4 µg/kg/min) ou vasopressor em dose baixa (soma de noradrenalina e adrenalina ≤0,2 µg/kg/min) com qualquer outro vasopressor ou inotrópico</td><td>Vasopressor em dose alta (soma de noradrenalina e adrenalina &gt;0,4 µg/kg/min) ou vasopressor em dose média (soma de noradrenalina e adrenalina &gt;.02 a ≤0,4 µg/kg/min) com qualquer outro vasopressor ou inotrópico ou suporte mecânico</td></tr>
<tr><th scope="row">Fígado</th><td>Bilirrubina total ≤1,20 mg/dL (≤20,6 µmol/L)</td><td>Bilirrubina total ≤3,0 mg/dL (≤51,3 µmol/L)</td><td>Bilirrubina total ≤6,0 mg/dL (≤102,6 µmol/L)</td><td>Bilirrubina total ≤12,0 mg/dL (≤205 µmol/L)</td><td>Bilirrubina total &gt;12 mg/dL (&gt;205 µmol/L)</td></tr>
<tr><th scope="row">Rim</th><td>Creatinina ≤1,20 mg/dL (≤110 µmol/L)</td><td>Creatinina ≤2,0 mg/dL (≤170 µmol/L) ou diurese &lt;0,5 mL/kg/h por 6-12 h</td><td>Creatinina ≤3,50 mg/dL (≤300 µmol/L) ou diurese &lt;0,5 mL/kg/h por ≥12 h</td><td>Creatinina &gt;3,50 mg/dL (&gt;300 µmol/L) ou diurese &lt;0,3 mL/kg/h por ≥24 h ou anúria (0 mL) por ≥12 h</td><td>Em TRS ou preenchendo critérios para TRS (inclui uso crônico)</td></tr>
<tr><th scope="row">Hemostasia</th><td>Plaquetas &gt;150 × 10³/µL</td><td>Plaquetas ≤150 × 10³/µL</td><td>Plaquetas ≤100 × 10³/µL</td><td>Plaquetas ≤80 × 10³/µL</td><td>Plaquetas ≤50 × 10³/µL</td></tr>
</tbody></table></div>
</section>

<section class="ess-sec">
<h2>Escore NEWS</h2>
<div class="ess-tw"><table class="ess-table">
<thead><tr><th></th><th>3</th><th>2</th><th>1</th><th>0</th><th>1</th><th>2</th><th>3</th></tr></thead>
<tbody>
<tr><th scope="row">FR</th><td><span class="ess-neg">≤ 8</span></td><td>-</td><td>-</td><td><span class="ess-pos">9-11</span></td><td>-</td><td>21-24</td><td><span class="ess-neg">≥ 25</span></td></tr>
<tr><th scope="row">PAs</th><td><span class="ess-neg">≤ 90</span></td><td>91-100</td><td>101-110</td><td><span class="ess-pos">111-219</span></td><td>-</td><td>-</td><td><span class="ess-neg">≥ 220</span></td></tr>
<tr><th scope="row">ECG</th><td><span class="ess-neg">-</span></td><td>-</td><td>-</td><td><span class="ess-pos">Alerta</span></td><td>-</td><td>-</td><td><span class="ess-neg">Não alerta</span></td></tr>
<tr><th scope="row">SatO₂</th><td><span class="ess-neg">≤ 91</span></td><td>92-93</td><td>94-95</td><td><span class="ess-pos">≥ 96</span></td><td>-</td><td>-</td><td><span class="ess-neg">-</span></td></tr>
<tr><th scope="row">Temp.</th><td><span class="ess-neg">≤ 35</span></td><td>-</td><td>35,1-36</td><td><span class="ess-pos">36,1-38</span></td><td>38,1-39</td><td>≥ 39,1</td><td><span class="ess-neg">-</span></td></tr>
<tr><th scope="row">FC</th><td><span class="ess-neg">≤ 40</span></td><td>-</td><td>41-50</td><td><span class="ess-pos">51-90</span></td><td>91-110</td><td>111-130</td><td><span class="ess-neg">≥ 131</span></td></tr>
</tbody></table></div>
</section>

<section class="ess-sec">
<h2>Choque séptico</h2>
<div class="ess-box ess-note"><p><b>PAM &lt; 65 mmHg + lactato ≥ 18 mg/dL depois da hidratação venosa</b></p></div>
<ol>
<li><b>Vasopressor para manter PAM ≥ 65 mmHg</b> +</li>
<li>Lactato &gt; 2 mmol/L mesmo após o <b>início</b> da reposição volêmica.</li>
</ol>
<p class="ess-obs">→ Fase <b class="ess-c-pink">QUENTE</b>: aumento do DC<br>→ Fase <b class="ess-c-blue">FRIA</b>: redução do DC</p>
<ul>
<li>DC ↑
<ul><li>Na fase fria, o DC ↓</li></ul></li>
<li>RVS ↓</li>
<li>PVC ↓</li>
<li>PCAP ↓</li>
</ul>

<h3>Tratamento</h3>
<figure class="ess-fig"><img src="assets/essentials/clinica-medica/terapia-intensiva/pacote-1a-hora-sepse.jpg" alt="Pacote de 1ª hora (Surviving Sepsis Campaign): tempo zero; medir lactato; coletar hemoculturas antes dos antibióticos; antibióticos de amplo espectro; 30 mL/kg de cristaloide se hipotensão ou lactato &gt; 4 mmol/L; vasopressores para manter PAM ≥ 65 mmHg"><figcaption>Pacote de 1ª hora — ressuscitação inicial para sepse e choque séptico (começar imediatamente).</figcaption></figure>
<div class="ess-box ess-note"><div class="ess-box-tt">Pacote da 1ª hora</div>
<ul>
<li><b>INFECÇÃO</b>
<ul>
<li>Obter culturas (sangue + locais suspeitos)</li>
<li>Antibióticos (amplo espectro; guiar por culturas)</li>
</ul></li>
<li><b>PERFUSÃO</b>
<ul>
<li>Lactato (tentar normalização)</li>
<li>Cristaloides (30 mL/kg; repor dentro de 3h)</li>
<li>Vasopressor (noradrenalina; “durante ou após” volume)</li>
</ul></li>
<li><b>REFRATÁRIOS:</b> hidrocortisona (200 mg/dia, 5-7 dias)</li>
<li><b>OUTRAS MEDIDAS</b>
<ul><li>Transfusão (Hb ≤ 7 g/dL) / Dobutamina (se DC baixo)</li></ul></li>
</ul></div>
<ul>
<li><b class="ess-c-pink">Resgate volêmico:</b> <mark class="ess-hl">30 mL/kg</mark> em até 3h (alvo: PAM ≥ 65 mmHg)
<ul>
<li><b>Ringer ou Ringer lactato</b></li>
<li>Pode usar SF.</li>
</ul></li>
<li><b class="ess-c-pink">Medir lactato</b>
<ul><li>Queda em até 10% em 2h.</li></ul></li>
<li><b class="ess-c-pink">Drogas vasoativas</b> → ainda na 1ª hora se o paciente não estiver respondendo
<ul>
<li>Manter PAM ≥ 65 mmHg.</li>
<li>Primeira hora → se a pressão estiver muito baixa, pode-se iniciar a noradrenalina precocemente → melhora a perfusão = durante ou após o volume.</li>
<li class="ess-hlrow"><b>ESCOLHA ⇒ Noradrenalina</b></li>
<li>Adicionar adrenalina ou vasopressina → segunda opção (pode adicionar se a noradrenalina sozinha não fizer efeito → a vasopressina age em receptores diferentes)
<ul><li>Adicionar se estiver &gt; 0,25 µg/kg/min <!-- RESOLVIDO: unidade corrigida para µg/kg/min --></li></ul></li>
</ul></li>
<li><b class="ess-c-pink">Hemocultura + antibiótico</b>
<ul>
<li class="ess-hlrow"><b>Em até 3 horas se menor probabilidade de sepse ou ausência de choque.</b></li>
<li>Se for alta probabilidade de sepse → <b>1ª hora!</b></li>
<li>Culturas (sangue + foco) → hemocultura 2, urocultura; lavado traqueal se for IOT ou traqueostomia.</li>
</ul></li>
<li>Outras medidas: casos refratários...
<ul>
<li><b><i>Corticoide</i></b> → hidrocortisona 200 mg/dia 5-7d</li>
<li><b><i>Hemotransfusão</i></b> (Hb ≤ 7 g/dL)</li>
<li><b><i>Dobutamina</i></b> → se DC muito baixo (última opção → choque frio)
<ul><li>Se houver disfunção cardíaca.</li></ul></li>
</ul></li>
</ul>
</section>

<section class="ess-sec">
<h2 class="ess-h-red">Instabilidade hemodinâmica (choque)</h2>

<h3>Caso clínico</h3>
<p>Homem, 60 anos, dor precordial irradiada para MSE, pálido e sudoreico. Dispneico com esforço respiratório, sudorese fria e turgência da jugular patológica, PA: 90×60 mmHg. Os parâmetros oxi-hemodinâmicos revelaram: DC reduzido, PaAP aumentado, PVC aumentado, IRVS aumentado e SvcO₂ reduzido.</p>
<p>HD: choque cardiogênico por IAM.</p>
<p>TTO: iniciar dobutamina. Considerar balão intra-aórtico nos refratários.</p>

<div class="ess-box ess-note"><p>Estado de <i>hipoperfusão</i> tecidual.</p>
<ul>
<li>Perfusão = (débito cardíaco) × (resistência vascular sistêmica)
<ul>
<li>DC = volume / bomba
<ul><li>Débito cardíaco = FC × VS</li></ul></li>
<li>RVP = arteríolas</li>
</ul></li>
</ul>
<details class="ess-tg ess-gray" open><summary>4 tipos de choque</summary>
<ol>
<li>Obstrução no caminho</li>
<li>Coração não funciona</li>
<li>Não tem sangue</li>
<li>Não distribui bem</li>
</ol></details></div>

<h3>Tipos de choque</h3>
<div class="ess-cols">
<div class="ess-col ess-gray"><strong>HIPODINÂMICO (DC ↓, RVS ↑)</strong>
<ul>
<li><b>HIPOVOLÊMICO</b> (hemorragia, desidratação)</li>
<li><b>CARDIOGÊNICO</b> (IAM, valvulopatia, miocardite)</li>
<li><b>OBSTRUTIVO</b> (tamponamento, TEP, pneumotórax)</li>
</ul></div>
<div class="ess-col ess-gray"><strong>HIPERDINÂMICO (DC ↑, RVS ↓)</strong>
<ul><li><b>DISTRIBUTIVO</b> (sepse, anafilaxia, neurogênico)</li></ul></div>
</div>

<h3>Monitorização hemodinâmica</h3>
<h4>Principais parâmetros</h4>
<ul><li>Cateter de Swan-Ganz</li></ul>
<div class="ess-cols3 ess-cols">
<div class="ess-col ess-gray"><strong>ÁTRIO (D): volemia</strong>
<ol><li><b><i>Pressão venosa central</i></b> (PVC)
<ol type="a"><li>Sofre interferência da sobrecarga ventricular, por exemplo.</li></ol></li></ol></div>
<div class="ess-col ess-gray"><strong>ÁTRIO (E): congestão / sobrecarga</strong>
<ol><li><b><i>Pressão capilar pulmonar</i></b> (Pcap ou PoAP)</li></ol></div>
<div class="ess-col ess-gray"><strong>VENTRÍCULOS E VASOS</strong>
<ol><li>Débito cardíaco (DC)</li><li>Resistência vascular sistêmica (IRVS)</li></ol></div>
</div>
<!-- RESOLVIDO: "HIPERVOLÊMICO" trocado por "HIPERDINÂMICO" (choque distributivo); célula "!?" do obstrutivo é do original -->
<div class="ess-tw"><table class="ess-table">
<thead><tr><th>HIPODINÂMICO</th><th>DC</th><th>RVS</th><th>PVC</th><th>PCAP</th></tr></thead>
<tbody>
<tr><th scope="row">Hipovolêmico</th><td>↓</td><td>↑</td><td>↓</td><td>↓</td></tr>
<tr><th scope="row">Cardiogênico</th><td>↓</td><td>↑</td><td>↑</td><td>↑</td></tr>
<tr><th scope="row">Obstrutivo</th><td>↓</td><td>↑</td><td>!?</td><td>!?</td></tr>
<tr><th scope="row">HIPERDINÂMICO</th><td>↑</td><td>↓</td><td>↓</td><td>↓</td></tr>
</tbody></table></div>
<div class="ess-box ess-note"><p>E os parâmetros de perfusão tecidual? Débito urinário, hiperlactatemia (energia de forma anaeróbia), saturação venosa mista (SvO₂ - capilar) ou <u>saturação venosa central</u> (SvcO₂ - átrio direito → &lt; 70%).</p></div>

<h3>Tratamento</h3>
<h4>Hipovolêmico</h4>
<ul>
<li><mark class="ess-hl"><b>Cristaloide (SF 0,9% ou RL)</b></mark></li>
<li>Outros: coloide (albumina), hemoconcentrados…</li>
</ul>
<h4>Cardiogênico / obstrutivo</h4>
<ul>
<li>Drogas inotrópicas:
<ul>
<li><mark class="ess-hl"><b>Dobutamina</b></mark> (beta-adrenérgico)</li>
<li>Dopamina (<b><i>Beta</i></b> se dose: 3-10 microgramas/kg/min → o efeito varia de acordo com a dose)</li>
<li>Milrinona (inibidor de fosfodiesterase)</li>
<li>Levosimendana (sensibilidade de canais de cálcio)</li>
</ul></li>
<li>Suporte circulatório / balão intra-aórtico (BIA)</li>
</ul>
<h4>Distributivo</h4>
<ul>
<li>Vasopressor:
<ul>
<li><mark class="ess-hl"><b>Noradrenalina</b></mark> (alfa-adrenérgico)</li>
<li>Dopamina (<b><i>Alfa</i></b> dose &gt; 10 microgramas/kg/min)</li>
<li>Vasopressina (receptor V1 vascular)</li>
<li>Adrenalina → 1ª escolha na anafilaxia. IV ou IM.</li>
</ul></li>
</ul>

<h3>Classificação do choque hemorrágico</h3>
<div class="ess-tw"><table class="ess-table ess-sum">
<thead><tr><th></th><th>Estimado</th><th>FC</th><th>PA</th><th>FR</th><th>Débito urinário</th><th>Reposição</th></tr></thead>
<tbody>
<tr class="ess-r-green"><th scope="row">Grau I</th><td>&lt; 15% (&lt; 750 mL)</td><td>60-100</td><td>Normal</td><td>14-20</td><td>&gt; 30 mL/h</td><td>Cristaloide</td></tr>
<tr class="ess-r-brown"><th scope="row">Grau II</th><td>15-30% (750-1000 mL)</td><td>&gt; 100</td><td>Normal</td><td>20-30</td><td>20-30 mL/h</td><td>Cristaloide</td></tr>
<tr class="ess-r-rose"><th scope="row">Grau III</th><td>30-40% (1500-2000 mL)</td><td>&gt; 120</td><td>&lt; 90</td><td>30-40</td><td>5-15 mL/h</td><td>Cristaloide + hemoderivados</td></tr>
<tr class="ess-r-rose"><th scope="row">Grau IV</th><td>&gt; 40% (&gt; 2000 mL)</td><td>&gt; 140</td><td>&lt; 90</td><td>&gt; 35</td><td>Muito baixo</td><td>Cristaloide + hemoderivados</td></tr>
</tbody></table></div>
</section>

<section class="ess-sec">
<h2 class="ess-h-yellow">Alteração do nível de consciência</h2>

<h3>1. Avaliação por escalas</h3>
<ul><li>Glasgow, Gour, Jouvet…</li></ul>

<h4>Escala de coma de Glasgow</h4>
<div class="ess-cols3 ess-cols">
<div class="ess-col ess-gray"><strong>Abertura ocular</strong>
<ul><li>4- Espontânea</li><li>3- Ao som</li><li>2- À pressão</li><li>1- Ausente</li><li>NT - Não testável</li></ul></div>
<div class="ess-col ess-gray"><strong>Resposta verbal</strong>
<ul><li>5- Orientada</li><li>4- Confusa</li><li>3- Palavras</li><li>2- Sons</li><li>1- Ausente</li><li>NT - Não testável</li></ul></div>
<div class="ess-col ess-gray"><strong>Resposta motora</strong>
<ul><li>6- Obedece comando</li><li>5- Localiza a dor</li><li>4- Flexão normal</li><li>3- Flexão anormal (decorticação)</li><li>2- Extensão (descerebração)</li><li>1- Ausente</li><li>NT - Não testável</li></ul></div>
</div>
<details class="ess-tg ess-gray" open><summary>Conduta</summary>
<ul><li><b>ECG ≤ 8 = TUBO</b> → proteção de vias aéreas.</li></ul></details>

<h3>2. Investigação do problema</h3>
<ul>
<li>Localização: lesão de tronco? (buscar reflexos…)
<ul>
<li>Fotomotor:</li>
<li>Corneopalpebral</li>
<li>Oculovestibular</li>
<li>Oculocefálico</li>
</ul></li>
<li>Etiologia: estrutural X tóxico-metabólica?
<ul>
<li>Reflexos de tronco.</li>
<li>Metabólico: sem déficit focal (exceto hipoglicemia).</li>
</ul></li>
</ul>

<h3>3. Critérios para morte encefálica</h3>
<h4>Pré-requisitos</h4>
<ul>
<li>Lesão encefálica: conhecida e irreversível.</li>
<li>Tempo de observação: 6h (24h se hipóxico-isquêmica).</li>
<li>Sinais vitais: <b>temperatura &gt; 35 °C, SatO₂ &gt; 94% e PAM ≥ 65 mmHg</b>.</li>
</ul>
<h4>2 exames clínicos</h4>
<ul>
<li>Coma e reflexos de tronco ausentes.</li>
<li>Um dos médicos: intensivista, emergencista ou neurologista; o outro médico deve ser capacitado.</li>
<li>Intervalo entre os exames: 24h (7 dias a &lt; 2 meses); 12h (2 meses a &lt; 2 anos); 1h (&gt; 2 anos). <!-- RESOLVIDO: faixa corrigida para 2 meses a < 2 anos (CFM 2.173/2017) --></li>
</ul>
<h4>Teste de apneia</h4>
<ul><li>Teste positivo: PaCO₂ &gt; 55 e respiração ausente.</li></ul>
<h4>Exame complementar</h4>
<ul>
<li>Perfusão, atividade elétrica <i>ou</i> metabólica: ausentes.
<ul><li>Doppler, EEG…</li></ul></li>
</ul>
</section>

<section class="ess-sec">
<h2 class="ess-h-blue">Insuficiência respiratória</h2>

<h3>Caso clínico</h3>
<p>Mulher, infecção urinária complicada. Ao longo da internação apresentou quadro de base evoluindo com significativa dificuldade respiratória e dessaturação à oximetria de pulso, necessitando de O₂ suplementar. Apesar da melhora inicial, a paciente teve mais uma piora do quadro e teve que ser acoplada ao suporte ventilatório. Após ventilação mecânica com FiO₂ a 100%, a gasometria mostrava: pH 7,32, HCO₃ 15, PaO₂ 100, PCO₂ 30.</p>
<p>HD: SRDA por sepse.</p>

<h3>Classificação</h3>
<h4>Tipo 1: hipoxêmica</h4>
<ul>
<li>Captação de O₂.</li>
<li>Distúrbio na relação ventilação/perfusão (V/Q)
<ul>
<li>Shunt: V/Q 0 (sem ventilação).</li>
<li>Espaço morto: alta (alta ventilação, perfusão débil).</li>
<li>Ex.: pneumonia, SRDA, IC, TEP, EAP...</li>
</ul></li>
<li><b>Índice de oxigenação (relação P/F) = PaO₂ / FiO₂ &lt; 300 mmHg</b></li>
<li>Gradiente alvéolo-arterial = P (A - a) O₂ &gt; 10-15</li>
</ul>
<h4>Tipo 2: hipercápnica</h4>
<ul>
<li>Eliminação de CO₂.
<ul>
<li>Hipoventilação.</li>
<li>Ex.: miastenia gravis, DPOC...</li>
</ul></li>
<li><mark class="ess-hl2"><b>PaCO₂ &gt; 50 mmHg</b></mark></li>
</ul>
<details class="ess-tg ess-gray" open><summary>Exemplos</summary>
<ul>
<li>Pneumonia extensa → efeito shunt.</li>
<li>Asma exacerbada pós-inalação de produtos de limpeza → desequilíbrio na relação V/Q.</li>
<li>TEP no pós-op → efeito espaço morto.</li>
<li>DPOC exacerbada por infecção bacteriana de vias aéreas → desequilíbrio na relação V/Q.</li>
</ul></details>
</section>

<section class="ess-sec">
<h2 class="ess-h-blue">Síndrome do desconforto respiratório agudo (SDRA)</h2>
<div class="ess-box ess-note"><p><b>Lesão pulmonar + edema pulmonar inflamatório (causa principal: sepse) + colapso alveolar ⇒ insuficiência respiratória hipoxêmica</b></p>
<ul>
<li>Inflamação sistêmica: sepse de qualquer foco; trauma torácico; síndrome de Mendelson; hemotransfusão maciça.</li>
<li>Edema inflamatório.</li>
</ul>
<figure class="ess-fig"><img src="assets/essentials/clinica-medica/terapia-intensiva/sdra-alveolos-edema.jpg" alt="Pulmões com ampliação dos alvéolos: alvéolo normal e alvéolos com edema inflamatório"><figcaption>Edema inflamatório alveolar na SDRA.</figcaption></figure></div>
<ul>
<li>Pulmão dorsal → shunt intrapulmonar.</li>
<li>Pulmão ventral → efeito espaço morto.</li>
</ul>

<h3>Diagnóstico</h3>
<details class="ess-tg ess-rose" open><summary>CRITÉRIOS DE BERLIM</summary>
<ul>
<li><b>S</b>ete dias (início dos sintomas após exposição) + fatores de risco (pneumonia, pancreatite, politrauma...)</li>
<li><b>D</b>escartar outras causas (cardiopatia / hipervolemia) → ECO, clínica, BNP</li>
<li><b>R</b>adiografia (<b>opacidade bilateral</b> que não é derrame, atelectasia ou nódulo) ou TC
<ul><li>Atualização 2023: pode-se utilizar USG <i>point of care</i>.</li></ul></li>
<li><b>A</b>lteração da relação PaO₂ / FiO₂
<ul>
<li>Leve: ≤ 300 mmHg</li>
<li>Moderada: ≤ 200 mmHg</li>
<li>Grave: ≤ 100 mmHg
<ul><li>Atualização 2023: pode-se utilizar o critério de SatO₂/FiO₂ &lt; 315, desde que o paciente apresente Sat &lt; 97%, em substituição à relação PaO₂ / FiO₂ ≤ 300 mmHg.</li></ul></li>
</ul></li>
</ul></details>

<h4>Atualização dos critérios de definição da síndrome do desconforto respiratório agudo (SDRA) 2023</h4>
<ul>
<li><b>Tempo de início dos sintomas:</b> quadro de insuficiência respiratória hipoxêmica de início (ou piora) agudo dentro de 1 semana (7 dias) de exposição a fator de risco predisponente.</li>
<li><b>Imagem:</b> opacidades bilaterais em radiografia de tórax ou tomografia computadorizada, ou <b><i>linhas B bilaterais e/ou consolidações na ultrassonografia</i></b>, não totalmente explicadas por derrame pleural, atelectasia ou nódulos pulmonares.</li>
<li><b>Fatores de risco compatíveis:</b> infecções, trauma, transfusão, aspiração, sepse.</li>
<li><b>Oxigenação:</b>
<ul>
<li><b>NÃO INTUBADO:</b> PaO₂/FiO₂ ≤ 300 ou SpO₂/FiO₂ ≤ 315 (se SpO₂ ≤ 97) com CNAF ≥ 30 L/min ou VNI/CPAP com pelo menos 5 cmH₂O de PEEP.</li>
<li><b>INTUBADO:</b> manter preferência pelo uso da relação PaO₂/FiO₂ &lt; 300.</li>
<li><b>SITUAÇÃO DE POUCOS RECURSOS:</b> PEEP ou fluxo de oxigênio não necessários para o diagnóstico. SpO₂/FiO₂ ≤ 315 (se SpO₂ ≤ 97).</li>
</ul></li>
<li><b>Graduação:</b>
<ul>
<li class="ess-hlrow"><b class="ess-c-green">Leve:</b> PaO₂/FiO₂ 200-300 mmHg OU SpO₂/FiO₂ 235-315 (se SpO₂ ≤ 97%)</li>
<li class="ess-hlrow"><b class="ess-c-orange">Moderada:</b> PaO₂/FiO₂ 100-200 mmHg OU SpO₂/FiO₂ 148-235 (se SpO₂ ≤ 97%)</li>
<li class="ess-hlrow"><b class="ess-neg">Grave:</b> PaO₂/FiO₂ &lt; 100 mmHg OU SpO₂/FiO₂ &lt; 148 (se SpO₂ ≤ 97%)</li>
</ul></li>
</ul>

<h3>Como tratar?</h3>
<h4>Ventilação mecânica geral</h4>
<details class="ess-tg ess-gray" open><summary>Ajustes iniciais da ventilação</summary>
<ul>
<li>Frequência respiratória: 12-16 irpm</li>
<li>Fração inspirada de O₂: 100%</li>
<li>PEEP: 3-5 cmH₂O</li>
<li>Relação I:E → inicialmente 1:2 - 1:3</li>
<li>Modo ventilatório:
<ul>
<li>VCV: volume (6-8 mL/kg) e fluxo (40-60 L/min)</li>
<li>PCV: tempo inspiratório (1 segundo) e pressão (20 cmH₂O)</li>
</ul></li>
</ul></details>

<div class="ess-box ess-note"><p><b>ESTRATÉGIA DE VENTILAÇÃO PROTETORA</b></p>
<ul>
<li>Redução do volume corrente: ≤ 6 mL/kg (hipercapnia permissiva)</li>
<li>Pressão de platô: ≤ 30 cmH₂O</li>
<li>Ajustar a PEEP: manter SpO₂ &gt; 90% (com a menor FiO₂ possível)
<ul><li>SpO₂ → 88-92%</li></ul></li>
<li><i>Driving pressure</i> (platô - PEEP): ≤ 15 cmH₂O</li>
</ul>
<details class="ess-tg ess-red" open><summary>LESÃO PULMONAR INDUZIDA POR VENTILADOR</summary>
<ul>
<li><b>Volutrauma</b> → ar demais no pulmão</li>
<li><b>Barotrauma</b> → muita pressão</li>
<li><b>Atelectrauma</b> → abertura e fechamento cíclico dos alvéolos</li>
<li><b>Biotrauma</b> → consequência dos 3 → aumento de inflamação orgânica</li>
</ul></details></div>

<p><b>⇒ REFRATÁRIOS (P/F &lt; 150):</b></p>
<ul>
<li>Posição prona (decúbito ventral) → precoce
<ul><li>PaO₂ / FiO₂ &lt; 150; FiO₂ &gt; 0,6</li></ul></li>
<li>Bloqueador neuromuscular (P/F &lt; 120)</li>
<li>ECMO (membrana extracorpórea de oxigenação)</li>
</ul>
</section>
`
});
