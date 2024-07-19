


interface Props {
	w?: number;
	h?: number;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	func?: () => void
  errorMessage?:boolean
}

export const Input = ({ w = 700, h = 50, func, value, onChange,errorMessage }: Props) => {
	return (
		<input
			style={{ height: `${h}px`, maxWidth: `${w}px` }}
			className={`inputColor px-6 w-full py-3 outline-none text-white rounded-lg transition-colors duration-100 border-solid focus:border-[#596A95] border-[0.05px] border-[#8e8e8e2f]`}
			type='text'
			value={value}
			onChange={onChange}
			onKeyDown={func ? e => e.key === 'Enter' && func() : () => {}}
			placeholder='Введите поисковый запрос или URL'
		/>
	);
};
