import { useNavigate } from 'react-router-dom';
import PageLayout from './PageLayout.tsx';
import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader.tsx';
import TaskCheckbox from '../components/TaskCheckbox/TaskCheckbox.tsx';
import "../components/TaskCheckbox/CreateOrder.css"

interface Props {
	customer: ICustomer;
}

interface newOrder {
	orderStartDate: string,
	carId: number,
	customerId: string,
	//Arrays af tasks ID'er
	tasks: number[]
}

async function createOrder(newOrder) {

}

export default function CreateOrder({ customer }: Props) {
	const [tasks, setTasks] = useState<null | IAPITask[]>(null);
	const [cars, setCars] = useState<null | ICar[]>(null)
	const navigate = useNavigate();
	console.log(customer);

	useEffect(() => {
		async function getTasksAndCars() {

			try {
				const promiseTasks = await fetch('http://localhost:3000/tasks');
				const promiseCars = await fetch(`http://localhost:3000/cars/${customer.id}`)

				if (promiseTasks.ok) {
					setTasks(await promiseTasks.json());
				} else {
					console.log('Promise is nok ok');
					console.log(promiseTasks.body);
				}

				if (promiseCars.ok) {
					setCars(await promiseCars.json());
				} else {
					console.log('Promise is nok ok');
					console.log(promiseCars.body);
				}

			} catch (error: any) {
				console.log('ERROR at fetch');
				console.log(error.message);
			}
		}

		getTasksAndCars();
	}, []);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const form = e.target as HTMLFormElement;


		const newOrder: newOrder = {
			customerId: customer.id,
			carId: 0,
			orderStartDate: "0",
			tasks: [0,0,0,0]
		}


	}


	return (
		<PageLayout>
			<h1>Opret Ordre</h1>

			{tasks ? (
				<>
					<form onSubmit={handleSubmit}>
						<section className='create-order-container'>
							{tasks.map((task) => (
								<TaskCheckbox key={task.id} task={task} />
							))}
						</section>
						<input type='submit' value="Submit"></input>
					</form>
				</>
			) : (
				<Loader />
			)}

		</PageLayout>
	);
}