import PageLayout from './PageLayout';
import Table from '../components/Table/Table.tsx';
import "../components/EmployeeNavigation/EmployeeView.css"
import "../components/Table/Table.css"
interface props {
	employee: IEmployee;
}

export default function OrderOverview({ employee }: props) {
	console.log(employee);

	const skipValues = ['customerId'];

	return (
		<PageLayout>
			<div className='employee-view-wrapper'>
				<div className='employee-view'>
					<h1 style={{textAlign: "center"}}>Ordre</h1>
					{/*<EmployeeNavigation />*/}
					<Table<IAPIOrder> itemType='order' defaultSortBy='id' skipValues={skipValues} />
				</div>
			</div>
		</PageLayout>
	);
}
