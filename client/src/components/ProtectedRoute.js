import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../services/auth';


// eslint-disable-next-line
export default function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route
      // eslint-disable-next-line
      {...rest}
      render={
        // eslint-disable-next-line
        (props) => {
          // eslint-disable-next-line
          return auth.isAuthenticated() ? <Component {...props} />
            : (
              <Redirect
                to={{
                  pathname: '/',
                  state: {
                    // eslint-disable-next-line
                    from: props.location
                  },
                }}
              />
            );
        }
      }
    />
  );
}
