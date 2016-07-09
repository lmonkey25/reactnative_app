var React = require('react');
var ReactNative = require('react-native');
var globalStyles = require('./common/style');

var {
	StyleSheet,
	View,
	TouchableWithoutFeedback,
	Text,
	Image,
	ScrollView
} = ReactNative;

var helloScreen = React.createClass({
	getInitialState(){
		return {
			isActive: false
		};
	},

	goPressIn: function(){
		this.setState({
			isActive: true
		});
	},
	
	goPressOut: function(){
		this.setState({
			isActive: false
		});
	},

	goPress: function(){
		this.props.navigator.push({
			name: "home"
		});
	},

	render: function(){
		return (
			<View style={globalStyles.container}>
				<View style={globalStyles.headerContainer}>
					<Image source={require('../contents/images/toplogo.png')} style={globalStyles.toplogo}/>
				</View>	
				<ScrollView style={[globalStyles.mainContainer, styles.helloContainer]}>					
					<Text style={styles.helloTitle}>HELLO!</Text>
					<Text style={styles.helloText}>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
					</Text>
					<View style={styles.btnContainer}>
						<TouchableWithoutFeedback  onPressIn={this.goPressIn} onPressOut={this.goPressOut} onPress={this.goPress}>
							<View style={[styles.btn, styles.goBtn, this.state.isActive && styles.goActivatedBtn]}>								
								<Text style={styles.btnText}>Let’s go!</Text>
							</View>
						</TouchableWithoutFeedback>
					</View>					
				</ScrollView>
			</View>
			);
	}
});

var styles = StyleSheet.create({
	helloContainer: {
		backgroundColor: 'white',
		padding: 20	
	},

	helloTitle: {
		textAlign: 'center',
		fontSize: 24,
		fontFamily: 'Hind-Light'		
	},

	helloText: {
		fontSize: 14,
		fontFamily: 'Hind-Medium'		
	},

	btnContainer: {
		alignItems: 'center',
		marginTop: 20,
		marginBottom: 30
	},

	btn: {
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 30,
		paddingRight: 30,
		borderRadius: 3,
		elevation: 2	
	},

	btnText: {
		color: '#fefefe',
		fontSize: 18,
		textAlign: 'center',
		fontFamily: 'Hind-Semibold'		
	},

	goBtn: {
		backgroundColor: '#00b16a'
	},

	goActivatedBtn: {
		backgroundColor: '#0ac57a'
	}

});

module.exports = helloScreen;