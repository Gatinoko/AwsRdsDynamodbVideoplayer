import { z } from 'zod';

/**
 * Zod schema for validating the `uploadVideo` server action.
 */
export const postCommentSchema = z.object({
	commentId: z.string(),
	comment: z.string(),
	userId: z.string(),
	videoId: z.string(),
});
