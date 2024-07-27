'use client';

import { useContextHook } from '@/hooks/useContext';


export const Statistics = () => {
	const { setting } = useContextHook();

	return (
		<div>
			<h2 className=' text-sm font-semibold'>
				Время использования браузера - {setting.time.day} дней {setting.time.h} часов {setting.time.min} минут {setting.time.sec} секунды
			</h2>
		</div>
	);
};
