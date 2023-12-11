import { FieldErrors, UseFormRegister } from 'react-hook-form';

interface Props {
	cars: ICar[] | null;
	register: UseFormRegister<newOrderInputs>;
	errors: FieldErrors<newOrderInputs>;
}

export default function CarSelect({ cars, register, errors }: Props) {
	return (
		<>
			<div>
				<label htmlFor='cars'>
					<h2>Vælg et køretøj</h2>
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
			{errors.carId && (
				<>
					<span style={{ color: 'orange' }}>Vælg venligst et køretøj</span>
				</>
			)}
		</>
	);
}
