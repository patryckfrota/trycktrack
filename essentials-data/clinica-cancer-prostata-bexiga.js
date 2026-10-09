(window.TRYCKTRACK_ESSENTIALS_AULAS = window.TRYCKTRACK_ESSENTIALS_AULAS || []).push({
  area: 'clinica-nefrologia', order: 8, title: 'Câncer de próstata e câncer de bexiga',
  html: `
<section class="ess-sec">
<h2>Câncer de próstata</h2>
<p class="ess-alias">= adenocarcinoma prostático</p>
<ul><li><b>Tumor maligno mais comum em homens!</b> (exceto pele não melanoma)</li></ul>

<h3>Fisiopatologia</h3>
<details class="ess-tg ess-gray" open><summary>Fatores de risco</summary>
<ul>
<li>Idade avançada.</li>
<li>Negros.</li>
<li>HF.</li>
<li>Obesidade.</li>
<li>Dieta gordurosa, rica em carne vermelha e defumados.</li>
</ul></details>
<details class="ess-tg ess-gray" open><summary>Manifestações clínicas</summary>
<ul>
<li>Maioria assintomático.</li>
<li>Sintomas em casos mais avançados:
<ul><li>Irritativos (incontinência).</li><li>Obstrutivos ou invasivos.</li><li>Dor óssea (metástase).</li></ul></li>
</ul></details>

<h3>Localização</h3>
<ul>
<li><b>Zona periférica.</b></li>
<li>Sinais obstrutivos → doença mais avançada.</li>
</ul>

<h3>Rastreamento</h3>
<ul>
<li>Dividir a decisão com o paciente → não é consensual.</li>
<li>Epidemiologia + INCA = não rotina.</li>
<li>Especialista = realizar.</li>
</ul>
<div class="ess-box ess-note"><div class="ess-box-tt">Pode ser indicado para</div>
<ul><li>≥ 50 anos (expectativa de vida ≥ 10 anos) <i>ou</i></li><li>≥ 45 anos + fatores de risco (HF, negro...)</li></ul></div>
<details class="ess-tg ess-blue" open><summary>Como fazer?</summary>
<p><b>Toque retal + dosagem de PSA</b></p>
<ul>
<li>Estruturas sólidas e consistência endurecida = suspeito.</li>
<li>PSA &gt; 10 ⇒ fala mais a favor de uma doença invasiva e mais grave.</li>
</ul></details>
<details class="ess-tg ess-blue" open><summary>Quando indicar biópsia?</summary>
<ul>
<li>Toque positivo ou PSA &gt; 4 ng/mL (se &lt; 60 anos: PSA &gt; 2,5 ng/mL).</li>
<li>PSA 2,5–4 ng/mL <!-- RESOLVIDO: corrigido para 2,5–4 ng/mL -->
<ul><li><b>Refinamentos do PSA:</b>
<ul><li>Velocidade &gt; 0,75 ng/mL/ano.</li><li>Densidade &gt; 0,15.</li><li>Fração livre &lt; 25%.</li></ul></li></ul></li>
</ul></details>
<figure class="ess-fig"><img src="assets/essentials/clinica-medica/cancer-prostata-bexiga/rastreamento-prostata-fluxograma.jpg" alt="Fluxograma: toque retal suspeito (nódulo, induração) ou PSA ≥ 4 ng/mL (< 60 anos: > 2,5) indicam biópsia por USG transretal"><figcaption>Fluxograma do rastreamento do adenocarcinoma de próstata.</figcaption></figure>

<details class="ess-tg ess-gray" open><summary>Diagnóstico</summary>
<ul><li>Histopatológico → <b>adenocarcinoma (95%)</b>.</li></ul></details>
</section>

<section class="ess-sec">
<h2 class="ess-h-purple">Estadiamento</h2>
<div class="ess-box ess-note"><p><b>PSA + GLEASON + TNM</b></p></div>

<h3>Escore de Gleason</h3>
<ul>
<li>Diferenciação histológica (somar as 2 histologias mais frequentes: x + y) ⇒ grau histológico da biópsia.</li>
<li>Quanto <b>MAIS</b> diferenciado = <b>MAIS</b> perto do tecido da próstata = <b>MENOR RISCO</b>.</li>
</ul>
<figure class="ess-fig"><img src="assets/essentials/clinica-medica/cancer-prostata-bexiga/escore-de-gleason.jpg" alt="Padrões histológicos de Gleason de 1 a 5 e classificação: ≤ 6 diferenciado (baixo risco), 7 intermediário (médio risco), 8–10 indiferenciado (alto risco)"><figcaption>Escore de Gleason: ≤ 6 diferenciado (baixo risco); 7 intermediário (médio risco); 8–10 indiferenciado (alto risco). <!-- RESOLVIDO (mantido): a figura do PDF está cortada ("indiferenciado (ALTO"); "risco" completado apenas na legenda. --></figcaption></figure>

<h3>TNM</h3>
<h4>Estadiamento clínico</h4>
<ul>
<li><b>T:</b> ressonância magnética.</li>
<li><b>N:</b> linfadenectomia pélvica (se Gleason ≥ 8 ou PSA &gt; 10).</li>
<li><b>M:</b> cintilografia óssea (se Gleason ≥ 8 ou PSA &gt; 20).
<ul><li>Metástase <b>óssea</b> → metástases blásticas. <!-- RESOLVIDO: trocado por blásticas --></li></ul></li>
</ul>
</section>

<section class="ess-sec">
<h2 class="ess-h-green">Tratamento do câncer de próstata</h2>
<div class="ess-tw"><table class="ess-table ess-sum">
<thead><tr><th>Doença</th><th>Estratégias</th></tr></thead>
<tbody>
<tr class="ess-r-green"><th scope="row">Localizada</th><td><ul><li>Prostatectomia radical ± linfadenectomia.</li><li>Radioterapia.</li><li>Vigilância ativa (se baixo risco: PSA &lt; 10 + Gleason ≤ 6).</li></ul></td></tr>
<tr class="ess-r-rose"><th scope="row">Metastática</th><td>Terapia de privação androgênica:<ul><li>Cirúrgica: orquiectomia bilateral.</li><li>Química: agonista GnRH (goserelina, leuprolide).</li><li>Resistentes: antiandrogênios, QT (docetaxel).</li></ul></td></tr>
</tbody></table></div>
<ul>
<li><b>Radioterapia</b> → pacientes em que existe o risco cirúrgico proibitivo.</li>
</ul>
<details class="ess-tg ess-purple" open><summary><b>Vigilância ativa</b> → intervenção agressiva só se alteração nos padrões</summary>
<ul>
<li>Pacientes com doença de baixo risco; idosos etc → as complicações da cirurgia podem ser piores.</li>
<li>Seguimento com exames periódicos.</li>
</ul></details>
<ul>
<li>QT: não responde muito bem.</li>
<li>Castração química → agonista GnRH; castração cirúrgica → orquiectomia bilateral.</li>
</ul>
<figure class="ess-fig ess-wide"><img src="assets/essentials/clinica-medica/cancer-prostata-bexiga/conduta-cancer-prostata-fluxograma.jpg" alt="Fluxograma da conduta no câncer de próstata: muito baixo risco e baixo risco (vigilância ativa, radioterapia ou prostatectomia radical); risco acima do baixo (radioterapia + hormonioterapia ou prostatectomia radical + linfadenectomia); metástase linfonodal (radioterapia + hormonioterapia, preferencialmente, ou prostatectomia radical + linfadenectomia + hormonioterapia em pacientes jovens); metástase à distância M1 (hormonioterapia ± quimioterapia citotóxica)"><figcaption>Fluxograma da conduta no câncer de próstata de acordo com o risco e o estadiamento.</figcaption></figure>
</section>

<section class="ess-sec">
<h2 class="ess-h-rose">Câncer de bexiga</h2>
<p class="ess-alias">= célula transicional → tipo histológico</p>
<div class="ess-cols">
<div class="ess-col ess-red"><strong>Fatores de risco</strong>
<ul>
<li>Idade &gt; 40 anos.</li>
<li>Brancos.</li>
<li>Irradiação pélvica.</li>
<li>Exposição no trabalho → hidrocarbonetos (frentista, pintor, petroquímica).</li>
<li>Drogas → ciclofosfamida.</li>
<li><b>TABAGISMO</b></li>
</ul></div>
<div class="ess-col ess-rose"><strong>Quando suspeitar</strong>
<ul><li><mark class="ess-hl"><b>Homem &gt; 40 anos + hematúria macro indolor = INVESTIGAR</b></mark></li></ul></div>
</div>
<div class="ess-cols">
<div class="ess-col ess-gray"><strong>Diagnóstico</strong>
<ul>
<li><b>TC de vias urinárias + cistoscopia com biópsia</b>
<ul>
<li>Em alguns casos a TC não observa as lesões → pode avaliar a extensão do tumor.</li>
<li>Pode fazer citologia urinária antes → mas, se negativo, não afasta o diagnóstico!</li>
</ul></li>
</ul></div>
<div class="ess-col ess-gray"><strong>Tratamento</strong>
<details class="ess-tg ess-gray" open><summary>Maioria é PAPILAR → superficial (não pega a camada muscular) → cura, mas apresenta uma maior chance de recidiva</summary>
<ul><li><mark class="ess-hl"><b>Ressecção transuretral da bexiga ± terapia local (BCG — imunomodulador) + acompanhamento</b></mark></li></ul></details>
<details class="ess-tg ess-gray" open><summary><span class="ess-neg"><b>INVASIVO</b></span> <b>(muscular própria → T2)</b> → aumenta o risco de disseminação</summary>
<ul><li><mark class="ess-hl"><b>Cistectomia radical + quimioterapia neoadjuvante (pré-operatória) + quimioterapia adjuvante</b></mark></li></ul></details>
<details class="ess-tg ess-gray" open><summary><b>Metástase</b></summary>
<ul><li>Quimioterapia isolada + avaliar ressecção → não tem proposta curativa.</li></ul></details></div>
</div>
</section>
`
});
