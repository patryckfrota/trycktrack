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
        sheet: null
    };
    let root = null;

    const esc = (v) => escapeHtml(v);
    const M = () => window.MEC;

    /* ---------- perfil (perguntas) ---------- */

    function optionHtml(q, o, selected) {
        const on = selected.includes(o.id);
        const role = q.type === 'single' ? 'radio' : 'checkbox';
        return `<button type="button" class="ct-opt${on ? ' on' : ''}" role="${role}" aria-checked="${on}" data-action="toggle" data-q="${q.id}" data-o="${o.id}" data-key="${q.id}.${o.id}"><span class="ct-mark ct-mark-${role}" aria-hidden="true"></span><span class="ct-opt-label">${esc(o.label)}</span></button>`;
    }

    function questionHtml(q, hits) {
        const selected = state.answers[q.id] || [];
        const options = q.options.filter(o => !hits || hits.has(o.id));
        if (!options.length) return '';
        const help = q.help ? `<p class="ct-help">${esc(q.help)}</p>` : '';
        const hint = q.type === 'single' ? 'Escolha uma' : 'Marque o que se aplica';
        const fam = q.family ? `<span class="ct-fam-tag">${esc(FAMILIES.find(f => f.id === q.family)?.title || '')}</span>` : '';
        const why = M().WHY[q.id] ? `<details class="ct-why"><summary>Por que isso importa</summary><p>${esc(M().WHY[q.id])}</p><small>OMS, MEC 2025, p. ${q.page}</small></details>` : '';
        return `<fieldset class="ct-q"><legend>${esc(q.title)}${fam}<small>${hint}</small></legend>${help}<div class="ct-opts" role="${q.type === 'single' ? 'radiogroup' : 'group'}" aria-label="${esc(q.title)}">${options.map(o => optionHtml(q, o, selected)).join('')}</div>${why}</fieldset>`;
    }

    // Seções do perfil: as da OMS mais uma com as condições próprias de outros métodos.
    function profileSections() {
        const base = M().SECTIONS.map(s => ({ id: s.id, title: s.title, questions: s.questions }));
        const own = M().allQuestions().filter(q => q.family);
        return own.length ? [...base, { id: 'outros', title: 'Condições de outros métodos', questions: own }] : base;
    }

    function profileHtml() {
        const hits = M().searchQuestions(state.query);
        const searching = hits !== null;
        const sections = profileSections().map((s) => {
            const body = s.questions.map(q => (!hits || hits.has(q.id)) ? questionHtml(q, hits && hits.get(q.id)) : '').join('');
            if (searching && !body) return '';
            const n = M().countAnswered(state.answers, s.id);
            const open = searching || state.open.has(s.id);
            return `<details class="ct-sec" data-sec="${s.id}"${open ? ' open' : ''}><summary><span class="ct-sec-title">${esc(s.title)}</span>${n ? `<em class="ct-count">${n}</em>` : ''}</summary><div class="ct-sec-body">${body}</div></details>`;
        }).join('');
        const empty = searching && !sections ? `<p class="ct-empty">Nenhuma condição encontrada para “${esc(state.query)}”.</p>` : '';
        return sections + empty;
    }

    function summaryHtml() {
        const sel = M().selectedOptions(state.answers);
        if (!sel.length) return '<p class="ct-summary-empty">Nenhuma condição marcada: todos os métodos aparecem sem restrição. Marque o que se aplica à paciente.</p>';
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

    function methodHtml(m) {
        const reasons = m.drivers.length
            ? `<ul class="ct-reasons">${m.drivers.map(d => `<li><b>${esc(d.display)}</b> ${esc(d.optionLabel)}${d.note ? `<small>${esc(d.note)}</small>` : ''}</li>`).join('')}</ul>`
            : '';
        const miss = m.misses ? '<p class="ct-miss">Não atende à preferência marcada</p>' : '';
        const cls = m.scale === 'acd' ? `ct-cat${m.category}` : `ct-cat${m.category}`;
        return `<article class="ct-method ${cls}${m.section === 'na' ? ' ct-na' : ''}" role="button" tabindex="0" data-action="method" data-id="${m.id}" aria-label="Ver detalhes: ${esc(m.name)}">
            <div class="ct-method-head"><span class="ct-badge" title="Categoria ${esc(m.display)}">${m.section === 'na' ? '—' : esc(m.display)}</span><div><h4>${esc(m.name)}</h4></div></div>
            <p class="ct-note">${esc(m.note)}</p>${reasons}${miss}<span class="ct-more" aria-hidden="true">Ver detalhes <i>›</i></span></article>`;
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
        return `<p class="ct-intro">${esc(CI.intro)}</p><section class="ct-group"><header><h3>O que a OMS diz</h3></header>${CI.points.map(n => `<p class="ct-info">${esc(n)}</p>`).join('')}</section><p class="ct-source">OMS, MEC 2025, p. ${CI.page}. A OMS não atribui categorias a este método.</p>`;
    }

    function vasHtml() {
        const { VASECTOMY: V } = M();
        const when = V.when.map(w => `<p class="ct-info"><b>${esc(w.k)}.</b> ${esc(w.t)}</p>`).join('');
        const groups = V.conditions.map((g, i) => `<details class="ct-cond"${i < 2 ? ' open' : ''}><summary><span>${esc(g.label)} (${g.cat})</span><em>${g.items.length}</em></summary><ul>${g.items.map(it => `<li><b>${g.cat}</b><span>${esc(it)}</span></li>`).join('')}</ul></details>`).join('');
        return `<p class="ct-intro">${esc(V.intro)}</p><section class="ct-group"><header><h3>Depois do procedimento</h3></header>${when}</section><section class="ct-group"><header><h3>Condições do homem</h3><span>A OMS usa A (aceitar), C (cautela), D (adiar) e S (serviço especializado)</span></header>${groups}</section><p class="ct-source">${esc(V.source)}.</p>`;
    }

    function legendHtml() {
        const { CATEGORY_TEXT, CHANGES_6TH, OUT_OF_SCOPE_2, MEC_SOURCE } = M();
        const cats = [1, 2, 3, 4].map(n => `<li><span class="ct-badge ct-cat${n}">${n}</span><div><b>${CATEGORY_TEXT[n].name}</b><span>${CATEGORY_TEXT[n].text}</span></div></li>`).join('');
        const changes = CHANGES_6TH.map(c => `<li><b>${esc(c.title)}</b><span>${esc(c.text)}</span></li>`).join('');
        return `<details class="ct-legend"${state.legendOpen ? ' open' : ''} data-legend><summary>Como ler as categorias</summary><ul>${cats}</ul>
                <p>Início (I) e continuação (C) podem ter categorias diferentes: use a chave no topo para dizer se a mulher vai começar o método ou já o usa. A categoria final de cada método é a mais restritiva entre todas as condições marcadas. A OMS não indica um método “melhor”: a escolha leva em conta preferência, contexto e disponibilidade.</p></details>
            <details class="ct-legend"><summary>${esc(M().PREGNANCY_CHECK.title)}</summary><p>${esc(M().PREGNANCY_CHECK.intro)}</p><ul class="ct-points">${M().PREGNANCY_CHECK.criteria.map(c => `<li>${esc(c)}</li>`).join('')}</ul><p>${esc(M().PREGNANCY_CHECK.note)}</p></details>
            <details class="ct-legend"><summary>${esc(M().COUNSELLING.title)}</summary><ul class="ct-points">${M().COUNSELLING.items.map(c => `<li>${esc(c)}</li>`).join('')}</ul><p>${esc(M().COUNSELLING.note)}</p></details>
            <details class="ct-legend"><summary>O que mudou na 6ª edição (2025)</summary><ul class="ct-changes">${changes}</ul></details>
            <details class="ct-legend"><summary>Fora desta ferramenta</summary><p>${OUT_OF_SCOPE_2.map(esc).join('; ')}.</p></details>
            <p class="ct-source">Fonte: ${esc(MEC_SOURCE.title)} Material de apoio ao estudo e à decisão: não substitui a avaliação clínica nem os protocolos locais. As respostas não são salvas.</p>`;
    }

    function resultHtml() {
        const all = M().evaluateAll(state.answers, { phase: state.phase, prefs: state.prefs });
        const fam = FAMILIES.find(f => f.id === state.family);
        let body;
        let sums = '';
        if (state.family === 'lam') body = lamHtml();
        else if (state.family === 'ci') body = ciHtml();
        else if (state.family === 'vas') body = vasHtml();
        else {
            const res = all[state.family];
            sums = res.groups.map(g => `<span class="ct-sum ct-sum-${g.id}">${g.title}: ${g.methods.length}</span>`).join('');
            const warn = all.core.pregnancy ? '<div class="ct-alert" role="alert"><strong>Gravidez suspeita ou confirmada.</strong> Descarte ou confirme antes de escolher um método.</div>' : '';
            const notices = (all.core.notices || []).map(n => `<div class="ct-notice">${esc(n)}</div>`).join('');
            const intro = res.intro ? `<p class="ct-intro">${esc(res.intro)}</p>` : '';
            body = `${warn}${notices}${intro}${groupsHtml(res)}${res.page ? `<p class="ct-source">OMS, MEC 2025, p. ${res.page}.</p>` : ''}`;
        }
        const copy = (state.family === 'lam' || state.family === 'ci' || state.family === 'vas') ? '' : '<button type="button" class="qt-ghost" data-action="copy">Copiar resumo</button>';
        return `${familyNavHtml()}<div class="ct-result-head"><div><h2>${esc(fam.title)}</h2><div class="ct-sums">${sums}</div></div>${copy}</div>${body}${legendHtml()}`;
    }

    function resultBadge() {
        const core = M().evaluate(state.answers, { phase: state.phase, prefs: state.prefs });
        return core.methods.filter(m => m.section === 'indicated').length;
    }

    /* ---------- ficha do método (abre ao tocar no cartão) ---------- */

    function findEvaluated(id) {
        const all = M().evaluateAll(state.answers, { phase: state.phase, prefs: state.prefs });
        for (const f of Object.values(all)) {
            const m = f.methods && f.methods.find(x => x.id === id);
            if (m) return m;
        }
        return null;
    }

    function sheetHtml(id) {
        const { methodConditions, STI_NOTE } = M();
        const full = methodConditions(id);
        const m = findEvaluated(id);
        if (!full || !m) return '';
        const info = full.info || { about: [], points: [], source: '' };
        const hasProfile = M().selectedOptions(state.answers).length > 0;
        const secTitle = (m.section === 'na') ? 'Não se aplica' : ({ indicated: 'Indicado', depends: 'Depende do caso', discouraged: 'Desaconselhado', contraindicated: 'Contraindicado', caution: 'Com cautela', special: 'Serviço especializado', delay: 'Adiar' })[m.section];
        const reasons = m.drivers.length
            ? `<ul class="ct-reasons">${m.drivers.map(d => `<li><b>${esc(d.display)}</b> ${esc(d.optionLabel)}${d.note ? `<small>${esc(d.note)}</small>` : ''}</li>`).join('')}</ul>`
            : `<p class="ct-info">${hasProfile ? 'Nenhuma condição marcada restringe este método.' : 'Marque condições no perfil para ver o que se aplica a esta paciente.'}</p>`;
        const status = `<section class="ct-sheet-sec"><div class="ct-sheet-status ct-cat${m.category}"><span class="ct-badge">${m.section === 'na' ? '—' : esc(m.display)}</span><div><strong>${esc(secTitle)}</strong><span>${state.phase === 'start' ? 'Para iniciar o método' : 'Para quem já usa (continuação)'}</span></div></div><h3>No perfil atual</h3>${reasons}</section>`;
        const about = info.about.length ? `<section class="ct-sheet-sec"><h3>Sobre o método</h3>${info.about.map(t => `<p>${esc(t)}</p>`).join('')}</section>` : '';
        const points = info.points.length ? `<section class="ct-sheet-sec"><h3>Pontos de atenção da OMS</h3><ul class="ct-points">${info.points.map(t => `<li>${esc(t)}</li>`).join('')}</ul></section>` : '';
        const groups = full.groups.map((g, i) => `<details class="ct-cond"${i === 0 ? ' open' : ''}><summary><span>${esc(g.title)}</span><em>${g.items.length}</em></summary><p class="ct-cond-hint">${esc(g.hint)}</p><ul>${g.items.map(it => `<li><b>${esc(it.display)}</b><span>${esc(it.option)}</span>${it.note ? `<small>${esc(it.note)}</small>` : ''}</li>`).join('')}</ul></details>`).join('');
        const use = M().METHOD_USE[id];
        const useHtml = use ? `<section class="ct-sheet-sec"><h3>Como usar</h3><p class="ct-info">Orientações práticas da OMS (SPR 2025) para começar e usar o método.</p>${use.sections.map(sec => `<details class="ct-cond"><summary><span>${esc(sec.title)}</span><em>${sec.items.length}</em></summary>${sec.intro ? `<p class="ct-cond-hint">${esc(sec.intro)}</p>` : ''}<ul class="ct-use">${sec.items.map(it => `<li><b>${esc(it.k)}</b><span>${esc(it.t)}</span></li>`).join('')}</ul></details>`).join('')}</section>` : '';
        const conds = `<section class="ct-sheet-sec"><h3>Quando evitar ou ter cautela</h3><p class="ct-info">Todas as condições da tabela da OMS que mudam a categoria deste método, da mais grave para a menos grave.</p>${groups || '<p class="ct-info">Nenhuma condição da tabela restringe este método.</p>'}</section>`;
        const sti = (info.protects) ? '' : `<p class="ct-sti">${esc(STI_NOTE)}</p>`;
        return `<div class="ct-sheet-head"><button type="button" class="reader-back" data-action="sheet-close" aria-label="Voltar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5 8 12l7 7"/></svg></button><div class="ct-sheet-title"><strong>${esc(m.short)}</strong><span>${esc(info.subtitle || m.name)}</span></div></div>
            <div class="ct-sheet-body">${status}${about}${useHtml}${points}${conds}${sti}<p class="ct-source">${esc(info.source)}${use ? `; ${esc(use.source)}` : ''}. Material de apoio ao estudo: não substitui a avaliação clínica nem os protocolos locais.</p></div>`;
    }

    function openSheet(id) {
        const el = root && root.querySelector('#ctSheet');
        if (!el) return;
        state.sheet = id;
        el.innerHTML = sheetHtml(id);
        el.hidden = false;
        el.querySelector('.ct-sheet-body').scrollTop = 0;
        el.querySelector('[data-action="sheet-close"]')?.focus({ preventScroll: true });
    }

    // Retorna true se havia ficha aberta (o Esc do app deixa a página aberta).
    function closeSheet() {
        const el = root && root.querySelector('#ctSheet');
        if (!el || el.hidden) return false;
        el.hidden = true;
        el.innerHTML = '';
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
                    <button type="button" role="tab" class="ct-tab" data-action="tab" data-v="profile" aria-selected="${state.tab === 'profile'}">Perfil <em id="ctProfileCount"></em></button>
                    <button type="button" role="tab" class="ct-tab" data-action="tab" data-v="result" aria-selected="${state.tab === 'result'}">Resultado <em id="ctResultCount"></em></button>
                </div>
            </div>
            <div class="ct-layout">
                <section class="ct-profile" aria-label="Perfil da paciente">
                    <div class="qt-panel">
                        <div class="qt-panel-head"><h2 class="qt-panel-title">Perfil da paciente</h2><button type="button" class="qt-ghost" data-action="clear">Limpar tudo</button></div>
                        <div id="ctSummary"></div>
                        <div class="qt-block"><h3>Preferências</h3><div class="qt-chips">${pref('noHormone', 'Sem hormônio')}${pref('longActing', 'Longa duração')}</div></div>
                        <label class="ct-search"><span class="ct-sr">Buscar condição</span><input type="search" id="ctSearch" placeholder="Buscar condição ou medicamento (ex.: enxaqueca, rifampicina)" value="${esc(state.query)}" autocomplete="off" enterkeyhint="search"></label>
                    </div>
                    <div id="ctProfile"></div>
                </section>
                <section class="ct-result" id="ctResult" aria-label="Resultado" aria-live="polite"></section>
            </div>
            <div class="ct-sheet" id="ctSheet" hidden role="dialog" aria-modal="true" aria-label="Detalhes do método"></div>
        </div>`;
    }

    function refresh({ profile = true } = {}) {
        if (!root) return;
        const focusKey = document.activeElement?.dataset?.key;
        if (profile) root.querySelector('#ctProfile').innerHTML = profileHtml();
        root.querySelector('#ctSummary').innerHTML = summaryHtml();
        const resultEl = root.querySelector('#ctResult');
        const keepTop = resultEl.scrollTop;
        resultEl.innerHTML = resultHtml();
        resultEl.scrollTop = keepTop;
        const n = M().selectedOptions(state.answers).length;
        root.querySelector('#ctProfileCount').textContent = n ? String(n) : '';
        root.querySelector('#ctResultCount').textContent = `${resultBadge()} indicados`;
        root.querySelector('.ct').dataset.tab = state.tab;
        if (focusKey) root.querySelector(`[data-key="${focusKey}"]`)?.focus({ preventScroll: true });
    }

    function copySummary() {
        const { evaluateAll, selectedOptions, MEC_SOURCE } = M();
        const fam = FAMILIES.find(f => f.id === state.family);
        const res = evaluateAll(state.answers, { phase: state.phase, prefs: state.prefs })[state.family];
        const profile = selectedOptions(state.answers).map(s => `- ${s.option.label}`).join('\n') || '- Nenhuma condição marcada';
        const lines = res.groups.map(g => `${g.title}:\n${g.methods.map(m => `  ${m.display} · ${m.short}`).join('\n')}`).join('\n');
        const text = `${fam.title} (${state.phase === 'start' ? 'início' : 'continuação'}) · ${MEC_SOURCE.short}\nPerfil:\n${profile}\n\n${lines}`;
        navigator.clipboard?.writeText(text).then(() => toast('Resumo copiado'), () => toast('Não foi possível copiar'));
    }

    function toast(message) {
        const btn = root?.querySelector('[data-action="copy"]');
        if (!btn) return;
        const old = btn.textContent;
        btn.textContent = message;
        setTimeout(() => { btn.textContent = old; }, 1600);
    }

    function onClick(event) {
        const el = event.target.closest('[data-action]');
        if (!el || !root.contains(el)) return;
        const { action, v, q, o } = el.dataset;
        if (action === 'method') {
            openSheet(el.dataset.id);
        } else if (action === 'sheet-close') {
            closeSheet();
        } else if (action === 'toggle') {
            state.answers = M().toggleAnswer(state.answers, q, o);
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
            root.scrollTop = 0;
        } else if (action === 'clear') {
            state.answers = {}; state.query = ''; state.lam = { amenorrhea: false, fullBf: false, lt6m: false };
            root.querySelector('#ctSearch').value = '';
            refresh();
        } else if (action === 'copy') {
            copySummary();
        }
    }

    function onKey(event) {
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
            state.sheet = null;
            root = null;
        }
    };
})();
