// src/App.js
import React from 'react';
import './App.css';
import Login from './Components/Login';
import LoginSignup from './Components/LoginSignup';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LoginSignup />
      </header>
    </div>
  );
}

export default App;