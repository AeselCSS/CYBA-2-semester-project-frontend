import { useEffect, useState } from 'react';

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
					<div className='order-modal-container'>
						<div className='grid-container'>
							<div className='grid-item'>
								<h3>Ordre id</h3>
								<h3>Status</h3>
								<h3>Oprettelsesdato</h3>
								<h3>Seneste Opdatering</h3>
							</div>
							<div className='grid-item'>
								<div>{order.id}</div>
								<div>{order.status}</div>
								<div>{order.createdAt.toString()}</div>
								<div>{order.updatedAt.toString()}</div>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
