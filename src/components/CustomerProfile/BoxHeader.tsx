import { useNavigate } from 'react-router-dom';
import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// import styles from '../../modals/modal.module.css'
import { getModalOptions } from '../../modals/modalOptions.ts';

interface BoxHeaderProps {
	title: string;
	btnName: string;
	navigateTo: string;
}

export default function BoxHeader({ title, btnName, navigateTo }: BoxHeaderProps) {
	const navigate = useNavigate();
	const [isOpen, { close }] = useDisclosure(false);
	// Get modal options
	const modalOptions = getModalOptions(`title`)

	return (
		<>
			{/*Benyttes denne modal overhovedet?*/}
			<Modal opened={isOpen} onClose={close} {...modalOptions}></Modal>

			<div className='header-flex'>
				<h1>{title}</h1>
				<button onClick={() => navigate(navigateTo)}>{btnName}</button>
			</div>
		</>
	);
}
