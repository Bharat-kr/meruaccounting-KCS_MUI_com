import React, { useContext } from 'react';
import {  Navigate } from 'react-router-dom';
import { Role } from '../_helpers/role';
import { loginContext } from '../contexts/LoginContext';
// import { authenticationService } from '../_services/authetication.service';

export const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const { loginC } = useContext(loginContext);

  console.log(loginC.userData.role);

  return loginC && Role.indexOf(loginC.userData.role) <= roles ? (
    <Component />
  ) : (
    <Navigate to="/404" replace />
  );
};
