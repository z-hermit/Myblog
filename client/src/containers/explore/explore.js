//react
import React, { Component } from "react";
//redux
import { connect } from 'react-redux'
//react router
import { Link } from 'react-router-dom';
//components
import Nothing from "../../components/nothing";
import End from "../../components/end";

//actions
// import {actions as listActions} from '../../redux/';
//utils
import Utils from "../../utils/utils";

import Axios from "axios";

//const 

class explore extends Component {

  constructor(props) {
    super(props);
    console.log("explore constructor");
    this.state = {
      users:[]
    }
  }

  componentDidMount() {
    let url = "/explore";
    Axios({
        method: "GET",
        url: url,
        data: {}
      })
      .then(response => {
        this.setState({
          users:response.data.data.users
        })
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { users } = this.state;
    console.log("explore render");
    console.log(users)
    return (
      <div className="notes_wrapper">
        <div className="explore">

          <div className="explores">
            {
              users.map(user => (
                <div className="explores_list">
                  <div className="exl_main">
                    <img src="/users/{user.avatar}/avatar.png" alt="" srcSet=""/>
                    <div className="exl_content">
                      <span className="exl_username">{user.name}</span>
                      <div className="exl_desc">
                        <span className="exl_email">{user.email}</span>
                        <span className="exl_desc_sep">•</span>
                        <span className="exl_followers">{user.followerCount} Followers</span>
                      </div>
                    </div>
                  </div>
                  <div className="exl_ff">
                    <a href="/profile/{user.id}" className="pri_btn">Profile</a>
                  </div>
                </div>
              ))
            }

            {
              users.length > 0 ? <Nothing /> : <End />
            }

          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // detailData:state.detailData[],
  }
}

const mapDispatchToProps = dispatch => ({
  // requestData: (index, scene, packageName) => dispatch(detailActions.requestData(index, scene, packageName, "inUse"))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(explore);

