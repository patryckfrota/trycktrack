-- Sincronização de histórico por conta (R-5): tabela nova, sem tocar
-- em nenhuma existente. Gerado via `prisma migrate diff` local (sem
-- conexão com o Neon) — aplicar com `npx prisma migrate deploy` num
-- ambiente com DATABASE_URL alcançável. Depende da migração
-- 20260915120000_questhub_persistence (precisa de Question e User já
-- existirem).

-- CreateTable
CREATE TABLE "UserQuestionReview" (
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "stability" DOUBLE PRECISION NOT NULL,
    "difficulty" DOUBLE PRECISION NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "lastReviewedAt" TIMESTAMP(3) NOT NULL,
    "lastRating" INTEGER NOT NULL,

    CONSTRAINT "UserQuestionReview_pkey" PRIMARY KEY ("userId","questionId")
);

-- CreateIndex
CREATE INDEX "UserQuestionReview_userId_dueDate_idx" ON "UserQuestionReview"("userId", "dueDate");

-- AddForeignKey
ALTER TABLE "UserQuestionReview" ADD CONSTRAINT "UserQuestionReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserQuestionReview" ADD CONSTRAINT "UserQuestionReview_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

