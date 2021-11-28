import React from 'react';
import { CssBaseline, Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Header from '../components/Clients/Header';
import Sidebar from '../components/Clients/Sidebar';

// eslint-disable-next-line import/no-named-as-default
import ClientsContextProvider from '../contexts/ClientsContext';

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: '70vh',
    height: '70vh',
    width: '100%',
    margin: 'auto',
    display: 'grid',
    gridTemplateColumns: '30% 70%',
    backgroundColor: '#fdfdff'
  }
}));
// lg: '70%', md: '90%'

export default function Clients() {
  const classes = useStyles();
  return (
    <Box component="div" sx={{ width: '95%', margin: 'auto', maxHeight: '70vh', height: '70vh' }}>
      <ClientsContextProvider>
        <CssBaseline />
        <Box sx={{ pb: 5 }}>
          <Typography variant="h2">Clients</Typography>
        </Box>
        {/* <PageHeader title="Clients" subTitle="Clients and Projects" icon={<GroupWorkIcon />} /> */}

        <div className={classes.root}>
          <Sidebar />

          {/* <Paper elevation={1}> */}
          <Header> </Header>
          {/* </Paper> */}
        </div>
      </ClientsContextProvider>
    </Box>
  );
}
