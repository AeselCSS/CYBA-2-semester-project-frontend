import BoxHeader from './BoxHeader';
import CarBoxDetails from './CarBoxDetails';

export default function CarBox({ customerData }: { customerData: IAPISingleCustomer }) {
	return (
		<div className='car-box'>
			<BoxHeader title='Biler' btnName='Tilføj bil' />

			<section className='car-box-grid'>
				{customerData.cars.map((car) => (
					<CarBoxDetails car={car} key={car.id} />
				))}
			</section>
		</div>
	);
}
