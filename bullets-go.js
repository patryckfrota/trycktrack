/* Bullets — Ginecologia e Obstetrícia. Ver bullets-pediatria.js pro
   schema. Extraído de GO - DECOREBAS.pdf (Sanar), conferido página a
   página (31 páginas) contra o PDF original. */
(function () {
    const bullets = [
        {
            id: 'go-metodos-contraceptivos',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Métodos Contraceptivos',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Métodos</th><th>Ação</th><th>Contraindicações</th><th>Colaterais</th><th>Duração</th><th>Observações</th></tr></thead><tbody>
<tr><td>DIU de Cobre</td><td>Age a partir do cobre — espermatotóxico, reduz motilidade dos espermatozoides; promove inflamação endometrial que dificulta a nidação</td><td>Gravidez ou suspeita; anormalidades uterinas que distorcem a cavidade; DIP aguda vigente; câncer de útero/colo diagnosticado ou suspeitado; sangramento genital de etiologia desconhecida; cervicite mucopurulenta</td><td>Aumento do fluxo associado à dismenorreia</td><td>TCu 380: 10 anos; Multiload e CuAg: 5 anos</td><td>-</td></tr>
<tr><td>DIU Hormonal (Levonorgestrel)</td><td>Causa espessamento do muco cervical + atrofia endometrial</td><td>Gravidez ou suspeita; anormalidades uterinas que distorcem a cavidade; DIP aguda vigente; câncer de útero/colo diagnosticado ou colpocitológico alterado; sangramento genital de etiologia desconhecida; tumor hepático maligno; carcinoma de mama diagnosticado ou antecedente</td><td>Sangramento irregular — pela atrofia endometrial; acne</td><td>5 anos (FDA — Mirena®: 8 anos)</td><td>2 tipos no mercado: Kyleena e Mirena. Mirena tem efeito benéfico comprovado no tratamento de sangramento uterino anormal e controle de dor em pacientes com endometriose.</td></tr>
<tr><td>Implante com Etonogestrel (Implanon)</td><td>Bloqueio da ovulação (99%), por inibição do pico de LH; espessamento cervical</td><td>Antecedente pessoal de câncer de mama; tumores hepáticos malignos; sangramento genital anormal não diagnosticado</td><td>Padrão de sangramento desfavorável — frequente (sangra &gt;5x em 90 dias) e prolongado (sangra &gt;14 dias seguidos)</td><td>3 anos</td><td>-</td></tr>
<tr><td>Anticoncepcional Progestagênico</td><td>Em geral, bloqueio da ovulação; espessamento do muco cervical; atrofia endometrial; redução da motilidade tubária</td><td>Sangramento uterino sem explicação; antecedente de câncer de mama; tumores hepáticos malignos; gravidez</td><td>Cefaleia, alteração do padrão de sangramento e acne</td><td>-</td><td>Opções disponíveis: oral; injetável trimestral; implante subdérmico; sistema intrauterino</td></tr>
<tr><td>Anticoncepcional Oral Combinado (ACO)</td><td>Bloqueio da ovulação; redução da atividade do FSH; atrofia endometrial; espessamento do muco cervical; alteração da motilidade tubária</td><td>TVP/EP atual ou pregressa; trombofilia conhecida; LES com anticorpo antifosfolípide positivo ou desconhecido; tabagismo (&gt;15 cigarros/dia, idade &gt;35 anos); doença cardíaca isquêmica atual ou pregressa; HAS descompensada (sistólica &gt;160 ou diastólica &gt;100 mmHg); múltiplos fatores de risco cardiovascular (idade avançada, tabagismo, DM, HAS); AVC atual ou pregresso; enxaqueca com aura; câncer de mama atual; cirrose descompensada, adenoma hepatocelular e hepatoma; puérpera nos primeiros 21 dias pós-parto</td><td>Náuseas e vômitos; sensibilidade/aumento das mamas; cefaleia; spotting; aumento do fluxo menstrual nos primeiros ciclos; alterações de humor; retenção hídrica/inchaço</td><td>-</td><td>Opções disponíveis: oral; injetável mensal; adesivo transdérmico (troca semanal por 3 semanas, pausa de 7 dias); anel vaginal (troca após 21 dias, pausa de 7 dias)</td></tr>
</tbody></table></div>`
        },
        {
            id: 'go-metodos-comportamentais',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Métodos Comportamentais',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Método</th><th>Descrição / Como funciona</th><th>Ponto-chave para evitar gravidez</th></tr></thead><tbody>
<tr><td>Ogino-Knaus (Tabela / Método do calendário)</td><td>Registra-se os ciclos menstruais dos últimos 6 meses. Do ciclo mais curto subtrai-se 18. Do ciclo mais longo subtrai-se 11. O intervalo encontrado corresponde ao período fértil.</td><td>Evitar relações sexuais nos dias calculados como férteis.</td></tr>
<tr><td>Billings (Método do Muco Cervical)</td><td>Avaliação diária do muco cervical. Muco claro, filante e elástico = ação estrogênica, fase fértil. Muco espesso e pegajoso = ação da progesterona, fase pós-ovulatória.</td><td>Evitar relações sexuais quando o muco estiver filante, indicando alta chance de ovulação.</td></tr>
<tr><td>Curva de Temperatura Basal</td><td>Medição da temperatura todos os dias ao acordar, antes de levantar. Aumento de 0,3–0,5°C indica provável ovulação.</td><td>A ovulação ocorre no dia anterior ao aumento da temperatura → evitar relações nos dias que antecedem e imediatamente próximos ao pico.</td></tr>
<tr><td>Coito interrompido (retirada antes da ejaculação)</td><td>O pênis é retirado da vagina imediatamente antes da ejaculação.</td><td>Não confiar como método único — alto índice de falha devido ao líquido pré-ejaculatório.</td></tr>
</tbody></table></div>
<p><strong>Cálculo Período Fértil:</strong></p>
<ul class="reader-list">
<li>1º dia do período fértil = duração do ciclo mais curto – 18</li>
<li>Último dia do período fértil = duração do ciclo mais longo – 11</li>
</ul>`
        },
        {
            id: 'go-contracepcao-emergencia',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Contracepção de Emergência',
            html: `<ul class="reader-list">
<li>Demonstra benefício em até 120 horas após a relação sexual desprotegida;</li>
<li>Recomenda-se a administração idealmente até 72 horas.</li>
<li>O DIU de cobre também é uma opção como método de anticoncepção de emergência.</li>
</ul>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Método</th><th>Dose</th><th>Observação</th></tr></thead><tbody>
<tr><td>Levonorgestrel (primeira escolha)</td><td>1,5 mg de levonorgestrel V.O</td><td>1 cp → dose única</td></tr>
<tr><td>Método de Yuzpe</td><td>AHOC com 0,05 mg de etinilestradiol e 0,25 mg de levonorgestrel por comprimido</td><td>2 cp de 12/12 horas → 4 cp ao total</td></tr>
</tbody></table></div>`
        },
        {
            id: 'go-laqueadura-tubaria',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Laqueadura Tubária',
            html: `<ul class="reader-list">
<li>Idade mínima: 21 anos;</li>
<li>Não precisa da autorização do cônjuge para sua realização;</li>
<li>Mantém a necessidade do intervalo de 60 dias entre a manifestação do desejo de laqueadura e o procedimento cirúrgico;</li>
<li>Pode ser feita no momento do parto, mesmo que não seja uma situação que ofereça risco à vida ou à saúde da mulher.</li>
</ul>`
        },
        {
            id: 'go-ulceras-genitais',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Úlceras Genitais',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Etiologia</th><th>Características da úlcera</th><th>Linfonodos</th><th>Tratamento</th></tr></thead><tbody>
<tr><td>Herpes simples (HSV-1/2)</td><td>Múltiplas, pequenas, dolorosas, base eritematosa, vesículas precedem úlcera</td><td>Inguinais, dolorosos</td><td>Antivirais: Aciclovir 400 mg 5x/dia por 7–10 dias</td></tr>
<tr><td>Sífilis primária (Treponema pallidum)</td><td>Úlcera única, indolor, bordas endurecidas (cancro duro), base limpa</td><td>Adenopatia indolor</td><td>Benzatina penicilina G 2,4 milhões UI IM dose única; alergia → doxiciclina 100 mg VO 2x/dia por 14 dias (exceto se gestante)</td></tr>
<tr><td>Chancroide / Cancro Mole (Haemophilus ducreyi)</td><td>Úlceras múltiplas, dolorosas, base suja, bordas irregulares</td><td>Adenopatia dolorosa, supurativa</td><td>Azitromicina 1 g VO dose única ou Ceftriaxona 250 mg IM dose única</td></tr>
<tr><td>Linfogranuloma venéreo (Chlamydia trachomatis L1-L3)</td><td>Pequena úlcera indolor, muitas vezes discreta</td><td>Adenopatia inguinal dolorosa, pode fistulizar (bico de regador)</td><td>Doxiciclina 100 mg VO 2x/dia por 21 dias</td></tr>
<tr><td>Donovanose (Klebsiella granulomatis)</td><td>Úlceras progressivas, indolores, bordas elevadas, base sangrante ("carne viva"), nódulos de Donovan</td><td>Geralmente não há adenopatia</td><td>Azitromicina 1 g/semana por 3 semanas ou até cicatrização; alternativa: Doxiciclina 100 mg VO 2x/dia até cicatrização</td></tr>
</tbody></table></div>
<p><strong>Para você não esquecer:</strong></p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Descrição</th><th>Diagnóstico</th></tr></thead><tbody>
<tr><td>Úlcera indolor que desaparece + linfadenopatia sem fistulização?</td><td>Sífilis primária</td></tr>
<tr><td>Lesões em vários estágios evolutivos ou úlceras múltiplas, dolorosas, fundo limpo, linfadenopatia sem fistulização?</td><td>Herpes Genital</td></tr>
<tr><td>Fistulização em bico de regador?</td><td>Linfogranuloma</td></tr>
<tr><td>Úlceras dolorosas com fistulização em orifício único?</td><td>Cancro mole</td></tr>
<tr><td>Úlcera crônica, indolor, em espelho, sem fistulização, diagnóstico por biópsia (corpúsculo de Donovan)?</td><td>Donovanose</td></tr>
</tbody></table></div>`
        },
        {
            id: 'go-figo-palm-coein',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Classificação FIGO – Sangramento Uterino Anormal (PALM–COEIN)',
            html: `<p><strong>PALM (estruturais):</strong></p>
<ul class="reader-list">
<li>P – Pólipo</li><li>A – Adenomiose</li><li>L – Leiomioma</li><li>M – Malignidade / Hiperplasia</li>
</ul>
<p><strong>COEIN (não estruturais):</strong></p>
<ul class="reader-list">
<li>C – Coagulopatia</li><li>O – Disfunção ovulatória</li><li>E – Endometrial</li><li>I – Iatrogênica</li><li>N – Não classificadas</li>
</ul>`
        },
        {
            id: 'go-espessura-endometrial',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Espessura Endometrial',
            html: `<p><strong>Considerada normal:</strong></p>
<ul class="reader-list">
<li>Sem uso de terapia hormonal (TH) → &lt; 4 mm</li>
<li>Com uso de terapia hormonal (TH) → &lt; 8 mm</li>
</ul>`
        },
        {
            id: 'go-classificacao-miomas-figo',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Classificação dos Miomas (FIGO 2011)',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Número</th><th>Localização</th></tr></thead><tbody>
<tr><td>0</td><td>Intracavitário</td></tr>
<tr><td>1</td><td>Submucoso &lt;50% intramural</td></tr>
<tr><td>2</td><td>Submucoso &gt;50% intramural</td></tr>
<tr><td>3</td><td>Intramural, mas em contato com o endométrio</td></tr>
<tr><td>4</td><td>Intramural</td></tr>
<tr><td>5</td><td>Subseroso &gt;50% intramural</td></tr>
<tr><td>6</td><td>Subseroso &lt;50% intramural</td></tr>
<tr><td>7</td><td>Subseroso Pediculado</td></tr>
<tr><td>8</td><td>Cervical ou Parasitário</td></tr>
</tbody></table></div>`
        },
        {
            id: 'go-prolapso-genital-popq',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Classificação de Prolapso Genital (POP-Q)',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th></th><th>Parede anterior</th><th>Parede anterior</th><th>Colo ou cúpula</th></tr></thead><tbody>
<tr><td></td><td>Aa</td><td>Ba</td><td>C</td></tr>
<tr><td></td><td>Hiato genital</td><td>Corpo perineal</td><td>Comprimento vaginal total</td></tr>
<tr><td></td><td>gh</td><td>pb</td><td>tvl</td></tr>
<tr><td></td><td>Parede posterior</td><td>Parede posterior</td><td>Fórnix posterior</td></tr>
<tr><td></td><td>Ap</td><td>Bp</td><td>D</td></tr>
</tbody></table></div>
<ul class="reader-list">
<li>Aa e Ba → a minúsculo = parede anterior</li>
<li>Ap e Bp → p minúsculo = parede posterior</li>
<li>C = colo ou cúpula</li>
<li>D = fundo-de-saco de Douglas (mulher histerectomizada não tem D)</li>
<li>D - C &gt; 4 cm = alongamento de colo</li>
<li>CVT = comprimento vaginal total</li>
</ul>
<div class="reader-callout reader-callout-bloco">
<p>Negativo = dentro da vagina</p>
<p>Positivo = além do hímen</p>
</div>
<p><strong>Sistema baseado em pontos anatômicos (Aa, Ba, C, D, Ap, Bp) medidos em relação ao hímen:</strong></p>
<ul class="reader-list">
<li><strong>Estágio 0:</strong> sem prolapso</li>
<li><strong>I:</strong> até 1 cm acima do hímen</li>
<li><strong>II:</strong> até 1 cm abaixo/acima</li>
<li><strong>III:</strong> &gt;1 cm abaixo, mas não completo</li>
<li><strong>IV:</strong> eversão total</li>
</ul>`
        },
        {
            id: 'go-incontinencia-esforco',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Incontinência de Esforço',
            html: `<ul class="reader-list">
<li>Pressão abdominal / intrauretral &gt; 90 cmH₂O = HIPERMOBILIDADE DO COLO</li>
<li>Pressão abdominal / intrauretral &lt; 60 cmH₂O = DEFEITO DO ESFÍNCTER</li>
</ul>`
        },
        {
            id: 'go-anatomia-assoalho-pelvico',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Anatomia Assoalho Pélvico',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Estrutura</th><th>Componentes / Músculos</th><th>Funções principais</th></tr></thead><tbody>
<tr><td>Diafragma pélvico</td><td>Músculo levantador do ânus (com 3 feixes: puborretal, pubococcígeo e iliococcígeo); músculo isquiococcígeo (coccígeo)</td><td>Sustenta as vísceras pélvicas e participa do ato de defecar</td></tr>
<tr><td>Diafragma urogenital</td><td>Transverso superficial do períneo; transverso profundo do períneo; esfíncter anal externo; esfíncter uretral externo; isquiocavernoso; bulbocavernoso (bulboesponjoso)</td><td>Sustentação complementar das vísceras pélvicas; funções urinária e sexual</td></tr>
<tr><td>Ligamentos do aparelho de suspensão pélvico</td><td>Anteriores: pubovesicouterinos; laterais: paramétrios; posteriores: uterossacros</td><td>Suspensão e fixação do útero, bexiga e vagina</td></tr>
</tbody></table></div>`
        },
        {
            id: 'go-anatomia-utero-ovarios',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Anatomia - Útero e ovários',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Estrutura</th><th>Origem / Drenagem</th><th>Detalhes Importantes</th></tr></thead><tbody>
<tr><td>Artéria Ovariana</td><td>Aorta abdominal (logo abaixo das artérias renais)</td><td>Irriga ovários, tuba uterina e parte do útero; é homóloga à artéria testicular no homem.</td></tr>
<tr><td>Artéria Uterina</td><td>Artéria ilíaca interna (ramo anterior)</td><td>Irriga o útero, parte da vagina e da tuba uterina; anastomosa-se com a artéria ovariana.</td></tr>
<tr><td>Veia Ovariana Direita</td><td>Drena diretamente na veia cava inferior</td><td>Fluxo venoso mais reto; predisposição menor a congestão pélvica.</td></tr>
<tr><td>Veia Ovariana Esquerda</td><td>Drena na veia renal esquerda</td><td>Fluxo mais longo e angular; maior chance de congestão pélvica e varizes ovarianas.</td></tr>
</tbody></table></div>`
        },
        {
            id: 'go-vulvovaginites',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Vulvovaginites - Tabela Resumo',
            imagem: 'assets/bullets/img/go-clue-cell.png',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Doença</th><th>Principal agente</th><th>Aspecto do corrimento</th><th>pH</th><th>Teste de aminas</th><th>Microscopia</th><th>Tratamento</th></tr></thead><tbody>
<tr><td>Candidíase</td><td><em>Candida albicans</em></td><td>Branco grumoso</td><td>&lt; 4</td><td>Negativo</td><td>Hifas e esporos</td><td>Fluconazol 150 mg VO dose única ou Miconazol/Clotrimazol vaginal por 7 dias</td></tr>
<tr><td>Tricomoníase</td><td><em>Trichomonas vaginalis</em></td><td>Abundante, amarelo esverdeado</td><td>&gt; 4,5</td><td>Positivo</td><td>Protozoários flagelados móveis</td><td>Metronidazol 2 g VO dose única ou 500 mg VO 2x/dia por 7 dias (tratar parceiro)</td></tr>
<tr><td>Vaginose bacteriana</td><td><em>Gardnerella vaginalis</em></td><td>Acinzentado, homogêneo, cremoso ou fluido</td><td>&gt; 4,5</td><td>Positivo</td><td><em>Clue cells</em>, ausência de lactobacilos</td><td>Metronidazol 500 mg VO 2x/dia por 7 dias ou Clindamicina creme vaginal 7 dias</td></tr>
</tbody></table></div>
<p><strong>NÃO SE ESQUEÇA!</strong></p>
<div class="reader-table-wrap"><table class="reader-table"><tbody>
<tr><td>Qual se desenvolve em pH &lt; 4,5?</td><td>Candidíase</td></tr>
<tr><td>Qual se associa a Clue cells?</td><td>Vaginose</td></tr>
<tr><td>Qual sempre deve tratar o parceiro?</td><td>Tricomoníase</td></tr>
<tr><td>Qual tem protozoário móvel?</td><td>Tricomoníase</td></tr>
<tr><td>Qual tem pseudo-hifas?</td><td>Candidíase</td></tr>
<tr><td>Qual não se trata com metronidazol?</td><td>Candidíase</td></tr>
<tr><td>Qual é comum em crianças?</td><td>Inespecífica</td></tr>
</tbody></table></div>`
        },
        {
            id: 'go-classificacao-amsel',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Classificação de Amsel – Diagnóstico de Vaginose Bacteriana',
            html: `<p><strong>≥3 critérios:</strong></p>
<ul class="reader-list">
<li>Corrimento branco-acinzentado</li>
<li>pH vaginal &gt;4,5</li>
<li>Teste das aminas positivo</li>
<li>"Clue cells" no microscópio</li>
</ul>`
        },
        {
            id: 'go-dip-monif',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'DIP - Critérios diagnósticos (MONIF)',
            html: `<p><strong>Critérios maiores:</strong></p>
<ul class="reader-list">
<li>Dor no abdômen inferior</li><li>Dor à palpação dos anexos</li><li>Dor à mobilização do colo uterino</li>
</ul>
<p><strong>Critérios menores</strong></p>
<ul class="reader-list">
<li>Temperatura ≥ 37,5°C</li><li>Corrimento vaginal ou secreção endocervical anormal</li>
<li>Massa pélvica</li><li>&gt;5 leucócitos por campo de imersão em secreção endocervical</li>
<li>Testes laboratoriais positivos: proteína C reativa (PCR) ou leucocitose</li>
<li>Comprovação laboratorial de infecção cervical por <em>Neisseria gonorrhoeae</em> ou <em>Chlamydia trachomatis</em></li>
</ul>
<p><strong>Critérios elaborados / complementares</strong></p>
<ul class="reader-list">
<li>Histopatologia com evidência de endometrite</li>
<li>Ultra ou laparoscopia: líquido peritoneal, presença tubo-ovariana ou de fundo de saco de Douglas compatível</li>
<li>Laparoscopia com evidência direta de DIP</li>
</ul>`
        },
        {
            id: 'go-fitz-hugh-curtis',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Fitz Hugh Curtis - Complicação DIP',
            imagem: 'assets/bullets/img/go-fitzhugh-curtis.png',
            html: `<p>É uma complicação rara da doença inflamatória pélvica (DIP), que causa inflamação da cápsula hepática (peritonite) e se manifesta com dor no quadrante superior direito do abdômen. Achado clássico: aderências "em corda de violino" entre a cápsula hepática e o peritônio parietal.</p>`
        },
        {
            id: 'go-rastreamento-ca-mama',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Rastreamento CA de Mama - Atualização',
            html: `<ul class="reader-list">
<li><strong>MS:</strong>
<ul class="reader-list reader-sublist">
<li>50–74 anos, a cada 2 anos (obrigatório).</li>
<li>40–49 anos e &gt;74 anos: exame disponível, decisão compartilhada com médico.</li>
</ul></li>
<li><strong>FEBRASGO:</strong>
<ul class="reader-list reader-sublist">
<li>Baixo risco → MMG anual a partir de 40 anos</li>
<li>Mutações BRCA1/BRCA2: &gt; 30 anos; hiperplasia atípica (precursora) a partir do diagnóstico</li>
</ul></li>
</ul>`
        },
        {
            id: 'go-birads',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'BI-RADS – Categorias e Significado',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Categoria</th><th>Interpretação</th><th>Conduta recomendada</th></tr></thead><tbody>
<tr><td>0</td><td>Exame inconclusivo</td><td>Necessita de imagens adicionais ou comparação com exames prévios</td></tr>
<tr><td>1</td><td>Negativo</td><td>Continuar rastreamento de rotina (mamografia de rotina)</td></tr>
<tr><td>2</td><td>Achados benignos</td><td>Continuar rastreamento de rotina</td></tr>
<tr><td>3</td><td>Provavelmente benigno (&lt;2% risco de malignidade)</td><td>Seguimento curto: repetir exame em 6 meses</td></tr>
<tr><td>4</td><td>Suspeito de malignidade</td><td>Considerar biópsia (risco 2–95%, subdividido em 4A, 4B, 4C)</td></tr>
<tr><td>5</td><td>Altamente sugestivo de malignidade (&gt;95% risco)</td><td>Biópsia e planejamento terapêutico</td></tr>
<tr><td>6</td><td>Malignidade comprovada histologicamente</td><td>Tratamento apropriado para câncer de mama (cirurgia, quimio, etc.)</td></tr>
</tbody></table></div>`
        },
        {
            id: 'go-vacinacao-hpv',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Vacinação - HPV',
            html: `<p><strong>Vacina anti-HPV → partículas semelhantes a vírus (VLP):</strong></p>
<ul class="reader-list">
<li>Quadrivalente (6, 11, 16 e 18)</li>
<li>MS = dose única para meninas e meninos → 9 a 14 anos</li>
<li>HIV/neoplasias/transplantes = 3 doses (0-2-6 meses)</li>
<li>Violência sexual (9 a 45 anos)
<ul class="reader-list reader-sublist">
<li>Se até 14 anos → 2 doses</li>
<li>Se 15 a 45 anos → 3 doses</li>
</ul></li>
</ul>`
        },
        {
            id: 'go-rastreamento-colo-uterino',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Rastreamento Câncer de colo uterino',
            html: `<p><strong>Nova diretriz</strong> — população-alvo: 25 a 64 anos, DNA-HPV oncogênico a cada 5 anos. Qualquer teste negativo a partir dos 60 anos libera do próximo rastreio (já ultrapassaria os 64 anos).</p>
<ol class="reader-list">
<li>DNA-HPV oncogênico:
<ul class="reader-list reader-sublist">
<li><strong>Não detectado</strong> → repetir o teste em 5 anos</li>
<li><strong>16 e/ou 18</strong> → colposcopia direta → se doença cervical presente: conduta específica; se não: repetir teste em 1 ano</li>
<li><strong>Não 16-18 (HPV outros)</strong> → citologia reflexa (ASC-US+?) → se sim: colposcopia (mesmo fluxo acima); se não: repetir teste em 1 ano</li>
</ul></li>
</ol>
<p><strong>Antiga diretriz (citologia) — Tabela 4: conduta inicial frente a resultados alterados na atenção básica:</strong></p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Diagnóstico citopatológico</th><th>Faixa etária</th><th>Conduta</th></tr></thead><tbody>
<tr><td rowspan="4">Células escamosas atípicas de resultado indeterminado (ASCUS) — possivelmente não neoplásicas</td><td>&lt; 25 anos</td><td>Repetir em 3 anos</td></tr>
<tr><td>Entre 25 e 29 anos</td><td>Repetir a citologia em 12 meses</td></tr>
<tr><td>≥ 30 anos</td><td>Repetir a citologia em 6 meses</td></tr>
<tr><td>Não podendo afastar lesão de alto grau (ASC-H)</td><td>Encaminhar para colposcopia</td></tr>
<tr><td>Células glandulares atípicas de significado indeterminado (AOI)</td><td>Possivelmente não neoplásicas ou não se podendo afastar lesão de alto grau</td><td>Encaminhar para colposcopia</td></tr>
<tr><td>Células atípicas de origem indefinida (AOI)</td><td>Possivelmente não neoplásicas ou não se podendo afastar lesão de alto grau</td><td>Encaminhar para colposcopia</td></tr>
<tr><td rowspan="2">Lesão de baixo grau (LSIL)</td><td>&lt;25 anos</td><td>Repetir em 3 anos</td></tr>
<tr><td>&gt;25 anos</td><td>Repetir a citologia em 6 meses</td></tr>
<tr><td>Lesão de alto grau (HSIL)</td><td>-</td><td>Encaminhar para colposcopia</td></tr>
<tr><td>Lesão intraepitelial de alto grau não podendo excluir microinvasão</td><td>-</td><td>Encaminhar para colposcopia</td></tr>
<tr><td>Carcinoma escamoso invasor</td><td>-</td><td>Encaminhar para colposcopia</td></tr>
<tr><td>Adenocarcinoma in situ (AIS) ou invasor</td><td>-</td><td>Encaminhar para colposcopia</td></tr>
</tbody></table></div>`
        },
        {
            id: 'go-estadiamento-colo-uterino',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Câncer de Colo Uterino - Estadiamento FIGO',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Estadiamento</th><th>Descrição / Extensão</th><th>Subestágios / Medidas</th><th>Tratamento Padrão</th><th>Observações</th></tr></thead><tbody>
<tr><td>0</td><td>Carcinoma in situ</td><td>—</td><td>Conização (diagnóstico e terapêutico)</td><td>—</td></tr>
<tr><td rowspan="5">I</td><td rowspan="5">Restrito ao colo uterino</td><td>IA1: &lt;3 mm</td><td>Histerectomia tipo 1</td><td>Se desejo reprodutivo → cone</td></tr>
<tr><td>IA2: 3–5 mm</td><td>Histerectomia tipo 2 + linfadenectomia pélvica</td><td>—</td></tr>
<tr><td>IB1: 5 mm – 2 cm</td><td>Wertheim-Meigs (histerectomia radical + linfadenectomia pélvica)</td><td>—</td></tr>
<tr><td>IB2: 2–4 cm</td><td>Wertheim-Meigs</td><td>—</td></tr>
<tr><td>IB3: ≥4 cm</td><td>Wertheim-Meigs ou quimiorradioterapia</td><td>—</td></tr>
<tr><td rowspan="3">II</td><td rowspan="3">Invade vagina ou paramétrio</td><td>IIA1: parte superior da vagina &lt;4 cm</td><td>Wertheim-Meigs ou quimiorradioterapia</td><td>Cirurgia ainda possível</td></tr>
<tr><td>IIA2: ≥4 cm</td><td>Quimiorradioterapia</td><td>Tratamento cirúrgico limitado; RT+QT indicada</td></tr>
<tr><td>IIB: invade paramétrio</td><td>Quimiorradioterapia</td><td>Avaliado pelo toque retal</td></tr>
<tr><td rowspan="3">III</td><td rowspan="3">Extensão local avançada</td><td>IIIA: 1/3 inferior da vagina</td><td>Quimiorradioterapia</td><td>Cirurgia não indicada</td></tr>
<tr><td>IIIB: parede pélvica ou hidronefrose</td><td>Quimiorradioterapia</td><td>—</td></tr>
<tr><td>IIIC: linfonodo pélvico ou para-aórtico positivo</td><td>Quimiorradioterapia</td><td>—</td></tr>
<tr><td rowspan="2">IV</td><td rowspan="2">Invasão de órgãos adjacentes ou metástase</td><td>IVA: bexiga ou reto</td><td>Quimiorradioterapia</td><td>Cirurgia não indicada</td></tr>
<tr><td>IVB: metástase à distância</td><td>Quimiorradioterapia</td><td>Radioterapia primária para todos, exceto IVB, onde pode ser paliativa</td></tr>
</tbody></table></div>`
        },
        {
            id: 'go-ciclo-menstrual-gnrh',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Ciclo Menstrual - GnRH',
            html: `<ul class="reader-list">
<li><strong>Como são os pulsos de GnRH na fase folicular?</strong> Pulsos frequentes, porém de baixa amplitude → ao final dessa fase o LH é liberado pela hipófise.</li>
<li><strong>Como são os pulsos de GnRH a fase lútea?</strong> Pulsos de grande amplitude, mas de baixa frequência. Ao final dessa fase, se não tiver gestação, FSH é liberado.</li>
</ul>
<p>Os pulsos de GnRH são modulados pelo sistema supra-hipotalâmico norepinefrina-dopamina, sendo que a norepinefrina estimula e a dopamina inibe esses pulsos.</p>`
        },
        {
            id: 'go-ciclo-menstrual-ovario',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Ciclo Menstrual - Ovário',
            html: `<ol class="reader-list">
<li><strong>Fase proliferativa:</strong>
<ul class="reader-list reader-sublist">
<li>Aumento do FSH (secretado pela adeno-hipófise) e recrutamento folicular;</li>
<li>Seleção do folículo dominante (aquele que tem mais receptores de FSH);</li>
<li>Esses folículos começam a produzir estrogênio;</li>
<li>Aumento do estrogênio e da inibina B → (Before ovulação);</li>
<li>A elevação do estrogênio e da inibina inibem o FSH;</li>
<li>No final dessa fase, há um pico de estradiol e, por consequência, um pico de LH → OVULAÇÃO (folículo dominante = ovócito + corpo lúteo/amarelo).</li>
</ul></li>
<li><strong>Fase secretora/lútea:</strong>
<ul class="reader-list reader-sublist">
<li>Começa a partir do 14° e acaba no 28° dia (dia que antecede a menstruação), pois o corpo lúteo tem uma sobrevida de 14 dias;</li>
<li>Aumento da progesterona e da inibina A (After ovulação) → inibem o FSH (não há mais a necessidade de recrutar folículos);</li>
<li>Elevação da progesterona inibe o LH;</li>
<li>Corpo lúteo/amarelo libera progesterona.</li>
<li>Se não houver fecundação: regressão do corpo lúteo e, consequentemente, diminuição do estrogênio, progesterona e inibina A.</li>
</ul></li>
</ol>
<p><strong>Teoria das duas células e duas gonadotrofinas:</strong></p>
<ul class="reader-list">
<li>Na teca: gordura/colesterol é transformada em andrógeno (androstenediona e testosterona), sob ação do LH.</li>
<li>Os andrógenos passam para as células granulosas.</li>
<li>Na granulosa: andrógeno é transformado em estrogênio. Quem faz essa transformação? FSH!</li>
<li>O FSH na granulosa estimula algumas enzimas para a formação do estrogênio, essas enzimas são as aromatases.</li>
</ul>`
        },
        {
            id: 'go-ciclo-menstrual-utero',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Ciclo Menstrual - Útero',
            html: `<p><strong>1) Fase proliferativa:</strong></p>
<ul class="reader-list">
<li>Estrogênio → promove proliferação do endométrio.</li>
<li>Glândulas curtas e pequenas.</li>
<li>Obs: endométrio é formado por 3 camadas (as duas primeiras são as funcionais): 1) compacta (superficial) → sofre mais durante o ciclo; 2) esponjosa (média) → sofre mais durante o ciclo; 3) basal (profunda) → sofre menos alterações durante o ciclo menstrual.</li>
</ul>
<p><strong>2) Fase secretora:</strong></p>
<ul class="reader-list">
<li>Progesterona → melhora a situação do endométrio para receber a gravidez.</li>
<li>Glândulas mais longas, tortuosas, dilatadas.</li>
</ul>
<p><strong>Período Menstrual - USG:</strong></p>
<ul class="reader-list">
<li>Na fase pós menstrual (proliferativa inicial), o endométrio está bem fino.</li>
<li>Na fase tardia (trilaminar / proliferativa tardia), conseguimos ver três lâminas e um endométrio mais grosso.</li>
<li>Na fase secretora, o endométrio é hiperecogênico.</li>
</ul>`
        },
        {
            id: 'go-amenorreia-primaria-sindromes',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Amenorreia primária - Síndromes',
            html: `<ul class="reader-list">
<li>Menina de 13 anos, sem menstruação e sem desenvolvimento de carácteres sexuais.</li>
<li>Menina de 16 anos, sem menstruação e com desenvolvimento de carácteres sexuais.</li>
</ul>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Síndrome</th><th>Cariótipo</th><th>Genitália externa</th><th>Genitália interna</th><th>Características clínicas</th></tr></thead><tbody>
<tr><td>Síndrome de Rokitansky (Agenesia Mülleriana)</td><td>46,XX</td><td>Normal feminina</td><td>Útero e 2/3 superiores da vagina ausentes</td><td>Puberdade normal + amenorreia primária</td></tr>
<tr><td>Síndrome de Morris (Síndrome do Testículo Feminilizante)</td><td>46,XY</td><td>Feminina</td><td>Ausência de útero e trompas; presença de testículos intra-abdominais</td><td>Amenorreia primária</td></tr>
<tr><td>Síndrome de Turner</td><td>45,X0</td><td>Feminina</td><td>Útero presente</td><td>Baixa estatura, pescoço alado, mamas pequenas, pterígio nucal, amenorreia primária</td></tr>
</tbody></table></div>`
        },
        {
            id: 'go-amenorreia-secundaria-avaliacao',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Amenorreia secundária - Avaliação',
            html: `<p>Ausência de menstruação por 3 ciclos consecutivos ou por 6 meses (alguns citam 3 meses).</p>
<p><strong>Investigação (receita de bolo):</strong></p>
<p><strong>1° passo:</strong> Beta-HCG → para eliminar gravidez</p>
<p><strong>2° passo:</strong> TSH → para eliminar hipotireoidismo (hipotireoidismo diminui T3/T4, aumenta TSH, que inibe a pulsatividade do GnRH); Prolactina sérica (hiperprolactinemia inibe a pulsatividade do GnRH). Normal da prolactina: 20–25.</p>
<ul class="reader-list">
<li><strong>Hiperprolactinemia:</strong>
<ul class="reader-list reader-sublist">
<li>Prolactinoma (cefaleia, diplopia, sintomas compressivos): diagnóstico → RM; tratamento: cabergolina, bromocriptina (agonistas dopaminérgicas — dopamina é fator inibidor da prolactina).</li>
<li>Medicamentosa: metoclopramida, neurolépticos, tricíclicos, ranitidina, ACO, hipotireoidismo, estresse, gestação.</li>
</ul></li>
</ul>
<p>Obs: se hipotireoidismo + hiperprolactinemia, tratar o hipotireoidismo primeiro, que provavelmente resolve a hiperprolactinemia.</p>
<p><strong>3° passo:</strong> Teste da progesterona → avalia o estímulo prévio de estrogênio e o trato de saída. Prescrever Acetato de Medroxiprogesterona 10mg 1cp/dia por pelo menos 5 dias. Depois da privação, menstruou? Sim → falta progesterona = anovulação. Não → passo 4.</p>
<p><strong>4° passo:</strong> Teste do estrogênio + progesterona → avalia o endométrio e o trato de saída. Prescrever estrogênio sintético por 21 dias + progesterona por 5 dias. Menstruou? Sim → falta estrogênio; excluídas causas uterovaginais → possíveis causas: compartimento II (ovário), III (hipófise) ou IV (hipotálamo) → passo 5. Não → causa anatômica → causa: compartimento I → fazer exame de imagem!</p>
<p><strong>5° passo:</strong> se sangrou no teste de progesterona+estrogênio, dosagem de FSH e LH (ref: 5–20 mUI/mL). &gt;20 → causa ovariana (compartimento II). &lt;5 → causa central (compartimento III ou IV) → passo 6.</p>
<p><strong>6° passo:</strong> Teste do GnRH. Dosar FSH e LH → prescrever pulsos intravenosos de GnRH → dosar de novo. Houve aumento de FSH/LH? Causa hipotalâmica. Não houve alteração? Causa hipofisária.</p>`
        },
        {
            id: 'go-amenorreia-secundaria-causas',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Amenorreia secundária - Causas',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Categoria / Eixo</th><th>Causas</th></tr></thead><tbody>
<tr><td>Gravidez</td><td>Gestação → sempre iniciar a investigação pedindo um Beta-HCG</td></tr>
<tr><td rowspan="3">Hipotalâmicas</td><td>Tumores → craniofaringiomas</td></tr>
<tr><td>Estresse</td></tr>
<tr><td>Anorexia, exercícios extenuantes</td></tr>
<tr><td rowspan="2">Hipofisárias</td><td>Hiperprolactinemia → prolactinoma? medicações?</td></tr>
<tr><td>Síndrome de Sheehan → (necrose hipofisária pós-parto) → partos que envolveram hemorragia importante! Obs: mulher que faz agalactia após o parto é sinal de que talvez tenha necrosado a hipófise!</td></tr>
<tr><td rowspan="3">Ovarianas</td><td>Síndrome dos ovários policísticos (SOP)</td></tr>
<tr><td>Falência ovariana precoce (&lt;40 anos) → mulher com menos de 40 anos com fogacho e sintomas da menopausa</td></tr>
<tr><td>Síndrome de Savage → tem todos os sinais e sintomas do climatério, porém tem folículos... só que eles são resistentes às gonadotrofinas</td></tr>
<tr><td rowspan="2">Uterinas</td><td>Síndrome de Asherman → lesão endometrial (ex: após curetagem). Diagnóstico e tratamento por histeroscopia.</td></tr>
<tr><td>Outras alterações uterinas</td></tr>
<tr><td>Distúrbios endócrinos</td><td>Hipotireoidismo / Hipertireoidismo; hiperandrogenismo</td></tr>
<tr><td>Uso de medicamentos</td><td>Contraceptivos hormonais; antipsicóticos, opioides</td></tr>
</tbody></table></div>`
        },
        {
            id: 'go-malformacoes-uterinas',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Malformações Uterinas',
            html: `<ul class="reader-list">
<li>Útero bicorno</li>
<li>Útero unicorno</li>
<li>Útero duplo ou didelfo</li>
<li>Útero septado</li>
<li>Útero retrovertido</li>
</ul>`
        },
        {
            id: 'go-diagnostico-somp',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Diagnóstico SOMP (Síndrome Ovariana Metabólica Poliendócrina) - Rotterdam',
            html: `<p>O diagnóstico de SOMP é geralmente feito com base nos critérios de Rotterdam, que requerem pelo menos 2 dos seguintes 3 achados:</p>
<ol class="reader-list">
<li>Oligo-ovulação e/ou anovulação</li>
<li>Evidência clínica e/ou laboratorial de hiperandrogenismo (obs: Ferriman ≥ 8 ou ajustado à etnia)</li>
<li>Ovários policísticos (ultrassonografia transvaginal com 20 ou mais folículos em cada ovário medindo 2 a 9 mm de diâmetro, e/ou volume ovariano aumentado &gt;10 mL)</li>
</ol>`
        },
        {
            id: 'go-fenotipos-somp',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Fenótipos SOMP (Rotterdam)',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Fenótipo</th><th>Características</th></tr></thead><tbody>
<tr><td>Fenótipo A – Clássico completo</td><td>Oligo/anovulação + hiperandrogenismo + ovários policísticos</td></tr>
<tr><td>Fenótipo B – Clássico não policístico</td><td>Oligo/anovulação + hiperandrogenismo, ovários normais ao USG</td></tr>
<tr><td>Fenótipo C – Ovário poliquístico + hiperandrogenismo</td><td>Hiperandrogenismo + ovários policísticos, ciclos menstruais regulares</td></tr>
<tr><td>Fenótipo D – Ovário poliquístico + oligo/anovulação</td><td>Oligo/anovulação + ovários policísticos, sem sinais clínicos ou laboratoriais de hiperandrogenismo</td></tr>
</tbody></table></div>`
        },
        {
            id: 'go-climaterio-menopausa',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Climatério x Menopausa',
            html: `<ul class="reader-list">
<li><strong>Climatério:</strong> É o período fisiológico da vida da mulher que se inicia desde os primeiros indícios da falha ovariana, e que se estende até a senectude (senilidade = 65 anos). Ou seja, é um período de transição!</li>
<li><strong>Menopausa:</strong> Parada total das menstruações; é a última menstruação. É um evento pontual, cujo diagnóstico é retrospectivo (1 ano de amenorreia).</li>
</ul>`
        },
        {
            id: 'go-indicacoes-terapia-hormonal',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Indicações - Terapia Hormonal',
            html: `<p><strong>1) Fogachos</strong> (indicação mais comum)</p>
<ul class="reader-list">
<li>Qual terapia escolher?
<ul class="reader-list reader-sublist">
<li>Com útero → sempre estrogênio + progesterona</li>
<li>Sem útero → apenas estrogênio (se endometriose: E + P)</li>
</ul></li>
<li>Qual via escolher?
<ul class="reader-list reader-sublist">
<li>Estrogênio → oral ou parenteral</li>
<li>Progesterona → oral ou DIU de levonorgestrel</li>
<li><em>Patologias em geral, parenteral!</em> — colesterol alto, comprimido!</li>
</ul></li>
<li>Fatores que pesam pra via parenteral: DM, HAS, fumo, risco de trombose, hipertrigliceridemia, doenças hepáticas.</li>
</ul>
<p><strong>2) Atrofia vaginal</strong> → única indicação para TH? = estrogênio vaginal!</p>
<p><strong>3) Osteoporose</strong> → única indicação para TH? = outras opções</p>`
        },
        {
            id: 'go-contraindicacoes-terapia-hormonal',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Contraindicações - Terapia Hormonal',
            html: `<ul class="reader-list">
<li>Ca de mama (ou precursoras) ou Ca de endométrio</li>
<li>Sangramento vaginal indeterminado</li>
<li>AVE e IAM</li>
<li>TVP e TEP (avaliar via de administração)</li>
<li>LES (aumento do risco de trombose)</li>
<li>Doença hepática descompensada</li>
<li>Porfiria</li>
<li>Meningioma (para progesterona)</li>
</ul>`
        },
        {
            id: 'go-sangramentos-primeira-metade',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Sangramentos - Primeira Metade',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Causa</th><th>Características do sangramento</th><th>Dor</th><th>Outros achados importantes</th></tr></thead><tbody>
<tr><td>Ameaça de abortamento</td><td>Pequeno, escuro</td><td>Leve ou ausente</td><td>Colo fechado; embrião vivo</td></tr>
<tr><td>Abortamento inevitável/incompleto</td><td>Moderado a intenso</td><td>Cólica intensa</td><td>Colo aberto; eliminação parcial</td></tr>
<tr><td>Abortamento completo</td><td>Diminui após eliminação</td><td>Dor alivia</td><td>Colo fechado; cavidade vazia</td></tr>
<tr><td>Gravidez ectópica</td><td>Pequeno a moderado</td><td>Dor abdominal unilateral</td><td>β-hCG inadequado; US sem gestação intrauterina</td></tr>
<tr><td>Gravidez ectópica rota</td><td>Pode ser discreto</td><td>Dor intensa</td><td>Instabilidade hemodinâmica; abdome agudo</td></tr>
<tr><td>Doença trofoblástica gestacional</td><td>Escuro, intermitente</td><td>Geralmente ausente</td><td>Útero maior que IG; β-hCG muito elevado, hiperêmese</td></tr>
</tbody></table></div>`
        },
        {
            id: 'go-sangramentos-segunda-metade',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Sangramentos - Segunda Metade',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Causa</th><th>Características do sangramento</th><th>Dor</th><th>Achados importantes</th></tr></thead><tbody>
<tr><td>Placenta prévia</td><td>Vermelho vivo, recorrente</td><td>Indolor</td><td>Útero flácido; apresentação fetal anômala</td></tr>
<tr><td>Descolamento prematuro de placenta (DPP)</td><td>Escuro ou oculto</td><td>Dor intensa</td><td>Útero hipertônico; sofrimento fetal</td></tr>
<tr><td>Rotura uterina</td><td>Pode ser variável</td><td>Dor súbita e intensa</td><td>Perda de apresentação fetal; choque</td></tr>
<tr><td>Vasa prévia</td><td>Vermelho vivo</td><td>Indolor</td><td>Sangue fetal; bradicardia fetal</td></tr>
</tbody></table></div>`
        },
        {
            id: 'go-doenca-trofoblastica-estadiamento',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Doença Trofoblástica - Estadiamento',
            html: `<ul class="reader-list">
<li><strong>Estágio I:</strong> Doença confinada ao útero.</li>
<li><strong>Estágio II:</strong> Extensão para órgãos pélvicos (ovários, vagina, parametria), mas fora do útero.</li>
<li><strong>Estágio III:</strong> Metástases pulmonares, com ou sem envolvimento pélvico.</li>
<li><strong>Estágio IV:</strong> Metástases em outros órgãos (fígado, cérebro, rins, intestino, etc.).</li>
</ul>`
        },
        {
            id: 'go-classificacao-dpp',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Classificação clínica de DPP (Gravidade / Grau de DPP)',
            html: `<p><strong>Grau I – Leve</strong></p>
<ul class="reader-list">
<li>Descolamento &lt;20% da placenta</li><li>Sintomas: pouco ou nenhum sangramento, dor uterina discreta</li>
<li>Tônus uterino: normal</li><li>Estado fetal: geralmente normal</li>
<li>Conduta: monitoramento hospitalar, possível parto vaginal se estável</li>
</ul>
<p><strong>Grau II – Moderado</strong></p>
<ul class="reader-list">
<li>Descolamento 20–50% da placenta</li><li>Sintomas: sangramento vaginal moderado, dor abdominal intensa, útero firme</li>
<li>Estado fetal: sofrimento fetal possível</li><li>Conduta: estabilização materna, considerar parto imediato (vaginal ou cesárea)</li>
</ul>
<p><strong>Grau III – Grave</strong></p>
<ul class="reader-list">
<li>Descolamento &gt;50% da placenta</li><li>Sintomas: sangramento intenso ou oculto, útero tenso, dor intensa</li>
<li>Estado fetal: alto risco de morte fetal</li><li>Conduta: emergência obstétrica, parto imediato geralmente cesárea, suporte hemodinâmico intensivo</li>
</ul>`
        },
        {
            id: 'go-odriscoll-dcp',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Classificação de O’Driscoll – Desproporção Céfalo-Pélvica',
            html: `<ul class="reader-list">
<li><strong>Grau I:</strong> relativa (pode parto vaginal)</li>
<li><strong>Grau II:</strong> duvidosa</li>
<li><strong>Grau III:</strong> absoluta (cesárea indicada)</li>
</ul>`
        },
        {
            id: 'go-formula-mcdonald-naegele',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Fórmula Regra de McDonald e Regra de Näegele - Idade Gestacional',
            html: `<div class="reader-callout reader-callout-bloco"><p>💡 McDonald: IG (semanas) = AU (cm) × 8 / 7</p></div>
<p>A DPP é calculada a partir da Data da Última Menstruação (DUM), assumindo um ciclo regular de 28 dias.</p>
<div class="reader-callout reader-callout-bloco"><p>💡 Näegele: DPP = DUM + 7 dias + 9 meses (ou − 3 meses)</p></div>`
        },
        {
            id: 'go-causas-morte-materna',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Causas de morte materna',
            html: `<ol class="reader-list">
<li>Hipertensão</li>
<li>Hemorragia</li>
<li>Infecção</li>
</ol>`
        },
        {
            id: 'go-prevencao-eclampsia-sulfato',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Prevenção de eclâmpsia - Sulfato de Magnésio',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Esquema</th><th>Via</th><th>Dose de Ataque</th><th>Dose de Manutenção</th><th>Observações</th></tr></thead><tbody>
<tr><td>Pritchard</td><td>IM + EV</td><td>4 g EV lento (20 min) + 10 g IM (5 g em cada nádega)</td><td>5 g IM a cada 4 horas (em nádegas alternadas)</td><td>Mais usado em locais com poucos recursos. Exige monitorar reflexos e diurese.</td></tr>
<tr><td>Zuspan</td><td>EV contínuo</td><td>4 g EV lento (20 min)</td><td>Infusão contínua de 1 g/h EV</td><td>Preferido em ambiente hospitalar com bomba de infusão. Mais estável e previsível.</td></tr>
</tbody></table></div>`
        },
        {
            id: 'go-diabetes-gestacional',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Diabetes Gestacional - Diagnóstico e Metas',
            html: `<p><strong>Diagnóstico:</strong></p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Momento da coleta</th><th>Valor de referência</th></tr></thead><tbody>
<tr><td>Jejum</td><td>92 – 125 mg/dL</td></tr>
<tr><td>1 hora</td><td>≥ 180 mg/dL</td></tr>
<tr><td>2 horas</td><td>≥ 153 mg/dL</td></tr>
</tbody></table></div>
<p><strong>Metas:</strong></p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Momento</th><th>Meta</th></tr></thead><tbody>
<tr><td>Jejum / pré-prandial</td><td>&lt; 95 mg/dL</td></tr>
<tr><td>1 hora pós-prandial</td><td>&lt; 140 mg/dL</td></tr>
<tr><td>2 horas pós-prandial</td><td>&lt; 120 mg/dL</td></tr>
</tbody></table></div>`
        },
        {
            id: 'go-distocia-ombro-manobras',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Distócia de ombro - Manobras',
            html: `<ul class="reader-list">
<li>McRoberts</li>
<li>Pressão suprapúbica (Rubin I)</li>
<li>Rubin II</li>
<li>Woods (parafuso de Woods)</li>
<li>Liberação do braço posterior (Jacquemier)</li>
<li>Gaskin</li>
<li>Zavanelli</li>
<li>Claviclotomia (fratura intencional da clavícula)</li>
</ul>`
        },
        {
            id: 'go-rotura-perineal-graus',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Rotura perineal - Graus',
            html: `<ul class="reader-list">
<li><strong>1º grau</strong> → lesão somente da pele e mucosa vaginal</li>
<li><strong>2º grau</strong> → lesão da pele e músculos do períneo, mas não envolve esfíncter anal</li>
<li><strong>3º grau</strong> → lesão envolvendo o esfíncter anal
<ul class="reader-list reader-sublist">
<li>3a: &lt;50% do esfíncter externo</li>
<li>3b: &gt;50% do esfíncter externo</li>
<li>3c: esfíncter externo + interno</li>
</ul></li>
<li><strong>4º grau</strong> → lesão envolvendo mucosa retal, esfíncter interno e externo</li>
</ul>`
        },
        {
            id: 'go-manobras-leopold',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Manobras de Leopold (4 manobras)',
            html: `<ol class="reader-list">
<li><strong>Situação</strong>
<ul class="reader-list reader-sublist"><li>Palpa o fundo do útero para determinar qual extremidade fetal está presente (cabeça ou nádegas)</li></ul></li>
<li><strong>Posição</strong>
<ul class="reader-list reader-sublist"><li>Palpa os flancos do abdome materno para localizar as costas do feto (mais firme) e membros (mais irregulares)</li></ul></li>
<li><strong>Apresentação</strong>
<ul class="reader-list reader-sublist"><li>Palpa a porção inferior do útero acima da sínfise púbica para confirmar qual extremidade está se apresentando no canal de parto</li></ul></li>
<li><strong>Altura de apresentação</strong>
<ul class="reader-list reader-sublist"><li>Avalia o grau de descida do feto e a posição em relação à pelve materna</li></ul></li>
</ol>`
        },
        {
            id: 'go-avaliacao-infertilidade',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Avaliação Inicial - Infertilidade',
            html: `<p><strong>Fator ovariano</strong></p>
<ul class="reader-list">
<li>Dosagem de progesterona → dosar na fase lútea (21-24º dia)</li>
<li>Dosagem de FSH
<ul class="reader-list reader-sublist">
<li>Avalia reserva ovariana (dosar no 3º dia → ruim, se &gt; 15)</li>
<li>Idade é o melhor preditor de resposta ovariana</li>
<li>Opção: dosar o hormônio antimulleriano (pode ser dosado em qualquer fase do ciclo)</li>
</ul></li>
<li>USTV seriada
<ul class="reader-list reader-sublist"><li>Documentação da ovulação</li><li>Contagem de folículos</li></ul></li>
</ul>
<p><strong>Fator tuboperitoneal</strong></p>
<ul class="reader-list">
<li>Histerossalpingografia → exame inicial para avaliar a trompa
<ul class="reader-list reader-sublist">
<li>Trompa pérvia = prova de Cotte positiva</li>
<li>Trompa impérvia = fazer videolaparoscopia</li>
</ul></li>
<li>Videolaparoscopia (padrão-ouro para doença tubária e peritoneal)</li>
</ul>
<p><strong>Fator uterino</strong></p>
<ul class="reader-list">
<li>USTV e histerossalpingografia</li>
<li>Histeroscopia (padrão-ouro para cavidade endometrial)</li>
</ul>`
        },
        {
            id: 'go-espermograma-normal',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Parâmetros - Espermograma Normal',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Parâmetro</th><th>Valor de referência (OMS 2021)</th></tr></thead><tbody>
<tr><td>Volume do ejaculado</td><td>≥1,5 mL</td></tr>
<tr><td>pH</td><td>≥7,2</td></tr>
<tr><td>Concentração de espermatozoides</td><td>≥15 milhões/mL</td></tr>
<tr><td>Contagem total de espermatozoides</td><td>≥39 milhões/ejaculado</td></tr>
<tr><td>Motilidade total (progressiva + não progressiva)</td><td>≥40%</td></tr>
<tr><td>Motilidade progressiva (tipo A+B)</td><td>≥32%</td></tr>
<tr><td>Morfologia (forma normal)</td><td>≥4% (Kruger estrito)</td></tr>
<tr><td>Vitalidade</td><td>≥58% espermatozoides vivos</td></tr>
<tr><td>Leucócitos</td><td>&lt;1 milhão/mL</td></tr>
</tbody></table></div>`
        },
        {
            id: 'go-prova-cotte',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Prova de Cotte - Histerossalpingografia',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Resultado</th><th>Achado radiológico</th><th>Interpretação</th></tr></thead><tbody>
<tr><td>Prova de Cotte +</td><td>Extravasamento livre do contraste para a cavidade peritoneal</td><td>Trompas pérvias (sem obstrução)</td></tr>
<tr><td>Prova de Cotte −</td><td>Contraste retido, sem extravasamento</td><td>Trompas obstruídas</td></tr>
</tbody></table></div>`
        },
        {
            id: 'go-tipos-pelve',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Tipos de Pelve',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Tipo de Pelve</th><th>Formato do estreito superior</th><th>Diâmetro ântero-posterior x transverso</th><th>Prognóstico obstétrico</th></tr></thead><tbody>
<tr><td>Ginecoide</td><td>Oval ou arredondado</td><td>Diâmetros equilibrados</td><td>Mais favorável para o parto vaginal (tipo ideal).</td></tr>
<tr><td>Androide</td><td>Coração ou triangular</td><td>Diâmetro transverso menor que o ântero-posterior</td><td>Desfavorável, com tendência a partos difíceis e apresentações posteriores.</td></tr>
<tr><td>Antropoide</td><td>Oval alongado no sentido ântero-posterior</td><td>Ântero-posterior maior que o transverso</td><td>Relativamente favorável, parto possível, comum apresentação occipito-posterior.</td></tr>
<tr><td>Platipeloide</td><td>Oval achatado (transverso largo)</td><td>Transverso muito maior que o ântero-posterior</td><td>Desfavorável, maior risco de retenção da cabeça fetal.</td></tr>
</tbody></table></div>`
        },
        {
            id: 'go-usg-gravidez-sinais',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'USG - Gravidez e Sinais de Gravidez',
            imagem: 'assets/bullets/img/go-sinal-hunter.png',
            html: `<p><strong>USG - Gravidez:</strong></p>
<ul class="reader-list">
<li>4 semanas → saco gestacional (primeira estrutura a aparecer) → surge com o BHCG &gt; 1.000 (no geral)</li>
<li>5 semanas → vesícula vitelínica</li>
<li>6/7 semanas → embrião/BCE+</li>
</ul>
<p><strong>Sinais de Gravidez:</strong></p>
<ul class="reader-list">
<li><strong>Presunção:</strong>
<ul class="reader-list reader-sublist">
<li>Náuseas</li><li>Mastalgia</li><li>Tubérculos de Montgomery</li><li>Rede de Haller</li><li>Sinal de Hunter</li>
</ul></li>
<li><strong>Probabilidade:</strong>
<ul class="reader-list reader-sublist">
<li>Sinal de Hegar: amolecimento do istmo uterino</li>
<li>Sinal de Goodell: amolecimento do colo uterino</li>
<li>Sinal de Piskacek: assimetria uterina</li>
<li>Sinal de Kluge: vagina roxa</li>
<li>Sinal de Jacquemier: meato/vulva roxos</li>
</ul></li>
<li><strong>Certeza:</strong>
<ul class="reader-list reader-sublist">
<li>Puzos: rechaço fetal após 14 semanas</li>
<li>Percepção dos movimentos fetais pelo examinador</li>
<li>Ausculta dos batimentos cardíacos fetais (Doppler ou estetoscópio)</li>
</ul></li>
</ul>`
        },
        {
            id: 'go-pre-natal',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Pré-Natal',
            html: `<ul class="reader-list">
<li>Mínimo de consultas: 6</li>
<li><strong>Exames:</strong>
<ul class="reader-list reader-sublist">
<li>Tipagem sanguínea e fator Rh: fundamental para detectar incompatibilidade sanguínea entre mãe e feto.</li>
<li>Hemograma completo: permite avaliar anemia, infecções e outros distúrbios hematológicos.</li>
<li>Glicemia de jejum: importante para rastrear diabetes gestacional, uma das complicações mais comuns da gravidez.</li>
<li>Sorologia para sífilis (VDRL): a detecção precoce e tratamento da sífilis evita transmissão vertical.</li>
<li>Sorologia para HIV: permite o início imediato da terapia antirretroviral, se necessário.</li>
<li>Sorologia para HTLV: atualização 2025.</li>
<li>Teste para hepatite B (HBsAg): essencial para prevenir a transmissão vertical e iniciar medidas de proteção para o recém-nascido.</li>
<li>Sorologia para toxoplasmose (IgG e IgM): principalmente importante no primeiro trimestre, quando a infecção pode causar malformações graves.</li>
<li>Exame de urina tipo I e urocultura: auxilia na detecção de infecções urinárias, que são comuns na gestação e podem evoluir para pielonefrite.</li>
<li>Coombs indireto: indicado para gestantes Rh negativo, para avaliar a presença de anticorpos contra o sangue do bebê.</li>
<li>Eletroforese de hemoglobina: útil em pacientes com suspeita de hemoglobinopatias, como a anemia falciforme.</li>
</ul></li>
</ul>
<p><strong>Suplementação na Gravidez:</strong></p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Suplemento</th><th>Dose recomendada</th><th>Indicação / Benefício</th></tr></thead><tbody>
<tr><td>Ácido fólico</td><td>0,4 mg/dia (1–3 meses antes da concepção até 12 semanas). Se fator de risco: 4 mg/dia</td><td>Prevenção de defeitos do tubo neural</td></tr>
<tr><td>Ferro</td><td>40-60 mg/dia (das 20 semanas até o puerpério)</td><td>Prevenção de anemia ferropriva</td></tr>
<tr><td>Cálcio</td><td>1.000 mg/dia (a partir de 12 semanas)</td><td>Prevenção de pré-eclâmpsia</td></tr>
</tbody></table></div>
<p><strong>Vacinas recomendadas na Gravidez:</strong></p>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Vacina</th><th>Quando aplicar</th><th>Observações</th></tr></thead><tbody>
<tr><td>dTpa (difteria, tétano e coqueluche acelular)</td><td>A partir das 20 semanas</td><td>Dose única a cada gestação</td></tr>
<tr><td>Influenza (gripe inativada)</td><td>Qualquer idade gestacional durante a campanha</td><td>Anual, inativada</td></tr>
<tr><td>Hepatite B</td><td>Se não vacinada antes ou incompleta</td><td>Série de 3 doses conforme calendário vacinal</td></tr>
<tr><td>COVID-19 (inativada ou RNA)</td><td>Conforme esquema vigente (OMS/PNI)</td><td>Seguir recomendações atualizadas</td></tr>
<tr><td>Vírus Sincicial Respiratório (VSR)</td><td>Preferencialmente no 3º trimestre (aprox. 32–36 semanas)</td><td>Administração materna; anticorpos passam para o bebê</td></tr>
</tbody></table></div>`
        },
        {
            id: 'go-estatica-fetal',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Estática Fetal',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Tipo de apresentação</th><th>Grau</th><th>Ponto de referência</th><th>Denominação</th><th>Características principais</th></tr></thead><tbody>
<tr><td>Flexão</td><td>-</td><td>Lambda</td><td>Apresentação de vértice</td><td>Cabeça bem fletida, é a apresentação mais favorável para o parto vaginal.</td></tr>
<tr><td>Deflexão de 1º grau</td><td>1º</td><td>Bregma (fontanela anterior)</td><td>Apresentação de bregma</td><td>Cabeça parcialmente estendida, palpam-se as duas fontanelas; diâmetro occipitofrontal (11,5 cm). Pode haver parto vaginal, mas mais difícil.</td></tr>
<tr><td>Deflexão de 2º grau</td><td>2º</td><td>Glabela (testa)</td><td>Apresentação de fronte</td><td>Cabeça em extensão moderada; diâmetro mento-occipital (13,5 cm). Geralmente não é compatível com parto vaginal.</td></tr>
<tr><td>Deflexão de 3º grau</td><td>3º</td><td>Mento (queixo)</td><td>Apresentação de face</td><td>Cabeça completamente estendida; diâmetro submentobregmático (9,5 cm). Pode haver parto vaginal se o mento estiver anterior; se for posterior, parto vaginal é impossível.</td></tr>
</tbody></table></div>`
        },
        {
            id: 'go-menor-diametro-conjugatas',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Menor Diâmetro Cefálico e Conjugatas Pélvicas',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Diâmetro</th><th>Limites Anatômicos</th><th>Valor Médio</th><th>Observações</th></tr></thead><tbody>
<tr><td>Suboccipitobregmático</td><td>Do suboccipital (abaixo do occipício) até o bregma (fontanela anterior)</td><td>9,5 cm</td><td>É o menor diâmetro cefálico, o que torna a apresentação de vértice a mais favorável para o parto vaginal.</td></tr>
</tbody></table></div>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Tipo de Conjugata</th><th>Local de Medição</th><th>Valor Médio</th><th>Importância Clínica</th></tr></thead><tbody>
<tr><td>Conjugata anatômica (ou verdadeira)</td><td>Da borda superior da sínfise púbica até o promontório sacral</td><td>≈ 11,5 cm</td><td>Sem aplicação clínica direta; serve de base anatômica.</td></tr>
<tr><td>Conjugata obstétrica</td><td>Do ponto mais posterior da face interna da sínfise púbica até o promontório sacral</td><td>≈ 10,5 cm</td><td>É a menor distância útil para a passagem da cabeça fetal — limita o estreito superior da pelve.</td></tr>
<tr><td>Conjugata diagonal</td><td>Da borda inferior da sínfise púbica até o promontório sacral</td><td>≈ 12,5 a 13 cm</td><td>Usada para estimar a conjugata obstétrica.</td></tr>
</tbody></table></div>
<div class="reader-callout reader-callout-bloco"><p>💡 Conjugata obstétrica = conjugata diagonal − 1,5 cm</p></div>`
        },
        {
            id: 'go-partograma-avaliacao-diagnosticos',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Partograma - Avaliação e Diagnósticos',
            html: `<ul class="reader-list">
<li>Linhas de alerta e de ação acompanham a dilatação!</li>
<li>Linha de alerta começa logo após a primeira dilatação registrada.</li>
<li>Linha de ação começa 4 quadrados depois da linha de alerta.</li>
<li>Triângulo = dilatação</li>
<li>Triângulo pintado = bolsa rota</li>
<li>Bolinha = altura da apresentação</li>
</ul>
<p><strong>Diagnósticos:</strong></p>
<p><strong>1) Fase ativa prolongada</strong></p>
<ul class="reader-list"><li>Dilatação &lt; 1 cm/hora em intervalo de 2 horas.</li></ul>
<p><strong>2) Parada secundária da dilatação</strong></p>
<ul class="reader-list">
<li>Dilatação mantida em 2 horas.</li>
<li>Ou seja, no intervalo de 2 horas o triângulo continua na mesma linha!</li>
<li>Hipótese: DCP?</li>
</ul>
<p><strong>3) Parada secundária da descida</strong></p>
<ul class="reader-list">
<li>Expulsivo → altura mantida por 1 hora.</li>
<li>Ou seja, já dilatou tudo (triângulo já está em 10cm) e o RN continua na mesma altura pelo intervalo de 1 hora.</li>
</ul>
<p><strong>4) Período pélvico prolongado</strong></p>
<ul class="reader-list">
<li>Expulsivo → descida é lenta, mas não parou!</li>
<li>Primíparas → 3 horas</li>
<li>Multípara → 2 horas</li>
</ul>
<p><strong>5) Parto precipitado (taquitócito)</strong></p>
<ul class="reader-list">
<li>Dilatação, descida e expulsão &lt; ou igual 4 horas.</li>
<li>Aumenta a chance de laceração de canal, de atonia uterina...</li>
</ul>`
        },
        {
            id: 'go-usg-gemelaridade',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'USG - Gemelaridade',
            html: `<ul class="reader-list">
<li><strong>Sinal do lambda:</strong> dicoriônicas</li>
<li><strong>Sinal do T:</strong> monocoriônicas</li>
</ul>`
        },
        {
            id: 'go-ctg-avaliacao',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'CTG - Avaliação',
            html: `<ul class="reader-list">
<li><strong>Linha de base:</strong>
<ul class="reader-list reader-sublist">
<li>Normal: 110 a 160 bpm.</li>
<li>Taquicardia: acima de 160 bpm por pelo menos 10 minutos.</li>
<li>Bradicardia: abaixo de 110 bpm por pelo menos 10 minutos.</li>
</ul></li>
<li><strong>Acelerações:</strong> Aumento abrupto de pelo menos 15 bpm da linha de base com duração de ≥15 segundos (se &lt; 32 sem é definida como aumento de pelo menos 10bpm em 10 seg), geralmente associada ao movimento fetal. É considerada prolongada se dura mais de 2 minutos;</li>
<li><strong>Desacelerações:</strong> Queda da frequência cardíaca que pode ser periódica (associada à contrações), episódicas (sem associação com contração), intermitentes (ocorre em &lt; 50% das contrações) ou recorrentes (em &gt; 50% das contrações).
<ul class="reader-list reader-sublist">
<li><strong>DIP 1/ Precoce/ Cefálica/ Fisiológica:</strong> associada a compressão do polo cefálico durante a contração uterina, em que o nadir da desaceleração coincide com o ápice da contração.</li>
<li><strong>DIP 2/ Tardia/ Placentária:</strong> associada à redução do fluxo sanguíneo placentário que ocorre durante a contração, iniciam após o ápice da contração. Quando persistentes, significam insuficiência placentária.</li>
<li><strong>DIP 3/ Variável/ Umbilical:</strong> associada a compressão temporária do cordão umbilical, podem ocorrer a qualquer momento, geralmente tem início e fim abruptos, com morfologia diversa.</li>
<li><strong>Padrão Sinusoidal:</strong> Um padrão ondulatório, rítmico e regular, que é um sinal ominoso de anemia fetal grave e hipoxemia, com alto risco de óbito intraútero.</li>
</ul></li>
</ul>`
        },
        {
            id: 'go-ctg-classificacoes',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'CTG - Classificações',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Categoria CTG</th><th>Padrão</th><th>Interpretação / Risco</th></tr></thead><tbody>
<tr><td>Categoria I</td><td>Linha de base 110–160 bpm, variabilidade moderada, sem desacelerações tardias ou variáveis</td><td>Normal, bem-estar fetal normal</td></tr>
<tr><td>Categoria II</td><td>Não se encaixa em I ou III: variabilidade mínima/alta, desacelerações variáveis ou prolongadas, bradicardia transitória</td><td>Intermediário, monitoramento contínuo e investigação</td></tr>
<tr><td>Categoria III</td><td>Bradicardia &lt;100 bpm, variabilidade ausente, desacelerações tardias repetitivas</td><td>Padrão anormal, risco de hipóxia fetal, requer intervenção imediata</td></tr>
</tbody></table></div>`
        },
        {
            id: 'go-perfil-biofisico-fetal',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Perfil Biofísico Fetal',
            html: `<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Parâmetro</th><th>Critérios</th><th>Pontuação</th></tr></thead><tbody>
<tr><td>Cardiotocografia</td><td>2 acelerações transitórias</td><td>2 ou 0</td></tr>
<tr><td>Movimentos respiratórios</td><td>Pelo menos 1 de 30s, em 30 minutos</td><td>2 ou 0</td></tr>
<tr><td>Movimentos fetais</td><td>3 discretos ou 1 amplo, em 30 minutos</td><td>2 ou 0</td></tr>
<tr><td>Tônus fetal</td><td>Rápida flexão/extensão ou mãos fechadas</td><td>2 ou 0</td></tr>
<tr><td>ILA</td><td>Marcador crônico ILA &gt; 5 ou ILA &lt; 5</td><td>2 ou 0</td></tr>
</tbody></table></div>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Escore</th><th>Interpretação</th><th>Conduta</th></tr></thead><tbody>
<tr><td>10/10, 8/10 (ILA normal), 8/8 (sem CTG)</td><td>Risco de asfixia e mortalidade em 1 semana na ausência de intervenção 1/1.000</td><td>Ausência de asfixia, sem indicação de intervenção.</td></tr>
<tr><td>8/10 (oligoamnio)</td><td>Suspeita de asfixia crônica. Mortalidade em 1 semana na ausência de intervenção 89/1.000</td><td>Considerar parto (oligoâmnio isolado: resolução 37 semanas / &gt;34-37 semanas se ILA &lt;3, acompanhar &lt;34 semanas).</td></tr>
<tr><td>6/10 (ILA normal)</td><td>Teste duvidoso, possível asfixia fetal. Mortalidade em 1 semana na ausência de intervenção 89/1.000</td><td>Repetir exame (24 horas), ou interromper gestação se IG &gt;34 semanas. Considerar parto se mantiver alterações.</td></tr>
<tr><td>6/10 (oligoamnio) ou 4/10 (ILA normal)</td><td>Provável asfixia fetal e mortalidade em uma semana de intervenção 89/1.000 // Alta probabilidade de asfixia fetal e mortalidade na ausência de intervenção de 91/1.000</td><td>Parto com 26-28 semanas (viabilidade)</td></tr>
<tr><td>4/10 (oligoamnio)-0/10</td><td>Asfixia fetal muito provável-certa e mortalidade fetal em uma semana na ausência de intervenção de 91-125-600/1.000</td><td>Parto com 26-28 semanas (viabilidade)</td></tr>
</tbody></table></div>`
        },
        {
            id: 'go-dopplervelocimetria-fetal',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Dopplervelocimetria Fetal',
            html: `<ul class="reader-list">
<li><strong>Artérias Uterinas:</strong> Aumento da resistência neste vaso materno pode predizer o risco de pré-eclâmpsia e RCF.</li>
<li><strong>Artéria Umbilical (AU):</strong> É o primeiro vaso a se alterar. Um aumento no seu Índice de Pulsatilidade (IP) reflete o aumento da resistência na placenta. A progressão da doença leva ao fluxo diastólico zero (Diástole Zero) e, finalmente, ao fluxo reverso (Diástole Reversa), que são marcadores de grave comprometimento placentário.</li>
<li><strong>Artéria Cerebral Média (ACM):</strong> Em resposta à hipoxemia, o feto redistribui o fluxo sanguíneo para órgãos nobres, como o cérebro. Isso causa uma vasodilatação na ACM, detectada como uma queda em seu IP. Este fenômeno é conhecido como centralização fetal ou "brain-sparing". A centralização é um mecanismo de adaptação e, isoladamente, não define sofrimento fetal.</li>
<li><strong>Ducto Venoso (DV):</strong> É um dos últimos vasos a se alterar. O aumento do seu IP ou a presença de uma onda "a" ausente ou reversa indicam falência do coração direito devido à sobrecarga e se correlacionam fortemente com acidemia fetal.</li>
</ul>`
        },
        {
            id: 'go-classificacao-robson',
            area: 'Ginecologia e Obstetrícia',
            titulo: 'Classificação de Robson',
            html: `<p><strong>Objetivo:</strong> avaliar e monitorar as taxas de cesárea de forma padronizada e comparável, de acordo com cada grupo.</p>
<p>Organiza as gestantes em 10 grupos distintos com base em 5 características obstétricas de rotina:</p>
<ul class="reader-list">
<li>Número de gestações e cesáreas anteriores</li>
<li>Idade gestacional (&gt; ou &lt; 37 sem)</li>
<li>Apresentação do feto</li>
<li>Tipo de gestação (única ou gemelar)</li>
<li>Curso do trabalho de parto (espontâneo ou induzido / se a cesárea foi realizada antes do início do trabalho de parto)</li>
</ul>
<div class="reader-table-wrap"><table class="reader-table"><thead><tr><th>Grupo</th><th>Descrição</th><th>Expectativa de cesárea</th></tr></thead><tbody>
<tr><td>1</td><td>Nulípara, gestação única, cefálica, ≥37 semanas, em trabalho de parto espontâneo.</td><td>Menor</td></tr>
<tr><td>2</td><td>Nulípara, gestação única, cefálica, ≥37 semanas, com indução ou cesárea anterior ao trabalho de parto.</td><td>Menor</td></tr>
<tr><td>3</td><td>Multípara (excluindo cesárea prévia), gestação única, cefálica, ≥37 semanas, em trabalho de parto espontâneo.</td><td>Menor</td></tr>
<tr><td>4</td><td>Multípara (excluindo cesárea prévia), gestação única, cefálica ≥37 semanas, com indução ou cesárea anterior ao trabalho de parto.</td><td>Menor</td></tr>
<tr><td>5</td><td>Com cesárea prévia, gestação única, cefálica, ≥37 semanas.</td><td>Menor (mas cultura "uma vez cesárea, sempre cesárea")</td></tr>
<tr><td>6</td><td>Todos os partos pélvicos em nulíparas.</td><td>Maior</td></tr>
<tr><td>7</td><td>Todos os partos pélvicos em multíparas (incluindo cesárea prévia).</td><td>Maior</td></tr>
<tr><td>8</td><td>Todas as gestações múltiplas (incluindo cesárea prévia).</td><td>Maior</td></tr>
<tr><td>9</td><td>Todas as apresentações anormais (incluindo cesárea prévia).</td><td>Maior</td></tr>
<tr><td>10</td><td>Todas as gestações únicas, cefálicas, &lt;37 semanas (incluindo cesárea prévia).</td><td>Maior</td></tr>
</tbody></table></div>`
        }
    ];

    window.TRYCKTRACK_BULLETS_GO = bullets;
})();
