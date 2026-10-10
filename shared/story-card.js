/**
 * Cartão de desempenho em formato Stories (1080 × 1920), desenhado em canvas.
 *
 * Direção: pôster luminoso. Fundo em malha de gradientes (violeta, magenta e
 * um toque de ciano) com grão de filme; três anéis concêntricos como
 * protagonista — acerto, meta semanal batida e volume da semana — com o
 * número de questões em serifa no centro; abaixo, um painel de vidro com a
 * ofensiva e o calendário de 16 semanas, e duas pílulas com as áreas.
 * Sem rótulos em caixa-alta; cada cor de anel reaparece na legenda, então a
 * cor carrega significado.
 *
 * O conteúdo fica entre y = 190 e y = 1760: o Instagram cobre o topo (perfil)
 * e a base (campo de resposta) com a própria interface.
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
    ink: '#080616',
    text: '#F7F4FF', muted: 'rgba(247,244,255,0.62)',
    violet: '#7C5CFF', pink: '#FF5CA8', cyan: '#3DD6F5', mint: '#5CF2B5', amber: '#FFB35C',
    good: '#6FF0B8', warn: '#FFC070',
    heat: ['rgba(255,255,255,0.07)', 'rgba(124,92,255,0.42)', '#7C5CFF', '#C06BFF', '#FF7AB6']
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

// Vidro: preenchimento translúcido com brilho no topo e borda fina.
function glass(ctx, x, y, w, h, r) {
    roundRect(ctx, x, y, w, h, r);
    const g = ctx.createLinearGradient(0, y, 0, y + h);
    g.addColorStop(0, 'rgba(255,255,255,0.13)'); g.addColorStop(1, 'rgba(255,255,255,0.045)');
    ctx.fillStyle = g; ctx.fill();
    ctx.lineWidth = 2; ctx.strokeStyle = 'rgba(255,255,255,0.16)'; ctx.stroke();
}

// Anel de progresso: trilho fraco + arco com degradê e brilho.
function ring(ctx, cx, cy, r, width, frac, from, to) {
    ctx.lineCap = 'round'; ctx.lineWidth = width;
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
    if (!(frac > 0)) return;
    const f = Math.min(1, Math.max(frac, 0.012));
    const start = -Math.PI / 2, end = start + Math.PI * 2 * f;
    let stroke;
    if (ctx.createConicGradient) {
        stroke = ctx.createConicGradient(start, cx, cy);
        stroke.addColorStop(0, from); stroke.addColorStop(Math.max(f, 0.02), to);
    } else {
        stroke = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
        stroke.addColorStop(0, from); stroke.addColorStop(1, to);
    }
    ctx.save();
    ctx.shadowColor = to; ctx.shadowBlur = 36;
    ctx.strokeStyle = stroke;
    ctx.beginPath(); ctx.arc(cx, cy, r, start, end); ctx.stroke();
    ctx.restore();
    // O degradê cônico fecha a volta e pinta a ponta inicial com a cor final: refaz a capa de saída.
    ctx.beginPath(); ctx.arc(cx, cy - r, width / 2, 0, Math.PI * 2); ctx.fillStyle = from; ctx.fill();
}

// Grão de filme estável (gerador congruente: o mesmo cartão sai igual).
function grain(ctx) {
    let seed = 7;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < 26000; i++) {
        ctx.fillStyle = rnd() > 0.5 ? 'rgba(255,255,255,0.035)' : 'rgba(0,0,0,0.05)';
        ctx.fillRect(rnd() * STORY_W, rnd() * STORY_H, 2, 2);
    }
}

export function drawStoryCard(canvas, d) {
    const ctx = canvas.getContext('2d');
    canvas.width = STORY_W; canvas.height = STORY_H;
    const F = d.fonts.base, S = d.fonts.display;
    const nf = n => n.toLocaleString('pt-BR');
    const X = 72, W = STORY_W - 2 * X, R = X + W, CX = STORY_W / 2;

    // Fundo: base escura + malha de gradientes + grão.
    ctx.fillStyle = C.ink; ctx.fillRect(0, 0, STORY_W, STORY_H);
    for (const [x, y, r, rgb, a] of [
        [160, 260, 760, '124,92,255', 0.62],
        [980, 980, 720, '255,92,168', 0.42],
        [90, 1620, 640, '61,214,245', 0.26],
        [900, 1780, 520, '124,92,255', 0.36]
    ]) {
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, `rgba(${rgb},${a})`); g.addColorStop(1, `rgba(${rgb},0)`);
        ctx.fillStyle = g; ctx.fillRect(0, 0, STORY_W, STORY_H);
    }
    grain(ctx);

    // Marca e período.
    if (d.logo) ctx.drawImage(d.logo, X, 190, 60, 60);
    text(ctx, 'trycktrack', X + (d.logo ? 82 : 0), 233, { size: 40, weight: 700, font: S, spacing: -0.4 });
    ctx.font = `600 26px ${F}`;
    const pw = ctx.measureText(d.period).width + 56;
    glass(ctx, R - pw, 196, pw, 54, 27);
    text(ctx, d.period, R - pw / 2, 232, { size: 26, weight: 600, align: 'center', font: F });

    // Protagonista: três anéis.
    const RY = 690, w = 40;
    const weekGoal = Math.max(1, d.goal * 7);
    ring(ctx, CX, RY, 350, w, d.accuracy == null ? 0 : d.accuracy / 100, C.violet, C.pink);
    ring(ctx, CX, RY, 292, w, d.hitDays / 7, C.cyan, C.mint);
    ring(ctx, CX, RY, 234, w, d.weekTotal / weekGoal, C.amber, C.pink);

    // Centro: questões da semana (a serifa se ajusta ao espaço do anel interno).
    const label = nf(d.weekTotal);
    let size = 250;
    ctx.font = `400 ${size}px ${S}`; ctx.letterSpacing = '-8px';
    const wide = ctx.measureText(label).width;
    ctx.letterSpacing = '0px';
    if (wide > 390) size = Math.floor(size * 390 / wide);
    text(ctx, label, CX, RY + size * 0.22, { size, weight: 400, align: 'center', font: S, spacing: -8 });
    text(ctx, d.weekTotal === 1 ? 'questão na semana' : 'questões na semana', CX, RY + size * 0.22 + 46, { size: 30, weight: 500, color: C.muted, align: 'center', font: F });
    if (d.weekDiff != null && d.weekDiff !== 0) {
        const up = d.weekDiff > 0;
        text(ctx, `${up ? '+' : '−'}${nf(Math.abs(d.weekDiff))} vs. semana passada`, CX, RY + size * 0.22 + 84, { size: 25, weight: 600, color: up ? C.good : C.warn, align: 'center', font: F });
    }

    // Legenda: cada coluna repete a cor do seu anel.
    const col = W / 3;
    [
        [d.accuracy == null ? '—' : `${d.accuracy}%`, 'acerto em 7 dias', C.violet, C.pink],
        [`${d.hitDays}/7`, 'dias com meta batida', C.cyan, C.mint],
        [`${nf(d.weekTotal)}/${nf(weekGoal)}`, 'da meta semanal', C.amber, C.pink]
    ].forEach(([value, caption, from, to], i) => {
        const x = X + col * i + col / 2;
        const bar = ctx.createLinearGradient(x - 28, 0, x + 28, 0);
        bar.addColorStop(0, from); bar.addColorStop(1, to);
        roundRect(ctx, x - 28, 1090, 56, 8, 4); ctx.fillStyle = bar; ctx.fill();
        text(ctx, value, x, 1170, { size: 66, weight: 400, align: 'center', font: S, spacing: -1.5 });
        text(ctx, caption, x, 1214, { size: 24, weight: 500, color: C.muted, align: 'center', font: F });
    });

    // Painel de vidro: ofensiva + calendário.
    const PY = 1262, PH = 392, PAD = 44;
    glass(ctx, X, PY, W, PH, 48);
    text(ctx, `${d.streak}`, X + PAD, PY + 112, { size: 104, weight: 400, font: S, spacing: -2 });
    ctx.font = `400 104px ${S}`; ctx.letterSpacing = '-2px';
    const sw = ctx.measureText(`${d.streak}`).width; ctx.letterSpacing = '0px';
    text(ctx, d.streak === 1 ? 'dia de ofensiva' : 'dias de ofensiva', X + PAD + sw + 20, PY + 84, { size: 30, weight: 600, font: F });
    text(ctx, `recorde de ${d.bestStreak}`, X + PAD + sw + 20, PY + 120, { size: 24, weight: 500, color: C.muted, font: F });
    text(ctx, `${d.studyDays} dias estudados${d.studyTime ? ` · ${d.studyTime}` : ''}`, R - PAD, PY + 84, { size: 26, weight: 600, align: 'right', font: F });
    text(ctx, `${nf(d.answered)} questões no total`, R - PAD, PY + 120, { size: 24, weight: 500, color: C.muted, align: 'right', font: F });
    const weeks = d.heat[0].length, gap = 8, inner = W - 2 * PAD, cell = (inner - gap * (weeks - 1)) / weeks, cellH = 22, hy = PY + 160;
    for (let r = 0; r < 7; r++) for (let c = 0; c < weeks; c++) {
        const level = d.heat[r][c];
        roundRect(ctx, X + PAD + c * (cell + gap), hy + r * (cellH + gap), cell, cellH, 7);
        ctx.fillStyle = level < 0 ? 'rgba(255,255,255,0.025)' : C.heat[level]; ctx.fill();
    }

    // Áreas: duas pílulas de vidro.
    const pills = [[d.bestArea, 'mais forte', C.good], [d.weakArea, 'pede atenção', C.warn]].filter(([a]) => a);
    const aw = pills.length === 1 ? W : (W - 20) / 2, ay = PY + PH + 24, ah = 96;
    pills.forEach(([area, caption, color], i) => {
        const x = X + i * (aw + 20);
        glass(ctx, x, ay, aw, ah, 30);
        ctx.beginPath(); ctx.arc(x + 38, ay + 36, 8, 0, Math.PI * 2); ctx.fillStyle = color; ctx.fill();
        text(ctx, caption, x + 60, ay + 43, { size: 22, weight: 500, color: C.muted, font: F });
        let name = area.name; ctx.font = `600 29px ${F}`;
        while (ctx.measureText(name).width > aw - 190 && name.length > 4) name = name.slice(0, -2);
        if (name !== area.name) name = `${name.trim()}…`;
        text(ctx, name, x + 30, ay + 78, { size: 29, weight: 600, font: F });
        text(ctx, `${area.acc}%`, x + aw - 30, ay + 66, { size: 42, weight: 400, color, align: 'right', font: S });
    });
    return canvas;
}
