//react
import React, { Component } from "react";
//redux
import { connect } from 'react-redux'
//react router
import { Link } from 'react-router-dom';
//components
// import InfoTable from "../../components/info_table";
//actions
// import {actions as listActions} from '../../redux/';
//utils
import Utils from "../../util/utils";
//image
// import Img from "../../images/omg.png"
//const 

class header extends Component {

  constructor(props) {
    super(props);
    console.log("header constructor");
  }

  componentDidUpdate() {
    super();
  }

  // shouldComponentUpdate(nextProps,nextState){
    
  // }

  render() {
    const { detailData } = this.props;
    console.log("header render");

    return this.props.login ? 
    <div class="header_loggedin">
      <div class="left">
        <a href="/">Home</a>
        <a href="/explore">Explore</a>
        <a href="/create_post">New Post</a>
        <a href="/deactivate">Deactivate</a>
      </div>
      <div class="right">
        <a href="/edit_profile">Edit Profile</a>
        <a href="/profile/{{ .session.id }}">Profile</a>
        <a href="/logout">Logout</a>
      </div>
    </div>
    :
    <div class="index_header">
      <div class="right">
        <a href="/welcome">Home</a>
        <a href="/login">Login</a>
        <a href="/signup">Signup</a>
      </div>
    </div>
  }
}

const mapStateToProps = state => {
  return {
    login:state.pageState.login,
  }
}

const mapDispatchToProps = dispatch => ({
  // requestData: (index, scene, packageName) => dispatch(detailActions.requestData(index, scene, packageName, "inUse"))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(header);
