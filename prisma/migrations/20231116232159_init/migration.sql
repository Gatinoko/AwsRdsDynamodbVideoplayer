/*
  Warnings:

  - You are about to drop the column `userId` on the `comment` table. All the data in the column will be lost.
  - Added the required column `username` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `comment` DROP FOREIGN KEY `Comment_userId_fkey`;

-- AlterTable
ALTER TABLE `comment` DROP COLUMN `userId`,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_username_fkey` FOREIGN KEY (`username`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
