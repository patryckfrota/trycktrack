/* Bullets — Pediatria. Escores, classificações, critérios e tabelas de
   "decoreba" pra revisão de véspera — extraídos de DECOREBA - PED.pdf
   (Sanar), conferidos página a página contra o PDF original pra não
   perder nem quebrar nenhum valor/palavra durante a extração.

   Schema por bullet: id, area, categoria (escore|classificacao|criterio|
   tabela — só pra cor do card, não muda o conteúdo), titulo, html
   (conteúdo já pronto reaproveitando as classes do reader do Rapid
   Review: reader-table-wrap/reader-table, reader-list, reader-callout). */
(function () {
    const bullets = [
        {
            id: 'ped-2026-profilaxia-anemia-ferropriva',
            area: 'Pediatria',
            titulo: 'Profilaxia Anemia Ferropriva',
            atualizacao2026: true,
            html: `<p><strong>Lactente a termo (nova recomendação):</strong></p>
<ul class="reader-sublist">
  <li>Não é mais por peso</li>
  <li>Dose fixa: <strong>10–12,5 mg/dia</strong> dos 6 aos 24 meses</li>
  <li>Em ciclos: <strong>3 meses usa + 3 meses pausa</strong></li>
</ul>
<p><strong>&lt;37 semanas / PIG:</strong></p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Peso ao nascer</th><th>Início / Dose (1º ano de vida)</th><th>Depois, até 2 anos</th></tr></thead><tbody>
<tr><td>&lt; 1.000 g</td><td>Inicia aos 30 dias = <strong>4 mg/kg/dia</strong></td><td>1 mg/kg/dia</td></tr>
<tr><td>&lt; 1.500 g</td><td>Inicia aos 30 dias = <strong>3 mg/kg/dia</strong></td><td>1 mg/kg/dia</td></tr>
<tr><td>&lt; 2.500 g</td><td>Inicia aos 30 dias = <strong>2 mg/kg/dia</strong></td><td>1 mg/kg/dia</td></tr>
</tbody></table></div>`
        },
        {
            id: 'ped-2026-pneumo-20',
            area: 'Pediatria',
            titulo: 'Incorporação da vacina Pneumocócica 20v (PNI/SUS)',
            atualizacao2026: true,
            html: `<ul class="reader-sublist">
  <li>Vacina <strong>Pneumo 20</strong>, indicada para crianças de até 5 anos e outros grupos especiais, disponível nas UBS e demais pontos de vacinação do SUS.</li>
  <li>Protege contra <strong>20 sorotipos</strong> da bactéria causadora de doenças graves como pneumonia e meningite.</li>
  <li>Amplia a cobertura contra sorotipos relacionados à pneumonia invasiva, incluindo os tipos <strong>3, 6A e 19A</strong>.</li>
</ul>
<p><strong>Grupos indicados:</strong></p>
<ul class="reader-sublist">
  <li>Crianças menores de 5 anos;</li>
  <li>Povos indígenas a partir de 5 anos sem histórico vacinal com vacina pneumocócica conjugada;</li>
  <li>Idosos a partir de 60 anos acamados e/ou institucionalizados;</li>
  <li>Pessoas com condições clínicas especiais atendidas nos CRIE.</li>
</ul>
<p><strong>Esquema de transição:</strong> uma dose da Pneumo 20 aos 2 meses, uma dose da Pneumo 10 aos 4 meses e reforço da Pneumo 20 aos 12 meses, respeitando intervalo mínimo de <strong>60 dias</strong> entre a 2ª dose e o reforço. Pneumo 13 e Pneumo 23 seguem sendo utilizadas conforme indicação do PNI até a conclusão da transição de estoques.</p>`
        },
        {
            id: 'ped-2026-constipacao-roma-v',
            area: 'Pediatria',
            titulo: 'Constipação Intestinal - ROMA V',
            atualizacao2026: true,
            html: `<div class="reader-table-wrap"><table class="reader-table"><tbody>
<tr><td>Deve incluir pelo menos 2 dos seguintes sintomas ocorridos <strong>no último mês</strong>:<br>
a. Em média, 2 ou menos evacuações por semana<br>
b. Em média, pelo menos 1 episódio de incontinência fecal por semana (crianças com controle esfincteriano)<br>
c. Histórico de postura retentiva, esforço ou retenção inadequada de fezes<br>
d. Histórico de evacuações dolorosas ou com <strong>fezes endurecidas</strong> — definido como: Escala de Bristol tipo 1 ou 2, ou Escala de Bruxelas para Fezes de Bebês e Crianças Pequenas tipo 1, 2 ou 3 para bebês<br>
e. Presença de uma grande massa fecal no reto<br>
f. Histórico de fezes de grande diâmetro<br>
2. Após avaliação adequada, os sintomas não podem ser totalmente explicados por outra condição médica<br>
3. Não preenche os critérios para síndrome do intestino irritável<br>
4. Critérios preenchidos por pelo menos 1 mês antes do diagnóstico</td></tr>
</tbody></table></div>
<p><strong>O que mudou do Roma IV:</strong></p>
<ul class="reader-sublist">
  <li>Retirado "pelo menos uma vez por semana" para "ocorrendo no último mês"</li>
  <li>Removida a divisão de idade (menor que 4 anos e a partir de 4 anos)</li>
  <li>Definidos os tipos da Escala de Bristol / Escala de Bruxelas para definir fezes endurecidas</li>
  <li>Removida a expressão "que pode obstruir o vaso sanitário", por depender do tipo de vaso usado mais do que do tamanho das fezes</li>
</ul>`
        },
        {
            id: 'ped-2026-sii-roma-v',
            area: 'Pediatria',
            titulo: 'Síndrome do Intestino Irritável (infantil) - ROMA V',
            atualizacao2026: true,
            html: `<div class="reader-table-wrap"><table class="reader-table"><tbody>
<tr><td><strong>Dor abdominal ≥ 4 dias/mês por 2 meses</strong> + 1: relação com a evacuação, alteração na frequência das fezes, alteração na forma das fezes.<br>
<strong>Dor abdominal é o sintoma predominante.</strong><br>
2. Os sintomas não podem ser totalmente explicados por outras condições médicas<br>
3. A dor não deve ocorrer exclusivamente durante a menstruação</td></tr>
</tbody></table></div>
<ul class="reader-sublist">
  <li>Recomenda <strong>idade mínima de 6 anos</strong> para o diagnóstico</li>
  <li>Adicionado como <strong>critério de exclusão</strong> os casos em que a dor ocorre exclusivamente durante a <strong>menstruação</strong> — considerado dismenorreia, mimetizando o diagnóstico de SII</li>
</ul>`
        },
        {
            id: 'ped-2026-disquezia-lactente-roma-v',
            area: 'Pediatria',
            titulo: 'Disquezia do Lactente - ROMA V',
            atualizacao2026: true,
            html: `<div class="reader-table-wrap"><table class="reader-table"><tbody>
<tr><td>Em bebês com menos de <strong>9 meses</strong>, os dois critérios a seguir devem estar presentes:<br>
1. Episódios recorrentes de esforço para evacuar por pelo menos 10 minutos e esforço visível para defecar antes da passagem bem-sucedida ou mal-sucedida de fezes moles. <strong>Frequentemente, isso é acompanhado de gritos, choro ou vermelhidão extrema no rosto.</strong><br>
2. Após avaliação adequada, o desconforto não pode ser totalmente explicado por outra condição médica</td></tr>
</tbody></table></div>
<p>Passou a considerar <strong>"choro"</strong>, <strong>"gritos"</strong> e <strong>"vermelhidão extrema do rosto"</strong> como critérios de suporte.</p>`
        },
        {
            id: 'ped-2026-diarreia-funcional-roma-v',
            area: 'Pediatria',
            titulo: 'Diarreia Funcional - ROMA V',
            atualizacao2026: true,
            html: `<div class="reader-table-wrap"><table class="reader-table"><tbody>
<tr><td>Deve incluir todos os seguintes critérios:<br>
1. Evacuação de uma média de <strong>4 ou mais evacuações indolores por dia em crianças menores de 4 anos</strong> ou <strong>mais de 2 evacuações por dia em crianças com 4 anos ou mais</strong>, com pelo menos 25% das fezes não formadas (Escala de Bristol ou Escala de Bruxelas tipo 6 ou 7)<br>
2. Início entre <strong>6 meses e 18 anos de idade</strong><br>
3. Não preenche os critérios para constipação funcional, síndrome do intestino irritável com predominância de diarreia e incontinência fecal não retentiva<br>
4. Após avaliação adequada, a diarreia não pode ser totalmente explicada por outra condição médica. Critérios preenchidos <strong>por pelo menos 2 meses</strong> antes do diagnóstico</td></tr>
</tbody></table></div>
<ul class="reader-sublist">
  <li>Expandiu a faixa etária diagnóstica para <strong>até 18 anos</strong></li>
  <li>Recomenda o uso da Escala de Bristol (tipos 6–7) ou Escala de Bruxelas (tipos 5, 6 ou 7), dependendo da faixa etária</li>
</ul>`
        },
        {
            id: 'ped-2026-infant-distress-syndrome-roma-v',
            area: 'Pediatria',
            titulo: 'Infant Distress Syndrome (antiga Cólica do Lactente) - ROMA V',
            atualizacao2026: true,
            html: `<div class="reader-table-wrap"><table class="reader-table"><tbody>
<tr><td>Inclua todos os seguintes critérios:<br>
1. Um bebê com menos de <strong>5 meses</strong> de idade quando os sintomas começam<br>
2. Períodos recorrentes e prolongados de choro e irritação do bebê relatados pelos cuidadores, que ocorrem sem causa óbvia e não podem ser prevenidos ou resolvidos pelos cuidadores<br>
3. Após avaliação adequada, os sintomas não podem ser totalmente explicados por outra condição médica<br>
<strong>Critério para pesquisa clínica:</strong> critérios diagnósticos descritos acima e pelo menos 1 dos seguintes:<br>
1. Duração do choro superior a 3 horas/dia para crianças de até 6 semanas ou superior a <strong>2,5 horas</strong> para crianças mais velhas (75º percentil para a idade) por pelo menos 3 dias por semana<br>
2. <strong>A vida diária e o bem-estar de pelo menos um dos cuidadores são gravemente afetados pelo choro</strong></td></tr>
</tbody></table></div>`
        },
        {
            id: 'ped-2026-surviving-sepsis-pediatrica',
            area: 'Pediatria',
            titulo: 'Surviving Sepsis Campaign Pediátrica 2026',
            atualizacao2026: true,
            imagem: 'assets/bullets/img/upd2026-sepse-fluxograma.png',
            html: `<p><strong>Definições:</strong></p>
<ul class="reader-sublist">
  <li><strong>Sepse:</strong> quadro infeccioso grave com disfunções orgânicas estabelecidas</li>
  <li><strong>Choque séptico:</strong> sepse com disfunção cardiovascular ou perfusão inadequada</li>
  <li><strong>Provável sepse:</strong> quadro clínico compatível, sem foco infeccioso confirmado</li>
  <li><strong>Choque séptico suspeito:</strong> choque sem etiologia confirmada, porém infecção suspeita</li>
  <li><strong>Choque séptico com hipoperfusão persistente:</strong> manutenção de sinais de choque após medidas iniciais de volume, droga vasoativa, antibiótico e ajustes metabólicos</li>
</ul>
<p><strong>Manejo:</strong></p>
<ul class="reader-sublist">
  <li>Antibioticoterapia de amplo espectro — início em <strong>1h</strong> nos casos de choque e em <strong>3h</strong> sem sinais de choque, mesmo não confirmados; sem preferência quanto à duração de infusão</li>
  <li>Dosagem de <strong>lactato</strong> fortemente recomendada na avaliação inicial (valores ≥2 mmol/L associam-se a maior mortalidade)</li>
</ul>
<p><strong>Reposição volêmica:</strong></p>
<ul class="reader-sublist">
  <li><strong>Com UTI:</strong> choque séptico → até 40–60 mL/kg em bolus (10–20 mL/kg/bolus) na 1ª hora</li>
  <li><strong>Sem UTI + SEM hipotensão:</strong> recomendado NÃO usar bolus de fluidos</li>
  <li><strong>Sem UTI + COM hipotensão:</strong> sugerido até 40 mL/kg em bolus (10–20 mL/kg/bolus) na 1ª hora</li>
</ul>
<ul class="reader-sublist">
  <li>Consulta de infectologista no ajuste de antibioticoterapia + USG point-of-care para avaliação e monitorização + avaliação clínica e multiparamétrica habitual</li>
  <li>Monitorização da <strong>saturação venosa central</strong> → objetivo SVC acima de 70%, sem recomendação de outras monitorizações avançadas ou invasivas</li>
  <li>Corticoide na suspeita de insuficiência adrenal relativa</li>
</ul>
<p><strong>Contraindicado:</strong> <strong>procalcitonina</strong> para descalonamento de antibiótico; e as medicações <strong>angiotensina-2, azul de metileno, levotiroxina, vitamina C, vitamina B1, vitamina D</strong>.</p>`
        },
        {
            id: 'ped-classificacao-neonatologia',
            area: 'Pediatria',
            titulo: 'Classificação Neonatologia',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Parâmetro</th><th>Critérios / Valores</th></tr></thead><tbody>
<tr><td>Idade gestacional</td><td><strong>Pré-termo:</strong> &lt; 37 semanas &nbsp;<strong>Termo:</strong> 37 – 41 6/7 semanas &nbsp;<strong>Pós-termo:</strong> ≥ 42 semanas</td></tr>
<tr><td>Peso ao nascer</td><td><strong>Extremo baixo peso (EBP):</strong> &lt; 1.000 g / <strong>Muito baixo peso (MBP):</strong> &lt; 1.500 g / <strong>Baixo peso (BP):</strong> 1.500 – 2.499 g / <strong>Peso adequado (PN):</strong> 2.500 – 3.999 g / <strong>Macrossômico:</strong> ≥ 4.000 g</td></tr>
<tr><td>Classificação por crescimento fetal</td><td><strong>PIG</strong> (pequeno p/ idade gestacional): &lt; 10º percentil &nbsp;<strong>AIG</strong> (adequado): 10º – 90º percentil &nbsp;<strong>GIG</strong> (grande): &gt; 90º percentil</td></tr>
</tbody></table></div>`
        },
        {
            id: 'ped-metodo-capurro',
            area: 'Pediatria',
            titulo: 'Método de Capurro (somático) - Idade Gestacional',
            html: `<p>Avalia 5 critérios somáticos, cada um com uma pontuação — soma tudo e aplica na fórmula.</p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Critério</th><th>Achado</th><th>Pontos</th></tr></thead><tbody>
<tr><td rowspan="5">Textura da pele</td><td>Muito fina, gelatinosa</td><td>0</td></tr>
<tr><td>Fina e lisa</td><td>5</td></tr>
<tr><td>Algo mais grossa, discreta descamação superficial</td><td>10</td></tr>
<tr><td>Grossa, sulcos superficiais, descamação de mãos e pés</td><td>15</td></tr>
<tr><td>Grossa, apergaminhada, com sulcos profundos</td><td>20</td></tr>
<tr><td rowspan="4">Formação do mamilo</td><td>Apenas visível, sem aréola</td><td>0</td></tr>
<tr><td>Bem definido, aréola lisa e fina, &lt; 7,5 mm</td><td>5</td></tr>
<tr><td>Aréola pontilhada, borda não levantada, ≥ 7,5 mm</td><td>10</td></tr>
<tr><td>Aréola pontilhada, borda levantada, ≥ 7,5 mm</td><td>15</td></tr>
<tr><td rowspan="4">Glândula mamária</td><td>Não palpável</td><td>0</td></tr>
<tr><td>Palpável, &lt; 5 mm</td><td>5</td></tr>
<tr><td>Palpável, 5–10 mm</td><td>10</td></tr>
<tr><td>Palpável, &gt; 10 mm</td><td>15</td></tr>
<tr><td rowspan="4">Formação da orelha (pavilhão auricular)</td><td>Chata, disforme, pouco ou nenhum encurvamento na borda</td><td>0</td></tr>
<tr><td>Encurvamento parcial da borda</td><td>8</td></tr>
<tr><td>Encurvamento de toda a borda superior</td><td>16</td></tr>
<tr><td>Pavilhão totalmente encurvado, incisura pré-auricular</td><td>24</td></tr>
<tr><td rowspan="5">Pregas plantares</td><td>Sem pregas</td><td>0</td></tr>
<tr><td>Marcas mal definidas na metade anterior</td><td>5</td></tr>
<tr><td>Marcas bem definidas na metade anterior</td><td>10</td></tr>
<tr><td>Sulcos no terço anterior</td><td>15</td></tr>
<tr><td>Sulcos em mais da metade anterior da planta</td><td>20</td></tr>
</tbody></table></div>
<div class="reader-callout reader-callout-bloco"><p>💡 IG (dias) = 204 + soma dos pontos → dividir por 7 pra idade em semanas</p></div>`
        },
        {
            id: 'ped-escala-apgar',
            area: 'Pediatria',
            titulo: 'Escala de APGAR',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Parâmetro</th><th>0 pontos</th><th>1 ponto</th><th>2 pontos</th></tr></thead><tbody>
<tr><td>A – Aparência (cor da pele)</td><td>Cianótica ou pálida</td><td>Extremidades cianóticas</td><td>Todo o corpo rosado</td></tr>
<tr><td>P – Pulso (frequência cardíaca)</td><td>Ausente</td><td>&lt; 100 bpm</td><td>≥ 100 bpm</td></tr>
<tr><td>G – Grimace (resposta reflexa / irritabilidade à estimulação)</td><td>Sem resposta</td><td>Careta</td><td>Choro vigoroso ou puxar o membro</td></tr>
<tr><td>A – Atividade (tônus muscular)</td><td>Flácido</td><td>Flexão parcial dos membros</td><td>Boa flexão, movimentos ativos</td></tr>
<tr><td>R – Respiração</td><td>Ausente</td><td>Irregular ou fraca</td><td>Boa, choro forte</td></tr>
</tbody></table></div>
<div class="score-bars">
<div class="score-bar sev-grave"><span class="score-bar-range">0–3</span><span class="score-bar-text"><strong>Depressão neonatal grave</strong>necessidade de reanimação imediata</span></div>
<div class="score-bar sev-moderado"><span class="score-bar-range">4–6</span><span class="score-bar-text"><strong>Depressão moderada</strong>monitorar, suporte ventilatório se necessário</span></div>
<div class="score-bar sev-bom"><span class="score-bar-range">7–10</span><span class="score-bar-text"><strong>Boa adaptação neonatal</strong>monitorar e cuidados de rotina</span></div>
</div>`
        },
        {
            id: 'ped-teste-coracaozinho',
            area: 'Pediatria',
            titulo: 'Teste do Coraçãozinho - Oximetria de Pulso',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Parâmetro</th><th>Critério</th><th>Interpretação / Conduta</th></tr></thead><tbody>
<tr><td>Idade da coleta</td><td><strong>24 a 48 horas de vida</strong></td><td>Evita resultados falso-positivos por adaptação pós-natal</td></tr>
<tr><td>Local de aferição</td><td><strong>Mão direita (pré-ductal)</strong> e <strong>pé direito ou esquerdo (pós-ductal)</strong></td><td>Comparação pré- e pós-ductal é essencial</td></tr>
<tr><td>Valores normais</td><td><strong>Saturação ≥ 95%</strong> em ambas extremidades e <strong>diferença ≤ 3%</strong> entre mão e pé</td><td>Resultado considerado <strong>negativo</strong></td></tr>
<tr><td>Valores alterados (teste positivo)</td><td>① Saturação &lt; 90% em qualquer extremidade ② Saturação 90–94% em duas medições com diferença &gt; 3% entre mão e pé</td><td>Teste <strong>positivo</strong> → encaminhar imediatamente para <strong>ecocardiograma</strong> e avaliação cardiológica</td></tr>
<tr><td>Repetição do teste</td><td>Se saturação 90–94% ou diferença &gt;3% na primeira aferição</td><td>Repetir em 1 hora antes de decisão final, conforme protocolos nacionais</td></tr>
</tbody></table></div>`
        },
        {
            id: 'ped-teste-pezinho',
            area: 'Pediatria',
            titulo: 'Teste do Pezinho - Triagem Neonatal',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Doença / Grupo</th><th>Método de detecção</th><th>Idade indicada</th><th>Observações</th></tr></thead><tbody>
<tr><td>Fenilcetonúria (PKU)</td><td>Fenilalanina</td><td>3º – 5º dia de vida</td><td>Coletar após 48 h de vida; manter leite materno + fórmula sem fenilalanina</td></tr>
<tr><td>Hipotireoidismo congênito (HC)</td><td>Dosagem de TSH (ou T4)</td><td>3º – 5º dia de vida</td><td>Amostra em papel filtro; acompanhamento imediato se TSH elevado</td></tr>
<tr><td>Fibrose cística (FC)</td><td>Imunorreativo de tripsina (IRT)</td><td>3º – 5º dia de vida</td><td>Amostra em papel filtro; confirmação com cloreto de suor</td></tr>
<tr><td>Deficiência de biotinidase</td><td>Enzima biotinidase</td><td>3º – 5º dia de vida</td><td>Diagnóstico precoce evita manifestações neurológicas</td></tr>
<tr><td>Hiperplasia adrenal congênita (HAC) – forma clássica</td><td>Dosagem 17-OH-progesterona</td><td>3º – 5º dia de vida</td><td>Confirmar se alterado; importante prevenção de crise adrenal</td></tr>
<tr><td>Anemia falciforme / hemoglobinopatias</td><td>Eletroforese de hemoglobina</td><td>3º – 5º dia de vida</td><td>Identificação de portadores e casos graves (HbSS, HbSC)</td></tr>
</tbody></table></div>`
        },
        {
            id: 'ped-disturbios-respiratorios-neonatais',
            area: 'Pediatria',
            titulo: 'Distúrbios Respiratórios Neonatais',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Distúrbio</th><th>Etiologia / Fatores de risco</th><th>Manifestações clínicas</th><th>Tratamento / Conduta</th></tr></thead><tbody>
<tr><td>Síndrome do desconforto respiratório (SDR / Doença da membrana hialina)</td><td>Prematuridade (↓surfactante), diabetes materna</td><td>Taquipneia, retrações, gemência, cianose, hipoxemia</td><td>Surfactante exógeno, CPAP, ventilação mecânica se grave, suporte O2</td></tr>
<tr><td>Taquipneia transitória do recém-nascido (TTRN / TTN)</td><td>Parto cesáreo, ausência de trabalho de parto, prematuridade leve</td><td>Taquipneia leve-moderada, retrações leves, sinais geralmente resolvem &lt;72h</td><td>Suporte O2, observação. <strong>NÃO FAZER DIURÉTICO!</strong></td></tr>
<tr><td>Aspiração meconial</td><td>Inalação de mecônio em RN a termo ou pós-termo</td><td>Taquipneia, cianose, retrações, radiografia com infiltrados grosseiros</td><td>Suporte ventilatório, O2, CPAP/ventilação mecânica se necessário; antibióticos se infecção suspeita</td></tr>
<tr><td>Hipertensão pulmonar persistente do RN (HPPRN)</td><td>Má adaptação pulmonar, hipoplasia pulmonar, SDR grave</td><td>Cianose acentuada, hipoxemia refratária, sopro cardíaco, sinais de insuficiência direita</td><td>Óxido nítrico inalatório, ventilação mecânica, suporte hemodinâmico</td></tr>
<tr><td>Infecção respiratória neonatal / pneumonia</td><td>Infecção intrauterina (GBS, E. coli), aspiração</td><td>Taquipneia, gemência, cianose, febre ou hipotermia</td><td>Antibioticoterapia IV (ampicilina + gentamicina), suporte O2</td></tr>
</tbody></table></div>`
        },
        {
            id: 'ped-infeccoes-congenitas',
            area: 'Pediatria',
            titulo: 'Infecções Congênitas',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Infecção</th><th>Agente</th><th>Principais características clínicas</th><th>Tratamento</th></tr></thead><tbody>
<tr><td>Toxoplasmose</td><td><em>Toxoplasma gondii</em></td><td>Hidrocefalia, calcificações intracranianas difusas, coriorretinite, icterícia, hepatoesplenomegalia</td><td>Sulfadiazina + pirimetamina + ácido folínico (+corticoide se proteína no líquor &gt; 1g ou se coriorretinite)</td></tr>
<tr><td>Rubéola</td><td>Vírus da rubéola</td><td>Surdez, cardiopatia congênita (PCA), catarata, retinopatia, microcefalia</td><td>Suporte</td></tr>
<tr><td>Citomegalovírus (CMV)</td><td>CMV</td><td>Microcefalia, calcificações periventriculares, surdez neurossensorial, hepatoesplenomegalia</td><td>Ganciclovir ou valganciclovir IV/oral em casos graves</td></tr>
<tr><td>Herpes simples (HSV)</td><td>HSV-1, HSV-2</td><td>Lesões vesiculares, encefalite, hepatoesplenomegalia, sepse neonatal</td><td>Aciclovir IV</td></tr>
<tr><td>Sífilis congênita</td><td><em>Treponema pallidum</em></td><td>Rash palmo-plantar, hepatosplenomegalia, rinite, osteocondrite, icterícia</td><td>Penicilina G benzatina/procaína ou cristalina se neurossífilis</td></tr>
<tr><td>Varicela-Zóster</td><td>VZV</td><td>Cicatrizes vesiculares, malformações dos membros, microcefalia, catarata</td><td>Aciclovir IV em casos graves; suporte</td></tr>
</tbody></table></div>`
        },
        {
            id: 'ped-sindromes-geneticas',
            area: 'Pediatria',
            titulo: 'Síndromes Genéticas',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Síndrome</th><th>Alteração genética</th><th>Principais características clínicas</th></tr></thead><tbody>
<tr><td>Down (Trissomia 21)</td><td>Trissomia 21</td><td>Facies característica (olhos amendoados, ponte nasal achatada), prega epicântica, hipotonia, hipotireoidismo, cardiopatia congênita (DSAV), mãos curtas, prega palmar única</td></tr>
<tr><td>Turner</td><td>Monossomia X (45,X)</td><td>Baixa estatura, hipogonadismo hipergonadotrófico, pescoço alado, cardiopatia (coarctação da aorta), linfedema neonatal, pterigium coli</td></tr>
<tr><td>Klinefelter</td><td>47,XXY</td><td>Hipogonadismo, ginecomastia, baixa testosterona, infertilidade, estatura alta, desenvolvimento cognitivo geralmente normal</td></tr>
<tr><td>Patau (Trissomia 13)</td><td>Trissomia 13</td><td>Malformações graves: polidactilia, microftalmia, lábio/palato fissurado, cardiopatias</td></tr>
<tr><td>Edwards (Trissomia 18)</td><td>Trissomia 18</td><td>Malformações múltiplas: dedos sobrepostos, pés em balanço, micrognatia, orelhas baixas, cardiopatias, retardo grave, sobrevida curta</td></tr>
<tr><td>Noonan</td><td>Mutação gênica (PTPN11, SOS1, etc.)</td><td>Baixa estatura, hipertelorismo, cardiopatia (estenose pulmonar e miocardiopatia hipertrófica), pescoço alado, disfunção coagulatória</td></tr>
<tr><td>Sotos</td><td>Mutação NSD1</td><td>Macrossomia ao nascimento, crescimento acelerado, mãos e pés grandes, retardo motor e intelectual, facies característica (face alongada, testa alta)</td></tr>
<tr><td>Prader-Willi</td><td>Deleção 15q11-q13 paterna ou disomia uniparental materna</td><td>Hipotonia neonatal, hipogonadismo, hiperfagia progressiva → obesidade, retardamento leve a moderado</td></tr>
<tr><td>Beckwith-Wiedemann</td><td>Alterações epigenéticas 11p15 (IGF2, H19)</td><td>Macrossomia, macroglossia, onfalocele, hipoglicemia neonatal, aumento risco de tumores (nefroblastoma, hepatoblastoma)</td></tr>
</tbody></table></div>`
        },
        {
            id: 'ped-cardiopatias-congenitas',
            area: 'Pediatria',
            titulo: 'Cardiopatias Congênitas',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Tipo</th><th>Cardiopatia</th><th>Defeito anatômico</th><th>Clínica</th><th>Radiografia</th><th>Conduta / Tratamento</th></tr></thead><tbody>
<tr><td rowspan="2">Cianogênicas</td><td>Transposição dos grandes vasos (TGA)</td><td>Aorta sai do VD e artéria pulmonar do VE → circulação em paralelo</td><td>Cianose grave ao nascimento</td><td>Cardiomegalia em "ovo deitado"</td><td>Prostaglandina EV para manter canal arterial, Rashkind (shunt atrial temporário), cirurgia de Jatene definitiva</td></tr>
<tr><td>Tetralogia de Fallot (TOF)</td><td>CIV + estenose pulmonar + aorta cavalgante + hipertrofia VD</td><td>Cianose progressiva, crises hipoxêmicas ("tet spells")</td><td>"Bota" ou "tamanco holandês"</td><td>Posição genupeitoral, O₂, morfina, beta-bloqueador, cirurgia paliativa Blalock-Taussig se artérias pulmonares hipoplásicas, correção definitiva cirúrgica</td></tr>
<tr><td rowspan="3">Acianogênicas</td><td>Comunicação interventricular (CIV)</td><td>Defeito septo ventricular (perimembranosa, muscular ou subarterial)</td><td>Sopro holossistólico, abaulamento precordial, ICC se grande</td><td>Cardiomegalia, abaulamento arco pulmonar</td><td>Observação (fechamento espontâneo perimembranoso/muscular), cirurgia se subarterial ou sintomática</td></tr>
<tr><td>Comunicação interatrial (CIA)</td><td>Shunt E-D atrial (ostium secundum, primum ou seio venoso)</td><td>Assintomáticos, sopro sistólico pulmonar e tricúspide, B2 desdobrado fixo</td><td>Normal ou aumento discreto da trama vascular pulmonar</td><td>Observação (ostium secundum pode fechar espontaneamente), correção se grande ou sintomática</td></tr>
<tr><td>Persistência do canal arterial (Ductus arterioso)</td><td>Canal arterioso não fechado</td><td>Sopro contínuo em maquinaria, hiperfonese B2, pulsos amplos</td><td>Hiperfluxo pulmonar</td><td>AINEs (ibuprofeno/indometacina), fechamento cirúrgico ou cateterismo se persistente</td></tr>
<tr><td></td><td>Coarctação de aorta</td><td>Estreitamento aorta torácica proximal</td><td>Pulsos fracos membros inferiores, hipertensão membros superiores, sopro sistólico, hiperfonese B2</td><td>Sinal do 3 invertido, sinal de Röesler</td><td>Prostaglandina EV se dependente do ducto, correção cirúrgica ou cateterismo</td></tr>
</tbody></table></div>`
        },
        {
            id: 'ped-profilaxia-anemia-ferropriva',
            area: 'Pediatria',
            titulo: 'Profilaxia Anemia Ferropriva',
            html: `<ul class="reader-list"><li><strong>Lactente a termo (nova recomendação):</strong>
<ul class="reader-list reader-sublist">
<li>Não é mais por peso</li>
<li>Dose fixa: 10–12,5 mg/dia dos 6 aos 24 meses</li>
<li>Em ciclos: 3 meses usa + 3 meses pausa</li>
</ul></li></ul>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Fase</th><th>Idade</th><th>Conduta</th></tr></thead><tbody>
<tr><td>1º ciclo</td><td>6 a 9 meses</td><td>10 a 12,5 mg/dia por 3 meses</td></tr>
<tr><td>Intervalo</td><td>9 a 12 meses</td><td>Pausa na suplementação</td></tr>
<tr><td>2º ciclo</td><td>12 a 15 meses</td><td>10 a 12,5 mg/dia por 3 meses</td></tr>
</tbody></table></div>
<ul class="reader-list"><li><strong>&lt;37 semanas / PIG:</strong>
<ul class="reader-list reader-sublist">
<li>Peso &lt; 1.000 g → inicia aos 30 dias = 4 mg/kg/dia (no 1º ano de vida, depois 1 mg/kg/dia até os 2 anos)</li>
<li>Peso &lt; 1.500 g → inicia aos 30 dias = 3 mg/kg/dia (no 1º ano de vida, depois 1 mg/kg/dia até os 2 anos)</li>
<li>Peso &lt; 2.500 g → inicia aos 30 dias = 2 mg/kg/dia (no 1º ano de vida, depois 1 mg/kg/dia até os 2 anos)</li>
</ul></li></ul>`
        },
        {
            id: 'ped-vitamina-d',
            area: 'Pediatria',
            titulo: 'Vitamina D',
            html: `<ul class="reader-list">
<li><strong>1º ano:</strong> 400 UI/dia</li>
<li><strong>2º ano - 18 anos:</strong> 600 UI/dia</li>
<li>Fatores de risco (vegetarianismo estrito, obesidade, hepatopatia, nefropatia crônica, má absorção, medicamentos): <strong>1.200–1.800 UI/dia</strong>.</li>
</ul>`
        },
        {
            id: 'ped-contraindicacoes-amamentacao',
            area: 'Pediatria',
            titulo: 'Contraindicações Amamentação',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Situação</th><th>Observações</th></tr></thead><tbody>
<tr><td>Mãe com HIV</td><td>Risco de transmissão do vírus pelo leite materno</td></tr>
<tr><td>Mãe com HTLV-I ou II</td><td>Transmissão pelo leite materno; evitar aleitamento</td></tr>
<tr><td>Galactosemia</td><td>Intolerância hereditária à galactose → risco metabólico grave</td></tr>
<tr><td>Fenilcetonúria</td><td>Manter leite materno + fórmula sem fenilalanina</td></tr>
</tbody></table></div>`
        },
        {
            id: 'ped-avaliacao-crescimento',
            area: 'Pediatria',
            titulo: 'Avaliação do Crescimento',
            html: `<ul class="reader-list">
<li><strong>Peso:</strong>
<ul class="reader-list reader-sublist">
<li>Perde até 10% nos primeiros dias de vida.</li>
<li><strong>Ganho esperado no 1º ano de vida:</strong>
<ul class="reader-list reader-sublist">
<li>1º tri: 700 g/mês</li>
<li>2º tri: 600 g/mês</li>
<li>3º tri: 500 g/mês</li>
<li>4º tri: 300 g/mês</li>
</ul></li>
<li>Peso duplica com 4–5 meses e triplica com 1 ano.</li>
</ul></li>
<li><strong>Estatura:</strong>
<ul class="reader-list reader-sublist">
<li><u>1º ano:</u> 25 cm (1º sem: 15 cm e 2º sem: 10 cm)</li>
<li><u>2º ano:</u> 12 cm</li>
<li><u>pré-escolar:</u> 7–8 cm/ano</li>
<li><u>escolar:</u> 6–7 cm/ano</li>
</ul></li>
<li><strong>Perímetro cefálico:</strong>
<ul class="reader-list reader-sublist">
<li>Ao nascer: 33–37cm</li>
<li>1º tri: 2 cm/mês</li>
<li>2º tri: 1 cm/mês</li>
<li>2º semestre: 0,5 cm/mês</li>
</ul></li>
</ul>`
        },
        {
            id: 'ped-desenvolvimento-neuropsicomotor',
            area: 'Pediatria',
            titulo: 'Desenvolvimento Neuropsicomotor – Tabela Resumida',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Idade</th><th>Motor</th><th>Adaptativo / Cognitivo</th><th>Social</th><th>Linguagem</th></tr></thead><tbody>
<tr><td>RN</td><td>Postura tônico-cervical</td><td>Fixa visão</td><td>Preferência pela face humana</td><td>—</td></tr>
<tr><td>1 mês</td><td>Levanta o queixo em prona</td><td>Acompanha objeto de forma limitada</td><td>Sorriso espontâneo</td><td>—</td></tr>
<tr><td>2 meses</td><td>Levanta a cabeça em prona</td><td>Acompanha objeto em 180°</td><td>Sorriso social</td><td>Vocalização</td></tr>
<tr><td>3 meses</td><td>Levanta cabeça e tronco; sustentação pendular da cabeça</td><td>Estende as mãos para o objeto</td><td>—</td><td>"Aah", "Ngah"</td></tr>
<tr><td>4 meses</td><td>Cabeça centralizada; olha as mãos na linha média; sustenta a cabeça</td><td>Pega cubital</td><td>Riso alto</td><td>—</td></tr>
<tr><td>6–7 meses</td><td>Rola; senta sem apoio</td><td>Pega radial; transfere objetos entre as mãos</td><td>Preferência pela mãe</td><td>Polissílabos vogais (lalação)</td></tr>
<tr><td>9–10 meses</td><td>Engatinha; apoia-se nos pés e mãos</td><td>Faz pinça com os dedos; solta objetos se retirados</td><td>Estranha desconhecidos; acena; brinca de "cadê?"</td><td>Polissílabos (mama, papa)</td></tr>
<tr><td>12 meses</td><td>Anda com apoio; levanta-se sozinho</td><td>Entrega objetos (socialização)</td><td>—</td><td>Algumas palavras com significado</td></tr>
<tr><td>15 meses</td><td>Anda sem apoio; sobe escadas</td><td>Torre de 3 cubos; faz linha com lápis</td><td>Aponta o que deseja; abraça os pais</td><td>Obedece a comandos simples</td></tr>
<tr><td>18 meses</td><td>Corre; sobe escadas com apoio</td><td>Torre de 4 cubos; faz rabiscos</td><td>Pede ajuda; come sozinho; beija os pais</td><td>~10 palavras</td></tr>
<tr><td>2–3 anos</td><td>Chuta bola sem perder equilíbrio; equilibra-se em um pé; sobe escadas; pula; anda de triciclo</td><td>Brinca de faz de conta; usa brinquedos com botões e peças móveis; quebra-cabeça 3–4 peças; copia círculo; torre &gt;6 cubos</td><td>Imita adultos e amigos; demonstra afeto e preocupação; compreende posse; separa-se facilmente dos pais</td><td>Fala frases de 2–3 palavras; nomeia amigos e familiares; fala "eu", "nós", "você"; segue instruções de 2–3 etapas</td></tr>
<tr><td>4 anos</td><td>Pula sobre um pé; desenha figura humana simples; controle esfincteriano diurno</td><td>Conhece cores e números; entende "antes/depois"; copia formas geométricas</td><td>—</td><td>Vocabulário de 1500–2000 palavras; conta histórias; usa conjunções e preposições</td></tr>
<tr><td>5 anos</td><td>Pula e pega bola; pula alternadamente; copia triângulo; desenha pessoa com 6 partes; usa tesoura; controle esfincteriano diurno e noturno</td><td>—</td><td>Testa limites; pode ter amigos imaginários; segue instruções</td><td>Gosta de conversar; usa corretamente plurais, pronomes e tempos verbais</td></tr>
<tr><td>6 anos</td><td>Anda em linha reta com toda a superfície do pé; escreve o próprio nome</td><td>Copia formas; assegura higiene com autonomia</td><td>—</td><td>—</td></tr>
</tbody></table></div>`
        },
        {
            id: 'ped-icterica-krammer',
            area: 'Pediatria',
            titulo: 'Icterícia Neonatal - Krammer',
            imagem: 'assets/bullets/img/ped-icterica-krammer.png',
            html: `<ul class="reader-list">
<li><strong>Zona 1.</strong> Icterícia de cabeça e pescoço (BT = 6mg/dl)</li>
<li><strong>Zona 2.</strong> Icterícia até no umbigo (BT = 9mg/dl)</li>
<li><strong>Zona 3.</strong> Icterícia até os joelhos (BT = 12mg/dl)</li>
<li><strong>Zona 4.</strong> Icterícia até os tornozelos e/ou antebraço (BT = 15mg/dl)</li>
<li><strong>Zona 5.</strong> Icterícia até região plantar e palmar (BT = 18mg/dl ou mais)</li>
</ul>`
        },
        {
            id: 'ped-taquipneia-faixa-etaria',
            area: 'Pediatria',
            titulo: 'Taquipneia por faixa etária pediátrica',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Faixa etária</th><th>FR normal</th><th>Taquipneia (FR ≥)</th></tr></thead><tbody>
<tr><td>Recém-nascido (0 a 1 mês)</td><td>30 – 60 irpm</td><td><strong>&gt; 60 irpm</strong></td></tr>
<tr><td>Lactente (2 a 12 meses)</td><td>30 – 50 irpm</td><td><strong>&gt; 50 irpm</strong></td></tr>
<tr><td>Criança pequena (1 a 5 anos)</td><td>20 – 40 irpm</td><td><strong>&gt; 40 irpm</strong></td></tr>
</tbody></table></div>`
        },
        {
            id: 'ped-indicacoes-palivizumabe',
            area: 'Pediatria',
            titulo: 'Indicações Palivizumabe - VSR',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Grupo de risco</th><th>Indicação detalhada</th></tr></thead><tbody>
<tr><td>Prematuros (&lt; 29 semanas de idade gestacional)</td><td>Até <strong>1 ano de idade cronológica</strong> no início da sazonalidade do VSR.</td></tr>
<tr><td>Crianças com doenças pulmonares graves não relacionadas à prematuridade</td><td>Até os <strong>2 anos de idade</strong>. Ex.: fibrose cística com repercussão pulmonar ou necessidade de oxigenoterapia.</td></tr>
<tr><td>Crianças com cardiopatia congênita hemodinamicamente significativa</td><td>Até <strong>2 anos de idade</strong> se apresentarem <strong>hipertensão pulmonar, cianose ou insuficiência cardíaca congestiva</strong>.</td></tr>
</tbody></table></div>`
        },
        {
            id: 'ped-indicacoes-niservimabe',
            area: 'Pediatria',
            titulo: 'Indicações Niservimabe - VSR',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Grupo de pacientes</th><th>Critérios de indicação</th></tr></thead><tbody>
<tr><td>Prematuros &lt; 37 semanas</td><td>–</td></tr>
<tr><td>Lactentes e crianças até 24 meses de idade de alto risco na 2ª temporada de VSR</td><td>- <strong>Displasia broncopulmonar (DBP)</strong> com necessidade recente de O₂, corticoide, broncodilatador ou diurético - <strong>Cardiopatia congênita hemodinamicamente significativa</strong> - <strong>Imunodeficiências graves, transplantados ou doenças pulmonares crônicas</strong></td></tr>
</tbody></table></div>`
        },
        {
            id: 'ped-indice-preditivo-asma',
            area: 'Pediatria',
            titulo: 'Índice Preditivo de Asma',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Critérios Maiores</th><th>Critérios Menores</th></tr></thead><tbody>
<tr><td>① Asma em um dos pais</td><td>① Eosinofilia ≥ 4%</td></tr>
<tr><td>② Dermatite atópica (diagnosticada por médico)</td><td>② Sensibilidade alérgica a leite, ovos e amendoim</td></tr>
<tr><td>③ Sensibilização a alérgeno inalante</td><td>③ Sibilância sem resfriado viral (chiado independente de infecção)</td></tr>
</tbody></table></div>
<p><strong>IPA positivo se:</strong></p>
<ul class="reader-list"><li>≥ 1 critério maior, ou</li><li>≥ 2 critérios menores</li></ul>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Resultado</th><th>Significado</th></tr></thead><tbody>
<tr><td>IPA positivo</td><td>Alta probabilidade de desenvolver <strong>asma persistente</strong> na idade escolar.</td></tr>
<tr><td>IPA negativo</td><td>Baixa probabilidade — sibilância provavelmente transitória (ex: por infecções virais).</td></tr>
</tbody></table></div>`
        },
        {
            id: 'ped-asma-gina-2025',
            area: 'Pediatria',
            titulo: 'Asma - GINA 2025',
            html: `<ul class="reader-list">
<li><strong>Diagnóstico &lt;5 anos</strong>
<ul class="reader-list reader-sublist">
<li>Episódios recorrentes de sibilância aguda (sintomas como sibilância na expiração com duração superior a 24 horas) OU um episódio + sintomas asma-like entre crises.</li>
<li>Excluir diagnósticos diferenciais (traqueomalácia, fibrose cística, refluxo, etc.).</li>
<li>Melhora com SABA/CI</li>
<li>Se critérios incompletos → "asma suspeita" e acompanhar.</li>
<li>Histórico pessoal ou familiar de doença alérgica não é obrigatório e nem específico.</li>
</ul></li>
<li><strong>Diagnóstico &gt;6 anos</strong>
<ul class="reader-list reader-sublist">
<li>Sintomas típicos + evidência de limitação variável do fluxo expiratório.</li>
<li>Testes: espirometria (padrão-ouro), pico de fluxo expiratório (PEF), biomarcadores (FeNO ↑, eosinofilia) se espirometria indisponível.</li>
</ul></li>
</ul>
<div class="reader-callout reader-callout-bloco"><p>Obs: FeNO &gt;35 ppb nas crianças e &gt;50 ppb nos adolescentes; eosinofilia sanguínea acima dos valores de referência nacionais/regionais</p></div>
<ul class="reader-list">
<li><strong>Tratamento &lt;5 anos (passos)</strong>
<ul class="reader-list reader-sublist">
<li>Passo 1: SABA SOS.</li>
<li>Passo 2: CI baixa + SABA SOS</li>
<li>Passo 3: CI média (dobro da dose) + SABA SOS</li>
<li>Passo 4: CI dose média + ARLT - Montelucaste (efeitos neuropsiquiátricos) OU CI dose média + LABA + encaminhar especialista // + SABA SOS</li>
</ul></li>
<li><strong>Tratamento 6–11 anos (passos)</strong>
<ul class="reader-list reader-sublist">
<li>Passo 1: CI baixa + SABA SOS.</li>
<li>Passo 2: CI baixa + SABA SOS</li>
<li>Passo 3: CI/LABA baixa dose ou CI dose média // + SABA SOS</li>
<li>Passo 4: CI dose baixa + LABA (MART) ou CI dose média + LABA fixo // + SABA SOS</li>
<li>Passo 5: Encaminhar para avaliação do fenótipo. Considerar a manutenção com CI dose alta + LABA ou LAMA, anti-IgE, anti-IL5/5R, anti-IL4Rα.</li>
</ul></li>
</ul>
<p><strong>Exacerbação de asma:</strong></p>
<ol class="reader-list">
<li><em>Leve/moderada:</em>
<ul class="reader-list reader-sublist">
<li>Fala sentenças</li><li>FR até 40 em &lt;5 anos e até 30 em &gt;6 anos</li><li>Sem uso de musculatura acessória</li>
<li>FC até 100 se &lt;5 anos ou até 120 se &gt;6 anos</li><li>Sat &gt;92% se &lt;5 anos ou entre 90-95% se &gt;6 anos</li>
<li>Sem alteração de consciência se &gt;6 anos</li><li>Pode ter agitação leve em &lt;5 anos</li>
</ul></li>
<li><em>Grave:</em>
<ul class="reader-list reader-sublist">
<li>Postura recostada para frente em &gt;6 anos</li><li>Dificuldade de falar palavras</li><li>Sonolência/confusão mental</li>
<li>Agitação se &gt;6 anos</li><li>Sibilos difusos, durante inspiração e expiração</li><li>Cianose</li>
<li>Uso de musculatura acessória</li><li>FR &gt;40 em &lt;5 anos ou &gt;30 nos &gt;6 anos</li>
</ul></li>
</ol>
<p><strong>Manejo exacerbação:</strong></p>
<p>→ <strong>Menores de 6 anos:</strong></p>
<ol class="reader-list">
<li><em>Leve/moderada:</em>
<ul class="reader-list reader-sublist">
<li>Salbutamol: 4 jatos de 20/20 min 3x</li><li>Considerar ipratrópio se não melhorar com salbutamol</li><li>Corticoide se não melhorar com salbutamol</li>
</ul></li>
<li><em>Grave:</em>
<ul class="reader-list reader-sublist">
<li>Salbutamol: 6 jatos de 20/20 min 3x</li><li>Prednisolona 1-2 mg/kg</li><li>Ipratrópio 20 mcg 4 jatos (20 gotas) 20/20 min 3x</li>
<li>O2 para manter Sat &gt; 94%</li><li>Considerar sulfato de magnésio EV para &gt; 2 anos</li>
</ul></li>
</ol>
<p>→ <strong>Maiores de 6 anos:</strong></p>
<ol class="reader-list">
<li><em>Leve/moderada:</em>
<ul class="reader-list reader-sublist">
<li>Salbutamol: 4-10 jatos de 20/20 min 3x</li><li>Considerar prednisolona 1-2 mg/kg EV ou VO</li><li>O2 para manter Sat &gt; 94%</li><li>Considerar ipratrópio se não melhorar com salbutamol</li>
</ul></li>
<li><em>Grave:</em>
<ul class="reader-list reader-sublist">
<li>Salbutamol: 4-10 jatos de 20/20 min 3x</li><li>Ipratrópio 20/20 min 3x</li><li>Prednisolona 1-2mg/kg EV ou VO</li><li>O2 para manter Sat &gt; 94%</li><li>Considerar sulfato de magnésio EV para &gt; 2 anos</li>
</ul></li>
</ol>`
        },
        {
            id: 'ped-calendario-vacinal',
            area: 'Pediatria',
            titulo: 'Imunização - Calendário Vacinal',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Idade</th><th>Vacinas / Doses indicadas</th><th>Observações / mudanças 2025</th></tr></thead><tbody>
<tr><td>Ao nascer</td><td>• BCG (dose única, intradérmica) • Hepatite B (1ª dose, intramuscular)</td><td>Deve ser aplicada o mais precocemente possível, preferencialmente nas primeiras 12 horas de vida (Hep.B)</td></tr>
<tr><td>2 meses</td><td>• Vacina pentavalente (DTP + HB + Hib) – 1ª dose • VIP (vacina inativada poliomielite) – 1ª dose • Rotavírus humano (1ª dose) • Pneumocócica 10-valente (1ª dose)</td><td>A primeira dose de rotavírus pode ser administrada até 11 meses e 29 dias</td></tr>
<tr><td>3 meses</td><td>• Meningocócica C – 1ª dose</td><td></td></tr>
<tr><td>4 meses</td><td>• Vacina pentavalente – 2ª dose • VIP – 2ª dose • Rotavírus (2ª dose) • Pneumocócica 10-valente – 2ª dose</td><td>A segunda dose de rotavírus pode ser administrada até 23 meses e 29 dias</td></tr>
<tr><td>5 meses</td><td>• Meningocócica C – 2ª dose</td><td></td></tr>
<tr><td>6 meses</td><td>• Vacina pentavalente – 3ª dose • VIP – 3ª dose • COVID-19</td><td></td></tr>
<tr><td>7 meses</td><td>• Vacina COVID-19</td><td></td></tr>
<tr><td>9 meses</td><td>• Febre amarela – 1ª dose • Vacina COVID-19 (se indicada)</td><td></td></tr>
<tr><td>12 meses</td><td>• Tríplice viral • Meningocócica ACWY • Pneumocócica 10-valente</td><td></td></tr>
<tr><td>15 meses</td><td>• Tetra viral • Hep. A • DTP • Reforço VIP</td><td></td></tr>
<tr><td>4 anos / 5 anos</td><td>• DTP • Febre amarela • Varicela</td><td></td></tr>
</tbody></table></div>
<ul class="reader-list"><li><strong>Adolescentes:</strong>
<ul class="reader-list reader-sublist">
<li>HPV: 9 - 14 anos (resgate dos 15-19 anos)</li>
<li>Dengue: 10-14 anos</li>
<li>Meningo ACWY: 11-14 anos</li>
</ul></li></ul>`
        },
        {
            id: 'ped-doencas-exantematicas',
            area: 'Pediatria',
            titulo: 'Doenças Exantemáticas',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Doença</th><th>Agente Etiológico</th><th>Exantema</th><th>Sinais / Sintomas Associados</th></tr></thead><tbody>
<tr><td>Sarampo</td><td>Vírus da família Paramyxoviridae</td><td>Maculopapular, inicia atrás das orelhas e pescoço → face → tronco e membros</td><td>Febre alta, tosse, coriza, conjuntivite, manchas de Koplik na mucosa bucal</td></tr>
<tr><td>Rubéola</td><td>Vírus da família Togaviridae</td><td>Máculo-papular, inicia na face → tronco → membros</td><td>Febre baixa, linfadenopatia retroauricular e occipital, artralgia leve. manchas de Forchheimer (não é patognomônico)</td></tr>
<tr><td>Varicela (catapora)</td><td>Varicela-zoster</td><td>Lesões em "cascata": máculas → pápulas → vesículas → crostas, disseminadas</td><td>Prurido intenso, febre baixa, mal-estar</td></tr>
<tr><td>Escarlatina</td><td>Streptococcus pyogenes (A)</td><td>Exantema fino, punctiforme, "aspereza de lixa", inicia tronco → face e extremidades, sinal de Filatov e pastia</td><td>Febre, faringite, língua em "morango", descamação periungueal</td></tr>
<tr><td>Exantema súbito (roseola / HHV-6)</td><td>Herpesvírus humano tipo 6</td><td>Máculas rosadas discretas, iniciam no tronco, duram 1–2 dias, após febre</td><td>Febre alta súbita 3–5 dias, geralmente assintomático após febre</td></tr>
</tbody></table></div>`
        },
        {
            id: 'ped-doenca-kawasaki',
            area: 'Pediatria',
            titulo: 'Doença de Kawasaki - Diagnóstico',
            html: `<p><strong>Febre alta persistente (≥ 5 dias) + pelo menos 4 dos 5 critérios clínicos abaixo:</strong></p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Critério</th><th>Descrição</th></tr></thead><tbody>
<tr><td>1. Conjuntivite bilateral não purulenta</td><td>Hiperemia conjuntival sem secreção (não exsudativa).</td></tr>
<tr><td>2. Alterações orais e labiais</td><td>Lábios vermelhos e fissurados, língua em "framboesa" (língua de morango), orofaringe eritematosa.</td></tr>
<tr><td>3. Alterações nas extremidades</td><td>Edema e eritema de mãos e pés na fase aguda; descamação periungueal na fase de convalescença.</td></tr>
<tr><td>4. Exantema polimorfo</td><td>Pode ser maculopapular, morbiliforme, escarlatiniforme ou urticariforme — sem vesículas ou crostas.</td></tr>
<tr><td>5. Linfadenopatia cervical</td><td>Geralmente unilateral, &gt; 1,5 cm de diâmetro.</td></tr>
</tbody></table></div>`
        },
        {
            id: 'ped-parasitoses-resumo',
            area: 'Pediatria',
            titulo: 'Parasitoses - Tabela Resumo',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Agente</th><th>Palavras-chave</th><th>Tratamento (1ª linha)</th></tr></thead><tbody>
<tr><td>Ascaris lumbricoides</td><td>Intestino delgado; <strong>obstrução intestinal</strong>; síndrome de <strong>Löffler</strong></td><td>Albendazol, mebendazol</td></tr>
<tr><td>Trichuris trichiura</td><td>Ceco e cólon; anemia/desnutrição; <strong>prolapso retal</strong></td><td>Albendazol, mebendazol</td></tr>
<tr><td>Necator americanus / Ancylostoma duodenale</td><td>Penetram pela pele; anemia; <strong>perda proteica e anasarca</strong></td><td>Albendazol, mebendazol</td></tr>
<tr><td>Enterobius vermicularis (oxiurus)</td><td>Habita o ceco e cólon; <strong>prurido anal</strong></td><td>Pirvínio, albendazol, mebendazol</td></tr>
<tr><td>Taenia solium (porco) / Taenia saginata (boi)</td><td>Carne malcozida; ovos da <strong>solium</strong> → risco de <strong>cisticercose</strong></td><td>Praziquantel</td></tr>
<tr><td>Giardia lamblia</td><td>Assintomática ou <strong>esteatorreia</strong></td><td>Metronidazol, albendazol, tinidazol, secnidazol, nitazoxanida</td></tr>
</tbody></table></div>`
        },
        {
            id: 'ped-refluxo-vesicoureteral',
            area: 'Pediatria',
            titulo: 'Classificação Refluxo Vesicoureteral',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Grau</th><th>Descrição radiológica</th><th>Aspectos principais</th></tr></thead><tbody>
<tr><td>Grau I</td><td>Refluxo <strong>apenas até o ureter</strong>, sem atingir a pelve renal.</td><td>Ureter de calibre e contornos normais.</td></tr>
<tr><td>Grau II</td><td>Refluxo atinge <strong>pelve renal e cálices</strong>, mas <strong>sem dilatação</strong>.</td><td>Sistema pielocalicial de aspecto normal.</td></tr>
<tr><td>Grau III</td><td>Refluxo com <strong>dilatação leve a moderada</strong> do ureter e da pelve renal, e <strong>achatamento leve das papilas</strong>.</td><td>Começa a haver tortuosidade ureteral.</td></tr>
<tr><td>Grau IV</td><td>Refluxo com <strong>dilatação moderada</strong> do ureter e pelve, <strong>tortuosidade ureteral</strong> e <strong>papilas parcialmente obliteradas</strong>.</td><td>Refluxo significativo, porém ainda com contornos renais preservados.</td></tr>
<tr><td>Grau V</td><td><strong>Dilatação acentuada</strong> de ureter e pelve, <strong>tortuosidade grave</strong>, <strong>papilas totalmente obliteradas</strong> e <strong>atrofia cortical renal</strong>.</td><td>Refluxo grave com risco de cicatrizes renais permanentes.</td></tr>
</tbody></table></div>`
        },
        {
            id: 'ped-manejo-diarreia',
            area: 'Pediatria',
            titulo: 'Manejo Diarreia - Planos A / B / C',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Plano</th><th>Indicação</th><th>Conduta / Tratamento</th><th>Observações</th></tr></thead><tbody>
<tr><td>Plano A – Prevenção e manutenção (leve ou sem desidratação)</td><td>Crianças com diarreia <strong>sem sinais de desidratação</strong></td><td>Continuar aleitamento materno; oferecer líquidos caseiros (soro de reidratação oral caseiro, sopas, água, chás); administrar <strong>zincoterapia 10–20 mg/dia por 10–14 dias</strong></td><td>Monitorar sinais de desidratação; orientar família sobre sinais de alerta</td></tr>
<tr><td>Plano B – Reidratação oral (desidratação moderada)</td><td>Crianças com <strong>desidratação moderada</strong> (olhos fundos, sede, turgor ↓, irritabilidade)</td><td><strong>Soro de reidratação oral (SRO)</strong> 50–100 ml/kg em 4–6 horas; continuar alimentação (leite materno e dieta habitual); ondansetrona se náusea</td><td>Reavaliar após 4 horas; se desidratação persistir → passar para Plano C</td></tr>
<tr><td>Plano C – Reidratação intravenosa (desidratação grave / choque)</td><td>Crianças com <strong>choque ou desidratação grave</strong> (letargia, pulso fraco, extremidades frias, oligo/anúria, PA baixa)</td><td><strong>Reposição rápida IV ou IO:</strong> &lt; 1 ano → 30 ml/kg em 1 hora e 70 ml/kg em 6 horas; &gt; 1 ano: 30 ml/kg em 30 minutos e 70 ml/kg em 2h e 30 minutos</td><td>Monitorar sinais vitais e perfusão; evitar sobrecarga hídrica</td></tr>
</tbody></table></div>`
        },
        {
            id: 'ped-constipacao-roma-iv',
            area: 'Pediatria',
            titulo: 'Constipação Funcional Infantil – Critérios de Roma IV',
            html: `<p><strong>Idade:</strong> Crianças ≥ 4 anos ou antes se houver sinais persistentes.</p>
<p><strong>Critérios (devem estar presentes pelo menos 1 mês em crianças menores de 4 anos, ou ≥ 2 meses em maiores):</strong></p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Critério</th><th>Descrição</th></tr></thead><tbody>
<tr><td>Evacuações infrequentes</td><td>≤ 2 vezes por semana</td></tr>
<tr><td>Fezes grandes ou duras</td><td>Presença de fezes volumosas ou endurecidas que podem causar dor</td></tr>
<tr><td>Episódios de fecaloma / impactação</td><td>Presença de massa fecal retal palpável ou impactação</td></tr>
<tr><td>Dificuldade ou esforço evacuatório</td><td>Dor, esforço ou retenção ativa para evitar defecação</td></tr>
<tr><td>Evacuação dolorosa</td><td>Evacuações dolorosas ou sangramento anal ocasional</td></tr>
<tr><td>Grande quantidade de fezes em casa</td><td>Evacuação de fezes grandes que podem obstruir o vaso sanitário</td></tr>
<tr><td>Retenção fecal voluntária</td><td>Comportamento de retenção, postura de "cruzar pernas" ou esconder-se</td></tr>
<tr><td>Incontinência fecal</td><td>Escape fecal involuntário em crianças com constipação crônica</td></tr>
</tbody></table></div>`
        },
        {
            id: 'ped-escala-tanner',
            area: 'Pediatria',
            titulo: 'Puberdade – Escala de Tanner',
            imagem: 'assets/bullets/img/ped-tanner-escala.png',
            html: `<p><strong>Feminina:</strong> puberdade fisiológica: 8 – 13 anos</p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Estágio Tanner</th><th>Mamas</th><th>Pelos pubianos</th></tr></thead><tbody>
<tr><td>Tanner I</td><td>Platô pré-púbere, tecido mamário infantil</td><td>Ausência</td></tr>
<tr><td>Tanner II</td><td>Broto mamário (elevação da papila e pequenas elevações do tecido mamário)</td><td>Pelos escassos, finos, alongados na linha dos lábios</td></tr>
<tr><td>Tanner III</td><td>Aumento da mama e aréola, sem separação dos contornos</td><td>Pelos mais escuros, mais grossos, começam a se espalhar</td></tr>
<tr><td>Tanner IV</td><td>Aréola e papila elevadas formando um segundo contorno (mama em forma de "muito madura")</td><td>Pelos semelhantes a adultos, mas área menor, sem extensão para coxas</td></tr>
<tr><td>Tanner V</td><td>Mama adulta (papila projetada, contorno mamário uniforme)</td><td>Distribuição adulta, área se estende à região medial das coxas</td></tr>
</tbody></table></div>
<p><strong>Masculina:</strong> puberdade fisiológica: 9 – 14 anos</p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Estágio Tanner</th><th>Genitália (testículos/pênis)</th><th>Pelos pubianos</th></tr></thead><tbody>
<tr><td>Tanner I</td><td>Testículos &lt; 4 ml, pênis infantil</td><td>Ausência</td></tr>
<tr><td>Tanner II</td><td>Testículos 4–8 ml, escroto começa a aumentar e escurecer; pênis leve aumento em comprimento</td><td>Pelos escassos, finos, alongados, base do pênis</td></tr>
<tr><td>Tanner III</td><td>Testículos 8–12 ml, pênis aumenta em comprimento</td><td>Pelos mais escuros, mais grossos, começam a se espalhar</td></tr>
<tr><td>Tanner IV</td><td>Testículos 12–15 ml, pênis aumenta em comprimento e diâmetro, glande mais definida</td><td>Pelos semelhantes a adultos, mas área menor, sem extensão para coxas</td></tr>
<tr><td>Tanner V</td><td>Testículos &gt; 15 ml, pênis adulto</td><td>Distribuição adulta, área se estende à região medial das coxas</td></tr>
</tbody></table></div>`
        },
        {
            id: 'ped-triagem-mchat',
            area: 'Pediatria',
            titulo: 'Transtorno do Espectro Autista (TEA) - Triagem M-CHAT',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Pontuação</th><th>Significado / Conduta</th></tr></thead><tbody>
<tr><td>0–2 respostas de risco</td><td>Baixo risco – acompanhamento usual</td></tr>
<tr><td>3–7 respostas de risco</td><td>Risco médio – reforçar acompanhamento, reavaliação breve</td></tr>
<tr><td>8–20 respostas de risco</td><td>Risco alto – encaminhar imediatamente para avaliação especializada (neuropediatria / psicologia / fonoaudiologia)</td></tr>
</tbody></table></div>
<div class="reader-callout reader-callout-bloco">
<p class="reader-callout-title">💡 Observações rápidas:</p>
<ul class="reader-list">
<li>M-CHAT é <strong>um instrumento de triagem</strong>, <strong>não diagnóstica</strong> o autismo.</li>
<li>Triagem deve ser feita <strong>entre 16 e 30 meses</strong>.</li>
<li>Avaliação diagnóstica completa inclui <strong>observação clínica, histórico detalhado, desenvolvimento, linguagem e comportamento social</strong>.</li>
</ul>
</div>`
        },
        {
            id: 'ped-tdah',
            area: 'Pediatria',
            titulo: 'TDAH (Transtorno do Déficit de Atenção com Hiperatividade)',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Categoria</th><th>Detalhes</th></tr></thead><tbody>
<tr><td>Definição</td><td>Transtorno neurodesenvolvimental caracterizado por desatenção, hiperatividade e impulsividade, presente desde a infância e afetando funcionamento social, acadêmico e ocupacional.</td></tr>
<tr><td>Subtipos</td><td>1. Predominantemente desatento (TDA) 2. Predominantemente hiperativo-impulsivo (TDH) 3. Combinado (TDAH)</td></tr>
<tr><td>Critérios diagnósticos (DSM-5)</td><td><strong>Desatenção (≥6 sintomas por ≥6 meses)</strong>: dificuldade em prestar atenção, seguir instruções, organizar tarefas, evitar atividades que exigem esforço mental contínuo. <strong>Hiperatividade/Impulsividade (≥6 sintomas por ≥6 meses)</strong>: inquietação, falar excessivamente, dificuldade em esperar a vez, interromper outros. Sintomas presentes antes dos 12 anos e em 2 ou mais contextos (escola, casa, social).</td></tr>
<tr><td>Diagnóstico</td><td>Clínico; baseado em história, observação e escalas de avaliação (Conners, SNAP, Vanderbilt). Excluir causas secundárias (transtornos de sono, ansiedade, depressão).</td></tr>
<tr><td>Comorbidades comuns</td><td>Transtornos de aprendizagem, ansiedade, depressão, transtornos de conduta, abuso de substâncias.</td></tr>
<tr><td>Tratamento</td><td><strong>Farmacológico:</strong> estimulantes (metilfenidato, lisdexanfetamina), não estimulantes (atomoxetina, guanfacina). <strong>Psicossocial:</strong> terapia cognitivo-comportamental, treinamento de habilidades sociais, apoio escolar.</td></tr>
</tbody></table></div>`
        },
        {
            id: 'ped-febre-reumatica-jones',
            area: 'Pediatria',
            titulo: 'Febre Reumática - Critérios de Jones Revisados',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Tipo de Critério</th><th>Critério</th></tr></thead><tbody>
<tr><td rowspan="5">Maior</td><td>Cardite</td></tr>
<tr><td>Poliartrite migratória</td></tr>
<tr><td>Coreia de Sydenham</td></tr>
<tr><td>Eritema marginado</td></tr>
<tr><td>Nódulos subcutâneos</td></tr>
<tr><td rowspan="4">Menor</td><td>Febre</td></tr>
<tr><td>Artralgia</td></tr>
<tr><td>Alterações laboratoriais inflamatórias</td></tr>
<tr><td>Alterações cardíacas eletrocardiográficas</td></tr>
<tr><td>Evidência de infecção prévia por Streptococcus</td><td>Ex.: cultura positiva ou ASO elevado</td></tr>
</tbody></table></div>
<ul class="reader-list">
<li><strong>Diagnóstico</strong>
<ul class="reader-list reader-sublist">
<li><strong>Primeiro episódio:</strong> 2 critérios maiores <strong>OU</strong> 1 maior + 2 menores <strong>+ evidência de infecção estreptocócica.</strong></li>
<li><strong>Recorrência:</strong> 2 critérios maiores <strong>OU</strong> 1 maior + 2 menores + evidência de infecção estreptocócica <strong>OU</strong> 3 menores + evidência de infecção estreptocócica.</li>
</ul></li>
</ul>
<p><strong>Profilaxia secundária:</strong></p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Situação Clínica</th><th>Tratamento</th><th>Intervalo</th><th>Duração</th></tr></thead><tbody>
<tr><td>Sem cardite</td><td>Penicilina G benzatina IM</td><td>A cada 21-28 dias (21 em regiões de alta incidência)</td><td>Até 21 anos ou mínimo de 5 anos</td></tr>
<tr><td>Cardite com sequelas mínimas</td><td>Penicilina G benzatina IM</td><td>A cada 21-28 dias</td><td>Até 25 anos ou mínimo de 10 anos</td></tr>
<tr><td>Cardite com sequelas moderadas a graves</td><td>Penicilina G benzatina IM</td><td>A cada 21-28 dias</td><td>Até 40 anos ou, em alto risco, para toda a vida</td></tr>
</tbody></table></div>`
        },
        {
            id: 'ped-doencas-neurocutaneas',
            area: 'Pediatria',
            titulo: 'Doenças Neurocutâneas',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Síndrome</th><th>Herança / Gene</th><th>Manifestações Cutâneas</th><th>Manifestações Neurológicas</th><th>Outros Achados Importantes</th></tr></thead><tbody>
<tr><td>Neurofibromatose tipo 1 (NF1)</td><td>Autossômica dominante – gene NF1 (17q11.2)</td><td>Manchas café-com-leite, sardas axilares/inguinais, neurofibromas cutâneos e plexiformes</td><td>Glioma óptico, convulsões, atraso cognitivo</td><td>Nódulos de Lisch (íris), escoliose, risco ↑ de tumores</td></tr>
<tr><td>Neurofibromatose tipo 2 (NF2)</td><td>Autossômica dominante – gene NF2 (22q12)</td><td>Mínimas ou ausentes</td><td>Schwannomas vestibulares bilaterais (perda auditiva), meningiomas, ependimomas</td><td>Catarata juvenil posterior subcapsular</td></tr>
<tr><td>Esclerose Tuberosa (Síndrome de Bourneville)</td><td>Autossômica dominante – genes TSC1 (hamartina) ou TSC2 (tuberina)</td><td>Máculas hipocrômicas ("manchas em folha de freixo"), angiofibromas faciais, placas de Shagreen, fibromas ungueais</td><td>Crises convulsivas precoces, atraso neuropsicomotor, autismo</td><td>Rabdomioma cardíaco, angiomiolipoma renal, cistos pulmonares</td></tr>
<tr><td>Síndrome de Sturge-Weber</td><td>Esporádica – mutação somática no gene GNAQ</td><td>Mancha vinho-do-porto (angioma plano facial) no território do trigêmeo (V1)</td><td>Convulsões, hemiparesia, atraso neuropsicomotor, calcificações corticais ("trilho de trem")</td><td>Glaucoma, angiomatose leptomeníngea, hemangioma de coroide</td></tr>
<tr><td>Síndrome de Von Hippel-Lindau (VHL)</td><td>Autossômica dominante – gene VHL (3p25-26)</td><td>Geralmente ausentes</td><td>Hemangioblastomas de SNC e retina</td><td>Carcinoma renal (clear cell), feocromocitoma, cistos pancreáticos e renais</td></tr>
</tbody></table></div>`
        },
        {
            id: 'ped-reflexos-primitivos',
            area: 'Pediatria',
            titulo: 'Reflexos Primitivos',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Reflexo</th><th>Descrição</th><th>Idade de Desaparecimento</th><th>Observações / Alterações Clínicas</th></tr></thead><tbody>
<tr><td>Moro</td><td>Estímulo súbito → abdução e extensão dos braços, seguida de adução e choro</td><td><strong>4 a 6 meses</strong></td><td>Persistente após 6 meses → lesão neurológica (ex: paralisia cerebral)</td></tr>
<tr><td>Tônico cervical assimétrico (esgrimista)</td><td>Rotação da cabeça → extensão do braço e perna do mesmo lado e flexão contralateral</td><td><strong>4 a 6 meses</strong></td><td>Persistência interfere com controle postural</td></tr>
<tr><td>Preensão palmar</td><td>Pressão na palma → flexão dos dedos</td><td><strong>4 a 6 meses</strong></td><td>Persistência impede desenvolvimento da coordenação fina</td></tr>
<tr><td>Preensão plantar</td><td>Pressão na planta do pé → flexão dos artelhos</td><td><strong>9 a 12 meses</strong></td><td>Deve desaparecer antes da marcha</td></tr>
<tr><td>Sucção</td><td>Estímulo nos lábios → movimentos de sucção</td><td><strong>4 meses</strong></td><td>Persistência → atraso neurológico</td></tr>
<tr><td>Busca (rooting)</td><td>Toque na bochecha → bebê vira a cabeça para o estímulo e tenta sugar</td><td><strong>3 a 4 meses</strong></td><td>Importante para amamentação inicial</td></tr>
<tr><td>Marcha automática</td><td>Apoio dos pés → movimentos alternados de marcha</td><td><strong>2 meses</strong></td><td>Reaparece mais tarde como marcha voluntária</td></tr>
<tr><td>Galant (incurvação do tronco)</td><td>Estímulo na região paravertebral → flexão lateral do tronco para o lado estimulado</td><td><strong>4 a 6 meses</strong></td><td>Persistência → suspeita de lesão medular</td></tr>
<tr><td>Babinski (extensão plantar)</td><td>Estímulo na planta → dorsiflexão do hálux e abertura dos artelhos</td><td><strong>até 12 meses</strong></td><td>Após 1 ano deve desaparecer; se persistir → sinal piramidal</td></tr>
<tr><td>Reflexo de Moro invertido (Landau)</td><td>Suspenso em posição ventral → extensão da cabeça e dos membros</td><td><strong>2 meses a 2 anos</strong></td><td>Indica maturação neuromotora</td></tr>
</tbody></table></div>`
        },
        {
            id: 'ped-transporte-seguro-sbp',
            area: 'Pediatria',
            titulo: 'Transporte seguro - SBP',
            html: `<div class="reader-table-wrap"><table class="reader-table"><tbody>
<tr><td>Bebê conforto</td><td>nascimento até 2 anos</td></tr>
<tr><td>Cadeirinha</td><td>até 18 / 22 kg</td></tr>
<tr><td>Assento de elevação</td><td>até 1,45 m</td></tr>
<tr><td>Cinto de segurança</td><td>banco traseiro até os 13 anos</td></tr>
</tbody></table></div>`
        },
        {
            id: 'ped-uso-telas-infancia',
            area: 'Pediatria',
            titulo: 'Uso de telas na infância',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Faixa etária</th><th>Tempo máximo recomendado de tela</th></tr></thead><tbody>
<tr><td>&lt; 2 anos</td><td><strong>Evitar totalmente</strong> (inclusive TV, tablets e celulares)</td></tr>
<tr><td>2 a 5 anos</td><td><strong>Até 1 hora por dia</strong>, sempre com supervisão</td></tr>
<tr><td>6 a 10 anos</td><td><strong>Até 1 a 2 horas por dia</strong>, com equilíbrio entre outras atividades</td></tr>
<tr><td>11 a 18 anos</td><td><strong>Até 2 a 3 horas por dia</strong>, com bom controle de tempo e conteúdo</td></tr>
<tr><td>Durante as refeições ou antes de dormir</td><td><strong>Evitar em todas as idades</strong></td></tr>
</tbody></table></div>`
        },
        {
            id: 'ped-recomendacoes-sono',
            area: 'Pediatria',
            titulo: 'Recomendações sobre sono',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Faixa-etária</th><th>Duração do sono em 24 horas</th><th>Cochilos</th></tr></thead><tbody>
<tr><td>4 – 12 meses</td><td>12 a 16 horas</td><td>incluídos</td></tr>
<tr><td>1 – 2 anos</td><td>11 a 14 horas</td><td>incluídos</td></tr>
<tr><td>3 – 5 anos</td><td>10 a 13 horas</td><td>incluídos</td></tr>
<tr><td>6 – 12 anos</td><td>9 a 12 horas</td><td>–</td></tr>
<tr><td>13 – 18 anos</td><td>8 a 10 horas</td><td>–</td></tr>
</tbody></table></div>`
        },
        {
            id: 'ped-classificacao-peso-imc-estatura',
            area: 'Pediatria',
            titulo: 'Classificação de Peso / IMC / Estatura',
            html: `<div class="reader-table-wrap"><table class="reader-table peso-imc-table"><thead><tr><th>Escore-Z</th><th>P/I (0-10 anos)</th><th>E/I (0-19 anos)</th><th>P/E | IMC/I (6m-5a | 0-5a)</th><th>IMC/I (5-19 anos)</th></tr></thead><tbody>
<tr class="sev-grave"><td>EZ &gt; 3</td><td>Peso elevado</td><td>-</td><td>Obesidade</td><td>Obesidade grave</td></tr>
<tr class="sev-moderado"><td>EZ &gt; 2</td><td>-</td><td>-</td><td>Sobrepeso</td><td>Obesidade</td></tr>
<tr class="sev-alerta"><td>EZ &gt;1</td><td>-</td><td>-</td><td>Risco de sobrepeso</td><td>Sobrepeso</td></tr>
<tr class="sev-ok"><td>EZ 0</td><td>-</td><td>-</td><td>-</td><td>-</td></tr>
<tr class="sev-moderado"><td>EZ &lt; -2</td><td>Baixo peso</td><td>Baixa estatura</td><td colspan="2">Magreza</td></tr>
<tr class="sev-grave"><td>EZ &lt; -3</td><td>Muito baixo peso</td><td>Muito baixa estatura</td><td colspan="2">Magreza acentuada</td></tr>
</tbody></table></div>`
        }
    ];

    window.TRYCKTRACK_BULLETS_PEDIATRIA = bullets;
})();
