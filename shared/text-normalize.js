/**
 * Normalização de texto compartilhada entre shared/question-filters.js
 * (busca simples por substring) e shared/question-search.js (índice
 * invertido) — extraída pra cá só pra evitar que os dois módulos
 * importem um do outro.
 */

// Minúsculas + sem acento, pra "sindrome de guillain barre" achar
// "síndrome de Guillain-Barré" — não é busca fonética nem por radical,
// só normalização suficiente pro caso comum (acento esquecido/trocado,
// maiúscula/minúscula). Mesma técnica de shared/scoring.js
// (normalizeOsceChatText): NFD separa a letra da marca de acento, o
// range ̀-ͯ remove só as marcas.
export function normalizeSearchText(value) {
    return String(value || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}
