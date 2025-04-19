import React from 'react';
import './App.css'; // Global styles
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Wish from './Components/Wish';
import LoginSignup from './Components/LoginSignup';
import Favorite from './Components/Favorite';
import PrivateRoute from './Components/PrivateRoute';
import Logout from './Components/Logout';
import AdminPanel from './Components/AdminPanel';
import EditUser from './Components/EditUser';

function Header() {
  const location = useLocation();
  const shouldHideHeader = location.pathname === '/login' || location.pathname === '/';

  if (shouldHideHeader) return null;

  const token = sessionStorage.getItem('accessToken');
  let isAdmin = false;

  if (token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = JSON.parse(atob(base64));
      isAdmin = jsonPayload.roles && jsonPayload.roles.includes('ROLE_ADMIN');
    } catch (error) {
      console.error('Failed to decode token:', error);
    }
  }

  return (
    <header className="header">
      <nav className="nav-bar">
        <a href="/logout">Logout</a>
        <a href="/help">Help</a>
        <a href="/history">History</a>
        <a href="/wish">Wish</a>
        <a href="/favorite">Favorite</a>
        {isAdmin && <a href="/admin-panel">Admin Panel</a>}
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
            <PrivateRoute allowedRoles={['ROLE_USER', 'ROLE_ADMIN']}>
              <Wish />
            </PrivateRoute>
          }
        />
        <Route
          path="/favorite"
          element={
            <PrivateRoute allowedRoles={['ROLE_USER', 'ROLE_ADMIN']}>
              <Favorite />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin-panel"
          element={
            <PrivateRoute allowedRoles={['ROLE_ADMIN']}>
              <AdminPanel />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-user/:username"
          element={
            <PrivateRoute allowedRoles={['ROLE_ADMIN']}>
              <EditUser />
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
