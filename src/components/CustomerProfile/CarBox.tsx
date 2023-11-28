import DetailBox from './DetailBox';
import BoxHeader from './BoxHeader';

export default function CarBox({ customerData }: { customerData: IAPISingleCustomer }) {
	return (
		<div className='car-box'>
			<BoxHeader title='Biler' btnName='Tilføj bil' />

			<section className='car-box-grid'>
				{customerData.cars.map((car) => (
					<DetailBox title={'Model'} value={car.brand} key={car.id} />
				))}
			</section>
		</div>
	);
}
