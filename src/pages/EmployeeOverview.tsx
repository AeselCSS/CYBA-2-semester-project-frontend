import PageLayout from './PageLayout';
import Table from "../components/Table/Table.tsx";
import EmployeeNavigation from '../components/EmployeeNavigation/EmployeeNavigation.tsx';

interface props {
	employee: IEmployee;
}

export default function EmployeeOverview({ employee }: props) {
	console.log(employee);

	const skipValues = [
		"id",
		"createdAt",
		"updatedAt"
	]

	return (
		<PageLayout>
			<h2>Ansatte</h2>
			<EmployeeNavigation currentPath={location.pathname} />
			<Table<IEmployee> itemType="employee" defaultSortBy="firstName" skipValues={skipValues}/>
		</PageLayout>
	);
}
