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
			<p>Ordre data</p>
			<div>{customerData?.customer.lastName}</div>
			{customerData?.orders?.map((order) => (
				<div key={order.id}>
					{' '}
					<div>{order.status}</div>
					<div>{order.createdAt.toString()}</div>
					<div>{order.updatedAt.toString()}</div>
				</div>
			))}
			<p>Bil data</p>
			{customerData?.cars.map((car) => (
				<div key={car.id}>
					<div>{car.registrationNumber}</div>
					<div>{car.lastInspectionKind}</div>
					<div>{car.lastInspectionResult}</div>
				</div>
			))}
		</div>
	);
}
