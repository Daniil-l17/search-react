import { Image, Clock8, Search, AudioLines } from 'lucide-react';
import { memo, useState } from 'react';
import { ModalHeader } from '../modalHeader/ModalHeader';
import { ModalMenu } from '../modalMenu/ModalMenu';
import { BackgroundImages } from '../backgroundImages/BackgroundImages';
import { Statistics } from '../statistics/Statistics';
import { TimeMode } from '../timeMode/TimeMode';
import { SafeSearch } from '../safeSearch/SafeSearch';

const menuModal = [
	{ title: 'Фоновое Изображение', img: <Image className=' w-6 h-6 text-[#a1b2ba]' />, top: 58, content: <BackgroundImages /> },
	{ title: 'Статистика FireFox', img: <AudioLines className=' w-6 h-6 text-[#a1b2ba]' />, top: 114, content: <Statistics /> },
	{ title: 'Часы', img: <Clock8 className=' w-6 h-6 text-[#a1b2ba]' />, top: 170, content: <TimeMode /> },
	{ title: 'Поиск', img: <Search className=' w-6 h-6 text-[#a1b2ba]' />, top: 229, content: <SafeSearch /> }
];

const Modal = memo(
	({ open, setOpen }: { open: boolean; setOpen: () => void }) => {
		const [active, setActive] = useState<{ title: string; img: React.JSX.Element; top: number; content: React.JSX.Element }>(() => menuModal[0]);

		return (
			<div
				onClick={setOpen}
				className={`transition-all duration-200 bg-[#23232373] fixed top-0 flex justify-center items-center left-0 right-0 bottom-0 ${open ? 'opacity-100 z-[10]' : 'opacity-0 z-[-10] '}`}
			>
				<div
					onClick={e => e.stopPropagation()}
					className={`w-full flex flex-col bg-[#0d1214] border-[0.01px] border-[#5151517b]  max-[620px]:h-[430px] max-[620px]:min-h-0 max-[920px]:overflow-auto max-[920px]:m-4 p-4 rounded-[10px] max-w-[900px] transition-all duration-200 min-h-[450px] ${
						open ? 'scale-100' : 'scale-0'
					}`}
				>
					<ModalHeader setOpen={setOpen} />
					<div className='flex h-[320px] max-[620px]:gap-1 mt-[14px] w-full gap-8'>
						<ModalMenu setActive={setActive} active={active} menuModal={menuModal} />
						<div className='px-4 max-[620px]:px-1 flex-1 '>{active.content ?? null}</div>
					</div>
				</div>
			</div>
		);
	},
	(prev, next) => {
		return prev.open === next.open;
	}
);

export default Modal;
