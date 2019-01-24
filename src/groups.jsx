import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './groups.css';

class Groups extends Component {
	constructor(props) {
		super(props)
		this.state = {
			requested_group: '', 
			groups: [], 
			group_name: '',
			token: ''
		};
	}

	componentDidMount() {
		// fetch('https://api.groupme.com/v3/groups?token=IpAUHS7nlZuO2Qkc4GJpn9hPXrh0yngsTtD20igo', {'credentials': 'same-origin'})
		// .then(response => {
		//     if (!response.ok) throw Error(response.statusText);
		//     return response.json();
		// })
		// .then(data => {
		//     this.setState ({
		//         groups: data.response
		//     })
		// })
		// .catch(error => console.log(error));
	}

	handleTokenSubmit = (e) => {
		e.preventDefault();

		let url = 'https://api.groupme.com/v3/groups?per_page=20&token=' + this.state.token;

		fetch(url, {'credentials': 'same-origin'})
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

	handleSubmit = (e) => {
		e.preventDefault();
		this.setState(prevState => ({requested_group: prevState.group_name}));
	}

	handleChange = (e) => {
		let target_token = e.target.value; 
		this.setState(prevState => ({ 
			groups: prevState.groups,
			token: target_token
		}));
	}

	render() {
		let groups = null;
		let group_form = null
		if (this.state.groups.length === 0)
		{
			groups = <div className='description'>no groups, very sad</div>
			group_form = <div hidden>nothing to see here</div>
		}
		else
		{
			groups = this.state.groups.map(data => {
				console.log(data)
				return (
					<div onClick={() => this.props.onSelectGroup(data.group_id)}>
						 {data.name}
						 {/* if group.isActive, render message component, pass in groupid, accesstoken, guid */}
					</div>
					);
			});

			// group_form =  <form>
			//             <label>More?
			//             <input type='text' /> 
			//             </label>
			//             <input type='submit' value='submit' />
			//         </form>

			group_form = <label>want more?<button>yes</button></label>



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
			 <table className='table'>{groups}</table>
			 <div>{group_form}</div>
			 {/* <p>requested group: {this.state.requested_group}</p> */}
			</div>
		)
	}
}

Groups.propTypes = {
	accessToken: PropTypes.string.isRequired,
	onSelectGroup: PropTypes.func.isRequired
}

export default Groups