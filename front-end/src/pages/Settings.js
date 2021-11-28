import React from 'react';
import { CssBaseline, Box, Typography } from '@mui/material';
// eslint-disable-next-line import/no-named-as-default
import Sidebar from '../components/Settings/Sidebar';
// eslint-disable-next-line import/no-named-as-default
import ClientsContextProvider from '../contexts/ClientsContext';
import { UserContextProvider } from '../contexts/UserContext';

export default function Settings() {
  return (
    <ClientsContextProvider>
      <UserContextProvider>
        <Box component="div" sx={{ width: '95%', margin: 'auto' }}>
          <CssBaseline />
          {/* <PageHeader title="Settings" subTitle="Manager Name" icon={<GroupWorkIcon />} /> */}
          <Box sx={{ pb: 5 }}>
            <Typography variant="h2">Settings</Typography>
          </Box>
          <div>
            <Sidebar />
          </div>
        </Box>
      </UserContextProvider>
    </ClientsContextProvider>
  );
}
