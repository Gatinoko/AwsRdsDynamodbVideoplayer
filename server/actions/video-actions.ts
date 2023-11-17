'use server';

import { Upload } from '@aws-sdk/lib-storage';
import { redirect } from 'next/navigation';
import { Error } from '@/types/action-types';
import prismaClient from '@/prisma/prisma';
import {
	BUCKET_NAME,
	DB_CLIENT,
	S3_CLIENT,
	TABLE_NAME,
} from '@/aws/aws-config';
import { randomUUID } from 'crypto';
import {
	DeleteCommand,
	PutCommand,
	UpdateCommand,
} from '@aws-sdk/lib-dynamodb';

/**
 * Server action for the video upload form.
 *
 * @param {FormData} data - Client form data.
 * @param {string} username - User which initiated the upload action.
 */
export async function uploadVideo(data: FormData, username: string) {
	// TODO: ERROR HANDLING

	// Assigns form values to object
	const formValues = {
		file: data.get('file'),
		videoTitle: data.get('videoTitle'),
	} as { file: File; videoTitle: string; username: string };

	// New object's unique UUID
	const newVideoUploadUUID = randomUUID();

	// Data stream buffer with file contents
	const newVideoUpload = await new Upload({
		client: S3_CLIENT,
		params: {
			Bucket: BUCKET_NAME,
			Key: newVideoUploadUUID,
			Body: formValues.file.stream(),
			ContentType: 'video/mp4',
		},
	}).done();
	if (!('Location' in newVideoUpload))
		throw new Error('Error uploading the file.', {
			cause: 'FILE_UPLOAD_ERROR',
		});

	// If upload is successful issue a put command to Dynamodb and append the newly uploaded video's information to the "Videos" table
	const dynamoDbResponse = await DB_CLIENT.send(
		new PutCommand({
			TableName: TABLE_NAME,
			Item: {
				videoId: newVideoUploadUUID,
				videoTitle: formValues.videoTitle,
				fileTitle: formValues.file.name,
				fileSize: formValues.file.size,
			},
			// ReturnValues: 'ALL_OLD',
		})
	);

	// Updates user data in mySQL with a reference to the uploaded video's id
	await prismaClient().user.update({
		where: {
			username: username,
		},
		data: {
			videos: {
				create: [
					{
						videoId: newVideoUploadUUID,
					},
				],
			},
		},
	});

	return dynamoDbResponse;

	// Zod form schema validation
	// videoUploadSchema.parse(formValues);

	console.log(formValues);

	// Redirects user to login page
	redirect('/login');
}

/**
 * Server action for `VideoItem`'s delete video button
 *
 * @param {string} videoId - Id of the video to be deleted.
 * @param {string} userId - User which initiated the delete action.
 */
export async function deleteVideo(videoId: string, userId: string) {
	// TODO: ERROR HANDLING

	// Sends update query to mySql
	await prismaClient().video.delete({
		where: {
			videoId: videoId,
		},
	});

	// Sends delete query to Videos Dynamodb table
	await DB_CLIENT.send(
		new DeleteCommand({
			TableName: TABLE_NAME,
			Key: {
				videoId: videoId,
			},
			// ReturnValues: 'ALL_OLD',
		})
	);
}

/**
 * Server action for `RatingSlider`'s slider
 *
 * @param {string} videoId - Id of the video to be rated.
 * @param {string} userId - User which initiated the rating action.
 * @param {string} ratingValue - The selected value.
 */
export async function rateVideo(
	videoId: string,
	userId: string,
	ratingValue: number
) {
	// TODO: ERROR HANDLING

	// Checks database if user already has a rating in the respective video
	const userRating = await prismaClient().videoRating.findUnique({
		where: {
			videoId: videoId,
			userId: userId,
		},
	});

	// If rating already exists, send update operation, otherwise send create operation
	if (userRating) {
		await prismaClient().videoRating.update({
			where: {
				videoId: videoId,
				userId: userId,
			},
			data: {
				value: ratingValue,
			},
		});
	} else {
		await prismaClient().videoRating.create({
			data: {
				videoId: videoId,
				userId: userId,
				value: ratingValue,
			},
		});
	}
}
