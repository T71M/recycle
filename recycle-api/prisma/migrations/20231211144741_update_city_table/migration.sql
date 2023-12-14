/*
  Warnings:

  - You are about to drop the column `account` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the column `bank` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the column `bank_account` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the column `bank_bik` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the column `bank_inn` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the column `bank_legal_address` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the column `client_contact_phone` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the column `kpp` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the column `legal_address` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the column `ogrn` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the column `legal_address` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Request` table. All the data in the column will be lost.
  - Added the required column `center_lat` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `center_long` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inn` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "City" ADD COLUMN     "center_lat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "center_long" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Partner" DROP COLUMN "account",
DROP COLUMN "bank",
DROP COLUMN "bank_account",
DROP COLUMN "bank_bik",
DROP COLUMN "bank_inn",
DROP COLUMN "bank_legal_address",
DROP COLUMN "client_contact_phone",
DROP COLUMN "kpp",
DROP COLUMN "legal_address",
DROP COLUMN "ogrn",
ADD COLUMN     "image" TEXT DEFAULT '',
ADD COLUMN     "website" TEXT DEFAULT '';

-- AlterTable
ALTER TABLE "Request" DROP COLUMN "legal_address",
DROP COLUMN "name",
ADD COLUMN     "inn" TEXT NOT NULL,
ADD COLUMN     "is_accept" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;
