-- Modelagem do QuestHub (achado C-3 da auditoria): até aqui as questões só
-- existiam como arrays literais em questions-*.js, sem tabela nenhuma, sem
-- histórico por usuário além de contadores agregados no localStorage.
-- Gerar/aplicar com `npx prisma migrate deploy` (ou `migrate dev` em
-- desenvolvimento) num ambiente com DATABASE_URL alcançável — este SQL foi
-- gerado via `prisma migrate diff` local (sem conexão com o banco) e ainda
-- não foi aplicado no Neon. Depois de aplicado, rode
-- `node scripts/import-questions.js` pra popular Question/QuestionOption/
-- QuestionExplanation a partir dos arquivos estáticos atuais — eles
-- continuam sendo a fonte enquanto o PWA carregar via <script>; o banco é
-- uma cópia consultável até essa parte da arquitetura mudar.

-- CreateEnum
CREATE TYPE "QuestionBank" AS ENUM ('PRINCIPAL', 'INTERNATO');

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "bank" "QuestionBank" NOT NULL,
    "area" TEXT NOT NULL,
    "subarea" TEXT,
    "stem" TEXT NOT NULL,
    "answer" TEXT,
    "annulled" BOOLEAN NOT NULL DEFAULT false,
    "needsVisualReview" BOOLEAN NOT NULL DEFAULT false,
    "questionType" TEXT NOT NULL DEFAULT 'multiple_choice',
    "examId" TEXT,
    "examName" TEXT,
    "source" TEXT,
    "sourceCode" TEXT,
    "number" INTEGER,
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "rodizio" TEXT,
    "topico" TEXT,
    "tema" TEXT,
    "semestre" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionOption" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "letter" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "QuestionOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionExplanation" (
    "questionId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionExplanation_pkey" PRIMARY KEY ("questionId")
);

-- CreateTable
CREATE TABLE "QuestionResponse" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "chosen" TEXT,
    "correct" BOOLEAN,
    "elapsedMs" INTEGER,
    "answeredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuestionResponse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Question_bank_area_subarea_idx" ON "Question"("bank", "area", "subarea");

-- CreateIndex
CREATE INDEX "Question_bank_examId_idx" ON "Question"("bank", "examId");

-- CreateIndex
CREATE INDEX "Question_rodizio_topico_tema_semestre_idx" ON "Question"("rodizio", "topico", "tema", "semestre");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionOption_questionId_letter_key" ON "QuestionOption"("questionId", "letter");

-- CreateIndex
CREATE INDEX "QuestionResponse_userId_answeredAt_idx" ON "QuestionResponse"("userId", "answeredAt");

-- CreateIndex
CREATE INDEX "QuestionResponse_questionId_correct_idx" ON "QuestionResponse"("questionId", "correct");

-- CreateIndex
CREATE INDEX "QuestionResponse_userId_questionId_idx" ON "QuestionResponse"("userId", "questionId");

-- AddForeignKey
ALTER TABLE "QuestionOption" ADD CONSTRAINT "QuestionOption_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionExplanation" ADD CONSTRAINT "QuestionExplanation_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionResponse" ADD CONSTRAINT "QuestionResponse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionResponse" ADD CONSTRAINT "QuestionResponse_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

