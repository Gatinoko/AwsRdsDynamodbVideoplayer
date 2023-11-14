import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { BUCKET_NAME, S3_CLIENT } from './aws-config';
import { GetObjectCommand } from '@aws-sdk/client-s3';

/**
 * Creates a presigned url in order to enable access to specific Bucket objects for a certain period of time.
 *
 * @param {string} key - File name for which the presigned URL will be generated.
 */
export async function createPresigned(key: string) {
	return await getSignedUrl(
		S3_CLIENT,
		new GetObjectCommand({ Bucket: BUCKET_NAME, Key: key }),
		{ expiresIn: 3600 }
	);
}
