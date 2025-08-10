import {ISODateString} from '@/schemas/types';

export function isValidDate(unknownDate: string | ISODateString | Date | unknown): boolean {
	// Only accept strings
	if (typeof unknownDate !== 'string') {
		return false;
	}

	// Strict ISO date regex: YYYY-MM-DD or full ISO with time
	const isoRegex = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+\-]\d{2}:\d{2})?)?$/;

	if (!isoRegex.test(unknownDate)) {
		return false;
	}

	const formattedDate = new Date(unknownDate);
	return !isNaN(formattedDate.getTime());
}
