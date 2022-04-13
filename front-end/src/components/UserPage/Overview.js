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
import timeDiff from "src/_helpers/timeDifference";

// contexts
import { CurrentUserContext } from "src/contexts/CurrentUserContext";
import { Link } from "react-router-dom";

export default function Overview({ date, dateObj, days, activities }) {
  const { commonData } = useContext(CurrentUserContext);
  const [value, setValue] = React.useState("1");
  const [apps, setApps] = React.useState([]);
  const [appsMap, setAppsMap] = React.useState([]);
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

  console.log("activities", activities);

  //Getting apps and URL's
  useEffect(() => {
    if (activities !== undefined && activities.length > 0) {
      let arr = [];
      let map = new Map();
      let finalArray = [];

      activities.forEach((activity) => {
        activity.screenshots.forEach((screenshot) => {
          arr.push(screenshot.title);
          if (map.get(screenshot.title)) {
            map.set(screenshot.title, map.get(screenshot.title) + 1);
          } else {
            map.set(screenshot.title, 1);
          }
        });
      });
      map.forEach((value, key) => {
        finalArray.push({
          app: key,
          usage: value,
        });
      });
      setApps(arr);
      setAppsMap(finalArray);
      console.log(map);
    }
  }, [activities]);

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
        <AppItemOrders
          Total={
            commonData?.commonData?.dailyHours &&
            commonData?.commonData?.dailyHours.length > 0
              ? (
                  commonData?.commonData?.dailyHours[0].totalHours /
                  (60 * 60)
                ).toFixed(2)
              : 0
          }
        />
        <Weeklyhours
          Total={
            commonData?.commonData?.weeklyTime &&
            commonData?.commonData?.weeklyTime.length > 0
              ? (
                  commonData?.commonData?.weeklyTime[0].totalHours /
                  (60 * 60)
                ).toFixed(2)
              : 0
          }
        />
        <Monthlyhours
          Total={
            commonData?.commonData?.monthlyTime &&
            commonData?.commonData?.monthlyTime.length > 0
              ? (
                  commonData?.commonData?.monthlyTime[0].totalHours /
                  (60 * 60)
                ).toFixed(2)
              : 0
          }
        />
        <AppBugReports
          Total={
            commonData?.commonData?.totalTime &&
            commonData?.commonData?.totalTime.length > 0
              ? (
                  commonData?.commonData?.totalTime[0]?.totalHours /
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
                  {dateObj.format("Do MMMM YYYY")}
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
                <Box overflow={"auto"} sx={{ height: 145 }}>
                  {activities &&
                    activities.map((activity) => {
                      console.log(activity);
                      return (
                        <>
                          <a
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              px: 1,
                              textDecoration:"none",
                              color:"black"
                            }}
                            href={`#${activity._id}`}
                          >
                            <Typography
                              sx={{ mb: 1.5 }}
                              variant="h5"
                              color="text.primary"
                            >
                              {activity?.project?.name}
                              <br />
                              <Typography color="text.primary">
                                {activity.task}
                              </Typography>
                            </Typography>
                            <Typography variant="h4" component="div">
                              {timeDiff(activity.startTime, activity.endTime)}
                            </Typography>
                          </a>
                          <Divider sx={{ backgroundColor: "primary.dark" }} />
                        </>
                      );
                    })}
                </Box>
              </TabPanel>
              <TabPanel value="2">
                <Box overflow={"auto"} sx={{ height: 145 }}>
                  {appsMap &&
                    appsMap.map((data) => {
                      return (
                        <>
                          <Box
                            key={data.app}
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              px: 1,
                            }}
                          >
                            <Typography
                              sx={{ my: 1.5 }}
                              variant="h6"
                              color="text.primary"
                            >
                              {data.app}
                              <br />
                            </Typography>
                            <Typography variant="h5" component="div">
                              {`${((data.usage / apps.length) * 100).toFixed(
                                2
                              )}%`}
                            </Typography>
                          </Box>
                          <Divider sx={{ backgroundColor: "primary.dark" }} />
                        </>
                      );
                    })}
                </Box>
              </TabPanel>
            </TabContext>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
