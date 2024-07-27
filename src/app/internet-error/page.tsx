'use client';

import { Loading } from '@/components/loading/Loading';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const page = () => {
	const navigate = useRouter();
	const { isLoading, status } = useOnlineStatus();

	useEffect(() => {
		if (!isLoading && status) {
			navigate.push('/');
		}
	}, [isLoading, status]);

	if (status && !isLoading) return null;
	return (
		<div className='flex min-h-[100vh] justify-center items-center'>
			{isLoading ? (
				<Loading />
			) : (
				<div className='flex justify-center flex-col items-center'>
					<h2 className=' text-3xl font-semibold'>соединение отсутвует</h2>
					<p className='font-semibold text-sm'>проверьте подключенние к интернету  </p>
				</div>
			)}
		</div>
	);
};

export default page;
