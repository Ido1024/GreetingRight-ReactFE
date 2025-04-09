// src/Components/LoginSignup.jsx
import React, { useState } from 'react'; // Importing React and useState hook
import './LoginSignup.css'; // Import the CSS file for styles

function LoginSignup() {
  // State hooks to manage form data and UI state
  const [activeForm, setActiveForm] = useState('login'); // Tracks which form (login/signup) is active
  const [username, setUsername] = useState(''); // State for the username
  const [password, setPassword] = useState(''); // State for the password
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirming password in signup form
  const [error, setError] = useState(null); // State for handling error messages

  // Function to switch between login and signup forms
  const handleSwitcher = (form) => {
    setActiveForm(form); // Set the active form (login/signup)
    setError(null); // Clear any error message
    setUsername(''); // Clear the username field
    setPassword(''); // Clear the password field
    setConfirmPassword(''); // Clear the confirm password field (for signup)
  };

  // Login form submission handler
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page on submit
    try {
      // Sending POST request to the server to authenticate the user
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST', // POST request to send data
        headers: { 'Content-Type': 'application/json' }, // Setting headers to indicate JSON body
        body: JSON.stringify({ username, password }), // Sending the username and password as JSON
      });

      if (!response.ok) { // If response status is not OK, throw error
        throw new Error("Login failed. Please check your credentials.");
      }

      const data = await response.json(); // Parse the response JSON
      // Save access and refresh tokens in session storage
      sessionStorage.setItem("accessToken", data.accessToken);
      sessionStorage.setItem("refreshToken", data.refreshToken);
      console.log("Login successful:", data); // Log successful login

      setError(null); // Clear error message on successful login
    } catch (err) {
      setError(err.message); // Set error message on failure
      console.error("Login failed:", err); // Log the error
    }
  };

  // Signup form submission handler
  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    try {
      // Send the signup request to the backend
      const response = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
  
      // Check if the response is successful (HTTP status 200)
      if (!response.ok) {
        const errorData = await response.text(); // Get the error message sent by the server
        throw new Error(errorData || "Signup failed. Please try again.");
      }
  
      // If signup is successful, get the response message
      const successMessage = await response.text();
      console.log(successMessage); // You can log this for debugging purposes
  
      setError(null); // Clear any existing error
      setActiveForm('login'); // Switch to the login form after successful signup
    } catch (err) {
      // Handle errors (like username already exists or server issues)
      setError(err.message);
      console.error("Signup failed:", err);
    }
  };
  

  return (
    <section className="forms-section"> {/* Container for the forms */}
      <h1 className="section-title">Animated Forms</h1> {/* Title of the section */}
      <div className="forms"> {/* Container for the individual forms */}
        {/* Login Form */}
        <div className={`form-wrapper ${activeForm === 'login' ? 'is-active' : ''}`}> {/* Conditionally render class 'is-active' if active form is 'login' */}
          <button type="button" className="switcher switcher-login" onClick={() => handleSwitcher('login')}> {/* Switch to login form */}
            Login
            <span className="underline"></span> {/* Underline effect */}
          </button>
          <form className="form form-login" onSubmit={handleLogin}> {/* Login form */}
            <fieldset>
              <legend>Please, enter your username and password for login.</legend>
              <div className="input-block"> {/* Username input block */}
                <label htmlFor="login-username">Username</label>
                <input id="login-username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required /> {/* Input for username */}
              </div>
              <div className="input-block"> {/* Password input block */}
                <label htmlFor="login-password">Password</label>
                <input id="login-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /> {/* Input for password */}
              </div>
            </fieldset>
            <button type="submit" className="btn-login">Login</button> {/* Login button */}
            {error && activeForm === 'login' && <p className="error-message">{error}</p>} {/* Show error message for login if present */}
          </form>
        </div>

        {/* Signup Form */}
        <div className={`form-wrapper ${activeForm === 'signup' ? 'is-active' : ''}`}> {/* Conditionally render class 'is-active' if active form is 'signup' */}
          <button type="button" className="switcher switcher-signup" onClick={() => handleSwitcher('signup')}> {/* Switch to signup form */}
            Sign Up
            <span className="underline"></span> {/* Underline effect */}
          </button>
          <form className="form form-signup" onSubmit={handleSignup}> {/* Signup form */}
            <fieldset>
              <legend>Please, choose your username and set a password.</legend>
              <div className="input-block"> {/* Username input block */}
                <label htmlFor="signup-username">Username</label>
                <input id="signup-username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required /> {/* Input for username */}
              </div>
              <div className="input-block"> {/* Password input block */}
                <label htmlFor="signup-password">Password</label>
                <input id="signup-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /> {/* Input for password */}
              </div>
              <div className="input-block"> {/* Confirm password input block */}
                <label htmlFor="signup-password-confirm">Confirm password</label>
                <input id="signup-password-confirm" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required /> {/* Input for confirming password */}
              </div>
            </fieldset>
            <button type="submit" className="btn-signup">Continue</button> {/* Signup button */}
            {error && activeForm === 'signup' && <p className="error-message">{error}</p>} {/* Show error message for signup if present */}
          </form>
        </div>
      </div>
    </section>
  );
}

export default LoginSignup; // Exporting the component to use in other parts of the app
