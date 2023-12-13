import { useContext } from 'react';
import UserContext from '../context/userContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import PageLayout from '../layouts/PageLayout/PageLayout.tsx';
import FormLayout from '../layouts/FormLayout/FormLayout';
import '../layouts/FormLayout/FormLayout.css';
import { userIsAuthUser } from '../utility/userRoleChecker.ts';
import { createProfile } from '../services/customerServices.ts';

export default function CreateProfile() {
	const navigate = useNavigate();
	const { user } = useContext(UserContext);
	const { register, handleSubmit, formState: { errors } } = useForm<CreateProfileInputs>();

	if (!userIsAuthUser(user)) {
		navigate('/redirect');
		return null;
	}

	const authUser = user as IAuthUser

	return (
		<PageLayout>
			<h1 style={{ textAlign: 'center' }}>Opret konto</h1>

			<FormLayout onSubmit={handleSubmit((data: CreateProfileInputs) => createProfile(data, authUser, navigate))}>
				<label htmlFor='firstName'>Fornavn</label>
				<input placeholder='Fornavn' {...register('firstName', { required: true })} />
				{errors.firstName && <span>Fornavn skal udfyldes</span>}

				<label htmlFor='lastName'>Efternavn</label>
				<input placeholder='Efternavn' {...register('lastName', { required: true })} />
				{errors.lastName && <span>Efternavn skal udfyldes</span>}

				<label htmlFor='address'>Adresse</label>
				<input placeholder='Adresse' {...register('address', { required: true })} />
				{errors.address && <span>Adresse skal udfyldes</span>}

				<label htmlFor='city'>By</label>
				<input placeholder='By' {...register('city', { required: true })} />
				{errors.city && <span>By skal udfyldes</span>}

				<label htmlFor='zip'>Post nr.</label>
				<input type='tel' pattern='[0-9]{4}' placeholder='Post nr.' {...register('zip', { required: true })} />
				{errors.zip && <span>Post nr. skal udfyldes</span>}

				<label htmlFor='phone'>Telefon nr.</label>
				<input type='tel' pattern='[0-9]{8}' placeholder='Telefon nr.' {...register('phone', { required: true })} />
				{errors.phone && <span>Telefon nr. skal udfyldes</span>}

				<label htmlFor='email'>E-mail</label>
				<input defaultValue={authUser.email} disabled {...register('email')} />
				{errors.email && <span>E-mail skal udfyldes</span>}

				<div className='form-btn-wrapper'>
					<button type='submit'> Opret konto</button>
				</div>
			</FormLayout>
		</PageLayout>
	);
}
