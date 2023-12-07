import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import SearchRegistrationNumber from './SearchRegistrationNumber';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { MdErrorOutline } from 'react-icons/md';
import FormLayout from '../../../layouts/FormLayout/FormLayout';

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
	mileage: string
}

interface INewCar  {
	customerId: string,
	mileage: number
	registrationNumber: string,
	vinNumber: string,
	brand: string,
	model: string,
	modelVariant: string,
	firstRegistration: string,
	lastInspectionDate: string | null,
	lastInspectionResult: string | null,
	lastInspectionKind: string | null,
}

type inputs = {
	mileage: string
	vinNumber: string,
	brand: string,
	model: string,
	modelVariant: string,
	firstRegistration: string,
	lastInspectionDate: string,
	lastInspectionResult: string,
	lastInspectionKind: string,
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

export default function CreateCarForm({ customer }: { customer: ICustomer }) {
	const [APIResult, setAPIResult] = useState<IAPICar | null>(null);
	const [registrationNumber, setRegistrationNumber] = useState('');
	const navigate = useNavigate();
	const values = APIResult as IAPICar;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<inputs>({
			values
	});

	async function onSubmit(data: inputs) {
		const newCar: INewCar = {
			...data,
			customerId: customer.id,
			registrationNumber: registrationNumber.toUpperCase(),
			mileage: parseInt(data.mileage),
			lastInspectionDate: data.lastInspectionDate || null,
			lastInspectionResult: data.lastInspectionResult || null,
			lastInspectionKind: data.lastInspectionKind || null
		};

		try {
			const res = await createCar(newCar);
			if (res.ok) {
				notifications.show({
					color: 'green',
					title: "VROOM VROOM!",
					message: "Køretøj oprettet successfuldt",
					icon: <IoIosCheckmarkCircleOutline />
				})
				navigate('/redirect');
			} else {
				notifications.show({
					color: 'red',
					title: "Hov!",
					message: "Noget gik galt. Kontroller de givet oplysninger",
					icon: <MdErrorOutline />
				})
			}
		} catch (error) {
			console.log((error as Error).message);
			notifications.show({
				color: 'red',
				title: "Hov!",
				message: "Noget gik galt. Dit køretøj blev desværre ikke oprettet. Prøv igen senere",
				icon: <MdErrorOutline />
			})
		}
	}onSubmit as SubmitHandler<inputs>;


	return (
		<>
			<FormLayout onSubmit={handleSubmit(onSubmit)}>
				<SearchRegistrationNumber
					setAPIResult={setAPIResult}
					setRegistrationNumber={setRegistrationNumber}
					registrationNumber={registrationNumber}
				/>

				<label htmlFor='mileage'>Kilometertal</label>
				<input type='tel' placeholder='Maks 6 cifre' pattern='[0-9]{0,6}' {...register('mileage', { required: true })} />
				{errors.mileage && <span>Kilometertal skal udfyldes</span>}

				<label htmlFor='vinNumber'>STEL-nr</label>
				<input disabled={true} {...register('vinNumber', { required: true })} />
				{errors.vinNumber && <span>STEL-nr skal udfyldes</span>}

				<label htmlFor='brand'>Mærke</label>
				<input disabled={true} {...register('brand', { required: true })} />
				{errors.brand && <span>Mærke skal udfyldes</span>}

				<label htmlFor='model'>Model</label>
				<input disabled={true} {...register('model', { required: true })} />
				{errors.model && <span>Model skal udfyldes</span>}

				<label htmlFor='modelVariant'>Variant</label>
				<input pattern='[0-9]{4}' disabled={true} {...register('modelVariant', { required: true })} />
				{errors.modelVariant && <span>Variant skal udfyldes</span>}

				<label htmlFor='firstRegistration'>Første registreringsdato</label>
				<input disabled={true} {...register('firstRegistration', { required: true })} />
				{errors.firstRegistration && <span>Første registreringsdato skal udfyldes</span>}

				<label htmlFor='lastInspectionDate'>Sidste inspektionsdato</label>
				<input disabled={true} {...register('lastInspectionDate')} />
				{errors.lastInspectionDate && <span>Sidste inspektionsdato skal udfyldes</span>}

				<label htmlFor='lastInspectionResult'>Sidste inspektionsresultat</label>
				<input disabled={true} {...register('lastInspectionResult')} />
				{errors.lastInspectionResult && <span>Sidste inspektionsresultat skal udfyldes</span>}

				<label htmlFor='lastInspectionKind'>Sidste inspektionstype</label>
				<input disabled={true} {...register('lastInspectionKind')} />
				{errors.lastInspectionKind && <span>Sidste inspektionstype skal udfyldes</span>}

				<div className='form-btn-wrapper'>
					<button type='submit' disabled={!registrationNumber || !APIResult}>Bekræft</button>
				</div>
			</FormLayout>
		</>
	);
}