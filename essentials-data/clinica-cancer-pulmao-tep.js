(window.TRYCKTRACK_ESSENTIALS_AULAS = window.TRYCKTRACK_ESSENTIALS_AULAS || []).push({
  area: 'clinica-pneumologia', order: 2, title: 'Câncer de pulmão e TEP',
  html: `
<section class="ess-sec">
<h2>Tromboembolismo venoso</h2>
<div class="ess-box ess-alert"><div class="ess-box-tt">Trombose venosa periférica e tromboembolismo pulmonar</div>
Evento trombótico, especialmente na região íleo-femoral.</div>

<h3>Fatores de risco</h3>
<details class="ess-tg ess-gray" open><summary>Tríade de Virchow</summary>
<p><mark class="ess-hl"><b>Hipercoagulabilidade + estase sanguínea + lesão endotelial</b></mark></p>
<h4>Hipercoagulabilidade</h4>
<div class="ess-cols">
<div class="ess-col ess-blue"><strong>Hereditários</strong>
<ul><li>Fator V de Leiden (coagulopatia mais comum)</li><li>Mutante do gene da protrombina</li></ul></div>
<div class="ess-col ess-yellow"><strong>Adquiridos</strong>
<ul><li>Pós-operatório (principalmente de ortopedia)</li><li>Medicamentos (ACO)</li><li>Neoplasia maligna</li><li>Imobilização</li></ul></div>
</div>
</details>

<h3>Manifestação clínica</h3>
<ul>
<li>A maioria é <b>assintomática</b>.</li>
<li>Edema, dor à palpação, empastamento, sinal de Homans (dor com a dorsiflexão do pé).</li>
<li>Quanto mais proximal a trombose, maior o risco de TEP → ileofemoral.</li>
</ul>

<h3>Diagnóstico</h3>
<ul>
<li><mark class="ess-hl"><b>USG com Doppler:</b></mark> perda da compressibilidade (o lúmen não colaba → trombo obstruindo).</li>
<li>Padrão-ouro: venografia (mais invasiva).</li>
</ul>
</section>

<section class="ess-sec">
<h2>Tromboembolismo pulmonar (TEP)</h2>

<h3>Manifestações clínicas</h3>
<div class="ess-box ess-alert"><div class="ess-box-tt">Atenção</div>Evento cardiorrespiratório <b><u>súbito</u></b>.</div>
<ul>
<li><b>Taquipneia</b> → principal <b><i>sinal</i></b>.</li>
<li><b>Dispneia</b> → principal <b><i>sintoma</i></b>.</li>
<li>Dor torácica (pleurítica → ventilatório-dependente).</li>
<li>Hemoptise → ruptura dos vasos por excesso de pressão.</li>
<li>Hipoxemia.</li>
<li>Sibilância.</li>
</ul>
<details class="ess-tg ess-red" open><summary>Se grave (TEP maciço)</summary>
<ul><li>Hipotensão → choque obstrutivo.</li><li>Cor pulmonale → insuficiência de VD por alteração pulmonar.</li></ul></details>

<h3>Exames complementares <i>inespecíficos</i></h3>
<details class="ess-tg ess-gray" open><summary>Gasometria</summary>
<ul>
<li>Alteração da V/Q (ventilação / perfusão) → aumento do volume morto.</li>
<li>Hipoxemia e hipocapnia.</li>
<li>Alcalose respiratória.</li>
</ul></details>
<details class="ess-tg ess-gray" open><summary>ECG</summary>
<ul>
<li>Taquicardia sinusal → o achado mais comum.</li>
<li><mark class="ess-hl"><b>Padrão S1 Q3 T3 ⇒ mais específico</b></mark>
<ul><li>Alterações vistas em D1 e D3 (S → D1; Q e T → D3).</li></ul></li>
</ul>
<figure class="ess-fig"><img src="assets/essentials/clinica-medica/cancer-pulmao-tep/ecg-s1q3t3.jpg" alt="ECG de 12 derivações com padrão S1Q3T3"><figcaption>Alteração eletrocardiográfica que pode ser encontrada no tromboembolismo pulmonar: padrão S1Q3T3.</figcaption></figure>
</details>
<details class="ess-tg ess-gray" open><summary>Radiografia de tórax</summary>
<ul>
<li>Westermark, Hampton... → achados secundários ao TEP.</li>
<li>Reforçam a hipótese, mas não confirmam o diagnóstico.</li>
</ul>
<figure class="ess-fig"><img src="assets/essentials/clinica-medica/cancer-pulmao-tep/rx-westermark-hampton.jpg" alt="Radiografia de tórax com sinal de Westermark (oligoemia localizada) e corcova de Hampton (hipotransparência triangular periférica)"><figcaption>Sinal de Westermark: oligoemia localizada. Corcova de Hampton: hipotransparência triangular periférica.</figcaption></figure>
</details>
<details class="ess-tg ess-gray" open><summary>Ecocardiograma</summary>
<ul><li>Disfunção de VD: pior o prognóstico.
<ul><li>Reflete no aumento da artéria pulmonar.</li></ul></li></ul></details>
<details class="ess-tg ess-gray" open><summary>Marcadores</summary>
<ul>
<li>Aumento de BNP e troponina: pior o prognóstico.</li>
<li><b>Atenção: D-dímero</b>
<ul><li><span class="ess-neg"><b>NÃO</b></span> fecha diagnóstico → VPN alto (especificidade baixa → bom para excluir o diagnóstico).</li></ul></li>
</ul></details>
<div class="ess-box ess-note"><b>⇒ Nenhum destes exames fecha o diagnóstico!</b></div>

<h3>Algoritmo diagnóstico</h3>
<div class="ess-box ess-alert"><div class="ess-box-tt">Escore de Wells (probabilidade de TEP)</div></div>
<div class="ess-tw"><table class="ess-table">
<thead><tr><th>Critério</th><th>Pontos</th></tr></thead>
<tbody>
<tr><td>Clínica de TVP</td><td>3 pontos</td></tr>
<tr><td>Sem outro diagnóstico mais provável</td><td>3 pontos</td></tr>
<tr><td>FC &gt; 100 bpm</td><td>1,5 ponto</td></tr>
<tr><td>Imobilização ou cirurgia recente</td><td>1,5 ponto</td></tr>
<tr><td>Episódio prévio de TVP/TEP</td><td>1,5 ponto</td></tr>
<tr><td>Hemoptise</td><td>1 ponto</td></tr>
<tr><td>Malignidade</td><td>1 ponto</td></tr>
</tbody></table></div>
<div class="ess-box ess-tip"><div class="ess-box-tt">Dica</div>
<p><b>E</b> → <b>E</b>pisódio prévio de TVP/TEP<br>
<b>M</b> → <b>M</b>alignidade<br>
<b>B</b> → <b>B</b>atata inchada (clínica de TVP)<br>
<b>O</b> → sem <b>O</b>utro diagnóstico mais provável<br>
<b>L</b> → <b>L</b>ung Bleeding (hemoptise)<br>
<b>I</b> → <b>I</b>mobilização ou cirurgia recente<br>
<b>A</b> → <b>A</b>lta FC (&gt; 100 bpm)</p></div>
<figure class="ess-fig"><img src="assets/essentials/clinica-medica/cancer-pulmao-tep/fluxo-wells-diagnostico.jpg" alt="Fluxograma diagnóstico do TEP: suspeita, Wells improvável (≤ 4) com D-dímero ou provável (&gt; 4) com angio-TC de tórax; outros exames: cintilografia, Doppler de MMII e arteriografia"><figcaption>Fluxograma diagnóstico do TEP: Wells ≤ 4 (improvável) → D-dímero (&lt; 500: sem TEP; &gt; 500: angio-TC); Wells &gt; 4 (provável) → angio-TC de tórax (outros: cintilografia, Doppler de MMII, arteriografia); inicia-se terapia na suspeita.</figcaption></figure>
<ul>
<li><b>Arteriografia</b> → reservada para a última situação devido à invasão, apesar de ser o padrão-ouro.</li>
<li><b>AngioTC de tórax</b> → a mais usada, mas alguns pacientes não conseguem realizá-la por causa do contraste etc., devendo-se lançar mão de outros métodos.
<ul><li>Achado: falha de enchimento do vaso (tronco pulmonar).</li><li>Caso Wells &gt; 4 → pode-se iniciar o tratamento mesmo na impossibilidade de realizar exames ⇒ tratamento em 24 h → melhora a morbimortalidade.</li></ul></li>
</ul>

<h3>Tratamento</h3>
<div class="ess-box ess-tip"><div class="ess-box-tt">Duração</div>Anticoagulação por <b>3 meses</b>.</div>
<details class="ess-tg ess-green" open><summary>Opções principais</summary>
<ul>
<li><b>HNF</b> → é preciso fazer INR de 6 em 6 h.</li>
<li><b>HBPM (enoxaparina)</b> → a mais usada.</li>
<li><b>Esquemas:</b>
<ul>
<li><mark class="ess-hl">Heparina + warfarin 5 mg/dia</mark> (começam juntos...)
<ul><li>Suspender a heparina com 2 INR entre 2–3.</li></ul></li>
<li>Heparina por 5 dias + dabigatrana 150 mg 2x/dia.</li>
<li><mark class="ess-hl3">Rivaroxabana 15 mg 12/12 h por 21 dias, depois 20 mg/dia</mark></li>
<li><mark class="ess-hl3">Apixabana 10 mg 12/12 h por 7 dias, depois 5 mg 12/12 h</mark> (preferência atual → maior facilidade com a posologia, não precisa de monitorar etc.). <!-- RESOLVIDO: doses separadas por fármaco --></li>
</ul></li>
<li><b>Filtro de VCI</b> (contraindicação da anticoagulação / falha de anticoagulação).</li>
<li><b>Obs.:</b> se <b class="ess-c-green">baixo risco</b> (PESI classe I/II ou sPESI = 0): <b class="ess-neg">alta precoce</b>.</li>
</ul></details>
<details class="ess-tg ess-red" open><summary>Se TEP maciço (instabilidade, IVD, choque cardiogênico)?</summary>
<ul>
<li><mark class="ess-hl"><b>Trombolisar até o 14º dia!!! → Fibrinolítico = alteplase</b></mark></li>
<li>Embolectomia → em casos de contraindicação da trombólise ou falha da trombólise.</li>
</ul></details>
</section>

<section class="ess-sec">
<h2>Embolia gordurosa</h2>
<div class="ess-box ess-note">Fratura de ossos longos e da pelve → micropartículas de gordura na circulação → obstrução + vasculite (12–24 h).</div>
<details class="ess-tg ess-yellow" open><summary>Clínica</summary>
<ul><li>Hipoxemia</li><li>Rebaixamento de consciência</li><li>Rash petequial</li></ul></details>
<details class="ess-tg ess-green" open><summary>Tratamento</summary>
<ul><li>Suporte.</li><li>Alguns serviços usam corticoide.</li></ul></details>
<details class="ess-tg ess-blue" open><summary>Prevenção</summary>
<ul>
<li>Imobilização precoce das fraturas.</li>
<li>Correção cirúrgica das fraturas.</li>
<li>Evitar fatores que elevem a pressão dentro do osso durante os procedimentos ortopédicos.</li>
<li>Metilprednisolona se risco elevado de embolia gordurosa → controversa.</li>
</ul></details>
</section>

<section class="ess-sec">
<h2>Nódulo pulmonar solitário</h2>
<div class="ess-box ess-alert"><b>Lesão ≤ 3 cm</b>, envolta por parênquima normal (se maior = massa).
<ul><li><b>Obs.:</b> fonte Harrison → ≤ 6 cm.</li></ul></div>

<h3>Características</h3>
<div class="ess-tw"><table class="ess-table">
<thead><tr><th>Característica</th><th>Benigno</th><th>Maligno</th></tr></thead>
<tbody>
<tr><th scope="row">Associação</th><td>Cicatriz de tuberculose – BK</td><td>Câncer</td></tr>
<tr><th scope="row">Idade</th><td>&lt; 35 anos</td><td>≥ 35 anos</td></tr>
<tr><th scope="row">Tabagismo</th><td>Não</td><td>Sim</td></tr>
<tr><th scope="row">Tamanho</th><td>≤ 2 cm</td><td>&gt; 2 cm <!-- RESOLVIDO: removido "(0,8 cm)" das duas colunas --></td></tr>
<tr><th scope="row"><mark class="ess-hl">Contorno</mark></th><td>Regular</td><td>Irregular</td></tr>
<tr><th scope="row"><mark class="ess-hl">Calcificação</mark></th><td>Central, pipoca (hamartomatoso)</td><td>Ausente, excêntrica, salpicado</td></tr>
<tr><th scope="row"><mark class="ess-hl">Crescimento em 2 anos</mark></th><td>Não</td><td>Sim</td></tr>
<tr><th scope="row">Conduta</th><td>Rx / TC / PET 3–6 meses por 2 anos</td><td>Biópsia / ressecção</td></tr>
</tbody></table></div>
<p class="ess-obs"><mark class="ess-hl">* As características mais importantes na diferenciação do nódulo benigno e maligno são as destacadas em amarelo (contorno, calcificação e crescimento em 2 anos).</mark></p>

<h3>Padrões de calcificação</h3>
<figure class="ess-fig"><img src="assets/essentials/clinica-medica/cancer-pulmao-tep/padroes-calcificacao.jpg" alt="Padrões de calcificação do nódulo: central (benigna), difusa (benigna), pipoca (hamartoma, benigna) e excêntrica (maligna)"><figcaption>Central: benigna. Difusa: benigna. Pipoca (hamartoma): benigna. Excêntrica: maligna.</figcaption></figure>
<div class="ess-box ess-tip"><div class="ess-box-tt">Dica</div>
<mark class="ess-hl"><b>A mar toma uma pipoquinha pra comemorar = HAMARTOMA</b></mark> → tumor benigno mais comum do pulmão.
<ul><li>Calcificação difusa → benigno.</li></ul></div>

<h3>Conduta</h3>
<figure class="ess-fig ess-wide"><img src="assets/essentials/clinica-medica/cancer-pulmao-tep/fluxo-nodulo-pulmonar.jpg" alt="Fluxograma do nódulo pulmonar: calcificação benigna ou estabilidade por 2 anos (sim = fim); lesão &gt; 8 mm; risco de câncer baixo (TC seriada 3/9/24 meses), médio (PET-scan) ou alto (biópsia ou ressecção)"><figcaption>Fluxograma da conduta em casos de nódulo pulmonar solitário.</figcaption></figure>
<p><b>Calcificação benigna ou estabilidade por 2 anos?</b></p>
<div class="ess-cols">
<div class="ess-col ess-green"><strong>Sim</strong>
<ul>
<li>= fim → provavelmente é um granuloma da tuberculose (cicatriz).</li>
<li>Se o tamanho se manteve nos 2 anos e não houve modificações em seu aspecto → fim.
<ul><li>Em casos de padrão radiológico de hamartoma → pode-se continuar o seguimento tomográfico por 2 anos.</li></ul></li>
</ul></div>
<div class="ess-col ess-red"><strong>Não</strong>
<ul><li>Aumento da lesão ou calcificação maligna → continua a investigação.</li></ul></div>
</div>
<ul>
<li>Risco <b class="ess-neg">ALTO</b> de CA → tabagista, idoso, lesão &gt; 1–2 cm.
<ul><li><b>Biópsia</b> → varia de acordo com a localização do tumor:
<ul>
<li>Broncofibroscopia</li>
<li>Agulha fina guiada por TC</li>
<li>Guiada por videotoracoscopia</li>
<li>Céu aberto → toracotomia com biópsia de congelação</li>
</ul></li></ul></li>
<li>Paciente ex-tabagista, idade intermediária (risco médio de CA) → <b>PET-scan</b>: avalia a atividade das células tumorais.</li>
</ul>
</section>

<section class="ess-sec">
<h2>Câncer de pulmão</h2>
<p>= <b>Carcinoma broncogênico</b> → CA de pulmão que deriva do epitélio respiratório (brônquio, bronquíolo, alvéolo).</p>
<ul><li>Representa &gt; 90% das neoplasias pulmonares.</li></ul>

<h3>Fatores de risco</h3>
<div class="ess-box ess-alert"><div class="ess-box-tt">Carga tabágica (maços/ano)</div>maços/dia × anos fumados</div>
<details class="ess-tg ess-blue" open><summary>Existe rastreio?</summary>
<ul><li>Ministério da Saúde: <span class="ess-neg"><b>NÃO</b></span> / USPSTF e ACS: <span class="ess-pos"><b>SIM</b></span></li></ul>
<h4><i>Como?</i></h4>
<ul><li>TC de baixa dosagem anual.</li></ul>
<h4><i>Para quem?</i></h4>
<ul><li>Idade: 50–80 anos.</li><li>Carga: ≥ 20 maços/ano.</li><li>Fumante ou ex-fumante (há &lt; 15 anos).</li></ul>
<h4><i>Até quando?</i></h4>
<ul><li>Idade máxima ou 15 anos de rastreio normal.</li></ul>
</details>

<h3>Tipos histológicos</h3>
<details class="ess-tg ess-gray" open><summary>Não pequenas células (80%)</summary>
<h4>Epidermoide (escamoso) (30%)</h4>
<ul><li>Extremamente associado ao <b>tabagismo</b>.</li><li>Característica <b>central</b>.</li></ul>
<h4>Adenocarcinoma (40%)</h4>
<ul>
<li>Além da relação com o tabaco, associa-se a outros hábitos comportamentais que, mesmo na ausência de carga tabágica, ocorrem em <b>mulheres, jovens, não fumantes</b>.</li>
<li>Localização <b>periférica</b> → derrame pleural (irritação e inflamação ou presença de células neoplásicas dentro do líquido pleural).</li>
</ul>
<h4>Grandes células (&lt; 10%)</h4>
<ul><li>Anaplástico.</li></ul>
</details>
<details class="ess-tg ess-gray" open><summary>Pequenas células (20%) = oat-cell</summary>
<ul>
<li>Pior prognóstico.</li>
<li>Origem neuroendócrina.
<ul><li>Classicamente associado às síndromes paraneoplásicas.</li></ul></li>
</ul></details>

<div class="ess-tw"><table class="ess-table ess-sum">
<thead><tr><th colspan="2">Não pequenas células (80–90%)</th></tr></thead>
<tbody>
<tr class="ess-r-blue"><th scope="row">Adenocarcinoma</th><td>40% dos casos; periférico (derrame pleural); mulher jovem, não tabagista.</td></tr>
<tr class="ess-r-rose"><th scope="row">Epidermoide</th><td>30% dos casos; central (cavitação) → síndrome de Pancoast; idoso, tabagista.</td></tr>
<tr class="ess-r-green"><th scope="row">Grandes células</th><td>10% dos casos; periféricos.</td></tr>
</tbody></table></div>
<div class="ess-tw"><table class="ess-table ess-sum">
<thead><tr><th>Pequenas células (oat-cell) 15–20%</th></tr></thead>
<tbody>
<tr class="ess-r-brown"><td>Origem neuroendócrina (síndromes paraneoplásicas).</td></tr>
<tr class="ess-r-brown"><td>Pior prognóstico.</td></tr>
<tr class="ess-r-brown"><td>Central.</td></tr>
</tbody></table></div>
<details class="ess-tg ess-yellow" open><summary>Carcinoma bronquioloalveolar</summary>
<ul><li>Variante do adenocarcinoma mais bem diferenciada.</li><li>Não invade o alvéolo → vidro fosco.</li></ul></details>

<h3>Quadro clínico</h3>
<div class="ess-cols">
<div class="ess-col ess-gray"><strong>Inespecíficos</strong>
<ul><li>Anorexia</li><li>Perda ponderal</li><li>Fadiga</li></ul></div>
<div class="ess-col ess-gray"><strong>Específicos</strong>
<ul><li>Tosse</li><li>Hemoptise</li><li>Dispneia</li><li>Dor torácica</li></ul></div>
</div>
<details class="ess-tg ess-gray" open><summary>Crescimento tumoral</summary>
<ul>
<li>Tosse.</li>
<li>Hemoptise → vasos lesados.</li>
<li>Dispneia.</li>
<li>Dor torácica → acometimento dos receptores nociceptivos.</li>
</ul></details>

<div class="ess-box ess-tip"><div class="ess-box-tt">Síndrome de Pancoast</div>
<ul>
<li>Tumor no <b class="ess-neg">ápice</b> (sulco superior).
<ul><li>Erosão do 1º e 2º arcos costais.
<ul><li>Macicez à percussão da clavícula direita.</li></ul></li></ul></li>
</ul>
<figure class="ess-fig"><img src="assets/essentials/clinica-medica/cancer-pulmao-tep/rx-pancoast.jpg" alt="Radiografia de tórax com tumor no ápice, associado à síndrome de Pancoast-Tobias"><figcaption>Tumor no ápice associado à síndrome de Pancoast-Tobias.</figcaption></figure>
<h4>Subtipo relacionado</h4>
<ul><li>Epidermoide.</li></ul>
<h4>Clínica</h4>
<ul>
<li>Dor torácica + invasão do plexo braquial + compressão <b>simpática</b> cervical (síndrome de Horner).
<ul>
<li><b class="ess-neg">Dor: ombro e face ulnar no braço</b> → lesão do plexo braquial.</li>
<li><b>Síndrome de Horner</b> (gânglio simpático):
<ul><li><b>Miose, ptose, enoftalmia, anidrose facial ipsilateral.</b></li></ul></li>
</ul></li>
</ul></div>

<div class="ess-box ess-tip"><div class="ess-box-tt">Síndrome da veia cava superior</div>
<ul><li>O sangue fica represado → envolve a drenagem que traz o sangue da cabeça e dos membros para o átrio D.</li></ul>
<h4>Subtipo relacionado</h4>
<p><mark class="ess-hl"><b>Mais associado ao oat-cell</b></mark></p>
<h4>Quadro clínico</h4>
<ul>
<li>Letargia, confusão mental.</li>
<li>Cefaleia.</li>
<li>Turgência jugular.</li>
<li>Edema de face e MMSS.</li>
<li>Pletora.</li>
<li>Circulação colateral → veias sobressalentes no tórax.
<ul><li>Vasos dispostos na parede torácica mais superficial → tentativa de <i>by-pass</i> da cava superior.</li></ul></li>
</ul></div>

<h3>Diagnóstico</h3>
<div class="ess-cols">
<div class="ess-col ess-blue"><strong>Lesão periférica</strong>
<ul><li>Biópsia percutânea → agulha fina ou <i>core biopsy</i>.</li><li>Toracotomia ou videolaparoscopia.</li></ul></div>
<div class="ess-col ess-yellow"><strong>Lesão central</strong>
<ul><li>Broncoscopia, US endoscópico ou escarro.</li><li>Lavado brônquico (baixa sensibilidade).</li></ul></div>
</div>

<h3>Metástase</h3>
<div class="ess-box ess-note"><b>FOCA</b> = <b class="ess-c-pink">F</b>ígado; <b class="ess-c-pink">O</b>sso; <b class="ess-c-pink">C</b>érebro; <b class="ess-c-pink">A</b>drenal → metástases hematogênicas.</div>

<h3>Síndrome paraneoplásica</h3>
<details class="ess-tg ess-rose" open><summary>Carcinoma epidermoide</summary>
<ul><li><b>Hipercalcemia</b> (peptídeo PTH-like).</li></ul>
<div class="ess-box ess-tip"><div class="ess-box-tt">Dica</div><b>EPTHderMOLE</b> → mole = cavitações.</div></details>
<details class="ess-tg ess-blue" open><summary>Adenocarcinoma</summary>
<ul>
<li><b>Osteoartropatia pulmonar hipertrófica</b>
<ul><li>Baqueteamento digital → devido à neoplasia.</li><li>Alteração óssea marcante devido à hipertrofia.</li></ul></li>
</ul>
<div class="ess-box ess-tip"><div class="ess-box-tt">Dica</div><b>ADERRAME</b>carcinoma</div>
<figure class="ess-fig ess-wide"><img src="assets/essentials/clinica-medica/cancer-pulmao-tep/baqueteamento-digital.jpg" alt="Baqueteamento digital nas mãos e radiografia óssea com periostite"><figcaption>Baqueteamento digital e alteração óssea na osteoartropatia pulmonar hipertrófica.</figcaption></figure></details>
<details class="ess-tg ess-purple" open><summary>Oat-cell (câncer pulmonar de pequenas células)</summary>
<ul>
<li><b>Síndrome de Cushing</b> (ACTH ectópico).</li>
<li><b>SIADH</b> → secreção excessiva do hormônio antidiurético → desenvolvimento de retenção de água livre e diluição do sódio = <b>hiponatremia euvolêmica</b>.</li>
<li><b>Síndrome de Eaton-Lambert</b> (síndrome miastênica associada ao oat-cell)
<ul><li>Produção de anticorpos que atuam em receptores pré-sinápticos, levando a fraqueza muscular (pode se assemelhar à miastenia gravis).</li></ul></li>
</ul>
<div class="ess-box ess-tip"><div class="ess-box-tt">Dica</div><b>O</b><b>ACTH</b>-cell</div></details>
</section>

<section class="ess-sec">
<h2>Estadiamento e tratamento</h2>
<h3>Não pequenas células</h3>
<div class="ess-cols ess-cols3">
<div class="ess-col ess-blue"><h4>T</h4>
<p><b>T1</b></p>
<ul><li>≤ 3 cm</li><li>A: ≤ 1 cm</li><li>B: ≤ 2 cm</li><li>C: ≤ 3 cm</li></ul>
<p><b>T2</b></p>
<ul><li>3–5 cm ou brônquio fonte (sem acometer a carina)</li><li>A: 3–4 cm</li><li>B: 4–5 cm</li></ul>
<p><b>T3</b></p>
<ul><li>&gt; 5–7 cm</li><li>ou invade: pleura, pericárdio parietal, parede torácica ou nervo frênico</li><li>ou nódulo satélite no mesmo lobo</li></ul>
<p><b>T4</b></p>
<ul><li>&gt; 7 cm</li><li>ou invade estrutura adjacente (coração, traqueia, esôfago…)</li><li>ou nódulo satélite ipsilateral em lobo diferente</li></ul></div>
<div class="ess-col ess-yellow"><h4>N</h4>
<p><b>N1</b></p><ul><li>Linfonodos hilares do mesmo lado</li></ul>
<p><b>N2</b></p><ul><li>Linfonodos mediastinais do mesmo lado</li></ul>
<p><b>N3</b></p><ul><li>Linfonodos contralaterais ou supraclaviculares</li></ul></div>
<div class="ess-col ess-rose"><h4>M</h4>
<p><b>M1a</b></p><ul><li>Derrame pleural / pericárdio ou nódulo contralateral</li></ul>
<p><b>M1b</b></p><ul><li>Metástase em órgão único (ossos, cérebro)</li></ul>
<p><b>M1c</b></p><ul><li>Metástase em mais de um órgão</li></ul></div>
</div>
<div class="ess-box ess-note"><div class="ess-box-tt">Tratamento</div>
<p><b>Cirurgia + quimioterapia adjuvante</b></p>
<ul>
<li>M1 → quimioterapia e imunoterapia.</li>
<li>Ia: ressecção.</li>
<li>Ib ou II: ressecção (se possível) ou QT + RT (curativa).</li>
<li>IV: QT paliativa.</li>
<li><b>Irressecável: T4, N3 e M1.</b></li>
</ul></div>

<h3>Pequenas células — oat-cell</h3>
<div class="ess-cols">
<div class="ess-col ess-green"><strong>Limitado</strong>
<ul>
<li>Definição: confinado a <b>um pulmão</b> e seus respectivos linfonodos.
<ul><li>1 hemitórax.</li></ul></li>
<li>Tratamento: QT + RT (cirurgia rara...).</li>
</ul></div>
<div class="ess-col ess-red"><strong>Avançado</strong>
<ul>
<li>Definição: ultrapassa os limites acima → bilateral.</li>
<li>Tratamento: paliação (QT; associado ou não a RT).</li>
</ul></div>
</div>
<div class="ess-box ess-note"><div class="ess-box-tt">Tratamento</div>
<ul><li>Extenso: QT paliativo.</li><li>Limitado: QT + RT (cura em 15–25%).</li></ul></div>
</section>
`
});
