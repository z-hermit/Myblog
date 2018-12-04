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

//const 

class createPost extends Component {

  constructor(props) {
    super(props);
    console.log("createPost constructor");
  }

  componentDidUpdate() {
  }

  render() {
    // const { detailData } = this.props;
    console.log("createPost render");

    return (
      <div class="notes_wrapper">
        <div class='edit'>
          <div class="edit_info">
            <img class="edit_img" src='/users/avatar.png' alt="Your avatar" />
            <span>Create Post</span>
          </div>
          <div class="eu_div">
            <span class='edit_span'>Title</span>
            <input type="text" class='e_username create_username' placeholder='Title..' autoComplete='false' autoFocus spellCheck='false' />
          </div>
          <div class="eb_div">
            <span class='edit_span'>Content</span>
            <textarea class="e_bio create_content" placeholder='Content..' spellCheck='false'></textarea>
          </div>
          <div class="eb_btns">
            <a href="#" class="pri_btn e_done create_blog">Create Post</a>
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
)(createPost);

