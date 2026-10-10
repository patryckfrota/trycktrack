/**
 * Cartão de desempenho em formato Stories (1080 × 1920), desenhado em canvas.
 *
 * Direção: um único protagonista — o número de questões da semana, em
 * serifa grande (Literata, a mesma da leitura do app) — e tudo o mais em
 * silêncio: sem caixas, sem rótulos em caixa-alta, hierarquia só por
 * tamanho e espaço; fios finos apenas onde separam blocos de leitura.
 * Alinhado à esquerda numa única coluna de margem 96.
 *
 * O conteúdo fica entre y = 200 e y = 1780: o Instagram cobre o topo
 * (perfil) e a base (campo de resposta) com a própria interface.
 *
 * data: {
 *   period, weekTotal, weekDiff (null | número), accuracy (null | %), accuracyDelta (null | pts),
 *   streak, bestStreak, hitDays, goal, weekDays: [{ label, n, state }],
 *   heat: number[7][16] (nível 0–4, -1 = futuro),
 *   answered, overall (%|null), studyDays, studyTime ('12h 30m'|''),
 *   bestArea: { name, acc, n } | null, weakArea: { name, acc, n } | null,
 *   fonts: { base, display }, logo: HTMLImageElement | null
 * }
 */
export const STORY_W = 1080;
export const STORY_H = 1920;

const C = {
    bg: '#0E0C15', bgTop: '#17122A',
    text: '#F4F1FA', muted: '#8F88A8', faint: 'rgba(244,241,250,0.12)',
    accent: '#B9A6FF', good: '#6FD6A3', warn: '#F0B766',
    heat: ['rgba(244,241,250,0.07)', 'rgba(185,166,255,0.30)', 'rgba(185,166,255,0.55)', 'rgba(185,166,255,0.80)', '#D6CBFF']
};

function roundRect(ctx, x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
}

function text(ctx, str, x, y, { size, weight = 500, color = C.text, align = 'left', font, spacing = 0 }) {
    ctx.font = `${weight} ${size}px ${font}`;
    ctx.fillStyle = color; ctx.textAlign = align; ctx.textBaseline = 'alphabetic';
    ctx.letterSpacing = `${spacing}px`;
    ctx.fillText(str, x, y);
    ctx.letterSpacing = '0px';
}

const hairline = (ctx, x, y, w) => { ctx.fillStyle = C.faint; ctx.fillRect(x, y, w, 2); };

function trend(value, word) {
    if (value == null) return null;
    if (value === 0) return { str: 'igual ao anterior', color: C.muted };
    return { str: `${value > 0 ? '+' : '−'}${Math.abs(value)}${word} vs. anterior`, color: value > 0 ? C.good : C.warn };
}

export function drawStoryCard(canvas, d) {
    const ctx = canvas.getContext('2d');
    canvas.width = STORY_W; canvas.height = STORY_H;
    const F = d.fonts.base, S = d.fonts.display;
    const nf = n => n.toLocaleString('pt-BR');
    const X = 96, W = STORY_W - 2 * X, R = X + W;

    // Fundo: um degradê quase imperceptível e um único brilho no canto superior.
    const bg = ctx.createLinearGradient(0, 0, 0, STORY_H);
    bg.addColorStop(0, C.bgTop); bg.addColorStop(0.55, C.bg); bg.addColorStop(1, C.bg);
    ctx.fillStyle = bg; ctx.fillRect(0, 0, STORY_W, STORY_H);
    const glow = ctx.createRadialGradient(STORY_W, 0, 0, STORY_W, 0, 900);
    glow.addColorStop(0, 'rgba(124,92,255,0.22)'); glow.addColorStop(1, 'rgba(124,92,255,0)');
    ctx.fillStyle = glow; ctx.fillRect(0, 0, STORY_W, STORY_H);

    // Marca e período.
    if (d.logo) ctx.drawImage(d.logo, X, 196, 56, 56);
    text(ctx, 'trycktrack', X + (d.logo ? 76 : 0), 237, { size: 38, weight: 700, font: S, spacing: -0.4 });
    text(ctx, d.period, R, 237, { size: 28, weight: 500, color: C.muted, align: 'right', font: F });

    // Protagonista: questões da semana.
    text(ctx, nf(d.weekTotal), X - 8, 590, { size: 300, weight: 400, font: S, spacing: -10 });
    text(ctx, d.weekTotal === 1 ? 'questão respondida nesta semana' : 'questões respondidas nesta semana', X, 656, { size: 36, weight: 500, font: F });
    if (d.weekDiff != null) {
        const up = d.weekDiff > 0, same = d.weekDiff === 0;
        text(ctx, same ? 'o mesmo da semana passada' : `${up ? '+' : '−'}${nf(Math.abs(d.weekDiff))} vs. semana passada`, X, 704, { size: 30, weight: 500, color: same ? C.muted : up ? C.good : C.warn, font: F });
    }

    // Dias da semana: sete barras finas ocupando a largura da coluna.
    const maxN = Math.max(d.goal, ...d.weekDays.map(x => x.n), 1);
    const slot = W / 7, bw = 44, base = 880, bh = 96;
    d.weekDays.forEach((day, i) => {
        const x = X + slot * i + (slot - bw) / 2;
        roundRect(ctx, x, base - bh, bw, bh, 12); ctx.fillStyle = 'rgba(244,241,250,0.06)'; ctx.fill();
        if (day.state !== 'future' && day.n) {
            const h = Math.max(12, bh * Math.min(1, day.n / maxN));
            roundRect(ctx, x, base - h, bw, h, 12); ctx.fillStyle = day.n >= d.goal ? C.good : C.accent; ctx.fill();
        }
        text(ctx, day.label, x + bw / 2, base + 42, { size: 24, weight: day.isToday ? 700 : 500, color: day.isToday ? C.text : C.muted, align: 'center', font: F });
    });

    // Três números de apoio, em colunas iguais.
    hairline(ctx, X, 976, W);
    const col = W / 3;
    const accT = d.accuracy == null ? null : trend(d.accuracyDelta, d.accuracyDelta === 1 || d.accuracyDelta === -1 ? ' ponto' : ' pontos');
    [
        [d.accuracy == null ? '—' : `${d.accuracy}%`, 'acerto em 7 dias', accT?.str ?? (d.accuracy == null ? 'poucas respostas' : ''), accT?.color],
        [`${d.streak}`, d.streak === 1 ? 'dia de ofensiva' : 'dias de ofensiva', `recorde de ${d.bestStreak}`, C.muted],
        [`${d.hitDays}/7`, 'dias com meta batida', `meta de ${nf(d.goal)} por dia`, C.muted]
    ].forEach(([value, label, sub, color], i) => {
        const x = X + col * i;
        text(ctx, value, x, 1096, { size: 104, weight: 400, font: S, spacing: -2 });
        text(ctx, label, x, 1146, { size: 28, weight: 500, font: F });
        if (sub) text(ctx, sub, x, 1186, { size: 23, weight: 500, color: color || C.muted, font: F });
    });

    // Constância: calendário de 16 semanas.
    hairline(ctx, X, 1250, W);
    text(ctx, 'Constância', X, 1316, { size: 34, weight: 600, font: F });
    text(ctx, `${d.studyDays} dias estudados${d.studyTime ? ` · ${d.studyTime}` : ''}`, R, 1316, { size: 26, weight: 500, color: C.muted, align: 'right', font: F });
    const weeks = d.heat[0].length, gap = 8, cell = (W - gap * (weeks - 1)) / weeks, cellH = 26, hy = 1352;
    for (let r = 0; r < 7; r++) for (let c = 0; c < weeks; c++) {
        const level = d.heat[r][c];
        roundRect(ctx, X + c * (cell + gap), hy + r * (cellH + gap), cell, cellH, 8);
        ctx.fillStyle = level < 0 ? 'rgba(244,241,250,0.03)' : C.heat[level]; ctx.fill();
    }

    // Áreas: duas linhas de leitura, só quando há amostra.
    const rows = [[d.bestArea, 'Mais forte', C.good], [d.weakArea, 'Pede atenção', C.warn]].filter(([a]) => a);
    let y = 1650;
    if (rows.length) hairline(ctx, X, 1590, W);
    for (const [area, label, color] of rows) {
        text(ctx, label, X, y, { size: 26, weight: 500, color: C.muted, font: F });
        let name = area.name; ctx.font = `600 32px ${F}`;
        while (ctx.measureText(name).width > 440 && name.length > 4) name = name.slice(0, -2);
        if (name !== area.name) name = `${name.trim()}…`;
        text(ctx, name, X + 250, y, { size: 32, weight: 600, font: F });
        text(ctx, `${area.acc}%`, R, y, { size: 36, weight: 600, color, align: 'right', font: F });
        y += 64;
    }

    // Rodapé: total acumulado.
    text(ctx, `${nf(d.answered)} questões no total${d.overall == null ? '' : ` · ${d.overall}% de acerto`}`, X, 1792, { size: 26, weight: 500, color: C.muted, font: F });
    return canvas;
}
