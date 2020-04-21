import React from 'react';
import './App.css';
import Login from './features/login/login'

function App() {
  return (
    <div className="App">
      <h1>Promore app</h1>
      <Login primary>Login</Login>
      <Login secondary>Button twee</Login>
    </div>
  );
}

export default App;
