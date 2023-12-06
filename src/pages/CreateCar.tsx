import PageLayout from './PageLayout.tsx';
import CreateCarForm from '../components/CreateCarForm/CreateCarForm.tsx';

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