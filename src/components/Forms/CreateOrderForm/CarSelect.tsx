import classes from './CreateOrderForm.module.css';

interface Props {
	cars: ICar[] | null;
	register: any;
	errors: any;
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
					<h2>Tilgængelige køretøjer</h2>
				</label>
			</div>
			<select className='cars-select' name='cars' id='cars' {...register('carId', { required: true, minLength: 1 })}>
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
