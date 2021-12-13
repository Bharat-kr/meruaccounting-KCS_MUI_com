import React, { useContext } from 'react';
import { Route, Redirect, Navigate } from 'react-router-dom';
import { Role } from '../_helpers/role';
import { loginContext } from '../contexts/LoginContext';
// import { authenticationService } from '../_services/authetication.service';

export const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const { loginC } = useContext(loginContext);
<<<<<<< HEAD
  const ud = loginC.isLogin && localStorage.ud;
  console.log(loginC);
  console.log(Role.indexOf(ud.role));
=======
  const ud = loginC.isLogin === true && localStorage.getItem('ud');
  // console.log(loginC);
  // console.log(Role.indexOf(ud.role));
>>>>>>> 5ebc2139e7a47e83786e73b01b01a9bf8db19832
  return loginC && Role.indexOf(ud.role) <= roles ? <Component /> : <Navigate to="/404" replace />;
};
