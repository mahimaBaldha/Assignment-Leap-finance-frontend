import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import './index.css';
import constants from '../../utils/constants';

const LOGIN_URL = `${constants.BASE_URL}/login`;

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errorMessage: '',
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleLogin = (e) => {
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    if (username !== '' && password !== '') {
      this.setState({errorMessage: ''})
      try {
        axios.post(`${LOGIN_URL}`, { id: username, password }).then((res) => {
          console.log(res);
          if (res.data.message === 'success') {
            localStorage.setItem('token', res.data.data.token);
            this.props.history.push('/url');
          } else {
            this.setState({ errorMessage: 'Invalid credentials' });
            console.log('1111');
          }
        });
      } catch (error) {
        this.setState({ errorMessage: 'Invalid credentials' });
        console.error('Something went wrong');
      }
    } else {
      this.setState({errorMessage: 'Please enter valid username and password'})
      console.log('2222222');
    }
  };
  render() {
    return (
      <div className="login-container">
        <form className="login-form">
          <div className="login-title">
            <span>Login Here</span>
            <hr />
          </div>

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={this.state.username}
            placeholder="Username"
            className="input-text"
            onChange={this.onChange}
          ></input>

          <input
            type="password"
            name="password"
            placeholder="password"
            value={this.state.password}
            placeholder="Password"
            className="input-text"
            onChange={this.onChange}
          ></input>

          <input
            type="submit"
            placeholder="submit"
            value="Submit"
            className="input-text submit-btn"
            onClick={this.handleLogin}
          ></input>
          <div className="error-message">{this.state.errorMessage}</div>
        </form>
      </div>
    );
  }
}
export default withRouter(LoginForm);
