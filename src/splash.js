var React = require('react');
var ReactNative = require('react-native');

var {
	StyleSheet,
	View,
	Image
} = ReactNative;

var navigator = null;

var splashScreen = React.createClass({
	getInitialState(){
		navigator = this.props.navigator;
		return {

		};
	},

	componentDidMount: function(){	
		setTimeout(function(){
			navigator.push({
				name : "login"
			});
		}, 2000);
	},

	render: function(){
		return (
			<View style={styles.container}>
				<Image source={require('../contents/images/splash.png')} style={styles.splashImage}/>
			</View>
			);
	}
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center'
	},

	splashImage: {
		width: 150,
		height: 150
	}
});

module.exports = splashScreen;