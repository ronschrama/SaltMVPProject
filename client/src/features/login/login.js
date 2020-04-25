import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loggingIn } from './loginSlice';
import styled from 'styled-components';

import SubmitButton from '../../components/Button';
// import Input from '../../components/Input';
// import CheckBox from '../../components/CheckBox';
import auth from '../../services/auth';
import { Form, Input, Button, Checkbox } from 'antd';

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

function Login(props) {
  const dispatch = useDispatch();
  const loginStatus = useSelector(
    (state) => state.login.loggedIn,
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

    console.log('Received values of form: ', result);
    if (result.success) {
      auth.login(() => {
        // eslint-disable-next-line
        props.history.push('/dashboard');
      });
    }
  }

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    await handleSubmit();
  };

  return (
    // <LoginForm onSubmit={async (e) => {
    //   e.preventDefault();
    //   await handleSubmit();
    // }}>
    //   <Input login handleChange={(mail) => setEmail(mail)} name="Email" type="text" />
    //   <Input login handleChange={(pass) => setPassword(pass)} name="Password" type="password" />
    //   <CheckBox>Remember password</CheckBox>
    //   <SubmitButton login>Login</SubmitButton>
    // </LoginForm>
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={async (formData) => {
        await handleSubmit(formData);
      }}>
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please insert your email!' }]}
      >
        <Input handleChange={(mail) => setEmail(mail)} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          handleChange={(pass) => setPassword(pass)}
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

// import React, { useState, useRef, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { withRouter } from 'react-router-dom';
// import { loggingIn } from './loginSlice';
// import SubmitButton from '../../components/SubmitButton';
// import Input from '../../components/Input';
// import CheckBox from '../../components/CheckBox';
// import auth from '../../services/auth';

// function Login(props) {
//   const dispatch = useDispatch();
//   const loginStatus = useSelector(
//     (state) => state.login.loggedIn,
//   );

//   const emailInputNode = useRef(null);
//   const passwordInputNode = useRef(null);

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');


//   async function handleSubmit() {
//     console.log(emailInputNode.input);

//     // let result = await fetch('http://localhost:5000/user/login', {
//     //   method: 'POST',
//     //   headers: {
//     //     'Content-type': 'application/json',
//     //   },
//     //   body: JSON.stringify({
//     //     email,
//     //     password,
//     //   }),
//     // });
//     // result = await result.json();

//     // if (result.success) {
//     //   auth.login(() => {
//     //     // eslint-disable-next-line
//     //     props.history.push('/dashboard');
//     //   });
//     // }
//   }

//   return (
//     <form onSubmit={async (e) => {
//       e.preventDefault();
//       await handleSubmit();
//     }}
//     >
//       <Input forwardedRef={emailInputNode} name="email" type="text" />
//       <Input forwardedRef={passwordInputNode} name="password" type="text" />
//       <CheckBox />
//       <SubmitButton />
//     </form>
//   );
// }

// export default withRouter(Login);


// PRE STYLED-COMPONENT

// return (
//   <LoginForm>
//     <form onSubmit={async (e) => {
//       e.preventDefault();
//       await handleSubmit();
//     }}
//     >
//       <Input login handleChange={(mail) => setEmail(mail)} name="email" type="text" />
//       <Input login handleChange={(pass) => setPassword(pass)} name="password" type="password" />
//       <CheckBox>Remember password</CheckBox>
//       <SubmitButton login>Login</SubmitButton>
//     </form>
//   </LoginForm>
// );
