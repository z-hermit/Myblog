import React, { Component } from 'react';

import { connect } from 'react-redux'

class NotFound extends Component {

  render() {
    const {user} = this.props;
    let button = null;
    if (user !== null) {
      button = <div>
                  <a href={`"/profile/"${user.id}`} class="sec_btn">Visit your profile</a>
                  <a href="/" class="pri_btn error_login">Try going to home</a>
                </div>
    } else {
      button = <div>
                  <a href="/welcome" class="sec_btn">Go to home</a>
                  <a href="/login" class="pri_btn error_login">Wanna login?</a>
                </div>
    }
    return (
      <div class="notes_wrapper">
        <div class="welcome_div error_div">
          <div class="error_info">
            <span>Oops, the page you're looking for does not exist!!</span>
          </div>
          <img src="/images/error-3.svg" alt="" />
          <div class="error_bottom">
            {button}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user:state.user
  }
}

const mapDispatchToProps = dispatch => ({
  // requestData: (index, scene, packageName) => dispatch(detailActions.requestData(index, scene, packageName, "inUse"))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotFound);

