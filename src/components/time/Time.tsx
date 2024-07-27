'use client';

import { useContextHook } from '@/hooks/useContext';
import { useEffect, useRef, useState } from 'react';

export const Time = () => {
	const [date, setDate] = useState({ hours: new Date().getHours(), minutes: new Date().getMinutes() });
	const { setting } = useContextHook();
	const ref = useRef<number>();

	useEffect(() => {
		if (!setting.timeMode.show) {
			clearInterval(ref.current);
		}
		//@ts-ignore
		ref.current = setInterval(() => {
			setDate({ hours: new Date().getHours(), minutes: new Date().getMinutes() });
		}, 10000);
		return () => clearInterval(ref.current);
	}, [setting.timeMode.show]);

	if (!setting.timeMode.show) return null;

	return (
		<h2 className='fixed text-[#f7f7f7] font-semibold text-3xl cursor-pointer top-8 right-8'>
			{setting.timeMode.format === '24' ? date.hours : date.hours - 12} : {date.minutes >= 10 ? date.minutes : '0' + String(date.minutes)}
		</h2>
	);
};
