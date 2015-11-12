// es5 and 6 polyfills, powered by babel
require("babel/polyfill")

let fetch = require('./fetcher')


var $ = require('jquery'),
	React = require('react'),
	Backbone = require('backbone'),
	Parse = require('parse')

// codes


console.log('js loaded')


import {SignUpView} from './signUpView.js'
import {LoginView} from './LoginView.js'
import {SubmitView} from './SubmitView.js'
import {ItemsView} from './ItemsView.js'





window.P = Parse

var APP_ID = 'YGWAe5zmSI80pR5PKp7RmDMcWdVDzl0MjVYBd8Cq',
	JS_KEY = 'wGX51lWB5WHnEhcThj1GrRBSTr3WEvYCp4KjvsIM',
	REST_API_KEY = 'W80u3FMnBDUZkla4hzXZZNxDOInsu2mUCuPqHN4g'


Parse.initialize(APP_ID,JS_KEY)

var PayItModel = Backbone.Model.extend({
	url: 'https://api.parse.com/1/classes/Item',

	parseHeaders: {
		"X-Parse-Application-Id": APP_ID,
        "X-Parse-REST-API-Key": REST_API_KEY
	}
})



var PayItCollection = Backbone.Collection.extend({
	url: 'https://api.parse.com/1/classes/Item',

	parseHeaders: {
		"X-Parse-Application-Id": APP_ID,
        "X-Parse-REST-API-Key": REST_API_KEY
	},

	// model: PayItModel,

	parse: function(responseData){
		console.log(responseData.results)
		return responseData.results
	}
})


// Router


var Router = Backbone.Router.extend({
	routes:{
		'login': 'showLoginView',
		'submit': 'showSubmitView',
		'items': 'showItemsView',
		'*path': 'showSignUpView'
	},

	logUserOut: function(){
		Parse.User.logOut().then(
			function(){
				location.hash = '*path'
			})
		this.pc.reset()
	},

	processUserInfo: function(username, password){
		//expecting: 
		//   username = 'xxxx' (a string for username)
		//   password = 'yyyy' ( a string for password)
		console.log('BB-Router : processUserInfo')
		console.log(username)
		console.log(password)

		var user = new Parse.User();

		user.set('username', username)
		user.set('password', password)


		user.signUp()
		// this is my success function
			.then(function(user){
				console.log('success!' + username + 'made their account')
				console.log(user)
				location.hash = 'submit'
				console.log(Parse.User.current())
			
			}).fail(function(error){
				console.log(error.message, "...now trying to login")
				return user.logIn()
			
				//success after signup OR login
			}).then(
				function(someDataProbablyUser){
					console.log('log in successful, apparently...')
					console.log(someDataProbablyUser)

				//failure after signup OR login
			}).fail(function(error){
					alert(error.message)
					alert('wrong combo, try again')
			})
	},

	showSignUpView: function(){
		React.render(<SignUpView processUserInfo={this.processUserInfo} />,
		 document.getElementById('container'))
	},

	showLoginView: function(){
		React.render(<LoginView sendUserInfo={this.processUserInfo} />,
		 document.getElementById('container'))
	},

	showSubmitView: function(){
		React.render(<SubmitView model={new PayItModel} logUserOut={this.logUserOut} />,
		 document.getElementById('container'))
	},

	showItemsView: function(){

		var Item = Parse.Object.extend("Item")
		var itemQuery = new Parse.Query(Item)	
		itemQuery.equalTo("claimed" , false)
		itemQuery.find()
			// success
			.then(function(items){
				console.log('items', items)
				React.render(<ItemsView items={items} logUserOut={this.logUserOut} />,
		 document.getElementById('container'))
			}).fail(function(err){
				console.log("there is something going on")
			})

		
	},

	initialize: function(){
		this.pc = new PayItCollection()
		if (!Parse.User.current()) {
			location.hash = ''
		}
	}
})

var R = new Router

Backbone.history.start()
