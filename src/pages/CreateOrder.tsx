import { useNavigate } from 'react-router-dom';
import PageLayout from './PageLayout.tsx';
import { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader.tsx';

interface Props {
	customer: ICustomer;
}

export default function CreateOrder({ customer }: Props) {
	const [tasks, setTasks] = useState<null | IAPITask>(null);
	const navigate = useNavigate();
	console.log(customer);

	useEffect(() => {
		async function getTasks() {

			try {
				const promise = await fetch('http://localhost:3000/tasks');

				if (promise.ok) {
					setTasks(await promise.json())
				} else {
					console.log("Promise is nok ok");
					console.log(promise.body);
				}

			} catch (error: any) {
				console.log('ERROR at fetch');
				console.log(error.message);
			}
		}

		getTasks();
	}, []);


	return (
		<PageLayout>
			<h1>Opret Ordre</h1>

			{tasks ? (
				<h2>FETCHED</h2>
			) : (
				<Loader/>
			) }

		</PageLayout>
	);
}