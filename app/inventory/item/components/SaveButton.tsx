import Item from '@/schemas/item';
import {updateItem} from '@/services/items/controllers';
import {useState} from 'react';
import {ActivityIndicator, Pressable, StyleSheet, Text} from 'react-native';

interface SaveButtonProps {
	itemId: Item['id'];
	updatedItem: Partial<Omit<Item, 'id' | 'createdAt' | 'updatedAt'>>;
	onSave: (item: Item) => void;
}

export default function SaveButton({itemId, updatedItem, onSave}: SaveButtonProps) {
	const [loading, setLoading] = useState(false);
	async function save() {
		setLoading(true);
		const newItem = await updateItem(itemId, updatedItem);
		onSave(newItem);
		setLoading(false);
	}

	return (
		<Pressable onPress={save} disabled={loading} style={styles.button}>
			{loading ? (
				<ActivityIndicator style={styles.loading} />
			) : (
				<Text style={styles.text}>Save</Text>
			)}
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: 'dodgerblue',
		height: 50,
		width: 120,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 6,
		// iOS shadow
		shadowColor: '#000',
		shadowOffset: {width: 0, height: 2},
		shadowOpacity: 0.1,
		shadowRadius: 4,
		// Android shadow
		elevation: 3,
	},
	text: {
		color: 'white',
	},
	loading: {
		outlineColor: 'white',
	},
});
