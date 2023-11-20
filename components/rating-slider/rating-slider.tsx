'use client';

import { rateVideo } from '@/server/actions/video-actions';
import { Slider } from '@nextui-org/react';
import { useState } from 'react';

export type RatingSliderProps = {
	videoId: string;
	userId: string;
	defaultValue: number;
};

export default function RatingSlider({
	videoId,
	userId,
	defaultValue,
}: RatingSliderProps) {
	const [ratingValue, setRatingValue] = useState<number | number[]>(
		defaultValue
	);

	async function ratingSliderHandler(value: number | number[]) {
		console.log('ass');
		await rateVideo(videoId, userId, value as number);
		setRatingValue(value);
	}

	return (
		<Slider
			size='md'
			step={1}
			label='How much do you like this video?'
			value={ratingValue}
			showSteps={true}
			maxValue={10}
			minValue={1}
			defaultValue={1}
			className='max-w-md'
			onChange={ratingSliderHandler}
		/>
	);
}
