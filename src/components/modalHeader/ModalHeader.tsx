import { X } from 'lucide-react';
import React from 'react';

export const ModalHeader = ({ setOpen }: { setOpen: () => void }) => {
	return (
		<div className='flex justify-between items-center'>
			<h2 className=' font-semibold text-[22px]'>Настроить панель</h2>
			<div className=' cursor-pointer px-[8px] py-[8px] hover:bg-[#5b5b5bcb] transition-all duration-300 rounded-[10px]'>
				<X onClick={setOpen} className=' text-[#d1d3d4] cursor-pointer' />
			</div>
		</div>
	);
};
