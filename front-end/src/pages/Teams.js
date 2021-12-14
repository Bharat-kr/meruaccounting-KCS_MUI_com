import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';

import { useContext } from 'react';
import { Container, Typography, Paper, Button } from '@mui/material';
import VerticalTabs from '../components/teams/verticaltabs';
import { UserContextProvider } from '../contexts/UserContext';
import { ClientsContextProvider } from '../contexts/ClientsContext';
import { teamContext, TeamsProvider } from '../contexts/TeamsContext';

import { AddMember, getEmployeeList } from '../api/teams api/teams';

// _______________________________________________________________________________________________________________

export default function SimpleContainer() {
  const { dispatchTeam, dispatchEmployeeList } = useContext(teamContext);
  const clickme = () => {
    AddMember({ name: 'WebDev' }, dispatchTeam);
    getEmployeeList(dispatchEmployeeList);
  };
  return (
    <ClientsContextProvider>
      <UserContextProvider>
        <CssBaseline />
        <Box
          component="div"
          sx={{ width: '95%', margin: 'auto', maxHeight: '70vh', height: '70vh' }}
        >
          <Box sx={{ pb: 5 }}>
            <Typography variant="h2">Teams</Typography>
          </Box>
          <Button onClick={clickme}>clickme</Button>
          <VerticalTabs />
        </Box>
      </UserContextProvider>
    </ClientsContextProvider>
  );
}
