'use client';

import Comment from './comment/comment';

export type CommentListProps = {
	videoComments: {
		commentId: string;
		comment: string;
		userId: string;
		username: string;
		videoId: string;
	}[];
};

export default function CommentList({ videoComments }: CommentListProps) {
	return (
		<>
			{/* Title */}
			<h2 className='text-2xl font-semibold'>Comments</h2>

			{/* List of comments */}
			<ul className='flex flex-col gap-2'>
				{videoComments?.map((comment, index) => (
					<Comment
						key={index}
						commentId={comment.commentId}
						comment={comment.comment}
						username={comment.username}
						videoId={comment.videoId}
					/>
				))}
			</ul>
		</>
	);
}
