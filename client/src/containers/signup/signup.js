//react
import React, { Component } from "react";
//redux
import { connect } from 'react-redux'
//react router
import { Link } from 'react-router-dom';
//components
import Header from "../header/header";
//actions
import {actions as listActions} from '../../redux/';
//utils
import Utils from "../../util/utils";

//const 

class signup extends Component {

  constructor(props) {
    super(props);
    console.log("signup constructor");
  }

  componentDidUpdate() {
    super();
  }

  // shouldComponentUpdate(nextProps,nextState){
    
  // }

  render() {
    const { detailData } = this.props;
    console.log("signup render");

    return (
      <div>
        <Header />
        <div class="notes_wrapper">

          <div class="log_sign">
            <a href="/login" class="pri_btn">Already have an account?</a>
          </div>

          <div class="register cua ">
            <div class="display_text">
              <span>Get started now and let the fun begins</span>
            </div>
            <form class="form_register">
              <input type="text" name="username" value="" class="r_username" autofocus spellcheck="false" autocomplete='false' placeholder='Username'
                required />
              <input type="email" name="email" value="" class="r_email" spellcheck="false" autocomplete='false' placeholder='Email' required/>
              <input type="password" name="password" value="" class="r_password" placeholder='Password' required/>
              <input type="password" name="password_again" value="" class="r_password_again" placeholder='Password again' required/>
              <input type="submit" name="" value="Signup for free" class="r_submit"/>
            </form>
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
)(signup);

