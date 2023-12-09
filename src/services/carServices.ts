import { API_URL } from './config.ts';
export async function getCustomerCars(customerId: string) {
	try {
		const response = await fetch(`${API_URL}/customers/${customerId}/cars`);
		if (response.ok) {
			return await response.json();
		} else {
			return null;
		}
	} catch (error: unknown) {
		console.log((error as Error).message);
		return null;
	}
}