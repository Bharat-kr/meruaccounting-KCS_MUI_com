import React, { useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
// import Activity from "./oldActivity";
import Activity from "./Activity";
// contexts
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function ScreenShots({ activities }) {
  const { commonData } = useContext(CurrentUserContext);

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
      {activities && activities.length !== 0
        ? activities.map((act) => {
            return (
              <Activity
                startTime={act.startTime}
                endTime={act.endTime}
                performanceData={act.performanceData}
                proId={act.project}
                screenShots={act.screenshots}
              ></Activity>
            );
          })
        : "no activities"}
    </Box>
  );
}
