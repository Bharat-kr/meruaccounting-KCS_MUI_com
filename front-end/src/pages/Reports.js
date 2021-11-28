import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Divider, Container, Typography, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import BasicTabs from '../components/_dashboard/muicomponents/BasicTabs';

export default function SimpleContainer() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        {/* <PageHeader title="User" subTitle="Manager" icon={<AdminPanelSettingsIcon />} /> */}
        <Box sx={{ pb: 5 }}>
          <Typography variant="h2">Reports</Typography>
        </Box>
        <Paper elevation="3" sx={{ height: '100%', width: 'xl' }}>
          <Grid item xs={3} sm={6} md={12}>
            {/* <PageHeader title="Reports" subTitle="" icon={<NoteIcon />} /> */}
            {/* <Container
              style={{
                padding: '1rem',
                fontSize: '1.5rem',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
              }}
            ></Container> */}
            <Container />
            <Divider />
            <Divider />
          </Grid>
          <BasicTabs />
        </Paper>
      </Container>
    </>
  );
}
