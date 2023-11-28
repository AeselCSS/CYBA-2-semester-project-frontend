import PageLayout from './PageLayout';
import Table from "../components/Table/Table.tsx";

interface props {
	employee: IEmployee;
}

export default function Orders({ employee }: props) {
	console.log(employee);

	return (
		<PageLayout>
			<h2>Orders</h2>
			<Table itemType="order" defaultSortBy="id"/>
		</PageLayout>
	);
}
