-- Remove as respostas duplicadas que o reenvio do cliente já gerou (mesmo
-- usuário, questão e instante), mantendo uma linha por chave. Em 2026-10-10
-- eram 5 linhas em 773. Precisa vir antes do índice único, que falharia.
DELETE FROM "QuestionResponse" a
USING "QuestionResponse" b
WHERE a."userId" = b."userId"
  AND a."questionId" = b."questionId"
  AND a."answeredAt" = b."answeredAt"
  AND a."id" > b."id";

-- CreateIndex
CREATE UNIQUE INDEX "QuestionResponse_userId_questionId_answeredAt_key" ON "QuestionResponse"("userId", "questionId", "answeredAt");
