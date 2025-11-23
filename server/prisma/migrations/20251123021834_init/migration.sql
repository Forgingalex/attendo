-- CreateTable
CREATE TABLE "visits" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "time_in" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "time_out" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'in',

    CONSTRAINT "visits_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "visits_name_idx" ON "visits"("name");

-- CreateIndex
CREATE INDEX "visits_status_idx" ON "visits"("status");
