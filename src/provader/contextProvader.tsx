'use client';
import React, { createContext, useEffect, useState } from 'react';

const context = { theme: 'dark', updateTheme: (theme: string) => {}, messageFiltering: false, updateMessageFiltering: (bol: boolean) => {} };
export const Setting = createContext(context);
export const ContextProvader = ({ children }: { children: React.ReactNode }) => {
	const [theme, setTheme] = useState('dark');
	const [messageFiltering, setMessageFiltering] = useState(false);

	useEffect(() => {
		setTheme(localStorage.getItem('theme') ?? 'dark');
		console.log(!!+localStorage.getItem('messageFiltering')!);
		setMessageFiltering(localStorage.getItem('messageFiltering')! === 'true' ?? false);
	}, []);

	return (
		<Setting.Provider value={{ theme, updateTheme: (theme: string) => setTheme(theme), messageFiltering, updateMessageFiltering: (bol: boolean) => setMessageFiltering(bol) }}>
			{children}
		</Setting.Provider>
	);
};
