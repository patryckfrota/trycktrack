/* ============================================================
   CONTRACEPÇÃO — interface
   Camadas:  shared/contraception-data.js    dados da OMS (tabela-resumo)
             shared/contraception-engine.js  regras puras (evaluate)
             app-contraception.js            esta interface
   O estado fica só em memória (dado clínico de paciente não é gravado).
   Eventos: um único listener delegado por data-action.
   Depende de window.MEC, exposto em index.html.
   ============================================================ */
(function () {
    const state = {
        answers: {},
        phase: 'start',
        prefs: { noHormone: false, longActing: false },
        query: '',
        tab: 'profile',
        open: new Set(['perfil']),
        legendOpen: false
    };
    let root = null;

    const esc = (v) => escapeHtml(v);
    const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

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
        return `<fieldset class="ct-q"><legend>${esc(q.title)}<small>${hint}</small></legend>${help}<div class="ct-opts" role="${q.type === 'single' ? 'radiogroup' : 'group'}" aria-label="${esc(q.title)}">${options.map(o => optionHtml(q, o, selected)).join('')}</div></fieldset>`;
    }

    function profileHtml() {
        const { SECTIONS, searchQuestions, countAnswered } = window.MEC;
        const hits = searchQuestions(state.query);
        const searching = hits !== null;
        const sections = SECTIONS.map((s, i) => {
            const body = s.questions.map(q => (!hits || hits.has(q.id)) ? questionHtml(q, hits && hits.get(q.id)) : '').join('');
            if (searching && !body) return '';
            const n = countAnswered(state.answers, s.id);
            const open = searching || state.open.has(s.id);
            return `<details class="ct-sec" data-sec="${s.id}"${open ? ' open' : ''}><summary><span class="ct-sec-n">${i + 1}</span><span class="ct-sec-title">${esc(s.title)}</span>${n ? `<em class="ct-count">${n}</em>` : ''}</summary><div class="ct-sec-body">${body}</div></details>`;
        }).join('');
        const empty = searching && !sections ? `<p class="ct-empty">Nenhuma condição encontrada para “${esc(state.query)}”.</p>` : '';
        return sections + empty;
    }

    function summaryHtml() {
        const sel = window.MEC.selectedOptions(state.answers);
        if (!sel.length) return '<p class="ct-summary-empty">Nenhuma condição marcada: todos os métodos aparecem sem restrição. Marque o que se aplica à paciente.</p>';
        const chips = sel.map(({ question, option }) => `<button type="button" class="ct-chip" data-action="toggle" data-q="${question.id}" data-o="${option.id}" aria-label="Remover: ${esc(option.label)}"><span>${esc(shortLabel(question, option))}</span><i aria-hidden="true">×</i></button>`).join('');
        return `<div class="ct-chips">${chips}</div>`;
    }

    // Chip: título da pergunta quando ela só tem uma opção; senão o rótulo todo.
    function shortLabel(q, o) {
        return q.options.length === 1 ? q.title : o.label;
    }

    /* ---------- resultado ---------- */

    function methodHtml(m) {
        const reasons = m.drivers.length
            ? `<ul class="ct-reasons">${m.drivers.map(d => `<li><b>${esc(d.display)}</b> ${esc(d.optionLabel)}${d.note ? `<small>${esc(d.note)}</small>` : ''}</li>`).join('')}</ul>`
            : '';
        const miss = m.misses ? '<p class="ct-miss">Não atende à preferência marcada</p>' : '';
        const best = m.best ? '<span class="ct-best-tag">Melhor opção para este perfil</span>' : '';
        const ranged = m.ranged ? '<p class="ct-ranged">Categoria varia conforme a gravidade ou o risco individual.</p>' : '';
        return `<article class="ct-method ct-cat${m.category}${m.best ? ' ct-best' : ''}${m.section === 'na' ? ' ct-na' : ''}">
            <div class="ct-method-head"><span class="ct-badge" title="Categoria ${esc(m.display)}">${m.section === 'na' ? '—' : esc(m.display)}</span><div><h4>${esc(m.name)}</h4>${best}</div></div>
            <p class="ct-eff">${esc(m.efficacy)}</p><p class="ct-note">${esc(m.note)}</p>${ranged}${reasons}${miss}</article>`;
    }

    function resultHtml() {
        const { evaluate, CATEGORY_TEXT, OUT_OF_SCOPE, MEC_SOURCE } = window.MEC;
        const r = evaluate(state.answers, { phase: state.phase, prefs: state.prefs });
        const counts = r.groups.map(g => `<span class="ct-sum ct-sum-${g.id}">${g.methods.length} ${g.title.toLowerCase()}</span>`).join('');
        const warn = r.pregnancy ? '<div class="ct-alert" role="alert"><strong>Gravidez suspeita ou confirmada.</strong> Descarte ou confirme antes de escolher um método. Os hormonais não se aplicam; os DIUs são categoria 4.</div>' : '';
        const groups = r.groups.map(g => `<section class="ct-group ct-group-${g.id}"><header><h3>${g.title}<em>${g.methods.length}</em></h3><span>${g.hint}</span></header>${g.methods.map(methodHtml).join('')}</section>`).join('');
        const legend = [1, 2, 3, 4].map(n => `<li><span class="ct-badge ct-cat${n}">${n}</span><div><b>${CATEGORY_TEXT[n].name}</b><span>${CATEGORY_TEXT[n].text}</span></div></li>`).join('');
        return `<div class="ct-result-head"><div><h2>Resultado</h2><div class="ct-sums">${counts}</div></div><button type="button" class="qt-ghost" data-action="copy">Copiar resumo</button></div>
            ${warn}${groups}
            <details class="ct-legend"${state.legendOpen ? ' open' : ''} data-legend><summary>Como ler as categorias</summary><ul>${legend}</ul>
                <p>Início (I) e continuação (C) podem ter categorias diferentes: use a chave no topo para escolher se a mulher vai começar o método ou já o usa. A categoria final de cada método é a mais restritiva entre todas as condições marcadas.</p></details>
            <details class="ct-legend"><summary>Fora do escopo desta versão</summary><p>${OUT_OF_SCOPE.map(esc).join('; ')}. A OMS trata esses métodos em tabelas próprias.</p></details>
            <p class="ct-source">Fonte: ${esc(MEC_SOURCE.title)} ${esc(MEC_SOURCE.scope)}. Material de apoio ao estudo e à decisão: não substitui a avaliação clínica nem os protocolos locais. As respostas não são salvas.</p>`;
    }

    function resultBadge() {
        const { evaluate } = window.MEC;
        const r = evaluate(state.answers, { phase: state.phase, prefs: state.prefs });
        return r.methods.filter(m => m.section === 'indicated').length;
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
        root.querySelector('#ctResult').innerHTML = resultHtml();
        const n = window.MEC.selectedOptions(state.answers).length;
        root.querySelector('#ctProfileCount').textContent = n ? String(n) : '';
        root.querySelector('#ctResultCount').textContent = `${resultBadge()} indicados`;
        root.querySelector('.ct').dataset.tab = state.tab;
        if (focusKey) root.querySelector(`[data-key="${focusKey}"]`)?.focus({ preventScroll: true });
    }

    function copySummary() {
        const { evaluate, selectedOptions, MEC_SOURCE } = window.MEC;
        const r = evaluate(state.answers, { phase: state.phase, prefs: state.prefs });
        const profile = selectedOptions(state.answers).map(s => `- ${s.option.label}`).join('\n') || '- Nenhuma condição marcada';
        const lines = r.groups.map(g => `${g.title}:\n${g.methods.map(m => `  ${m.display} · ${m.short}`).join('\n')}`).join('\n');
        const text = `Critérios de elegibilidade (${state.phase === 'start' ? 'início' : 'continuação'}) · ${MEC_SOURCE.short}\nPerfil:\n${profile}\n\n${lines}`;
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
            state.answers = window.MEC.toggleAnswer(state.answers, q, o);
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
        } else if (action === 'tab') {
            state.tab = v;
            root.querySelectorAll('.ct-tab').forEach(b => b.setAttribute('aria-selected', b.dataset.v === v));
            root.querySelector('.ct').dataset.tab = v;
            root.scrollTop = 0;
        } else if (action === 'clear') {
            state.answers = {}; state.query = '';
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
