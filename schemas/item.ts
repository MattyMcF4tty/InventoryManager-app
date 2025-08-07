import {ISODateString} from '@/schemas/types';

export default interface Item {
	id: number;
	name: string;
	description: string;
	quantity: number;
	purchasePrice: number;
	category: string;
	supplierId: number;
	createdAt: ISODateString;
	updatedAt: ISODateString;
}
