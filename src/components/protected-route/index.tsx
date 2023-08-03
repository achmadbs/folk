import React from 'react';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = Cookies.get('token');
  if (token === 'undefined' || !token) {
    return <Navigate to='/' replace={true} />;
  }
  return children;
};

export default ProtectedRoute;
