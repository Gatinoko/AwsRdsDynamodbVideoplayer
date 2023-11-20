'use server';

import UserVideoList from '@/components/user-video-list/user-video-list';
import VideoUploadForm from '@/components/video-upload-form/video-upload-form';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export default async function Home() {
	// Decoded jwt token
	const decodedJwtToken: any = jwt.decode(cookies().get('token')?.value!);

	return (
		<main className='mt-4 container mx-auto flex flex-col gap-4'>
			{/* Page title */}
			<h1 className='text-5xl'>My Videos</h1>

			{/* Video upload form */}
			<VideoUploadForm />

			{/* Video list */}
			<UserVideoList username={decodedJwtToken.username} />
		</main>
	);
}
