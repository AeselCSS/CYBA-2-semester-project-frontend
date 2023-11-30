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

	const skipValues = [
		"id",
		"customerId",
		"createdAt",
		"updatedAt",
		"mileage",
		"lastInspectionDate",
		"firstRegistration",
		"lastInspectionResult",
		"lastInspectionKind"
	]

	return (
		<PageLayout>
			<h2>Køretøjer</h2>
			<EmployeeNavigation currentPath={location.pathname} />
			<Table<ICar> itemType="car" defaultSortBy="registrationNumber" isFilterable={false} skipValues={skipValues}/>
		</PageLayout>
	);
}