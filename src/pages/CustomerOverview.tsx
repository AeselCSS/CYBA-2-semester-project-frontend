import { useContext } from 'react';
import UserContext from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { userIsEmployee } from '../utility/userRoleChecker';
import PageLayout from '../layouts/PageLayout/PageLayout.tsx';
import Table from '../components/Table/Table.tsx';

export default function CustomerOverview() {
	const navigate = useNavigate();
	const { user } = useContext(UserContext);

	if (!userIsEmployee(user)) {
		navigate('/redirect');
		return null;
	}

	const skipValues = [
		"id",
		"role",
		"updatedAt"
	]

	return (
		<PageLayout>
			<div className='employee-view-wrapper'>
				<div className='employee-view'>
					<h1 style={{textAlign: "center"}}>Kunder</h1>
					<Table<ICustomer> itemType='customer' defaultSortBy='firstName' isFilterable={false} skipValues={skipValues} />
				</div>
			</div>
		</PageLayout>
	);
}