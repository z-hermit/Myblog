import React, { Component } from 'react';

import Img from "../images/large.jpg";

class Nothing extends Component {

  render() {
    return (
      <div className='home_last_mssg'>
        <img src={Img} alt="" srcSet=""/>
        <span>{this.props.tip}</span>
      </div>
    );
  }
}


export default Nothing;

