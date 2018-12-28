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

class End extends Component {

  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
  }

  render() {
    return (
      <div class="page_end">
        <span>Looks like you've reached the end</span>
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
)(End);

