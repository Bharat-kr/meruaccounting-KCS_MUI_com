import {
  Container,
  Box,
  Paper,
  Typography,
  CardContent,
  Card,
  CardActions,
  Button,
  Grid
} from '@mui/material';
import React from 'react';
import { Monthlyhours, Weeklyhours, AppItemOrders, AppBugReports } from '../_dashboard/app';

export default function Overview() {
  return (
    <Box
      component="div"
      sx={{
        m: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="lg">
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
      {/* <Card elevation={3} sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Friday, December 3
          </Typography>
          <Typography variant="h4" component="div">
            1h 32m
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Current Project
          </Typography>
          <Typography variant="body2">
            Week 9h 48m
            <br />
            Month 4h 19m
          </Typography>
        </CardContent>
      </Card> */}

      {/* <Card elevation={3} sx={{ width: '80%' }}>
        HEllo
      </Card> */}
    </Box>
  );
}
