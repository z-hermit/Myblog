//react
import React, { Component } from "react";
//redux
import { connect } from 'react-redux'
//react router
import { Link } from 'react-router-dom';
//components
// import InfoTable from "../../components/info_table";
import Nothing from "../../components/nothing"
import End from "./end"
import Post from "./post"
//actions
// import {actions as listActions} from '../../redux/';
//utils
import Utils from "../../utils/utils";

//const 

class home extends Component {

  constructor(props) {
    super(props);
    console.log("home constructor");
  }

  componentDidUpdate() {
  }

  render() {
    // const { post } = this.props;
    let post = [];
    console.log("home render");

    return (
      <div className="notes_wrapper">
        <div className="home">

          <div className="home_info">
            <span>{`${post.length} Notes`}</span>
            <Link to="/create_post" className="pri_btn">{'Create Post'}</Link>
          </div>

          {
            post.length > 0 ? 
            <div>
              <Post />
              <End />
            </div>
            :
            <Nothing tip={"No posts for you. Go ahead and create one!!"} />
          }
          
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
)(home);

