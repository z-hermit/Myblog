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

import Img from "../../images/golang.png"

//const 

class Nothing extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a href="/view_post/{{ $post.postID }}" className="note">
        <div className="note_header common_header">
          <img src={Img} alt="" srcset=""/>
          <div className="note_h_left">
            <span className="note_username">username</span>
            <span className='note_time'>created time</span>
          </div>
        </div>
        <div className="note_title">
          <span>post title</span>
        </div>
        <div className="note_content">
          <span>post content</span>
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
)(Nothing);

