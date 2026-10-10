// Essentials: grandes áreas → subtemas → (aulas, se houver mais de uma) → leitor.
// O leitor funciona como o do Rapid Review: texto contínuo, barra de progresso,
// pílula "Trocar o tema" e painel lateral com os capítulos (seções da aula).
// Dados em essentials-*.js (window.TRYCKTRACK_ESSENTIALS) e essentials-data/*.js.
(function () {
    let grupo = null;        // grande área aberta
    let current = null;      // subtema aberto
    let aulaIdx = null;      // aula aberta (null = lista de aulas do subtema)
    let sections = [];       // seções (capítulos) da aula aberta
    let activeSec = 0;
    const POS_KEY = 'trycktrack-essentials-positions';
    const el = id => document.getElementById(id);

    // junta as aulas avulsas às suas áreas e esconde áreas ainda vazias
    function getAreas() {
        const extras = window.TRYCKTRACK_ESSENTIALS_AULAS || [];
        return (window.TRYCKTRACK_ESSENTIALS || []).map(a => ({
            ...a, aulas: a.aulas.concat(extras.filter(x => x.area === a.id)).sort((x, y) => x.order - y.order)
        })).filter(a => a.aulas.length);
    }
    const plural = (n, s, p) => `${n} ${n === 1 ? s : p}`;
    const card = (click, title, badge, desc) => `<div class="rr-card" role="button" tabindex="0" onclick="${click}">
        <div class="rr-card-content"><div class="rr-card-header"><div class="rr-card-title">${title}</div><div class="rr-card-badge">${badge}</div></div>
        ${desc ? `<div class="rr-card-description">${desc}</div>` : ''}</div><div class="rr-card-arrow">›</div></div>`;
    const READ_KEY = 'trycktrack-essentials-read';   // { "areaId#aula": { n: total, r: [índices lidos] } }
    const readDone = () => { try { return JSON.parse(localStorage.getItem(READ_KEY) || '{}'); } catch (_) { return {}; } };
    const minutes = html => Math.max(1, Math.round(html.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length / 200));
    const readPos = () => { try { return JSON.parse(localStorage.getItem(POS_KEY) || '{}'); } catch (_) { return {}; } };

    function aulaProgress(key) {
        const d = readDone()[key];
        if (!d || !d.n) return '';
        const pct = Math.round(100 * d.r.length / d.n);
        return pct ? (pct >= 100 ? '✓ Aula concluída' : `${pct}% lida`) : '';
    }

    function setReaderChrome(on) {
        el('essentialsContent').classList.toggle('ess-reading', on);
        el('essentialsView').classList.toggle('ess-reading', on);
        el('essMenuSearch').hidden = on;
        el('essProgressTrack').hidden = !on;
        el('essFooter').hidden = !on;
        el('essSearchBtn').hidden = !on || !(window.CSS && CSS.highlights);
        if (!on) essentialsFind(false);
        if (!on) closePanel();
    }

    function render() {
        clearFind();
        if (!el('essFind').hidden) { el('essFind').hidden = true; }
        const content = el('essentialsContent');
        content.style.fontSize = (Number(localStorage.getItem('trycktrack-reader-fontsize')) || 16) + 'px';
        const areas = getAreas();
        let reader = false;
        if (!grupo) {
            el('essentialsTitle').textContent = 'Essentials';
            const grupos = [...new Set(areas.map(a => a.apostila))];
            content.innerHTML = '<div class="ess-list">' + grupos.map(g => {
                const n = areas.filter(a => a.apostila === g).length;
                return card(`openEssentialsGrupo('${g}')`, g, plural(n, 'tema', 'temas'));
            }).join('') + '</div>';
        } else if (!current) {
            el('essentialsTitle').textContent = grupo;
            content.innerHTML = '<div class="ess-list">' + areas.filter(a => a.apostila === grupo).map(a =>
                card(`openEssentialsArea('${a.id}')`, a.area, plural(a.aulas.length, 'aula', 'aulas'), a.desc)).join('') + '</div>';
        } else if (aulaIdx === null) {
            el('essentialsTitle').textContent = current.area;
            content.innerHTML = '<div class="ess-list">' + current.aulas.map((x, i) =>
                card(`openEssentialsAula(${i})`, x.title, `Aula ${i + 1} · ~${minutes(x.html)} min`, aulaProgress(current.id + '#' + i))).join('') + '</div>';
        } else {
            reader = true;
            const aula = current.aulas[aulaIdx];
            el('essentialsTitle').textContent = current.area;
            content.innerHTML = `<article class="ess"><div class="ess-kicker">${current.apostila} · ${current.area} · ~${minutes(aula.html)} min de leitura</div><h1 class="ess-title">${aula.title}</h1>${aula.html}</article>`;
            sections = Array.from(content.querySelectorAll('.ess-sec'));
            sections.forEach((s, i) => { s.id = 'ess-s' + i; });
            const saved = readPos()[current.id + '#' + aulaIdx];
            content.scrollTop = 0;
            if (saved) requestAnimationFrame(() => requestAnimationFrame(() => { content.scrollTop = saved; updateIndicator(); }));
            updateIndicator();
            if (window.restoreHighlights) restoreHighlights('essentialsContent');
        }
        if (!reader) content.scrollTop = 0;
        setReaderChrome(reader);
        el('essentialsView').classList.add('active');
    }

    function secTitle(s) { return (s.querySelector('h2') || s).textContent.trim(); }

    function updateIndicator() {
        if (!sections.length) return;
        const content = el('essentialsContent');
        const refLine = el('essFooter').getBoundingClientRect().top;
        let a = 0;
        sections.forEach((s, i) => { const h = s.querySelector('h2') || s; if (h.getBoundingClientRect().bottom <= refLine) a = i; });
        activeSec = a;
        const key = current.id + '#' + aulaIdx, all = readDone(), rec = all[key] || { n: sections.length, r: [] };
        const atEnd = content.scrollTop + content.clientHeight >= content.scrollHeight - 4;
        sections.forEach((s, i) => {
            const done = i < sections.length - 1 ? s.getBoundingClientRect().bottom <= refLine : atEnd;
            if (done && !rec.r.includes(i)) { rec.r.push(i); rec.n = sections.length; all[key] = rec; try { localStorage.setItem(READ_KEY, JSON.stringify(all)); } catch (_) {} }
        });
        el('essFooterNum').textContent = String(a + 1);
        const max = content.scrollHeight - content.clientHeight;
        const pct = max > 0 ? Math.min(100, 100 * content.scrollTop / max) : 100;
        el('essProgressFill').style.width = pct + '%';
        el('essProgressTrack').setAttribute('aria-valuenow', Math.round(pct));
    }

    function openPanel() {
        const rd = (readDone()[current.id + '#' + aulaIdx] || { r: [] }).r;
        el('essPanelBody').innerHTML = sections.map((s, i) =>
            `<div class="chapter-subitem${i === activeSec ? ' current' : ''}${rd.includes(i) ? ' is-read' : ''}" role="button" tabindex="0"${i === activeSec ? ' aria-current="true"' : ''} onclick="essentialsGo(${i})"><span class="chapter-subitem-num">${i + 1}</span><span>${secTitle(s)}</span>${rd.includes(i) ? '<span class="chapter-read" aria-label="lido">✓</span>' : ''}</div>`).join('');
        el('essPanel').classList.add('active'); el('essPanelBackdrop').classList.add('active');
    }
    function closePanel() { el('essPanel').classList.remove('active'); el('essPanelBackdrop').classList.remove('active'); }

    let saveT;
    function onScroll() {
        updateIndicator();
        if (aulaIdx === null || !current) return;
        clearTimeout(saveT);
        saveT = setTimeout(() => {
            const p = readPos(); p[current.id + '#' + aulaIdx] = Math.round(el('essentialsContent').scrollTop);
            try { localStorage.setItem(POS_KEY, JSON.stringify(p)); } catch (_) {}
        }, 250);
    }
    document.addEventListener('DOMContentLoaded', () => el('essentialsContent')?.addEventListener('scroll', onScroll, { passive: true }));

    window.essentialsDocId = () => (current && aulaIdx !== null) ? 'ess:' + current.id + '#' + aulaIdx : null;
    window.essentialsAulas = () => getAreas().flatMap(a => a.aulas.map((x, i) => ({ areaId: a.id, area: a.area, i, title: x.title, html: x.html })));
    window.openEssentialsResult = function (areaId, i) {
        const term = document.querySelector('#essMenuSearch input').value.trim();
        current = getAreas().find(a => a.id === areaId) || null;
        if (!current) return;
        grupo = current.apostila; aulaIdx = i;
        window.menuSearchReset && menuSearchReset();
        render();
        el('essFindInput').value = term;
        essentialsFind(true);
    };
    window.openEssentials = function () { grupo = null; current = null; aulaIdx = null; render(); };
    window.openEssentialsGrupo = function (g) { grupo = g; current = null; aulaIdx = null; render(); };
    window.openEssentialsArea = function (id) {
        current = getAreas().find(a => a.id === id) || null;
        if (current) grupo = current.apostila;
        aulaIdx = current && current.aulas.length === 1 ? 0 : null;   // uma aula só: abre direto
        render();
    };
    window.openEssentialsAula = function (i) { aulaIdx = i; render(); };
    window.openEssentialsPanel = openPanel;
    window.essentialsGo = function (i) {
        closePanel();
        const s = sections[i]; if (!s) return;
        el('essentialsContent').scrollTo({ top: s.offsetTop - 8, behavior: 'smooth' });
    };
    window.essentialsBack = function () {
        if (current && aulaIdx !== null && current.aulas.length > 1) { aulaIdx = null; render(); }
        else if (current) { current = null; aulaIdx = null; render(); }
        else if (grupo) { grupo = null; render(); }
        else el('essentialsView').classList.remove('active');
    };
    window.closeEssentialsPanel = closePanel;

    // Busca na aula: usa a CSS Custom Highlight API (não altera o texto, então
    // não atrapalha os grifos salvos). Sem suporte no navegador, o botão some.
    const fold = s => Array.from(s, c => c.normalize('NFD')[0].toLowerCase()).join('');
    let hits = [], hitIdx = -1;
    function clearFind() { if (window.CSS && CSS.highlights) { CSS.highlights.delete('ess-find'); CSS.highlights.delete('ess-find-cur'); } hits = []; hitIdx = -1; }
    window.essentialsFind = function (open) {
        const bar = el('essFind');
        if (open === false) { bar.hidden = true; el('essFindInput').value = ''; el('essFindCount').textContent = ''; clearFind(); return; }
        if (open === true) { bar.hidden = false; el('essFindInput').focus(); }
        clearFind();
        const term = fold(el('essFindInput').value.trim());
        if (term.length < 2) { el('essFindCount').textContent = ''; return; }
        const w = document.createTreeWalker(el('essentialsContent'), NodeFilter.SHOW_TEXT);
        for (let n = w.nextNode(); n; n = w.nextNode()) {
            const f = fold(n.data); let i = f.indexOf(term);
            while (i !== -1) { const r = new Range(); r.setStart(n, i); r.setEnd(n, i + term.length); hits.push(r); i = f.indexOf(term, i + term.length); }
        }
        CSS.highlights.set('ess-find', new Highlight(...hits));
        el('essFindCount').textContent = hits.length ? '' : 'Nada';
        if (hits.length) essentialsFindStep(1, true);
    };
    window.essentialsFindStep = function (d, first) {
        if (!hits.length) return;
        hitIdx = first ? 0 : (hitIdx + d + hits.length) % hits.length;
        const r = hits[hitIdx];
        for (let p = r.startContainer.parentElement.closest('details'); p; p = p.parentElement && p.parentElement.closest('details')) p.open = true;
        CSS.highlights.set('ess-find-cur', new Highlight(r));
        r.startContainer.parentElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
        el('essFindCount').textContent = `${hitIdx + 1}/${hits.length}`;
    };
})();
