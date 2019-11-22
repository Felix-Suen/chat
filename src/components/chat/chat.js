import React from 'react';
import { connect } from 'react-redux';
import './chat.css';
import Popup from './popup';
import { baseurl } from '../../url';
const axios = require('axios');

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        popup: false,
        text: '',
        list: []
    }
  }

    handleLoadMessages = () => {
        axios.get(`${baseurl}/read`)
            .then((res) => {
                this.setState({
                    list: res.data
                }, () => {
                    console.log(this.state.list)
                })
            })
    }


    componentDidMount() {
        this.handleLoadMessages()
    }

  handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
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
        if (e.key === "Enter") {
            this.handleAdd()
        }
    }

    handleAdd = () => {
        axios.post(`${baseurl}/add`, {
            'sender': this.props.user,
            'message': this.state.text,
            'time': Date.now()
        })
            .then((res) => {
                console.log(res.data)
                this.setState({
                    'list': res.data,
                    'text': ''
                })
        })
    }

  render() {
    if (!this.props.islogged) {
      this.props.history.push('/login');
    }
    return(
      <div className="all">
          <div className="navbar">
              <ul>
                <li className="user"><button className="nav" onClick={this.handlePopup}>DU HELLO {this.props.user.toUpperCase()}</button></li>
                <li><button className="nav" onClick={() => this.props.history.push('/pwgen')}>Gen Password</button></li>
                <li><a href='https://github.com/al-jshen/chat' target="_blank" rel="noopener noreferrer">Source Code</a></li>
                <li><button className="nav" onClick={this.handleLogout}>Log Out</button></li>
              </ul>
          </div>

              {this.state.popup ? <div><Popup/></div> : null}

          <div className="main">
              <div className="chatDisplayBox">
                  {this.state.list.map((item, index) => {
                      return (
                        <div key={index} className="textDisplayBox">
                            <div className="text">
                                <p>{item.sender}: {item.message}</p>
                            </div>
                        </div>
                      )
                  })}
              </div>

              <div className="chatInputBox">
                    <input className="inputText" type="text" autoFocus value={this.state.text} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
                    <button className="send" onClick={this.handleAdd}>Send</button>
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
