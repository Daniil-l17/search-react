import { memo } from "react";


export const SearchResult = memo(({time,totalResult,title}:{time:string,totalResult:string,title:string}) => {
	return (
		<div className='mt-2'>
			<h2 className='text-xl font-medium'>
				Показаны результаты по запросу <span className=' font-medium text-blue-500'>{title}</span>
			</h2>
			<p className=' text-[#838383] font-semibold'>Результатов: примерно {totalResult} ({time} сек.) </p>
		</div>
	);
})
