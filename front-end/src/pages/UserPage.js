import React from 'react';
import PageHeader from '../components/UserPage/PageHeader';
// eslint-disable-next-line import/no-named-as-default
import CurrentUserContextProvider from '../contexts/CurrentUserContext';

export default function UserPage(props) {
  return (
    <CurrentUserContextProvider>
      <PageHeader>HEllo</PageHeader>
    </CurrentUserContextProvider>
  );
}

// import React from 'react';
// import { CssBaseline, Box, Typography } from '@mui/material';
// import { makeStyles } from '@mui/styles';
