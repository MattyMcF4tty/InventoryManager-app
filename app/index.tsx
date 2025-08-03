import ItemBox from '@/assets/components/item';
import Item from '@/schemas/item';
import {getItems} from '@/services/items/getItem';
import {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

export default function Index() {
	const [loading, setLoading] = useState<boolean>(true);
	const [items, setItems] = useState<Item[]>([]);

	useEffect(() => {
		async function fetchItems() {
			setLoading(true);
			const pagedItems = await getItems(10, 1);
			const items = pagedItems.data;
			setItems(items);
			setLoading(false);
			console.log('Done fetching');
		}
		fetchItems();
	}, []);

	return (
		<View
			style={{
				backgroundColor: '#f1f3f5',
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			{loading ? (
				<Text>Loading...</Text>
			) : (
				<View style={{width: '90%'}}>
					{items.map((item) => (
						<ItemBox key={item.id} item={item} />
					))}
				</View>
			)}
		</View>
	);
}
