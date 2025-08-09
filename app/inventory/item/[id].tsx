import ItemCard from '@/app/inventory/item/components/ItemCard';
import ItemDetailsBox from '@/app/inventory/item/components/ItemDetailsBox';
import SaveButton from '@/app/inventory/item/components/SaveButton';
import Item from '@/schemas/item';
import {getItem} from '@/services/items/controllers';
import {getObjectDifferences} from '@/utils/objectUtils';
import {useLocalSearchParams} from 'expo-router';
import isEqual from 'fast-deep-equal';
import {useEffect, useState} from 'react';
import {ActivityIndicator, Keyboard, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export default function ItemScreen() {
	const insets = useSafeAreaInsets();

	const {id: idString} = useLocalSearchParams();
	const id = Number(idString);

	const [storedItem, setStoredItem] = useState<Item>();
	const [localItem, setLocalItem] = useState<Item>();
	const [loading, setLoading] = useState<boolean>(false);

	const [allowSave, setAllowSave] = useState(false);

	useEffect(() => {
		async function fetchItem() {
			setLoading(true);
			const fetchedItem = await getItem(id);
			setStoredItem(fetchedItem);
			setLocalItem(fetchedItem);
			setLoading(false);
		}
		if (id) {
			fetchItem();
		}
	}, [id]);

	useEffect(() => {
		if (!isEqual(storedItem, localItem)) {
			setAllowSave(true);
		} else {
			setAllowSave(false);
		}
	}, [localItem, storedItem]);

	if (loading) {
		return (
			<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	if (!storedItem || !localItem) {
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
				overflow: 'visible',
			}}
		>
			<ScrollView
				onScroll={Keyboard.dismiss}
				contentContainerStyle={{paddingBottom: 120, width: '100%'}}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.container}>
					<ItemCard localItem={localItem} />

					{/* Item info box */}
					<View>
						<Text style={styles.small}>Item Details</Text>
						<ItemDetailsBox localItem={localItem} setLocalItem={setLocalItem} />
					</View>
				</View>
			</ScrollView>
			{allowSave && (
				<View style={[styles.fabContainer, {bottom: 16, right: 16}]}>
					<SaveButton
						itemId={storedItem.id}
						updatedItem={getObjectDifferences(storedItem, localItem)}
						onSave={(item) => {
							setStoredItem(item);
							setLocalItem(item);
						}}
					/>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		overflow: 'visible',
		minHeight: '100%',
		width: '100%',
		flexDirection: 'column',
		gap: 20,
	},

	small: {
		fontWeight: 'bold',
		fontSize: 10,
		color: 'gray',
	},

	fabContainer: {
		position: 'absolute',
		zIndex: 10,
	},
});
