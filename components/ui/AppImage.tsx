import {FontAwesome5} from '@expo/vector-icons';
import {Image} from 'expo-image';
import {useState} from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

interface AppImageProps {
	uri: string;
	fallbackIcon?: string;
	customStyle?: StyleProp<ViewStyle>;
}

export default function AppImage({uri, fallbackIcon, customStyle}: AppImageProps) {
	const [imageExists, setImageExists] = useState(true);

	let iconSize: number;
	let width: number | undefined;
	let height: number | undefined;

	if (customStyle && typeof customStyle === 'object' && !Array.isArray(customStyle)) {
		const styleObj = customStyle as ViewStyle;
		width = typeof styleObj.width === 'number' ? styleObj.width : undefined;
		height = typeof styleObj.height === 'number' ? styleObj.height : undefined;
	}

	if (width !== undefined && height !== undefined) {
		iconSize = Math.min(width, height);
	} else if (width !== undefined) {
		iconSize = width;
	} else if (height !== undefined) {
		iconSize = height;
	} else {
		iconSize = Math.min(styles.defaultStyle.width, styles.defaultStyle.height);
	}

	return (
		<View style={customStyle ? customStyle : styles.defaultStyle}>
			{imageExists ? (
				<Image source={{uri: uri}} style={styles.media} onError={() => setImageExists(false)} />
			) : (
				<View style={styles.media}>
					<FontAwesome5
						name={fallbackIcon ? fallbackIcon : 'question'}
						color="lightgray"
						size={iconSize}
					/>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	defaultStyle: {
		width: 60,
		height: 60,
	},
	media: {
		height: '100%',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
