import {StyleSheet} from 'react-native';

const TextStyling = StyleSheet.create({
	title: {
		color: 'black',
		fontWeight: '500',
		fontSize: 18,
		flexShrink: 1,
		flexWrap: 'wrap',
	},
	big: {
		color: 'black',
		fontWeight: '500',
		fontSize: 16,
		flexShrink: 1,
		flexWrap: 'wrap',
	},
	subtle: {
		color: 'gray',
		fontStyle: 'italic',
		fontSize: 14,
	},
	note: {
		color: 'gray',
		fontWeight: '400',
		fontStyle: 'italic',
		fontSize: 12,
		flexShrink: 1,
		flexWrap: 'wrap',
	},
});

export default TextStyling;
