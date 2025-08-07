import Item from '@/schemas/item';
import {updateItem} from '@/services/items/controller';
import {FontAwesome5} from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import {Link} from 'expo-router';
import {useRef, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Swipeable, {SwipeableMethods} from 'react-native-gesture-handler/ReanimatedSwipeable';

interface ItemBoxProps {
	item: Item;
}

const ItemBox = ({item: defaultItem}: ItemBoxProps) => {
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
			const newQuantity = item.quantity - 1;
			setItem(await updateItem(item.id, {quantity: newQuantity}));
		}

		setLoading(false);
		setShowSpinner(false);
	};

	return (
		<Swipeable
			ref={swipeableRef}
			overshootFriction={10}
			friction={2}
			leftThreshold={50}
			rightThreshold={50}
			onSwipeableWillOpen={(direction) => {
				handleSwipe(direction);
			}}
			renderLeftActions={() => (
				<View style={styles.leftSwipe}>
					<FontAwesome5 name={'minus'} size={20} color="white" />
				</View>
			)}
			renderRightActions={() => (
				<View style={styles.rightSwipe}>
					<FontAwesome5 name={'plus'} size={20} color="white" />
				</View>
			)}
		>
			<Link href={`/inventory/item/${item.id}`} asChild>
				<Pressable style={styles.container}>
					<Text style={styles.title}>{item.name}</Text>
					<Text>Description: {item.description}</Text>
					<Text>
						Quantity: {item.quantity}{' '}
						{showSpinner && (
							<View style={styles.loadingIcon}>
								<FontAwesome5 name="spinner" size={10} color="gray" />
							</View>
						)}
					</Text>
					<Text>Price: {item.purchasePrice} DKK</Text>
					<Text>Category: {item.category}</Text>
				</Pressable>
			</Link>
		</Swipeable>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		width: '100%',
		padding: 16,
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
		borderBottomLeftRadius: 8,
		borderBottomRightRadius: 8,
		backgroundColor: 'white',
		elevation: 3,
	},
	title: {
		fontWeight: 'bold',
		fontSize: 18,
		marginBottom: 8,
	},
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

export default ItemBox;
