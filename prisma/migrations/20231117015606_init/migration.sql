-- CreateTable
CREATE TABLE `VideoRating` (
    `ratingId` VARCHAR(191) NOT NULL,
    `videoId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `value` INTEGER NOT NULL,

    PRIMARY KEY (`ratingId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `VideoRating` ADD CONSTRAINT `VideoRating_videoId_fkey` FOREIGN KEY (`videoId`) REFERENCES `Video`(`videoId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VideoRating` ADD CONSTRAINT `VideoRating_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
