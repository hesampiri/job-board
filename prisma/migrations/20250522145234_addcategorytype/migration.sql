/*
  Warnings:

  - You are about to drop the column `categoryId` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('software_development', 'design', 'marketing', 'sales', 'hr', 'finance', 'other');

-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_categoryId_fkey";

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "categoryId",
ADD COLUMN     "category" "CategoryType" NOT NULL;

-- DropTable
DROP TABLE "Category";
