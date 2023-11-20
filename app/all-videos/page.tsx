import UserVideoList from '@/components/user-video-list/user-video-list';

export default function AllVideosPage() {
	return (
		<main className='mt-4 container mx-auto flex flex-col gap-4'>
			<h1 className='text-5xl'>All Videos</h1>
			{/* Video list */}
			<UserVideoList />
		</main>
	);
}
