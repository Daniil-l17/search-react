import { useContextHook } from '@/hooks/useContext';
import { ChexBox } from '../ui/ChexBox';
import { memo, useEffect } from 'react';

export const TimeMode = memo(() => {
	const { setting } = useContextHook();

	useEffect(() => {
		localStorage.setItem('timeMode', JSON.stringify(setting.timeMode));
	}, [setting.timeMode.format]);

	return (
		<div className='flex flex-col gap-6'>
			<div className='flex justify-between items-center'>
				<h2 className=' text-sm font-semibold'>Показывать часы</h2>
				<ChexBox setCheck={() => setting.setTimeMode(prev => ({ ...prev, show: !prev.show }))} localStorageTitle='timeMode' jsonString={setting.timeMode} active={setting.timeMode.show} />
			</div>
			{setting.timeMode.show && (
				<div className='flex justify-between max-[620px]:flex-col items-center'>
					<h2 className=' text-sm max-[620px]:text-base font-semibold'>Формат</h2>
					<div className='flex  max-[620px]:w-full relative items-center gap-4'>
						<div className='flex w-full justify-between gap-2 items-center'>
							<h2
								onClick={() => {
									setting.setTimeMode(prev => ({ ...prev, format: '24' }));
								}}
								className={` ${setting.timeMode.format === '24' && 'activeSeee'} transition-all duration-300 max-[620px]:text-sm relative cursor-pointer`}
							>
								24-часовой
							</h2>
							<h2
								onClick={() => setting.setTimeMode(prev => ({ ...prev, format: '12' }))}
								className={` ${setting.timeMode.format === '12' ? 'activeSeee' : ''} transition-all duration-300 max-[620px]:text-sm relative cursor-pointer`}
							>
								12-часовой
							</h2>
						</div>
					</div>
				</div>
			)}
		</div>
	);
});
