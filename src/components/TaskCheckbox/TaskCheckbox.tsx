interface Props {
	task: IAPITask;
}

export default function TaskCheckbox({ task }: Props) {
	console.log(task);
	return (
		<div title={task.description} className="checkbox-div">
			<input type='checkbox' name={String(task.id)} id={String(task.id)} />
			<label htmlFor={String(task.id)}>{task.name}</label>
			<p className="price">{task.time}</p>
			<p className="description">{task.description}</p>
		</div>
	);
}


/*
 <li><input type="checkbox" value={task.name}></input></li>
 */
