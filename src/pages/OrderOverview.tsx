import PageLayout from './PageLayout';
import Table from "../components/Table/Table.tsx";

interface props {
	employee: IEmployee;
}

export default function OrderOverview({ employee }: props) {
	console.log(employee);

	return (
		<PageLayout>
			<h2>Orders</h2>
			<EmployeeNavigation currentPath={location.pathname} />
			<Table<IAPIOrder> itemType="order" defaultSortBy="id"/>
		</PageLayout>
	);
}
