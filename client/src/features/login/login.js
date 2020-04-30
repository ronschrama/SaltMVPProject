import React from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';

import { loggingIn } from './loginSlice';
import SubmitButton from '../../components/Button';
import { Form, Input, Checkbox } from 'antd';

const LoginForm = styled(Form)`
  width: 400px;
`

const StyledInput = styled(Input)`
  background-color: ${props => props.theme.colors.background.light};
  border-radius: 0px;
  margin-top: 10px;
  
  ${({ login }) =>
    login && css`
      width: 400px;
      height: 32px;
      font-size: ${props => props.theme.fonts.caption};
      line-height: 24px;
      color: ${props => props.theme.colors.text.dark};
      border: 0px;
      border-bottom: 2px solid ${props => props.theme.colors.link.quartary};
  `}
`

function Login(props) {
  const dispatch = useDispatch();

  const [cookies, setCookie] = useCookies(['authToken']);

  async function handleSubmit(formData) {

    let result = await fetch('http://localhost:5000/login', {
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
      dispatch(loggingIn());
    }
  }

  return (
    <LoginForm
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please insert your email!' }]}
      >
        <StyledInput
          login
          type="email"
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please insert your Password!' }]}
      >
        <StyledInput
          login
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
        </a>
        </div>
      </Form.Item>

      <Form.Item>
        <SubmitButton login type="primary" htmlType="submit" className="login-form-button">
          Login
        </SubmitButton>
      </Form.Item>
    </LoginForm>
  );
}

export default Login;
