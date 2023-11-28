import { useEffect, useState } from 'react';
import Loader from '../Loader';

interface OrdersBoxDetailProps {
	customerData: IAPISingleCustomer;
	order: IOrder;
}

export default function OrdersBoxDetail({ customerData, order }: OrdersBoxDetailProps) {
	const [currentOrder, setCurrentOrder] = useState<ICurrentOrder | null>(null);

	// Finds car matching order ID
	const [car] = customerData.cars.filter((car) => car.id === order.carId);

	useEffect(() => {
		async function getCustomer() {
			//TODO Brug .env til dynamisk url kald
			const response = await fetch(`http://localhost:3000/orders/${order.id}`);
			const data = await response.json();
			setCurrentOrder(data);
		}
		getCustomer();
	}, [order.id]);

	return (
		<article className='order-box-details'>
			{currentOrder ? (
				<>
					{/* <div>Billede</div> */}
					<div className='image-container'>
						<img src='car-icon.png' alt='' />
					</div>
					<div>
						<p>
							<em>Ordre:</em> {order.id}
						</p>
						<p>
							<em>Reg.nr:</em> {car.registrationNumber}
						</p>
						<p>
							<em>Pris:</em> {currentOrder.totalTime}
						</p>
						<p>
							<em>Status:</em> {currentOrder.status}
						</p>
						<button>Aflever bil</button>
					</div>
				</>
			) : (
				<Loader />
			)}
		</article>
	);
}
