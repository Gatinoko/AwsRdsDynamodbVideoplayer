'use client';

import VideoItem from './video-item/video-item';

export type UserVideoListProps = {
	userVideos: {
		videoId: string;
		userId: string;
		videoTitle: string;
		videoComments: ({
			user: {
				id: string;
				creationDate: Date;
				email: string;
				username: string;
				password: string;
			};
		} & {
			commentId: string;
			comment: string;
			userId: string;
			videoId: string;
		})[];
		fileTitle: string;
		fileSize: string;
		source: string;
	}[];
	currentUser: {
		id: string;
		email: string;
		username: string;
		iat: number;
	};
	videoRatings: {
		ratingId: string;
		videoId: string;
		userId: string;
		value: number;
	}[];
};

export default function VideoList({
	userVideos,
	currentUser,
	videoRatings,
}: UserVideoListProps) {
	return (
		<ul className='flex flex-col gap-2'>
			{userVideos?.map((video, index) => (
				<VideoItem
					currentUser={currentUser}
					key={index}
					videoId={video.videoId}
					userId={video.userId}
					videoTitle={video.videoTitle}
					videoComments={video.videoComments}
					fileTitle={video.fileTitle}
					fileSize={video.fileSize}
					source={video.source}
					videoRatings={videoRatings}
				/>
			))}
		</ul>
	);
}
