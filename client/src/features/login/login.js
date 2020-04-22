import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loggingIn } from './loginSlice';
import Button from '../../components/Button';
import Input from '../../components/Input';
import CheckBox from '../../components/CheckBox';
import Link from '../../components/Link';

function Login() {
  const dispatch = useDispatch();
  const loginStatus = useSelector(
    (state) => state.login.loggedIn,
  );
  console.log(loginStatus);

  const [userInput, setUserInput] = useState({ email: '', password: '' });

  function getUserCredentials(e) {
    e.preventDefault();
    // const refEl = useRef(null);
    const { value } = e.target;
    setUserInput({
      ...userInput,
      [e.target.user]: value,
    });
  }
  console.log(userInput);

  return (
    <div className="LoginForm">
      <h2>Welcome! Please login to your account</h2>
      <div onClick={() => dispatch(loggingIn())}>
        <form onSubmit={getUserCredentials}>
          <Input value={userInput.email} user="email">Email adress</Input>
          <Input value={userInput.password} user="password">Password</Input>
          <CheckBox>Remember me</CheckBox>
          <Link href=" ">Forgot Password</Link>
          <Button>Login</Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
