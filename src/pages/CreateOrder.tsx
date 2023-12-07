import PageLayout from '../layouts/PageLayout/PageLayout.tsx';
import CreateOrderForm from '../components/Forms/CreateOrderForm/CreateOrderForm.tsx';

export default function CreateOrder({ customer }: { customer: ICustomer }) {

	return (
		<PageLayout>
			<h1 style={{ textAlign: 'center' }}>Opret Ordre</h1>
			<CreateOrderForm customer={customer} />
		</PageLayout>
	);
}