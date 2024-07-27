'use client';
import { useContextHook } from '@/hooks/useContext';
import { ChexBox } from '../ui/ChexBox';

export const SafeSearch = () => {
	const { setting } = useContextHook();

	return (
		<div>
			<div className='flex justify-between items-center'>
				<h2 className=' text-sm font-semibold'>Включить безопасный поиск</h2>
				<ChexBox
					setCheck={() => setting.updateMessageFiltering(!setting.messageFiltering)}
					localStorageTitle='messageFiltering'
					jsonString={setting.messageFiltering}
					active={setting.messageFiltering}
				/>
			</div>
		</div>
	);
};
