import React, { Component } from 'react';

class Groups extends Component {
    constructor(props) {
        super(props)
        this.state = {
            requested_group: '', 
            groups: [], 
            group_name: '',
            token: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleTokenSubmit = this.handleTokenSubmit.bind(this)
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

    handleTokenSubmit(e) {
        e.preventDefault();

        let url = 'https://api.groupme.com/v3/groups?token=' + this.state.token;

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

    handleSubmit(e) {
        e.preventDefault();
        this.setState(prevState => ({requested_group: prevState.group_name}));
    }

    handleChange(e) {
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
            groups = <div>no groups, very sad</div>
            group_form = <div hidden>nothing to see here</div>
        }
        else
        {
            groups = this.state.groups.map(data => {
                return (
                    <div>
                         {data.name}
                    </div>
                    );
            });


        }
        
        return (
            <div>
             <h4>GROUPS</h4>
             <form onSubmit={this.handleTokenSubmit}>
                <label>token
                <input type='text' name='group' value={this.state.token} onChange={this.handleChange}/>
                </label>
                <input type='submit' name='submit'/>
             </form>
             <br/>
             <table>{groups}</table>
             <div>{group_form}</div>
             {/* <p>requested group: {this.state.requested_group}</p> */}
            </div>
        )
    }
}

export default Groups