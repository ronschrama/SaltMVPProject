import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { loggingIn } from './loginSlice';

const Button = styled.button`
  background-color: white;
  font-size: 16px;
  border-radius: 4px;

  ${({ primary }) =>
    primary && css`
    background-color: palevioletred;
    color: white;
  `}
`;

function Login({ primary, children }) {
  const dispatch = useDispatch();
  const loginStatus = useSelector(
    state => state.login.loggedIn
  );
  console.log(loginStatus)
  return (
    <Button primary={primary} onClick={() => {
      dispatch(loggingIn())
      console.log(loginStatus);
    }}>{children}</Button>
  )
}

export default Login
