import ContentLoader from 'react-content-loader';

export const ResultSkeleton = () => {
	return (
		<ContentLoader speed={2} width={'400'} height={50} viewBox='0 0 400 50' backgroundColor='#757575' foregroundColor='#ecebeb'>
			<rect x='4' y='14' rx='3' ry='3' width='333' max={333} height='10' />
			<rect x='4' y='36' rx='3' ry='3' width='241'max={241}  height='10' />
		</ContentLoader>
	);
};
