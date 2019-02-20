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

class createPost extends Component {

  constructor(props) {
    console.log("createPost constructor");
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
              value={this.state.value}
              onChange={e => {
                this.setState({
                  titleValue:e.target.value
                })
              }} />
          </div>
          <div className="eb_div">
            <span className='edit_span'>Content</span>
            <textarea placeholder='Content..' spellCheck='false' rows={4}
              value={this.state.value}
                onChange={e => {
                  this.setState({
                    titleValue:e.target.value
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

