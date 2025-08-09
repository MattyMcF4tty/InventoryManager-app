export function getObjectDifferences<T extends object>(object1: T, object2: T): Partial<T> {
	const differences: Partial<T> = {};

	for (const key of Object.keys(object1) as (keyof T)[]) {
		// We make it run recursively if [key] value is an object
		if (
			typeof object1[key] === 'object' &&
			object1[key] !== null &&
			typeof object2[key] === 'object' &&
			object2[key] !== null
		) {
			const nestedDiff = getObjectDifferences(object1[key] as object, object2[key] as object);
			if (Object.keys(nestedDiff).length > 0) {
				differences[key] = nestedDiff as any;
			}
		} else if (object1[key] !== object2[key]) {
			differences[key] = object2[key];
		}
	}
	return differences;
}
