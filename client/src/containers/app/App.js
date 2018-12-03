import React, { Component } from 'react';
//css
// import './App.css';

import Header from "../header/header"
import Welcome from "../welcome/welcome"
import Login from "../login/login"
import Signup from "../signup/signup"

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <div style={{paddingTop:90}}>
            <Switch>
              <Route exact path="/welcome/" component={Welcome}/>
              <Route exact path="/login/" component={Login}/>
              <Route exact path="/signup/" component={Signup}/>
              <Redirect to="/welcome/" />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
