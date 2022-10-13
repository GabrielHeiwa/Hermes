/*
  Warnings:

  - You are about to drop the column `phoneNumber` on the `phone_numbers` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `phone_numbers` table. All the data in the column will be lost.
  - Added the required column `phone_number` to the `phone_numbers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `session` to the `phone_numbers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id_fk` to the `phone_numbers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "phone_numbers" DROP CONSTRAINT "phone_numbers_userId_fkey";

-- AlterTable
ALTER TABLE "phone_numbers" DROP COLUMN "phoneNumber",
DROP COLUMN "userId",
ADD COLUMN     "phone_number" TEXT NOT NULL,
ADD COLUMN     "session" TEXT NOT NULL,
ADD COLUMN     "user_id_fk" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "messages_groups" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "user_id_fk" TEXT NOT NULL,

    CONSTRAINT "messages_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "messages_group_id" TEXT NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "phone_numbers_group" (
    "id" TEXT NOT NULL,
    "messenger_id_fk" TEXT NOT NULL,

    CONSTRAINT "phone_numbers_group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "phones" (
    "id" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "phoneNumbersGroupId" TEXT NOT NULL,

    CONSTRAINT "phones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messengers" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "hour_start" TIMESTAMP(3) NOT NULL,
    "hour_end" TIMESTAMP(3) NOT NULL,
    "days_running" TEXT NOT NULL,
    "phone_id_fk" TEXT NOT NULL,
    "message_group_id_fk" TEXT NOT NULL,

    CONSTRAINT "messengers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "phone_numbers" ADD CONSTRAINT "phone_numbers_user_id_fk_fkey" FOREIGN KEY ("user_id_fk") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages_groups" ADD CONSTRAINT "messages_groups_user_id_fk_fkey" FOREIGN KEY ("user_id_fk") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_messages_group_id_fkey" FOREIGN KEY ("messages_group_id") REFERENCES "messages_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phone_numbers_group" ADD CONSTRAINT "phone_numbers_group_messenger_id_fk_fkey" FOREIGN KEY ("messenger_id_fk") REFERENCES "messengers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "phones" ADD CONSTRAINT "phones_phoneNumbersGroupId_fkey" FOREIGN KEY ("phoneNumbersGroupId") REFERENCES "phone_numbers_group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messengers" ADD CONSTRAINT "messengers_phone_id_fk_fkey" FOREIGN KEY ("phone_id_fk") REFERENCES "phone_numbers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messengers" ADD CONSTRAINT "messengers_message_group_id_fk_fkey" FOREIGN KEY ("message_group_id_fk") REFERENCES "messages_groups"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
