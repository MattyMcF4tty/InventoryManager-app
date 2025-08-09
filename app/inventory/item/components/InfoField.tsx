import {Keyboard, KeyboardTypeOptions, StyleSheet, Text, TextInput, View} from 'react-native';

interface InfoFieldProps {
	label: string;
	inputType: KeyboardTypeOptions;
	defaultValue: string;
	disableBorder?: boolean;
	readOnly?: boolean;
	onChange?: (text: string) => void;
}

import {useState} from 'react';

export default function InfoField({
	label,
	inputType,
	disableBorder,
	readOnly,
	defaultValue,
	onChange,
}: InfoFieldProps) {
	const [isFocused, setIsFocused] = useState(false);

	return (
		<View
			style={[
				styles.container,
				{
					borderTopWidth: disableBorder ? 0 : 1,
					borderColor: disableBorder ? 'transparent' : 'lightgray',
				},
			]}
		>
			<Text style={styles.label}>{label}</Text>
			<TextInput
				style={[
					styles.input,
					{
						fontStyle: readOnly ? 'italic' : 'normal',
						color: readOnly ? 'dimgray' : 'black',
						backgroundColor: isFocused ? 'aliceblue' : 'white',
					},
				]}
				readOnly={readOnly}
				keyboardType={inputType}
				defaultValue={defaultValue}
				onChangeText={onChange}
				multiline
				onFocus={() => setIsFocused(true)}
				onBlur={() => {
					setIsFocused(false);
					Keyboard.dismiss();
				}}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexGrow: 1,
		width: '100%',
		paddingHorizontal: 10,
		borderColor: 'lightgray',
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 5,
	},
	label: {
		textAlign: 'left',
		width: '50%',
		color: 'dimgray',
	},
	input: {
		width: '50%',
		minHeight: 30,
		flex: 1,
		flexGrow: 1,
		textAlign: 'right',
		borderRadius: 5,
	},
});
