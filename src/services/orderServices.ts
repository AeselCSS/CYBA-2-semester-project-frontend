import { API_URL } from './config.ts';
import { notifications } from '@mantine/notifications';
import { NotificationMessageError, NotificationMessageSuccess } from '../components/Toaster/NotificationMessage.tsx';

export const getSingleOrder = async (id: number) => {
	try {
		const response = await fetch(`${API_URL}/orders/${id}`);

		if (response && !response.ok) {
			throw new Error('Error fetching data');
		}

		return response ? await response.json() : null;
	} catch (error: unknown) {
		console.error(error);
	}
};

export const updateOrderStatusToPending = async (orderId: number) => {
	try {
		const response = await fetch(`${API_URL}/orders/${orderId}/status`, {
			method: 'PATCH',
			body: JSON.stringify({
				status: 'PENDING',
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (response && response.ok) {
			notifications.show(
				NotificationMessageSuccess({
					title: 'Succes!',
					message: `Status på ordre nr. ${orderId} opdateret. Køretøjet er i værkstedets varetægt`,
				}),
			);
			return true;
		} else {
			notifications.show(
				NotificationMessageError({
					title: 'Hov!',
					message: `Status på ordre nr. ${orderId} kunne ikke opdateret. Prøv igen senere`,
				}),
			);
			return false;
		}
	} catch (e: unknown) {
		notifications.show(
			NotificationMessageError({
				title: 'Hov!',
				message: `Status på ordre nr. ${orderId} kunne ikke opdateret. Prøv igen senere`,
			}),
		);
		return false;
	}
};

export async function getBookedDates() {
	try {
		const response = await fetch(`${API_URL}/orders/dates`);
		if (response && response.ok) {
			return await response.json();
		} else {
			console.log('Promise unavailableDates is not ok');
			return [];
		}
	} catch (error: unknown) {
		console.log((error as Error).message);
		return [];
	}
}

export const createOrder = async (newOrder: newOrder) => {
	try {
		return await fetch(`${API_URL}/orders`, {
			method: 'POST',
			body: JSON.stringify(newOrder),
			headers: {
				'Content-Type': 'application/json',
			},
		});
	} catch (error: unknown) {
		console.log((error as Error).message);
		return null;
	}
}

type TDatePiece = Date | null;
type TDate = TDatePiece | [TDatePiece, TDatePiece];

export const submitOrder = async (data: newOrderInputs, date: TDate, customer: ICustomer, navigate: (route: string) => void) => {
	const [year, month, day] = new Date(date?.toString() as string).toISOString().split('T')[0].split('-');
	const correctDate = `${year}-${month}-${String(parseInt(day) + 1).padStart(2, '0')}`;

	const newOrder: newOrder = {
		customerId: customer.id,
		carId: parseInt(data.carId),
		orderStartDate: correctDate,
		tasks: data.taskIds.map((id) => ({ id: parseInt(id) })),
	};

	try {
		const response = await createOrder(newOrder); // Assuming createOrder is already defined in this file

		if (response && response.ok) {
			const createdOrder = await response.json();
			notifications.show(NotificationMessageSuccess({
				title: 'Succes!',
				message: `Ordre oprettet succesfuldt med følgende ordre nr: ${createdOrder.id}`,
			}));
			navigate('/profile');
		} else {
			throw new Error('Failed to create order');
		}
	} catch (error: unknown) {
		console.error((error as Error).message);
		notifications.show(NotificationMessageError({
			title: 'Hov!',
			message: 'Noget gik galt ved oprettelse af ordre. Prøv igen senere',
		}));
	}
};