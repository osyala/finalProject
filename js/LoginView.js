var React = require('react')


var LoginView = React.createClass({

	componentDidMount:function(){
		this.userAccount={
			username:null,
			password:null
		}
	},



	_getLoginParams: function(event){

		if(event.which === 13){ 
			var password = event.target.value,
				username = this.refs.usernameInput.getDOMNode().value
			this.props.sendUserInfo(username, password)
		}

	},
	// _getUserData: function(){
	// 	// assemble the username and password, store in variables
	// 	// 
	// 	// create a new parse user object, set the username and password, and save the user object
	// 	// 
	// 	var usr = new Parse.User()
	// 	usr.set(//username)
	// 	usr.set(//password)
	// 	usr.signUp()
	// },

	_storeUserName: function(event){
		var name =event.target.name,
		value=event.target.value
		this.userAccount[name]=value;
		console.log(this.userAccount)

	},

	render: function(){
		return(
			<div id="LoginView">
				<h1>Login to give</h1>
				<input type="text" onBlur={this._storeUserName} name="username" placeholder='Username' />
				<input type="password" onBlur={this._storeUserName} name='password' placeholder='Password' />
				<input type='button' onClick={this._getUserData} value='Login' id='add' />
			</div>
			)
	}
})

// var LoginBox = React.createClass({

// 	render: function(){
// 		return(){
// 			// <div id='loginbox'> 
// 		}
// 	}
// })

export {LoginView}