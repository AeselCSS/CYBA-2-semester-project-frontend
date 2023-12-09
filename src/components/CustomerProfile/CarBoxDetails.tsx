import DetailBox from './DetailBox';
import { FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { getModalOptions } from '../../modals/modalOptions.ts';
import { handleDeleteCar } from '../../services/carServices.ts';
import './CustomerProfile.css'

export default function CarBoxDetails({ car }: { car: ICar }) {
	const navigate = useNavigate();
	const [opened, { open, close }] = useDisclosure(false);

	const handleDelete = () => handleDeleteCar(car, navigate);

	return (
		<>
			<Modal
				opened={opened}
				onClose={close}
				{...getModalOptions(`Slet køretøj med reg. nr. ${car.registrationNumber.toUpperCase()}?`, 'md')}
			>
				{/* Modal content */}

				<div className='btn-container' style={{ display: 'flex', justifyContent: 'space-around', paddingTop:  '1rem' }}>
					<button className='yes-btn' onClick={handleDelete}>
						Ja
					</button>
					<button className='no-btn' onClick={close}>
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
