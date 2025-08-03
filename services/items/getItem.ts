import Item from '@/schemas/item';
import Paged from '@/schemas/paged';
import handleInternalApi from '@/services/backend/handler';

/**
 * A function that fetches all items in pages.
 * @param pageSize The max amount of items on each page.
 * @param page The page you want to fetch.
 */
async function getItems(pageSize: number = 20, page: number = 1): Promise<Paged<Item>> {
	const params = new URLSearchParams();
	params.append('pageSize', String(pageSize));
	params.append('page', String(page));

	const response = await handleInternalApi('/items', {
		method: 'GET',
		params: params,
	});

	return response.data;
}
