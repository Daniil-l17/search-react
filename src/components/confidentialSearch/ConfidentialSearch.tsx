'use client';
import { Search } from 'lucide-react';
import { Logo } from '../logo/Logo';
import { memo, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useContextHook } from '@/hooks/useContext';
import { negative } from '@/constants/const';
import { toast } from 'react-toastify';

export const ConfidentialSearch = memo(() => {
	const [active, setActive] = useState(false);
	const ref = useRef<HTMLAnchorElement | null>(null);
	const [input, setInput] = useState('');
	const { setting } = useContextHook();

	useEffect(() => {
		if (active) {
			localStorage.setItem('isPrivateSearch', JSON.stringify(true));
			setting.setPrivateSearch(true);
		} else{
      localStorage.setItem('isPrivateSearch', JSON.stringify(false));
			setting.setPrivateSearch(false);
    }
	}, [active]);

	function fun() {
		if (input.length >= 3) {
			if (setting.messageFiltering) {
				if (negative.some(item => input.toUpperCase().includes(item.toUpperCase()))) {
					toast.error('В вашем запросе есть плохие слова! 👿', { theme: 'colored' });
				} else {
					ref.current?.click();
				}
			} else {
				ref.current?.click();
			}
		}
	}

	return (
		<>
			<div onClick={() => setActive(false)} className={`fixed top-0 transition-all duration-300 left-0 right-0 bottom-0 ${active ? 'bg-[#3e3e3ea0] z-10 ' : '-z-10'}`}></div>
			<div className={` mx-2 fixed flex justify-center items-center transition-all duration-300 left-0 right-0 ${active ? 'bottom-[75%] max-[820px]:bottom-[50%] z-20' : 'bottom-8 '}`}>
				<div onClick={() => setActive(prev => !prev)} className='w-full items-center flex border-[1px] border-[#ffffff53] px-6 max-w-[600px] bg-[#3b3b3ba9] py-4 rounded-lg'>
					<div className='flex w-full items-center gap-4'>
						<div className=' mr-[2px]'>
							<Logo width='30px' height='30px' />
						</div>
						<Link
							ref={ref}
							hidden
							href={`/search?q-private=${input
								.split('')
								.map(item => (item === '' ? '+' : item))
								.join('')}`}
						/>
						<input
							onClick={e => {
								active && e.stopPropagation();
							}}
							value={input}
							onChange={e => setInput(e.target.value)}
							type='text'
							onKeyDown={e => e.key === 'Enter' && fun()}
							className='outline-none font-semibold text-[#ffffff] z-10 w-full max-w-[500px] border-none bg-transparent'
							placeholder='Конфиденциальный поиск в Интернете'
						/>
					</div>
					<Search
						onClick={e => {
							active && e.stopPropagation(), fun();
						}}
						className=' ml-[10px] cursor-pointer'
					/>
				</div>
			</div>
		</>
	);
});
