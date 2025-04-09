import React from 'react';
import './App.css'; // Global styles
import Wish from './Components/Wish';
import LoginSignup from './Components/LoginSignup';
import Starts from './Components/Starts';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Logout from './Components/Logout'; // Import the new Logout component

// Create a functional component for conditional header rendering
function Header() {
  const location = useLocation(); // Get the current location (URL)
  
  // Hide header on login or signup pages
  const shouldHideHeader = location.pathname === '/login' || location.pathname === '/';
  
  if (shouldHideHeader) return null; // Return nothing if we should hide the header

  return (
    <header className="header">
      <nav className="nav-bar">
        <a href="/logout">Logout</a>
        <a href="/help">Help</a>
        <a href="/history">History</a>
        <a href="/wish">Wish</a>
        <a href="/starts">Starts</a>
      </nav>
    </header>
  );
}

function App() {
  return (
    <Router>
      <Header /> {/* Render the Header here */}
      <Routes>
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/wish" element={<Wish />} />
        <Route path="/" element={<LoginSignup />} />
        <Route path="/starts" element={<Starts />} />
        <Route path="/logout" element={<Logout />} /> {/* Add the Logout route */}
      </Routes>
    </Router>
  );
}

export default App;
