import React from 'react';
import Cookies from 'js-cookie';
import { withRouter } from 'react-router-dom';
import SubmitButton from '../../components/SubmitButton';
import auth from '../../services/auth';


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
      <h1>Dashboard</h1>
      <form
        onSubmit={
          (e) => {
            e.preventDefault();
            handleSubmit();
          }
        }
      >
        <SubmitButton />
      </form>
    </div>
  );
}

export default withRouter(Dashboard);
