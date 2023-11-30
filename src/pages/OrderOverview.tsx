import PageLayout from './PageLayout';
import Table from '../components/Table/Table.tsx';
import EmployeeNavigation from '../components/EmployeeNavigation/EmployeeNavigation.tsx';

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
					<h1>Ordre</h1>
					<EmployeeNavigation />
					<Table<IAPIOrder> itemType='order' defaultSortBy='id' skipValues={skipValues} />
				</div>
			</div>
		</PageLayout>
	);
}
