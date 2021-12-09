import React from 'react';
import { Route, Redirect, Navigate } from 'react-router-dom';

// import { authenticationService } from '../_services/authetication.service';
import { LoginContext } from '../contexts/LoginContext';

export const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const { loginC } = LoginContext();
  const ud = JSON.parse(localStorage.getItem('ud'));
  console.log(loginC);
  return loginC && ud.role === roles ? <Component /> : <Navigate to="/404" replace />;
};
