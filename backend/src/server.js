import express from 'express';
import { z } from 'zod';
import { calculatePathPriority } from './pathPriority.js';
import { assertCandidateSafe, buildCandidateSessionView, buildCandidateStation, buildEvaluatorPreparation, buildFinalResult, buildTaskSelfAssessment, getStationTasks, osceEventTypeSchema, selfAssessmentStatusSchema, summarizeOsceSession } from './osce.js';
import { OSCE_FORMATS, OSCE_MATRIX } from './osceMatrix.js';
import { importStations, previewStationImport } from './services/osce-import.service.js';
import { createOsceRepository, MemoryOsceRepository } from './osceRepository.js';

const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});
app.use(express.json());

// A matriz real deve ser carregada pelo banco de dados. O fallback vazio evita
// criar casos clínicos fictícios quando ainda não houver estações importadas.
const osceSessions = new Map();

const matrixAreas = OSCE_MATRIX.map((area, index) => ({ id: `area_${index + 1}`, ...area }));
const matrixThemes = matrixAreas.flatMap(area => area.themes.map(theme => ({ id: `${area.id}_${theme.code.toLowerCase()}`, areaId: area.id, ...theme })));
const matrixSubthemes = matrixThemes.flatMap(theme => theme.subthemes.map(subtheme => ({ id: `${theme.id}_${subtheme.order}`, themeId: theme.id, areaId: theme.areaId, themeCode: theme.code, themeName: theme.name, areaSlug: matrixAreas.find(area => area.id === theme.areaId)?.slug, areaName: matrixAreas.find(area => area.id === theme.areaId)?.name, ...subtheme })));
let osceRepository = createOsceRepository({ subthemes: matrixSubthemes });

const recalculationSchema = z.object({
  topics: z.array(z.object({
    id: z.string(),
    area: z.string(),
    incidence: z.number().nonnegative().optional(),
    incidenceEnamed: z.number().nonnegative().optional()
  })),
  results: z.array(z.object({
    themeId: z.string().optional(),
    area: z.string().optional(),
    correct: z.boolean()
  })).default([]),
  completedThemeIds: z.array(z.string()).default([])
});

app.post('/api/trails/:trailId/recalculate', async (req, res) => {
  const parsed = recalculationSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  // Na integração de produção, persista as fases ordenadas via Prisma aqui.
  const phases = calculatePathPriority(parsed.data);
  res.json({ trailId: req.params.trailId, phases });
});

app.get('/api/osce/areas', (req, res) => res.json({ areas: matrixAreas.map(({ themes, ...area }) => area) }));
app.get('/api/osce/areas/:areaId/themes', (req, res) => {
  const area = matrixAreas.find(item => item.id === req.params.areaId);
  if (!area) return res.status(404).json({ error: 'Área OSCE não encontrada.' });
  res.json({ themes: matrixThemes.filter(item => item.areaId === area.id).map(({ subthemes, ...theme }) => theme) });
});
app.get('/api/osce/themes/:themeId/subthemes', (req, res) => {
  const theme = matrixThemes.find(item => item.id === req.params.themeId);
  if (!theme) return res.status(404).json({ error: 'Tema OSCE não encontrado.' });
  res.json({ subthemes: matrixSubthemes.filter(item => item.themeId === theme.id) });
});
app.get('/api/osce/subthemes/:subthemeId', (req, res) => {
  const subtheme = matrixSubthemes.find(item => item.id === req.params.subthemeId);
  if (!subtheme) return res.status(404).json({ error: 'Subtema OSCE não encontrado.' });
  res.json({ subtheme });
});
app.get('/api/osce/formats', (req, res) => res.json({ formats: OSCE_FORMATS }));

app.get('/api/osce/stations', async (req, res) => {
  const { area, theme, subtheme, format } = req.query;
  const rows = await osceRepository.listStations({ area, theme, subtheme, format });
  const stations = rows.map(station => assertCandidateSafe(buildCandidateStation(station)));
  res.json({ stations });
});

app.get('/api/osce/stations/random', async (req, res) => {
  const rows = await osceRepository.listStations(req.query);
  if (!rows.length) return res.status(404).json({ error: 'Nenhuma estação encontrada para os filtros.' });
  const station = rows[Math.floor(Math.random() * rows.length)];
  res.json({ station: assertCandidateSafe(buildCandidateStation(station)) });
});

app.get('/api/osce/stations/:stationId/versions', async (req, res) => {
  const station = await osceRepository.getStation(req.params.stationId);
  if (!station) return res.status(404).json({ error: 'Estação OSCE não encontrada.' });
  res.json({ versions: await osceRepository.listVersions(station) });
});

app.get('/api/osce/users/:userId/history', async (req, res) => {
  const attempts = await osceRepository.listSessionHistory(req.params.userId);
  res.json({ attempts });
});

app.post('/api/osce/import/preview', async (req, res) => {
  try {
    const preview = previewStationImport(req.body, new Set(await osceRepository.listFingerprints()));
    const { stations, ...safePreview } = preview;
    res.json(safePreview);
  } catch (error) {
    res.status(400).json({ error: 'Arquivo de estação inválido.', details: error.issues || error.message });
  }
});

app.post('/api/osce/import', async (req, res) => {
  try {
    const result = await importStations(req.body, osceRepository);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: 'Não foi possível importar as estações.', details: error.issues || error.message });
  }
});

app.post('/api/osce/sessions', async (req, res) => {
  const parsed = z.object({ stationId: z.string(), userId: z.string(), mode: z.enum(['EVALUATOR', 'CANDIDATE']) }).safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const station = await osceRepository.getStation(parsed.data.stationId);
  if (!station) return res.status(404).json({ error: 'Estação OSCE não encontrada.' });
  const id = `osce_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const session = { id, stationId: station.id, userId: parsed.data.userId, mode: parsed.data.mode, startedAt: new Date().toISOString(), events: [], currentTaskIndex: 0, pendingTaskIndex: null, taskAssessments: [], finalRevealed: false, resultDeliveredAt: null };
  osceSessions.set(id, session);
  await osceRepository.createSessionRecord({ id, clientUserKey: parsed.data.userId, stationId: station.id, mode: parsed.data.mode, startedAt: session.startedAt, currentTaskIndex: 0, taskAssessments: [], finalRevealed: false });
  const stationView = parsed.data.mode === 'CANDIDATE' ? buildCandidateSessionView(station, session) : buildEvaluatorPreparation(station);
  res.status(201).json({ sessionId: id, mode: session.mode, station: stationView });
});

app.post('/api/osce/sessions/:sessionId/tasks/:taskIndex/complete', async (req, res) => {
  const session = osceSessions.get(req.params.sessionId);
  if (!session) return res.status(404).json({ error: 'Sessão OSCE não encontrada.' });
  if (session.mode !== 'CANDIDATE') return res.status(403).json({ error: 'Esta rota é exclusiva do modo avaliando.' });
  if (session.finishedAt || session.finalRevealed) return res.status(409).json({ error: 'O resultado já foi revelado e a sessão está bloqueada.' });
  const parsed = z.object({}).passthrough().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const taskIndex = Number(req.params.taskIndex);
  if (!Number.isInteger(taskIndex) || taskIndex !== session.currentTaskIndex) return res.status(409).json({ error: 'Tarefa fora de sequência.' });
  const station = await osceRepository.getStation(session.stationId);
  if (session.pendingTaskIndex !== null) return res.status(409).json({ error: 'Conclua a autoavaliação da tarefa anterior.' });
  const taskResult = buildTaskSelfAssessment(station, taskIndex, 'NOT_DONE');
  session.pendingTaskIndex = taskIndex;
  // Nunca retorna pontos, diagnóstico ou checklist de outra tarefa.
  res.json({ task: taskResult, awaitingSelfAssessment: true, resultAvailable: false });
});

app.post('/api/osce/sessions/:sessionId/tasks/:taskIndex/self-assessment', async (req, res) => {
  const session = osceSessions.get(req.params.sessionId);
  if (!session) return res.status(404).json({ error: 'Sessão OSCE não encontrada.' });
  if (session.mode !== 'CANDIDATE') return res.status(403).json({ error: 'Esta rota é exclusiva do modo avaliando.' });
  if (session.finishedAt || session.finalRevealed) return res.status(409).json({ error: 'Sessão bloqueada.' });
  const taskIndex = Number(req.params.taskIndex);
  if (session.pendingTaskIndex !== taskIndex) return res.status(409).json({ error: 'Encerre esta tarefa antes da autoavaliação.' });
  const parsed = z.object({ checklist: z.array(z.object({ id: z.string(), status: selfAssessmentStatusSchema })).min(1) }).safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  session.taskAssessments.push({ taskIndex, checklist: parsed.data.checklist, at: new Date().toISOString() });
  session.pendingTaskIndex = null;
  session.currentTaskIndex += 1;
  const station = await osceRepository.getStation(session.stationId);
  const final = session.currentTaskIndex >= getStationTasks(station).length;
  if (final) session.finishedAt = new Date().toISOString();
  await osceRepository.updateSessionRecord(session.id, { currentTaskIndex: session.currentTaskIndex, taskAssessments: session.taskAssessments, finishedAt: session.finishedAt || null });
  res.json({ saved: true, nextTaskIndex: final ? null : session.currentTaskIndex, final, resultAvailable: final });
});

app.post('/api/osce/sessions/:sessionId/evaluator/checklist', async (req, res) => {
  const session = osceSessions.get(req.params.sessionId);
  if (!session) return res.status(404).json({ error: 'Sessão OSCE não encontrada.' });
  if (session.mode !== 'EVALUATOR') return res.status(403).json({ error: 'Esta rota é exclusiva do modo avaliador.' });
  if (session.finalRevealed) return res.status(409).json({ error: 'O resultado já foi entregue e está bloqueado.' });
  const parsed = z.object({ taskIndex: z.number().int().nonnegative(), checklist: z.array(z.object({ id: z.string(), status: selfAssessmentStatusSchema.optional(), marked: z.boolean().optional() }).refine(item => item.status || typeof item.marked === 'boolean', { message: 'Informe status ou marked.' })) }).safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  session.taskAssessments = session.taskAssessments.filter(item => item.taskIndex !== parsed.data.taskIndex);
  session.taskAssessments.push({ ...parsed.data, at: new Date().toISOString() });
  await osceRepository.updateSessionRecord(session.id, { taskAssessments: session.taskAssessments });
  res.status(201).json({ saved: true, partialScore: false, resultAvailable: false });
});

app.get('/api/osce/sessions/:sessionId/evaluator/resources', async (req, res) => {
  const session = osceSessions.get(req.params.sessionId);
  if (!session) return res.status(404).json({ error: 'Sessão OSCE não encontrada.' });
  if (session.mode !== 'EVALUATOR') return res.status(403).json({ error: 'Recursos reservados ao avaliador.' });
  if (session.finalRevealed) return res.status(409).json({ error: 'Sessão bloqueada após revelação do resultado.' });
  const station = await osceRepository.getStation(session.stationId);
  const content = station?.clinicalContentJson || station?.content?.patientScript || {};
  res.json({ patientScript: content, physicalExamFindings: content.physicalExamFindings || [], tests: station?.content?.stationFlow?.tests || [] });
});

app.post('/api/osce/sessions/:sessionId/events', async (req, res) => {
  const session = osceSessions.get(req.params.sessionId);
  if (!session) return res.status(404).json({ error: 'Sessão OSCE não encontrada.' });
  const parsed = z.object({ type: osceEventTypeSchema, payload: z.record(z.unknown()).default({}) }).safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  const at = new Date().toISOString();
  session.events.push({ ...parsed.data, at });
  await osceRepository.addEventRecord({ sessionId: session.id, type: parsed.data.type, payload: parsed.data.payload, createdAt: at });
  res.status(201).json({ saved: true });
});

app.post('/api/osce/sessions/:sessionId/finish', async (req, res) => {
  const session = osceSessions.get(req.params.sessionId);
  if (!session) return res.status(404).json({ error: 'Sessão OSCE não encontrada.' });
  if (session.finalRevealed) return res.status(409).json({ error: 'O resultado já foi visualizado e está bloqueado.' });
  const parsed = z.object({ debriefing: z.string().max(10000).default('') }).passthrough().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });
  session.finishedAt = session.finishedAt || new Date().toISOString();
  session.debriefing = parsed.data.debriefing;
  await osceRepository.updateSessionRecord(session.id, { finishedAt: session.finishedAt, debriefing: session.debriefing, taskAssessments: session.taskAssessments });
  if (session.mode === 'CANDIDATE') {
    return res.json({ sessionId: session.id, resultAvailable: true, finalTaskCompleted: true, locked: false });
  }
  res.json({ sessionId: session.id, resultAvailable: true, rolesCanBeSwapped: true });
});

app.post('/api/osce/sessions/:sessionId/reveal-result', async (req, res) => {
  const session = osceSessions.get(req.params.sessionId);
  if (!session) return res.status(404).json({ error: 'Sessão OSCE não encontrada.' });
  if (!session.finishedAt) return res.status(409).json({ error: 'Finalize a última tarefa antes de revelar o resultado.' });
  if (session.finalRevealed) return res.status(409).json({ error: 'O resultado já foi revelado; a sessão está bloqueada.' });
  session.finalRevealed = true;
  const station = await osceRepository.getStation(session.stationId);
  session.summary = buildFinalResult(station, session);
  await osceRepository.updateSessionRecord(session.id, { summary: session.summary, finalRevealed: true });
  res.json({ sessionId: session.id, summary: session.summary, debriefing: session.debriefing || '', locked: true, rolesCanBeSwapped: session.mode === 'EVALUATOR' });
});

app.post('/api/osce/sessions/:sessionId/deliver-result', async (req, res) => {
  const session = osceSessions.get(req.params.sessionId);
  if (!session || session.mode !== 'EVALUATOR') return res.status(404).json({ error: 'Avaliação não encontrada.' });
  if (!session.finishedAt) return res.status(409).json({ error: 'Finalize a avaliação antes de entregar o resultado.' });
  const station = await osceRepository.getStation(session.stationId);
  session.summary ||= buildFinalResult(station, session);
  session.finalRevealed = true;
  session.resultDeliveredAt = new Date().toISOString();
  await osceRepository.updateSessionRecord(session.id, { summary: session.summary, finalRevealed: true, resultDeliveredAt: session.resultDeliveredAt });
  res.json({ delivered: true, deliveredAt: session.resultDeliveredAt, result: session.summary, locked: true });
});

app.post('/api/osce/sessions/:sessionId/swap-roles', async (req, res) => {
  const previous = osceSessions.get(req.params.sessionId);
  if (!previous?.finishedAt) return res.status(409).json({ error: 'Finalize a estação antes de trocar os papéis.' });
  const id = `osce_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const mode = previous.mode === 'EVALUATOR' ? 'CANDIDATE' : 'EVALUATOR';
  const session = { id, stationId: previous.stationId, userId: previous.userId, mode, startedAt: new Date().toISOString(), events: [], currentTaskIndex: 0, pendingTaskIndex: null, taskAssessments: [], finalRevealed: false, resultDeliveredAt: null };
  osceSessions.set(id, session);
  await osceRepository.createSessionRecord({ id, clientUserKey: previous.userId, stationId: previous.stationId, mode, startedAt: session.startedAt, currentTaskIndex: 0, taskAssessments: [], finalRevealed: false });
  const station = await osceRepository.getStation(session.stationId);
  res.status(201).json({ sessionId: id, mode, station: mode === 'CANDIDATE' ? buildCandidateSessionView(station, session) : buildEvaluatorPreparation(station) });
});

export { app, matrixAreas, matrixThemes, matrixSubthemes };
export function setOsceStationsForTests(stations) { osceRepository = new MemoryOsceRepository({ subthemes: matrixSubthemes, stations }); osceSessions.clear(); }

const isDirectRun = process.argv[1] && new URL(`file://${process.argv[1]}`).href === import.meta.url;
if (isDirectRun) app.listen(process.env.PORT || 3001, () => console.log('Trycktrack Trails API ativa.'));
