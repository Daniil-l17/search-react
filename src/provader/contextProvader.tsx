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
	privateSearch: boolean;
	setSearchHistory: Dispatch<SetStateAction<Item[]>>;
	setPrivateSearch: Dispatch<SetStateAction<boolean>>;
	setTime: Dispatch<SetStateAction<{ min: number; h: number; sec: number; day: number }>>;
	setIsBackgroundImages: Dispatch<SetStateAction<boolean>>;
	timeMode: { show: boolean; format: '24' | '12' };
	setTimeMode: Dispatch<SetStateAction<{ show: boolean; format: '24' | '12' }>>;
}

const context: PropsContext = {
	searchHistory: [],
	setSearchHistory: () => {},
	privateSearch: false,
	setPrivateSearch: () => {},
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
	const [privateSearch, setPrivateSearch] = useState(false);

	useEffect(() => {
		setTime(JSON.parse(localStorage.getItem('time') ?? '{"min":0"h":0"sec":0"day":0}'));
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
		const elements = searchHistory.at(-1);
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
		setPrivateSearch(localStorage.getItem('isPrivateSearch')! === 'true' ?? false);
	}, []);

	return (
		<Setting.Provider
			value={{
				timeMode,
				setTimeMode,
				time,
				privateSearch,
				setPrivateSearch,
				setTime,
				setSearchHistory,
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
