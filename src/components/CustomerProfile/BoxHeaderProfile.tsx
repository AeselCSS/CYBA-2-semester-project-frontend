import { useNavigate } from 'react-router-dom';
import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';


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

	const handleDelete = async () => {
		try {
			await deleteCustomer(customerId);
			navigate("/");
		} catch (error: unknown) {
			console.log((error as Error).message);
		}
	}

	return (
		<>
			<Modal opened={opened} onClose={close} title='Rediger Profil' className='modal' centered>
				{/* Modal content */}

				<div className="btn-container">
					<button
						className='delete-customer-btn'
						onClick={handleDelete}>Slet Profil
					</button>

					<button
						className='update-customer-btn'
						onClick={() => navigate("/profile/update")}>Opdater profiloplysninger
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
