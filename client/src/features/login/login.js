import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loggingIn } from './loginSlice';
import styled from 'styled-components';

import SubmitButton from '../../components/Button';
import Input from '../../components/Input';
import CheckBox from '../../components/CheckBox';
import auth from '../../services/auth';

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

  async function handleSubmit() {
    let result = await fetch('http://localhost:5000/user/login', {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    result = await result.json();

    if (result.success) {
      auth.login(() => {
        // eslint-disable-next-line
        props.history.push('/dashboard');
      });
    }
  }

  return (
    <LoginForm onSubmit={async (e) => {
      e.preventDefault();
      await handleSubmit();
    }}>
      <Input login handleChange={(mail) => setEmail(mail)} name="email" type="text" />
      <Input login handleChange={(pass) => setPassword(pass)} name="password" type="password" />
      <CheckBox>Remember password</CheckBox>
      <SubmitButton login>Login</SubmitButton>
    </LoginForm>
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