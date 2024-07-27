'use client';
import { ChexBox } from '../ui/ChexBox';
import { useContextHook } from '@/hooks/useContext';

export const BackgroundImages = () => {
	const { setting } = useContextHook();

	return (
		<div className='h-[100%]'>
			<div className='flex justify-between items-center'>
				<h2 className='flex-1 text-sm font-semibold max-[620px]:text-xs'>Показывать фоновые изображения</h2>
				<ChexBox jsonString={setting.isBackgroundImages} localStorageTitle='isBackgroundImages' setCheck={() => setting.setIsBackgroundImages(prev => !prev)} active={setting.isBackgroundImages} />
			</div>
			<div></div>
		</div>
	);
}
