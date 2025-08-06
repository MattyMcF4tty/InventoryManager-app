import Item from '@/schemas/item';
import {Link} from 'expo-router';
import {StyleSheet, Text, View} from 'react-native';

interface ItemBoxProps {
	item: Item;
}

const ItemBox = ({item}: ItemBoxProps) => {
	return (
		<Link href={`/inventory/item/${item.id}`}>
			<View style={styles.container}>
				<Text style={styles.title}>{item.name}</Text>
				<Text>Description: {item.description}</Text>
				<Text>Quantity: {item.quantity}</Text>
				<Text>Price: {item.purchasePrice} DKK</Text>
				<Text>Category: {item.category}</Text>
			</View>
		</Link>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		height: 'auto',
		width: '100%',
		padding: 16,
		borderRadius: 8,
		backgroundColor: 'white',
		shadowColor: '#000',
		shadowOffset: {width: 0, height: 2},
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	title: {
		fontWeight: 'bold',
		fontSize: 18,
		marginBottom: 8,
	},
});

export default ItemBox;
