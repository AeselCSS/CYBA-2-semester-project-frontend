import PageLayout from './PageLayout.tsx';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

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

interface INewCar extends IAPICar {
	customerId: string,
	mileage: number,
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


export default function CreateCar({ customer }: {
	customer: ICustomer
}) {
	const [APIResult, setAPIResult] = useState<IAPICar | null>(null);
	const [registrationNumber, setRegistrationNumber] = useState('');
	const [mileage, setMileage] = useState('');
	const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
	const navigate = useNavigate();
	console.log(customer);
	console.log(APIResult);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (APIResult) {
			const newCar: INewCar = {
				customerId: customer.id,
				mileage: parseInt(mileage),
				registrationNumber: registrationNumber,
				vinNumber: APIResult.vinNumber,
				brand: APIResult.brand,
				model: APIResult.model,
				modelVariant: APIResult.modelVariant,
				firstRegistration: APIResult.firstRegistration,
				lastInspectionDate: APIResult.lastInspectionDate,
				lastInspectionKind: APIResult.lastInspectionKind,
				lastInspectionResult: APIResult.lastInspectionResult,
			};

			console.log(newCar);

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
	}

	const handleAPIGet = async () => {
		const response = await fetch(`http://localhost:3000/cars/registration/${registrationNumber}`, {
			method: 'GET',
		});

		if (response.ok) {
			const carDetails = await response.json();
			console.log(carDetails);
			setAPIResult(carDetails);
			setIsSubmitDisabled(false);
		} else {
			setAPIResult(null);
		}
	};

	const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		setIsSubmitDisabled(true);
		setRegistrationNumber(event.target.value);
	};

	return (
		<PageLayout>
			<div>
				<p>
					<label htmlFor='registrationNumber'>Registerings Nr.</label>
					<input value={registrationNumber} onChange={handleInput} id='registrationNumber' placeholder='Registerings nr.' required={true} />
				</p>
				<button onClick={handleAPIGet}>Søg efter oplysninger</button>

				<form onSubmit={handleSubmit}>

					<p>
						<label htmlFor='mileage'>KM KØRT</label>
						<input type='tel' pattern='[0-9]{0,6}' placeholder='6 cifre maks..' required={true} value={mileage} onChange={(e) => setMileage(e.target.value)} />
					</p>

					<p>
						<label htmlFor='vinNumber'>STEL NR</label>
						<input value={APIResult?.vinNumber ?? ''} disabled={true} required={true} />
					</p>

					<p>
						<label htmlFor='brand'>Mærke</label>
						<input value={APIResult?.brand ?? ''} disabled={true} />
					</p>
					<p>
						<label htmlFor='model'>Model</label>
						<input value={APIResult?.model ?? ''} disabled={true} />
					</p>

					<p>
						<label htmlFor='modelVariant'>Variant</label>
						<input value={APIResult?.modelVariant ?? ''} disabled={true} />
					</p>

					<p>
						<label htmlFor='firstRegistration'>Først Registreret</label>
						<input value={APIResult?.firstRegistration ?? ''} disabled={true} type='date' />
					</p>

					<p>
						<label htmlFor='lastInspectionDate'>Sidste inspektionsdato</label>
						<input value={APIResult?.lastInspectionDate ?? ''} disabled={true} type='date' />
					</p>


					<p>
						<label htmlFor='lastInspectionResult'>Sidste inspektionsresultat</label>
						<input value={APIResult?.lastInspectionResult ?? ''} disabled={true} placeholder='' />

					</p>

					<p>
						<label htmlFor='lastInspectionKind'>Sidste inspektionstype</label>
						<input value={APIResult?.lastInspectionKind ?? ''} disabled={true} placeholder='' />

					</p>

					<input type='submit' disabled={isSubmitDisabled} />
				</form>
			</div>
		</PageLayout>

	);
}