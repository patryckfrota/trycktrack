ALTER TABLE "OsceStation"
  ADD COLUMN "schemaVersion" TEXT NOT NULL DEFAULT '1.0.0',
  ADD COLUMN "externalId" TEXT,
  ADD COLUMN "fingerprint" TEXT,
  ADD COLUMN "importBatchId" TEXT;

CREATE UNIQUE INDEX "OsceStation_fingerprint_key" ON "OsceStation"("fingerprint");
CREATE INDEX "OsceStation_externalId_version_idx" ON "OsceStation"("externalId", "version");

CREATE TABLE "OsceImportBatch" (
  "id" TEXT NOT NULL,
  "sourceName" TEXT,
  "totalItems" INTEGER NOT NULL,
  "importedItems" INTEGER NOT NULL,
  "duplicateItems" INTEGER NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "OsceImportBatch_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "OsceStation" ADD CONSTRAINT "OsceStation_importBatchId_fkey"
  FOREIGN KEY ("importBatchId") REFERENCES "OsceImportBatch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

UPDATE "OsceStation" SET "fingerprint" = md5("id") WHERE "fingerprint" IS NULL;
ALTER TABLE "OsceStation" ALTER COLUMN "fingerprint" SET NOT NULL;

ALTER TABLE "OsceSession"
  ALTER COLUMN "userId" DROP NOT NULL,
  ADD COLUMN "clientUserKey" TEXT,
  ADD COLUMN "currentTaskIndex" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "taskAssessments" JSONB,
  ADD COLUMN "finalRevealed" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "resultDeliveredAt" TIMESTAMP(3);

UPDATE "OsceSession" SET "clientUserKey" = COALESCE("userId", 'legacy') WHERE "clientUserKey" IS NULL;
ALTER TABLE "OsceSession" ALTER COLUMN "clientUserKey" SET NOT NULL;
ALTER TABLE "OsceSession" DROP CONSTRAINT IF EXISTS "OsceSession_userId_fkey";
ALTER TABLE "OsceSession" ADD CONSTRAINT "OsceSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
DROP INDEX IF EXISTS "OsceSession_userId_startedAt_idx";
CREATE INDEX "OsceSession_clientUserKey_startedAt_idx" ON "OsceSession"("clientUserKey", "startedAt");
