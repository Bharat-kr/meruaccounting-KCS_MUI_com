import React, { useContext } from "react";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Activity from "./Activity";

// contexts
import { EmployeePageContext } from "src/contexts/EmployeePageContext";

export default function ScreenShots({ activities, date }) {
  const { commonData } = useContext(EmployeePageContext);

  return commonData.loader ? (
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
          return (
            <Activity
              date={date}
              project={act.project}
              act={act}
              isAccepted={act.isAccepted}
              startTime={act.startTime}
              endTime={act.endTime}
              performanceData={act.performanceData}
              proId={act.project}
              screenShots={act.screenshots}
            ></Activity>
          );
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
