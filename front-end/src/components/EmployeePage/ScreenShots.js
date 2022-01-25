import React from "react";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
// import Activity from "./oldActivity";
import Activity from "./Activity";

export default function ScreenShots({ activities, commonData }) {
  return !commonData ? (
    // Put a loader here
    <Box
      sx={{
        display: "flex",
        flexGrow: "1",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress sx={{ m: 2 }} />
    </Box>
  ) : (
    <Box component="div" sx={{}}>
      {/* map the time ranges from user data for the particular date */}

      {activities !== undefined && activities.length !== 0 ? (
        activities.map((act) => {
          // dont render if there are not screenshots
          if (act.screenshots.length !== 0) {
            return (
              <Activity
                project={act.project}
                actId={act._id}
                isAccepted={act.isAccepted}
                startTime={act.startTime}
                endTime={act.endTime}
                performanceData={act.performanceData}
                proId={act.project}
                screenShots={act.screenshots}
              ></Activity>
            );
          }
        })
      ) : (
        <Alert severity="info">
          <AlertTitle>No Activities</AlertTitle>
          Nothing was done on this day — <strong>{"NONE :("}</strong>
        </Alert>
      )}
    </Box>
  );
}
