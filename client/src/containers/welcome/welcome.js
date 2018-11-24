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
import Utils from "../../util/utils";
//image
import Img from "../../images/omg.png"
//const 

class welcome extends Component {

  constructor(props) {
    super(props);
    console.log("welcome constructor");
  }

  componentDidUpdate() {
    super();
  }

  // shouldComponentUpdate(nextProps,nextState){
    
  // }

  render() {
    const { detailData } = this.props;
    console.log("welcome render");

    return 
    <div class="welcome_div">
      <img src={Img} alt="Welcome" srcset=""/>
    </div>
  }
}

const mapStateToProps = state => {
  return {
    detailData:state.detailData[],
  }
}

const mapDispatchToProps = dispatch => ({
  requestData: (index, scene, packageName) => dispatch(detailActions.requestData(index, scene, packageName, "inUse"))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(welcome);

