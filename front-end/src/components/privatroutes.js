import React, { useContext } from 'react';
import { Route, Redirect, Navigate } from 'react-router-dom';
import { Role } from '../_helpers/role';
import { loginContext } from '../contexts/LoginContext';
// import { authenticationService } from '../_services/authetication.service';

export const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const { loginC } = useContext(loginContext);
  const localUd = loginC.isLogin && localStorage.getItem('ud');
  const ud = JSON.parse(localUd);

  console.log(loginC);
  console.log(Role.indexOf(ud.role));

  return loginC && Role.indexOf(ud.role) <= roles ? <Component /> : <Navigate to="/404" replace />;
};
