//react
import React, { Component } from "react";
//redux
import { connect } from 'react-redux'
//react router
import { Link } from 'react-router-dom';
//components
import Header from "../header/header";
//actions
// import {actions as listActions} from '../../redux/';
//utils
import Utils from "../../utils/utils";
//image
import Img from "../../images/omg.png"
//const 

class welcome extends Component {

  constructor(props) {
    super(props);
    console.log("welcome constructor");
  }

  componentDidUpdate() {
  }

  // shouldComponentUpdate(nextProps,nextState){
    
  // }

  render() {
    const { detailData } = this.props;
    console.log("welcome render");

    return (
        <div>
          <Header />
          <div className="welcome_div">
            <img src={Img} alt="Welcome" srcSet=""/>
          </div>
        </div>)
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
)(welcome);

