// Busca de palavras nos menus de Essentials e Rapid Review: procura no texto
// de todas as aulas/capítulos e abre direto no trecho encontrado.
(function () {
    const fold = s => Array.from(s, c => c.normalize('NFD')[0].toLowerCase()).join('');
    const strip = h => h.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ');
    const esc = s => s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
    const decode = s => { const t = document.createElement('textarea'); t.innerHTML = s; return t.value; };
    const cache = {};

    function index(scope) {
        if (cache[scope]) return cache[scope];
        let items = [];
        if (scope === 'essentials') {
            items = (window.essentialsAulas ? window.essentialsAulas() : []).map(x => ({
                title: x.title, tag: x.area, plain: strip(x.html), open: () => window.openEssentialsResult(x.areaId, x.i)
            }));
        } else {
            Object.keys(RAPID_REVIEW_DATA).forEach(k => {
                const t = RAPID_REVIEW_DATA[k];
                t.sections.forEach((s, si) => s.subchapters.forEach((sub, bi) => items.push({
                    title: sub.title, tag: t.area || t.title, plain: strip(sub.bodyHtml || ''),
                    open: term => { openReader(k); setTimeout(() => window.rrJumpToTerm(si, bi, term), 150); }
                })));
            });
        }
        items.forEach(i => { i.f = fold(i.plain); i.ft = fold(i.title); });
        return (cache[scope] = items);
    }

    function search(scope, term) {
        const ft = fold(term), out = [];
        for (const it of index(scope)) {
            const at = it.ft.indexOf(ft), ib = it.f.indexOf(ft);
            if (at === -1 && ib === -1) continue;
            let snip = '';
            if (ib !== -1) {
                const a = Math.max(0, ib - 45), b = Math.min(it.plain.length, ib + ft.length + 70);
                const p = decode(it.plain.slice(a, b));
                const k = ib - a;
                snip = (a ? '…' : '') + esc(p.slice(0, k)) + '<mark>' + esc(p.slice(k, k + ft.length)) + '</mark>' + esc(p.slice(k + ft.length)) + (b < it.plain.length ? '…' : '');
            }
            out.push({ it, score: at !== -1 ? 0 : 1, snip });
        }
        return out.sort((x, y) => x.score - y.score);
    }

    document.querySelectorAll('.menu-search').forEach(box => {
        const input = box.querySelector('input'), scope = box.dataset.scope;
        const results = box.nextElementSibling;
        const siblings = () => scope === 'essentials' ? [document.getElementById('essentialsContent')]
            : Array.from(box.parentElement.children).filter(c => c !== box && c !== results);
        let t;
        const run = () => {
            const term = input.value.trim();
            if (term.length < 3) { results.hidden = true; siblings().forEach(s => s && s.classList.remove('ms-hidden')); results.innerHTML = ''; return; }
            const found = search(scope, term);
            siblings().forEach(s => s && s.classList.add('ms-hidden'));
            results.hidden = false;
            results.innerHTML = found.length
                ? `<div class="ms-count">${found.length > 40 ? 'Mostrando 40 de ' + found.length : found.length} resultado${found.length === 1 ? '' : 's'}</div>` +
                  found.slice(0, 40).map((r, i) => `<div class="rr-card" role="button" tabindex="0" data-i="${i}"><div class="rr-card-content"><div class="rr-card-header"><div class="rr-card-title">${esc(r.it.title)}</div><div class="rr-card-badge">${esc(r.it.tag)}</div></div>${r.snip ? `<div class="rr-card-description ms-snip">${r.snip}</div>` : ''}</div><div class="rr-card-arrow">›</div></div>`).join('')
                : '<p class="ms-empty">Nada encontrado.</p>';
            results._found = found;
        };
        input.addEventListener('input', () => { clearTimeout(t); t = setTimeout(run, 180); });
        results.addEventListener('click', e => {
            const c = e.target.closest('.rr-card'); if (!c) return;
            const r = results._found[+c.dataset.i]; if (r) r.it.open(input.value.trim());
        });
        box._reset = () => { input.value = ''; run(); };
    });
    window.menuSearchReset = () => document.querySelectorAll('.menu-search').forEach(b => b._reset && b._reset());

    // Rapid Review: rola até o capítulo e marca a palavra
    window.rrJumpToTerm = function (si, bi, term) {
        const block = document.getElementById(`rr-block-${si}-${bi}`);
        if (!block) return;
        block.scrollIntoView({ block: 'start' });
        if (!(window.CSS && CSS.highlights)) return;
        const ft = fold(term), w = document.createTreeWalker(block, NodeFilter.SHOW_TEXT), rs = [];
        for (let n = w.nextNode(); n; n = w.nextNode()) {
            const f = fold(n.data); let i = f.indexOf(ft);
            while (i !== -1) { const r = new Range(); r.setStart(n, i); r.setEnd(n, i + ft.length); rs.push(r); i = f.indexOf(ft, i + ft.length); }
        }
        if (rs.length) CSS.highlights.set('ess-find-cur', new Highlight(...rs));
    };
})();
