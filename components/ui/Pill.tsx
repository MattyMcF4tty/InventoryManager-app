import {FontAwesome5} from '@expo/vector-icons';
import {ColorValue, DimensionValue, Text, View} from 'react-native';

interface PillProps {
	color: ColorValue;
	icon: string;
	text: string;
	textColor: ColorValue;
	height?: DimensionValue;
	width?: DimensionValue;
}

export default function Pill({color, icon, text, height, width, textColor}: PillProps) {
	const fontSize = typeof height === 'number' ? height * 0.6 : 14;

	return (
		<View
			style={{
				backgroundColor: color,

				alignItems: 'center',
				flexDirection: 'row',
				height: height,
				width: width,
				paddingHorizontal: 8,
				paddingVertical: 2,
				gap: 4,
				borderRadius: 100,
			}}
		>
			<FontAwesome5 name={icon} size={fontSize - 2} style={{color: textColor}} />
			<Text style={{color: textColor, fontSize: fontSize}}>{text}</Text>
		</View>
	);
}
