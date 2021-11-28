import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';

import { Container, Typography, Paper } from '@mui/material';
import VerticalTabs from '../components/teams/verticaltabs';
import { UserContextProvider } from '../contexts/UserContext';
import { ClientsContextProvider } from '../contexts/ClientsContext';
// _______________________________________________________________________________________________________________

export default function SimpleContainer() {
  return (
    <Box component="div" sx={{ width: '95%', margin: 'auto', maxHeight: '70vh', height: '70vh' }}>
      <ClientsContextProvider>
        <UserContextProvider>
          <CssBaseline />
          <Box sx={{ pb: 5 }}>
            <Typography variant="h2">Teams</Typography>
          </Box>

          <VerticalTabs />
        </UserContextProvider>
      </ClientsContextProvider>
    </Box>
  );
}
