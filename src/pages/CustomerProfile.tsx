import { useContext, useEffect, useState } from 'react';
import UserContext from '../context/userContext';
import { userIsCustomer } from '../utility/userRoleChecker';
import CarBox from '../components/CustomerProfile/CarBox';
import CustomerBox from '../components/CustomerProfile/CustomerBox';
import CustomerProfileGrid from '../components/CustomerProfile/CustomerProfileGrid';
import PageLayout from '../layouts/PageLayout/PageLayout';
import OrdersBox from '../components/CustomerProfile/OrdersBox';
import { Loader } from '@mantine/core';
import { getSingleCustomer } from '../services/customerServices.ts';
import { useNavigate } from 'react-router-dom';
import '../components/CustomerProfile/CustomerProfile.css';

export default function CustomerProfile() {
	const [customerData, setCustomerData] = useState<IAPISingleCustomer | null>(null);
	const navigate = useNavigate();
	const { user } = useContext(UserContext);

	useEffect(() => {
		if (userIsCustomer(user)) { // Check if the user is a customer
			const customer = user as ICustomer;
			getSingleCustomer(customer.id).then(setCustomerData);
		}

	}, [user]);

	if (!userIsCustomer(user)) {
		navigate('/redirect');
		return null;
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
				<div className='loading-wrapper'>
					<Loader color='orange' type='bars' />
				</div>
			)}
		</PageLayout>
	);
}