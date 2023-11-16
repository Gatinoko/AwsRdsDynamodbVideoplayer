'use client';

import { deleteVideo } from '@/server/actions/video-actions';
import { Button, Input } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

export type VideoItemProps = {
	videoId: string;
	userId: string;
	videoTitle: string;
	fileTitle: string;
	fileSize: string;
	source: string;
};

export default function VideoItem({
	videoId,
	userId,
	videoTitle,
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

	return (
		<li className='bg-slate-200 p-4 rounded-2xl flex flex-col gap-2'>
			{/* Video title & actions */}
			<div className='flex gap-2'>
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
		</li>
	);
}
