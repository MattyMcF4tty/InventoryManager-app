export default interface Item {
	id: number;
	name: string;
	description: string;
	quantity: number;
	price: number;
	category: string;
	supplierId: number;
	createdAt: ISODateString;
	updatedAt: ISODateString;
}

type ISODateString = string;
