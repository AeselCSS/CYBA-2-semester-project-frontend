import BoxHeader from './BoxHeader';
import OrdersBoxDetail from './OrderBoxDetail';
import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import './OrdersBox.css';
import Loader from '../Loader.tsx';

export default function OrdersBox({ customerData }: { customerData: IAPISingleCustomer }) {
	const [orders, setOrders] = useState<IOrder[] | null>(null);
	const [metaData, setMetaData] = useState<IMetaData | null>(null);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [pageSize] = useState<number>(2);

	useEffect(() => {
		async function fetchData() {
			const url = `http://localhost:3000/customers/${customerData.customer.id}/orders?pageNum=${currentPage}&pageSize=${pageSize}`;
			console.log(url);
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
	}, [currentPage, pageSize]);


	const calculatePageCount = () => {
		return Math.ceil(metaData!.totalCount / pageSize);
	};


	return !orders ? (
			<p>Loading...</p>
		) :
		!orders.length ? (
			<Loader />
		) : (
			<div className='orders-box'>
				<BoxHeader title='Ordrer' btnName='Tilføj ordre' />

				<section className='orders-box-grid'>
					{orders.map((order) => (
						<OrdersBoxDetail customerData={customerData} order={order} key={order.id} />
					))}
				</section>


				<ReactPaginate
					pageCount={calculatePageCount()}
					onPageChange={(event) => setCurrentPage(event.selected + 1)}
					pageRangeDisplayed={3}
					breakLabel='...'
					nextLabel='Næste'
					previousLabel='Forrige'
					renderOnZeroPageCount={null}
					initialPage={0}
					containerClassName='pagination'
					pageLinkClassName='page-num'
					previousLinkClassName='page-num'
					nextLinkClassName='page-num'
					activeLinkClassName='active'
				/>
			</div>
		);
}
