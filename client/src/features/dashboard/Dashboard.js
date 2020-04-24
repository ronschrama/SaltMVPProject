import React from 'react';
import Cookies from 'js-cookie';
import { withRouter } from 'react-router-dom';
import SubmitButton from '../../components/Button';
import auth from '../../services/auth';
import styled from 'styled-components';

const Heading = styled.h2`
  font-size: ${props => props.theme.fonts.h2};
  color: #B9BABE;
`

function Dashboard(props) {
  function handleSubmit() {
    Cookies.set('authToken', null);
    // eslint-disable-next-line
    console.log('The cookie is now: ', Cookies.get('authToken'));
    auth.logout(() => {
      // eslint-disable-next-line
      props.history.push('/');
    });
  }

  return (
    <div>
      <Heading>Dashboard</Heading>
      <form
        onSubmit={
          (e) => {
            e.preventDefault();
            handleSubmit();
          }
        }
      >
        <SubmitButton login>Logout</SubmitButton>
      </form>
    </div>
  );
}

export default withRouter(Dashboard);
