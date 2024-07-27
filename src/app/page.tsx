'use client';
import { ConfidentialSearch } from '@/components/confidentialSearch/ConfidentialSearch';
import { Loading } from '@/components/loading/Loading';
import { Logo } from '@/components/logo/Logo';
import Modal from '@/components/modal/Modal';
import { Time } from '@/components/time/Time';
import { Input } from '@/components/ui/Input';
import { bgImage, negative } from '@/constants/const';
import { useContextHook } from '@/hooks/useContext';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

export default function Home() {
	const [input, setInput] = useState('');
	const ref = useRef<HTMLAnchorElement | null>(null);
	const [open, setOpen] = useState(false);
	const [errorMessage, setErrorMesage] = useState(false);
	const { isLoading, status } = useOnlineStatus();
	const { setting } = useContextHook();
	const navigate = useRouter();
	const [activeBg, setActiveBg] = useState(() => bgImage[Math.floor(Math.random() * bgImage.length)]);

	useEffect(() => {
		if (!isLoading) {
			if (!status) navigate.push('/internet-error');
		}
	}, [isLoading, status]);

	const fun = () => {
		if (input.length > 2) {
			if (setting.messageFiltering) {
				if (negative.some(item => input.toUpperCase().includes(item.toUpperCase()))) {
					setErrorMesage(true);
					toast.error('В вашем запросе есть плохие слова! 👿', { theme: 'colored' });
				} else {
					ref.current?.click();
					setErrorMesage(false);
				}
			} else {
				ref.current?.click();
				setErrorMesage(false);
			}
		}
	};

	if (isLoading) {
		return (
			<div className='flex justify-center items-center min-h-[100vh]'>
				<Loading />
			</div>
		);
	}

	if (!isLoading && !status) {
		return null;
	}

	return (
		<div
			style={{ backgroundImage: `url(${setting.isBackgroundImages ? activeBg : null})` }}
			className='flex transition-all duration-300 activeImage px-4 flex-col gap-6 w-full min-h-[100vh] justify-center items-center'
		>
			<ToastContainer position='bottom-right' />
			<ConfidentialSearch />
			<Time />
			<SlidersHorizontal onClick={() => setOpen(prev => !prev)} className='fixed max-[840px]:top-8 max-[840px]:bottom-0 max-[840px]:left-8 max-[840px]:right-0 cursor-pointer bottom-8 right-8' />
			<Modal setOpen={() => setOpen(false)} open={open} />
			<div className='flex gap-4 items-center'>
				<Logo />
				<h1 className=' select-none text-3xl font-semibold'>Firefox developer</h1>
			</div>
			<Input errorMessage={errorMessage} value={input} onChange={e => setInput(e.target.value)} func={fun} />
			<Link
				ref={ref}
				hidden
				href={`/search?q=${input
					.split('')
					.map(item => (item === '' ? '+' : item))
					.join('')}`}
			/>
			<div className='flex scrols  max-[460px]:justify-evenly max-[460px]:h-[450px] w-full max-w-[900px] flex-wrap justify-center gap-8'>
				{setting.searchHistory.map((item, index) => {
					return (
						<div key={index} className='flex flex-col gap-2'>
							<div className={`bgColor whites cursor-pointer w-[80px] h-[80px] rounded-md`}>
								<img
									onClick={() => window.open(item.link)}
									src={item.pagemap.metatags?.[0]?.['og:image']?.length ? item.pagemap.metatags?.[0]['og:image'] : item.pagemap['cse_thumbnail']?.[0].src ?? './not-found-image-15383864787lu.jpg'}
									className=' !w-[100%] object-center object-cover !h-[100%] rounded-[6px]'
									width={40}
									height={40}
								/>
							</div>
							<h2 className='w-[70px] truncate cursor-pointer'>${item.formattedUrl}</h2>
						</div>
					);
				})}
				{[...Array(16 - setting.searchHistory.length)].map((_, index) => {
					return (
						<div key={index} className='flex flex-col gap-2'>
							<div className={`bgColor  whites cursor-pointer w-[80px] h-[80px] rounded-md`}></div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
