import { Loader } from '@mantine/core';
import { useEffect, useState } from 'react';
import Accordion from './OrderAccordian';
import { status } from '../../utility/danishDictionary';
import formatDate from '../../utility/dateFormat';
import classes from './DetailedOrder.module.css';
import { Status } from '../../utility/enums.ts';

export default function DetailedOrder({ orderId: orderId }: { orderId: number }) {
	const [order, setOrder] = useState<ICurrentOrder | null>(null);

	// fetche single order
	useEffect(() => {
		async function getOrder() {
			const response = await fetch(`http://localhost:3000/orders/${orderId}`);

			if (response.ok) {
				const data = await response.json();
				setOrder(data);
				console.log(data);
			}
		}
		getOrder();
	}, [orderId]);

	return (
		<div>
			{order ? (
				<>
					<section className={classes.infoWrapper}>
						<h3>Ordre status </h3>
						<div>{status[order?.status]}</div>
						<h3>Oprettelsesdato </h3>
						<div>{order?.createdAt ? formatDate(new Date(order?.createdAt)) : 'Ukendt'}</div>
						<h3>Sidst opdateret </h3>
						<div>{order?.updatedAt ? formatDate(new Date(order?.updatedAt)) : 'Ukendt'}</div>
						<h3>Påbegyndt ordre </h3>
						<div>{order?.updatedAt ? formatDate(new Date(order?.orderStartDate)) : 'Ukendt'}</div>
						<h3>Bil registerings nr. </h3>
						<div>{order?.car.registrationNumber}</div>
					</section>
					<div>
						( {order.tasks.filter((task) => task.status === Status.COMPLETED).length} / {order.tasks.length} ) Opgaver er
						færdige
					</div>
					<Accordion order={order} setOrder={setOrder} />
				</>
			) : (
				<Loader />
			)}
		</div>
	);
}
