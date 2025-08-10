import InfoBox from '@/app/inventory/item/components/InfoBox';
import ItemCard from '@/app/inventory/item/components/ItemCard';
import SaveButton from '@/app/inventory/item/components/SaveButton';
import ContentBox from '@/components/ui/ContentBox';
import TextStyling from '@/constants/styles/Text';
import Item from '@/schemas/item';
import Supplier from '@/schemas/supplier';
import {getItem} from '@/services/items/controllers';
import {getSupplier} from '@/services/suppliers/controllers';
import {getObjectDifferences} from '@/utils/objectUtils';
import {useLocalSearchParams} from 'expo-router';
import isEqual from 'fast-deep-equal';
import {useEffect, useState} from 'react';
import {ActivityIndicator, Keyboard, StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

export default function ItemScreen() {
	const {id: idString} = useLocalSearchParams();
	const id = Number(idString);

	const [storedItem, setStoredItem] = useState<Item>();
	const [localItem, setLocalItem] = useState<Item>();
	const [loading, setLoading] = useState<boolean>(false);

	const [supplier, setSupplier] = useState<Supplier>();

	const [allowSave, setAllowSave] = useState(false);

	useEffect(() => {
		async function initDataFetch() {
			setLoading(true);
			const fetchedItem = await getItem(id);
			setStoredItem(fetchedItem);
			setLocalItem(fetchedItem);

			const fetchedSupplier = await getSupplier(fetchedItem.supplierId);
			setSupplier(fetchedSupplier);
			setLoading(false);
		}
		if (id) {
			initDataFetch();
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

					{/* Item details box */}
					<View>
						<Text style={TextStyling.note}>Item Details</Text>
						<InfoBox<Item>
							displayObject={localItem}
							hiddenFields={['id', 'supplierId', 'name', 'description', 'imageUrl']}
							protectedFields={['createdAt', 'updatedAt']}
							onChange={(updatedItem) => {
								setLocalItem(updatedItem);
							}}
						/>
					</View>

					{/* Supplier details box */}
					<View>
						<Text style={TextStyling.note}>Supplier Details</Text>
						{supplier ? (
							<InfoBox<Supplier>
								displayObject={supplier}
								hiddenFields={['id', 'contactInfo', 'createdAt', 'updatedAt']}
								protectedFields="all"
								onChange={(updatedSupplier) => {
									setSupplier(updatedSupplier);
								}}
							/>
						) : (
							<ContentBox>
								<Text>Unknown</Text>
							</ContentBox>
						)}
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
	fabContainer: {
		position: 'absolute',
		zIndex: 10,
	},
});
