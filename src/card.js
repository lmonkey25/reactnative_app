var React = require('react');
var ReactNative = require('react-native');
var globalStyles = require('./common/style');
var QRCode = require('react-native-qrcode');

var {
	StyleSheet,
	View,
	Text,
	ScrollView,
	Image,
	TouchableWithoutFeedback,
	TextInput
} = ReactNative;

var cardScreen = React.createClass({

	getInitialState(){
		return this.props.cardinfo;
	},

	render: function(){
		return (
				<View style={globalStyles.container}>
					<View style={globalStyles.headerContainer}>
						<Image source={require('../contents/images/toplogo.png')} style={globalStyles.toplogo}/>
						<View style={styles.backBtnContainer}>
							<TouchableWithoutFeedback onPress={this.props.onBack}>
								<Image source={require('../contents/images/left-arrow.png')} style={styles.backImage}/>
							</TouchableWithoutFeedback>
						</View>
					</View>
					<ScrollView style={[globalStyles.mainContainer, styles.cardContainer]}>
						<View style={styles.cardImageContainer}>
							{this.state.index != -1?
							<QRCode value={this.props.cardname} size={100}  bgColor='black'  fgColor='white'/>: null}
						</View>
						<View style={styles.itemContainer}>
							<View style={styles.itemImageContainer}>
								<Image source={require('../contents/images/username.png')} style={styles.itemUserNameImage}/>
							</View>
							<View style={styles.itemContent}>
								<Text style={styles.itemFieldName}>{this.state.name}</Text>
								<Text style={styles.itemFieldLabel}>Name</Text>
							</View>
						</View>
						<View style={styles.itemContainer}>
							<View style={styles.itemImageContainer}>
								<Image source={require('../contents/images/phone.png')} style={styles.itemPhoneImage}/>
							</View>
							<View style={styles.itemContent}>
								<Text style={styles.itemFieldName}>{this.state.mobile}</Text>
								<Text style={styles.itemFieldLabel}>Mobile</Text>
							</View>
						</View>
						<View style={styles.itemContainer}>
							<View style={styles.itemImageContainer}>
								<Image source={require('../contents/images/business.png')} style={styles.itemBusinessImage}/>
							</View>
							<View style={styles.itemContent}>
								<Text style={styles.itemFieldName}>{this.state.business}</Text>
								<Text style={styles.itemFieldLabel}>Business</Text>
							</View>
						</View>
						<View style={styles.itemContainer}>
							<View style={styles.itemImageContainer}>
								<Image source={require('../contents/images/address.png')} style={styles.itemAddressImage}/>
							</View>
							<View style={styles.itemContent}>
								<Text style={styles.itemFieldName}>{this.state.address}</Text>
								<Text style={styles.itemFieldLabel}>Address</Text>
							</View>
						</View>
						<View style={styles.itemContainer}>
							<View style={styles.itemImageContainer}>
								<Image source={require('../contents/images/email.png')} style={styles.itemEmailImage}/>
							</View>
							<View style={styles.itemContent}>
								<Text style={styles.itemFieldName}>{this.state.email}</Text>
								<Text style={styles.itemFieldLabel}>E-mail</Text>
							</View>
						</View>
					</ScrollView>
				</View>
			);		
	}
});

var styles = StyleSheet.create({
	backBtnContainer: {
		width: 20,
		height: 20,
		position: 'absolute',
		left: 10,
		top: 20
	},

	backImage: {
		width: 20,
		height: 20
	},

	cardContainer: {
		backgroundColor: 'white'
	},

	cardImageContainer: {
		paddingTop: 20,
		paddingBottom: 20,
		alignItems: "center",
		justifyContent: 'center'
	},	

	itemContainer: {
		flexDirection: 'row',
		padding: 10
	},

	itemImageContainer: {
		width: 50,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10
	},	

	itemContent: {
		flex: 1,
		paddingLeft: 20
	},

	itemFieldName: {
		color: '#000000',
		fontSize: 16,
		fontFamily: 'Hind-Regular'
	},

	itemFieldLabel: {
		fontSize: 16,
		fontFamily: 'Hind-Regular'
	},

	itemUserNameImage: {
		width: 24,
		height: 24
	},

	itemPhoneImage: {
		width: 24,
		height: 24
	},

	itemBusinessImage: {
		width: 24,
		height: 23
	},

	itemAddressImage: {
		width: 16,
		height: 24
	},

	itemEmailImage: {
		width: 24,
		height: 18
	}

});

module.exports = cardScreen;