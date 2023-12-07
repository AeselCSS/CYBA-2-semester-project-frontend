interface Props {
	cars: ICar[] | null;
	register: any;
	errors: any;
}

export default function CarSelect({ cars, register, errors }: Props) {

	return (
		<div className="car-grid">
			{errors.carId && (<>
				<p></p>
				<span style={{ color: 'orange' }}>Vælg venligst et køretøj</span>
			</>)}

			<label htmlFor='cars'>Tilgængelige køretøjer</label>
			<select className='cars-select' name='cars' id='cars' {...register('carId', { required: true, minLength: 1 })}>
				<option value=''>Ej køretøj valgt</option>
				{cars?.map((car) => <option value={car.id} key={car.id}>{car.brand}, Reg. nr. {car.registrationNumber.toUpperCase()}</option>)}
			</select>
		</div>
	);
}