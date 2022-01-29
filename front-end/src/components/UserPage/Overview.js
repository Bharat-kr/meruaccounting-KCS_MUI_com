import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, CardContent, Card } from "@mui/material";
import Divider from "@mui/material/Divider";
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
import { CurrentUserContext } from "src/contexts/CurrentUserContext";

// contexts

export default function Overview({ date, days }) {
  const { commonData } = useContext(CurrentUserContext);
  const [value, setValue] = React.useState("1");
  const [todaysHours, setTodaysHours] = useState(0);

  //getting DailyHours
  useEffect(() => {
    let Data = [];
    Data = days?.filter((day) => {
      return day.date === date;
    });
    if (Data && Data.length > 0) {
      setTodaysHours(Data[0].dailyHours);
    } else {
      setTodaysHours(0);
    }
  }, [date]);

  //toggling tasks and apps
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
        <AppItemOrders Total={(todaysHours / (60 * 60)).toFixed(2)} />
        <Weeklyhours
          Total={
            commonData?.commonData?.weeklyTime
              ? (
                  commonData?.commonData?.weeklyTime[0].totalHours /
                  (60 * 60)
                ).toFixed(2)
              : 0
          }
        />
        <Monthlyhours
          Total={
            commonData?.commonData?.monthlyTime
              ? (
                  commonData?.commonData?.monthlyTime[0].totalHours /
                  (60 * 60)
                ).toFixed(2)
              : 0
          }
        />
        <AppBugReports
          Total={
            commonData?.commonData?.totalTime
              ? (
                  commonData?.commonData?.totalTime[0].totalHours /
                  (60 * 60)
                ).toFixed(2)
              : 0
          }
        />
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
                  color="text.primary"
                  sx={{
                    fontSize: 14,
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
    </Box>
  );
}
