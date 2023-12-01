import PageLayout from './PageLayout.tsx';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import React, { useState } from 'react';

interface CarInputs {
	registrationNumber: string,
	vinNumber: string,
	mileage: number
	brand: string,
	model: string,
	modelVariant: string,
	firstRegistration: string,
	lastInspectionDate: string,
	lastInspectionResult: string,
	lastInspectionKind: string,
}

interface INewCar extends CarInputs {
	customerId: string;
}

async function createCar(newCar: INewCar) {
	return await fetch(`http://localhost:3000/cars`, {
		method: 'POST',
		body: JSON.stringify(newCar),
		headers: {
			'Content-Type': 'application/json',
		},
	});
}


export default function CreateCar({ customer }: { customer: ICustomer }) {
	const { register, handleSubmit, formState: { errors } } = useForm<CarInputs>();
	const [APIResult, setAPIResult] = useState<CarInputs | null>(null);
	const [registrationNumber, setRegistrationNumber] = useState('');
	const navigate = useNavigate();
	const apiKey = import.meta.env.VITE_API_SYNSBASEN_TOKEN as string;
	console.log(customer);

	async function onSubmit(data: CarInputs) {
		const newCar: INewCar = {
			customerId: customer.id,
			...data,
		};

		try {
			const res = await createCar(newCar);
			if (res.ok) {
				const data = await res.json();
				console.log(data);
				navigate('/redirect');
			}
		} catch (error) {
			console.log((error as Error).message);
		}

	}

	onSubmit as SubmitHandler<CarInputs>;


	const handleAPIGet = async () => {
		const response = await fetch('https://api.synsbasen.dk/v1/vehicles/registration/', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${apiKey}`,
			},
		});

		if (response.ok) {
			const { data } = await response.json();
			setAPIResult(data);
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement> ) => {
		setRegistrationNumber(event.target.value);
	};

	return (
		<>
			<PageLayout>
				<p>
					<label htmlFor='registrationNumber'>Registerings Nr.</label>
					<input value={registrationNumber} onChange={handleChange} id='registrationNumber' placeholder='Registerings nr.' />
					<button onClick={handleAPIGet}>Søg efter oplysninger</button>
				</p>

				<form onSubmit={handleSubmit(onSubmit)}>

					<p>
						<label htmlFor='mileage'>KM KØRT</label>
						<input type='tel' value={APIResult?.mileage} pattern='[0-9]{6}' placeholder='K/m kørt' {...register('mileage', { required: true })} />
						{errors.mileage && <span>This field is required</span>}
					</p>

					<p>
						<label htmlFor='vinNumber'>STEL NR</label>
						<input value={APIResult?.vinNumber} disabled={true} placeholder='STEL-nr.' {...register('vinNumber', { required: true })} />
						{errors.vinNumber && <span>This field is required</span>}
					</p>

					<p>
						<label htmlFor='brand'>Mærke</label>
						<input value={APIResult?.brand} disabled={true} placeholder='Mærke' {...register('brand', { required: true })} />
						{errors.brand && <span>This field is required</span>}
					</p>
					<p>
						<label htmlFor='model'>Model</label>
						<input value={APIResult?.model} disabled={true} placeholder='Model' {...register('model', { required: true })} />
						{errors.model && <span>This field is required</span>}
					</p>

					<p>
						<label htmlFor='modelVariant'>Variant</label>
						<input value={APIResult?.modelVariant} disabled={true} placeholder='Model variant' {...register('modelVariant', { required: true })} />
						{errors.modelVariant && <span>This field is required</span>}
					</p>

					{/*TODO DATO*/}
					<p>
						<label htmlFor='firstRegistration'>Først Registreret</label>
						<input value={APIResult?.firstRegistration} disabled={true} type='date' placeholder='Først registreret' {...register('firstRegistration', { required: true })} />
						{errors.firstRegistration && <span>This field is required</span>}
					</p>

					<p>
						<label htmlFor='lastInspectionDate'>Sidste inspektionsdato</label>
						<input value={APIResult?.lastInspectionDate} disabled={true} type='date' placeholder='Sidste inspektionsdato' {...register('lastInspectionDate', { required: true })} />
						{errors.lastInspectionDate && <span>This field is required</span>}
					</p>


					<p>
						<label htmlFor='lastInspectionResult'>Sidste inspektionsresultat</label>
						<input value={APIResult?.lastInspectionResult} disabled={true} placeholder='Sidste inspektionsresultat' {...register('lastInspectionResult', { required: true })} />
						{errors.lastInspectionResult && <span>This field is required</span>}
					</p>

					<p>
						<label htmlFor='lastInspectionKind'>Sidste inspektionstype</label>
						<input value={APIResult?.lastInspectionKind} disabled={true} placeholder='Sidste inspektionstype' {...register('lastInspectionKind', { required: true })} />
						{errors.lastInspectionKind && <span>This field is required</span>}
					</p>


					<input type='submit' />
				</form>
			</PageLayout>
		</>
	);
}