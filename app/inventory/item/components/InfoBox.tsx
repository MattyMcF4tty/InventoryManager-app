import InfoField from '@/app/inventory/item/components/InfoField';
import ContentBox from '@/components/ui/ContentBox';
import {isValidDate} from '@/utils/dateUtils';
import {useEffect, useState} from 'react';

// Generic props for an editable info box. Works with any plain object T
interface InfoBoxProps<T extends object> {
	displayObject: T;
	hiddenFields: ReadonlyArray<keyof T>;
	protectedFields: ReadonlyArray<keyof T> | 'all';
	onChange: (updatedObject: T) => void;
}

export default function InfoBox<T extends object>({
	displayObject,
	hiddenFields,
	protectedFields,
	onChange,
}: InfoBoxProps<T>) {
	const [localDisplayObject, setLocalDisplayObject] = useState<T>(displayObject);

	useEffect(() => {
		setLocalDisplayObject(displayObject);
	}, [displayObject]);

	useEffect(() => {
		onChange(localDisplayObject);
	}, [localDisplayObject]);

	const formatLabel = (key: string) =>
		key
			.replace(/([a-z])([A-Z])/g, '$1 $2')
			.replace(/_/g, ' ')
			.replace(/^\w/, (c) => c.toUpperCase());

	return (
		<ContentBox style={{padding: 0, width: '100%'}}>
			{Object.entries(localDisplayObject as Record<string, unknown>)
				.filter(([key, value]) => {
					// Hide fields listed in hiddenFields and skip function values
					const typedKey = key as keyof T;
					return !hiddenFields.includes(typedKey) && typeof value !== 'function';
				})
				.map(([key, value], index) => {
					const typedKey = key as keyof T;
					const isNumber = typeof value === 'number';
					const protectedEntry =
						protectedFields === 'all' ? true : protectedFields.includes(typedKey);
					const isDate = isValidDate(value);

					return (
						<InfoField
							key={key}
							readOnly={protectedEntry}
							disableBorder={index === 0}
							label={formatLabel(key)}
							inputType={isNumber ? 'numeric' : 'default'}
							defaultValue={!isDate ? String(value ?? '') : new Date(value as any).toLocaleString()}
							onChange={(text) => {
								setLocalDisplayObject((prev) => {
									if (!prev) return prev;

									const displayObjectCopy = {...(prev as Record<string, unknown>)};

									if (isNumber) {
										const parsed = Number(text);
										// If parsing fails, keep previous value
										displayObjectCopy[typedKey as string] = Number.isNaN(parsed)
											? (prev as Record<string, unknown>)[typedKey as string]
											: parsed;
									} else {
										displayObjectCopy[typedKey as string] = text;
									}

									// Changed: removed direct onChange call here to avoid React warning
									return displayObjectCopy as T;
								});
							}}
						/>
					);
				})}
		</ContentBox>
	);
}
