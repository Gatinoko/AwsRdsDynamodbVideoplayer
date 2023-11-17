'use server';

import jwt from 'jsonwebtoken';
import prismaClient from '@/prisma/prisma';
import { cookies } from 'next/headers';
import VideoList from './video-list/video-list';
import { DB_CLIENT, TABLE_NAME } from '@/aws/aws-config';
import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { createPresigned } from '@/aws/aws-utils';

export type UserVideoListProps = {};

export default async function UserVideoList(props: UserVideoListProps) {
	// Decoded jwt token
	const decodedJwtToken: any = jwt.decode(cookies().get('token')?.value!);

	// Gets a user's uploaded video ids
	const userVideos = (
		await prismaClient().user.findUnique({
			where: {
				username: decodedJwtToken?.username,
			},
			include: {
				videos: true,
			},
		})
	)?.videos!;

	const userVideosWithSource = await (async () => {
		let userVideosWithInformation = [];
		for (const video of userVideos) {
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

			// Pushes item to new array
			userVideosWithInformation.push({
				...video,
				videoTitle: Item?.videoTitle,
				videoComments: videoComments,
				fileTitle: Item?.fileTitle,
				fileSize: Item?.fileSize,
				source: presignedUrl,
			});
		}
		return userVideosWithInformation;
	})();

	return <VideoList userVideos={userVideosWithSource} />;
}
