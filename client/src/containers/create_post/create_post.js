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
import { Button, Input, message } from 'antd';
import Axios from "axios";
//const 

class createPost extends Component {

  constructor(props) {
    console.log("createPost constructor");
    super(props);
    this.state = {
      titleValue : "",
      contentValue : ""
    }
    this.commit = (e) => {
      let param = new URLSearchParams();
      let title = this.state.titleValue;
      let content = this.state.contentValue;
      param.append("title", title);
      param.append("content", content);
      Axios({
        method: "POST",
        url: "/api/create_new_post/",
        data: param
      })
      .then(response => {
        let respData = response.data;
        console.log(respData)
        if (respData.code === 200) {
          console.log(respData)
          message.success('commit success');
          console.log(this.props);
          Router.goTo(this,`/view_post/${respData.data.postID}`);
        }
      })
      .catch(error => {
        console.log(error);
      });
    }
  }

  componentDidUpdate() {
  }

  render() {
    // const { detailData } = this.props;
    console.log("createPost render");

    return (
      <div className="notes_wrapper">
        <div className='edit'>
          <div className="edit_info">
            <img className="edit_img" src='/users/avatar.png' alt="Your avatar" />
            <span>Create Post</span>
          </div>
          <div className="eu_div">
            <span className='edit_span'>Title</span>
            <Input type="text" className='e_username create_username' placeholder='Title..' autoComplete='false' autoFocus spellCheck='false'
              value={this.state.titleValue}
              onChange={e => {
                this.setState({
                  titleValue:e.target.value
                })
              }} />
          </div>
          <div className="eb_div">
            <span className='edit_span'>Content</span>
            <textarea placeholder='Content..' spellCheck='false' rows={4}
              value={this.state.contentValue}
                onChange={e => {
                  this.setState({
                    contentValue:e.target.value
                  })
                }} />
          </div>
          <div className="eb_btns">
            <Button type="primary" className="pri_btn e_done create_blog" onClick={this.commit}>Create Post</Button>
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

