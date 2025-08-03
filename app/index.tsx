import Item from '@/schemas/item';
import {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

export default function Index() {
	const [loading, setLoading] = useState<boolean>(true);
	const [items, setItems] = useState<Item[]>([]);

	useEffect(() => {
		async function fetchItems() {
			setLoading(true);
			const response = await fetch('');
		}
	}, []);

	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<Text>Edit app/index.tsx to edit this screen.</Text>
		</View>
	);
}
