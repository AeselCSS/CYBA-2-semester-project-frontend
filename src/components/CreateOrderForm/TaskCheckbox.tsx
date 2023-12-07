import calculatePrice from '../../utility/priceCalculator.ts';
import classes from '../CreateOrderForm/CreateOrderForm.module.css';

interface Props {
	task: IAPITask;
	register: any;
}

export default function TaskCheckbox({ task, register }: Props) {
	return (
		<article className={classes.checkboxDiv}>
			<div className={classes.inputAndDescrWrapper}>
				<div className={classes.inputContainer}>
					<input {...register('taskIds', { required: true, minLength: 1 })} type='checkbox' value={String(task.id)} />
				</div>
				<label htmlFor={String(task.id)}>{task.name}</label>
			</div>
			{/* <p className='description'>{task.description}</p> */}
			<p className='price'>{calculatePrice(task.time)},-</p>
		</article>
	);
}
