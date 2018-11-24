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

    return 
      <div class="notes_wrapper">

        <div class="log_sign">
          <a href="/signup" class="pri_btn">Need an account?</a>
        </div>

        <div class="register cua ">
          <div class="display_text">
            <span>Get started again</span>
          </div>
          <form class="form_login">
            <input type="text" name="username" value="" class="l_username" autofocus required spellcheck="false" autocomplete='false'
              placeholder='Username'/>
            <input type="password" name="password" value="" class="l_password" required placeholder='Password'/>
            <input type="submit" name="" value="Login to continue" class="l_submit"/>
          </form>
        </div>

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
)(template);

