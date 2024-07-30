
import ContentLoader from 'react-content-loader';

export const SearchSkeleton = ({index}:{index:number}) => {
	return (
		<ContentLoader key={index} speed={2} width={280} height={390} viewBox='0 0 290 390' backgroundColor='#565656' className=' rounded-md' foregroundColor='#ecebeb'>
			<rect x='7' y='7' rx='0' ry='0' width='280' className='rounded-md' height='290' />
			<rect x='177' y='91' rx='0' ry='0' width='0' height='1' />
			<rect x='9' y='311' rx='0' ry='0' width='133' height='8' />
			<rect x='8' y='329' rx='0' ry='0' width='223' height='8' />
			<rect x='8' y='345' rx='0' ry='0' width='245' height='9' />
		</ContentLoader>
	);
};
