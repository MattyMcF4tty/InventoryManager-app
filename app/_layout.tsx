import Navbar from '@/components/navigation/Navbar';
import {Stack} from 'expo-router';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, View} from 'react-native';

export default function RootLayout() {
	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<Stack screenOptions={{headerShown: false}} />
			<Navbar />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
