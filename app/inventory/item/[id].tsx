import ContentBox from '@/components/ui/ContentBox';
import Item from '@/schemas/item';
import {getItem} from '@/services/items/controllers';
import {useLocalSearchParams} from 'expo-router';
import {useEffect, useState} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

export default function ItemScreen() {
	const {id: idString} = useLocalSearchParams();
	const id = Number(idString);

	console.log(id);
	const [item, setItem] = useState<Item>();
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		async function fetchItem() {
			setLoading(true);
			const fetchedItem = await getItem(id);
			setItem(fetchedItem);
			setLoading(false);
		}
		if (id) {
			fetchItem();
		}
	}, [id]);

	if (loading) {
		return (
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	if (!item) {
		return (
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<Text>Item not found</Text>
			</View>
		);
	}

	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				paddingTop: 60,
				paddingHorizontal: 20,
			}}
		>
			<ScrollView
				style={{
					overflow: 'visible',
					minHeight: '100%',
					width: '100%',
				}}
			>
				<ContentBox>
					<Text>{item.name}</Text>
				</ContentBox>
			</ScrollView>
		</View>
	);
}
