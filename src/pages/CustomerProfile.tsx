import CarBox from '../components/CustomerProfile/CarBox';
import CustomerBox from '../components/CustomerProfile/CustomerBox';
import CustomerProfileGrid from '../components/CustomerProfile/CustomerProfileGrid';
import PageLayout from './PageLayout';
import { useEffect, useState } from 'react';
import OrdersBox from '../components/CustomerProfile/OrdersBox';

interface props {
	customer: ICustomer;
}

export default function CustomerProfile({ customer }: props) {
	const [customerData, setCustomerData] = useState<IAPISingleCustomer | null>(null);

	console.log(customerData);

	useEffect(() => {
		async function getCustomer() {
			const response = await fetch(`http://localhost:3000/customers/${customer.id}`);
			const data = await response.json();
			setCustomerData(data);
		}
		getCustomer();
	}, [customer.id]);

	return (
		<PageLayout>
			<CustomerProfileGrid>
				{customerData && <CustomerBox customerData={customerData} />}
				{customerData && <CarBox customerData={customerData} />}
				{customerData && <OrdersBox customerData={customerData} />}
			</CustomerProfileGrid>
		</PageLayout>
	);
}
