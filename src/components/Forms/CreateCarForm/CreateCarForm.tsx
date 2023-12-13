import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchRegistrationNumber from './SearchRegistrationNumber';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormLayout from '../../../layouts/FormLayout/FormLayout';
import { submitCarForm } from '../../../services/carServices.ts';

export default function CreateCarForm({ customer }: { customer: ICustomer }) {
	const [APIResult, setAPIResult] = useState<IAPICar | null>(null);
	const [registrationNumber, setRegistrationNumber] = useState('');
	const navigate = useNavigate();
	const values = APIResult as IAPICar;
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateCarInputs>({ values });

	const onSubmit: SubmitHandler<CreateCarInputs> = async (data: CreateCarInputs) => {
		await submitCarForm(data, registrationNumber, customer, navigate);
	};

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
					<button type='submit' disabled={!registrationNumber || !APIResult}>
						Bekræft
					</button>
					<button onClick={() => navigate('/profile')}>Tilbage</button>
				</div>
			</FormLayout>
		</>
	);
}
