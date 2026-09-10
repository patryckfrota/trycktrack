import { z } from 'zod';
import { OSCE_FORMATS } from './osceMatrix.js';

export const OSCE_STATION_SCHEMA_VERSION = '1.0.0';
export const osceAxisSchema = z.enum(['COMMUNICATION', 'HISTORY', 'PHYSICAL_EXAM', 'DIAGNOSTIC_REASONING', 'MANAGEMENT']);
export const osceFormatSchema = z.enum(OSCE_FORMATS);

const textMap = z.record(z.string(), z.unknown());
const checklistItemSchema = z.object({
  id: z.string().min(1), axis: osceAxisSchema, description: z.string().min(1),
  points: z.number().positive(), critical: z.boolean().default(false)
}).strict();

const taskSchema = z.object({
  id: z.string().min(1), title: z.string().min(1), candidateInstructions: z.string().min(1),
  checklist: z.array(checklistItemSchema).min(1), answerKey: z.string().min(1)
}).strict();

export const osceImportStationSchema = z.object({
  schemaVersion: z.literal(OSCE_STATION_SCHEMA_VERSION),
  externalId: z.string().min(1).optional(),
  metadata: z.object({
    areaSlug: z.string().min(1), themeCode: z.enum(['A', 'B']), subthemeSlug: z.string().min(1),
    format: osceFormatSchema, title: z.string().min(1), version: z.number().int().positive().default(1),
    difficulty: z.string().optional(), estimatedMinutes: z.number().int().positive().max(60)
  }).strict(),
  scenario: z.object({ environment: z.string().min(1), materials: z.array(z.string()).default([]) }).strict(),
  doorInstructions: z.object({ patientName: z.string().optional(), age: z.union([z.string(), z.number()]).optional(), chiefComplaint: z.string().min(1), triageData: textMap.default({}) }).strict(),
  patientScript: z.object({ profile: textMap, openingStatement: z.string().min(1), responses: z.array(z.object({ trigger: z.string().min(1), response: z.string().min(1), releaseRule: z.string().optional() }).strict()), hiddenInformation: z.array(z.string()).default([]) }).strict(),
  physicalExam: z.array(z.object({ system: z.string().min(1), request: z.string().min(1), findings: z.array(z.string()).min(1) }).strict()).default([]),
  complementaryTests: z.array(z.object({ id: z.string().min(1), name: z.string().min(1), releaseRule: z.string().min(1), result: z.string().min(1) }).strict()).default([]),
  evolution: z.array(z.object({ trigger: z.string().min(1), change: z.string().min(1) }).strict()).default([]),
  tasks: z.array(taskSchema).min(1),
  finalAnswer: z.object({ expectedDiagnosis: z.string().min(1), expectedManagement: z.array(z.string()).min(1), criticalErrors: z.array(z.string()).default([]), explanation: z.string().min(1) }).strict()
}).strict();

export const osceImportPayloadSchema = z.union([
  osceImportStationSchema,
  z.object({ stations: z.array(osceImportStationSchema).min(1).max(500) }).strict()
]);

export function normalizeImportPayload(payload) {
  const parsed = osceImportPayloadSchema.parse(payload);
  return 'stations' in parsed ? parsed.stations : [parsed];
}

export function splitImportedStation(station) {
  return {
    candidate: {
      metadata: station.metadata,
      overview: station.scenario,
      doorInstructions: { ...station.doorInstructions, candidateTasks: station.tasks.map(task => ({ id: task.id, title: task.title, instructions: task.candidateInstructions })) }
    },
    evaluator: {
      scenario: station.scenario, patientScript: station.patientScript, physicalExam: station.physicalExam,
      complementaryTests: station.complementaryTests, evolution: station.evolution,
      tasks: station.tasks, finalAnswer: station.finalAnswer
    }
  };
}
