import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import LoginPage from './features/login/LoginPage';
import Dashboard from './features/dashboard/Dashboard';
import { useSelector } from 'react-redux';
import { selectLoginStatus } from './features/login/loginSlice';

function App() {
  const isLoggedin = useSelector(selectLoginStatus);
  return (
    <div className="App">
      <BrowserRouter>
        {!isLoggedin ? (
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Redirect to="/login" />
          </Switch>
        ) : (
            <Dashboard />
          )}
      </BrowserRouter>
    </div>
  );
}

export default App;
