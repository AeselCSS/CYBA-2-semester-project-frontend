import PageLayout from './PageLayout';
import Table from "../components/Table/Table.tsx";
import "../components/EmployeeNavigation/EmployeeView.css"

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
			<div className='employee-view-wrapper'>
				<div className='employee-view'>
					<h1 style={{textAlign: "center"}}>Ansatte</h1>
					{/*<EmployeeNavigation />*/}
					<Table<IEmployee> itemType='employee' defaultSortBy='firstName' skipValues={skipValues} />
				</div>
			</div>
		</PageLayout>
	);
}
