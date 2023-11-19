'use client';

import { AuthContext } from '@/context/auth-context';
import { Button, Textarea } from '@nextui-org/react';
import { useContext } from 'react';

export type CommentProps = {
	commentId: string;
	comment: string;
	userId: string;
	username: string;
	videoId: string;
};

export default function Comment({
	commentId,
	comment,
	userId,
	username,
	videoId,
}: CommentProps) {
	const { authInformation, setAuthInformation } = useContext(AuthContext);

	async function deleteVideoButtonHandler() {}

	// Checks whether the video item has the current authenticated user as its owner
	function isCommentFromCurrentUser(commentUserId: string, authUserId: string) {
		if (commentUserId === authUserId) return true;
		return false;
	}

	return (
		<li className='flex flex-col gap-2 bg-gray-300 p-2 rounded-2xl'>
			{/* Username and actions */}
			<div className='flex justify-between items-center'>
				{/* Comment author's username */}
				<h3 className='text-r font-semibold'>{username}</h3>

				{/* Action items */}
				{isCommentFromCurrentUser(authInformation.id!, userId) && (
					<Button
						size='sm'
						onClick={deleteVideoButtonHandler}
						color='danger'>
						Delete
					</Button>
				)}
			</div>

			{/* Comment textarea */}
			<Textarea
				name='comment'
				value={comment}
				isReadOnly={true}
			/>
		</li>
	);
}
