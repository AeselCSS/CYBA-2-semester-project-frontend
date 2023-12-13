import { useContext } from 'react';
import UserContext from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { userIsCustomer } from '../utility/userRoleChecker';
import PageLayout from '../layouts/PageLayout/PageLayout.tsx';
import CreateCarForm from '../components/Forms/CreateCarForm/CreateCarForm.tsx';

export default function CreateCar() {
	const navigate = useNavigate();
	const { user } = useContext(UserContext);

	if (!userIsCustomer(user)) {
		navigate('/redirect');
		return null;
	}

	const customer = user as ICustomer;

	return (
		<PageLayout>
			<h1 style={{ textAlign: 'center' }}>Opret Køretøj</h1>
			<CreateCarForm customer={customer} />
		</PageLayout>
	);
}