var React = require('react')






var SubmitView = React.createClass({


	render: function(){
		return(
			<div id="SubmitView">
				<h1>Submit Item</h1>
				<a ref ='logout'> log out</a> 
				<input type="text" name="donator" placeholder="Who is donating?"/>
				<input type="text" name="food" placeholder="What is being donated?" />
				<input type="text" name='location' placeholder='Where can it be picked up?' />
				<input type='button' value='Submit' id='submit' />
			</div>	
			)
	}
})



export {SubmitView}