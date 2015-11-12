var React = require('react')
var Backbone = require('backbone')





var SubmitView = React.createClass({



	_takeMeStraightToItems: function(){
		location.hash = 'items'
	},

	_saveToDataBase: function(){
		var donatorName = this.refs.donatorInput.value,
			itemName = this.refs.itemInput.value,
			locationName = this.refs.locationInput.value,
			couponCode = this.refs.couponCode.value
		



		console.log(donatorName)
		console.log(itemName)
		console.log(locationName)
		console.log(couponCode)
		console.log(this)

		this.props.model.set('donator', donatorName)
		this.props.model.set('item', itemName)
		this.props.model.set('location', locationName)
		this.props.model.set('coupon', couponCode)
		this.props.model.set('claimed', false)

		var setHeader = function(xhr){
			xhr.setRequestHeader("X-Parse-Application-Id", 'YGWAe5zmSI80pR5PKp7RmDMcWdVDzl0MjVYBd8Cq')
			xhr.setRequestHeader("X-Parse-REST-API-Key", 'W80u3FMnBDUZkla4hzXZZNxDOInsu2mUCuPqHN4g')
		}



		this.props.model.save(null,{beforeSend:setHeader})




		// once items are stored in data base, take them to the items view
		
		location.hash = 'items'

	},


	render: function(){
		return(
			<div id="SubmitView">
				<h3>Dibs</h3>
				<h1>Submit Item</h1>
				<input type="text" ref="donatorInput" name="donator" maxLength="25" placeholder="Restaurant's Name"/>
				<input type="text" ref="itemInput" name="food" maxLength="25" placeholder="What is being offered?" />
				<input type="text" ref="locationInput" name='location' maxLength="25" placeholder='Where can it be picked up?' />
				<input type="text" ref="couponCode" name="coupon" maxLength="25" placeholder="What's the secret code?" />
				<input type='button' onClick={this._saveToDataBase} value='Submit' id='submit' />
				<input type="button" value="Log Out" onClick={this.props.logUserOut} />

				<p>Or</p>

				<input type="button" value="Take me to Items" onClick={this._takeMeStraightToItems} />

			</div>	
			)
	}
})



export {SubmitView}