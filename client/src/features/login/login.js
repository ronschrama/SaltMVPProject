import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { useCookies } from 'react-cookie';
// import { useSelector, useDispatch } from 'react-redux';
// import { loggingIn } from './loginSlice';
import styled from 'styled-components';

import SubmitButton from '../../components/Button';
import { Form, Input, Button, Checkbox } from 'antd';

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

function Login(props) {
  // const dispatch = useDispatch();
  // const loginStatus = useSelector(
  // (state) => state.login.loggedIn,
  // );
  const [cookies, setCookie] = useCookies(['authToken']);

  async function handleSubmit(formData) {

    let result = await fetch('http://localhost:5000/user/login', {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password
      })
    });

    result = await result.json();

    if (result.success) {
      const authToken = result.success.token;

      setCookie('authToken', authToken, { path: '/' });
      props.history.push('/dashboard');
    }
  }


  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please insert your email!' }]}
      >
        <Input
          type="email"
          placeholder="email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please insert your Password!' }]}
      >
        <Input
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <SubmitButton login htmlType="submit" className="login-form-button">
          Log in
        </SubmitButton>
      </Form.Item>
    </Form>
  );
}

export default withRouter(Login);
