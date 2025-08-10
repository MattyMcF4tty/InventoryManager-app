import {StyleSheet, TextInput} from 'react-native';

interface SearchBarProps {
	onChange: (text: string) => void;
}

export default function SearchBar({onChange}: SearchBarProps) {
	return (
		<TextInput
			keyboardType="default"
			onChangeText={(text) => onChange(text)}
			style={styles.input}
			placeholder="Search"
			placeholderTextColor="gray"
		/>
	);
}

const styles = StyleSheet.create({
	input: {
		paddingHorizontal: 10,
		backgroundColor: 'white',
		borderWidth: 1,
		borderColor: 'lightgray',
		borderRadius: 10,
		width: '100%',
		height: 40,
	},
});
