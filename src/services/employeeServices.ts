import { API_URL } from './config.ts';

export const getSingleEmployee = async (id: string) => {
	try {
		const response = await fetch(`${API_URL}/employees/${id}`);

		if (!response.ok) {
			throw new Error('Error fetching data');
		}

		return await response.json();

	} catch (error: unknown) {
		console.error(error);
	}
}