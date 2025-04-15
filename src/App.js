import React from 'react';
import './App.css'; // Global styles
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Wish from './Components/Wish';
import LoginSignup from './Components/LoginSignup';
import Favorite from './Components/Favorite';
import PrivateRoute from './Components/PrivateRoute';
import Logout from './Components/Logout';

function Header() {
  const location = useLocation();
  const shouldHideHeader = location.pathname === '/login' || location.pathname === '/';

  if (shouldHideHeader) return null;

  return (
    <header className="header">
      <nav className="nav-bar">
        <a href="/logout">Logout</a>
        <a href="/help">Help</a>
        <a href="/history">History</a>
        <a href="/wish">Wish</a>
        <a href="/favorite">Favorite</a>
      </nav>
    </header>
  );
}

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginSignup />} />
        <Route
          path="/wish"
          element={
            <PrivateRoute>
              <Wish />
            </PrivateRoute>
          }
        />
        <Route
          path="/favorite"
          element={
            <PrivateRoute>
              <Favorite />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<LoginSignup />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}

export default App;
