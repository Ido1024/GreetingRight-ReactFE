import React from 'react';
import { Navigate } from 'react-router-dom';

const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
};

const PrivateRoute = ({ children, allowedRoles }) => {
  const token = sessionStorage.getItem('accessToken');

  if (!token) {
    // Redirect to login if no token is found
    return <Navigate to="/login" replace />;
  }

  const decodedToken = decodeToken(token);

  if (!decodedToken || !decodedToken.roles) {
    // Redirect to login if the token is invalid or has no roles
    return <Navigate to="/login" replace />;
  }

  const userRoles = decodedToken.roles;

  // Check if the user has at least one of the allowed roles
  const hasAccess = allowedRoles.some((role) => userRoles.includes(role));

  if (!hasAccess) {
    // Redirect to "not authorized" if the user doesn't have the required role
    return <Navigate to="/login" replace />;
  }

  return children; // Render the protected component if the user has access
};

export default PrivateRoute;