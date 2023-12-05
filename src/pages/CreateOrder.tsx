import PageLayout from './PageLayout.tsx';
import '../components/CreateOrderForm/CreateOrder.css';
import CreateOrderForm from '../components/CreateOrderForm/CreateOrderForm.tsx';

export default function CreateOrder({ customer }: { customer: ICustomer }) {

	return (
		<PageLayout>
			<h1 style={{ textAlign: 'center' }}>Opret Ordre</h1>
			<CreateOrderForm customer={customer} />
		</PageLayout>
	);
}