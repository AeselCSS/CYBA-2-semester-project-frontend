import { useNavigate } from 'react-router-dom';
import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAuth0 } from '@auth0/auth0-react';
import { deleteCustomer } from '../../services/customerServices.ts';
import { getModalOptions } from '../../modals/modalOptions.ts';

export default function BoxHeaderProfile({ customerId }: { customerId: string }) {
	const [opened, { open, close }] = useDisclosure(false);
	const navigate = useNavigate();
	const { logout } = useAuth0();

	const handleDelete = async () => {
		await deleteCustomer(customerId, logout, {
			logoutParams: {
				returnTo: window.location.origin
			}
		});
	};

	return (
		<>
			<Modal opened={opened} onClose={close} {...getModalOptions(`Rediger Profil`, 'md')}>
				{/* Modal content */}
				<div className='btn-container' style={{ display: 'flex', justifyContent: 'space-around', paddingTop:  '1rem' }}>
					<button className='delete-customer-btn' onClick={handleDelete}>Slet Profil</button>
					<button className='update-customer-btn' onClick={() => navigate('/profile/update')}>Opdater oplysninger</button>
				</div>
			</Modal>

			<div className='header-flex'>
				<h1>Profil</h1>
				<button onClick={open}>Rediger Profil</button>
			</div>
		</>
	);
}