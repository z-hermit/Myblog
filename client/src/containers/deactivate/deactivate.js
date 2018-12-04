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

class deactivate extends Component {

  constructor(props) {
    super(props);
    console.log("deactivate constructor");
  }

  componentDidUpdate() {
  }

  render() {
    // const { detailData } = this.props;
    console.log("deactivate render");

    return (
      <div class="notes_wrapper">
        <div class="registered deactivate">
          <span class="deactivate_title">{"Deactivate your account?"}</span>
          <span>{'All of your posts, followers, likes & other info will be permanently deleted. And you won\'t be able to find it again.'}</span>
          <div class="deactivate_btn">
            <a href="#" class="pri_btn d_btn" >{'Deactivate'}</a>
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
)(deactivate);

