import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import './index.css';
import constants from '../../utils/constants';

const URL_POST = `${constants.BASE_URL}/isAuthenticatedUser`;

class UrlInputForm extends Component {
  state = {
    url: '',
    receivedData: '',
    errorMessage: '',
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleUrlSubmit = (e) => {
    e.preventDefault();

    const url = this.state.url;

    if (url !== '') {
      this.setState({ errorMessage: '' });
      const config = {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      };
      try {
        axios.post(`${URL_POST}`, {}, config).then((res) => {
          console.log(res.data.data);
          if (!res.data.data) {
            this.props.history.push('/');
          } else {
            this.props.setUrl({ url });
            this.props.history.push('/viewData');
          }
        });
      } catch (error) {
        console.error('Something went wrong');
      }
    } else {
      this.setState({ errorMessage: 'Please enter url' });
    }
  };
  render() {
    return (
      <div className="login-container">
        <form className="login-form">
          <div className="login-title">
            <span><strong>Enter URL Here</strong></span>
          </div>

          <input
            type="text"
            name="url"
            value={this.state.url}
            placeholder="URL"
            className="input-text"
            onChange={this.onChange}
          ></input>

          <input
            type="submit"
            placeholder="submit"
            value="Submit"
            className="input-text submit-btn"
            onClick={this.handleUrlSubmit}
          ></input>
        </form>
        <div className="error-message">{this.state.errorMessage}</div>
      </div>
    );
  }
}
export default withRouter(UrlInputForm);
