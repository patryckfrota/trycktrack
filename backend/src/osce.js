import { z } from 'zod';

export const osceModeSchema = z.enum(['EVALUATOR', 'CANDIDATE']);
export const osceEventTypeSchema = z.enum(['STATION_STARTED','CANDIDATE_MESSAGE','PATIENT_RESPONSE','PHYSICAL_EXAM_REQUESTED','PHYSICAL_EXAM_RESULT','TEST_REQUESTED','TEST_RESULT_RELEASED','MEDICATION_ORDERED','PROCEDURE_PERFORMED','CLINICAL_DECISION','STATION_FINISHED','STATION_TIMEOUT']);

export const stationContentSchema = z.object({
  metadata: z.object({ area: z.string().optional(), theme: z.string().optional(), subtheme: z.string().optional(), areaSlug: z.string().optional(), themeCode: z.string().optional(), subthemeSlug: z.string().optional(), format: z.string(), difficulty: z.string().optional(), estimatedMinutes: z.number().nonnegative().optional() }),
  overview: z.object({ environment: z.string().optional(), materials: z.array(z.string()).default([]) }).default({ materials: [] }),
  doorInstructions: z.object({ patientName: z.string().optional(), age: z.union([z.string(), z.number()]).optional(), chiefComplaint: z.string().optional(), triageData: z.record(z.unknown()).default({}), candidateTasks: z.array(z.union([z.string(), z.object({ id: z.string(), title: z.string(), instructions: z.string().optional() })])).default([]) }),
  patientScript: z.object({ profile: z.record(z.unknown()).default({}), openingStatement: z.string().optional(), hda: z.record(z.unknown()).default({}), hiddenInformation: z.array(z.unknown()).default([]), physicalExamFindings: z.array(z.unknown()).default([]) }).optional(),
  stationFlow: z.object({ triggers: z.array(z.record(z.unknown())).default([]), tests: z.array(z.record(z.unknown())).default([]), intercurrences: z.array(z.record(z.unknown())).default([]) }).default({ triggers: [], tests: [], intercurrences: [] }),
  evaluation: z.object({ communication: z.array(z.unknown()).default([]), history: z.array(z.unknown()).default([]), physicalExam: z.array(z.unknown()).default([]), diagnosticReasoning: z.array(z.unknown()).default([]), management: z.array(z.unknown()).default([]) }).optional()
});

export const osceStationSchema = z.object({ id: z.string().min(1), area: z.string().min(1), theme: z.string().min(1), subtheme: z.string().min(1), format: z.string().min(1), title: z.string().min(1).default('Estação OSCE'), version: z.number().int().positive().default(1), status: z.string().default('DRAFT'), generationSource: z.string().default('MANUAL'), timeLimitSeconds: z.number().int().positive().max(3600).default(600), content: stationContentSchema.optional(), scenario: z.object({ patientProfile: z.record(z.unknown()), triggers: z.array(z.record(z.unknown())).default([]), timeline: z.array(z.record(z.unknown())).default([]), checklist: z.array(z.object({ category: z.string(), item: z.string(), points: z.number().nonnegative() })).default([]) }).optional() }).passthrough();

export function buildCandidateStation(station) {
  const parsed = osceStationSchema.parse(station);
  const door = parsed.content?.doorInstructions;
  return { id: parsed.id, area: parsed.area, theme: parsed.theme, subtheme: parsed.subtheme, format: parsed.format, title: parsed.title, version: parsed.version, timeLimitSeconds: parsed.timeLimitSeconds, doorInstructions: door || (typeof parsed.doorInstructions === 'string' ? parsed.doorInstructions : {}) };
}

export function assertCandidateSafe(payload) {
  const forbidden = ['diagnosis','expectedDiagnosis','checklist','evaluation','hiddenInformation','expectedManagement','correctAnswer','criticalErrors','scoringRubric','evaluatorContentJson','clinicalContentJson'];
  const serialized = JSON.stringify(payload).toLowerCase();
  for (const field of forbidden) if (serialized.includes(`"${field.toLowerCase()}"`)) throw new Error(`Campo protegido exposto: ${field}`);
  return payload;
}

export function summarizeOsceSession(events, checklist) {
  const categories = ['communication', 'history', 'physicalExam', 'reasoning', 'management'];
  const byCategory = Object.fromEntries(categories.map(category => [category, { points: 0, maxPoints: 0 }]));
  for (const item of checklist || []) { if (!byCategory[item.category]) continue; byCategory[item.category].points += Number(item.awardedPoints || 0); byCategory[item.category].maxPoints += Number(item.points || 0); }
  return { eventCount: Array.isArray(events) ? events.length : 0, categories: byCategory, totalPoints: Object.values(byCategory).reduce((sum, item) => sum + item.points, 0), maxPoints: Object.values(byCategory).reduce((sum, item) => sum + item.maxPoints, 0) };
}

export const selfAssessmentStatusSchema = z.enum(['DONE', 'PARTIAL', 'NOT_DONE']);

function protectedEvaluation(station) {
  return station.evaluatorContentJson || station.content?.evaluation || station.evaluation || {};
}

export function getStationTasks(station) {
  const tasks = station.content?.doorInstructions?.candidateTasks || station.tasks || [];
  return tasks.map((task, index) => typeof task === 'string' ? { id: `task-${index + 1}`, title: task, instructions: task, order: index + 1 } : { id: task.id || `task-${index + 1}`, title: task.title || task.name || `Tarefa ${index + 1}`, instructions: task.instructions || task.candidateInstructions || task.title || task.name, order: index + 1 });
}

export function buildEvaluatorPreparation(station) {
  return { ...station, evaluatorContentJson: station.evaluatorContentJson || protectedEvaluation(station), clinicalContentJson: station.clinicalContentJson || station.content?.patientScript || null };
}

export function buildCandidateSessionView(station, session) {
  const tasks = getStationTasks(station);
  return assertCandidateSafe({ id: station.id, title: station.title, area: station.area, theme: station.theme, subtheme: station.subtheme, format: station.format, timeLimitSeconds: station.timeLimitSeconds, doorInstructions: station.content?.doorInstructions || station.doorInstructions || {}, tasks: tasks.map(({ id, title, instructions, order }) => ({ id, title, instructions, order })), currentTaskIndex: session.currentTaskIndex || 0, phase: session.finishedAt ? 'FINISHED' : 'IN_PROGRESS' });
}

export function buildTaskSelfAssessment(station, taskIndex, status) {
  const evaluation = protectedEvaluation(station);
  const task = Array.isArray(evaluation.tasks) ? evaluation.tasks[taskIndex] : null;
  const checklist = Array.isArray(task?.checklist) ? task.checklist : [];
  return { taskIndex, status, checklist: checklist.map(item => ({ id: item.id || item.item || item.description || item.criterion, item: item.item || item.description || item.criterion || item.title, status: 'NOT_DONE' })) };
}

export function canRevealFinalResult(session) {
  return session.finishedAt && session.finalRevealed === true;
}

export function scoreStationAssessments(station, assessments = []) {
  const tasks = protectedEvaluation(station).tasks || [];
  const axes = { COMMUNICATION: [0, 0], HISTORY: [0, 0], PHYSICAL_EXAM: [0, 0], DIAGNOSTIC_REASONING: [0, 0], MANAGEMENT: [0, 0] };
  for (const assessment of assessments) {
    const task = tasks[assessment.taskIndex];
    for (const item of task?.checklist || []) {
      const selected = assessment.checklist?.find(value => value.id === item.id);
      const factor = selected?.marked === true || selected?.status === 'DONE' ? 1 : selected?.status === 'PARTIAL' ? 0.5 : 0;
      if (!axes[item.axis]) axes[item.axis] = [0, 0];
      axes[item.axis][0] += Number(item.points) * factor;
      axes[item.axis][1] += Number(item.points);
    }
  }
  const performanceByAxis = Object.fromEntries(Object.entries(axes).map(([axis, [points, maxPoints]]) => [axis, { points, maxPoints, percent: maxPoints ? Math.round(points / maxPoints * 100) : 0 }]));
  const totalPoints = Object.values(performanceByAxis).reduce((sum, item) => sum + item.points, 0);
  const maxPoints = Object.values(performanceByAxis).reduce((sum, item) => sum + item.maxPoints, 0);
  return { totalPoints, maxPoints, percent: maxPoints ? Math.round(totalPoints / maxPoints * 100) : 0, performanceByAxis };
}

export function buildFinalResult(station, session) {
  const evaluator = protectedEvaluation(station);
  return { ...scoreStationAssessments(station, session.taskAssessments), answerKey: evaluator.tasks?.map(task => ({ taskId: task.id, title: task.title, answerKey: task.answerKey })) || [], finalAnswer: evaluator.finalAnswer || null };
}
