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
        legendOpen: false
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
        const best = m.best ? '<span class="ct-best-tag">Maior eficácia entre os indicados</span>' : '';
        const cls = m.scale === 'acd' ? `ct-cat${m.category}` : `ct-cat${m.category}`;
        return `<article class="ct-method ${cls}${m.best ? ' ct-best' : ''}${m.section === 'na' ? ' ct-na' : ''}">
            <div class="ct-method-head"><span class="ct-badge" title="Categoria ${esc(m.display)}">${m.section === 'na' ? '—' : esc(m.display)}</span><div><h4>${esc(m.name)}</h4>${best}</div></div>
            <p class="ct-eff">${esc(m.efficacy)}</p><p class="ct-note">${esc(m.note)}</p>${reasons}${miss}</article>`;
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

    function legendHtml() {
        const { CATEGORY_TEXT, CHANGES_6TH, OUT_OF_SCOPE_2, MEC_SOURCE } = M();
        const cats = [1, 2, 3, 4].map(n => `<li><span class="ct-badge ct-cat${n}">${n}</span><div><b>${CATEGORY_TEXT[n].name}</b><span>${CATEGORY_TEXT[n].text}</span></div></li>`).join('');
        const changes = CHANGES_6TH.map(c => `<li><b>${esc(c.title)}</b><span>${esc(c.text)}</span></li>`).join('');
        return `<details class="ct-legend"${state.legendOpen ? ' open' : ''} data-legend><summary>Como ler as categorias</summary><ul>${cats}</ul>
                <p>Início (I) e continuação (C) podem ter categorias diferentes: use a chave no topo para dizer se a mulher vai começar o método ou já o usa. A categoria final de cada método é a mais restritiva entre todas as condições marcadas. A OMS não indica um método “melhor”: a escolha leva em conta preferência, contexto e disponibilidade.</p></details>
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
        else {
            const res = all[state.family];
            sums = res.groups.map(g => `<span class="ct-sum ct-sum-${g.id}">${g.title}: ${g.methods.length}</span>`).join('');
            const warn = all.core.pregnancy ? '<div class="ct-alert" role="alert"><strong>Gravidez suspeita ou confirmada.</strong> Descarte ou confirme antes de escolher um método.</div>' : '';
            const notices = (all.core.notices || []).map(n => `<div class="ct-notice">${esc(n)}</div>`).join('');
            const intro = res.intro ? `<p class="ct-intro">${esc(res.intro)}</p>` : '';
            body = `${warn}${notices}${intro}${groupsHtml(res)}${res.page ? `<p class="ct-source">OMS, MEC 2025, p. ${res.page}.</p>` : ''}`;
        }
        const copy = (state.family === 'lam' || state.family === 'ci') ? '' : '<button type="button" class="qt-ghost" data-action="copy">Copiar resumo</button>';
        return `${familyNavHtml()}<div class="ct-result-head"><div><h2>${esc(fam.title)}</h2><div class="ct-sums">${sums}</div></div>${copy}</div>${body}${legendHtml()}`;
    }

    function resultBadge() {
        const core = M().evaluate(state.answers, { phase: state.phase, prefs: state.prefs });
        return core.methods.filter(m => m.section === 'indicated').length;
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
        if (action === 'toggle') {
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
            root.addEventListener('toggle', onToggle, true);
            refresh();
        },
        unmount() {
            if (!root) return;
            root.removeEventListener('click', onClick);
            root.removeEventListener('input', onInput);
            root.removeEventListener('toggle', onToggle, true);
            root = null;
        }
    };
})();
