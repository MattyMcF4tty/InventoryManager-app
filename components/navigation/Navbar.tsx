import NavButton from '@/components/navigation/Button';
import {StyleSheet, View} from 'react-native';

export default function Navbar() {
	return (
		<View style={styles.container}>
			<NavButton href="/inventory/list" iconName="box" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: 70,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 10,
	},
});
