import React from 'react';
import { Box } from '@mui/material';
import PageHeader from '../components/UserPage/PageHeader';
import Overview from '../components/UserPage/Overview';
import Timeline from '../components/UserPage/Timeline';
import ScreenShots from '../components/UserPage/Screenshots';

// eslint-disable-next-line import/no-named-as-default
import CurrentUserContextProvider from '../contexts/CurrentUserContext';

export default function UserPage(props) {
  return (
    <CurrentUserContextProvider>
      <PageHeader>HEllo</PageHeader>
      {/* <Timeline /> */}
      <Overview />
      <ScreenShots />
    </CurrentUserContextProvider>
  );
}

// import React from 'react';
// import { CssBaseline, Box, Typography } from '@mui/material';
// import { makeStyles } from '@mui/styles';
