import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';
import getSession from './features/login/session';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/' render={() => (
            getSession() ? (
              <App to='/' />
            ) : (
                <Redirect to='/login' />
              )
          )} />
        </Switch>
      </Router>
      {/* <App /> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
