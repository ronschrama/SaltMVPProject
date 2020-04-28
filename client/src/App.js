import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import LoginPage from './features/login/LoginPage';
import Dashboard from './features/dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import isAuthenticated from './services/auth';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {isAuthenticated() ? (
          <h1>I'm logged in</h1>
        ): (
          <h1>I'm anonymous</h1>
        ) }
        {/* // <Switch>
        //   <Route exact path="/" component={LoginPage} />
        //   <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        //   <ProtectedRoute exact path="*" component={() => '404 NOT FOUND'} />
        // </Switch> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
