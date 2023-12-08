import { useEffect, useState } from 'react';
import formatDate from '../utility/dateFormat.ts';
import { status } from '../utility/danishDictionary.ts';

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

	const filteredOrders = customerData?.orders?.filter((order) => order.status.toString() !== 'COMPLETED') || [];

	return (
		<div>
			<div className='name-header'>
				<h2>
					{customerData?.customer.firstName} {customerData?.customer.lastName}
				</h2>
			</div>
			<div className='header-container'>
				<h3 className='header-container'>Aktive Ordre</h3>
			</div>

			{filteredOrders?.length > 0 ? (
				filteredOrders.map((order) => (
					<div key={order.id}>
						<section className='modal-container'>
							<div className='modal-grid'>
								<h3>Ordre nr.</h3>
								<div>{order.id}</div>
								<h3>Status</h3>
								<div>{status[order.status]}</div>
								<h3>Oprettelses Dato</h3>
								<div>{formatDate(new Date(order.createdAt))}</div>
								<h3>Seneste Opdatering </h3>
								<div>{formatDate(new Date(order.updatedAt))}</div>
							</div>
							<hr />
						</section>
					</div>
				))
			) : (
				<p className='no-active-orders'>Ingen aktive ordre</p>
			)}

			<div className='header-container'>
				<h3 className='header-container'>Bildata</h3>
			</div>
			{customerData?.cars.map((car) => (
				<div key={car.id}>
					<div className='modal-container'>
						<div className='modal-grid'>
							<h3>Regnr.</h3>
							<div>{car.registrationNumber}</div>
							<h3>Model</h3>
							<div>
								{car.brand} {car.model} - {car.modelVariant}
							</div>
						</div>
						<hr />
					</div>
				</div>
			))}
		</div>
	);
}
