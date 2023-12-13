import { API_URL } from './config.ts';
import { notifications } from '@mantine/notifications';
import { NotificationMessageError, NotificationMessageSuccess } from '../components/Toaster/NotificationMessage.tsx';

export const getSingleCar = async (carId: number) => {
	const response = await fetch(`${API_URL}/cars/${carId}`);
	return response.ok ? await response.json() : null;
}

export const getCustomerCars = async (customerId: string) => {
	const response = await fetch(`${API_URL}/customers/${customerId}/cars`);
	return response.ok ? await response.json() : null;
};

export const getCarDataFromRegistrationNumber = async (registrationNumber: string, setAPIResult: (carDetails: IAPICar | null) => void) => {
	const response = await fetch(`${API_URL}/cars/registration/${registrationNumber}`);
	const carDetails: IAPICar = response.ok ? await response.json() : null;
	setAPIResult(carDetails);
	return response.ok;
};

async function createCar(newCar: INewCar) {

	return await fetch(`${API_URL}/cars`, {
		method: 'POST',
		body: JSON.stringify(newCar),
		headers: {
			'Content-Type': 'application/json',
		},
	});
}

export async function submitCarForm(data: CreateCarInputs, registrationNumber: string, customer: ICustomer, navigate: (navigateTo: string)=>void) {
	const newCar: INewCar = {
		...data,
		customerId: customer.id,
		registrationNumber: registrationNumber.toUpperCase(),
		mileage: parseInt(data.mileage),
		lastInspectionDate: data.lastInspectionDate || null,
		lastInspectionResult: data.lastInspectionResult || null,
		lastInspectionKind: data.lastInspectionKind || null,
	};

	try {
		const response = await createCar(newCar);
		if (response.ok){
		notifications.show(NotificationMessageSuccess({
			title: 'VROOM VROOM!',
			message: 'Køretøj oprettet successfuldt',
		}));
		navigate('/redirect');
		} else {
			notifications.show(NotificationMessageError({
				title: 'Hov!',
				message: 'Køretøj eksisterer allerede i vores database. Prøv igen med et andet køretøj eller kontakt værkstedet',
			}));
		}
	} catch (error) {
		notifications.show(NotificationMessageError({
			title: 'Hov!',
			message: (error as Error).message,
		}));
	}
}

async function deleteCar(id: number) {
		return await fetch(`${API_URL}/cars/${id}`, {
			method: 'DELETE',
		});
}

export async function handleDeleteCar(car: ICar, navigate: (navigateTo: string) => void) {
	try {
		const response = await deleteCar(car.id);
		if (response.ok) {
		notifications.show(NotificationMessageSuccess({
			title: 'Succes!',
			message: `Køretøj med reg. nr. ${car.registrationNumber.toUpperCase()} slettet succesfuldt`,
		}));
		navigate('/redirect');
		}
	} catch (error: unknown) {
		notifications.show(NotificationMessageError({
			title: 'Hov!',
			message: (error as Error).message || 'Vi kunne desværre ikke slette dit køretøj. Prøv igen senere',
		}));
	}
}
