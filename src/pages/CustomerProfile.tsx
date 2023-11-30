import CarBox from '../components/CustomerProfile/CarBox';
import CustomerBox from '../components/CustomerProfile/CustomerBox';
import CustomerProfileGrid from '../components/CustomerProfile/CustomerProfileGrid';
import PageLayout from './PageLayout';
import { useEffect, useState } from 'react';
import OrdersBox from '../components/CustomerProfile/OrdersBox';
import Loader from '../components/Loader/Loader';

interface props {
	customer: ICustomer;
}

export default function CustomerProfile({ customer }: props) {
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

	return (
		<PageLayout>
			{customerData ? (
				<CustomerProfileGrid>
					{<CustomerBox customerData={customerData} />}
					{<CarBox customerData={customerData} />}
					{<OrdersBox customerData={customerData} />}
				</CustomerProfileGrid>
			) : (
				<Loader />
			)}
		</PageLayout>
	);
}
