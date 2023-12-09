import { API_URL } from './config.ts';

export const initiateTaskInstance = async (id: number, employeeId: string) => {
	const response = await fetch(`${API_URL}/tasks/${id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ employeeId }),
	});

	if (!response.ok) throw new Error('Error fetching data');

	return await response.json();
};

export async function getTasks() {
	try {
		const response = await fetch(`${API_URL}/tasks`);
		if (response.ok) {
			return await response.json();
		} else {
			console.log('Promise Tasks is not ok');
			return null;
		}
	} catch (error: unknown) {
		console.log((error as Error).message);
		return null;
	}
}