/**
 * Cartão de desempenho em formato Stories (1080 × 1920), desenhado em canvas.
 * O conteúdo importante fica entre y = 210 e y = 1700: o Instagram cobre o
 * topo (perfil) e a base (campo de resposta) com a própria interface.
 *
 * data: {
 *   period, weekTotal, weekDiff (null | número), accuracy (null | %), accuracyDelta (null | pts),
 *   streak, bestStreak, hitDays, goal, weekDays: [{ label, n, state }],
 *   heat: number[7][16] (nível 0–4, -1 = futuro), months: [{ label, n, partial }],
 *   answered, overall (%|null), studyDays, studyTime ('12h 30m'|''),
 *   bestArea: { name, acc, n } | null, weakArea: { name, acc, n } | null,
 *   fonts: { base, display }, logo: HTMLImageElement | null
 * }
 */
export const STORY_W = 1080;
export const STORY_H = 1920;

const C = {
    bg0: '#100e18', bg1: '#1b1630', glow: '#7c5cff',
    panel: 'rgba(255,255,255,0.055)', stroke: 'rgba(255,255,255,0.10)',
    text: '#F3F0FB', muted: '#A9A2C0', accent: '#B9A6FF', good: '#5FD39A', warn: '#F2B25F',
    heat: ['rgba(255,255,255,0.07)', 'rgba(185,166,255,0.28)', 'rgba(185,166,255,0.52)', 'rgba(185,166,255,0.78)', '#CDBFFF']
};

function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
}

function panel(ctx, x, y, w, h) {
    roundRect(ctx, x, y, w, h, 36);
    ctx.fillStyle = C.panel; ctx.fill();
    ctx.lineWidth = 2; ctx.strokeStyle = C.stroke; ctx.stroke();
}

function text(ctx, str, x, y, { size, weight = 600, color = C.text, align = 'left', font, spacing = 0 }) {
    ctx.font = `${weight} ${size}px ${font}`;
    ctx.fillStyle = color; ctx.textAlign = align; ctx.textBaseline = 'alphabetic';
    ctx.letterSpacing = `${spacing}px`;
    ctx.fillText(str, x, y);
    ctx.letterSpacing = '0px';
}

const label = (ctx, str, x, y, font, align = 'left') => text(ctx, str.toUpperCase(), x, y, { size: 24, weight: 700, color: C.muted, spacing: 3, font, align });

function delta(value, unit) {
    if (value == null) return null;
    if (value === 0) return { str: `igual ${unit.same}`, color: C.muted };
    return { str: `${value > 0 ? '+' : '−'}${Math.abs(value)} ${unit.word ? `${unit.word} ` : ''}${unit.vs}`, color: value > 0 ? C.good : C.warn };
}

export function drawStoryCard(canvas, d) {
    const ctx = canvas.getContext('2d');
    canvas.width = STORY_W; canvas.height = STORY_H;
    const F = d.fonts.base, D = d.fonts.display;
    const nf = n => n.toLocaleString('pt-BR');

    // Fundo: degradê + brilho lavanda no alto e outro, menor, embaixo.
    const bg = ctx.createLinearGradient(0, 0, 0, STORY_H);
    bg.addColorStop(0, C.bg1); bg.addColorStop(1, C.bg0);
    ctx.fillStyle = bg; ctx.fillRect(0, 0, STORY_W, STORY_H);
    for (const [cx, cy, r, a] of [[880, 160, 760, 0.34], [120, 1780, 620, 0.2]]) {
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, `rgba(124,92,255,${a})`); g.addColorStop(1, 'rgba(124,92,255,0)');
        ctx.fillStyle = g; ctx.fillRect(0, 0, STORY_W, STORY_H);
    }

    const X = 72, W = STORY_W - 144;

    // Cabeçalho: marca + período.
    if (d.logo) ctx.drawImage(d.logo, X, 196, 68, 68);
    text(ctx, 'trycktrack', X + (d.logo ? 88 : 0), 246, { size: 48, weight: 700, font: D });
    text(ctx, d.period, STORY_W - X, 246, { size: 28, weight: 600, color: C.muted, align: 'right', font: F });

    // Destaque: questões da semana.
    let y = 300;
    panel(ctx, X, y, W, 300);
    label(ctx, 'Questões nesta semana', X + 48, y + 60, F);
    text(ctx, nf(d.weekTotal), X + 48, y + 200, { size: 150, weight: 800, font: F, color: C.text });
    const wd = delta(d.weekDiff, { word: '', vs: 'vs. semana passada', same: 'à semana passada' });
    if (wd) text(ctx, wd.str, X + 48, y + 258, { size: 30, weight: 600, color: wd.color, font: F });
    // Barras por dia da semana (domingo a sábado) à direita.
    const maxN = Math.max(d.goal, ...d.weekDays.map(x => x.n), 1);
    const bx = X + W - 48 - 7 * 52, by = y + 222, bh = 124;
    d.weekDays.forEach((day, i) => {
        const x = bx + i * 52, h = day.state === 'future' ? 0 : Math.max(day.n ? 10 : 0, bh * (day.n / maxN));
        roundRect(ctx, x, by - bh, 32, bh, 10); ctx.fillStyle = 'rgba(255,255,255,0.07)'; ctx.fill();
        if (h) { roundRect(ctx, x, by - h, 32, h, 10); ctx.fillStyle = day.n >= d.goal ? C.good : C.accent; ctx.fill(); }
        text(ctx, day.label, x + 16, by + 34, { size: 22, weight: 700, color: C.muted, align: 'center', font: F });
    });

    // Quatro números: acerto, ofensiva, meta, total.
    y += 300 + 20;
    const cw = (W - 20) / 2, ch = 170;
    const accD = d.accuracy == null ? null : delta(d.accuracyDelta, { word: d.accuracyDelta === 1 || d.accuracyDelta === -1 ? 'ponto' : 'pontos', vs: 'vs. semana anterior', same: 'à semana anterior' });
    const tiles = [
        ['Acerto em 7 dias', d.accuracy == null ? '—' : `${d.accuracy}%`, accD?.str || (d.accuracy == null ? 'poucas respostas ainda' : ''), accD?.color || C.muted],
        ['Ofensiva', `${d.streak}`, `${d.streak === 1 ? 'dia' : 'dias'} seguidos · recorde ${d.bestStreak}`, C.muted],
        ['Meta diária batida', `${d.hitDays}/7`, `meta de ${nf(d.goal)} por dia`, C.muted],
        ['Total respondido', nf(d.answered), d.overall == null ? '' : `${d.overall}% de acerto geral`, C.muted]
    ];
    tiles.forEach(([lab, value, sub, color], i) => {
        const x = X + (i % 2) * (cw + 20), ty = y + Math.floor(i / 2) * (ch + 20);
        panel(ctx, x, ty, cw, ch);
        label(ctx, lab, x + 36, ty + 52, F);
        text(ctx, value, x + 36, ty + 116, { size: 70, weight: 800, font: F });
        if (sub) text(ctx, sub, x + 36, ty + 152, { size: 24, weight: 600, color, font: F });
    });

    // Calendário de constância (16 semanas).
    y += 2 * ch + 20 + 20;
    const heatH = 372;
    panel(ctx, X, y, W, heatH);
    label(ctx, 'Constância · 16 semanas', X + 40, y + 60, F);
    text(ctx, `${d.studyDays} dias estudados${d.studyTime ? ` · ${d.studyTime}` : ''}`, X + W - 40, y + 60, { size: 24, weight: 600, color: C.muted, align: 'right', font: F });
    const weeks = d.heat[0].length, gap = 8, cell = Math.floor((W - 80 - gap * (weeks - 1)) / weeks), cellH = 30;
    const hx = X + 40 + Math.floor((W - 80 - (cell * weeks + gap * (weeks - 1))) / 2), hy = y + 92;
    for (let r = 0; r < 7; r++) for (let c = 0; c < weeks; c++) {
        const level = d.heat[r][c];
        roundRect(ctx, hx + c * (cell + gap), hy + r * (cellH + gap), cell, cellH, 9);
        ctx.fillStyle = level < 0 ? 'rgba(255,255,255,0.025)' : C.heat[level]; ctx.fill();
    }

    // Evolução mensal (barras de questões).
    y += heatH + 20;
    const evoH = 262;
    panel(ctx, X, y, W, evoH);
    label(ctx, 'Questões por mês', X + 40, y + 60, F);
    const mx = Math.max(...d.months.map(m => m.n), 1);
    const slot = (W - 80) / d.months.length, base = y + evoH - 56, maxH = 100;
    d.months.forEach((m, i) => {
        const cx = X + 40 + slot * (i + 0.5), h = m.n ? Math.max(10, maxH * (m.n / mx)) : 0, bw = Math.min(68, slot * 0.6);
        roundRect(ctx, cx - bw / 2, base - maxH, bw, maxH, 14); ctx.fillStyle = 'rgba(255,255,255,0.05)'; ctx.fill();
        if (h) { roundRect(ctx, cx - bw / 2, base - h, bw, h, 14); ctx.fillStyle = m.partial ? 'rgba(185,166,255,0.6)' : C.accent; ctx.fill(); }
        if (m.n) text(ctx, nf(m.n), cx, base - h - 12, { size: 24, weight: 700, align: 'center', font: F });
        text(ctx, m.label, cx, base + 36, { size: 24, weight: 600, color: C.muted, align: 'center', font: F });
    });

    // Áreas: mais forte e a que pede atenção (só quando há amostra).
    y += evoH + 20;
    if (d.bestArea || d.weakArea) {
        const aw = (W - 20) / 2, ah = 124;
        [[d.bestArea, 'Área mais forte', C.good], [d.weakArea, 'Pede atenção', C.warn]].forEach(([area, lab, color], i) => {
            const x = X + i * (aw + 20);
            panel(ctx, x, y, aw, ah);
            label(ctx, lab, x + 32, y + 44, F);
            if (!area) { text(ctx, '—', x + 32, y + 96, { size: 36, weight: 700, color: C.muted, font: F }); return; }
            let name = area.name; ctx.font = `700 34px ${F}`;
            while (ctx.measureText(name).width > aw - 150 && name.length > 4) name = name.slice(0, -2);
            if (name !== area.name) name = `${name.trim()}…`;
            text(ctx, name, x + 32, y + 96, { size: 32, weight: 700, font: F });
            text(ctx, `${area.acc}%`, x + aw - 32, y + 96, { size: 44, weight: 800, color, align: 'right', font: F });
        });
    }

    return canvas;
}
