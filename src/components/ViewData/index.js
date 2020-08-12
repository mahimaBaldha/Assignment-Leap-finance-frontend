import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import './index.css';
import constants from '../../utils/constants';

const ADD_RESPONSE_URL = `${constants.BASE_URL}/addResponse`;
const IS_JSON = "application/json; charset=utf-8";
// const IS_TEXT_HTML = "text/html; charset=UTF-8";

class ViewData extends Component {
  state = {
    urlResponse: '',
  };

  handleLogout = () => {
    localStorage.removeItem('token');
    this.props.history.push('/');
  };

  componentDidMount() {
    const config = {
      headers: {
        'Access-Control-Allow-Origin':"*",
        'x-auth-token': localStorage.getItem('token'),
      },
    };

    try {
      if (this.props.url) {
        axios.get(this.props.url).then((res) => {
          let answer = res.data;
          this.setState({ urlResponse: res.data });

          if(res.headers["content-type"] === IS_JSON)
             answer = JSON.stringify(JSON.stringify(res.data));

          axios.post(
            `${ADD_RESPONSE_URL}`,
            { question: this.props.url, answer: answer },
            config
          );
        });
      } else {
        this.props.history.push('/url');
      }
    } catch (error) {
      this.setState({ urlResponse: 'Unable to get data' });
    }
  }

  render() {
    return (
      <div className="response-container">
        <div className="urlResponse"><h1>URL Response</h1></div>
        <hr/>
        <div className="response-box">{JSON.stringify(this.state.urlResponse)}</div>
        <div className="viewdata-button">
          <button onClick={this.handleLogout} className="btn"><strong>Log Out</strong></button>
        </div>
      </div>
    );
  }
}
export default withRouter(ViewData);
