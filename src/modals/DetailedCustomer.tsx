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
				{/* <h2>
					{customerData?.customer.firstName} {customerData?.customer.lastName}
				</h2> */}
			</div>

			{filteredOrders?.length > 0 ? (
				// Added a div container for the header when there are active orders
				<div className='header-container'>
					<h2 className='header-one-container'>Aktive Ordre</h2>
					{/* Mapping through filteredOrders and rendering each order */}
					{filteredOrders.map((order) => (
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
							</section>
						</div>
					))}
				</div>
			) : (
				// Displaying a message when there are no active orders
				<h3 className='no-active-orders'>Ingen aktive ordre ✅</h3>
			)}

			<div className='header-container'>
				<h2 className='header-one-container'>Bildata</h2>
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
					</div>
				</div>
			))}
		</div>
	);
}
