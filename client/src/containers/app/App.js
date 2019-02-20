import React, { Component } from 'react';
//css
// import './App.css';

import { connect } from 'react-redux'

import Header from "../header/header"
import Welcome from "../welcome/welcome"
import Login from "../login/login"
import Signup from "../signup/signup"
import Home from "../home/home"
import CreatePost from "../create_post/create_post"
import EditProfile from "../edit_profile/edit_profile"
import Profile from "../profile/profile"

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

class App extends Component {
  render() {
    const { user } = this.props;
    let loginSwitch;
    if (user) {
      loginSwitch = 
      <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/create_post" component={CreatePost}/>
              <Route exact path="/edit_profile/" component={EditProfile}/>
              <Route exact path="/profile/:id" component={Profile}/>
              <Redirect to="/" />
            </Switch>
    } else {
      loginSwitch = 
      <Switch>
              <Route exact path="/welcome" component={Welcome}/>
              <Route exact path="/login/" component={Login}/>
              <Route exact path="/signup/" component={Signup}/>
              <Redirect to="/welcome/" />
            </Switch>
    }
    return (
      <Router>
        <div>
          <Header />
          <div style={{paddingTop:90}}>
            {loginSwitch}
          </div>
        </div>
      </Router>
    );
  }
}


const mapStateToProps = state => {
  return {
    user:state.user
  }
}

const mapDispatchToProps = dispatch => ({
  // requestData: (index, scene, packageName) => dispatch(detailActions.requestData(index, scene, packageName, "inUse"))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
