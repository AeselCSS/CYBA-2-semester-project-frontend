import PageLayout from '../layouts/PageLayout/PageLayout.tsx';
import Table from '../components/Table/Table.tsx';
import "../components/Navbar/EmployeeNavigation/EmployeeView.css"

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
			<div className='employee-view-wrapper'>
				<div className='employee-view'>
					<h1 style={{textAlign: "center"}}>Kunder</h1>
					{/*<EmployeeNavigation />*/}
					<Table<ICustomer> itemType='customer' defaultSortBy='firstName' isFilterable={false} skipValues={skipValues} />
				</div>
			</div>
		</PageLayout>
	);
}