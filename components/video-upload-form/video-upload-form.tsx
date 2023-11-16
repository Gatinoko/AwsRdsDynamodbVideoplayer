'use client';

import { Button, Input } from '@nextui-org/react';
import { useContext, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { uploadVideo } from '@/server/actions/video-actions';
import { AuthContext } from '@/context/auth-context';

export default function VideoUploadForm() {
	// Router
	const router = useRouter();

	// Auth context information
	const { authInformation, setAuthInformation } = useContext(AuthContext);

	// HTML form element reference
	const formElementRef = useRef<HTMLFormElement>(null);

	// Error message
	const [errorMessage, setErrorMessage] = useState<string>('‎ ');

	// Upload video form handler function
	async function videoUploadFormHandler(formData: FormData) {
		const serverResponse = await uploadVideo(
			formData,
			authInformation.username!
		);
		router.refresh();
	}

	return (
		<form
			ref={formElementRef}
			className='flex flex-col gap-2 bg-gray-200 rounded-xl p-4'
			action={videoUploadFormHandler}>
			{/* Form title */}
			<h2 className='text-2xl font-semibold'>Upload New Video</h2>

			{/* Upload input */}
			<input
				type='file'
				name='file'
				accept='video/mp4'
				required
			/>

			{/* Video title input */}
			<Input
				key='videoTitle'
				type='text'
				label='Video Title'
				name='videoTitle'
				isRequired={true}
			/>

			{/* Form error message */}
			<p className='text-red-500'>{errorMessage}</p>

			{/* Login button */}
			<Button type='submit'>Upload</Button>
		</form>
	);
}
