'use client';
import { Logo } from '@/components/logo/Logo';
import Modal from '@/components/modal/Modal';
import { Input } from '@/components/ui/Input';
import { useContextHook } from '@/hooks/useContext';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

export default function Home() {
	const [input, setInput] = useState('');
	const ref = useRef<HTMLAnchorElement | null>(null);
	const [open, setOpen] = useState(false);
	const setting = useContextHook();
	const [errorMessage, setErrorMesage] = useState(false);
  const status = useOnlineStatus()
  console.log(status);
  
	const negative = ['сука', 'блять', 'ахуеть', 'пиздец', 'пидр', 'хуйня', 'еблан', 'нахуй', 'хуила'];

	const fun = () => {
		if (input.length > 2) {
			if (setting.setting.messageFiltering) {
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

	return (
		<div className='flex px-4 flex-col gap-6 w-full min-h-[100vh] justify-center items-center'>
			<ToastContainer position='bottom-right' />
      <h2>{status ? 'онлайн' : 'офлайн'}</h2>
			<SlidersHorizontal onClick={() => setOpen(prev => !prev)} className='fixed cursor-pointer top-8 right-8' />
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
				{[...Array(16)].map((_, index) => {
					return <div key={index} className={`bgColor  whites cursor-pointer w-[80px] h-[80px] rounded-md`}></div>;
				})}
			</div>
		</div>
	);
}
