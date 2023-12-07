import PageLayout from '../layouts/PageLayout/PageLayout.tsx';
import CreateCarForm from '../components/Forms/CreateCarForm/CreateCarForm.tsx';

export default function CreateCar({ customer }: {
	customer: ICustomer
}) {
	return (
		<PageLayout>
			<h1 style={{ textAlign: 'center' }}>Opret Køretøj</h1>
			<CreateCarForm customer={customer}/>
		</PageLayout>
	)
}