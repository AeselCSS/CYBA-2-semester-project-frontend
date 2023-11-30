import PageLayout from './PageLayout.tsx';
import Table from '../components/Table/Table.tsx';
import EmployeeNavigation from '../components/EmployeeNavigation/EmployeeNavigation.tsx';

interface props {
	employee: IEmployee
}

export default function CustomerOverview({employee}: props) {
	console.log(employee);

	const skipValues = [
		"id",
		"role",
		"updatedAt"
	]

	return (
		<PageLayout>
			<h2>Kunder</h2>
			<EmployeeNavigation currentPath={location.pathname} />
			<Table<ICustomer> itemType="customer" defaultSortBy="id" isFilterable={false} skipValues={skipValues}/>
		</PageLayout>
	)
}