import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Groups from './groups.jsx'
//import Messages from './messages'
import * as serviceWorker from './serviceWorker';

class IndexPage extends React.Component {
    state = { 
        tokenId: null,
        groupId: null,
    }

    selectGroup = (id) => {
        this.setState({
            groupId: id,
        });
    }

    render() {

        console.log(this.state)

        return (
            <div>
                { this.state.tokenId ? <Groups onSelectGroup={this.selectGroup} />:<Groups onSelectGroup={this.selectGroup} /> }
            </div>
        )
    }
}

ReactDOM.render(<IndexPage />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
