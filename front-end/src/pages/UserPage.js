import React from 'react';
import { Box } from '@mui/material';
import PageHeader from '../components/UserPage/PageHeader';
import Overview from '../components/UserPage/Overview';
import Timeline from '../components/UserPage/Timeline';
import ScreenShots from '../components/UserPage/ScreenShots';

// eslint-disable-next-line import/no-named-as-default
import CurrentUserContextProvider from '../contexts/CurrentUserContext';
import { LoginProvider } from '../contexts/LoginContext';

export default function UserPage(props) {
  return (
    <LoginProvider>
      <CurrentUserContextProvider>
        <PageHeader>HEllo</PageHeader>
        {/* <Timeline /> */}
        <Overview />
        <ScreenShots />
      </CurrentUserContextProvider>
    </LoginProvider>
  );
}

// import React from 'react';
// import { CssBaseline, Box, Typography } from '@mui/material';
// import { makeStyles } from '@mui/styles';
