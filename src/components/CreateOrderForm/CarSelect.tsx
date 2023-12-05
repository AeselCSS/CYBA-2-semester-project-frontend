

interface Props {
	cars: ICar[] | null
	register: any
	errors: any
}


//TODO REGISTER HER
export default function CarSelect({cars, register, errors}: Props) {

	return (
		<>
			<label htmlFor='cars'>Tilgængelige køretøjer</label>
			<select className="cars-select" name='cars' id='cars' {...register("carId", {required: true, minLength: 1})}>
				<option value=''>Ej køretøj valgt</option>
				{cars?.map((car) => <option value={car.id} key={car.id}>{car.brand}, Reg. nr. {car.registrationNumber.toUpperCase()}</option>)}
			</select>
			{errors.carId && <span style={{color: 'orange'}}>Vælg venligst et køretøj</span>}
		</>
	)
}