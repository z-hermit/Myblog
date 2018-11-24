import React, { Component } from 'react';
// import './App.css';

import Header from "../header/header"

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
              <Route exact path="/sceneperformance/" component={Home}/>
              <Route path="/sceneperformance/detail/:detail" component={ScenePage}/>
              <Redirect to="/sceneperformance/" />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
