import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';

import { useContext } from 'react';
import { Container, Typography, Paper, Button } from '@mui/material';
import VerticalTabs from '../components/teams/verticaltabs';
import PageHeader from '../components/PageHeader';
import { UserContextProvider } from '../contexts/UserContext';
import { ClientsContextProvider } from '../contexts/ClientsContext';
import { teamContext, TeamsProvider } from '../contexts/TeamsContext';

import { createTeam, getEmployeeList, updateMember } from '../api/teams api/teams';

import { getClient } from '../api/clients api/clients';

// _______________________________________________________________________________________________________________

export default function SimpleContainer() {
  const { dispatchTeam, dispatchEmployeeList } = useContext(teamContext);
  const clickme = () => {
    createTeam({ name: 'Flutter' }, dispatchTeam);
    getEmployeeList(dispatchEmployeeList);
    updateMember();
  };
  return (
    <ClientsContextProvider>
      <UserContextProvider>
        <CssBaseline />
        <Box
          component="div"
          sx={{ width: '95%', margin: 'auto', maxHeight: '70vh', height: '70vh' }}
        >
          <PageHeader title="Teams" />
          <Button onClick={clickme}>clickme</Button>
          <VerticalTabs />
        </Box>
      </UserContextProvider>
    </ClientsContextProvider>
  );
}
