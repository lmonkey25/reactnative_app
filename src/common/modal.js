var React = require('react');
var ReactNative = require('react-native');
var globalStyles = require('./style');
var QRCode = require('react-native-qrcode');

var {
	StyleSheet,
	View,
	Modal,
	Image,
	TouchableWithoutFeedback,
	ScrollView,
	Text,
	TextInput,
	ListView,
	Dimensions
} = ReactNative;

var scrollRef = null;
var cardindex = 0;
var scrollX = 0;

var CustomModal = React.createClass({
	getInitialState(){
		var ds = new ListView.DataSource({
			rowHasChanged: (r1, r2)=> r1!==r2
		});

		cardindex = this.props.cardinfo.index;

		return {
			name: this.props.cardinfo.name,
			mobile: this.props.cardinfo.mobile,
			business: this.props.cardinfo.business,
			address: this.props.cardinfo.address,
			email: this.props.cardinfo.email,			
			isSaveActive: false,
			isCancelActive: false
		}
	},

	componentWillMount: function(){		
		this.cardScrollView = [];	
		this.cardnum = 0;	
		var device = Dimensions.get('window');
		this.cardScrollView.push(<View style={{width: device.width/2 - 55, height: 100}}></View>);
		for(card in this.props.cards){
			this.cardnum++;
			this.cardScrollView.push(<View style={styles.qrImage}><QRCode value={card.name} size={100} bgColor='black' fbColor='white'/></View>);
		}	

		scrollX = (device.width/2 - 55) -this.state.index * 110;		
	},

	componentDidMount: function(){
		scrollRef.scrollTo({x: scrollX});
	},

	onSavePressIn: function(){
		this.setState({
			isSaveActive: true
		});
	},

	onSavePressOut: function(){
		this.setState({
			isSaveActive: false
		});
	},

	onCancelPressIn: function(){
		this.setState({
			isCancelActive: true
		});
	},

	onCancelPressOut: function(){
		this.setState({
			isCancelActive: false
		});
	},

	onSavePress: function(){
		this.props.onSave({
			name: this.state.name,
			mobile: this.state.mobile,
			address: this.state.address,
			business: this.state.business,
			email: this.state.email,
			index: cardindex
		});
		this.props.onClose();
	},	

	onScrollCard: function(direction){
		if((cardindex + direction )< 0 || (cardindex + direction) >=this.cardnum ){
		}else{
			cardindex = cardindex + direction;
			scrollX += 110 * direction;
			scrollRef.scrollTo({x: scrollX});
		}		
	},

	render: function(){
		return (
			<Modal
				animationType={'slide'}
				transparent={false}
				visible={this.props.visible}
				onRequestClose={()=>console.log("")}
				>
				<View style={globalStyles.container}>
					<View style={globalStyles.headerContainer}>
						<Image source={require('../../contents/images/toplogo.png')} style={globalStyles.toplogo}/>
						<View style={styles.closeBtnContainer}>
							<TouchableWithoutFeedback onPress={this.props.onClose}>
								<Image source={require('../../contents/images/cross.png')} style={styles.closeImage}/>
							</TouchableWithoutFeedback>
						</View>
					</View>
					<ScrollView style={[globalStyles.mainContainer, styles.modalContainer]}>
						<View style={styles.itemContainer}>
							<View style={styles.itemImageContainer}>
								<Image source={require('../../contents/images/username.png')} style={styles.itemUserNameImage}/>
							</View>
							<View style={styles.itemContent}>
								<TextInput style={styles.itemFieldName} placeholder="User_Name" value={this.state.name} onChangeText={(text)=>this.setState({name: text})}/>
								<Text style={styles.itemFieldLabel}>Name</Text>
							</View>
						</View>
						<View style={styles.itemContainer}>
							<View style={styles.itemImageContainer}>
								<Image source={require('../../contents/images/phone.png')} style={styles.itemPhoneImage}/>
							</View>
							<View style={styles.itemContent}>
								<TextInput style={styles.itemFieldName} placeholder="+47 2108 1850" value={this.state.mobile} onChangeText={(text)=>this.setState({mobile: text})}/>
								<Text style={styles.itemFieldLabel}>Mobile</Text>
							</View>
						</View>
						<View style={styles.itemContainer}>
							<View style={styles.itemImageContainer}>
								<Image source={require('../../contents/images/business.png')} style={styles.itemBusinessImage}/>
							</View>
							<View style={styles.itemContent}>
								<TextInput style={styles.itemFieldName} placeholder="Name of busienss" value={this.state.business} onChangeText={(text)=> this.setState({business: text})}/>
								<Text style={styles.itemFieldLabel}>Business</Text>
							</View>
						</View>
						<View style={styles.itemContainer}>
							<View style={styles.itemImageContainer}>
								<Image source={require('../../contents/images/address.png')} style={styles.itemAddressImage}/>
							</View>
							<View style={styles.itemContent}>
								<TextInput style={styles.itemFieldName} placeholder="Address" value={this.state.address} onChangeText={(text)=> this.setState({address: text})}/>
								<Text style={styles.itemFieldLabel}>Address</Text>
							</View>
						</View>
						<View style={styles.itemContainer}>
							<View style={styles.itemImageContainer}>
								<Image source={require('../../contents/images/email.png')} style={styles.itemEmailImage}/>
							</View>
							<View style={styles.itemContent}>
								<TextInput style={styles.itemFieldName} placeholder="info@contact.com" value={this.state.email} onChangeText={(text)=> this.setState({email: text})}/>
								<Text style={styles.itemFieldLabel}>E-mail</Text>
							</View>
						</View>
						<Text style={styles.templateLabel}>Templates</Text>
						<View style={styles.imageSliderContainer}>
							<ScrollView horizontal={true} ref={(scrollView) =>{ scrollRef= scrollView}} canCancelContentTouches={false}>							
								{this.cardScrollView}			
							</ScrollView>				
							<View style={styles.leftControlContainer}>
								<TouchableWithoutFeedback onPress={()=> this.onScrollCard(-1)}>
									<Image source={require('../../contents/images/slide-left-arrow.png')} style={styles.slideIcon}/>
								</TouchableWithoutFeedback>
							</View>
							<View style={styles.rightControlContainer}>
								<TouchableWithoutFeedback onPress={()=> this.onScrollCard(1)}>
									<Image source={require('../../contents/images/slide-right-arrow.png')} style={styles.slideIcon}/>
								</TouchableWithoutFeedback>
							</View>
						</View>
						<View style={styles.buttonContainer}>
							<TouchableWithoutFeedback onPress={this.onSavePress} onPressIn={this.onSavePressIn} onPressOut={this.onSavePressOut} onPress={this.onSavePress}>
								<View style={[styles.saveBtn, this.state.isSaveActive && styles.saveActiveBtn]}>
									<Text style={styles.saveBtnText}>SAVE</Text>
								</View>
							</TouchableWithoutFeedback>

							<TouchableWithoutFeedback onPress={this.props.onClose} onPressIn={this.onCancelPressIn} onPressOut={this.onCancelPressOut} onPress={this.props.onClose}>
								<View style={[styles.saveBtn, this.state.isCancelActive && styles.saveActiveBtn]}>
									<Text style={styles.saveBtnText}>CANCEL</Text>
								</View>
							</TouchableWithoutFeedback>
						</View>
					</ScrollView>
				</View>
			</Modal>
			);
	}
});

var styles = StyleSheet.create({
	closeBtnContainer: {
		width: 20,
		height: 20,
		position: 'absolute',
		left: 10,
		top: 20
	},

	closeImage: {
		width: 20,
		height: 20
	},

	modalContainer: {
		backgroundColor: 'white',
		flex: 1
	},

	itemContainer: {
		flexDirection: 'row',
		padding: 10,
		paddingRight: 30
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
		fontFamily: 'Hind-Regular',
		paddingBottom: 10,
		paddingLeft: 0,
		paddingTop: 0
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
	},

	templateLabel: {
		marginLeft: 20,
		marginBottom: 20
	},

	imageSliderContainer:{
		marginLeft: 20,
		marginRight: 20,
		height: 110		
	},

	cardListContainer: {		
				
	},

	qrImage:{
		width: 100,
		height: 100,
		marginRight: 10
	},

	leftControlContainer: {
		position: 'absolute',
		left: 0,
		top: 0,
		width: 50,
		height: 110,
		backgroundColor: 'rgba(255,255,255,0.7)',
		alignItems: 'center',
		justifyContent: 'center'
	},

	rightControlContainer: {
		position: 'absolute',
		right: 0,
		top: 0,
		width: 50,
		height: 110,
		backgroundColor: 'rgba(255,255,255,0.7)',
		alignItems: 'center',
		justifyContent: 'center'
	},

	slideIcon: {
		width: 20,
		height: 20
	},

	buttonContainer: {
		margin:20,
		flexDirection: 'row'
	},

	saveBtn:{
		paddingTop: 10,
		paddingBottom: 10,
		backgroundColor: 'white',
		width: 100,
		alignItems: 'center',
		borderRadius: 5,
		elevation: 2,
		marginRight: 20
	},

	saveBtnText: {		
		color: '#000000',
		textAlign: 'center'
	},

	saveActiveBtn: {
		backgroundColor: '#d9d9d9'
	}	
});

module.exports = CustomModal;