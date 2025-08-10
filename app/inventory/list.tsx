import ItemCard from '@/app/inventory/components/ItemCard';
import SearchBar from '@/app/inventory/components/SearchBar';
import Item from '@/schemas/item';
import Supplier from '@/schemas/supplier';
import {getItems, pagedItemSearch} from '@/services/items/controllers';
import {getSupplier} from '@/services/suppliers/controllers';
import {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';

export default function Index() {
	const [loading, setLoading] = useState<boolean>(true);
	const [items, setItems] = useState<Item[]>([]);
	const [suppliers, setSuppliers] = useState<Record<number, Supplier>>({});

	const [query, setQuery] = useState('');
	const [queryItems, setQueryItems] = useState<Item[]>([]);

	// Inital load
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

	// Fetch query when query changes
	async function fetchQuery(query: string) {
		const pagedQueryItems = await pagedItemSearch(query);
		const newItems = pagedQueryItems.data;

		// Collect unique supplier IDs from the new items (only numbers)
		const supplierIds = Array.from(
			new Set(
				newItems
					.map((it) => it.supplierId)
					.filter((id): id is number => id !== undefined && id !== null)
			)
		);

		// Determine which supplier IDs are missing in the current suppliers record
		const missingIds = supplierIds.filter((id) => suppliers[id] === undefined);

		if (missingIds.length > 0) {
			// Fetch the missing suppliers and merge them into state
			const fetchedSuppliers = await Promise.all(missingIds.map((id) => getSupplier(id)));

			setSuppliers((prev) => {
				const next = {...prev};
				for (const supplier of fetchedSuppliers) {
					if (supplier && supplier.id !== undefined && supplier.id !== null) {
						next[supplier.id] = supplier as Supplier;
					}
				}
				return next;
			});
		}

		setQueryItems(newItems);
		setLoading(false);
	}

	useEffect(() => {
		if (query === '') {
			setQueryItems([]);
		} else {
			const timeoutId = setTimeout(() => {
				fetchQuery(query);
			}, 200);
			return () => clearTimeout(timeoutId);
		}
	}, [query]);

	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'flex-start',
				alignItems: 'center',
				paddingTop: 60,
				paddingHorizontal: 20,
			}}
		>
			<SearchBar onChange={(text) => setQuery(text)} />
			<View
				style={{
					width: '100%',
					marginTop: 10,
					height: '100%',
					borderTopWidth: 1,
					borderColor: 'lightgray',
				}}
			>
				{loading ? (
					<Text>Loading...</Text>
				) : query !== '' ? (
					<FlatList
						data={queryItems}
						keyExtractor={(item) => item.id.toString()}
						renderItem={({item}) => <ItemCard supplier={suppliers[item.supplierId]} item={item} />}
						style={{width: '100%', flex: 1}}
						contentContainerStyle={{
							gap: 10,
							paddingTop: 10,
						}}
					/>
				) : (
					<FlatList
						data={items}
						keyExtractor={(item) => item.id.toString()}
						renderItem={({item}) => <ItemCard supplier={suppliers[item.supplierId]} item={item} />}
						style={{width: '100%', flex: 1}}
						contentContainerStyle={{
							gap: 10,
							paddingTop: 10,
						}}
					/>
				)}
			</View>
		</View>
	);
}
