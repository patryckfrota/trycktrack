// Essentials: lista de áreas (um card por área) e leitor próprio.
// Dados em essentials-*.js (window.TRYCKTRACK_ESSENTIALS).
(function () {
    let grupo = null;        // grande área aberta (null = lista de grandes áreas)
    let current = null;      // subtema aberto (null = lista de subtemas)
    let aulaIndex = 0;
    const el = id => document.getElementById(id);

    // junta as aulas avulsas (essentials-data/*.js) às suas áreas e esconde áreas ainda vazias
    function getAreas() {
        const extras = window.TRYCKTRACK_ESSENTIALS_AULAS || [];
        return (window.TRYCKTRACK_ESSENTIALS || []).map(a => ({
            ...a, aulas: a.aulas.concat(extras.filter(x => x.area === a.id)).sort((x, y) => x.order - y.order)
        })).filter(a => a.aulas.length);
    }

    function render() {
        const view = el('essentialsView');
        const content = el('essentialsContent');
        const areas = getAreas();
        if (!grupo) {
            el('essentialsTitle').textContent = 'Essentials';
            const grupos = [...new Set(areas.map(a => a.apostila))];
            content.innerHTML = '<div class="ess-list">' + grupos.map(g => {
                const n = areas.filter(a => a.apostila === g).length;
                return `<div class="rr-card" onclick="openEssentialsGrupo('${g}')">
                    <div class="rr-card-content">
                        <div class="rr-card-header"><div class="rr-card-title">${g}</div><div class="rr-card-badge">${n} ${n === 1 ? 'tema' : 'temas'}</div></div>
                    </div><div class="rr-card-arrow">›</div></div>`;
            }).join('') + '</div>';
        } else if (!current) {
            el('essentialsTitle').textContent = grupo;
            content.innerHTML = '<div class="ess-list">' + areas.filter(a => a.apostila === grupo).map(a =>
                `<div class="rr-card" onclick="openEssentialsArea('${a.id}')">
                    <div class="rr-card-content">
                        <div class="rr-card-header"><div class="rr-card-title">${a.area}</div><div class="rr-card-badge">${a.aulas.length} ${a.aulas.length === 1 ? 'aula' : 'aulas'}</div></div>
                        <div class="rr-card-description">${a.desc}</div>
                    </div><div class="rr-card-arrow">›</div></div>`).join('') + '</div>';
        } else {
            el('essentialsTitle').textContent = current.area;
            const aula = current.aulas[aulaIndex];
            const chips = current.aulas.length > 1
                ? '<div class="ess-chips">' + current.aulas.map((x, i) =>
                    `<button class="ess-chip${i === aulaIndex ? ' active' : ''}" onclick="openEssentialsAula(${i})">${x.title}</button>`).join('') + '</div>'
                : '';
            content.innerHTML = `<article class="ess">${chips}<div class="ess-kicker">${current.apostila} · ${current.area}</div><h1 class="ess-title">${aula.title}</h1>${aula.html}</article>`;
            const heads = Array.from(content.querySelectorAll('.ess-sec > h2'));
            heads.forEach((h, i) => { h.id = 'ess-s' + i; });
            if (heads.length > 1) {
                content.querySelector('.ess-title').insertAdjacentHTML('afterend',
                    '<nav class="ess-toc" aria-label="Neste capítulo"><div class="ess-toc-tt">Neste capítulo</div>' +
                    heads.map(h => `<a href="#${h.id}" onclick="essentialsGo('${h.id}');return false">${h.textContent}</a>`).join('') + '</nav>');
            }
        }
        content.scrollTop = 0;
        view.classList.add('active');
    }

    window.openEssentials = function () { grupo = null; current = null; render(); };
    window.openEssentialsGrupo = function (g) { grupo = g; current = null; render(); };
    window.openEssentialsArea = function (id) {
        current = getAreas().find(a => a.id === id) || null;
        grupo = current ? current.apostila : grupo;
        aulaIndex = 0;
        render();
    };
    window.openEssentialsAula = function (i) { aulaIndex = i; render(); };
    window.essentialsGo = function (id) { el(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
    window.essentialsBack = function () {
        if (current) { current = null; render(); }
        else if (grupo) { grupo = null; render(); }
        else el('essentialsView').classList.remove('active');
    };
})();
