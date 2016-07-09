var React = require('react');
var ReactNative  = require('react-native');
var globalStyles = require('./common/style');
var Firebase = require('firebase');

var {
	StyleSheet,
	View,
	Text,
	TouchableWithoutFeedback,
	Image,
	ScrollView,
	Alert,
	AsyncStorage
} = ReactNative;

var FBSDK = require('react-native-fbsdk');
var {
	LoginManager,
	GraphRequest,
  	GraphRequestManager
} = FBSDK;

var GPSDK = require('react-native-google-signin');
var {
	GoogleSignin
} = GPSDK;

var self = null;



var doLogin = function(user, callback){
	var db = new Firebase("https://dibicard.firebaseio.com");
	db	
	.orderByKey()
	.equalTo(user.id)
	.once("value", function(dataSnapshot){
		var userData = dataSnapshot.val();

		if(userData != null){

			try{
				AsyncStorage.setItem("id", user.id);
				console.log(user.id);
			}	catch(err){
				console.log(err);
			}
			
			callback();
		}else{
			var newUser = db.child(user.id).set(
				{
					user: user, 
					cards: []
				}
			);			
			try{
				AsyncStorage.setItem("id", user.id);
			}catch(err){}
			callback();
		}
	});	
}

var LoginScreen = React.createClass({
	getInitialState(){
		self = this;
		return {
			fbIsActive: false,
			gpIsActive: false
		};
	},	

	fbPressIn: function(){
		this.setState({
			fbIsActive: true
		});
	},

	fbPressOut: function(){
		this.setState({
			fbIsActive: false
		});
	},

	gpPressIn: function(){
		this.setState({
			gpIsActive: true
		});
	},

	gpPressOut: function(){
		this.setState({
			gpIsActive: false
		});
	},	

	fbLogin: function(){		
		
		LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
		  function(result) {
		  	console.log(result);
		    if (result.isCancelled) {
		      
		    } else {				
				var infoRequest = new GraphRequest(
				  '/me',
				  null,
				  function(error: ?Object, result: ?Object){
				  	 var user = {
				  	 	name :  result.name,
				  	 	id: 'f' + result.id,
				  	 	business: result.name,
				  	 	email: " ",
				  	 	address: " ",
				  	 	mobile: " ",
				  	 	index: -1				  	 	
				  	 };
				  	 doLogin(user, function(ret){				  	 	  
				  	 	  self.props.navigator.push({
								name: "hello"
						  });
				  	 });
				  },
				);
				// Start the graph request.
				new GraphRequestManager().addRequest(infoRequest).start();

		    }
		  },
		  function(error) {
		    
		  }
		);			
	},

	gpLogin: function(){
		GoogleSignin.configure({
		  scopes: ["https://www.googleapis.com/auth/drive.readonly"]
		})
		.then(() => {
		   GoogleSignin.signIn()
			.then((user) => {
			  console.log(user);
			  var newUser = {
		  	 	name :  user.name,
		  	 	id: 'g' + user.id,
		  	 	business: user.name,
		  	 	email: user.email,
		  	 	address: " ",
		  	 	mobile: " ",
		  	 	index: -1		  	 	
		  	  };
			  doLogin(newUser, function(ret){		  	 	  
		  	 	  self.props.navigator.push({
						name: "hello"
				  });
		  	  });
			})
			.catch((err) => {
			  console.log('WRONG SIGNIN', err);				  	  
			})
			.done();
		});
	},

	render: function(){
		return (
			<View style={globalStyles.container}>
				<View style={globalStyles.headerContainer}>
					<Image source={require('../contents/images/toplogo.png')} style={globalStyles.toplogo}/>
				</View>	
				<View style={[globalStyles.mainContainer, styles.loginContainer]}>
					<Text style={styles.loginText}>LOG IN</Text>					
					<View style={styles.btnContainer}>
						<TouchableWithoutFeedback  onPressIn={this.fbPressIn} onPressOut={this.fbPressOut} onPress={this.fbLogin}>
							<View style={[styles.btn, styles.fbBtn, this.state.fbIsActive && styles.fbActivatedBtn]}>
								<View style={styles.btnIconContainer}>
									<View style={styles.btnIconBackground}></View>
									<Image source={require('../contents/images/fb.png')} style={styles.fbIcon}/>
								</View>
								<Text style={styles.btnText}>Facebook</Text>
							</View>
						</TouchableWithoutFeedback>
					</View>
					
					<View style={styles.seperateContainer}>
						<View style={styles.seperateWrapper}>
							<View style={styles.seperateLine}></View>
							<Text style={styles.seperateText}>or</Text>
							<View style={styles.seperateLine}></View>
						</View>					
					</View>

					<View style={styles.btnContainer}>
						<TouchableWithoutFeedback  onPressIn={this.gpPressIn} onPressOut={this.gpPressOut} onPress={this.gpLogin}>
							<View style={[styles.btn, styles.gpBtn, this.state.gpIsActive && styles.gpActivatedBtn]}>
								<View style={styles.btnIconContainer}>
									<View style={styles.btnIconBackground}></View>
									<Image source={require('../contents/images/gp.png')} style={styles.gpIcon}/>
								</View>
								<Text style={styles.btnText}>Google+</Text>
							</View>
						</TouchableWithoutFeedback>
					</View>
				</View>			
			</View>
			);
	}

});

var styles = StyleSheet.create({
	loginContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		paddingBottom: 50,
		backgroundColor: 'white'		
	},

	loginText: {
		textAlign: 'center',
		fontSize: 20,
		marginBottom: 40
	},

	btnContainer: {
		alignItems: 'center'
	},

	btn: {
		width: 260,
		paddingTop: 10,
		paddingBottom: 10,
		borderRadius: 3,
		elevation: 2	
	},

	btnText: {
		color: '#fefefe',
		fontSize: 18,
		textAlign: 'center',
		fontFamily: 'Hind-Bold'		
	},

	btnIconContainer: {
		position: 'absolute',
		left: 0,
		top: 0,
		width: 50,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center'
	},

	btnIconBackground: {
		position: 'absolute',
		left: 0,
		top: 0,
		width: 50,
		height: 50,
		backgroundColor: 'black',
		opacity: 0.1
	},

	fbIcon: {
		width: 18,
		height: 18
	},

	fbBtn: {
		backgroundColor: '#3b5998'
	},

	fbActivatedBtn: {
		backgroundColor: '#476dbe'
	},

	gpIcon: {
		width: 27,
		height: 17
	},

	gpBtn: {
		backgroundColor: '#df4a32'
	},

	gpActivatedBtn: {
		backgroundColor: '#ef5941'
	},

	seperateContainer: {
		alignItems: 'center'
	},

	seperateWrapper: {
		width: 260,
		flexDirection: 'row'
	},

	seperateLine: {
		width: 105,
		height: 1,
		marginBottom: 20,
		marginTop: 20,
		backgroundColor: '#dcdcdc'
	},

	seperateText: {
		textAlign: 'center',
		width:  50,
		flex: 1,		
		textAlignVertical: 'center',
		fontSize: 16
	}

});

module.exports = LoginScreen;