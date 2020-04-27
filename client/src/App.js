import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './features/login/LoginPage';
import Dashboard from './features/dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <ProtectedRoute path='/dashboard/briefs' component={Briefs} />
        <ProtectedRoute path='/dashboard/suppliers' component={Suppliers} />
        <ProtectedRoute path='/dashboard/helpcenter' component={Helpcenter} />
        <ProtectedRoute path='/dashboard/settings' component={Settings} />
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        <ProtectedRoute exact path="*" component={() => '404 NOT FOUND'} />
      </Switch>
    </div>
  );
}

export default App;
