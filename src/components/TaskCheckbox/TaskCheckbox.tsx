import calculatePrice from '../../utility/priceCalculator.ts';

interface Props {
	task: IAPITask;
	register: any;

}

export default function TaskCheckbox({ task, register }: Props) {

	return (
		<div title={task.description} className="checkbox-div">
			<input {...register("taskIds")} type='checkbox' name={String(task.id)} id={String(task.id)}  />
			<label htmlFor={String(task.id)}>{task.name}</label>
			<p className="price">{calculatePrice(task.time)},-</p>
			<p className="description">{task.description}</p>
		</div>
	);
}
