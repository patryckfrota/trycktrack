/* Tela "Bullets" — escores/tabelas/critérios de decoreba, separado do
   Rapid Review (que é capítulo corrido). Overlay full-screen igual ao
   reader-view (mesma classe .reader-view/.reader-header), conteúdo
   próprio: busca + chips de área + lista de cards. Dados vêm dos
   bullets-*.js (um window.TRYCKTRACK_BULLETS_<ÁREA> por arquivo,
   carregados antes deste script). */
(function () {
    let activeArea = 'Todas';

    function allBullets() {
        return [
            ...(window.TRYCKTRACK_BULLETS_PEDIATRIA || []),
            ...(window.TRYCKTRACK_BULLETS_CM || []),
            ...(window.TRYCKTRACK_BULLETS_GO || []),
            ...(window.TRYCKTRACK_BULLETS_CIRURGIA || []),
            ...(window.TRYCKTRACK_BULLETS_PREVENTIVA || []),
        ];
    }

    function renderChips() {
        const chipsEl = document.getElementById('bulletsAreaChips');
        if (!chipsEl) return;
        const areas = ['Todas', ...new Set(allBullets().map(b => b.area))];
        chipsEl.innerHTML = areas.map(a =>
            `<div class="bullets-chip${a === activeArea ? ' is-active' : ''}" data-area="${a}">${a}</div>`
        ).join('');
        chipsEl.querySelectorAll('.bullets-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                activeArea = chip.dataset.area;
                renderChips();
                renderBullets();
            });
        });
    }

    window.renderBullets = function renderBullets() {
        const content = document.getElementById('bulletsContent');
        const searchInput = document.getElementById('bulletsSearchInput');
        if (!content) return;
        try {
            const term = (searchInput?.value || '').trim().toLowerCase();
            const filtered = allBullets().filter(b =>
                (activeArea === 'Todas' || b.area === activeArea) &&
                (!term || (b.titulo || '').toLowerCase().includes(term))
            );
            content.innerHTML = filtered.map(b => `
                <div class="bullet-card">
                    <h2 class="bullet-card-title">${b.titulo}</h2>
                    <span class="bullet-card-area-tag">${b.area}</span>${b.atualizacao2026 ? '<span class="bullet-card-update-badge">ATUALIZAÇÃO 2026</span>' : ''}
                    ${b.imagem ? `<img class="bullet-card-image is-diagram" src="${b.imagem}" alt="${b.titulo}" loading="lazy" decoding="async">` : ''}
                    ${b.html}
                </div>
            `).join('') || '<p style="color:var(--text-secondary);text-align:center;padding:30px 0;">Nenhum bullet encontrado.</p>';
        } catch (err) {
            console.error('[bullets] erro ao renderizar — provável cache desatualizado do app', err);
            content.innerHTML = '<p style="color:var(--text-secondary);text-align:center;padding:30px 0;">Não foi possível carregar os bullets. Feche e abra o app de novo — se persistir, force uma atualização (Ajustes → apagar dados do site, ou reinstalar o atalho).</p>';
        }
    };

    window.openBullets = function openBullets() {
        renderChips();
        renderBullets();
        document.getElementById('bulletsView').classList.add('active');
    };

    window.closeBullets = function closeBullets() {
        document.getElementById('bulletsView').classList.remove('active');
    };
})();
