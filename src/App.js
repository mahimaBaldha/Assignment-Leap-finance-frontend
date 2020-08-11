import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';
import LoginForm from './components/LoginForm';
import UrlForm from './components/UrlInput';
import ViewDataForm from './components/ViewData';

class App extends Component {
  state = {
    url: '',
  };

  setUrl = (url) => this.setState(url);

  render() {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route path="/" exact>
              <LoginForm />
            </Route>

            <Route path="/url">
              <UrlForm setUrl={this.setUrl}/>
            </Route>

            <Route path="/viewData">
              <ViewDataForm url={this.state.url}/>
            </Route>

            <Route>
              <div>Page not found</div>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
