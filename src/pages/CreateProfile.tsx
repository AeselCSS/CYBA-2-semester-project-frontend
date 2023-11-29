import { useForm, SubmitHandler } from 'react-hook-form';
import PageLayout from './PageLayout';
import { useNavigate } from 'react-router-dom';

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
		watch,
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
			const res =  await createCustomer(newCustomer);
			if(res.ok) {
				const data = await res.json()
				console.log(data);
				navigate('/redirect');

			}
		} catch (error) {
			console.log('ERROR ⛔');
		}


	}
	onSubmit as SubmitHandler<Inputs>;

	return (
		<PageLayout>
			<form onSubmit={handleSubmit(onSubmit)}>
				<p>
					<input placeholder='Fornavn' {...register('firstName', { required: true })} />
					{errors.firstName && <span>This field is required</span>}
				</p>
				<p>
					<input placeholder='Efternavn' {...register('lastName', { required: true })} />
					{errors.lastName && <span>This field is required</span>}
				</p>

				<p>
					<input placeholder='Adresse' {...register('address', { required: true })} />
					{errors.address && <span>This field is required</span>}
				</p>

				<p>
					<input placeholder='By' {...register('city', { required: true })} />
					{errors.city && <span>This field is required</span>}
				</p>
				<p>
					<input type='tel' pattern='[0-9]{4}' placeholder='Post nr.' {...register('zip', { required: true })} />
					{errors.zip && <span>This field is required</span>}
				</p>

				<p>
					<input type='tel' pattern='[0-9]{8}' placeholder='Telefon nr.' {...register('phone', { required: true })} />
					{errors.phone && <span>This field is required</span>}
				</p>
				<p>
					<input defaultValue={authUser.email} disabled {...register('email')} />
					{errors.email && <span>This field is required</span>}
				</p>

				<input type='submit' />
			</form>
		</PageLayout>
	);
}
