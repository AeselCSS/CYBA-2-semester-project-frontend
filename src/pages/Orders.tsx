import PageLayout from './PageLayout';

interface props {
	employee: IEmployee;
}

export default function Orders({ employee }: props) {
	console.log(employee);

	return (
		<PageLayout>
			<h2>Orders</h2>
		</PageLayout>
	);
}
