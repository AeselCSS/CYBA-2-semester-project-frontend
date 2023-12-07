import { useContext } from 'react';
import UserContext from '../context/userContext';
import PageLayout from '../layouts/PageLayout/PageLayout.tsx';
import FormLayout from '../layouts/FormLayout/FormLayout';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { notifications } from '@mantine/notifications';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { MdErrorOutline } from 'react-icons/md';
import { userIsCustomer } from '../utility/userRoleChecker.ts';

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

interface INewCustomer {
	firstName: string;
	lastName: string;
	address: string;
	city: string;
	zip: number;
	phone: number;
	email: string;
}

async function updateCustomer(newCustomer: INewCustomer, id: string) {
	return  await fetch(`http://localhost:3000/customers/${id}`, {
		method: 'PUT',
		body: JSON.stringify(newCustomer),
		headers: {
			'Content-Type': 'application/json',
		},
	});
}

export default function UpdateProfile() {
	const navigate = useNavigate();
	const { user } = useContext(UserContext);

	const { register, handleSubmit, formState: { errors }, } = useForm<Inputs>();

	if (!userIsCustomer(user)) {
		navigate('/redirect');
		return null;
	}

	const customer = user as ICustomer;

	async function onSubmit(data: Inputs) {

		console.log(data);
		const newCustomer = {
			firstName: data.firstName,
			lastName: data.lastName,
			address: data.address,
			city: data.city,
			zip: Number(data.zip),
			phone: Number(data.phone),
			email: customer.email,
		};

		try {
			const response = await updateCustomer(newCustomer, customer.id);

			if (response.ok) {
				notifications.show({
					color: 'green',
					title: "Succes!",
					message: "Dine kontooplysninger er nu opdateret. Sådan😎",
					icon: <IoIosCheckmarkCircleOutline />
				})
				navigate('/redirect');
			} else {
				notifications.show({
					color: 'red',
					title: "Hov!",
					message: "Vi kunne desværre ikke opdatere dine kontooplysninger. Har du tastet rigtigt?",
					icon: <MdErrorOutline />
				})
			}
		} catch (error) {
			notifications.show({
				color: 'red',
				title: "Hov!",
				message: "Vi kunne desværre ikke opdatere dine kontooplysninger. Prøv igen senere",
				icon: <MdErrorOutline />
			})
		}
	}
	onSubmit as SubmitHandler<Inputs>;

	return (
		<PageLayout>
			<h1 style={{ textAlign: 'center' }}>Opdater profil</h1>

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
				<input defaultValue={customer.zip} type='tel' pattern='[0-9]{4}' placeholder='Post nr.' {...register('zip', { required: true })} />
				{errors.zip && <span>Post nr. skal udfyldes</span>}

				<label htmlFor='phone'>Telefon nr.</label>
				<input defaultValue={customer.phone} type='tel' pattern='[0-9]{8}' placeholder='Telefon nr.' {...register('phone', { required: true })} />
				{errors.phone && <span>Telefon nr. skal udfyldes</span>}

				<label htmlFor='email'>E-mail</label>
				<input defaultValue={customer.email} disabled {...register('email')} />
				{errors.email && <span>E-mail skal udfyldes</span>}

				<div className='form-btn-wrapper'>
					<button onClick={() => navigate("/profile")} >Tilbage</button>
					<button type='submit'>Bekræft</button>
				</div>
			</FormLayout>
		</PageLayout>
	);
}