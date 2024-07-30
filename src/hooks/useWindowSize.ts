import { useEffect, useState } from 'react';

interface WindowSize {
	width: number;
	height: number;
}

export const useWindowSize = (): WindowSize => {
	const [windowSize, setWindowSize] = useState<WindowSize>({
		width: window.innerWidth,
		height: window.innerHeight
	});

	const handleResize = () => {
		setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight
		});
	};

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => {
			removeEventListener('resize', handleResize);
		};
	}, []);
	return windowSize;
};
