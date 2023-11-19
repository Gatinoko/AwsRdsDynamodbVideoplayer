'use server';

import UserVideoList from '@/components/user-video-list/user-video-list';
import VideoUploadForm from '@/components/video-upload-form/video-upload-form';

export default async function Home() {
	return (
		<main className='mt-4 container mx-auto flex flex-col gap-4'>
			{/* Page title */}
			<h1 className='text-5xl'>My Videos</h1>

			{/* Video upload form */}
			<VideoUploadForm />

			{/* Video list */}
			<UserVideoList />
		</main>
	);
}
