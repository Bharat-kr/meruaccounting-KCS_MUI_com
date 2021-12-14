import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Divider, Container, Typography, Paper } from '@mui/material';
import Grid from '@mui/material/Grid';
import BasicTabs from '../components/_dashboard/muicomponents/BasicTabs';
import PageHeader from '../components/PageHeader';

export default function SimpleContainer() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="100%">
        <PageHeader title="Reports" />
        <Paper elevation="3" sx={{ height: '100%', width: '100%' }}>
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
