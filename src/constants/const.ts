export const negative = ['сука', 'блять', 'ахуеть', 'пиздец', 'пидр', 'хуйня', 'еблан', 'нахуй', 'хуила'] as const;

export const menu = [
	{ title: 'Все', development: false, pathName: '/search' },
	{ title: 'Изображения', development: false, pathName: '/search/image-page' },
	{ title: 'Картинки', development: true, pathName: '/' },
	{ title: 'Видео', development: true, pathName: '/' },
	{ title: 'Покупки', development: true, pathName: '/' }
] as const;

export const themePage = [
	{ title: 'Темная тема', theme: 'dark', color: '424242', development: false },
	{ title: 'Фоновые изображения FireFox', theme: 'fonBg', color: '424242', development: false }
] as const;

export const bgImage = [
	'/eric-patterson-2.jpg',
	'/minkyeong-shin.jpg',
	'/mohammad-usaid-abbasi.jpg',
	'/eric-patterson-1.jpg',
	'/sean-o-riordan.jpg',
	'/gordon-ross-1.jpg',
	'/nabil-george.jpg',
	'/nadeem-choudhary-1.jpg',
	'/nadeem-choudhary-2.jpg',
	'/StudentNTP_Alyssa-Skala_x1280.jpg',
	'/StudentNTP_John-Ng_x1280.jpg'
];
