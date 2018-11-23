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

//const 

class template extends Component {

  constructor(props) {
    super(props);
    console.log("template constructor");
  }

  componentDidUpdate() {
    super();
  }

  // shouldComponentUpdate(nextProps,nextState){
    
  // }

  render() {
    const { detailData } = this.props;
    console.log("template render");

    return (
      <div style={{ 
        position: "relative",
        marginLeft: "auto",
        marginRight: "auto",
        width: 800,
        marginBottom:50
      }}>

        
      </div>
    );
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
)(template);

