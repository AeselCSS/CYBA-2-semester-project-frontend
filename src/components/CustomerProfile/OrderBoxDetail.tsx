import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { status as danishStatus } from '../../utility/danishDictionary';
import calculatePrice from '../../utility/priceCalculator';
import DetailedOrder from '../../modals/DetailedOrder/DetailedOrder';
import ChangeOrderStatusButton from '../Buttons/ChangeOrderStatusButton';
import { getSingleOrder, updateOrderStatusToPending } from '../../services/orderServices.ts';
import { getModalOptions } from '../../modals/modalOptions.ts';
import Loading from '../Loading/Loading.tsx';

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
		getSingleOrder(order.id).then((order) => setCurrentOrder(order));
	}, [order.id]);

	const handleClick = async () => {
		const succes = await updateOrderStatusToPending(order.id);
		if (succes) {
			navigate('/redirect');
		}
	};

	return (
		<article className='order-box-details'>
			{currentOrder ? (
				<>
					<Modal opened={isOpen} onClose={close} {...getModalOptions(`Ordre nummer: ${order.id}`)}>
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
						<h3>{calculatePrice(currentOrder.totalTime)} kr.</h3>
						<div>Status:</div>
						<h3>{danishStatus[currentOrder.status]}</h3>
						{(order.status as never) === 'AWAITING_CUSTOMER' && (
							<ChangeOrderStatusButton btnText='Aflever bil' onClick={handleClick} />
						)}{' '}
					</section>
				</>
			) : (
				<Loading />
			)}
		</article>
	);
}
