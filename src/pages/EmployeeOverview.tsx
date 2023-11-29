import PageLayout from './PageLayout';
import Table from "../components/Table/Table.tsx";
import EmployeeNavigation from '../components/EmployeeNavigation/EmployeeNavigation.tsx';

interface props {
	employee: IEmployee;
}

export default function EmployeeOverview({ employee }: props) {
	console.log(employee);

	return (
		<PageLayout>
			<h2>Employee</h2>
			<EmployeeNavigation currentPath={location.pathname} />
			<Table<IEmployee> itemType="employee" defaultSortBy="id"/>
		</PageLayout>
	);
}