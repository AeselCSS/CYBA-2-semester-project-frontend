interface BoxHeaderProps {
	title: string;
	btnName: string;
}

export default function BoxHeader({ title, btnName }: BoxHeaderProps) {
	return (
		<div className='header-flex'>
			<h1>{title}</h1>
			<button>{btnName}</button>
		</div>
	);
}
