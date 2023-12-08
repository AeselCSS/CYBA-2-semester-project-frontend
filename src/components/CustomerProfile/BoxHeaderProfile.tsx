import { useNavigate } from 'react-router-dom';
import { Modal } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { useAuth0 } from '@auth0/auth0-react';
import styles from '../../modals/modal.module.css';
import { NotificationMessageError, NotificationMessageSuccess } from '../Toaster/NotificationMessage.tsx';
import { handleLogout } from '../../services/Auth0Services.ts';

export default function BoxHeaderProfile({ customerId }: { customerId: string }) {
	const [opened, { open, close }] = useDisclosure(false);
	const navigate = useNavigate();
	const { logout } = useAuth0();

	const handleDelete = async () => {

		try {
			const response = await fetch(`http://localhost:3000/customers/${customerId}`, {
				method: "DELETE"
			})

			if (response.ok) {
				notifications.show(NotificationMessageSuccess({
					title: "Konto slettet",
					message: "Din konto er blevet slettet succesfuldt. Håber vi ses igen 💪"
				}));
				handleLogout(logout, {
					logoutParams: {
						returnTo: window.location.origin
					}
				});
			} else {
				notifications.show(NotificationMessageError({
					title: "Hov!",
					message: "Vi kunne desværre ikke slette din konto. Prøv igen senere"
				}));
			}
		} catch (error: unknown) {
			console.log((error as Error).message);
			notifications.show(NotificationMessageError({
				title: "Hov!",
				message: "Vi kunne desværre ikke slette din konto. Prøv igen senere",
			}));
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