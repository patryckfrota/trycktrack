(window.TRYCKTRACK_ESSENTIALS_AULAS = window.TRYCKTRACK_ESSENTIALS_AULAS || []).push({
  area: 'preventiva-epidemiologia', order: 1, title: 'Medidas de saúde coletiva',
  html: `
<section class="ess-sec">
<h2>Os indicadores de saúde</h2>
<div class="ess-box ess-note"><div class="ess-box-tt">Objetivo</div>Entender as condições de saúde de uma determinada população.</div>

<h3>Valores absolutos</h3>
<ul>
<li><span class="ess-neg">Não</span> permitem comparações entre locais e cidades.</li>
<li>Servem para a administração de recursos.</li>
</ul>

<h3>Valores relativos</h3>
<div class="ess-cols">
<div class="ess-col ess-gray"><h4>Coeficiente</h4>
<p><b>= risco = taxas</b></p>
<p>Numerador <span class="ess-neg">≠</span> denominador.</p>
<ul><li>Exemplo: nº de <i>óbitos</i> em ≥ 50 anos ÷ <i>população</i> ≥ 50 anos.</li></ul></div>
<div class="ess-col ess-gray"><h4>Índice</h4>
<p><b>= proporção</b></p>
<p>Numerador <b class="ess-c-purple">=</b> denominador.</p>
<ul><li>Exemplo: nº de <i>óbitos</i> em ≥ 50 anos ÷ nº total de <i>óbitos</i>.</li></ul></div>
</div>

<h3>Coeficientes (taxas)</h3>
<details class="ess-tg ess-green" open><summary>Morbidade</summary>
<ul><li>Risco da <b>POPULAÇÃO</b> adoecer.</li></ul></details>
<details class="ess-tg ess-rose" open><summary>Mortalidade</summary>
<ul><li>Risco da <b>POPULAÇÃO</b> morrer.</li></ul></details>
<details class="ess-tg ess-red" open><summary>Letalidade</summary>
<ul><li>Risco do <b>DOENTE</b> morrer.</li></ul></details>
</section>

<section class="ess-sec">
<h2>O risco de adoecer: morbidade</h2>

<div class="ess-cols">
<div class="ess-col ess-green"><h3 class="ess-h-green">Prevalência</h3>
<div class="ess-box ess-note"><b>Nº de casos ÷ população exposta</b><br><mark class="ess-hl3"><b>Prevalência = incidência × duração</b></mark></div>
<ul>
<li><b>Crônica.</b></li>
<li>= probabilidade pré-teste.</li>
<li>Quanto <i>MAIOR</i> a prevalência → <i>MAIOR</i> o <b>VPP</b> (valor preditivo positivo).</li>
<li>Quanto <i>MENOR</i> a prevalência → <i>MAIOR</i> o <b>VPN</b> (valor preditivo negativo) e menor o VPP. <!-- RESOLVIDO: trocado por MENOR prevalência → MAIOR VPN (e menor VPP) --></li>
</ul></div>
<div class="ess-col ess-blue"><h3 class="ess-h-blue">Incidência</h3>
<div class="ess-box ess-note"><b>Nº de casos novos ÷ população exposta</b><br>Nº de casos novos ÷ população = <b>incidência</b>.</div>
<ul>
<li><b>Aguda.</b>
<ul><li>Expressa o número de casos novos da doença na população exposta em um determinado período.</li></ul></li>
<li>É a melhor medida para determinar o risco.</li>
</ul></div>
</div>

<div class="ess-cols">
<div class="ess-col ess-green"><h4>Prevalência</h4>
<details class="ess-tg ess-green" open><summary>O que pode <b>aumentar</b>?</summary>
<ul>
<li><span class="ess-c-blue">Incidência</span></li>
<li><span class="ess-c-blue">Imigração de doentes</span></li>
<li>Terapia que <span class="ess-c-blue">melhora, mas não cura</span> = aumenta (o paciente vive mais).</li>
<li><mark class="ess-hl3"><b>P = I × D → Prevalência = Incidência × Duração</b></mark></li>
</ul></details>
<details class="ess-tg ess-yellow" open><summary>O que pode <b>diminuir</b>?</summary>
<ul>
<li><span class="ess-c-orange">Emigração de doentes</span></li>
<li><span class="ess-c-orange">Cura</span>
<ul><li>Droga que cura = diminui.</li></ul></li>
<li><span class="ess-c-orange">Morte</span></li>
</ul></details></div>
<div class="ess-col ess-blue"><h4>Incidência</h4>
<details class="ess-tg ess-blue" open><summary>O que pode <b>aumentar</b>?</summary>
<ul><li>Programas de rastreamento.</li></ul></details></div>
</div>
</section>

<section class="ess-sec">
<h2>Mortalidade</h2>

<h3 class="ess-h-rose">Mortalidade geral</h3>
<div class="ess-box ess-note"><div class="ess-box-tt">Risco da população exposta de morrer</div><b>Nº de óbitos ÷ população EXPOSTA = risco de mortalidade geral</b></div>
<ul>
<li>Não avalia bem a qualidade do país: são crianças ou idosos? ⇒ <span class="ess-neg">NÃO</span> é considerada um indicador de qualidade de vida de uma população.</li>
<li>Não serve para comparar regiões diferentes → estruturas etárias diferentes (regiões com mais idosos).</li>
<li>É ruim para comparações.</li>
</ul>
<div class="ess-box ess-alert"><div class="ess-box-tt">Para comparar</div><b>Padronização da idade!</b></div>

<h3 class="ess-h-rose">Mortalidade específica</h3>
<h4>Por causa: materna</h4>
<div class="ess-box ess-tip"><b class="ess-c-purple">Nº de óbitos por causas maternas ÷ nº de nascidos vivos</b></div>
<ul><li>Óbitos maternos → até <b>42 dias</b> pós-parto.</li></ul>
<details class="ess-tg ess-gray" open><summary>Tipos</summary>
<ul>
<li><b>Direta</b> → a mais comum; a gravidez é a culpada (ex.: DPP).</li>
<li><b>Indireta</b> → a gravidez contribui; ex.: problemas cardíacos exacerbados pela gravidez.</li>
<li><b>Acidentes</b> → causas externas; <span class="ess-neg">não</span> entram como morte materna.</li>
</ul></details>
<details class="ess-tg ess-gray" open><summary>Causas (em ordem)</summary>
<ol>
<li>HAS → pré-eclâmpsia e eclâmpsia</li>
<li>Hemorragia</li>
<li>Infecção</li>
</ol></details>
<ul>
<li><b>Notificação compulsória</b> em casos de morte materna.
<ul><li>Esse tipo de morte não pode acontecer: são jovens sem comorbidades → indicador importante de saúde do país; mortes evitáveis.</li></ul></li>
</ul>

<h4>Por idade: infantil</h4>
<div class="ess-box ess-note"><div class="ess-box-tt">Mortalidade infantil</div><b>Nº de óbitos &lt; 1 ano ÷ nº de nascidos vivos</b></div>
<details class="ess-tg ess-rose" open><summary>Neonatal: precoce e tardia</summary>
<ul>
<li><b>Nº de óbitos &lt; 28 dias ÷ nº de nascidos vivos</b></li>
<li>Avaliado pelo <i>pediatra</i>.</li>
</ul></details>
<details class="ess-tg ess-rose" open><summary>Natimortos</summary>
<ul><li><b>Natimortos (&gt; <i>22 semanas</i>) ÷ nº de nascidos (<span class="ess-c-purple">vivos + mortos</span>)</b></li></ul></details>
<details class="ess-tg ess-rose" open><summary>Perinatal</summary>
<ul>
<li><b>Natimortos (&gt; <i>22 semanas</i>) + óbitos &lt; 7 dias ÷ nº de nascidos (<span class="ess-c-purple">vivos + mortos</span>)</b></li>
<li>Avaliado pelo <i>obstetra</i>.</li>
</ul></details>
<details class="ess-tg ess-rose" open><summary>Pós-natal: infantil tardia</summary>
<ul>
<li><b>Nº de óbitos de 28 dias até 1 ano ÷ nº de nascidos vivos</b></li>
<li>Associada ao <i>meio ambiente</i>.</li>
</ul></details>
<ul><li><b>Notificação compulsória</b> dos casos de morte infantil → <span class="ess-pos">excelente</span> indicador do nível de vida do país.</li></ul>

<details class="ess-tg ess-yellow" open><summary>Medidas associadas ao meio ambiente</summary>
<ul><li>Saneamento básico</li><li>Incentivo ao aleitamento materno</li><li>Vacinação</li></ul></details>

<details class="ess-tg ess-gray" open><summary>Principais causas de morte infantil no Brasil</summary>
<ol>
<li><b>Afecções perinatais</b> (sendo a principal a prematuridade)</li>
<li><b>Malformações congênitas</b></li>
<li><b>Respiratórias</b></li>
<li><b>Infecções</b></li>
</ol></details>
<ul><li>A mortalidade <b>perinatal</b> é a <b>MAIS ALTA</b> ⇒ inclui neonatal precoce e natimortos.</li></ul>

<figure class="ess-fig"><img src="assets/essentials/preventiva/medidas-saude-coletiva/evolucao-mortalidade-infantil.jpg" alt="Gráfico da evolução da mortalidade infantil no Brasil: 160 óbitos por 1.000 nascidos vivos em 1940 e 12,3 em 2019"><figcaption>Evolução da mortalidade infantil: de 160 óbitos por 1.000 nascidos vivos (1940) para 12,3 (2019).</figcaption></figure>
</section>

<section class="ess-sec">
<h2>Letalidade</h2>
<div class="ess-box ess-alert"><div class="ess-box-tt">Risco do DOENTE morrer ⇒ avalia a gravidade</div><b class="ess-c-purple">Nº de óbitos ÷ nº de doentes</b></div>
<ul>
<li>Raiva → <b>100%</b> de letalidade no Brasil.</li>
<li class="ess-obs">Obs.: <b>virulência</b> é a capacidade de um agente infeccioso de levar a casos graves ou fatais.</li>
</ul>
</section>

<section class="ess-sec">
<h2>Índice de mortalidade = mortalidade proporcional</h2>
<h3 class="ess-h-blue">Índice de mortalidade por idade</h3>
<p><b>Nº de óbitos por idade ÷ total de óbitos</b></p>

<div class="ess-box ess-note"><div class="ess-box-tt">Índice de Swaroop-Uemura</div>
<p>→ Excelente indicador do nível de vida. Quando <b>MAIS ALTO, MELHOR</b>!</p>
<p><mark class="ess-hl3"><b>Nº de óbitos ≥ 50 anos ÷ nº total de óbitos</b></mark></p>
<ul>
<li>Brasil → acima de 80%.</li>
<li>Classificação de 1 (o melhor; porcentagem acima de 75%) a 4 (o pior; porcentagem abaixo de 25%).</li>
</ul></div>

<div class="ess-cols">
<div class="ess-col ess-red"><h4>Tipo 1 → curva em N invertido</h4>
<ul>
<li>Condição de ninguém viver: morrem crianças e jovens, em guerras etc.</li>
<li>Condições <i>muito baixas</i> de saúde. Pior cenário possível.</li>
</ul></div>
<div class="ess-col ess-yellow"><h4>Tipo 2 → curva em L ou J invertido</h4>
<ul>
<li>Pessoas mais frágeis têm maior chance de morrer; se sobreviverem a esse tempo, conseguem viver.</li>
<li>Representa <i>baixas condições</i> de saúde.</li>
</ul></div>
</div>
<div class="ess-cols">
<div class="ess-col ess-blue"><h4>Tipo 3 → curva em U ou V</h4>
<ul><li>Representa <i>regulares condições</i> de saúde.</li></ul></div>
<div class="ess-col ess-green"><h4>Tipo 4 → curva em J</h4>
<ul>
<li><i>Elevadas condições</i> de saúde.</li>
<li>A curva em J corresponde ao Índice de Swaroop-Uemura tipo 1.</li>
</ul></div>
</div>

<figure class="ess-fig"><img src="assets/essentials/preventiva/medidas-saude-coletiva/curvas-mortalidade-proporcional.jpg" alt="Quatro curvas de mortalidade proporcional por grupo etário (Nelson de Moraes): tipo I em N invertido, tipo II em J invertido, tipo III entre V e U, tipo IV em J"><figcaption>Curvas de mortalidade proporcional por grupo etário (curvas de Nelson de Moraes): tipo I, nível de saúde muito baixo; tipo II, baixo; tipo III, regular; tipo IV, elevado.</figcaption></figure>

<details class="ess-tg ess-yellow" open><summary>Mortalidade proporcional por causa</summary>
<ol>
<li>Circulatório</li>
<li>Neoplasia</li>
<li>Respiratório</li>
<li>Externas</li>
</ol>
<p class="ess-obs">Obs.: Brasil em 2020</p>
<ol>
<li>Circulatória</li>
<li>DIP (devido à COVID)</li>
<li>Neoplasias</li>
</ol></details>
</section>

<section class="ess-sec">
<h2>Indicador DALY</h2>
<div class="ess-box ess-tip"><div class="ess-box-tt">DALY (<i>Disability Adjusted Life Years</i>)</div>
<p>Anos potenciais de vida perdidos ajustados por incapacidade → depende da expectativa de vida de cada país.</p>
<ul>
<li><b>Extensão de vida</b> → anos perdidos.
<ul><li>Avalia mortalidade precoce.</li></ul></li>
<li><b>Qualidade de vida</b> → anos vividos com incapacidade.</li>
<li>Quanto <b>maior</b> o DALY, <span class="ess-neg">pior</span> a qualidade de vida naquele país.</li>
</ul>
<p>1 DALY = 1 ano de vida saudável perdido.</p>
<p><b>DALYs = anos de vida perdidos (morte prematura) + anos vividos com incapacidade</b></p></div>
</section>

<section class="ess-sec">
<h2>Como está o Brasil?</h2>

<h3 class="ess-h-green">Transição demográfica</h3>
<ul>
<li>Redução da taxa de fecundidade.
<ul><li>“Ideal” = 2,1.</li><li>Brasil = 1,62.</li></ul></li>
<li>Queda da mortalidade geral.</li>
<li>Aumento da esperança de vida.</li>
<li>Aumento do índice de envelhecimento.
<ul><li>Idosos (≥ 60 anos) ÷ jovens (≤ 15 anos).</li></ul></li>
<li>Estreitamento da base (da pirâmide etária).</li>
<li>Alargamento do ápice.</li>
</ul>

<h3 class="ess-h-green">Transição epidemiológica</h3>
<ul>
<li><b><i>Redução</i></b> das DIP (doenças infecciosas e parasitárias, transmissíveis).</li>
<li><b><i>Aumento</i></b> das doenças crônico-degenerativas e externas ⇒ circulatória &gt; neoplasia &gt; respiratória &gt; causas externas.</li>
</ul>
<div class="ess-box ess-note"><div class="ess-box-tt">Acúmulo epidemiológico</div><b class="ess-c-pink">TRIPLA CARGA DE DOENÇAS</b> ⇒ doenças infecciosas + crônicas + externas.</div>
</section>

<section class="ess-sec">
<h2>Sistemas de informação em saúde</h2>
<details class="ess-tg ess-blue" open><summary>SIM</summary>
<ul><li>Sistema de Informação sobre Mortalidade.</li><li>Alimentado pela declaração de óbito.</li></ul></details>
<details class="ess-tg ess-green" open><summary>SINASC</summary>
<ul><li>Sistema de Informação sobre Nascidos Vivos.</li><li>Alimentado pela declaração de nascidos vivos.</li></ul></details>
<details class="ess-tg ess-red" open><summary>SINAN</summary>
<ul><li>Sistema de Informação sobre Agravos de Notificação.</li><li>Alimentado pela notificação compulsória.</li></ul></details>
<details class="ess-tg ess-yellow" open><summary>SIAB</summary>
<ul><li>Sistema de Atenção Básica.</li><li>Avalia: cadastros de famílias, condições de moradia e saneamento, situação de saúde, produção e composição das equipes de saúde.</li></ul></details>
<details class="ess-tg ess-purple" open><summary>SIH-SUS</summary>
<ul><li>Sistema de Informação Hospitalar.</li><li>Alimentado pela Autorização de Internação Hospitalar (AIH).</li><li>Avalia pagamentos.</li></ul></details>
</section>
`
});
