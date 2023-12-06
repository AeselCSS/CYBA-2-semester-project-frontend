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
			await deleteCustomer(customerId);
			handleLogout()
		} catch (error: unknown) {
			console.log((error as Error).message);
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
