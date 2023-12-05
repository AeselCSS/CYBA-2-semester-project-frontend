import PageLayout from './PageLayout.tsx';
import CreateOrderForm from '../components/CreateOrderForm/CreateOrderForm.tsx';

export default function CreateOrder({ customer }: { customer: ICustomer }) {

	return (
		<PageLayout>
			<h1 style={{ textAlign: 'center' }}>Opret Ordre</h1>
			<CreateOrderForm customer={customer} />
		</PageLayout>
	);
}