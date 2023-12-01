import {useNavigate} from 'react-router-dom';
import PageLayout from './PageLayout.tsx';

interface Props {
	customer: ICustomer;
}

export default function CreateOrder({ customer }: Props) {
	const navigate = useNavigate()
	console.log(customer);


	return (
		<PageLayout>
			<h1>Create Order</h1>
		</PageLayout>
	)
}