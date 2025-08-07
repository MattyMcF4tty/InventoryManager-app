import ContentBox from '@/components/ui/ContentBox';
import Item from '@/schemas/item';
import {updateItem} from '@/services/items/controllers';
import {FontAwesome5} from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import {Link} from 'expo-router';
import {useRef, useState} from 'react';
import {ActivityIndicator, Pressable, StyleSheet, Text, View} from 'react-native';
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
					<Pressable>
						<Text style={styles.title}>{item.name}</Text>
						<Text>Quantity: {item.quantity}</Text>
						<Text>Category: {item.category}</Text>
					</Pressable>
				</Link>
			</ContentBox>
		</Swipeable>
	);
};

const styles = StyleSheet.create({
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
