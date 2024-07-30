'use client';
import { SearchSkeleton } from '@/components/skeleton/SearchSkeleton';
import { searchServices } from '@/services/searchServices';
import { Item } from '@/types/searchImage';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const ImagePage = () => {
	const searchParams = useSearchParams();
	const search = searchParams.get('q');
	const [searchResultImage, setSearchResultImage] = useState<Item[]>([]);
	const [index, setIndex] = useState({ startIndex: 1, page: 1 });
	const { ref: refInView, inView } = useInView({
		threshold: 0.2
	});

	const { data, error, refetch, isFetching, isLoading } = useQuery({
		queryKey: ['searchInfoImage'],
		queryFn: async () => await searchServices.getSearchImage(search ?? '', index.startIndex),
		refetchOnWindowFocus: false,
		enabled: false
	});

	useEffect(() => {
		if (searchResultImage.length) {
			setSearchResultImage([]);
			refetch();
			setIndex({ page: 1, startIndex: 1 });
		}
	}, [search]);

	useEffect(() => {
		if (data?.items.length) {
			setSearchResultImage(prev => [...prev, ...data.items]);
		}
	}, [data]);

	useEffect(() => {
		if (data?.items.length) {
			if (searchResultImage.length) {
				if (inView) {
					setIndex({ page: (index.page += 1), startIndex: (index.startIndex += 10) });
					refetch();
				}
			}
		}
	}, [inView]);

	useEffect(() => {
		refetch();
	}, [search]);
	return (
		<div>
			<div className='w-full max-[1200px]:justify-evenly max-[700px]:justify-center max-[1000px]:center max-[700px]:gap-3 mt-4 flex flex-wrap gap-8'>
				{isFetching && !searchResultImage.length ? (
					[...Array(12)].map((_, index) => {
						return <SearchSkeleton index={index} />;
					})
				) : error ? (
					<p className=' text-lg font-semibold'>По вашему запросу ничего не найденно 😔</p>
				) : (
					searchResultImage.map((item, index) => (
						<div
							onClick={() => window.open(item.image.contextLink)}
							key={index}
							className='w-[280px] max-[420px]:w-[350px] max-[420px]:h-[400px]  max-[700px]:h-[350px] max-[700px]:w-[180px] cursor-pointer rounded-md activeImage h-[390px]'
						>
							{/*							<img
								src={`${
									item.link.includes('instagram') ||
									item.link.includes('fbsbx') ||
									item.link.includes('bbci') ||
									item.link.includes('euronews') ||
									item.link.includes('ds-aliev') ||
									item.link.includes('twimg.com')
										? item.image.thumbnailLink
										: item.link
								}`}
								alt=''
								loading='lazy'
								className='w-[280px] '
							/>*/}
							<div
								style={{
									backgroundImage: `url(${
										item.link.includes('instagram') ||
										item.link.includes('fbsbx') ||
										item.link.includes('tiktok.com') ||
										item.link.includes('bbci') ||
										item.link.includes('euronews') ||
										item.link.includes('ds-aliev') ||
										item.link.includes('twimg.com')
											? item.image.thumbnailLink
											: item.link
									})`
								}}
								className='activeImage max-[420px]:w-[350px]  max-[420px]:!object-fill max-[420px]:h-[320px] max-[700px]:w-[180px] max-[700px]:h-[228px] object-cover bg-[#333] activeImage rounded-md h-[290px] '
							></div>
							<div className=' mt-[2px]'>
								<h2 className=' text-[19px] max-[700px]:text-[16px] truncate w-[170px] font-semibold'>{item.displayLink}</h2>
								<p className=' font-medium'>{item.title}</p>
							</div>
						</div>
					))
				)}
			</div>
			{searchResultImage?.length && !isLoading ? (
				<p className=' opacity-0' ref={refInView}>
					loading...
				</p>
			) : null}
		</div>
	);
};

export default ImagePage;
