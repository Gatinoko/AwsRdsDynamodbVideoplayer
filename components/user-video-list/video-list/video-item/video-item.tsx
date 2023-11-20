'use client';

import CommentList from '@/components/comment-list/comment-list';
import RatingSlider from '@/components/rating-slider/rating-slider';
import { postComment } from '@/server/actions/comment-actions';
import { deleteVideo } from '@/server/actions/video-actions';
import { Button, Input, Slider, Textarea } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

export type VideoItemProps = {
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
	videoRatings: {
		ratingId: string;
		videoId: string;
		userId: string;
		value: number;
	}[];
	currentUser: {
		id: string;
		email: string;
		username: string;
		iat: number;
	};
	fileTitle: string;
	fileSize: string;
	source: string;
};

export default function VideoItem({
	videoId,
	userId,
	videoTitle,
	fileTitle,
	videoComments,
	videoRatings,
	currentUser,
	fileSize,
	source,
}: VideoItemProps) {
	// Router
	const router = useRouter();

	// Upload video form handler function
	async function deleteVideoButtonHandler() {
		await deleteVideo(videoId, userId);
		router.refresh();
	}

	// Post comment form handler function
	async function commentButtonHandler(formData: FormData) {
		await postComment(formData, videoId, currentUser.id);
		router.refresh();
	}

	// Checks whether the video item has the current authenticated user as its owner
	function isVideoFromCurrentUser(currentUser: {
		id: string;
		email: string;
		username: string;
		iat: number;
	}) {
		if (userId === currentUser.id) return true;
		return false;
	}

	//
	function getVideoRating(videoId: string) {
		return videoRatings.find((rating) => {
			if (rating.videoId === videoId) return rating.value;
		});
	}

	return (
		<li className='bg-gray-200 p-4 rounded-2xl flex flex-col gap-4'>
			{/* Video title & actions */}
			<div className='flex gap-2 items-center justify-between'>
				{/* Video title */}
				<h1 className='text-3xl font-bold'>{videoTitle}</h1>

				{/* Action items */}
				{isVideoFromCurrentUser(currentUser) && (
					<Button
						onClick={deleteVideoButtonHandler}
						size='sm'
						color='danger'>
						Delete
					</Button>
				)}
			</div>

			{/* Video HTML element */}
			<video
				key={source}
				controls
				className='h-80 w-full rounded-2xl'>
				<source src={source} />
			</video>

			{/* File metadata information */}
			<div className='flex flex-col gap-2'>
				{/* Video id */}
				<Input
					key='id'
					type='text'
					label='Video Id'
					name='id'
					value={videoId}
					readOnly
				/>

				{/* File title & File Size */}
				<div className='flex gap-2'>
					<Input
						key='fileTitle'
						type='text'
						label='File Title'
						name='fileTitle'
						value={fileTitle}
						readOnly
					/>

					<Input
						key='fileSize'
						type='text'
						label='File Size'
						name='fileSize'
						value={fileSize}
						readOnly
					/>
				</div>
			</div>

			{/* Rating slider */}
			<RatingSlider
				videoId={videoId}
				userId={userId}
				defaultValue={
					getVideoRating(videoId) ? getVideoRating(videoId)?.value! : 1
				}
			/>

			{/* Comments */}
			<div className='flex flex-col gap-4'>
				{/* Title */}
				<h2 className='text-2xl font-semibold'>Comments</h2>

				{/* Comment form */}
				<form
					className='flex gap-2 items-center'
					action={commentButtonHandler}>
					{/* Comment box */}
					<Textarea
						label='Comment'
						name='comment'
						placeholder='Enter your description'
						required
					/>

					{/* Button */}
					<Button type='submit'>Comment</Button>
				</form>

				{/* Comment list */}
				<CommentList videoComments={videoComments} />
			</div>
		</li>
	);
}
