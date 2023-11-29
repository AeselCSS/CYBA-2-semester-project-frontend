import PageLayout from './PageLayout';
import Table from "../components/Table/Table.tsx";
import { useLocation } from 'react-router-dom';
import EmployeeNavigation from '../components/EmployeeNavigation/EmployeeNavigation.tsx';

interface Props {
	employee: IEmployee;
}

export default function OrderOverview({employee}: Props) {
	console.log(employee);
	const location = useLocation();

	return (
		<PageLayout>
			<h2>Orders</h2>
			<EmployeeNavigation currentPath={location.pathname} />
			<Table<ICar> itemType="car" defaultSortBy="id" isFilterable={false}/>
		</PageLayout>
	);
}