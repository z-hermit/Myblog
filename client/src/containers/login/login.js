//react
import React, { Component } from "react";
//redux
import { connect } from 'react-redux'
//react router
import { Link } from 'react-router-dom';
//components
// import InfoTable from "../../components/info_table";
//actions
import {actions } from '../../redux/user';
//utils
import Utils from "../../utils/utils";

import "./login.css"

import {
  Form, Icon, Input, Button, Checkbox, message
} from 'antd';

const FormItem = Form.Item;
//const 

class login extends Component {

  constructor(props) {
    super(props);
    console.log("login constructor");
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.loginRequest(values.username, values.password, function (data) {
          if (data.code !== 200) {
            message.error('login error');
          }
        })
      }
    });
  }

  componentDidUpdate() {
  }

  render() {
    const { detailData } = this.props;
    console.log("login render");
    const { getFieldDecorator } = this.props.form;

    return (
          <div className="notes_wrapper">
    
            <div className="log_sign">
              <Link to="/signup" className="pri_btn" >
                {"Need an account?"}
              </Link>
            </div>
    
            <div className="register cua ">
              <div className="display_text">
                <span>Get started again</span>
              </div>
              <Form onSubmit={this.handleSubmit} className="login-form"  id="normal-login">
                <FormItem>
                  {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                  })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                  })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                  })(
                    <Checkbox>Remember me</Checkbox>
                  )}
                  <a className="login-form-forgot" href="">Forgot password</a>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                  </Button>
                  Or <Link to="/signup">register now!</Link>
                </FormItem>
              </Form>
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
  loginRequest: (username, password, callback) => dispatch(actions.login(callback)(username, password))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(login));

