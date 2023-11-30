import PageLayout from './PageLayout';
import Table from "../components/Table/Table.tsx";

interface Props {
	employee: IEmployee;
}

export default function OrderOverview({employee}: Props) {
	console.log(employee);

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
			<div className='employee-view-wrapper'>
				<div className='employee-view'>
					<h1 style={{textAlign: "center"}}>Køretøjer</h1>
					{/*<EmployeeNavigation />*/}
					<Table<ICar> itemType='car' defaultSortBy='registrationNumber' isFilterable={false} skipValues={skipValues} />
				</div>
			</div>
		</PageLayout>
	);
}