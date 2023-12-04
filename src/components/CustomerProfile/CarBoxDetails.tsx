import DetailBox from './DetailBox';
import { FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

async function deleteCar(id: number) {
	return fetch(`http://localhost:3000/cars/${id}`, {
		method: "DELETE"
	})
}


export default function CarBoxDetails({ car }: { car: ICar }) {
	const navigate = useNavigate();

	const handleDelete = async () => {
		try {
			const promise = await deleteCar(car.id)

			if (promise.ok) {
				navigate("/redirect")
			} else {
				console.log(promise.body);
				console.log("failed to delete");
			}
		} catch (error: any) {
			console.error(error.message);
		}
	}


	return (
		<>
			<DetailBox title={'Model'} value={car.brand} />
			<DetailBox title={'Registerings nr.'} value={car.registrationNumber.toUpperCase()} />
			<div style={{cursor: "pointer"}} onClick={handleDelete}>
				<FaTrashAlt />
			</div>
		</>
	);
}
