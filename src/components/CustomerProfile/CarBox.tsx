import BoxHeader from './BoxHeader';
import CarBoxDetails from './CarBoxDetails';

export default function CarBox({ customerData }: { customerData: IAPISingleCustomer }) {
	return (
		<div className='car-box box'>
			<BoxHeader title='Køretøjer' btnName='Tilføj køretøj' />

			<section className='car-box-grid'>
				{customerData.cars.map((car) => (
					<CarBoxDetails car={car} key={car.id} />
				))}
			</section>
		</div>
	);
}
