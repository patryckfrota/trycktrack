/**
 * Simulado no formato real da UEPA (fase 4 do redesign de Trilhas): 100
 * questões, exatamente 20 por grande área — não ponderado, é o formato
 * fixo da prova (ver shared/exam-areas.js). Dentro de cada bloco de 20,
 * a distribuição entre assuntos segue o peso real, calculado só com as
 * questões DAQUELE bloco (um mesmo assunto pode cair em mais de uma
 * grande área conforme o ano — ex.: "Hipertensão Arterial Sistêmica" já
 * apareceu tanto em Clínica Médica quanto em Medicina Preventiva —,
 * então agrupar por questão, não por assunto, é o único jeito de não
 * misturar bloco errado). Reaproveita allocateCountsByWeight, a mesma
 * função que já aloca vagas por incidência no Simulado ponderado
 * (weighted-sampling.js) — só troca "área" por "assunto" como a chave.
 */
import { computeSubjectWeights } from './subject-weights.js';
import { buildSubjectCatalog } from './trail-subjects.js';
import { allocateCountsByWeight } from './weighted-sampling.js';
import { grandeAreaForUepaQuestion } from './exam-areas.js';

function shuffle(items, randomFn) {
    const copy = [...items];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(randomFn() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

// questions: todo o pool da UEPA (500 questões, ou um subconjunto —
// ex. excluindo as já respondidas recentemente). perArea: 20, o
// formato real da UEPA; outra banca com outro formato passaria outro
// número. Questões fora de 1-100 em `number` (grandeAreaForUepaQuestion
// devolve null) ficam de fora — não dá pra classificar em bloco nenhum.
export function buildWeightedExam(questions, perArea = 20, randomFn = Math.random) {
    const byGrandeArea = new Map();
    for (const q of questions) {
        const grandeArea = grandeAreaForUepaQuestion(q);
        if (!grandeArea) continue;
        if (!byGrandeArea.has(grandeArea)) byGrandeArea.set(grandeArea, []);
        byGrandeArea.get(grandeArea).push(q);
    }

    const selected = [];
    for (const [, areaQuestions] of byGrandeArea) {
        const weights = computeSubjectWeights(areaQuestions);
        const subjects = buildSubjectCatalog(areaQuestions, weights);
        const poolSizeBySubject = Object.fromEntries(subjects.map((s) => [s.key, s.questionIds.length]));
        const allocated = allocateCountsByWeight(
            subjects.map((s) => ({ area: s.key, weight: s.weight })),
            poolSizeBySubject,
            perArea,
        );
        const byId = new Map(areaQuestions.map((q) => [q.id, q]));
        for (const s of subjects) {
            const take = allocated[s.key] || 0;
            if (take <= 0) continue;
            const sampled = shuffle(s.questionIds, randomFn).slice(0, take);
            for (const id of sampled) selected.push(byId.get(id));
        }
    }

    // Intercala em vez de devolver em blocos por área — o objetivo aqui
    // é praticar, não decorar a ordem do caderno real.
    return shuffle(selected, randomFn);
}
