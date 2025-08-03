import {default as ApiReponse, default as ApiResponse} from '@/schemas/apiResponse';
import AppError from '@/schemas/appError';
import {ApiRouteMap} from '@/services/backend/routes';
import {deserializeFromDbFormat} from '@/utils/dbFormat';

export default async function handleInternalApi<
	R extends keyof ApiRouteMap,
	M extends keyof ApiRouteMap[R]
>(
	path: R,
	options: (RequestInit & {method: M}) & {
		params?: URLSearchParams;
	}
): Promise<ApiResponse<ApiRouteMap[R][M]>> {
	const serverUrl = 'http://192.168.1.28:8080';
	const rootPath = `${serverUrl}/v1`;
	// Extract searchParams and options
	const {params, ...fetchOptions} = options;

	const query = params ? `?${params.toString()}` : '';
	const fullPath = `${rootPath}${path}${query}`;

	const response = await fetch(fullPath, fetchOptions);
	const reponseJson = await response.json();

	const deserializedReponseJson =
		deserializeFromDbFormat<ApiReponse<ApiRouteMap[R][M]>>(reponseJson);

	if (deserializedReponseJson.success === undefined) {
		console.error('Unexpected API response format:', {
			path,
			body: reponseJson,
		});

		throw new AppError(
			500,
			'Unexpected Error.',
			`Unexpected response from the server. Got: \nPath: ${fullPath} \nBody: ${JSON.stringify(
				deserializedReponseJson
			)}`
		);
	}

	return deserializedReponseJson;
}
