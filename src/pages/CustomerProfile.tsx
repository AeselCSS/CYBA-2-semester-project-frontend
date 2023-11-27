import PageLayout from './PageLayout';



interface props {
	user: IAPISingleCustomer;
}

export default function CustomerProfile({ user }: props) {
	// const [customer, setCustomer] = useState(user.customer);
	// const [cars, setCars] = useState(user.cars);
	// const [orders, setOrders] = useState(user.orders);

	return (
		<PageLayout>
			<h2>{user.customer.firstName}</h2>
			<h2>{user.customer.lastName}</h2>
			<h2>{user.customer.phone}</h2>
		</PageLayout>
	);
}
