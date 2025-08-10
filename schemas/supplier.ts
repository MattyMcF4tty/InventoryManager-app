import SupplierContactInfo from '@/schemas/supplierContactInfo';
import {ISODateString} from '@/schemas/types';

export default interface Supplier {
	id: number;
	name: string;
	website: string;
	address: string;
	contactInfo: SupplierContactInfo[];
	updatedAt: ISODateString;
	createdAt: ISODateString;
}
