-- CreateTable
CREATE TABLE "UserTrailSettings" (
    "userId" TEXT NOT NULL,
    "trailId" TEXT NOT NULL,
    "goal" DOUBLE PRECISION,
    "examDate" TIMESTAMP(3),
    "history" JSONB,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserTrailSettings_pkey" PRIMARY KEY ("userId","trailId")
);

-- AddForeignKey
ALTER TABLE "UserTrailSettings" ADD CONSTRAINT "UserTrailSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
