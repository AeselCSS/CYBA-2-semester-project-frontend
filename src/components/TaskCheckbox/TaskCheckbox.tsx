import calculatePrice from '../../utility/priceCalculator.ts';

interface Props {
	task: IAPITask;
	register: any;

}

export default function TaskCheckbox({ task, register }: Props) {

	return (
		<div className="checkbox-div">
			<input {...register("taskIds", {required: true, minLength: 1})} type='checkbox' value={String(task.id)}  />
			<label htmlFor={String(task.id)}>{task.name}</label>
			<p className="description">{task.description}</p>
			<p className="price">{calculatePrice(task.time)},-</p>
		</div>
	);
}
