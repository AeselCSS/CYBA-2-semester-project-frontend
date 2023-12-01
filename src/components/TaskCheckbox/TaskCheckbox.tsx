
interface Props {
	task: IAPITask
}

export default function TaskCheckbox({task}: Props) {

	return (
		<li><p>{task.name}</p><input type="checkbox"></input></li>
	)
}