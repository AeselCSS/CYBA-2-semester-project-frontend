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
	const [APIResult, setAPIResult] = useState<CarInputs | null>(null);
	const [registrationNumber, setRegistrationNumber] = useState('');
	const [mileage, setMileage] = useState('');
	const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
	const navigate = useNavigate();
	const apiKey = import.meta.env.VITE_API_SYNSBASEN_TOKEN as string;
	console.log(customer);
	console.log(APIResult);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const form = e.target as HTMLFormElement;

		console.log(form);

		if (APIResult) {
			const newCar: INewCar = {
				customerId: customer.id,
				mileage: parseInt(mileage),
				vinNumber: APIResult.vinNumber,
				brand: APIResult.brand,
				model: APIResult.model,
				modelVariant: APIResult.modelVariant

			};

			/*try {
			 const res = await createCar(newCar);
			 if (res.ok) {
			 const data = await res.json();
			 console.log(data);
			 navigate('/redirect');
			 }
			 } catch (error) {
			 console.log((error as Error).message);
			 }*/

		}


	}


	const handleAPIGet = async () => {
		const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.synsbasen.dk/v1/vehicles/registration/${registrationNumber}`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${apiKey}`,
				'Content-Type': 'application/json',
				'crossOrigin': 'true',
			},
		});

		if (response.ok) {
			const { data } = await response.json();
			setAPIResult(data);
			setIsSubmitDisabled(false);
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setIsSubmitDisabled(true);
		setRegistrationNumber(event.target.value);
	};

	return (
		<>
			<PageLayout>
				<form onSubmit={handleSubmit}>
					<p>
						<label htmlFor='registrationNumber'>Registerings Nr.</label>
						<input value={registrationNumber} onChange={handleChange} id='registrationNumber' placeholder='Registerings nr.' required={true} />
						<button onClick={handleAPIGet}>Søg efter oplysninger</button>
					</p>

					<p>
						<label htmlFor='mileage'>KM KØRT</label>
						<input type='tel' pattern='[0-9]{0-6}' placeholder='K/m kørt' required={true} value={mileage} onChange={(e) => setMileage(e.target.value)} />
					</p>

					<p>
						<label htmlFor='vinNumber'>STEL NR</label>
						<input value={APIResult?.vin} disabled={true} required={true} placeholder='STEL-nr.' />
					</p>

					<p>
						<label htmlFor='brand'>Mærke</label>
						<input value={APIResult?.brand} disabled={true} placeholder='Mærke' />
					</p>
					<p>
						<label htmlFor='model'>Model</label>
						<input value={APIResult?.model} disabled={true} placeholder='Model' />
					</p>

					<p>
						<label htmlFor='modelVariant'>Variant</label>
						<input value={APIResult?.variant} disabled={true} placeholder='Model variant' />
					</p>

					{/*TODO DATO*/}
					<p>
						<label htmlFor='firstRegistration'>Først Registreret</label>
						<input value={APIResult?.first_registration_date} disabled={true} type='date' placeholder='Først registreret' />
					</p>

					<p>
						<label htmlFor='lastInspectionDate'>Sidste inspektionsdato</label>
						<input value={APIResult?.last_inspection_date} disabled={true} type='date' placeholder='Sidste inspektionsdato' />
					</p>


					<p>
						<label htmlFor='lastInspectionResult'>Sidste inspektionsresultat</label>
						<input value={APIResult?.last_inspection_result} disabled={true} placeholder='Sidste inspektionsresultat' />

					</p>

					<p>
						<label htmlFor='lastInspectionKind'>Sidste inspektionstype</label>
						<input value={APIResult?.last_inspection_kind} disabled={true} placeholder='Sidste inspektionstype' />

					</p>

					<input type='submit' disabled={isSubmitDisabled} />
				</form>
			</PageLayout>
		</>
	);
}