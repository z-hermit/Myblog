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
    const { sesid } = this.props;
    const post = Router.getParam(this);
    console.log("ViewPost render");
    console.log(this.props)

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

