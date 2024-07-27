'use client';

import { Check } from 'lucide-react';
import { Dispatch, FC, SetStateAction, useEffect } from 'react';

interface Props {
	active: boolean
	setCheck: () => void;
	localStorageTitle: string;
  jsonString: boolean | {}
}

export const ChexBox: FC<Props> = ({ active,jsonString, setCheck, localStorageTitle }) => {
	useEffect(() => {
		if (String(active)) {
			localStorage.setItem(localStorageTitle, JSON.stringify(jsonString));
		}
	}, [active]);

	return (
		<span onClick={setCheck} className={`h-[27px] flex justify-center items-center w-[27px] transition-all duration-300 ${active ? 'bg-[#3d98d5]' : 'bg-[#8f8f8f59]'} cursor-pointer rounded-[6px] `}>
			{active && <Check className='w-4 h-4' />}
		</span>
	);
};
