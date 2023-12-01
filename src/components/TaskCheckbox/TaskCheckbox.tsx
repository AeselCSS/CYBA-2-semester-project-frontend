import calculatePrice from '../../utility/priceCalculator.ts';

interface Props {
	task: IAPITask;
	setSelectedTasks: (newValue: {id: number}[]) => void;
	selectedTasks: {id: number}[]
}

export default function TaskCheckbox({ task, setSelectedTasks, selectedTasks }: Props) {

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const id = parseInt(e.target.value);

		if (selectedTasks.includes({id: id})) {
			const newTasks = selectedTasks.filter((task) => task.id != id)
			setSelectedTasks(newTasks)
		} else {
			setSelectedTasks(selectedTasks.push())
		}

	}

	return (
		<div title={task.description} className="checkbox-div">
			<input type='checkbox' name={String(task.id)} id={String(task.id)} onChange={handleChange} />
			<label htmlFor={String(task.id)}>{task.name}</label>
			<p className="price">{calculatePrice(task.time)},-</p>
			<p className="description">{task.description}</p>
		</div>
	);
}
