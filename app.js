var React = require('react');
var ReactNative =  require('react-native');

var {
	BackAndroid,
	Navigator,
	StyleSheet
} = ReactNative;


var _navigation;
var _route;

BackAndroid.addEventListener('hardwareBackPress', ()=> {

	if(_navigation && _navigation.getCurrentRoutes().length > 1){	
		if(_route.name == "home" || _route.name == "login"){
			return false;
		}else{
			_navigation.pop();
			return true;
		}		
	}
	return false;
});

var onBack = function(){
	if(_navigation && _navigation.getCurrentRoutes().length > 1){		
		_navigation.pop();
		return true;
	}
	return false;
}

var SplashSCreen = require('./src/splash');
var LoginScreen = require('./src/login');
var HelloScreen = require('./src/hello');
var HomeScreen = require('./src/home');
var CardScreen = require('./src/card');

var renderScreen = function(route, navigationOperations){
	_navigation = navigationOperations;
	_route = route;
	
	switch(route.name){
		case "splash":
			return (
				<SplashSCreen navigator={navigationOperations}/>
				);
			break;
		case "login":
			return (
				<LoginScreen navigator={navigationOperations}/>
			);
			break;
		case "hello":
			return (
				<HelloScreen navigator={navigationOperations}/>
				);
			break;
		case "home":
			return (
				<HomeScreen navigator={navigationOperations}/>
				);
			break;
		case "card":
			return (
				<CardScreen navigator={navigationOperations} cardname={route.cardname} cardinfo={route.cardinfo} onBack={onBack}/>
				);
			break;
	}
}

var App = React.createClass({
	componentDidMount: function(){

	},

	render: function(){
		var initialRoute = {
			name: 'splash'
		};

		return (
			<Navigator
				style={styles.container}
				initialRoute={initialRoute}
				configurationScene={()=> Navigator.SceneConfig.FadeAndoid}
				renderScene={renderScreen} />
			);
	}
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	}
});

module.exports = App;