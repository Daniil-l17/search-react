'use client';
import { Item } from '@/types/search';
import { createContext, Dispatch, SetStateAction, useEffect, useLayoutEffect, useState } from 'react';

export interface PropsContext {
	searchHistory: Item[];
	addSearchHistory: (item: Item) => void;
	updateMessageFiltering: (bol: boolean) => void;
	messageFiltering: boolean;
	time: { min: number; h: number; sec: number; day: number };
	isBackgroundImages: boolean;
	setTime: Dispatch<SetStateAction<{ min: number; h: number; sec: number; day: number }>>;
	setIsBackgroundImages: Dispatch<SetStateAction<boolean>>;
	timeMode: { show: boolean; format: '24' | '12' };
	setPassword: Dispatch<SetStateAction<{ password: string; prompt: string; include: boolean; verified: boolean | null }>>;
	password: { password: string; prompt: string; include: boolean; verified: boolean | null };
	setTimeMode: Dispatch<SetStateAction<{ show: boolean; format: '24' | '12' }>>;
}

const context: PropsContext = {
	searchHistory: [],
	setPassword: () => {},
	password: { password: '', prompt: '', include: false, verified: false },
	setTimeMode: () => {},
	time: { min: 0, h: 0, sec: 0, day: 0 },
	setTime: () => {},
	timeMode: { show: false, format: '24' },
	addSearchHistory: (item: Item) => {},
	messageFiltering: false,
	isBackgroundImages: false,
	setIsBackgroundImages: () => {},
	updateMessageFiltering: (bol: boolean) => {}
};
export const Setting = createContext(context);
export const ContextProvader = ({ children }: { children: React.ReactNode }) => {
	const [messageFiltering, setMessageFiltering] = useState(false);
	const [searchHistory, setSearchHistory] = useState<Item[]>([]);
	const [isBackgroundImages, setIsBackgroundImages] = useState(false);
	const [time, setTime] = useState<{ min: number; h: number; sec: number; day: number }>({ min: 0, h: 0, sec: 0, day: 0 });
	const [timeMode, setTimeMode] = useState<{ show: boolean; format: '24' | '12' }>({ show: false, format: '24' });
	const [password, setPassword] = useState<{ password: string; prompt: string; include: boolean; verified: boolean | null }>({ password: '', prompt: '', include: false, verified: null });

	useEffect(() => {
		setTime(JSON.parse(localStorage.getItem('time') ?? '{}'));
	}, []);

	useEffect(() => {
		setTimeMode(JSON.parse(localStorage.getItem('timeMode')! ?? '{"show":false,"format":"24"}'));
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(prev => {
				localStorage.setItem('time', JSON.stringify(prev));
				if (prev.sec === 60) {
					return { ...prev, min: prev.min + 1, sec: 0 };
				} else if (prev.min === 60) {
					return { ...prev, h: prev.h + 1, sec: 0, min: 0 };
				} else if (prev.h === 24) {
					return { ...prev, day: prev.day + 1, sec: 0, min: 0, h: 0 };
				}
				return { ...prev, sec: prev.sec + 1 };
			});
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	}, []);

	const addSearchHistory = (item: Item) => {
		if (searchHistory.some(el => el.formattedUrl === item.formattedUrl)) return;
		if (searchHistory.length !== 16) {
			localStorage.setItem('searchHistory', JSON.stringify([item, ...searchHistory]));
			return setSearchHistory(prev => [item, ...prev]);
		}
		const elements = searchHistory[0];
		setSearchHistory(prev => prev.filter(items => !items.formattedUrl.includes(elements?.formattedUrl!)));
		setSearchHistory(prev => [item, ...prev]);
		localStorage.setItem('searchHistory', JSON.stringify([item, ...searchHistory]));
	};

	useEffect(() => {
		setSearchHistory(JSON.parse(localStorage.getItem('searchHistory') ?? '[]'));
	}, []);

	useEffect(() => {
		setMessageFiltering(localStorage.getItem('messageFiltering')! === 'true' ?? false);
	}, []);

	useEffect(() => {
		setIsBackgroundImages(localStorage.getItem('isBackgroundImages')! === 'true' ?? false);
	}, []);

	useEffect(() => {
		setPassword(JSON.parse(localStorage.getItem('psPage') ?? '{}'));
	}, []);

	return (
		<Setting.Provider
			value={{
				timeMode,
				setPassword,
				setTimeMode,
				password,
				time,
				setTime,
				searchHistory,
				addSearchHistory,
				isBackgroundImages,
				setIsBackgroundImages,
				messageFiltering,
				updateMessageFiltering: (bol: boolean) => setMessageFiltering(bol)
			}}
		>
			{children}
		</Setting.Provider>
	);
};
