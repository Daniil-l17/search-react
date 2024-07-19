import { useContextHook } from '@/hooks/useContext';
import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { toast } from 'react-toastify';
const themePage = [
	{ title: 'Темная тема', theme: 'dark', color: '424242', development: false },
	{ title: 'Светлая тема', theme: 'white', color: 'eeeeeedd', development: false },
	{ title: 'Синяя тема', theme: 'blue', color: '2c64fddd', development: false },
	{ title: 'красная тема', theme: 'red', color: 'f66965dd', development: true },
	{ title: 'Зеленая тема', theme: 'green', color: '73e7a9dd', development: true }
] as const;

const Modal = ({ open, setOpen }: { open: boolean; setOpen: () => void }) => {
	const { isLoading, setting } = useContextHook();
	const { theme, setTheme } = useTheme();
	const [activeTheme, setActiveTheme] = useState(setting.theme);
	const [active, setActive] = useState(setting.messageFiltering);

	const updateSetting = () => {
		if (activeTheme === setting.theme && active === setting.messageFiltering) return toast.error('вы ничего не поменяли!', { theme: 'colored' });
		setting.updateTheme(activeTheme), setTheme(activeTheme), setting.updateMessageFiltering(active);
		localStorage.setItem('messageFiltering', JSON.stringify(active));
		toast.success('Настройки успешно изменнены! 😊', { theme: 'colored' });
		setOpen();
	};

	useEffect(() => {
		setActiveTheme(setting.theme);
	}, [setting.theme, open]);

	useEffect(() => {
		setActive(setting.messageFiltering);
	}, [setting.messageFiltering, open]);

	return (
		<div
			onClick={setOpen}
			className={`transition-all duration-2000  bg-[#23232373] fixed top-0 flex justify-center items-center left-0 right-0 bottom-0 ${open ? 'opacity-100 z-[10]' : 'opacity-0 z-[-10] '}`}
		>
			<div
				onClick={e => e.stopPropagation()}
				className={`w-full flex flex-col ${
					setting.theme === 'dark' ? 'bg-[#363636]' : setting.theme === 'white' ? 'bg-[#c9c9c9]' : setting.theme === 'blue' ? 'bg-[#6c96db]' : ''
				} border-[0.01px] border-[#5151517b] p-4 rounded-lg max-w-[900px] transition-all duration-2000 min-h-[450px] ${open ? 'scale-100' : 'scale-0'}`}
			>
				<div className='flex justify-between items-center'>
					<h2 className=' font-semibold text-lg'>Настройки браузера</h2>
					<X onClick={setOpen} className=' cursor-pointer' />
				</div>
				<div className='flex gap-6 flex-wrap mt-4'>
					{themePage.map((theme, index) => {
						return (
							<div
								onClick={() => !theme.development && setActiveTheme(theme.theme)}
								key={index}
								className={`w-[190px] ${theme.development ? 'cursor-not-allowed' : 'cursor-pointer'} ${
									theme.theme === activeTheme ? 'border-[2px] px-2 py-2 rounded-lg border-[#6e6ef5]' : ''
								}  h-[120px]`}
							>
								<div style={{ background: `#${theme.color}` }} className={`rounded-md h-[70%]`}></div>
								<h2 className=' font-medium text-sm mt-1'>{theme.title}</h2>
							</div>
						);
					})}
				</div>
				<div className='flex flex-col gap-2 mt-2'>
					<div className='flex items-center gap-2 '>
						<h2 className=' font-semibold'>{active ? 'Фильтрация контента включена!' : 'Включить фильтрацию контента?'}</h2>
						<label className='switch'>
							<input type='checkbox' />
							<span onClick={() => setActive(!active)} className={`slider ${active ? '!bg-[#3a4b39] inputActive' : ''}`}>
								<div className={`pick  ${active ? ' inputActive' : ''}`}></div>
							</span>
						</label>
					</div>
					<p className=' font-semibold'>{active ? 'использование мата запрещено' : 'запрещает использовать мат в поиске'}</p>
				</div>
				<div className='flex flex-1 items-end justify-end'>
					<button onClick={updateSetting} className=' py-2 px-4 bg-[#45ae8fd0] rounded-lg'>
						применить настройки
					</button>
				</div>
			</div>
		</div>
	);
};

export default Modal;
