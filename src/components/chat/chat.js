import React from 'react';
import { connect } from 'react-redux';
import './chat.css';
import Popup from './popup';

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        popup: false,
        text: '',
        list: []
    }
  }

  handleLogout = () => {
    this.props.rename('');
    this.props.changelog(false);
    this.props.history.push('/login');
  }

  handlePopup = () => {
    this.setState({
      popup: !this.state.popup,
    });
  }

    handleChange = (e) => {
        this.setState({
            'text': e.target.value
        })
    }

    handleKeyPress = (e) => {
        if (e.key == "Enter") {
            this.handleAdd()
        }
    }

    handleAdd = () => {
        this.setState({
            'list': [...this.state.list, this.state.text],
            'text': ''
        })
    }

  render() {
    if (!this.props.islogged) {
      this.props.history.push('/login');
    }
    return(
      <div>
        <div>
          <ul>
            <li className="user"><button className="nav" onClick={this.handlePopup}>DU HELLO {this.props.user.toUpperCase()}</button></li>
            <li><button className="nav" onClick={() => this.props.history.push('/pwgen')}>Gen Password</button></li>
            <li><a href='https://github.com/al-jshen/chat' target="_blank" rel="noopener noreferrer">Source Code</a></li>
            <li><button className="nav" onClick={this.handleLogout}>Log Out</button></li>
          </ul>
        </div>
        {this.state.popup ? <div><Popup/></div> : null}

          <div>
              <div className="chatDisplayBox">
                  {this.state.list.map((item, index) => {
                      return (
                        <div key={index}>{item}</div>
                      )
                  })}
              </div>

              <div className="chatInputBox">
                    <input type="text" value={this.state.text} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
                    <button onClick={this.handleAdd}>Add whatever to list</button>
              </div>
          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      user: state.user,
      islogged: state.islogged
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      rename: (user) => { dispatch({type: 'USERNAME', payload: user}) },
      changelog: (islogged) => { dispatch({type: 'LOGIN', payload: islogged} )}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
