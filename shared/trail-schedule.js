/**
 * Cronograma da Trilha até a prova (painel da trilha, R-9). Distribui,
 * dia a dia, as revisões que já vencem (fila FSRS por questão) e os
 * assuntos novos (na ordem de prioridade de trail-subjects.js) dentro da
 * capacidade diária do aluno (meta diária de questões).
 *
 * As revisões FUTURAS de um assunto que ainda nem foi estudado não
 * existem na fila — são estimadas: um assunto aberto no dia d gera
 * revisões previstas em d+3, d+10 e d+30 (a mesma ordem de grandeza dos
 * primeiros intervalos do motor de spaced-repetition.js para respostas
 * "Bom"). É estimativa, e a tela precisa dizer isso; o dado real
 * substitui a previsão assim que o assunto é estudado.
 */
import { prioritizeNewSubjects } from './trail-subjects.js';
import { isFinalStretch, isLowWeightForFinalStretch } from './trail-pace.js';

export const PROJECTED_REVIEW_OFFSETS = [3, 10, 30];
const MAX_DAYS = 365;

export function addDaysIso(iso, days) {
    const d = new Date(`${iso}T00:00:00Z`);
    d.setUTCDate(d.getUTCDate() + days);
    return d.toISOString().slice(0, 10);
}

function daysBetween(fromIso, toIso) {
    return Math.round((Date.parse(`${toIso}T00:00:00Z`) - Date.parse(`${fromIso}T00:00:00Z`)) / 86400000);
}

// examDateIso opcional: sem data de prova, planeja `horizonDays` à frente.
// dailyCapacity: questões por dia (meta diária). batchSize: questões por
// assunto novo na primeira bateria.
export function buildSchedule({
    subjectsWithStatus, reviewQueue, todayIso, examDateIso = null,
    dailyCapacity = 20, goal = 0.8, horizonDays = 28, batchSize = 10,
}) {
    const toExam = examDateIso ? daysBetween(todayIso, examDateIso) : null;
    const hasExam = toExam !== null && toExam >= 0;
    const span = Math.min(MAX_DAYS, hasExam ? toExam + 1 : horizonDays);

    const days = Array.from({ length: span }, (_, i) => {
        const date = addDaysIso(todayIso, i);
        return {
            date,
            reviews: 0,
            projectedReviews: 0,
            newSubjects: [],
            load: 0,
            overload: false,
            examDay: hasExam && date === examDateIso,
            finalStretch: hasExam && isFinalStretch(toExam - i),
        };
    });
    const byDate = new Map(days.map((d) => [d.date, d]));

    // Revisões reais: tudo que está na fila e pertence ao recorte; o que
    // já venceu (dueDate < hoje) cai no dia de hoje.
    const ids = new Set(subjectsWithStatus.flatMap((s) => s.questionIds));
    for (const id of ids) {
        const entry = reviewQueue[id];
        if (!entry?.dueDate) continue;
        const bucket = byDate.get(entry.dueDate < todayIso ? todayIso : entry.dueDate);
        if (bucket) bucket.reviews += 1;
    }

    const dayLoad = (d) => d.reviews + d.projectedReviews + d.newSubjects.reduce((sum, s) => sum + s.questions, 0);
    // Nivelamento de carga: só abre um assunto hoje se as revisões que
    // ele vai gerar (+3/+10/+30) também couberem nos dias delas. Sem isso
    // o plano abre 2 assuntos por dia no começo e explode no meio (visto
    // com os dados reais da UEPA: picos de 60+ questões num dia de meta
    // 20) — bonito na primeira semana, impossível na quinta.
    const followUpsFit = (day, questions) => PROJECTED_REVIEW_OFFSETS.every((offset) => {
        const follow = byDate.get(addDaysIso(day.date, offset));
        return !follow || follow.examDay || dayLoad(follow) + questions <= dailyCapacity;
    });

    const queue = prioritizeNewSubjects(subjectsWithStatus, goal);
    const skippedLowWeight = new Set();
    let next = 0;
    for (const day of days) {
        if (day.examDay) continue; // não estuda assunto novo no dia da prova
        let free = dailyCapacity - day.reviews - day.projectedReviews;
        while (free > 0 && next < queue.length) {
            const subject = queue[next];
            if (day.finalStretch && isLowWeightForFinalStretch(subject, subjectsWithStatus)) {
                // Reta final: assunto de peso baixo deixa de ser aberto de
                // propósito — contado à parte, não como "não coube".
                skippedLowWeight.add(subject.key);
                next += 1;
                continue;
            }
            const questions = Math.min(batchSize, subject.questionIds.length);
            // Só entra se couber inteiro no que sobra do dia — o plano
            // nunca cria, ele mesmo, um dia acima da meta. Exceção: um dia
            // ainda vazio aceita o assunto mesmo com a meta menor que a
            // bateria, senão uma meta de 5/dia nunca abriria nada.
            const dayIsEmpty = free === dailyCapacity && !day.newSubjects.length;
            if (questions > free && !dayIsEmpty) break;
            if (!followUpsFit(day, questions)) break; // tenta de novo no dia seguinte
            day.newSubjects.push({ key: subject.key, area: subject.area, assunto: subject.assunto, weight: subject.weight, questions });
            free -= questions;
            next += 1;
            for (const offset of PROJECTED_REVIEW_OFFSETS) {
                const follow = byDate.get(addDaysIso(day.date, offset));
                if (follow) follow.projectedReviews += questions;
            }
        }
    }

    let lastNewDay = null;
    for (const day of days) {
        const newQuestions = day.newSubjects.reduce((sum, s) => sum + s.questions, 0);
        day.load = day.reviews + day.projectedReviews + newQuestions;
        day.overload = day.load > dailyCapacity;
        if (day.newSubjects.length) lastNewDay = day.date;
    }

    const scheduledKeys = new Set(days.flatMap((d) => d.newSubjects.map((s) => s.key)));
    const unscheduled = queue.filter((s) => !scheduledKeys.has(s.key) && !skippedLowWeight.has(s.key));
    const newWeight = queue.reduce((sum, s) => sum + s.weight, 0);
    const scheduledWeight = queue.filter((s) => scheduledKeys.has(s.key)).reduce((sum, s) => sum + s.weight, 0);
    // "Tudo coberto" só quando NENHUM assunto novo ficou de fora — nem
    // por falta de espaço, nem pulado na reta final. Pular os de peso
    // baixo na reta final é a estratégia certa quando falta tempo, mas
    // ainda são assuntos não estudados, e o resumo não pode esconder isso.
    const allCovered = unscheduled.length === 0 && skippedLowWeight.size === 0;
    return {
        days,
        summary: {
            hasExam,
            subjectsScheduled: scheduledKeys.size,
            subjectsLeft: unscheduled.length,
            skippedLowWeight: skippedLowWeight.size,
            // Fração do peso dos assuntos novos que entra no plano (1 = tudo).
            weightCovered: newWeight > 0 ? scheduledWeight / newWeight : 1,
            allCovered,
            coveredAllBy: allCovered ? lastNewDay : null,
            overloadDays: days.filter((d) => d.overload).length,
        },
    };
}

// Menor meta diária (de 5 em 5, até 200) com que todos os assuntos novos
// cabem antes da prova. null se nem 200/dia resolve, ou sem data de prova.
export function minimumDailyCapacity(options) {
    if (!options.examDateIso) return null;
    for (let capacity = 5; capacity <= 200; capacity += 5) {
        if (buildSchedule({ ...options, dailyCapacity: capacity }).summary.allCovered) return capacity;
    }
    return null;
}
