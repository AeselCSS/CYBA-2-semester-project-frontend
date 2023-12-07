import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Loader } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { status as danishStatus } from '../../utility/danishDictionary';
import calculatePrice from '../../utility/priceCalculator';
import DetailedOrder from '../../modals/DetailedOrder/DetailedOrder';
import ChangeOrderStatusButton from '../Buttons/ChangeOrderStatusButton';
import '../../modals/modal.css';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { MdErrorOutline } from 'react-icons/md';
import { notifications } from '@mantine/notifications';

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
		try {
			const response = await fetch(`http://localhost:3000/orders/${order.id}/status`, {
				method: 'PATCH',
				body: JSON.stringify({
					status: 'PENDING',
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (response.ok) {
				notifications.show({
					color: 'green',
					title: 'Succes!',
					message: `Status på ordre nr. ${order.id} opdateret. Køretøjet er i værkstedets varetægt`,
					icon: <IoIosCheckmarkCircleOutline />,
				});
				navigate('/redirect');
			} else {
				notifications.show({
					color: 'red',
					title: 'Hov!',
					message: `Status på ordre nr. ${order.id} kunne ikke opdateret. Prøv igen senere`,
					icon: <MdErrorOutline />,
				});
			}
		} catch (e: unknown) {
			notifications.show({
				color: 'red',
				title: 'Hov!',
				message: `Status på ordre nr. ${order.id} kunne ikke opdateret. Prøv igen senere`,
				icon: <MdErrorOutline />,
			});
		}
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
						<h3>{car?.registrationNumber.toUpperCase() ?? 'Slettet'}</h3>
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
