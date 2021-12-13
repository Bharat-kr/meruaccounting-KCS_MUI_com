import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Card } from '@material-ui/core';
import Container from '@mui/material/Container';
import { Link as RouterLink } from 'react-router-dom';
// import { makeStyles } from '@mui/styles';
// import  from '@mui/icons-material/AdminPanelSettings';
// import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import SettingsIcon from '@mui/icons-material/Settings';
import { Typography, Backdrop, Button, Paper } from '@mui/material';
import ApiRefRowsGrid from '../muicomponents/ThrottledRowsGrid';
import EmployeeApiRefRowsGrid from './ThrottledRowsGrid';
// import PageHeader from '../../PageHeader';

export default function EmployeeContainer() {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    <>
      <CssBaseline />
      <Paper elevation={3} sx={{ width: '100%' }}>
        <Box sx={{ height: '100vh', width: '100%' }}>
          <Grid item xs={3} sm={6} md={12}>
            <Container
              style={{
                padding: '1rem',
                fontSize: '1.5rem',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%'
              }}
            >
              <Typography varinat="h3" sx={{ fontWeight: 'bold', fontSize: '23px' }}>
                Employee Dashboard
              </Typography>
              {/* <RouterLink to="/dashboard/usersettings"> */}
            </Container>
            <EmployeeApiRefRowsGrid isEmployee />
          </Grid>
        </Box>
      </Paper>
    </>
  );
}
