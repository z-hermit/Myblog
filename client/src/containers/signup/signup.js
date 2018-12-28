//react
import React, { Component } from "react";
//redux
import { connect } from 'react-redux'
//react router
import { Link } from 'react-router-dom';
//components
import Header from "../header/header";
//actions
import {actions } from '../../redux/user';
//utils
import Utils from "../../utils/utils";
import Reg from "../../utils/reg"

import {
  Form, Input, Icon, Button, AutoComplete,
} from 'antd';

//const 
const FormItem = Form.Item;

class signup extends Component {

  constructor(props) {
    super(props);
    console.log("signup constructor");
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        console.log(err)
      } else {
        console.log('Received values of form: ', values);
        this.props.signupRequest(values.username, values.password, values.email, "");
        //TODO
      }
    });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;

    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;

    if (value) {
      form.validateFields(['confirm'], { force: true });
    }
    if (/^[a-zA-Z0-9_]{2,20}$/.test(value)) {
      callback();
    } else {
      callback("only [a-zA-Z][a-zA-Z0-9_]");
    }
  }

  render() {
    console.log("signup render");

    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <div>
        <Header />
        <div className="notes_wrapper">
          <div className="log_sign">
            <Link to="/signup" className="pri_btn">Already have an account?</Link>
          </div>

          <div className="register cua ">
            <div className="display_text">
              <span>Get started now and let the fun begins</span>
            </div>
            <Form onSubmit={this.handleSubmit} >
              <FormItem
                {...formItemLayout}
                label="Username"
              >
                {getFieldDecorator('username', {
                  rules: [{
                    pattern: /^[a-zA-Z][a-zA-Z0-9_]{2,20}$/, message: 'The input is not valid username!',
                  }, {
                    required: true, message: 'Please input your username!',
                  }],
                })(
                  <Input type="text"/>
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="E-mail"
              >
                {getFieldDecorator('email', {
                  rules: [{
                    type: 'email', message: 'The input is not valid E-mail!',
                  }, {
                    required: true, message: 'Please input your E-mail!',
                  }],
                })(
                  <Input />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Password"
              >
                {getFieldDecorator('password', {
                  rules: [{
                    required: true, message: 'Please input your password!',
                  }, {
                    validator: this.validateToNextPassword,
                  }],
                })(
                  <Input type="password" />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="Confirm Password"
              >
                {getFieldDecorator('confirm', {
                  rules: [{
                    required: true, message: 'Please confirm your password!',
                  }, {
                    validator: this.compareToFirstPassword,
                  }],
                })(
                  <Input type="password" />
                )}
              </FormItem>
              <FormItem {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">Register</Button>
              </FormItem>
            </Form>
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
  signupRequest: (username, password, email, avatarPath) => dispatch(actions.set(username, password, "man", email, avatarPath))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(signup));
