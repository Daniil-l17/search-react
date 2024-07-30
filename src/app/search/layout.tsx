import { Suspense } from 'react';
import { SearchLayout } from './SearchLayout';

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<Suspense>
			<SearchLayout children={children} />
		</Suspense>
	);
};

export default layout;
