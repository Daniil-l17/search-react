import { Metadata } from 'next';
import ImagePage from './ImagePage';
import { Suspense } from 'react';

export const metadata: Metadata = {
	title: 'Firefox developer image'
};

export default function page() {
	return (
		<Suspense>
			<ImagePage />
		</Suspense>
	);
}
