// Extras de leitura: anotações e "Meus grifos", modo foco,
// dicionário de siglas e fonte para dislexia.
// Depende de app-reader.js (hlRead/hlWrite/hlDocId/hlHost, preferências).
(function () {
    const $ = id => document.getElementById(id);
    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    const HOSTS = () => ['readerContent', 'essentialsContent', 'bulletsContent'].map($);
    const activeHost = () => {
        if ($('bulletsView').classList.contains('active')) return $('bulletsContent');
        if ($('readerView').classList.contains('active')) return $('readerContent');
        if ($('essentialsView').classList.contains('active') && $('essentialsView').classList.contains('ess-reading')) return $('essentialsContent');
        return null;
    };

    // ---------- Anotações e Meus grifos ----------
    const dlg = () => $('rxDialog'), back = () => $('rxBackdrop');
    let dlgOpener = null;
    dlg().inert = true; dlg().setAttribute('aria-hidden', 'true');
    function openDialog(html) {
        if (!dlg().classList.contains('active')) dlgOpener = document.activeElement;
        dlg().innerHTML = html;
        const t = dlg().querySelector('.rx-title');
        if (t) dlg().setAttribute('aria-label', (t.firstChild ? t.firstChild.textContent : t.textContent).trim());
        dlg().inert = false; dlg().setAttribute('aria-hidden', 'false');
        dlg().classList.add('active'); back().classList.add('active');
        setTimeout(() => (dlg().querySelector('textarea, .rx-primary, button') || dlg()).focus(), 80);
    }
    function closeDialog() {
        dlg().classList.remove('active'); back().classList.remove('active');
        dlg().inert = true; dlg().setAttribute('aria-hidden', 'true');
        if (dlgOpener && dlgOpener.focus) { dlgOpener.focus(); dlgOpener = null; }
    }
    window.rxCloseDialog = closeDialog;

    function docOfGroup(gid) {
        const m = document.querySelector(`mark[data-g="${gid}"]`);
        const host = m && hlHost(m);
        return host ? { host, docId: hlDocId(host) } : null;
    }
    const gidOf = e => e.g || e.id;

    window.rxOpenNote = function (gid) {
        const d = docOfGroup(gid); if (!d) return;
        const cur = ((hlRead()[d.docId] || []).find(e => gidOf(e) === gid) || {}).note || '';
        openDialog(`<div class="rx-title">Anotação</div>
            <textarea id="rxNoteText" rows="5" maxlength="1200" placeholder="Escreva sua anotação…" aria-label="Anotação">${esc(cur)}</textarea>
            <div class="rx-actions"><button type="button" onclick="rxCloseDialog()">Cancelar</button>
            ${cur ? '<button type="button" onclick="rxSaveNote(\'' + gid + '\', true)">Apagar nota</button>' : ''}
            <button type="button" class="rx-primary" onclick="rxSaveNote('${gid}')">Salvar</button></div>`);
        setTimeout(() => $('rxNoteText').focus(), 80);
    };
    window.rxSaveNote = function (gid, clear) {
        const d = docOfGroup(gid); if (!d) return closeDialog();
        const txt = clear ? '' : $('rxNoteText').value.trim();
        const store = hlRead();
        (store[d.docId] || []).forEach(e => { if (gidOf(e) === gid) { if (txt) e.note = txt; else delete e.note; } });
        hlWrite(store);
        document.querySelectorAll(`mark[data-g="${gid}"]`).forEach(m => m.classList.toggle('has-note', !!txt));
        closeDialog();
    };
    // botão "Nota" da barra de seleção: grifa (se ainda não estiver grifado) e abre a nota
    window.hlNote = function () {
        const sel = getSelection();
        const mark = sel.rangeCount && sel.anchorNode && (sel.anchorNode.parentElement || sel.anchorNode).closest('mark.reader-highlight-mark');
        const gid = mark ? (mark.dataset.g || mark.dataset.id) : applyHighlightColor('yellow');
        if (gid) rxOpenNote(gid);
    };

    function groups(docId) {
        const map = new Map();
        (hlRead()[docId] || []).forEach(e => {
            const g = gidOf(e);
            if (!map.has(g)) map.set(g, { g, c: e.c, note: e.note || '', parts: [] });
            map.get(g).parts.push(e.t);
        });
        return [...map.values()];
    }
    window.rxOpenList = function () {
        const host = activeHost(); const docId = host && hlDocId(host);
        closeFontSizeSheet();
        const list = docId ? groups(docId) : [];
        openDialog(`<div class="rx-title">Meus grifos <span class="rx-sub">${list.length}</span></div>
            <div class="rx-list">${list.length ? list.map(x => `<div class="rx-item" data-c="${x.c}">
                <div class="rx-text">${esc(x.parts.join(' '))}</div>
                ${x.note ? `<div class="rx-note">${esc(x.note)}</div>` : ''}
                <div class="rx-item-actions">
                    <button type="button" onclick="rxJump('${x.g}')">Ir ao trecho</button>
                    <button type="button" onclick="rxOpenNote('${x.g}')">${x.note ? 'Editar nota' : 'Anotar'}</button>
                    <button type="button" onclick="rxDelete('${x.g}')">Apagar</button></div></div>`).join('')
                : '<p class="rx-empty">Nenhum grifo nesta leitura ainda. Selecione um trecho do texto para grifar.</p>'}</div>
            <div class="rx-actions"><button type="button" class="rx-primary" onclick="rxCloseDialog()">Fechar</button></div>`);
    };
    window.rxJump = function (gid) {
        const m = document.querySelector(`mark[data-g="${gid}"]`);
        closeDialog();
        if (m) m.scrollIntoView({ block: 'center', behavior: 'smooth' });
    };
    window.rxDelete = function (gid) {
        const d = docOfGroup(gid);
        const host = activeHost(), docId = d ? d.docId : host && hlDocId(host);
        document.querySelectorAll(`mark[data-g="${gid}"]`).forEach(m => { const p = m.parentNode; m.replaceWith(...m.childNodes); p.normalize(); });
        const store = hlRead();
        if (docId && store[docId]) { store[docId] = store[docId].filter(e => gidOf(e) !== gid); hlWrite(store); }
        rxOpenList();
    };
    back().addEventListener('click', closeDialog);

    // ---------- Modo foco ----------
    const FOCUS_SEL = 'p, li, h3, h4, td, th, .reader-callout, figcaption';
    let io = null;
    function refreshFocus() {
        if (io) { io.disconnect(); io = null; }
        document.querySelectorAll('.in-focus').forEach(n => n.classList.remove('in-focus'));
        if (!readPrefs().focus) return;
        const host = activeHost(); if (!host) return;
        io = new IntersectionObserver(es => es.forEach(e => e.target.classList.toggle('in-focus', e.isIntersecting)),
            { root: host, rootMargin: '-30% 0px -30% 0px' });
        host.querySelectorAll(FOCUS_SEL).forEach(n => io.observe(n));
    }
    HOSTS().forEach(h => new MutationObserver(() => { clearTimeout(h._ft); h._ft = setTimeout(refreshFocus, 120); }).observe(h, { childList: true }));

    // ---------- Dicionário de siglas ----------
    const G = {
        AAS: 'Ácido acetilsalicílico', ACTH: 'Hormônio adrenocorticotrófico', ADH: 'Hormônio antidiurético', AIG: 'Adequado para a idade gestacional',
        AINE: 'Anti-inflamatório não esteroide', ALT: 'Alanina aminotransferase (= TGP)', ANCA: 'Anticorpo anticitoplasma de neutrófilo', APS: 'Atenção Primária à Saúde',
        AST: 'Aspartato aminotransferase (= TGO)', ATB: 'Antibiótico', ATLS: 'Suporte avançado de vida no trauma (Advanced Trauma Life Support)', AVC: 'Acidente vascular cerebral',
        AZT: 'Zidovudina', BCF: 'Batimentos cardiofetais', BCG: 'Bacilo de Calmette-Guérin (vacina contra tuberculose)', BK: 'Bacilo de Koch (Mycobacterium tuberculosis)',
        CAPS: 'Centro de Atenção Psicossocial', CD4: 'Linfócitos T CD4+, células de defesa alvo do HIV', CEA: 'Antígeno carcinoembrionário', CHC: 'Carcinoma hepatocelular (ou contraceptivo hormonal combinado, em Ginecologia)',
        CIUR: 'Crescimento intrauterino restrito', CIVD: 'Coagulação intravascular disseminada', CPK: 'Creatinofosfoquinase', CPRE: 'Colangiopancreatografia retrógrada endoscópica',
        CVF: 'Capacidade vital forçada', DC: 'Débito cardíaco', DIP: 'Doença inflamatória pélvica', DM2: 'Diabetes mellitus tipo 2', DPOC: 'Doença pulmonar obstrutiva crônica',
        DPP: 'Descolamento prematuro de placenta', DRC: 'Doença renal crônica', DRGE: 'Doença do refluxo gastroesofágico', DTG: 'Dolutegravir', DTP: 'Vacina contra difteria, tétano e coqueluche (pertussis)',
        DUM: 'Data da última menstruação', EAS: 'Exame de urina tipo 1 (elementos anormais e sedimento)', ECG: 'Eletrocardiograma', EEG: 'Eletroencefalograma', EEI: 'Esfíncter esofágico inferior',
        EPF: 'Exame parasitológico de fezes', EV: 'Endovenoso', FAN: 'Fator antinuclear', FAST: 'Avaliação ultrassonográfica focada no trauma', FC: 'Frequência cardíaca',
        FIGO: 'Federação Internacional de Ginecologia e Obstetrícia', FR: 'Frequência respiratória (ou fator de risco, conforme o contexto)', FSH: 'Hormônio folículo-estimulante',
        GCS: 'Escala de coma de Glasgow', GH: 'Hormônio do crescimento', GIG: 'Grande para a idade gestacional', GINA: 'Iniciativa Global para Asma', GNPE: 'Glomerulonefrite pós-estreptocócica',
        GOLD: 'Iniciativa Global para DPOC', HAS: 'Hipertensão arterial sistêmica', HBV: 'Vírus da hepatite B', HCG: 'Gonadotrofina coriônica humana', HCV: 'Vírus da hepatite C',
        HDA: 'Hemorragia digestiva alta', HDL: 'Colesterol de alta densidade', HIV: 'Vírus da imunodeficiência humana', HNF: 'Heparina não fracionada', HPV: 'Papilomavírus humano',
        HTLV: 'Vírus linfotrópico de células T humanas', IAM: 'Infarto agudo do miocárdio', IBP: 'Inibidor de bomba de prótons', ICC: 'Insuficiência cardíaca congestiva',
        ICS: 'Corticoide inalatório', IECA: 'Inibidor da enzima conversora de angiotensina', IG: 'Idade gestacional', ILTB: 'Infecção latente pela tuberculose', IM: 'Intramuscular',
        IMC: 'Índice de massa corporal', INCA: 'Instituto Nacional de Câncer', INR: 'Razão normalizada internacional (controle da anticoagulação)', IOT: 'Intubação orotraqueal',
        IRA: 'Insuficiência renal aguda', ISRS: 'Inibidor seletivo da recaptação de serotonina', IST: 'Infecção sexualmente transmissível', ITU: 'Infecção do trato urinário',
        IV: 'Intravenoso', IVAS: 'Infecção de vias aéreas superiores', LABA: 'Beta-2 agonista de longa duração', LDH: 'Desidrogenase láctica', LDL: 'Colesterol de baixa densidade',
        LES: 'Lúpus eritematoso sistêmico', LH: 'Hormônio luteinizante', MAPA: 'Monitorização ambulatorial da pressão arterial', MMG: 'Mamografia', MMII: 'Membros inferiores',
        NPH: 'Insulina de ação intermediária (Neutral Protamine Hagedorn)', NTA: 'Necrose tubular aguda', OMS: 'Organização Mundial da Saúde', PAAF: 'Punção aspirativa por agulha fina',
        PAD: 'Pressão arterial diastólica', PAM: 'Pressão arterial média', PAS: 'Pressão arterial sistólica', PBE: 'Peritonite bacteriana espontânea',
        PCR: 'Parada cardiorrespiratória ou proteína C reativa (conforme o contexto)', PIC: 'Pressão intracraniana', PIG: 'Pequeno para a idade gestacional', PNI: 'Programa Nacional de Imunizações',
        PPD: 'Derivado proteico purificado (prova tuberculínica)', PSA: 'Antígeno prostático específico', PT: 'Prova tuberculínica', PTH: 'Paratormônio', QRS: 'Complexo QRS do ECG (despolarização ventricular)',
        RCP: 'Ressuscitação cardiopulmonar', RCU: 'Retocolite ulcerativa', RDW: 'Amplitude de distribuição dos eritrócitos', RM: 'Ressonância magnética', RN: 'Recém-nascido', RX: 'Radiografia',
        SABA: 'Beta-2 agonista de curta duração', SAF: 'Síndrome antifosfolípide', SBP: 'Peritonite bacteriana espontânea (spontaneous bacterial peritonitis)', SC: 'Subcutâneo',
        SDRA: 'Síndrome do desconforto respiratório agudo', SIADH: 'Síndrome da secreção inapropriada de ADH', SNC: 'Sistema nervoso central', SNG: 'Sonda nasogástrica',
        SOFA: 'Escore de disfunção orgânica (Sequential Organ Failure Assessment)', SOP: 'Síndrome dos ovários policísticos', SRO: 'Sal de reidratação oral', SUS: 'Sistema Único de Saúde',
        T3: 'Tri-iodotironina', T4: 'Tiroxina', T4L: 'Tiroxina livre', TARV: 'Terapia antirretroviral', TB: 'Tuberculose', TC: 'Tomografia computadorizada', TCE: 'Traumatismo cranioencefálico',
        TDF: 'Tenofovir', TEP: 'Tromboembolismo pulmonar', TFG: 'Taxa de filtração glomerular', TGO: 'Transaminase oxalacética (= AST)', TGP: 'Transaminase pirúvica (= ALT)', TNF: 'Fator de necrose tumoral',
        TOTG: 'Teste oral de tolerância à glicose', TSH: 'Hormônio estimulante da tireoide', TVP: 'Trombose venosa profunda', UBS: 'Unidade Básica de Saúde', USG: 'Ultrassonografia',
        UTI: 'Unidade de terapia intensiva', VDRL: 'Teste não treponêmico para sífilis', VEF1: 'Volume expiratório forçado no 1º segundo', VHS: 'Velocidade de hemossedimentação',
        VNI: 'Ventilação não invasiva', VO: 'Via oral', VPN: 'Valor preditivo negativo', VPP: 'Ventilação com pressão positiva (neonatal) ou valor preditivo positivo', VSR: 'Vírus sincicial respiratório'
    };

    // Siglas adicionais (as ambíguas trazem os dois sentidos mais comuns)
    Object.assign(G, {
        'BI-RADS': 'Sistema de classificação de achados da mamografia, ultrassonografia e ressonância das mamas', 'LI-RADS': 'Sistema de classificação de nódulos hepáticos em imagem (cirrose)',
        'DSM-5-TR': 'Manual Diagnóstico e Estatístico de Transtornos Mentais, 5ª edição, texto revisado', '5-ASA': 'Mesalazina (ácido 5-aminossalicílico)', 'CHA2DS2-VASc': 'Escore de risco de AVC na fibrilação atrial', 'CHA2DS2-VA': 'Escore de risco de AVC na fibrilação atrial',
        PA: 'Pressão arterial', DM: 'Diabetes mellitus', CA: 'Câncer (neoplasia maligna)', MS: 'Ministério da Saúde', IC: 'Insuficiência cardíaca (ou intervalo de confiança, em Epidemiologia)', EDA: 'Endoscopia digestiva alta',
        UI: 'Unidades internacionais', CI: 'Contraindicação (ou corticoide inalatório, em Pneumologia)', BI: 'Bilirrubina indireta', BD: 'Bilirrubina direta (ou broncodilatador, em Pneumologia)', BT: 'Bilirrubina total',
        RR: 'Risco relativo (ou intervalo entre ondas R no ECG)', FA: 'Fibrilação atrial', AVE: 'Acidente vascular encefálico', SF: 'Soro fisiológico', CAT: 'Comunicação de Acidente de Trabalho (ou COPD Assessment Test, na DPOC)',
        ASA: 'Classificação de risco anestésico (American Society of Anesthesiologists)', ACO: 'Anticoncepcional oral', TAP: 'Tempo de atividade de protrombina', ST: 'Segmento ST do ECG', AV: 'Atrioventricular',
        VIP: 'Vacina inativada contra poliomielite (ou Volume, Insulina e Potássio, no tratamento da hipercalemia)', SCQ: 'Superfície corporal queimada', VP: 'Verdadeiro positivo', FP: 'Falso-positivo', FN: 'Falso-negativo', VN: 'Verdadeiro negativo',
        HD: 'Hipocôndrio direito (ou hemorragia digestiva / hemodiálise, conforme o contexto)', TH: 'Terapia hormonal', PMN: 'Polimorfonucleares', FID: 'Fossa ilíaca direita', LAMA: 'Antagonista muscarínico de longa duração', ACS: 'Agente comunitário de saúde',
        HCO3: 'Bicarbonato', 'HCO₃': 'Bicarbonato', IO: 'Intraósseo (ou idade óssea, em Endocrinologia pediátrica)', TGI: 'Trato gastrointestinal', SVO: 'Serviço de Verificação de Óbito', RVP: 'Resistência vascular periférica',
        RP: 'Receptor de progesterona', RE: 'Receptor de estrógeno', PCAB: 'Bloqueador ácido competitivo de potássio (ex.: vonoprazana)', M0: 'Sem metástase à distância (estadiamento TNM)', M1: 'Metástase à distância (estadiamento TNM)', N0: 'Sem linfonodos acometidos (estadiamento TNM)',
        MB: 'Membrana basal (ou multibacilar, na hanseníase)', HF: 'Hipercolesterolemia familiar (ou história familiar, conforme o contexto)', IL: 'Interleucina', TTO: 'Tratamento', CPAP: 'Pressão positiva contínua nas vias aéreas',
        AHA: 'American Heart Association', ADA: 'American Diabetes Association', B1: 'Tiamina (vitamina B1)', B2: 'Riboflavina (vitamina B2)', B3: 'Niacina (vitamina B3)', B6: 'Piridoxina (vitamina B6)', B12: 'Cobalamina (vitamina B12)',
        DNA: 'Ácido desoxirribonucleico', RNA: 'Ácido ribonucleico', COVID: 'Doença pelo coronavírus 2019', PTT: 'Tempo de tromboplastina parcial (ou púrpura trombocitopênica trombótica, em Hematologia)', GLP: 'Peptídeo semelhante ao glucagon (GLP-1)',
        HER2: 'Receptor 2 do fator de crescimento epidérmico humano', DIU: 'Dispositivo intrauterino', CMV: 'Citomegalovírus', G6PD: 'Glicose-6-fosfato desidrogenase', AIDS: 'Síndrome da imunodeficiência adquirida', ACWY: 'Vacina meningocócica conjugada (sorogrupos A, C, W e Y)',
        GBS: 'Estreptococo do grupo B', EGB: 'Estreptococo do grupo B', OMA: 'Otite média aguda', HLA: 'Antígeno leucocitário humano', NASF: 'Núcleo de Apoio à Saúde da Família', GASA: 'Gradiente de albumina soro-ascite', GGT: 'Gama-glutamil transferase',
        VCM: 'Volume corpuscular médio', TG: 'Triglicerídeos', LR: 'Ringer lactato (ou razão de verossimilhança, em Epidemiologia)', UFC: 'Unidades formadoras de colônia', TIPS: 'Shunt portossistêmico intra-hepático transjugular',
        TDAH: 'Transtorno do déficit de atenção e hiperatividade', SSJ: 'Síndrome de Stevens-Johnson', SINAN: 'Sistema de Informação de Agravos de Notificação', SGLT2: 'Cotransportador sódio-glicose tipo 2', PNAB: 'Política Nacional de Atenção Básica',
        PET: 'Tomografia por emissão de pósitrons', MRSA: 'Staphylococcus aureus resistente à meticilina', MRPA: 'Monitorização residencial da pressão arterial', MELD: 'Escore de gravidade da cirrose (Model for End-Stage Liver Disease)', ILA: 'Índice de líquido amniótico',
        HIC: 'Hipertensão intracraniana', HBPM: 'Heparina de baixo peso molecular', ESF: 'Estratégia Saúde da Família', DM1: 'Diabetes mellitus tipo 1', BNP: 'Peptídeo natriurético tipo B', SRAG: 'Síndrome respiratória aguda grave', SARS: 'Síndrome respiratória aguda grave',
        RIPE: 'Esquema da tuberculose: rifampicina, isoniazida, pirazinamida e etambutol', RHZE: 'Esquema da tuberculose: rifampicina, isoniazida, pirazinamida e etambutol', RAIU: 'Captação de iodo radioativo', PVC: 'Contração ventricular prematura (extrassístole ventricular)',
        NPT: 'Nutrição parenteral total', NNT: 'Número necessário para tratar', MTX: 'Metotrexato', MMSS: 'Membros superiores', KDIGO: 'Kidney Disease: Improving Global Outcomes (diretriz de doença renal)', IE: 'Endocardite infecciosa', HSA: 'Hemorragia subaracnóidea',
        ELISA: 'Ensaio imunoenzimático', DSM: 'Manual Diagnóstico e Estatístico de Transtornos Mentais', DMG: 'Diabetes mellitus gestacional', CURB: 'Escore de gravidade da pneumonia (CURB-65)', BCC: 'Carcinoma basocelular',
        BAV: 'Bloqueio atrioventricular (ou valva aórtica bicúspide, conforme o contexto)', AFP: 'Alfafetoproteína', ABO: 'Sistema de grupos sanguíneos ABO', PTU: 'Propiltiouracil', PTI: 'Púrpura trombocitopênica imune', PCSK9: 'Pró-proteína convertase subtilisina/kexina tipo 9',
        NYHA: 'Classificação funcional da insuficiência cardíaca (New York Heart Association)', MDR: 'Multirresistente', MASLD: 'Doença hepática esteatótica associada à disfunção metabólica', LMC: 'Leucemia mieloide crônica', LMA: 'Leucemia mieloide aguda',
        LLA: 'Leucemia linfoide aguda', LLC: 'Leucemia linfoide crônica', LCR: 'Líquor (líquido cefalorraquidiano)', FEBRASGO: 'Federação Brasileira das Associações de Ginecologia e Obstetrícia', CO2: 'Dióxido de carbono', CIA: 'Comunicação interatrial',
        CFM: 'Conselho Federal de Medicina', CAGE: 'Questionário de rastreio de abuso de álcool', AUDIT: 'Teste de identificação de transtornos por uso de álcool', ROSC: 'Retorno da circulação espontânea', PEEP: 'Pressão positiva expiratória final',
        ECMO: 'Oxigenação por membrana extracorpórea', EBV: 'Vírus Epstein-Barr', DRESS: 'Reação a drogas com eosinofilia e sintomas sistêmicos', CTG: 'Cardiotocografia', BAAR: 'Bacilo álcool-ácido resistente', AME: 'Atrofia muscular espinhal',
        VEF: 'Volume expiratório forçado', VCI: 'Veia cava inferior', TRH: 'Hormônio liberador de tireotrofina', SIRS: 'Síndrome da resposta inflamatória sistêmica', RTU: 'Ressecção transuretral', ROC: 'Curva ROC (desempenho de um teste diagnóstico)',
        RNM: 'Ressonância nuclear magnética', PCDT: 'Protocolo Clínico e Diretrizes Terapêuticas', MALT: 'Tecido linfoide associado à mucosa', INSS: 'Instituto Nacional do Seguro Social', IGRA: 'Ensaio de liberação de interferon-gama (infecção latente de TB)',
        HPB: 'Hiperplasia prostática benigna', HHV: 'Herpesvírus humano', HELLP: 'Hemólise, enzimas hepáticas elevadas e plaquetopenia', GN: 'Glomerulonefrite', FIV: 'Fertilização in vitro', CDC: 'Centers for Disease Control and Prevention', B19: 'Parvovírus B19',
        APGAR: 'Escala de vitalidade do recém-nascido (1º e 5º minutos)', AIJ: 'Artrite idiopática juvenil', AESP: 'Atividade elétrica sem pulso', ABCDE: 'Avaliação primária do trauma: via aérea, respiração, circulação, déficit neurológico e exposição',
        TRALI: 'Lesão pulmonar aguda relacionada à transfusão', TMP: 'Trimetoprima', SMX: 'Sulfametoxazol', SRAA: 'Sistema renina-angiotensina-aldosterona', SDR: 'Síndrome do desconforto respiratório', Q6H: 'A cada 6 horas', Q8H: 'A cada 8 horas', Q24H: 'A cada 24 horas',
        PRL: 'Prolactina', POCUS: 'Ultrassonografia à beira do leito (point-of-care)', LSIL: 'Lesão intraepitelial escamosa de baixo grau', HSIL: 'Lesão intraepitelial escamosa de alto grau', IPSS: 'Escore internacional de sintomas prostáticos',
        IMAO: 'Inibidor da monoaminoxidase', ICFEP: 'Insuficiência cardíaca com fração de ejeção preservada', HVE: 'Hipertrofia ventricular esquerda', GIST: 'Tumor estromal gastrointestinal', DALY: 'Anos de vida ajustados por incapacidade', COX: 'Ciclo-oxigenase',
        CAM: 'Confusion Assessment Method (rastreio de delirium)', BUN: 'Nitrogênio ureico sanguíneo', BRCA: 'Genes de predisposição ao câncer de mama e ovário', BLS: 'Suporte básico de vida', B27: 'HLA-B27 (associado às espondiloartrites)',
        ASLO: 'Antiestreptolisina O', ASCA: 'Anticorpo anti-Saccharomyces cerevisiae (doença de Crohn)', ACOG: 'American College of Obstetricians and Gynecologists', WON: 'Necrose pancreática organizada (walled-off necrosis)',
        VPPB: 'Vertigem posicional paroxística benigna', TTRN: 'Taquipneia transitória do recém-nascido', TNM: 'Sistema de estadiamento tumoral (tumor, linfonodos e metástase)', TIBC: 'Capacidade total de ligação do ferro', SPIKES: 'Protocolo de comunicação de más notícias',
        SHU: 'Síndrome hemolítico-urêmica', RPM: 'Rotura prematura de membranas', RCV: 'Risco cardiovascular', RAPS: 'Rede de Atenção Psicossocial', PCI: 'Intervenção coronária percutânea', P2Y12: 'Receptor plaquetário P2Y12 (alvo de clopidogrel, ticagrelor)',
        NASH: 'Esteato-hepatite não alcoólica', MIC: 'Concentração inibitória mínima', LSN: 'Limite superior da normalidade', LRA: 'Lesão renal aguda', IRC: 'Insuficiência renal crônica', HAV: 'Vírus da hepatite A', GNRP: 'Glomerulonefrite rapidamente progressiva',
        FIT: 'Teste imunoquímico fecal (pesquisa de sangue oculto)', ERAS: 'Protocolo de recuperação otimizada pós-operatória', ECT: 'Eletroconvulsoterapia', DORT: 'Distúrbios osteomusculares relacionados ao trabalho', DMSA: 'Cintilografia renal com ácido dimercaptossuccínico',
        DMO: 'Densitometria / densidade mineral óssea', DHEA: 'Desidroepiandrosterona', CEREST: 'Centro de Referência em Saúde do Trabalhador', CBP: 'Colangite biliar primária', BERA: 'Potencial evocado auditivo de tronco encefálico', AMIU: 'Aspiração manual intrauterina',
        ACLS: 'Suporte avançado de vida em cardiologia', TSV: 'Taquicardia supraventricular', TOC: 'Transtorno obsessivo-compulsivo', TAG: 'Transtorno de ansiedade generalizada', SOAP: 'Registro clínico: subjetivo, objetivo, avaliação e plano',
        SINASC: 'Sistema de Informações sobre Nascidos Vivos', SHBG: 'Globulina ligadora de hormônios sexuais', RCIU: 'Restrição de crescimento intrauterino', PHQ: 'Questionário de saúde do paciente (PHQ-9: rastreio de depressão)', PFE: 'Pico de fluxo expiratório',
        NTEP: 'Nexo técnico epidemiológico previdenciário', NAFLD: 'Doença hepática gordurosa não alcoólica', MMZ: 'Metimazol', LNG: 'Levonorgestrel', LARC: 'Contracepção reversível de longa duração', JAK: 'Janus quinase', IUE: 'Incontinência urinária de esforço',
        IRSN: 'Inibidor da recaptação de serotonina e noradrenalina', IADPSG: 'International Association of Diabetes and Pregnancy Study Groups', FTC: 'Entricitabina', FINDRISC: 'Escore de risco de diabetes tipo 2', FCF: 'Frequência cardíaca fetal', EFV: 'Efavirenz',
        DILI: 'Lesão hepática induzida por drogas', DASH: 'Dieta para controle da hipertensão', CYP2C19: 'Enzima do citocromo P450 que ativa o clopidogrel', CGA: 'Avaliação geriátrica ampla', BISAP: 'Escore de gravidade da pancreatite aguda', AIT: 'Ataque isquêmico transitório',
        APLV: 'Alergia à proteína do leite de vaca', TEV: 'Tromboembolismo venoso', UPA: 'Unidade de Pronto Atendimento', SAMU: 'Serviço de Atendimento Móvel de Urgência', SAOS: 'Síndrome da apneia obstrutiva do sono', SBC: 'Sociedade Brasileira de Cardiologia',
        SBD: 'Sociedade Brasileira de Diabetes', SGB: 'Síndrome de Guillain-Barré', SCA: 'Síndrome coronariana aguda', PVHIV: 'Pessoas vivendo com HIV', PFC: 'Plasma fresco congelado', NAC: 'N-acetilcisteína (ou pneumonia adquirida na comunidade, conforme o contexto)',
        LNH: 'Linfoma não Hodgkin', LEMP: 'Leucoencefalopatia multifocal progressiva', IVIG: 'Imunoglobulina intravenosa', IGF: 'Fator de crescimento semelhante à insulina', GPA: 'Granulomatose com poliangiite', FLAIR: 'Sequência de ressonância magnética que suprime o sinal do líquor',
        EULAR: 'Liga Europeia contra o Reumatismo', ESAVI: 'Evento supostamente atribuível à vacinação ou imunização', DNPM: 'Desenvolvimento neuropsicomotor', DNV: 'Declaração de nascido vivo', DAOP: 'Doença arterial obstrutiva periférica',
        CRAB: 'Hipercalcemia, insuficiência renal, anemia e lesões ósseas (critérios do mieloma)', CIWA: 'Escala de gravidade da abstinência alcoólica', CIAP: 'Classificação Internacional de Atenção Primária', CHCM: 'Concentração de hemoglobina corpuscular média',
        CEAP: 'Classificação clínica da insuficiência venosa crônica', AUC: 'Área sob a curva', ATRA: 'Ácido all-trans retinoico', AINES: 'Anti-inflamatórios não esteroides', AINH: 'Anti-inflamatórios não hormonais', AAP: 'Academia Americana de Pediatria',
        AAA: 'Aneurisma de aorta abdominal', ACR: 'Colégio Americano de Reumatologia', V1: 'Derivação precordial V1 do ECG', V2: 'Derivação precordial V2 do ECG', V3: 'Derivação precordial V3 do ECG', V4: 'Derivação precordial V4 do ECG', V5: 'Derivação precordial V5 do ECG', V6: 'Derivação precordial V6 do ECG',
        XXY: 'Cariótipo da síndrome de Klinefelter', ECA: 'Enzima conversora de angiotensina (inibidores da ECA) ou Estatuto da Criança e do Adolescente (Lei 8.069/1990), conforme o contexto', ILTB: 'Infecção latente pela tuberculose'
    });
    Object.assign(G, {
        QT: 'Intervalo QT do ECG (duração da repolarização ventricular)', PR: 'Intervalo PR do ECG (condução atrioventricular)', VD: 'Ventrículo direito', VE: 'Ventrículo esquerdo', SG: 'Soro glicosado', O2: 'Oxigênio',
        C1: 'Componente C1 do sistema complemento', C3: 'Componente C3 do sistema complemento', C4: 'Componente C4 do sistema complemento', US: 'Ultrassonografia', USGTV: 'Ultrassonografia transvaginal',
        TCC: 'Terapia cognitivo-comportamental', TPO: 'Tireoperoxidase (anticorpo anti-TPO na tireoidite de Hashimoto)', CID: 'Classificação Internacional de Doenças', BRA: 'Bloqueador do receptor de angiotensina',
        DII: 'Derivação II do ECG', VM: 'Ventilação mecânica', N1: 'Linfonodos regionais acometidos (estadiamento TNM)'
    });
    // Revisão por contexto: correções e novas siglas (sentido conferido no texto do app)
    delete G.RE;
    Object.assign(G, {
        CAT: 'Cineangiocoronariografia (cateterismo), Comunicação de Acidente de Trabalho ou COPD Assessment Test, conforme o contexto',
        RP: 'Receptor de progesterona, razão de prevalência (Epidemiologia) ou intervalo RP′ no ECG, conforme o contexto',
        MV: 'Murmúrio vesicular', IC: 'Insuficiência cardíaca, intervalo de confiança ou idade cronológica, conforme o contexto',
        PCI: 'Intervenção coronária percutânea (ou peso corporal ideal, em Nutrição)', CAM: 'Concentração alveolar mínima (anestésicos inalatórios) ou Confusion Assessment Method (delirium)',
        BAV: 'Bloqueio atrioventricular', VIP: 'Vacina inativada contra poliomielite (ou Volume, Insulina e Potássio, no tratamento da cetoacidose diabética)',
        NAC: 'N-acetilcisteína', MB: 'Multibacilar (hanseníase) ou membrana basal, conforme o contexto',
        FR: 'Frequência respiratória, fator reumatoide ou fator de risco, conforme o contexto', SBP: 'Sociedade Brasileira de Pediatria (ou peritonite bacteriana espontânea, na cirrose)',
        PT: 'Prova tuberculínica (ou tempo de protrombina, em PT-INR)', DU: 'Dose única', PE: 'Pré-eclâmpsia', GN: 'Glomerulonefrite',
        MO: 'Medula óssea', TV: 'Taquicardia ventricular', FV: 'Fibrilação ventricular', CV: 'Cardiovascular', OR: 'Odds ratio', RT: 'Radioterapia', CVL: 'Colecistectomia videolaparoscópica', VLP: 'Videolaparoscópica',
        EZ: 'Escore Z (curvas de crescimento da OMS)', AP: 'Anteroposterior (incidência radiográfica)', SOS: 'Se necessário', EPI: 'Equipamento de proteção individual', NET: 'Necrólise epidérmica tóxica', LM: 'Leite materno',
        CIV: 'Comunicação interventricular', AR: 'Artrite reumatoide', AE: 'Átrio esquerdo', AD: 'Átrio direito', 'CAPS-AD': 'Centro de Atenção Psicossocial para álcool e drogas', TEA: 'Transtorno do espectro autista', GM: 'Gabinete do Ministro (Portaria GM/MS)',
        EIC: 'Espaço intercostal', PQT: 'Poliquimioterapia (hanseníase)', PN: 'Peso ao nascer', 'NT-pró-BNP': 'Porção N-terminal do pró-peptídeo natriurético tipo B', IML: 'Instituto Médico Legal', GJ: 'Glicemia de jejum',
        'ASC-US': 'Células escamosas atípicas de significado indeterminado', 'ASC-H': 'Células escamosas atípicas, não sendo possível excluir lesão de alto grau', VR: 'Valor de referência',
        VOP: 'Vacina oral contra poliomielite (Sabin) ou velocidade de onda de pulso, conforme o contexto', SRI: 'Sequência rápida de intubação', PPC: 'Pressão de perfusão cerebral (PAM − PIC)', PAN: 'Poliarterite nodosa',
        PAC: 'Pneumonia adquirida na comunidade', NIC: 'Neoplasia intraepitelial cervical', IFD: 'Interfalangeana distal (ou imunofluorescência direta, conforme o contexto)', EAP: 'Edema agudo de pulmão', DAP: 'Doença arterial periférica',
        BII: 'Cirurgia de Billroth II (gastrojejunostomia)', BCE: 'Batimento cardíaco embrionário', TRS: 'Terapia de substituição renal', TRM: 'Teste rápido molecular', 'TRM-TB': 'Teste rápido molecular para tuberculose',
        RVS: 'Resistência vascular sistêmica', RL: 'Ringer lactato', PCP: 'Pneumonia por Pneumocystis jirovecii (ou pressão capilar pulmonar, em hemodinâmica)', JEC: 'Junção escamocolunar', ITB: 'Índice tornozelo-braquial',
        HSV: 'Herpes-vírus simples', HPP: 'História patológica pregressa', GI: 'Gastrointestinal', FE: 'Fração de ejeção', CTI: 'Centro de terapia intensiva', CCR: 'Câncer colorretal', CCP: 'Peptídeo citrulinado cíclico (anti-CCP)',
        CCN: 'Comprimento cabeça-nádega', VAS: 'Vias aéreas superiores', TP: 'Tempo de protrombina', PEP: 'Profilaxia pós-exposição', PrEP: 'Profilaxia pré-exposição', PAF: 'Projétil de arma de fogo', NIA: 'Nefrite intersticial aguda',
        DMH: 'Doença da membrana hialina', DHL: 'Desidrogenase láctica (= LDH)', D1: 'Derivação D1 do ECG', D3: 'Derivação D3 do ECG', BB: 'Betabloqueador', ACM: 'Artéria cerebral média', TRO: 'Terapia de reidratação oral',
        TEC: 'Tempo de enchimento capilar', SBM: 'Sociedade Brasileira de Mastologia', RRR: 'Redução do risco relativo', RAR: 'Redução absoluta do risco', ARR: 'Redução absoluta do risco', RCE: 'Retorno da circulação espontânea',
        'POP-Q': 'Quantificação do prolapso de órgãos pélvicos', PCA: 'Persistência do canal arterial', PBS: 'Peritonite bacteriana secundária', PB: 'Paucibacilar (hanseníase)',
        LOA: 'Lesão de órgão-alvo', LCA: 'Ligamento cruzado anterior', HDB: 'Hemorragia digestiva baixa', GO: 'Ginecologia e Obstetrícia', DEA: 'Desfibrilador externo automático', CEP: 'Colangite esclerosante primária',
        CAD: 'Cetoacidose diabética', B3: 'Terceira bulha cardíaca (ou niacina, em vitaminas)', B4: 'Quarta bulha cardíaca', AM: 'Aleitamento materno', TDO: 'Tratamento diretamente observado', SSA: 'Anti-Ro (SSA)', SSB: 'Anti-La (SSB)',
        SL: 'Sublingual', REM: 'Movimento rápido dos olhos (sono REM)', NREM: 'Sono sem movimento rápido dos olhos', RET: 'Protoncogene RET (neoplasia endócrina múltipla)',
        NC: 'Nervo craniano', LV: 'Leite de vaca', LPD: 'Lavado peritoneal diagnóstico', LER: 'Lesão por esforço repetitivo', 'HOMA-IR': 'Índice de resistência à insulina', PTS: 'Projeto Terapêutico Singular', PSE: 'Programa Saúde na Escola',
        PDS: 'Síndrome do desconforto pós-prandial', PAB: 'Piso da Atenção Básica', OMC: 'Otite média crônica', MT: 'Membrana timpânica', MBV: 'Maior bolsão vertical', IVS: 'Índice de vulnerabilidade social',
        IFP: 'Interfalangeana proximal', HCM: 'Hemoglobina corpuscular média', HB: 'Hepatite B (nas vacinas combinadas)', EP: 'Embolia pulmonar', DWI: 'Sequência de difusão da ressonância magnética', DT: 'Vacina dupla adulto (difteria e tétano)',
        DG: 'Diabetes gestacional', DDQ: 'Displasia do desenvolvimento do quadril', DAC: 'Doença arterial coronariana', CVT: 'Comprimento vaginal total', 'CRB-65': 'Escore de gravidade da pneumonia (sem ureia)', CMH: 'Cardiomiopatia hipertrófica',
        CBC: 'Carcinoma basocelular', BTM: 'Bócio tóxico multinodular', BRE: 'Bloqueio de ramo esquerdo', BO: 'Boletim de ocorrência', BIC: 'Bomba de infusão contínua', ABT: 'Antibioticoterapia', THB: 'Transtorno do humor bipolar',
        SIU: 'Sistema intrauterino', TDDH: 'Transtorno disruptivo da desregulação do humor', 'TI-RADS': 'Sistema de classificação de risco dos nódulos tireoidianos', 'CAM-ICU': 'Método de avaliação de confusão mental na UTI',
        BHCG: 'Beta-hCG (gonadotrofina coriônica humana)', VORH: 'Vacina oral de rotavírus humano', ICFE: 'Insuficiência cardíaca com fração de ejeção', MART: 'Terapia de manutenção e resgate com ICS-formoterol', CRIE: 'Centro de Referência para Imunobiológicos Especiais',
        PAIR: 'Perda auditiva induzida por ruído', 'M-CHAT': 'Checklist modificado para autismo em crianças pequenas', FIE: 'Fossa ilíaca esquerda', FTV: 'Frêmito toracovocal', EZT: 'Exérese da zona de transformação', EAB: 'Equipe de Atenção Básica',
        CMT: 'Carcinoma medular de tireoide', CEC: 'Carcinoma espinocelular (de células escamosas)', AMS: 'Artéria mesentérica superior', QSD: 'Quadrante superior direito', 'BCR-ABL': 'Gene de fusão da leucemia mieloide crônica (cromossomo Filadélfia)'
    });
    // Segunda revisão: siglas com mais de um sentido no texto
    Object.assign(G, {
        FA: 'Fibrilação atrial ou fosfatase alcalina, conforme o contexto', IG: 'Idade gestacional ou imunoglobulina, conforme o contexto', IE: 'Endocardite infecciosa, imunoensaio ou incidência nos expostos, conforme o contexto',
        LH: 'Hormônio luteinizante ou linfoma de Hodgkin, conforme o contexto', PAM: 'Pressão arterial média (ou poliangiite microscópica, nas vasculites)', GEPA: 'Granulomatose eosinofílica com poliangiite',
        ACR: 'Colégio Americano de Reumatologia (critérios EULAR/ACR) ou Colégio Americano de Radiologia (TI-RADS/ACR)', HPP: 'História patológica pregressa ou hiperparatireoidismo primário, conforme o contexto',
        DM: 'Diabetes mellitus (ou dermatomiosite, em Reumatologia)', IV: 'Intravenoso'
    });
    const gl = () => $('rxGloss');
    function hideGloss() { gl().hidden = true; }
    function wordAt(x, y) {
        let node, off;
        if (document.caretPositionFromPoint) { const p = document.caretPositionFromPoint(x, y); node = p && p.offsetNode; off = p && p.offset; }
        else if (document.caretRangeFromPoint) { const r = document.caretRangeFromPoint(x, y); node = r && r.startContainer; off = r && r.startOffset; }
        if (!node || node.nodeType !== 3) return null;
        const s = node.data, isW = ch => /[\p{L}\p{N}]/u.test(ch || '');
        let a = off, b = off;
        while (a > 0 && isW(s[a - 1])) a--;
        while (b < s.length && isW(s[b])) b++;
        if (b <= a) return null;
        // siglas compostas com hífen (BI-RADS, DSM-5-TR, 5-ASA): tenta o trecho inteiro primeiro
        let ca = a, cb = b;
        while (ca > 1 && s[ca - 1] === '-' && isW(s[ca - 2])) { ca--; while (ca > 0 && isW(s[ca - 1])) ca--; }
        while (cb < s.length - 1 && s[cb] === '-' && isW(s[cb + 1])) { cb++; while (cb < s.length && isW(s[cb])) cb++; }
        const chunk = s.slice(ca, cb);
        if (chunk !== s.slice(a, b) && G[chunk]) return { w: chunk, node, a: ca, b: cb };
        return { w: s.slice(a, b), node, a, b };
    }
    HOSTS().forEach(h => h.addEventListener('click', e => {
        if (!getSelection().isCollapsed || e.target.closest('summary, a, button, mark, input')) return hideGloss();
        const hit = wordAt(e.clientX, e.clientY);
        let def = hit && G[hit.w];
        // "IV" também é algarismo romano (grau IV, classe IV…): só mostra como via intravenosa fora desses casos
        if (def && hit.w === 'IV' && /(grau|classe|estágio|estádio|tipo|fase|nível|zona|categoria|child|killip|nyha|forrest|mobitz|parte|passo|etapa|ASA)\s*$/i.test(hit.node.data.slice(0, hit.a))) def = null;
        if (!def) return hideGloss();
        const r = document.createRange(); r.setStart(hit.node, hit.a); r.setEnd(hit.node, hit.b);
        const rect = r.getBoundingClientRect(), g = gl();
        g.innerHTML = `<b>${esc(hit.w)}</b> ${esc(def)}`;
        g.hidden = false;
        const half = g.offsetWidth / 2;
        g.style.left = Math.min(window.innerWidth - half - 8, Math.max(half + 8, rect.left + rect.width / 2)) + 'px';
        const below = rect.bottom + 10 + g.offsetHeight < window.innerHeight - 70;
        g.style.top = (below ? rect.bottom + 10 : rect.top - g.offsetHeight - 10) + 'px';
    }));
    HOSTS().forEach(h => h.addEventListener('scroll', hideGloss, { passive: true }));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') { hideGloss(); closeDialog(); } });

    window.onReadPrefs = refreshFocus;
    window.onReadPrefs();
})();
