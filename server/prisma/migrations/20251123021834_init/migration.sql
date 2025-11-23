-- CreateTable
CREATE TABLE "visits" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "time_in" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "time_out" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'in'
);

-- CreateIndex
CREATE INDEX "visits_name_idx" ON "visits"("name");

-- CreateIndex
CREATE INDEX "visits_status_idx" ON "visits"("status");
