import { useForm, SubmitHandler } from 'react-hook-form';
import PageLayout from './PageLayout';
import { useNavigate } from 'react-router-dom';
import '../components/Form/Form.css';
import FormLayout from '../components/Form/FormLayout';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { notifications } from '@mantine/notifications';
import { MdErrorOutline } from 'react-icons/md';

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
	id: string;
	firstName: string;
	lastName: string;
	address: string;
	city: string;
	zip: number;
	phone: number;
	email: string;
}

async function createCustomer(newCustomer: INewCustomer) {
	return await fetch(`http://localhost:3000/customers`, {
		method: 'POST',
		body: JSON.stringify(newCustomer),
		headers: {
			'Content-Type': 'application/json',
		},
	});
}

export default function CreateProfile({ authUser }: { authUser: IAuthUser }) {
	const navigate = useNavigate();
	console.log(authUser);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	async function onSubmit(data: Inputs) {
		const newCustomer = {
			id: authUser.sub,
			firstName: data.firstName,
			lastName: data.lastName,
			address: data.address,
			city: data.city,
			zip: Number(data.zip),
			phone: Number(data.phone),
			email: authUser.email,
		};

		try {
			const res = await createCustomer(newCustomer);
			if (res.ok) {
				notifications.show({
					color: 'green',
					title: "Succes!",
					message: "Konto oprettet. Velkommen til🎉",
					icon: <IoIosCheckmarkCircleOutline />
				})
				navigate('/redirect');
			} else {
				notifications.show({
					color: 'red',
					title: "Hov!",
					message: "Vi kunne desværre ikke oprette dig. Har de tastet rigtigt?",
					icon: <MdErrorOutline />
				})
			}
		} catch (error) {
			notifications.show({
				color: 'red',
				title: "Hov!",
				message: "Vi kunne desværre ikke oprette dig. Prøv igen senere",
				icon: <MdErrorOutline />
			})
		}
	}
	onSubmit as SubmitHandler<Inputs>;
	//handleSubmit(onSubmit)
	return (
		<PageLayout>
			<h1 style={{ textAlign: 'center' }}>Opret konto</h1>

			<FormLayout onSubmit={handleSubmit(onSubmit)}>
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
