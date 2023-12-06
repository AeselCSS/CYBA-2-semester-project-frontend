import { useNavigate } from 'react-router-dom';
import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

interface BoxHeaderProps {
	title: string;
	btnName: string;
	navigateTo: string;
}

export default function BoxHeader({ title, btnName, navigateTo }: BoxHeaderProps) {
	const [opened, { open, close }] = useDisclosure(false);
	const navigate = useNavigate();

	return (
		<>
			<Modal opened={opened} onClose={close} title='Authentication' className='modal' centered>
				{/* Modal content */}
				<h2>Hej</h2>
			</Modal>

			<div className='header-flex'>
				<h1>{title}</h1>
				<button onClick={() => navigate(navigateTo)}>{btnName}</button>
			</div>
		</>

	);
}
