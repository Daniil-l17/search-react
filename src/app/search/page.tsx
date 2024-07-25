import { Metadata } from 'next';
import Search from './Search';
import { axiosBase } from '@/config/axiosBase';
import { Search as searchType } from '@/types/search';
import { Suspense } from 'react';

type Props = {
	searchParams: { q: string };
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
	try {
/*		const searchInfo = (await axiosBase.get<searchType>(`&q=${searchParams.q}`)).data;
		return {
			title: `${searchInfo.queries.request[0].searchTerms} - Firefox нашлось ${searchInfo.queries.request[0].totalResults}`
		};*/
	} catch {
		return {
			title: 'Firefox developer'
		};
	}
}

const page = () => {
	return (
		<Suspense>
			<Search />
		</Suspense>
	);
};

export default page;
