'use client';

import CommentList from '@/components/comment-list/comment-list';
import { postComment } from '@/server/actions/comment-actions';
import { deleteVideo } from '@/server/actions/video-actions';
import { Button, Input, Textarea } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { ReactElement } from 'react';

export type VideoItemProps = {
	videoId: string;
	userId: string;
	videoComments: {
		commentId: string;
		comment: string;
		userId: string;
		username: string;
		videoId: string;
	}[];
	videoTitle: string;
	fileTitle: string;
	fileSize: string;
	source: string;
};

export default function VideoItem({
	videoId,
	userId,
	videoTitle,
	videoComments,
	fileTitle,
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
		await postComment(formData, videoId, userId);
		router.refresh();
	}

	return (
		<li className='bg-slate-200 p-4 rounded-2xl flex flex-col gap-2'>
			{/* Video title & actions */}
			<div className='flex gap-2 items-center'>
				<Input
					key='videoTitle'
					type='text'
					label='Video Title'
					name='videoTitle'
					value={videoTitle}
					readOnly
				/>

				<Button onClick={deleteVideoButtonHandler}>Delete</Button>
			</div>

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

			{/* Video HTML element */}
			<video
				key={source}
				controls
				className='h-80 w-full rounded-2xl'>
				<source src={source} />
			</video>

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
		</li>
	);
}
