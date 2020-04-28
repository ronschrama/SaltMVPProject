import React from 'react';
import styled from 'styled-components';

import Login from './login';
import Link from '../../components/Link';
import logo from '../../assets/logo@2x.png';
import background from '../../assets/background.svg';
import Heading from '../../components/Heading';

const Body = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%; 
  height: 100vh;
  background-color: ${props => props.theme.colors.background.light};
`

const BackgroundImage = styled.div`
  background-image: url(${background});
  background-size: cover;
  width: 50%;
`

const LogoImage = styled.img`
width: 222px;
height: 57px;
margin: 15px;
margin-bottom: 40px;
align-self: center; 
`;

const LoginForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${props => props.theme.colors.background.light};
  width: 50%; 
  height: 520px;
  margin-top: 8%;
  padding: 20px;
`

function LoginPage() {
  return (
    <Body>
      <BackgroundImage />
      <LoginForm>
        <LogoImage src={logo} />
        <Heading loginHeading>Welcome back! Please login to your account</Heading>
        <Login />
        <Link href="/">Term of use. Privacy policy</Link>
      </LoginForm>
    </Body>
  );
}

export default LoginPage;
