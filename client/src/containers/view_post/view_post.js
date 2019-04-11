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
import Utils from "../../utils/utils";
import Router from "../../utils/router";
import { Button, Input } from 'antd';
import Axios from "axios";
//const 

class ViewPost extends Component {

  constructor(props) {
    console.log("ViewPost constructor");
    super(props);
    this.state = {
      post: null
    }
  }

  componentDidMount() {
    const postId = Router.getParam(this).id;
    Axios({
        method: "GET",
        url: "/get/view_post/" + postId,
        data: null
      })
      .then(response => {
        let respData = response.data;
        console.log(respData)
        if (respData.code === 200) {
          this.setState({
            post:respData.data
          });
          console.log(this.state)
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { sesid } = this.props;
    const postId = Router.getParam(this).id;
    console.log("ViewPost render");
    const post = this.state.post;
    if (post === null) {
      return <div />
    }
    let like;
    if (post.like) {
      like = <span className="unlike_post lu_post" data-post="{post.id}" ><i className="material-icons">favorite</i></span>;
    } else {
      like = <span className="like_post lu_post" data-post="{post.id}" ><i className="material-icons">favorite_border</i></span>;
    }
    let rightButton;
    if (post.createdBy === sesid) {
      rightButton = <div className="b_a_right">
        <a href="/edit_post/{post.id}" className="sec_btn">Edit post</a>
        <a href="#" className="sec_btn blog_dlt" data-post="{{ .post.postID }}">Delete post</a>
        <a href="/profile/{sesid}" className="pri_btn blog_back">Back</a>
      </div>
    } else {
      rightButton = <div className="b_a_right">
        <a href="/profile/{sesid}" className="pri_btn blog_back">Back</a>
      </div>
    }

    return (
      <div className="notes_wrapper">
        <div className="home">

          <div className="blog">
            <div className="blog_c">
              <span className="blog_title">{post.title}</span>
              <span className="blog_content">{post.content}</span>
            </div>
            <div className="blog_actions">
              <div className="b_a_left">
                {like}
                <a href="/likes/{post.id}" className="sec_btn" >{post.likes.length} Likes</a>
              </div>
              <div className="b_a_right">
                {rightButton}
              </div>
            </div>
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
)(ViewPost);

