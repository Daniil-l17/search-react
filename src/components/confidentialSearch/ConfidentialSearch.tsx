'use client';
import { Search } from 'lucide-react';
import { Logo } from '../logo/Logo';
import { memo, useState } from 'react';

export const ConfidentialSearch = memo(() => {
	const [active, setActive] = useState(false);
	return (
		<>
			<div onClick={() => setActive(false)} className={`fixed top-0 transition-all duration-300 left-0 right-0 bottom-0 ${active ? 'bg-[#3e3e3ea0] z-10 ' : '-z-10'}`}></div>
			<div className={` mx-2 fixed flex justify-center items-center transition-all max-[820px]:bottom-4 duration-300 left-0 right-0 ${active ? 'bottom-[75%] z-20' : 'bottom-8 '}`}>
				<div onClick={() => setActive(prev => !prev)} className='w-full items-center flex border-[1px] border-[#ffffff53] px-6 max-w-[600px] bg-[#3b3b3ba9] py-4 rounded-lg'>
					<div className='flex w-full items-center gap-4'>
						<Logo width='30px' height='30px' />
						<input
							onClick={e => {
								active && e.stopPropagation();
							}}
							type='text'
							className='outline-none font-semibold text-[#ffffff] z-10 w-full max-w-[500px] border-none bg-transparent'
							placeholder='Конфиденциальный поиск в Интернете'
						/>
					</div>
					<Search
						onClick={e => {
							active && e.stopPropagation();
						}}
						className=' cursor-pointer'
					/>
				</div>
			</div>
		</>
	);
})
