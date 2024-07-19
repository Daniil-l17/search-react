import React from 'react';
import style from './logo.module.css';
export const Logo = ({ width, height }: { width?: string; height?: string }) => {
	return <div style={{ width, height }} className={style.logo}></div>;
};
