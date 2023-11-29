import PageLayout from './PageLayout';
import Table from "../components/Table/Table.tsx";
import EmployeeNavigation from '../components/EmployeeNavigation/EmployeeNavigation.tsx';

interface props {
	employee: IEmployee;
}

export default function OrderOverview({ employee }: props) {
	console.log(employee);

	const skipValues = [
		"customerId"
	]

	return (
		<PageLayout>
			<h2>Ordre</h2>
			<EmployeeNavigation currentPath={location.pathname} />
			<Table<IAPIOrder> itemType="order" defaultSortBy="id" skipValues={skipValues} />
		</PageLayout>
	);
}
