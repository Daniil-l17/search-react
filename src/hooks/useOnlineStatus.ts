import { useEffect, useState } from 'react';

export const useOnlineStatus = (): { status: boolean; isLoading: boolean } => {
	const [status, setStatus] = useState(true);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(false);
	}, []);

	useEffect(() => {
		if (navigator) {
			setStatus(navigator.onLine);
		}
		window.addEventListener('online', () => {
			setStatus(true);
		});
		window.addEventListener('offline', () => {
			setStatus(false);
		});
	}, []);

	return { status, isLoading };
};
