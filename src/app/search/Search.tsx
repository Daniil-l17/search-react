'use client';
import { SearchResult } from '@/components/searchResults/SearchResult';
import { ResultSkeleton } from '@/components/skeleton/ResultSkeleton';
import { Skileton } from '@/components/skeleton/Skileton';
import { useContextHook } from '@/hooks/useContext';
import { searchServices } from '@/services/searchServices';
import { Item } from '@/types/search';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
const Search = () => {
	const searchParams = useSearchParams();
	const search = searchParams.get('q');
	const privateSearch = searchParams.get('q-private');
	const [index, setIndex] = useState({ startIndex: 1, page: 1 });
	const [searchResult, setSearchResult] = useState<Item[]>([]);
	const { setting } = useContextHook();

	const queryClient = useQueryClient();
	const { data, error, refetch, isFetching, isLoading } = useQuery({
		queryKey: ['searchInfo'],
		queryFn: async () => await searchServices.getSearch(privateSearch ?? search ?? '', index.startIndex),
		refetchOnWindowFocus: false
	});

	const { ref: refInView, inView } = useInView({
		threshold: 0.2
	});

	useEffect(() => {
		setSearchResult([]);
		refetch();
		setIndex({ page: 1, startIndex: 1 });
		return () => {
			queryClient.removeQueries({ queryKey: ['searchInfo'] });
		};
	}, [search, privateSearch]);

	useEffect(() => {
		if (data?.items.length) {
			setSearchResult(prev => [...prev, ...data.items]);
		}
	}, [data?.items]);

	useEffect(() => {
		if (data?.items.length) {
			if (searchResult.length) {
				if (inView) {
					setIndex({ page: (index.page += 1), startIndex: (index.startIndex += 10) });
					refetch();
				}
			}
		}
	}, [inView]);

	return (
		<div>
			{isFetching && !searchResult.length ? (
				<ResultSkeleton />
			) : (
				<SearchResult time={data?.searchInformation.formattedSearchTime ?? '0'} title={search ?? ''} totalResult={data?.searchInformation.formattedTotalResults ?? ''} />
			)}
			<div className='mt-2 flex flex-col gap-5'>
				{isFetching && !searchResult.length ? (
					<div>
						{[...Array(7)].map((_, index) => (
							<Skileton index={index} />
						))}
					</div>
				) : error ? (
					<p className=' text-lg font-semibold'>По вашему запросу ничего не найденно 😔</p>
				) : (
					searchResult.map((item, index) => (
						<div key={index}>
							<div className='flex mb-[2px] gap-2 items-center'>
								<div
									style={{
										backgroundImage: `url(${
											(item.pagemap?.metatags?.[0]?.['og:image'] ?? '').includes('cdninstagram') ||
											(item.pagemap?.metatags?.[0]?.['og:image'] ?? '').includes('fbsbx') ||
											(item.pagemap?.metatags?.[0]?.['og:image'] ?? '').includes('bbci') ||
											(item.pagemap?.metatags?.[0]?.['og:image'] ?? '').includes('euronews') ||
											(item.pagemap?.metatags?.[0]?.['og:image'] ?? '').includes('ds-aliev') ||
											(item.pagemap?.metatags?.[0]?.['og:image'] ?? '').includes('twimg.com')
												? item?.pagemap?.['cse_thumbnail']?.[0].src
												: item?.pagemap?.metatags?.[0]?.['og:image'] ?? ''
										})`
									}}
									className='imgCenter'
								></div>
								<div className='w-full flex-1'>
									<h2 className=''>{item.displayLink}</h2>
									<p className='w-full max-[620px]:truncate max-[620px]:w-[230px] max-[620px]:text-[14px] max-[620px]:font-semibold '>{item.formattedUrl}</p>
								</div>
							</div>
							<a
								onClick={() => {
									!privateSearch && setting.addSearchHistory(item);
								}}
								target='_blank'
								href={item.formattedUrl}
								className=' max-[620px]:text-[19px] textWebkitLineClampMain text-[22px] cursor-pointer text-[#8eb3fd] font-medium'
							>
								{item.title}
							</a>
							<p className='textWebkitLineClamp w-full max-w-[700px] text-wrap'>{item.snippet}</p>
						</div>
					))
				)}
				{searchResult?.length && !isLoading ? (
					<p className=' opacity-0' ref={refInView}>
						loading...
					</p>
				) : null}
			</div>
		</div>
	);
};

export default Search;
