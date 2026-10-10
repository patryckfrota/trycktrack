/**
 * Cartão de desempenho em formato Stories (1080 × 1920), desenhado em canvas.
 *
 * Direção: papel claro, uma frase em primeira pessoa como protagonista (é o
 * que a pessoa quer contar), um único gráfico — o calendário de 16 semanas em
 * pontos — e três fatos discretos. Um só acento (o violeta da marca), usado
 * apenas nos pontos. Literata para a frase e os números, Inter pequena para
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

// Quebra a frase em linhas que cabem na largura (por palavra).
function wrap(ctx, str, maxWidth) {
    const lines = [];
    let line = '';
    for (const word of str.split(' ')) {
        const next = line ? `${line} ${word}` : word;
        if (ctx.measureText(next).width > maxWidth && line) { lines.push(line); line = word; } else line = next;
    }
    if (line) lines.push(line);
    return lines;
}

function statement(d, nf) {
    if (!d.weekTotal) return 'Uma semana nova começa agora.';
    const q = `${nf(d.weekTotal)} ${d.weekTotal === 1 ? 'questão' : 'questões'}`;
    return d.accuracy == null ? `Esta semana respondi ${q}.` : `Esta semana respondi ${q} e acertei ${d.accuracy}%.`;
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

    // Protagonista: a frase.
    const size = 96, lead = 112;
    ctx.font = `400 ${size}px ${S}`; ctx.letterSpacing = '-1.5px';
    // Quebra balanceada: a menor largura que mantém o mesmo nº de linhas,
    // para nenhuma linha (como um "47%." sozinho) ficar órfã.
    const phrase = statement(d, nf);
    let lines = wrap(ctx, phrase, W);
    for (let width = W - 8; width > W * 0.5; width -= 8) {
        const tryLines = wrap(ctx, phrase, width);
        if (tryLines.length > lines.length) break;
        lines = tryLines;
    }
    ctx.letterSpacing = '0px';
    lines.forEach((line, i) => text(ctx, line, X, 470 + i * lead, { size, font: S, spacing: -1.5 }));

    // Gráfico: calendário de 16 semanas em pontos (colunas = semanas).
    const weeks = d.heat[0].length, pitch = W / weeks, dot = pitch * 0.56;
    const top = Math.max(940, 470 + lines.length * lead + 80);
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
    text(ctx, `${nf(d.studyDays)} ${d.studyDays === 1 ? 'dia' : 'dias'} de estudo`, X + W, below, { size: 28, weight: 500, color: C.muted, align: 'right', font: F });

    // Três fatos.
    const fy = below + 140, col = W / 3;
    [
        [nf(d.streak), d.streak === 1 ? 'dia seguido' : 'dias seguidos'],
        [`${d.hitDays} de 7`, 'dias na meta'],
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
