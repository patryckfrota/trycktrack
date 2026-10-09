(window.TRYCKTRACK_ESSENTIALS_AULAS = window.TRYCKTRACK_ESSENTIALS_AULAS || []).push({
  area: 'preventiva-epidemiologia', order: 3, title: 'Epidemiologia clínica',
  html: `
<section class="ess-sec">
<h2>Testes diagnósticos</h2>
<div class="ess-cols">
<div class="ess-col ess-gray">
<div class="ess-tw"><table class="ess-table">
<thead><tr><th rowspan="2">Teste</th><th colspan="2">Doença</th><th rowspan="2">Total</th></tr><tr><th>Sim</th><th>Não</th></tr></thead>
<tbody>
<tr><th scope="row">Positivo</th><td><b class="ess-c-green">a</b></td><td><b class="ess-c-purple">b</b></td><td>a + b</td></tr>
<tr><th scope="row">Negativo</th><td><b class="ess-c-orange">c</b></td><td><b class="ess-c-orange">d</b></td><td>c + d</td></tr>
<tr><th scope="row">Total</th><td>a + c</td><td>b + d</td><td>a + b + c + d</td></tr>
</tbody></table></div></div>
<div class="ess-col ess-gray">
<ul class="ess-def">
<li><b class="ess-c-green">a</b> → verdadeiro positivo (VP)</li>
<li><b class="ess-c-purple">b</b> → falso positivo (FP)</li>
<li><b class="ess-c-orange">c</b> → falso negativo (FN)</li>
<li><b class="ess-c-orange">d</b> → verdadeiro negativo (VN)</li>
</ul></div>
</div>

<details class="ess-tg ess-blue" open><summary>Qual a proporção de acertos do teste?</summary><ul><li><b><i>Acurácia</i></b></li></ul></details>
<details class="ess-tg ess-purple" open><summary>Qual a proporção de acertos dos <span class="ess-c-purple">doentes</span>?</summary><ul><li><b><i>Sensibilidade</i></b></li></ul></details>
<details class="ess-tg ess-rose" open><summary>Qual a proporção de acertos nos <span class="ess-c-pink">sadios</span>?</summary><ul><li><b><i>Especificidade</i></b></li></ul></details>
<details class="ess-tg ess-gray" open><summary>Qual a proporção de acertos nos testes positivos?</summary><ul><li><b><i>Valor preditivo positivo (VPP)</i></b></li></ul></details>
<details class="ess-tg ess-yellow" open><summary>Qual a proporção de acertos nos testes negativos?</summary><ul><li><b><i>Valor preditivo negativo (VPN)</i></b></li></ul></details>

<h3 class="ess-h-blue">Acurácia</h3>
<div class="ess-box ess-note"><div class="ess-box-tt">Proporção de acertos do teste</div>
<p>Resultados positivos quando a pessoa estava doente e negativos quando a pessoa não estava doente.</p>
<p><b>Acurácia = (a + d) ÷ (a + b + c + d)</b>, ou seja, <b>(VP + VN) ÷ amostra</b>.</p></div>

<h3 class="ess-h-purple">Sensibilidade</h3>
<div class="ess-box ess-note"><div class="ess-box-tt">Detectar verdadeiro positivo nos doentes</div>
<p>⇒ <b>RESULTADO NEGATIVO EXCLUI A DOENÇA!</b></p>
<p>Altamente sensível → <b>evitar falso negativo</b>. Ex.: banco de sangue, doenças letais, triagem.</p>
<p><b>Sensibilidade = a ÷ (a + c)</b>, ou seja, <b>VP ÷ doentes</b>.</p></div>

<h3 class="ess-h-rose">Especificidade</h3>
<div class="ess-box ess-note"><div class="ess-box-tt">Detectar verdadeiro negativo nos não doentes</div>
<p>⇒ <b>RESULTADO POSITIVO CONFIRMA A DOENÇA!</b></p>
<p>Altamente específico → <b>evitar falso positivo</b>. Ex.: situações em que o positivo gera traumatismos: psicológico / iatrogênico.</p>
<p><b>Especificidade = d ÷ (b + d)</b>, ou seja, <b>VN ÷ sadios</b>.</p></div>

<h3 class="ess-h-gray">Valor preditivo positivo (VPP)</h3>
<div class="ess-box ess-note"><div class="ess-box-tt">Acertos nos resultados positivos</div>
<p><b>VPP = a ÷ (a + b)</b>, ou seja, <b>VP ÷ (VP + FP)</b>.</p></div>

<h3 class="ess-h-yellow">Valor preditivo negativo (VPN)</h3>
<div class="ess-box ess-note"><div class="ess-box-tt">Acertos nos resultados negativos</div>
<p><b>VPN = d ÷ (c + d)</b>, ou seja, <b>VN ÷ (FN + VN)</b>.</p></div>

<h3 class="ess-h-green">Verossimilhança</h3>
<div class="ess-box ess-note">
<p><b>Razão de verossimilhança positiva = sensibilidade ÷ (1 − especificidade)</b></p>
<p><b>Razão de verossimilhança negativa = (1 − sensibilidade) ÷ especificidade</b></p></div>
</section>

<section class="ess-sec">
<h2>Exemplo: valor preditivo e prevalência</h2>
<p>Teste com sensibilidade (S) de 90% e especificidade (E) de 90%, aplicado em duas cidades com prevalências diferentes.</p>
<div class="ess-cols">
<div class="ess-col ess-rose"><h4>Cidade A — prevalência de 80%</h4>
<div class="ess-tw"><table class="ess-table">
<thead><tr><th rowspan="2">Teste</th><th colspan="2">Doença</th><th rowspan="2">Total</th></tr><tr><th>Sim</th><th>Não</th></tr></thead>
<tbody>
<tr><th scope="row">Positivo</th><td>7.200</td><td>200</td><td>7.400</td></tr>
<tr><th scope="row">Negativo</th><td>800</td><td>1.800</td><td>2.600</td></tr>
<tr><th scope="row">Total</th><td>8.000</td><td>2.000</td><td>10.000</td></tr>
</tbody></table></div>
<p><b>VPP</b> = a ÷ (a + b) = 7.200 ÷ 7.400 = <b>97%</b></p>
<p><b>VPN</b> = d ÷ (c + d) = 1.800 ÷ 2.600 = <b>69%</b></p></div>
<div class="ess-col ess-blue"><h4>Cidade B — prevalência de 8%</h4>
<div class="ess-tw"><table class="ess-table">
<thead><tr><th rowspan="2">Teste</th><th colspan="2">Doença</th><th rowspan="2">Total</th></tr><tr><th>Sim</th><th>Não</th></tr></thead>
<tbody>
<tr><th scope="row">Positivo</th><td>720</td><td>920</td><td>1.640</td></tr>
<tr><th scope="row">Negativo</th><td>80</td><td>8.280</td><td>8.360</td></tr>
<tr><th scope="row">Total</th><td>800</td><td>9.200</td><td>10.000</td></tr>
</tbody></table></div>
<p><b>VPP</b> = a ÷ (a + b) = 720 ÷ 1.640 = <b>43%</b></p>
<p><b>VPN</b> = d ÷ (c + d) = 8.280 ÷ 8.360 = <b>99%</b></p></div>
</div>

<h3>Conceitos importantes</h3>
<div class="ess-box ess-alert"><div class="ess-box-tt">Sensibilidade e especificidade</div>Do teste → <b>NÃO VARIAM</b> = <b class="ess-c-purple">SÃO CARACTERÍSTICAS INTRÍNSECAS DO TESTE</b>.</div>
<p>O valor preditivo varia com a <b><i>prevalência</i></b>:</p>
<div class="ess-cols">
<div class="ess-col ess-green"><h4>Quanto <b>MAIOR</b> a prevalência</h4>
<ul><li><b>MAIOR</b> o VPP</li><li><b>menor</b> o VPN</li></ul></div>
<div class="ess-col ess-yellow"><h4>Quanto <b>menor</b> a prevalência</h4>
<ul><li><b>menor</b> o VPP</li><li><b>MAIOR</b> o VPN</li></ul></div>
</div>
<div class="ess-box ess-tip"><b>Solicitar os testes nos casos de dúvida diagnóstica.</b></div>

<div class="ess-cols">
<div class="ess-col ess-green"><h4>Quanto <u>MAIS SENSÍVEL</u> o teste</h4>
<ul>
<li><i>Menos</i> falsos <span class="ess-neg">negativos</span> → <b>MAIOR o VPN</b></li>
<li><i>Mais</i> falsos <span class="ess-pos">positivos</span> → <b>menor VPP</b></li>
<li><mark class="ess-hl">AFASTAR A DOENÇA! → alta sensibilidade = TRIAGEM</mark></li>
</ul></div>
<div class="ess-col ess-purple"><h4>Quanto <u>MAIS ESPECÍFICO</u> o teste</h4>
<ul>
<li>Menos falsos positivos → <b>MAIOR VPP</b> ⇒ confirmação diagnóstica</li>
<li>Mais falsos negativos → <b>MENOR VPN</b></li>
<li><mark class="ess-hl3">CONFIRMAR A DOENÇA! → alta especificidade = CONFIRMAÇÃO</mark></li>
</ul></div>
</div>
<div class="ess-box ess-tip"><b>A prevalência NÃO influencia aqui!!!</b></div>

<div class="ess-box ess-note"><div class="ess-box-tt">Associação de testes</div>
<ul>
<li><b>Testes em série</b> ⇒ <i>AUMENTA</i> a <u>especificidade</u> da estratégia.
<ul><li>Mais custo-efetivo.</li></ul></li>
<li><b>Testes em paralelo</b> ⇒ <i>AUMENTA</i> a <u>sensibilidade</u> da estratégia.
<ul><li>Doença com alta letalidade; pessoa que vai perder o acompanhamento médico.</li></ul></li>
</ul></div>
</section>

<section class="ess-sec">
<h2>Eficácia, efetividade e eficiência</h2>
<div class="ess-stack">
<div class="ess-col ess-green"><b><u>Eficácia</u></b> → avaliada quando se controlam todas as condições possíveis de modo a potencializar o efeito do agente estudado → condições ideais / controladas.<br><i>Dica:</i> Efi<b>CÁ</b><b>CIA</b>: queremos a companhia (<b>CIA</b>) perfeita.</div>
<div class="ess-col ess-blue"><b><u>Efetividade</u></b> → avaliada diante de condições reais (não controladas).<br><i>Dica:</i> Efeti<b>VIDA</b>de: <b>VIDA</b> real (imperfeita e impossível de controlar).</div>
<div class="ess-col ess-yellow"><b><u>Eficiência</u></b> → avaliada considerando a relação custo-benefício, ou seja, se é possível alcançar o efeito desejado de modo menos custoso.<br><i>Dica:</i> Efici<b>ÊN</b>cia: considerar o custo b<b>EN</b>efício.</div>
</div>
</section>

<section class="ess-sec">
<h2>Curva ROC</h2>
<ul>
<li><b>1 − especificidade = taxa de falso positivo.</b>
<ul>
<li>Macete: faça uma linha ←————— para a esquerda para interpretar a especificidade.</li>
<li>Quanto mais para a <b class="ess-c-pink"><i>E</i></b>SQUERDA → mais <b class="ess-c-pink"><i>E</i></b>SPECÍFICO.</li>
</ul></li>
<li>Quanto mais <b class="ess-c-pink"><i>S</i></b>UPERIOR → mais <b class="ess-c-pink"><i>S</i></b>ENSÍVEL.</li>
</ul>
<div class="ess-box ess-note"><div class="ess-box-tt">Canto superior esquerdo</div>
<p>Melhor teste possível = <b>MAIOR ACURÁCIA!</b></p>
<ul><li>Maior área sob a curva → mais perto do canto superior esquerdo.</li></ul></div>

<div class="ess-figs">
<figure class="ess-fig"><img src="assets/essentials/preventiva/epidemiologia-clinica/curva-roc-macete.jpg" alt="Curva ROC com pontos A, B e C e as curvas dos exames 1 e 2; sensibilidade no eixo vertical e 1 menos especificidade no horizontal; anotação manuscrita indicando especificidade de 100% à esquerda e 0 à direita"><figcaption>Macetes para a interpretação da curva ROC.</figcaption></figure>
<figure class="ess-fig"><img src="assets/essentials/preventiva/epidemiologia-clinica/curva-roc-grafico.jpg" alt="Gráfico da curva ROC com classificador perfeito no canto superior esquerdo e classificador aleatório na diagonal"><figcaption>Curva ROC: taxa de verdadeiros positivos (sensibilidade) e taxa de falsos positivos (1 − especificidade).</figcaption></figure>
</div>
</section>

<section class="ess-sec">
<h2>Variáveis</h2>
<h3>Natureza</h3>
<div class="ess-cols">
<div class="ess-col ess-blue"><h4>Quantitativas</h4>
<p>Avaliam dado numérico.</p>
<details class="ess-tg ess-blue" open><summary>Contínuas</summary>
<ul><li>Peso, PA → permite fração, vírgula.</li></ul></details>
<details class="ess-tg ess-blue" open><summary>Discretas</summary>
<ul><li>Nº de filhos, FR, FC → só admite números inteiros.</li><li>Anos de escolaridade.</li></ul></details></div>
<div class="ess-col ess-rose"><h4>Qualitativas</h4>
<p>Categóricas.</p>
<details class="ess-tg ess-rose" open><summary>Ordinais</summary>
<ul><li>Faixa etária</li><li>Estadiamento do câncer</li><li>Escolaridade</li></ul></details>
<details class="ess-tg ess-rose" open><summary>Nominais</summary>
<ul>
<li>Sexo</li><li>Cor</li>
<li>Fuma ou não
<ul><li>Qualquer tipo dessa variável que exista apenas <b><i>duas opções</i></b> → variáveis categóricas nominais <b><i>dicotômicas</i></b>.
<ul><li>Sexo biológico, bebe ou não.</li></ul></li></ul></li>
</ul></details></div>
</div>

<h3>Tipo</h3>
<div class="ess-cols">
<div class="ess-col ess-green"><h4>Independente</h4><ul><li>É a própria <b><i>exposição</i></b>.</li></ul></div>
<div class="ess-col ess-yellow"><h4>Dependente</h4><ul><li>Desfecho.</li></ul></div>
</div>
</section>
`
});
