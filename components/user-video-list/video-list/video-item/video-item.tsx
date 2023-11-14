'use server';

import { DB_CLIENT, TABLE_NAME } from '@/aws/aws-config';
import { GetCommand } from '@aws-sdk/lib-dynamodb';
import { Button, ButtonProps, Input } from '@nextui-org/react';
import { ReactElement } from 'react';

export type VideoItemProps = {
	id: string;
	source: Promise<string>;
	deleteButton: ReactElement<ButtonProps>;
};

export default async function VideoItem({
	id,
	source,
	deleteButton,
}: VideoItemProps) {
	// S3 presigned url that allows access to the video temporarily
	const presignedUrl = await source;

	// Video information stored in Dynamodb
	const { Item } = await DB_CLIENT.send(
		new GetCommand({
			TableName: TABLE_NAME,
			Key: {
				videoId: id,
			},
		})
	);

	return (
		<li className='bg-slate-200 p-4 rounded-2xl flex flex-col gap-2'>
			{/* Video title & actions */}
			<div className='flex gap-2'>
				<Input
					key='videoTitle'
					type='text'
					label='Video Title'
					name='videoTitle'
					value={Item?.videoTitle}
					readOnly
				/>

				{deleteButton}
			</div>

			{/* Video id */}
			<Input
				key='id'
				type='text'
				label='Video Id'
				name='id'
				value={Item?.videoId}
				readOnly
			/>

			{/* File title & File Size */}
			<div className='flex gap-2'>
				<Input
					key='fileTitle'
					type='text'
					label='File Title'
					name='fileTitle'
					value={Item?.fileTitle}
					readOnly
				/>

				<Input
					key='fileSize'
					type='text'
					label='File Size'
					name='fileSize'
					value={Item?.fileSize}
					readOnly
				/>
			</div>

			{/* Video HTML element */}
			{presignedUrl && (
				<video
					controls
					className='h-80 w-full rounded-2xl'>
					<source src={presignedUrl} />
				</video>
			)}
		</li>
	);
}
