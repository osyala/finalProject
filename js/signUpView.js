var React = require('react')


var SignUpView = React.createClass({

	componentDidMount: function(){
		this.userAccount = {
			username: null,
			password: null
		}
	},

	_saveToParse: function(){
		this.userAccount.save()
	},


	_storeUserName: function(event){	
		var attr = event.target.name,
			value = event.target.value
		this.userAccount[attr] = value
		console.log(this.userAccount)

	},


	_getUserData: function(){
		var usrnm = this.userAccount.username
		var pass = this.userAccount.password

		console.log(this.userAccount)
		this.props.processUserInfo(usrnm, pass)
		// take them to the submit view
		location.hash = 'submit'
	},


	render: function(){
		return(

			<div className='SignUpView'>
			
				<h1 className="SignUp">Dibs</h1>

				<div className="hr"></div>
				<p className="intro">Dibs is a simple way to advertise and promote your restaurant with unique deals and freebies for your community</p>
			<div id='SignUpView'>
			
				<h1 className="SignUp">Dibs</h1>

				<input  type='text' 
						onBlur={this._storeUserName} 
						name='username' 
						placeholder='Username' />

				<input  type='password' 
						onBlur={this._storeUserName} 
						name='password' 
						placeholder='Password' />

				<input  type='button' 
						onClick={this._getUserData}
						value='Sign Up' 
						id='signup' />
				<input type='button'
						onClick={this._getUserData}
						value='Login'
						id='login' />
			</div>
			)
	}
})

export {SignUpView}