import { useEffect, useState } from 'react';
import CarSelect from './CarSelect.tsx';
import DatePicker from './DatePicker.tsx';
import { SubmitHandler, useForm } from 'react-hook-form';
import TaskCheckbox from './TaskCheckbox.tsx';
import Loading from '../../Loading/Loading.tsx';
import { useNavigate } from 'react-router-dom';
import classes from './CreateOrderForm.module.css';
import { getTasks } from '../../../services/taskServices.ts';
import { getCustomerCars} from '../../../services/carServices.ts';
import { getBookedDates, submitOrder } from '../../../services/orderServices.ts';

type TDatePiece = Date | null;
type TDate = TDatePiece | [TDatePiece, TDatePiece];

type Inputs = {
	carId: string;
	taskIds: string[];
};

export default function CreateOrderForm({ customer }: { customer: ICustomer }) {
	const [tasks, setTasks] = useState<null | IAPITask[]>(null);
	const [cars, setCars] = useState<null | ICar[]>(null);
	const [unavailableDates, setUnavailableDates] = useState<string[]>([]);
	const [date, setDate] = useState<TDate | null>(null);
	const navigate = useNavigate();

	const { register, handleSubmit, formState: { errors }, } = useForm<Inputs>({ defaultValues: { taskIds: [], carId: '', },
	});

	useEffect(() => {
		async function getTasksAndCarsAndBookedDates() {
			const tasks = await getTasks();
			const cars = await getCustomerCars(customer.id);
			const unavailableDates = await getBookedDates();

			if (tasks) setTasks(tasks);
			if (cars) setCars(cars);
			if (unavailableDates) setUnavailableDates(unavailableDates);
		}

		getTasksAndCarsAndBookedDates();
	}, [customer.id]);

	const onSubmit: SubmitHandler<Inputs> = data => {
		submitOrder(data, date, customer, navigate);
	};

	return (
		<div className={classes.orderFormWrapper}>
			<form className={classes.orderFormContainer} onSubmit={handleSubmit(onSubmit)}>
				<aside className={classes.tasksContainer}>
					{!tasks ? <Loading /> : tasks.map((task) => <TaskCheckbox task={task} register={register} key={task.id} />)}
				</aside>
				<aside className={classes.formRightSideContainer}>
					<div className={classes.carSelectContainer}>
						{!cars ? <Loading /> : <CarSelect cars={cars} register={register} errors={errors} />}
					</div>
					{errors.taskIds && (
						<span style={{ color: 'orange', padding: '1.5rem 5rem' }}>Vælg venligst en eller flere services</span>
					)}
					<div className={classes.dateContainer}>
						<DatePicker unavailableDates={unavailableDates} date={date} setDate={setDate} />
					</div>
					<div className={classes.btnContainer}>
						<button type='submit' disabled={!date}>
							Opret Ordre
						</button>
					</div>
				</aside>
			</form>
		</div>
	);
}
