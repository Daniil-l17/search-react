import { memo } from "react";


export const SearchResult = memo(({time,totalResult,title}:{time:string,totalResult:string,title:string}) => {
	return (
		<div className='mt-2'>
			<h2 className='text-xl max-[620px]:text-[18px] max-[620px]:font-semibold font-medium'>
				Показаны результаты по запросу <span className=' font-medium text-blue-500'>{title}</span>
			</h2>
			<p className=' text-[#838383] max-[620px]:text-sm font-semibold'>Результатов: примерно {totalResult} ({time} сек.) </p>
		</div>
	);
})
