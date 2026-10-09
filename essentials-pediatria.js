// Essentials — Pediatria. Cada área é um card; cada aula da apostila é um
// capítulo dentro dela. O HTML usa as classes .ess-* (app.css), não o
// leitor do Rapid Review. Imagens em assets/essentials/pediatria/ são
// provisórias — trocar antes de lançar.
window.TRYCKTRACK_ESSENTIALS = (window.TRYCKTRACK_ESSENTIALS || []).concat([
{
  id: 'pediatria-neonatologia',
  apostila: 'Pediatria',
  area: 'Neonatologia',
  desc: 'Reanimação, classificação do RN, triagens, distúrbios respiratórios, metabólicos e genéticos.',
  aulas: [
  {
    order: 1,
    title: 'Neonatologia I — Introdução e reanimação neonatal',
    html: `
<section class="ess-sec">
<h2>Reanimação neonatal</h2>

<h3>Preparo da assistência</h3>
<details class="ess-tg ess-green" open><summary>Temperatura da sala de parto</summary>
<ul><li>Manter a sala entre <mark class="ess-hl">23 e 25 °C</mark>, com o objetivo de normotermia no RN: 36,5–37,5 °C.</li></ul>
</details>

<h3>Três perguntas antes de começar</h3>
<ol>
<li><mark class="ess-hl">A gestação tem 34 semanas ou mais?</mark></li>
<li>O RN está respirando ou chorando?</li>
<li>O tônus muscular está em flexão?</li>
</ol>

<h3>Clampeamento do cordão</h3>
<h4>Gestação ≥ 34 semanas</h4>
<div class="ess-cols">
<div class="ess-col ess-green"><strong><span class="ess-pos">Com</span> boa vitalidade</strong>
<ul><li>Clampear após, no mínimo, <mark class="ess-hl">60 segundos</mark>, com o RN no colo da mãe.</li></ul></div>
<div class="ess-col ess-red"><strong><span class="ess-neg">Sem</span> boa vitalidade</strong>
<ul><li><mark class="ess-hl">Estímulo tátil no dorso</mark></li><li>Clampeamento imediato</li><li>Levar à mesa de reanimação</li></ul></div>
</div>
<h4>Gestação &lt; 34 semanas</h4>
<div class="ess-cols">
<div class="ess-col ess-green"><strong>Com boa vitalidade</strong>
<ul><li>Clampear após, no mínimo, 30 segundos</li><li>Levar à mesa de reanimação</li></ul></div>
<div class="ess-col ess-red"><strong>Sem boa vitalidade</strong>
<ul><li><mark class="ess-hl">Estímulo tátil no dorso</mark></li><li>Clampeamento imediato</li><li>Levar à mesa de reanimação</li></ul></div>
</div>
<p class="ess-obs"><b>Obs.:</b> o clampeamento tardio traz benefícios hematológicos entre o 3º e o 6º mês de vida, embora aumente a necessidade de fototerapia por hiperbilirrubinemia indireta na primeira semana. O clampeamento também eleva a resistência vascular sistêmica.</p>
<div class="ess-box ess-note"><div class="ess-box-tt">Observações</div>
<ul>
<li>A ordenha do cordão <span class="ess-neg">não</span> é recomendada.</li>
<li>Situações especiais:
<ul>
<li><b>HIV</b> → <span class="ess-key">clampeamento imediato</span> (recomendação do Ministério da Saúde). A OMS admite aguardar o clampeamento quando há possível infecção perinatal pelo HIV.</li>
<li><b>DPP</b> (comprometimento da circulação placentária) → <span class="ess-neg">não</span> há definição clara de quanto tempo esperar para clampear.</li>
</ul></li>
</ul></div>

<h3>Passos iniciais</h3>
<div class="ess-cols">
<div class="ess-col ess-gray"><h4>≥ 34 semanas</h4>
<ol class="ess-steps">
<li><b><i>A</i>quecer</b> — fonte de calor radiante.</li>
<li><b><i>S</i>ecar</b> — corpo e fontanela, retirando os campos úmidos.</li>
<li><b><i>P</i>osicionar</b> — a cabeça.</li>
<li><b><i>A</i>spirar, se houver obstrução</b> — vias aéreas, primeiro a boca e depois as narinas. Mesmo com mecônio não é necessário aspirar; só se a secreção causar obstrução, e nesse caso pode ser preciso aspirar a traqueia.</li>
</ol></div>
<div class="ess-col ess-gray"><h4>&lt; 34 semanas</h4>
<ol class="ess-steps">
<li><b>Aquecer</b> — fonte de calor radiante.</li>
<li><b>Saco</b> — <mark class="ess-hl">saco plástico e touca dupla</mark>.</li>
<li><b>Posicionar</b> — a cabeça, com um coxim sob os ombros.</li>
<li><b>Aspirar, se houver obstrução</b> — boca e depois narinas; o mesmo vale diante de mecônio.</li>
<li><mark class="ess-hl">Acrescentar oxímetro de pulso e monitor cardíaco.</mark></li>
</ol></div>
</div>

<h3>Avaliação após os passos iniciais</h3>
<ul>
<li>Ausculta e palpação do cordão subestimam a FC.</li>
<li>Na prática: após os passos iniciais, ausculta por 6 segundos; em seguida, monitor cardíaco.</li>
</ul>

<h3>Ventilação com pressão positiva (VPP)</h3>
<details class="ess-tg ess-gray" open><summary>Quando começar</summary>
<ul><li>FC &lt; 100 bpm, ou</li><li>apneia ou <i>gasping</i>.</li></ul></details>
<ul>
<li>É a intervenção mais importante da reanimação.</li>
<li>Aplicar por 30 segundos e reavaliar.</li>
<li>Deve começar no primeiro minuto de vida → <b><i>Minuto de Ouro</i></b>.</li>
</ul>

<h4>≥ 34 semanas</h4>
<ul>
<li>Balão autoinflável (ambu) ou ventilador mecânico manual (VMM) com peça em T.</li>
<li>Começar em <b>ar ambiente</b> (<b>21%</b> de O₂) com máscara facial.</li>
<li><mark class="ess-hl">A máscara laríngea é opção se a VPP falhar.</mark></li>
<li>Frequência de 40–60 movimentos/min.</li>
</ul>

<h4>&lt; 34 semanas</h4>
<ul><li>Usar o VMM com peça em T.</li></ul>
<details class="ess-tg ess-gray" open><summary>Vantagens da peça em T</summary>
<ul>
<li>Pressão inspiratória bem definida (Pinsp).</li>
<li>Mantém pressão positiva no final da expiração (PEEP).</li>
<li>Permite concentrações intermediárias de oxigênio (FiO₂).</li>
<li>Permite aplicar CPAP: pressão positiva contínua ao final da expiração, mantida pela oclusão contínua da máscara.</li>
</ul></details>
<p class="ess-obs">Ritmo para lembrar: <i>“oclui, solta, solta”</i>.</p>
<div class="ess-figs">
<figure class="ess-fig"><img src="assets/essentials/pediatria/neonatologia-1/vent-manual.jpg" alt="Ventilador mecânico manual com peça em T"><figcaption>Ventilador mecânico manual.</figcaption></figure>
<figure class="ess-fig"><img src="assets/essentials/pediatria/neonatologia-1/vent-manual-tecnica.jpg" alt="Técnica de uso do ventilador mecânico manual em boneco"><figcaption>Técnica de uso do ventilador mecânico manual.</figcaption></figure>
</div>
<ul>
<li>Iniciar com <b>FiO₂ de 30%</b>.</li>
<li>A máscara laríngea <span class="ess-neg">NÃO é opção</span> nesse grupo.</li>
</ul>
<div class="ess-box ess-alert"><div class="ess-box-tt">Lembrar</div><b>Avalie e corrija a técnica!</b></div>

<details class="ess-tg ess-yellow" open><summary>CPAP na sala de parto</summary>
<ul>
<li>Indicado se a FC é ≥ 100 bpm e há respiração espontânea, mas com <i>desconforto respiratório e/ou saturação baixa</i>.
<ul><li>Pode ser usado em qualquer idade gestacional.</li><li>Com ≤ 34 semanas, ficar atento ao pneumotórax.</li></ul></li>
</ul></details>

<h3>Intubação traqueal</h3>
<ul>
<li>Indicada quando a ventilação por máscara não é efetiva ou se prolonga.</li>
<li>Com ≥ 34 semanas, pode-se considerar a máscara laríngea.</li>
</ul>

<h3>Massagem cardíaca externa</h3>
<ul>
<li>Só começa depois que a ventilação estiver bem estabelecida.</li>
<li>Indicação: FC &lt; 60 bpm após 30 s de ventilação por cânula (FiO₂ &gt; 60%).</li>
<li>Técnica dos 2 polegares, no terço inferior do esterno.
<br><span class="ess-obs">Obs.: o cateterismo da veia umbilical é o motivo de as compressões serem feitas por quem está posicionado <i>atrás</i> da cabeça do RN.</span></li>
<li>Relação <b>3 compressões : 1 ventilação</b> → 90 compressões e 30 ventilações por minuto.</li>
<li>Após 60 segundos, conferir a técnica antes de passar à etapa seguinte.</li>
</ul>

<h3>Drogas</h3>
<ul>
<li>Indicação: FC &lt; 60 bpm após 60 s de massagem e ventilação por cânula.</li>
<li><b>Adrenalina:</b> <mark class="ess-hl">0,01–0,03 mg/kg</mark>, a cada 3–5 minutos.</li>
<li><b>Expansor de volume:</b> <mark class="ess-hl">SF 0,9%, 10 mL/kg em 5–10 min</mark>, diante de palidez ou evidência de choque (FC &lt; 60, perfusão periférica lentificada, pulsos periféricos de baixa amplitude, palidez cutânea).
<ul><li>Causa clássica de perda de volume: descolamento prematuro de placenta.</li></ul></li>
</ul>

<h3>Acesso vascular</h3>
<details class="ess-tg ess-gray" open><summary>Preferência (1ª opção)</summary>
<ul><li>Cateterismo venoso umbilical.</li></ul></details>
<ul>
<li class="ess-hlrow"><mark class="ess-hl">O acesso intraósseo é opção em qualquer faixa etária.</mark>
<ul><li class="ess-hlrow"><mark class="ess-hl">Abaixo de 34 semanas, os riscos são maiores.</mark></li></ul></li>
</ul>

<h3>Fluxogramas</h3>
<div class="ess-figs">
<figure class="ess-fig ess-wide"><img src="assets/essentials/pediatria/neonatologia-1/fluxo-rn-ge34.jpg" alt="Fluxograma de reanimação neonatal do RN com 34 semanas ou mais"><figcaption>Reanimação neonatal do RN ≥ 34 semanas. Diretrizes SBP, 2022.</figcaption></figure>
<figure class="ess-fig ess-wide"><img src="assets/essentials/pediatria/neonatologia-1/fluxo-rn-lt34.jpg" alt="Fluxograma de reanimação neonatal do RN com menos de 34 semanas"><figcaption>Reanimação neonatal do RN &lt; 34 semanas. Diretrizes SBP, 2022.</figcaption></figure>
</div>

<h3>Situações especiais</h3>
<details class="ess-tg ess-red" open><summary>Líquido amniótico meconial</summary>
<ul>
<li>Mecônio + RN vigoroso + ≥ 34 semanas → fica no colo da mãe.</li>
<li>Mecônio + (&lt; 34 semanas <b>OU</b> respiração irregular <b>OU</b> tônus inadequado) → mesa de reanimação.
<ul><li>Aspirar as vias aéreas superiores.</li><li>Se não houver melhora após 30 s de VPP, aspirar hipofaringe e traqueia.</li></ul></li>
</ul></details>
<details class="ess-tg ess-red" open><summary>Hérnia diafragmática congênita</summary>
<ul>
<li>Não ventilar com máscara facial.</li>
<li>Intubação traqueal para iniciar a VPP.</li>
<li>Exame físico: abdome escavado.</li>
</ul></details>
</section>

<section class="ess-sec">
<h2>Boletim de Apgar</h2>
<ul>
<li>Escore baixo → asfixia neonatal.</li>
<li>Avaliado no 1º e no 5º minuto de vida.
<ul><li>Sempre que a pontuação for &lt; 6, recalcular de 5 em 5 minutos até 20 min (10, 15 e 20).</li></ul></li>
</ul>
<div class="ess-tw"><table class="ess-table">
<thead><tr><th>Sinal</th><th>0</th><th>1</th><th>2</th></tr></thead>
<tbody>
<tr><th scope="row">Respiração</th><td>Ausente</td><td>Irregular</td><td>Regular</td></tr>
<tr><th scope="row">Frequência cardíaca</th><td>Ausente</td><td>&lt; 100 bpm</td><td>&gt; 100 bpm</td></tr>
<tr><th scope="row">Tônus muscular</th><td>Flacidez total</td><td>Alguma flexão</td><td>Movimentos ativos</td></tr>
<tr><th scope="row">Irritabilidade reflexa</th><td>Ausente</td><td>Alguma reação</td><td>Espirros</td></tr>
<tr><th scope="row">Cor</th><td>Cianose / palidez</td><td>Cianose de extremidades</td><td>Róseo</td></tr>
</tbody></table></div>
<div class="ess-box ess-note"><div class="ess-box-tt">Cuidados de rotina</div>
<ul>
<li><b>Prevenção da oftalmia gonocócica:</b> eritromicina 0,5%, tetraciclina 1% ou nitrato de prata 1%.</li>
<li><b>Vitamina K:</b> 1 mg IM ou SC, para prevenir a doença hemorrágica do RN.</li>
</ul></div>
</section>

<section class="ess-sec">
<h2>Classificação do RN</h2>

<h3>Por idade gestacional</h3>
<details class="ess-tg ess-gray" open><summary>Pré-termo: &lt; 37 semanas</summary>
<ul>
<li><b>Tardio:</b> 34 a 36 semanas e 6 dias</li>
<li><b>Moderado:</b> 32 a 33 semanas e 6 dias</li>
<li><b>Muito pré-termo:</b> 28 a 31 semanas e 6 dias</li>
<li><b>Extremo:</b> &lt; 28 semanas</li>
<li class="ess-obs">Para lembrar: 34 semanas marca a maturidade pulmonar.</li>
</ul></details>
<details class="ess-tg ess-gray" open><summary>A termo</summary><ul><li>37 semanas a 41 semanas e 6 dias.</li></ul></details>
<details class="ess-tg ess-gray" open><summary>Pós-termo</summary><ul><li>≥ 42 semanas.</li></ul></details>

<h3>Por peso ao nascer</h3>
<div class="ess-tw"><table class="ess-table">
<thead><tr><th>Categoria</th><th>Faixa de peso</th></tr></thead>
<tbody>
<tr><td>Extremo baixo peso</td><td>&lt; 1.000 g</td></tr>
<tr><td>Muito baixo peso</td><td>≥ 1.000 g e ≤ 1.500 g</td></tr>
<tr><td>Baixo peso</td><td>&gt; 1.500 g e ≤ 2.500 g</td></tr>
</tbody></table></div>

<h3>Peso × idade gestacional</h3>
<p>Avaliado nas curvas de crescimento:</p>
<ul class="ess-def">
<li><b class="ess-c-orange">GIG</b> (grande para a IG): <b class="ess-c-orange">acima do percentil 90</b>. Pode refletir alterações da vida intrauterina — por exemplo, diabetes gestacional, com aumento da insulina fetal. O RN pode ter hipoglicemia: logo após o nascimento ainda tem muita insulina, mas deixa de receber glicose de repente.</li>
<li><b class="ess-c-green">AIG</b> (adequado para a IG): <b class="ess-c-green">entre os percentis 10 e 90</b>.</li>
<li><b class="ess-c-purple">PIG</b> (pequeno para a IG): <b class="ess-c-purple">abaixo do percentil 10</b>. Exemplo: sofrimento fetal crônico (feto de mulher hipertensa, insuficiência placentária etc.).</li>
</ul>
<figure class="ess-fig"><img src="assets/essentials/pediatria/neonatologia-1/peso-ig.jpg" alt="Curva de peso por idade gestacional com as faixas GIG, AIG e PIG"><figcaption>Peso × idade gestacional.</figcaption></figure>
<div class="ess-box ess-alert"><div class="ess-box-tt">Lembrar</div>RN com ≥ 37 semanas e peso &lt; 2.000 g ⇒ <b>PIG</b>.</div>

<div class="ess-cols">
<div class="ess-col ess-blue"><h4>CIUR simétrico</h4>
<ul>
<li>A doença atinge o feto desde o <i>início</i> da gravidez.</li>
<li>O fator patogênico está ligado ao concepto: síndromes genéticas, exposição a radiação e drogas, malformações, infecções congênitas.</li>
<li>Cresce pouco, mas de forma <b>proporcional</b> (peso, comprimento e PC &lt; p10).</li>
</ul></div>
<div class="ess-col ess-yellow"><h4>CIUR assimétrico</h4>
<ul>
<li>Fica mais evidente a partir do <i>3º trimestre</i>.</li>
<li>Restrição <b>desproporcional</b> do crescimento.</li>
<li>Ligado a doenças maternas que causam insuficiência placentária: cardiopatias, nefropatias, pneumopatias, hipertensão, colagenoses, diabetes, tabagismo e uso de cocaína.</li>
</ul></div>
</div>
</section>

<section class="ess-sec">
<h2>Triagem neonatal</h2>

<h3>Triagem metabólica</h3>
<p>Teste do pezinho (teste neonatal biológico): permite diagnóstico precoce e tratamento antes de os sintomas aparecerem.</p>
<ul><li>Coleta no <b class="ess-c-pink">3º ao 5º dia</b> de vida (é possível até 30 dias).</li></ul>
<details class="ess-tg ess-yellow" open><summary>Doenças rastreadas (8)</summary>
<ul class="ess-def">
<li><b>Toxoplasmose congênita</b></li>
<li><b>Hipotireoidismo congênito</b> → dosagem de TSH (elevado).
<br><i>Clínica:</i> icterícia, sucção débil ao seio, hipotonia, membros estendidos e reflexos primitivos diminuídos.</li>
<li><b>Fenilcetonúria</b> → erro inato do metabolismo da fenilalanina.
<br><i>Clínica:</i> atraso do desenvolvimento neuropsicomotor, deficiência mental, convulsões, odor característico na urina etc.</li>
<li><b>Hemoglobinopatias</b> → anemia falciforme (é diagnóstica; não é preciso repetir outros exames) → padrão HbFS.</li>
<li><b>Fibrose cística</b> → dosagem de IRT (tripsina imunorreativa).
<br>Teste confirmatório: dosagem de cloretos no suor.</li>
<li><b>Hiperplasia adrenal congênita</b> → dosagem de 17-OH-progesterona.</li>
<li><b>Deficiência da biotinidase</b>
<br><i>Clínica:</i> distúrbios neurológicos e cutâneos → alopecia, dermatite, hipotonia, microcefalia.</li>
<li><b>Homocistinúria clássica</b> <span class="ess-tag">atualização</span> → erro inato do metabolismo.
<br><i>Clínica:</i> fenômenos tromboembólicos, osteoporose, retardo do crescimento e alterações oculares (ex.: luxação do cristalino).
<br><i>Tratamento:</i> ácido fólico e piridoxina (vitamina B6). <!-- RESOLVIDO: pirimetamina para piridoxina (vitamina B6) -->
<br>Os municípios têm até 180 dias para implementar → homologado em 12/05/23.</li>
</ul></details>
<p class="ess-obs">Coleta nos primeiros 2 dias de vida:</p>
<ul>
<li><b>Falso-positivo</b> → hipotireoidismo (elevação transitória do TSH pelo estresse do parto).</li>
<li><b>Falso-negativo</b> → fenilcetonúria (a criança precisa receber proteína para acumular fenilalanina, e isso leva um tempo).</li>
</ul>
<div class="ess-box ess-tip"><div class="ess-box-tt">Atualização</div>
<p>A lei de 2021, em vigor desde maio, acrescentou 5 etapas de doenças ao teste:</p>
<ol>
<li><b>Etapa 1:</b> toxoplasmose congênita</li>
<li><b>Etapa 2:</b> galactosemias, aminoacidopatias, distúrbios do ciclo da ureia e distúrbios da betaoxidação dos ácidos graxos</li>
<li><b>Etapa 3:</b> doenças lisossômicas</li>
<li><b>Etapa 4:</b> imunodeficiências primárias</li>
<li><b>Etapa 5:</b> atrofia muscular espinhal</li>
</ol></div>

<h3>Oximetria de pulso — “teste do coraçãozinho”</h3>
<ul>
<li>Realizado antes da alta hospitalar.</li>
<li>Busca <b>cardiopatias congênitas críticas</b>: evoluem com deterioração grave e podem levar ao óbito após o fechamento do canal arterial.
<ul>
<li>Cardiopatia canal-dependente — exemplo no canal arterial: coarctação da aorta (diferença entre a saturação pré-ductal e a pós-ductal ⇒ <i>shunt</i>).</li>
<li>Também: transposição de grandes vasos, coarctação grave da aorta, atresia da artéria pulmonar etc.</li>
</ul></li>
<li>Indicado em RN &gt; 34 semanas, entre 24 e 48 horas de vida.</li>
<li>Mede-se a SatO₂ no membro superior direito (MSD) e em um membro inferior (MI), qualquer um.
<ul><li>Saturação pré-ductal: membro superior direito.</li><li>Saturação pós-ductal: um dos membros inferiores.</li></ul></li>
</ul>
<h4>Conduta do Ministério da Saúde</h4>
<div class="ess-stack">
<div class="ess-col ess-green"><b>Normal</b><br>≥ 95% e diferença entre as saturações &lt; 3%.</div>
<div class="ess-col ess-yellow"><b>Alterado</b><br>Repetir em 1 hora.</div>
<div class="ess-col ess-red"><b>Alteração persiste</b><br>Ecodoppler em até 24 horas.</div>
</div>
<figure class="ess-fig ess-wide"><img src="assets/essentials/pediatria/neonatologia-1/fluxo-cch-ms.jpg" alt="Fluxograma do Ministério da Saúde para triagem de cardiopatia congênita crítica"><figcaption>Fluxograma do Ministério da Saúde.</figcaption></figure>
<h4>Conduta da SBP (2022)</h4>
<figure class="ess-fig ess-wide"><img src="assets/essentials/pediatria/neonatologia-1/fluxo-cch-sbp.jpg" alt="Fluxograma da SBP 2022 para o teste do coraçãozinho"><figcaption>Sistematização do atendimento ao RN com suspeita ou diagnóstico de cardiopatia congênita. Diretrizes SBP, 2022.</figcaption></figure>

<h3>Reflexo vermelho — “teste do olhinho”</h3>
<ul>
<li>Feito ainda na maternidade, com oftalmoscópio, avaliando as duas pupilas ao mesmo tempo.</li>
<li><b>Normal:</b> reflexo vermelho bilateral e simétrico — mostra que os meios oculares transparentes estão íntegros.</li>
<li>Alterado, por exemplo na catarata congênita: um olho com reflexo vermelho e o outro com reflexo pupilar branco (<b>leucocoria</b>).</li>
</ul>
<div class="ess-tw"><table class="ess-table">
<thead><tr><th>Causa de alteração</th><th>Achado</th></tr></thead>
<tbody>
<tr><td>Catarata congênita</td><td>Leucocoria</td></tr>
<tr><td>Retinoblastoma</td><td>Leucocoria</td></tr>
<tr><td>Persistência do vítreo primário hiperplásico</td><td>Leucocoria</td></tr>
<tr><td>Glaucoma</td><td>Não causa leucocoria</td></tr>
<tr><td>Rubéola congênita</td><td>Opacidade no olho. Diante de suspeita de infecção congênita e mãe sem sorologias, pensar em rubéola.</td></tr>
<tr><td>Hemorragia vítrea</td><td>—</td></tr>
<tr><td>Descolamento de retina</td><td>—</td></tr>
</tbody></table></div>
<figure class="ess-fig"><img src="assets/essentials/pediatria/neonatologia-1/reflexo-vermelho.jpg" alt="Reflexo vermelho bilateral normal e leucocoria no olho esquerdo"><figcaption>Reflexo vermelho bilateral normal × leucocoria no olho esquerdo.</figcaption></figure>
<ul>
<li>Se houver alteração, encaminhar ao oftalmologista.</li>
<li>O teste também é feito no acompanhamento de puericultura → detecta retinoblastoma.</li>
</ul>

<h3>Triagem auditiva — “teste da orelhinha”</h3>
<ul>
<li>Pesquisa de emissões otoacústicas (pré-neural) → <b>EOA</b>.</li>
<li>Surdez neurossensorial não é captada por esse exame → indicar <b>BERA</b> (para RN com fatores de risco para surdez ou que falham mais de uma vez no EOA).</li>
<li>Se falhar no teste → repetir.
<ul><li>Se a resposta continuar insatisfatória → potencial evocado auditivo de tronco encefálico (<b>PEATE</b>).</li></ul></li>
<li>A eficácia está comprovada até os 28 dias de vida.</li>
</ul>

<h3>Triagem do frênulo lingual — “teste da linguinha”</h3>
<ul>
<li>Avalia anquiloglossia → conduta: frenectomia.</li>
<li>Frênulo lingual muito curto pode atrapalhar a amamentação.</li>
<li>Avaliação feita por fonoaudiólogos.</li>
</ul>
</section>

<section class="ess-sec">
<h2>Distúrbios respiratórios do RN</h2>
<div class="ess-cols">
<div class="ess-col ess-red"><strong>Causas <span class="ess-neg">não respiratórias</span></strong>
<ul><li>Cardiopatias congênitas</li><li>Doenças neurológicas</li><li>Policitemia</li><li>Anemia</li><li>Hipoglicemia</li></ul></div>
<div class="ess-col ess-blue"><strong>Causas respiratórias</strong>
<ul><li>Síndrome do desconforto respiratório</li><li>Pneumonia / sepse neonatal</li><li>Taquipneia transitória do RN</li><li>Síndrome de aspiração meconial</li></ul></div>
</div>

<h3 class="ess-h-blue">Síndrome do desconforto respiratório (SDR)</h3>
<p class="ess-alias">Também chamada de doença da membrana hialina (DMH).</p>
<h4>Etiopatogenia</h4>
<ul>
<li>Menos surfactante alveolar → <b>instabilidade alveolar</b> → <b>redução da complacência pulmonar</b>.</li>
<li>Surfactante: mistura de lipídeos e proteínas; a produção começa por volta de 20 semanas e, com 34 semanas, já há quantidade suficiente para manter os alvéolos abertos.
<ul><li>Reduz a tensão superficial na interface líquido-ar dentro do alvéolo.</li><li>Na DMH ocorre colapso alveolar.</li></ul></li>
</ul>
<div class="ess-box ess-note"><b>Colapso alveolar → hipoxemia → hipercapnia</b> (hipoventilação: o RN não consegue eliminar o CO₂).</div>

<details class="ess-tg ess-red" open><summary>Fatores de risco</summary>
<ul>
<li><mark class="ess-hl"><b>Prematuridade</b></mark></li>
<li>Sexo masculino</li>
<li>Asfixia</li>
<li><b>Diabetes gestacional</b> — risco mesmo com &gt; 34 semanas (pré-termo tardio).
<ul>
<li>A <b>insulina</b> <span class="ess-neg">atrasa</span> a maturação pulmonar e prejudica a produção de surfactante.</li>
<li>O <b>cortisol</b> acelera a maturação pulmonar (ex.: PIG + doença hipertensiva crônica = estresse fetal crônico → liberação de cortisol → ajuda na maturação).</li>
</ul></li>
<li><b>Gemelaridade</b>
<ul><li>Maior chance de prematuridade.</li><li>O segundo gemelar tem mais risco de asfixia → mais risco de SDR.</li></ul></li>
</ul></details>

<details class="ess-tg ess-gray" open><summary>Clínica</summary>
<ul>
<li>Sinais de desconforto respiratório <i>precoces</i>, com taquipneia.</li>
<li>Começam logo após o nascimento e pioram conforme os alvéolos atelectasiam (1–2 dias).
<ul><li>A partir do 3º dia há melhora clínica, com a produção de surfactante.</li></ul></li>
</ul></details>

<details class="ess-tg ess-gray" open><summary>Radiografia</summary>
<ul>
<li><mark class="ess-hl"><b>Infiltrado reticulogranular difuso</b></mark> (com aerobroncograma: o ar dentro da árvore brônquica contrasta com áreas de alvéolos atelectasiados ou com conteúdo proteináceo).
<ul><li><mark class="ess-hl2"><b>Padrão moído ou em vidro fosco</b></mark></li><li>Áreas de atelectasia + alvéolos insuflados.</li></ul></li>
<li>Volume pulmonar diminuído.</li>
<li>As alterações aparecem nas primeiras horas.</li>
</ul></details>
<figure class="ess-fig"><img src="assets/essentials/pediatria/neonatologia-1/rx-sdr.jpg" alt="Radiografia de tórax com padrão de vidro fosco e broncogramas aéreos"><figcaption>Radiografia de tórax: vidro fosco e broncogramas aéreos.</figcaption></figure>

<h4>Tratamento</h4>
<div class="ess-cols ess-cols3">
<div class="ess-col ess-gray"><b>Oxigênio por capacete (<i>hood</i>)</b>
<ul><li>Não muda a história natural da doença → ocorre deterioração clínica.</li></ul>
<figure class="ess-fig"><img src="assets/essentials/pediatria/neonatologia-1/hood.jpg" alt="RN em oxigenioterapia por capacete"><figcaption>Oxigenoterapia por <i>hood</i>.</figcaption></figure>
<b>Surfactante exógeno</b></div>
<div class="ess-col ess-green"><b>CPAP nasal!</b>
<ul><li>Estabiliza os alvéolos.</li><li>Modifica a história natural da doença.</li></ul>
<figure class="ess-fig"><img src="assets/essentials/pediatria/neonatologia-1/cpap-nasal.jpg" alt="RN em CPAP nasal"><figcaption>CPAP nasal em RN.</figcaption></figure>
<b>Ventilação mecânica</b>
<ul><li>O RN sempre receberá o surfactante exógeno pela cânula traqueal!</li></ul></div>
<div class="ess-col ess-gray">
<figure class="ess-fig"><img src="assets/essentials/pediatria/neonatologia-1/cpap-esquema.jpg" alt="Esquema de funcionamento do CPAP nasal"><figcaption>Esquema do CPAP nasal.</figcaption></figure>
<b>Antibióticos</b>
<ul><li>É difícil diferenciar de pneumonia → considerar os fatores de risco para infecção.</li></ul></div>
</div>

<details class="ess-tg ess-green" open><summary>Prevenção</summary>
<ul>
<li><b>Corticoide antenatal</b> — acelera a maturação do pulmão fetal.</li>
<li>Assistência neonatal adequada ao RN.</li>
<li>Evitar a prematuridade.</li>
</ul></details>

<h3 class="ess-h-rose">Pneumonia / sepse neonatal</h3>
<h4>Mecanismos</h4>
<div class="ess-cols">
<div class="ess-col ess-rose"><strong>Precoce</strong>
<ul>
<li>Nas primeiras 48–72 h (a sepse por GBS ocorre nos primeiros 7 dias).</li>
<li><b>Ascendente</b> — contaminação dentro do útero.</li>
<li><b>Intraparto</b> — o RN aspira a bactéria na passagem pelo canal de parto.</li>
<li>Etiologia:
<ul>
<li><b>Estreptococo do grupo B</b> (<i>S. agalactiae</i>)</li>
<li><b>Gram-negativos entéricos</b> → <i>E. coli</i> (parto sem boas condições de higiene)</li>
<li>Enterobactérias</li>
<li><i>Listeria monocytogenes</i></li>
</ul></li>
</ul></div>
<div class="ess-col ess-rose"><strong>Tardia</strong>
<ul>
<li>Após 2, 3 ou 7 dias de vida.</li>
<li>Nosocomial ou comunitária.</li>
<li>Etiologia:
<ul>
<li><b>Estafilococos</b>: <i>Staphylococcus aureus</i> e <i>S. coagulase negativo</i></li>
<li><b>Bactérias gram-negativas</b> (<i>E. coli</i> e <i>Listeria</i>)</li>
<li><b>Fungos</b> → fatores de risco: peso &lt; 1.000 g, NPT e antibioticoterapia prévia</li>
</ul></li>
</ul></div>
</div>

<details class="ess-tg ess-red" open><summary>Fatores de risco</summary>
<ul>
<li><b class="ess-c-purple">Ruptura prolongada de membranas</b> — bolsa rota há <b>≥ 18 h</b>.</li>
<li><b class="ess-c-purple">Corioamnionite</b> — infecção bacteriana da cavidade uterina (<b>febre materna</b>) ou ITU.</li>
<li>Colonização materna por germes patogênicos (GBS) → pesquisa com 36–38 semanas.</li>
<li>Prematuridade sem causa aparente → fator de risco para sepse <b>precoce</b>.</li>
<li>Prematuridade e baixo peso ao nascer → fator de risco para sepse <b>tardia</b> (internação prolongada).</li>
</ul></details>

<h4>Clínica</h4>
<p><mark class="ess-hl3"><b>Pode haver período assintomático de até 48 h.</b></mark></p>
<div class="ess-box ess-note"><div class="ess-box-tt">Doença sistêmica</div>
<ul>
<li><b>Distermia</b> → instabilidade térmica (febre ou hipotermia).</li>
<li>Alteração do estado de alerta (hipoatividade, convulsão).</li>
<li>Cardiocirculatório → alteração da perfusão.</li>
<li>Gastrointestinal → intolerância alimentar, distensão abdominal, vômitos.</li>
<li>Desconforto respiratório → taquicardia.</li>
</ul></div>

<h4>Avaliação complementar</h4>
<details class="ess-tg ess-gray" open><summary>Radiografia de tórax (igual à DMH)</summary>
<ul><li>Semelhante à SDR: infiltrado reticulogranular difuso.</li></ul></details>
<figure class="ess-fig"><img src="assets/essentials/pediatria/neonatologia-1/rx-sepse.jpg" alt="Radiografia de RN com sepse neonatal"><figcaption>Radiografia de RN com sepse neonatal.</figcaption></figure>
<details class="ess-tg ess-gray" open><summary>Hemograma</summary>
<ul>
<li><b>Neutropenia</b> → alta especificidade.</li>
<li><b>Relação I/T ≥ 0,2</b> → alta sensibilidade para diagnosticar sepse (I/T = neutrófilos <b>I</b>maturos / neutrófilos <b>T</b>otais).</li>
<li>Plaquetopenia.</li>
</ul></details>
<ul><li>PCR e procalcitonina elevadas.</li></ul>
<details class="ess-tg ess-gray" open><summary>Culturas</summary>
<ul>
<li><b>Hemocultura</b> → <i>SEMPRE</i>.</li>
<li><b>Urinocultura</b> (infecção tardia) — na sepse tardia, ou na sepse precoce com malformação do trato urinário.</li>
<li><b>Cultura de líquor</b> → infecções disseminadas, mesmo quando há um foco claro.</li>
</ul></details>

<h4>Tratamento</h4>
<div class="ess-cols">
<div class="ess-col ess-gray"><strong>Precoce</strong>
<ul><li><b>Ampicilina + aminoglicosídeo</b> (Ampi + Genta)
<ul><li>GBS → ampicilina; <i>E. coli</i> → aminoglicosídeo.</li></ul></li></ul></div>
<div class="ess-col ess-gray"><strong>Tardia</strong>
<ul><li>Depende do perfil de resistência bacteriana do local onde a criança está internada ou da comunidade.</li><li>Oxacilina ou vancomicina + aminoglicosídeo.</li></ul></div>
</div>

<h4>Prevenção da sepse pelo GBS</h4>
<p class="ess-obs"><b>Fluxograma CDC (2010)</b></p>
<ol>
<li>Corioamnionite → antibiótico + exame.</li>
<li>Bolsa rota ≥ 18 h ou prematuridade ⇒ se a profilaxia estava indicada, mas não foi realizada.</li>
</ol>
<figure class="ess-fig ess-wide"><img src="assets/essentials/pediatria/neonatologia-1/fluxo-gbs.jpg" alt="Fluxograma de prevenção da sepse precoce neonatal pelo GBS"><figcaption>Prevenção da sepse precoce neonatal pelo GBS.</figcaption></figure>
<p class="ess-obs"><b>Fluxograma — Tratado da Sociedade Brasileira de Pediatria (2021)</b></p>
<div class="ess-cols">
<div class="ess-col ess-gray"><strong>≥ 35 semanas</strong>
<figure class="ess-fig"><img src="assets/essentials/pediatria/neonatologia-1/fluxo-sbp-a.jpg" alt="Avaliação de risco por categoria para sepse em RN com 35 semanas ou mais"><figcaption>Avaliação de risco por categoria, RN ≥ 35 semanas.</figcaption></figure></div>
<div class="ess-col ess-gray"><strong>&lt; 35 semanas</strong>
<figure class="ess-fig"><img src="assets/essentials/pediatria/neonatologia-1/fluxo-sbp-b.jpg" alt="Avaliação ampliada para sepse em RN com menos de 35 semanas"><figcaption>Observação ampliada.</figcaption></figure></div>
</div>
<ul>
<li>Corioamnionite → antibiótico + exame.</li>
<li>Profilaxia indicada e não feita → observação.</li>
</ul>

<h3 class="ess-h-green">Taquipneia transitória do RN (TTRN)</h3>
<p class="ess-alias">Também chamada de síndrome do pulmão úmido.</p>
<h4>Etiopatogenia</h4>
<div class="ess-box ess-note"><b>Atraso na absorção do líquido pulmonar.</b></div>
<details class="ess-tg ess-red" open><summary>Fatores de risco</summary>
<ul>
<li><b>Ausência de trabalho de parto</b> — a <b>cesariana eletiva</b> não dá o estímulo para o pulmão começar a reabsorver o líquido.</li>
<li>Prematuridade tardia.</li>
<li>Asma materna.</li>
</ul></details>
<details class="ess-tg ess-gray" open><summary>Clínica</summary>
<ul>
<li><mark class="ess-hl2"><b>Resolução rápida (até 3 dias)</b></mark> → quadro autolimitado: melhora sem intervenção específica.</li>
<li>Desconforto moderado.</li>
</ul></details>
<details class="ess-tg ess-gray" open><summary>Radiografia</summary>
<ul>
<li><b>Congestão peri-hilar.</b></li>
<li><b>Aumento da trama vascular pulmonar.</b></li>
<li>Líquido nas cissuras → <i><b>espessamento das cissuras interlobares</b></i>; pode haver derrame.</li>
<li>Cardiomegalia.</li>
<li>Hiperinsuflação pulmonar: arcos costais retificados e aumento do espaço intercostal.</li>
</ul></details>
<figure class="ess-fig"><img src="assets/essentials/pediatria/neonatologia-1/rx-ttrn.jpg" alt="Radiografia com congestão hilar e retificação dos arcos costais, compatível com TTRN"><figcaption>Congestão hilar e retificação dos arcos costais, compatíveis com TTRN.</figcaption></figure>
<h4>Tratamento</h4>
<ul>
<li><b>Oxigenoterapia → FiO₂ &lt; 40%.</b></li>
<li><b>Suporte geral.</b></li>
<li><span class="ess-neg"><b>NÃO</b></span> usar diurético nem adrenalina inalatória.</li>
</ul>

<h3 class="ess-h-brown">Síndrome de aspiração meconial (SAM)</h3>
<h4>Etiopatogenia</h4>
<div class="ess-box ess-note"><b>Aspiração de mecônio ainda dentro do útero:</b> bloqueio expiratório (obstrução das vias aéreas) e pneumonite química (inflamação das vias aéreas).
<ul>
<li>A eliminação de mecônio antes do nascimento ocorre em poucas gestações e indica quadro de asfixia fetal.</li>
<li>Ao nascer, o mecônio se espalha pela parede alveolar → bloqueio mecânico expiratório (o ar não consegue sair).</li>
</ul></div>
<details class="ess-tg ess-red" open><summary>Fatores de risco</summary>
<ul>
<li><b>Sofrimento fetal</b> → <u><b>asfixia perinatal</b></u> → Apgar baixo, com necessidade de reanimação neonatal.</li>
<li><b>Líquido amniótico meconial</b></li>
<li>Apresentação pélvica</li>
<li><b>RN a termo e pós-termo</b></li>
</ul></details>
<details class="ess-tg ess-gray" open><summary>Clínica</summary>
<ul>
<li>Desconforto respiratório <b>PROGRESSIVO!</b></li>
<li>Sinais de desconforto respiratório <u><b>crônico</b></u>.</li>
<li>Impregnação por mecônio.</li>
</ul></details>
<details class="ess-tg ess-gray" open><summary>Radiologia</summary>
<ul>
<li><b>INFILTRADO ALVEOLAR GROSSEIRO.</b></li>
<li>Áreas de hipotransparência.</li>
<li>Volume pulmonar aumentado → áreas de hiperinsuflação.</li>
</ul></details>
<figure class="ess-fig"><img src="assets/essentials/pediatria/neonatologia-1/rx-sam.jpg" alt="Radiografia da síndrome de aspiração meconial"><figcaption>Radiografia da síndrome de aspiração meconial.</figcaption></figure>
<details class="ess-tg ess-green" open><summary>Tratamento</summary>
<ul>
<li><b>Suporte ventilatório.</b></li>
<li><b>Antibioticoterapia</b> (?) → não é rotina, mas pode constar da prescrição até que se descarte infecção respiratória.</li>
<li><b>Surfactante</b> — a resposta inflamatória causada pelo mecônio pode inativá-lo.</li>
</ul></details>
<details class="ess-tg ess-red" open><summary>Complicações</summary>
<ul><li>Pneumotórax</li><li>Pneumomediastino</li><li>Hipertensão pulmonar persistente</li></ul></details>
</section>

<section class="ess-sec">
<h2>Resumo</h2>
<div class="ess-tw"><table class="ess-table ess-sum">
<thead><tr><th>Doença</th><th>Clínica e fatores de risco</th><th>Radiografia</th><th>Tratamento</th></tr></thead>
<tbody>
<tr class="ess-r-blue"><th scope="row">Doença da membrana hialina</th><td>Prematuridade, sexo masculino, DM materno. Prevenção: corticoide antenatal.</td><td>Infiltrado reticulogranular difuso (vidro fosco).</td><td>Suporte ventilatório (CPAP); surfactante e antibióticos.</td></tr>
<tr class="ess-r-rose"><th scope="row">Pneumonia / sepse neonatal</th><td>Bolsa rota prolongada (≥ 18 h), corioamnionite e ITU (febre materna), prematuridade.</td><td>Igual à DMH.</td><td>Antibióticos: ampicilina + aminoglicosídeo.</td></tr>
<tr class="ess-r-green"><th scope="row">Taquipneia transitória do RN</th><td>Ausência de trabalho de parto.</td><td>Aumento da trama vascular, congestão hilar; líquido na cissura, derrame pleural.</td><td>Oxigênio (&lt; 40%).</td></tr>
<tr class="ess-r-brown"><th scope="row">Síndrome de aspiração meconial</th><td>Líquido amniótico meconial, asfixia.</td><td>Infiltrado reticulogranular grosseiro, áreas de hiperinsuflação.</td><td>Suporte e antibióticos; surfactante.</td></tr>
</tbody></table></div>
</section>
`
  }
  ]
},
{ id: 'pediatria-dermatologia', apostila: 'Pediatria', area: 'Dermatologia pediátrica', desc: 'Lesões de pele e doenças dermatológicas da infância.', aulas: [] },
{ id: 'pediatria-puericultura', apostila: 'Pediatria', area: 'Puericultura', desc: 'Aleitamento, crescimento, desenvolvimento e imunização.', aulas: [] },
{ id: 'pediatria-pneumopediatria', apostila: 'Pediatria', area: 'Pneumopediatria', desc: 'Infecções respiratórias e asma na infância.', aulas: [] },
{ id: 'pediatria-gastropediatria', apostila: 'Pediatria', area: 'Gastropediatria', desc: 'Distúrbios gastrointestinais funcionais e síndromes eméticas.', aulas: [] },
{ id: 'pediatria-nefropediatria', apostila: 'Pediatria', area: 'Nefropediatria', desc: 'Infecção do trato urinário e urologia pediátrica.', aulas: [] },
{ id: 'pediatria-infectologia', apostila: 'Pediatria', area: 'Infectologia pediátrica', desc: 'Diarreia aguda e doenças exantemáticas da infância.', aulas: [] },
{ id: 'pediatria-cardiologia', apostila: 'Pediatria', area: 'Cardiologia pediátrica', desc: 'Cardiopatias congênitas.', aulas: [] },
{ id: 'pediatria-urgencia', apostila: 'Pediatria', area: 'Urgência e Emergência', desc: 'Choque e suporte avançado de vida em pediatria (PALS).', aulas: [] }
]);
