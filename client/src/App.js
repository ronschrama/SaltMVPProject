import React from 'react';
import './App.css';
import Login from './features/login/login'
import Link from './components/Link';

function App() {
  return (
    <div className="App">
      <h1>Promore app</h1>
      <Login />
      <Link>Term of use</Link>
      <Link>Privacy policy</Link>
    </div>
  );
}

export default App;
