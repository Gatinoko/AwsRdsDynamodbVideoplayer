'use client';

import VideoItem from './video-item/video-item';

export type UserVideoUploadListProps = {
	userVideos: {
		videoId: string;
		userId: string;
		videoTitle: string;
		fileTitle: string;
		fileSize: string;
		source: string;
	}[];
};

export default function VideoList({ userVideos }: UserVideoUploadListProps) {
	return (
		<ul className='flex flex-col gap-2'>
			{userVideos?.map((video, index) => (
				<VideoItem
					key={index}
					videoId={video.videoId}
					userId={video.userId}
					videoTitle={video.videoTitle}
					fileTitle={video.fileTitle}
					fileSize={video.fileSize}
					source={video.source}
				/>
			))}
		</ul>
	);
}
