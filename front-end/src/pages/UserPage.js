import React from 'react';
import { CssBaseline, Box } from '@mui/material';

import Overview from '../components/UserPage/Overview';
import ScreenShots from '../components/UserPage/ScreenShots';

// eslint-disable-next-line import/no-named-as-default
import CurrentUserContextProvider from '../contexts/CurrentUserContext';
import { LoginProvider } from '../contexts/LoginContext';
import PageHeader from '../components/PageHeader';

export default function UserPage(props) {
  return (
    <CssBaseline>
      <Box component="div" sx={{ width: '95%', margin: 'auto' }}>
        <LoginProvider>
          <CurrentUserContextProvider>
            <PageHeader title="Hi, Welcome Back!" />

            <Overview />
            <ScreenShots />
          </CurrentUserContextProvider>
        </LoginProvider>
      </Box>
    </CssBaseline>
  );
}

// import React from 'react';
// import { CssBaseline, Box, Typography } from '@mui/material';
// import { makeStyles } from '@mui/styles';
