import { useContext } from 'react';

// material
import { Box, Grid, Container, Typography } from '@mui/material';

// contexts
import { TeamsProvider } from '../contexts/TeamsContext';
import { loginContext } from '../contexts/LoginContext';

// components
import Page from '../components/Page';
import {
  Monthlyhours,
  AppBugReports,
  AppItemOrders,
  Weeklyhours,
  SimpleContainer
} from '../components/_dashboard/app';
import EmployeeContainer from '../components/_dashboard/employee/EmployeeContainer';
import PageHeader from '../components/PageHeader';
import { Role } from '../_helpers/role';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const { loginC } = useContext(loginContext);
  console.log(Role.indexOf(loginC.userData.role));
  return (
    <Page title="Dashboard | Minimal-UI">
      <Container maxWidth="lg">
        <PageHeader title="Dashboard" />

        <Grid container spacing={2}>
          {Role.indexOf(loginC.userData.role) === 2 ? (
            <SimpleContainer sx={{ width: '100%' }} />
          ) : (
            <EmployeeContainer sx={{ width: '100%' }} />
          )}
        </Grid>
      </Container>
    </Page>
  );
}
