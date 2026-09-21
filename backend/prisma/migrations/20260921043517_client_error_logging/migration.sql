-- DropIndex
DROP INDEX "OsceEvent_sessionId_idx";

-- CreateTable
CREATE TABLE "ClientError" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "stack" TEXT,
    "url" TEXT,
    "userAgent" TEXT,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ClientError_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ClientError_createdAt_idx" ON "ClientError"("createdAt");

-- CreateIndex
CREATE INDEX "OsceStation_subthemeId_format_status_idx" ON "OsceStation"("subthemeId", "format", "status");

-- CreateIndex
CREATE INDEX "OsceSubtheme_themeId_order_idx" ON "OsceSubtheme"("themeId", "order");

-- CreateIndex
CREATE INDEX "OsceTheme_areaId_order_idx" ON "OsceTheme"("areaId", "order");
