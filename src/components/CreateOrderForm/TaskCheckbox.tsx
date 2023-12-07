import calculatePrice from '../../utility/priceCalculator.ts';
import classes from '../CreateOrderForm/CreateOrderForm.module.css';
import { FaCircleInfo } from 'react-icons/fa6';
import { HoverCard, Group, Box } from '@mantine/core';

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
			<div className={classes.priceInfoContainer}>
				<p>{calculatePrice(task.time)},-</p>
				<Group justify='center'>
					<HoverCard
						width={280}
						shadow='md'
						styles={{
							dropdown: { backgroundColor: '#262626f1', border: '1px solid #d87005', background: 'filter: blur(5px)' },
						}}
					>
						<HoverCard.Target>
							<Box>
								<FaCircleInfo />
							</Box>
						</HoverCard.Target>
						<HoverCard.Dropdown>
							<p>{task.description}</p>
						</HoverCard.Dropdown>
					</HoverCard>
				</Group>
			</div>
		</article>
	);
}
