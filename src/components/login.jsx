import React from 'react';
import './login.css';
import { baseurl } from '../url';
import { connect } from 'react-redux';

const axios = require('axios');

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: '',
        }
    }
    
    change = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    }
        
    componentDidMount() {
        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');
        if (username && password) {
            this.setState({
                username: username,
                password: password
            }, () => {
                this.handleSuccess()
            })
        }
    }

    handleSuccess = (e) => {
        localStorage.setItem('username', this.state.username);
        localStorage.setItem('password', this.state.password);
        this.props.rename(this.state.username);
        this.props.changelog(true);
        this.props.history.push('/');
    }

    handleLogin = (e) => {
        e.preventDefault()
        const username = this.state.username;
        const password = this.state.password;
        axios.post(`${baseurl}/auth`, {
            username: username,
            password: password
        })
        .then((res) => {
            console.log(res.data);
            if (res.data) {
                this.handleSuccess();
            } else {
                this.setState({
                    error: "FAILED TO AUTHENTICATE"
                })
                .then(() => {
                    console.log(this.state.error)
                })
            }
        })
        .catch((err) => {
            this.setState({
                error: "AUTHENTICATION ERROR"
            })
        })
    }

    render() {
        return(
            <div className="form">
                <h1>Gotta Go Faster</h1>
                <form onSubmit={this.handleLogin}>
                    <div className="container">
                        <label>
                            <input 
                            autoFocus
                            type="text" 
                            placeholder="Username" 
                            name="username" 
                            value={this.state.username} 
                            onChange={this.change}
                            required/>
                        </label>

                        <label>
                            <input 
                            type="password" 
                            placeholder="Password" 
                            name="password"
                            value={this.state.password}
                            onChange={this.change} 
                            required/>
                        </label>

                        <button type="submit" className="submit">Chat</button>

                        <h2>{this.state.error}</h2>
                    </div>
                </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
