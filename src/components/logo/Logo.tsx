import React, { memo } from 'react';
import style from './logo.module.scss';
export const Logo = memo(({ width, height }: { width?: string; height?: string }) => {
	return <div style={{ width, height }} className={style.logo}></div>;
})
