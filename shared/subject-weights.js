/**
 * Peso de cada assunto (Trilhas, eixo "inteligência contínua") — quanto
 * um assunto pesa numa banca, calculado a partir das questões reais
 * daquela banca no próprio acervo, nunca um número posto à mão. Cada
 * questão do banco principal já carrega area/assunto (ver
 * taxonomia/ROTEIRO-IMPORTACAO.md), então o peso é só a frequência
 * relativa desses dois campos dentro do recorte de banca escolhido.
 *
 * Escopo atual: só a UEPA tem prova o suficiente pra um peso por
 * assunto ser confiável (500 questões, 2022-2026, 20 por grande área
 * em ordem fixa). O ENAMED continua com o peso por grande área que já
 * existia em TRAIL_CATALOG até termos prova real dele no banco —
 * nunca inventar um peso por assunto sem questão nenhuma por trás.
 */

export function subjectKey(question) {
    const area = (question.area || '').trim();
    const assunto = (question.assunto || '').trim();
    return assunto ? `${area} > ${assunto}` : area;
}

// questions: subconjunto já filtrado pela banca (ex.: só uepa-*).
// Devolve um Map key -> { area, assunto, count, weight (soma 1 no
// total), questionIds }. Só considera questões com `assunto` — as que
// não têm (banco ainda não classificado) não entram no cálculo de peso
// nem seriam localizáveis por assunto na tela mesmo assim.
export function computeSubjectWeights(questions) {
    const classified = questions.filter((q) => q.assunto);
    const total = classified.length;
    const byKey = new Map();
    for (const q of classified) {
        const key = subjectKey(q);
        if (!byKey.has(key)) {
            byKey.set(key, { key, area: q.area, assunto: q.assunto, count: 0, questionIds: [] });
        }
        const entry = byKey.get(key);
        entry.count += 1;
        entry.questionIds.push(q.id);
    }
    for (const entry of byKey.values()) {
        entry.weight = total > 0 ? entry.count / total : 0;
    }
    return byKey;
}
