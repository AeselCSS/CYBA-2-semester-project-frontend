import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface Props {
	cars: ICar[] | null;
	register: UseFormRegister<newOrderInputs>;
	errors: FieldErrors<newOrderInputs>;
}

export default function CarSelect({ cars, register, errors }: Props) {
	return (
		<>
			{errors.carId && (
				<>
					<p></p>
					<span style={{ color: 'orange' }}>Vælg venligst et køretøj</span>
				</>
			)}

			<div>
				<label htmlFor='cars'>
					<h3>Tilgængelige køretøjer</h3>
				</label>
			</div>
			<select className='cars-select' id='cars' {...register('carId', { required: true, minLength: 1 })}>
				<option value=''>Vælg et køretøj</option>
				{cars?.map((car) => (
					<option value={car.id} key={car.id}>
						{car.brand}, Reg. nr. {car.registrationNumber.toUpperCase()}
					</option>
				))}
			</select>
		</>
	);
}
