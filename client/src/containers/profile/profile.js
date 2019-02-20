//react
import React, { Component } from "react";
//redux
import { connect } from 'react-redux'
//react router
import { Link } from 'react-router-dom';
//components
import Nothing from "../../components/nothing";
import Post from "../post/post";
//actions
// import {actions as listActions} from '../../redux/';
//utils
import Utils from "../../utils/utils";

import Img from "../../images/golang.png";
import { Button } from 'antd';
import Axios from "axios";
//const 

class Profile extends Component {

  constructor(props) {
    super(props);
    console.log("Profile constructor");
    this.state = null;
  }

  componentDidUpdate() {
  }

  // shouldComponentUpdate(nextProps,nextState){
    
  // }
  componentDidMount() {
    const id = this.props.match.params.id;
    Axios({
      method: "GET",
      url: "/get/profile/" + id,
      data: null
    })
    .then(response => {
      let data = response.data;
      console.log(data)
      if (data.code === 200) {
        this.state = response.data;
      }
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    const { sesId } = this.props;
    let id = this.props.match.params.id;
    console.log("Profile render");

    if (!this.state)
      return <div />;
    const user = this.state.user;
    let link = null;
    if (sesId === id) {
      link = <div class="user_buttons">
              <Link to="/create_post" class="pri_btn">New Post</Link>
            </div>
    } else {
      if (this.state.isF)
        link = <Button type="primary" class="pri_btn follow">Unfollow</Button>
      else
        link = <Button type="primary" class="pri_btn unfollow">follow</Button>
    }

    let bio = user.bio;
    if (!bio) {
      if (sesId === id) {
        bio = "You have no bio!!";
      } else {
        bio = `${user.username} has no bio!!`;
      }
    }

    return (
      <div class="notes_wrapper">
        <div class="aligner">

          <div class='user_banner'>
            <div class="profile_img_div">
              <img src={Img} alt="" srcset=""/>
            </div>
            <div class="user_buttons">
              <link/>
            </div>
            <div class="user_info">
              <a href="#" class="user_main_link">{user.username}</a>
              <span class="user_no_notes">{user.email}</span>
              <div class="user_bio ">
                <span>
                  {bio}
                </span>
              </div>
              <hr />
              <div class="user_stats">
                <div class="stat_post">
                  <span class="stat_hg">{user.posts.length}</span>
                  <span class="stat_nhg">Posts</span>
                </div>
                <a href="/followers/{{ $id }}" class="stat_followers">
                  <span class="stat_hg">{user.followers.length}</span>
                  <span class="stat_nhg" >Followers</span>
                </a>
                <a href="/followings/{{ $id }}" class="stat_followings">
                  <span class="stat_hg">{user.followings.length}</span>
                  <span class="stat_nhg">Followings</span>
                </a>
              </div>
            </div>
          </div>

          <div class="notes">

            {user.posts.length === 0 ? 
              <Nothing/>
              :
              user.posts.map(item => {
                return <Post postDate={item} />
              })
            }

          </div>

        </div>
      </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    sesId:state.user.id,
  }
}

const mapDispatchToProps = dispatch => ({
  // requestData: (index, scene, packageName) => dispatch(detailActions.requestData(index, scene, packageName, "inUse"))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

