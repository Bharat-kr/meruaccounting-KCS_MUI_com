// material
import { Box, Grid, Container, Typography } from '@mui/material';
import { TeamsProvider } from '../contexts/TeamsContext';
import EmployeeContainer from '../components/_dashboard/employee/EmployeeContainer';

// components
import Page from '../components/Page';
import {
  Monthlyhours,
  AppBugReports,
  AppItemOrders,
  Weeklyhours,
  SimpleContainer
} from '../components/_dashboard/app';
import PageHeader from '../components/PageHeader';
import { Role } from '../_helpers/role';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const localUd = localStorage.getItem('ud');
  const ud = JSON.parse(localUd);
  console.log(Role.indexOf(ud.role));
  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="lg">
        <PageHeader title="Dashboard" />

        <Grid container spacing={2}>
          {/* <Grid item xs={12} sm={6} md={3}>
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
          </Grid> */}

          {Role.indexOf(ud.role) === 2 ? (
            <SimpleContainer sx={{ width: '100%' }} />
          ) : (
            <EmployeeContainer sx={{ width: '100%' }} />
          )}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
