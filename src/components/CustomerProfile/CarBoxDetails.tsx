import DetailBox from './DetailBox';
import { FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { MdErrorOutline } from 'react-icons/md';
import styles from '../../modals/modal.module.css';
import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';


async function deleteCar(id: number) {
	return fetch(`http://localhost:3000/cars/${id}`, {
		method: 'DELETE',
	});
}


export default function CarBoxDetails({ car }: { car: ICar }) {
	const navigate = useNavigate();
	const [opened, { open, close }] = useDisclosure(false);

	const handleDelete = async () => {
		try {
			const response = await deleteCar(car.id);

			if (response.ok) {
				notifications.show({
					color: 'green',
					title: 'Succes!',
					message: `Køretøj med reg. nr. ${car.registrationNumber.toUpperCase()} slettet succesfuldt`,
					icon: <IoIosCheckmarkCircleOutline />,
				});
				navigate('/redirect');
			} else {
				notifications.show({
					color: 'red',
					title: 'Hov!',
					message: 'Vi kunne desværre ikke slette dit køretøj. Prøv igen senere',
					icon: <MdErrorOutline />,
				});
			}
		} catch (error: unknown) {
			console.error((error as Error).message);
			notifications.show({
				color: 'red',
				title: 'Hov!',
				message: 'Vi kunne desværre ikke slette dit køretøj. Prøv igen senere',
				icon: <MdErrorOutline />,
			});
		}
	};


	return (
		<>
			<Modal
				opened={opened}
				onClose={close}
				title={`Slet køretøj med reg. nr. ${car.registrationNumber.toUpperCase()}?`}
				className='modal'
				centered
				styles={{ header: { backgroundColor: '#d87005', padding: '10px' }, close: { color: '#f4f4f4', cursor: 'pointer' } }}
				classNames={{ body: styles.body, content: styles.content, title: styles.title, close: styles.close }}
			>
				{/* Modal content */}

				<div className='btn-container'>
					<button className='delete-customer-btn' style={{ padding: '5px 20px' }} onClick={handleDelete}>
						Ja
					</button>

					<button className='update-customer-btn' style={{ padding: '5px 20px' }} onClick={close} >
						Nej
					</button>
				</div>
			</Modal>

			<DetailBox title={'Model'} value={car.brand} />
			<DetailBox title={'Registerings nr.'} value={car.registrationNumber.toUpperCase()} />
			<div className='trash-icon-wrapper' style={{ cursor: 'pointer' }} onClick={open}>
				<FaTrashAlt />
			</div>
		</>
	);
}
