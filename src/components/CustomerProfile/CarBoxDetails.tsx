import DetailBox from './DetailBox';

export default function CarBoxDetails({ car }: { car: ICar }) {
	return (
		<>
			<DetailBox title={'Model'} value={car.brand} />
			<DetailBox title={'Registerings nr.'} value={car.registrationNumber} />
		</>
	);
}
