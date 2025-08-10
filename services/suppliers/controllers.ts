import Supplier from '@/schemas/supplier';
import handleInternalApi from '@/services/backend/handler';

export async function getSupplier(id: Supplier['id']): Promise<Supplier> {
	const response = await handleInternalApi(`/suppliers/${id}`, {
		method: 'GET',
	});

	return response.data;
}
