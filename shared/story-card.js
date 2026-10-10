/**
 * Cartão de desempenho em formato Stories (1080 × 1920), desenhado em canvas.
 *
 * Direção: papel claro, uma ficha de dados em duas tonalidades como
 * protagonista (número em tinta, unidade em cinza), um único gráfico — o calendário de 16 semanas em
 * pontos — e três fatos discretos. Um só acento (o violeta da marca), usado
 * apenas nos pontos. Literata para a ficha e os números, Inter pequena para
 * as legendas; três tamanhos de texto, tudo alinhado à esquerda numa coluna.
 *
 * O conteúdo fica entre y = 200 e y = 1760: o Instagram cobre o topo (perfil)
 * e a base (campo de resposta) com a própria interface.
 *
 * data: {
 *   period, weekTotal, weekDiff, accuracy (null | %), accuracyDelta,
 *   streak, bestStreak, hitDays, goal, weekDays, heat: number[7][16] (0–4, -1 = futuro),
 *   answered, overall, studyDays, studyTime, bestArea, weakArea,
 *   fonts: { base, display }, logo: HTMLImageElement | null
 * }
 */
export const STORY_W = 1080;
export const STORY_H = 1920;

const C = {
    paper: '#EEEAF6',
    ink: '#17131F',
    muted: '#7D7690',
    accent: '91,60,196', // violeta da marca, em rgb para variar a opacidade
    empty: 'rgba(23,19,31,0.10)'
};

function text(ctx, str, x, y, { size, weight = 400, color = C.ink, align = 'left', font, spacing = 0 }) {
    ctx.font = `${weight} ${size}px ${font}`;
    ctx.fillStyle = color; ctx.textAlign = align; ctx.textBaseline = 'alphabetic';
    ctx.letterSpacing = `${spacing}px`;
    ctx.fillText(str, x, y);
    ctx.letterSpacing = '0px';
}

export function drawStoryCard(canvas, d) {
    const ctx = canvas.getContext('2d');
    canvas.width = STORY_W; canvas.height = STORY_H;
    const F = d.fonts.base, S = d.fonts.display;
    const nf = n => n.toLocaleString('pt-BR');
    const X = 112, W = STORY_W - 2 * X;

    ctx.fillStyle = C.paper; ctx.fillRect(0, 0, STORY_W, STORY_H);

    // Período.
    text(ctx, d.period, X, 250, { size: 30, weight: 500, color: C.muted, font: F });

    // Protagonista: ficha de dados em duas tonalidades — número em tinta,
    // unidade em cinza, mesma serifa e tamanho. Linhas sem amostra somem.
    const rows = [
        [nf(d.weekTotal), d.weekTotal === 1 ? 'questão' : 'questões'],
        d.accuracy == null ? null : [`${d.accuracy}%`, 'de acerto'],
        d.streak > 1 ? [nf(d.streak), 'dias seguidos'] : null
    ].filter(Boolean);
    // Encolhe a ficha inteira (não só uma linha) se a mais longa passar da coluna.
    ctx.font = `400 128px ${S}`; ctx.letterSpacing = '-3px';
    const longest = Math.max(...rows.map(([v, u]) => ctx.measureText(`${v} ${u}`).width + 128 * 0.24));
    ctx.letterSpacing = '0px';
    const size = Math.min(128, Math.floor(128 * W / longest)), lead = Math.round(size * 1.17), heroTop = 500;
    rows.forEach(([value, unit], i) => {
        const y = heroTop + i * lead;
        text(ctx, value, X - 4, y, { size, font: S, spacing: -3 });
        ctx.font = `400 ${size}px ${S}`; ctx.letterSpacing = '-3px';
        const w = ctx.measureText(value).width; ctx.letterSpacing = '0px';
        text(ctx, unit, X - 4 + w + size * 0.24, y, { size, font: S, color: C.muted, spacing: -3 });
    });

    // Gráfico: calendário de 16 semanas em pontos (colunas = semanas).
    const weeks = d.heat[0].length, pitch = W / weeks, dot = pitch * 0.56;
    const top = heroTop + (rows.length - 1) * lead + 150;
    for (let r = 0; r < 7; r++) for (let c = 0; c < weeks; c++) {
        const level = d.heat[r][c];
        if (level < 0) continue; // dias que ainda não chegaram ficam em branco
        const cx = X + pitch * c + pitch / 2, cy = top + pitch * r + pitch / 2;
        ctx.beginPath(); ctx.arc(cx, cy, dot / 2, 0, Math.PI * 2);
        ctx.fillStyle = level === 0 ? C.empty : `rgba(${C.accent},${[0, 0.3, 0.55, 0.8, 1][level]})`;
        ctx.fill();
    }
    const below = top + pitch * 7 + 52;
    text(ctx, 'Últimas 16 semanas', X, below, { size: 28, weight: 500, color: C.muted, font: F });
    // Legenda de intensidade, à direita.
    ctx.font = `500 28px ${F}`;
    const lw = ctx.measureText('mais').width, ld = 18, lg = 10;
    let lx = X + W - lw;
    text(ctx, 'mais', lx, below, { size: 28, weight: 500, color: C.muted, font: F });
    for (let level = 4; level >= 0; level--) {
        lx -= lg + ld;
        ctx.beginPath(); ctx.arc(lx + ld / 2, below - 9, ld / 2, 0, Math.PI * 2);
        ctx.fillStyle = level === 0 ? C.empty : `rgba(${C.accent},${[0, 0.3, 0.55, 0.8, 1][level]})`; ctx.fill();
    }
    text(ctx, 'menos', lx - lg, below, { size: 28, weight: 500, color: C.muted, align: 'right', font: F });

    // Três fatos.
    const fy = below + 140, col = W / 3;
    [
        [`${d.hitDays} de 7`, 'dias na meta'],
        [nf(d.studyDays), d.studyDays === 1 ? 'dia de estudo' : 'dias de estudo'],
        [nf(d.answered), 'questões no total']
    ].forEach(([value, label], i) => {
        text(ctx, value, X + col * i, fy, { size: 64, font: S, spacing: -1 });
        text(ctx, label, X + col * i, fy + 48, { size: 28, weight: 500, color: C.muted, font: F });
    });

    // Assinatura.
    const sy = 1720;
    if (d.logo) ctx.drawImage(d.logo, X, sy - 40, 48, 48);
    text(ctx, 'trycktrack', X + (d.logo ? 64 : 0), sy, { size: 36, weight: 700, font: S, spacing: -0.5 });
    return canvas;
}
