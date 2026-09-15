/**
 * Merge de estado de revisão espaçada entre dispositivos (R-5) — a
 * MESMA função roda no cliente (index.html, ao puxar o estado do
 * servidor pra mesclar com o local) e no backend
 * (backend/src/syncRepository.js, ao decidir se uma entrada recebida
 * substitui a que já está gravada) — importar dos dois lados em vez
 * de reescrever o critério duas vezes é o que evita a mesma divergência
 * que já aconteceu antes nesta base de código (Filtro Avançado valendo
 * só pro contador, ver shared/question-filters.js).
 *
 * Critério: por questão, mantém a entrada com lastReviewedAt mais
 * recente — nunca um blob "por dispositivo" inteiro vencendo o outro
 * (isso apagaria o progresso de qualquer questão só respondida no
 * dispositivo "perdedor"). Cada questão decide por si.
 */

// a, b: entradas no formato { stability, difficulty, dueDate,
// lastReviewedAt, lastRating } ou undefined/null. Devolve a mais
// recente das duas (ou a que existir, se só uma existir).
export function mergeReviewEntry(a, b) {
    if (!a) return b || null;
    if (!b) return a;
    return String(b.lastReviewedAt || '') > String(a.lastReviewedAt || '') ? b : a;
}

// local, remote: { [questionId]: entrada }. Devolve o merge completo —
// toda questão que existe em qualquer um dos dois lados aparece no
// resultado, com a versão mais recente.
export function mergeReviewQueues(local, remote) {
    const merged = {};
    const ids = new Set([...Object.keys(local || {}), ...Object.keys(remote || {})]);
    ids.forEach(id => { merged[id] = mergeReviewEntry(local?.[id], remote?.[id]); });
    return merged;
}

// Quais entradas de `local` são mais novas que a correspondente em
// `remote` (ou não existem lá) — é o que precisa ser efetivamente
// enviado num push, em vez de mandar a fila inteira toda vez.
export function reviewEntriesNewerThan(local, remote) {
    const changed = {};
    Object.entries(local || {}).forEach(([id, entry]) => {
        const remoteEntry = remote?.[id];
        if (!remoteEntry || String(entry.lastReviewedAt || '') > String(remoteEntry.lastReviewedAt || '')) {
            changed[id] = entry;
        }
    });
    return changed;
}
