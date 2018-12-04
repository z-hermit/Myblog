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

//const 

class explore extends Component {

  constructor(props) {
    super(props);
    console.log("explore constructor");
  }

  componentDidUpdate() {
  }

  render() {
    const { users } = this.props;
    console.log("explore render");

    return (
      <div class="notes_wrapper">
        <div class="explore">

          <div class="explores">
            {
              users.map(user => {
                <div class="explores_list">
                  <div class="exl_main">
                    <img src="/users/{user.avatar}/avatar.png" alt="" srcset=""/>
                    <div class="exl_content">
                      <span class="exl_username">{user.name}</span>
                      <div class="exl_desc">
                        <span class="exl_email">{user.email}</span>
                        <span class="exl_desc_sep">•</span>
                        <span class="exl_followers">{user.followerCount} Followers</span>
                      </div>
                    </div>
                  </div>
                  <div class="exl_ff">
                    <a href="/profile/{user.id}" class="pri_btn">Profile</a>
                  </div>
                </div>
              })
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

