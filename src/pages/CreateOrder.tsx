import {useNavigate} from 'react-router-dom';
import PageLayout from './PageLayout.tsx';
import { useEffect, useState } from 'react';

interface Props {
	customer: ICustomer;
}

export default function CreateOrder({ customer }: Props) {
	const [tasks, setTasks] = useState<null | >()
	const navigate = useNavigate()
	console.log(customer);

	useEffect(() => {
		async function getTasks() {

		}

		getTasks()
	}, []);


	return (
		<PageLayout>
			<h1>Opret Ordre</h1>


		</PageLayout>
	)
}