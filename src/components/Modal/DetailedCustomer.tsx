import { useEffect, useState } from 'react';
import formatDate from '../../utility/dateFormat';

interface DetailedCustomerProps {
	customer: ICustomer;
}

export default function DetailedCustomer({ customer }: DetailedCustomerProps) {
	const [customerData, setCustomerData] = useState<IAPISingleCustomer | null>(null);

	useEffect(() => {
		async function getCustomer() {
			//TODO Tilføj ENV fil til fetch kaldet
			const response = await fetch(`http://localhost:3000/customers/${customer.id}`);
			const data = await response.json();
			setCustomerData(data);
		}
		getCustomer();
	}, [customer.id]);
	console.log(customerData?.orders);

	// const filteredOrders = customerData?.orders?.filter((order) => order.status.toString() !== 'COMPLETED') || [];

	return (
		<div>
			<div className='customer-modal-header-container'>
				<h2>
					{customerData?.customer.firstName} {customerData?.customer.lastName}
				</h2>
			</div>
			<div className='customer-modal-header-container'>
				<h3>Aktive Ordre</h3>
			</div>

			{customerData?.orders?.map((order) => (
				<div key={order.id}>
					{' '}
					<section className='modal-container'>
						<div className='modal-grid'>
							<h3>Ordre id</h3>
							<div>{order.id}</div>
							<h3>Status</h3>
							<div>{order.status}</div>
							<h3>Oprettelses Dato</h3>
							<div>{formatDate(new Date(order.createdAt))}</div>
							<h3>Seneste Opdatering </h3>
							<div>{formatDate(new Date(order.updatedAt))}</div>
						</div>
					</section>
				</div>
			))}
			<div className='customer-modal-header-container'>
				<h3>Bildata</h3>
			</div>
			{customerData?.cars.map((car) => (
				<div key={car.id}>
					<div className='modal-container'>
						<div className='modal-grid'>
							<h3>Model</h3>
							<div>
								{car.model} - {car.modelVariant}
							</div>
							<h3>Regnr.</h3>
							<div>{car.registrationNumber}</div>
							<h3>Synsdato</h3>

							<div>{formatDate(new Date(car.lastInspectionDate))}</div>
							<h3>Syns Type</h3>
							<div>{car.lastInspectionKind}</div>
							<h3>Syns Resultat</h3>
							<div>{car.lastInspectionResult}</div>
							<h3>Biloprettelse</h3>
							<div>{formatDate(new Date(car.createdAt))}</div>
							<h3>Kilometertal</h3>
							<div>{car.mileage}</div>
							<h3>Sidste registeret kilometertal </h3>
							<div>{formatDate(new Date(car.updatedAt))}</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
