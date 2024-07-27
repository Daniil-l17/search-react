import React from 'react';
import ContentLoader from 'react-content-loader';

export const Skileton = ({ index }: { index: number }) => {
	return (
		<ContentLoader key={index} speed={2} width={400}  height={100} viewBox='0 0 400 80' backgroundColor='#757575' foregroundColor='#ecebeb'>
			<rect x='46' y='13' rx='3' ry='3' width='90' max={90} height='8' />
			<rect x='46' y='26' rx='3' ry='3' width='52' max={52} height='6' />
			<rect x='0' y='51' rx='3' ry='3' width='330' max={330} height='6' />
			<rect x='0' y='66' rx='3' ry='3' width='310' max={330} height='6' />
			<circle cx='20' cy='20' r='20' />
		</ContentLoader>
	);
};
