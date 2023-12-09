import { useEffect, useState } from 'react';
import formatDate from '../utility/dateFormat.ts';
import { getSingleCustomer } from '../services/customerServices.ts';

interface DetailedCustomerProps {
	customer: ICustomer;
}

export default function DetailedCustomer({ customer }: DetailedCustomerProps) {
	const [customerData, setCustomerData] = useState<IAPISingleCustomer | null>(null);

	useEffect(() => {
		getSingleCustomer(customer.id).then((data) => setCustomerData(data));
	}, [customer.id]);

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
								<div>{order.status}</div>
								<h3>Oprettelses Dato</h3>
								<div>{formatDate(new Date(order.createdAt))}</div>
								<h3>Seneste Opdatering </h3>
								<div>{formatDate(new Date(order.updatedAt))}</div>
							</div>
								<hr/>
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
						<hr/>
					</div>
				</div>
			))}
		</div>
	);
}
