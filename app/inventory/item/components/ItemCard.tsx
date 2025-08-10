import AppImage from '@/components/ui/AppImage';
import ContentBox from '@/components/ui/ContentBox';
import TextStyling from '@/constants/styles/Text';
import Item from '@/schemas/item';
import {StyleSheet, Text, View} from 'react-native';

interface ItemCardProps {
	localItem: Item;
}

export default function ItemCard({localItem}: ItemCardProps) {
	return (
		<ContentBox style={styles.container}>
			<AppImage
				uri={localItem.imageUrl}
				fallbackIcon="box"
				customStyle={{height: 100, width: 100}}
			/>

			<View style={styles.infoWrapper}>
				<Text style={TextStyling.title}>{localItem.name}</Text>
				<Text style={TextStyling.subtle}>{localItem.description}</Text>
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
});
