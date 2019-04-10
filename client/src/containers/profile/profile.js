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
      let respData = response.data;
      console.log(respData)
      if (respData.code === 200) {
        this.setState(respData.data);
        console.log(this.state)
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
    let user = this.state.user;
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
      <div className="notes_wrapper">
        <div className="aligner">

          <div className='user_banner'>
            <div className="profile_img_div">
              <img src={Img} alt="" srcSet=""/>
            </div>
            <div className="user_buttons">
              <link/>
            </div>
            <div className="user_info">
              <a href="#" className="user_main_link">{user.username}</a>
              <span className="user_no_notes">{user.email}</span>
              <div className="user_bio ">
                <span>
                  {bio}
                </span>
              </div>
              <hr />
              <div className="user_stats">
                <div className="stat_post">
                  <span className="stat_hg">{user.posts ? user.posts.length : 0}</span>
                  <span className="stat_nhg">Posts</span>
                </div>
                <a href="/followers/{{ $id }}" className="stat_followers">
                  <span className="stat_hg">{user.followers ? user.followers.length : 0}</span>
                  <span className="stat_nhg" >Followers</span>
                </a>
                <a href="/followings/{{ $id }}" className="stat_followings">
                  <span className="stat_hg">{user.followings ? user.followings.length : 0}</span>
                  <span className="stat_nhg">Followings</span>
                </a>
              </div>
            </div>
          </div>

          <div className="notes">

            {!user.posts || user.posts.length === 0 ? 
              <Nothing tip={"No posts for the user, lazy..."}/>
              :
              user.posts.map((item, index) => {
                return <Post postData={item} key={index}/>
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

