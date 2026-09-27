/**
 * Cronograma da Trilha até a prova (painel da trilha, R-9). Distribui,
 * dia a dia, as revisões que já vencem (fila FSRS por questão) e os
 * BLOCOS de conteúdo novo (trail-blocks.js, R-10: assuntos da mesma área
 * agrupados numa bateria coerente, no máximo `maxNewBlocksPerDay` por
 * dia) dentro da capacidade diária do aluno (meta diária de questões).
 *
 * As revisões FUTURAS de um bloco que ainda nem foi estudado não
 * existem na fila — são estimadas: um bloco aberto no dia d gera
 * revisões previstas em d+3, d+10 e d+30 (a mesma ordem de grandeza dos
 * primeiros intervalos do motor de spaced-repetition.js para respostas
 * "Bom"). É estimativa, e a tela precisa dizer isso; o dado real
 * substitui a previsão assim que o assunto é estudado.
 */
import { buildStudyBlocks, studyCandidates } from './trail-blocks.js';
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
// dailyCapacity: questões por dia (meta diária). blockSize: tamanho-alvo
// de um bloco novo (ver buildStudyBlocks); maxNewBlocksPerDay: quantos
// blocos novos no máximo num dia — mais que isso vira fragmentação.
export function buildSchedule({
    subjectsWithStatus, reviewQueue, todayIso, examDateIso = null,
    dailyCapacity = 20, goal = 0.8, horizonDays = 28, blockSize = 12, maxNewBlocksPerDay = 2,
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
            newBlocks: [],
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

    const newQuestionsOf = (d) => d.newBlocks.reduce((sum, b) => sum + b.questions, 0);
    const dayLoad = (d) => d.reviews + d.projectedReviews + newQuestionsOf(d);
    // Nivelamento de carga: só abre um bloco hoje se as revisões que ele
    // vai gerar (+3/+10/+30) também couberem nos dias delas. Sem isso o
    // plano abre muito conteúdo no começo e explode no meio (visto com os
    // dados reais da UEPA: picos de 60+ questões num dia de meta 20).
    const followUpsFit = (day, questions) => PROJECTED_REVIEW_OFFSETS.every((offset) => {
        const follow = byDate.get(addDaysIso(day.date, offset));
        return !follow || follow.examDay || dayLoad(follow) + questions <= dailyCapacity;
    });

    // Candidatos: todo assunto com questão ainda não vista (novos e
    // continuação dos já iniciados), por prioridade — ver trail-blocks.js.
    const blocks = buildStudyBlocks(studyCandidates(subjectsWithStatus, reviewQueue, goal), { targetSize: blockSize });
    const skippedLowWeight = new Set(); // chaves de assunto
    let next = 0;
    for (const day of days) {
        if (day.examDay) continue; // não estuda conteúdo novo no dia da prova
        while (day.newBlocks.length < maxNewBlocksPerDay && next < blocks.length) {
            const block = blocks[next];
            // Reta final: bloco puxado por assunto de peso baixo não é
            // mais aberto — contado à parte, não como "não coube".
            if (day.finalStretch && isLowWeightForFinalStretch(block.subjects[0], subjectsWithStatus)) {
                block.subjects.forEach((s) => skippedLowWeight.add(s.key));
                next += 1;
                continue;
            }
            const free = dailyCapacity - dayLoad(day);
            // Só entra se couber inteiro no que sobra do dia — o plano nunca
            // cria, ele mesmo, um dia acima da meta. Exceção: um dia ainda
            // vazio aceita o bloco mesmo com a meta menor que ele, senão uma
            // meta baixa nunca abriria nada.
            const dayIsEmpty = dayLoad(day) === 0;
            if (block.questions > free && !dayIsEmpty) break;
            if (!followUpsFit(day, block.questions)) break; // tenta no dia seguinte
            day.newBlocks.push(block);
            next += 1;
            for (const offset of PROJECTED_REVIEW_OFFSETS) {
                const follow = byDate.get(addDaysIso(day.date, offset));
                if (follow) follow.projectedReviews += block.questions;
            }
        }
    }

    let lastNewDay = null;
    for (const day of days) {
        day.load = dayLoad(day);
        day.overload = day.load > dailyCapacity;
        if (day.newBlocks.length) lastNewDay = day.date;
    }

    // Cobertura e "tudo coberto" são sobre ASSUNTOS NUNCA ESTUDADOS (a
    // continuação de um já iniciado não conta como assunto novo).
    const newSubjects = subjectsWithStatus.filter((s) => s.status.studied === 0 && s.questionIds.length > 0);
    const scheduledKeys = new Set(days.flatMap((d) => d.newBlocks.flatMap((b) => b.subjects.map((s) => s.key))));
    const unscheduled = newSubjects.filter((s) => !scheduledKeys.has(s.key) && !skippedLowWeight.has(s.key));
    const newWeight = newSubjects.reduce((sum, s) => sum + s.weight, 0);
    const scheduledWeight = newSubjects.filter((s) => scheduledKeys.has(s.key)).reduce((sum, s) => sum + s.weight, 0);
    // "Tudo coberto" só quando NENHUM assunto novo ficou de fora — nem por
    // falta de espaço, nem pulado na reta final.
    const allCovered = unscheduled.length === 0 && skippedLowWeight.size === 0;
    return {
        days,
        summary: {
            hasExam,
            blocksScheduled: days.reduce((sum, d) => sum + d.newBlocks.length, 0),
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
