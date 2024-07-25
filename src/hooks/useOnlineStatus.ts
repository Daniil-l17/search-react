import { useEffect, useState } from 'react';

export const useOnlineStatus = (): boolean => {
	const [status, setStatus] = useState(true);

	useEffect(() => {
		document.addEventListener('online', () => {
			setStatus(true);
		});
		document.addEventListener('offline', () => {
			setStatus(false);
		});
    setStatus(navigator.onLine)
	}, []);

	return status;
};
