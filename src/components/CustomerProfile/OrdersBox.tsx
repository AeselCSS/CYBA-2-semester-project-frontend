import BoxHeader from './BoxHeader';
import OrdersBoxDetail from './OrderBoxDetail';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import usePagination from '../../hooks/usePagination.ts';
import './OrdersBox.css';
import Loading from '../Loading/Loading.tsx';

export default function OrdersBox({ customerData }: { customerData: IAPISingleCustomer }) {
	const [orders, setOrders] = useState<IOrder[] | null>(null);
	const [metaData, setMetaData] = useState<IMetaData | null>(null);
	const [pageSize] = useState<number>(4);

	const metaDataTotalCount = metaData ? metaData.totalCount : 0;
	const { currentPage, paginationSettings } = usePagination(pageSize, metaDataTotalCount);

	useEffect(() => {
		async function fetchData() {
			const url = `http://localhost:3000/customers/${customerData.customer.id}/orders?pageNum=${currentPage}&pageSize=${pageSize}`;
			const promise = await fetch(url);

			if (promise.ok) {
				const result: APIResponse<IOrder> = await promise.json();
				setOrders(result.data);
				setMetaData(result.metaData);
			} else {
				console.log('Promise not OK');
				console.log('Error at fetch');
			}
		}

		fetchData();
	}, [currentPage, pageSize, customerData.customer.id]);

	return (
		<div className='orders-box box'>
			<BoxHeader title='Ordre' btnName='Tilføj ordre' navigateTo='/orders/create' />
			{!orders ? (
				<Loading />
			) : (
				!orders.length && <h2>Ingen ordrer</h2>
			)}
			{orders && (
				<>
					<section className='orders-box-grid'>
						{orders.map((order) => (
							<OrdersBoxDetail customerData={customerData} order={order} key={order.id} />
						))}
					</section>

					<ReactPaginate {...paginationSettings} />
				</>
			)}
		</div>
	);
}