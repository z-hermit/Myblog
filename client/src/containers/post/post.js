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

class Post extends Component {

  constructor(props) {
    console.log("Post constructor");
    super(props);
  }

  componentDidUpdate() {
  }

  commit (e) {
    console.log(e)
  }

  render() {
    const { postData } = this.props;
    console.log("Post render");

    return (
      <a href={"/view_post/" + postData.id} class="note">
        <div class="note_header common_header">
          <img src={"/users/" + postData.createdBy + "/avatar.png"} alt="" srcset=""/>
          <div class="note_h_left">
            <span class="note_username">{postData.username}</span>
            <span class='note_time'>{postData.time}</span>
          </div>
        </div>
        <div class="note_title">
          <span>{postData.title}</span>
        </div>
        <div class="note_content">
          <span>{postData.content}</span>
        </div>
      </a>
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
)(Post);

