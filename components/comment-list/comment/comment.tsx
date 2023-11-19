'use client';

import { Textarea } from '@nextui-org/react';

export type CommentProps = {
	commentId: string;
	comment: string;
	username: string;
	videoId: string;
};

export default function Comment(props: CommentProps) {
	return (
		<li className='flex flex-col gap-2 bg-gray-300 p-2 rounded-2xl'>
			<h3 className='text-r font-semibold'>{props.username}</h3>
			<Textarea
				name='comment'
				value={props.comment}
				isReadOnly={true}
			/>
		</li>
	);
}
