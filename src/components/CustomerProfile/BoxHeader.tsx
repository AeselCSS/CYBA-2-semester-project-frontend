import { useNavigate } from 'react-router-dom';


interface BoxHeaderProps {
	title: string;
	btnName: string;
	navigateTo: string;
}

export default function BoxHeader({ title, btnName, navigateTo }: BoxHeaderProps) {
	const navigate = useNavigate();

	return (
		<div className='header-flex'>
			<h1>{title}</h1>
			<button onClick={() => navigate(navigateTo)}>{btnName}</button>
		</div>
	);
}
