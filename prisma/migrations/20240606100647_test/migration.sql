/*
  Warnings:

  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" VARCHAR(16) NOT NULL DEFAULT 'default';

-- DropTable
DROP TABLE "Role";
