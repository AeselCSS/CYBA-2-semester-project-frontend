import { useNavigate } from 'react-router-dom';
import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAuth0 } from '@auth0/auth0-react';

import styles from '../Modal/modal.module.css';

async function deleteCustomer(id: string) {
	const response = await fetch(`http://localhost:3000/customers/${id}`, {
		method: "DELETE"
	});

	if (response.ok) {
		console.log("Deleted customer");
	} else {
		console.error(response.body);
		throw new Error();
	}
}


import { MdErrorOutline } from 'react-icons/md';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { notifications } from '@mantine/notifications';


export default function BoxHeaderProfile({ customerId }: { customerId: string }) {
	const [opened, { open, close }] = useDisclosure(false);
	const navigate = useNavigate();
	const { logout } = useAuth0();

	const handleLogout = () => {
		logout({
			logoutParams: {
				returnTo: window.location.origin,
			},
		});
	};

	const handleDelete = async () => {
		try {
			const response = await fetch(`http://localhost:3000/customers/${customerId}`, {
				method: "DELETE"
			})

			if (response.ok) {
				notifications.show({
					color: 'green',
					title: "Konto slettet",
					message: "Din konto er blevet slettet succesfuldt. Håber vi ses igen💪",
					icon: <IoIosCheckmarkCircleOutline />
				})
				handleLogout()
			} else {
				notifications.show({
					color: 'red',
					title: "Hov!",
					message: "Vi kunne desværre ikke slette din konto. Prøv igen senere",
					icon: <MdErrorOutline />
				})
			}
		} catch (error: unknown) {
			console.log((error as Error).message);
			notifications.show({
				color: 'red',
				title: "Hov!",
				message: "Vi kunne desværre ikke slette din konto. Prøv igen senere",
				icon: <MdErrorOutline />
			})
		}
	}

	return (
		<>
			<Modal
				opened={opened}
				onClose={close}
				title='Rediger Profil'
				className='modal'
				centered
				styles={{ header: { backgroundColor: '#d87005', padding: '10px' }, close: { color: '#f4f4f4', cursor: 'pointer' } }}
				classNames={{ body: styles.body, content: styles.content, title: styles.title, close: styles.close }}
			>
				{/* Modal content */}

				<div className='btn-container'>
					<button className='delete-customer-btn' onClick={handleDelete}>
						Slet Profil
					</button>

					<button className='update-customer-btn' onClick={() => navigate('/profile/update')}>
						Opdater oplysninger
					</button>
				</div>
			</Modal>

			<div className='header-flex'>
				<h1>Profil</h1>
				<button onClick={open}>Rediger Profil</button>
			</div>
		</>
	);
}
