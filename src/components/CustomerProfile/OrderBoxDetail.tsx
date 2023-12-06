import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Loader } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// import Loader from '../Loader/Loader';
import { status as danishStatus } from '../../utility/danishDictionary';
import calculatePrice from '../../utility/priceCalculator';
import DetailedOrder from '../Modal/DetailedOrder/DetailedOrder';
import ChangeOrderStatusButton from '../Buttons/ChangeOrderStatusButton';
import '../Modal/modal.css';

interface OrdersBoxDetailProps {
	customerData: IAPISingleCustomer;
	order: IOrder;
}

export default function OrdersBoxDetail({ customerData, order }: OrdersBoxDetailProps) {
	const [currentOrder, setCurrentOrder] = useState<ICurrentOrder | null>(null);
	const [isOpen, { open, close }] = useDisclosure(false);
	const navigate = useNavigate();

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

	async function handleClick() {
		const response = await fetch(`http://localhost:3000/orders/${order.id}/status`, {
			method: 'PATCH',
			body: JSON.stringify({
				status: 'PENDING',
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		response.ok ? navigate('/redirect') : console.log('Error at fetch');
	}

	return (
		<article className='order-box-details'>
			{currentOrder ? (
				<>
					<Modal opened={isOpen} onClose={close} title={`Ordre nummer: ${order.id}`} className='modal' centered size='xl'>
						<DetailedOrder orderId={order.id} />
					</Modal>

					<div className='image-container'>
						<img src='order-icon.png' alt='order details' onClick={open} />
					</div>
					<section className='order-text-wrapper'>
						<div>Ordre nr:</div>
						<h3>{order.id}</h3>
						<div>Reg. nr:</div>
						<h3>{car?.registrationNumber ?? 'Slettet'}</h3>
						<div>Pris:</div>
						<h3>{calculatePrice(currentOrder.totalTime)},-</h3>
						<div>Status:</div>
						<h3>{danishStatus[currentOrder.status]}</h3>
						{(order.status as never) === 'AWAITING_CUSTOMER' && (
							<ChangeOrderStatusButton btnText='Aflever bil' onClick={handleClick} />
						)}{' '}
						{/*TODO Fix this any type*/}
					</section>
				</>
			) : (
				<Loader />
			)}
		</article>
	);
}
