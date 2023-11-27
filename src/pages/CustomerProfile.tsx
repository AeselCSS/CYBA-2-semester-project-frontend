import PageLayout from './PageLayout';

interface props {
	customer: ICustomer;
}

export default function CustomerProfile({ customer }: props) {
	// const [customer, setCustomer] = useState(user.customer);
	// const [cars, setCars] = useState(user.cars);
	// const [orders, setOrders] = useState(user.orders);

	return (
		<PageLayout>
			<h2>{customer.firstName}</h2>
			<h2>{customer.lastName}</h2>
			<h2>{customer.phone}</h2>
		</PageLayout>
	);
}
