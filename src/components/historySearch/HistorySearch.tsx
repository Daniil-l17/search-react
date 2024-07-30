import { useContextHook } from '@/hooks/useContext';
import { Trash2 } from 'lucide-react';
import { toast } from 'react-toastify';

export const HistorySearch = () => {
	const { setting } = useContextHook();
	return (
		<div className='flex justify-between items-center'>
			<h2 className=' text-sm max-[620px]:text-base font-semibold'>История поиска</h2>
			<Trash2 onClick={() => {setting.setSearchHistory([]),toast.success('История очищена',{theme: 'colored'})}} className=' cursor-pointer hover:text-[#c86a6a] transiti duration-300 text-[#aeaeae]' />
		</div>
	);
};
