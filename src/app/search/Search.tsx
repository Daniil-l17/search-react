'use client'
import { Logo } from '@/components/logo/Logo';
import { SearchResult } from '@/components/searchResults/SearchResult';
import { ResultSkeleton } from '@/components/skeleton/ResultSkeleton';
import { Skileton } from '@/components/skeleton/Skileton';
import { Input } from '@/components/ui/Input';

import { searchServices } from '@/services/searchServices';
import { Item } from '@/types/search';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const menu = [
	{ title: 'Все', development: false },
	{ title: 'Изображения', development: false },
	{ title: 'Картинки', development: true },
	{ title: 'Видео', development: true },
	{ title: 'Покупки', development: true }
] as const;

const negative = ['сука', 'блять', 'ахуеть', 'пиздец', 'пидр'];

const Search = () => {
	const searchParams = useSearchParams();
	const search = searchParams.get('q');
	const [index, setIndex] = useState({ startIndex: 1, page: 1 });
	const [input, setInput] = useState(search ?? '');
	const ref = useRef<HTMLAnchorElement | null>(null);
	const [searchResult, setSearchResult] = useState<Item[]>([]);
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ['searchInfo'],
		queryFn: async () => await searchServices.getSearch(search ?? '', index.startIndex, index.page),
		refetchOnWindowFocus: false
	});

	const { ref: refInView, inView } = useInView({
		threshold: 0.2
	});

	useEffect(() => {
		if (data?.items) {
			setSearchResult(prev => [...prev, ...data.items]);
		}
	}, [data]);

	useEffect(() => {
		if (data?.items.length) {
			if (inView) {
				setIndex({ page: (index.page += 1), startIndex: (index.startIndex += 10) });
				refetch();
			}
		}
	}, [inView]);

	const fun = () => {
		ref.current?.click();
		refetch();
		setSearchResult([]);
		setIndex({ page: 1, startIndex: 1 });
	};

	console.log(searchResult);

	return (
		<div className='relative py-6 px-6'>
			<div>
				<div className='flex pb-4 max-[800px]:flex-col max-[800px]:gap-4 items-center gap-10'>
					<Link href={'/'} replace className='flex gap-4 items-center'>
						<Logo width='55px' height='55px' />
						<h2 className=' text-[22px] font-medium'>Firefox developer</h2>
					</Link>
					<Link
						ref={ref}
						hidden
						href={`/search?q=${input
							.split('')
							.map(item => (item === '' ? '+' : item))
							.join('')}`}
					/>
					<Input func={fun} onChange={e => setInput(e.target.value)} value={input ?? ''} w={750} h={45} />
				</div>
				<div className='flex gap-6 max-[460px]:overflow-auto py-2'>
					{menu.map((item, index) => {
						return (
							<h2
								className={` ${item.title !== 'Все' ? 'text-[#767676]' : ''} ${
									item.development ? 'cursor-not-allowed ' : 'cursor-pointer hover:text-white transition duration-150'
								} font-semibold text-lg`}
								key={index}
							>
								{item.title}
							</h2>
						);
					})}
				</div>
				<div className='bg-[#333] absolute left-0 right-0 w-full h-[1px] '></div>
				{isLoading ? (
					<ResultSkeleton />
				) : (
					<SearchResult time={data?.searchInformation.formattedSearchTime ?? '0'} title={search ?? ''} totalResult={data?.searchInformation.formattedTotalResults ?? ''} />
				)}
				<div className='mt-2 flex flex-col gap-5'>
					{isLoading ? (
						<div>
							{[...Array(7)].map(() => (
								<Skileton />
							))}
						</div>
					) : error ? (
						<p className=' text-lg font-semibold'>По вашему запросу ничего не найденно 😔</p>
					) : (
						searchResult.map(item => (
							<div>
								<div className='flex mb-[2px] gap-2 items-center'>
									<img
										src={item.pagemap.metatags[0]['og:image']?.length ? item.pagemap.metatags[0]['og:image'] : item.pagemap['cse_thumbnail']?.[0].src ?? './not-found-image-15383864787lu.jpg'}
										className=' w-[40px] object-center object-cover h-[40px] rounded-[50%]'
										alt={item.title}
									/>
									<div>
										<h2 className=''>{item.displayLink}</h2>
										<p>{item.formattedUrl}</p>
									</div>
								</div>
								<a target='_blank' href={item.formattedUrl} className=' text-[22px] cursor-pointer text-[#8eb3fd] font-medium'>
									{item.title}
								</a>
								<p className=' w-[700px] text-wrap'>{item.snippet}</p>
							</div>
						))
					)}
					{searchResult?.length && !isLoading ? <p ref={refInView}>loading...</p> : null}
				</div>
			</div>
		</div>
	);
};

export default Search;
