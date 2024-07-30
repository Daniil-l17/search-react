'use client';
import { Logo } from '@/components/logo/Logo';
import { Input } from '@/components/ui/Input';
import { menu } from '@/constants/const';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRef, useState } from 'react';

export const SearchLayout = ({ children }: { children: React.ReactNode }) => {
	const ref = useRef<HTMLAnchorElement | null>(null);
	const searchParams = useSearchParams();
	const search = searchParams.get('q');
	const privateSearch = searchParams.get('q-private');
	const [input, setInput] = useState(privateSearch ?? search ?? '');
	const pathName = usePathname();
	const fun = () => {
		ref.current?.click();
	};

	return (
		<div className='relative py-6 px-6'>
			<div>
				<div className='flex pb-4 px-2 max-[800px]:flex-col max-[800px]:gap-4 items-center gap-10'>
					<Link href={'/'} replace className='flex gap-4 items-center'>
						<Logo width='55px' height='55px' />
						<h2 className=' w-[171px] text-[22px] font-medium'>Firefox developer</h2>
					</Link>
					<Link
						ref={ref}
						hidden
						href={
							pathName !== '/search/image-page'
								? `/search?${privateSearch ? 'q-private' : 'q'}=${input
										.split('')
										.map(item => (item === '' ? '+' : item))
										.join('')}`
								: `/search/image-page?q=${input
										.split('')
										.map(item => (item === '' ? '+' : item))
										.join('')}`
						}
					/>
					<Input func={fun} onChange={e => setInput(e.target.value)} value={input ?? ''} w={750} h={45} />
				</div>
				<div className='flex scrols gap-6 py-2'>
					{menu.map((item, index) => {
						if (item.development) {
							return <h2 className={`text-[#767676] ${item.development ? 'cursor-not-allowed ' : 'cursor-pointer hover:text-white transition duration-150'} font-semibold text-lg`}>{item.title}</h2>;
						}
						return (
							<Link
								className={` ${item.pathName !== pathName ? 'text-[#767676]' : ''} ${
									item.development ? 'cursor-not-allowed ' : 'cursor-pointer hover:text-white transition duration-150'
								} font-semibold text-lg`}
								key={index}
								href={
									item.title === 'Все'
										? `/search?q=${input
												.split('')
												.map(item => (item === '' ? '+' : item))
												.join('')}`
										: `/search/image-page?q=${input
												.split('')
												.map(item => (item === '' ? '+' : item))
												.join('')}`
								}
							>
								{item.title}
							</Link>
						);
					})}
				</div>
				<div className='bg-[#333] absolute left-0 right-0 w-full h-[1px] '></div>
				{children}
			</div>
		</div>
	);
};
