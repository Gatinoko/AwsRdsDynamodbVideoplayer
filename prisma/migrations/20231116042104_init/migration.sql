-- CreateTable
CREATE TABLE `Comment` (
    `commentId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `videoId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`commentId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comment` ADD CONSTRAINT `Comment_videoId_fkey` FOREIGN KEY (`videoId`) REFERENCES `Video`(`videoId`) ON DELETE RESTRICT ON UPDATE CASCADE;
