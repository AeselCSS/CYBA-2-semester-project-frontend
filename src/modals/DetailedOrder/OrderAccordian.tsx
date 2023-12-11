import React, { useContext, useState } from 'react';
import UserContext from '../../context/userContext';
import { completeSubtaskInstance } from '../../services/subtaskServices';
import { initiateTaskInstance } from '../../services/taskServices';
import ChangeOrderStatusButton from '../../components/Buttons/ChangeOrderStatusButton';
import { Status } from '../../utility/enums';
import { userIsEmployee } from '../../utility/userRoleChecker';
import { FaRegCircle, FaRegCircleCheck, FaRegCirclePlay } from 'react-icons/fa6';

import classes from './DetailedOrder.module.css';

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

	const handleStartTask = async (e: React.MouseEvent, taskId: number) => {
		e.stopPropagation();
		if (userIsEmployee(user)) {
			setOrder(await initiateTaskInstance(taskId, (user as IEmployee).id));
		}
	};

	const handleCompleteSubtask = async (subtaskId: number) => {
		setOrder(await completeSubtaskInstance(subtaskId));
	};

	return (
		<>
			{order.tasks && (
				<section className={classes.tasksWrapper}>
					{order.tasks?.map((task) => (
						<div key={task.id} className={openTaskId === task.id ? classes.activeTask : ''}>
							<div className={classes.accordianLabel} onClick={() => toggleTask(task.id)}>
								<div>
									<div className={classes.accordianLabelIcon}>
										{task.status === Status.PENDING && <FaRegCircle />}
										{task.status === Status.IN_PROGRESS && (
											<span className={classes.popIn}>
												<FaRegCirclePlay color='yellow' />
											</span>
										)}
										{task.status === Status.COMPLETED && (
											<span className={classes.popIn}>
												<FaRegCircleCheck color='lightgreen' />
											</span>
										)}
									</div>
									<div>{task.name}</div>
								</div>

								{userIsEmployee(user) &&
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
								)}
							</div>

							{openTaskId === task.id && (
								<div className={classes.accordianContent}>
									{task.subtasks.map((subtask) => (
										<div className={classes.contentItem} key={subtask.id}>
											<div className={classes.subTaskTextWrapper}>
												<div className={classes.accordianSubtaskIcon}>
													{subtask.status === Status.PENDING && <FaRegCircle />}
													{subtask.status === Status.COMPLETED && (
														<span className={classes.popIn}>
															<FaRegCircleCheck color='lightgreen' />
														</span>
													)}
													{subtask.status === Status.IN_PROGRESS && (
														<span className={classes.popIn}>
															<FaRegCirclePlay color='yellow' />
														</span>
													)}
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

export default Accordion;
