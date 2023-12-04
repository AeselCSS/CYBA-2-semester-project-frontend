import { useForm } from 'react-hook-form';
import FormLayout from '../Form/FormLayout.tsx';
import React from 'react';

interface IAPICar {
	registrationNumber: string,
	vinNumber: string,
	brand: string,
	model: string,
	modelVariant: string,
	firstRegistration: string,
	lastInspectionDate: string,
	lastInspectionResult: string,
	lastInspectionKind: string,
}

interface Inputs {
	registrationNumber: string
}

interface Props {
	setAPIResult: (newValue: IAPICar | null) => void;
	children
}

export default function SearchRegistrationNumber({setAPIResult, children}: Props) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	const onSubmit = async ({registrationNumber}: Inputs) => {
		const response = await fetch(`http://localhost:3000/cars/registration/${registrationNumber}`, {
			method: 'GET',
		});

		if (response.ok) {
			const carDetails = await response.json();
			console.log(carDetails);
			setAPIResult(carDetails);

		} else {
			setAPIResult(null);
		}
	}


	return (

		<FormLayout onSubmit={handleSubmit(onSubmit)}>
			<label htmlFor='registrationNumber'>Registrerings Nr.</label>
			<input  {...register('registrationNumber', { required: true })} />
			{errors.registrationNumber && <span>Registrerings Nr. skal udfyldes</span>}

			<div className='form-btn-wrapper' style={{paddingBottom:"2rem"}}>
				<button type='submit'> Søg efter køretøj...</button>
			</div>

			{children}
		</FormLayout>
	)
}