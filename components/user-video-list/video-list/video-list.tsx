'use client';

import { createPresigned } from '@/aws/aws-utils';
import VideoItem from './video-item/video-item';
import { Button, ButtonProps } from '@nextui-org/react';
import { ReactElement } from 'react';

export type UserVideoUploadList = {
	userVideos: {
		videoId: string;
		userId: string;
	}[];
	videoSource: (key: string) => Promise<string>;
	deleteButton: ReactElement<ButtonProps>;
};

export default function VideoList({
	deleteButton,
	videoSource,
	userVideos,
}: UserVideoUploadList) {
	return (
		<ul className='flex flex-col gap-2'>
			{userVideos?.map((video, index) => (
				<VideoItem
					key={index}
					id={video.videoId}
					source={videoSource(video.videoId)}
					deleteButton={deleteButton}
				/>
			))}
		</ul>
	);
}
