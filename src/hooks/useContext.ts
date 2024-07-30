'use client'
import { Setting } from '@/provader/contextProvader';
import { useContext, useEffect, useState } from 'react';

export const useContextHook = () => {
	const [isLoading, setIsLoading] = useState(true);
	const setting = useContext(Setting);

	useEffect(() => {
		setIsLoading(false);
	}, []);

	return { isLoading, setting };
};
