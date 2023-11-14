import { S3Client } from '@aws-sdk/client-s3';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

export const TABLE_NAME = 'Videos';

export const BUCKET_NAME = 'uploaded-videos-bucket';

export const DB_CLIENT = new DynamoDBClient({
	region: 'us-east-2',
	credentials: {
		accessKeyId: process.env.ACCESS_KEY_ID as string,
		secretAccessKey: process.env.SECRET_ACCESS_KEY as string,
	},
});

export const S3_CLIENT = new S3Client({
	region: 'us-east-2',
	credentials: {
		accessKeyId: process.env.ACCESS_KEY_ID as string,
		secretAccessKey: process.env.SECRET_ACCESS_KEY as string,
	},
});

export const docClient = DynamoDBDocumentClient.from(DB_CLIENT);
