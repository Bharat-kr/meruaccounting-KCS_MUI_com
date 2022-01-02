import {
  Container,
  Box,
  Paper,
  Typography,
  CardContent,
  Card,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import React from "react";
import {
  Monthlyhours,
  Weeklyhours,
  AppItemOrders,
  AppBugReports,
  Highlights,
} from "../_dashboard/app";
import Calendar from "./Calendar";

export default function Overview() {
  return (
    <Box
      component="div"
      sx={{
        m: 2,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      {/* <Calendar /> */}
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={3} sm={3} md={3} lg={1.5}>
            <Monthlyhours />
          </Grid>
          <Grid item xs={3} sm={3} md={3} lg={1.5}>
            <Weeklyhours />
          </Grid>

          <Grid item xs={3} sm={3} md={3} lg={1.5}>
            <AppItemOrders />
          </Grid>
          <Grid item xs={3} sm={3} md={3} lg={1.5}>
            <AppBugReports />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Highlights />
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
