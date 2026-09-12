/**
 * Funções puras de pontuação/casamento de texto usadas pelo cliente
 * (index.html, via window.isQuestionAnswerCorrect /
 * window.matchPatientResponse — ver ponte no <script type="module">
 * do Firebase). Extraídas pra cá pra poderem ser testadas com
 * `node --test` sem precisar de navegador — as duas já foram origem
 * de bugs reais corrigidos nesta auditoria (questão discursiva sempre
 * contando como erro; perguntas legítimas do chat do paciente caindo
 * no "não entendi").
 */

// Questão discursiva não tem gabarito de letra — não é certo nem
// errado, é "sem pontuação" (null). Quem chama precisa tratar os três
// estados: true, false e null.
export function isQuestionAnswerCorrect(question, answer) {
    if (question?.questionType === 'discursive') return null;
    return Boolean(question?.annulled) || answer === question?.answer;
}

const OSCE_CHAT_STOPWORDS = new Set(['a', 'o', 'as', 'os', 'de', 'da', 'do', 'das', 'dos', 'em', 'com', 'para', 'por', 'sobre', 'que', 'e', 'ou', 'se', 'um', 'uma', 'no', 'na', 'nos', 'nas', 'ao', 'aos', 'à', 'às', 'é', 'foi', 'ser', 'tem', 'há', 'esta', 'está', 'isso', 'isto', 'qual', 'quais', 'como', 'voce', 'você']);

export function normalizeOsceChatText(text) {
    return String(text || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9\s]/g, ' ');
}

export function osceChatWords(text) {
    return normalizeOsceChatText(text).split(/\s+/).filter(word => word.length >= 2 && !OSCE_CHAT_STOPWORDS.has(word));
}

// Casa a pergunta digitada com o "trigger" mais parecido do roteiro da
// paciente (sem IA — comparação de palavras-chave). Os triggers são
// frases longas ("Pergunta sobre início, duração..."), então exigir
// um % alto de palavras em comum penaliza demais perguntas curtas e
// objetivas — o critério aqui é: pelo menos duas palavras em comum,
// ou uma palavra só se ela for suficientemente específica (>= 4
// letras, não um termo genérico).
export function matchPatientResponse(responses, question) {
    const qWords = osceChatWords(question);
    if (!qWords.length) return null;
    let best = null, bestMatched = [];
    for (const item of responses || []) {
        const tWords = osceChatWords(item.trigger);
        if (!tWords.length) continue;
        const matched = qWords.filter(word => tWords.some(t => t.includes(word) || word.includes(t)));
        if (matched.length > bestMatched.length) { bestMatched = matched; best = item; }
    }
    const hasStrongWord = bestMatched.some(word => word.length >= 4);
    if (bestMatched.length >= 2 || (bestMatched.length >= 1 && hasStrongWord)) return best;
    return null;
}
