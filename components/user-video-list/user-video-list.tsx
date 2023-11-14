'use server';

import jwt from 'jsonwebtoken';
import prismaClient from '@/prisma/prisma';
import { cookies } from 'next/headers';
import { Button, ButtonProps } from '@nextui-org/react';
import VideoList from './video-list/video-list';
// import { createPresigned } from '@/aws/aws-utils';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { BUCKET_NAME, S3_CLIENT } from '@/aws/aws-config';
import { GetObjectCommand } from '@aws-sdk/client-s3';

async function createPresigned(key: string) {
	'use server';

	return await getSignedUrl(
		S3_CLIENT,
		new GetObjectCommand({ Bucket: BUCKET_NAME, Key: key }),
		{ expiresIn: 3600 }
	);
}

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

	const userVideosWithSource: unknown = userVideos.map(
		async (video, index, array) => {
			const userVideosWithSource = {
				...video,
				source: await createPresigned(video.videoId),
			};
		}
	);

	return (
		<>
			{/* Video list */}
			<VideoList
				userVideos={userVideos}
				videoSource={createPresigned}
				deleteButton={
					<Button
						onClick={() => {
							console.log('delete action');
						}}>
						Delete
					</Button>
				}
			/>
		</>
	);
}
