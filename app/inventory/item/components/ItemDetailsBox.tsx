import InfoField from '@/app/inventory/item/components/InfoField';
import ContentBox from '@/components/ui/ContentBox';
import Item from '@/schemas/item';
import {isValidDate} from '@/utils/dateUtils';

interface ItemDetailsBoxProps {
	localItem: Item;
	setLocalItem: React.Dispatch<React.SetStateAction<Item | undefined>>;
}

export default function ItemDetailsBox({localItem, setLocalItem}: ItemDetailsBoxProps) {
	const HIDDEN_FIELDS = ['id', 'name', 'description', 'supplierId'];
	const formatLabel = (key: string) =>
		key
			.replace(/([a-z])([A-Z])/g, '$1 $2')
			.replace(/_/g, ' ')
			.replace(/^\w/, (c) => c.toUpperCase());

	return (
		<ContentBox style={{padding: 0, width: '100%'}}>
			{Object.entries(localItem)
				.filter(([key, value]) => !HIDDEN_FIELDS.includes(key) && typeof value !== 'function')
				.map(([key, value], index) => {
					const isNumber = typeof value === 'number';
					const protectedEntry = ['updatedAt', 'createdAt'].includes(key);
					const isDate = isValidDate(value);

					return (
						<InfoField
							key={key}
							readOnly={protectedEntry}
							disableBorder={index === 0}
							label={formatLabel(key)}
							inputType={isNumber ? 'numeric' : 'default'}
							defaultValue={!isDate ? String(value ?? '') : new Date(value).toLocaleString()}
							onChange={(text) => {
								setLocalItem((prev) => {
									if (!prev) return prev;
									if (isNumber) {
										const parsed = Number(text);
										return {
											...prev,
											[key]: isNaN(parsed) ? prev[key as keyof Item] : (parsed as any),
										} as Item;
									}
									return {...prev, [key]: text} as Item;
								});
							}}
						/>
					);
				})}
		</ContentBox>
	);
}
