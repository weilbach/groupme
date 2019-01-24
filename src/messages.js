import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './messages.css';
import Groups from './groups'

class Messages extends Component {
	constructor(props) {
		super(props)
		this.state = { 
			groups: Groups.state.groups, 
			token: Groups.state.token
		};
		this.sendMessage = this.sendMessage.bind(this)
	}


	sendMessage(e) {
			
		let message = e.target.value;
		let guid = Math.random();
		let url = 'https://api.groupme.com/v3/groups/group_id/messages?token=' + this.state.token + '&' + guid + '&' + message;
		

		fetch(url, { method: 'POST',
			'credentials': 'same-origin'})
		.then(response => {
			if (!response.ok) throw Error(response.statusText);
			return response.json();
		})
		.then(data => {
			this.setState ({
				groups: data.response
			})
		})
		.catch(error => console.log(error));
	}

	render() {
		let options = null;
		let another = null
		if (this.state.groups.length === 0)
		{
			options = <div>you thought</div>
			//group_form = <div hidden>nothing to see here</div>
		}
		else
		{
			//this already exists in the group component, how to not have it here and 
			//just add buttons to click on a group to then send a message
			
			options = this.state.groups.map(data => {
				return (
					<div>
						 {data.name}
					</div>
					);
			});

			another = <label>want to send another?<button>yes</button></label>

		}
		
		return (
			<div className='groups'>
			 <h4>GROUPS</h4>
			 <form onSubmit={this.handleTokenSubmit}>
				<label>token
				<input type='text' name='group' value={this.state.token} onChange={this.handleChange}/>
				</label>
				<input type='submit' name='submit'/>
			 </form>
			 <br/>
			 <table className='table'>{options}</table>
			 {/* <div>{group_form}</div> */}
			 {/* <p>requested group: {this.state.requested_group}</p> */}
			</div>
		)
	}

}

Messages.propTypes = {
	groupId: PropTypes.string.isRequired,
	accessToken: PropTypes.string.isRequired,
	guid: PropTypes.string.isRequired,
	onSubmit: PropTypes.func.isRequired
}

export default Messages;