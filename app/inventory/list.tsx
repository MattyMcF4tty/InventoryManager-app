import ItemBox from '@/components/ItemBox';
import Item from '@/schemas/item';
import {getItems} from '@/services/items/controllers';
import {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';

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
					renderItem={({item}) => <ItemBox item={item} />}
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
