import { API_URL } from './config.ts';

export const getSingleOrder = async (id: number) => {
	try {
		const response = await fetch(`${API_URL}/orders/${id}`);

		if (!response.ok) {
			throw new Error('Error fetching data');
		}

		return await response.json();

	} catch (error: unknown) {
		console.error(error);
	}
}