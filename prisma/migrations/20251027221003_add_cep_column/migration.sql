/*
  Warnings:

  - Added the required column `cep` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cep" VARCHAR(20) NOT NULL;
