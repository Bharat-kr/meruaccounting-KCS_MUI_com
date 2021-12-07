import React from 'react';
import { Route, Redirect, Navigate } from 'react-router-dom';

// import { authenticationService } from '../_services/authetication.service';
import { LoginContext } from '../contexts/LoginContext';

export const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const LoginC = LoginContext();
  const ud = JSON.parse(localStorage.getItem('ud'));
  const islogin = { ...LoginC };
  console.log(ud);
  return islogin ? ud.role === roles && <Component /> : <Navigate to="/" />;
};
