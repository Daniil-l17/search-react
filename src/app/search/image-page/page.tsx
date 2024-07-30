import { Metadata } from 'next';
import ImagePage from './ImagePage';

export const metadata: Metadata = {
	title: 'Firefox developer image'
};

export default function page() {
	return (
			<ImagePage />
	);
}
