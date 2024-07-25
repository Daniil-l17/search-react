import type { Metadata } from 'next';
import { Roboto_Flex } from 'next/font/google';
import './globals.scss';
import { QueryClientProvader } from '@/provader/QueryClient';
import NextTopLoader from 'nextjs-toploader';
import { ContextProvader } from '@/provader/contextProvader';
import { ThemeProvider } from 'next-themes';
import 'react-toastify/dist/ReactToastify.css';

const inter = Roboto_Flex({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Firefox developer',
	icons: {
		icon: '/Firefox_Developer_Edition_logo,_2013.png'
	}
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='ru'>
			<body className={inter.className}>
				<NextTopLoader />
				<QueryClientProvader>
          <ContextProvader>
          <ThemeProvider defaultTheme='dark'>
          {children}
          </ThemeProvider>
          </ContextProvader>
          </QueryClientProvader>
			</body>
		</html>
	);
}
