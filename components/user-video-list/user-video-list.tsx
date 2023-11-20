'use server';

import jwt from 'jsonwebtoken';
import prismaClient from '@/prisma/prisma';
import { cookies } from 'next/headers';
import VideoList from './video-list/video-list';
import { DB_CLIENT, TABLE_NAME } from '@/aws/aws-config';
import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { createPresigned } from '@/aws/aws-utils';

export type UserVideoListProps = {
	username?: string | undefined;
};

export default async function UserVideoList({ username }: UserVideoListProps) {
	// Decoded jwt token
	const decodedJwtToken: any = jwt.decode(cookies().get('token')?.value!);

	// Videos array
	let videos;

	// If a user is specified, only include the specified user video's, otherwise show all videos
	if (username) {
		// Gets a user's uploaded video ids
		videos = (
			await prismaClient().user.findUnique({
				where: {
					username: username,
				},
				include: {
					videos: true,
				},
			})
		)?.videos!;
	} else {
		videos = await prismaClient().video.findMany()!;
	}

	const userVideos = await (async () => {
		let userVideos = [];
		for (const video of videos) {
			// Generates video's presigned URL
			const presignedUrl = await createPresigned(video.videoId);

			// Video information stored in Dynamodb
			const { Item } = await DB_CLIENT.send(
				new GetCommand({
					TableName: TABLE_NAME,
					Key: {
						videoId: video.videoId,
					},
				})
			);

			// Gets a video's comments from mySql
			const videoComments = (
				await prismaClient().video.findUnique({
					where: {
						videoId: video.videoId,
					},
					include: {
						comments: {
							include: {
								user: true,
							},
						},
					},
				})
			)?.comments!;

			// Gets a video's author username from mySql
			const videoAuthorUsername = (
				await prismaClient().video.findUnique({
					where: {
						videoId: video.videoId,
					},
					include: {
						user: true,
					},
				})
			)?.user.username!;

			// Pushes item to new array
			userVideos.push({
				...video,
				videoTitle: Item?.videoTitle,
				videoComments: videoComments,
				videoAuthorUsername: videoAuthorUsername,
				fileTitle: Item?.fileTitle,
				fileSize: Item?.fileSize,
				source: presignedUrl,
			});
		}
		return userVideos;
	})();

	const videoRatings = await prismaClient().videoRating.findMany();

	return (
		<VideoList
			userVideos={userVideos}
			currentUser={decodedJwtToken}
			videoRatings={videoRatings}
		/>
	);
}
