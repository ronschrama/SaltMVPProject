import React from 'react';
import Login from './login';
import Link from '../../components/Link';

function LoginPage() {
  return (
    <div>
      <h1> LoginPage </h1>
      <Login />
      <Link href="/">Term of use</Link>
      <Link href="/">Privacy policy</Link>
    </div>
  );
}

export default LoginPage;
