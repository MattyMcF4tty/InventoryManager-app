import AppImage from '@/components/ui/AppImage';
import ContentBox from '@/components/ui/ContentBox';
import Pill from '@/components/ui/Pill';
import TextStyling from '@/constants/styles/Text';
import Item from '@/schemas/item';
import Supplier from '@/schemas/supplier';
import {updateItem} from '@/services/items/controllers';
import {FontAwesome5} from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import {Link} from 'expo-router';
import {useRef, useState} from 'react';
import {ActivityIndicator, Pressable, StyleSheet, Text, View} from 'react-native';
import Swipeable, {SwipeableMethods} from 'react-native-gesture-handler/ReanimatedSwipeable';

interface ItemCardProps {
	item: Item;
	supplier: Supplier | undefined;
}

export default function ItemCard({item: defaultItem, supplier}: ItemCardProps) {
	const swipeableRef = useRef<SwipeableMethods>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [item, setItem] = useState<Item>(defaultItem);
	const [showSpinner, setShowSpinner] = useState(false);

	const handleSwipe = async (direction: 'left' | 'right') => {
		// Close swipe and provide haptic feedback as confirmation
		swipeableRef.current?.close();
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);

		setLoading(true);
		// Wait showing loading spinner
		setTimeout(() => {
			if (loading) setShowSpinner(true);
		}, 1000);

		if (direction === 'left') {
			const newQuantity = item.quantity + 1;
			setItem(await updateItem(item.id, {quantity: newQuantity}));
		} else if (direction === 'right') {
			if (item.quantity <= 0) {
				setLoading(false);
				setShowSpinner(false);
				return;
			}
			const newQuantity = item.quantity - 1;
			setItem(await updateItem(item.id, {quantity: newQuantity}));
		}

		setLoading(false);
		setShowSpinner(false);
	};

	return (
		<Swipeable
			containerStyle={{
				overflow: 'visible',
			}}
			ref={swipeableRef}
			overshootFriction={10}
			friction={2}
			leftThreshold={50}
			rightThreshold={50}
			onSwipeableWillOpen={(direction) => {
				handleSwipe(direction);
			}}
			renderLeftActions={() =>
				item.quantity > 0 && (
					<View style={styles.leftSwipe}>
						<FontAwesome5 name={'minus'} size={20} color="white" />
					</View>
				)
			}
			renderRightActions={() => (
				<View style={styles.rightSwipe}>
					<FontAwesome5 name={'plus'} size={20} color="white" />
				</View>
			)}
		>
			{showSpinner && (
				<View style={styles.loadingIcon}>
					<ActivityIndicator />
				</View>
			)}
			<ContentBox>
				<Link href={`/inventory/item/${item.id}`} asChild>
					<Pressable style={styles.card}>
						<AppImage uri={item.imageUrl} fallbackIcon="box" customStyle={{width: 60}} />
						<View style={styles.cardContent}>
							<View>
								<Text style={TextStyling.big}>{item.name}</Text>
								<View style={styles.supplierDetails}>
									<FontAwesome5
										name="warehouse"
										size={TextStyling.note.fontSize - 2}
										color={TextStyling.note.color}
									/>
									<Text style={TextStyling.note}>{supplier?.name ? supplier.name : 'unkown'}</Text>
								</View>
							</View>

							<View style={styles.itemDetails}>
								<Pill
									text={String(item.quantity)}
									color="darkturquoise"
									icon="box"
									textColor="white"
								/>

								<Pill text={item.category} color="cadetblue" icon="sitemap" textColor="white" />
							</View>
						</View>
					</Pressable>
				</Link>
			</ContentBox>
		</Swipeable>
	);
}

const styles = StyleSheet.create({
	card: {
		flex: 1,
		flexDirection: 'row',
		gap: 10,
	},
	cardContent: {
		flexDirection: 'column',
		gap: 12,
		flexShrink: 1,
	},
	itemDetails: {
		flexDirection: 'row',
		gap: 6,
		flexGrow: 1,
		flexWrap: 'wrap',
	},
	supplierDetails: {flexDirection: 'row', gap: 4, alignItems: 'center'},
	leftSwipe: {
		borderRadius: 8,
		backgroundColor: 'crimson',
		width: '100%',
		flex: 1,
		paddingLeft: 10,
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	rightSwipe: {
		borderRadius: 8,
		backgroundColor: 'forestgreen',
		width: '100%',
		flex: 1,
		paddingRight: 10,
		justifyContent: 'center',
		alignItems: 'flex-end',
	},
	loadingIcon: {
		position: 'absolute',
		top: 8,
		right: 8,
		zIndex: 1,
	},
});
