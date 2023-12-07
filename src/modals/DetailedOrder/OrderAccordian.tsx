import { useContext, useState } from 'react';
import UserContext from '../../context/userContext';
import { completeSubtaskInstance, initiateTaskInstance } from '../../services/apiService';
import ChangeOrderStatusButton from '../../components/Buttons/ChangeOrderStatusButton';
import { Status } from '../../utility/enums';
import { userIsEmployee } from '../../utility/userRoleChecker';
import { FaRegCircle, FaRegCircleCheck, FaRegCirclePlay } from 'react-icons/fa6';
import styles from './OrderAccordian.module.css'

interface AccordionProps {
	order: ICurrentOrder;
	setOrder: (newValue: ICurrentOrder) => void;
}

function Accordion({ order, setOrder }: AccordionProps) {
	const [openTaskId, setOpenTaskId] = useState<number | null>(null);
	const { user } = useContext(UserContext);

	const toggleTask = (taskId: number) => {
		setOpenTaskId(openTaskId === taskId ? null : taskId);
	};

	async function handleStartTask(taskId: number) {
		const isEmployee = userIsEmployee(user);
		if (isEmployee) {
			const employee = user as IEmployee;
			const response = await initiateTaskInstance(taskId, employee.id);
			setOrder(response);
		}
	}

	async function handleCompleteSubtask(subtaskId: number) {
		const response = await completeSubtaskInstance(subtaskId);
		console.log(response);
		setOrder(response);
	}

	return (
		<>
			{order.tasks && (
				<div>
					{order.tasks.map((task) => (
						<div key={task.id}>
							<button className={styles.accordianLabel} onClick={() => toggleTask(task.id)}>
								{task.status === Status.IN_PROGRESS && <FaRegCirclePlay color='yellow' />}
								{task.status === Status.COMPLETED && <FaRegCircleCheck color='green' />}
								{task.name} ({task.subtasks.filter((subtask) => subtask.status === Status.COMPLETED).length}/{task.subtasks.length})
							</button>

							{userIsEmployee(user) && task.status === Status.PENDING &&
								(order.status === Status.PENDING || order.status === Status.IN_PROGRESS) && (
									<ChangeOrderStatusButton btnText='Start opgave' onClick={() => handleStartTask(task.id)} />
								)}

							{openTaskId === task.id && (
								<div className={styles.accordianContent}>
									{task.subtasks.map((subtask) => (
										<div className={styles.contentItem} key={subtask.id}>
											<div>
												{subtask.status === Status.PENDING && <FaRegCircle />}
												{subtask.status === Status.COMPLETED && <FaRegCircleCheck color='green' />}
												{subtask.status === Status.IN_PROGRESS && <FaRegCirclePlay color='yellow' />}
											</div>
											{subtask.name} - {subtask.description}
											{subtask.status === Status.IN_PROGRESS && userIsEmployee(user) && (
												<ChangeOrderStatusButton
													btnText='Færdig'
													onClick={() => handleCompleteSubtask(subtask.id)}
												/>
											)}
										</div>
									))}
								</div>
							)}
						</div>
					))}
				</div>
			)}
		</>
	);
}

export default Accordion;
