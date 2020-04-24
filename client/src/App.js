import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import LoginPage from './features/login/LoginPage';
import Dashboard from './features/dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <h1>Promore app</h1>
      <Switch>
        <Route exact path="/" component={LoginPage} />
        <ProtectedRoute exact path="/dashboard" component={Dashboard} />
        <Route exact path="*" component={() => '404 NOT FOUND'} />
      </Switch>
    </div>
  );
}

export default App;
