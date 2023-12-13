import { API_URL } from './config.ts';
import { NotificationMessageError, NotificationMessageSuccess } from '../components/Toaster/NotificationMessage.tsx';
import { LogoutOptions } from '@auth0/auth0-react';
import { handleLogout } from './Auth0Services.ts';
import { notifications } from '@mantine/notifications';

export const getSingleCustomer = async (id: string) => {
	try {
		const response = await fetch(`${API_URL}/customers/${id}`);

		if (!response.ok) {
			throw new Error('Error fetching data');
		}

		return await response.json();

	} catch (error: unknown) {
		console.error(error);
	}
}

export const deleteCustomer = async (
	customerId: string,
	logout: (options?: LogoutOptions) => Promise<void>,
	logoutOptions: LogoutOptions
) => {
	try {
		const response = await fetch(`${API_URL}/customers/${customerId}`, {
			method: "DELETE"
		});

		if (response.ok) {
			notifications.show(NotificationMessageSuccess({
				title: "Konto slettet",
				message: "Din konto er blevet slettet succesfuldt. Håber vi ses igen 💪"
			}));
			handleLogout(logout, logoutOptions);
		} else {
			notifications.show(NotificationMessageError({
				title: "Hov!",
				message: "Vi kunne desværre ikke slette din konto. Prøv igen senere"
			}));
		}
	} catch (error) {
		console.error(error);
		notifications.show(NotificationMessageError({
			title: "Hov!",
			message: "Vi kunne desværre ikke slette din konto. Prøv igen senere",
		}));
	}
};

export const getCustomerOrders = async (customerId: string, queryParams: string): Promise<{data: IOrder[], metaData: IMetaData}> => {
	const response =  await fetch(`${API_URL}/customers/${customerId}/orders?${queryParams}`);

	if (!response.ok) {
		throw new Error('Error fetching data');
	}

	return await response.json();
}

export const updateCustomer = async (customerId: string, updatedCustomer: INewCustomer, navigate: (navigateTo: string)=>void) => {
	try {
		const response = await fetch(`${API_URL}/customers/${customerId}`, {
			method: 'PUT',
			body: JSON.stringify(updatedCustomer),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (response.ok) {
			notifications.show(NotificationMessageSuccess({
				title: "Succes!",
				message: "Dine kontooplysninger er nu opdateret. Sådan😎",
			}));
			navigate('/profile');
			return await response.json()

		} else {
			notifications.show(NotificationMessageError({
				title: "Hov!",
				message: "Vi kunne desværre ikke opdatere dine kontooplysninger. Har du tastet rigtigt?",
			}));
		}
	} catch (error) {
		console.error(error);
		notifications.show(NotificationMessageError({
			title: "Hov!",
			message: "Vi kunne desværre ikke opdatere dine kontooplysninger. Prøv igen senere",
		}));
	}
};

const createCustomer = async (newCustomer: INewCustomer) => {
	return await fetch(`${API_URL}/customers`, {
		method: 'POST',
		body: JSON.stringify(newCustomer),
		headers: {
			'Content-Type': 'application/json',
		},
	});
};

export const createProfile = async (data: CreateProfileInputs, authUser: IAuthUser, navigate: (navigateTo: string) => void) => {
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
			notifications.show(NotificationMessageSuccess({
				title: "Succes!",
				message: "Konto oprettet. Velkommen til🎉",
			}))
			navigate('/redirect');
		} else {
			notifications.show(NotificationMessageError({
				title: "Hov!",
				message: "Vi kunne desværre ikke oprette dig. Har de tastet rigtigt?",
			}))
		}
	} catch (error) {
		notifications.show(NotificationMessageError({
			title: "Hov!",
			message: "Vi kunne desværre ikke oprette dig. Prøv igen senere",
		}))
	}
};