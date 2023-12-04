import { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import {status as danishStatus } from '../../utility/danishDictionary.ts';

interface OrdersBoxDetailProps {
	customerData: IAPISingleCustomer;
	order: IOrder;
}

export default function OrdersBoxDetail({ customerData, order }: OrdersBoxDetailProps) {
	const [currentOrder, setCurrentOrder] = useState<ICurrentOrder | null>(null);

	// Finds car matching order ID
	const [car] = customerData.cars.filter((car) => car.id === order.carId);

	useEffect(() => {
		async function getOrders() {
			//TODO Brug .env til dynamisk url kald
			const response = await fetch(`http://localhost:3000/orders/${order.id}`);
			const data = await response.json();
			setCurrentOrder(data);
		}
		getOrders();
	}, [order.id]);

	return (
		<article className='order-box-details'>
			{currentOrder ? (
				<>
					<div className='image-container'>
						<img src='order-icon.png' alt='' />
					</div>
					<section className='order-text-wrapper'>
						<div>Ordre nr:</div>
						<h3>{order.id}</h3>
						<div>Reg. nr:</div>
						<h3>{car?.registrationNumber || "Slettet"}</h3>
						<div>Pris:</div>
						<h3>{currentOrder.totalTime}</h3>
						<div>Status:</div>
						<h3>{danishStatus[currentOrder.status]}</h3>
					</section>
				</>
			) : (
				<Loader />
			)}
		</article>
	);
}
