import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loggingIn } from './loginSlice';
import Button from '../../components/Button'


function Login() {
  const dispatch = useDispatch();
  const loginStatus = useSelector(
    state => state.login.loggedIn
  );
  console.log(loginStatus);
  return (
    <div onClick={() => dispatch(loggingIn())}>
      <Button />
    </div>
  );
}

export default Login
