/*
  Warnings:

  - You are about to drop the column `professional` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Client` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_clientId_fkey";

-- DropIndex
DROP INDEX "Client_email_key";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "professional",
DROP COLUMN "time",
DROP COLUMN "totalPrice",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "email",
DROP COLUMN "notes",
DROP COLUMN "updatedAt",
ADD COLUMN     "visits" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
