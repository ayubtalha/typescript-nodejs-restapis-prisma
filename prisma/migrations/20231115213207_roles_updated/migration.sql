/*
  Warnings:

  - The `role` column on the `Customer` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "RoleEnumType" AS ENUM ('user', 'admin');

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "role",
ADD COLUMN     "role" "RoleEnumType" DEFAULT 'user';
