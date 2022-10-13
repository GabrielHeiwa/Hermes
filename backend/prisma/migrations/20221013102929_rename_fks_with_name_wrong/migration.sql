/*
  Warnings:

  - You are about to drop the column `messages_group_id` on the `messages` table. All the data in the column will be lost.
  - Added the required column `messages_group_id_fk` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_messages_group_id_fkey";

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "messages_group_id",
ADD COLUMN     "messages_group_id_fk" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_messages_group_id_fk_fkey" FOREIGN KEY ("messages_group_id_fk") REFERENCES "messages_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
