var React = require('react');
var ReactNative = require('react-native');
var globalStyles = require('./common/style');
var ListItem = require('./common/listitem');
var ModalDlg = require('./common/modal');
var BarcodeScanner  = require('react-native-barcodescanner');
var Firebase  = require('firebase');
import * as Progress from 'react-native-progress';

var {
	StyleSheet,
	View,
	TouchableWithoutFeedback,
	TouchableHighlight,
	Text,
	Image,
	ListView,
	ScrollView,
	BackAndroid,
	Dimensions,
	AsyncStorage
} = ReactNative;

var self = null;
var deviceSize = Dimensions.get('window');
var homeScreen = React.createClass({
	getInitialState(){
		self =this;
		var ds = new ListView.DataSource({
			rowHasChanged: (r1, r2)=> r1!==r2
		});				

		return {	
			isActive: false,
			editIsActivate: false,
			scanIsActivate: false,
			showModal: false,
			isCamera: false,
			dataSource: ds.cloneWithRows([])
		};
	},	

	componentDidMount: function(){

		this.items = [];
		this.cardinfo = null;		

		AsyncStorage.getItem("id", function(error: ?Error, userid: ?string){

			self.itemsRef = new Firebase("https://dibicard.firebaseio.com/" + userid + "/cards");
			
			self.itemsRef
			.on("child_added", function(dataSnapshot){				
				console.log(self.cardsnum);
				self.items.push({
					id: dataSnapshot.key(),
					card: dataSnapshot.val()
				});

				self.setState({
					dataSource: self.state.dataSource.cloneWithRows(self.items)
				});
			});

			self.cardinfoRef  = new Firebase("https://dibicard.firebaseio.com/" + userid + "/user");
			
			self.cardinfoRef
			.on("value", function(dataSnapshot){ 
				self.cardinfo  = dataSnapshot.val();	
				console.log(self.cardinfo);			
			});

		});				
	},	

	editPressIn: function(){
		this.setState({
			editIsActivate: true
		});
	},

	editPressOut: function(){
		this.setState({
			editIsActivate: false
		});
	},

	scanPressIn: function(){
		this.setState({
			scanIsActivate: true
		});
	},

	scanPressOut: function(){
		this.setState({
			scanIsActivate: false
		});
	},

	clickListItem: function(rowData){
		
	},

	barcodeReceived: function(result){
		this.setState({
			isCamera: false	
		});
		if(result){
			this.itemsRef.push({
				name: result.data,
				time: (new Date()).getTime()
			});
		}			
	},

	doScan: function(){	

		this.setState({
			isCamera: true
		});
	},

	showModal: function(){
		this.setState({
			showModal: true
		});
	},

	closeModal: function(){
		this.setState({
			showModal: false
		});
	},

	saveCardInfo: function(cardInfo){
		this.cardinfoRef.set(cardInfo);
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

	onPress: function(){
		console.log("cardList Item clicked");
		console.log(this.cardinfo);
		this.props.navigator.push({
			name: "card",
			cardinfo: this.cardinfo,
			cardname: this.items[this.cardinfo.index]		
		});
	},

	render: function(){		
		if(this.state.isCamera == false){
			return (			
				<View style={globalStyles.container}>
					<View style={globalStyles.headerContainer}>
						<Image source={require('../contents/images/toplogo.png')} style={globalStyles.toplogo}/>
					</View>	
					<ScrollView style={[globalStyles.mainContainer, styles.homeContainer]}>
						<TouchableWithoutFeedback
							onPressIn={this.pressIn} onPressOut={this.pressOut} onPress={this.onPress}>
							<View style={[styles.myCardContainer, this.state.isActive && styles.cardActiveItemContainer]}>
								<View style={styles.cardImage}></View>
								<View style={styles.cardInfoContainer}>
									<Text style={styles.cardName}>Card_Name</Text>
									<Text style={styles.cardLabel}>My Card</Text>
								</View>
								<View style={styles.editBtnContainer}>
									<TouchableWithoutFeedback  onPressIn={this.editPressIn} onPressOut={this.editPressOut} onPress={this.showModal}>
										 {
										 	this.state.editIsActivate?
										 	<Image source={require('../contents/images/edit_active.png')} style={styles.editBtn} />
										 	:
										 	<Image source={require('../contents/images/edit_normal.png')} style={styles.editBtn} />
										 }								 
									</TouchableWithoutFeedback>
								</View>
							</View>
						</TouchableWithoutFeedback>
						<View style={styles.listHeadContainer}>
							<View style={styles.headWrapper}>
								<Text style={styles.headText}>List Card</Text>
							</View>
						</View>
						<View style={styles.listContainer}>
							<ListView
								dataSource={this.state.dataSource}
								renderRow={(rowData)=><ListItem dataSource={rowData} onPress={()=>this.clickListItem(rowData)}/>}/>
						</View>									
					</ScrollView>
					<View style={styles.scanBtn}>
						<TouchableWithoutFeedback  onPress={this.doScan} onPressIn={this.scanPressIn} onPressOut={this.scanPressOut}>
							{this.state.scanIsActivate?
							<Image source={require('../contents/images/scan_active.png')} style={styles.scanImage}/>
							:
							<Image source={require('../contents/images/scan_normal.png')} style={styles.scanImage}/>
							}
						</TouchableWithoutFeedback>	
					</View>	
					{
						this.state.showModal?
						<ModalDlg visible={this.state.showModal} cardinfo={this.cardinfo} cards={this.items} onClose={this.closeModal}  onSave={this.saveCardInfo}/>	: null	
					}
				</View>			
			);		
		}else{
			return (				
				<View style={{flex: 1}}>
					<BarcodeScanner
				        onBarCodeRead={this.barcodeReceived}			       
				        style={{ width: deviceSize.width, height: deviceSize.height-85}}
				        torchMode={'off'}
				        cameraType={'back'} />
				    <View style={{flex: 1, backgroundColor: '#000000'}}></View>
		        </View>			    
			);
		}
	}
});

var styles = StyleSheet.create({
	homeContainer: {
		margin: 0		
	},

	myCardContainer: {
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
		fontFamily: "Hind-Regular",
		fontSize: 16,
		color: '#000000'
	},

	cardLabel: {
		fontFamily: "Hind-Regular",
		fontSize: 16
	},

	editBtnContainer: {
		width: 50,
		alignItems: 'center',
		justifyContent: 'center'
	},

	editBtn: {
		width: 20,
		height: 20
	},

	listHeadContainer: {
		marginTop: 20,
		paddingLeft: 85
	},

	headWrapper: {
		borderTopWidth: 1,
		borderTopColor: '#e8e8e8',
		paddingTop: 20,
		paddingBottom: 20,
	},

	headText: {
		fontFamily: 'Hind-Medium',
		fontSize: 14
	},

	listContainer: {
		
	},

	scanBtn: {
		position: 'absolute',
		right: 30,
		bottom: 30,
		width: 58,
		height: 58,
		elevation:10
	},

	scanImage: {
		width: 58,
		height: 58		
	}
});

module.exports = homeScreen;