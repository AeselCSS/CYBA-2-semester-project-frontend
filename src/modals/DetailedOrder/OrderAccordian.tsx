import { useContext, useState } from 'react';
import UserContext from '../../context/userContext';
import { completeSubtaskInstance, initiateTaskInstance } from '../../services/apiService';
import ChangeOrderStatusButton from '../../components/Buttons/ChangeOrderStatusButton';
import { Status, Role } from '../../utility/enums';
import { userIsEmployee } from '../../utility/userRoleChecker';
import { FaRegCircle, FaRegCircleCheck, FaRegCirclePlay } from 'react-icons/fa6';
import ChangeOrderStatusButton from '../../Buttons/changeOrderStatusButton.tsx';
import { completeSubtaskInstance, initiateTaskInstance } from '../../../services/apiService.ts';
import classes from './DetailedOrder.module.css';
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

	async function handleStartTask(e: React.MouseEvent, taskId: number) {
		e.stopPropagation();
		const isEmployee = userIsEmployee(user);
		if (isEmployee) {
			const employee = user as IEmployee;
			const response = await initiateTaskInstance(taskId, employee.id);
			setOrder(response);
		}

		async function handleCompleteSubtask(subtaskId: number) {
			const response = await completeSubtaskInstance(subtaskId);
			console.log(response);
			setOrder(response);
		}

		return (
			<>
				{order.tasks && (
					<section className={classes.tasksWrapper}>
						{order.tasks?.map((task) => (
							<div key={task.id} className={openTaskId === task.id ? classes.activeTask : ''}>
								<button className={classes.accordianLabel} onClick={() => toggleTask(task.id)}>
									<div>
										<div className={classes.accordianLabelIcon}>
											{task.status === Status.PENDING && <FaRegCircle />}
											{task.status === Status.IN_PROGRESS && <FaRegCirclePlay color='yellow' />}
											{task.status === Status.COMPLETED && <FaRegCircleCheck color='green' />}
										</div>
										<div>{task.name}</div>
									</div>

									{(userIsEmployee(user) &&
									task.status === Status.PENDING &&
									(order.status === Status.PENDING || order.status === Status.IN_PROGRESS) ? (
										<ChangeOrderStatusButton
											btnText='Start opgave'
											onClick={(e: React.MouseEvent) => handleStartTask(e, task.id)}
										/>
									) : (
										<div>
											({task.subtasks.filter((subtask) => subtask.status === Status.COMPLETED).length}/
											{task.subtasks.length})
										</div>
									))}
								</button>

								{openTaskId === task.id && (
									<div className={classes.accordianContent}>
										{task.subtasks.map((subtask) => (
											<div className={classes.contentItem} key={subtask.id}>
												<div className={classes.subTaskTextWrapper}>
													<div className={classes.accordianSubtaskIcon}>
														{subtask.status === Status.PENDING && <FaRegCircle />}
														{subtask.status === Status.COMPLETED &&
															<FaRegCircleCheck color='green' />}
														{subtask.status === Status.IN_PROGRESS &&
															<FaRegCirclePlay color='yellow' />}
													</div>
													<div>
														{subtask.name} - {subtask.description}
													</div>
												</div>
												{subtask.status === Status.IN_PROGRESS && userIsEmployee(user) ? (
													<ChangeOrderStatusButton
														btnText='Færdig'
														onClick={() => handleCompleteSubtask(subtask.id)}
													/>
												) : (
													<div></div>
												)}
											</div>
										))}
									</div>
								)}
							</div>
						))}
					</section>
				)}
			</>
		);
	}
}
export default Accordion;
