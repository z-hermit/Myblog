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
import { Button, Input } from 'antd';
//const 

class ViewPost extends Component {

  constructor(props) {
    console.log("ViewPost constructor");
    super(props);
    this.state = {
      titleValue : "",
      contentValue : ""
    }
  }

  componentDidUpdate() {
  }

  commit (e) {
    console.log(e)
  }

  render() {
    const { post, sesid } = this.props;
    console.log("ViewPost render");

    let like;
    if (post.like) {
      like = <span class="unlike_post lu_post" data-post="{post.id}" ><i class="material-icons">favorite</i></span>;
    } else {
      like = <span class="like_post lu_post" data-post="{post.id}" ><i class="material-icons">favorite_border</i></span>;
    }
    let rightButton;
    if (post.createdBy === sesid) {
      <div class="b_a_right">
        <a href="/edit_post/{post.id}" class="sec_btn">Edit post</a>
        <a href="#" class="sec_btn blog_dlt" data-post="{{ .post.postID }}">Delete post</a>
        <a href="/profile/{sesid}" class="pri_btn blog_back">Back</a>
      </div>
    } else {
      <div class="b_a_right">
        <a href="/profile/{sesid}" class="pri_btn blog_back">Back</a>
      </div>
    }

    return (
      <div class="notes_wrapper">
        <div class="home">

          <div class="blog">
            <div class="blog_c">
              <span class="blog_title">{post.title}</span>
              <span class="blog_content">{post.content}</span>
            </div>
            <div class="blog_actions">
              <div class="b_a_left">
                {like}
                <a href="/likes/{post.id}" class="sec_btn" >{post.likes.length} Likes</a>
              </div>
              <div class="b_a_right">
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

