import { z } from 'zod';

/**
 * Zod schema for validating the `uploadVideo` server action.
 */
export const uploadVideoSchema = z.object({
	file: z.string(),
	username: z.string(),
	password: z.string(),
});
