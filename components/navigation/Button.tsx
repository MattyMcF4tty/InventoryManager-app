import {FontAwesome5} from '@expo/vector-icons';
import {Link, LinkProps} from 'expo-router';
import {View} from 'react-native';

interface NavButtonProps {
	iconName: string;
	href: LinkProps['href'];
}

export default function NavButton({iconName, href}: NavButtonProps) {
	return (
		<Link href={href}>
			<View
				style={{
					flex: 1,
					height: '100%',
					width: '100%',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<FontAwesome5 name={iconName} size={28} color="black" />
			</View>
		</Link>
	);
}
