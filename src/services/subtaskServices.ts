import { API_URL } from './config.ts';

export const completeSubtaskInstance = async (id: number) => {
	const response = await fetch(`${API_URL}/subtasks/${id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
	});

	if (!response.ok) throw new Error('Error fetching data');

	return await response.json();
};