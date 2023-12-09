import { API_URL } from './config.ts';

export async function getTableData<T>(queryParams: string, itemType: string): Promise<APIResponse<T>> {
	console.log(`${API_URL}/${itemType}s/?${queryParams}`);
	const response = await fetch(`${API_URL}/${itemType}s/?${queryParams}`);

	if (!response.ok) {
		throw new Error('Failed to fetch data');
	}
	return await response.json();
}