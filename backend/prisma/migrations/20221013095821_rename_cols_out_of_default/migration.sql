/*
  Warnings:

  - You are about to drop the column `phoneNumbersGroupId` on the `phones` table. All the data in the column will be lost.
  - Added the required column `phone_number_group_id` to the `phones` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "phones" DROP CONSTRAINT "phones_phoneNumbersGroupId_fkey";

-- AlterTable
ALTER TABLE "phones" DROP COLUMN "phoneNumbersGroupId",
ADD COLUMN     "phone_number_group_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "phones" ADD CONSTRAINT "phones_phone_number_group_id_fkey" FOREIGN KEY ("phone_number_group_id") REFERENCES "phone_numbers_group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
