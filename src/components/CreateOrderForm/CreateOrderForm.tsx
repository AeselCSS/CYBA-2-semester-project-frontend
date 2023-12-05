import { useEffect, useState } from 'react';
import CarSelect from './CarSelect.tsx';
import DatePicker from './DatePicker.tsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import TaskCheckbox from '../TaskCheckbox/TaskCheckbox.tsx';
import calculatePrice from '../../utility/priceCalculator.ts';

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

export default function CreateOrderForm({customer}: {customer: ICustomer}) {
	const [tasks, setTasks] = useState<null | IAPITask[]>(null);
	const [cars, setCars] = useState<null | ICar[]>(null);
	const [unavailableDates, setUnavailableDates] = useState<string[]>([]);
	const [date, setDate] = useState<null | TDate>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({
			defaultValues: {
				taskIds: [],
				carId: ""
			}
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
		console.log("SUBMIT");
		console.log(data);
	}onSubmit as SubmitHandler<Inputs>

	return(
		<div>
			<form onSubmit={handleSubmit(onSubmit)}>
				{tasks?.map((task) => (
					<div className="checkbox-div">
						<input {...register("taskIds")} type='checkbox' value={String(task.id)} id={String(task.id)}  />
						<label htmlFor={String(task.id)}>{task.name}</label>
						<p className="description">{task.description}</p>
						<p className="price">{calculatePrice(task.time)},-</p>
					</div>
				))}
				{errors.taskIds && <span>Vælg venligst en eller flere services</span>}

				<CarSelect cars={cars} register={register} errors={errors}/>
				<DatePicker unavailableDates={unavailableDates} date={date} setDate={setDate}/>

				<div className='form-btn-wrapper'>
					<button type='submit'> Opret Ordre</button>
				</div>
			</form>
		</div>
	)
}