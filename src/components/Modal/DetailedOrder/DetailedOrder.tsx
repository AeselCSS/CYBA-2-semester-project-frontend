import { Loader } from '@mantine/core';
import { useEffect, useState } from 'react';
import Accordion from './OrderAccordian';

export default function DetailedOrder({ orderId: orderId }: { orderId: number }) {
	const [order, setOrder] = useState<ICurrentOrder | null>(null);
	console.log(order);

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
					<section>
						<div>{order?.id}</div>
						<div>{order?.status}</div>
						<div>1/3 Opgaver er færdige</div>
					</section>
					<section>
						<Accordion tasks={order.tasks} setOrder={setOrder} />
					</section>
				</>
			) : (
				<Loader />
			)}
		</div>
	);
}
