var React = require('react')
var Parse = require('parse')
var swal = require('sweetalert')




var Dib = React.createClass({




	// _genCode: function(){
	// 	var randomStr = function(){
	// 		var chars = "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
	// 		var stringLength = 9
	// 		var uniqueCode = ''

	// 		for(var i = 0; i > stringLength; i++){
	// 			uniqueCode = Math.floor(Math.random() * chars.length);
	// 			// uniqueCode += chars.substring(rnum, rnum + 1);

	// 		return uniqueCode
	// 		console.log(uniqueCode)

	// 		}

	// 	}
	// },



	_claimItem: function(){
			var self = this
			var claimeeName = this.refs.claimee.getDOMNode().innerHTML
				
		
			this.props.model.set('claimee', claimeeName)
			this.props.model.set('claimed', true)
			window.m=this.props.model
			window.Dibs = this

			var setHeader = function(xhr){
				xhr.setRequestHeader("X-Parse-Application-Id", 'YGWAe5zmSI80pR5PKp7RmDMcWdVDzl0MjVYBd8Cq')
				xhr.setRequestHeader("X-Parse-REST-API-Key", 'W80u3FMnBDUZkla4hzXZZNxDOInsu2mUCuPqHN4g')
			}

			this.props.model.save(null , {beforeSend:setHeader}).then(function(savedModel){
				console.log('successful response from the server')
				console.log(savedModel.attributes)

				//
				// remove text from content editable.
				// 
				self.refs.claimee.value = ''
				//
				// notify appropriate react component that contains the list/array to rerender.
				// 
				self.props.notifyParent(savedModel)

			}).fail(function(){
				console.log('failure')
			})

			swal("That's it! You've Called Dibs", "The secret code is " + this.props.model.get('coupon'), "success")

			// window.M = this.props.model
			
			
			// var disappear = setInterval(myTimer, 500),

			// 	myTimer = function(){
			// 		alert("you got alert working")
			// 		// document.getElementByClassName("items").innerHTML = "p"
			// 	}


		},


	render: function(){
		return(
			<div>
				<input className="claimInput" type="text" className="claimInput" placeholder={this.props.model.get("claimee")||"Who's claiming?"} ref="claimee"/>
				
				
				<input type="button" value="Call Dibs" id="callDibs" onClick={this._claimItem}/>
			</div>
			)
	}
})

var ItemsView = React.createClass({

		// componentDidMount: function(){
		// 	var itemsCollec = this.props.collection



		// 	itemsCollec.fetch({
		// 		headers: itemsCollec.parseHeaders,
		// 		success: function(items){
		// 			console.log(items)
		// 			},
		// 		error: function(items, err){
		// 			console.log(err)
		// 			}
		// 	})
		// 	console.log('componentDidMount did actually run')	
		// },
		



		// _makeItemPoof: function(){
		// 	var it = document.getElementByClassName("items")
		// 	it.removeChild(firstChild)
		// },

		


	
	getInitialState: function(){
		console.log(this.props)
		return {
			currentItems: this.props.items //an array of items from db
		}
	},

	_updateDibList: function(dibbedModel){
		console.log('parent notified!!1!11!!')
		console.log('dibbed model from parent--->>> !!')
		console.log(dibbedModel)

		var filteredList = this.state.currentItems.filter(function(item,index){	
			//filter explanation
				// if (item.id === dibbedModel.id){
				  
				//   dibbedModel = "yes"
				//   return false // not on the filtered list
				
				// } else{
				  
				//   dibbedModel = "no"
				//   return true  //yes on the filtered list
				// }
			return item.id !== dibbedModel.id 
		})


		this.setState({
			currentItems: filteredList
		})
	},

	_backToSubmit: function(){
		location.hash = 'submit'
	},


	_renderItems: function(){
		var self = this
		return this.state.currentItems.reverse().map(function(item){
			return 	<div className="items">
						<p>Restaurant: {item.get("donator")}</p>

						<p>Item: {item.get("item")}</p>

						<a className="googleMaps" href= {"https://google.com/maps/place/" + item.get("location")} target="_blank" >Location:
							 {item.get("location")} </a>
						<Dib {...{model:item, notifyParent: self._updateDibList} } />
						
					</div>
		})
	},



	render: function(){


		return(
			<div className='ItemsView'>
				<h3>Dibs</h3>
				<h1>Restaurants and Their Offers</h1>
				<div>
					{this._renderItems()}
				</div>
				<input type="button" value="Make another submission" id="backToSubmit" onClick={this._backToSubmit} />


			</div>
			)
	}
})






export {ItemsView}