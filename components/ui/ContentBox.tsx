import {StyleSheet, View, ViewProps} from 'react-native';

interface ContentBoxProps extends Omit<ViewProps, 'style'> {
	children: React.ReactNode;
	style?: Omit<
		ViewProps['style'],
		| 'borderRadius'
		| 'shadowColor'
		| 'shadowOpacity'
		| 'shadowOffset'
		| 'padding'
		| 'shadowRadius'
		| 'backgroundColor'
	>;
}

export default function ContentBox({children, style, ...rest}: ContentBoxProps) {
	return (
		<View style={[styles.container, style]} {...rest}>
			{children}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		padding: 16,
		borderRadius: 8,
		backgroundColor: 'white',
		// iOS shadow
		shadowColor: '#000',
		shadowOffset: {width: 0, height: 2},
		shadowOpacity: 0.1,
		shadowRadius: 4,
		// Android shadow
		elevation: 3,
	},
});
