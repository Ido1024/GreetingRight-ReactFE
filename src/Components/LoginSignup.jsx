import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, signupUser } from '../api/authService';
import './LoginSignup.css';
import { authFetch } from '../utils/authFetch';

function LoginSignup() {
  const navigate = useNavigate();

  // LOGIN STATE
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginAlert, setLoginAlert] = useState(null);

  // SIGNUP STATE
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [signupAlert, setSignupAlert] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginAlert(null);

    try {
      await loginUser({ username: loginUsername, password: loginPassword });
      setLoginAlert({ type: 'success', message: 'Login successful.' });
      setTimeout(() => navigate('/wish'), 1000); // Redirect to the wish page after 1 second
    } catch (err) {
      setLoginAlert({ type: 'error', message: err.message });
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupAlert(null);

    if (signupPassword !== signupConfirmPassword) {
      setSignupAlert({ type: 'error', message: 'Passwords do not match.' });
      return;
    }

    try {
      const message = await signupUser({ username: signupUsername, password: signupPassword });
      setSignupAlert({ type: 'success', message: message || 'Signup successful.' });
      setSignupUsername('');
      setSignupPassword('');
      setSignupConfirmPassword('');
    } catch (err) {
      setSignupAlert({ type: 'error', message: err.message });
    }
  };

  return (
    <section className="auth-wrapper">
      <h1 className="auth-title">Welcome to Greeting Right</h1>
      <div className="auth-forms">
        {/* Login Form */}
        <div className="form-box">
          <h2>Login</h2>
          {loginAlert && (
            <div className={`alert alert-${loginAlert.type}`}>
              {loginAlert.message}
            </div>
          )}
          <form onSubmit={handleLogin}>
            <div className="form-content">
              <div className="input-block">
                <label htmlFor="login-username">Username</label>
                <input
                  id="login-username"
                  type="text"
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  required
                />
              </div>
              <div className="input-block">
                <label htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
              <p className="forgot-password-msg">
                Forgot your password? Please contact an admin user.
              </p>
            </div>
            <button type="submit" className="action-button">Login</button>
          </form>
        </div>

        {/* Signup Form */}
        <div className="form-box">
          <h2>Sign Up</h2>
          {signupAlert && (
            <div className={`alert alert-${signupAlert.type}`}>
              {signupAlert.message}
            </div>
          )}
          <form onSubmit={handleSignup}>
            <div className="form-content">
              <div className="input-block">
                <label htmlFor="signup-username">Username</label>
                <input
                  id="signup-username"
                  type="text"
                  value={signupUsername}
                  onChange={(e) => setSignupUsername(e.target.value)}
                  required
                />
              </div>
              <div className="input-block">
                <label htmlFor="signup-password">Password</label>
                <input
                  id="signup-password"
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                />
              </div>
              <div className="input-block">
                <label htmlFor="signup-confirm-password">Confirm Password</label>
                <input
                  id="signup-confirm-password"
                  type="password"
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <button type="submit" className="action-button">Sign Up</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default LoginSignup;
