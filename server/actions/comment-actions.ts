'use server';

import { redirect } from 'next/navigation';
import prismaClient from '@/prisma/prisma';
import { randomUUID } from 'crypto';
import { postCommentSchema } from '../schemas/comment-schemas';

/**
 * Server action for the post comment form.
 *
 * @param {FormData} data - Client form data.
 * @param {string} videoId - Video where the comment is to be posted.
 * @param {string} userId - User which initiated the comment action.
 */
export async function postComment(
	data: FormData,
	videoId: string,
	userId: string
) {
	// New comments's unique UUID
	const newCommentUUID = randomUUID();

	// Assigns form values to object
	const formValues = {
		commentId: newCommentUUID,
		comment: data.get('comment') as string,
		userId: userId,
		videoId: videoId,
	};

	// Creates new comment object on mySql
	await prismaClient().comment.create({
		data: formValues,
	});

	// Zod form schema validation
	postCommentSchema.parse(formValues);

	// Redirects user to login page
	redirect('/my-videos');
}
