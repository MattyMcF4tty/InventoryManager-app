export default interface Paged<T> {
	pageCount: number;
	page: number;
	count: number;
	data: T[];
}
