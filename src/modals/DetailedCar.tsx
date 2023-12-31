// import { Card } from '@mantine/core';
import { useEffect, useState } from 'react';
import formatDate from '../utility/dateFormat.ts';
import { getSingleCar } from '../services/carServices.ts';

interface DetailedCarProps {
	car: ICar;
}

export default function DetailedCar({ car }: DetailedCarProps) {
	const [carData, setCarData] = useState<ICar | null>(null);
	const [customerData, setCustomerData] = useState<ICustomer | null>(null);

	useEffect(() => {

		getSingleCar(car.id).then((data) => {
			setCarData(data.car);
			setCustomerData(data.customer);
		}
		);
	}, [car.id]);

	return (
		<>
			{carData && (
				<div>
					<div>
						<h2 className='header-one-container'>Bil info</h2>
					</div>
					<section className='modal-container'>
						<div className='modal-grid'>
							<h3>Stel-nr</h3>
							<div>{carData?.vinNumber}</div>
							<h3>Kilometertal</h3>
							<div>{carData?.mileage}</div>
							<h3>Registrering</h3>
							<div>{formatDate(new Date(carData.firstRegistration))}</div>
							<h3>Sidste Inspektion</h3>
							<div>{formatDate(new Date(carData.lastInspectionDate))}</div>
						</div>
						<h2 className='header-two-container'>Kunde Info</h2>
						<div>
							<div className='modal-grid'>
								<h3>Navn</h3>
								<div>
									{customerData?.firstName} {customerData?.lastName}
								</div>
								<h3>Mail</h3>
								<div>{customerData?.email}</div>
								<h3>Telefon Nummer</h3>
								<div>{customerData?.phone}</div>
							</div>
						</div>
					</section>
				</div>
			)}
		</>
	);
}
