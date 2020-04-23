import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loggingIn } from './loginSlice';
import SubmitButton from '../../components/SubmitButton';
import Input from '../../components/Input';
import CheckBox from '../../components/CheckBox';

function Login() {
  const dispatch = useDispatch();
  const loginStatus = useSelector(
    (state) => state.login.loggedIn,
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit() {
    const result = await fetch('http://localhost:5000/login', {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then((response) => response.json())
      .then((response) => {
        return response;
      });
    // const token = await result.json();
    await console.log(email, password, result);
  }

  return (
    <form onSubmit={async (e) => {
      e.preventDefault();
      await handleSubmit();
    }}
    >
      <Input handleChange={(mail) => setEmail(mail)} name="email" type="text" />
      <Input handleChange={(pass) => setPassword(pass)} name="password" type="text" />
      <CheckBox />
      <SubmitButton />
    </form>
  );
}

export default Login;
