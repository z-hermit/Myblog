//react
import React, { Component } from "react";
//redux
import { connect } from 'react-redux'
//react router
import { Link } from 'react-router-dom';
//components
// import InfoTable from "../../components/info_table";
//actions
import {actions } from '../../redux/user';
//utils
import Utils from "../../utils/utils";
//image
// import Img from "../../images/omg.png"

//const 

class header extends Component {

  constructor(props) {
    super(props);
    console.log("header constructor");
  }

  componentDidUpdate() {
  }

  // shouldComponentUpdate(nextProps,nextState){
    
  // }

  render() {
    const { user } = this.props;
    console.log("header render");
    console.log(user);

    return user ? 
    <div className="header_loggedin">
      <div className="left">
        <Link to="/">Home</Link>
        <Link to="/explore_users">Explore</Link>
        <Link to="/create_post">New Post</Link>
        <Link to="/deactivate">Deactivate</Link>
      </div>
      <div className="right">
        <Link to="/edit_profile">Edit Profile</Link>
        <Link to={"/profile/" + user.id}>Profile</Link>
        <Link to="/logout" onClick={this.props.logout}>Logout</Link>
      </div>
    </div>
    :
    <div className="index_header">
      <div className="right">
        <Link to="/welcome">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  }
}

const mapStateToProps = state => {
  return {
    user:state.user
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(actions.logout())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(header);
