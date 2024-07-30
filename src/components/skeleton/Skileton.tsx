
import React from 'react';
import ContentLoader from 'react-content-loader';

export const Skileton = ({ index }: { index: number }) => {

	return (
		<ContentLoader key={index} speed={2} width={400} max={400}  height={100} viewBox='0 0 400 80' backgroundColor='#757575' foregroundColor='#ecebeb'>
			<rect x='46' y='13' rx='3' ry='3' width='180' max={180} height='8' />
			<rect x='46' y='26' rx='3' ry='3' width='120' max={120} height='6' />
			<rect x='0' y='51' rx='3' ry='3' width='290' max={290} height='6' />
			<rect x='0' y='66' rx='3' ry='3' width='270' max={270} height='6' />
			<circle cx='20' cy='20' r='20' />
		</ContentLoader>
	);
};
