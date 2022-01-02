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
import Divider from "@mui/material/Divider";
import React from "react";
import moment from "moment";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  Monthlyhours,
  Weeklyhours,
  AppItemOrders,
  AppBugReports,
} from "../_dashboard/app";
import Calendar from "./Calendar";

export default function Overview() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      component="div"
      sx={{
        m: 2,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        "@media (max-width: 780px)": {
          flexDirection: "column",
        },
      }}
    >
      {/* <Calendar /> */}
      {/* <Container maxWidth="lg">
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
      </Container> */}
      <Box
        sx={{
          width: "40%",
          "@media (max-width: 780px)": {
            width: "100%",
            marginBottom: "10px",
          },
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
        }}
      >
        <AppItemOrders />
        <Weeklyhours />
        <Monthlyhours />
        <AppBugReports />
      </Box>
      <Box
        sx={{
          width: "60%",
          "@media (max-width: 780px)": {
            width: "100%",
          },
        }}
      >
        <Card
          elevation={3}
          sx={{
            minWidth: 275,
            height: "100%",
            backgroundColor: "info.lighter",
          }}
        >
          <CardContent>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.primary"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {moment().format("MMMM Do YYYY, h:mm:ss a")}
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Tasks" value="1" />
                    <Tab label="Apps & URL's" value="2" />
                  </TabList>
                </Typography>
              </Box>
              {/* <Divider sx={{ backgroundColor: "info.dark" }} /> */}
              <TabPanel value="1">
                <Box overflow={"auto"}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      sx={{ mb: 1.5 }}
                      variant="h5"
                      color="text.primary"
                    >
                      Current Project
                      <br />
                      <Typography color="text.primary">
                        Tasks getting Performed
                      </Typography>
                    </Typography>
                    <Typography variant="h4" component="div">
                      1h 32m
                    </Typography>
                  </Box>
                  <Divider sx={{ backgroundColor: "primary.dark" }} />
                </Box>
              </TabPanel>
              <TabPanel value="2">...</TabPanel>
            </TabContext>
          </CardContent>
        </Card>
      </Box>

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
