import { useContext } from 'react';
import UserContext from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../layouts/PageLayout/PageLayout.tsx';
import CreateOrderForm from '../components/Forms/CreateOrderForm/CreateOrderForm.tsx';
import { userIsCustomer } from '../utility/userRoleChecker.ts';

export default function CreateOrder() {
	const navigate = useNavigate();
	const { user } = useContext(UserContext);

	if (!userIsCustomer(user)) {
		navigate('/redirect');
		return null;
	}

	const customer = user as ICustomer;

	return (
		<PageLayout>
			<h1 style={{ textAlign: 'center' }}>Opret Ordre</h1>
			<CreateOrderForm customer={customer} />
		</PageLayout>
	);
}