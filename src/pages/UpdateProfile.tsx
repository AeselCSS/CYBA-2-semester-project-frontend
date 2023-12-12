import { useContext } from 'react';
import UserContext from '../context/userContext';
import PageLayout from '../layouts/PageLayout/PageLayout.tsx';
import FormLayout from '../layouts/FormLayout/FormLayout';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { userIsCustomer } from '../utility/userRoleChecker.ts';
import { updateCustomer } from '../services/customerServices.ts';
import GoBackButton from '../components/Buttons/GoBackButton.tsx';

type Inputs = {
	firstName: string;
	lastName: string;
	address: string;
	city: string;
	zip: number;
	phone: number;
	email: string;
	id: string;
};



export default function UpdateProfile() {
	const navigate = useNavigate();
	const { user } = useContext(UserContext);

	const { register, handleSubmit, formState: { errors }, } = useForm<Inputs>();

	if (!userIsCustomer(user)) {
		navigate('/redirect');
		return null;
	}

	const customer = user as ICustomer;

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		const newCustomer = {
			firstName: data.firstName,
			lastName: data.lastName,
			address: data.address,
			city: data.city,
			zip: Number(data.zip),
			phone: Number(data.phone),
			email: customer.email,
		};

		await updateCustomer(customer.id, newCustomer, navigate);
	};

	return (
		<PageLayout>
			<h1 style={{ textAlign: 'center' }}>Opdater profil</h1>
			<GoBackButton />

			<FormLayout onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor='firstName'>Fornavn</label>
				<input defaultValue={customer.firstName} placeholder='Fornavn' {...register('firstName', { required: true })} />
				{errors.firstName && <span>Fornavn skal udfyldes</span>}

				<label htmlFor='lastName'>Efternavn</label>
				<input defaultValue={customer.lastName} placeholder='Efternavn' {...register('lastName', { required: true })} />
				{errors.lastName && <span>Efternavn skal udfyldes</span>}

				<label htmlFor='address'>Adresse</label>
				<input defaultValue={customer.address} placeholder='Adresse' {...register('address', { required: true })} />
				{errors.address && <span>Adresse skal udfyldes</span>}

				<label htmlFor='city'>By</label>
				<input defaultValue={customer.city} placeholder='By' {...register('city', { required: true })} />
				{errors.city && <span>By skal udfyldes</span>}

				<label htmlFor='zip'>Post nr.</label>
				<input
					defaultValue={customer.zip}
					type='tel'
					pattern='[0-9]{4}'
					placeholder='Post nr.'
					{...register('zip', { required: true })}
				/>
				{errors.zip && <span>Post nr. skal udfyldes</span>}

				<label htmlFor='phone'>Telefon nr.</label>
				<input
					defaultValue={customer.phone}
					type='tel'
					pattern='[0-9]{8}'
					placeholder='Telefon nr.'
					{...register('phone', { required: true })}
				/>
				{errors.phone && <span>Telefon nr. skal udfyldes</span>}

				<label htmlFor='email'>E-mail</label>
				<input defaultValue={customer.email} disabled {...register('email')} />
				{errors.email && <span>E-mail skal udfyldes</span>}

				<div className='form-btn-wrapper'>
					<button type='submit'>Bekræft</button>
					<button onClick={() => navigate('/profile')}>Tilbage</button>
				</div>
			</FormLayout>
		</PageLayout>
	);
}