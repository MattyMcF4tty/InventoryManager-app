export default class AppError extends Error {
	httpCode: number;
	details: string;

	constructor(httpCode: number, message: string, details: string) {
		super(message);
		this.name = 'AppError';
		this.httpCode = httpCode;
		this.details = details;
	}
}
