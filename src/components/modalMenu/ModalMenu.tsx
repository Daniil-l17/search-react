import React, { Dispatch, FC, SetStateAction } from 'react';

interface Props {
	active: { title: string; img: React.JSX.Element; top: number,content: React.JSX.Element };
	menuModal: { title: string; img: React.JSX.Element; top: number,content: React.JSX.Element }[];
	setActive: Dispatch<SetStateAction<{ title: string; img: React.JSX.Element; top: number,content:React.JSX.Element }>>;
}

export const ModalMenu: FC<Props> = ({ menuModal, active, setActive }) => {
	return (
		<div className=' flex flex-col gap-8 w-[210px] max-[620px]:w-[170px] h-full '>
			<div style={{ top: `${active.top}px` }} className={`fixed transition-all duration-300 rounded-md left-0 bgGradient w-[4px] h-[48px] `}></div>
			{menuModal.map(item => {
				return (
					<div onClick={() => setActive(item)} className='flex cursor-pointer items-center gap-3'>
						<div>{item.img}</div>
						<h2 className={`text-sm max-[620px]:text-xs transition-all duration-200 font-bold ${active.title === item.title ? 'text-[#5fa3f1]' : ''}`}>{item.title}</h2>
					</div>
				);
			})}
		</div>
	);
};
