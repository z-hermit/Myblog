//react
import React, { Component } from "react";
//redux
import { connect } from 'react-redux'
//react router
import { Link } from 'react-router-dom';
//components
import InfoTable from "../../components/info_table";
//actions
import {actions as listActions} from '../../redux/';
//utils
import Utils from "../../utils/utils";

//const 

class EditProfile extends Component {

  constructor(props) {
    super(props);
    console.log("EditProfile constructor");
  }

  componentDidUpdate() {
    super();
  }

  // shouldComponentUpdate(nextProps,nextState){
    
  // }

  render() {
    const { detailData } = this.props;
    console.log("EditProfile render");

    return (
      <div className="notes_wrapper">

        <div className='edit'>
          <div className="edit_info">
            <img className="edit_img" src='/users/{{ .session.id }}/avatar.png' alt="Your avatar" />
            <span>session.username</span>
          </div>
          <div className="eu_div">
            <span className='edit_span'>Username</span>
            <input type="text" className='e_username ep_username' placeholder='Username..' autoComplete='false' autoFocus spellCheck='false' value='{{ .session.username }}' />
          </div>
          <div className="ee_div">
            <span className='edit_span'>Email</span>
            <input type="email" className='e_email ep_email' placeholder='Email..' autoComplete='false' spellCheck='false' value='{{ .email }}' />
          </div>
          <div className="eb_div">
            <span className='edit_span'>Bio</span>
            <textarea className="e_bio ep_bio" placeholder='Bio..' spellCheck='false'>bio</textarea>
          </div>
          <div className="eb_btns">
            <form className='avatar_form' method="post" encType='multipart/formdata' >
              <input type="file" name="avatar" id="avatar_file" accept="image/*" />
              <label for="avatar_file" className='sec_btn avatar_span'>Change avatar</label>
            </form>
            <a href="#" className="pri_btn e_done ep_done">Done editing</a>
          </div>
          <div className="e_joined">
            <span>Joined: joined</span>
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
)(EditProfile);

