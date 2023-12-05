import { useContext, useState } from 'react';
import { FaRegCircle, FaRegCircleCheck } from 'react-icons/fa6';
import userContext from '../../../context/userContext.ts';
import { Role, Status } from '../../../enums.ts';
import ChangeOrderStatusButton from '../../Buttons/changeOrderStatusButton.tsx';
import { completeSubtaskInstance, initiateTaskInstance } from '../../../services/apiService.ts';

interface Subtask {
	id: number;
	name: string;
	description: string;
	time: number;
	status: string;
	updatedAt: Date;
}

interface Task {
	id: number;
	name: string;
	description: string;
	status: string;
	updatedAt: Date;
	totalTime: number;
	employee: number | null;
	subtasks: Subtask[];
}

interface AccordionProps {
	tasks: Task[];
    setOrder: (newvalue: ICurrentOrder)=> void
}

function Accordion({ tasks, setOrder }: AccordionProps) {
	const [openTaskId, setOpenTaskId] = useState<number | null>(null);

	const user = useContext(userContext);

	const toggleTask = (taskId: number) => {
		setOpenTaskId(openTaskId === taskId ? null : taskId);
	};

    async function handleStartTask(taskId: number) {
		const response = await initiateTaskInstance(taskId, (user as IEmployee).id);
        console.log(response);	  
        setOrder(response);
	}

    async function handleCompleteSubtask(subtaskId: number) {
		const response = await completeSubtaskInstance(subtaskId);
        console.log(response);	  
        setOrder(response);
	}

	return (
		<>
			{tasks && (
				<div>
					{tasks?.map((task) => (
						<div key={task.id}>
							<button onClick={() => toggleTask(task.id)}>
								{task.name} ({task.subtasks.filter((st) => st.status === Status.COMPLETED).length}/{task.subtasks.length})
							</button>

							{(user as IEmployee | ICustomer)?.role === Role.EMPLOYEE && task.status === Status.PENDING ? (
								<ChangeOrderStatusButton btnText='Start opgave' onClick={() => handleStartTask(task.id)} />
							) : null}

							{openTaskId === task.id && (
								<div>
									{task.subtasks.map((subtask) => (
										<div key={subtask.id}>
											{subtask.status !== Status.COMPLETED ? <FaRegCircle /> : <FaRegCircleCheck color='green' />}
											{subtask.name} - {subtask.description}
											{subtask.status === Status.IN_PROGRESS ? (
												<button onClick={() => handleCompleteSubtask(subtask.id)}>Færdig</button>
											) : null}
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
