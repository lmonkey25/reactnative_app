var ReactNative = require('react-native');

var {
	StyleSheet
} = ReactNative;

var styles = StyleSheet.create({
	container: {
		flex: 1, 
		backgroundColor: 'white'
	},

	headerContainer: {
		paddingTop: 12,
		paddingBottom: 12,
		backgroundColor: '#00b16a',
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 4
	},
	toplogo: {
		width: 170,
		height: 33
	},
	mainContainer: {
		flex: 1,
		margin: 10,
		elevation:4
	}
});

module.exports = styles;