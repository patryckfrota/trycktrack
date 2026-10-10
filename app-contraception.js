/* ============================================================
   CONTRACEPÇÃO — interface
   Camadas:  shared/contraception-data.js        tabela-resumo da OMS
             shared/contraception-extensions.js  barreira, emergência, FAB, LAM
             shared/contraception-content.js     textos explicativos
             shared/contraception-engine.js      regras puras (evaluateAll)
             app-contraception.js                esta interface
   O estado fica só em memória (dado clínico de paciente não é gravado).
   Eventos: um único listener delegado por data-action.
   Depende de window.MEC, exposto em index.html.
   ============================================================ */
(function () {
    const FAMILIES = [
        { id: 'core', title: 'Rotina', sub: 'Hormonais e DIU' },
        { id: 'barrier', title: 'Barreira', sub: 'Preservativo e diafragma' },
        { id: 'emergency', title: 'Emergência', sub: 'Pílula e DIU de cobre' },
        { id: 'fab', title: 'Fertilidade', sub: 'Percepção e calendário' },
        { id: 'ster', title: 'Esterilização', sub: 'Laqueadura tubária' },
        { id: 'lam', title: 'LAM', sub: 'Amenorreia da lactação' },
        { id: 'vas', title: 'Vasectomia', sub: 'Esterilização masculina' },
        { id: 'ci', title: 'Coito interrompido', sub: 'Retirada' }
    ];

    let clearTimer = 0;
    const state = {
        answers: {},
        phase: 'start',
        prefs: { noHormone: false, longActing: false },
        query: '',
        tab: 'profile',
        family: 'core',
        open: new Set(['perfil']),
        lam: { amenorrhea: false, fullBf: false, lt6m: false },
        legendOpen: false,
        sheet: null,
        sheetTab: 'summary',
        clearArmed: false,
        screen: {}
    };
    let root = null;

    const esc = (v) => escapeHtml(v);

    // Métodos do núcleo cujo resultado está confirmado pela triagem.
    function confirmedIds() {
        const c = M().certainty(state.screen, state.answers);
        return Object.keys(c).filter(id => c[id].confirmed);
    }
    function evalOpts() { return { phase: state.phase, prefs: state.prefs, confirmed: confirmedIds() }; }
    function missingTitles(methodId) {
        const c = M().certainty(state.screen, state.answers)[methodId];
        return c ? c.missing.map(id => M().screeningItem(id).title) : [];
    }
    const M = () => window.MEC;

    /* ---------- perfil (perguntas) ---------- */

    function optionHtml(q, o, selected, first = false) {
        const on = selected.includes(o.id);
        const role = q.type === 'single' ? 'radio' : 'checkbox';
        const tab = role === 'radio' ? ` tabindex="${on || (!selected.length && first) ? 0 : -1}"` : '';
        return `<button type="button" class="ct-opt${on ? ' on' : ''}" role="${role}"${tab} aria-checked="${on}" data-action="toggle" data-q="${q.id}" data-o="${o.id}" data-key="${q.id}.${o.id}"><span class="ct-mark ct-mark-${role}" aria-hidden="true"></span><span class="ct-opt-label">${esc(o.label)}</span></button>`;
    }

    function questionHtml(q, hits, bare = false) {
        const selected = state.answers[q.id] || [];
        const options = q.options.filter(o => !hits || hits.has(o.id));
        if (!options.length) return '';
        const help = q.help ? `<p class="ct-help">${esc(q.help)}</p>` : '';
        const fam = q.family ? `<span class="ct-fam-tag">${esc(FAMILIES.find(f => f.id === q.family)?.title || '')}</span>` : '';
        const why = M().WHY[q.id] ? `<details class="ct-why"><summary>Por que isso importa</summary><p>${esc(M().WHY[q.id])}</p><small>OMS, MEC 2025, p. ${q.page}</small></details>` : '';
        const legend = bare ? '' : `<legend>${esc(q.title)}${fam}</legend>`;
        return `<fieldset class="ct-q">${legend}${help}<div class="ct-opts" role="${q.type === 'single' ? 'radiogroup' : 'group'}" aria-label="${esc(q.title)}">${options.map((o, i) => optionHtml(q, o, selected, i === 0)).join('')}</div>${why}</fieldset>`;
    }

    // Seções do perfil: as da OMS mais uma com as condições próprias de outros métodos.
    function profileSections() {
        const base = M().SECTIONS.map(s => ({ id: s.id, title: s.title, questions: s.questions }));
        const own = M().allQuestions().filter(q => q.family);
        return own.length ? [...base, { id: 'outros', title: 'Condições de outros métodos', questions: own }] : base;
    }

    function triageHtml(hits) {
        const { SCREENING, itemDone, screeningProgress, getQuestion } = M();
        const searching = hits !== null;
        const prog = screeningProgress(state.screen, state.answers);
        const rows = SCREENING.map(item => {
            const qs = item.members.map(getQuestion).filter(q => !hits || hits.has(q.id));
            if (searching && !qs.length) return '';
            const v = state.screen[item.id];
            const done = itemDone(item, state.screen, state.answers);
            const choice = item.kind === 'choice';
            const expanded = searching || choice || v === 'yes';
            const btn = (val, label) => `<button type="button" class="ct-yn-btn${v === val ? ' on' : ''}" aria-pressed="${v === val}" data-action="screen" data-item="${item.id}" data-v="${val}">${esc(label)}</button>`;
            const controls = (searching || choice) ? '' : `<div class="ct-yn" role="group" aria-label="${esc(item.prompt)}">${btn('no', item.noLabel || 'Não')}${btn('yes', item.yesLabel || 'Sim')}</div>`;
            const body = expanded ? `${qs.map(q => questionHtml(q, hits && hits.get(q.id), choice && !searching)).join('')}` : '';
            return `<div class="ct-tri${done ? ' done' : ''}" data-item="${item.id}"><div class="ct-tri-head"><span class="ct-tri-check" aria-hidden="true">${done ? '✓' : ''}</span><strong>${esc(item.prompt)}</strong></div>${controls}${body ? `<div class="ct-tri-body">${body}</div>` : ''}</div>`;
        }).join('');
        if (!rows) return '';
        const pct = Math.round(prog.done / prog.total * 100);
        return `<section class="ct-triage" id="ctTriage"><header><h3>Triagem essencial</h3><span>${prog.done} de ${prog.total}</span></header><div class="ct-prog" role="progressbar" aria-valuemin="0" aria-valuemax="${prog.total}" aria-valuenow="${prog.done}"><i style="width:${pct}%"></i></div><div class="ct-tris">${rows}</div></section>`;
    }

    function profileHtml() {
        const hits = M().searchQuestions(state.query);
        const searching = hits !== null;
        const { itemOfQuestion } = M();
        const sections = profileSections().map((s) => {
            // as perguntas da triagem aparecem só na triagem
            const qs = s.questions.filter(q => !itemOfQuestion(q.id));
            const body = qs.map(q => (!hits || hits.has(q.id)) ? questionHtml(q, hits && hits.get(q.id)) : '').join('');
            if (!body) return '';
            const n = M().selectedOptions(state.answers).filter(x => qs.some(q => q.id === x.question.id)).length;
            const open = searching || state.open.has(s.id);
            return `<details class="ct-sec" data-sec="${s.id}"${open ? ' open' : ''}><summary><span class="ct-sec-title">${esc(s.title)}</span>${n ? `<em class="ct-count">${n}</em>` : ''}</summary><div class="ct-sec-body">${body}</div></details>`;
        }).join('');
        const tri = triageHtml(hits);
        const empty = searching && !sections && !tri ? `<p class="ct-empty">Nenhuma condição encontrada para “${esc(state.query)}”.</p>` : '';
        const more = !searching ? '<h3 class="ct-more-title">Outras condições</h3>' : '';
        return tri + (sections ? more + sections : '') + empty;
    }

    function summaryHtml() {
        const sel = M().selectedOptions(state.answers);
        if (!sel.length) return '';
        const chips = sel.map(({ question, option }) => `<button type="button" class="ct-chip" data-action="toggle" data-q="${question.id}" data-o="${option.id}" aria-label="Remover: ${esc(option.label)}"><span>${esc(question.options.length === 1 ? question.title : option.label)}</span><i aria-hidden="true">×</i></button>`).join('');
        return `<div class="ct-chips">${chips}</div>`;
    }

    /* ---------- resultado ---------- */

    // Orientação da OMS: uma vez por bloco, com as categorias que aparecem nele.
    function groupGuideHtml(g) {
        const { GUIDANCE, GUIDANCE_ACD } = M();
        if (g.id === 'na') return '';
        const acd = g.methods[0].scale !== 'mec';
        const keys = [...new Set(g.methods.flatMap(m => m.display.split('/')))].sort();
        const lines = keys.map(k => acd ? GUIDANCE_ACD[k] : GUIDANCE[k]).filter(Boolean);
        return lines.length ? `<p class="ct-gguide">${lines.map(esc).join(' ')}</p>` : '';
    }

    function certChip(m) {
        if (!M().METHOD_LIST.includes(m.id) || m.scale !== 'mec' || m.category >= 4) return '';
        const miss = missingTitles(m.id);
        return miss.length
            ? `<p class="ct-cert ct-cert-pending"><b>Provisório</b> · falta responder: ${miss.map(esc).join(', ')}</p>`
            : '<p class="ct-cert ct-cert-ok"><b>Confirmado</b> · todas as perguntas que podem restringir este método foram respondidas</p>';
    }

    function methodHtml(m) {
        const reasons = m.drivers.length
            ? `<ul class="ct-reasons">${m.drivers.map(d => `<li><b>${esc(d.display)}</b> ${esc(d.optionLabel)}${d.note ? `<small>${esc(d.note)}</small>` : ''}</li>`).join('')}</ul>`
            : '';
        const miss = m.misses && (m.section === 'indicated' || m.section === 'depends') ? '<p class="ct-miss">Não atende à preferência marcada</p>' : '';
        const cls = m.scale === 'acd' ? `ct-cat${m.category}` : `ct-cat${m.category}`;
        return `<article class="ct-method ${cls}${m.best ? ' ct-best' : ''}${m.section === 'na' ? ' ct-na' : ''}" role="button" tabindex="0" data-action="method" data-id="${m.id}" aria-label="${esc(m.name)}${m.section === 'na' ? '' : `, categoria ${esc(m.display)}`}. ${esc(m.note)} Abrir detalhes.">
            <div class="ct-method-head"><span class="ct-badge" title="Categoria ${esc(m.display)}">${m.section === 'na' ? '—' : esc(m.display)}</span><div><h4>${esc(m.name)}</h4>${m.best ? '<span class="ct-best-tag">Maior eficácia entre os indicados</span>' : ''}</div></div>
            <p class="ct-note">${esc(m.note)}</p>${certChip(m)}${reasons}${miss}<span class="ct-more" aria-hidden="true">Ver detalhes <i>›</i></span></article>`;
    }

    function groupsHtml(res) {
        return res.groups.map(g => `<section class="ct-group ct-group-${g.id}"><header><h3>${g.title}<em>${g.methods.length}</em></h3><span>${g.hint}</span></header>${groupGuideHtml(g)}${g.methods.map(methodHtml).join('')}</section>`).join('');
    }

    function familyNavHtml() {
        return `<nav class="ct-fams" aria-label="Famílias de métodos">${FAMILIES.map(f => `<button type="button" class="ct-fam${state.family === f.id ? ' on' : ''}" aria-pressed="${state.family === f.id}" data-action="family" data-v="${f.id}"><strong>${f.title}</strong><span>${f.sub}</span></button>`).join('')}</nav>`;
    }

    function lamHtml() {
        const { LAM, lamStatus } = M();
        const st = lamStatus(state.lam);
        const checks = LAM.criteria.map(c => `<button type="button" class="ct-opt${state.lam[c.id] ? ' on' : ''}" role="checkbox" aria-checked="${state.lam[c.id]}" data-action="lam" data-v="${c.id}"><span class="ct-mark ct-mark-checkbox" aria-hidden="true"></span><span class="ct-opt-label">${esc(c.label)}</span></button>`).join('');
        const verdict = st.met
            ? '<div class="ct-verdict ok"><strong>Os 3 critérios estão presentes.</strong> O LAM pode oferecer proteção enquanto os 3 se mantiverem. Quando um deles deixar de valer, inicie outro método.</div>'
            : `<div class="ct-verdict"><strong>O LAM não se aplica.</strong> Falta: ${st.missing.map(esc).join('; ')}. Ofereça outro método.</div>`;
        return `<p class="ct-intro">${esc(LAM.intro)}</p><div class="qt-panel"><h3 class="qt-panel-title">Critérios (todos são necessários)</h3><div class="ct-opts">${checks}</div>${verdict}</div>
            <section class="ct-group"><header><h3>Pontos de atenção</h3></header>${LAM.notes.map(n => `<p class="ct-info">${esc(n)}</p>`).join('')}</section>
            <p class="ct-source">OMS, MEC 2025, p. ${LAM.page}.</p>`;
    }

    function ciHtml() {
        const { COITUS_INTERRUPTUS: CI } = M();
        const r = M().TEXT_RATES.withdrawal;
        const rate = `<p class="ct-info">Gravidezes por 100 mulheres no 1º ano: <b>${num(r.perfect)}</b> com uso perfeito, <b>${num(r.typical)}</b> no uso típico (EUA) e <b>${num(r.intl)}</b> no uso típico internacional (OMS, SPR 2025).</p>`;
        return `<p class="ct-intro">${esc(CI.intro)}</p>${rate}<section class="ct-group"><header><h3>O que a OMS diz</h3></header>${CI.points.map(n => `<p class="ct-info">${esc(n)}</p>`).join('')}</section><p class="ct-source">OMS, MEC 2025, p. ${CI.page}. A OMS não atribui categorias a este método.</p>`;
    }

    function vasHtml() {
        const { VASECTOMY: V } = M();
        const when = V.when.map(w => `<p class="ct-info"><b>${esc(w.k)}.</b> ${esc(w.t)}</p>`).join('');
        const groups = V.conditions.map((g, i) => `<details class="ct-cond"${i < 2 ? ' open' : ''}><summary><span>${esc(g.label)} (${g.cat})</span><em>${g.items.length}</em></summary><ul>${g.items.map(it => `<li><b>${g.cat}</b><span>${esc(it)}</span></li>`).join('')}</ul></details>`).join('');
        const r = M().TEXT_RATES.vasectomy;
        const rate = `<p class="ct-info">Gravidezes por 100 mulheres no 1º ano: <b>${num(r.perfect)}</b> com uso perfeito e <b>${num(r.typical)}</b> no uso típico (OMS, SPR 2025).</p>`;
        const law = M().VASECTOMY_LAW.map(w => `<p class="ct-info"><b>${esc(w.k)}.</b> ${esc(w.t)}</p>`).join('');
        return `<p class="ct-intro">${esc(V.intro)}</p>${rate}<section class="ct-group"><header><h3>Como pedir (Lei 14.443/2022)</h3></header>${law}</section><section class="ct-group"><header><h3>Depois do procedimento</h3></header>${when}</section><section class="ct-group"><header><h3>Condições do homem</h3><span>A OMS usa A (aceitar), C (cautela), D (adiar) e S (serviço especializado)</span></header>${groups}</section><p class="ct-source">${esc(V.source)}.</p>`;
    }

    function legendHtml() {
        const { CATEGORY_TEXT, CHANGES_6TH, OUT_OF_SCOPE_2, MEC_SOURCE, GUIDANCE_ACD } = M();
        const cats = [1, 2, 3, 4].map(n => `<li><span class="ct-badge ct-cat${n}">${n}</span><div><b>${CATEGORY_TEXT[n].name}</b><span>${CATEGORY_TEXT[n].text}</span></div></li>`).join('');
        const letterCls = { A: 1, C: 2, D: 3, S: 3 };
        const letters = ['A', 'C', 'D', 'S'].map(k => `<li><span class="ct-badge ct-cat${letterCls[k]}">${k}</span><div><span>${esc(GUIDANCE_ACD[k])}</span></div></li>`).join('');
        const changes = CHANGES_6TH.map(c => `<li><b>${esc(c.title)}</b><span>${esc(c.text)}</span></li>`).join('');
        return `<details class="ct-legend"${state.legendOpen ? ' open' : ''} data-legend><summary>Como ler as categorias</summary><ul>${cats}</ul>
                <p><b>Com poucos recursos para julgamento clínico</b> (OMS, tabela 3.2): categorias 1 e 2 = pode usar; 3 e 4 = não usar. Quando aparece uma faixa (por exemplo 3/4), a categoria depende da gravidade da condição: avalie o caso.</p>
                <p><b>Percepção da fertilidade (A, C, D) e esterilização (A, C, D, S)</b> usam letras em vez de números. D e S não são “piores” entre si: D adia o procedimento; S exige serviço especializado.</p><ul>${letters}</ul>
                <p>Início (I) e continuação (C) podem ter categorias diferentes: use a chave no topo para dizer se a mulher vai começar o método ou já o usa. A categoria final de cada método é a mais restritiva entre todas as condições marcadas. A OMS não indica um método “melhor”: a escolha leva em conta preferência, contexto e disponibilidade.</p></details>
            <details class="ct-legend"><summary>${esc(M().PREGNANCY_CHECK.title)}</summary><p>${esc(M().PREGNANCY_CHECK.intro)}</p><ul class="ct-points">${M().PREGNANCY_CHECK.criteria.map(c => `<li>${esc(c)}</li>`).join('')}</ul><p>${esc(M().PREGNANCY_CHECK.note)}</p></details>
            <details class="ct-legend"><summary>${esc(M().COUNSELLING.title)}</summary><ul class="ct-points">${M().COUNSELLING.items.map(c => `<li>${esc(c)}</li>`).join('')}</ul><p>${esc(M().COUNSELLING.note)}</p></details>
            <details class="ct-legend"><summary>O que mudou na 6ª edição (2025)</summary><ul class="ct-changes">${changes}</ul></details>
            <details class="ct-legend"><summary>Fora desta ferramenta</summary><p>${OUT_OF_SCOPE_2.map(esc).join('; ')}.</p></details>
            <p class="ct-source">Fonte: ${esc(MEC_SOURCE.title)} Material de apoio ao estudo e à decisão: não substitui a avaliação clínica nem os protocolos locais. As respostas não são salvas.</p>`;
    }

    function certBanner() {
        const p = M().screeningProgress(state.screen, state.answers);
        if (p.done === p.total) return '<div class="ct-banner ok"><strong>Triagem completa.</strong> O resultado tem alto grau de certeza para os métodos de rotina.</div>';
        return `<div class="ct-banner"><div><strong>Resultado provisório.</strong> ${p.done} de ${p.total} perguntas essenciais respondidas: sem elas, uma restrição pode não aparecer.</div><button type="button" class="qt-ghost" data-action="go-triage">Continuar triagem</button></div>`;
    }

    function resultHtml() {
        const all = M().evaluateAll(state.answers, evalOpts());
        const fam = FAMILIES.find(f => f.id === state.family);
        let body;
        let sums = '';
        if (state.family === 'lam') body = lamHtml();
        else if (state.family === 'ci') body = ciHtml();
        else if (state.family === 'vas') body = vasHtml();
        else {
            const res = all[state.family];
            sums = res.groups.map(g => `<span class="ct-sum ct-sum-${g.id}">${g.title}: ${g.methods.length}</span>`).join('');
            const banner = state.family === 'core' ? certBanner() : '';
            const warn = all.core.pregnancy ? '<div class="ct-alert" role="alert"><strong>Gravidez suspeita ou confirmada.</strong> Descarte ou confirme antes de escolher um método.</div>' : '';
            const notices = (all.core.notices || []).map(n => `<div class="ct-notice">${esc(n)}</div>`).join('');
            const intro = res.intro ? `<p class="ct-intro">${esc(res.intro)}</p>` : '';
            body = `${banner}${warn}${notices}${intro}${groupsHtml(res)}${res.page ? `<p class="ct-source">OMS, MEC 2025, p. ${res.page}.</p>` : ''}`;
        }
        const copy = (state.family === 'lam' || state.family === 'ci' || state.family === 'vas') ? '' : '<button type="button" class="qt-ghost" data-action="copy">Copiar resumo</button>';
        return `${familyNavHtml()}<div class="ct-result-head"><div><h2>${esc(fam.title)}</h2><div class="ct-sums">${sums}</div></div>${copy}</div>${body}${legendHtml()}`;
    }

    function resultBadge() {
        const core = M().evaluate(state.answers, evalOpts());
        return core.methods.filter(m => m.section === 'indicated').length;
    }

    /* ---------- ficha do método (abre ao tocar no cartão) ---------- */

    function findEvaluated(id) {
        const all = M().evaluateAll(state.answers, evalOpts());
        for (const f of Object.values(all)) {
            const m = f.methods && f.methods.find(x => x.id === id);
            if (m) return m;
        }
        return null;
    }

    // Texto corrido -> frases em lista, e destaque do que decide a conduta.
    function sentences(text) {
        return String(text).split(/(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÂÊÔÃÕÇ0-9(])/).filter(Boolean);
    }
    function rich(raw) {
        return esc(raw)
            .replace(/Classe ([ABC])\b/g, (m, c) => `<mark class="ct-class ct-class-${c}">${m}</mark>`)
            .replace(/(abstinência ou )?proteção adicional por \d+ dias?/gi, m => `<mark class="ct-warn">${m}</mark>`)
            .replace(/sem proteção adicional/gi, m => `<mark class="ct-ok">${m}</mark>`)
            .replace(/\bcategoria [1-4]\b/gi, m => `<b>${m}</b>`);
    }
    function bullets(text) {
        const parts = sentences(text);
        return parts.length > 1 ? `<ul class="ct-sent">${parts.map(p => `<li>${rich(p)}</li>`).join('')}</ul>` : `<p>${rich(text)}</p>`;
    }
    const num = (v) => (v == null ? '—' : String(v).replace('.', ','));

    function ratesCard(id, m) {
        const { RATES_SOURCE, EFFECT_CATEGORIES } = M();
        const rows = M().RATES[id];
        if (!rows) return `<section class="ct-card"><h3>Eficácia</h3><p class="ct-muted">A OMS não traz estimativa de eficácia para este método na tabela 1.1 do SPR 2025.</p></section>`;
        const head = '<div class="ct-rt-row ct-rt-head"><span></span><span>Perfeito</span><span>Típico EUA</span><span>Típico int.</span></div>';
        const body = rows.map(r => `<div class="ct-rt-row">${r.label ? `<span class="ct-rt-label">${esc(r.label)}</span>` : '<span class="ct-rt-label">Taxa de gravidez</span>'}<span><b>${num(r.perfect)}</b></span><span><b>${num(r.typical)}</b></span><span><b>${num(r.intl)}</b></span></div>`).join('');
        const cat = m && m.effectCategory ? `<p class="ct-rt-cat"><b>${EFFECT_CATEGORIES[m.effectCategory].title} de eficácia.</b> ${esc(EFFECT_CATEGORIES[m.effectCategory].text)}</p>` : '';
        return `<section class="ct-card"><h3>Eficácia (Índice de Pearl)</h3><p class="ct-muted">Gravidezes por 100 mulheres no 1º ano de uso.</p><div class="ct-rt">${head}${body}</div>${cat}<p class="ct-fine">${esc(RATES_SOURCE.caveat)} Fonte: ${esc(RATES_SOURCE.title)}</p></section>`;
    }

    function summaryTab(id, full, m) {
        const info = full.info || { about: [], points: [] };
        const hasProfile = M().selectedOptions(state.answers).length > 0;
        const secTitle = (m.section === 'na') ? 'Não se aplica' : ({ indicated: 'Indicado', depends: 'Depende do caso', discouraged: 'Desaconselhado', contraindicated: 'Contraindicado', caution: 'Com cautela', special: 'Serviço especializado', delay: 'Adiar' })[m.section];
        const reasons = m.drivers.length
            ? `<ul class="ct-reasons">${m.drivers.map(d => `<li><b>${esc(d.display)}</b> ${esc(d.optionLabel)}${d.note ? `<small>${esc(d.note)}</small>` : ''}</li>`).join('')}</ul>`
            : `<p class="ct-muted">${hasProfile ? 'Nenhuma condição marcada restringe este método.' : 'Marque condições no perfil para ver o que se aplica a esta paciente.'}</p>`;
        const best = m.best ? '<span class="ct-best-tag">Maior eficácia entre os indicados</span>' : '';
        const bestNote = m.best ? '<p class="ct-fine">Entre os métodos indicados para este perfil, é o de menor taxa de gravidez no uso típico (OMS, SPR 2025). A OMS não define um método “melhor”: a escolha leva em conta preferência, contexto e disponibilidade.</p>' : '';
        const miss = M().METHOD_LIST.includes(id) ? missingTitles(id) : null;
        const certLine = miss === null ? '' : miss.length
            ? `<p class="ct-cert ct-cert-pending"><b>Provisório.</b> Para confirmar este resultado, responda na triagem: ${miss.map(esc).join(', ')}.</p>`
            : '<p class="ct-cert ct-cert-ok"><b>Confirmado.</b> Todas as perguntas que podem restringir este método foram respondidas.</p>';
        const status = `<section class="ct-card"><div class="ct-sheet-status ct-cat${m.category}"><span class="ct-badge">${m.section === 'na' ? '—' : esc(m.display)}</span><div><strong>${esc(secTitle)}</strong><span>${state.phase === 'start' ? 'Para iniciar o método' : 'Para quem já usa (continuação)'}</span>${best}</div></div>${bestNote}${certLine}<h3>No perfil atual</h3>${reasons}</section>`;
        const about = info.about.length ? `<section class="ct-card"><h3>Sobre o método</h3>${info.about.map(t => bullets(t)).join('')}</section>` : '';
        const points = info.points.length ? `<section class="ct-card"><h3>Pontos de atenção</h3><ul class="ct-points">${info.points.map(t => `<li>${rich(t)}</li>`).join('')}</ul></section>` : '';
        const sti = info.protects ? '' : `<p class="ct-sti">${esc(M().STI_NOTE)}</p>`;
        return status + ratesCard(id, m) + about + points + sti;
    }

    // Todas as seções em sequência, em texto corrido: sem menu interno para rolar.
    function useTab(use) {
        const cards = use.sections.map(sec => {
            const rows = sec.items.map(it => `<div class="ct-row"><div class="ct-row-k">${esc(it.k)}</div><div class="ct-row-t">${bullets(it.t)}</div></div>`).join('');
            return `<section class="ct-card ct-card-flush"><h3>${esc(sec.title)}</h3>${sec.intro ? `<p class="ct-callout">${rich(sec.intro)}</p>` : ''}<div class="ct-rows">${rows}</div></section>`;
        }).join('');
        return `${cards}<p class="ct-fine">${esc(use.source)}. Orientações para mulheres saudáveis; condições específicas podem pedir mais acompanhamento.</p>`;
    }

    function limitsTab(full) {
        const groups = full.groups;
        if (!groups.length) return '<section class="ct-card"><p class="ct-muted">Nenhuma condição da tabela restringe este método.</p></section>';
        const { SECTIONS } = M();
        const cards = groups.map(g => {
            const byDomain = new Map();
            g.items.forEach(it => { const d = it.sectionId === 'outros' ? 'Outras condições' : (SECTIONS.find(s => s.id === it.sectionId)?.title || 'Outras'); if (!byDomain.has(d)) byDomain.set(d, []); byDomain.get(d).push(it); });
            const list = [...byDomain.entries()].map(([d, items]) => `<div class="ct-dom"><h4>${esc(d)}</h4>${items.map(it => `<div class="ct-lim"><b>${esc(it.display)}</b><div><span>${esc(it.option)}</span>${it.note ? `<small>${esc(it.note)}</small>` : ''}</div></div>`).join('')}</div>`).join('');
            return `<section class="ct-card ct-card-flush"><h3>${esc(g.title)} <em class="ct-h-count">${g.items.length}</em></h3><p class="ct-callout">${esc(g.hint)}</p>${list}</section>`;
        }).join('');
        return `<p class="ct-muted ct-lead">Todas as condições da tabela da OMS que mudam a categoria deste método, da mais grave para a menos grave.</p>${cards}`;
    }

    // Aba "Prescrição": apresentações, modelo de receita (copiável), posologia e protocolos.
    function prescribeTab(id) {
        const p = M().PRESCRIBE[id];
        const { SOURCES, PRESCRIBE_NOTICE } = M();
        const sorted = [...p.substances].sort((a, b) => Number(b.sus) - Number(a.sus));
        const nameHtml = (n) => n.split(' + ').map((t, i) => `<span class="${i ? 'plus' : ''}">${i ? '+ ' : ''}${esc(t)}</span>`).join('');
        const prods = sorted.map(x => `<article class="ct-sub${x.sus ? ' sus' : ''}"><div class="ct-sub-head"><div class="ct-sub-name">${nameHtml(x.name)}</div>${x.sus ? '<span class="ct-sus">SUS</span>' : ''}</div><p class="ct-sub-form">${esc(x.form)}</p>${x.note ? `<p class="ct-fine">${esc(x.note)}</p>` : ''}${x.brands.length ? `<div class="ct-sub-brands"><small>Nomes comerciais</small>${x.brands.map(b => `<em>${esc(b)}</em>`).join('')}</div>` : ''}</article>`).join('');
        const rx = p.rx.length ? `<section class="ct-card"><h3>Exemplo de receita</h3>${p.rx.map((r, i) => `<div class="ct-rx"><div class="ct-rx-head"><strong>${esc(r.title)}</strong><button type="button" class="qt-ghost" data-action="copy-rx" data-id="${id}" data-i="${i}">Copiar</button></div><pre class="ct-rx-body">${esc(r.lines.join('\n'))}</pre></div>`).join('')}</section>` : '';
        const rowsOf = (items) => items.map(it => `<div class="ct-row"><div class="ct-row-k">${esc(it.k)}</div><div class="ct-row-t">${bullets(it.t)}</div></div>`).join('');
        const blockList = p.blocks || [{ title: 'Posologia e orientações', items: p.dosing }];
        // Muitos blocos (ex.: implante): só os dois primeiros abertos, o resto recolhido.
        const blocks = blockList.map((b, i) => `<details class="ct-card ct-card-flush ct-fold"${blockList.length <= 3 || i < 2 ? ' open' : ''}><summary><h3>${esc(b.title)}</h3></summary><div class="ct-rows">${rowsOf(b.items)}</div></details>`).join('');
        const src = p.sources.map(k => `<li>${SOURCES[k].url ? `<a href="${esc(SOURCES[k].url)}" target="_blank" rel="noopener noreferrer">${esc(SOURCES[k].label)}</a>` : esc(SOURCES[k].label)}</li>`).join('');
        return `<section class="ct-card"><h3>Substâncias e apresentações</h3><div class="ct-prods">${prods}</div></section>${rx}${blocks}<section class="ct-card"><h3>Fontes</h3><ul class="ct-src">${src}</ul><p class="ct-fine">${esc(PRESCRIBE_NOTICE)}</p></section>`;
    }

    function copyRx(id, i, btn) {
        const r = M().PRESCRIBE[id]?.rx[Number(i)];
        if (!r) return;
        const text = `${r.title}\n${r.lines.join('\n')}`;
        const old = btn.textContent;
        (navigator.clipboard?.writeText(text) ?? Promise.reject()).then(() => { btn.textContent = 'Copiado'; }, () => { btn.textContent = 'Não copiou'; }).finally(() => setTimeout(() => { btn.textContent = old; }, 1500));
    }

    function sheetBodyHtml() {
        const id = state.sheet;
        const full = M().methodConditions(id);
        const m = findEvaluated(id);
        if (!full || !m) return '';
        const use = M().METHOD_USE[id];
        let body;
        if (state.sheetTab === 'use' && use) body = useTab(use);
        else if (state.sheetTab === 'prescribe' && M().PRESCRIBE[id]) body = prescribeTab(id);
        else if (state.sheetTab === 'limits') body = limitsTab(full);
        else body = summaryTab(id, full, m);
        const info = full.info || {};
        return `${body}<p class="ct-fine">${esc(info.source || '')}. Material de apoio ao estudo: não substitui a avaliação clínica nem os protocolos locais.</p>`;
    }

    function sheetHtml(id) {
        const full = M().methodConditions(id);
        const m = findEvaluated(id);
        if (!full || !m) return '';
        const info = full.info || {};
        const use = M().METHOD_USE[id];
        const nLimits = full.groups.reduce((n, g) => n + g.items.length, 0);
        const tab = (v, label, count) => `<button type="button" role="tab" class="ct-stab${state.sheetTab === v ? ' on' : ''}" aria-selected="${state.sheetTab === v}" data-action="sheet-tab" data-v="${v}" aria-controls="ctSheetBody">${label}${count ? ` <em>${count}</em>` : ''}</button>`;
        return `<div class="ct-sheet-head"><button type="button" class="reader-back" data-action="sheet-close" aria-label="Voltar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5 8 12l7 7"/></svg></button><div class="ct-sheet-title"><strong>${esc(m.short)}</strong><span>${esc(info.subtitle || m.name)}</span></div></div>
            <nav class="ct-stabs" role="tablist" aria-label="Seções da ficha">${tab('summary', 'Resumo')}${M().PRESCRIBE[id] ? tab('prescribe', 'Prescrição') : ''}${use ? tab('use', 'Uso') : ''}${tab('limits', 'Restrições', nLimits)}</nav>
            <div class="ct-sheet-body" id="ctSheetBody" role="tabpanel">${sheetBodyHtml()}</div>`;
    }

    function openSheet(id) {
        const el = root && root.querySelector('#ctSheet');
        if (!el) return;
        state.sheet = id;
        state.sheetTab = 'summary';
        el.innerHTML = sheetHtml(id);
        el.hidden = false;
        syncTabIndex();
        root.querySelectorAll('.ct-bar, .ct-layout').forEach(n => { n.inert = true; });
        el.querySelector('#ctSheetBody').scrollTop = 0;
        el.querySelector('[data-action="sheet-close"]')?.focus({ preventScroll: true });
    }

    // Atualiza só o corpo e o estado das abas, sem recriar o cabeçalho.
    function refreshSheetBody({ keepScroll = false } = {}) {
        const el = root && root.querySelector('#ctSheet');
        if (!el || el.hidden) return;
        const body = el.querySelector('#ctSheetBody');
        const top = keepScroll ? body.scrollTop : 0;
        body.innerHTML = sheetBodyHtml();
        body.scrollTop = top;
        el.querySelectorAll('.ct-stab').forEach(b => { const on = b.dataset.v === state.sheetTab; b.classList.toggle('on', on); b.setAttribute('aria-selected', on); if (on) b.scrollIntoView({ inline: 'nearest', block: 'nearest' }); });
        syncTabIndex();
    }

    // Retorna true se havia ficha aberta (o Esc do app deixa a página aberta).
    function closeSheet() {
        const el = root && root.querySelector('#ctSheet');
        if (!el || el.hidden) return false;
        el.hidden = true;
        el.innerHTML = '';
        root.querySelectorAll('.ct-bar, .ct-layout').forEach(n => { n.inert = false; });
        const id = state.sheet;
        state.sheet = null;
        root.querySelector(`[data-action="method"][data-id="${id}"]`)?.focus({ preventScroll: true });
        return true;
    }

    /* ---------- montagem e atualização ---------- */

    function shellHtml() {
        const seg = (value, label, hint) => `<button type="button" class="qt-seg${state.phase === value ? ' active' : ''}" aria-pressed="${state.phase === value}" data-action="phase" data-v="${value}"><strong>${label}</strong><span>${hint}</span></button>`;
        const pref = (key, label) => `<button type="button" class="qt-chip${state.prefs[key] ? ' active' : ''}" aria-pressed="${state.prefs[key]}" data-action="pref" data-v="${key}">${label}</button>`;
        return `<div class="ct" data-tab="${state.tab}">
            <div class="ct-bar">
                <div class="qt-segmented">${seg('start', 'Vai iniciar', 'Escolha do método')}${seg('continue', 'Já usa', 'Continuação')}</div>
                <div class="ct-tabs" role="tablist">
                    <button type="button" role="tab" class="ct-tab" data-action="tab" data-v="profile" aria-controls="ctPanelProfile" aria-selected="${state.tab === 'profile'}">Perfil <em id="ctProfileCount"></em></button>
                    <button type="button" role="tab" class="ct-tab" data-action="tab" data-v="result" aria-controls="ctResult" aria-selected="${state.tab === 'result'}">Resultado <em id="ctResultCount"></em></button>
                </div>
            </div>
            <div class="ct-layout">
                <section class="ct-profile" id="ctPanelProfile" role="tabpanel" aria-label="Perfil da paciente">
                    <div class="qt-panel">
                        <div class="qt-panel-head"><h2 class="qt-panel-title">Perfil da paciente</h2><button type="button" class="qt-ghost" data-action="clear">Limpar tudo</button></div>
                        <div id="ctSummary"></div>
                        <div class="qt-block"><h3>Preferências</h3><div class="qt-chips">${pref('noHormone', 'Sem hormônio')}${pref('longActing', 'Longa duração')}</div></div>
                        <label class="ct-search"><span class="ct-sr">Buscar condição</span><input type="search" id="ctSearch" placeholder="Buscar condição ou medicamento" value="${esc(state.query)}" autocomplete="off" enterkeyhint="search"></label>
                    </div>
                    <div id="ctProfile"></div>
                </section>
                <section class="ct-result" id="ctResult" role="tabpanel" aria-label="Resultado"></section>
                <div class="ct-sr" id="ctLive" aria-live="polite"></div>
            </div>
            <div class="ct-sheet" id="ctSheet" hidden role="dialog" aria-modal="true" aria-label="Detalhes do método"></div>
        </div>`;
    }

    // Abas com tabindex móvel: só a selecionada entra na ordem de Tab; setas trocam de aba.
    function syncTabIndex() {
        root.querySelectorAll('[role="tab"]').forEach(t => { t.tabIndex = (t.getAttribute('aria-selected') === 'true') ? 0 : -1; });
    }

    function refresh({ profile = true } = {}) {
        if (!root) return;
        const focusKey = document.activeElement?.dataset?.key;
        if (profile) root.querySelector('#ctProfile').innerHTML = profileHtml();
        root.querySelector('#ctSummary').innerHTML = summaryHtml();
        const resultEl = root.querySelector('#ctResult');
        const keepTop = resultEl.scrollTop;
        const navLeft = resultEl.querySelector('.ct-fams')?.scrollLeft || 0;
        resultEl.innerHTML = resultHtml();
        resultEl.scrollTop = keepTop;
        const nav = resultEl.querySelector('.ct-fams');
        if (nav) { nav.scrollLeft = navLeft; const on = nav.querySelector('.ct-fam.on'); if (on && (on.offsetLeft < navLeft || on.offsetLeft + on.offsetWidth > navLeft + nav.clientWidth)) nav.scrollLeft = on.offsetLeft - (nav.clientWidth - on.offsetWidth) / 2; }
        const pr = M().screeningProgress(state.screen, state.answers);
        root.querySelector('#ctProfileCount').textContent = `${pr.done}/${pr.total}`;
        root.querySelector('#ctResultCount').textContent = (() => { if (!M().selectedOptions(state.answers).length && !pr.done) return '—'; const n = resultBadge(); return `${n} indicado${n === 1 ? '' : 's'}`; })();
        root.querySelector('.ct').dataset.tab = state.tab;
        const nInd = resultBadge();
        root.querySelector('#ctLive').textContent = `Resultado atualizado: ${nInd} método${nInd === 1 ? '' : 's'} indicado${nInd === 1 ? '' : 's'}.`;
        syncTabIndex();
        if (focusKey) root.querySelector(`[data-key="${focusKey}"]`)?.focus({ preventScroll: true });
    }

    function copySummary() {
        const { evaluateAll, selectedOptions, MEC_SOURCE } = M();
        const fam = FAMILIES.find(f => f.id === state.family);
        const res = evaluateAll(state.answers, evalOpts())[state.family];
        const profile = selectedOptions(state.answers).map(s => `- ${s.option.label}`).join('\n') || '- Nenhuma condição marcada';
        const lines = res.groups.map(g => `${g.title}:\n${g.methods.map(m => `  ${m.display} · ${m.short}`).join('\n')}`).join('\n');
        const text = `${fam.title} (${state.phase === 'start' ? 'início' : 'continuação'}) · ${MEC_SOURCE.short}\nPerfil:\n${profile}\n\n${lines}`;
        (navigator.clipboard?.writeText(text) ?? Promise.reject()).then(() => toast('Resumo copiado'), () => toast('Não foi possível copiar'));
    }

    function toast(message) {
        const btn = root?.querySelector('[data-action="copy"]');
        if (!btn) return;
        const old = btn.textContent;
        btn.textContent = message;
        setTimeout(() => { btn.textContent = old; }, 1600);
    }

    // "Não": limpa as opções do item. "Sim": abre as perguntas (e já marca quando só há uma opção).
    function setScreen(itemId, v) {
        const item = M().screeningItem(itemId);
        if (!item) return;
        if (state.screen[itemId] === v) { delete state.screen[itemId]; refresh(); return; }
        state.screen[itemId] = v;
        if (v === 'no') {
            item.members.forEach(qid => { (state.answers[qid] || []).slice().forEach(oid => { state.answers = M().toggleAnswer(state.answers, qid, oid); }); });
        } else if (item.members.length === 1) {
            const q = M().getQuestion(item.members[0]);
            if (q.options.length === 1 && !(state.answers[q.id] || []).length) state.answers = M().toggleAnswer(state.answers, q.id, q.options[0].id);
        }
        refresh();
    }

    function onClick(event) {
        const el = event.target.closest('[data-action]');
        if (!el || !root.contains(el)) return;
        const { action, v, q, o } = el.dataset;
        if (action === 'copy-rx') {
            copyRx(el.dataset.id, el.dataset.i, el);
        } else if (action === 'screen') {
            setScreen(el.dataset.item, v);
        } else if (action === 'go-triage') {
            state.tab = 'profile';
            root.querySelectorAll('.ct-tab').forEach(t => t.setAttribute('aria-selected', t.dataset.v === 'profile'));
            root.querySelector('.ct').dataset.tab = 'profile';
            refresh({ profile: false });
            const target = root.querySelector(`.ct-tri:not(.done)`) || root.querySelector('#ctTriage');
            target?.scrollIntoView({ block: 'center', behavior: 'smooth' });
        } else if (action === 'method') {
            openSheet(el.dataset.id);
        } else if (action === 'sheet-close') {
            closeSheet();
        } else if (action === 'sheet-tab') {
            state.sheetTab = v;
            refreshSheetBody();
        } else if (action === 'toggle') {
            state.answers = M().toggleAnswer(state.answers, q, o);
            const itemId = M().itemOfQuestion(q);
            if (itemId && (state.answers[q] || []).length) state.screen[itemId] = 'yes';
            refresh();
        } else if (action === 'phase') {
            state.phase = v;
            root.querySelectorAll('[data-action="phase"]').forEach(b => { const on = b.dataset.v === v; b.classList.toggle('active', on); b.setAttribute('aria-pressed', on); });
            refresh({ profile: false });
        } else if (action === 'pref') {
            state.prefs[v] = !state.prefs[v];
            el.classList.toggle('active', state.prefs[v]);
            el.setAttribute('aria-pressed', state.prefs[v]);
            refresh({ profile: false });
        } else if (action === 'family') {
            state.family = v;
            refresh({ profile: false });
            root.querySelector('#ctResult').scrollTop = 0;
        } else if (action === 'lam') {
            state.lam[v] = !state.lam[v];
            refresh({ profile: false });
        } else if (action === 'tab') {
            state.tab = v;
            root.querySelectorAll('.ct-tab').forEach(b => b.setAttribute('aria-selected', b.dataset.v === v));
            root.querySelector('.ct').dataset.tab = v;
            syncTabIndex();
            root.scrollTop = 0;
        } else if (action === 'clear') {
            if (!state.clearArmed) {
                state.clearArmed = true;
                el.textContent = 'Toque de novo para limpar';
                clearTimeout(clearTimer);
                clearTimer = setTimeout(() => { state.clearArmed = false; el.textContent = 'Limpar tudo'; }, 3000);
                return;
            }
            state.clearArmed = false; clearTimeout(clearTimer); el.textContent = 'Limpar tudo';
            state.answers = {}; state.screen = {}; state.query = ''; state.lam = { amenorrhea: false, fullBf: false, lt6m: false };
            state.prefs = { noHormone: false, longActing: false };
            root.querySelectorAll('[data-action="pref"]').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
            root.querySelector('#ctSearch').value = '';
            refresh();
        } else if (action === 'copy') {
            copySummary();
        }
    }

    function onKey(event) {
        const arrows = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
        const t = event.target;
        if ((event.key in arrows || event.key === 'Home' || event.key === 'End') && t.matches?.('[role="tab"], [role="radio"]')) {
            const group = [...t.parentElement.querySelectorAll(`[role="${t.getAttribute('role')}"]`)];
            const i = group.indexOf(t);
            const next = event.key === 'Home' ? group[0] : event.key === 'End' ? group[group.length - 1] : group[(i + arrows[event.key] + group.length) % group.length];
            if (t.getAttribute('role') === 'tab' && event.key in arrows && event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
            event.preventDefault();
            next.focus();
            next.click();
            return;
        }
        if (event.key !== 'Enter' && event.key !== ' ') return;
        const el = event.target.closest?.('[data-action="method"]');
        if (!el || event.target !== el) return;
        event.preventDefault();
        openSheet(el.dataset.id);
    }

    function onInput(event) {
        if (event.target.id !== 'ctSearch') return;
        state.query = event.target.value;
        refresh();
    }

    function onToggle(event) {
        const d = event.target;
        if (d.matches?.('details.ct-sec') && !state.query) {
            d.open ? state.open.add(d.dataset.sec) : state.open.delete(d.dataset.sec);
        }
        if (d.matches?.('details[data-legend]')) state.legendOpen = d.open;
    }

    window.ContraceptionUI = {
        mount(container) {
            root = container;
            root.innerHTML = shellHtml();
            root.addEventListener('click', onClick);
            root.addEventListener('input', onInput);
            root.addEventListener('keydown', onKey);
            root.addEventListener('toggle', onToggle, true);
            refresh();
        },
        closeSheet,
        unmount() {
            if (!root) return;
            root.removeEventListener('click', onClick);
            root.removeEventListener('input', onInput);
            root.removeEventListener('keydown', onKey);
            root.removeEventListener('toggle', onToggle, true);
            Object.assign(state, { answers: {}, screen: {}, phase: 'start', prefs: { noHormone: false, longActing: false }, query: '', tab: 'profile', family: 'core', lam: { amenorrhea: false, fullBf: false, lt6m: false }, sheet: null });
            root = null;
        }
    };
})();
