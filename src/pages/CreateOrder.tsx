import { useNavigate } from 'react-router-dom';
import PageLayout from './PageLayout.tsx';
import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader.tsx';
import TaskCheckbox from '../components/TaskCheckbox/TaskCheckbox.tsx';
import '../components/TaskCheckbox/CreateOrder.css';

interface Props {
	customer: ICustomer;
}

interface newOrder {
	orderStartDate: string,
	carId: number,
	customerId: string,
	//Arrays af tasks ID'er
	tasks: {id: number}[]
}

async function createOrder(newOrder: newOrder) {
	return await fetch(`http://localhost:3000/orders`, {
		method: 'POST',
		body: JSON.stringify(newOrder),
		headers: {
			'Content-Type': 'application/json',
		},
	});
}

export default function CreateOrder({ customer }: Props) {
	const [tasks, setTasks] = useState<null | IAPITask[]>(null);
	const [cars, setCars] = useState<null | ICar[]>(null);
	const [selectedCarId, setSelectedCarId] = useState("");
	const [selectedTasks, setSelectedTasks] = useState<{id: number}[] | []>([])
	const navigate = useNavigate();
	console.log(customer);
	console.log(cars);

	useEffect(() => {
		async function getTasksAndCars() {

			try {
				const promiseTasks = await fetch('http://localhost:3000/tasks');
				const promiseCars = await fetch(`http://localhost:3000/customers/${customer.id}/cars`);

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

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;

		// Get all checked checkboxes
		const checkedCheckboxes = form.querySelectorAll('input[type="checkbox"]:checked');

		// Extract task IDs from checked checkboxes
		const taskObjects = Array.from(checkedCheckboxes).map((checkbox) => {
			return {
				id: parseInt(checkbox.id)
			}
		});

		const newOrder: newOrder = {
			customerId: customer.id,
			carId: parseInt(selectedCarId),
			orderStartDate: "2023-12-01",
			tasks: taskObjects,
		};

		console.log(newOrder.orderStartDate);

		try {
			const promise = await createOrder(newOrder);

			if (promise.ok) {
				navigate("/profile")
			} else {
				console.log("FETCH CREATE ERROR");
				console.log(promise.body);
			}

		} catch (error: any) {
			console.log(error.message);
		}
	};


	return (
		<PageLayout>
			<h1>Opret Ordre</h1>

			{tasks ? (
				<>
					<form onSubmit={handleSubmit}>

						<div className='form-container'>
							<section className='create-order-container'>
								{tasks.map((task) => (
									<TaskCheckbox key={task.id} task={task} setSelectedTasks={setSelectedTasks} selectedTasks={selectedTasks} />
								))}
							</section>
							<select name='cars' id='cars' onChange={(e) => setSelectedCarId(e.target.value)}>
								<option value=''>Ej køretøj valgt</option>
								{cars && cars.map((car) => (
									<option value={String(car.id)} key={car.id}>{car.brand} : Reg. nr. {car.registrationNumber}</option>
								))}
							</select>
							<input type='submit' value='Submit' disabled={!selectedCarId || !selectedTasks}></input>
						</div>

					</form>
				</>
			) : (
				<Loader />
			)}

		</PageLayout>
	);
}

