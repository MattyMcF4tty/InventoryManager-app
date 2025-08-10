import ItemCard from '@/app/inventory/components/ItemCard';
import Item from '@/schemas/item';
import Supplier from '@/schemas/supplier';
import {getItems} from '@/services/items/controllers';
import {getSupplier} from '@/services/suppliers/controllers';
import {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';

export default function Index() {
	const [loading, setLoading] = useState<boolean>(true);
	const [items, setItems] = useState<Item[]>([]);
	const [suppliers, setSuppliers] = useState<Record<number, Supplier>>({});

	useEffect(() => {
		async function fetchItems() {
			const pagedItems = await getItems(10, 1);
			const items = pagedItems.data;
			setItems(items);
			return items;
		}

		async function fetchSuppliers(itemsArr: Item[]) {
			const supplierIds = Array.from(
				new Set(
					itemsArr
						.map((it) => it.supplierId)
						.filter((id): id is number => id !== undefined && id !== null)
				)
			);

			const supplierRequests = supplierIds.map((id) => getSupplier(id));
			const fetchedSuppliers = await Promise.all(supplierRequests);

			const supplierRecord = fetchedSuppliers.reduce((acc, supplier) => {
				if (supplier && supplier.id !== undefined && supplier.id !== null) {
					acc[supplier.id] = supplier;
				}
				return acc;
			}, {} as Record<number, Supplier>);

			setSuppliers(supplierRecord);
			return supplierRecord;
		}

		async function load() {
			setLoading(true);

			const fetchedItems = await fetchItems();
			await fetchSuppliers(fetchedItems);

			setLoading(false);
		}

		load();
	}, []);

	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			{loading ? (
				<Text>Loading...</Text>
			) : (
				<FlatList
					data={items}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({item}) => <ItemCard supplier={suppliers[item.supplierId]} item={item} />}
					style={{width: '100%', flex: 1}}
					contentContainerStyle={{
						gap: 10,
						paddingTop: 60,
						paddingHorizontal: 20,
					}}
				/>
			)}
		</View>
	);
}
