import Item from '@/schemas/item';
import Paged from '@/schemas/paged';
import handleInternalApi from '@/services/backend/handler';
import {serializeToDbFormat} from '@/utils/dbFormat';

/**
 * A function that fetches all items in pages.
 * @param pageSize The max amount of items on each page.
 * @param page The page you want to fetch.
 */
export async function getItems(pageSize: number = 20, page: number = 1): Promise<Paged<Item>> {
	const params = new URLSearchParams();
	params.append('page-size', String(pageSize));
	params.append('page', String(page));

	console.log('fetching items');
	const response = await handleInternalApi('/items', {
		method: 'GET',
		params: params,
	});

	return response.data;
}

export async function updateItem(
	id: Item['id'],
	updatedData: Partial<Omit<Item, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<Item> {
	const serializedData = serializeToDbFormat(updatedData);

	const response = await handleInternalApi(`/items/${id}`, {
		method: 'PATCH',
		body: JSON.stringify(serializedData),
	});

	return response.data;
}

export async function getItem(id: Item['id']): Promise<Item> {
	const response = await handleInternalApi(`/items/${id}`, {
		method: 'GET',
	});

	return response.data;
}
