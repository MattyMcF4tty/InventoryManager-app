import Item from '@/schemas/item';
import {StyleSheet, Text, View} from 'react-native';

interface ItemBoxProps {
	item: Item;
}

const ItemBox = ({item}: ItemBoxProps) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>{item.name}</Text>
			<Text>Description: {item.description}</Text>
			<Text>Quantity: {item.quantity}</Text>
			<Text>Price: {item.purchasePrice} DKK</Text>
			<Text>Category: {item.category}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		padding: 16,
		borderWidth: 1,
		borderRadius: 8,
		borderColor: '#ccc',
		marginBottom: 12,
		backgroundColor: '#fff',
	},
	title: {
		fontWeight: 'bold',
		fontSize: 18,
		marginBottom: 8,
	},
});

export default ItemBox;
