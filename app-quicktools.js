/* ============================================================
   ACESSO RÁPIDO (tela inicial)
   Hub dos atalhos e calculadora de idade gestacional (lógica em
   shared/quick-tools.js). A contracepção tem módulo próprio
   (app-contraception.js). Cada ferramenta abre numa página cheia
   (#quickToolView).
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
        text: 'Critérios de elegibilidade da OMS por perfil.',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="8.5"/><path d="M6 18 18 6"/></svg>'
    }
];

const quickToolState = {
    open: null,
    ig: { method: 'dum', dum: '', usDate: '', usWeeks: '', usDays: '0', ref: '' }
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
    const view = document.getElementById('quickToolView');
    const body = document.getElementById('quickToolBody');
    if (!view || !body) return;
    quickToolState.open = id;
    if (id === 'ig') {
        if (!quickToolState.ig.ref) quickToolState.ig.ref = todayIso();
        document.getElementById('quickToolTitle').textContent = 'Idade gestacional';
        body.innerHTML = renderGestationalPage();
        updateGestationalResult();
    } else {
        document.getElementById('quickToolTitle').textContent = 'Contracepção';
        window.ContraceptionUI.mount(body);
    }
    body.scrollTop = 0;
    view.classList.add('active');
    view.setAttribute('aria-hidden', 'false');
}

function closeQuickTool() {
    window.ContraceptionUI?.unmount();
    const view = document.getElementById('quickToolView');
    view?.classList.remove('active');
    view?.setAttribute('aria-hidden', 'true');
    quickToolState.open = null;
}

document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && quickToolState.open) closeQuickTool();
});

/* ---------- Idade gestacional ---------- */

function renderGestationalPage() {
    const s = quickToolState.ig;
    const seg = (value, label, hint) => `<button type="button" class="qt-seg${s.method === value ? ' active' : ''}" aria-pressed="${s.method === value}" onclick="setGestationalMethod('${value}')"><strong>${label}</strong><span>${hint}</span></button>`;
    const dateInput = (id, key, label, extra = '') => `<label class="qt-field"><span>${label}</span><input type="date" id="${id}" value="${s[key]}" oninput="quickToolState.ig.${key} = this.value; updateGestationalResult()">${extra}</label>`;
    const fields = s.method === 'dum'
        ? dateInput('qtDum', 'dum', 'Primeiro dia da última menstruação')
        : `${dateInput('qtUsDate', 'usDate', 'Data do ultrassom')}
           <div class="qt-row">
               <label class="qt-field"><span>Semanas no exame</span><input type="number" inputmode="numeric" min="0" max="44" id="qtUsWeeks" placeholder="ex.: 8" value="${s.usWeeks}" oninput="quickToolState.ig.usWeeks = this.value; updateGestationalResult()"></label>
               <label class="qt-field"><span>Dias</span><input type="number" inputmode="numeric" min="0" max="6" id="qtUsDays" value="${s.usDays}" oninput="quickToolState.ig.usDays = this.value; updateGestationalResult()"></label>
           </div>`;
    return `<div class="qt-layout">
        <section class="qt-panel" aria-label="Dados">
            <h2 class="qt-panel-title">Como datar a gestação</h2>
            <div class="qt-segmented">${seg('dum', 'Pela DUM', 'Última menstruação')}${seg('us', 'Pelo ultrassom', 'IG medida no exame')}</div>
            ${fields}
            <label class="qt-field"><span>Calcular para o dia</span>
                <div class="qt-inline"><input type="date" id="qtRef" value="${s.ref}" oninput="quickToolState.ig.ref = this.value; updateGestationalResult()"><button type="button" class="qt-ghost" onclick="setGestationalToday()">Hoje</button></div>
            </label>
            <p class="qt-note">DUM: DPP pela regra de Naegele (DUM + 280 dias). Ultrassom: a DPP parte da IG medida no exame. Em geral, o ultrassom do 1º trimestre prevalece sobre a DUM quando a diferença passa de 5 a 7 dias.</p>
        </section>
        <section class="qt-output" id="qtOutput" aria-live="polite"></section>
    </div>`;
}

function setGestationalMethod(method) {
    quickToolState.ig.method = method;
    document.getElementById('quickToolBody').innerHTML = renderGestationalPage();
    updateGestationalResult();
}

function setGestationalToday() {
    quickToolState.ig.ref = todayIso();
    const input = document.getElementById('qtRef');
    if (input) input.value = quickToolState.ig.ref;
    updateGestationalResult();
}

function updateGestationalResult() {
    const out = document.getElementById('qtOutput');
    if (!out) return;
    const s = quickToolState.ig;
    const empty = s.method === 'us' ? !s.usDate || s.usWeeks === '' : !s.dum;
    if (empty) {
        out.innerHTML = `<div class="qt-hero qt-hero-empty"><span class="qt-hero-eyebrow">Idade gestacional</span><strong>Informe a data para calcular</strong><p>O resultado, a DPP e os marcos do pré-natal aparecem aqui.</p></div>`;
        return;
    }
    const r = gestationalAge(s);
    if (r.error) { out.innerHTML = `<div class="qt-alert" role="alert">${escapeHtml(r.error)}</div>`; return; }
    const ga = `${r.weeks}<small>sem</small>${r.days ? ` ${r.days}<small>${r.days === 1 ? 'dia' : 'dias'}</small>` : ''}`;
    const pct = Math.min(100, r.totalDays / 294 * 100).toFixed(1);
    const left = r.daysToDpp >= 0 ? `${r.daysToDpp} ${r.daysToDpp === 1 ? 'dia' : 'dias'}` : `${-r.daysToDpp} d após`;
    const marks = gestationalMilestones(r.start, s.ref).map(m => `<li class="qt-mark qt-mark-${m.status}"><span class="qt-mark-dot"></span><div><strong>${m.week} sem · ${formatDay(m.date)}</strong><span>${escapeHtml(m.label)}</span></div></li>`).join('');
    out.innerHTML = `<div class="qt-hero">
            <span class="qt-hero-eyebrow">Idade gestacional em ${formatDay(parseDay(s.ref))}</span>
            <div class="qt-hero-value">${ga}</div>
            <span class="qt-pill">${r.term}</span>
            <div class="qt-track" role="img" aria-label="${r.weeks} semanas de 42, ${r.trimester}º trimestre"><i style="width:${pct}%"></i><b style="left:${pct}%"></b></div>
            <div class="qt-track-legend"><span class="${r.trimester === 1 ? 'on' : ''}">1º tri</span><span class="${r.trimester === 2 ? 'on' : ''}">2º tri</span><span class="${r.trimester === 3 ? 'on' : ''}">3º tri</span></div>
        </div>
        <div class="qt-stats">
            <div><span>DPP</span><strong>${formatDay(r.dpp)}</strong></div>
            <div><span>${r.daysToDpp >= 0 ? 'Faltam' : 'Passou'}</span><strong>${left}</strong></div>
            <div><span>Trimestre</span><strong>${r.trimester}º</strong></div>
        </div>
        <section class="qt-panel"><h2 class="qt-panel-title">Marcos do pré-natal</h2><ol class="qt-marks">${marks}</ol></section>`;
}

window.openQuickTool = openQuickTool;
window.closeQuickTool = closeQuickTool;
window.setGestationalMethod = setGestationalMethod;
window.setGestationalToday = setGestationalToday;
window.updateGestationalResult = updateGestationalResult;
window.quickToolState = quickToolState;
window.renderQuickTools = renderQuickTools;
