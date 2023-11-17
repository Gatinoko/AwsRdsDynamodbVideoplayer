/*
  Warnings:

  - A unique constraint covering the columns `[videoId]` on the table `VideoRating` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `VideoRating_videoId_key` ON `VideoRating`(`videoId`);
