import { API_URL } from './config.ts';

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


export const deleteCustomer = async (id: string) => {
	try {
		const response = await fetch(`${API_URL}/customers/${id}`, {
			method: 'DELETE'
		});

		if (!response.ok) {
			throw new Error('Error fetching data');
		}

		return await response.json();

	} catch (error: unknown) {
		console.error(error);
	}

}

