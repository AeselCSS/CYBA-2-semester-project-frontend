import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/userContext';
import { userIsCustomer } from '../utility/userRoleChecker';
import CarBox from '../components/CustomerProfile/CarBox';
import CustomerBox from '../components/CustomerProfile/CustomerBox';
import CustomerProfileGrid from '../components/CustomerProfile/CustomerProfileGrid';
import PageLayout from '../layouts/PageLayout/PageLayout';
import OrdersBox from '../components/CustomerProfile/OrdersBox';
import Loader from '../components/Loader/Loader';
import { getSingleCustomer } from '../services/apiService';

export default function CustomerProfile() {
	const [customerData, setCustomerData] = useState<IAPISingleCustomer | null>(null);
	const { user } = useContext(UserContext);

	useEffect(() => {
		if (userIsCustomer(user)) { // Check if the user is a customer
			const customer = user as ICustomer;
			getSingleCustomer(customer.id).then(setCustomerData);
		}

	}, [user]);

	if (!userIsCustomer(user)) {
		// If the user is not a customer, deny access. We might want to redirect to a 404 page instead?
		return <p>Access Denied</p>;
	}

	return (
		<PageLayout>
			{customerData ? (
				<CustomerProfileGrid>
					<CustomerBox customerData={customerData} />
					<CarBox customerData={customerData} />
					<OrdersBox customerData={customerData} />
				</CustomerProfileGrid>
			) : (
				<Loader />
			)}
		</PageLayout>
	);
}