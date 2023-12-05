import { useEffect, useState } from 'react';
import CarSelect from './CarSelect.tsx';
import DatePicker from './DatePicker.tsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import TaskCheckbox from '../TaskCheckbox/TaskCheckbox.tsx';
import Loader from '../Loader/Loader.tsx';
import './CreateOrderForm.css';
import { useNavigate } from 'react-router-dom';

type TDatePiece = Date | null;
type TDate = TDatePiece | [TDatePiece, TDatePiece]

interface newOrder {
	orderStartDate: string,
	carId: number,
	customerId: string,
	tasks: { id: number }[]
}

type Inputs = {
	carId: string
	taskIds: string[]
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

export default function CreateOrderForm({ customer }: { customer: ICustomer }) {
	const [tasks, setTasks] = useState<null | IAPITask[]>(null);
	const [cars, setCars] = useState<null | ICar[]>(null);
	const [unavailableDates, setUnavailableDates] = useState<string[]>([]);
	const [date, setDate] = useState<TDate>(new Date());
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({
		defaultValues: {
			taskIds: [],
			carId: '',
		},
	});

	useEffect(() => {
		async function getTasksAndCars() {
			try {
				const promiseTasks = await fetch('http://localhost:3000/tasks');
				const promiseCars = await fetch(`http://localhost:3000/customers/${customer.id}/cars`);
				const promiseBookedDates = await fetch('http://localhost:3000/orders/dates');

				promiseTasks.ok ? setTasks(await promiseTasks.json()) : console.log('Promise Tasks is nok ok');
				promiseCars.ok ? setCars(await promiseCars.json()) : console.log('Promise Cars is nok ok');
				promiseBookedDates.ok ? setUnavailableDates(await promiseBookedDates.json()) : console.log('Promise unavailableDates is nok ok');
			} catch (error: unknown) {
				console.log((error as Error).message);
			}
		}

		getTasksAndCars();
	}, []);

	async function onSubmit(data: Inputs) {

		//Create a new ISO date. Split at T and return index 0, which is YYYY-MM-DD
		//It returns an incorrect DD (-1).We split on the dashes "-". To split the values in 3 variables.
		//Lastly, We assemble the values together, where the day is now correct. Padding with 0 is added if necessary
		const [year, month, day] = new Date(date?.toString() as string)
			.toISOString()
			.split('T')[0]
			.split('-');
		const correctDate = `${year}-${month}-${String(parseInt(day) + 1).padStart(2, '0')}`;
		console.log(correctDate);

		const newOrder: newOrder = {
			customerId: customer.id,
			carId: parseInt(data.carId),
			orderStartDate: correctDate,
			tasks: data.taskIds.map((id) => {
				return {
					id: parseInt(id)
				}
			})
		}

		try {
			const response = await createOrder(newOrder);

			if (response.ok) {
				//TODO toaster?
				navigate("/profile")
			}
		} catch (error: unknown) {
			console.log((error as Error).message);
		}
	}

	onSubmit as SubmitHandler<Inputs>;

	return (
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					{!tasks ? <Loader /> : tasks.map((task) => (
						<TaskCheckbox task={task} register={register} />
					))}
					{errors.taskIds && <span style={{color: 'orange'}}>Vælg venligst en eller flere services</span>}
				</div>

				<div>
					{!cars ? <Loader /> : <CarSelect cars={cars} register={register} errors={errors} />}
					<DatePicker unavailableDates={unavailableDates} date={date} setDate={setDate} />
				</div>

				<div className='form-btn-wrapper'>
					<button type='submit'>Opret Ordre</button>
				</div>
			</form>
		</div>
	);
}