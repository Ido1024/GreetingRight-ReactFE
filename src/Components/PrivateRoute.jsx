import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = sessionStorage.getItem("accessToken"); // Check for the token in sessionStorage
  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;