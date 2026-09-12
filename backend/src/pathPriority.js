// Reexporta o módulo compartilhado com o cliente (index.html, via ponte
// em window.calculatePathPriority) — ver shared/trail-priority.js para a
// implementação real e o histórico de por que isto deixou de ser uma
// cópia própria do backend.
export { calculatePathPriority } from '../../shared/trail-priority.js';
