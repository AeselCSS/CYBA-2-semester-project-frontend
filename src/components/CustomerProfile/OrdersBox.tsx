import BoxHeader from './BoxHeader';
import OrdersBoxDetail from './OrderBoxDetail';

export default function OrdersBox({ customerData }: { customerData: IAPISingleCustomer }) {
	return (
		<div className='orders-box box'>
			<BoxHeader title='Ordrer' btnName='Tilføj ordre' />

			<section className='orders-box-grid'>
				{customerData.orders.map((order) => (
					<OrdersBoxDetail customerData={customerData} order={order} key={order.id} />
				))}
			</section>
		</div>
	);
}
