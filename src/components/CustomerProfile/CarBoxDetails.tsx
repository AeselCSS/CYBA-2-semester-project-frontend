import DetailBox from './DetailBox';
import { FaTrashAlt } from 'react-icons/fa';

async function deleteCar(id: number) {
	return fetch(`http://localhost:3000/cars/${id}`, {
		method: "DELETE"
	})
}


export default function CarBoxDetails({ car }: { car: ICar }) {

	const handleDelete = async () => {
		try {
			const promise = await deleteCar(car.id)
		} catch (error: any) {

		}
	}


	return (
		<>
			<DetailBox title={'Model'} value={car.brand} />
			<DetailBox title={'Registerings nr.'} value={car.registrationNumber} />
			<div style={{cursor: "pointer"}} onClick={handleDelete}>
				<FaTrashAlt />
			</div>
		</>
	);
}
