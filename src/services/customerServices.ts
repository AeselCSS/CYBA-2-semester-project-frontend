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
		const response = await fetch(`http://localhost:3000/customers/${customerId}`, {
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