'use client';

import { ReactElement } from 'react';
import VideoItem from './video-item/video-item';
import CommentList from '@/components/comment-list/comment-list';

export type UserVideoListProps = {
	userVideos: {
		videoId: string;
		userId: string;
		videoTitle: string;
		videoComments: {
			commentId: string;
			comment: string;
			userId: string;
			username: string;
			videoId: string;
		}[];
		fileTitle: string;
		fileSize: string;
		source: string;
	}[];
};

export default function VideoList({ userVideos }: UserVideoListProps) {
	return (
		<ul className='flex flex-col gap-2'>
			{userVideos?.map((video, index) => (
				<VideoItem
					key={index}
					videoId={video.videoId}
					userId={video.userId}
					videoTitle={video.videoTitle}
					videoComments={video.videoComments}
					fileTitle={video.fileTitle}
					fileSize={video.fileSize}
					source={video.source}
				/>
			))}
		</ul>
	);
}
