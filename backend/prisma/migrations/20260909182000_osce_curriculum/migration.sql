-- Migration de referência para a matriz OSCE.
-- Gerar/aplicar com `npx prisma migrate dev` em ambiente com DATABASE_URL.
-- O SQL é mantido versionado para não alterar dados existentes de forma destrutiva.

-- Estrutura-base do Trycktrack. O Neon parte de um banco vazio, portanto estes
-- tipos e tabelas precisam existir antes das relações do módulo OSCE.
CREATE TYPE "ExamTrack" AS ENUM ('ENAMED', 'UEPA');
CREATE TYPE "AttemptKind" AS ENUM ('DIAGNOSTIC', 'RECALIBRATION', 'FIXATION');
CREATE TYPE "PhaseStatus" AS ENUM ('LOCKED', 'AVAILABLE', 'THEORY', 'QUESTIONS', 'COMPLETE');

CREATE TABLE "User" (
  "id" TEXT NOT NULL,
  "firebaseUid" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "displayName" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "User_firebaseUid_key" ON "User"("firebaseUid");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

CREATE TABLE "Theme" (
  "id" TEXT NOT NULL,
  "area" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "incidenceEnamed" DOUBLE PRECISION NOT NULL,
  "incidenceUepa" DOUBLE PRECISION NOT NULL,
  "metadata" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Theme_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "Theme_area_name_key" ON "Theme"("area", "name");

CREATE TABLE "StudyTrail" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "track" "ExamTrack" NOT NULL,
  "diagnosticDoneAt" TIMESTAMP(3),
  "lastRecalibratedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "StudyTrail_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "StudyTrail_userId_track_key" ON "StudyTrail"("userId", "track");

CREATE TABLE "TrailPhase" (
  "id" TEXT NOT NULL,
  "trailId" TEXT NOT NULL,
  "themeId" TEXT NOT NULL,
  "position" INTEGER NOT NULL,
  "priorityScore" DOUBLE PRECISION NOT NULL,
  "progress" INTEGER NOT NULL DEFAULT 0,
  "status" "PhaseStatus" NOT NULL DEFAULT 'LOCKED',
  "unlockedAt" TIMESTAMP(3),
  "completedAt" TIMESTAMP(3),
  CONSTRAINT "TrailPhase_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "TrailPhase_trailId_themeId_key" ON "TrailPhase"("trailId", "themeId");
CREATE UNIQUE INDEX "TrailPhase_trailId_position_key" ON "TrailPhase"("trailId", "position");

CREATE TABLE "AssessmentAttempt" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "trailId" TEXT,
  "kind" "AttemptKind" NOT NULL,
  "totalQuestions" INTEGER NOT NULL,
  "correctQuestions" INTEGER NOT NULL DEFAULT 0,
  "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "completedAt" TIMESTAMP(3),
  CONSTRAINT "AssessmentAttempt_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AssessmentResponse" (
  "id" TEXT NOT NULL,
  "attemptId" TEXT NOT NULL,
  "themeId" TEXT,
  "area" TEXT NOT NULL,
  "correct" BOOLEAN NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "AssessmentResponse_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "PerformanceRecord" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "themeId" TEXT NOT NULL,
  "source" "AttemptKind" NOT NULL,
  "accuracy" DOUBLE PRECISION NOT NULL,
  "sampleSize" INTEGER NOT NULL,
  "measuredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "PerformanceRecord_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "PerformanceRecord_userId_themeId_measuredAt_idx" ON "PerformanceRecord"("userId", "themeId", "measuredAt");

ALTER TABLE "StudyTrail" ADD CONSTRAINT "StudyTrail_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TrailPhase" ADD CONSTRAINT "TrailPhase_trailId_fkey" FOREIGN KEY ("trailId") REFERENCES "StudyTrail"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "TrailPhase" ADD CONSTRAINT "TrailPhase_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Theme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "AssessmentAttempt" ADD CONSTRAINT "AssessmentAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AssessmentAttempt" ADD CONSTRAINT "AssessmentAttempt_trailId_fkey" FOREIGN KEY ("trailId") REFERENCES "StudyTrail"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "AssessmentResponse" ADD CONSTRAINT "AssessmentResponse_attemptId_fkey" FOREIGN KEY ("attemptId") REFERENCES "AssessmentAttempt"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PerformanceRecord" ADD CONSTRAINT "PerformanceRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "PerformanceRecord" ADD CONSTRAINT "PerformanceRecord_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "Theme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

CREATE TYPE "OsceMode" AS ENUM ('EVALUATOR', 'CANDIDATE');
CREATE TYPE "OsceStationFormat" AS ENUM ('ANAMNESE_FOCADA', 'EXAME_FISICO', 'RACIOCINIO_DIAGNOSTICO', 'CONDUTA', 'PROCEDIMENTO', 'COMUNICACAO', 'URGENCIA_EMERGENCIA', 'ESTACAO_COMPLETA');
CREATE TYPE "OsceStationStatus" AS ENUM ('DRAFT', 'GENERATED', 'REVIEWED', 'APPROVED', 'ARCHIVED');
CREATE TYPE "OsceEventType" AS ENUM ('STATION_STARTED', 'CANDIDATE_MESSAGE', 'PATIENT_RESPONSE', 'PHYSICAL_EXAM_REQUESTED', 'PHYSICAL_EXAM_RESULT', 'TEST_REQUESTED', 'TEST_RESULT_RELEASED', 'MEDICATION_ORDERED', 'PROCEDURE_PERFORMED', 'CLINICAL_DECISION', 'STATION_FINISHED', 'STATION_TIMEOUT');

CREATE TABLE "OsceArea" ("id" TEXT NOT NULL, "name" TEXT NOT NULL, "slug" TEXT NOT NULL, "order" INTEGER NOT NULL, "active" BOOLEAN NOT NULL DEFAULT true, CONSTRAINT "OsceArea_pkey" PRIMARY KEY ("id"));
CREATE UNIQUE INDEX "OsceArea_name_key" ON "OsceArea"("name");
CREATE UNIQUE INDEX "OsceArea_slug_key" ON "OsceArea"("slug");
CREATE TABLE "OsceTheme" ("id" TEXT NOT NULL, "areaId" TEXT NOT NULL, "code" TEXT NOT NULL, "name" TEXT NOT NULL, "order" INTEGER NOT NULL, "active" BOOLEAN NOT NULL DEFAULT true, CONSTRAINT "OsceTheme_pkey" PRIMARY KEY ("id"));
CREATE UNIQUE INDEX "OsceTheme_areaId_code_key" ON "OsceTheme"("areaId", "code");
CREATE TABLE "OsceSubtheme" ("id" TEXT NOT NULL, "themeId" TEXT NOT NULL, "name" TEXT NOT NULL, "slug" TEXT NOT NULL, "description" TEXT, "order" INTEGER NOT NULL, "active" BOOLEAN NOT NULL DEFAULT true, CONSTRAINT "OsceSubtheme_pkey" PRIMARY KEY ("id"));
CREATE UNIQUE INDEX "OsceSubtheme_themeId_slug_key" ON "OsceSubtheme"("themeId", "slug");
CREATE TABLE "OsceStation" ("id" TEXT NOT NULL, "subthemeId" TEXT NOT NULL, "format" "OsceStationFormat" NOT NULL, "title" TEXT NOT NULL, "status" "OsceStationStatus" NOT NULL DEFAULT 'DRAFT', "version" INTEGER NOT NULL DEFAULT 1, "generationSource" TEXT NOT NULL DEFAULT 'MANUAL', "clinicalContentJson" JSONB, "evaluatorContentJson" JSONB, "modelName" TEXT, "promptVersion" TEXT, "guidelineVersion" TEXT, "clinicalReviewDate" TIMESTAMP(3), "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL, CONSTRAINT "OsceStation_pkey" PRIMARY KEY ("id"));
ALTER TABLE "OsceTheme" ADD CONSTRAINT "OsceTheme_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "OsceArea"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "OsceSubtheme" ADD CONSTRAINT "OsceSubtheme_themeId_fkey" FOREIGN KEY ("themeId") REFERENCES "OsceTheme"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "OsceStation" ADD CONSTRAINT "OsceStation_subthemeId_fkey" FOREIGN KEY ("subthemeId") REFERENCES "OsceSubtheme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

CREATE TABLE "OsceSession" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "stationId" TEXT NOT NULL,
  "mode" "OsceMode" NOT NULL,
  "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "finishedAt" TIMESTAMP(3),
  "debriefing" TEXT,
  "summary" JSONB,
  CONSTRAINT "OsceSession_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "OsceEvent" (
  "id" TEXT NOT NULL,
  "sessionId" TEXT NOT NULL,
  "type" "OsceEventType" NOT NULL,
  "payload" JSONB NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "OsceEvent_pkey" PRIMARY KEY ("id")
);
CREATE TABLE "OsceChecklistScore" (
  "id" TEXT NOT NULL,
  "sessionId" TEXT NOT NULL,
  "category" TEXT NOT NULL,
  "item" TEXT NOT NULL,
  "points" DOUBLE PRECISION NOT NULL,
  "awardedPoints" DOUBLE PRECISION NOT NULL,
  CONSTRAINT "OsceChecklistScore_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "OsceSession_userId_startedAt_idx" ON "OsceSession"("userId", "startedAt");
CREATE INDEX "OsceEvent_sessionId_idx" ON "OsceEvent"("sessionId");
CREATE INDEX "OsceChecklistScore_sessionId_category_idx" ON "OsceChecklistScore"("sessionId", "category");
ALTER TABLE "OsceSession" ADD CONSTRAINT "OsceSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "OsceSession" ADD CONSTRAINT "OsceSession_stationId_fkey" FOREIGN KEY ("stationId") REFERENCES "OsceStation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "OsceEvent" ADD CONSTRAINT "OsceEvent_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "OsceSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "OsceChecklistScore" ADD CONSTRAINT "OsceChecklistScore_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "OsceSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
