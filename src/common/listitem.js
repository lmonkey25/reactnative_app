var React = require('react');
var ReactNative = require('react-native');
var dateFormat = require('dateformat');

var {
	StyleSheet,
	View,
	Image,
	Text,
	TouchableWithoutFeedback
} = ReactNative;

var ListItem = React.createClass({
	getInitialState(){
		var time = new Date(this.props.dataSource.card.time);
		return {
			isActive: false,
			name: this.props.dataSource.card.name,
			time: dateFormat(time, "mmmm d, yyyy")
		};
	},

	pressIn: function(){
		this.setState({
			isActive: true
		});
	},

	pressOut: function(){
		this.setState({
			isActive: false
		});
	},

	render: function(){
		return (
				<TouchableWithoutFeedback onPressIn={this.pressIn} onPressOut={this.pressOut} onPress={this.props.onPress}>
					<View style={[styles.cardItemContainer, this.state.isActive && styles.cardActiveItemContainer]} >
						<View style={styles.cardImage}></View>
						<View style={styles.cardInfoContainer}>
							<Text style={styles.cardName}>{this.state.name}</Text>
							<Text style={styles.cardTime}>{this.state.time}</Text>
						</View>
					</View>
				</TouchableWithoutFeedback>
			);
	}
});

var styles = StyleSheet.create({
	cardItemContainer: {
		flexDirection: 'row',
		padding: 15
	},

	cardActiveItemContainer: {
		backgroundColor: '#e8e8e8'
	},

	cardImage: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: '#dcdcdc'
	},

	cardInfoContainer: {
		flex: 1,
		paddingLeft: 20
	},

	cardName: {
		fontFamily: 'Hind-Regular',
		fontSize: 16
	},

	cardTime: {
		fontFamily: 'Hind-Regular',
		fontSize: 15
	}
});

module.exports = ListItem;