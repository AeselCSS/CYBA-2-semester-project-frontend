// import { Card } from '@mantine/core';
import { useEffect, useState } from 'react';
import formatDate from '../../utility/dateFormat';

interface DetailedCarProps {
	car: ICar;
}

export default function DetailedCar({ car }: DetailedCarProps) {
	const [carData, setCarData] = useState<IAPISingleCar | null>(null);

	useEffect(() => {
		async function getCar() {
			//TODO Tilføj ENV fil til fetch kaldet
			const response = await fetch(`http://localhost:3000/cars/${car.id}`);
			const data = await response.json();
			setCarData(data);
		}
		getCar();
	}, [car.id]);
	console.log(carData?.car);
	console.log(carData?.registrationNumber);

	return (
		<>
			{carData && (
				<div>
					<div className='header-container'>{/* <h2>{carData?.car.registrationNumber}</h2> */}</div>
					<div className='header-container'>
						<h2>Bil Data</h2>
					</div>
					<section className='modal-container'>
						<div className='modal-grid'>
							<h3>Regnr</h3>
							<div>{carData?.car.registrationNumber}</div>

							<h3>Stel-nr</h3>
							<div>{carData?.car.vinNumber}</div>
							<h3>Kilometertal</h3>
							<div>{carData?.car.mileage}</div>
							<h3>Registrering</h3>
							<div>{formatDate(new Date(carData.car.firstRegistration))}</div>
							<h3>Sidste Inspektion</h3>
							<div>{formatDate(new Date(carData.car.lastInspectionDate))}</div>
						</div>
						<h3 className='header-container'>Kunde Info</h3>
						<div>
							<div className='modal-grid'>
								<h3>Navn</h3>
								<div>
									{carData?.customer.firstName} {carData?.customer.lastName}
								</div>
								<h3>Mail</h3>
								<div>{carData.customer.email}</div>
								<h3>Telefon Nummer</h3>
								<div>{carData.customer.phone}</div>
							</div>
						</div>
					</section>
				</div>
			)}
		</>
	);
}
