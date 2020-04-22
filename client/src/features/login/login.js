import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loggingIn } from './loginSlice';
import Button from '../../components/Button';
import Input from '../../components/Input';
import CheckBox from '../../components/CheckBox';
import Link from '../../components/Link';

function Login() {
  const dispatch = useDispatch();
  const loginStatus = useSelector(
    state => state.login.loggedIn
  );
  console.log(loginStatus);

  const [ input, setInput ] = useState([]);

  function getUserCredentials (e) {
    const value = e.target.value;
    setInput([...input, value]);
    console.log(value);
  }

  return (
    <div className="LoginForm">
      <h2>Welcome! Please login to your account</h2>
      <div onClick={() => dispatch(loggingIn())}>
        <form onSubmit={() => getUserCredentials()}>
          <Input value={input}>Email adress</Input>
          <Input value={input}>Password</Input>
          <CheckBox>Remember me</CheckBox>
          <Link>Forgot Password</Link>
          <Button primary>Login</Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
