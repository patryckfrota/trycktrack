/* ============================================================
   ACESSO RÁPIDO (tela inicial)
   Calculadora de idade gestacional e escolha de método
   contraceptivo. A lógica está em shared/quick-tools.js; aqui só há
   interface, reaproveitando o painel lateral de detalhes.
   ============================================================ */
const QUICK_TOOLS = [
    {
        id: 'ig',
        title: 'Idade gestacional',
        text: 'DUM ou ultrassom, DPP e trimestre.',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="5" width="17" height="15.5" rx="3"/><path d="M8 3v4M16 3v4M3.5 10h17"/><path d="M8 14.5h3M13.5 14.5h2.5M8 17.5h3"/></svg>'
    },
    {
        id: 'contracepcao',
        title: 'Contracepção',
        text: 'Métodos adequados ao perfil da mulher.',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M6 18 18 6"/></svg>'
    }
];

const quickToolState = {
    ig: { method: 'dum', dum: '', usDate: '', usWeeks: '', usDays: '0', ref: '' },
    contra: { selected: new Set(), noHormone: false, longActing: false }
};

function renderQuickTools() {
    const container = document.getElementById('quickTools');
    if (!container || container.dataset.rendered) return;
    container.dataset.rendered = 'true';
    const tiles = QUICK_TOOLS.map(t => `<button type="button" class="quick-tool" onclick="openQuickTool('${t.id}')"><span class="quick-tool-icon">${t.icon}</span><span class="quick-tool-copy"><strong>${t.title}</strong><span>${t.text}</span></span></button>`).join('');
    container.innerHTML = `<div class="quick-tools-block"><h2 class="med-updates-heading">Acesso rápido</h2><div class="quick-tools-grid">${tiles}</div></div>`;
}

function openQuickTool(id) {
    document.getElementById('sidebar')?.classList.remove('active');
    document.getElementById('sidebarBackdrop')?.classList.remove('active');
    const panel = document.getElementById('sidebarDetailPanel');
    const backdrop = document.getElementById('sidebarDetailBackdrop');
    const title = document.getElementById('sidebarDetailTitle');
    const subtitle = document.getElementById('sidebarDetailSubtitle');
    const body = document.getElementById('sidebarDetailBody');
    if (!panel || !backdrop || !title || !subtitle || !body) return;
    if (id === 'ig') {
        if (!quickToolState.ig.ref) quickToolState.ig.ref = todayIso();
        title.textContent = 'Idade gestacional';
        subtitle.textContent = 'Calculadora por DUM ou ultrassom';
        body.innerHTML = renderGestationalForm();
        updateGestationalResult();
    } else {
        title.textContent = 'Contracepção';
        subtitle.textContent = 'Métodos adequados ao perfil da mulher';
        body.innerHTML = renderContraceptionForm();
        updateContraceptionResult();
    }
    panel.classList.add('active');
    backdrop.classList.add('active');
    panel.setAttribute('aria-hidden', 'false');
}

/* ---------- Idade gestacional ---------- */

function renderGestationalForm() {
    const s = quickToolState.ig;
    const seg = (value, label) => `<button type="button" class="qt-seg${s.method === value ? ' active' : ''}" onclick="setGestationalMethod('${value}')">${label}</button>`;
    const dumFields = `<label class="qt-field"><span>Data da última menstruação (DUM)</span><input type="date" id="qtDum" value="${s.dum}" oninput="quickToolState.ig.dum = this.value; updateGestationalResult()"></label>`;
    const usFields = `<label class="qt-field"><span>Data do ultrassom</span><input type="date" id="qtUsDate" value="${s.usDate}" oninput="quickToolState.ig.usDate = this.value; updateGestationalResult()"></label>
        <div class="qt-row"><label class="qt-field"><span>IG no exame: semanas</span><input type="number" inputmode="numeric" min="0" max="44" id="qtUsWeeks" value="${s.usWeeks}" oninput="quickToolState.ig.usWeeks = this.value; updateGestationalResult()"></label>
        <label class="qt-field"><span>dias</span><input type="number" inputmode="numeric" min="0" max="6" id="qtUsDays" value="${s.usDays}" oninput="quickToolState.ig.usDays = this.value; updateGestationalResult()"></label></div>`;
    return `<div class="sidebar-detail-card qt-card">
        <div class="qt-segmented">${seg('dum', 'Pela DUM')}${seg('us', 'Pelo ultrassom')}</div>
        ${s.method === 'dum' ? dumFields : usFields}
        <label class="qt-field"><span>Calcular para a data</span><input type="date" id="qtRef" value="${s.ref}" oninput="quickToolState.ig.ref = this.value; updateGestationalResult()"></label>
    </div>
    <div class="qt-result" id="qtResult" aria-live="polite"></div>
    <p class="qt-disclaimer">DPP pela regra de Naegele (DUM + 280 dias). Com ultrassom, a DPP parte da IG medida no exame. Em geral, o ultrassom do 1º trimestre prevalece sobre a DUM quando a diferença passa de 5 a 7 dias.</p>`;
}

function setGestationalMethod(method) {
    quickToolState.ig.method = method;
    document.getElementById('sidebarDetailBody').innerHTML = renderGestationalForm();
    updateGestationalResult();
}

function updateGestationalResult() {
    const out = document.getElementById('qtResult');
    if (!out) return;
    const s = quickToolState.ig;
    const empty = s.method === 'us' ? !s.usDate || s.usWeeks === '' : !s.dum;
    if (empty) { out.innerHTML = ''; return; }
    const r = gestationalAge(s);
    if (r.error) { out.innerHTML = `<div class="qt-alert">${escapeHtml(r.error)}</div>`; return; }
    const sign = r.daysToDpp >= 0 ? `faltam ${r.daysToDpp} dias` : `${-r.daysToDpp} dias após a DPP`;
    out.innerHTML = `<div class="qt-big">${r.weeks} semanas${r.days ? ` e ${r.days} ${r.days === 1 ? 'dia' : 'dias'}` : ''}</div>
        <dl class="qt-facts">
            <div><dt>DPP</dt><dd>${formatDay(r.dpp)} <small>${sign}</small></dd></div>
            <div><dt>Trimestre</dt><dd>${r.trimester}º</dd></div>
            <div><dt>Classificação</dt><dd>${r.term}</dd></div>
            <div><dt>Total</dt><dd>${r.totalDays} dias</dd></div>
        </dl>`;
}

/* ---------- Contracepção ---------- */

function renderContraceptionForm() {
    const s = quickToolState.contra;
    const groups = [];
    CONTRACEPTIVE_CONDITIONS.forEach(c => {
        let g = groups.find(x => x.name === c.group);
        if (!g) groups.push(g = { name: c.group, items: [] });
        g.items.push(c);
    });
    const chips = groups.map(g => `<fieldset class="qt-group"><legend>${g.name}</legend>${g.items.map(c => `<button type="button" class="qt-chip${s.selected.has(c.id) ? ' active' : ''}" aria-pressed="${s.selected.has(c.id)}" onclick="toggleContraCondition('${c.id}', this)">${escapeHtml(c.label)}</button>`).join('')}</fieldset>`).join('');
    const pref = (key, label) => `<button type="button" class="qt-chip${s[key] ? ' active' : ''}" aria-pressed="${s[key]}" onclick="toggleContraPref('${key}', this)">${label}</button>`;
    return `<div class="sidebar-detail-card qt-card">
        <h3>Preferências</h3>
        <div class="qt-chips">${pref('noHormone', 'Sem hormônio')}${pref('longActing', 'Longa duração, sem lembrar')}</div>
    </div>
    <div class="sidebar-detail-card qt-card">
        <h3>Condições da paciente</h3>
        <p>Marque o que se aplica. Sem nada marcado, todos os métodos aparecem sem restrição.</p>
        ${chips}
    </div>
    <div class="qt-result" id="qtResult" aria-live="polite"></div>
    <p class="qt-disclaimer">Ferramenta de apoio ao estudo, baseada nos Critérios Médicos de Elegibilidade da OMS (categorias 1 a 4). Quando a OMS separa início e continuação, usamos a categoria mais restritiva. Não cobre puerpério imediato, HIV, anemia falciforme nem outras situações: avalie cada caso. Preservativo continua indicado para prevenir IST.</p>`;
}

function toggleContraCondition(id, el) {
    const set = quickToolState.contra.selected;
    set.has(id) ? set.delete(id) : set.add(id);
    el.classList.toggle('active', set.has(id));
    el.setAttribute('aria-pressed', set.has(id));
    updateContraceptionResult();
}

function toggleContraPref(key, el) {
    quickToolState.contra[key] = !quickToolState.contra[key];
    el.classList.toggle('active', quickToolState.contra[key]);
    el.setAttribute('aria-pressed', quickToolState.contra[key]);
    updateContraceptionResult();
}

function updateContraceptionResult() {
    const out = document.getElementById('qtResult');
    if (!out) return;
    const s = quickToolState.contra;
    const list = recommendContraception([...s.selected], s);
    const rows = list.map(m => {
        const why = m.drivers.length ? `<small class="qt-why">Por causa de: ${m.drivers.map(escapeHtml).join('; ')}</small>` : '';
        const miss = m.misses ? '<small class="qt-why">Não atende à preferência marcada.</small>' : '';
        return `<div class="qt-method qt-cat${m.category}"><span class="qt-badge">${m.category}</span><div class="qt-method-copy"><strong>${m.name}</strong><span>${m.label} · ${m.efficacy}</span><small>${m.note}</small>${why}${miss}</div></div>`;
    }).join('');
    out.innerHTML = `<h3 class="qt-heading">Métodos, do mais ao menos adequado</h3>${rows}`;
}

window.openQuickTool = openQuickTool;
window.setGestationalMethod = setGestationalMethod;
window.updateGestationalResult = updateGestationalResult;
window.toggleContraCondition = toggleContraCondition;
window.toggleContraPref = toggleContraPref;
window.quickToolState = quickToolState;
window.renderQuickTools = renderQuickTools;
