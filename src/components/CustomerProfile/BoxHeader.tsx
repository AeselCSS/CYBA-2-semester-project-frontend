import { useNavigate } from 'react-router-dom';

import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import styles from '../Modal/modal.module.css'

interface BoxHeaderProps {
	title: string;
	btnName: string;
	navigateTo: string;
}

export default function BoxHeader({ title, btnName, navigateTo }: BoxHeaderProps) {
	const navigate = useNavigate();
	const [isOpen, { close }] = useDisclosure(false);

	return (
		<>
			<Modal
				opened={isOpen}
				onClose={close}
				title='Authentication'
				className='modal'
				centered
				size='xl'
				styles={{ header: { backgroundColor: '#d87005', padding: '10px' }, close: { color: '#f4f4f4', cursor: 'pointer' } }}
				classNames={{ body: styles.body, content: styles.content, title: styles.title, close: styles.close }}
			>
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
