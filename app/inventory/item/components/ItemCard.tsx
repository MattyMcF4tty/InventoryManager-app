import ContentBox from '@/components/ui/ContentBox';
import Item from '@/schemas/item';
import {FontAwesome5} from '@expo/vector-icons';
import {Image} from 'expo-image';
import {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface ItemCardProps {
	localItem: Item;
}

export default function ItemCard({localItem}: ItemCardProps) {
	const [itemImageExists, setItemImageExists] = useState<boolean>(true);

	return (
		<ContentBox style={styles.container}>
			<View style={styles.mediaWrapper}>
				{itemImageExists ? (
					<Image
						source={{uri: localItem.imageUrl}}
						style={styles.media}
						onError={() => setItemImageExists(false)}
					/>
				) : (
					<View style={styles.media}>
						<FontAwesome5 name="box" size={100} color="lightgray" style={{flex: 1}} />
					</View>
				)}
			</View>

			<View style={styles.infoWrapper}>
				<Text style={styles.title}>{localItem.name}</Text>
				<Text style={styles.description}>{localItem.description}</Text>
			</View>
		</ContentBox>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	infoWrapper: {
		minHeight: 100,
		justifyContent: 'center',
		flexDirection: 'column',
		flexShrink: 1,
		flexGrow: 1,
		gap: 2,
		borderLeftWidth: 1,
		paddingLeft: 10,
		marginLeft: 10,
		borderColor: 'lightgray',
	},
	title: {
		fontWeight: 'bold',
		fontSize: 20,
	},
	description: {
		color: 'gray',
		fontStyle: 'italic',
		fontSize: 14,
	},
	media: {
		width: '100%',
		height: '100%',
	},
	mediaWrapper: {
		width: 100,
		height: 100,
	},
});
