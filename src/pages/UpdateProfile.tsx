import PageLayout from './PageLayout.tsx';
import FormLayout from '../components/Form/FormLayout.tsx';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';


interface Props {
	customer: ICustomer;
}

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
	const response = await fetch(`http://localhost:3000/customers/${id}`, {
		method: 'PUT',
		body: JSON.stringify(newCustomer),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (response.ok) {
		const data = await response.json();
		console.log(data);
	} else {
		console.error(response.body);
		throw new Error()
	}
}

export default function UpdateProfile({ customer }: Props) {
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();


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
			await updateCustomer(newCustomer, customer.id);
			navigate('/redirect');
		} catch (error) {
			console.error((error as Error).message);
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
					<button type='submit'> Opret konto</button>
				</div>
			</FormLayout>
		</PageLayout>
	);
}