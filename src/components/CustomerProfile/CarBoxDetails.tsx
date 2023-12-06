import DetailBox from './DetailBox';
import { FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import React from 'react';
import { MdErrorOutline } from 'react-icons/md';


async function deleteCar(id: number) {
	return fetch(`http://localhost:3000/cars/${id}`, {
		method: "DELETE"
	})
}


export default function CarBoxDetails({ car }: { car: ICar }) {
	const navigate = useNavigate();

	const handleDelete = async () => {
		try {
			const response = await deleteCar(car.id)

			if (response.ok) {
				notifications.show({
					color: 'green',
					title: "Succes!",
					message: `Køretøj med reg. nr. ${car.registrationNumber.toUpperCase()} slettet succesfuldt`,
					icon: <IoIosCheckmarkCircleOutline />
				})
				navigate("/redirect")
			} else {
				notifications.show({
					color: 'red',
					title: "Hov!",
					message: "Vi kunne desværre ikke slette dit køretøj. Prøv igen senere",
					icon: <MdErrorOutline />
				})
			}
		} catch (error: unknown) {
			console.error((error as Error).message);
			notifications.show({
				color: 'red',
				title: "Hov!",
				message: "Vi kunne desværre ikke slette dit køretøj. Prøv igen senere",
				icon: <MdErrorOutline />
			})
		}
	}


	return (
		<>
			<DetailBox title={'Model'} value={car.brand} />
			<DetailBox title={'Registerings nr.'} value={car.registrationNumber.toUpperCase()} />
			<div style={{cursor: "pointer"}} onClick={handleDelete}>
				<FaTrashAlt />
			</div>
		</>
	);
}
