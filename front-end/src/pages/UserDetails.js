// import './UserDetails.css';
import { CssBaseline, Box, Container, Typography, Grid } from '@mui/material';

import Sidebar from '../components/SideBar';
import {
  Monthlyhours,
  Weeklyhours,
  AppBugReports,
  AppItemOrders
} from '../components/_dashboard/app';
import ScreenShots from '../components/ScreenShots';
import Timeline from '../components/Timeline';

export default function UserDetails() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        {/* <PageHeader title="User" subTitle="Manager" icon={<AdminPanelSettingsIcon />} /> */}
        <Container maxWidth="lg">
          <Box sx={{ pb: 5 }}>
            <Typography variant="h4">Hi, Welcome back</Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Monthlyhours />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Weeklyhours />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppItemOrders />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBugReports />
            </Grid>
          </Grid>
        </Container>
        <Sidebar />
        <ScreenShots />
        <Box sx={{ bgcolor: '#f3e5f5', height: '100vh', width: 'xl' }}>
          <Timeline />
        </Box>
      </Container>
    </>
  );
}
