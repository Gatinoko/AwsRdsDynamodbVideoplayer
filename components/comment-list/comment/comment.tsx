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
		<li className='flex flex-col gap-2 bg-red-500 p-2 rounded-xl'>
			<p>{props.username}</p>
			<Textarea
				name='comment'
				value={props.comment}
				isReadOnly={true}
			/>
		</li>
	);
}
