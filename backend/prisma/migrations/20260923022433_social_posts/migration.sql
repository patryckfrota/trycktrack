-- CreateEnum
CREATE TYPE "SocialPostStatus" AS ENUM ('RASCUNHO', 'AGUARDANDO_APROVACAO', 'AGENDADO', 'PUBLICADO', 'ERRO');

-- CreateTable
CREATE TABLE "SocialPost" (
    "id" TEXT NOT NULL,
    "caption" TEXT NOT NULL,
    "mediaUrls" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "status" "SocialPostStatus" NOT NULL DEFAULT 'RASCUNHO',
    "scheduledAt" TIMESTAMP(3),
    "publishedAt" TIMESTAMP(3),
    "instagramPostId" TEXT,
    "error" TEXT,
    "createdBy" TEXT,
    "likes" INTEGER,
    "comments" INTEGER,
    "reach" INTEGER,
    "lastMetricsSyncAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SocialPost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SocialPost_scheduledAt_idx" ON "SocialPost"("scheduledAt");

-- CreateIndex
CREATE INDEX "SocialPost_status_idx" ON "SocialPost"("status");
