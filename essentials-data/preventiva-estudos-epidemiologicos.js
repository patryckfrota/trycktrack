(window.TRYCKTRACK_ESSENTIALS_AULAS = window.TRYCKTRACK_ESSENTIALS_AULAS || []).push({
  area: 'preventiva-epidemiologia', order: 2, title: 'Estudos epidemiológicos',
  html: `
<section class="ess-sec">
<h2>Classificação dos estudos epidemiológicos</h2>
<div class="ess-cols ess-cols3">
<div class="ess-col ess-blue"><h4>1) Investigados</h4>
<ul>
<li><b>Agregado</b> ⇒ população.</li>
<li><b>Individuado</b> ⇒ indivíduos.</li>
</ul></div>
<div class="ess-col ess-green"><h4>2) Investigador</h4>
<ul>
<li><b>Observacional</b> ⇒ observação.</li>
<li><b>Intervenção</b> ⇒ ensaio.</li>
</ul></div>
<div class="ess-col ess-yellow"><h4>3) Tempo</h4>
<ul>
<li><b>Transversal</b> ⇒ seccional ou estudo de prevalência.
<ul><li>Não existe acompanhamento.</li><li>Risco e desfecho são mostrados no mesmo momento.</li></ul></li>
<li><b>Longitudinal</b>
<ul><li>Existe acompanhamento.</li><li>Risco e desfecho são mostrados em momentos diferentes.</li></ul></li>
</ul></div>
</div>

<figure class="ess-fig ess-wide"><img src="assets/essentials/preventiva/estudos-epidemiologicos/fluxograma-classificacao.jpg" alt="Fluxograma: agregado, observação, transversal, ecológico; agregado, observação, longitudinal, série temporal; agregado, intervenção, longitudinal, ensaio comunitário; indivíduo, observação, transversal, inquérito/transversal; indivíduo, observação, longitudinal, coorte ou caso-controle; indivíduo, intervenção, longitudinal, ensaio clínico"><figcaption>Fluxograma com as características de cada estudo epidemiológico.</figcaption></figure>

<ul>
<li><b>Coorte</b> → <b>Pro</b>spectivo.</li>
<li><b>Caso-controle</b> → <b>Retro</b>spectivo.</li>
<li>Exemplo de ensaio comunitário → <b>vacinação / fluoretação da água</b>.</li>
</ul>

<div class="ess-cols">
<div class="ess-col ess-gray"><h4>Estudos descritivos</h4>
<ul><li>Ecológico</li><li>Tendências</li><li>Inquérito</li></ul></div>
<div class="ess-col ess-gray"><h4>Estudos analíticos</h4>
<ul><li>Ensaio comunitário</li><li>Coorte</li><li>Caso-controle</li><li>Ensaio clínico</li></ul></div>
</div>
</section>

<section class="ess-sec">
<h2>Estudo ecológico</h2>
<div class="ess-box ess-tip"><div class="ess-box-tt">Agregado / observação / transversal</div>
<ul>
<li>Aborda uma área geográfica.</li>
<li>Usa dados secundários (ex.: DataSUS) → adequado para planejar os serviços de saúde (determina <b><i>prevalência</i></b>).</li>
</ul></div>
<div class="ess-cols">
<div class="ess-col ess-green"><h4>Vantagens</h4>
<ul><li>Fácil</li><li>Barato</li><li><span class="ess-neg"><b><i>Gera hipóteses!</i></b></span></li></ul></div>
<div class="ess-col ess-red"><h4>Desvantagens</h4>
<ul>
<li><span class="ess-neg"><b><i>NÃO</i></b></span> confirma as hipóteses!</li>
<li>Pode induzir a erro: individualizar um achado coletivo ⇒ <i class="ess-c-blue">falácia ecológica</i>.</li>
</ul></div>
</div>
</section>

<section class="ess-sec">
<h2>Estudo transversal</h2>
<div class="ess-box ess-tip"><div class="ess-box-tt">Individuado / observacional / transversal</div></div>
<div class="ess-cols">
<div class="ess-col ess-green"><h4>Vantagens</h4>
<ul><li>Fácil</li><li>Barato</li><li>Gera hipóteses</li></ul></div>
<div class="ess-col ess-red"><h4>Desvantagens</h4>
<ul><li><span class="ess-neg"><b><i>NÃO</i></b></span> confirma hipóteses!</li></ul></div>
</div>
</section>

<section class="ess-sec">
<h2>Coorte</h2>
<div class="ess-box ess-tip"><div class="ess-box-tt">Individuado / observacional / longitudinal / prospectivo</div>
<p><b>Risco ⟶ desfecho</b></p>
<ul>
<li><b>Coorte histórica</b> → parte do fator de risco para o desfecho + <i>a seleção dos grupos e os resultados aconteceram no passado</i> = coorte não concorrente (retrospectiva/histórica). <!-- RESOLVIDO: não recorrente para não concorrente (retrospectiva/histórica) --></li>
</ul></div>

<h3 class="ess-h-purple">Desenho</h3>
<div class="ess-cols">
<div class="ess-col ess-purple"><h4>Fator de <i>risco</i></h4>
<ul><li>Doente</li><li>Não doente</li></ul></div>
<div class="ess-col ess-purple"><h4><i>Sem</i> o fator de risco</h4>
<ul><li>Doente</li><li>Não doente</li></ul></div>
</div>

<div class="ess-cols">
<div class="ess-col ess-green"><h4>Vantagens</h4>
<ul>
<li>Define risco.</li>
<li>Determina a <b><i>incidência</i></b> → todos os casos de doença são casos que surgiram durante o estudo.</li>
<li>Analisa vários desfechos (doenças).</li>
<li><u>Pode</u> usar <b>VÁRIOS</b> fatores de risco → ex.: Framingham.</li>
<li>O fator de risco <b>PODE SER RARO</b>.</li>
</ul></div>
<div class="ess-col ess-red"><h4>Desvantagens</h4>
<ul>
<li>Caro</li>
<li>Longo</li>
<li>Perda de seguimento</li>
<li>Ruim para <b class="ess-c-pink">doença rara / longa</b></li>
</ul></div>
</div>
</section>

<section class="ess-sec">
<h2>Caso-controle</h2>
<div class="ess-box ess-tip"><div class="ess-box-tt">Individuado / observacional / longitudinal / retrospectivo</div>
<p>Dados da memória → prontuário, experiências pessoais.</p>
<p><b>Desfecho ⟶ risco</b></p></div>

<h3 class="ess-h-yellow">Desenho</h3>
<div class="ess-cols">
<div class="ess-col ess-yellow"><h4>Casos (<i>doentes</i>)</h4>
<ul><li>Risco</li><li>Sem risco</li></ul></div>
<div class="ess-col ess-yellow"><h4>Controle (<i>não</i> doentes)</h4>
<ul><li>Risco</li><li>Sem risco</li></ul></div>
</div>

<div class="ess-cols">
<div class="ess-col ess-green"><h4>Vantagens</h4>
<ul>
<li>Rápido</li>
<li>Barato</li>
<li>Bom para <b class="ess-c-purple">doença rara</b></li>
<li>Analisa vários riscos</li>
</ul></div>
<div class="ess-col ess-red"><h4>Desvantagens</h4>
<ul>
<li>Difícil formar grupo controle</li>
<li><span class="ess-neg"><b><i>NÃO</i></b></span> define risco</li>
<li>Vulnerável a erros</li>
<li>Ruim para fator de risco raro</li>
</ul></div>
</div>
</section>

<section class="ess-sec">
<h2>Ensaio clínico</h2>
<div class="ess-box ess-tip"><div class="ess-box-tt">Individuado / intervenção / longitudinal / prospectivo</div>
<p><b>Risco ⟶ desfecho</b></p></div>

<h3 class="ess-h-blue">Desenho</h3>
<div class="ess-cols">
<div class="ess-col ess-blue"><h4>Substância</h4>
<ul><li>Efeito presente</li><li>Efeito ausente</li></ul></div>
<div class="ess-col ess-blue"><h4>Placebo ou padrão</h4>
<ul><li>Efeito presente</li><li>Efeito ausente</li></ul></div>
</div>

<div class="ess-cols">
<div class="ess-col ess-green"><h4>Vantagens</h4>
<ul><li>Consegue controlar os fatores.</li><li>Melhor para testar medicamentos.</li></ul></div>
<div class="ess-col ess-red"><h4>Desvantagens</h4>
<ul>
<li>Social, ético.</li>
<li>Complexo, caro, longo, com perdas.</li>
<li><b>Efeito Hawthorne / efeito placebo</b></li>
</ul></div>
</div>

<details class="ess-tg ess-blue" open><summary>Quais características desse estudo ajudam a evitar esses efeitos?</summary>
<ul>
<li><b>Controlado:</b> dois grupos (experimento × placebo) → evita o erro de intervenção.</li>
<li><b>Randomizado:</b> grupos formados de forma aleatória → evita o erro de seleção / confusão…
<ul><li>Melhora a homogeneidade entre os grupos.</li></ul></li>
<li><b>Mascarado:</b> evita o erro de aferição.
<ul>
<li><b>Aberto:</b> todos sabem a qual grupo pertencem → ex.: condutas cirúrgicas.</li>
<li><b>Simples-cego:</b> somente os profissionais sabem a qual grupo os pacientes pertencem.</li>
<li><b>Duplo-cego:</b> ninguém sabe qual é a divisão dos grupos.</li>
<li><b>Triplo-cego:</b> inclui também as pessoas que vão ter contato com os grupos, por exemplo, o radiologista.</li>
</ul></li>
<li class="ess-obs">Obs.: <i>cross over</i> → os participantes recebem os dois tratamentos.</li>
</ul></details>

<details class="ess-tg ess-gray" open><summary>Fases: pré-clínica (animais) → clínica (4 tipos)</summary>
<ul>
<li><b>Fase I:</b> sadios, segurança, farmacocinética.</li>
<li><b>Fase II:</b> população-alvo (tem a doença para a qual se quer definir o benefício), avaliar eficácia, dose.</li>
<li><b>Fase III:</b> ensaios multicêntricos.</li>
<li><b>Fase IV:</b> vigilância pós-comercialização.</li>
</ul></details>
</section>

<section class="ess-sec">
<h2>Revisão sistemática</h2>
<div class="ess-box ess-tip"><div class="ess-box-tt">Revisão de diversos estudos com o mesmo desenho e sobre o mesmo tema</div>
<ul>
<li>Revisão sistemática <i><b>qualitativa</b></i>: não permite análise estatística dos estudos.</li>
<li>Revisão sistemática <i><b>quantitativa</b></i> ou <i><b>metanálise</b></i>: permite análise.</li>
</ul></div>
<div class="ess-cols">
<div class="ess-col ess-green"><h4>Vantagens</h4>
<ul><li>Síntese de informação, barata, rápida.</li></ul></div>
<div class="ess-col ess-red"><h4>Desvantagens</h4>
<ul>
<li>Viés de publicação
<ul><li>Por exemplo: estudos com resultados favoráveis.</li></ul></li>
<li>Divergência entre os estudos.</li>
</ul></div>
</div>

<h3 class="ess-h-brown">Nível de evidência dos estudos epidemiológicos — Oxford</h3>
<div class="ess-tw"><table class="ess-table">
<thead><tr><th>Nível</th><th>Estudos</th></tr></thead>
<tbody>
<tr><th scope="row">Nível I</th><td>IA: revisão sistemática (RS) de ensaio · IB: ensaio clínico</td></tr>
<tr><th scope="row">Nível II</th><td>IIA: RS de coorte · IIB: coorte · IIC: ecológico</td></tr>
<tr><th scope="row">Nível III</th><td>IIIA: RS de caso-controle · IIIB: caso-controle</td></tr>
<tr><th scope="row">Nível IV</th><td>Série de casos</td></tr>
<tr><th scope="row">Nível V</th><td>Opinião do especialista</td></tr>
</tbody></table></div>
</section>

<section class="ess-sec">
<h2>Análise</h2>
<div class="ess-cols ess-cols3">
<div class="ess-col ess-blue"><h4>1) Frequência</h4>
<ul>
<li>Medir a doença (quantidade de doença).
<ul><li>Prevalência → <b>transversal</b></li><li>Incidência → <b>coorte / ensaio</b></li></ul></li>
</ul></div>
<div class="ess-col ess-green"><h4>2) Associação</h4>
<ul>
<li>Fator × doença.</li>
<li><b>Razão de prevalência (RP):</b> transversal.</li>
<li><b>Odds ratio (OR):</b> caso-controle.</li>
<li><b>Risco relativo (RR):</b> coorte / ensaio clínico.</li>
<li><b>Redução do risco relativo (RRR):</b> ensaio clínico. <!-- RESOLVIDO: (NNT) para (RRR) --></li>
<li><b>Número necessário ao tratamento (NNT):</b> ensaio clínico.</li>
</ul></div>
<div class="ess-col ess-yellow"><h4>3) Estatística</h4>
<ul>
<li>Posso confiar?</li>
<li>Válido ou não?</li>
<li>Erro sistemático</li>
<li>Erro aleatório</li>
</ul></div>
</div>

<h3 class="ess-h-rose">Transversal</h3>
<div class="ess-box ess-tip"><div class="ess-box-tt">Razão de prevalência (RP)</div>
<p><b>RP = PE ÷ PNE</b> (prevalência nos expostos ÷ prevalência nos não expostos)</p></div>
<details class="ess-tg ess-rose" open><summary>Exemplo</summary>
<div class="ess-tw"><table class="ess-table">
<thead><tr><th rowspan="2">Chupar chupeta</th><th colspan="2">Desmame</th><th rowspan="2">Total</th></tr><tr><th>Sim</th><th>Não</th></tr></thead>
<tbody>
<tr><th scope="row">Sim</th><td>200</td><td>100</td><td>300</td></tr>
<tr><th scope="row">Não</th><td>100</td><td>100</td><td>200</td></tr>
<tr><th scope="row">Total</th><td>300</td><td>200</td><td>500</td></tr>
</tbody></table></div>
<p>Qual foi o “risco” de desmame nas crianças expostas à chupeta?</p>
<p><b>RP = PE ÷ PNE = (200 ÷ 300) ÷ (100 ÷ 200) = 1,3</b></p>
<ul><li>Quem chupou chupeta teve o risco 30% maior de desmame em relação a quem não chupou.</li></ul></details>

<h3 class="ess-h-yellow">Caso-controle</h3>
<div class="ess-box ess-tip"><div class="ess-box-tt">Odds ratio (OR)</div>
<p><b>OR = ad ÷ bc</b></p></div>
<details class="ess-tg ess-yellow" open><summary>Exemplo</summary>
<div class="ess-tw"><table class="ess-table">
<thead><tr><th rowspan="2">Jateamento</th><th colspan="2">Pneumoconiose</th><th rowspan="2">Total</th></tr><tr><th>Sim</th><th>Não</th></tr></thead>
<tbody>
<tr><th scope="row">Sim</th><td>100 (a)</td><td>300 (b)</td><td>400</td></tr>
<tr><th scope="row">Não</th><td>20 (c)</td><td>480 (d)</td><td>500</td></tr>
<tr><th scope="row">Total</th><td>120</td><td>780</td><td>900</td></tr>
</tbody></table></div>
<p>Qual foi o “risco” de pneumoconiose em quem foi exposto ao jateamento?</p>
<p><b>OR = ad ÷ bc = (100 × 480) ÷ (300 × 20) = 8</b></p>
<ul><li>Quem foi exposto ao jateamento tem 8 vezes mais chance de desenvolver pneumoconiose em relação àqueles não expostos.</li></ul></details>

<h3 class="ess-h-purple">Coorte</h3>
<div class="ess-box ess-tip"><div class="ess-box-tt">Risco relativo (RR) → incidência do exposto (IE) ÷ incidência dos não expostos (INE)</div>
<p><b>RR = IE ÷ INE</b></p></div>
<details class="ess-tg ess-purple" open><summary>Exemplo</summary>
<div class="ess-tw"><table class="ess-table">
<thead><tr><th rowspan="2">Fumante</th><th colspan="2">Câncer de pulmão</th><th rowspan="2">Total</th></tr><tr><th>Sim</th><th>Não</th></tr></thead>
<tbody>
<tr><th scope="row">Sim</th><td>90</td><td>10</td><td>100</td></tr>
<tr><th scope="row">Não</th><td>5</td><td>95</td><td>100</td></tr>
<tr><th scope="row">Total</th><td>95</td><td>105</td><td>200</td></tr>
</tbody></table></div>
<p>Qual foi o risco de câncer de pulmão em quem foi exposto ao tabagismo?</p>
<p><b>RR = IE ÷ INE = (90 ÷ 100) ÷ (5 ÷ 100) = 18</b></p>
<ul><li>Quem foi exposto ao tabagismo teve 18 vezes mais chance de desenvolver câncer de pulmão.</li></ul></details>

<h3 class="ess-h-blue">Ensaio clínico</h3>
<div class="ess-box ess-tip"><div class="ess-box-tt">Risco relativo (RR)</div>
<p><b>RR = IE ÷ INE</b></p></div>
<details class="ess-tg ess-blue" open><summary>Exemplo</summary>
<div class="ess-tw"><table class="ess-table">
<thead><tr><th rowspan="2">Grupo</th><th colspan="2">Efeito</th><th rowspan="2">Total</th></tr><tr><th>Morte</th><th>Sobrevivência</th></tr></thead>
<tbody>
<tr><th scope="row">Nova droga</th><td>15</td><td>85</td><td>100</td></tr>
<tr><th scope="row">Controle</th><td>20</td><td>80</td><td>100</td></tr>
<tr><th scope="row">Total</th><td>35</td><td>165</td><td>200</td></tr>
</tbody></table></div>
<p>Qual foi o risco de morte em quem foi exposto à nova droga?</p>
<p><b>RR = IE ÷ INE = (15 ÷ 100) ÷ (20 ÷ 100) = 0,75</b></p>
<ul><li>Houve uma redução de 25% do risco de morte naqueles que foram expostos à droga.</li></ul></details>

<div class="ess-box ess-note"><div class="ess-box-tt">Redução do risco relativo (RRR)</div>
<p><b>RRR = 1 − RR</b></p>
<ul><li>Calcula, por exemplo, a <i><b>eficácia</b></i> de uma vacina.</li></ul></div>

<div class="ess-box ess-note"><div class="ess-box-tt">Redução absoluta do risco (RAR)</div>
<p><b>RAR = IC − IE</b> (incidência no controle − incidência nos expostos)</p>
<p>Exemplo (mesma tabela do ensaio clínico acima): qual foi a redução absoluta do risco de morte em quem foi exposto à nova droga?</p>
<p><b>RAR = IC − IE = 20% − 15% = 5%</b></p>
<ul><li>De cada 100 pacientes tratados, o grupo que recebeu a nova droga teve 5 mortes a menos do que o placebo.</li></ul></div>

<div class="ess-box ess-note"><div class="ess-box-tt">Número necessário ao tratamento (NNT)</div>
<p><b>NNT = 1 ÷ RAR</b></p>
<ul>
<li>Quanto <i>menor</i> o NNT, <i>maior</i> a potência da droga nesse sentido.
<ul><li>Lembrar da relação custo-benefício.</li></ul></li>
</ul>
<p>Exemplo (mesma tabela): quantos pacientes são necessários tratar com a nova droga para evitar uma morte?</p>
<p><b>NNT = 1 ÷ RAR = 1 ÷ 5% = 20</b></p>
<ul><li>É necessário tratar 20 pessoas para evitar 1 morte.</li></ul></div>
</section>

<section class="ess-sec">
<h2>Estatística</h2>

<h3>Interpretação (RP, OR e RR)</h3>
<div class="ess-stack">
<div class="ess-col ess-gray"><b>= 1</b><br>Sem associação.</div>
<div class="ess-col ess-red"><b>&gt; 1</b><br>Fator de risco.</div>
<div class="ess-col ess-green"><b>&lt; 1</b><br>Fator protetor. <!-- RESOLVIDO: &gt; 1 para &lt; 1 no fator protetor --></div>
</div>

<h3 class="ess-h-red">Erro sistemático (viés)</h3>
<div class="ess-cols ess-cols3">
<div class="ess-col ess-red"><h4>Seleção</h4><ul><li>Grupos não comparáveis.</li></ul></div>
<div class="ess-col ess-red"><h4>Aferição (informação)</h4><ul><li>Métodos de aferição diferentes.</li></ul></div>
<div class="ess-col ess-red"><h4>Confundimento</h4><ul><li>Terceiro fator relacionado.</li></ul></div>
</div>

<h3 class="ess-h-yellow">Erro aleatório (acaso)</h3>
<ul>
<li>p &lt; 0,05 (5%).</li>
<li>IC 95% → intervalo de confiança.</li>
</ul>

<h3>Análise do IC 95%</h3>
<div class="ess-box ess-tip"><div class="ess-box-tt">IC 95% (intervalo de confiança) → interpretação</div></div>

<details class="ess-tg ess-purple" open><summary>Exemplo 1: estudo de coorte com RR = 3,4 e IC 95% (2,4 e 7,6)</summary>
<ul>
<li>Conclusão: ao repetir o estudo 100 vezes, em 95 delas o RR esteve entre 2,4 e 7,6. Ou seja, o IC englobou o RR e não englobou o valor 1.</li>
<li><b class="ess-c-purple">Estudo com significância estatística!</b></li>
</ul></details>

<details class="ess-tg ess-blue" open><summary>Exemplo 2: quatro estudos de coorte</summary>
<ul>
<li>Estudo 1 — RR = 4 e IC 95% (3,3 – 5,1)</li>
<li>Estudo 2 — RR = 6 e IC 95% (0,9 – 9,4)</li>
<li>Estudo 3 — RR = 8 e IC 95% (5,7 – 10,9)</li>
<li>Estudo 4 — RR = 8 e IC 95% (4,7 – 9,9)</li>
</ul>
<div class="ess-tw"><table class="ess-table">
<thead><tr><th>Pergunta</th><th>Resposta</th></tr></thead>
<tbody>
<tr><th scope="row">A. Em qual estudo eu não confio?</th><td>Estudo 2.</td></tr>
<tr><th scope="row">B. Qual estudo foi mais preciso?</th><td>Estudo 1 → menor IC 95%.</td></tr>
<tr><th scope="row">C. Qual estudo trabalhou com mais gente?</th><td>Estudo 1 — é o que tem o menor intervalo do IC 95%, já que, quanto mais gente, menos muda o valor.</td></tr>
<tr><th scope="row">D. Houve diferença estatística entre o 1 e o 3?</th><td>Sim, pois não houve sobreposição dos valores do IC 95%.</td></tr>
<tr><th scope="row">E. Houve diferença estatística entre o 1 e o 4?</th><td>Não, houve sobreposição entre os IC 95%.</td></tr>
</tbody></table></div></details>

<details class="ess-tg ess-green" open><summary>Exemplo 3: interpretação da <b>metanálise</b> (<i>forest plot</i>)</summary>
<figure class="ess-fig"><img src="assets/essentials/preventiva/estudos-epidemiologicos/forest-plot-exemplo.jpg" alt="Forest plot com seis estudos e a combinação, com risco relativo e IC 95% de cada um"><figcaption>Forest plot: Estudo 1 – 0,62 (0,39–0,98); Estudo 2 – 0,71 (0,57–0,88); Estudo 3 – 0,26 (0,06–1,11); Estudo 4 – 0,70 (0,52–0,93); Estudo 5 – 0,37 (0,05–2,91); Estudo 6 – 0,82 (0,55–1,21); combinação – 0,70 (0,60–0,81).</figcaption></figure>
<div class="ess-tw"><table class="ess-table">
<thead><tr><th>Pergunta</th><th>Resposta</th></tr></thead>
<tbody>
<tr><th scope="row">A. Qual estudo trabalhou com mais gente?</th><td>Estudo 2.</td></tr>
<tr><th scope="row">B. Em quais estudos eu não confio?</th><td>Estudos 3, 5 e 6. <!-- RESOLVIDO: estudos 2, 5 e 6 para 3, 5 e 6 (IC que cruzam o 1) --></td></tr>
<tr><th scope="row">C. Qual a conclusão do estudo?</th><td>Confiável.</td></tr>
</tbody></table></div></details>

<h4>Explicação</h4>
<figure class="ess-fig"><img src="assets/essentials/preventiva/estudos-epidemiologicos/forest-plot-explicacao.jpg" alt="Esquema de forest plot numerado de 1 a 6: estudos, linha de nulidade, quadrados, intervalos de confiança, losango da metanálise e I²"><figcaption>Esquema de leitura de um forest plot (numerado de 1 a 6).</figcaption></figure>
<ul>
<li>A linha central do gráfico equivale a 1 (linha de nulidade) → corta o eixo X justamente no número 1. Indica que a medida de associação da metanálise (seja risco relativo, <i>odds ratio</i> ou razão de prevalências) foi igual a 1.</li>
<li>As medidas de associação de cada estudo são representadas por quadrados. Se esses quadrados coincidirem com a linha de nulidade → tais estudos <span class="ess-neg">não</span> demonstraram associação entre a exposição e o desfecho.</li>
<li>O losango representa a metanálise propriamente dita, isto é, a síntese dos resultados de todos os estudos utilizados. Essa medida deve ser diferente de 1 e seu intervalo de confiança não pode cortar a linha de nulidade. Caso contrário, o resultado da metanálise indica que não há associação estatística entre a exposição e o desfecho.</li>
</ul>
</section>

<section class="ess-sec">
<h2>Critérios de causalidade (critérios de Hill)</h2>
<div class="ess-tw"><table class="ess-table">
<thead><tr><th>Critério</th><th>Ideia</th></tr></thead>
<tbody>
<tr><th scope="row"><span class="ess-neg"><i>Sequência cronológica / temporalidade</i></span></th><td>Tempo → antes…</td></tr>
<tr><th scope="row">Força de associação</th><td>Quem fuma… (RR, OR)</td></tr>
<tr><th scope="row">Relação dose-resposta</th><td>Quem fuma muito…</td></tr>
<tr><th scope="row">Consistência</th><td>Outros trabalhos confirmaram.</td></tr>
<tr><th scope="row">Plausibilidade</th><td>Fisiopatologia (história natural da doença).</td></tr>
<tr><th scope="row">Analogia</th><td>Situações parecidas…</td></tr>
<tr><th scope="row">Especificidade</th><td>Só causa essa doença.</td></tr>
<tr><th scope="row">Coerência</th><td>Paradigma atual.</td></tr>
<tr><th scope="row">Evidência experimental</th><td>Muda o fator, muda a doença…</td></tr>
</tbody></table></div>
</section>
`
});
